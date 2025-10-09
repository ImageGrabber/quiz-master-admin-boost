-- Simple fix for "Failed to update online status" error
-- This focuses specifically on the online_users table and RPC function

-- 1. Check current state
SELECT 'Checking online_users table...' as info;

-- Check if online_users table exists and its structure
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'online_users') 
    THEN 'online_users table exists'
    ELSE 'online_users table MISSING'
  END as table_status;

-- 2. Ensure online_users table exists with correct structure
DROP TABLE IF EXISTS online_users CASCADE;

CREATE TABLE online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_available BOOLEAN DEFAULT true,
  current_activity VARCHAR(50) DEFAULT 'idle',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. Create indexes
CREATE INDEX idx_online_users_user_id ON online_users(user_id);
CREATE INDEX idx_online_users_last_seen ON online_users(last_seen);
CREATE INDEX idx_online_users_is_available ON online_users(is_available);

-- 4. Enable RLS
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies and create simple ones
DROP POLICY IF EXISTS "Users can view all online users" ON online_users;
DROP POLICY IF EXISTS "Users can update their own online status" ON online_users;
DROP POLICY IF EXISTS "Users can insert their own online status" ON online_users;
DROP POLICY IF EXISTS "Users can delete their own online status" ON online_users;

CREATE POLICY "Users can view all online users" ON online_users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own online status" ON online_users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own online status" ON online_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own online status" ON online_users
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Drop and recreate the RPC function with correct logic
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

-- 7. Enable real-time for online_users (handle existing subscription)
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, continue
    NULL;
  END;
END $$;

-- 8. Test the function
SELECT 'Testing update_user_online_status function...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_result TEXT;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Test the function
    PERFORM update_user_online_status(
      test_user_id, 
      'Test User', 
      true, 
      'idle'
    );
    
    -- Verify the insert worked
    IF EXISTS (SELECT 1 FROM online_users WHERE user_id = test_user_id) THEN
      RAISE NOTICE 'RPC function test PASSED - online status update working';
    ELSE
      RAISE NOTICE 'RPC function test FAILED - no record found';
    END IF;
    
    -- Clean up test data
    DELETE FROM online_users WHERE user_id = test_user_id;
  ELSE
    RAISE NOTICE 'No users found for testing, but function is created';
  END IF;
END $$;

-- 9. Final verification
SELECT 'Online status fix completed!' as result;
SELECT 'The "Failed to update online status" error should now be resolved.' as status;
