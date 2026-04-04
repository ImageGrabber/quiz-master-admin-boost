import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Clock, Brain, CheckCircle, AlertTriangle, ChevronRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { sendQuizCompletionEmailWithFallback, QuizCompletionEmailData } from "@/lib/emailService";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";

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
  difficulty?: string;
  useLandingShell?: boolean;
}

const BibleBookQuiz = ({ title, questions, bookName, difficulty = "beginner", useLandingShell = false }: BibleBookQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const navigate = useNavigate();
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
      }
      
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
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

    setScore(accuracy);
    setCorrectAnswersCount(correctAnswers);

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

        await supabase
          .from('attempts')
          .insert({
            user_id: user.id,
            quiz_id: quiz.id,
            score: totalScore,
            seconds_used: 600 - timeLeft,
            answers: finalAnswers
          });

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
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }

    setIsLoading(false);
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

  const getDifficultyColor = () => {
    const diff = difficulty.toLowerCase();
    if (diff === 'beginner') return 'bg-green-500';
    if (diff === 'intermediate') return 'bg-yellow-500';
    if (diff === 'advanced') return 'bg-red-600';
    return 'bg-gray-900';
  };

  const renderLandingFooter = () => {
    if (!useLandingShell) return null;

    return (
      <footer className="border-t border-gray-200 py-16 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg font-urbanist font-light text-gray-900">Bible Quiz Competition</span>
              </div>
              <p className="font-urbanist font-light text-gray-600 mb-4 max-w-md">
                Free Bible quiz platform that helps you test your knowledge, compete with others, and grow in your understanding of Scripture.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4 font-urbanist">Product</h3>
              <ul className="space-y-3">
                <li><a href="/todays-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Today's Quiz</a></li>
                <li><a href="/weekly-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Weekly Quiz</a></li>
                <li><a href="/public-leaderboard" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Leaderboard</a></li>
                <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4 font-urbanist">Support</h3>
              <ul className="space-y-3">
                <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="/bible-questions-and-answers-hub" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Bible Q&A Hub</a></li>
                <li><a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="font-urbanist font-light text-gray-600">© 2026 Bible Quiz Competition. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  if (isCompleted) {
    const getScoreMessage = (s: number) => {
      if (s >= 90) return "Exceptional understanding! You have mastered this chapter.";
      if (s >= 70) return "Great work! You have a solid grasp of these scriptures.";
      if (s >= 50) return "Good effort. A little more study and you'll be an expert.";
      return "Every master was once a beginner. Keep studying the Word!";
    };

    return (
      <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-orange-100 selection:text-orange-900 pb-20 animate-in fade-in duration-700">
        <SEO title={`Results: ${title}`} description={`Your results for the ${bookName} quiz.`} />
        
        <Navigation />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="overflow-hidden border border-gray-100 shadow-none bg-white rounded-3xl">
            <div className={`h-1.5 ${getDifficultyColor()} w-full`} />
            <CardHeader className="text-center pt-10 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-light text-gray-400 mb-6 uppercase tracking-widest border border-gray-100">
                <Trophy className="h-3 w-3" />
                <span>QUEST COMPLETE</span>
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-2 leading-none">Your Results</CardTitle>
              <CardDescription className="text-gray-400 font-light uppercase tracking-[0.2em] text-[10px]">{title}</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-12 sm:px-12">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="text-8xl font-semibold text-gray-900 relative z-10 leading-none">{score}%</div>
                  <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gray-50 -z-0 opacity-50" />
                </div>
                <p className="text-xl font-light text-gray-900 mb-10 tracking-tight">{getScoreMessage(score)}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  <div className="border border-gray-100 bg-white p-8 rounded-2xl transition-all hover:bg-gray-50/30">
                    <div className="text-4xl font-semibold text-gray-900">{correctAnswersCount}</div>
                    <div className="text-[10px] font-light text-gray-300 uppercase tracking-[0.2em] mt-2">Correct</div>
                  </div>
                  <div className="border border-gray-100 bg-white p-8 rounded-2xl transition-all hover:bg-gray-50/30">
                    <div className="text-4xl font-semibold text-gray-900">{questions.length - correctAnswersCount}</div>
                    <div className="text-[10px] font-light text-gray-300 uppercase tracking-[0.2em] mt-2">Incorrect</div>
                  </div>
                  <div className="border border-gray-100 bg-white p-8 rounded-2xl transition-all hover:bg-gray-50/30">
                    <div className="text-4xl font-semibold text-gray-900">{formatTime(600 - timeLeft)}</div>
                    <div className="text-[10px] font-light text-gray-300 uppercase tracking-[0.2em] mt-2">Time Spent</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100">
                  <Button
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="bg-black hover:bg-gray-800 text-white font-light h-14 px-10 rounded-xl shadow-none transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate(`/bible-questions-and-answers-hub/${bookName.toLowerCase()}`)}
                    className="border-gray-200 font-light h-14 px-10 rounded-xl hover:bg-gray-50 text-xs uppercase tracking-widest text-gray-600 shadow-none"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Back to Hub
                  </Button>
                </div>
              </div>

              {/* Review Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-gray-900 rounded-full" />
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 uppercase tracking-widest text-sm">Scripture Review</h3>
                </div>
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div key={index} className="overflow-hidden rounded-2xl border border-gray-100 bg-white group transition-all hover:border-gray-200 shadow-none">
                      <div className={`h-1.5 w-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <span className="text-[10px] font-light text-gray-300 uppercase tracking-[0.2em]">QUESTION {index + 1}</span>
                          {isCorrect ? (
                            <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-semibold uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                              <CheckCircle className="w-3.5 h-3.5" strokeWidth={3} /> Correct
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-semibold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} /> Incorrect
                            </div>
                          )}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">{q.question}</h4>
                        
                        {q.explanation && (
                          <div className="mb-8 space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-[11px] font-light text-gray-500 uppercase tracking-widest border border-gray-100">
                              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} />
                              <span>Chapter {q.chapter}</span>
                            </div>
                            <p className="text-sm text-gray-500 font-light leading-relaxed pl-6 border-l-2 border-gray-100 italic">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                        
                        <div className="grid gap-3 sm:grid-cols-1">
                          {q.options.map((option, optionIndex) => {
                            const isCorrectOption = optionIndex === q.answer;
                            const isUserSelection = optionIndex === userAnswer;
                            
                            let optionClass = "bg-gray-50/30 text-gray-400 border-gray-100/50";
                            if (isCorrectOption) optionClass = "bg-green-50/50 text-green-700 border-green-100";
                            if (isUserSelection && !isCorrect) optionClass = "bg-red-50/50 text-red-700 border-red-100";

                            return (
                              <div
                                key={optionIndex}
                                className={`p-4 rounded-xl border text-sm font-light leading-snug flex items-center justify-between group/option transition-all ${optionClass}`}
                              >
                                <span className="flex gap-3">
                                  <span className="opacity-40">{String.fromCharCode(65 + optionIndex)}</span>
                                  <span>{option}</span>
                                </span>
                                {isCorrectOption && <CheckCircle className="w-4 h-4 shrink-0" strokeWidth={3} />}
                                {isUserSelection && !isCorrect && <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={3} />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        {renderLandingFooter()}
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-gray-100 selection:text-black pb-20">
      <SEO title={title} description={`Test your knowledge of ${bookName}`} />
      
      <Navigation />
      
      {/* Quiz Status Bar (Sub-Header) */}
      <div className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm mb-12">
        <div className="container mx-auto flex h-12 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100">
              <Clock className={`h-3.5 w-3.5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} strokeWidth={1.5} />
              <span className={`text-[11px] font-semibold tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] font-semibold text-gray-300 uppercase tracking-widest italic">Quest Phase</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-900 font-light text-[10px] uppercase tracking-widest transition-colors h-8">Quit</Button>
        </div>
        
        {/* Dynamic Difficulty Progress Bar Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-100/50">
          <div 
            className={`h-full ${getDifficultyColor()} transition-all duration-700 ease-in-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl px-6">
        {/* Mobile Timer */}
        <div className="sm:hidden flex justify-center mb-8">
          <div className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full shadow-none">
            <Clock className={`h-4 w-4 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
            <span className={`text-sm font-semibold tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-[0.3em]">QUEST {currentQuestion + 1} / {questions.length}</span>
            <span className={`text-[10px] font-semibold uppercase tracking-widest leading-none border px-3 py-1 rounded-full ${
              difficulty === 'beginner' ? 'text-green-600 bg-green-50 border-green-100' :
              difficulty === 'intermediate' ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
              'text-red-600 bg-red-50 border-red-100'
            }`}>
              {bookName} {currentQ.chapter ? `CH. ${currentQ.chapter}` : ''} ({difficulty})
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight tracking-tight">
            {currentQ.question}
          </h1>
        </div>

        {/* Hub Card Style Options */}
        <div className="grid gap-4 mb-12">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  relative flex items-center w-full p-6 text-left transition-all duration-300 rounded-[1.25rem] border group shadow-none
                  ${isSelected 
                    ? 'border-gray-900 bg-black text-white z-10' 
                    : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50/30 text-gray-700'
                  }
                `}
              >
                <div className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-semibold mr-5 transition-colors
                  ${isSelected ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100 group-hover:text-gray-400'}
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base font-bold leading-snug pr-8 transition-all">{option}</span>
                {isSelected && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-5 w-5 text-gray-100" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-6 pt-10 border-t border-gray-100">
          <div className="hidden sm:block text-[10px] font-light text-gray-300 uppercase tracking-[0.3em] italic">
            Quest in progress
          </div>
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            size="lg"
            className={`
              h-16 px-12 rounded-xl font-light text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500 shadow-none
              ${selectedAnswer !== null 
                ? 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95' 
                : 'bg-gray-50 text-gray-200 cursor-not-allowed border border-gray-100'
              }
            `}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quest' : 'Advance'}
            <ChevronRight className={`h-4 w-4 transition-transform ${selectedAnswer !== null ? 'group-hover:translate-x-1' : ''}`} />
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-[100] px-4 border-none shadow-none pointer-events-none">
          <Card className="max-w-md w-full shadow-2xl border-gray-100 overflow-hidden rounded-3xl bg-white animate-in zoom-in-95 duration-200 pointer-events-auto">
            <div className={`h-1.5 ${getDifficultyColor()} w-full`} />
            <CardHeader className="text-center pt-10 pb-4">
              <div className={`w-16 h-16 ${
                difficulty === 'beginner' ? 'bg-green-50 text-green-600' :
                difficulty === 'intermediate' ? 'bg-yellow-50 text-yellow-600' :
                'bg-red-50 text-red-600'
              } rounded-full flex items-center justify-center mx-auto mb-6`}>
                <Clock className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-900 uppercase tracking-tight leading-none">{dialogTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-10 pb-12">
              <p className="text-gray-500 font-light text-sm tracking-tight leading-relaxed mb-10">{dialogMessage}</p>
              <DialogClose asChild>
                <Button className="w-full bg-black hover:bg-gray-800 text-white font-light h-16 rounded-xl shadow-none text-xs uppercase tracking-widest">
                  Continue
                </Button>
              </DialogClose>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {renderLandingFooter()}
    </div>
  );
};

export default BibleBookQuiz;
