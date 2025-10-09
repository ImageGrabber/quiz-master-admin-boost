import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, X } from 'lucide-react';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

interface GlobalNotificationRequestProps {
  onDismiss?: () => void;
}

const GlobalNotificationRequest: React.FC<GlobalNotificationRequestProps> = ({ onDismiss }) => {
  const {
    permission,
    isSupported,
    requestPermission
  } = useBrowserNotifications();

  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  const [isRequesting, setIsRequesting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  // Check if we've already shown the notification request
  useEffect(() => {
    const hasShown = localStorage.getItem('notification-request-shown');
    if (hasShown === 'true') {
      setHasShownOnce(true);
    }
  }, []);

  // Auto-request permission on first visit
  useEffect(() => {
    if (isSupported && permission === 'default' && !hasShownOnce && !isDismissed) {
      // Small delay to let the page load
      const timer = setTimeout(() => {
        handleRequestPermission();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isSupported, permission, hasShownOnce, isDismissed]);

  const handleRequestPermission = async () => {
    if (!isSupported || permission === 'granted') return;

    setIsRequesting(true);
    try {
      const newPermission = await requestPermission();
      
      // Mark as shown in localStorage
      localStorage.setItem('notification-request-shown', 'true');
      setHasShownOnce(true);
      
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
      console.error('Error requesting notification permission:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('notification-request-shown', 'true');
    setHasShownOnce(true);
    onDismiss?.();
  };

  // Don't show if:
  // - Not supported
  // - Already granted
  // - Already dismissed
  // - Already shown once
  if (!isSupported || permission === 'granted' || isDismissed || hasShownOnce) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-top-2 duration-300">
      <Card className="border-blue-200 bg-blue-50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-800 text-lg">
              <Bell className="h-5 w-5" />
              Enable Notifications
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 text-sm mb-4">
            Get notified about new challenges, quiz updates, and leaderboard changes even when you're not on the site!
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleRequestPermission}
              disabled={isRequesting}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isRequesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enabling...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Notifications
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalNotificationRequest;
