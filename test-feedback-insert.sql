-- Test script to verify feedback table and RLS policies work correctly
-- Run this in Supabase SQL Editor to test

-- 1. Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'feedback';

-- 2. Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'feedback'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'feedback';

-- 4. Test insert as anonymous user (simulates public insert)
-- This should work if RLS is configured correctly
INSERT INTO feedback (name, place, feedback)
VALUES ('Test User', 'Test Place', 'This is a test feedback submission')
RETURNING *;

-- 5. Verify the insert worked
SELECT * FROM feedback ORDER BY created_at DESC LIMIT 5;

-- 6. Clean up test data (optional)
-- DELETE FROM feedback WHERE name = 'Test User' AND place = 'Test Place';

