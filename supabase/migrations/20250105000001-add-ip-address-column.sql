-- Add ip_address column to existing page_views table
ALTER TABLE page_views ADD COLUMN IF NOT EXISTS ip_address INET;

-- Create index for faster queries on ip_address
CREATE INDEX IF NOT EXISTS idx_page_views_ip ON page_views(ip_address);
