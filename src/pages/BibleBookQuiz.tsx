import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle, ArrowLeft, ChevronRight, Menu } from "lucide-react";
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
import SEO from "@/components/SEO";

interface Question {
  chapter: number;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface BibleBookQuizProps {
  title: string;
  questions: Question[];
  bookName: string;
}

const BibleBookQuiz = ({ title, questions, bookName }: BibleBookQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      
      if (timeLeft === 180 || timeLeft === 60 || timeLeft === 30) {
        setDialogTitle(timeLeft === 180 ? "⚠️ Time Warning" : timeLeft === 60 ? "🚨 Final Warning" : "⏰ Almost Time's Up!");
        setDialogMessage(timeLeft === 180 ? "You have 3 minutes remaining!" : timeLeft === 60 ? "Only 1 minute remaining! Hurry up!" : "Only 30 seconds left!");
        setDialogOpen(true);
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      }
      
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
      answer === questions[index]?.answer
    ).length;
    
    const baseScore = correctAnswers * 4 - (questions.length - correctAnswers) * 1;
    const timeBonus = Math.ceil((600 - (600 - timeLeft)) / 6);
    const totalScore = Math.max(0, baseScore + timeBonus);
    const accuracy = Math.round((correctAnswers / questions.length) * 100);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let { data: quiz } = await supabase
          .from('quizzes')
          .select('id, title')
          .eq('title', `${bookName} Quiz`)
          .single();

        if (!quiz) {
          const { data: newQuiz, error: quizError } = await supabase
            .from('quizzes')
            .insert({
              title: `${bookName} Quiz`,
              description: `Test your knowledge of the Book of ${bookName}`
            })
            .select()
            .single();
          if (quizError) throw quizError;
          quiz = newQuiz;
        }

        const { error } = await supabase
          .from('attempts')
          .insert({
            user_id: user.id,
            quiz_id: quiz.id,
            score: totalScore,
            seconds_used: 600 - timeLeft,
            answers: finalAnswers
          });

        if (error) {
          console.error('Error saving attempt:', error);
        } else {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', user.id)
            .single();

          if (profile?.email) {
            const emailData: QuizCompletionEmailData = {
              email: profile.email,
              userName: profile.full_name || 'Quiz Taker',
              quizTitle: quiz.title,
              score: totalScore,
              correctAnswers: correctAnswers,
              totalQuestions: questions.length,
              timeUsed: 600 - timeLeft,
              accuracy: accuracy
            };

            sendQuizCompletionEmailWithFallback(emailData, () => {}, (err) => console.error(err));
          }
        }
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }

    navigate(`/result/latest`, { 
      state: { 
        score: totalScore, 
        correct: correctAnswers, 
        total: questions.length,
        timeUsed: 600 - timeLeft
      } 
    });
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-urbanist">
        <div className="text-center">
          <Brain className="w-12 h-12 text-black mx-auto mb-4" />
          <p className="text-gray-600 font-light">No questions available for this quiz.</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white font-urbanist">
      <SEO title={title} description={`Test your knowledge of ${bookName}`} />
      
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12 border-b border-gray-100 bg-white z-50">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 text-gray-500 font-light">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500 hover:text-black">
            Exit Quiz
          </Button>
        </div>
      </header>

      {/* Progress Bar (Sticky) */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm font-light text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="hidden md:inline italic">{bookName} Hub</span>
          </div>
          <Progress value={progress} className="h-1 bg-gray-100" />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="space-y-12">
          {/* Question Header */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-xs uppercase tracking-widest font-light px-3 py-1 rounded-full border-gray-200">
                Chapter {currentQ.chapter}
              </Badge>
              {timeLeft <= 60 && (
                <Badge className="bg-red-50 text-red-600 border-red-100 font-light px-3 py-1 rounded-full animate-pulse">
                  Ending Soon
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight">
              {currentQ.question}
            </h1>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-8 text-left rounded-2xl border-2 transition-all duration-300 flex items-center group ${
                  selectedAnswer === index 
                    ? "border-black bg-black text-white" 
                    : "border-gray-100 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-6 text-sm font-semibold flex-shrink-0 ${
                  selectedAnswer === index ? "bg-white text-black" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-xl font-light leading-relaxed">{option}</span>
              </button>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-10 flex flex-col items-center space-y-6">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full md:w-auto px-12 py-8 text-xl font-light rounded-full transition-all duration-500 ${
                selectedAnswer !== null 
                  ? "bg-black text-white hover:bg-gray-800 translate-y-0 opacity-100" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              }`}
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz →" : "Next Question →"}
            </Button>
            
            <p className="text-gray-400 font-light italic">
              Carefully review your answer before continuing.
            </p>
          </div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="font-urbanist rounded-3xl border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">{dialogTitle}</DialogTitle>
            <DialogDescription className="text-lg font-light text-gray-600">{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BibleBookQuiz;