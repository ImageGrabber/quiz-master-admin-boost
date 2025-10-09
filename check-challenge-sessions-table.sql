-- Check if challenge_sessions table exists and has the right structure

-- 1. Check if challenge_sessions table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_sessions') 
    THEN 'challenge_sessions table EXISTS'
    ELSE 'challenge_sessions table MISSING'
  END as table_status;

-- 2. Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if there are any challenge sessions
SELECT COUNT(*) as total_sessions FROM challenge_sessions;

-- 4. Check recent challenge sessions
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  status,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC 
LIMIT 5;

-- 5. Check if there are any challenge requests
SELECT COUNT(*) as total_requests FROM challenge_requests;

-- 6. Check recent challenge requests
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
