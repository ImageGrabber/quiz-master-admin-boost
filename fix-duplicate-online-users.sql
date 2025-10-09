-- Fix for duplicate online users issue
-- This script will clean up duplicates and fix the online status tracking

-- 1. First, let's see what we have
SELECT 'Current online users count:' as info;
SELECT COUNT(*) as total_entries, COUNT(DISTINCT user_id) as unique_users 
FROM online_users;

-- 2. Show duplicates
SELECT 'Duplicate entries:' as info;
SELECT user_id, display_name, COUNT(*) as duplicate_count
FROM online_users 
GROUP BY user_id, display_name 
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 3. Clean up duplicate entries (keep only the most recent one for each user)
WITH ranked_users AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY last_seen DESC) as rn
  FROM online_users
)
DELETE FROM online_users 
WHERE id IN (
  SELECT id FROM ranked_users WHERE rn > 1
);

-- 4. Add a unique constraint to prevent future duplicates
-- First, drop any existing constraint if it exists
ALTER TABLE online_users DROP CONSTRAINT IF EXISTS online_users_user_id_unique;

-- Add unique constraint on user_id
ALTER TABLE online_users ADD CONSTRAINT online_users_user_id_unique UNIQUE (user_id);

-- 5. Update the function to handle this better
DROP FUNCTION IF EXISTS update_user_online_status(UUID, VARCHAR(255), BOOLEAN, VARCHAR(50));

CREATE OR REPLACE FUNCTION update_user_online_status(
  p_user_id UUID,
  p_display_name VARCHAR(255),
  p_is_available BOOLEAN DEFAULT true,
  p_activity VARCHAR(50) DEFAULT 'idle'
)
RETURNS void AS $$
BEGIN
  -- First, clean up any old entries for this user
  DELETE FROM online_users WHERE user_id = p_user_id;
  
  -- Then insert the new entry
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES (p_user_id, p_display_name, p_is_available, p_activity, NOW());
END;
$$ LANGUAGE plpgsql;

-- 6. Create a cleanup function to remove stale entries
CREATE OR REPLACE FUNCTION cleanup_stale_online_users()
RETURNS void AS $$
BEGIN
  -- Remove entries older than 10 minutes
  DELETE FROM online_users 
  WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$ LANGUAGE plpgsql;

-- 7. Create a trigger to automatically clean up stale entries
CREATE OR REPLACE FUNCTION trigger_cleanup_stale_online_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Clean up stale entries when new ones are added
  PERFORM cleanup_stale_online_users();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS cleanup_stale_online_users_trigger ON online_users;

-- Create the trigger
CREATE TRIGGER cleanup_stale_online_users_trigger
  AFTER INSERT ON online_users
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_cleanup_stale_online_users();

-- 8. Run initial cleanup
SELECT 'Running initial cleanup...' as status;
SELECT cleanup_stale_online_users();

-- 9. Final verification
SELECT 'Final online users count:' as info;
SELECT COUNT(*) as total_entries, COUNT(DISTINCT user_id) as unique_users 
FROM online_users;

SELECT 'Online users after cleanup:' as info;
SELECT user_id, display_name, last_seen, current_activity
FROM online_users 
ORDER BY last_seen DESC;

SELECT 'Duplicate cleanup complete!' as result;
