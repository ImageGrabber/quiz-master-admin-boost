import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Clock, Target, Trophy, ArrowRight, Play, Search, BookOpen, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import PromotionalSidebar from "@/components/PromotionalSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface Quiz {
  id: number;
  title: string;
  description: string;
  question_count: number;
  estimated_time: number;
  difficulty: string;
  created_at: string;
}

const QuizSelection = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [selectedTestament, setSelectedTestament] = useState<'Old Testament' | 'New Testament' | null>(null);

  const oldTestamentBooks = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
    'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
  ];

  const newTestamentBooks = [
    'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
    'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  // State for tracking completed quizzes
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [quizzes, searchTerm, selectedDifficulty, selectedQuestionCount, selectedTimeRange, selectedTestament]);

  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      // Fetch all quizzes
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (quizError) throw quizError;

      // Fetch user attempts if logged in
      const completedSet = new Set<number>();
      if (user) {
        const { data: attempts } = await supabase
          .from('attempts')
          .select('quiz_id, completed')
          .eq('user_id', user.id)
          .eq('completed', true);

        if (attempts) {
          attempts.forEach(a => completedSet.add(a.quiz_id));
        }
      }
      setCompletedQuizzes(completedSet);

      // Get question counts using a separate query to be safe with joins
      // Optimization: Fetch all counts in one go if possible, but map is fine for small count
      const quizzesWithCounts = await Promise.all(
        (quizData || []).map(async (quiz) => {
          const { count } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true })
            .eq('quiz_id', quiz.id);

          // Determine difficulty
          let difficulty = 'Medium';
          if (quiz.title.includes('Genesis') || quiz.title.includes('Matthew') || quiz.title.includes('John')) {
            difficulty = 'Easy';
          } else if (quiz.title.includes('Romans') || quiz.title.includes('Revelation')) {
            difficulty = 'Hard';
          }

          return {
            ...quiz,
            question_count: count || 0,
            estimated_time: Math.ceil((count || 25) * 0.4),
            difficulty: difficulty
          };
        })
      );

      setQuizzes(quizzesWithCounts);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast({
        title: "Error",
        description: "Failed to load quizzes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuizzes = () => {
    let filtered = [...quizzes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(quiz => quiz.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    // Question count filter
    if (selectedQuestionCount !== "all") {
      const [min, max] = selectedQuestionCount.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(quiz => quiz.question_count >= min && quiz.question_count <= max);
      } else {
        filtered = filtered.filter(quiz => quiz.question_count >= min);
      }
    }

    // Time range filter
    if (selectedTimeRange !== "all") {
      const [min, max] = selectedTimeRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(quiz => quiz.estimated_time >= min && quiz.estimated_time <= max);
      } else {
        filtered = filtered.filter(quiz => quiz.estimated_time >= min);
      }
    }

    // Testament filter
    if (selectedTestament === 'Old Testament') {
      filtered = filtered.filter(quiz => oldTestamentBooks.some(book => quiz.title.includes(book)));
    } else if (selectedTestament === 'New Testament') {
      filtered = filtered.filter(quiz => newTestamentBooks.some(book => quiz.title.includes(book)));
    }

    setFilteredQuizzes(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDifficulty("all");
    setSelectedQuestionCount("all");
    setSelectedTimeRange("all");
  };

  const handleStartQuiz = async (quizId: number) => {
    try {
      console.log("Starting quiz:", quizId);
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDialogTitle("Not logged in");
        setDialogMessage("Please log in to take a quiz.");
        setDialogOpen(true);
        navigate("/auth/login");
        return;
      }

      // Navigate directly to the quiz
      navigate(`/quiz/${quizId}`);

    } catch (err) {
      console.error("Error starting quiz:", err);
      setDialogTitle("Error");
      setDialogMessage("Something went wrong. Please try again.");
      setDialogOpen(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading available quizzes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="All Quizzes"
      subtitle="Browse and take quizzes to test your knowledge."
    >
      <Helmet>
        <title>All Bible Quizzes | Bible Quiz Competition 2026</title>
        <meta name="description" content="Browse our collection of Bible quizzes for all difficulty levels. Categories include Old Testament, New Testament, Prophets, Gospels, and more." />
        <link rel="canonical" href="https://biblequizcompetition.com/quiz-selection" />
      </Helmet>
      {/* Dialog for quiz attempt restrictions */}
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

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 animate-in fade-in duration-500 py-8 px-4">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {!selectedTestament ? (
            /* Testament Selection View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-8">
              <Card
                className="cursor-pointer bg-white border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                onClick={() => setSelectedTestament('Old Testament')}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <BookOpen className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Old Testament</h2>
                  <p className="text-slate-500 mb-6">Genesis to Malachi</p>
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    View Quizzes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer bg-white border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
                onClick={() => setSelectedTestament('New Testament')}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">New Testament</h2>
                  <p className="text-slate-500 mb-6">Matthew to Revelation</p>
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    View Quizzes <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Quiz Selection View */
            <>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTestament(null)}
                  className="hover:bg-slate-100 text-slate-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Testaments
                </Button>
                <h2 className="text-2xl font-bold text-slate-900">{selectedTestament} Quizzes</h2>
              </div>

              {/* Search Bar - Minimal */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus-visible:ring-blue-500"
                />
              </div>

              {/* Quiz Grid */}
              {quizzes.length === 0 ? (
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md ring-1 ring-white/20">
                  <CardContent className="pt-12 pb-12">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-6">
                        <Brain className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-700 mb-3">No quizzes available</h3>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">Check back later for new quizzes or contact an administrator.</p>
                      <Button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Back to Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : filteredQuizzes.length === 0 ? (
                <Card className="bg-white border-slate-100 shadow-sm">
                  <CardContent className="pt-12 pb-12">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl mx-auto mb-6">
                        <Search className="w-10 h-10 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No quizzes match</h3>
                      <p className="text-slate-500 mb-6 max-w-sm mx-auto">Try changing your search terms or filters.</p>
                      <Button onClick={clearFilters} variant="outline">
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="bg-white border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                              {quiz.title}
                            </CardTitle>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 h-10">
                              {quiz.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Quiz Stats */}
                        <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-slate-50">
                          <div className="text-center">
                            <div className="text-xs font-medium text-slate-500 mb-1">Questions</div>
                            <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                              <Target className="w-3 h-3 text-blue-500" />
                              {quiz.question_count}
                            </div>
                          </div>

                          <div className="text-center border-l border-slate-50">
                            <div className="text-xs font-medium text-slate-500 mb-1">Time</div>
                            <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                              <Clock className="w-3 h-3 text-emerald-500" />
                              {quiz.estimated_time}m
                            </div>
                          </div>

                          <div className="text-center border-l border-slate-50">
                            <div className="text-xs font-medium text-slate-500 mb-1">Points</div>
                            <div className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                              <Trophy className="w-3 h-3 text-yellow-500" />
                              100
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2">
                          <Badge variant="outline" className={`${getDifficultyColor(quiz.difficulty)} border-0 px-3`}>
                            {quiz.difficulty}
                          </Badge>

                          <Button
                            size="sm"
                            onClick={() => handleStartQuiz(quiz.id)}
                            className={`flex-1 font-medium shadow-none transition-colors
                              ${completedQuizzes.has(quiz.id)
                                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                          >
                            {completedQuizzes.has(quiz.id) ? (
                              <>Retake</>
                            ) : (
                              <>Start Quiz</>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <PromotionalSidebar />
      </div>
    </DashboardLayout>
  );
};

export default QuizSelection;