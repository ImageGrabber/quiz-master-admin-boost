import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';

interface OneSignalGateProps {
  children: React.ReactNode;
}

const OneSignalGate: React.FC<OneSignalGateProps> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      if (window.OneSignal) {
        const permission = await window.OneSignal.getNotificationPermission();
        const userId = await window.OneSignal.getUserId();
        
        console.log('OneSignal permission:', permission);
        console.log('OneSignal userId:', userId);
        
        if (permission === 'granted' && userId) {
          setIsSubscribed(true);
        } else {
          setShowPrompt(true);
        }
      } else {
        // OneSignal not loaded yet, wait a bit
        setTimeout(checkSubscriptionStatus, 1000);
      }
    } catch (error) {
      console.error('Error checking OneSignal status:', error);
      setShowPrompt(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      
      if (window.OneSignal) {
        // Show the native prompt
        await window.OneSignal.showNativePrompt();
        
        // Check status after prompt
        setTimeout(async () => {
          const permission = await window.OneSignal.getNotificationPermission();
          const userId = await window.OneSignal.getUserId();
          
          if (permission === 'granted' && userId) {
            setIsSubscribed(true);
            setShowPrompt(false);
          } else {
            // User denied, show message
            alert('Notifications are required to use this app. Please enable them and refresh the page.');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      alert('Error enabling notifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Optionally allow skipping with a warning
    if (confirm('You will miss important quiz updates and challenges. Are you sure you want to continue without notifications?')) {
      setIsSubscribed(true);
      setShowPrompt(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSubscribed && showPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Enable Notifications</CardTitle>
            <CardDescription>
              Stay updated with quiz challenges, weekly competitions, and important announcements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Get notified of new challenges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Weekly quiz reminders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Leaderboard updates</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleSubscribe} 
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Enabling...' : 'Enable Notifications'}
              </Button>
              
              <Button 
                onClick={handleSkip}
                variant="outline" 
                className="w-full"
                size="sm"
              >
                Continue Without Notifications
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              You can change notification settings anytime in your browser settings.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default OneSignalGate;
