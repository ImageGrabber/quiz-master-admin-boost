import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Clock, Target, Trophy, ArrowRight, Play, Calendar, Users, Star, Award } from "lucide-react";
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

interface WeeklyQuiz {
  id: number;
  week_start_date: string;
  week_end_date: string;
  title: string;
  description: string;
  theme: string;
  difficulty: string;
  total_questions: number;
  time_limit: number;
}

interface WeeklyQuizAttempt {
  id: string;
  score: number;
  seconds_used: number;
  completed: boolean;
  created_at: string;
}

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  score: number;
  time_used: number;
  display_name?: string;
}

const WeeklyQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<WeeklyQuiz | null>(null);
  const [userAttempt, setUserAttempt] = useState<WeeklyQuizAttempt | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    fetchCurrentWeeklyQuiz();
  }, []);

  const fetchCurrentWeeklyQuiz = async () => {
    try {
      setIsLoading(true);
      
      // Get current week's quiz
      const { data: quizData, error: quizError } = await supabase
        .from('weekly_quizzes')
        .select('*')
        .eq('is_active', true)
        .lte('week_start_date', new Date().toISOString().split('T')[0])
        .gte('week_end_date', new Date().toISOString().split('T')[0])
        .order('week_start_date', { ascending: false })
        .limit(1)
        .single();

      if (quizError) {
        console.error('Error fetching weekly quiz:', quizError);
        toast({
          title: "No Weekly Quiz",
          description: "There's no weekly quiz available for this week.",
          variant: "destructive",
        });
        return;
      }

      if (quizData) {
        setCurrentQuiz(quizData);
        await fetchUserAttempt(quizData.id);
        await fetchLeaderboard(quizData.id);
      }
    } catch (error) {
      console.error('Error fetching weekly quiz:', error);
      toast({
        title: "Error",
        description: "Failed to load weekly quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAttempt = async (quizId: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: attempt, error } = await supabase
        .from('weekly_quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('weekly_quiz_id', quizId)
        .single();

      if (attempt) {
        setUserAttempt(attempt);
      }
    } catch (error) {
      console.error('Error fetching user attempt:', error);
    }
  };

  const fetchLeaderboard = async (quizId: number) => {
    try {
      const { data: leaderboardData, error } = await supabase
        .from('weekly_quiz_leaderboard')
        .select(`
          rank,
          score,
          time_used,
          user_id,
          profiles!inner(full_name)
        `)
        .eq('weekly_quiz_id', quizId)
        .order('rank')
        .limit(10);

      if (leaderboardData) {
        setLeaderboard(leaderboardData.map(entry => ({
          rank: entry.rank,
          user_id: entry.user_id,
          score: entry.score,
          time_used: entry.time_used,
          display_name: entry.profiles?.full_name || 'Anonymous'
        })));
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleStartQuiz = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDialogTitle("Not logged in");
        setDialogMessage("Please log in to take the weekly quiz.");
        setDialogOpen(true);
        navigate("/auth/login");
        return;
      }

      if (!currentQuiz) {
        setDialogTitle("No Quiz Available");
        setDialogMessage("There's no weekly quiz available for this week.");
        setDialogOpen(true);
        return;
      }

      // Check if user has already attempted this quiz
      if (userAttempt && userAttempt.completed) {
        setDialogTitle("Already Completed");
        setDialogMessage("You have already completed this week's quiz. Check back next week for a new challenge!");
        setDialogOpen(true);
        return;
      }

      // Navigate to the weekly quiz
      navigate(`/weekly-quiz/${currentQuiz.id}`);
    } catch (err) {
      console.error('Error starting weekly quiz:', err);
      setDialogTitle("Error");
      setDialogMessage("Something went wrong. Please try again.");
      setDialogOpen(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getWeekRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading weekly quiz...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentQuiz) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">No Weekly Quiz Available</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Check back later for this week's quiz challenge.</p>
            <Button onClick={() => navigate("/quiz-selection")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Browse Regular Quizzes
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Dialog for notifications */}
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
      
      {/* Modern Background with Gradient */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <main className="relative container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Weekly Bible Challenge
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Test your knowledge with this week's special Bible quiz. Compete with others and see how you rank!
              </p>
            </div>

            {/* Current Week's Quiz */}
            <div className="mb-12">
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md ring-1 ring-white/20 hover:shadow-3xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {currentQuiz.title}
                        </CardTitle>
                        <p className="text-gray-600">
                          Week of {getWeekRange(currentQuiz.week_start_date, currentQuiz.week_end_date)}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {currentQuiz.theme}
                    </Badge>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {currentQuiz.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Quiz Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">35</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{formatTime(currentQuiz.time_limit)}</div>
                      <div className="text-sm text-gray-600">Time Limit</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2">
                        <Trophy className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">100</div>
                      <div className="text-sm text-gray-600">Max Score</div>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-50 rounded-xl">
                      <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg mx-auto mb-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        <Badge className={getDifficultyColor(currentQuiz.difficulty)}>
                          {currentQuiz.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Difficulty</div>
                    </div>
                  </div>

                  {/* User Attempt Status */}
                  {userAttempt && userAttempt.completed && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800">Quiz Completed!</h4>
                          <p className="text-green-700">
                            You scored {userAttempt.score} points in {formatTime(userAttempt.seconds_used)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleStartQuiz}
                      disabled={userAttempt?.completed}
                      className={`px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                        userAttempt?.completed
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      }`}
                    >
                      {userAttempt?.completed ? (
                        <>
                          <Trophy className="w-5 h-5 mr-2" />
                          Already Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Weekly Quiz
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            {leaderboard.length > 0 && (
              <div className="mb-12">
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md ring-1 ring-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                      Weekly Leaderboard
                    </CardTitle>
                    <p className="text-gray-600">
                      Top performers for this week's quiz
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.map((entry, index) => (
                        <div key={entry.user_id} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
                          index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
                          index === 2 ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200' :
                          'bg-gray-50 border border-gray-100'
                        }`}>
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-orange-500 text-white' :
                              'bg-blue-500 text-white'
                            }`}>
                              {entry.rank}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {entry.display_name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {formatTime(entry.time_used)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {entry.score} pts
                            </div>
                            <div className="text-sm text-gray-600">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Additional Info */}
            <div className="text-center">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>Weekly quizzes are updated every Monday</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default WeeklyQuiz;
