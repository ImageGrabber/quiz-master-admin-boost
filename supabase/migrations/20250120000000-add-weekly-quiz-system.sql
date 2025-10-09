-- Weekly Quiz System Migration
-- This creates a separate system for weekly quizzes that are automatically generated

-- Create weekly_quizzes table
CREATE TABLE IF NOT EXISTS weekly_quizzes (
  id SERIAL PRIMARY KEY,
  week_start_date DATE NOT NULL, -- Monday of the week
  week_end_date DATE NOT NULL,   -- Sunday of the week
  title VARCHAR(255) NOT NULL,
  description TEXT,
  theme VARCHAR(100), -- e.g., Genesis, Psalms, New Testament
  difficulty VARCHAR(20) DEFAULT 'Medium' CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  total_questions INTEGER DEFAULT 25,
  time_limit INTEGER DEFAULT 600, -- 10 minutes in seconds
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(week_start_date) -- Only one quiz per week
);

-- Create weekly_quiz_questions table
CREATE TABLE IF NOT EXISTS weekly_quiz_questions (
  id SERIAL PRIMARY KEY,
  weekly_quiz_id INTEGER REFERENCES weekly_quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weekly_quiz_attempts table
CREATE TABLE IF NOT EXISTS weekly_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  weekly_quiz_id INTEGER REFERENCES weekly_quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  seconds_used INTEGER NOT NULL DEFAULT 0,
  answers JSONB,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, weekly_quiz_id) -- Only one attempt per user per weekly quiz
);

