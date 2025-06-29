import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Quiz {
  id: number;
  title: string;
  description: string;
  question_count: number;
  attempts: number;
  avg_score: number;
  created_at: string;
  status: string;
}

const Quizzes = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    questionSelection: "random" // "random" or "manual"
  });
  const [deleteQuizId, setDeleteQuizId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      
      // Fetch quizzes with their stats
      const { data: quizzesData, error: quizzesError } = await supabase
        .from('quizzes')
        .select('*')
        .order('created_at', { ascending: false });

      if (quizzesError) throw quizzesError;

      // Get stats for each quiz
      const quizzesWithStats = await Promise.all(
        (quizzesData || []).map(async (quiz) => {
          // Get question count
          const { count: questionCount } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true })
            .eq('quiz_id', quiz.id);

          // Get attempt stats
          const { data: attempts, error: attemptsError } = await supabase
            .from('attempts')
            .select('score')
            .eq('quiz_id', quiz.id);

          const attemptsCount = attempts?.length || 0;
          const avgScore = attempts && attempts.length > 0
            ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
            : 0;

          return {
            ...quiz,
            question_count: questionCount || 0,
            attempts: attemptsCount,
            avg_score: avgScore,
            status: 'active' // Default status
          };
        })
      );

      setQuizzes(quizzesWithStats);
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

  const handleCreateQuiz = async () => {
    if (!newQuiz.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a quiz title.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create the quiz
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: newQuiz.title,
          description: newQuiz.description
        })
        .select()
        .single();

      if (quizError) throw quizError;

      // If random selection, link some questions to the quiz
      if (newQuiz.questionSelection === "random") {
        const { data: questions } = await supabase
          .from('questions')
          .select('id')
          .limit(25);

        if (questions && questions.length > 0) {
          const quizQuestions = questions.map((q, index) => ({
            quiz_id: quiz.id,
            question_id: q.id,
            order_index: index + 1
          }));

          await supabase
            .from('quiz_questions')
            .insert(quizQuestions);
        }
      }

      toast({
        title: "Quiz created successfully!",
        description: `"${newQuiz.title}" has been added to your quiz collection.`,
      });

      setIsCreateDialogOpen(false);
      setNewQuiz({ title: "", description: "", questionSelection: "random" });
      
      // Refresh the quiz list
      fetchQuizzes();
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast({
        title: "Creation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    try {
      // First, delete all quiz questions associated with this quiz
      const { error: quizQuestionsError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quizId);

      if (quizQuestionsError) {
        console.error('Error deleting quiz questions:', quizQuestionsError);
        throw quizQuestionsError;
      }

      // Then, delete all attempts for this quiz
      const { error: attemptsError } = await supabase
        .from('attempts')
        .delete()
        .eq('quiz_id', quizId);

      if (attemptsError) {
        console.error('Error deleting attempts:', attemptsError);
        throw attemptsError;
      }

      // Finally, delete the quiz itself
      const { error: quizError } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quizId);

      if (quizError) {
        console.error('Error deleting quiz:', quizError);
        throw quizError;
      }

      toast({
        title: "Quiz deleted successfully!",
        description: "The quiz and all associated data have been removed.",
      });

      // Refresh the quiz list
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast({
        title: "Deletion failed",
        description: "Failed to delete the quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteQuizId(null);
    }
  };

  const openDeleteDialog = (quizId: number) => {
    setDeleteQuizId(quizId);
    setIsDeleteDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
            <p className="text-gray-600 mt-2">Create and manage your quiz collection</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
                <DialogDescription>
                  Set up a new quiz with your desired questions and settings.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title..."
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this quiz covers..."
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Question Selection</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="random"
                        name="questionSelection"
                        value="random"
                        checked={newQuiz.questionSelection === "random"}
                        onChange={(e) => setNewQuiz({...newQuiz, questionSelection: e.target.value})}
                        className="text-blue-600"
                      />
                      <Label htmlFor="random" className="font-normal">
                        Random Selection (25 questions from database)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="manual"
                        name="questionSelection"
                        value="manual"
                        checked={newQuiz.questionSelection === "manual"}
                        onChange={(e) => setNewQuiz({...newQuiz, questionSelection: e.target.value})}
                        className="text-blue-600"
                      />
                      <Label htmlFor="manual" className="font-normal">
                        Manual Selection (choose specific questions)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateQuiz} className="bg-blue-600 hover:bg-blue-700">
                  Create Quiz
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{quizzes.length}</div>
                  <div className="text-sm text-gray-600">Total Quizzes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {quizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {quizzes.filter(q => q.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600">Active Quizzes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>All Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Details</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{quiz.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {quiz.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{quiz.question_count}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{quiz.attempts}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{quiz.avg_score}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(quiz.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(quiz.created_at)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => openDeleteDialog(quiz.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz? This action cannot be undone and will remove:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>All quiz questions</li>
                <li>All user attempts</li>
                <li>All associated data</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteQuizId && handleDeleteQuiz(deleteQuizId)}
            >
              Delete Quiz
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Quizzes;
