-- Force 8-character session codes by updating the database schema
-- This will ensure all session codes are exactly 8 characters

-- 1. First, let's see what's happening with the current session
SELECT 'Current problematic session:' as info, session_code, LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'C6D8A606E2';

-- 2. Check the current column definition
SELECT 'Current column definition:' as info, 
  column_name, 
  data_type, 
  character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'live_quiz_sessions' 
AND column_name = 'session_code';

-- 3. Update the column to enforce 8-character limit
ALTER TABLE live_quiz_sessions 
ALTER COLUMN session_code TYPE VARCHAR(8);

-- 4. Drop and recreate the function to be absolutely sure
DROP FUNCTION IF EXISTS generate_session_code();

CREATE OR REPLACE FUNCTION generate_session_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate exactly 8 characters, no more, no less
    code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM live_quiz_sessions WHERE session_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 5. Drop and recreate the trigger
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions;

CREATE OR REPLACE FUNCTION set_session_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Force 8-character code generation
  NEW.session_code := generate_session_code();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_session_code
  BEFORE INSERT ON live_quiz_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_session_code();

-- 6. Fix existing sessions with long codes
UPDATE live_quiz_sessions 
SET session_code = upper(substring(md5(random()::text) from 1 for 8))
WHERE LENGTH(session_code) > 8;

-- 7. Test the function multiple times to ensure it works
SELECT 'Testing function (5 times):' as info;
SELECT generate_session_code() as test_code, LENGTH(generate_session_code()) as code_length
FROM generate_series(1, 5);

-- 8. Verify all existing sessions now have 8-character codes
SELECT 'All session codes after fix:' as info, session_code, LENGTH(session_code) as code_length
FROM live_quiz_sessions 
ORDER BY created_at DESC;

-- 9. Test inserting a new session to verify the trigger works
-- Create a test session to verify the trigger is working properly
DO $$
DECLARE
    test_quiz_id UUID;
    new_session_code TEXT;
BEGIN
    -- Get a quiz ID to test with
    SELECT id INTO test_quiz_id FROM user_created_quizzes LIMIT 1;
    
    -- Insert a test session
    INSERT INTO live_quiz_sessions (quiz_id, host_id, title, status, total_questions)
    VALUES (test_quiz_id, (SELECT id FROM auth.users LIMIT 1), 'Test Session', 'waiting', 0)
    RETURNING session_code INTO new_session_code;
    
    RAISE NOTICE 'Test session created with code: % (length: %)', new_session_code, LENGTH(new_session_code);
    
    -- Clean up the test session
    DELETE FROM live_quiz_sessions WHERE session_code = new_session_code;
END $$;
