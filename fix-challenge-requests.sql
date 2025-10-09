-- Fix challenge requests table and add real-time notifications
-- This script will ensure the challenge system works properly

-- 1. Check if challenge_requests table exists
SELECT 'Checking challenge_requests table...' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table exists'
    ELSE 'challenge_requests table MISSING - creating it now!'
  END as table_status;

-- 2. Create challenge_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_requests (
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

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_expires_at ON challenge_requests(expires_at);

-- 4. Enable RLS
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can create challenge requests" ON challenge_requests;
DROP POLICY IF EXISTS "Users can update challenge requests they're involved in" ON challenge_requests;

-- 6. Create RLS policies
CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- 7. Enable real-time for challenge_requests
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 8. Create a function to send challenge notifications
CREATE OR REPLACE FUNCTION notify_challenge_request()
RETURNS TRIGGER AS $$
BEGIN
  -- Send a notification to the challenged user
  PERFORM pg_notify(
    'challenge_request_' || NEW.challenged_id,
    json_build_object(
      'type', 'challenge_request',
      'id', NEW.id,
      'challenger_id', NEW.challenger_id,
      'challenged_id', NEW.challenged_id,
      'quiz_id', NEW.quiz_id,
      'message', NEW.message,
      'status', NEW.status,
      'created_at', NEW.created_at
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create trigger for challenge notifications
DROP TRIGGER IF EXISTS challenge_request_notification_trigger ON challenge_requests;
CREATE TRIGGER challenge_request_notification_trigger
  AFTER INSERT ON challenge_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_challenge_request();

-- 10. Create a function to clean up expired challenges
CREATE OR REPLACE FUNCTION cleanup_expired_challenges()
RETURNS void AS $$
BEGIN
  UPDATE challenge_requests 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 11. Test the setup
SELECT 'Testing challenge request creation...' as info;

-- Insert a test challenge request (this will fail if there are no users, but that's ok)
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
BEGIN
  -- Get a test user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- Get a test quiz ID
  SELECT id INTO test_quiz_id FROM user_created_quizzes WHERE is_public = true LIMIT 1;
  
  IF test_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- This is just a test, we'll delete it immediately
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'Test challenge');
    
    -- Delete the test entry
    DELETE FROM challenge_requests WHERE challenger_id = test_user_id AND challenged_id = test_user_id;
    
    RAISE NOTICE 'Challenge request test successful';
  ELSE
    RAISE NOTICE 'No users or quizzes available for testing';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Challenge request test failed: %', SQLERRM;
END $$;

-- 12. Final verification
SELECT 'Challenge requests setup complete!' as result;
SELECT 'Tables created and policies set up for challenge system' as status;
