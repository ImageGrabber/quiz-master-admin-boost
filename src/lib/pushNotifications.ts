/**
 * Push Notification Service
 * Handles service worker registration and push notification management
 */

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

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;
  private vapidPublicKey: string | null = null;

  private constructor() {
    try {
      // Import VAPID config
      const { getVapidPublicKey } = require('@/config/vapid');
      this.vapidPublicKey = getVapidPublicKey();
      console.log('VAPID public key loaded:', this.vapidPublicKey ? 'Yes' : 'No');
    } catch (error) {
      console.warn('Failed to load VAPID config:', error);
      this.vapidPublicKey = null;
    }
  }

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  /**
   * Check if push notifications are supported
   */
  public isSupported(): boolean {
    try {
      return typeof window !== 'undefined' && 
             'serviceWorker' in navigator && 
             'PushManager' in window;
    } catch (error) {
      console.warn('Error checking push notification support:', error);
      return false;
    }
  }

  /**
   * Register service worker
   */
  public async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported()) {
      console.warn('Push notifications are not supported in this browser');
      return null;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully:', this.registration);
      
      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;
      
      return this.registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  /**
   * Get current push subscription
   */
  public async getSubscription(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        await this.registerServiceWorker();
      }

      if (!this.registration) {
        return null;
      }

      this.subscription = await this.registration.pushManager.getSubscription();
      return this.subscription;
    } catch (error) {
      console.error('Error getting push subscription:', error);
      return null;
    }
  }

  /**
   * Subscribe to push notifications
   */
  public async subscribe(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        await this.registerServiceWorker();
      }

      if (!this.registration) {
        throw new Error('Service Worker not registered');
      }

      if (!this.vapidPublicKey) {
        console.warn('VAPID public key not configured. Using default subscription.');
        // Try to subscribe without VAPID key (may not work on all browsers)
        try {
          this.subscription = await this.registration.pushManager.subscribe({
            userVisibleOnly: true
          });
          
          console.log('Push subscription successful (without VAPID):', this.subscription);
          localStorage.setItem('push-subscription', JSON.stringify(this.subscription.toJSON()));
          return this.subscription;
        } catch (error) {
          console.error('Push subscription failed without VAPID key:', error);
          throw new Error('VAPID public key not configured and subscription failed');
        }
      }

      // Convert VAPID key to Uint8Array
      const applicationServerKey = this.urlBase64ToUint8Array(this.vapidPublicKey);
      
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });

      console.log('Push subscription successful:', this.subscription);
      
      // Store subscription in localStorage
      localStorage.setItem('push-subscription', JSON.stringify(this.subscription.toJSON()));
      
      return this.subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  public async unsubscribe(): Promise<boolean> {
    try {
      if (!this.subscription) {
        return true;
      }

      const result = await this.subscription.unsubscribe();
      this.subscription = null;
      
      // Remove from localStorage
      localStorage.removeItem('push-subscription');
      
      console.log('Push unsubscription successful:', result);
      return result;
    } catch (error) {
      console.error('Push unsubscription failed:', error);
      return false;
    }
  }

  /**
   * Check if user is subscribed to push notifications
   */
  public async isSubscribed(): Promise<boolean> {
    try {
      const subscription = await this.getSubscription();
      return subscription !== null;
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  }

  /**
   * Send subscription to server
   */
  public async sendSubscriptionToServer(subscription: PushSubscription): Promise<boolean> {
    try {
      // Get the current user's auth token
      const { createClient } = await import('@/integrations/supabase/client');
      const supabase = createClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        console.error('No authenticated user found');
        return false;
      }

      console.log('💾 Saving push subscription to database...');

      // Save subscription directly to Supabase
      const { data, error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: session.user.id,
          endpoint: subscription.endpoint,
          p256dh: subscription.getKey('p256dh'),
          auth: subscription.getKey('auth'),
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('❌ Error saving subscription to database:', error);
        return false;
      }

      console.log('✅ Subscription saved to database successfully:', data);
      return true;
    } catch (error) {
      console.error('❌ Error sending subscription to server:', error);
      return false;
    }
  }

  /**
   * Send test push notification
   */
  public async sendTestNotification(): Promise<void> {
    try {
      if (!this.registration) {
        throw new Error('Service Worker not registered');
      }

      const notificationData: PushNotificationPayload = {
        title: '🧪 Test Push Notification',
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
          type: 'test'
        }
      };

      await this.registration.showNotification(notificationData.title, notificationData);
    } catch (error) {
      console.error('Error showing test notification:', error);
      throw error;
    }
  }

  /**
   * Request notification permission
   */
  public async requestPermission(): Promise<NotificationPermission> {
    try {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        throw new Error('Notifications are not supported in this browser');
      }

      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Get current notification permission
   */
  public getPermission(): NotificationPermission {
    try {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        return Notification.permission;
      }
      return 'denied';
    } catch (error) {
      console.warn('Error getting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Convert VAPID key from base64 to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    try {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    } catch (error) {
      console.error('Error converting VAPID key:', error);
      throw new Error('Invalid VAPID key format');
    }
  }

  /**
   * Get subscription data for server
   */
  public getSubscriptionData(): PushSubscriptionData | null {
    try {
      if (!this.subscription) {
        return null;
      }

      const subscriptionData = this.subscription.toJSON();
      return {
        endpoint: subscriptionData.endpoint!,
        keys: {
          p256dh: subscriptionData.keys!.p256dh,
          auth: subscriptionData.keys!.auth
        }
      };
    } catch (error) {
      console.error('Error getting subscription data:', error);
      return null;
    }
  }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance();

// Export convenience functions
export const registerServiceWorker = () => pushNotificationService.registerServiceWorker();
export const subscribeToPush = () => pushNotificationService.subscribe();
export const unsubscribeFromPush = () => pushNotificationService.unsubscribe();
export const isPushSubscribed = () => pushNotificationService.isSubscribed();
export const sendTestPushNotification = () => pushNotificationService.sendTestNotification();
export const requestPushPermission = () => pushNotificationService.requestPermission();
export const getPushPermission = () => pushNotificationService.getPermission();
