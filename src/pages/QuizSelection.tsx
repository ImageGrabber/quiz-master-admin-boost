import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Clock, Target, Trophy, ArrowRight, Play, BookOpen, BookMarked, Search, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
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

const bibleBooks = {
  Pentateuch: [
    { name: "Genesis", description: "The beginning of everything", icon: BookOpen, color: "bg-blue-500" },
    { name: "Exodus", description: "The great deliverance", icon: BookOpen, color: "bg-blue-500" },
    { name: "Leviticus", description: "Laws and sacrifices", icon: BookOpen, color: "bg-blue-500" },
    { name: "Numbers", description: "Wilderness journey", icon: BookOpen, color: "bg-blue-500" },
    { name: "Deuteronomy", description: "The second law", icon: BookOpen, color: "bg-blue-500" }
  ],
  Historical: [
    { name: "Joshua", description: "Conquest of Canaan", icon: BookMarked, color: "bg-green-500" },
    { name: "Judges", description: "Cycles of sin and deliverance", icon: BookMarked, color: "bg-green-500" },
    { name: "Ruth", description: "A story of loyalty and redemption", icon: BookMarked, color: "bg-green-500" },
    { name: "1 Samuel", description: "The rise of kingship", icon: BookMarked, color: "bg-green-500" },
    { name: "2 Samuel", description: "David's reign", icon: BookMarked, color: "bg-green-500" },
    { name: "1 Kings", description: "Solomon and divided kingdom", icon: BookMarked, color: "bg-green-500" },
    { name: "2 Kings", description: "The fall of Israel and Judah", icon: BookMarked, color: "bg-green-500" },
    { name: "1 Chronicles", description: "Genealogies and David's reign", icon: BookMarked, color: "bg-green-500" },
    { name: "2 Chronicles", description: "History of Judah", icon: BookMarked, color: "bg-green-500" },
    { name: "Ezra", description: "Return from exile", icon: BookMarked, color: "bg-green-500" },
    { name: "Nehemiah", description: "Rebuilding the walls", icon: BookMarked, color: "bg-green-500" },
    { name: "Esther", description: "God's providence in Persia", icon: BookMarked, color: "bg-green-500" }
  ]
};

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
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [quizzes, searchTerm, selectedDifficulty, selectedQuestionCount, selectedTimeRange]);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get question counts for each quiz
      const quizzesWithCounts = await Promise.all(
        (data || []).map(async (quiz) => {
          const { count } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true })
            .eq('quiz_id', quiz.id);
          
          // Determine difficulty based on quiz title or content
          let difficulty = 'Medium';
          if (quiz.title.includes('Genesis') || quiz.title.includes('Matthew') || quiz.title.includes('John')) {
            difficulty = 'Easy';
          } else if (quiz.title.includes('Romans') || quiz.title.includes('Revelation')) {
            difficulty = 'Hard';
          }
          
          return {
            ...quiz,
            question_count: count || 0,
            estimated_time: Math.ceil((count || 25) * 0.4), // 24 seconds per question
            difficulty: difficulty
          };
        })
      );

      setQuizzes(quizzesWithCounts);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast({
        title: "Error",
        description: "Failed to load quizzes. Please try again.",
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
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDialogTitle("Not logged in");
        setDialogMessage("Please log in to take a quiz.");
        setDialogOpen(true);
        navigate("/auth/login");
        return;
      }

      // Check if user has ever attempted this quiz
      const { data: everAttempts, error: everError } = await supabase
        .from('attempts')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('quiz_id', quizId);

      if (everError) {
        setDialogTitle("Error");
        setDialogMessage("Could not check your quiz attempt history. Please try again.");
        setDialogOpen(true);
        return;
      }

      if (everAttempts && everAttempts.length > 0) {
        setDialogTitle("Already Attempted");
        setDialogMessage("You have already attempted this quiz. Only one attempt per quiz is allowed.");
        setDialogOpen(true);
        return;
      }

      // Check if user has attempted this quiz this week (Sunday to Sunday)
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      const { data: weekAttempts, error: weekError } = await supabase
        .from('attempts')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('quiz_id', quizId)
        .gte('created_at', startOfWeek.toISOString())
        .lt('created_at', endOfWeek.toISOString());

      if (weekError) {
        setDialogTitle("Error");
        setDialogMessage("Could not check your weekly quiz attempt. Please try again.");
        setDialogOpen(true);
        return;
      }

      if (weekAttempts && weekAttempts.length > 0) {
        setDialogTitle("Weekly Limit Reached");
        setDialogMessage("You have already attempted this quiz this week. Only one attempt per quiz per week is allowed (Sunday to Sunday).");
        setDialogOpen(true);
        return;
      }

      // Allow navigation if not blocked
      navigate(`/quiz/${quizId}`);
    } catch (err) {
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

  const handleBibleBookClick = async (bookName: string) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setDialogTitle("Not logged in");
        setDialogMessage("Please log in to take a quiz.");
        setDialogOpen(true);
        navigate("/auth/login");
        return;
      }

      // Find or create the Bible book quiz in the database
      let { data: quiz } = await supabase
        .from('quizzes')
        .select('id')
        .eq('title', `${bookName} Quiz`)
        .single();

      if (!quiz) {
        // Create the quiz if it doesn't exist
        const { data: newQuiz, error: quizError } = await supabase
          .from('quizzes')
          .insert({
            title: `${bookName} Quiz`,
            description: `Test your knowledge of the Book of ${bookName}`
          })
          .select()
          .single();

        if (quizError) {
          console.error('Error creating quiz:', quizError);
          setDialogTitle("Error");
          setDialogMessage("Failed to create quiz. Please try again.");
          setDialogOpen(true);
          return;
        }
        quiz = newQuiz;
      }

      // Check if user has ever attempted this quiz
      const { data: everAttempts, error: everError } = await supabase
        .from('attempts')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('quiz_id', quiz.id);

      if (everError) {
        setDialogTitle("Error");
        setDialogMessage("Could not check your quiz attempt history. Please try again.");
        setDialogOpen(true);
        return;
      }

      if (everAttempts && everAttempts.length > 0) {
        setDialogTitle("Already Attempted");
        setDialogMessage("You have already attempted this quiz. Only one attempt per quiz is allowed.");
        setDialogOpen(true);
        return;
      }

      // Check if user has attempted this quiz this week (Sunday to Sunday)
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      const { data: weekAttempts, error: weekError } = await supabase
        .from('attempts')
        .select('id, created_at')
        .eq('user_id', user.id)
        .eq('quiz_id', quiz.id)
        .gte('created_at', startOfWeek.toISOString())
        .lt('created_at', endOfWeek.toISOString());

      if (weekError) {
        setDialogTitle("Error");
        setDialogMessage("Could not check your weekly quiz attempt. Please try again.");
        setDialogOpen(true);
        return;
      }

      if (weekAttempts && weekAttempts.length > 0) {
        setDialogTitle("Weekly Limit Reached");
        setDialogMessage("You have already attempted this quiz this week. Only one attempt per quiz per week is allowed (Sunday to Sunday).");
        setDialogOpen(true);
        return;
      }

      // Navigate to the quiz using the database ID
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      console.error('Error starting Bible book quiz:', err);
      setDialogTitle("Error");
      setDialogMessage("Something went wrong. Please try again.");
      setDialogOpen(true);
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
    <DashboardLayout>
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
      
      {/* Modern Background with Gradient and Patterns */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-indigo-400/30 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-40 w-5 h-5 bg-cyan-400/30 rounded-full animate-pulse delay-500"></div>
        </div>

        <main className="relative container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Modern Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Choose Your Quiz
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Select from our collection of Bible quizzes. Each quiz is designed to test your knowledge 
                and help you grow in your understanding of Scripture.
              </p>
            </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md ring-1 ring-white/20 hover:shadow-3xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search quizzes by title or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/70 backdrop-blur-sm border-gray-200/50 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>

                  {/* Filter Toggle */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-blue-50/70 hover:border-blue-300/50 transition-all duration-200"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </Button>
                    
                    {(searchTerm || selectedDifficulty !== "all" || selectedQuestionCount !== "all" || selectedTimeRange !== "all") && (
                      <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-gray-500 hover:text-gray-700 bg-white/50 backdrop-blur-sm hover:bg-red-50/70 transition-all duration-200"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear Filters
                      </Button>
                    )}
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200/50">
                      {/* Difficulty Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        >
                          <option value="all">All Difficulties</option>
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      {/* Question Count Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
                        <select
                          value={selectedQuestionCount}
                          onChange={(e) => setSelectedQuestionCount(e.target.value)}
                          className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        >
                          <option value="all">All Counts</option>
                          <option value="1-10">1-10 Questions</option>
                          <option value="11-20">11-20 Questions</option>
                          <option value="21-30">21-30 Questions</option>
                          <option value="31+">31+ Questions</option>
                        </select>
                      </div>

                      {/* Time Range Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <select
                          value={selectedTimeRange}
                          onChange={(e) => setSelectedTimeRange(e.target.value)}
                          className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        >
                          <option value="all">All Times</option>
                          <option value="1-5">1-5 minutes</option>
                          <option value="6-10">6-10 minutes</option>
                          <option value="11-15">11-15 minutes</option>
                          <option value="16+">16+ minutes</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Results Count */}
                  <div className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                    Showing {filteredQuizzes.length} of {quizzes.length} quizzes
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bible Book Quizzes */}
          <div className="mb-12">
           
            {/*
            Pentateuch Section
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pentateuch</h3>
                <Badge className="ml-3 bg-blue-100 text-blue-700">5 Books</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bibleBooks.Pentateuch.map((book) => (
                  <Card key={book.name} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {book.name} Quiz
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-700">
                          Bible Quiz
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {book.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                            <Target className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">25</div>
                          <div className="text-xs text-gray-500">Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">10m</div>
                          <div className="text-xs text-gray-500">Est. Time</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
                            <Trophy className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">100</div>
                          <div className="text-xs text-gray-500">Max Score</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Badge className="bg-green-100 text-green-700">
                          Easy
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleBibleBookClick(book.name)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            */}
            {/* Historical Books Section
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <BookMarked className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Historical Books</h3>
                <Badge className="ml-3 bg-green-100 text-green-700">12 Books</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bibleBooks.Historical.map((book) => (
                  <Card key={book.name} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {book.name} Quiz
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-700">
                          Bible Quiz
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {book.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                            <Target className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">25</div>
                          <div className="text-xs text-gray-500">Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                            <Clock className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">10m</div>
                          <div className="text-xs text-gray-500">Est. Time</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
                            <Trophy className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="text-sm font-semibold text-gray-900">100</div>
                          <div className="text-xs text-gray-500">Max Score</div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Medium
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleBibleBookClick(book.name)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            */}
            {/* You can add other quiz sections here */}
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
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md ring-1 ring-white/20">
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6">
                    <Search className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-3">No quizzes match your filters</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">Try adjusting your search or filter criteria.</p>
                  <Button onClick={clearFilters} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          {quiz.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {quiz.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Quiz Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-1">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{quiz.question_count}</div>
                        <div className="text-xs text-gray-500">Questions</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-1">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{quiz.estimated_time}m</div>
                        <div className="text-xs text-gray-500">Est. Time</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-1">
                          <Trophy className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900">100</div>
                        <div className="text-xs text-gray-500">Max Score</div>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="flex justify-center">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>

                    {/* Start Button */}
                    <Button
                      onClick={() => handleStartQuiz(quiz.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default QuizSelection; 