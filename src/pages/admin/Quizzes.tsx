import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, Users, HelpCircle, X } from "lucide-react";
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

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
  order_index: number;
}

const Quizzes = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    questionSelection: "random", // "random" or "manual"
    showParticipantFeedback: false,
  });
  const [deleteQuizId, setDeleteQuizId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_index: 0
  });
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [addQuestionMode, setAddQuestionMode] = useState<'create' | 'existing'>('create');
  const [selectedExistingQuestion, setSelectedExistingQuestion] = useState<number | null>(null);

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
      setNewQuiz({ title: "", description: "", questionSelection: "random", showParticipantFeedback: false });
      
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

  const openEditDialog = async (quiz: Quiz) => {
    setEditQuiz(quiz);
    setEditForm({ title: quiz.title, description: quiz.description });
    setIsEditDialogOpen(true);
    await fetchQuizQuestions(quiz.id);
    await fetchAllQuestions();
  };

  const fetchQuizQuestions = async (quizId: number) => {
    setIsLoadingQuestions(true);
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select(`
          order_index,
          questions (
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_index
          )
        `)
        .eq('quiz_id', quizId)
        .order('order_index');

      if (error) throw error;

      const questions = data?.map(item => ({
        ...item.questions,
        order_index: item.order_index
      })) || [];

      setQuizQuestions(questions);
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllQuestions(data || []);
    } catch (error) {
      console.error('Error fetching all questions:', error);
    }
  };

  const addQuestionToQuiz = async () => {
    if (!editQuiz) return;

    if (addQuestionMode === 'create') {
      if (!newQuestion.question.trim()) {
        toast({
          title: "Missing information",
          description: "Please fill in the question and all options.",
          variant: "destructive",
        });
        return;
      }

      try {
        // Insert new question
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .insert({
            question: newQuestion.question,
            option_a: newQuestion.option_a,
            option_b: newQuestion.option_b,
            option_c: newQuestion.option_c,
            option_d: newQuestion.option_d,
            correct_index: newQuestion.correct_index
          })
          .select()
          .single();

        if (questionError) throw questionError;

        // Add to quiz with next order index
        const nextOrderIndex = quizQuestions.length + 1;
        const { error: linkError } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: editQuiz.id,
            question_id: questionData.id,
            order_index: nextOrderIndex
          });

        if (linkError) throw linkError;

        toast({
          title: "Question added!",
          description: "The new question has been added to the quiz.",
        });

        setIsAddQuestionDialogOpen(false);
        setNewQuestion({
          question: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_index: 0
        });

        // Refresh questions
        await fetchQuizQuestions(editQuiz.id);
        await fetchAllQuestions();
      } catch (error) {
        console.error('Error adding question:', error);
        toast({
          title: "Failed to add question",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Add existing question to quiz
      if (!selectedExistingQuestion) {
        toast({
          title: "No question selected",
          description: "Please select a question to add.",
          variant: "destructive",
        });
        return;
      }

      try {
        // Check if question is already in this quiz
        const { data: existingLink } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', editQuiz.id)
          .eq('question_id', selectedExistingQuestion)
          .single();

        if (existingLink) {
          toast({
            title: "Question already in quiz",
            description: "This question is already part of this quiz.",
            variant: "destructive",
          });
          return;
        }

        // Add to quiz with next order index
        const nextOrderIndex = quizQuestions.length + 1;
        const { error: linkError } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: editQuiz.id,
            question_id: selectedExistingQuestion,
            order_index: nextOrderIndex
          });

        if (linkError) throw linkError;

        toast({
          title: "Question added!",
          description: "The existing question has been added to the quiz.",
        });

        setIsAddQuestionDialogOpen(false);
        setSelectedExistingQuestion(null);

        // Refresh questions
        await fetchQuizQuestions(editQuiz.id);
        await fetchAllQuestions();
      } catch (error) {
        console.error('Error adding existing question:', error);
        toast({
          title: "Failed to add question",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const removeQuestionFromQuiz = async (questionId: number) => {
    if (!editQuiz) return;

    try {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', editQuiz.id)
        .eq('question_id', questionId);

      if (error) throw error;

      toast({
        title: "Question removed!",
        description: "The question has been removed from the quiz.",
      });

      // Refresh questions
      await fetchQuizQuestions(editQuiz.id);
    } catch (error) {
      console.error('Error removing question:', error);
      toast({
        title: "Failed to remove question",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditQuiz = async () => {
    if (!editQuiz) return;
    if (!editForm.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a quiz title.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { error } = await supabase
        .from('quizzes')
        .update({ title: editForm.title, description: editForm.description })
        .eq('id', editQuiz.id);
      if (error) throw error;
      toast({
        title: "Quiz updated!",
        description: `"${editForm.title}" has been updated.`,
      });
      setIsEditDialogOpen(false);
      setEditQuiz(null);
      fetchQuizzes();
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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

              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showParticipantFeedback"
                    checked={newQuiz.showParticipantFeedback}
                    onChange={(e) => setNewQuiz({ ...newQuiz, showParticipantFeedback: e.target.checked })}
                    className="text-blue-600"
                  />
                  <Label htmlFor="showParticipantFeedback" className="font-normal">
                    Show “Correct/Incorrect” feedback to participants after answering
                  </Label>
                </div>
                <p className="text-xs text-gray-500 ml-6">Disable for silent mode events.</p>
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
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(quiz)}>
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

      {/* Edit Quiz Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Quiz: {editQuiz?.title}</DialogTitle>
            <DialogDescription>
              Update the quiz details and manage its questions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Quiz Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quiz Information</h3>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Quiz Title</Label>
                <Input
                  id="edit-title"
                  placeholder="Enter quiz title..."
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Describe what this quiz covers..."
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            {/* Questions Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Quiz Questions ({quizQuestions.length})</h3>
                <Button 
                  onClick={() => setIsAddQuestionDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {isLoadingQuestions ? (
                <div className="text-center py-4">
                  <div className="text-gray-500">Loading questions...</div>
                </div>
              ) : quizQuestions.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No questions in this quiz yet.</p>
                  <p className="text-sm text-gray-400">Click "Add Question" to get started.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {quizQuestions.map((question, index) => (
                    <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{index + 1}. {question.question}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Correct: {String.fromCharCode(65 + question.correct_index)} - {
                            [question.option_a, question.option_b, question.option_c, question.option_d][question.correct_index]
                          }
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestionFromQuiz(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditQuiz} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Question Dialog */}
      <Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add Question to Quiz</DialogTitle>
            <DialogDescription>
              Choose to create a new question or select from existing questions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Mode Selection */}
            <div className="flex space-x-4">
              <Button
                variant={addQuestionMode === 'create' ? 'default' : 'outline'}
                onClick={() => setAddQuestionMode('create')}
                className="flex-1"
              >
                Create New Question
              </Button>
              <Button
                variant={addQuestionMode === 'existing' ? 'default' : 'outline'}
                onClick={() => setAddQuestionMode('existing')}
                className="flex-1"
              >
                Select Existing Question
              </Button>
            </div>

            {addQuestionMode === 'create' ? (
              /* Create New Question Form */
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-question">Question</Label>
                  <Input
                    id="new-question"
                    placeholder="Enter the question text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="option-a">Option A</Label>
                    <Input
                      id="option-a"
                      value={newQuestion.option_a}
                      onChange={(e) => setNewQuestion({ ...newQuestion, option_a: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="option-b">Option B</Label>
                    <Input
                      id="option-b"
                      value={newQuestion.option_b}
                      onChange={(e) => setNewQuestion({ ...newQuestion, option_b: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="option-c">Option C</Label>
                    <Input
                      id="option-c"
                      value={newQuestion.option_c}
                      onChange={(e) => setNewQuestion({ ...newQuestion, option_c: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="option-d">Option D</Label>
                    <Input
                      id="option-d"
                      value={newQuestion.option_d}
                      onChange={(e) => setNewQuestion({ ...newQuestion, option_d: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="correct-answer">Correct Answer</Label>
                  <select
                    id="correct-answer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newQuestion.correct_index}
                    onChange={(e) => setNewQuestion({ ...newQuestion, correct_index: Number(e.target.value) })}
                  >
                    <option value={0}>A</option>
                    <option value={1}>B</option>
                    <option value={2}>C</option>
                    <option value={3}>D</option>
                  </select>
                </div>
              </div>
            ) : (
              /* Select Existing Question */
              <div className="space-y-4">
                <div>
                  <Label>Select Question</Label>
                  <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md">
                    {allQuestions.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No questions available. Create some questions first.
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {allQuestions.map((question) => (
                          <div
                            key={question.id}
                            className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                              selectedExistingQuestion === question.id ? 'bg-blue-50 border-blue-200' : ''
                            }`}
                            onClick={() => setSelectedExistingQuestion(question.id)}
                          >
                            <div className="font-medium text-sm">{question.question}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Correct: {String.fromCharCode(65 + question.correct_index)} - {
                                [question.option_a, question.option_b, question.option_c, question.option_d][question.correct_index]
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => {
              setIsAddQuestionDialogOpen(false);
              setAddQuestionMode('create');
              setSelectedExistingQuestion(null);
            }}>
              Cancel
            </Button>
            <Button onClick={addQuestionToQuiz} className="bg-green-600 hover:bg-green-700">
              {addQuestionMode === 'create' ? 'Create & Add Question' : 'Add Selected Question'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Quizzes;
