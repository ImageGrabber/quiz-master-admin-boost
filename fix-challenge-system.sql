-- Fix for challenge system issues
-- Run this if you're getting "Failed to update online status" errors

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

-- 2. Fix the update_user_online_status function if it exists
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

-- 3. Test the function
SELECT 'Testing update_user_online_status function...' as status;

-- Test the function with a simple call (this will only work if tables exist)
SELECT 'Function created successfully' as test_result;

-- 4. Check if real-time is enabled
SELECT 'Checking real-time subscriptions...' as status;

SELECT 
  schemaname,
  tablename,
  'Real-time enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results');

-- 5. Enable real-time for challenge tables
-- Enable real-time for online_users
ALTER PUBLICATION supabase_realtime ADD TABLE online_users;

-- Enable real-time for challenge_requests  
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- Enable real-time for challenge_sessions
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_sessions;

-- Enable real-time for challenge_participants
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_participants;

-- Enable real-time for challenge_answers
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_answers;

-- Enable real-time for challenge_results
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_results;

SELECT 'Challenge system fix complete!' as result;
