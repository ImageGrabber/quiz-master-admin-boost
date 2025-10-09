-- Create online_users table to track who is currently online
CREATE TABLE online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_available BOOLEAN DEFAULT true,
  current_activity VARCHAR(50) DEFAULT 'idle', -- 'idle', 'in_quiz', 'in_challenge'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_requests table for challenge invitations
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

-- Create challenge_sessions table for active challenges
CREATE TABLE challenge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_request_id UUID REFERENCES challenge_requests(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES user_created_quizzes(id) ON DELETE CASCADE,
  challenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'finished', 'cancelled')),
  time_limit INTEGER DEFAULT 30, -- in minutes
  current_question INTEGER DEFAULT 0,
  total_questions INTEGER NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_participants table for challenge participants
CREATE TABLE challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_answers table for challenge answers
CREATE TABLE challenge_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID REFERENCES challenge_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES challenge_participants(id) ON DELETE CASCADE,
  question_id UUID NOT NULL,
  answer_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL, -- in milliseconds
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_results table for challenge results
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

-- Create indexes for better performance
CREATE INDEX idx_online_users_user_id ON online_users(user_id);
CREATE INDEX idx_online_users_last_seen ON online_users(last_seen);
CREATE INDEX idx_online_users_is_available ON online_users(is_available);

CREATE INDEX idx_challenge_requests_challenger ON challenge_requests(challenger_id);
CREATE INDEX idx_challenge_requests_challenged ON challenge_requests(challenged_id);
CREATE INDEX idx_challenge_requests_status ON challenge_requests(status);
CREATE INDEX idx_challenge_requests_expires_at ON challenge_requests(expires_at);

CREATE INDEX idx_challenge_sessions_challenger ON challenge_sessions(challenger_id);
CREATE INDEX idx_challenge_sessions_challenged ON challenge_sessions(challenged_id);
CREATE INDEX idx_challenge_sessions_status ON challenge_sessions(status);

CREATE INDEX idx_challenge_participants_session ON challenge_participants(challenge_session_id);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id);

CREATE INDEX idx_challenge_answers_session ON challenge_answers(challenge_session_id);
CREATE INDEX idx_challenge_answers_participant ON challenge_answers(participant_id);

CREATE INDEX idx_challenge_results_session ON challenge_results(challenge_session_id);
CREATE INDEX idx_challenge_results_participant ON challenge_results(participant_id);

-- Enable Row Level Security
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for online_users
CREATE POLICY "Users can view all online users" ON online_users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own online status" ON online_users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own online status" ON online_users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own online status" ON online_users
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for challenge_requests
CREATE POLICY "Users can view their own challenge requests" ON challenge_requests
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge requests" ON challenge_requests
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update challenge requests they're involved in" ON challenge_requests
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- RLS Policies for challenge_sessions
CREATE POLICY "Users can view challenge sessions they're involved in" ON challenge_sessions
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can create challenge sessions" ON challenge_sessions
  FOR INSERT WITH CHECK (auth.uid() = challenger_id OR auth.uid() = challenged_id);

CREATE POLICY "Users can update challenge sessions they're involved in" ON challenge_sessions
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

-- RLS Policies for challenge_participants
CREATE POLICY "Users can view challenge participants" ON challenge_participants
  FOR SELECT USING (true);

CREATE POLICY "Users can join challenge sessions" ON challenge_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge participant status" ON challenge_participants
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for challenge_answers
CREATE POLICY "Users can view challenge answers" ON challenge_answers
  FOR SELECT USING (true);

CREATE POLICY "Users can submit challenge answers" ON challenge_answers
  FOR INSERT WITH CHECK (true);

-- RLS Policies for challenge_results
CREATE POLICY "Users can view challenge results" ON challenge_results
  FOR SELECT USING (true);

-- Enable real-time for challenge tables
ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_answers;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_results;

-- Create function to clean up expired challenge requests
CREATE OR REPLACE FUNCTION cleanup_expired_challenges()
RETURNS void AS $$
BEGIN
  UPDATE challenge_requests 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create function to update user online status
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

-- Create function to calculate challenge results
CREATE OR REPLACE FUNCTION calculate_challenge_results(p_challenge_session_id UUID)
RETURNS void AS $$
DECLARE
  participant_record RECORD;
  participant_score INTEGER;
  participant_correct INTEGER;
  participant_total INTEGER;
  participant_avg_time INTEGER;
  participant_rank INTEGER;
BEGIN
  -- Calculate results for each participant
  FOR participant_record IN 
    SELECT 
      cp.id as participant_id,
      cp.user_id,
      COUNT(ca.id) as total_answers,
      COUNT(CASE WHEN ca.is_correct THEN 1 END) as correct_answers,
      COALESCE(AVG(ca.response_time), 0) as avg_response_time
    FROM challenge_participants cp
    LEFT JOIN challenge_answers ca ON cp.id = ca.participant_id
    WHERE cp.challenge_session_id = p_challenge_session_id
    GROUP BY cp.id, cp.user_id
  LOOP
    participant_score := participant_record.correct_answers * 10; -- 10 points per correct answer
    participant_correct := participant_record.correct_answers;
    participant_total := participant_record.total_answers;
    participant_avg_time := COALESCE(participant_record.avg_response_time, 0);
    
    -- Calculate rank (this is simplified - in practice you might want more sophisticated ranking)
    SELECT COUNT(*) + 1 INTO participant_rank
    FROM challenge_participants cp2
    LEFT JOIN challenge_answers ca2 ON cp2.id = ca2.participant_id
    WHERE cp2.challenge_session_id = p_challenge_session_id
    AND cp2.id != participant_record.participant_id
    AND COUNT(CASE WHEN ca2.is_correct THEN 1 END) > participant_correct;
    
    -- Insert or update result
    INSERT INTO challenge_results (
      challenge_session_id,
      participant_id,
      total_score,
      correct_answers,
      total_questions,
      average_response_time,
      rank
    ) VALUES (
      p_challenge_session_id,
      participant_record.participant_id,
      participant_score,
      participant_correct,
      participant_total,
      participant_avg_time,
      participant_rank
    )
    ON CONFLICT (challenge_session_id, participant_id)
    DO UPDATE SET
      total_score = EXCLUDED.total_score,
      correct_answers = EXCLUDED.correct_answers,
      total_questions = EXCLUDED.total_questions,
      average_response_time = EXCLUDED.average_response_time,
      rank = EXCLUDED.rank,
      completed_at = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically clean up expired challenges
CREATE OR REPLACE FUNCTION trigger_cleanup_expired_challenges()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM cleanup_expired_challenges();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_expired_challenges_trigger
  AFTER INSERT OR UPDATE ON challenge_requests
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_cleanup_expired_challenges();
