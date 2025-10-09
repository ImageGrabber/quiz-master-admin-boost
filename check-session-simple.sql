-- SIMPLE CHECK FOR CHALLENGE SESSION
-- First check what columns actually exist, then query the session

-- 1. Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if the session exists (using only basic columns)
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
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'challenge_sessions';

-- 4. Check for RLS policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'challenge_sessions';

SELECT 'Session check completed!' as result;
