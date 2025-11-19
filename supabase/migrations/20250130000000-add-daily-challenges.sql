-- Daily Challenge System Migration
-- This creates a system for daily challenges that are automatically generated

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  challenge_date DATE NOT NULL UNIQUE, -- One challenge per day
  title VARCHAR(255) NOT NULL,
  description TEXT,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE SET NULL,
  total_questions INTEGER DEFAULT 10,
  time_limit INTEGER DEFAULT 300, -- 5 minutes in seconds
  credits_reward INTEGER DEFAULT 10, -- Credits awarded for completion
  is_active BOOLEAN DEFAULT true,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL, -- Start of day (00:00:00)
  end_time TIMESTAMP WITH TIME ZONE NOT NULL, -- End of day (23:59:59)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_challenge_attempts table
CREATE TABLE IF NOT EXISTS daily_challenge_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_challenge_id INTEGER REFERENCES daily_challenges(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL,
  seconds_used INTEGER NOT NULL DEFAULT 0,
  answers JSONB,
  credits_earned INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, daily_challenge_id) -- Only one attempt per user per daily challenge
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_daily_challenges_date ON daily_challenges(challenge_date);
CREATE INDEX IF NOT EXISTS idx_daily_challenges_active ON daily_challenges(is_active, challenge_date);
CREATE INDEX IF NOT EXISTS idx_daily_challenge_attempts_user ON daily_challenge_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_challenge_attempts_challenge ON daily_challenge_attempts(daily_challenge_id);

-- Enable RLS
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenge_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for daily_challenges (everyone can read active challenges)
CREATE POLICY "Anyone can view active daily challenges" ON daily_challenges
  FOR SELECT
  USING (is_active = true);

-- RLS Policies for daily_challenge_attempts (users can view their own attempts)
CREATE POLICY "Users can view own attempts" ON daily_challenge_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON daily_challenge_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attempts" ON daily_challenge_attempts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to get or create today's daily challenge
CREATE OR REPLACE FUNCTION get_or_create_daily_challenge()
RETURNS TABLE (
  id INTEGER,
  challenge_date DATE,
  title VARCHAR,
  description TEXT,
  quiz_id INTEGER,
  total_questions INTEGER,
  time_limit INTEGER,
  credits_reward INTEGER,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  challenge_record daily_challenges%ROWTYPE;
BEGIN
  -- Try to get today's challenge
  SELECT * INTO challenge_record
  FROM daily_challenges
  WHERE challenge_date = today_date
  AND is_active = true
  LIMIT 1;

  -- If no challenge exists for today, create one
  IF NOT FOUND THEN
    INSERT INTO daily_challenges (
      challenge_date,
      title,
      description,
      total_questions,
      time_limit,
      credits_reward,
      start_time,
      end_time
    ) VALUES (
      today_date,
      'Daily Bible Challenge - ' || TO_CHAR(today_date, 'Month DD, YYYY'),
      'Test your Bible knowledge with today''s daily challenge! Complete all questions to earn credits.',
      10,
      300,
      10,
      today_date::TIMESTAMP WITH TIME ZONE,
      (today_date + INTERVAL '1 day' - INTERVAL '1 second')::TIMESTAMP WITH TIME ZONE
    )
    RETURNING * INTO challenge_record;
  END IF;

  -- Return the challenge
  RETURN QUERY
  SELECT 
    challenge_record.id,
    challenge_record.challenge_date,
    challenge_record.title,
    challenge_record.description,
    challenge_record.quiz_id,
    challenge_record.total_questions,
    challenge_record.time_limit,
    challenge_record.credits_reward,
    challenge_record.start_time,
    challenge_record.end_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get today's challenge stats
CREATE OR REPLACE FUNCTION get_daily_challenge_stats(challenge_date_param DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
  total_participants BIGINT,
  total_winners BIGINT,
  total_credits_awarded BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT dca.user_id)::BIGINT as total_participants,
    COUNT(DISTINCT CASE WHEN dca.completed = true AND dca.score = dc.total_questions THEN dca.user_id END)::BIGINT as total_winners,
    COALESCE(SUM(dca.credits_earned), 0)::BIGINT as total_credits_awarded
  FROM daily_challenges dc
  LEFT JOIN daily_challenge_attempts dca ON dc.id = dca.daily_challenge_id
  WHERE dc.challenge_date = challenge_date_param
  AND dc.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

