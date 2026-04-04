import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle, Trophy, Home, BookOpen, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SocialShare from "@/components/SocialShare";
import SEO from "@/components/SEO";

interface Question {
  id: number | string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
  referenceVerse?: string;
}

interface PublicQuizProps {
  title: string;
  questions: Question[];
  bookName: string;
  chapter?: string;
  seoDescription?: string;
  prevChapterUrl?: string;
  nextChapterUrl?: string;
  canonicalPath?: string;
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizePath = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const PublicQuiz = ({ title, questions, bookName, chapter, seoDescription, prevChapterUrl, nextChapterUrl, canonicalPath }: PublicQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const fallbackPath = `/public-quiz/${toSlug(bookName)}${chapter ? `/chapter-${chapter}` : ""}`;
  const resolvedPath = normalizePath(
    canonicalPath || (typeof window !== "undefined" ? window.location.pathname : fallbackPath)
  );
  const canonicalUrl = `https://biblequizcompetition.com${resolvedPath}`;

  // Timer effect with enhanced warnings
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

      // Show time warnings
      if (timeLeft === 180) { // 3 minutes left
        setDialogTitle("⚠️ Time Warning");
        setDialogMessage("You have 3 minutes remaining!");
        setDialogOpen(true);
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 60) { // 1 minute left
        setDialogTitle("🚨 Final Warning");
        setDialogMessage("Only 1 minute remaining! Hurry up!");
        setDialogOpen(true);
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 30) { // 30 seconds left
        setDialogTitle("⏰ Almost Time's Up!");
        setDialogMessage("Only 30 seconds left!");
        setDialogOpen(true);
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

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      } else {
        handleQuizComplete();
      }
    }
  };

  const handleQuizComplete = () => {
    setIsCompleted(true);
    setIsLoading(false);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're a Bible expert!";
    if (score >= 80) return "Great job! You know your Bible well!";
    if (score >= 70) return "Good work! Keep studying!";
    if (score >= 60) return "Not bad! Room for improvement!";
    return "Keep studying the Bible!";
  };

  if (isCompleted) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].answer).length;

    return (
      <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
        <SEO 
          title={`Results: ${title} | Bible Quiz Hub`} 
          description={`I scored ${score}% on the ${bookName} Bible quiz! Test your knowledge of the scripture with our interactive Bible Study Hub.`} 
        />
        
        {/* Modern, Slim Header Consistent with Hub */}
        <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/bible-questions-and-answers-hub')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white transition-transform group-hover:scale-110">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold tracking-tight text-stone-900 sm:text-base uppercase tracking-widest leading-none">BIBLE QA HUB</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-stone-500 font-bold text-xs uppercase tracking-widest">Home</Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="overflow-hidden border border-stone-200 shadow-2xl bg-white rounded-3xl">
            <div className="h-2 bg-stone-900 w-full" />
            <CardHeader className="text-center pt-10 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-900 mb-6 uppercase tracking-widest">
                <Trophy className="h-3 w-3" />
                <span>QUIZ COMPLETE</span>
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 mb-2 leading-none">Your Results</CardTitle>
              <CardDescription className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">{bookName} Knowledge Assessment</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-12 sm:px-12">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-6">
                  <div className="text-8xl font-black text-stone-900 relative z-10 leading-none">{score}%</div>
                  <div className="absolute -bottom-2 left-0 right-0 h-4 bg-orange-100 -z-0 opacity-50" />
                </div>
                <p className="text-xl font-bold text-stone-900 mb-10 tracking-tight">{getScoreMessage(score)}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  <div className="border border-stone-100 bg-stone-50/50 p-8 rounded-3xl transition-all hover:bg-stone-50">
                    <div className="text-4xl font-black text-stone-900">{correctAnswers}</div>
                    <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mt-2">Correct</div>
                  </div>
                  <div className="border border-stone-100 bg-stone-50/50 p-8 rounded-3xl transition-all hover:bg-stone-50">
                    <div className="text-4xl font-black text-stone-900">{questions.length - correctAnswers}</div>
                    <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mt-2">Incorrect</div>
                  </div>
                  <div className="border border-stone-100 bg-stone-50/50 p-8 rounded-3xl transition-all hover:bg-stone-50">
                    <div className="text-4xl font-black text-stone-900">{formatTime(600 - timeLeft)}</div>
                    <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mt-2">Time Spent</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-stone-100">
                  <Button
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-black h-14 px-10 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/bible-questions-and-answers-hub')}
                    className="border-stone-200 font-black h-14 px-10 rounded-2xl hover:bg-stone-50 text-xs uppercase tracking-widest text-stone-600"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Back to Hub
                  </Button>
                </div>
              </div>

              {/* Review Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1.5 bg-stone-900 rounded-full" />
                  <h3 className="text-xl font-black tracking-tight text-stone-900 uppercase tracking-widest text-sm">Question Review</h3>
                </div>
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div key={q.id} className="overflow-hidden rounded-3xl border border-stone-100 bg-white group transition-all hover:border-stone-300 hover:shadow-lg">
                      <div className={`h-2 w-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">QUESTION {index + 1}</span>
                          {isCorrect ? (
                            <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                              <CheckCircle className="w-3.5 h-3.5" /> Correct
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                              <AlertTriangle className="w-3.5 h-3.5" /> Incorrect
                            </div>
                          )}
                        </div>
                        <h4 className="text-xl font-black text-stone-900 mb-6 leading-tight tracking-tight">{q.question}</h4>
                        
                        {(q.referenceVerse || q.explanation) && (
                          <div className="mb-8 space-y-3">
                            {q.referenceVerse && (
                              <div className="inline-flex items-center gap-2 rounded-xl bg-stone-50 px-4 py-2 text-[11px] font-black text-stone-500 uppercase tracking-widest">
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>{q.referenceVerse}</span>
                              </div>
                            )}
                            {q.explanation && (
                              <p className="text-sm text-stone-500 font-medium leading-relaxed pl-6 border-l-4 border-stone-100 italic">
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        )}
                        
                        <div className="grid gap-3 sm:grid-cols-2">
                          {q.options.map((option, optionIndex) => {
                            const isCorrectOption = optionIndex === q.answer;
                            const isUserSelection = optionIndex === userAnswer;
                            
                            let optionClass = "bg-stone-50/50 text-stone-400 border-stone-100/50";
                            if (isCorrectOption) optionClass = "bg-green-50 text-green-700 border-green-200 shadow-sm";
                            if (isUserSelection && !isCorrect) optionClass = "bg-red-50 text-red-700 border-red-200 shadow-sm";

                            return (
                              <div
                                key={optionIndex}
                                className={`p-4 rounded-2xl border text-xs font-bold leading-snug flex items-center justify-between group/option transition-all ${optionClass}`}
                              >
                                <span className="flex gap-3">
                                  <span className="opacity-40">{String.fromCharCode(65 + optionIndex)}</span>
                                  <span>{option}</span>
                                </span>
                                {isCorrectOption && <CheckCircle className="w-4 h-4 shrink-0" />}
                                {isUserSelection && !isCorrect && <AlertTriangle className="w-4 h-4 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Share Section */}
              <div className="mt-20 pt-12 border-t border-stone-100">
                <div className="text-center">
                  <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em] mb-8">Spread the word</h4>
                  <SocialShare
                    url={canonicalUrl}
                    title={`I scored ${score}% on the ${bookName} Bible Quiz!`}
                    description={`I just took the ${bookName} Bible quiz and scored ${score}%! Test your knowledge too with this free interactive Bible quiz.`}
                    variant="inline"
                    showTitle={false}
                    showDescription={false}
                    showUrl={false}
                    platforms={["facebook", "twitter", "linkedin", "whatsapp", "email"]}
                    className="justify-center gap-6"
                  />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans">
        <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/bible-questions-and-answers-hub')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white transition-transform group-hover:scale-110">
                <Brain className="h-5 w-5" />
              </div>
              <span className="text-sm font-black tracking-tight text-stone-900 sm:text-base uppercase tracking-widest">BIBLE QA HUB</span>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="w-12 h-12 text-stone-300" />
            </div>
            <h2 className="text-3xl font-black text-stone-900 mb-4 tracking-tight leading-none uppercase">Empty Scrolls</h2>
            <p className="text-stone-500 mb-10 font-bold text-sm tracking-tight leading-relaxed">The knowledge for this quest is still being gathered. Please return later or explore other sacred texts in our hub.</p>
            <Button onClick={() => navigate('/bible-questions-and-answers-hub')} className="bg-stone-900 hover:bg-stone-800 text-white font-black h-14 px-10 rounded-2xl shadow-xl text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Hub
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": title,
      "description": `Test your knowledge of ${bookName} with this interactive Bible quiz. ${questions.length} questions to challenge your understanding.`,
      "numberOfQuestions": questions.length,
      "timeRequired": "PT10M",
      "educationalLevel": "Beginner to Advanced",
      "learningResourceType": "Quiz",
      "about": {
        "@type": "Thing",
        "name": bookName
      },
      "provider": {
        "@type": "Organization",
        "name": "Bible Quiz Competition",
        "url": "https://biblequizcompetition.com"
      },
      "mainEntityOfPage": canonicalUrl
    };
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
      <Helmet>
        <title>{title} - Free Bible Quiz | Bible Quiz Competition</title>
        <meta name="description" content={seoDescription || `Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding of the Bible. No registration required!`} />
        <meta name="keywords" content={`${bookName} quiz, Bible quiz, ${bookName} questions, Bible study, Christian quiz, free Bible quiz, ${bookName} test, Bible knowledge`} />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>
      
      <SEO 
        title={`${title} | Interactive Bible Quiz`} 
        description={`Test your knowledge of ${bookName} Chapter ${chapter || ''} with our interactive Bible quiz. ${questions.length} questions of in-depth study.`} 
      />
      
      {/* Slim Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md mb-12">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/bible-questions-and-answers-hub')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white transition-transform group-hover:scale-110">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-sm font-black tracking-tight text-stone-900 sm:text-base uppercase tracking-widest leading-none">BIBLE QA HUB</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full border border-stone-200">
              <Clock className={`h-3.5 w-3.5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`} />
              <span className={`text-[11px] font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-stone-600'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/bible-questions-and-answers-hub')} className="text-stone-400 hover:text-stone-900 font-black text-[10px] uppercase tracking-[0.2em] transition-colors">Exit Quest</Button>
          </div>
        </div>
        
        {/* Progress bar on bottom of header */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-100/50">
          <div 
            className="h-full bg-orange-600 transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(234,88,12,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-2xl px-6">
        {/* Mobile Timer */}
        <div className="sm:hidden flex justify-center mb-8">
          <div className="flex items-center gap-2 px-5 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
            <Clock className={`h-4 w-4 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`} />
            <span className={`text-sm font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-stone-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em]">QUESTION {currentQuestion + 1} / {questions.length}</span>
            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest leading-none border border-orange-100">{bookName} {chapter ? `CH. ${chapter}` : 'SEC'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 leading-tight tracking-tight">
            {currentQ.question}
          </h1>
        </div>

        <div className="grid gap-4 mb-12">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`
                  relative flex items-center w-full p-6 text-left transition-all duration-300 rounded-[2rem] border-2 group
                  ${isSelected 
                    ? 'border-stone-900 bg-stone-900 text-white shadow-2xl scale-[1.02] z-10' 
                    : 'border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50/50 text-stone-700 hover:scale-[1.01]'
                  }
                `}
              >
                <div className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black mr-5 transition-colors
                  ${isSelected ? 'bg-white/10 text-white' : 'bg-stone-50 text-stone-300 group-hover:bg-stone-100 group-hover:text-stone-400'}
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-base font-bold leading-snug pr-8 transition-all">{option}</span>
                {isSelected && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-5 w-5 text-orange-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-6 pt-10 border-t border-stone-100">
          <div className="hidden sm:block text-[10px] font-black text-stone-300 uppercase tracking-[0.3em] italic">
            Quest in progress
          </div>
          <Button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
            size="lg"
            className={`
              h-16 px-12 rounded-2xl font-black text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500
              ${selectedAnswer !== null 
                ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-[0_20px_50px_rgba(28,25,23,0.2)] hover:scale-105 active:scale-95' 
                : 'bg-stone-50 text-stone-200 cursor-not-allowed border border-stone-100'
              }
            `}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quest' : 'Advance'}
            <ChevronRight className={`h-4 w-4 transition-transform ${selectedAnswer !== null ? 'group-hover:translate-x-1' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Time Warning Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <Card className="max-w-md w-full shadow-2xl border-stone-200 overflow-hidden rounded-[2.5rem] bg-white animate-in zoom-in-95 duration-200">
            <div className="h-2 bg-orange-600 w-full" />
            <CardHeader className="text-center pt-10 pb-4">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl font-black text-stone-900 uppercase tracking-tight leading-none">{dialogTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-10 pb-12">
              <p className="text-stone-500 font-bold text-sm tracking-tight leading-relaxed mb-10">{dialogMessage}</p>
              <Button onClick={() => setDialogOpen(false)} className="w-full bg-stone-900 hover:bg-stone-800 text-white font-black h-16 rounded-2xl shadow-xl text-xs uppercase tracking-[0.2em]">
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PublicQuiz;
