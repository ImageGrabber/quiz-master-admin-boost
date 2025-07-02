import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Trophy, Clock, Target, LogOut, User, Filter, BookOpen, Calendar, Heart, CheckCircle, Play, Star, Lightbulb, TrendingUp, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Competition } from "@/integrations/supabase/types";
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

interface CompetitionWithDetails extends Competition {
  quiz: {
    id: number;
    title: string;
    description: string | null;
  };
  entries_count: number;
  user_has_entered: boolean;
  user_payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
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
  const [competitions, setCompetitions] = useState<CompetitionWithDetails[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hideMembership, setHideMembership] = useState<boolean>(true);
  const [streakData, setStreakData] = useState<any>(null);
  const [isRecordingRead, setIsRecordingRead] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchQuizzes();
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (profile) {
      fetchUserStats();
    }
  }, [profile, selectedQuizId]);

  useEffect(() => {
    const fetchStreak = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: streak } = await supabase
        .from('devotional_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setStreakData(streak);
    };
    fetchStreak();
  }, []);

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

  const fetchCompetitions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCompetitions([]);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(id, title, description),
          entries_count:competition_entries(count),
          competition_entries(user_id, paid)
        `)
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) throw error;

      // Map competitions to include user_has_entered and user_payment_status
      const competitionsWithDetails = (data || []).map((competition: any) => {
        const userEntry = (competition.competition_entries || []).find((entry: any) => entry.user_id === user.id);
        return {
          ...competition,
          entries_count: competition.entries_count?.[0]?.count || 0,
          user_has_entered: !!userEntry,
          user_payment_status: userEntry ? (userEntry.paid ? 'completed' : 'pending') : undefined,
        };
      });

      setCompetitions(competitionsWithDetails);
    } catch (error: any) {
      console.error('Error fetching competitions:', error);
      toast({
        title: "Error",
        description: `Failed to fetch competitions: ${error?.message || error}`,
        variant: "destructive",
      });
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

  const recordDevotionalRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || isRecordingRead) return;
    setIsRecordingRead(true);
    try {
      const today = new Date();
      const devotionalDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const { data, error } = await supabase.rpc('record_devotional_read', {
        p_user_id: user.id,
        p_devotional_date: devotionalDate,
        p_devotional_title: 'Daily Devotional',
        p_devotional_verse: '',
        p_time_spent_seconds: 300
      });
      if (error) throw error;
      setStreakData({
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        total_days_read: data.total_days_read,
        last_read_date: new Date().toISOString().split('T')[0]
      });
      toast({ title: "Devotional Recorded!", description: data.message });
    } catch (error) {
      toast({ title: "Error", description: "Failed to record devotional read.", variant: "destructive" });
    } finally {
      setIsRecordingRead(false);
    }
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

      {/* Devotional Streak */}
      <div className="w-full mb-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Devotional Streak
            </CardTitle>
            <CardDescription>Keep your daily devotional habit going!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-orange-700">Current Streak: {(streakData?.current_streak || 0)} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-yellow-700">Longest: {(streakData?.longest_streak || 0)} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-blue-700">Total days read: {(streakData?.total_days_read || 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* Featured Competitions Section */}
      <Card className="mt-8 shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Featured Competitions
          </CardTitle>
          <CardDescription>Join exciting tournaments and compete with others</CardDescription>
        </CardHeader>
        <CardContent>
          {competitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {competitions.map((competition) => (
                <div 
                  key={competition.id} 
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate("/competitions")}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{competition.title}</h3>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        competition.status === 'active' ? 'bg-green-100 text-green-800' :
                        competition.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        competition.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {competition.description || `${competition.quiz?.title || 'Bible Quiz'} - Test your knowledge and compete for prizes!`}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      Prize Pool: ${competition.prize_pool}
                    </span>
                    <span className="text-xs text-gray-500">
                      {competition.entries_count} participants
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(competition.start_date).toLocaleDateString()} - {new Date(competition.end_date).toLocaleDateString()}
                    </span>
                    <Button 
                      size="sm" 
                      variant={competition.user_has_entered ? "outline" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/competitions");
                      }}
                    >
                      {competition.user_has_entered ? "Joined" : "Join Now"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No competitions available</p>
              <p className="text-sm">Check back later for new tournaments and challenges!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Membership Tiers Section */}
      {!hideMembership && (
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
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
