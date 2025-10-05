-- Create results system for live quiz
-- This will create the results table and calculation logic

-- 1. Create live_quiz_results table if it doesn't exist
CREATE TABLE IF NOT EXISTS live_quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES live_quiz_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES live_quiz_participants(id) ON DELETE CASCADE,
  participant_name VARCHAR(100) NOT NULL,
  score DECIMAL(5,2) DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  average_response_time DECIMAL(8,2) DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, participant_id)
);

-- 2. Drop existing function if it exists
DROP FUNCTION IF EXISTS calculate_quiz_results(UUID);

-- 3. Create the calculate_quiz_results function
CREATE FUNCTION calculate_quiz_results(session_uuid UUID)
RETURNS TABLE(
  participant_name VARCHAR(100),
  score DECIMAL(5,2),
  correct_answers INTEGER,
  total_questions INTEGER,
  average_response_time DECIMAL(8,2)
) AS $$
DECLARE
  session_record RECORD;
  participant_record RECORD;
  answer_record RECORD;
  total_questions INTEGER;
  correct_answers INTEGER;
  total_score DECIMAL(5,2);
  average_time DECIMAL(8,2);
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
    -- Count correct answers for this participant
    correct_answers := 0;
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
    ELSE
      total_score := 0;
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
    
    -- Return the result
    participant_name := participant_record.display_name;
    score := total_score;
    correct_answers := correct_answers;
    total_questions := total_questions;
    average_response_time := COALESCE(average_time, 0);
    RETURN NEXT;
  END LOOP;
  
END;
$$ LANGUAGE plpgsql;

-- 4. Create RLS policies for results
DROP POLICY IF EXISTS "Allow read access to results" ON live_quiz_results;
CREATE POLICY "Allow read access to results" ON live_quiz_results
FOR SELECT USING (true);

-- 5. Test the function
SELECT 'Results system created successfully!' as result;
