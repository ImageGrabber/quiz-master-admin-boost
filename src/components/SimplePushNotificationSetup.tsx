import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Bell, Smartphone, CheckCircle, XCircle, X } from 'lucide-react';

const SimplePushNotificationSetup: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    setPermission(Notification.permission);
    
    // Check if user has dismissed this notification before
    const hasDismissed = localStorage.getItem('push-notification-dismissed');
    if (hasDismissed === 'true') {
      setIsDismissed(true);
    } else {
      // Show dialog if not dismissed and permission not granted
      // On mobile, let the MobileNotificationBanner handle it
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Disabled automatic dialog - user can enable notifications manually if needed
      // if (Notification.permission === 'default' && !isMobile) {
      //   setTimeout(() => {
      //     setShowDialog(true);
      //   }, 2000);
      // }
    }
  }, []);

  const handleRequestPermission = async () => {
    if (!isSupported) {
      setError('Notifications are not supported in this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);
      
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
      setError('Failed to request notification permission');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowDialog(false);
    localStorage.setItem('push-notification-dismissed', 'true');
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  // Don't render if not supported
  if (!isSupported) {
    return null;
  }

  // Don't show dialog if permission is already granted
  if (permission === 'granted') {
    return null;
  }

  // If dismissed, show a small floating button for desktop users only
  if (isDismissed) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      // Mobile users have MobileNotificationBanner, so don't show floating button
      return null;
    }
    
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="sm"
        >
          <Bell className="h-4 w-4 mr-2" />
          Enable Notifications
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Stay Updated with QuizMaster
          </DialogTitle>
          <DialogDescription>
            Get notified about the latest quizzes and news on the site, even when you're not actively browsing!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-2">
            <p>• Be updated on the latest quizzes and news on the site</p>
            <p>• Get instant alerts for new content and updates</p>
            <p>• Stay informed about site activities and announcements</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRequestPermission}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SimplePushNotificationSetup;
