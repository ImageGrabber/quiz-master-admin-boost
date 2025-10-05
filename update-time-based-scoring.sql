-- Update scoring system to be time-based
-- Faster answers get more points, slower answers get fewer points

-- Drop existing function
DROP FUNCTION IF EXISTS calculate_quiz_results(UUID);

CREATE FUNCTION calculate_quiz_results(session_uuid UUID)
RETURNS TABLE(
  participant_name VARCHAR(100),
  score DECIMAL(5,2),
  correct_answers INTEGER,
  total_questions INTEGER,
  average_response_time DECIMAL(8,2)
) AS $$
DECLARE
  session_record live_quiz_sessions%ROWTYPE;
  participant_record live_quiz_participants%ROWTYPE;
  answer_record live_quiz_answers%ROWTYPE;
  correct_answers INTEGER;
  total_questions INTEGER;
  total_score DECIMAL(5,2);
  average_time DECIMAL(8,2);
  question_time_bonus DECIMAL(5,2);
  base_score DECIMAL(5,2);
  time_bonus DECIMAL(5,2);
  max_time_per_question INTEGER := 30; -- 30 seconds per question
BEGIN
  -- Get session details
  SELECT * INTO session_record FROM live_quiz_sessions WHERE id = session_uuid;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found: %', session_uuid;
  END IF;
  
  total_questions := session_record.total_questions;
  
  -- Process each participant
  FOR participant_record IN 
    SELECT * FROM live_quiz_participants WHERE session_id = session_uuid
  LOOP
    -- Reset counters for this participant
    correct_answers := 0;
    total_score := 0;
    average_time := 0;
    
    -- Process each answer for this participant
    FOR answer_record IN 
      SELECT lqa.*, uqq.correct_index
      FROM live_quiz_answers lqa
      JOIN user_quiz_questions uqq ON uqq.id = lqa.question_id
      WHERE lqa.participant_id = participant_record.id
    LOOP
      -- Calculate time-based score for this question
      -- Base score: 10 points for correct answer, 0 for incorrect
      base_score := CASE 
        WHEN answer_record.answer_index = answer_record.correct_index THEN 10.0
        ELSE 0.0
      END;
      
      -- Time bonus: faster answers get more points
      -- Formula: (max_time - response_time) / max_time * 10
      -- This gives 0-10 bonus points based on speed
      time_bonus := CASE 
        WHEN answer_record.answer_index = answer_record.correct_index THEN
          GREATEST(0, (max_time_per_question * 1000 - answer_record.response_time) / (max_time_per_question * 1000) * 10)
        ELSE 0
      END;
      
      -- Add to total score
      total_score := total_score + base_score + time_bonus;
      
      -- Count correct answers
      IF answer_record.answer_index = answer_record.correct_index THEN
        correct_answers := correct_answers + 1;
      END IF;
    END LOOP;
    
    -- Calculate average response time
    SELECT AVG(response_time) INTO average_time
    FROM live_quiz_answers 
    WHERE participant_id = participant_record.id;
    
    -- Insert or update result
    INSERT INTO live_quiz_results (
      session_id,
      participant_id,
      participant_name,
      score,
      correct_answers,
      total_questions,
      average_response_time,
      completed_at
    ) VALUES (
      session_uuid,
      participant_record.id,
      participant_record.display_name,
      total_score,
      correct_answers,
      total_questions,
      COALESCE(average_time, 0),
      NOW()
    )
    ON CONFLICT (session_id, participant_id) 
    DO UPDATE SET
      score = EXCLUDED.score,
      correct_answers = EXCLUDED.correct_answers,
      total_questions = EXCLUDED.total_questions,
      average_response_time = EXCLUDED.average_response_time,
      completed_at = EXCLUDED.completed_at;
    
    -- Return the result
    participant_name := participant_record.display_name;
    score := total_score;
    correct_answers := correct_answers;
    total_questions := total_questions;
    average_response_time := COALESCE(average_time, 0);
    
    RETURN NEXT;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Add RLS policy for the function
DROP POLICY IF EXISTS "Allow read access to results" ON live_quiz_results;
CREATE POLICY "Allow read access to results" ON live_quiz_results FOR SELECT USING (true);
