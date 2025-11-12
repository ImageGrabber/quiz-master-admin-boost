-- Create emotional_check_ins table for tracking daily emotional check-ins
CREATE TABLE IF NOT EXISTS emotional_check_ins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  check_in_date DATE NOT NULL,
  emotion VARCHAR(50) NOT NULL, -- very-anxious, stressed, sad, okay, good, great
  thinking_trap VARCHAR(50), -- catastrophizing, self-blame, wellness, etc.
  verse_reference VARCHAR(100), -- e.g., "Matthew 11:28-30"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, check_in_date) -- Only one check-in per user per day
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_emotional_check_ins_user_id ON emotional_check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_emotional_check_ins_date ON emotional_check_ins(check_in_date);
CREATE INDEX IF NOT EXISTS idx_emotional_check_ins_user_date ON emotional_check_ins(user_id, check_in_date);
CREATE INDEX IF NOT EXISTS idx_emotional_check_ins_emotion ON emotional_check_ins(emotion);

-- Enable RLS
ALTER TABLE emotional_check_ins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for emotional_check_ins
CREATE POLICY "Users can view their own emotional check-ins" ON emotional_check_ins
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emotional check-ins" ON emotional_check_ins
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emotional check-ins" ON emotional_check_ins
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emotional check-ins" ON emotional_check_ins
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to upsert emotional check-in
CREATE OR REPLACE FUNCTION upsert_emotional_check_in(
  p_user_id UUID,
  p_emotion VARCHAR(50),
  p_thinking_trap VARCHAR(50) DEFAULT NULL,
  p_verse_reference VARCHAR(100) DEFAULT NULL,
  p_check_in_date DATE DEFAULT CURRENT_DATE
)
RETURNS emotional_check_ins AS $$
DECLARE
  v_result emotional_check_ins;
BEGIN
  INSERT INTO emotional_check_ins (user_id, check_in_date, emotion, thinking_trap, verse_reference, updated_at)
  VALUES (p_user_id, p_check_in_date, p_emotion, p_thinking_trap, p_verse_reference, NOW())
  ON CONFLICT (user_id, check_in_date)
  DO UPDATE SET
    emotion = EXCLUDED.emotion,
    thinking_trap = EXCLUDED.thinking_trap,
    verse_reference = EXCLUDED.verse_reference,
    updated_at = NOW()
  RETURNING * INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get today's emotional check-in
CREATE OR REPLACE FUNCTION get_todays_emotional_check_in(p_user_id UUID)
RETURNS emotional_check_ins AS $$
DECLARE
  v_result emotional_check_ins;
BEGIN
  SELECT * INTO v_result
  FROM emotional_check_ins
  WHERE user_id = p_user_id
    AND check_in_date = CURRENT_DATE
  LIMIT 1;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get emotional check-in history
CREATE OR REPLACE FUNCTION get_emotional_check_in_history(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 30
)
RETURNS TABLE (
  id UUID,
  check_in_date DATE,
  emotion VARCHAR(50),
  thinking_trap VARCHAR(50),
  verse_reference VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    eci.id,
    eci.check_in_date,
    eci.emotion,
    eci.thinking_trap,
    eci.verse_reference,
    eci.created_at
  FROM emotional_check_ins eci
  WHERE eci.user_id = p_user_id
  ORDER BY eci.check_in_date DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

