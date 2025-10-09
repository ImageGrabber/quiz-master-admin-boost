-- DIAGNOSE CHALLENGE SESSION ISSUE
-- Run these queries to identify why session a4923e30-993e-4fab-b56f-7aede182dce1 is not found

-- 1. Check if challenge_sessions table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_sessions') 
    THEN 'challenge_sessions table EXISTS'
    ELSE 'challenge_sessions table MISSING - THIS IS THE PROBLEM!'
  END as table_status;

-- 2. Check table structure if it exists
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if the specific session exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = 'a4923e30-993e-4fab-b56f-7aede182dce1')
    THEN 'Session EXISTS in database'
    ELSE 'Session NOT FOUND in database'
  END as session_status;

-- 4. Check all challenge sessions (if table exists)
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  challenger_id,
  challenged_id,
  status,
  total_questions,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC 
LIMIT 10;

-- 5. Check challenge_requests table
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table EXISTS'
    ELSE 'challenge_requests table MISSING'
  END as requests_table_status;

-- 6. Check challenge_requests data
SELECT 
  id,
  challenger_id,
  challenged_id,
  quiz_id,
  status,
  created_at
FROM challenge_requests 
ORDER BY created_at DESC 
LIMIT 5;

-- 7. Check RLS policies on challenge_sessions
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'challenge_sessions';

-- 8. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  forcerowsecurity
FROM pg_tables 
WHERE tablename = 'challenge_sessions';

-- 9. Check online_users table
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'online_users') 
    THEN 'online_users table EXISTS'
    ELSE 'online_users table MISSING'
  END as online_users_status;

-- 10. Check quiz_questions table (needed for challenge sessions)
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'quiz_questions') 
    THEN 'quiz_questions table EXISTS'
    ELSE 'quiz_questions table MISSING'
  END as quiz_questions_status;

-- 11. Check user_created_quizzes table
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_created_quizzes') 
    THEN 'user_created_quizzes table EXISTS'
    ELSE 'user_created_quizzes table MISSING'
  END as user_quizzes_status;

-- 12. Check for any recent errors in logs (if available)
SELECT 'Check application logs for database connection errors' as log_check;

-- 13. Test database connection
SELECT 'Database connection test: ' || NOW() as connection_test;

-- 14. Check if the session ID format is valid UUID
SELECT 
  CASE 
    WHEN 'a4923e30-993e-4fab-b56f-7aede182dce1'::uuid IS NOT NULL
    THEN 'Session ID is valid UUID format'
    ELSE 'Session ID is NOT valid UUID format'
  END as uuid_validation;
