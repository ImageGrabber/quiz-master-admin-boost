import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle, Trophy, Home, BookOpen, ChevronRight, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SocialShare from "@/components/SocialShare";
import SEO from "@/components/SEO";
import { VerseContextDialog } from "@/components/bible/VerseContextDialog";
import React from "react";

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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [scorePoints, setScorePoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isVerseContextOpen, setIsVerseContextOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(1);
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
    if (!hasSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && !hasSubmitted) {
      setHasSubmitted(true);
      const isCorrect = selectedAnswer === questions[currentQuestion].answer;
      
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (isCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak(Math.max(maxStreak, newStreak));
        setScorePoints(prev => prev + 100 + (newStreak >= 2 ? newStreak * 50 : 0));
      } else {
        setStreak(0);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    } else {
      handleQuizComplete();
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
      <div className="min-h-screen bg-stone-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,237,213,0.7),rgba(255,255,255,0))] text-[#1c1917] font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
        <SEO 
          title={`Results: ${title} | Bible Quiz Hub`} 
          description={`I scored ${score}% on the ${bookName} Bible quiz! Test your knowledge of the scripture with our interactive Bible Study Hub.`} 
        />
        
        {/* Modern, Slim Header Consistent with Hub */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-md">
          <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/bible-questions-and-answers-hub')}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/5 text-white transition-all group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Brain className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white sm:text-base uppercase tracking-widest leading-none drop-shadow-sm">BIBLE QA HUB</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-stone-400 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest">Home</Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className="overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-3xl">
            <div className="h-2 bg-gradient-to-r from-orange-600 to-amber-500 w-full" />
            <CardHeader className="text-center pt-10 pb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 text-xs font-black text-orange-400 mb-6 uppercase tracking-widest shadow-[inset_0_0_15px_rgba(249,115,22,0.1)]">
                <Trophy className="h-3 w-3" />
                <span>QUIZ COMPLETE</span>
              </div>
              <CardTitle className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 leading-none drop-shadow-md">Your Results</CardTitle>
              <CardDescription className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px]">{bookName} Knowledge Assessment</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-12 sm:px-12">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-orange-500 blur-[80px] opacity-20 rounded-full"></div>
                  <div className="text-[7rem] sm:text-[9rem] font-black relative z-10 leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 drop-shadow-xl pb-4">{score}<span className="text-5xl sm:text-7xl text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">%</span></div>
                </div>
                <p className="text-2xl font-black text-stone-300 mb-10 tracking-tight px-4">{getScoreMessage(score)}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                  <div className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8 rounded-[2rem] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] hover:border-amber-500/30 hover:-translate-y-1 group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl opacity-70 group-hover:bg-amber-500/40 transition-colors"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-4xl font-black text-white mb-2 drop-shadow-sm">{scorePoints.toLocaleString()}</div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full"><Trophy className="w-3.5 h-3.5" /> Total XP</div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8 rounded-[2rem] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] hover:border-orange-500/30 hover:-translate-y-1 group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl opacity-70 group-hover:bg-orange-500/40 transition-colors"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-4xl font-black text-white mb-2 drop-shadow-sm">{maxStreak}</div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full"><Flame className="w-3.5 h-3.5" /> Best Streak</div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8 rounded-[2rem] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(34,197,94,0.1)] hover:border-green-500/30 hover:-translate-y-1 group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/20 rounded-full blur-2xl opacity-70 group-hover:bg-green-500/40 transition-colors"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-4xl font-black text-white mb-2 drop-shadow-sm">{correctAnswers}</div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-green-400 uppercase tracking-[0.2em] bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full"><CheckCircle className="w-3.5 h-3.5" /> Correct</div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8 rounded-[2rem] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] hover:border-red-500/30 hover:-translate-y-1 group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl opacity-70 group-hover:bg-red-500/40 transition-colors"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-4xl font-black text-white mb-2 drop-shadow-sm">{questions.length - correctAnswers}</div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-red-400 uppercase tracking-[0.2em] bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full"><AlertTriangle className="w-3.5 h-3.5" /> Incorrect</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-white/10">
                  <Button
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="bg-white text-stone-900 border border-white hover:bg-stone-200 font-black h-14 px-10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
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
                              <button 
                                onClick={() => {
                                  setSelectedVerse(q.referenceVerse || "");
                                  // Try to parse chapter from referenceVerse if local chapter isn't set
                                  const chMatch = q.referenceVerse.match(/\s(\d+):/);
                                  setSelectedChapterId(chMatch ? parseInt(chMatch[1]) : parseInt(chapter || "1"));
                                  setIsVerseContextOpen(true);
                                }}
                                className="inline-flex items-center gap-2 rounded-xl bg-stone-50 px-4 py-2 text-[11px] font-black text-stone-500 hover:text-orange-600 hover:bg-orange-50 transition-all uppercase tracking-widest cursor-pointer border border-transparent hover:border-orange-100"
                              >
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>{q.referenceVerse}</span>
                              </button>
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
      <div className="min-h-screen bg-stone-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,237,213,0.7),rgba(255,255,255,0))] text-[#1c1917] font-sans">
        <header className="sticky top-0 z-50 w-full border-b border-stone-200/60 bg-white/80 backdrop-blur-md shadow-sm">
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
    <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,53,15,0.4),rgba(0,0,0,1))] text-[#fafaf9] font-sans selection:bg-orange-500/30 selection:text-orange-200 pb-20">
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
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-md mb-12">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/bible-questions-and-answers-hub')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/5 text-white transition-all group-hover:scale-105 group-hover:bg-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Brain className="h-4 w-4" />
            </div>
            <span className="text-sm font-black tracking-tight text-white sm:text-base uppercase tracking-widest leading-none drop-shadow-sm">BIBLE QA HUB</span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 shadow-inner">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] pt-0.5">SCORE</span>
              <span className="text-[11px] font-black tabular-nums tracking-widest text-white drop-shadow-md pb-[1px]">
                {scorePoints.toLocaleString()} <span className="text-orange-500">XP</span>
              </span>
            </div>
            
            {streak >= 2 && (
              <div className="hidden sm:flex animate-in slide-in-from-right fade-in zoom-in duration-500 items-center justify-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-orange-500/50">
                <span className="text-white text-[11px] font-black uppercase tracking-[0.2em] leading-none drop-shadow-md pb-[1px]">
                  🔥 Streak x{streak}
                </span>
              </div>
            )}
            <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 shadow-inner">
              <Clock className={`h-3.5 w-3.5 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-stone-400'}`} />
              <span className={`text-[11px] font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-400' : 'text-stone-300'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/bible-questions-and-answers-hub')} className="text-stone-400 hover:text-white hover:bg-white/10 font-black text-[10px] uppercase tracking-[0.2em] transition-all">Exit Quest</Button>
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

        <div className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] border border-white/10 self-start">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              </span>
              <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] pt-0.5 drop-shadow-sm">QUESTION {currentQuestion + 1} <span className="text-stone-500 mx-1">/</span> {questions.length}</span>
            </div>
            <div className="flex gap-2 items-center">
              {currentQ.referenceVerse && (
                <button 
                  onClick={() => {
                    setSelectedVerse(currentQ.referenceVerse || "");
                    const chMatch = currentQ.referenceVerse.match(/\s(\d+):/);
                    setSelectedChapterId(chMatch ? parseInt(chMatch[1]) : parseInt(chapter || "1"));
                    setIsVerseContextOpen(true);
                  }}
                  className="group flex items-center gap-1.5 text-[10px] font-black text-orange-400 bg-orange-500/10 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-full uppercase tracking-widest leading-none border border-orange-500/20 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-300"
                >
                  <BookOpen className="w-3 h-3 transition-transform group-hover:scale-110" />
                  <span className="pt-0.5">{currentQ.referenceVerse}</span>
                </button>
              )}
              <span className="text-[10px] font-black text-stone-400 bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-widest leading-none border border-white/10 shadow-sm pt-0.5">{bookName} {chapter ? `CH. ${chapter}` : 'SEC'}</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-[2.5rem] font-black text-white leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500 pb-2 drop-shadow-md">
            {currentQ.question}
          </h1>
        </div>

        <div className="grid gap-4 mb-8">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQ.answer;
            const showCorrect = hasSubmitted && isCorrectAnswer;
            const showWrong = hasSubmitted && isSelected && !isCorrectAnswer;

            let stateStyles = '';
            let textStyles = '';
            let letterBoxStyles = '';

            if (hasSubmitted) {
              if (showCorrect) {
                stateStyles = 'border-green-500/60 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.15)] scale-[1.01] sm:scale-[1.02] z-10';
                textStyles = 'text-green-50 drop-shadow-md';
                letterBoxStyles = 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] border-transparent';
              } else if (showWrong) {
                stateStyles = 'border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
                textStyles = 'text-red-400';
                letterBoxStyles = 'bg-red-500 text-white border-transparent';
              } else {
                stateStyles = 'border-white/5 bg-white/5 opacity-40 cursor-default';
                textStyles = 'text-stone-500';
                letterBoxStyles = 'bg-black/30 text-stone-600 border-white/5';
              }
            } else {
              stateStyles = isSelected 
                ? 'border-orange-500/60 bg-gradient-to-br from-orange-500/10 to-transparent shadow-[0_0_30px_rgba(249,115,22,0.15)] scale-[1.01] sm:scale-[1.02] z-10' 
                : 'border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-orange-500/40 hover:bg-orange-500/5 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] text-stone-300 hover:-translate-y-1 hover:text-white';
              textStyles = isSelected ? 'text-orange-50 drop-shadow-sm' : 'text-stone-300 group-hover:text-white group-hover:translate-x-1';
              letterBoxStyles = isSelected ? 'bg-orange-500 bg-opacity-20 text-orange-400 border border-orange-500/50 shadow-[inset_0_0_10px_rgba(249,115,22,0.3)]' : 'bg-black/40 text-stone-500 border border-white/10 group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/40';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasSubmitted}
                className={`
                  relative flex items-center w-full p-5 sm:p-6 text-left transition-all duration-500 rounded-3xl border group overflow-hidden
                  ${stateStyles}
                `}
              >
                {!hasSubmitted && !isSelected && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />}
                
                <div className={`
                  relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black mr-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] transition-all duration-300
                  ${letterBoxStyles}
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-base font-bold leading-snug pr-8 transition-all duration-300 ${textStyles}`}>{option}</span>
                
                {!hasSubmitted && isSelected && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-6 w-6 text-orange-400 animate-in zoom-in spin-in-12 duration-300" />
                  </div>
                )}
                {hasSubmitted && showCorrect && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-6 w-6 text-white animate-in zoom-in spin-in-12 duration-300" />
                  </div>
                )}
                {hasSubmitted && showWrong && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <AlertTriangle className="h-6 w-6 text-red-500 animate-in zoom-in spin-in-12 duration-300" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {hasSubmitted && (
          <div className="mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className={`p-6 sm:p-8 rounded-[2rem] border backdrop-blur-md ${selectedAnswer === currentQ.answer ? 'bg-[#0a2f1b]/60 border-[#115e2e]/50 shadow-[0_8px_30px_rgba(20,83,45,0.4)]' : 'bg-[#350a0a]/60 border-[#7f1d1d]/50 shadow-[0_8px_30px_rgba(127,29,29,0.4)]'}`}>
              <div className="flex items-center gap-3 mb-4">
                {selectedAnswer === currentQ.answer ? (
                  <>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full p-1.5 shadow-[0_0_15px_rgba(34,197,94,0.5)]"><CheckCircle className="w-5 h-5" /></div>
                    <span className="font-black text-green-300 text-xl tracking-tight drop-shadow-sm">Excellent!</span>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full p-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]"><AlertTriangle className="w-5 h-5" /></div>
                    <span className="font-black text-red-300 text-xl tracking-tight drop-shadow-sm">Not Quite</span>
                  </>
                )}
              </div>
              {currentQ.explanation && (
                <p className={`text-base font-medium ${selectedAnswer === currentQ.answer ? 'text-green-100' : 'text-red-100'} leading-relaxed pl-1`}>
                  {currentQ.explanation}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-6 pt-10 border-t border-white/5">

          {!hasSubmitted ? (
            <Button 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              size="lg"
              className={`
                h-16 px-10 sm:px-14 rounded-full font-black text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500 relative overflow-hidden group/btn w-full sm:w-auto
                ${selectedAnswer !== null 
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-500 hover:to-amber-500 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:scale-95' 
                  : 'bg-white/5 text-stone-600 cursor-not-allowed border border-white/5'
                }
              `}
            >
              {selectedAnswer !== null && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />}
              <span className="relative z-10 flex items-center justify-center gap-3 w-full drop-shadow-sm">
                Check Answer
              </span>
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              size="lg"
              className="h-16 px-10 sm:px-14 rounded-full font-black text-xs uppercase tracking-[0.2em] gap-3 transition-all duration-500 relative overflow-hidden group/btn bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95 w-full sm:w-auto mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                {currentQuestion === questions.length - 1 ? 'Complete Quest' : 'Continue'}
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
              </span>
            </Button>
          )}
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

      <VerseContextDialog 
        open={isVerseContextOpen}
        onOpenChange={setIsVerseContextOpen}
        book={bookName}
        chapterId={selectedChapterId}
        highlightVerse={selectedVerse}
      />
    </div>
  );
};

export default PublicQuiz;
