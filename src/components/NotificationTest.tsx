import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { Bell, Trophy, Users, Clock } from 'lucide-react';

const NotificationTest: React.FC = () => {
  const {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    sendChallengeNotification,
    sendQuizCompleteNotification,
    sendChallengeAcceptedNotification,
    sendChallengeDeclinedNotification,
    sendQuizReminderNotification,
    sendLeaderboardUpdateNotification
  } = useBrowserNotifications();

  const handleTestNotification = async () => {
    await sendNotification({
      title: '🧪 Test Notification',
      body: 'This is a test notification from QuizMaster!',
      tag: 'test',
      requireInteraction: true
    });
  };

  const handleTestChallenge = async () => {
    await sendChallengeNotification(
      'Test Player',
      'Sample Quiz',
      'Want to test your knowledge?'
    );
  };

  const handleTestQuizComplete = async () => {
    await sendQuizCompleteNotification(8, 10);
  };

  const handleTestChallengeAccepted = async () => {
    await sendChallengeAcceptedNotification('Test Player');
  };

  const handleTestChallengeDeclined = async () => {
    await sendChallengeDeclinedNotification('Test Player');
  };

  const handleTestReminder = async () => {
    await sendQuizReminderNotification('Sample Quiz', '2 hours');
  };

  const handleTestLeaderboard = async () => {
    await sendLeaderboardUpdateNotification(5, 100);
  };

  if (!isSupported) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Notifications Not Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700">
            Your browser doesn't support notifications. Please use a modern browser.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Test Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Permission Status: <span className={`font-medium ${
              permission === 'granted' ? 'text-green-600' : 
              permission === 'denied' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {permission === 'granted' ? 'Granted' : 
               permission === 'denied' ? 'Denied' : 'Not Requested'}
            </span>
          </p>
          
          {permission !== 'granted' && (
            <Button onClick={requestPermission} className="mb-4">
              <Bell className="h-4 w-4 mr-2" />
              Request Permission
            </Button>
          )}
        </div>

        {permission === 'granted' && (
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleTestNotification} variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Test Basic
              </Button>
              <Button onClick={handleTestChallenge} variant="outline" size="sm">
                <Trophy className="h-4 w-4 mr-2" />
                Test Challenge
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleTestQuizComplete} variant="outline" size="sm">
                <Trophy className="h-4 w-4 mr-2" />
                Test Quiz Complete
              </Button>
              <Button onClick={handleTestChallengeAccepted} variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Test Accepted
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleTestChallengeDeclined} variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Test Declined
              </Button>
              <Button onClick={handleTestReminder} variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Test Reminder
              </Button>
            </div>
            
            <Button onClick={handleTestLeaderboard} variant="outline" size="sm" className="w-full">
              <Trophy className="h-4 w-4 mr-2" />
              Test Leaderboard Update
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationTest;
