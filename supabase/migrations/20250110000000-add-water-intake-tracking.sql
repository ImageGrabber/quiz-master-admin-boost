-- Create water_intake table for tracking daily water intake
CREATE TABLE IF NOT EXISTS water_intake (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount_ml INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date) -- Only one record per user per day
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_water_intake_user_id ON water_intake(user_id);
CREATE INDEX IF NOT EXISTS idx_water_intake_date ON water_intake(date);
CREATE INDEX IF NOT EXISTS idx_water_intake_user_date ON water_intake(user_id, date);

-- Enable RLS
ALTER TABLE water_intake ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for water_intake
CREATE POLICY "Users can view their own water intake" ON water_intake
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own water intake" ON water_intake
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own water intake" ON water_intake
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own water intake" ON water_intake
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to upsert water intake (insert or update if exists)
CREATE OR REPLACE FUNCTION upsert_water_intake(
  p_user_id UUID,
  p_amount_ml INTEGER,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS water_intake AS $$
DECLARE
  v_result water_intake;
BEGIN
  INSERT INTO water_intake (user_id, amount_ml, date, updated_at)
  VALUES (p_user_id, p_amount_ml, p_date, NOW())
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    amount_ml = EXCLUDED.amount_ml,
    updated_at = NOW()
  RETURNING * INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

