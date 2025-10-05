-- Check the CORRECT table: live_quiz_sessions
-- This is where the live quiz session codes are stored

-- 1. Check if live_quiz_sessions table exists and has data
SELECT 'Checking live_quiz_sessions table:' as info;
SELECT COUNT(*) as total_sessions FROM live_quiz_sessions;

-- 2. Show ALL live quiz sessions with their codes
SELECT 'ALL LIVE QUIZ SESSIONS:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  status,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC;

-- 3. Count sessions by code length
SELECT 'Live quiz sessions by code length:' as info;
SELECT 
  LENGTH(session_code) as code_length,
  COUNT(*) as count
FROM live_quiz_sessions 
GROUP BY LENGTH(session_code)
ORDER BY code_length;

-- 4. Show sessions with 10-character codes
SELECT 'Live quiz sessions with 10-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) = 10
ORDER BY created_at DESC;

-- 5. Show sessions with 8-character codes
SELECT 'Live quiz sessions with 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) = 8
ORDER BY created_at DESC;
