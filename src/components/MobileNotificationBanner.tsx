import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Bell, X, Smartphone } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const MobileNotificationBanner: React.FC = () => {
  console.log('📱 MobileNotificationBanner component rendering');
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize mobile detection immediately
    if (typeof window !== 'undefined') {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log('📱 Initial mobile detection:', mobile, navigator.userAgent);
      return mobile;
    }
    return false;
  });
  const { permission, isSupported, requestPermission, subscribe, isLoading, error } = usePushNotifications();

  useEffect(() => {
    // Check if it's a mobile device
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
    
    console.log('📱 MobileNotificationBanner useEffect:', {
      mobile,
      permission,
      isSupported,
      userAgent: navigator.userAgent
    });

    // Disabled automatic dialog - user can enable notifications manually if needed
    // if (mobile && permission !== 'granted' && isSupported) {
    //   console.log('📱 Should show dialog:', { permission, isSupported });
    //   console.log('📱 Showing mobile notification dialog immediately');
    //   setIsVisible(true);
    // }
  }, [permission, isSupported]);

  const handleRequestPermission = async () => {
    console.log('🔔 Mobile notification button clicked');
    console.log('Current permission:', permission);
    console.log('Is supported:', isSupported);
    
    try {
      console.log('📱 Requesting notification permission...');
      // First request permission
      const newPermission = await requestPermission();
      console.log('📱 Permission result:', newPermission);
      
      if (newPermission === 'granted') {
        console.log('📱 Permission granted, subscribing to push notifications...');
        // Then subscribe to push notifications
        const subscribed = await subscribe();
        console.log('📱 Subscription result:', subscribed);
        
        if (subscribed) {
          console.log('✅ Successfully subscribed to push notifications');
          console.log('🔄 Refreshing page in 2 seconds to update admin panel...');
          setIsVisible(false);
          // Show success notification
          setTimeout(() => {
            new Notification('🎉 Push Notifications Enabled!', {
              body: 'You\'ll now receive notifications for challenges, quiz updates, and more!',
              icon: '/favicon.ico',
              tag: 'permission-granted'
            });
          }, 1000);
          
          // Refresh page after 2 seconds to update admin panel
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error('❌ Failed to subscribe to push notifications');
        }
      } else {
        console.log('❌ Permission denied or default');
      }
    } catch (error) {
      console.error('❌ Error requesting notification permission:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('mobile-notification-banner-dismissed', 'true');
  };

  // Don't show on desktop or if not mobile
  console.log('📱 MobileNotificationBanner render check:', {
    isMobile,
    permission,
    isVisible,
    isSupported
  });
  
  if (!isMobile || permission === 'granted') {
    console.log('📱 MobileNotificationBanner returning null:', { isMobile, permission });
    return null;
  }

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Enable Notifications
          </DialogTitle>
          <DialogDescription>
            Get notified about quizzes, challenges, and updates on your mobile device!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Receive instant notifications for new challenges</p>
            <p>• Get updates on quiz results and leaderboards</p>
            <p>• Stay connected even when the app is closed</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="flex-1"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Not Now
          </Button>
          <Button
            onClick={() => {
              console.log('🔔 Button clicked directly!');
              handleRequestPermission();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Setting up...
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Enable Notifications
              </>
            )}
          </Button>
        </DialogFooter>
        
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MobileNotificationBanner;
