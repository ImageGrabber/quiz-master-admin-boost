-- NUCLEAR OPTION: Completely disable session code generation
-- This will force the database to accept whatever the app sends

-- 1. Check what triggers are still active
SELECT 'Active triggers:' as info, trigger_name, event_manipulation, action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. Force drop the trigger with CASCADE
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;

-- 3. Drop the function completely
DROP FUNCTION IF EXISTS set_session_code() CASCADE;

-- 4. Drop the generate_session_code function too
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 5. Verify everything is gone
SELECT 'Triggers after nuclear option:' as info, trigger_name
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 6. Test that we can insert with custom codes
SELECT 'Testing custom 8-character insertion:' as info;

INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234',
  'Nuclear Test Session',
  'waiting',
  0
FROM user_created_quizzes ucq
LIMIT 1
ON CONFLICT (session_code) DO NOTHING
RETURNING session_code, LENGTH(session_code) as code_length;

-- 7. Clean up test
DELETE FROM live_quiz_sessions WHERE session_code = 'TEST1234';

-- 8. Check if there are any other functions that might be interfering
SELECT 'All functions that mention session_code:' as info, routine_name
FROM information_schema.routines 
WHERE routine_definition ILIKE '%session_code%'
AND routine_schema = 'public';

-- 9. Final status
SELECT 'Nuclear option complete. All triggers and functions removed.' as result;
