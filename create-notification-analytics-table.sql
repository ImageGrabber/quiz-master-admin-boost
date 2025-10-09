-- Create notification_analytics table for tracking push notification performance
CREATE TABLE IF NOT EXISTS notification_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES push_subscriptions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'dismissed')),
  event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notification_analytics_notification_id ON notification_analytics (notification_id);
CREATE INDEX IF NOT EXISTS idx_notification_analytics_user_id ON notification_analytics (user_id);
CREATE INDEX IF NOT EXISTS idx_notification_analytics_event_type ON notification_analytics (event_type);
CREATE INDEX IF NOT EXISTS idx_notification_analytics_timestamp ON notification_analytics (event_timestamp);

-- Create notifications table to track sent notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL,
  sent_by UUID REFERENCES auth.users(id),
  target_users JSONB, -- Array of user IDs or 'all'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB
);

-- Create indexes for notifications table
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications (type);
CREATE INDEX IF NOT EXISTS idx_notifications_sent_at ON notifications (sent_at);
CREATE INDEX IF NOT EXISTS idx_notifications_sent_by ON notifications (sent_by);

-- Create function to track notification events
CREATE OR REPLACE FUNCTION track_notification_event(
  p_notification_id UUID,
  p_user_id UUID,
  p_subscription_id UUID,
  p_event_type TEXT,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO notification_analytics (
    notification_id,
    user_id,
    subscription_id,
    event_type,
    metadata
  ) VALUES (
    p_notification_id,
    p_user_id,
    p_subscription_id,
    p_event_type,
    p_metadata
  ) RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to get notification stats
CREATE OR REPLACE FUNCTION get_notification_stats(p_notification_id UUID)
RETURNS TABLE (
  total_sent INTEGER,
  total_delivered INTEGER,
  total_opened INTEGER,
  total_clicked INTEGER,
  open_rate DECIMAL,
  click_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::INTEGER as total_sent,
    COUNT(CASE WHEN na.event_type = 'delivered' THEN 1 END)::INTEGER as total_delivered,
    COUNT(CASE WHEN na.event_type = 'opened' THEN 1 END)::INTEGER as total_opened,
    COUNT(CASE WHEN na.event_type = 'clicked' THEN 1 END)::INTEGER as total_clicked,
    CASE 
      WHEN COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END) > 0 
      THEN (COUNT(CASE WHEN na.event_type = 'opened' THEN 1 END)::DECIMAL / COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::DECIMAL) * 100
      ELSE 0 
    END as open_rate,
    CASE 
      WHEN COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END) > 0 
      THEN (COUNT(CASE WHEN na.event_type = 'clicked' THEN 1 END)::DECIMAL / COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::DECIMAL) * 100
      ELSE 0 
    END as click_rate
  FROM notification_analytics na
  WHERE na.notification_id = p_notification_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to get overall notification stats
CREATE OR REPLACE FUNCTION get_overall_notification_stats()
RETURNS TABLE (
  total_notifications INTEGER,
  total_sent INTEGER,
  total_delivered INTEGER,
  total_opened INTEGER,
  total_clicked INTEGER,
  overall_open_rate DECIMAL,
  overall_click_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT n.id)::INTEGER as total_notifications,
    COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::INTEGER as total_sent,
    COUNT(CASE WHEN na.event_type = 'delivered' THEN 1 END)::INTEGER as total_delivered,
    COUNT(CASE WHEN na.event_type = 'opened' THEN 1 END)::INTEGER as total_opened,
    COUNT(CASE WHEN na.event_type = 'clicked' THEN 1 END)::INTEGER as total_clicked,
    CASE 
      WHEN COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END) > 0 
      THEN (COUNT(CASE WHEN na.event_type = 'opened' THEN 1 END)::DECIMAL / COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::DECIMAL) * 100
      ELSE 0 
    END as overall_open_rate,
    CASE 
      WHEN COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END) > 0 
      THEN (COUNT(CASE WHEN na.event_type = 'clicked' THEN 1 END)::DECIMAL / COUNT(CASE WHEN na.event_type = 'sent' THEN 1 END)::DECIMAL) * 100
      ELSE 0 
    END as overall_click_rate
  FROM notifications n
  LEFT JOIN notification_analytics na ON n.id = na.notification_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
ALTER TABLE notification_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policies for notification_analytics
CREATE POLICY "Admins can view all notification analytics" ON notification_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policies for notifications
CREATE POLICY "Admins can manage notifications" ON notifications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Insert sample data (optional)
-- INSERT INTO notifications (title, body, type, sent_by, target_users)
-- VALUES (
--   'Welcome to QuizMaster!',
--   'Thank you for subscribing to push notifications.',
--   'welcome',
--   'admin-user-id',
--   '["all"]'::jsonb
-- );
