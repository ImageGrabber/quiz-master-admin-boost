import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { getOneSignalPermission, getOneSignalUserId, promptOneSignalNotifications } from '@/lib/onesignal';

const NotificationBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const permission = await getOneSignalPermission();
      const userId = await getOneSignalUserId();

      if (permission === 'granted' && userId) {
        setIsSubscribed(true);
        setShowBanner(false);
      } else {
        // Check if user has previously dismissed
        const dismissed = localStorage.getItem('notification-banner-dismissed');
        if (!dismissed) {
          setShowBanner(true);
        }
      }
    } catch (error) {
      console.error('Error checking OneSignal status:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      
      await promptOneSignalNotifications();

      setTimeout(async () => {
        const permission = await getOneSignalPermission();
        const userId = await getOneSignalUserId();

        if (permission === 'granted' && userId) {
          setIsSubscribed(true);
          setShowBanner(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('notification-banner-dismissed', 'true');
  };

  if (!showBanner || isSubscribed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5" />
            <div>
              <p className="font-semibold">Stay Updated!</p>
              <p className="text-sm text-blue-100">
                Enable notifications for quiz challenges and weekly competitions.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSubscribe}
              disabled={isLoading}
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              {isLoading ? 'Enabling...' : 'Enable'}
            </Button>
            
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
