-- Update TypeScript types after adding requires_login columns
-- This script will help regenerate types

-- 1. Verify the new columns exist
SELECT 'Verifying new columns exist:' as info;
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name IN ('user_created_quizzes', 'live_quiz_sessions', 'live_quiz_participants')
AND column_name IN ('requires_login', 'display_name')
ORDER BY table_name, column_name;

-- 2. Check if user_id is nullable in live_quiz_participants
SELECT 'Checking user_id nullable status:' as info;
SELECT 
  column_name,
  is_nullable,
  data_type
FROM information_schema.columns 
WHERE table_name = 'live_quiz_participants' 
AND column_name = 'user_id';

-- 3. Show sample data to verify the changes
SELECT 'Sample user_created_quizzes with requires_login:' as info;
SELECT 
  id,
  title,
  is_public,
  requires_login,
  created_at
FROM user_created_quizzes 
ORDER BY created_at DESC
LIMIT 5;

SELECT 'Sample live_quiz_sessions with requires_login:' as info;
SELECT 
  id,
  session_code,
  title,
  requires_login,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 5;

SELECT 'Types update verification complete!' as result;
