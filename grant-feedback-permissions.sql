-- Grant permissions to ensure REST API can access feedback table
-- Run this after creating the feedback table

-- 1. Grant usage on schema (if not already granted)
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 2. Grant select, insert, update, delete on feedback table
GRANT SELECT, INSERT, UPDATE, DELETE ON feedback TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON feedback TO authenticated;

-- 3. Grant usage on sequence (for id generation)
-- Feedback table uses gen_random_uuid() so no sequence needed, but good to check
SELECT column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'feedback' 
AND column_name = 'id';

-- 4. Refresh PostgREST schema cache (this might require Supabase to do it automatically)
-- PostgREST should auto-detect new tables, but sometimes needs a moment
-- If still not working, try restarting your Supabase project or wait a few minutes

-- 5. Verify permissions
SELECT 
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
AND table_name = 'feedback';

-- Success message
SELECT 'Feedback table permissions granted! REST API should now have access.' as result;

