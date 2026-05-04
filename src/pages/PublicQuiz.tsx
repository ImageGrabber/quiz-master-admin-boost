import { useState, useEffect, useMemo } from "react";
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
import { normalizeQuizQuestions } from "@/lib/quizQuestionNormalizer";

interface Question {
  id?: number | string;
  question: string;
  options: string[];
  answer?: number;
  explanation?: string;
  referenceVerse?: string;
  chapter?: number | string;
  image?: string;
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
  isKidsStory?: boolean;
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizePath = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const PublicQuiz = ({ 
  title, 
  questions, 
  bookName, 
  chapter, 
  seoDescription, 
  prevChapterUrl, 
  nextChapterUrl, 
  canonicalPath,
  isKidsStory = false
}: PublicQuizProps) => {
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
  const normalizedQuestions = useMemo(
    () => normalizeQuizQuestions(questions, { bookName, chapter }),
    [questions, bookName, chapter]
  );
  const fallbackPath = `/bible-questions-and-answers-hub/${toSlug(bookName)}${chapter ? `/chapter-${chapter}` : ""}`;
  const resolvedPath = normalizePath(
    canonicalPath || (typeof window !== "undefined" ? window.location.pathname : fallbackPath)
  );
  const canonicalUrl = `https://biblequizcompetition.com${resolvedPath}`;
  const chapterLabel = chapter ? `Chapter ${chapter}` : "Overview";
  const primaryHubPath = `/bible-questions-and-answers-hub/${toSlug(bookName)}`;
  const chapterPath = chapter ? `/public-quiz/${toSlug(bookName)}/chapter-${chapter}` : `/public-quiz/${toSlug(bookName)}`;
  const chapterFaq = [
    {
      q: `How do I prepare for the ${bookName} ${chapterLabel} quiz?`,
      a: `Read the chapter once for flow, then review names, locations, and key events. Retake this quiz to improve recall speed and confidence.`,
    },
    {
      q: `Is this ${bookName} quiz beginner friendly?`,
      a: "Yes. Questions are designed for both beginners and regular Bible study groups, with explanations to help reinforce learning.",
    },
    {
      q: `Can I use this quiz for church or youth fellowship practice?`,
      a: "Absolutely. Many teams use chapter quizzes for weekly practice, small group warmups, and Bible competition preparation.",
    },
  ];

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
      const isCorrect = selectedAnswer === normalizedQuestions[currentQuestion].answer;
      
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
    if (currentQuestion < normalizedQuestions.length - 1) {
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
      if (answer === normalizedQuestions[index].answer) {
        correct++;
      }
    });
    return Math.round((correct / normalizedQuestions.length) * 100);
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
    const correctAnswers = answers.filter((answer, index) => answer === normalizedQuestions[index].answer).length;