-- Create weekly_quiz_leaderboard table for weekly rankings
CREATE TABLE IF NOT EXISTS weekly_quiz_leaderboard (
  id SERIAL PRIMARY KEY,
  weekly_quiz_id INTEGER REFERENCES weekly_quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  time_used INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(weekly_quiz_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE weekly_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_quiz_leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies for weekly_quizzes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quizzes' AND policyname = 'Anyone can view active weekly quizzes') THEN
    CREATE POLICY "Anyone can view active weekly quizzes" ON weekly_quizzes
      FOR SELECT USING (is_active = true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quizzes' AND policyname = 'Admins can manage weekly quizzes') THEN
    CREATE POLICY "Admins can manage weekly quizzes" ON weekly_quizzes
      FOR ALL USING (public.is_admin());
  END IF;
END $$;

-- RLS Policies for weekly_quiz_questions
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_questions' AND policyname = 'Anyone can view weekly quiz questions') THEN
    CREATE POLICY "Anyone can view weekly quiz questions" ON weekly_quiz_questions
      FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_questions' AND policyname = 'Admins can manage weekly quiz questions') THEN
    CREATE POLICY "Admins can manage weekly quiz questions" ON weekly_quiz_questions
      FOR ALL USING (public.is_admin());
  END IF;
END $$;

-- RLS Policies for weekly_quiz_attempts
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_attempts' AND policyname = 'Users can view own attempts') THEN
    CREATE POLICY "Users can view own attempts" ON weekly_quiz_attempts
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_attempts' AND policyname = 'Users can insert own attempts') THEN
    CREATE POLICY "Users can insert own attempts" ON weekly_quiz_attempts
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_attempts' AND policyname = 'Users can update own attempts') THEN
    CREATE POLICY "Users can update own attempts" ON weekly_quiz_attempts
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- RLS Policies for weekly_quiz_leaderboard
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_leaderboard' AND policyname = 'Anyone can view leaderboard') THEN
    CREATE POLICY "Anyone can view leaderboard" ON weekly_quiz_leaderboard
      FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_leaderboard' AND policyname = 'System can manage leaderboard') THEN
    CREATE POLICY "System can manage leaderboard" ON weekly_quiz_leaderboard
      FOR ALL USING (public.is_admin());
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_weekly_quizzes_week_dates ON weekly_quizzes(week_start_date, week_end_date);
CREATE INDEX IF NOT EXISTS idx_weekly_quizzes_active ON weekly_quizzes(is_active);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_questions_quiz_id ON weekly_quiz_questions(weekly_quiz_id);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_questions_order ON weekly_quiz_questions(weekly_quiz_id, order_index);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_attempts_user_quiz ON weekly_quiz_attempts(user_id, weekly_quiz_id);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_attempts_quiz ON weekly_quiz_attempts(weekly_quiz_id);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_leaderboard_quiz ON weekly_quiz_leaderboard(weekly_quiz_id);
CREATE INDEX IF NOT EXISTS idx_weekly_quiz_leaderboard_rank ON weekly_quiz_leaderboard(weekly_quiz_id, rank);

-- Create function to get current week's quiz
CREATE OR REPLACE FUNCTION get_current_weekly_quiz()
RETURNS TABLE (
  id INTEGER,
  week_start_date DATE,
  week_end_date DATE,
  title VARCHAR,
  description TEXT,
  theme VARCHAR,
  difficulty VARCHAR,
  total_questions INTEGER,
  time_limit INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    wq.id,
    wq.week_start_date,
    wq.week_end_date,
    wq.title,
    wq.description,
    wq.theme,
    wq.difficulty,
    wq.total_questions,
    wq.time_limit
  FROM weekly_quizzes wq
  WHERE wq.is_active = true
    AND wq.week_start_date <= CURRENT_DATE
    AND wq.week_end_date >= CURRENT_DATE
  ORDER BY wq.week_start_date DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to create next week's quiz
CREATE OR REPLACE FUNCTION create_next_weekly_quiz(
  p_title VARCHAR,
  p_description TEXT,
  p_theme VARCHAR DEFAULT 'General',
  p_difficulty VARCHAR DEFAULT 'Medium',
  p_total_questions INTEGER DEFAULT 25
)
RETURNS INTEGER AS $$
DECLARE
  next_monday DATE;
  next_sunday DATE;
  quiz_id INTEGER;
BEGIN
  -- Calculate next Monday
  next_monday := CURRENT_DATE + INTERVAL '1 week' - EXTRACT(DOW FROM CURRENT_DATE)::INTEGER + 1;
  IF EXTRACT(DOW FROM CURRENT_DATE) = 1 THEN -- If today is Monday
    next_monday := CURRENT_DATE + INTERVAL '1 week';
  END IF;
  
  -- Calculate next Sunday
  next_sunday := next_monday + INTERVAL '6 days';
  
  -- Insert the weekly quiz
  INSERT INTO weekly_quizzes (
    week_start_date,
    week_end_date,
    title,
    description,
    theme,
    difficulty,
    total_questions
  ) VALUES (
    next_monday,
    next_sunday,
    p_title,
    p_description,
    p_theme,
    p_difficulty,
    p_total_questions
  ) RETURNING id INTO quiz_id;
  
  RETURN quiz_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update leaderboard for a weekly quiz
CREATE OR REPLACE FUNCTION update_weekly_leaderboard(p_weekly_quiz_id INTEGER)
RETURNS VOID AS $$
BEGIN
  -- Clear existing leaderboard for this quiz
  DELETE FROM weekly_quiz_leaderboard WHERE weekly_quiz_id = p_weekly_quiz_id;
  
  -- Insert new leaderboard entries
  INSERT INTO weekly_quiz_leaderboard (weekly_quiz_id, user_id, score, rank, time_used)
  SELECT 
    p_weekly_quiz_id,
    user_id,
    score,
    ROW_NUMBER() OVER (ORDER BY score DESC, time_used ASC) as rank,
    seconds_used as time_used
  FROM weekly_quiz_attempts
  WHERE weekly_quiz_id = p_weekly_quiz_id 
    AND completed = true
  ORDER BY score DESC, time_used ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update any existing Genesis quizzes to generic format
UPDATE weekly_quizzes 
SET 
  title = 'Weekly Bible Challenge',
  description = 'Test your knowledge with this week''s special Bible quiz',
  theme = 'Bible'
WHERE title LIKE '%Genesis%' OR title LIKE '%Genesis Focus%';

-- Create a Psalms weekly quiz for current week
INSERT INTO weekly_quizzes (
  week_start_date,
  week_end_date,
  title,
  description,
  theme,
  difficulty,
  total_questions
) VALUES (
  DATE_TRUNC('week', CURRENT_DATE)::DATE,
  DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '6 days',
  'Weekly Bible Challenge',
  'Test your knowledge with this week''s special Bible quiz',
  'Bible',
  'Medium',
  35
) ON CONFLICT (week_start_date) DO NOTHING;

-- Add 35 Psalms questions
INSERT INTO weekly_quiz_questions (weekly_quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) 
SELECT 
  wq.id,
  q.question,
  q.option_a,
  q.option_b,
  q.option_c,
  q.option_d,
  q.correct_index,
  q.order_index
FROM (
  VALUES
  (1, 'How many Psalms are there in the Bible?', '100', '120', '150', '200', 2, 1),
(2, 'Who is traditionally credited with writing most of the Psalms?', 'Solomon', 'David', 'Moses', 'Isaiah', 1, 2),
(3, 'What does Psalm 23 begin with?', 'The Lord is my shepherd', 'Bless the Lord, O my soul', 'The heavens declare the glory of God', 'I will lift up mine eyes unto the hills', 0, 3),
(4, 'Which Psalm is known as the "Shepherd Psalm"?', 'Psalm 1', 'Psalm 23', 'Psalm 91', 'Psalm 100', 1, 4),
(5, 'What is the shortest Psalm?', 'Psalm 1', 'Psalm 23', 'Psalm 117', 'Psalm 150', 2, 5),
(6, 'What is the longest Psalm?', 'Psalm 100', 'Psalm 119', 'Psalm 150', 'Psalm 1', 1, 6),
(7, 'How many verses are in Psalm 119?', '150', '176', '200', '220', 1, 7),
(8, 'What does Psalm 1 say about the blessed man?', 'He walks in the counsel of the wicked', 'He stands in the way of sinners', 'He sits in the seat of mockers', 'He delights in the law of the Lord', 3, 8),
(9, 'Which Psalm begins with "The Lord is my light and my salvation"?', 'Psalm 23', 'Psalm 27', 'Psalm 91', 'Psalm 100', 1, 9),
(10, 'What does Psalm 100 say we should do?', 'Make a joyful noise unto the Lord', 'Be still and know that I am God', 'The Lord is my shepherd', 'Bless the Lord, O my soul', 0, 10),
(11, 'Which Psalm is known as the "Penitential Psalm"?', 'Psalm 23', 'Psalm 32', 'Psalm 51', 'Psalm 100', 2, 11),
(12, 'What does Psalm 91 say about God''s protection?', 'He will give his angels charge over you', 'The Lord is my shepherd', 'Make a joyful noise', 'Bless the Lord, O my soul', 0, 12),
(13, 'Which Psalm begins with "The heavens declare the glory of God"?', 'Psalm 1', 'Psalm 19', 'Psalm 23', 'Psalm 100', 1, 13),
(14, 'What does Psalm 46 say about God?', 'He is my shepherd', 'He is our refuge and strength', 'He is my light', 'He is my salvation', 1, 14),
(15, 'Which Psalm is often called the "Pilgrim Psalm"?', 'Psalm 23', 'Psalm 84', 'Psalm 100', 'Psalm 150', 1, 15),
(16, 'What does Psalm 103 say about God''s benefits?', 'He forgives all your iniquities', 'He heals all your diseases', 'He redeems your life from destruction', 'All of the above', 3, 16),
(17, 'Which Psalm begins with "Bless the Lord, O my soul"?', 'Psalm 23', 'Psalm 103', 'Psalm 150', 'Psalm 1', 1, 17),
(18, 'What does Psalm 139 say about God''s knowledge?', 'He knows when I sit and when I rise', 'He knows my thoughts from afar', 'He knows all my ways', 'All of the above', 3, 18),
(19, 'Which Psalm is known as the "Royal Psalm"?', 'Psalm 2', 'Psalm 23', 'Psalm 91', 'Psalm 100', 0, 19),
(20, 'What does Psalm 8 say about man?', 'He is made a little lower than the angels', 'He is crowned with glory and honor', 'He has dominion over the works of God''s hands', 'All of the above', 3, 20),
(21, 'Which Psalm begins with "O Lord, our Lord, how excellent is thy name"?', 'Psalm 1', 'Psalm 8', 'Psalm 23', 'Psalm 100', 1, 21),
(22, 'What does Psalm 15 ask?', 'Who shall abide in thy tabernacle?', 'Who shall dwell in thy holy hill?', 'Who shall ascend into the hill of the Lord?', 'All of the above', 3, 22),
(23, 'Which Psalm is known as the "Messianic Psalm"?', 'Psalm 2', 'Psalm 22', 'Psalm 110', 'All of the above', 3, 23),
(24, 'What does Psalm 22 begin with?', 'The Lord is my shepherd', 'My God, my God, why hast thou forsaken me?', 'The Lord is my light', 'Bless the Lord, O my soul', 1, 24),
(25, 'Which Psalm is known as the "Suffering Servant Psalm"?', 'Psalm 22', 'Psalm 23', 'Psalm 91', 'Psalm 100', 0, 25),
(26, 'What does Psalm 37 say about the wicked?', 'They shall be cut off', 'They shall not be in authority', 'They shall perish', 'All of the above', 3, 26),
(27, 'Which Psalm begins with "Fret not thyself because of evildoers"?', 'Psalm 1', 'Psalm 23', 'Psalm 37', 'Psalm 100', 2, 27),
(28, 'What does Psalm 40 say about God?', 'He inclined unto me and heard my cry', 'He brought me up out of a horrible pit', 'He set my feet upon a rock', 'All of the above', 3, 28),
(29, 'Which Psalm is known as the "Thanksgiving Psalm"?', 'Psalm 23', 'Psalm 100', 'Psalm 150', 'Both B and C', 3, 29),
(30, 'What does Psalm 150 say about praising God?', 'Praise him with the sound of the trumpet', 'Praise him with the psaltery and harp', 'Let everything that hath breath praise the Lord', 'All of the above', 3, 30),
(31, 'Which Psalm begins with "Praise ye the Lord"?', 'Psalm 100', 'Psalm 150', 'Psalm 1', 'Psalm 23', 1, 31),
(32, 'What does Psalm 121 say about help?', 'My help cometh from the Lord', 'The Lord is thy keeper', 'The Lord shall preserve thee from all evil', 'All of the above', 3, 32),
(33, 'Which Psalm is known as the "Song of Ascents"?', 'Psalm 120', 'Psalm 121', 'Psalm 122', 'All of the above', 3, 33),
(34, 'What does Psalm 127 say about building?', 'Except the Lord build the house, they labor in vain', 'Except the Lord keep the city, the watchman waketh but in vain', 'It is vain for you to rise up early', 'All of the above', 3, 34),
(35, 'Which Psalm is known as the "Wisdom Psalm"?', 'Psalm 1', 'Psalm 37', 'Psalm 49', 'All of the above', 3, 35)
) AS q(question_num, question, option_a, option_b, option_c, option_d, correct_index, order_index)
CROSS JOIN (
  SELECT id FROM weekly_quizzes 
  WHERE title = 'Weekly Bible Challenge - Psalms Focus' 
  LIMIT 1
) wq
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions wqq 
  WHERE wqq.weekly_quiz_id = wq.id 
  AND wqq.order_index = q.order_index
);
