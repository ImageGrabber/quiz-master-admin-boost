-- Create feedback table for collecting user feedback
-- This table stores feedback submissions from the homepage feedback form

-- 1. Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  place VARCHAR(255) NOT NULL,
  feedback TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_name ON feedback(name);

-- 3. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger to update updated_at on row updates
DROP TRIGGER IF EXISTS update_feedback_updated_at_trigger ON feedback;
CREATE TRIGGER update_feedback_updated_at_trigger
  BEFORE UPDATE ON feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_feedback_updated_at();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert for feedback" ON feedback;
DROP POLICY IF EXISTS "Allow public read access to feedback" ON feedback;
DROP POLICY IF EXISTS "Allow admins to manage all feedback" ON feedback;
DROP POLICY IF EXISTS "Allow authenticated users to manage feedback" ON feedback;

-- 7. Create policy to allow public insert for new feedback submissions
CREATE POLICY "Allow public insert for feedback" ON feedback
  FOR INSERT WITH CHECK (true);

-- 8. Create policy to allow public read access (users can see their own feedback if needed)
-- For now, we'll allow public read but you can restrict this later
CREATE POLICY "Allow public read access to feedback" ON feedback
  FOR SELECT USING (true);

-- 9. Create policy to allow admins to manage all feedback
-- Note: This assumes you have a profiles table with role column
-- If profiles table doesn't exist, comment out this policy or create the profiles table first
-- 
-- Option 1: If profiles table exists (uncomment this):
/*
CREATE POLICY "Allow admins to manage all feedback" ON feedback
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
*/

-- Option 2: If profiles table doesn't exist, use this simpler policy instead:
-- This allows any authenticated user to manage feedback (less secure)
CREATE POLICY "Allow authenticated users to manage feedback" ON feedback
  FOR ALL USING (auth.uid() IS NOT NULL);

-- 10. Enable real-time subscriptions (optional, for admin dashboard)
-- Only add if not already in publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'feedback'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE feedback;
  END IF;
END $$;

-- 11. Add comments for documentation
COMMENT ON TABLE feedback IS 'Stores user feedback submissions from the homepage feedback form';
COMMENT ON COLUMN feedback.name IS 'Name of the person providing feedback';
COMMENT ON COLUMN feedback.place IS 'Location/place of the person providing feedback';
COMMENT ON COLUMN feedback.feedback IS 'The actual feedback text';
COMMENT ON COLUMN feedback.status IS 'Status of the feedback: new, read, or archived';
COMMENT ON COLUMN feedback.created_at IS 'Timestamp when feedback was submitted';
COMMENT ON COLUMN feedback.updated_at IS 'Timestamp when feedback was last updated';

-- Success message
SELECT 'Feedback table created successfully!' as result;

