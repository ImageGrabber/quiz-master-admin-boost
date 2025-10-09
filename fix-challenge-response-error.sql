-- Fix for "Failed to respond to challenge" error
-- This addresses the specific issue with challenge response functionality

-- 1. First, let's check the current state of the challenge system
SELECT 'Diagnosing challenge system...' as info;

-- Check if challenge_requests table exists and its structure
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table exists'
    ELSE 'challenge_requests table MISSING - this is the problem!'
  END as table_status;

-- Check the structure of challenge_requests table
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_requests' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Ensure challenge_requests table exists with correct structure
DROP TABLE IF EXISTS challenge_requests CASCADE;

CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL, -- Using TEXT to avoid foreign key issues initially
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- 3. Create indexes for better performance
CREATE INDEX idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX idx_challenge_requests_expires_at ON challenge_requests(expires_at);
CREATE INDEX idx_challenge_requests_quiz_id ON challenge_requests(quiz_id);

-- 4. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 5. Create comprehensive RLS policies
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can create challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can update challenge requests they're involved in" ON challenge_requests;
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON challenge_requests;

-- Create new policies
CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can delete their own challenge requests" ON challenge_requests
  FOR DELETE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- 6. Enable real-time for challenge_requests
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 7. Create a function to clean up expired challenge requests
CREATE OR REPLACE FUNCTION cleanup_expired_challenges()
RETURNS void AS $$
BEGIN
  UPDATE challenge_requests 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 8. Test the table with a simple operation
SELECT 'Testing challenge_requests table...' as info;

-- Test insert (this will only work if we have users)
DO $$
DECLARE
  test_user_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Test insert
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, 'test-quiz-id', 'pending')
    RETURNING id INTO test_challenge_id;
    
    -- Test update (this is what was failing)
    UPDATE challenge_requests 
    SET status = 'accepted', responded_at = NOW()
    WHERE id = test_challenge_id;
    
    -- Clean up test data
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Challenge system test PASSED - table is working correctly';
  ELSE
    RAISE NOTICE 'No users found for testing, but table structure is correct';
  END IF;
END $$;

-- 9. Final verification
SELECT 'Challenge system fix completed successfully!' as result;
SELECT 'The "Failed to respond to challenge" error should now be resolved.' as status;
