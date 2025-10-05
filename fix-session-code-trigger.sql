-- Fix the session code generation to ensure 8-character codes
-- The trigger might not be working properly

-- 1. First, let's check if the trigger exists and is working
SELECT 'Current trigger status:' as info;

SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing, 
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'trigger_set_session_code';

-- 2. Check the current session code generation function
SELECT 'Current function:' as info;

SELECT routine_definition 
FROM information_schema.routines 
WHERE routine_name = 'generate_session_code';

-- 3. Drop and recreate the session code generation function to ensure it's 8 characters
DROP FUNCTION IF EXISTS generate_session_code();

CREATE OR REPLACE FUNCTION generate_session_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate exactly 8 characters
    code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM live_quiz_sessions WHERE session_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 4. Drop and recreate the trigger to ensure it works
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions;

CREATE OR REPLACE FUNCTION set_session_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Always generate a new 8-character code
  NEW.session_code := generate_session_code();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_session_code
  BEFORE INSERT ON live_quiz_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_session_code();

-- 5. Test the function
SELECT 'Testing function:' as info, generate_session_code() as test_code, LENGTH(generate_session_code()) as code_length;

-- 6. Check existing sessions with long codes
SELECT 'Sessions with long codes:' as info, session_code, LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE LENGTH(session_code) > 8;

-- 7. Update existing sessions with long codes to use 8-character codes
UPDATE live_quiz_sessions 
SET session_code = upper(substring(md5(random()::text) from 1 for 8))
WHERE LENGTH(session_code) > 8;

-- 8. Verify the fix
SELECT 'After fix - session codes:' as info, session_code, LENGTH(session_code) as code_length
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 5;

-- 9. Test creating a new session to verify the trigger works
-- This will create a test session to verify the trigger is working
INSERT INTO live_quiz_sessions (quiz_id, host_id, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'Test Session for Code Generation',
  'waiting',
  0
FROM user_created_quizzes ucq
WHERE ucq.share_code = 'WORK123'
LIMIT 1
RETURNING session_code, LENGTH(session_code) as code_length;
