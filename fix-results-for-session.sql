-- FIX RESULTS FOR SPECIFIC SESSION
-- This will manually calculate and insert results for the current session

-- 1. Check current session
SELECT 
  id,
  status,
  current_question,
  total_questions,
  started_at,
  ended_at
FROM challenge_sessions 
WHERE id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5';

-- 2. Check participants
SELECT 
  cp.id,
  cp.user_id,
  cp.display_name,
  cp.is_ready
FROM challenge_participants cp
WHERE cp.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5';

-- 3. Check challenge answers
SELECT 
  ca.id,
  ca.participant_id,
  ca.question_id,
  ca.answer_index,
  ca.is_correct,
  ca.response_time,
  ca.answered_at
FROM challenge_answers ca
WHERE ca.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
ORDER BY ca.answered_at;

-- 4. Clear any existing results
DELETE FROM challenge_results 
WHERE challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5';

-- 5. Manually calculate and insert results
DO $$
DECLARE
  participant_record RECORD;
  correct_count INTEGER;
  total_score INTEGER;
  avg_response_time INTEGER;
  time_bonus INTEGER;
  avg_time_seconds INTEGER;
  participant_rank INTEGER := 1;
BEGIN
  -- Loop through each participant
  FOR participant_record IN 
    SELECT DISTINCT cp.id as participant_id, cp.user_id, cp.display_name
    FROM challenge_participants cp
    WHERE cp.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
  LOOP
    -- Count correct answers for this participant
    SELECT COUNT(*) INTO correct_count
    FROM challenge_answers ca
    WHERE ca.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
    AND ca.participant_id = participant_record.participant_id
    AND ca.is_correct = true;
    
    -- Calculate average response time
    SELECT COALESCE(AVG(ca.response_time), 0)::INTEGER INTO avg_response_time
    FROM challenge_answers ca
    WHERE ca.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
    AND ca.participant_id = participant_record.participant_id;
    
    -- Convert to seconds and calculate time bonus
    avg_time_seconds := COALESCE(avg_response_time / 1000, 30);
    
    IF avg_time_seconds <= 5 THEN
      time_bonus := 50;
    ELSIF avg_time_seconds <= 10 THEN
      time_bonus := 40;
    ELSIF avg_time_seconds <= 15 THEN
      time_bonus := 30;
    ELSIF avg_time_seconds <= 20 THEN
      time_bonus := 20;
    ELSIF avg_time_seconds <= 25 THEN
      time_bonus := 10;
    ELSE
      time_bonus := 0;
    END IF;
    
    -- Calculate total score: (100 * correct_count) + time_bonus
    total_score := (100 * correct_count) + time_bonus;
    
    -- Insert result
    INSERT INTO challenge_results (
      challenge_session_id,
      participant_id,
      total_score,
      correct_answers,
      total_questions,
      average_response_time,
      rank,
      completed_at
    )
    VALUES (
      'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5',
      participant_record.participant_id,
      total_score,
      correct_count,
      5, -- total questions
      avg_response_time,
      participant_rank,
      NOW()
    );
    
    RAISE NOTICE 'Participant %: % correct, avg time: %s, time bonus: %, total score: %', 
      participant_record.display_name, correct_count, avg_time_seconds, time_bonus, total_score;
    
    participant_rank := participant_rank + 1;
  END LOOP;
  
  -- Update ranks based on scores
  UPDATE challenge_results 
  SET rank = subquery.new_rank
  FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY total_score DESC, average_response_time ASC) as new_rank
    FROM challenge_results 
    WHERE challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
  ) subquery
  WHERE challenge_results.id = subquery.id;
  
  RAISE NOTICE 'Results calculated for session a63fcaa4-141e-4386-bb7f-c66df8c9bbf5';
END $$;

-- 6. Verify results were created
SELECT 
  cr.id,
  cr.participant_id,
  cr.total_score,
  cr.correct_answers,
  cr.total_questions,
  cr.average_response_time,
  cr.rank,
  cr.completed_at
FROM challenge_results cr
WHERE cr.challenge_session_id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5'
ORDER BY cr.rank;

-- 7. Update session status to finished
UPDATE challenge_sessions 
SET 
  status = 'finished',
  ended_at = NOW()
WHERE id = 'a63fcaa4-141e-4386-bb7f-c66df8c9bbf5';

SELECT 'Results fix completed for session a63fcaa4-141e-4386-bb7f-c66df8c9bbf5!' as result;
