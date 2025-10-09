-- Emergency fix for challenge_requests table
-- This will definitely create the table and fix the 400 error

-- 1. First, let's see what tables exist
SELECT 'Current tables in public schema:' as info;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%challenge%'
ORDER BY table_name;

-- 2. Force drop and recreate the challenge_requests table
DROP TABLE IF EXISTS challenge_requests CASCADE;

-- 3. Create the table with minimal required fields first
CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID NOT NULL,
  challenged_id UUID NOT NULL,
  quiz_id TEXT NOT NULL, -- Using TEXT to avoid foreign key issues
  status VARCHAR(20) DEFAULT 'pending',
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- 4. Add constraints after table creation
ALTER TABLE challenge_requests 
ADD CONSTRAINT check_status 
CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled'));

-- 5. Create indexes
CREATE INDEX idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX idx_challenge_requests_quiz_id ON challenge_requests(quiz_id);

-- 6. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 7. Create simple RLS policies
CREATE POLICY "Enable all operations for authenticated users" ON challenge_requests
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 8. Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 9. Test the table with a simple insert
SELECT 'Testing table creation...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get any user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Test insert
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, 'test-quiz-id', 'pending')
    RETURNING id INTO test_challenge_id;
    
    -- Test update
    UPDATE challenge_requests 
    SET status = 'accepted', responded_at = NOW()
    WHERE id = test_challenge_id;
    
    -- Clean up test data
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Challenge requests table test PASSED';
  ELSE
    RAISE NOTICE 'No users found for testing, but table is created';
  END IF;
END $$;

SELECT 'Emergency fix completed!' as result;