/**
 * Server-side Push Notification Service
 * Handles sending push notifications to subscribed users
 */

export interface PushNotificationData {
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

export interface UserPushSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export class PushNotificationServer {
  private static instance: PushNotificationServer;
  private vapidPrivateKey: string;
  private vapidPublicKey: string;
  private vapidSubject: string;

  private constructor() {
    // Import VAPID config
    const { getVapidPrivateKey, getVapidPublicKey, getVapidSubject } = require('@/config/vapid');
    this.vapidPrivateKey = getVapidPrivateKey();
    this.vapidPublicKey = getVapidPublicKey();
    this.vapidSubject = getVapidSubject();
    console.log('VAPID keys loaded for server:', {
      hasPrivateKey: !!this.vapidPrivateKey,
      hasPublicKey: !!this.vapidPublicKey,
      subject: this.vapidSubject
    });
  }

  public static getInstance(): PushNotificationServer {
    if (!PushNotificationServer.instance) {
      PushNotificationServer.instance = new PushNotificationServer();
    }
    return PushNotificationServer.instance;
  }

  /**
   * Send push notification to a specific user
   */
  public async sendToUser(userId: string, notification: PushNotificationData): Promise<boolean> {
    try {
      // Get user's push subscription from database
      const subscription = await this.getUserSubscription(userId);
      if (!subscription) {
        console.log(`No push subscription found for user ${userId}`);
        return false;
      }

      return await this.sendPushNotification(subscription, notification);
    } catch (error) {
      console.error('Error sending push notification to user:', error);
      return false;
    }
  }

  /**
   * Send push notification to multiple users
   */
  public async sendToUsers(userIds: string[], notification: PushNotificationData): Promise<{ success: number; failed: number }> {
    const results = await Promise.allSettled(
      userIds.map(userId => this.sendToUser(userId, notification))
    );

    const success = results.filter(result => result.status === 'fulfilled' && result.value).length;
    const failed = results.length - success;

    return { success, failed };
  }

  /**
   * Send challenge notification
   */
  public async sendChallengeNotification(
    challengedUserId: string,
    challengerName: string,
    quizTitle: string,
    message?: string
  ): Promise<boolean> {
    const notification: PushNotificationData = {
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

    return await this.sendToUser(challengedUserId, notification);
  }

  /**
   * Send challenge accepted notification
   */
  public async sendChallengeAcceptedNotification(
    challengerUserId: string,
    opponentName: string
  ): Promise<boolean> {
    const notification: PushNotificationData = {
      title: '⚔️ Challenge Accepted!',
      body: `${opponentName} accepted your challenge. Get ready for battle!`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'challenge-accepted',
      data: {
        type: 'challenge-accepted',
        opponentName,
        timestamp: Date.now()
      }
    };

    return await this.sendToUser(challengerUserId, notification);
  }

  /**
   * Send challenge declined notification
   */
  public async sendChallengeDeclinedNotification(
    challengerUserId: string,
    opponentName: string
  ): Promise<boolean> {
    const notification: PushNotificationData = {
      title: '❌ Challenge Declined',
      body: `${opponentName} declined your challenge.`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'challenge-declined',
      data: {
        type: 'challenge-declined',
        opponentName,
        timestamp: Date.now()
      }
    };

    return await this.sendToUser(challengerUserId, notification);
  }

  /**
   * Send quiz completion notification
   */
  public async sendQuizCompleteNotification(
    userId: string,
    score: number,
    totalQuestions: number
  ): Promise<boolean> {
    const percentage = Math.round((score / totalQuestions) * 100);
    const notification: PushNotificationData = {
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

    return await this.sendToUser(userId, notification);
  }

  /**
   * Send leaderboard update notification
   */
  public async sendLeaderboardUpdateNotification(
    userId: string,
    rank: number,
    totalPlayers: number
  ): Promise<boolean> {
    const notification: PushNotificationData = {
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

    return await this.sendToUser(userId, notification);
  }

  /**
   * Send quiz reminder notification
   */
  public async sendQuizReminderNotification(
    userId: string,
    quizTitle: string,
    timeLeft: string
  ): Promise<boolean> {
    const notification: PushNotificationData = {
      title: '⏰ Quiz Reminder',
      body: `Don't forget about "${quizTitle}" - ${timeLeft} left!`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'quiz-reminder',
      data: {
        type: 'quiz-reminder',
        quizTitle,
        timeLeft,
        timestamp: Date.now()
      }
    };

    return await this.sendToUser(userId, notification);
  }

  /**
   * Get user's push subscription from database
   */
  private async getUserSubscription(userId: string): Promise<UserPushSubscription | null> {
    // This would typically query your database
    // For now, we'll return null as a placeholder
    // In a real implementation, you'd query your database here
    console.log(`Getting push subscription for user ${userId}`);
    return null;
  }

  /**
   * Send push notification using web-push library
   */
  private async sendPushNotification(
    subscription: UserPushSubscription,
    notification: PushNotificationData
  ): Promise<boolean> {
    try {
      // This would use the web-push library to send the notification
      // For now, we'll simulate the process
      console.log('Sending push notification:', {
        endpoint: subscription.endpoint,
        notification
      });

      // In a real implementation, you would:
      // 1. Import web-push library
      // 2. Set VAPID details
      // 3. Send the notification
      
      return true;
    } catch (error) {
      console.error('Error sending push notification:', error);
      return false;
    }
  }
}

// Export singleton instance
export const pushNotificationServer = PushNotificationServer.getInstance();
