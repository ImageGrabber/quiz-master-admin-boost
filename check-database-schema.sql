-- Check the current database schema to see what's causing the UUID error

-- 1. Check challenge_requests table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_requests' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if there are any UUID fields that shouldn't be there
SELECT 
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'challenge_requests' 
AND data_type = 'uuid'
AND table_schema = 'public';

-- 3. Check quizzes table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'quizzes' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check if there are any foreign key constraints
SELECT 
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'challenge_requests';
