/**
 * Browser Notification Utilities
 * Provides functions to request permission and send browser notifications
 */

export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp?: number;
  actions?: NotificationAction[];
  data?: any;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    try {
      // Check localStorage first, then fall back to browser permission
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        const storedPermission = localStorage.getItem('notification-permission') as NotificationPermission;
        this.permission = storedPermission || Notification.permission;
      } else {
        this.permission = 'default';
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      this.permission = 'default';
    }
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Check if notifications are supported by the browser
   */
  public isSupported(): boolean {
    try {
      return typeof window !== 'undefined' && 'Notification' in window;
    } catch (error) {
      console.warn('Error checking notification support:', error);
      return false;
    }
  }

  /**
   * Get current notification permission status
   */
  public getPermission(): NotificationPermission {
    return this.permission;
  }

  /**
   * Request notification permission from the user
   */
  public async requestPermission(): Promise<NotificationPermission> {
    try {
      if (!this.isSupported()) {
        throw new Error('Notifications are not supported in this browser');
      }

      if (this.permission === 'granted') {
        return this.permission;
      }

      const permission = await Notification.requestPermission();
      this.permission = permission;
      
      // Store permission state in localStorage for persistence
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        try {
          localStorage.setItem('notification-permission', permission);
        } catch (error) {
          console.warn('Error storing permission in localStorage:', error);
        }
      }
      
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  }

  /**
   * Send a browser notification
   */
  public async sendNotification(options: NotificationOptions): Promise<Notification | null> {
    try {
      if (!this.isSupported()) {
        console.warn('Notifications are not supported in this browser');
        return null;
      }

      if (this.permission !== 'granted') {
        console.warn('Notification permission not granted');
        return null;
      }

      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/favicon.ico',
        badge: options.badge,
        tag: options.tag,
        requireInteraction: options.requireInteraction || false,
        silent: options.silent || false,
        timestamp: options.timestamp || Date.now(),
        actions: options.actions,
        data: options.data,
      });

      // Auto-close notification after 5 seconds unless requireInteraction is true
      if (!options.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  }

  /**
   * Send a challenge notification
   */
  public async sendChallengeNotification(challengerName: string, quizTitle: string, message?: string): Promise<Notification | null> {
    return this.sendNotification({
      title: '🎯 New Challenge!',
      body: `${challengerName} wants to challenge you to "${quizTitle}"${message ? ` - ${message}` : ''}`,
      tag: 'challenge',
      requireInteraction: true,
      icon: '/favicon.ico',
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
        timestamp: Date.now()
      }
    });
  }

  /**
   * Send a quiz completion notification
   */
  public async sendQuizCompleteNotification(score: number, totalQuestions: number): Promise<Notification | null> {
    const percentage = Math.round((score / totalQuestions) * 100);
    return this.sendNotification({
      title: '🏆 Quiz Complete!',
      body: `You scored ${score}/${totalQuestions} (${percentage}%)`,
      tag: 'quiz-complete',
      icon: '/favicon.ico',
      data: {
        type: 'quiz-complete',
        score,
        totalQuestions,
        percentage
      }
    });
  }

  /**
   * Send a challenge accepted notification
   */
  public async sendChallengeAcceptedNotification(opponentName: string): Promise<Notification | null> {
    return this.sendNotification({
      title: '⚔️ Challenge Accepted!',
      body: `${opponentName} accepted your challenge. Get ready for battle!`,
      tag: 'challenge-accepted',
      icon: '/favicon.ico',
      data: {
        type: 'challenge-accepted',
        opponentName
      }
    });
  }

  /**
   * Send a challenge declined notification
   */
  public async sendChallengeDeclinedNotification(opponentName: string): Promise<Notification | null> {
    return this.sendNotification({
      title: '❌ Challenge Declined',
      body: `${opponentName} declined your challenge.`,
      tag: 'challenge-declined',
      icon: '/favicon.ico',
      data: {
        type: 'challenge-declined',
        opponentName
      }
    });
  }

  /**
   * Send a quiz reminder notification
   */
  public async sendQuizReminderNotification(quizTitle: string, timeLeft: string): Promise<Notification | null> {
    return this.sendNotification({
      title: '⏰ Quiz Reminder',
      body: `Don't forget about "${quizTitle}" - ${timeLeft} left!`,
      tag: 'quiz-reminder',
      icon: '/favicon.ico',
      data: {
        type: 'quiz-reminder',
        quizTitle,
        timeLeft
      }
    });
  }

  /**
   * Send a leaderboard update notification
   */
  public async sendLeaderboardUpdateNotification(rank: number, totalPlayers: number): Promise<Notification | null> {
    return this.sendNotification({
      title: '📊 Leaderboard Update',
      body: `You're now ranked #${rank} out of ${totalPlayers} players!`,
      tag: 'leaderboard-update',
      icon: '/favicon.ico',
      data: {
        type: 'leaderboard-update',
        rank,
        totalPlayers
      }
    });
  }

  /**
   * Close all notifications with a specific tag
   */
  public closeNotificationsByTag(tag: string): void {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'getRegistrations' in navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.getNotifications({ tag }).then(notifications => {
              notifications.forEach(notification => notification.close());
            });
          });
        });
      }
    } catch (error) {
      console.warn('Error closing notifications by tag:', error);
    }
  }

  /**
   * Close all notifications
   */
  public closeAllNotifications(): void {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'getRegistrations' in navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(registration => {
            registration.getNotifications().then(notifications => {
              notifications.forEach(notification => notification.close());
            });
          });
        });
      }
    } catch (error) {
      console.warn('Error closing all notifications:', error);
    }
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();

// Export convenience functions
export const requestNotificationPermission = () => notificationService.requestPermission();
export const sendNotification = (options: NotificationOptions) => notificationService.sendNotification(options);
export const sendChallengeNotification = (challengerName: string, quizTitle: string, message?: string) => 
  notificationService.sendChallengeNotification(challengerName, quizTitle, message);
export const sendQuizCompleteNotification = (score: number, totalQuestions: number) => 
  notificationService.sendQuizCompleteNotification(score, totalQuestions);
export const sendChallengeAcceptedNotification = (opponentName: string) => 
  notificationService.sendChallengeAcceptedNotification(opponentName);
export const sendChallengeDeclinedNotification = (opponentName: string) => 
  notificationService.sendChallengeDeclinedNotification(opponentName);
export const sendQuizReminderNotification = (quizTitle: string, timeLeft: string) => 
  notificationService.sendQuizReminderNotification(quizTitle, timeLeft);
export const sendLeaderboardUpdateNotification = (rank: number, totalPlayers: number) => 
  notificationService.sendLeaderboardUpdateNotification(rank, totalPlayers);
