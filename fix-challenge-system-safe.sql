-- Safe fix for challenge system issues
-- This version handles existing real-time subscriptions gracefully

-- 1. First, check if the migration has been run
SELECT 'Checking if challenge system tables exist...' as status;

-- Check if tables exist
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'online_users') 
    THEN 'online_users table exists'
    ELSE 'online_users table MISSING - run the migration first!'
  END as online_users_status;

SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table exists'
    ELSE 'challenge_requests table MISSING - run the migration first!'
  END as challenge_requests_status;

-- 2. Fix the update_user_online_status function
-- Drop and recreate the function with the correct column reference
DROP FUNCTION IF EXISTS update_user_online_status(UUID, VARCHAR(255), BOOLEAN, VARCHAR(50));

CREATE OR REPLACE FUNCTION update_user_online_status(
  p_user_id UUID,
  p_display_name VARCHAR(255),
  p_is_available BOOLEAN DEFAULT true,
  p_activity VARCHAR(50) DEFAULT 'idle'
)
RETURNS void AS $$
BEGIN
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES (p_user_id, p_display_name, p_is_available, p_activity, NOW())
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    display_name = EXCLUDED.display_name,
    is_available = EXCLUDED.is_available,
    current_activity = EXCLUDED.current_activity,
    last_seen = NOW();
END;
$$ LANGUAGE plpgsql;

SELECT 'update_user_online_status function created/updated successfully' as function_status;

-- 3. Check current real-time status
SELECT 'Checking current real-time subscriptions...' as status;

SELECT 
  schemaname,
  tablename,
  'Already enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results');

-- 4. Enable real-time for tables that aren't already enabled
-- Use a DO block to handle errors gracefully
DO $$
DECLARE
  table_name TEXT;
  tables_to_check TEXT[] := ARRAY['online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results'];
BEGIN
  FOREACH table_name IN ARRAY tables_to_check
  LOOP
    -- Check if table exists first
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = table_name) THEN
      -- Try to add to real-time publication
      BEGIN
        EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE %I', table_name);
        RAISE NOTICE 'Real-time enabled for %', table_name;
      EXCEPTION
        WHEN duplicate_object THEN
          RAISE NOTICE 'Real-time already enabled for %', table_name;
        WHEN OTHERS THEN
          RAISE NOTICE 'Could not enable real-time for %: %', table_name, SQLERRM;
      END;
    ELSE
      RAISE NOTICE 'Table % does not exist, skipping', table_name;
    END IF;
  END LOOP;
END $$;

-- 5. Final verification
SELECT 'Final verification of real-time subscriptions...' as status;

SELECT 
  schemaname,
  tablename,
  'Real-time enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results')
ORDER BY tablename;

SELECT 'Challenge system setup complete!' as result;
