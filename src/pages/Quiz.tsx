
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample quiz data - in real app this would come from Supabase
const sampleQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctIndex: 1
  },
  {
    id: 3,
    question: "What is 15 + 27?",
    options: ["40", "41", "42", "43"],
    correctIndex: 2
  },
  // Add more questions to reach 25...
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctIndex: 2
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctIndex: 3
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isCompleted]);

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

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setIsCompleted(true);
    
    // Calculate score
    const correctAnswers = answers.filter((answer, index) => 
      answer === sampleQuestions[index]?.correctIndex
    ).length;
    
    const baseScore = correctAnswers * 4 - (sampleQuestions.length - correctAnswers) * 1;
    const timeBonus = Math.ceil((600 - (600 - timeLeft)) / 6);
    const totalScore = Math.max(0, baseScore + timeBonus);

    toast({
      title: "Quiz completed!",
      description: `You scored ${totalScore} points with ${correctAnswers} correct answers.`,
    });

    // Navigate to results page with score
    navigate(`/result/123`, { 
      state: { 
        score: totalScore, 
        correct: correctAnswers, 
        total: sampleQuestions.length,
        timeUsed: 600 - timeLeft
      } 
    });
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const currentQ = sampleQuestions[currentQuestion];

  if (!currentQ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
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
              {currentQ.options.map((option, index) => (
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
                  {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
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
