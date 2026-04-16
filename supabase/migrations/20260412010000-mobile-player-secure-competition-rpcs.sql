-- Mobile player hardening for competition quizzes:
-- 1) Returns competition questions without exposing correct answers.
-- 2) Scores submissions on the server and enforces single-attempt behavior.
-- 3) Captures anti-cheat telemetry for mobile submissions.

ALTER TABLE public.competition_results
  ADD COLUMN IF NOT EXISTS focus_violations SMALLINT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS left_app BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_disqualified BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS submitted_via TEXT NOT NULL DEFAULT 'web',
  ADD COLUMN IF NOT EXISTS answers_snapshot JSONB;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'competition_results_submitted_via_check'
      AND conrelid = 'public.competition_results'::regclass
  ) THEN
    ALTER TABLE public.competition_results
      ADD CONSTRAINT competition_results_submitted_via_check
      CHECK (submitted_via IN ('web', 'mobile'));
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.list_mobile_player_competitions()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  entry_fee NUMERIC,
  prize_pool NUMERIC,
  status TEXT,
  has_paid_entry BOOLEAN,
  has_attempted BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'AUTH_REQUIRED';
  END IF;

  RETURN QUERY
  SELECT
    c.id,
    c.title,
    c.description,
    c.start_date,
    c.end_date,
    c.entry_fee,
    c.prize_pool,
    COALESCE(c.status, 'upcoming')::TEXT AS status,
    COALESCE(e.paid, false) AS has_paid_entry,
    (r.id IS NOT NULL) AS has_attempted
  FROM public.competitions c
  LEFT JOIN public.competition_entries e
    ON e.competition_id = c.id
   AND e.user_id = v_user_id
  LEFT JOIN public.competition_results r
    ON r.competition_id = c.id
   AND r.user_id = v_user_id
  WHERE COALESCE(e.paid, false) = true
  ORDER BY c.start_date ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_mobile_competition_quiz(p_competition_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_competition public.competitions%ROWTYPE;
  v_has_paid_entry BOOLEAN := false;
  v_has_attempted BOOLEAN := false;
  v_questions JSONB;
  v_time_limit_seconds INTEGER := 1800;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'AUTH_REQUIRED';
  END IF;

  SELECT *
  INTO v_competition
  FROM public.competitions
  WHERE id = p_competition_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'COMPETITION_NOT_FOUND';
  END IF;

  IF COALESCE(v_competition.status, '') <> 'active' THEN
    RAISE EXCEPTION 'COMPETITION_NOT_ACTIVE';
  END IF;

  IF now() < v_competition.start_date OR now() > v_competition.end_date THEN
    RAISE EXCEPTION 'COMPETITION_OUTSIDE_WINDOW';
  END IF;

  IF v_competition.quiz_id IS NULL THEN
    RAISE EXCEPTION 'QUIZ_NOT_CONFIGURED';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.competition_entries e
    WHERE e.competition_id = p_competition_id
      AND e.user_id = v_user_id
      AND COALESCE(e.paid, false) = true
  )
  INTO v_has_paid_entry;

  IF NOT v_has_paid_entry THEN
    RAISE EXCEPTION 'ENTRY_NOT_PAID';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.competition_results r
    WHERE r.competition_id = p_competition_id
      AND r.user_id = v_user_id
  )
  INTO v_has_attempted;

  IF v_has_attempted THEN
    RAISE EXCEPTION 'ALREADY_ATTEMPTED';
  END IF;

  SELECT jsonb_agg(
           jsonb_build_object(
             'id', q.id,
             'order_index', q.order_index,
             'question', q.question,
             'option_a', q.option_a,
             'option_b', q.option_b,
             'option_c', q.option_c,
             'option_d', q.option_d
           )
           ORDER BY q.order_index
         )
  INTO v_questions
  FROM public.quiz_questions q
  WHERE q.quiz_id = v_competition.quiz_id;

  IF v_questions IS NULL OR jsonb_array_length(v_questions) = 0 THEN
    RAISE EXCEPTION 'QUIZ_HAS_NO_QUESTIONS';
  END IF;

  RETURN jsonb_build_object(
    'competition', jsonb_build_object(
      'id', v_competition.id,
      'title', v_competition.title,
      'description', v_competition.description,
      'start_date', v_competition.start_date,
      'end_date', v_competition.end_date
    ),
    'quiz', jsonb_build_object(
      'id', v_competition.quiz_id,
      'time_limit_seconds', v_time_limit_seconds,
      'question_count', jsonb_array_length(v_questions)
    ),
    'questions', v_questions
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_mobile_competition_quiz(
  p_competition_id UUID,
  p_answers JSONB,
  p_time_taken INTEGER,
  p_focus_violations INTEGER DEFAULT 0,
  p_left_app BOOLEAN DEFAULT false
)
RETURNS TABLE (
  score INTEGER,
  correct_answers INTEGER,
  total_questions INTEGER,
  disqualified BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_competition public.competitions%ROWTYPE;
  v_has_paid_entry BOOLEAN := false;
  v_has_attempted BOOLEAN := false;
  v_correct_count INTEGER := 0;
  v_total_count INTEGER := 0;
  v_score INTEGER := 0;
  v_is_disqualified BOOLEAN := false;
  v_clamped_time INTEGER := LEAST(GREATEST(COALESCE(p_time_taken, 0), 0), 1800);
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'AUTH_REQUIRED';
  END IF;

  SELECT *
  INTO v_competition
  FROM public.competitions
  WHERE id = p_competition_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'COMPETITION_NOT_FOUND';
  END IF;

  IF v_competition.quiz_id IS NULL THEN
    RAISE EXCEPTION 'QUIZ_NOT_CONFIGURED';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.competition_entries e
    WHERE e.competition_id = p_competition_id
      AND e.user_id = v_user_id
      AND COALESCE(e.paid, false) = true
  )
  INTO v_has_paid_entry;

  IF NOT v_has_paid_entry THEN
    RAISE EXCEPTION 'ENTRY_NOT_PAID';
  END IF;

  SELECT EXISTS (
    SELECT 1
    FROM public.competition_results r
    WHERE r.competition_id = p_competition_id
      AND r.user_id = v_user_id
  )
  INTO v_has_attempted;

  IF v_has_attempted THEN
    RAISE EXCEPTION 'ALREADY_ATTEMPTED';
  END IF;

  WITH provided_answers AS (
    SELECT DISTINCT ON ((item->>'question_id')::INTEGER)
      (item->>'question_id')::INTEGER AS question_id,
      LEAST(GREATEST(COALESCE((item->>'answer_index')::INTEGER, -1), -1), 3) AS answer_index
    FROM jsonb_array_elements(COALESCE(p_answers, '[]'::JSONB)) item
    WHERE jsonb_typeof(item) = 'object'
      AND item ? 'question_id'
      AND item ? 'answer_index'
  ),
  quiz_set AS (
    SELECT q.id, q.correct_index
    FROM public.quiz_questions q
    WHERE q.quiz_id = v_competition.quiz_id
  )
  SELECT
    COUNT(*)::INTEGER AS total_count,
    COALESCE(SUM(CASE WHEN a.answer_index = q.correct_index THEN 1 ELSE 0 END), 0)::INTEGER AS correct_count
  INTO v_total_count, v_correct_count
  FROM quiz_set q
  LEFT JOIN provided_answers a
    ON a.question_id = q.id;

  IF v_total_count = 0 THEN
    RAISE EXCEPTION 'QUIZ_HAS_NO_QUESTIONS';
  END IF;

  v_score := ROUND((v_correct_count::NUMERIC * 100) / v_total_count)::INTEGER;
  v_is_disqualified := COALESCE(p_left_app, false) OR COALESCE(p_focus_violations, 0) > 0;

  IF v_is_disqualified THEN
    v_score := 0;
  END IF;

  BEGIN
    INSERT INTO public.competition_results (
      competition_id,
      user_id,
      score,
      time_taken,
      focus_violations,
      left_app,
      is_disqualified,
      submitted_via,
      answers_snapshot
    )
    VALUES (
      p_competition_id,
      v_user_id,
      v_score,
      v_clamped_time,
      LEAST(GREATEST(COALESCE(p_focus_violations, 0), 0), 100)::SMALLINT,
      COALESCE(p_left_app, false),
      v_is_disqualified,
      'mobile',
      COALESCE(p_answers, '[]'::JSONB)
    );
  EXCEPTION
    WHEN unique_violation THEN
      RAISE EXCEPTION 'ALREADY_ATTEMPTED';
  END;

  score := v_score;
  correct_answers := v_correct_count;
  total_questions := v_total_count;
  disqualified := v_is_disqualified;
  RETURN NEXT;
END;
$$;

REVOKE ALL ON FUNCTION public.list_mobile_player_competitions() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_mobile_competition_quiz(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_mobile_competition_quiz(UUID, JSONB, INTEGER, INTEGER, BOOLEAN) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.list_mobile_player_competitions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_mobile_competition_quiz(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_mobile_competition_quiz(UUID, JSONB, INTEGER, INTEGER, BOOLEAN) TO authenticated;

