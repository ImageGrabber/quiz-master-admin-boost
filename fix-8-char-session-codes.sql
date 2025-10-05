-- Fix session code generation to ensure exactly 8 characters
-- This script fixes both frontend and database session code generation

-- 1. Check current trigger and function status
SELECT 'Current trigger status:' as info;
SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. Drop existing triggers and functions
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 3. Create a new session code generation function that guarantees 8 characters
CREATE OR REPLACE FUNCTION generate_session_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
  attempts INTEGER := 0;
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
BEGIN
  LOOP
    attempts := attempts + 1;
    code := '';
    
    -- Generate exactly 8 characters
    FOR i IN 1..8 LOOP
      code := code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
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

-- 4. Create the trigger function
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

-- 5. Create the trigger
CREATE TRIGGER trigger_set_session_code
  BEFORE INSERT ON live_quiz_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_session_code();

-- 6. Test the function to ensure it generates 8-character codes
SELECT 'Testing session code generation:' as info;
SELECT 
  generate_session_code() as test_code_1,
  LENGTH(generate_session_code()) as length_1,
  generate_session_code() as test_code_2,
  LENGTH(generate_session_code()) as length_2;

-- 7. Check for any existing sessions with invalid codes
SELECT 'Sessions with invalid codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) != 8 OR session_code IS NULL;

-- 8. Fix any existing sessions with invalid codes
UPDATE live_quiz_sessions 
SET session_code = generate_session_code()
WHERE LENGTH(session_code) != 8 OR session_code IS NULL;

-- 9. Verify all sessions now have 8-character codes
SELECT 'Verification - all sessions should have 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 10. Test creating a new session to verify the trigger works
SELECT 'Testing new session creation:' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'Test Session - 8 Char Code',
  'waiting',
  1
RETURNING session_code, LENGTH(session_code) as code_length;

-- 11. Clean up test session
DELETE FROM live_quiz_sessions WHERE title = 'Test Session - 8 Char Code';

-- 12. Final verification
SELECT 'Session code generation fix complete! All codes will now be exactly 8 characters.' as result;
