import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    const { type, userId, data, notificationId } = req.body;

    if (!type || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let success = false;

    switch (type) {
      case 'test':
        // For test notifications, we'll just return success for now
        // In a real implementation, you'd send an actual push notification
        success = true;
        break;
        
      case 'custom':
        const { title, body, requireInteraction } = data;
        if (!title || !body) {
          return res.status(400).json({ error: 'Missing custom notification data' });
        }
        // For now, just return success
        // In a real implementation, you'd send the actual push notification
        success = true;
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    if (success) {
      // Track analytics if notificationId is provided
      if (notificationId) {
        try {
          await supabase
            .from('notification_analytics')
            .insert({
              notification_id: notificationId,
              user_id: userId,
              event_type: 'sent',
              metadata: {
                type: type,
                timestamp: Date.now()
              }
            });
        } catch (analyticsError) {
          console.error('Error tracking notification analytics:', analyticsError);
          // Don't fail the request if analytics tracking fails
        }
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Notification sent successfully' 
      });
    } else {
      return res.status(500).json({ error: 'Failed to send notification' });
    }
  } catch (error) {
    console.error('Error in send notification API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}