-- BASIC DIAGNOSTIC - Check if challenge_sessions table exists at all

-- 1. Check if the table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_sessions') 
    THEN 'challenge_sessions table EXISTS'
    ELSE 'challenge_sessions table DOES NOT EXIST'
  END as table_exists;

-- 2. If table exists, show its structure
SELECT 
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Count total sessions
SELECT COUNT(*) as total_sessions FROM challenge_sessions;

-- 4. Show all sessions (if any exist)
SELECT 
  id,
  status,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC 
LIMIT 5;

-- 5. Check if our specific session exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
    THEN 'Target session EXISTS'
    ELSE 'Target session NOT FOUND'
  END as target_session_status;
