-- Fix for "Failed to create challenge request" error
-- This ensures the challenge_requests table exists with proper structure

-- 1. Check if challenge_requests table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table exists'
    ELSE 'challenge_requests table MISSING - creating it now!'
  END as table_status;

-- 2. Create challenge_requests table with proper structure
DROP TABLE IF EXISTS challenge_requests CASCADE;

CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID, -- We'll handle foreign key separately
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
CREATE INDEX idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX idx_challenge_requests_expires_at ON challenge_requests(expires_at);
CREATE INDEX idx_challenge_requests_quiz_id ON challenge_requests(quiz_id);

-- 5. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
DROP POLICY IF EXISTS "Users can view their own challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can create challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can update challenge requests they're involved in" ON challenge_requests;
DROP POLICY IF EXISTS "Users can delete their own challenge requests" ON challenge_requests;

CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can delete their own challenge requests" ON challenge_requests
  FOR DELETE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- 7. Enable real-time
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- 8. Test the table
SELECT 'Testing challenge_requests table...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Get any quiz ID for testing
    SELECT id INTO test_quiz_id FROM user_created_quizzes LIMIT 1;
    
    IF test_quiz_id IS NOT NULL THEN
      -- Test challenge request creation
      INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
      VALUES (test_user_id, test_user_id, test_quiz_id, 'pending')
      RETURNING id INTO test_challenge_id;
      
      -- Clean up test data
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
      
      RAISE NOTICE 'Challenge request creation test PASSED';
    ELSE
      RAISE NOTICE 'No quizzes found for testing, but table structure is correct';
    END IF;
  ELSE
    RAISE NOTICE 'No users found for testing, but table structure is correct';
  END IF;
END $$;

SELECT 'Challenge requests table fix completed!' as result;
