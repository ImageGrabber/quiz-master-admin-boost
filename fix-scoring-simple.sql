-- Simple fix for scoring system
-- This ensures results are calculated properly

-- Drop existing function
DROP FUNCTION IF EXISTS calculate_quiz_results(UUID);

-- Create a simpler version that works
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
  question_score DECIMAL(5,2);
  time_bonus DECIMAL(5,2);
  max_time INTEGER := 30000; -- 30 seconds in milliseconds
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
      -- Base score: 10 points for correct answer
      IF answer_record.answer_index = answer_record.correct_index THEN
        correct_answers := correct_answers + 1;
        question_score := 10.0;
        
        -- Time bonus: faster answers get more points
        -- Calculate bonus based on response time (0-10 bonus points)
        time_bonus := GREATEST(0, (max_time - answer_record.response_time) / max_time * 10);
        
        total_score := total_score + question_score + time_bonus;
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
