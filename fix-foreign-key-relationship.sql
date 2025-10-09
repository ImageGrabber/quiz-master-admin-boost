-- Fix the foreign key relationship error
-- This will create the proper relationship between challenge_requests and user_created_quizzes

-- 1. First, check if user_created_quizzes table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_created_quizzes') 
    THEN 'user_created_quizzes table EXISTS'
    ELSE 'user_created_quizzes table MISSING'
  END as quiz_table_status;

-- 2. Check current challenge_requests structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'challenge_requests' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Drop and recreate challenge_requests with proper foreign key
DROP TABLE IF EXISTS challenge_requests CASCADE;

CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES user_created_quizzes(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- 4. Create indexes
CREATE INDEX idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX idx_challenge_requests_quiz_id ON challenge_requests(quiz_id);

-- 5. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can delete their own challenge requests" ON challenge_requests
  FOR DELETE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- 7. Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 8. Test the relationship
SELECT 'Testing foreign key relationship...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- Get any quiz ID for testing
  SELECT id INTO test_quiz_id FROM user_created_quizzes LIMIT 1;
  
  IF test_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- Test challenge request creation with proper foreign key
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'pending')
    RETURNING id INTO test_challenge_id;
    
    -- Test challenge response
    UPDATE challenge_requests 
    SET status = 'accepted', responded_at = NOW()
    WHERE id = test_challenge_id;
    
    -- Clean up test data
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Foreign key relationship test PASSED';
  ELSE
    RAISE NOTICE 'Missing users or quizzes for testing, but relationship is created';
  END IF;
END $$;

SELECT 'Foreign key relationship fix completed!' as result;
