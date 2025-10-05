-- FORCE FIX: Ensure session codes are exactly 8 characters
-- This script will completely disable the database trigger and let the frontend handle it

-- 1. Check current trigger status
SELECT 'Current trigger status:' as info;
SELECT 
  trigger_name, 
  event_manipulation, 
  action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 2. NUCLEAR OPTION: Completely disable the trigger
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;

-- 3. Verify the trigger is gone
SELECT 'Triggers after removal:' as info;
SELECT 
  trigger_name
FROM information_schema.triggers 
WHERE event_object_table = 'live_quiz_sessions';

-- 4. Check for any existing sessions with 10-character codes
SELECT 'Sessions with 10-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) = 10;

-- 5. Fix existing 10-character codes by truncating them to 8 characters
UPDATE live_quiz_sessions 
SET session_code = LEFT(session_code, 8)
WHERE LENGTH(session_code) = 10;

-- 6. Check for any other invalid codes
SELECT 'All sessions with invalid codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) != 8;

-- 7. Fix any remaining invalid codes
UPDATE live_quiz_sessions 
SET session_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8))
WHERE LENGTH(session_code) != 8;

-- 8. Verify all sessions now have 8-character codes
SELECT 'Final verification - all sessions should have 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 10;

-- 9. Test creating a new session (should use frontend-generated code)
SELECT 'Testing new session creation (frontend will handle code generation):' as info;
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes LIMIT 1),
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234', -- Frontend will generate this
  'Test Session - Frontend Generated',
  'waiting',
  1
RETURNING session_code, LENGTH(session_code) as code_length;

-- 10. Clean up test session
DELETE FROM live_quiz_sessions WHERE title = 'Test Session - Frontend Generated';

-- 11. Final status
SELECT 'SUCCESS: Database trigger disabled. Frontend will now generate exactly 8-character codes.' as result;
