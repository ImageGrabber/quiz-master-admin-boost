import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle, Trophy, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { sendQuizCompletionEmailWithFallback, QuizCompletionEmailData } from "@/lib/emailService";

interface WeeklyQuizQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
  order_index: number;
}

interface WeeklyQuiz {
  id: number;
  title: string;
  description: string;
  theme: string;
  difficulty: string;
  total_questions: number;
  time_limit: number;
}

const WeeklyQuizTaking = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<WeeklyQuiz | null>(null);
  const [questions, setQuestions] = useState<WeeklyQuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const hasAutoSubmittedRef = useRef(false);
  const handleQuizCompleteRef = useRef<((finalAnswers?: number[]) => Promise<void>) | null>(null);

  // Fetch quiz data and questions on component mount
  useEffect(() => {
    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  useEffect(() => {
    const checkExistingAttempt = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !quizId) return;
      
      const { data: attempts, error } = await supabase
        .from('weekly_quiz_attempts')
        .select('id, completed')
        .eq('user_id', user.id)
        .eq('weekly_quiz_id', parseInt(quizId));
      
      if (error) return;
      if (attempts && attempts.length > 0 && attempts[0].completed) {
        navigate('/weekly-quiz', { replace: true });
      }
    };
    checkExistingAttempt();
  }, [quizId]);

  // Create attempt on quiz start
  useEffect(() => {
    const createAttempt = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !quizId) return;
      
      // Check for existing in-progress attempt
      const { data: existing, error: existingError } = await supabase
        .from('weekly_quiz_attempts')
        .select('id, completed')
        .eq('user_id', user.id)
        .eq('weekly_quiz_id', parseInt(quizId))
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (existing && existing.length > 0 && !existing[0].completed) {
        setAttemptId(existing[0].id);
        return;
      }
      
      // Create new attempt
      const { data, error } = await supabase
        .from('weekly_quiz_attempts')
        .insert({
          user_id: user.id,
          weekly_quiz_id: parseInt(quizId),
          score: 0,
          seconds_used: 0,
          answers: [],
          completed: false
        })
        .select('id')
        .single();
      
      if (data && data.id) setAttemptId(data.id);
    };
    createAttempt();
  }, [quizId]);

  // Store handleQuizComplete in ref for stable reference
  useEffect(() => {
    handleQuizCompleteRef.current = handleQuizComplete;
  });

  // Start timer when quiz is loaded and time is set
  useEffect(() => {
    if (!isLoading && quiz && timeLeft > 0 && !isCompleted) {
      setShouldStartTimer(true);
    } else {
      setShouldStartTimer(false);
    }
  }, [isLoading, quiz, timeLeft, isCompleted]);

  // Timer effect with enhanced warnings
  useEffect(() => {
    // Don't start timer if conditions aren't met
    if (!shouldStartTimer || isCompleted) {
      return;
    }

    // Reset auto-submit flag when timer starts
    hasAutoSubmittedRef.current = false;

    // Start the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time is up - show dialog and auto submit
          if (!hasAutoSubmittedRef.current && !isCompleted) {
            hasAutoSubmittedRef.current = true;
            setDialogTitle("⏰ Time's Up!");
            setDialogMessage("Your time has expired. The quiz will be automatically submitted with your current answers.");
            setDialogOpen(true);
            // Auto submit after showing dialog - don't set hasAutoSubmittedRef yet, let handleQuizComplete do it
            setTimeout(() => {
              console.log('Auto-submitting quiz...');
              hasAutoSubmittedRef.current = false; // Reset to allow submission
              if (handleQuizCompleteRef.current) {
                handleQuizCompleteRef.current().catch(err => {
                  console.error('Error in auto-submit:', err);
                });
              } else {
                console.error('handleQuizCompleteRef.current is null');
              }
            }, 1500);
          }
          return 0;
        }
        
        const newTime = prevTime - 1;
        
        // Show time warnings
        if (newTime === 180) { // 3 minutes left
          setDialogTitle("⚠️ Time Warning");
          setDialogMessage("You have 3 minutes remaining!");
          setDialogOpen(true);
          setShowTimeWarning(true);
          setTimeout(() => setShowTimeWarning(false), 5000);
        } else if (newTime === 60) { // 1 minute left
          setDialogTitle("🚨 Final Warning");
          setDialogMessage("Only 1 minute remaining! Hurry up!");
          setDialogOpen(true);
          setShowTimeWarning(true);
          setTimeout(() => setShowTimeWarning(false), 5000);
        } else if (newTime === 30) { // 30 seconds left
          setDialogTitle("⏰ Almost Time's Up!");
          setDialogMessage("Only 30 seconds left!");
          setDialogOpen(true);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [shouldStartTimer, isCompleted]);

  // Handle time running out (backup check)
  useEffect(() => {
    if (timeLeft === 0 && !isLoading && quiz && questions.length > 0 && !hasAutoSubmittedRef.current) {
      console.log('Time ran out - triggering auto-submit', { isCompleted, hasAutoSubmitted: hasAutoSubmittedRef.current });
      hasAutoSubmittedRef.current = true;
      setDialogTitle("⏰ Time's Up!");
      setDialogMessage("Your time has expired. The quiz will be automatically submitted with your current answers.");
      setDialogOpen(true);
      // Auto submit after showing dialog
      setTimeout(() => {
        console.log('Auto-submitting quiz from backup check...');
        // Reset flag to allow submission
        hasAutoSubmittedRef.current = false;
        // Call the function directly with current answers
        const submitQuiz = async () => {
          // Include current question's answer if selected
          const completeAnswers = [...answers];
          if (selectedAnswer !== null && completeAnswers.length === currentQuestion) {
            completeAnswers.push(selectedAnswer);
          }
          // Fill remaining with -1
          while (completeAnswers.length < questions.length) {
            completeAnswers.push(-1);
          }
          
          if (handleQuizCompleteRef.current) {
            await handleQuizCompleteRef.current(completeAnswers).catch(err => {
              console.error('Error in auto-submit from backup:', err);
            });
          }
        };
        submitQuiz();
      }, 1500);
    }
  }, [timeLeft, isLoading, quiz, questions.length, answers, selectedAnswer, currentQuestion]);

  // Block browser/tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isCompleted) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isCompleted]);

  const fetchQuizData = async () => {
    try {
      // Fetch quiz details
      const { data: quizData, error: quizError } = await supabase
        .from('weekly_quizzes')
        .select('*')
        .eq('id', parseInt(quizId!))
        .single();

      if (quizError) throw quizError;
      setQuiz(quizData);
      setTimeLeft(quizData.time_limit);

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('weekly_quiz_questions')
        .select('*')
        .eq('weekly_quiz_id', parseInt(quizId!))
        .order('order_index');

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setDialogTitle("Error");
      setDialogMessage("Failed to load quiz. Please try again.");
      setDialogOpen(true);
      navigate("/weekly-quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = async (finalAnswers = answers) => {
    console.log('handleQuizComplete called', { isCompleted, hasAutoSubmitted: hasAutoSubmittedRef.current, finalAnswers });
    
    // Prevent multiple submissions
    if (isCompleted || hasAutoSubmittedRef.current) {
      console.log('Submission prevented - already completed or submitted');
      return;
    }
    
    setIsCompleted(true);
    hasAutoSubmittedRef.current = true;
    console.log('Starting quiz completion...');
    
    // Include current question's answer if selected but not yet submitted
    const completeAnswers = [...finalAnswers];
    if (selectedAnswer !== null && completeAnswers.length === currentQuestion) {
      completeAnswers.push(selectedAnswer);
    }
    
    // Ensure we have answers for all questions (fill with -1 for unanswered)
    while (completeAnswers.length < questions.length) {
      completeAnswers.push(-1); // -1 means unanswered
    }
    
    // Calculate score (only count answered questions)
    const answeredQuestions = completeAnswers.filter(answer => answer !== -1).length;
    const correctAnswers = completeAnswers
      .filter((answer, index) => answer !== -1 && answer === questions[index]?.correct_index)
      .length;
    const wrongAnswers = answeredQuestions - correctAnswers;
    
    const baseScore = correctAnswers * 4 - wrongAnswers * 1;
    const timeBonus = Math.ceil((quiz!.time_limit - (quiz!.time_limit - timeLeft)) / 6);
    const totalScore = Math.max(0, baseScore + timeBonus);
    const accuracy = Math.round((correctAnswers / questions.length) * 100);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && attemptId) {
        // Update attempt
        await supabase
          .from('weekly_quiz_attempts')
          .update({
            score: totalScore,
            seconds_used: quiz!.time_limit - timeLeft,
            answers: completeAnswers,
            completed: true,
            completed_at: new Date().toISOString()
          })
          .eq('id', attemptId);

        // Update leaderboard
        await supabase.rpc('update_weekly_leaderboard', {
          p_weekly_quiz_id: parseInt(quizId!)
        });

        // Award badges for weekly quiz completion
        const { evaluateBadgesOnQuizComplete, ensureSeedBadges } = await import("@/lib/badgeService");
        await ensureSeedBadges();
        await evaluateBadgesOnQuizComplete({
          userId: user.id,
          score: totalScore,
          timeUsedSeconds: quiz!.time_limit - timeLeft,
          quizTitle: quiz?.title
        });

        // Send completion email
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', user.id)
          .single();

        if (quiz && profile?.email) {
          const emailData: QuizCompletionEmailData = {
            email: profile.email,
            userName: profile.full_name || 'Quiz Taker',
            quizTitle: quiz.title,
            score: totalScore,
            correctAnswers: correctAnswers,
            totalQuestions: questions.length,
            timeUsed: quiz.time_limit - timeLeft,
            accuracy: accuracy
          };

          sendQuizCompletionEmailWithFallback(
            emailData,
            () => console.log('Weekly quiz completion email sent successfully'),
            (error) => console.error('Failed to send weekly quiz completion email:', error)
          );
        }
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      setDialogTitle("Error");
      setDialogMessage("Failed to save your attempt. Please try again.");
      setDialogOpen(true);
    }

    setDialogTitle("Weekly Bible Quiz Completed!");
    setDialogMessage(`Congratulations! You scored ${totalScore} points with ${correctAnswers} correct answers. Your score has been added to the weekly leaderboard!`);
    setDialogOpen(true);

    // Navigate back to weekly quiz page
    setTimeout(() => {
      navigate('/weekly-quiz');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
    // Don't allow answer selection if time is up or quiz is completed
    if (isCompleted || timeLeft === 0) {
      return;
    }
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading weekly quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    // Show a friendly message instead of a blank page when there are no questions
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-lg w-full px-4">
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">No Questions Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">This weekly quiz doesn't have any questions yet. Please check back later or return to the weekly quiz list.</p>
              <div className="flex justify-center">
                <Button onClick={() => navigate('/weekly-quiz')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Back to Weekly Quizzes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const options = [currentQ.option_a, currentQ.option_b, currentQ.option_c, currentQ.option_d];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Dialog for all notifications */}
      <Dialog 
        open={dialogOpen} 
        onOpenChange={(open) => {
          // Prevent closing dialog when time is up
          if (dialogTitle === "⏰ Time's Up!") {
            return;
          }
          setDialogOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {dialogTitle === "⏰ Time's Up!" ? (
              <Button disabled className="opacity-50 cursor-not-allowed">
                Submitting...
              </Button>
            ) : (
              <DialogClose asChild>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
              </DialogClose>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Floating Time Warning */}
      {showTimeWarning && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">TIME RUNNING OUT!</span>
          </div>
        </div>
      )}
      
      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{quiz?.title}</h1>
                    <p className="text-blue-100">{quiz?.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-white/20 text-white">
                        {quiz?.theme}
                      </Badge>
                      <Badge className="bg-white/20 text-white">
                        {quiz?.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-blue-100">
                      Time Remaining
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 leading-relaxed">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  disabled={isCompleted || timeLeft === 0}
                  className={`w-full p-6 text-left justify-start text-wrap h-auto min-h-[60px] transition-all duration-200 ${
                    selectedAnswer === index 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : "hover:bg-blue-50 hover:border-blue-300"
                  } ${(isCompleted || timeLeft === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                      selectedAnswer === index ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base font-medium flex-1">{option}</span>
                    {selectedAnswer === index && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                </Button>
              ))}
              
              <div className="pt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Select an answer to continue
                </div>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null || isCompleted || timeLeft === 0}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === questions.length - 1 ? "Finish Weekly Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WeeklyQuizTaking;
