
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Clock, Target, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface AttemptStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<AttemptStats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0
  });
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth/login");
        return;
      }

      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Fetch user attempts and calculate stats
      const { data: attempts } = await supabase
        .from('attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (attempts) {
        const totalAttempts = attempts.length;
        const averageScore = totalAttempts > 0 
          ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts)
          : 0;
        const bestScore = totalAttempts > 0 
          ? Math.max(...attempts.map(attempt => attempt.score))
          : 0;
        const totalTimeSpent = attempts.reduce((sum, attempt) => sum + attempt.seconds_used, 0);

        setStats({
          totalAttempts,
          averageScore,
          bestScore,
          totalTimeSpent
        });

        setRecentAttempts(attempts.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {profile?.full_name || 'User'}!
              </h1>
              <p className="text-gray-600">Ready for your next quiz challenge?</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/leaderboard")}
              className="flex items-center space-x-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalAttempts}</div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.bestScore}</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.averageScore}</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{formatTime(stats.totalTimeSpent)}</div>
                  <div className="text-sm text-gray-600">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start your quiz journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  onClick={() => navigate("/quiz")}
                  className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Brain className="w-4 h-4 mr-3" />
                  Start New Quiz
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/leaderboard")}
                >
                  <Trophy className="w-4 h-4 mr-3" />
                  View Leaderboard
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/result/latest")}
                >
                  <Target className="w-4 h-4 mr-3" />
                  View Latest Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Attempts */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle>Recent Attempts</CardTitle>
              <CardDescription>Your latest quiz performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttempts.length > 0 ? (
                  recentAttempts.map((attempt, index) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Quiz #{index + 1}</div>
                        <div className="text-sm text-gray-600">
                          {formatTime(attempt.seconds_used)} • {new Date(attempt.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge 
                        className={attempt.score >= 80 ? "bg-green-100 text-green-700" : 
                               attempt.score >= 60 ? "bg-yellow-100 text-yellow-700" : 
                               "bg-red-100 text-red-700"}
                      >
                        {attempt.score} pts
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No quiz attempts yet</p>
                    <p className="text-sm">Start your first quiz to see your progress!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
