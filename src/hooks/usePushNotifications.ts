import { useState, useEffect, useCallback } from 'react';
import { pushNotificationService, PushNotificationPayload } from '@/lib/pushNotifications';

export interface UsePushNotificationsReturn {
  isSupported: boolean;
  isRegistered: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission;
  isLoading: boolean;
  error: string | null;
  registerServiceWorker: () => Promise<boolean>;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  sendTestNotification: () => Promise<void>;
  requestPermission: () => Promise<NotificationPermission>;
}

/**
 * Custom hook for managing push notifications
 * Provides easy access to push notification functionality with React state management
 */
export const usePushNotifications = (): UsePushNotificationsReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize push notification service
  useEffect(() => {
    const init = async () => {
      setIsSupported(pushNotificationService.isSupported());
      setPermission(pushNotificationService.getPermission());
      
      if (pushNotificationService.isSupported()) {
        try {
          // Check if service worker is already registered
          const registration = await pushNotificationService.registerServiceWorker();
          setIsRegistered(!!registration);
          
          // Check if already subscribed
          const subscribed = await pushNotificationService.isSubscribed();
          setIsSubscribed(subscribed);
        } catch (error) {
          console.error('Error initializing push notifications:', error);
          setError('Failed to initialize push notifications');
        }
      }
    };

    init();
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Push notifications are not supported in this browser');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const registration = await pushNotificationService.registerServiceWorker();
      setIsRegistered(!!registration);
      return !!registration;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to register service worker';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  // Subscribe to push notifications
  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Push notifications are not supported in this browser');
      return false;
    }

    if (permission !== 'granted') {
      setError('Notification permission not granted');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // First register service worker if not already registered
      if (!isRegistered) {
        const registered = await registerServiceWorker();
        if (!registered) {
          return false;
        }
      }

      // Subscribe to push notifications
      const subscription = await pushNotificationService.subscribe();
      
      if (subscription) {
        setIsSubscribed(true);
        
        // Send subscription to server
        const sentToServer = await pushNotificationService.sendSubscriptionToServer(subscription);
        if (!sentToServer) {
          console.warn('Failed to send subscription to server, but subscription was created locally');
        }
        
        return true;
      } else {
        setError('Failed to create push subscription');
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to subscribe to push notifications';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission, isRegistered, registerServiceWorker]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!isSubscribed) {
      return true;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await pushNotificationService.unsubscribe();
      setIsSubscribed(!result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unsubscribe from push notifications';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSubscribed]);

  // Send test notification
  const sendTestNotification = useCallback(async (): Promise<void> => {
    if (!isRegistered) {
      setError('Service worker not registered');
      return;
    }

    try {
      await pushNotificationService.sendTestNotification();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send test notification';
      setError(errorMessage);
    }
  }, [isRegistered]);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    setIsLoading(true);
    setError(null);

    try {
      const newPermission = await pushNotificationService.requestPermission();
      setPermission(newPermission);
      return newPermission;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to request notification permission';
      setError(errorMessage);
      return 'denied';
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isSupported,
    isRegistered,
    isSubscribed,
    permission,
    isLoading,
    error,
    registerServiceWorker,
    subscribe,
    unsubscribe,
    sendTestNotification,
    requestPermission,
  };
};
