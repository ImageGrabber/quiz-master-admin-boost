-- Disable the database trigger for session code generation
-- Let the application code handle session code generation instead

-- 1. Drop the trigger so the app can control session code generation
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions;

-- 2. Keep the function for potential future use, but don't use it in triggers
-- (We'll let the application code handle this)

-- 3. Verify the trigger is removed
SELECT 'Trigger status after removal:' as info;

SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing, 
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'trigger_set_session_code';

-- 4. Test that we can insert sessions with custom session codes
-- This will verify that the app can now control session code generation
SELECT 'Testing custom session code insertion:' as info;

-- Test inserting a session with a custom 8-character code
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234',
  'Test Session with Custom Code',
  'waiting',
  0
FROM user_created_quizzes ucq
WHERE ucq.share_code = 'WORK123'
LIMIT 1
ON CONFLICT (session_code) DO NOTHING
RETURNING session_code, LENGTH(session_code) as code_length;

-- 5. Clean up the test session
DELETE FROM live_quiz_sessions WHERE session_code = 'TEST1234';

-- 6. Show that the trigger is no longer interfering
SELECT 'Trigger removed successfully. App can now control session code generation.' as result;
