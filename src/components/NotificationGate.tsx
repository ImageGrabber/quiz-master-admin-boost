import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Lock } from 'lucide-react';
import { getOneSignalPermission, getOneSignalUserId, promptOneSignalNotifications } from '@/lib/onesignal';

interface NotificationGateProps {
  children: React.ReactNode;
  feature: string;
  description: string;
}

const NotificationGate: React.FC<NotificationGateProps> = ({ 
  children, 
  feature, 
  description 
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const permission = await getOneSignalPermission();
      const userId = await getOneSignalUserId();

      if (permission === 'granted' && userId) {
        setIsSubscribed(true);
        setShowGate(false);
      } else {
        setShowGate(true);
      }
    } catch (error) {
      console.error('Error checking OneSignal status:', error);
      setShowGate(true);
    } finally {
      setIsLoading(false);
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
          setShowGate(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <>{children}</>;
  }

  if (showGate && !isSubscribed) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-xl">{feature}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Bell className="w-4 h-4" />
            <span>Notifications required for this feature</span>
          </div>
          
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Enabling...' : 'Enable Notifications to Continue'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default NotificationGate;
