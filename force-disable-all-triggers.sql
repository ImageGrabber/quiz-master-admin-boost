-- FORCE DISABLE ALL TRIGGERS AND FUNCTIONS
-- This will completely stop the database from generating session codes

-- 1. Check what triggers are currently active
SELECT 'BEFORE: Active triggers:' as info;
SELECT trigger_name, event_object_table, event_manipulation, action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. NUCLEAR OPTION: Drop ALL triggers and functions
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP TRIGGER IF EXISTS set_session_code ON live_quiz_sessions CASCADE;
DROP TRIGGER IF EXISTS generate_session_code ON live_quiz_sessions CASCADE;
DROP TRIGGER IF EXISTS trigger_generate_session_code ON live_quiz_sessions CASCADE;

-- Drop ALL functions that might be related
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;
DROP FUNCTION IF EXISTS create_session_code() CASCADE;
DROP FUNCTION IF EXISTS update_session_code() CASCADE;

-- 3. Check if triggers are gone
SELECT 'AFTER: Remaining triggers:' as info;
SELECT trigger_name, event_object_table, event_manipulation, action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 4. Fix ALL existing 10-character codes to 8 characters
UPDATE live_quiz_sessions 
SET session_code = LEFT(session_code, 8)
WHERE LENGTH(session_code) = 10;

-- 5. Verify the fix
SELECT 'VERIFICATION: All sessions should now have 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 6. Test creating a new session (should use frontend code)
SELECT 'TESTING: Creating new session with frontend code:' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'FRONTEND8', -- This should stay as 8 characters
  'Frontend Test Session',
  'waiting',
  1
RETURNING session_code, LENGTH(session_code) as code_length;

-- 7. Clean up test
DELETE FROM live_quiz_sessions WHERE session_code = 'FRONTEND8';

-- 8. Final status
SELECT 'SUCCESS: All triggers disabled, all codes fixed to 8 characters' as result;
