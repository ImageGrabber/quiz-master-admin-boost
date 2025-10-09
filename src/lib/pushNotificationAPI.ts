/**
 * Push Notification API
 * Handles server-side push notification operations
 */

import webpush from 'web-push';
import { getVapidPrivateKey, getVapidPublicKey, getVapidSubject } from '@/config/vapid';

// Configure web-push with VAPID keys
const vapidKeys = {
  publicKey: getVapidPublicKey(),
  privateKey: getVapidPrivateKey(),
  subject: getVapidSubject()
};

webpush.setVapidDetails(
  vapidKeys.subject,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: any;
}

/**
 * Store push subscription in database
 */
export async function storePushSubscription(
  userId: string,
  subscription: PushSubscriptionData,
  userAgent?: string
): Promise<boolean> {
  try {
    const { createClient } = await import('@/integrations/supabase/server');
    const supabase = createClient();

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        user_agent: userAgent,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error storing push subscription:', error);
      return false;
    }

    console.log('Push subscription stored successfully for user:', userId);
    return true;
  } catch (error) {
    console.error('Error in storePushSubscription:', error);
    return false;
  }
}

/**
 * Get push subscriptions for a user
 */
export async function getUserPushSubscriptions(userId: string): Promise<PushSubscriptionData[]> {
  try {
    const { createClient } = await import('@/integrations/supabase/server');
    const supabase = createClient();

    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .eq('user_id', userId);

    if (error) {
      console.error('Error getting push subscriptions:', error);
      return [];
    }

    return data.map(sub => ({
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth
      }
    }));
  } catch (error) {
    console.error('Error in getUserPushSubscriptions:', error);
    return [];
  }
}

/**
 * Send push notification to a specific user
 */
export async function sendPushNotificationToUser(
  userId: string,
  payload: PushNotificationPayload,
  notificationId?: string
): Promise<boolean> {
  try {
    const subscriptions = await getUserPushSubscriptions(userId);
    
    if (subscriptions.length === 0) {
      console.log(`No push subscriptions found for user ${userId}`);
      return false;
    }

    const results = await Promise.allSettled(
      subscriptions.map(subscription => 
        sendPushNotification(subscription, payload, notificationId)
      )
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    console.log(`Sent push notification to ${successful}/${subscriptions.length} subscriptions for user ${userId}`);
    
    return successful > 0;
  } catch (error) {
    console.error('Error sending push notification to user:', error);
    return false;
  }
}

/**
 * Send push notification to multiple users
 */
export async function sendPushNotificationToUsers(
  userIds: string[],
  payload: PushNotificationPayload
): Promise<{ success: number; failed: number }> {
  const results = await Promise.allSettled(
    userIds.map(userId => sendPushNotificationToUser(userId, payload))
  );

  const success = results.filter(result => result.status === 'fulfilled' && result.value).length;
  const failed = results.length - success;

  return { success, failed };
}

/**
 * Send push notification to a subscription
 */
export async function sendPushNotification(
  subscription: PushSubscriptionData,
  payload: PushNotificationPayload,
  notificationId?: string
): Promise<boolean> {
  try {
    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth
      }
    };

    await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
    
    // Track notification sent event
    if (notificationId) {
      await trackNotificationEvent(notificationId, 'sent', {
        endpoint: subscription.endpoint,
        timestamp: Date.now()
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error sending push notification:', error);
    return false;
  }
}

/**
 * Track notification events for analytics
 */
export async function trackNotificationEvent(
  notificationId: string,
  eventType: 'sent' | 'delivered' | 'opened' | 'clicked' | 'dismissed',
  metadata?: any
): Promise<void> {
  try {
    const { createClient } = await import('@/integrations/supabase/server');
    const supabase = createClient();

    await supabase.rpc('track_notification_event', {
      p_notification_id: notificationId,
      p_user_id: null, // Will be filled by the function
      p_subscription_id: null, // Will be filled by the function
      p_event_type: eventType,
      p_metadata: metadata
    });
  } catch (error) {
    console.error('Error tracking notification event:', error);
  }
}

/**
 * Send test notification to a user
 */
export async function sendTestNotification(userId: string): Promise<boolean> {
  const payload: PushNotificationPayload = {
    title: '🧪 Test Notification',
    body: 'This is a test push notification from QuizMaster!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'test-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icons/check.svg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/x.svg'
      }
    ],
    data: {
      url: '/',
      type: 'test',
      timestamp: Date.now()
    }
  };

  return await sendPushNotificationToUser(userId, payload);
}

/**
 * Send challenge notification
 */
export async function sendChallengeNotification(
  challengedUserId: string,
  challengerName: string,
  quizTitle: string,
  message?: string
): Promise<boolean> {
  const payload: PushNotificationPayload = {
    title: '🎯 New Challenge!',
    body: `${challengerName} wants to challenge you to "${quizTitle}"${message ? ` - ${message}` : ''}`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'challenge',
    requireInteraction: true,
    actions: [
      {
        action: 'accept',
        title: 'Accept Challenge',
        icon: '/icons/check.svg'
      },
      {
        action: 'decline',
        title: 'Decline',
        icon: '/icons/x.svg'
      }
    ],
    data: {
      type: 'challenge',
      challengerName,
      quizTitle,
      message,
      timestamp: Date.now()
    }
  };

  return await sendPushNotificationToUser(challengedUserId, payload);
}

/**
 * Send quiz completion notification
 */
export async function sendQuizCompleteNotification(
  userId: string,
  score: number,
  totalQuestions: number
): Promise<boolean> {
  const percentage = Math.round((score / totalQuestions) * 100);
  const payload: PushNotificationPayload = {
    title: '🏆 Quiz Complete!',
    body: `You scored ${score}/${totalQuestions} (${percentage}%)`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'quiz-complete',
    data: {
      type: 'quiz-complete',
      score,
      totalQuestions,
      percentage,
      timestamp: Date.now()
    }
  };

  return await sendPushNotificationToUser(userId, payload);
}

/**
 * Send leaderboard update notification
 */
export async function sendLeaderboardUpdateNotification(
  userId: string,
  rank: number,
  totalPlayers: number
): Promise<boolean> {
  const payload: PushNotificationPayload = {
    title: '📊 Leaderboard Update',
    body: `You're now ranked #${rank} out of ${totalPlayers} players!`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'leaderboard-update',
    data: {
      type: 'leaderboard-update',
      rank,
      totalPlayers,
      timestamp: Date.now()
    }
  };

  return await sendPushNotificationToUser(userId, payload);
}
