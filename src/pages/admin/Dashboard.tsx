import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, TrendingUp, Trophy, Eye, Brain } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface AdminStats {
  totalUsers: number;
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
}

interface RecentActivity {
  user: string;
  action: string;
  score?: number;
  time: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAttempts: 0,
    averageScore: 0,
    highestScore: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAdminAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile?.role !== 'admin') {
        navigate('/auth/login');
      }
    }
    checkAdminAuth();
  }, [navigate]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      console.log('Fetching admin data...');
      
      // Fetch total users with explicit columns
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id, full_name, email');
      const userCount = Array.isArray(userData) ? userData.length : 0;
      if (userError) {
        console.error('User fetch error:', userError);
      }
      console.log('User count:', userCount, 'User data:', userData);

      // Fetch attempts using the new RPC function
      // @ts-expect-error: custom RPC function
      const { data: attemptsRaw, error: attemptsError } = await supabase.rpc('get_admin_attempts');
      if (attemptsError) {
        console.error('Attempts error:', attemptsError);
        if (attemptsError.code) {
          console.error('Attempts error code:', attemptsError.code);
        }
        throw attemptsError;
      }
      // Ensure attempts is an array
      const attempts = Array.isArray(attemptsRaw) ? attemptsRaw : [];
      console.log('Attempts data:', attempts);

      // Get user profiles for the attempts
      const userIds = attempts.map(a => a.user_id).filter(Boolean) || [];
      let profileMap = new Map();
      
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds);
        if (profilesError) {
          console.error('Profiles error:', profilesError);
        } else {
          console.log('Profiles data:', profiles);
          profiles?.forEach(profile => {
            profileMap.set(profile.id, profile);
          });
        }
      }

      // Calculate stats
      const totalAttempts = attempts.length || 0;
      const scores = attempts.map(a => a.score) || [];
      const averageScore = scores.length > 0 
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : 0;
      const highestScore = scores.length > 0 ? Math.max(...scores) : 0;

      console.log('Calculated stats:', {
        totalUsers: userCount || 0,
        totalAttempts,
        averageScore,
        highestScore
      });

      setStats({
        totalUsers: userCount || 0,
        totalAttempts,
        averageScore,
        highestScore
      });

      // Format recent activity
      const activity = attempts
        .map(attempt => {
        const timeAgo = new Date(attempt.created_at);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - timeAgo.getTime()) / (1000 * 60));
        
        let timeString;
        if (diffMinutes < 1) {
          timeString = "Just now";
        } else if (diffMinutes < 60) {
          timeString = `${diffMinutes} minutes ago`;
        } else if (diffMinutes < 1440) {
          timeString = `${Math.floor(diffMinutes / 60)} hours ago`;
        } else {
          timeString = `${Math.floor(diffMinutes / 1440)} days ago`;
        }

        const profile = profileMap.get(attempt.user_id);
        const trimmedName = profile?.full_name?.trim();
        const trimmedEmail = profile?.email?.trim();
        const userName = trimmedName || trimmedEmail;

        // Skip orphan/guest attempts that do not map to a real profile identity.
        if (!userName) return null;

        return {
          user: userName,
          action: "Completed quiz",
          score: attempt.score,
          time: timeString
        };
      })
      .filter((item): item is RecentActivity => item !== null)
      .slice(0, 5);

      console.log('Recent activity:', activity);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      description: "Active quiz takers",
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Total Attempts",
      value: stats.totalAttempts.toLocaleString(),
      icon: FileText,
      description: "Quiz attempts"
    },
    {
      title: "Average Score",
      value: stats.averageScore.toString(),
      icon: TrendingUp,
      description: "Points per attempt"
    },
    {
      title: "Highest Score",
      value: stats.highestScore.toString(),
      icon: Trophy,
      description: "Best score achieved"
    }
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your BibleBattles platform</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={stat.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest user activities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{activity.user}</div>
                        <div className="text-sm text-gray-600">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                      {activity.score && (
                        <Badge className="bg-blue-100 text-blue-700">
                          {activity.score} pts
                        </Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
