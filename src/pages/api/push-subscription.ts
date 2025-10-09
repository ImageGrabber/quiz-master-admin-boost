import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { storePushSubscription } from '@/lib/pushNotificationAPI';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subscription, userAgent } = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Validate subscription data
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ error: 'Invalid subscription data' });
    }

    // Store the subscription
    const success = await storePushSubscription(
      user.id,
      subscription,
      userAgent
    );

    if (success) {
      // Send a test notification
      const testPayload = {
        title: '🎉 Push Notifications Enabled!',
        body: 'You\'ll now receive notifications for challenges, quiz updates, and more!',
        icon: '/favicon.ico',
        tag: 'subscription-success',
        data: {
          type: 'subscription-success',
          timestamp: Date.now()
        }
      };

      // Send test notification (optional)
      try {
        const { sendPushNotification } = await import('@/lib/pushNotificationAPI');
        await sendPushNotification(subscription, testPayload);
      } catch (error) {
        console.log('Test notification failed, but subscription was stored:', error);
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Push subscription stored successfully' 
      });
    } else {
      return res.status(500).json({ error: 'Failed to store subscription' });
    }
  } catch (error) {
    console.error('Error in push subscription API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
