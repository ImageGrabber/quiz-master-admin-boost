-- Create mood_tracking table for tracking daily mood/emotions
CREATE TABLE IF NOT EXISTS mood_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_date DATE NOT NULL,
  mood_type VARCHAR(50) NOT NULL, -- happy, sad, anxious, peaceful, grateful, etc.
  mood_level INTEGER NOT NULL CHECK (mood_level >= 1 AND mood_level <= 10), -- 1-10 scale
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, mood_date) -- Only one record per user per day
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_mood_tracking_user_id ON mood_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_tracking_date ON mood_tracking(mood_date);
CREATE INDEX IF NOT EXISTS idx_mood_tracking_user_date ON mood_tracking(user_id, mood_date);

-- Enable RLS
ALTER TABLE mood_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for mood_tracking
CREATE POLICY "Users can view their own mood tracking" ON mood_tracking
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood tracking" ON mood_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood tracking" ON mood_tracking
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood tracking" ON mood_tracking
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to upsert mood tracking
CREATE OR REPLACE FUNCTION upsert_mood_tracking(
  p_user_id UUID,
  p_mood_type VARCHAR(50),
  p_mood_level INTEGER,
  p_notes TEXT DEFAULT NULL,
  p_mood_date DATE DEFAULT CURRENT_DATE
)
RETURNS mood_tracking AS $$
DECLARE
  v_result mood_tracking;
BEGIN
  INSERT INTO mood_tracking (user_id, mood_date, mood_type, mood_level, notes, updated_at)
  VALUES (p_user_id, p_mood_date, p_mood_type, p_mood_level, p_notes, NOW())
  ON CONFLICT (user_id, mood_date)
  DO UPDATE SET
    mood_type = EXCLUDED.mood_type,
    mood_level = EXCLUDED.mood_level,
    notes = EXCLUDED.notes,
    updated_at = NOW()
  RETURNING * INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

