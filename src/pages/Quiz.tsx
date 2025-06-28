import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .limit(25);

      if (error) throw error;
      
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        toast({
          title: "No questions available",
          description: "Please contact an administrator to add questions.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isCompleted, isLoading]);

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
            quiz_id: 1, // Default quiz ID for now
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
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-900">
                Home
              </Button>
              <Button onClick={() => navigate("/leaderboard")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Leaderboard
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
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
