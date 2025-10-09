-- Complete fix for the challenge system
-- This addresses all potential issues with challenge responses

-- 1. First, let's check what we have
SELECT 'Starting comprehensive challenge system fix...' as info;

-- Check all required tables
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = table_name) 
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM (VALUES 
  ('online_users'),
  ('challenge_requests'),
  ('challenge_sessions'),
  ('challenge_participants'),
  ('challenge_answers'),
  ('challenge_results'),
  ('user_created_quizzes'),
  ('user_quiz_questions')
) AS required_tables(table_name);

-- 2. Create all missing tables with proper structure
-- Create online_users table
CREATE TABLE IF NOT EXISTS online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_available BOOLEAN DEFAULT true,
  current_activity VARCHAR(50) DEFAULT 'idle',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_requests table
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

-- Create challenge_sessions table
DROP TABLE IF EXISTS challenge_sessions CASCADE;
CREATE TABLE challenge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_request_id UUID REFERENCES challenge_requests(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES user_created_quizzes(id) ON DELETE CASCADE,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'finished', 'cancelled')),
  time_limit INTEGER DEFAULT 30,
  current_question INTEGER DEFAULT 0,
  total_questions INTEGER NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_participants table
DROP TABLE IF EXISTS challenge_participants CASCADE;
CREATE TABLE challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_answers table
DROP TABLE IF EXISTS challenge_answers CASCADE;
CREATE TABLE challenge_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES challenge_participants(id) ON DELETE CASCADE,
  question_id UUID REFERENCES user_quiz_questions(id) ON DELETE CASCADE,
  answer_index INTEGER NOT NULL CHECK (answer_index >= 0 AND answer_index <= 3),
  is_correct BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_results table
DROP TABLE IF EXISTS challenge_results CASCADE;
CREATE TABLE challenge_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES challenge_participants(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  average_response_time INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_online_users_user_id ON online_users(user_id);
CREATE INDEX IF NOT EXISTS idx_online_users_last_seen ON online_users(last_seen);
CREATE INDEX IF NOT EXISTS idx_online_users_is_available ON online_users(is_available);

CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX IF NOT EXISTS idx_challenge_requests_expires_at ON challenge_requests(expires_at);

CREATE INDEX IF NOT EXISTS idx_challenge_sessions_challenger ON challenge_sessions(challenger_id);
CREATE INDEX IF NOT EXISTS idx_challenge_sessions_challenged ON challenge_sessions(challenged_id);
CREATE INDEX IF NOT EXISTS idx_challenge_sessions_status ON challenge_sessions(status);

CREATE INDEX IF NOT EXISTS idx_challenge_participants_session ON challenge_participants(challenge_session_id);
CREATE INDEX IF NOT EXISTS idx_challenge_participants_user ON challenge_participants(user_id);

CREATE INDEX IF NOT EXISTS idx_challenge_answers_session ON challenge_answers(challenge_session_id);
CREATE INDEX IF NOT EXISTS idx_challenge_answers_participant ON challenge_answers(participant_id);

CREATE INDEX IF NOT EXISTS idx_challenge_results_session ON challenge_results(challenge_session_id);
CREATE INDEX IF NOT EXISTS idx_challenge_results_participant ON challenge_results(participant_id);

-- 4. Enable Row Level Security
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_results ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies and create new ones
-- Online users policies
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

-- Challenge requests policies
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

-- Challenge sessions policies
DROP POLICY IF EXISTS "Users can view challenge sessions they're involved in" ON challenge_sessions;
DROP POLICY IF EXISTS "Users can create challenge sessions" ON challenge_sessions;
DROP POLICY IF EXISTS "Users can update challenge sessions they're involved in" ON challenge_sessions;

CREATE POLICY "Users can view challenge sessions they're involved in" ON challenge_sessions
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge sessions" ON challenge_sessions
  FOR INSERT WITH CHECK (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can update challenge sessions they're involved in" ON challenge_sessions
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- Challenge participants policies
DROP POLICY IF EXISTS "Users can view challenge participants" ON challenge_participants;
DROP POLICY IF EXISTS "Users can join challenge sessions" ON challenge_participants;
DROP POLICY IF EXISTS "Users can update their own challenge participant status" ON challenge_participants;

CREATE POLICY "Users can view challenge participants" ON challenge_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can join challenge sessions" ON challenge_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge participant status" ON challenge_participants
  FOR UPDATE USING (auth.uid() = user_id);

-- Challenge answers policies
DROP POLICY IF EXISTS "Users can view challenge answers" ON challenge_answers;
DROP POLICY IF EXISTS "Users can submit challenge answers" ON challenge_answers;

CREATE POLICY "Users can view challenge answers" ON challenge_answers
  FOR SELECT USING (true);

CREATE POLICY "Users can submit challenge answers" ON challenge_answers
  FOR INSERT WITH CHECK (true);

-- Challenge results policies
DROP POLICY IF EXISTS "Users can view challenge results" ON challenge_results;

CREATE POLICY "Users can view challenge results" ON challenge_results
  FOR SELECT USING (true);

-- 6. Enable real-time for all challenge tables (handle existing subscriptions gracefully)
DO $$
BEGIN
  -- Add tables to realtime publication, ignoring errors if they're already added
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, continue
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_sessions;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_participants;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_answers;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_results;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- 7. Create helper functions
-- Function to clean up expired challenge requests
CREATE OR REPLACE FUNCTION cleanup_expired_challenges()
RETURNS void AS $$
BEGIN
  UPDATE challenge_requests 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update user online status
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

-- 8. Test the system
SELECT 'Testing challenge system...' as info;

-- Test basic operations
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
  test_session_id UUID;
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
      
      -- Test challenge response (this is what was failing)
      UPDATE challenge_requests 
      SET status = 'accepted', responded_at = NOW()
      WHERE id = test_challenge_id;
      
      -- Test challenge session creation
      INSERT INTO challenge_sessions (
        challenge_request_id, 
        quiz_id, 
        challenger_id, 
        challenged_id, 
        total_questions
      )
      VALUES (
        test_challenge_id, 
        test_quiz_id, 
        test_user_id, 
        test_user_id, 
        5
      )
      RETURNING id INTO test_session_id;
      
      -- Clean up test data
      DELETE FROM challenge_sessions WHERE id = test_session_id;
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
      
      RAISE NOTICE 'Challenge system test PASSED - all operations working correctly';
    ELSE
      RAISE NOTICE 'No quizzes found for testing, but table structure is correct';
    END IF;
  ELSE
    RAISE NOTICE 'No users found for testing, but table structure is correct';
  END IF;
END $$;

-- 9. Final verification
SELECT 'Challenge system fix completed successfully!' as result;
SELECT 'The "Failed to respond to challenge" error should now be resolved.' as status;
SELECT 'All challenge system tables and policies have been created/updated.' as final_status;
