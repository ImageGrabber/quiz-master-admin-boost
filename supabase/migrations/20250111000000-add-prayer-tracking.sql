-- Create prayer_tracking table for tracking daily prayers
CREATE TABLE IF NOT EXISTS prayer_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prayer_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, prayer_date) -- Only one record per user per day
);

-- Create prayer_streaks table for tracking prayer streaks
CREATE TABLE IF NOT EXISTS prayer_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_prayer_date DATE,
  total_days_prayed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_prayer_tracking_user_id ON prayer_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_tracking_date ON prayer_tracking(prayer_date);
CREATE INDEX IF NOT EXISTS idx_prayer_tracking_user_date ON prayer_tracking(user_id, prayer_date);
CREATE INDEX IF NOT EXISTS idx_prayer_streaks_user_id ON prayer_streaks(user_id);

-- Enable RLS
ALTER TABLE prayer_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_streaks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for prayer_tracking
CREATE POLICY "Users can view their own prayer tracking" ON prayer_tracking
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prayer tracking" ON prayer_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prayer tracking" ON prayer_tracking
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prayer tracking" ON prayer_tracking
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for prayer_streaks
CREATE POLICY "Users can view their own prayer streaks" ON prayer_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prayer streaks" ON prayer_streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prayer streaks" ON prayer_streaks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prayer streaks" ON prayer_streaks
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to record prayer and update streak
CREATE OR REPLACE FUNCTION record_prayer(
  p_user_id UUID,
  p_prayer_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON AS $$
DECLARE
  v_today DATE := COALESCE(p_prayer_date, CURRENT_DATE);
  v_yesterday DATE := v_today - INTERVAL '1 day';
  v_streak_record RECORD;
  v_new_streak INTEGER;
  v_result JSON;
BEGIN
  -- Insert prayer tracking record
  INSERT INTO prayer_tracking (user_id, prayer_date, updated_at)
  VALUES (p_user_id, v_today, NOW())
  ON CONFLICT (user_id, prayer_date) DO UPDATE SET
    updated_at = NOW();

  -- Get or create streak record
  SELECT * INTO v_streak_record 
  FROM prayer_streaks 
  WHERE user_id = p_user_id;

  IF v_streak_record IS NULL THEN
    -- Create new streak record
    INSERT INTO prayer_streaks (user_id, current_streak, longest_streak, last_prayer_date, total_days_prayed)
    VALUES (p_user_id, 1, 1, v_today, 1);
    v_new_streak := 1;
  ELSE
    -- Update existing streak
    IF v_streak_record.last_prayer_date = v_today THEN
      -- Already prayed today, no streak change
      v_new_streak := v_streak_record.current_streak;
    ELSIF v_streak_record.last_prayer_date = v_yesterday THEN
      -- Consecutive day, increment streak
      v_new_streak := v_streak_record.current_streak + 1;
    ELSE
      -- Break in streak, reset to 1
      v_new_streak := 1;
    END IF;

    UPDATE prayer_streaks SET
      current_streak = v_new_streak,
      longest_streak = GREATEST(v_new_streak, v_streak_record.longest_streak),
      last_prayer_date = v_today,
      total_days_prayed = v_streak_record.total_days_prayed + CASE WHEN v_streak_record.last_prayer_date != v_today THEN 1 ELSE 0 END,
      updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;

  -- Return result
  SELECT json_build_object(
    'current_streak', v_new_streak,
    'longest_streak', GREATEST(v_new_streak, COALESCE(v_streak_record.longest_streak, 0)),
    'total_days_prayed', COALESCE(v_streak_record.total_days_prayed, 0) + CASE WHEN COALESCE(v_streak_record.last_prayer_date, '1900-01-01'::DATE) != v_today THEN 1 ELSE 0 END,
    'message', CASE 
      WHEN v_new_streak = 1 THEN 'Prayer recorded! Your streak has started.'
      ELSE format('Prayer recorded! Your %s-day streak continues!', v_new_streak)
    END
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

