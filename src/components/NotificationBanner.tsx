import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X, CheckCircle } from 'lucide-react';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

const NotificationBanner: React.FC = () => {
  const {
    permission,
    isSupported,
    requestPermission
  } = useBrowserNotifications();

  // Don't render if there's an error or not supported
  if (!isSupported) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Show banner if notifications are supported and permission is not granted
    if (isSupported && permission !== 'granted') {
      // Check if user has dismissed the banner before
      const hasDismissed = localStorage.getItem('notification-banner-dismissed');
      if (!hasDismissed) {
        setIsVisible(true);
      }
    }
  }, [isSupported, permission]);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const newPermission = await requestPermission();
      
      if (newPermission === 'granted') {
        setIsVisible(false);
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
      console.error('Error requesting notification permission:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('notification-banner-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5" />
          <div>
            <p className="font-medium">Enable Notifications</p>
            <p className="text-sm text-blue-100">
              Get notified about challenges, quiz updates, and leaderboard changes!
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRequestPermission}
            disabled={isRequesting}
            size="sm"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Enabling...
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Enable
              </>
            )}
          </Button>
          
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-400"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
