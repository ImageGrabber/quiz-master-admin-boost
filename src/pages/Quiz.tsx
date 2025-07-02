import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
}

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch questions on component mount
  useEffect(() => {
    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      // First get the questions for this specific quiz
      const { data: quizQuestions, error: quizError } = await supabase
        .from('quiz_questions')
        .select('question_id, order_index')
        .eq('quiz_id', parseInt(quizId!))
        .order('order_index');

      if (quizError) throw quizError;

      if (!quizQuestions || quizQuestions.length === 0) {
        toast({
          title: "No questions found",
          description: "This quiz doesn't have any questions assigned.",
          variant: "destructive",
        });
        navigate("/quiz-selection");
        return;
      }

      // Get the actual question details
      const questionIds = quizQuestions.map(qq => qq.question_id);
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .in('id', questionIds)
        .order('id');

      if (questionsError) throw questionsError;
      
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        toast({
          title: "No questions available",
          description: "Please contact an administrator to add questions to this quiz.",
          variant: "destructive",
        });
        navigate("/quiz-selection");
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
      navigate("/quiz-selection");
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect with enhanced warnings
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      
      // Show time warnings
      if (timeLeft === 180) { // 3 minutes left
        toast({
          title: "⚠️ Time Warning",
          description: "You have 3 minutes remaining!",
          variant: "destructive",
        });
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 60) { // 1 minute left
        toast({
          title: "🚨 Final Warning",
          description: "Only 1 minute remaining! Hurry up!",
          variant: "destructive",
        });
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 30) { // 30 seconds left
        toast({
          title: "⏰ Almost Time's Up!",
          description: "Only 30 seconds left!",
          variant: "destructive",
        });
      }
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isCompleted, isLoading, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index: number) => {
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

  const handleQuizComplete = async (finalAnswers = answers) => {
    setIsCompleted(true);
    
    // Calculate score
    const correctAnswers = finalAnswers.filter((answer, index) => 
      answer === questions[index]?.correct_index
    ).length;
    
    const baseScore = correctAnswers * 4 - (questions.length - correctAnswers) * 1;
    const timeBonus = Math.ceil((600 - (600 - timeLeft)) / 6);
    const totalScore = Math.max(0, baseScore + timeBonus);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('attempts')
          .insert({
            user_id: user.id,
            quiz_id: parseInt(quizId!),
            score: totalScore,
            seconds_used: 600 - timeLeft,
            answers: finalAnswers
          });

        if (error) {
          console.error('Error saving attempt:', error);
        }
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }

    toast({
      title: "Quiz completed!",
      description: `You scored ${totalScore} points with ${correctAnswers} correct answers.`,
    });

    // Navigate to results page with score
    navigate(`/result/latest`, { 
      state: { 
        score: totalScore, 
        correct: correctAnswers, 
        total: questions.length,
        timeUsed: 600 - timeLeft
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return null; // Will redirect in useEffect
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const options = [currentQ.option_a, currentQ.option_b, currentQ.option_c, currentQ.option_d];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      {/* Floating Time Warning */}
      {showTimeWarning && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">TIME RUNNING OUT!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
              <span className="text-lg font-semibold text-gray-900 align-middle">BibleBattles</span>
            </div>
            
            {/* Timer Display */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-900">
                Home
              </Button>
              <Button onClick={() => navigate("/leaderboard")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Leaderboard
              </Button>
            </div>
          </div>
          
          {/* Progress and Timer Bar */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>
            <div className="flex space-x-2">
              <Progress value={progress} className="flex-1 h-2" />
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Time Status Card */}
          <div className="mb-6">
            <Card className={`border-0 shadow-lg transition-all duration-300 ${
              timeLeft <= 60 
                ? 'bg-red-50 border-red-200' 
                : timeLeft <= 180 
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-blue-50 border-blue-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className={`w-6 h-6 ${
                      timeLeft <= 60 ? 'text-red-600' : timeLeft <= 180 ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {timeLeft <= 60 ? 'Final Countdown!' : timeLeft <= 180 ? 'Time is Running Out!' : 'Quiz Timer'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {timeLeft <= 60 
                          ? 'Complete your quiz quickly!' 
                          : timeLeft <= 180 
                            ? 'You have less than 3 minutes remaining'
                            : 'You have plenty of time to think carefully'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono text-2xl font-bold ${
                      timeLeft <= 60 ? 'text-red-600' : timeLeft <= 180 ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.ceil((timeLeft / 600) * 100)}% remaining
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                  className={`w-full p-6 text-left justify-start text-wrap h-auto min-h-[60px] transition-all duration-200 ${
                    selectedAnswer === index 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : "hover:bg-blue-50 hover:border-blue-300"
                  }`}
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
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quiz;