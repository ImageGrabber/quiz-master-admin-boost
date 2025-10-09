import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Smartphone, CheckCircle, XCircle, Send, TestTube } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const PushNotificationTest: React.FC = () => {
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
    sendTestNotification
  } = usePushNotifications();

  const [testResults, setTestResults] = useState<{ [key: string]: 'success' | 'error' | 'pending' }>({});

  const handleTestNotification = async (type: string) => {
    setTestResults(prev => ({ ...prev, [type]: 'pending' }));
    
    try {
      if (type === 'local') {
        await sendTestNotification();
        setTestResults(prev => ({ ...prev, [type]: 'success' }));
      } else if (type === 'server') {
        // Test server-side notification
        const { createClient } = await import('@/integrations/supabase/client');
        const supabase = createClient();
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('No auth session');
        }

        const response = await fetch('/api/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            type: 'test',
            userId: user.id
          })
        });

        if (response.ok) {
          setTestResults(prev => ({ ...prev, [type]: 'success' }));
        } else {
          throw new Error('Server test failed');
        }
      }
    } catch (error) {
      console.error(`Test ${type} failed:`, error);
      setTestResults(prev => ({ ...prev, [type]: 'error' }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />;
      default: return null;
    }
  };

  if (!isSupported) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Bell className="h-5 w-5" />
            Push Notifications Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 text-sm">
            Your browser doesn't support push notifications. Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Push Notification Test Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Service Worker:</span>
            <Badge variant={isRegistered ? 'default' : 'secondary'}>
              {isRegistered ? 'Registered' : 'Not Registered'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Permission:</span>
            <Badge variant={permission === 'granted' ? 'default' : 'secondary'}>
              {permission === 'granted' ? 'Granted' : permission === 'denied' ? 'Denied' : 'Not Set'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Subscription:</span>
            <Badge variant={isSubscribed ? 'default' : 'secondary'}>
              {isSubscribed ? 'Active' : 'Not Active'}
            </Badge>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg">
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Setup Buttons */}
        <div className="space-y-2">
          {!isRegistered && (
            <Button
              onClick={registerServiceWorker}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Registering...
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Register Service Worker
                </>
              )}
            </Button>
          )}

          {isRegistered && !isSubscribed && permission === 'granted' && (
            <Button
              onClick={subscribe}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Subscribe to Push Notifications
                </>
              )}
            </Button>
          )}

          {isSubscribed && (
            <Button
              onClick={unsubscribe}
              disabled={isLoading}
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              <Bell className="h-4 w-4 mr-2" />
              Unsubscribe
            </Button>
          )}
        </div>

        {/* Test Buttons */}
        {isSubscribed && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Test Notifications:</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleTestNotification('local')}
                disabled={isLoading || testResults.local === 'pending'}
                variant="outline"
                size="sm"
              >
                {getStatusIcon(testResults.local)}
                <span className="ml-2">Local Test</span>
              </Button>
              
              <Button
                onClick={() => handleTestNotification('server')}
                disabled={isLoading || testResults.server === 'pending'}
                variant="outline"
                size="sm"
              >
                {getStatusIcon(testResults.server)}
                <span className="ml-2">Server Test</span>
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Local Test:</strong> Sends notification from browser</p>
          <p><strong>Server Test:</strong> Sends notification from server</p>
          <p><strong>Mobile:</strong> Works on Android Chrome and iOS Safari 16.4+</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationTest;
