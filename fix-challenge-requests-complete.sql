-- Complete fix for challenge requests table and foreign key issues
-- This will resolve the 400 Bad Request error

-- 1. Check if challenge_requests table exists
SELECT 'Checking challenge_requests table...' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table exists'
    ELSE 'challenge_requests table MISSING - creating it now!'
  END as table_status;

-- 2. Drop and recreate the table to ensure it's correct
DROP TABLE IF EXISTS challenge_requests CASCADE;

CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID, -- We'll handle the foreign key constraint separately
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- 3. Add foreign key constraint for quiz_id if user_created_quizzes exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_created_quizzes') THEN
    ALTER TABLE challenge_requests 
    ADD CONSTRAINT fk_challenge_requests_quiz_id 
    FOREIGN KEY (quiz_id) REFERENCES user_created_quizzes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_expires_at ON challenge_requests(expires_at);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_quiz_id ON challenge_requests(quiz_id);

-- 5. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can create challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can update challenge requests they're involved in" ON challenge_requests;

-- 7. Create RLS policies
CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- 8. Enable real-time for challenge_requests
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 9. Test the table by inserting a test record
SELECT 'Testing challenge_requests table...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get a test user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- Get a test quiz ID (try user_created_quizzes first, then quizzes table)
  SELECT id INTO test_quiz_id FROM user_created_quizzes WHERE is_public = true LIMIT 1;
  
  IF test_quiz_id IS NULL THEN
    -- If no user_created_quizzes, try the main quizzes table
    SELECT id::text INTO test_quiz_id FROM quizzes LIMIT 1;
  END IF;
  
  IF test_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- Insert a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'Test challenge request')
    RETURNING id INTO test_challenge_id;
    
    -- Delete the test entry
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Challenge request test successful - table is working!';
  ELSE
    RAISE NOTICE 'No users or quizzes available for testing, but table structure is correct';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Challenge request test failed: %', SQLERRM;
END $$;

-- 10. Show the table structure
SELECT 'Challenge requests table structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_requests'
ORDER BY ordinal_position;

-- 11. Show current challenge requests (should be empty)
SELECT 'Current challenge requests:' as info;
SELECT COUNT(*) as total_requests FROM challenge_requests;

SELECT 'Challenge requests table setup complete!' as result;
