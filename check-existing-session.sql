-- CHECK EXISTING CHALLENGE SESSION
-- The session already exists, let's verify it and check why frontend can't load it

-- 1. Check if the session exists and get its details
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  challenger_id,
  challenged_id,
  status,
  total_questions,
  time_limit,
  started_at,
  ended_at,
  created_at
FROM challenge_sessions 
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 2. Check if there are any RLS policies blocking access
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'challenge_sessions';

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'challenge_sessions';

-- 4. Test direct access to the session (simulate what frontend does)
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
    THEN 'Session EXISTS - Frontend should be able to load it'
    ELSE 'Session NOT FOUND - Database issue'
  END as session_availability;

-- 5. Check if there are any foreign key issues
SELECT 
  'challenge_sessions table structure:' as info;
  
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Check if the challenge_request exists
SELECT 
  cr.id,
  cr.challenger_id,
  cr.challenged_id,
  cr.quiz_id,
  cr.status,
  cr.created_at
FROM challenge_requests cr
JOIN challenge_sessions cs ON cr.id = cs.challenge_request_id
WHERE cs.id = '563b49b8-69a3-465e-9a61-1995241da7e3';

SELECT 'Session verification completed!' as result;
