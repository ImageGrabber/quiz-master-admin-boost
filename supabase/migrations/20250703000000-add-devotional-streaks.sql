-- Create devotional_streaks table for tracking daily devotional reading streaks
CREATE TABLE IF NOT EXISTS devotional_streaks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_read_date DATE,
    total_days_read INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create devotional_reads table for tracking individual devotional readings
CREATE TABLE IF NOT EXISTS devotional_reads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    read_date DATE NOT NULL,
    devotional_date TEXT NOT NULL,
    devotional_title TEXT NOT NULL,
    devotional_verse TEXT NOT NULL,
    time_spent_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, read_date)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_devotional_streaks_user_id ON devotional_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_devotional_reads_user_id ON devotional_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_devotional_reads_date ON devotional_reads(read_date);

-- Enable RLS
ALTER TABLE devotional_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotional_reads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for devotional_streaks
CREATE POLICY "Users can view their own devotional streaks" ON devotional_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devotional streaks" ON devotional_streaks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devotional streaks" ON devotional_streaks
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devotional streaks" ON devotional_streaks
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for devotional_reads
CREATE POLICY "Users can view their own devotional reads" ON devotional_reads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own devotional reads" ON devotional_reads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own devotional reads" ON devotional_reads
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devotional reads" ON devotional_reads
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_devotional_streaks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at for devotional_streaks
CREATE TRIGGER update_devotional_streaks_updated_at 
    BEFORE UPDATE ON devotional_streaks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_devotional_streaks_updated_at();

-- Create function to record devotional read and update streak
CREATE OR REPLACE FUNCTION record_devotional_read(
    p_user_id UUID,
    p_devotional_date TEXT,
    p_devotional_title TEXT,
    p_devotional_verse TEXT,
    p_time_spent_seconds INTEGER DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_today DATE := CURRENT_DATE;
    v_yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    v_streak_record RECORD;
    v_new_streak INTEGER;
    v_result JSON;
BEGIN
    -- Insert or update devotional read record
    INSERT INTO devotional_reads (user_id, read_date, devotional_date, devotional_title, devotional_verse, time_spent_seconds)
    VALUES (p_user_id, v_today, p_devotional_date, p_devotional_title, p_devotional_verse, p_time_spent_seconds)
    ON CONFLICT (user_id, read_date) DO UPDATE SET
        devotional_date = EXCLUDED.devotional_date,
        devotional_title = EXCLUDED.devotional_title,
        devotional_verse = EXCLUDED.devotional_verse,
        time_spent_seconds = COALESCE(EXCLUDED.time_spent_seconds, devotional_reads.time_spent_seconds);

    -- Get or create streak record
    SELECT * INTO v_streak_record 
    FROM devotional_streaks 
    WHERE user_id = p_user_id;

    IF v_streak_record IS NULL THEN
        -- Create new streak record
        INSERT INTO devotional_streaks (user_id, current_streak, longest_streak, last_read_date, total_days_read)
        VALUES (p_user_id, 1, 1, v_today, 1);
        v_new_streak := 1;
    ELSE
        -- Update existing streak
        IF v_streak_record.last_read_date = v_today THEN
            -- Already read today, no streak change
            v_new_streak := v_streak_record.current_streak;
        ELSIF v_streak_record.last_read_date = v_yesterday THEN
            -- Consecutive day, increment streak
            v_new_streak := v_streak_record.current_streak + 1;
        ELSE
            -- Break in streak, reset to 1
            v_new_streak := 1;
        END IF;

        UPDATE devotional_streaks SET
            current_streak = v_new_streak,
            longest_streak = GREATEST(v_new_streak, v_streak_record.longest_streak),
            last_read_date = v_today,
            total_days_read = v_streak_record.total_days_read + CASE WHEN v_streak_record.last_read_date != v_today THEN 1 ELSE 0 END
        WHERE user_id = p_user_id;
    END IF;

    -- Return result
    SELECT json_build_object(
        'current_streak', v_new_streak,
        'longest_streak', GREATEST(v_new_streak, COALESCE(v_streak_record.longest_streak, 0)),
        'total_days_read', COALESCE(v_streak_record.total_days_read, 0) + CASE WHEN COALESCE(v_streak_record.last_read_date, '1900-01-01'::DATE) != v_today THEN 1 ELSE 0 END,
        'message', CASE 
            WHEN v_new_streak = 1 THEN 'Great start! You''ve begun your devotional journey.'
            WHEN v_new_streak = 7 THEN 'Amazing! You''ve completed a week of daily devotionals!'
            WHEN v_new_streak = 30 THEN 'Incredible! You''ve maintained a month-long devotional streak!'
            WHEN v_new_streak = 100 THEN 'Outstanding! You''ve reached 100 days of daily devotionals!'
            ELSE 'Keep up the great work! Your devotional streak continues.'
        END
    ) INTO v_result;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 