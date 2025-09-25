-- Create badges and user_badges tables
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB,
  UNIQUE(user_id, badge_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge ON user_badges(badge_id);

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone authenticated can read badges
CREATE POLICY "Badges are viewable by everyone" ON badges
  FOR SELECT TO authenticated USING (true);

-- Only admins can manage badges
CREATE POLICY "Admins can manage badges" ON badges
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Users can view their own user_badges
CREATE POLICY "Users can view their badges" ON user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- Service role or triggers will insert; also allow users to be awarded by serverless functions
CREATE POLICY "Allow server to award badges" ON user_badges
  FOR INSERT WITH CHECK (true);

-- Seed default badges (executed by service role during migration)
INSERT INTO badges (slug, name, description, icon)
VALUES
  ('first-quiz', 'First Quiz!', 'Completed your first quiz', 'Award'),
  ('score-100', 'Perfect Score', 'Scored 100 points', 'Crown'),
  ('streak-3', 'Consistency', '3-day devotional streak', 'Flame'),
  ('five-quizzes', 'Quiz Enthusiast', 'Completed 5 quizzes', 'Star'),
  ('ten-quizzes', 'Dedicated', 'Completed 10 quizzes', 'Star'),
  ('fast-finisher', 'Speed Runner', 'Finished in under 3 minutes', 'Bolt')
ON CONFLICT (slug) DO NOTHING;


