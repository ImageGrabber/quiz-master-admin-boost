-- Ultra-simple fix for online status error
-- This just ensures the table exists and has the right structure

-- 1. Drop and recreate online_users table with minimal structure
DROP TABLE IF EXISTS online_users CASCADE;

CREATE TABLE online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_available BOOLEAN DEFAULT true,
  current_activity VARCHAR(50) DEFAULT 'idle',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add unique constraint on user_id
ALTER TABLE online_users ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- 3. Create basic indexes
CREATE INDEX idx_online_users_user_id ON online_users(user_id);
CREATE INDEX idx_online_users_is_available ON online_users(is_available);

-- 4. Enable RLS with simple policies
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view all online users" ON online_users;
DROP POLICY IF EXISTS "Users can update their own online status" ON online_users;
DROP POLICY IF EXISTS "Users can insert their own online status" ON online_users;
DROP POLICY IF EXISTS "Users can delete their own online status" ON online_users;

-- Create simple policies
CREATE POLICY "Enable all for authenticated users" ON online_users
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 5. Enable real-time
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- 6. Test basic insert/update
SELECT 'Testing basic online_users operations...' as info;

DO $$
DECLARE
  test_user_id UUID;
BEGIN
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Test direct insert
    INSERT INTO online_users (user_id, display_name, is_available, current_activity)
    VALUES (test_user_id, 'Test User', true, 'idle');
    
    -- Test update
    UPDATE online_users 
    SET is_available = false, last_seen = NOW()
    WHERE user_id = test_user_id;
    
    -- Clean up
    DELETE FROM online_users WHERE user_id = test_user_id;
    
    RAISE NOTICE 'Basic operations test PASSED';
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
END $$;

SELECT 'Simple online status fix completed!' as result;
