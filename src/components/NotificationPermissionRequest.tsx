import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, Settings, X } from 'lucide-react';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';

interface NotificationPermissionRequestProps {
  onClose?: () => void;
  showAsCard?: boolean;
}

const NotificationPermissionRequest: React.FC<NotificationPermissionRequestProps> = ({
  onClose,
  showAsCard = true
}) => {
  const {
    permission,
    isSupported,
    requestPermission
  } = useBrowserNotifications();

  const [isRequesting, setIsRequesting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const handleRequestPermission = async () => {
    if (!isSupported) {
      return;
    }

    setIsRequesting(true);
    try {
      const newPermission = await requestPermission();
      setHasRequested(true);
      
      if (newPermission === 'granted') {
        // Show a test notification
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

  // Auto-request permission on component mount if not already requested
  useEffect(() => {
    if (isSupported && permission === 'default' && !hasRequested) {
      // Small delay to let the component render
      const timer = setTimeout(() => {
        handleRequestPermission();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isSupported, permission, hasRequested]);

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { text: 'Enabled', variant: 'default' as const, icon: Bell };
      case 'denied':
        return { text: 'Blocked', variant: 'destructive' as const, icon: BellOff };
      default:
        return { text: 'Not Set', variant: 'secondary' as const, icon: Bell };
    }
  };

  const status = getPermissionStatus();
  const StatusIcon = status.icon;

  if (!isSupported) {
    return showAsCard ? (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <BellOff className="h-5 w-5" />
            Notifications Not Supported
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 text-sm">
            Your browser doesn't support notifications. Please use a modern browser like Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    ) : (
      <div className="flex items-center gap-2 text-yellow-700 text-sm">
        <BellOff className="h-4 w-4" />
        <span>Notifications not supported in this browser</span>
      </div>
    );
  }

  if (permission === 'granted') {
    return showAsCard ? (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Bell className="h-5 w-5" />
            Notifications Enabled
            <Badge variant="default" className="ml-auto">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 text-sm">
            You'll receive notifications for challenges, quiz updates, and leaderboard changes.
          </p>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="mt-3"
            >
              <X className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          )}
        </CardContent>
      </Card>
    ) : (
      <div className="flex items-center gap-2 text-green-700 text-sm">
        <Bell className="h-4 w-4" />
        <span>Notifications enabled</span>
      </div>
    );
  }

  if (permission === 'denied') {
    return showAsCard ? (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-800">
            <BellOff className="h-5 w-5" />
            Notifications Blocked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-sm mb-3">
            Notifications are currently blocked. To enable them:
          </p>
          <ol className="text-red-700 text-sm space-y-1 list-decimal list-inside">
            <li>Click the lock icon in your browser's address bar</li>
            <li>Set notifications to "Allow"</li>
            <li>Refresh this page</li>
          </ol>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="mt-3"
            >
              <X className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          )}
        </CardContent>
      </Card>
    ) : (
      <div className="flex items-center gap-2 text-red-700 text-sm">
        <BellOff className="h-4 w-4" />
        <span>Notifications blocked - check browser settings</span>
      </div>
    );
  }

  // Default state - permission not requested yet
  return showAsCard ? (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Bell className="h-5 w-5" />
          Enable Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-700 text-sm mb-4">
          Get notified about new challenges, quiz updates, and leaderboard changes.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleRequestPermission}
            disabled={isRequesting}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Requesting...
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Enable Notifications
              </>
            )}
          </Button>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4 mr-2" />
              Maybe Later
            </Button>
          )}
        </div>
        {hasRequested && permission === 'default' && (
          <p className="text-blue-600 text-xs mt-2">
            Please check your browser's notification settings if the permission dialog didn't appear.
          </p>
        )}
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleRequestPermission}
        disabled={isRequesting}
        size="sm"
        variant="outline"
      >
        {isRequesting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Requesting...
          </>
        ) : (
          <>
            <Bell className="h-4 w-4 mr-2" />
            Enable Notifications
          </>
        )}
      </Button>
    </div>
  );
};

export default NotificationPermissionRequest;
