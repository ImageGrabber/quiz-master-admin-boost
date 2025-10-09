-- Create missing tables that are needed for challenge sessions
-- This will fix the "Not found" issue

-- 1. Create challenge_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_request_id UUID,
  quiz_id INTEGER NOT NULL,
  challenger_id UUID NOT NULL,
  challenged_id UUID NOT NULL,
  status TEXT DEFAULT 'waiting',
  total_questions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create challenge_participants table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create challenge_answers table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  participant_id UUID,
  question_id INTEGER,
  answer_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL,
  answered_at TIMESTAMP DEFAULT NOW()
);

-- 4. Create challenge_results table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  participant_id UUID,
  total_score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  average_response_time INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- 5. Enable real-time for all tables (handle existing subscriptions gracefully)
DO $$
BEGIN
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

-- 6. Test that everything works
SELECT 'All challenge tables created successfully!' as result;
SELECT COUNT(*) as challenge_sessions_count FROM challenge_sessions;
SELECT COUNT(*) as challenge_participants_count FROM challenge_participants;
