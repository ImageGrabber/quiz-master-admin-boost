-- Fix database permissions for push notifications

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can manage their own push subscriptions" ON push_subscriptions;
DROP POLICY IF EXISTS "Admins can view all notification analytics" ON notification_analytics;
DROP POLICY IF EXISTS "Admins can manage notifications" ON notifications;

-- Create new policies with proper permissions
-- Allow authenticated users to manage their own push subscriptions
CREATE POLICY "Users can manage their own push subscriptions" ON push_subscriptions
  FOR ALL USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own push subscriptions
CREATE POLICY "Users can insert push subscriptions" ON push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own push subscriptions
CREATE POLICY "Users can update push subscriptions" ON push_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow authenticated users to delete their own push subscriptions
CREATE POLICY "Users can delete push subscriptions" ON push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Allow all authenticated users to read notification analytics
CREATE POLICY "Authenticated users can read notification analytics" ON notification_analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all authenticated users to insert notification analytics
CREATE POLICY "Authenticated users can insert notification analytics" ON notification_analytics
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow all authenticated users to read notifications
CREATE POLICY "Authenticated users can read notifications" ON notifications
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all authenticated users to insert notifications
CREATE POLICY "Authenticated users can insert notifications" ON notifications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow all authenticated users to update notifications
CREATE POLICY "Authenticated users can update notifications" ON notifications
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON push_subscriptions TO authenticated;
GRANT ALL ON notification_analytics TO authenticated;
GRANT ALL ON notifications TO authenticated;
