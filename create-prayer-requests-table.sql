-- Create prayer_requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  request TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_category ON prayer_requests(category);

-- Enable Row Level Security (RLS)
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to approved prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow public read access to prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow public insert for prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow users to update their own prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Allow admins to manage all prayer requests" ON prayer_requests;

-- Create policy to allow public read access to all prayer requests (auto-approved)
CREATE POLICY "Allow public read access to prayer requests" ON prayer_requests
  FOR SELECT USING (true);

-- Create policy to allow public insert for new prayer requests
CREATE POLICY "Allow public insert for prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to update their own prayer requests
CREATE POLICY "Allow users to update their own prayer requests" ON prayer_requests
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create policy to allow admins to manage all prayer requests
CREATE POLICY "Allow admins to manage all prayer requests" ON prayer_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Insert some sample prayer requests for testing
INSERT INTO prayer_requests (name, request, category, is_anonymous, status) VALUES
('John Doe', 'Please pray for my family during this difficult time of illness.', 'healing', false, 'approved'),
('Anonymous', 'Praying for guidance in making important life decisions.', 'guidance', true, 'approved'),
('Sarah Smith', 'Please pray for my grandmother who is recovering from surgery.', 'healing', false, 'approved'),
('Mike Johnson', 'Praying for financial stability and job opportunities.', 'financial', false, 'approved'),
('Anonymous', 'Please pray for peace in our community and world.', 'spiritual', true, 'approved');