    return (
      <div className={`min-h-screen ${isKidsStory ? 'bg-[#FFFBEB] font-urbanist' : 'bg-slate-50 font-urbanist text-slate-900'} selection:bg-blue-100 selection:text-blue-900 pb-20`}>
        <SEO 
          title={`Results: ${title} | Bible Quiz Hub`} 
          description={`I scored ${score}% on the ${bookName} Bible quiz! Test your knowledge of the scripture with our interactive Bible Study Hub.`} 
        />
        
        {/* Modern, Slim Header Consistent with Hub */}
        <header className={`sticky top-0 z-50 w-full border-b ${isKidsStory ? 'border-[#1a1a1a] bg-[#FCD34D]' : 'border-white/60 bg-white/60 backdrop-blur-3xl'} shadow-sm`}>
          <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate(isKidsStory ? '/kids-stories' : '/bible-questions-and-answers-hub')}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a]' : 'bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent shadow-[0_4px_15px_rgba(59,130,246,0.3)]'} text-white transition-all group-hover:scale-105`}>
                <Brain className={`h-4 w-4 ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'}`} />
              </div>
              <span className={`text-sm font-bold tracking-tight ${isKidsStory ? 'text-[#1a1a1a]' : 'text-slate-900'} sm:text-base uppercase tracking-widest leading-none`}>
                {isKidsStory ? 'KIDS BIBLE STORIES' : 'BIBLE QA HUB'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')} 
              className={`${isKidsStory ? 'text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white border-2 border-[#1a1a1a]' : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50 border-transparent'} font-bold text-xs uppercase tracking-widest rounded-full px-4`}
            >
              Home
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Card className={`overflow-hidden ${isKidsStory ? 'border-[6px] border-[#1a1a1a] shadow-[12px_12px_0_0_#1a1a1a] rounded-[3rem] bg-white' : 'border border-white/10 shadow-2xl bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-3xl'}`}>
            {!isKidsStory && <div className="h-2 bg-gradient-to-r from-orange-600 to-amber-500 w-full" />}
            <CardHeader className="text-center pt-10 pb-6">
              <div className={`inline-flex items-center gap-2 rounded-full ${isKidsStory ? 'bg-[#7ED957] text-[#1a1a1a] border-2 border-[#1a1a1a]' : 'bg-orange-500/10 border border-orange-500/30 text-orange-400'} px-4 py-2 text-xs font-black mb-6 uppercase tracking-widest shadow-sm`}>
                <Trophy className="h-3 w-3" />
                <span>QUIZ COMPLETE</span>
              </div>
              <CardTitle className={`text-4xl sm:text-6xl font-black tracking-tight ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} mb-2 leading-none drop-shadow-md`}>Your Results</CardTitle>
              <CardDescription className={`${isKidsStory ? 'text-[#1a1a1a]/60' : 'text-stone-400'} font-bold uppercase tracking-[0.2em] text-[10px]`}>{bookName} Knowledge Assessment</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-12 sm:px-12 text-center">
              <div className="mb-12">
                <div className="relative inline-block mb-8">
                  <div className={`absolute inset-0 ${isKidsStory ? 'bg-[#FFDE59]' : 'bg-orange-500'} blur-[80px] opacity-20 rounded-full`}></div>
                  <div className={`text-[7rem] sm:text-[9rem] font-black relative z-10 leading-none tracking-tighter ${isKidsStory ? 'text-[#1a1a1a]' : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500'} drop-shadow-xl pb-4`}>
                    {score}<span className={`text-5xl sm:text-7xl ${isKidsStory ? 'text-[#EF4444]' : 'text-orange-500'} drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]`}>%</span>
                  </div>
                </div>
                <p className={`text-2xl sm:text-3xl font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-300'} mb-10 tracking-tight px-4`}>{isKidsStory && score >= 80 ? "Super Star! 🌟 Outstanding!" : getScoreMessage(score)}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                  <div className={`relative overflow-hidden ${isKidsStory ? 'border-4 border-[#1a1a1a] bg-[#FFDE59]' : 'border border-white/10 bg-white/5'} p-8 rounded-[2rem] transition-all duration-300 group`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`text-4xl font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} mb-2`}>{scorePoints.toLocaleString()}</div>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a] bg-white border-2 border-[#1a1a1a]' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'} px-3 py-1 rounded-full uppercase tracking-widest`}><Trophy className="w-3.5 h-3.5" /> Total XP</div>
                    </div>
                  </div>
                  <div className={`relative overflow-hidden ${isKidsStory ? 'border-4 border-[#1a1a1a] bg-[#FF914D]' : 'border border-white/10 bg-white/5'} p-8 rounded-[2rem] transition-all duration-300 group`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`text-4xl font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} mb-2`}>{maxStreak}</div>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a] bg-white border-2 border-[#1a1a1a]' : 'text-orange-400 bg-orange-500/10 border border-orange-500/20'} px-3 py-1 rounded-full uppercase tracking-widest`}><Flame className="w-3.5 h-3.5" /> Best Streak</div>
                    </div>
                  </div>
                  <div className={`relative overflow-hidden ${isKidsStory ? 'border-4 border-[#1a1a1a] bg-[#7ED957]' : 'border border-white/10 bg-white/5'} p-8 rounded-[2rem] transition-all duration-300 group`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`text-4xl font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} mb-2`}>{correctAnswers}</div>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a] bg-white border-2 border-[#1a1a1a]' : 'text-green-400 bg-green-500/10 border border-green-500/20'} px-3 py-1 rounded-full uppercase tracking-widest`}><CheckCircle className="w-3.5 h-3.5" /> Correct</div>
                    </div>
                  </div>
                  <div className={`relative overflow-hidden ${isKidsStory ? 'border-4 border-[#1a1a1a] bg-[#FF66C4]' : 'border border-white/10 bg-white/5'} p-8 rounded-[2rem] transition-all duration-300 group`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`text-4xl font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} mb-2`}>{normalizedQuestions.length - correctAnswers}</div>
                      <div className={`inline-flex items-center gap-1.5 text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a] bg-white border-2 border-[#1a1a1a]' : 'text-red-400 bg-red-500/10 border border-red-500/20'} px-3 py-1 rounded-full uppercase tracking-widest`}><AlertTriangle className="w-3.5 h-3.5" /> Incorrect</div>
                    </div>
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t ${isKidsStory ? 'border-[#1a1a1a]' : 'border-white/10'}`}>
                  <Button
                    size="lg"
                    onClick={() => window.location.reload()}
                    className={`h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                      isKidsStory 
                        ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white border-4 border-[#1a1a1a] shadow-[0_6px_0_0_#1a1a1a] hover:shadow-[0_2px_0_0_#1a1a1a] active:shadow-none translate-y-[-4px] active:translate-y-[2px]' 
                        : 'bg-white text-stone-900 border border-white hover:bg-stone-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    }`}
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate(isKidsStory ? '/kids-stories' : '/bible-questions-and-answers-hub')}
                    className={`h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                      isKidsStory 
                        ? 'bg-white hover:bg-[#F3F4F6] text-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[0_6px_0_0_#1a1a1a] hover:shadow-[0_2px_0_0_#1a1a1a] active:shadow-none translate-y-[-4px] active:translate-y-[2px]' 
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isKidsStory ? 'More Stories' : 'Back to Hub'}
                  </Button>
                </div>
              </div>

              {/* Review Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-8 w-2 rounded-full ${isKidsStory ? 'bg-[#3B82F6]' : 'bg-white/20'}`} />
                  <h3 className={`text-xl font-black tracking-tight ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'} uppercase tracking-widest text-sm drop-shadow-sm`}>Question Review</h3>
                </div>
                {normalizedQuestions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div key={q.id} className={`overflow-hidden rounded-[2.5rem] border ${isKidsStory ? 'border-4 border-[#1a1a1a] bg-white shadow-[8px_8px_0_0_#1a1a1a]' : 'border-white/10 bg-[#0a0a0a]/50 backdrop-blur-sm'} group transition-all`}>
                      <div className={`h-4 w-full ${isCorrect ? 'bg-[#7ED957]' : 'bg-[#EF4444]'} ${!isKidsStory && 'shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} />
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6 text-left">
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-500'}`}>QUESTION {index + 1}</span>
                          {isCorrect ? (
                            <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isKidsStory ? 'bg-[#7ED957]/20 text-[#1a1a1a] border-2 border-[#1a1a1a]' : 'text-green-400 bg-green-500/10 border border-green-500/20'}`}>
                              <CheckCircle className="w-3.5 h-3.5" /> Correct
                            </div>
                          ) : (
                            <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isKidsStory ? 'bg-[#EF4444]/20 text-[#1a1a1a] border-2 border-[#1a1a1a]' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                              <AlertTriangle className="w-3.5 h-3.5" /> Incorrect
                            </div>
                          )}
                        </div>
                        <h4 className={`text-xl font-black mb-6 leading-tight tracking-tight text-left ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'}`}>{q.question}</h4>
                        
                        {(q.referenceVerse || q.explanation) && (
                          <div className="mb-8 space-y-3 text-left">
                            {q.referenceVerse && (
                              <button 
                                onClick={() => {
                                  setSelectedVerse(q.referenceVerse || "");
                                  const chMatch = q.referenceVerse.match(/\s(\d+):/);
                                  setSelectedChapterId(chMatch ? parseInt(chMatch[1]) : parseInt(chapter || "1"));
                                  setIsVerseContextOpen(true);
                                }}
                                className={`inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2 text-[11px] font-black transition-all uppercase tracking-widest cursor-pointer ${
                                  isKidsStory 
                                    ? 'bg-[#F3F4F6] border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#3B82F6] hover:text-white' 
                                    : 'bg-white/40 border-transparent text-stone-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200'
                                }`}
                              >
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>{q.referenceVerse}</span>
                              </button>
                            )}
                            {q.explanation && (
                              <p className={`text-sm font-medium leading-relaxed pl-6 border-l-4 italic ${isKidsStory ? 'text-[#1a1a1a]/70 border-[#1a1a1a]/20' : 'text-stone-400 border-white/10'}`}>
                                {q.explanation}
                              </p>
                            )}
                          </div>
                        )}
                        
                        <div className="grid gap-3 sm:grid-cols-2">
                          {q.options.map((option, optionIndex) => {
                            const isCorrectOption = optionIndex === q.answer;
                            const isUserSelection = optionIndex === userAnswer;
                            
                            let optionClass = isKidsStory 
                              ? "bg-gray-50 text-[#1a1a1a]/40 border-[#1a1a1a]/10 border-2" 
                              : "bg-white/5 text-stone-500 border-white/5 border";
                            
                            if (isCorrectOption) {
                              optionClass = isKidsStory 
                                ? "bg-[#7ED957]/20 text-[#1a1a1a] border-[#1a1a1a] border-4" 
                                : "bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)] border";
                            }
                            if (isUserSelection && !isCorrect) {
                              optionClass = isKidsStory 
                                ? "bg-[#EF4444]/20 text-[#1a1a1a] border-[#1a1a1a] border-4 opacity-70" 
                                : "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)] border";
                            }

                            return (
                              <div
                                key={optionIndex}
                                className={`p-4 rounded-2xl text-xs font-bold leading-snug flex items-center justify-between group/option transition-all ${optionClass} text-left`}
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
              <div className={`mt-20 pt-12 border-t ${isKidsStory ? 'border-[#1a1a1a]/10' : 'border-white/10'}`}>
                <div className="text-center">
                  <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-8 ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-300'}`}>Spread the word</h4>
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

  if (normalizedQuestions.length === 0) {
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

  const currentQ = normalizedQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / normalizedQuestions.length) * 100;

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": title,
      "description": seoDescription || `Test your knowledge of ${bookName} with this interactive Bible quiz. ${normalizedQuestions.length} questions to challenge your understanding.`,
      "numberOfQuestions": normalizedQuestions.length,
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
      "mainEntityOfPage": canonicalUrl,
      "hasPart": normalizedQuestions.map((q, idx) => ({
        "@type": "Question",
        "name": `Question ${idx + 1}`,
        "text": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.options[q.answer || 0]
        }
      }))
    };
  };

  return (
    <div className={`min-h-screen ${isKidsStory ? 'bg-[#FFFBEB] font-urbanist' : 'bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-sky-50 to-rose-50 font-sans'} text-slate-800 selection:bg-rose-200 selection:text-rose-900 pb-20`}>
      <SEO 
        title={`${title} - Free Bible Quiz | Bible Quiz Competition`}
        description={seoDescription || `Take the free ${bookName} Bible quiz. Includes ${normalizedQuestions.length} questions, answers, and scripture references for deep study.`}
        keywords={`${bookName} quiz, Bible quiz, ${bookName} questions, Bible study, Christian quiz, free Bible quiz, ${bookName} test, Bible knowledge`}
        author="Bible Quiz Competition"
        robots="index, follow"
        url={resolvedPath}
        structuredData={generateStructuredData()}
      />
      
      {/* Slim Header */}
      <header className={`sticky top-0 z-50 w-full border-b ${isKidsStory ? 'border-[#1a1a1a] bg-[#FCD34D]' : 'border-white/40 bg-white/40 backdrop-blur-3xl shadow-[0_2px_20px_rgba(0,0,0,0.03)]'} mb-12`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(isKidsStory ? '/kids-stories' : '/bible-questions-and-answers-hub')}>
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a]' : 'bg-gradient-to-br from-orange-400 to-rose-500 shadow-[0_4px_20px_rgba(244,63,94,0.3)]'} text-white transition-all group-hover:scale-110`}>
              <Brain className={`h-5 w-5 ${isKidsStory ? 'text-[#1a1a1a]' : 'text-white'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-black ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-400'} uppercase tracking-[0.3em] leading-none mb-0.5`}>{isKidsStory ? 'KIDS MODE' : 'SAINTS QUIZ'}</span>
              <span className={`text-sm font-black tracking-tight ${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-900'} uppercase tracking-widest leading-none drop-shadow-sm`}>{isKidsStory ? 'BIBLE STORIES' : 'BIBLE QA HUB'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className={`hidden md:flex items-center gap-4 px-6 py-2 ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a]' : 'bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.03)]'} rounded-2xl`}>
              <div className={`flex flex-col items-center border-r ${isKidsStory ? 'border-[#1a1a1a]/10 pr-4' : 'border-stone-200/50 pr-4'}`}>
                <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-400'} uppercase tracking-[0.2em] mb-0.5`}>SCORE</span>
                <span className={`text-xs font-black tabular-nums tracking-widest ${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-800'}`}>
                  {scorePoints.toLocaleString()} <span className={isKidsStory ? 'text-[#F59E0B]' : 'text-orange-500'}>XP</span>
                </span>
              </div>
              
              {streak >= 2 && (
                <div className={`flex flex-col items-center border-r ${isKidsStory ? 'border-[#1a1a1a]/10 pr-4' : 'border-stone-200/50 pr-4'} animate-in slide-in-from-top-2 duration-500`}>
                  <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-orange-400'} uppercase tracking-[0.2em] mb-0.5`}>STREAK</span>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-orange-500 fill-orange-500 animate-pulse" />
                    <span className={`text-xs font-black tabular-nums tracking-widest ${isKidsStory ? 'text-[#1a1a1a]' : 'text-orange-600'}`}>
                      x{streak}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-400'} uppercase tracking-[0.2em] mb-0.5`}>TIME</span>
                <div className="flex items-center gap-1.5">
                  <Clock className={`h-3 w-3 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`} />
                  <span className={`text-xs font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-500' : isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-700'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(isKidsStory ? '/kids-stories' : '/bible-questions-and-answers-hub')} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] ${isKidsStory ? 'text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white border-2 border-[#1a1a1a]' : 'text-stone-400 hover:text-rose-500 hover:bg-rose-50/50'} transition-all rounded-xl`}
            >
              Exit
            </Button>
          </div>
        </div>
        
        {/* Sleek Progress bar */}
        <div className={`absolute bottom-[-1px] left-0 w-full h-[4px] ${isKidsStory ? 'bg-[#1a1a1a]/5' : 'bg-stone-100/30'}`}>
          <div 
            className={`h-full ${isKidsStory ? 'bg-[#3B82F6]' : 'bg-gradient-to-r from-orange-500 via-rose-500 to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)]'} transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>


      <div className="container mx-auto px-4 lg:max-w-6xl pb-12">
        {/* Mobile Timer */}
        <div className="sm:hidden flex justify-center mb-8">
          <div className="flex items-center gap-2 px-5 py-2 bg-white border border-stone-200 rounded-full shadow-sm">
            <Clock className={`h-4 w-4 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`} />
            <span className={`text-sm font-black tabular-nums tracking-widest ${timeLeft < 60 ? 'text-red-600' : 'text-stone-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-4 items-start">
          
          {/* ==================== LEFT SIDE: QUESTION & OPTIONS ==================== */}
          <div className="flex-1 w-full space-y-10">
            <div className="relative p-1">
              {/* Question Ambient Glow */}
              <div className="absolute -left-12 -top-12 w-64 h-64 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-200/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-wrap items-center gap-4">
                  <div className={`glass-panel inline-flex items-center gap-2.5 ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]' : 'bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.03)]'} px-4 py-2 rounded-2xl`}>
                    <div className={`flex h-2 w-2 rounded-full ${isKidsStory ? 'bg-[#3B82F6]' : 'bg-rose-500'} relative`}>
                      <div className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isKidsStory ? 'bg-[#60A5FA]' : 'bg-rose-400'} opacity-75`}></div>
                    </div>
                    <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-500'} uppercase tracking-[0.25em]`}>QUESTION {currentQuestion + 1} OF {normalizedQuestions.length}</span>
                  </div>
                  <div className={`glass-panel ${isKidsStory ? 'bg-[#FFDE59] border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]' : 'bg-white/40 backdrop-blur-md border border-white/80 shadow-sm'} px-4 py-2 rounded-2xl`}>
                    <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-blue-600'} uppercase tracking-[0.25em]`}>
                      {isKidsStory ? (chapter || title).toUpperCase() : bookName.toUpperCase()} {chapter && !isKidsStory ? `CH. ${chapter}` : ''}
                    </span>
                  </div>
                </div>
                
                {currentQ.image && (
                  <div className="mb-8 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl max-w-xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500 bg-white">
                    <img 
                      src={currentQ.image} 
                      alt="Question illustration" 
                      className="w-full h-auto object-cover aspect-video sm:aspect-[16/9]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <h1 className="text-3xl sm:text-[2.75rem] font-black text-slate-900 leading-[1.12] tracking-tight drop-shadow-sm max-w-2xl">
                  {currentQ.question}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.answer;
                const showCorrect = hasSubmitted && isCorrectAnswer;
                const showWrong = hasSubmitted && isSelected && !isCorrectAnswer;

                let stateStyles = '';
                let letterBoxStyles = '';

                if (hasSubmitted) {
                  if (showCorrect) {
                    stateStyles = isKidsStory 
                      ? 'border-[#1a1a1a] bg-[#7ED957] shadow-[8px_8px_0_0_#1a1a1a] z-10 scale-[1.02]'
                      : 'border-emerald-200 bg-emerald-50/70 shadow-lg scale-[1.02] z-10 transition-all rotate-[0.5deg]';
                    letterBoxStyles = isKidsStory 
                      ? 'bg-white text-[#1a1a1a] border-[#1a1a1a]'
                      : 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] border-transparent';
                  } else if (showWrong) {
                    stateStyles = isKidsStory 
                      ? 'border-[#1a1a1a] bg-[#EF4444] shadow-[8px_8px_0_0_#1a1a1a] opacity-70'
                      : 'border-rose-200 bg-rose-50/70 shadow-[0_8px_20px_rgba(244,63,94,0.1)] opacity-70';
                    letterBoxStyles = isKidsStory 
                      ? 'bg-white text-[#1a1a1a] border-[#1a1a1a]'
                      : 'bg-rose-500 text-white border-transparent';
                  } else {
                    stateStyles = isKidsStory 
                      ? 'border-[#1a1a1a]/10 bg-[#F3F4F6] opacity-40 grayscale-[0.8]'
                      : 'border-stone-100 bg-stone-50/30 opacity-40 grayscale-[0.5]';
                    letterBoxStyles = isKidsStory 
                      ? 'bg-white text-[#1a1a1a]/20 border-[#1a1a1a]/10'
                      : 'bg-stone-100 text-stone-300 border-stone-200';
                  }
                } else {
                  stateStyles = isSelected 
                    ? (isKidsStory 
                        ? 'border-[#1a1a1a] bg-[#FFDE59] shadow-[8px_8px_0_0_#1a1a1a] scale-[1.03] z-20 translate-y-[-4px]' 
                        : 'border-blue-200 bg-blue-50/80 shadow-xl scale-[1.03] z-20 border-blue-400 rotate-[-0.5deg]')
                    : (isKidsStory 
                        ? 'border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a] hover:bg-[#FFFBEB] hover:shadow-[4px_4px_0_0_#1a1a1a] hover:translate-y-[-2px]' 
                        : 'border-white/80 bg-white/40 backdrop-blur-md shadow-sm hover:border-blue-200 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1.5 active:scale-95');
                  
                  letterBoxStyles = isSelected 
                    ? (isKidsStory 
                        ? 'bg-[#1a1a1a] text-white border-transparent' 
                        : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110')
                    : (isKidsStory 
                        ? 'bg-white border-[#1a1a1a]/10 text-[#1a1a1a]/20 group-hover:border-[#1a1a1a] group-hover:text-[#1a1a1a]' 
                        : 'bg-white border border-slate-100/50 text-slate-400 group-hover:text-blue-600 transition-all');
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={hasSubmitted}
                    className={`
                      relative flex items-center w-full p-6 text-left transition-all duration-500 rounded-[2rem] border-4 group 
                      ${stateStyles}
                    `}
                  >
                    {!hasSubmitted && !isSelected && !isKidsStory && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/10 via-transparent to-rose-100/10 opacity-0 group-hover:opacity-100 duration-1000" />
                    )}
                    
                    <div className={`
                      relative flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-sm font-black mr-6 transition-all duration-500 border-2
                      ${letterBoxStyles}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`text-[1.05rem] font-bold leading-snug pr-8 transition-colors duration-300 ${isSelected && !hasSubmitted ? (isKidsStory ? 'text-[#1a1a1a]' : 'text-orange-950 px-1') : 'text-stone-700'}`}>{option}</span>
                    
                    {hasSubmitted && showCorrect && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <CheckCircle className={`h-7 w-7 ${isKidsStory ? 'text-[#1a1a1a]' : 'text-emerald-600'} animate-in zoom-in spin-in-12 duration-500`} />
                      </div>
                    )}
                    {hasSubmitted && showWrong && (
                      <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <AlertTriangle className={`h-7 w-7 ${isKidsStory ? 'text-[#1a1a1a]' : 'text-rose-500'} animate-in zoom-in spin-in-12 duration-500`} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== RIGHT SIDE: FEEDBACK, ACTIONS & REFERENCE ==================== */}
          <div className="w-full lg:w-[42%] flex flex-col space-y-6 sticky top-32">
            <div className={`flex flex-col rounded-[2.5rem] border-[4px] overflow-hidden transition-all duration-700 ${
              hasSubmitted 
                ? (selectedAnswer === currentQ.answer 
                  ? (isKidsStory ? 'bg-[#7ED957] border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a]' : 'bg-emerald-50/80 border-emerald-200 shadow-xl') 
                  : (isKidsStory ? 'bg-[#EF4444] border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a]' : 'bg-rose-50/80 border-rose-200 shadow-xl')) 
                : (isKidsStory ? 'bg-white border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a]' : 'bg-white/40 backdrop-blur-3xl border-white shadow-xl')
              }`}>
                  <div className="p-8 sm:p-12 min-h-[220px] flex flex-col justify-center relative backdrop-blur-sm">
                {!hasSubmitted ? (
                  <div className="text-center w-full flex flex-col items-center gap-8 py-8 animate-in fade-in zoom-in duration-700">
                    <div className="relative">
                      {!isKidsStory && <div className="absolute inset-0 bg-stone-200/40 rounded-full blur-2xl animate-pulse" />}
                      <div className={`relative w-24 h-24 rounded-[2rem] bg-white border-2 ${isKidsStory ? 'border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]' : 'border-stone-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)]'} flex items-center justify-center rotate-3 hover:rotate-6 transition-transform`}>
                         <Brain className={`w-10 h-10 ${isKidsStory ? 'text-[#3B82F6]' : 'text-stone-200'}`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className={`${isKidsStory ? 'text-[#1a1a1a]/60' : 'text-stone-300'} font-black uppercase tracking-[0.4em] text-[10px] block`}>{isKidsStory ? 'THINKING TIME' : 'MEDITATION PHASE'}</span>
                      <p className={`${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-400'} font-bold text-sm tracking-tight`}>{isKidsStory ? 'Pick the best answer!' : 'Select an answer to reveal truth'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 space-y-8">
                    <div className="flex items-center gap-5">
                      {selectedAnswer === currentQ.answer ? (
                        <>
                          <div className={`rounded-2xl p-3 shadow-sm ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a] text-[#1a1a1a]' : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_8px_25px_rgba(16,185,129,0.4)] rotate-6'}`}><CheckCircle className="w-8 h-8 font-black" /></div>
                          <div className="flex flex-col">
                            <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]/60' : 'text-emerald-600'} uppercase tracking-[0.3em] mb-1`}>{isKidsStory ? 'YAY!' : 'RELEVATION'}</span>
                            <span className={`font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-emerald-900'} text-3xl tracking-tight leading-none`}>{isKidsStory ? 'Super Job!' : 'Praise God!'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`rounded-2xl p-3 shadow-sm ${isKidsStory ? 'bg-white border-2 border-[#1a1a1a] text-[#1a1a1a]' : 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-[0_8px_25px_rgba(244,63,94,0.4)] -rotate-6'}`}><AlertTriangle className="w-8 h-8" /></div>
                          <div className="flex flex-col">
                            <span className={`text-[10px] font-black ${isKidsStory ? 'text-[#1a1a1a]/60' : 'text-rose-600'} uppercase tracking-[0.3em] mb-1`}>{isKidsStory ? 'OOH!' : 'CORRECTION'}</span>
                            <span className={`font-black ${isKidsStory ? 'text-[#1a1a1a]' : 'text-rose-900'} text-3xl tracking-tight leading-none`}>{isKidsStory ? 'Try Again!' : 'Not This Time'}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {currentQ.explanation && (
                      <div className="relative">
                        <div className={`absolute -left-6 top-0 bottom-0 w-1.5 rounded-full ${selectedAnswer === currentQ.answer ? (isKidsStory ? 'bg-[#1a1a1a]' : 'bg-emerald-200') : (isKidsStory ? 'bg-[#1a1a1a]' : 'bg-rose-200')}`} />
                        <p className={`text-lg font-bold leading-relaxed pr-4 ${selectedAnswer === currentQ.answer ? (isKidsStory ? 'text-[#1a1a1a]' : 'text-emerald-800') : (isKidsStory ? 'text-[#1a1a1a]' : 'text-rose-800')}`}>
                          {currentQ.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Reference Module */}
              {currentQ.referenceVerse && (
                <div className={`px-8 sm:px-12 pb-10 pt-8 border-t ${isKidsStory ? 'border-[#1a1a1a]/10' : (hasSubmitted ? 'border-stone-300/30' : 'border-stone-100 bg-stone-50/50')}`}>
                  <div className="flex items-center gap-2 mb-6 text-left">
                    <div className={`h-1.5 w-10 rounded-full ${isKidsStory ? 'bg-[#3B82F6]' : 'bg-stone-200'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isKidsStory ? 'text-[#1a1a1a]/40' : 'text-stone-300'}`}>{isKidsStory ? 'STORY TRUTH' : 'SACRED CONTEXT'}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedVerse(currentQ.referenceVerse || "");
                      const chMatch = currentQ.referenceVerse.match(/\s(\d+):/);
                      setSelectedChapterId(chMatch ? parseInt(chMatch[1]) : parseInt(chapter || "1"));
                      setIsVerseContextOpen(true);
                    }}
                    className={`group flex w-full items-center justify-between gap-6 text-left rounded-3xl transition-all duration-500 px-6 py-5 border-2 ${
                      isKidsStory 
                        ? 'bg-[#F3F4F6] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none' 
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-3 rounded-2xl transition-all duration-500 ${isKidsStory ? 'bg-white text-[#1a1a1a] group-hover:bg-[#3B82F6] group-hover:text-white' : 'bg-stone-50 text-stone-400 group-hover:bg-rose-500 group-hover:text-white group-hover:rotate-6'}`}>
                        <BookOpen className="w-6 h-6 shrink-0" />
                      </div>
                      <div>
                        <span className={`block font-black text-lg tracking-tight leading-none mb-1.5 ${isKidsStory ? 'text-[#1a1a1a]' : 'text-stone-900'}`}>{currentQ.referenceVerse}</span>
                        <div className="flex items-center gap-2">
                           <span className={`block text-[10px] uppercase font-black tracking-widest transition-colors ${isKidsStory ? 'text-[#1a1a1a]/60 group-hover:text-[#3B82F6]' : 'text-stone-400 group-hover:text-rose-600'}`}>{isKidsStory ? 'Read in Bible' : 'Study Scripture'}</span>
                           <ChevronRight className={`w-3 h-3 transition-all group-hover:translate-x-1 ${isKidsStory ? 'text-[#1a1a1a]/30 group-hover:text-[#3B82F6]' : 'text-stone-300 group-hover:text-rose-500'}`} />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex justify-end">
              {!hasSubmitted ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className={`
                    h-20 px-12 sm:px-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 relative overflow-hidden group/btn w-full
                    ${selectedAnswer !== null 
                      ? (isKidsStory 
                        ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white border-4 border-[#1a1a1a] shadow-[0_8px_0_0_#1a1a1a] hover:shadow-[0_2px_0_0_#1a1a1a] active:shadow-none translate-y-[-4px] active:translate-y-[2px]' 
                        : 'bg-stone-900 text-white hover:bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 active:scale-95')
                      : 'bg-stone-50 text-stone-300 border border-stone-100 cursor-not-allowed'
                    }
                  `}
                >
                  {selectedAnswer !== null && !isKidsStory && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />}
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {isKidsStory ? 'Confirm My Answer!' : 'Confirm Selection'}
                    <ChevronRight className={`h-5 w-5 transition-transform duration-500 ${selectedAnswer !== null ? 'group-hover/btn:translate-x-2' : ''}`} />
                  </span>
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  size="lg"
                  className={`h-20 px-12 sm:px-16 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 relative overflow-hidden group/btn w-full mt-2 ${
                    isKidsStory 
                      ? 'bg-white hover:bg-[#F3F4F6] text-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[0_8px_0_0_#1a1a1a] hover:shadow-[0_2px_0_0_#1a1a1a] active:shadow-none translate-y-[-4px] active:translate-y-[2px]' 
                      : 'bg-white border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 active:scale-95'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {currentQuestion === normalizedQuestions.length - 1 ? (isKidsStory ? 'See My Score!' : 'End Pilgrimage') : (isKidsStory ? 'Next Page' : 'Proceed Forward')}
                    <ChevronRight className="h-5 w-5 transition-transform duration-500 group-hover/btn:translate-x-2" />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isKidsStory && (
        <section className="container mx-auto px-4 lg:max-w-6xl pb-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">{bookName} {chapterLabel} Study Guide</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              This free interactive Bible quiz helps you review scripture with focused questions, answer explanations, and verse references.
              Use it as a quick revision before competitions or as a daily Bible study routine.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-2">Best way to score higher</h3>
                <p className="text-sm text-slate-700">
                  Start with one attempt for accuracy, then retake the same quiz for speed. Track recurring mistakes and revisit those verses before the next attempt.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900 mb-2">Who should use this page</h3>
                <p className="text-sm text-slate-700">
                  Sunday school learners, youth teams, family devotion groups, and anyone preparing for a Bible quiz competition.
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-black text-slate-900">Quick FAQ</h3>
              {chapterFaq.map((item) => (
                <div key={item.q}>
                  <h4 className="font-bold text-slate-900">{item.q}</h4>
                  <p className="text-sm text-slate-700 mt-1">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => navigate(primaryHubPath)}
              >
                More {bookName} Quizzes
              </Button>
              <Button
                variant="outline"
                className="bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                Browse All Bible Books
              </Button>
              <Button
                variant="outline"
                className="bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                onClick={() => navigate(chapterPath)}
              >
                Open This Quiz Link
              </Button>
            </div>
          </div>
        </section>
      )}
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
