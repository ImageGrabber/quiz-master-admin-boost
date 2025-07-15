import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Target, Trophy, ArrowRight, Play, BookOpen, BookMarked } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

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
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Quiz</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select from our collection of Bible quizzes. Each quiz is designed to test your knowledge 
              and help you grow in your understanding of Scripture.
            </p>
          </div>

          {/* Bible Book Quizzes */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Bible Book Quizzes</h2>
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes available</h3>
                  <p className="text-gray-500 mb-6">Check back later for new quizzes or contact an administrator.</p>
                  <Button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Back to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
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
    </DashboardLayout>
  );
};

export default QuizSelection; 