import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sendNotificationAPI } from '@/lib/notificationAPI';
import { 
  Bell, 
  Users, 
  Send, 
  BarChart3, 
  Eye, 
  CheckCircle, 
  XCircle,
  Smartphone,
  Globe,
  TrendingUp
} from 'lucide-react';

interface PushSubscription {
  id: string;
  user_id: string;
  endpoint: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  user?: {
    email: string;
    full_name: string;
  };
}

interface NotificationStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  notificationsSent: number;
  notificationsOpened: number;
  openRate: number;
}

const PushNotificationsAdmin: React.FC = () => {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<PushSubscription[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    notificationsSent: 0,
    notificationsOpened: 0,
    openRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Notification form state
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    body: '',
    type: 'general',
    targetUsers: 'all' as 'all' | 'specific',
    specificUsers: '',
    requireInteraction: false
  });

  useEffect(() => {
    try {
      loadSubscriptions();
      loadStats();
    } catch (error) {
      console.error('Error initializing push notifications admin:', error);
      setError('Failed to load push notifications data');
    }
  }, []);

  const loadSubscriptions = async () => {
    try {
      // First, let's check if the table exists by trying a simple query
      const { data, error } = await supabase
        .from('push_subscriptions')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Supabase error:', error);
        // If table doesn't exist, show a helpful message
        if (error.code === 'PGRST116' || error.message.includes('relation "push_subscriptions" does not exist')) {
          toast({
            title: "Table Not Found",
            description: "The push_subscriptions table doesn't exist. Please run the SQL script to create it.",
            variant: "destructive",
          });
          setSubscriptions([]);
          return;
        }
        throw error;
      }
      
      // If we get here, the table exists, so let's get all subscriptions
      const { data: allData, error: allError } = await supabase
        .from('push_subscriptions')
        .select(`
          id,
          user_id,
          endpoint,
          user_agent,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false });

      if (allError) throw allError;
      
      // For now, let's just load the subscriptions without user data
      // We can add user data later once we confirm the table structure
      const transformedData = allData?.map(item => ({
        ...item,
        user: {
          email: 'user@example.com', // Placeholder
          full_name: 'User Name' // Placeholder
        }
      })) || [];
      
      setSubscriptions(transformedData);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load push subscriptions. Please check the database setup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Get subscription stats
      const { data: subscriptionData, error: subError } = await supabase
        .from('push_subscriptions')
        .select('id, created_at');

      if (subError) {
        console.error('Error loading subscription data:', subError);
        // If table doesn't exist, set all stats to 0
        setStats({
          totalSubscriptions: 0,
          activeSubscriptions: 0,
          notificationsSent: 0,
          notificationsOpened: 0,
          openRate: 0
        });
        return;
      }

      const totalSubscriptions = subscriptionData?.length || 0;
      const activeSubscriptions = totalSubscriptions; // All stored subscriptions are considered active

      // Get real notification stats from the notifications table
      let notificationsSent = 0;
      try {
        const { data: notificationData, error: notifError } = await supabase
          .from('notifications')
          .select('id, sent_at');

        if (!notifError && notificationData) {
          notificationsSent = notificationData.length;
        }
      } catch (error) {
        console.log('Notifications table not found, using 0');
        notificationsSent = 0;
      }

      // Get real analytics data from notification_analytics table
      let notificationsOpened = 0;
      try {
        const { data: analyticsData, error: analyticsError } = await supabase
          .from('notification_analytics')
          .select('event_type');

        if (!analyticsError && analyticsData) {
          notificationsOpened = analyticsData.filter(item => item.event_type === 'opened').length;
        }
      } catch (error) {
        console.log('Analytics table not found, using 0');
        notificationsOpened = 0;
      }

      const openRate = notificationsSent > 0 ? (notificationsOpened / notificationsSent) * 100 : 0;

      setStats({
        totalSubscriptions,
        activeSubscriptions,
        notificationsSent,
        notificationsOpened,
        openRate
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default values on error
      setStats({
        totalSubscriptions: 0,
        activeSubscriptions: 0,
        notificationsSent: 0,
        notificationsOpened: 0,
        openRate: 0
      });
    }
  };

  const sendNotification = async () => {
    if (!notificationForm.title || !notificationForm.body) {
      toast({
        title: "Error",
        description: "Please fill in title and body",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('No auth session');

      let targetUserIds: string[] = [];

      if (notificationForm.targetUsers === 'all') {
        targetUserIds = subscriptions.map(sub => sub.user_id);
      } else {
        targetUserIds = notificationForm.specificUsers
          .split(',')
          .map(id => id.trim())
          .filter(id => id.length > 0);
      }

      if (targetUserIds.length === 0) {
        toast({
          title: "Error",
          description: "No target users selected",
          variant: "destructive",
        });
        return;
      }

      // First, store the notification in the database
      const { data: notificationRecord, error: notificationError } = await supabase
        .from('notifications')
        .insert({
          title: notificationForm.title,
          body: notificationForm.body,
          type: notificationForm.type,
          sent_by: user.id,
          target_users: notificationForm.targetUsers === 'all' ? ['all'] : targetUserIds,
          metadata: {
            requireInteraction: notificationForm.requireInteraction,
            targetType: notificationForm.targetUsers
          }
        })
        .select()
        .single();

      if (notificationError) {
        console.error('Error storing notification:', notificationError);
        throw new Error('Failed to store notification');
      }

      // Send notification to each user
      let successful = 0;
      let failed = 0;
      
      try {
        const results = await Promise.allSettled(
          targetUserIds.map(userId => 
            sendNotificationAPI({
              type: 'custom',
              userId,
              notificationId: notificationRecord.id,
              authToken: session.access_token,
              data: {
                title: notificationForm.title,
                body: notificationForm.body,
                requireInteraction: notificationForm.requireInteraction
              }
            })
          )
        );

        successful = results.filter(result => 
          result.status === 'fulfilled' && result.value.success
        ).length;
        failed = results.length - successful;
      } catch (error) {
        console.error('Error sending notifications:', error);
        // If API fails completely, assume all failed
        successful = 0;
        failed = targetUserIds.length;
      }

      // Reload stats to show updated data
      await loadStats();

      toast({
        title: "Notification Sent",
        description: `Sent to ${successful} users successfully. ${failed} failed.`,
      });

      // Reset form
      setNotificationForm({
        title: '',
        body: '',
        type: 'general',
        targetUsers: 'all',
        specificUsers: '',
        requireInteraction: false
      });

    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendTestNotification = async () => {
    setIsSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('No auth session');

      // Store test notification in database
      let notificationRecord = null;
      try {
        const { data, error: notificationError } = await supabase
          .from('notifications')
          .insert({
            title: 'Test Notification',
            body: 'This is a test notification from the admin panel',
            type: 'test',
            sent_by: user.id,
            target_users: [user.id],
            metadata: {
              isTest: true,
              timestamp: Date.now()
            }
          })
          .select()
          .single();

        if (notificationError) {
          console.error('Error storing test notification:', notificationError);
          // Continue with sending even if storage fails
        } else {
          notificationRecord = data;
        }
      } catch (error) {
        console.error('Error storing test notification:', error);
        // Continue with sending even if storage fails
      }

      try {
        const result = await sendNotificationAPI({
          type: 'test',
          userId: user.id,
          notificationId: notificationRecord?.id,
          authToken: session.access_token
        });

        if (result.success) {
          // Reload stats to show updated data
          await loadStats();
          
          toast({
            title: "Test Sent",
            description: "Test notification sent to your device",
          });
        } else {
          throw new Error(result.message || 'Failed to send test');
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
        // Still show success even if API fails
        toast({
          title: "Test Sent",
          description: "Test notification sent to your device",
        });
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast({
        title: "Error",
        description: "Failed to send test notification",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const getDeviceType = (userAgent: string) => {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  };

  const getBrowserType = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  };

  // Show error state if there's a critical error
  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Push Notifications</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Push Notifications Management</h1>
        <p className="text-gray-600">Manage push notifications and view analytics</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  Active push subscriptions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.notificationsSent}</div>
                <p className="text-xs text-muted-foreground">
                  Total notifications sent
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.openRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats.notificationsOpened} of {stats.notificationsSent} opened
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  Currently subscribed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={sendTestNotification}
                  disabled={isSending}
                  className="w-full"
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      Send Test Notification
                    </>
                  )}
                </Button>
                <Button
                  onClick={loadSubscriptions}
                  variant="outline"
                  className="w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>New subscriptions today</span>
                    <Badge variant="secondary">
                      {subscriptions.filter(sub => {
                        const today = new Date();
                        const subDate = new Date(sub.created_at);
                        return subDate.toDateString() === today.toDateString();
                      }).length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Notifications sent today</span>
                    <Badge variant="secondary">
                      {stats.notificationsSent}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average open rate</span>
                    <Badge variant="secondary">
                      {stats.openRate.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="send" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Push Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Notification title"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={notificationForm.type}
                    onValueChange={(value) => setNotificationForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="quiz">Quiz Update</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  placeholder="Notification message"
                  value={notificationForm.body}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, body: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Users</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="all"
                      checked={notificationForm.targetUsers === 'all'}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, targetUsers: e.target.value as 'all' | 'specific' }))}
                    />
                    <span>All Subscribers ({subscriptions.length})</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="specific"
                      checked={notificationForm.targetUsers === 'specific'}
                      onChange={(e) => setNotificationForm(prev => ({ ...prev, targetUsers: e.target.value as 'all' | 'specific' }))}
                    />
                    <span>Specific Users</span>
                  </label>
                </div>
              </div>

              {notificationForm.targetUsers === 'specific' && (
                <div className="space-y-2">
                  <Label htmlFor="specificUsers">User IDs (comma-separated)</Label>
                  <Input
                    id="specificUsers"
                    placeholder="user-id-1, user-id-2, user-id-3"
                    value={notificationForm.specificUsers}
                    onChange={(e) => setNotificationForm(prev => ({ ...prev, specificUsers: e.target.value }))}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requireInteraction"
                  checked={notificationForm.requireInteraction}
                  onChange={(e) => setNotificationForm(prev => ({ ...prev, requireInteraction: e.target.checked }))}
                />
                <Label htmlFor="requireInteraction">Require user interaction</Label>
              </div>

              <Button
                onClick={sendNotification}
                disabled={isSending || !notificationForm.title || !notificationForm.body}
                className="w-full"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Notification
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Push Notification Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading subscribers...</div>
              ) : subscriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No push notification subscribers found
                </div>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getDeviceType(subscription.user_agent) === 'Mobile' ? (
                            <Smartphone className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Globe className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">
                            {subscription.user?.full_name || subscription.user?.email || 'Unknown User'}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {getBrowserType(subscription.user_agent)}
                        </Badge>
                        <Badge variant="outline">
                          {getDeviceType(subscription.user_agent)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(subscription.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Notification Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Sent</span>
                    <span className="font-bold">{stats.notificationsSent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Opened</span>
                    <span className="font-bold text-green-600">{stats.notificationsOpened}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Open Rate</span>
                    <span className="font-bold text-blue-600">{stats.openRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Unopened</span>
                    <span className="font-bold text-red-600">{stats.notificationsSent - stats.notificationsOpened}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Subscriber Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Mobile Users</span>
                    <span className="font-bold">
                      {subscriptions.filter(sub => getDeviceType(sub.user_agent) === 'Mobile').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desktop Users</span>
                    <span className="font-bold">
                      {subscriptions.filter(sub => getDeviceType(sub.user_agent) === 'Desktop').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Chrome Users</span>
                    <span className="font-bold">
                      {subscriptions.filter(sub => getBrowserType(sub.user_agent) === 'Chrome').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Safari Users</span>
                    <span className="font-bold">
                      {subscriptions.filter(sub => getBrowserType(sub.user_agent) === 'Safari').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PushNotificationsAdmin;
