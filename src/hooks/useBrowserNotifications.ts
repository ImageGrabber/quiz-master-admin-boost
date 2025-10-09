import { useState, useEffect, useCallback } from 'react';
import { notificationService, NotificationOptions } from '@/lib/notifications';

export interface UseBrowserNotificationsReturn {
  permission: NotificationPermission;
  isSupported: boolean;
  requestPermission: () => Promise<NotificationPermission>;
  sendNotification: (options: NotificationOptions) => Promise<Notification | null>;
  sendChallengeNotification: (challengerName: string, quizTitle: string, message?: string) => Promise<Notification | null>;
  sendQuizCompleteNotification: (score: number, totalQuestions: number) => Promise<Notification | null>;
  sendChallengeAcceptedNotification: (opponentName: string) => Promise<Notification | null>;
  sendChallengeDeclinedNotification: (opponentName: string) => Promise<Notification | null>;
  sendQuizReminderNotification: (quizTitle: string, timeLeft: string) => Promise<Notification | null>;
  sendLeaderboardUpdateNotification: (rank: number, totalPlayers: number) => Promise<Notification | null>;
  closeNotificationsByTag: (tag: string) => void;
  closeAllNotifications: () => void;
}

/**
 * Custom hook for managing browser notifications
 * Provides easy access to notification functionality with React state management
 */
export const useBrowserNotifications = (): UseBrowserNotificationsReturn => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  // Initialize notification service
  useEffect(() => {
    setIsSupported(notificationService.isSupported());
    setPermission(notificationService.getPermission());
  }, []);

  // Request permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    try {
      const newPermission = await notificationService.requestPermission();
      setPermission(newPermission);
      return newPermission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      throw error;
    }
  }, []);

  // Send generic notification
  const sendNotification = useCallback(async (options: NotificationOptions): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendNotification(options);
  }, [permission]);

  // Send challenge notification
  const sendChallengeNotification = useCallback(async (
    challengerName: string, 
    quizTitle: string, 
    message?: string
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendChallengeNotification(challengerName, quizTitle, message);
  }, [permission]);

  // Send quiz complete notification
  const sendQuizCompleteNotification = useCallback(async (
    score: number, 
    totalQuestions: number
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendQuizCompleteNotification(score, totalQuestions);
  }, [permission]);

  // Send challenge accepted notification
  const sendChallengeAcceptedNotification = useCallback(async (
    opponentName: string
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendChallengeAcceptedNotification(opponentName);
  }, [permission]);

  // Send challenge declined notification
  const sendChallengeDeclinedNotification = useCallback(async (
    opponentName: string
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendChallengeDeclinedNotification(opponentName);
  }, [permission]);

  // Send quiz reminder notification
  const sendQuizReminderNotification = useCallback(async (
    quizTitle: string, 
    timeLeft: string
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendQuizReminderNotification(quizTitle, timeLeft);
  }, [permission]);

  // Send leaderboard update notification
  const sendLeaderboardUpdateNotification = useCallback(async (
    rank: number, 
    totalPlayers: number
  ): Promise<Notification | null> => {
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }
    return notificationService.sendLeaderboardUpdateNotification(rank, totalPlayers);
  }, [permission]);

  // Close notifications by tag
  const closeNotificationsByTag = useCallback((tag: string) => {
    notificationService.closeNotificationsByTag(tag);
  }, []);

  // Close all notifications
  const closeAllNotifications = useCallback(() => {
    notificationService.closeAllNotifications();
  }, []);

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    sendChallengeNotification,
    sendQuizCompleteNotification,
    sendChallengeAcceptedNotification,
    sendChallengeDeclinedNotification,
    sendQuizReminderNotification,
    sendLeaderboardUpdateNotification,
    closeNotificationsByTag,
    closeAllNotifications,
  };
};
