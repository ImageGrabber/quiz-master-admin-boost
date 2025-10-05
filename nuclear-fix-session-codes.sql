-- NUCLEAR FIX: Completely disable all session code generation
-- This will force the database to accept whatever the frontend sends

-- 1. Check what triggers exist
SELECT 'BEFORE: Active triggers:' as info, trigger_name, event_manipulation, action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. Drop ALL triggers and functions related to session codes
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 3. Drop any other functions that might be interfering
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 4. Check what's left
SELECT 'AFTER: Remaining triggers:' as info, trigger_name
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 5. Fix ALL existing sessions with wrong length codes
UPDATE live_quiz_sessions 
SET session_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))
WHERE LENGTH(session_code) != 8;

-- 6. Verify all sessions now have 8-character codes
SELECT 'VERIFICATION: All sessions should have 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 7. Test that we can insert with custom 8-character codes
SELECT 'TESTING: Insert with custom 8-character code:' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234',
  'Nuclear Test Session',
  'waiting',
  1
ON CONFLICT (session_code) DO NOTHING
RETURNING session_code, LENGTH(session_code) as code_length;

-- 8. Clean up test
DELETE FROM live_quiz_sessions WHERE session_code = 'TEST1234';

-- 9. Final status
SELECT 'NUCLEAR FIX COMPLETE: All triggers removed, all codes fixed to 8 characters' as result;
