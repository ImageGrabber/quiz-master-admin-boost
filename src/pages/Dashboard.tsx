import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Trophy, Clock, Target, LogOut, User, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import DashboardLayout from "@/components/DashboardLayout";

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

interface Quiz {
  id: number;
  title: string;
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
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (profile) {
      fetchUserStats();
    }
  }, [profile, selectedQuizId]);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

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
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      let query = supabase
        .from('attempts')
        .select(`
          *,
          quizzes!inner(title)
        `)
        .eq('user_id', profile!.id);

      // Filter by specific quiz if selected
      if (selectedQuizId !== "all") {
        query = query.eq('quiz_id', parseInt(selectedQuizId));
      }

      const { data: attempts } = await query.order('created_at', { ascending: false });

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
      console.error('Error fetching user stats:', error);
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
    <DashboardLayout>
      {/* Quiz Filter */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter by Quiz:</span>
            <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a quiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quizzes</SelectItem>
                {quizzes.map((quiz) => (
                  <SelectItem key={quiz.id} value={quiz.id.toString()}>
                    {quiz.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 min-w-0">
          <Card className="shadow-lg border-0 bg-white min-w-0">
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

          <Card className="shadow-lg border-0 bg-white min-w-0">
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

          <Card className="shadow-lg border-0 bg-white min-w-0">
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

          <Card className="shadow-lg border-0 bg-white min-w-0">
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
      </div>

      {/* Quick Actions & Recent Attempts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start your quiz journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => navigate("/quiz-selection")}
                className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Brain className="w-4 h-4 mr-3" />
                Choose Quiz
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
                      <div className="font-medium text-gray-900">{attempt.quizzes.title}</div>
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

      {/* Membership Tiers Section */}
      <Card className="mb-8 mt-8 shadow-lg">
        <CardHeader>
          <CardTitle>Membership Tiers</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Choose the plan that fits your quiz journey.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-bold mb-2">Free Plan</h3>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>1 quiz per day</li>
                <li>Basic profile and stats</li>
                <li>Access to standard quizzes</li>
                <li>Participate in weekly leaderboard</li>
                <li>Community support</li>
              </ul>
            </div>
            <div className="relative p-4 border rounded-lg bg-gradient-to-br from-purple-200 to-purple-100 text-gray-900">
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow">Pro</span>
              <h3 className="text-xl font-bold mb-2 flex items-center">Pro Plan <span className="ml-3 text-base font-semibold text-purple-700">$6/month</span></h3>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>Unlimited quizzes</li>
                <li>Bonus content (verse memory, themed quizzes)</li>
                <li>Detailed reports on strengths/weaknesses</li>
                <li>Access to past attempts and analytics</li>
              </ul>
              <Button className="mt-4" variant="default">Upgrade Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
