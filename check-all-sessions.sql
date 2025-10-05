-- Check ALL session codes in your database
-- This will show us the real situation with all your sessions

-- 1. Count total sessions
SELECT 'Total sessions in database:' as info, COUNT(*) as total_count
FROM live_quiz_sessions;

-- 2. Show ALL sessions with their code lengths
SELECT 'ALL SESSIONS AND THEIR CODE LENGTHS:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC;

-- 3. Count sessions by code length
SELECT 'Sessions by code length:' as info;
SELECT 
  LENGTH(session_code) as code_length,
  COUNT(*) as count
FROM live_quiz_sessions 
GROUP BY LENGTH(session_code)
ORDER BY code_length;

-- 4. Show sessions with 10-character codes specifically
SELECT 'Sessions with 10-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) = 10
ORDER BY created_at DESC;

-- 5. Show sessions with 8-character codes
SELECT 'Sessions with 8-character codes:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
WHERE LENGTH(session_code) = 8
ORDER BY created_at DESC;
