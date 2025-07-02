-- Create study_progress table for tracking Bible study plan progress
CREATE TABLE IF NOT EXISTS study_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    plan_id TEXT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_lessons INTEGER DEFAULT 0,
    total_lessons INTEGER NOT NULL,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, plan_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_study_progress_user_id ON study_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_study_progress_plan_id ON study_progress(plan_id);

-- Enable RLS
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own study progress" ON study_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own study progress" ON study_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study progress" ON study_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own study progress" ON study_progress
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_study_progress_updated_at 
    BEFORE UPDATE ON study_progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 