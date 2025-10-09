-- Fix display names to show proper names instead of email addresses
-- This script will update existing entries and improve the display name logic

-- 1. Check current display names
SELECT 'Current display names in online_users:' as info;
SELECT user_id, display_name, last_seen 
FROM online_users 
ORDER BY last_seen DESC;

-- 2. Update display names for existing entries
-- Get better display names from user metadata or email
UPDATE online_users 
SET display_name = CASE 
  WHEN display_name LIKE '%@%' THEN 
    -- If it's an email, extract the username part
    SPLIT_PART(display_name, '@', 1)
  ELSE 
    -- Keep existing display name if it's not an email
    display_name
END
WHERE display_name LIKE '%@%';

-- 3. Update the function to use better display names
DROP FUNCTION IF EXISTS update_user_online_status(UUID, VARCHAR(255), BOOLEAN, VARCHAR(50));

CREATE OR REPLACE FUNCTION update_user_online_status(
  p_user_id UUID,
  p_display_name VARCHAR(255),
  p_is_available BOOLEAN DEFAULT true,
  p_activity VARCHAR(50) DEFAULT 'idle'
)
RETURNS void AS $$
DECLARE
  clean_display_name VARCHAR(255);
BEGIN
  -- Clean the display name - remove email domain if present
  clean_display_name := CASE 
    WHEN p_display_name LIKE '%@%' THEN 
      SPLIT_PART(p_display_name, '@', 1)
    ELSE 
      p_display_name
  END;
  
  -- First, clean up any old entries for this user
  DELETE FROM online_users WHERE user_id = p_user_id;
  
  -- Then insert the new entry with cleaned display name
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES (p_user_id, clean_display_name, p_is_available, p_activity, NOW());
END;
$$ LANGUAGE plpgsql;

-- 4. Create a function to get user display name from auth.users
CREATE OR REPLACE FUNCTION get_user_display_name(p_user_id UUID)
RETURNS VARCHAR(255) AS $$
DECLARE
  user_email TEXT;
  user_metadata JSONB;
  display_name VARCHAR(255);
BEGIN
  -- Get user email and metadata
  SELECT email, raw_user_meta_data INTO user_email, user_metadata
  FROM auth.users 
  WHERE id = p_user_id;
  
  IF user_email IS NULL THEN
    RETURN 'Unknown User';
  END IF;
  
  -- Try to get display name from metadata
  IF user_metadata IS NOT NULL THEN
    -- Try different possible keys for display name
    display_name := COALESCE(
      user_metadata->>'display_name',
      user_metadata->>'full_name',
      user_metadata->>'name',
      user_metadata->>'username'
    );
    
    -- If we found a display name, clean it up
    IF display_name IS NOT NULL AND display_name != '' THEN
      RETURN display_name;
    END IF;
  END IF;
  
  -- Fallback to email username
  RETURN SPLIT_PART(user_email, '@', 1);
END;
$$ LANGUAGE plpgsql;

-- 5. Update existing entries with better display names
UPDATE online_users 
SET display_name = get_user_display_name(user_id)
WHERE display_name LIKE '%@%' OR display_name = 'User';

-- 6. Show updated display names
SELECT 'Updated display names:' as info;
SELECT user_id, display_name, last_seen 
FROM online_users 
ORDER BY last_seen DESC;

SELECT 'Display names fix complete!' as result;
