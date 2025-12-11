import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Trash2,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string; // Added
  role: string;
  created_at: string;
}

const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dora",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Eliza",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Gus",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Hilda",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Nolan",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
];

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Profile form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // State for avatar

  // ... (password state remains)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  // ... (notifications state remains)
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const stored = localStorage.getItem('emailNotifications');
    return stored ? JSON.parse(stored) : true;
  });
  const [quizReminders, setQuizReminders] = useState(() => {
    const stored = localStorage.getItem('quizReminders');
    return stored ? JSON.parse(stored) : true;
  });
  const [leaderboardUpdates, setLeaderboardUpdates] = useState(() => {
    const stored = localStorage.getItem('leaderboardUpdates');
    return stored ? JSON.parse(stored) : false;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth/login");
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || "");
        setEmail(profileData.email || "");
        setAvatarUrl(profileData.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.full_name || 'User'}`);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        title: "Error",
        description: "Failed to load your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          email: email,
          avatar_url: avatarUrl // Save avatar
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Refresh profile data
      fetchUserProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setDialogTitle("Passwords Don't Match");
      setDialogMessage("New password and confirm password must be the same.");
      setDialogOpen(true);
      return;
    }

    if (newPassword.length < 6) {
      setDialogTitle("Password Too Short");
      setDialogMessage("Password must be at least 6 characters long.");
      setDialogOpen(true);
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setDialogTitle("Password Changed");
      setDialogMessage("Your password has been successfully updated.");
      setDialogOpen(true);

      // Clear password fields
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error('Error changing password:', error);
      setDialogTitle("Password Change Failed");
      setDialogMessage(error.message || "Failed to change password. Please try again.");
      setDialogOpen(true);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    // Update local state immediately for responsive UI
    switch (type) {
      case 'email':
        setEmailNotifications(value);
        localStorage.setItem('emailNotifications', JSON.stringify(value));
        break;
      case 'quiz':
        setQuizReminders(value);
        localStorage.setItem('quizReminders', JSON.stringify(value));
        break;
      case 'leaderboard':
        setLeaderboardUpdates(value);
        localStorage.setItem('leaderboardUpdates', JSON.stringify(value));
        break;
    }

    setDialogTitle("Preference Updated");
    setDialogMessage(`Notification preference updated successfully.`);
    setDialogOpen(true);
  };

  const sendTestEmail = async () => {
    try {
      // Call the Supabase Edge Function for real email testing
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email: profile?.email,
            preferences: {
              emailNotifications,
              quizReminders,
              leaderboardUpdates
            },
            type: 'test'
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        setDialogTitle("Test Email Processed");
        setDialogMessage(`Email test completed for ${profile?.email}. Check the server logs for the email content.`);
        setDialogOpen(true);
        // Log the result for debugging
        console.log('Email function result:', result);
      } else {
        throw new Error(result.error || 'Failed to process email');
      }

    } catch (error) {
      console.error('Error sending test email:', error);
      // Fallback to demo mode if Edge Function is not available
      const enabledPrefs = [];
      if (emailNotifications) enabledPrefs.push('Email Notifications');
      if (quizReminders) enabledPrefs.push('Quiz Reminders');
      if (leaderboardUpdates) enabledPrefs.push('Leaderboard Updates');
      setDialogTitle("Demo Mode Active");
      setDialogMessage(`Edge Function not available. In production, this would send a real email to ${profile?.email} with preferences: ${enabledPrefs.join(', ') || 'No notifications enabled'}`);
      setDialogOpen(true);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    setDialogTitle("Account Deletion");
    setDialogMessage("Account deletion is not available in demo mode.");
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <User className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading your settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account and preferences"
    >
      {/* Dialog for all notifications */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Header removed */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Profile Information */}
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Update your personal information and avatar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-6 p-6 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div className="relative">
                    <img
                      src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName || 'User'}`}
                      alt="Profile Avatar"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-white shadow-sm">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="w-full">
                    <Label className="mb-3 block text-center text-sm font-medium text-slate-600">Choose Avatar</Label>
                    <div className="flex flex-wrap justify-center gap-3">
                      {AVATAR_PRESETS.slice(0, 8).map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => setAvatarUrl(preset)}
                          className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all hover:scale-110 ${avatarUrl === preset ? 'border-blue-500 ring-2 ring-blue-100 shadow-md scale-110' : 'border-slate-200 hover:border-blue-300'
                            }`}
                        >
                          <img src={preset} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-600">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled
                      className="bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  <span>Security</span>
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="border-slate-200 focus-visible:ring-emerald-500 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="border-slate-200 focus-visible:ring-emerald-500"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleChangePassword}
                    disabled={isChangingPassword || !newPassword || !confirmPassword}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all"
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span>Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Active</span>
                  </div>
                  <Badge variant="outline" className="bg-white text-green-700 border-green-200">
                    {profile?.role || 'User'}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500 text-center">
                  Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 