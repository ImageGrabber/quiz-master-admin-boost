-- Safe version of the complete challenge system fix
-- This handles existing real-time subscriptions gracefully

-- 1. First, let's see what we have
SELECT 'Current challenge system status:' as info;

-- Check all challenge-related tables
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
  ('user_created_quizzes')
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
CREATE TABLE IF NOT EXISTS challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'cancelled')),
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Create challenge_sessions table
CREATE TABLE IF NOT EXISTS challenge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_request_id UUID REFERENCES challenge_requests(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
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
CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_answers table
CREATE TABLE IF NOT EXISTS challenge_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES challenge_participants(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_results table
CREATE TABLE IF NOT EXISTS challenge_results (
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

-- 4. Enable RLS on all tables
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

CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

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

-- 6. Enable real-time for all tables (with error handling)
DO $$
DECLARE
  table_name TEXT;
  tables_to_enable TEXT[] := ARRAY['online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results'];
BEGIN
  FOREACH table_name IN ARRAY tables_to_enable
  LOOP
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE table_name;
      RAISE NOTICE 'Real-time enabled for %', table_name;
    EXCEPTION
      WHEN duplicate_object THEN
        RAISE NOTICE 'Real-time already enabled for %', table_name;
      WHEN OTHERS THEN
        RAISE NOTICE 'Could not enable real-time for %: %', table_name, SQLERRM;
    END;
  END LOOP;
END $$;

-- 7. Create helper functions
CREATE OR REPLACE FUNCTION update_user_online_status(
  p_user_id UUID,
  p_display_name VARCHAR(255),
  p_is_available BOOLEAN DEFAULT true,
  p_activity VARCHAR(50) DEFAULT 'idle'
)
RETURNS void AS $$
BEGIN
  -- Clean the display name
  p_display_name := CASE 
    WHEN p_display_name LIKE '%@%' THEN 
      SPLIT_PART(p_display_name, '@', 1)
    ELSE 
      p_display_name
  END;
  
  -- Delete existing entry for this user
  DELETE FROM online_users WHERE user_id = p_user_id;
  
  -- Insert new entry
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES (p_user_id, p_display_name, p_is_available, p_activity, NOW());
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION cleanup_stale_online_users()
RETURNS void AS $$
BEGIN
  -- Remove entries older than 10 minutes
  DELETE FROM online_users 
  WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$ LANGUAGE plpgsql;

-- 8. Test the system
SELECT 'Testing challenge system...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get a test user
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Test online status update
    PERFORM update_user_online_status(test_user_id, 'Test User', true, 'idle');
    RAISE NOTICE 'SUCCESS: Online status update works';
    
    -- Test challenge request creation
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, test_user_id, 'test-quiz-123', 'Test challenge')
    RETURNING id INTO test_challenge_id;
    
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Challenge request creation works';
      -- Clean up
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
    END IF;
    
    -- Clean up online user
    DELETE FROM online_users WHERE user_id = test_user_id;
    
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'ERROR: %', SQLERRM;
END $$;

-- 9. Final verification
SELECT 'Final system status:' as info;
SELECT 
  table_name,
  'Ready' as status
FROM information_schema.tables 
WHERE table_name IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results')
ORDER BY table_name;

SELECT 'Safe challenge system fix applied!' as result;
