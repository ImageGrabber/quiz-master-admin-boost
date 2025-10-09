import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Smartphone, Wifi, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface PushNotificationSetupProps {
  onComplete?: () => void;
  showAsCard?: boolean;
}

const PushNotificationSetup: React.FC<PushNotificationSetupProps> = ({
  onComplete,
  showAsCard = true
}) => {
  const {
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
    requestPermission
  } = usePushNotifications();

  const [currentStep, setCurrentStep] = useState<'permission' | 'subscription' | 'complete'>('permission');
  const [testSent, setTestSent] = useState(false);

  // Determine current step based on state
  useEffect(() => {
    if (permission === 'granted' && isSubscribed) {
      setCurrentStep('complete');
    } else if (permission === 'granted' && isRegistered) {
      setCurrentStep('subscription');
    } else {
      setCurrentStep('permission');
    }
  }, [permission, isRegistered, isSubscribed]);

  const handleRequestPermission = async () => {
    const newPermission = await requestPermission();
    if (newPermission === 'granted') {
      // Auto-proceed to subscription
      setTimeout(() => {
        handleSubscribe();
      }, 1000);
    }
  };

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      onComplete?.();
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribe();
  };

  const handleSendTest = async () => {
    await sendTestNotification();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const getStatusIcon = () => {
    if (error) return <XCircle className="h-5 w-5 text-red-500" />;
    if (isSubscribed) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (isLoading) return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />;
    return <Bell className="h-5 w-5 text-blue-500" />;
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (isSubscribed) return 'Enabled';
    if (isLoading) return 'Loading...';
    if (permission === 'denied') return 'Blocked';
    if (permission === 'granted') return 'Ready';
    return 'Not Set';
  };

  const getStatusVariant = () => {
    if (error) return 'destructive' as const;
    if (isSubscribed) return 'default' as const;
    if (permission === 'denied') return 'destructive' as const;
    return 'secondary' as const;
  };

  if (!isSupported) {
    return showAsCard ? (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <BellOff className="h-5 w-5" />
            Push Notifications Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 text-sm">
            Your browser doesn't support push notifications. Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    ) : (
      <div className="flex items-center gap-2 text-yellow-700 text-sm">
        <BellOff className="h-4 w-4" />
        <span>Push notifications not supported in this browser</span>
      </div>
    );
  }

  if (isSubscribed) {
    return showAsCard ? (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Smartphone className="h-5 w-5" />
            Push Notifications Enabled
            <Badge variant="default" className="ml-auto">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 text-sm mb-4">
            You'll receive push notifications on your device for challenges, quiz updates, and leaderboard changes.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleSendTest}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              {testSent ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Test Sent!
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Send Test
                </>
              )}
            </Button>
            <Button
              onClick={handleUnsubscribe}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              <BellOff className="h-4 w-4 mr-2" />
              Disable
            </Button>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="flex items-center gap-2 text-green-700 text-sm">
        <Smartphone className="h-4 w-4" />
        <span>Push notifications enabled</span>
      </div>
    );
  }

  return showAsCard ? (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Smartphone className="h-5 w-5" />
          Enable Push Notifications
          <Badge variant={getStatusVariant()} className="ml-auto">
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm text-blue-700">
              Status: {getStatusText()}
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                permission === 'granted' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className={permission === 'granted' ? 'text-green-700' : 'text-gray-600'}>
                Grant notification permission
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isSubscribed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={isSubscribed ? 'text-green-700' : 'text-gray-600'}>
                Subscribe to push notifications
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {currentStep === 'permission' && (
              <Button
                onClick={handleRequestPermission}
                disabled={isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Requesting...
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    Grant Permission
                  </>
                )}
              </Button>
            )}

            {currentStep === 'subscription' && (
              <Button
                onClick={handleSubscribe}
                disabled={isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 mr-2" />
                    Enable Push Notifications
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Benefits */}
          <div className="text-xs text-blue-600 space-y-1">
            <p>• Receive notifications even when the app is closed</p>
            <p>• Get instant alerts for new challenges</p>
            <p>• Stay updated on quiz results and leaderboards</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center gap-2">
      <Button
        onClick={currentStep === 'permission' ? handleRequestPermission : handleSubscribe}
        disabled={isLoading}
        size="sm"
        variant="outline"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Loading...
          </>
        ) : (
          <>
            <Smartphone className="h-4 w-4 mr-2" />
            Enable Push Notifications
          </>
        )}
      </Button>
    </div>
  );
};

export default PushNotificationSetup;
