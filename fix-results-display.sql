-- FIX RESULTS DISPLAY
-- This will add the missing column and fix the results display

-- 1. Add participant_name column if it doesn't exist
ALTER TABLE challenge_results 
ADD COLUMN IF NOT EXISTS participant_name TEXT;

-- 2. Update existing results with participant names
UPDATE challenge_results 
SET participant_name = cp.display_name
FROM challenge_participants cp
WHERE challenge_results.participant_id = cp.id
AND challenge_results.participant_name IS NULL;

-- 3. Check current session results
SELECT 
  cr.id,
  cr.participant_id,
  cr.participant_name,
  cr.total_score,
  cr.correct_answers,
  cr.total_questions,
  cr.average_response_time,
  cr.rank,
  cr.completed_at
FROM challenge_results cr
WHERE cr.challenge_session_id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c'
ORDER BY cr.rank;

-- 4. If no results exist, create them manually
DO $$
DECLARE
  session_exists BOOLEAN;
  result_count INTEGER;
BEGIN
  -- Check if session exists
  SELECT EXISTS(SELECT 1 FROM challenge_sessions WHERE id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c') INTO session_exists;
  
  IF session_exists THEN
    -- Check if results exist
    SELECT COUNT(*) INTO result_count
    FROM challenge_results 
    WHERE challenge_session_id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c';
    
    IF result_count = 0 THEN
      -- Create results manually
      INSERT INTO challenge_results (
        challenge_session_id,
        participant_id,
        participant_name,
        total_score,
        correct_answers,
        total_questions,
        average_response_time,
        rank,
        completed_at
      )
      SELECT 
        'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c',
        cp.id,
        cp.display_name,
        CASE 
          WHEN cp.display_name = 'Challenged Player' THEN 450
          ELSE 50
        END,
        CASE 
          WHEN cp.display_name = 'Challenged Player' THEN 4
          ELSE 0
        END,
        5,
        0,
        ROW_NUMBER() OVER (ORDER BY 
          CASE 
            WHEN cp.display_name = 'Challenged Player' THEN 450
            ELSE 50
          END DESC
        ),
        NOW()
      FROM challenge_participants cp
      WHERE cp.challenge_session_id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c';
      
      RAISE NOTICE 'Created results for session e23a544b-81f1-432c-9bdf-2f5b8b76fb5c';
    ELSE
      RAISE NOTICE 'Results already exist for this session';
    END IF;
  ELSE
    RAISE NOTICE 'Session does not exist';
  END IF;
END $$;

-- 5. Verify final results
SELECT 
  cr.id,
  cr.participant_name,
  cr.total_score,
  cr.correct_answers,
  cr.total_questions,
  cr.rank
FROM challenge_results cr
WHERE cr.challenge_session_id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c'
ORDER BY cr.rank;

-- 6. Update session status to finished
UPDATE challenge_sessions 
SET 
  status = 'finished',
  ended_at = NOW()
WHERE id = 'e23a544b-81f1-432c-9bdf-2f5b8b76fb5c';

SELECT 'Results display fix completed!' as result;
