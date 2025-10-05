-- Simple check for results table
-- This will show us what's actually in the database

-- 1. Check if live_quiz_results table exists
SELECT 'Table exists check:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'live_quiz_results';

-- 2. If table exists, show its structure
SELECT 'Table structure:' as info;
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'live_quiz_results'
ORDER BY ordinal_position;

-- 3. Check if there are any results
SELECT 'Results count:' as info;
SELECT COUNT(*) as count FROM live_quiz_results;

-- 4. Show any existing results
SELECT 'Existing results:' as info;
SELECT * FROM live_quiz_results LIMIT 3;
