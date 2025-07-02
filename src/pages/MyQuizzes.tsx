import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Trophy, Clock, Target, Play, TrendingUp, Calendar, Award, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";

interface QuizAttempt {
  id: string;
  quiz_id: number;
  score: number;
  seconds_used: number;
  created_at: string;
  quiz_title?: string;
}

interface QuizStats {
  quiz_id: number;
  quiz_title: string;
  attempts: number;
  best_score: number;
  average_score: number;
  total_time: number;
  last_attempt: string;
}

const MyQuizzes = () => {
  const [quizStats, setQuizStats] = useState<QuizStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchUserQuizzes();
    checkWeeklyLimit();
  }, []);

  const fetchUserQuizzes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth/login");
        return;
      }

      // Fetch all attempts for the user
      const { data: attempts, error } = await supabase
        .from('attempts')
        .select(`
          id,
          quiz_id,
          score,
          seconds_used,
          created_at,
          quizzes!inner(title)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group attempts by quiz and calculate stats
      const quizMap = new Map<number, QuizStats>();
      
      attempts?.forEach((attempt: any) => {
        const quizId = attempt.quiz_id;
        const quizTitle = attempt.quizzes.title;
        
        if (!quizMap.has(quizId)) {
          quizMap.set(quizId, {
            quiz_id: quizId,
            quiz_title: quizTitle,
            attempts: 0,
            best_score: 0,
            average_score: 0,
            total_time: 0,
            last_attempt: attempt.created_at
          });
        }
        
        const stats = quizMap.get(quizId)!;
        stats.attempts += 1;
        stats.best_score = Math.max(stats.best_score, attempt.score);
        stats.total_time += attempt.seconds_used;
        stats.last_attempt = attempt.created_at;
      });

      // Calculate average scores
      quizMap.forEach((stats) => {
        const totalScore = attempts?.filter(a => a.quiz_id === stats.quiz_id)
          .reduce((sum, a) => sum + a.score, 0) || 0;
        stats.average_score = Math.round(totalScore / stats.attempts);
      });

      setQuizStats(Array.from(quizMap.values()));
    } catch (error) {
      console.error('Error fetching user quizzes:', error);
      toast({
        title: "Error",
        description: "Failed to load your quiz history.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkWeeklyLimit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      const role = profile?.role || 'free';
      setUserRole(role);
      if (role === 'free') {
        // Check if user has already taken a quiz this week (Sunday to Sunday)
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        const { data: attempts } = await supabase
          .from('attempts')
          .select('id, created_at')
          .eq('user_id', user.id)
          .gte('created_at', startOfWeek.toISOString())
          .lt('created_at', endOfWeek.toISOString());
        if (attempts && attempts.length > 0) {
          setDailyLimitReached(true);
        } else {
          setDailyLimitReached(false);
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700";
    if (score >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading your quiz history...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Weekly Limit Banner */}
        {userRole === 'free' && dailyLimitReached && (
          <div className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-2">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            <span>
              You have reached your weekly quiz limit for the Free plan. You can take another quiz next week (starting Sunday), or <b>upgrade to Pro</b> for unlimited quizzes!
            </span>
          </div>
        )}
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Quizzes</h1>
            <p className="text-gray-600 mt-2">Track your performance across all quizzes</p>
          </div>
          <Button
            onClick={() => navigate("/quiz-selection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={userRole === 'free' && dailyLimitReached}
          >
            <Play className="w-4 h-4 mr-2" />
            Take New Quiz
          </Button>
        </div>

        {/* Quiz Stats Grid */}
        {quizStats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizStats.map((quiz) => (
              <Card key={quiz.quiz_id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {quiz.quiz_title}
                    </CardTitle>
                    <Badge className="bg-blue-100 text-blue-700">
                      {quiz.attempts} {quiz.attempts === 1 ? 'attempt' : 'attempts'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Last taken {formatDate(quiz.last_attempt)}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Best Score */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">Best Score</span>
                    </div>
                    <Badge className={getScoreColor(quiz.best_score)}>
                      {quiz.best_score} pts
                    </Badge>
                  </div>

                  {/* Average Score */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Average Score</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {quiz.average_score} pts
                      </span>
                    </div>
                    <Progress 
                      value={quiz.average_score} 
                      max={100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Total Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">Total Time</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatTime(quiz.total_time)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate("/leaderboard")}
                    >
                      <Award className="w-3 h-3 mr-1" />
                      Leaderboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quizzes Taken Yet</h3>
              <p className="text-gray-600 mb-6">
                Start your quiz journey by taking your first quiz!
              </p>
              <Button
                onClick={() => navigate("/quiz-selection")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Take Your First Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        {quizStats.length > 0 && (
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle>Overall Performance Summary</CardTitle>
              <CardDescription>Your quiz-taking statistics across all quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {quizStats.length}
                  </div>
                  <div className="text-sm text-gray-600">Quizzes Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {quizStats.reduce((sum, quiz) => sum + quiz.attempts, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.max(...quizStats.map(q => q.best_score))}
                  </div>
                  <div className="text-sm text-gray-600">Highest Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatTime(quizStats.reduce((sum, quiz) => sum + quiz.total_time, 0))}
                  </div>
                  <div className="text-sm text-gray-600">Total Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyQuizzes; 