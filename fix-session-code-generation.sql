-- Fix session code generation issues
-- This script addresses the session code generation problems

-- 1. Check current trigger status
SELECT 'Current trigger status:' as info;
SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing, 
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. Check current function status
SELECT 'Current function status:' as info;
SELECT 
  routine_name,
  routine_definition
FROM information_schema.routines 
WHERE routine_name IN ('generate_session_code', 'set_session_code');

-- 3. Drop all existing triggers and functions to start fresh
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 4. Create a new session code generation function
CREATE OR REPLACE FUNCTION generate_session_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
  attempts INTEGER := 0;
BEGIN
  LOOP
    attempts := attempts + 1;
    -- Generate exactly 8 characters using a more reliable method
    code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM live_quiz_sessions WHERE session_code = code) INTO exists;
    
    -- Exit if code is unique or we've tried too many times
    EXIT WHEN NOT exists OR attempts > 100;
  END LOOP;
  
  -- If we couldn't generate a unique code, use timestamp-based approach
  IF exists THEN
    code := upper(substring(md5(extract(epoch from now())::text) from 1 for 8));
  END IF;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- 5. Create the trigger function
CREATE OR REPLACE FUNCTION set_session_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set session_code if it's null or empty
  IF NEW.session_code IS NULL OR NEW.session_code = '' THEN
    NEW.session_code := generate_session_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Create the trigger
CREATE TRIGGER trigger_set_session_code
  BEFORE INSERT ON live_quiz_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_session_code();

-- 7. Test the function
SELECT 'Testing session code generation:' as info;
SELECT 
  generate_session_code() as test_code_1,
  LENGTH(generate_session_code()) as length_1,
  generate_session_code() as test_code_2,
  LENGTH(generate_session_code()) as length_2;

-- 8. Check for any existing sessions with invalid codes
SELECT 'Sessions with invalid codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) != 8 OR session_code IS NULL;

-- 9. Fix any existing sessions with invalid codes
UPDATE live_quiz_sessions 
SET session_code = generate_session_code()
WHERE LENGTH(session_code) != 8 OR session_code IS NULL;

-- 10. Verify the fix
SELECT 'Verification - all sessions should have 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 11. Test creating a new session
SELECT 'Testing new session creation:' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'Test Session',
  'waiting',
  1
RETURNING session_code, LENGTH(session_code) as code_length;

-- 12. Clean up test session
DELETE FROM live_quiz_sessions WHERE title = 'Test Session';

-- 13. Final status
SELECT 'Session code generation fix complete!' as result;
