import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calendar, Play, Timer, Trophy, Star } from "lucide-react";
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

const WeeklyQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<WeeklyQuiz | null>(null);
  const [userAttempt, setUserAttempt] = useState<WeeklyQuizAttempt | null>(null);
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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600 font-medium">Loading challenge...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!currentQuiz) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Quiz This Week</h3>
            <p className="text-gray-500 mb-8">Check back later for a new weekly challenge.</p>
            <Button onClick={() => navigate("/quiz-selection")} className="w-full sm:w-auto">
              Browse All Quizzes
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
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
      
      <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-b from-white to-indigo-50/50">
        <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full text-center space-y-10">
            
            {/* Header Section */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0">
                Weekly Challenge
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                {currentQuiz.title}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {currentQuiz.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-indigo-500 mb-2 flex justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="font-bold text-2xl text-gray-900">{currentQuiz.total_questions}</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Questions</div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-indigo-500 mb-2 flex justify-center">
                  <Timer className="w-6 h-6" />
                </div>
                <div className="font-bold text-2xl text-gray-900">{Math.floor(currentQuiz.time_limit / 60)}m</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Time Limit</div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-indigo-500 mb-2 flex justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="font-bold text-2xl text-gray-900 capitalize">{currentQuiz.difficulty}</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Difficulty</div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-indigo-500 mb-2 flex justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div className="font-bold text-2xl text-gray-900">{currentQuiz.theme || 'General'}</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Theme</div>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
              <Button 
                size="lg" 
                className="h-16 px-10 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={handleStartQuiz}
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Start Challenge
              </Button>
              
              <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Available until {new Date(currentQuiz.week_end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </p>
            </div>

          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default WeeklyQuiz;
