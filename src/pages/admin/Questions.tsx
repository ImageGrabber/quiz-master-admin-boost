import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle, Search, Filter, Eye, Edit, Trash2, Plus, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Select } from "@/components/ui/select";

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
  category?: string;
  difficulty?: string;
  created_at: string;
  usage_count: number;
}

interface Quiz {
  id: number;
  title: string;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState("");

  // Add Question dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_index: 0,
    category: "General",
    difficulty: "Medium"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuizId) {
      fetchQuestionsForQuiz(selectedQuizId);
    } else {
      fetchQuestions();
    }
  }, [selectedQuizId]);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, selectedCategory, selectedDifficulty]);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (questionsError) throw questionsError;

      // Get usage count for each question (how many quizzes use this question)
      const questionsWithUsage = await Promise.all(
        (questionsData || []).map(async (question) => {
          const { count } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true })
            .eq('question_id', question.id);

          return {
            ...question,
            category: 'Bible', // Default category since it's not in the database
            difficulty: 'Medium', // Default difficulty since it's not in the database
            usage_count: count || 0
          };
        })
      );

      setQuestions(questionsWithUsage);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast({
        title: "Error",
        description: "Failed to load questions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title')
      .order('title');
    if (!error && data) setQuizzes(data);
  };

  const fetchQuestionsForQuiz = async (quizId: number) => {
    setIsLoading(true);
    try {
      // Get question IDs for this quiz
      const { data: quizQuestions, error: qqError } = await supabase
        .from('quiz_questions')
        .select('question_id, order_index')
        .eq('quiz_id', quizId)
        .order('order_index');
      if (qqError) throw qqError;
      const questionIds = quizQuestions.map(q => q.question_id);
      if (questionIds.length === 0) {
        setQuestions([]);
        setIsLoading(false);
        return;
      }
      // Fetch questions by IDs
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .in('id', questionIds);
      if (questionsError) throw questionsError;
      // Add usage count
      const questionsWithUsage = await Promise.all(
        (questionsData || []).map(async (question) => {
          const { count } = await supabase
            .from('quiz_questions')
            .select('*', { count: 'exact', head: true })
            .eq('question_id', question.id);
          return {
            ...question,
            category: 'Bible',
            difficulty: 'Medium',
            usage_count: count || 0
          };
        })
      );
      setQuestions(questionsWithUsage);
    } catch (error: any) {
      toast({ title: 'Error', description: 'Failed to load questions.', variant: 'destructive' });
      setErrorDialogMessage(error?.message || 'Failed to load questions.');
      setErrorDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(question =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (question.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(question => (question.category || 'General') === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(question => (question.difficulty || 'Medium') === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
  };

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      // First, remove the question from all quizzes
      const { error: quizQuestionsError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('question_id', questionId);

      if (quizQuestionsError) {
        console.error('Error removing question from quizzes:', quizQuestionsError);
        throw quizQuestionsError;
      }

      // Then delete the question itself
      const { error: questionError } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId);

      if (questionError) {
        console.error('Error deleting question:', questionError);
        throw questionError;
      }

      toast({
        title: "Question deleted successfully!",
        description: "The question has been removed from all quizzes and deleted.",
      });

      // Refresh the questions list
      if (selectedQuizId) {
        fetchQuestionsForQuiz(selectedQuizId);
      } else {
        fetchQuestions();
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      toast({
        title: "Deletion failed",
        description: "Failed to delete the question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteQuestionId(null);
    }
  };

  const openDeleteDialog = (questionId: number) => {
    setDeleteQuestionId(questionId);
    setIsDeleteDialogOpen(true);
  };

  const openViewDialog = (question: Question) => {
    setSelectedQuestion(question);
    setIsViewDialogOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
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

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-indigo-100 text-indigo-700',
      'bg-pink-100 text-pink-700',
      'bg-orange-100 text-orange-700',
      'bg-teal-100 text-teal-700'
    ];
    const colorIndex = (category?.length || 0) % colors.length;
    return colors[colorIndex];
  };

  const getCorrectAnswer = (question: Question) => {
    const options = ['A', 'B', 'C', 'D'];
    return options[question.correct_index];
  };

  const getCorrectAnswerText = (question: Question) => {
    const options = [question.option_a, question.option_b, question.option_c, question.option_d];
    return options[question.correct_index];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Get unique categories and difficulties for filters
  const categories = ["all", ...Array.from(new Set(questions.map(q => q.category || 'General')))];
  const difficulties = ["all", ...Array.from(new Set(questions.map(q => q.difficulty || 'Medium')))];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Quiz Selector */}
        <div className="flex items-center gap-4 mb-4">
          <label className="font-semibold text-lg">Select Quiz:</label>
          <select
            value={selectedQuizId ?? ''}
            onChange={e => setSelectedQuizId(Number(e.target.value) || null)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose a quiz --</option>
            {quizzes.map(q => (
              <option key={q.id} value={q.id}>{q.title}</option>
            ))}
          </select>
        </div>
        {/* Always show the rest of the UI */}
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Question Management</h1>
            <p className="text-gray-600 mt-2">View and manage all questions in the database</p>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center space-x-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </Button>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {questions.filter(q => q.usage_count > 0).length}
                  </div>
                  <div className="text-sm text-gray-600">Used in Quizzes</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Array.from(new Set(questions.map(q => q.category))).length}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {questions.reduce((sum, q) => sum + q.usage_count, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Usage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Filters */}
        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search questions or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === "all" ? "All Difficulties" : difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Questions Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>All Questions ({filteredQuestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map((question) => (
                    <TableRow key={question.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-gray-900 truncate">
                            {question.question}
                          </div>
                          <div className="text-sm text-gray-500">
                            Correct: {getCorrectAnswer(question)} - {getCorrectAnswerText(question)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(question.category || 'General')}>
                          {question.category || 'General'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(question.difficulty || 'Medium')}>
                          {question.difficulty || 'Medium'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{question.usage_count}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(question.created_at)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openViewDialog(question)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => openDeleteDialog(question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredQuestions.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {/* View Question Dialog, Delete Dialog, Error Dialog (unchanged) */}
      </div>

      {/* Add Question Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>Fill in the question and options, then save.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <Input
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                placeholder="Enter the question text"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Option A</label>
                <Input value={newQuestion.option_a} onChange={(e) => setNewQuestion({ ...newQuestion, option_a: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Option B</label>
                <Input value={newQuestion.option_b} onChange={(e) => setNewQuestion({ ...newQuestion, option_b: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Option C</label>
                <Input value={newQuestion.option_c} onChange={(e) => setNewQuestion({ ...newQuestion, option_c: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Option D</label>
                <Input value={newQuestion.option_d} onChange={(e) => setNewQuestion({ ...newQuestion, option_d: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correct Option</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  value={newQuestion.correct_index}
                  onChange={(e) => setNewQuestion({ ...newQuestion, correct_index: Number(e.target.value) })}
                >
                  <option value={0}>A</option>
                  <option value={1}>B</option>
                  <option value={2}>C</option>
                  <option value={3}>D</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Input value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={async () => {
              try {
                setSaving(true);
                if (!newQuestion.question || !newQuestion.option_a || !newQuestion.option_b || !newQuestion.option_c || !newQuestion.option_d) {
                  toast({ title: 'Missing fields', description: 'Please fill all options and the question.', variant: 'destructive' });
                  setSaving(false);
                  return;
                }
                const { data: insertData, error: insertError } = await supabase
                  .from('questions')
                  .insert({
                    question: newQuestion.question,
                    option_a: newQuestion.option_a,
                    option_b: newQuestion.option_b,
                    option_c: newQuestion.option_c,
                    option_d: newQuestion.option_d,
                    correct_index: newQuestion.correct_index,
                  })
                  .select('*')
                  .single();
                if (insertError) throw insertError;

                // If a quiz is selected, append to that quiz's questions with next order_index
                if (selectedQuizId && insertData?.id) {
                  const { count } = await supabase
                    .from('quiz_questions')
                    .select('*', { count: 'exact', head: true })
                    .eq('quiz_id', selectedQuizId);
                  const nextIndex = (count || 0) + 1;
                  const { error: linkError } = await supabase
                    .from('quiz_questions')
                    .insert({ quiz_id: selectedQuizId, question_id: insertData.id, order_index: nextIndex });
                  if (linkError) throw linkError;
                }

                toast({ title: 'Question added', description: 'Your question has been saved.' });
                setIsAddDialogOpen(false);
                setNewQuestion({
                  question: "",
                  option_a: "",
                  option_b: "",
                  option_c: "",
                  option_d: "",
                  correct_index: 0,
                  category: "General",
                  difficulty: "Medium"
                });
                if (selectedQuizId) {
                  fetchQuestionsForQuiz(selectedQuizId);
                } else {
                  fetchQuestions();
                }
              } catch (err: any) {
                console.error('Failed to add question', err);
                toast({ title: 'Add failed', description: err?.message || 'Unable to add question.', variant: 'destructive' });
              } finally {
                setSaving(false);
              }
            }} disabled={saving}>
              {saving ? 'Saving...' : 'Save Question'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Question Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Question Details</DialogTitle>
            <DialogDescription>
              View the complete question and its options.
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuestion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Question:</h3>
                <p className="text-gray-700">{selectedQuestion.question}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Options:</h3>
                <div className="space-y-2">
                  <div className={`p-2 rounded ${selectedQuestion.correct_index === 0 ? 'bg-green-100 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">A:</span> {selectedQuestion.option_a}
                    {selectedQuestion.correct_index === 0 && <Badge className="ml-2 bg-green-600">Correct</Badge>}
                  </div>
                  <div className={`p-2 rounded ${selectedQuestion.correct_index === 1 ? 'bg-green-100 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">B:</span> {selectedQuestion.option_b}
                    {selectedQuestion.correct_index === 1 && <Badge className="ml-2 bg-green-600">Correct</Badge>}
                  </div>
                  <div className={`p-2 rounded ${selectedQuestion.correct_index === 2 ? 'bg-green-100 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">C:</span> {selectedQuestion.option_c}
                    {selectedQuestion.correct_index === 2 && <Badge className="ml-2 bg-green-600">Correct</Badge>}
                  </div>
                  <div className={`p-2 rounded ${selectedQuestion.correct_index === 3 ? 'bg-green-100 border border-green-200' : 'bg-gray-50'}`}>
                    <span className="font-medium">D:</span> {selectedQuestion.option_d}
                    {selectedQuestion.correct_index === 3 && <Badge className="ml-2 bg-green-600">Correct</Badge>}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <Badge className={`ml-2 ${getCategoryColor(selectedQuestion.category || 'General')}`}>
                    {selectedQuestion.category || 'General'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Difficulty:</span>
                  <Badge className={`ml-2 ${getDifficultyColor(selectedQuestion.difficulty || 'Medium')}`}>
                    {selectedQuestion.difficulty || 'Medium'}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Usage:</span>
                  <span className="ml-2 font-medium">{selectedQuestion.usage_count} quizzes</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone and will remove the question from all quizzes that use it.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteQuestionId && handleDeleteQuestion(deleteQuestionId)}
            >
              Delete Question
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error Loading Questions</DialogTitle>
            <DialogDescription>{errorDialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Questions; 