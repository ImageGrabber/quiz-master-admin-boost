import React, { useEffect } from 'react';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

const AutoNotificationRequest: React.FC = () => {
  const {
    permission,
    isSupported,
    requestPermission
  } = useBrowserNotifications();

  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  useEffect(() => {
    // Only auto-request if:
    // 1. Notifications are supported
    // 2. Permission hasn't been requested yet (default state)
    // 3. We haven't already tried in this session
    if (isSupported && permission === 'default') {
      // Check if we've already tried in this session
      const hasTriedThisSession = sessionStorage.getItem('notification-request-attempted');
      
      if (!hasTriedThisSession) {
        // Mark that we've attempted this session
        sessionStorage.setItem('notification-request-attempted', 'true');
        
        // Small delay to let the page load
        const timer = setTimeout(async () => {
          try {
            const newPermission = await requestPermission();
            
            if (newPermission === 'granted') {
              // Show success notification
              setTimeout(() => {
                new Notification('🎉 Notifications Enabled!', {
                  body: 'You\'ll now receive notifications for challenges, quiz updates, and more!',
                  icon: '/favicon.ico',
                  tag: 'permission-granted'
                });
              }, 1000);
            }
          } catch (error) {
            console.error('Error auto-requesting notification permission:', error);
          }
        }, 2000); // 2 second delay
        
        return () => clearTimeout(timer);
      }
    }
  }, [isSupported, permission, requestPermission]);

  // This component doesn't render anything - it just handles the auto-request
  return null;
};

export default AutoNotificationRequest;
