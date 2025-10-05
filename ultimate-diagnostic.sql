-- ULTIMATE DIAGNOSTIC: Figure out why 10-character codes are still being generated
-- This will help us understand what's happening

-- 1. Check the database schema for session_code column
SELECT '1. Database schema for session_code column:' as info;
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'live_quiz_sessions' AND column_name = 'session_code';

-- 2. Check if there are ANY triggers still active
SELECT '2. All triggers on live_quiz_sessions:' as info;
SELECT 
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 3. Check if there are any functions that might be interfering
SELECT '3. All functions that mention session_code:' as info;
SELECT 
  routine_name,
  routine_type,
  routine_definition
FROM information_schema.routines 
WHERE routine_definition ILIKE '%session_code%'
AND routine_schema = 'public';

-- 4. Check the most recent sessions and their code lengths
SELECT '4. Recent sessions and their code lengths:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check if there are any constraints on the session_code column
SELECT '5. Constraints on session_code column:' as info;
SELECT 
  constraint_name,
  constraint_type,
  check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'live_quiz_sessions' AND tc.constraint_type = 'CHECK';

-- 6. Try to manually insert a session with an 8-character code
SELECT '6. Testing manual insertion with 8-character code:' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'MANUAL8', -- Exactly 8 characters
  'Manual Test Session',
  'waiting',
  1
ON CONFLICT (session_code) DO NOTHING
RETURNING session_code, LENGTH(session_code) as code_length;

-- 7. Clean up test
DELETE FROM live_quiz_sessions WHERE session_code = 'MANUAL8';

-- 8. Check if there are any other tables or views that might be involved
SELECT '8. All tables that might be related to sessions:' as info;
SELECT table_name, table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (table_name ILIKE '%session%' OR table_name ILIKE '%quiz%');

-- 9. Final summary
SELECT 'DIAGNOSTIC COMPLETE: Check the output above to identify the issue' as result;
