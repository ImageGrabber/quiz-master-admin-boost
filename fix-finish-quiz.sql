-- Fix the finish quiz functionality
-- This will create the missing calculate_quiz_results function

-- 1. Check if the function exists
SELECT 'Checking if calculate_quiz_results function exists:' as info;
SELECT 
  routine_name,
  routine_type,
  routine_definition
FROM information_schema.routines 
WHERE routine_name = 'calculate_quiz_results';

-- 2. Create the calculate_quiz_results function if it doesn't exist
CREATE OR REPLACE FUNCTION calculate_quiz_results(session_uuid UUID)
RETURNS VOID AS $$
DECLARE
  session_record RECORD;
  participant_record RECORD;
  question_record RECORD;
  answer_record RECORD;
  total_questions INTEGER;
  correct_answers INTEGER;
  total_score DECIMAL;
  average_time DECIMAL;
BEGIN
  -- Get session details
  SELECT * INTO session_record FROM live_quiz_sessions WHERE id = session_uuid;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found: %', session_uuid;
  END IF;
  
  -- Get total questions
  total_questions := session_record.total_questions;
  
  -- Process each participant
  FOR participant_record IN 
    SELECT * FROM live_quiz_participants WHERE session_id = session_uuid
  LOOP
    -- Count correct answers for this participant
    correct_answers := 0;
    total_score := 0;
    average_time := 0;
    
    -- Count correct answers
    FOR answer_record IN 
      SELECT lqa.*, uqq.correct_index
    FROM live_quiz_answers lqa
    JOIN user_quiz_questions uqq ON uqq.id = lqa.question_id
    WHERE lqa.participant_id = participant_record.id
    LOOP
      IF answer_record.answer_index = answer_record.correct_index THEN
        correct_answers := correct_answers + 1;
      END IF;
    END LOOP;
    
    -- Calculate score percentage
    IF total_questions > 0 THEN
      total_score := (correct_answers::DECIMAL / total_questions::DECIMAL) * 100;
    END IF;
    
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
      
  END LOOP;
  
END;
$$ LANGUAGE plpgsql;

-- 3. Test the function
SELECT 'Function created successfully!' as result;

-- 4. Check if live_quiz_results table exists
SELECT 'Checking live_quiz_results table:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'live_quiz_results'
ORDER BY ordinal_position;
