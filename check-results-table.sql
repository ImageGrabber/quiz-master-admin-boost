-- Check the actual structure of live_quiz_results table
-- This will show us what columns actually exist

-- 1. Check the table structure
SELECT 'live_quiz_results table structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'live_quiz_results'
ORDER BY ordinal_position;

-- 2. Check if the table exists and has any data
SELECT 'live_quiz_results data:' as info;
SELECT COUNT(*) as total_results FROM live_quiz_results;

-- 3. Show sample data if any exists
SELECT 'Sample results data:' as info;
SELECT * FROM live_quiz_results LIMIT 5;
