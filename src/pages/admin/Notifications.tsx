import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "@/components/AdminLayout";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Bell,
  Users,
  User
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  user_id: string | null;
  title: string;
  message: string;
  type: 'quiz' | 'achievement' | 'challenge' | 'leaderboard' | 'content' | 'system';
  read: boolean;
  created_at: string;
  updated_at: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Notification>>({
    user_id: null,
    title: '',
    message: '',
    type: 'system',
    read: false
  });
  const [targetType, setTargetType] = useState<'all' | 'user'>('all');

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .order('full_name', { ascending: true });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.message) {
        toast.error('Please fill in title and message');
        return;
      }

      if (targetType === 'user' && !formData.user_id) {
        toast.error('Please select a user');
        return;
      }

      if (editingId) {
        // Update existing notification
        const { error } = await supabase
          .from('notifications')
          .update({
            title: formData.title,
            message: formData.message,
            type: formData.type,
            user_id: targetType === 'all' ? null : formData.user_id
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Notification updated successfully');
      } else {
        // Create new notification(s)
        if (targetType === 'all') {
          // Create a single broadcast notification (user_id = null) for all users
          const { error } = await supabase
            .from('notifications')
            .insert([{
              user_id: null, // NULL means broadcast to all users
              title: formData.title,
              message: formData.message,
              type: formData.type,
              read: false
            }]);

          if (error) throw error;
          
          // Get user count for the success message
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          
          toast.success(`Broadcast notification created for ${count || 'all'} users`);
        } else {
          // Create notification for single user
          const { error } = await supabase
            .from('notifications')
            .insert([{
              user_id: formData.user_id,
              title: formData.title,
              message: formData.message,
              type: formData.type,
              read: false
            }]);

          if (error) throw error;
          toast.success('Notification created successfully');
        }
      }

      // Reset form
      setEditingId(null);
      setShowForm(false);
      setTargetType('all');
      setFormData({
        user_id: null,
        title: '',
        message: '',
        type: 'system',
        read: false
      });
      fetchNotifications();
    } catch (error: any) {
      console.error('Error saving notification:', error);
      const errorMessage = error?.message || error?.error?.message || 'Failed to save notification';
      toast.error(`Failed to save notification: ${errorMessage}`);
      
      // If it's a 403 error, suggest running the SQL migration
      if (error?.code === '42501' || error?.status === 403 || errorMessage.includes('403')) {
        toast.error('Permission denied. Please ensure admin RLS policies are set up in Supabase.');
      }
    }
  };

  const handleEdit = (notification: Notification) => {
    setEditingId(notification.id);
    setFormData(notification);
    setTargetType(notification.user_id ? 'user' : 'all');
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Notification deleted successfully');
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setTargetType('all');
    setFormData({
      user_id: null,
      title: '',
      message: '',
      type: 'system',
      read: false
    });
  };

  const getUserName = (userId: string | null) => {
    if (userId === null) return 'All Users (Broadcast)';
    const user = users.find(u => u.id === userId);
    return user ? `${user.full_name} (${user.email})` : 'Unknown User';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-700';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-700';
      case 'challenge':
        return 'bg-green-100 text-green-700';
      case 'leaderboard':
        return 'bg-purple-100 text-purple-700';
      case 'content':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading notifications...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications Management</h1>
            <p className="text-gray-600 mt-2">Create and manage notifications for users</p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Notification</span>
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>{editingId ? 'Edit Notification' : 'Add New Notification'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="target_type">Target</Label>
                <Select
                  value={targetType}
                  onValueChange={(value: 'all' | 'user') => {
                    setTargetType(value);
                    if (value === 'all') {
                      setFormData({ ...formData, user_id: null });
                    }
                  }}
                  disabled={!!editingId}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>All Users</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="user">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Specific User</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {targetType === 'user' && (
                <div>
                  <Label htmlFor="user_id">Select User</Label>
                  <Select
                    value={formData.user_id || ''}
                    onValueChange={(value) => setFormData({ ...formData, user_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.full_name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="type">Notification Type</Label>
                <Select
                  value={formData.type || 'system'}
                  onValueChange={(value: Notification['type']) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="challenge">Challenge</SelectItem>
                    <SelectItem value="leaderboard">Leaderboard</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter notification title..."
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter notification message..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications List */}
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                      <Badge variant={notification.read ? "secondary" : "default"}>
                        {notification.read ? 'Read' : 'Unread'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {notification.title}
                    </h3>

                    <p className="text-gray-700 mb-3">
                      {notification.message}
                    </p>

                    <div className="text-sm text-gray-600">
                      <strong>Recipient:</strong> {getUserName(notification.user_id)}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(notification)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(notification.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first notification.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Notification
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

