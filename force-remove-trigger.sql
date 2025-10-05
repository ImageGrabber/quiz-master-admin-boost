-- Force remove the session code trigger completely
-- This will ensure the app has full control over session code generation

-- 1. Check current trigger status
SELECT 'Current triggers on live_quiz_sessions:' as info;

SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing, 
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. Drop only the session code trigger (not share_code which is used by user_created_quizzes)
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions;

-- 3. Drop only the session code function
DROP FUNCTION IF EXISTS set_session_code();

-- 4. Verify triggers are completely removed
SELECT 'Triggers after removal:' as info;

SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing, 
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 5. Test inserting a session with a custom 8-character code
SELECT 'Testing custom 8-character code insertion:' as info;

-- Get a quiz ID to test with
WITH test_quiz AS (
  SELECT id FROM user_created_quizzes LIMIT 1
)
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  test_quiz.id,
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234',
  'Test Session - 8 Characters',
  'waiting',
  0
FROM test_quiz
ON CONFLICT (session_code) DO NOTHING
RETURNING session_code, LENGTH(session_code) as code_length;

-- 6. Clean up test session
DELETE FROM live_quiz_sessions WHERE session_code = 'TEST1234';

-- 7. Check if there are any other triggers or functions that might interfere
SELECT 'All functions that might affect session codes:' as info;

SELECT routine_name, routine_definition
FROM information_schema.routines 
WHERE routine_definition ILIKE '%session_code%'
AND routine_schema = 'public';

-- 8. Final verification
SELECT 'All triggers removed. App now has full control over session code generation.' as result;
