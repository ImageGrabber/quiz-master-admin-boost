import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Check,
  ArrowLeft,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet-async';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
}

const EditQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (quizId) {
      loadQuizData();
    }
  }, [quizId]);

  const loadQuizData = async () => {
    try {
      setIsLoading(true);
      
      // Load quiz basic info
      const { data: quizData, error: quizError } = await supabase
        .from('user_created_quizzes')
        .select('*')
        .eq('id', quizId)
        .single();

      if (quizError) throw quizError;

      setQuizTitle(quizData.title);
      setQuizDescription(quizData.description || '');
      setIsPublic(quizData.is_public);
      setRequiresLogin(quizData.requires_login);

      // Load questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('user_quiz_questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('id');

      if (questionsError) throw questionsError;

      const formattedQuestions = questionsData.map((q: any) => ({
        id: q.id.toString(),
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_index: q.correct_index
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error loading quiz:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz data",
        variant: "destructive",
      });
      navigate('/dashboard/quizzes');
    } finally {
      setIsLoading(false);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_index: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: string | number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const validateQuiz = () => {
    if (!quizTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Quiz title is required",
        variant: "destructive",
      });
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        toast({
          title: "Validation Error",
          description: `Question ${i + 1} is required`,
          variant: "destructive",
        });
        return false;
      }
      if (!q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        toast({
          title: "Validation Error",
          description: `All options for Question ${i + 1} are required`,
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const saveQuiz = async () => {
    if (!validateQuiz()) return;

    try {
      setIsSaving(true);

      // Update quiz basic info
      const { error: quizError } = await supabase
        .from('user_created_quizzes')
        .update({
          title: quizTitle,
          description: quizDescription,
          is_public: isPublic,
          requires_login: requiresLogin,
          updated_at: new Date().toISOString()
        })
        .eq('id', quizId);

      if (quizError) throw quizError;

      // Delete existing questions
      const { error: deleteError } = await supabase
        .from('user_quiz_questions')
        .delete()
        .eq('quiz_id', quizId);

      if (deleteError) throw deleteError;

      // Insert updated questions
      const questionsToInsert = questions.map(q => ({
        quiz_id: quizId,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_index: q.correct_index
      }));

      const { error: questionsError } = await supabase
        .from('user_quiz_questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      toast({
        title: "Quiz Updated Successfully!",
        description: "Your quiz has been updated and is ready to use",
      });

      navigate('/dashboard/quizzes');
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast({
        title: "Error",
        description: "Failed to save quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quiz...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Helmet>
        <title>Edit Quiz | Bible Quiz Competition</title>
        <meta name="description" content="Edit your live quiz questions and settings" />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/quizzes')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Quizzes
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Quiz</h1>
              <p className="text-gray-600">Update your quiz questions and settings</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quiz Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Quiz Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz-description">Description (Optional)</Label>
                  <Textarea
                    id="quiz-description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Enter quiz description"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-public"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="is-public">Make quiz public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requires-login"
                      checked={requiresLogin}
                      onCheckedChange={setRequiresLogin}
                    />
                    <Label htmlFor="requires-login">Require login to participate</Label>
                  </div>
                </div>
                {!requiresLogin && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Anonymous participation enabled:</strong> Participants can join without creating an account by entering just their display name.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Questions ({questions.length})
                  </div>
                  <Button onClick={addQuestion} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Question {index + 1}</h4>
                      {questions.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label>Question</Label>
                        <Input
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter your question"
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Option A</Label>
                          <Input
                            value={question.option_a}
                            onChange={(e) => updateQuestion(question.id, 'option_a', e.target.value)}
                            placeholder="Option A"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Option B</Label>
                          <Input
                            value={question.option_b}
                            onChange={(e) => updateQuestion(question.id, 'option_b', e.target.value)}
                            placeholder="Option B"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Option C</Label>
                          <Input
                            value={question.option_c}
                            onChange={(e) => updateQuestion(question.id, 'option_c', e.target.value)}
                            placeholder="Option C"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Option D</Label>
                          <Input
                            value={question.option_d}
                            onChange={(e) => updateQuestion(question.id, 'option_d', e.target.value)}
                            placeholder="Option D"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label>Correct Answer</Label>
                        <select
                          value={question.correct_index}
                          onChange={(e) => updateQuestion(question.id, 'correct_index', parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard/quizzes')}
              >
                Cancel
              </Button>
              <Button
                onClick={saveQuiz}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Quiz
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
