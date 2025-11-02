-- After creating the feedback table, you need to regenerate TypeScript types
-- Run this in Supabase SQL Editor, then run the type generation command

-- Verify the feedback table exists and is accessible
SELECT 
  table_name,
  table_schema
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'feedback';

-- Check if table is accessible via REST API
-- The table should automatically be available via PostgREST if it's in the public schema
-- If you still get 404, make sure:
-- 1. The table is in the 'public' schema
-- 2. RLS policies allow the operation
-- 3. The Supabase project URL and keys are correct in your .env file

