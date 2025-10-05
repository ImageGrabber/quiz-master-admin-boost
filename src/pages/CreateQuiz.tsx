import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Share2, 
  Copy,
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

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_index: 0
    }
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState<string | null>(null);
  const [shareCode, setShareCode] = useState('');

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

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to create a quiz",
          variant: "destructive",
        });
        return;
      }

      // Create the quiz
      const { data: quizData, error: quizError } = await supabase
        .from('user_created_quizzes')
        .insert({
          creator_id: user.id,
          title: quizTitle,
          description: quizDescription,
          is_public: isPublic,
          requires_login: requiresLogin
        })
        .select()
        .single();

      if (quizError) throw quizError;

      // Create questions
      const questionsToInsert = questions.map((q, index) => ({
        quiz_id: quizData.id,
        question: q.question,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_index: q.correct_index,
        order_index: index
      }));

      const { error: questionsError } = await supabase
        .from('user_quiz_questions')
        .insert(questionsToInsert);

      if (questionsError) throw questionsError;

      setSavedQuizId(quizData.id);
      setShareCode(quizData.share_code);

      toast({
        title: "Quiz Created Successfully!",
        description: "Your quiz has been saved and is ready to share",
      });

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

  const copyShareCode = () => {
    navigator.clipboard.writeText(`${window.location.origin}/live-quiz/join/${shareCode}`);
    toast({
      title: "Link Copied!",
      description: "Share this link with your friends to join the quiz",
    });
  };

  const startLiveSession = () => {
    if (savedQuizId) {
      navigate(`/live-quiz/host/${savedQuizId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Create Live Quiz | Bible Quiz Competition</title>
        <meta name="description" content="Create your own live quiz and challenge friends in real-time. Build custom Bible quizzes and host live sessions." />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Live Quiz</h1>
              <p className="text-gray-600">Build your own quiz and challenge friends in real-time</p>
            </div>
          </div>

          {!savedQuizId ? (
            <div className="space-y-6">
              {/* Quiz Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Quiz Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Quiz Title *</Label>
                    <Input
                      id="title"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="Enter quiz title..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={quizDescription}
                      onChange={(e) => setQuizDescription(e.target.value)}
                      placeholder="Describe your quiz..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="public"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                      />
                      <Label htmlFor="public">Make quiz public (others can find and use it)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requires-login"
                        checked={requiresLogin}
                        onCheckedChange={setRequiresLogin}
                      />
                      <Label htmlFor="requires-login">Require login to participate in live quiz</Label>
                    </div>
                    
                    {!requiresLogin && (
                      <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                        <strong>Anonymous participation enabled:</strong> Anyone can join your live quiz sessions without creating an account. 
                        They'll only need to enter a display name.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Questions ({questions.length})</span>
                    <Button onClick={addQuestion} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Question {index + 1}</h4>
                        {questions.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div>
                        <Label>Question *</Label>
                        <Textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          placeholder="Enter your question..."
                          className="mt-1"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {['option_a', 'option_b', 'option_c', 'option_d'].map((option, optionIndex) => (
                          <div key={option}>
                            <Label>Option {String.fromCharCode(65 + optionIndex)} *</Label>
                            <Input
                              value={question[option as keyof Question] as string}
                              onChange={(e) => updateQuestion(question.id, option as keyof Question, e.target.value)}
                              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}...`}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <Label>Correct Answer</Label>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          {['A', 'B', 'C', 'D'].map((letter, optionIndex) => (
                            <Button
                              key={letter}
                              variant={question.correct_index === optionIndex ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateQuestion(question.id, 'correct_index', optionIndex)}
                              className="w-full"
                            >
                              {letter}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={saveQuiz} disabled={isSaving} size="lg">
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Quiz
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-green-800 mb-4">
                    <Check className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Quiz Created Successfully!</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Your quiz "{quizTitle}" has been saved and is ready to use.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Share Code: {shareCode}</Badge>
                      <Button variant="outline" size="sm" onClick={copyShareCode}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button onClick={startLiveSession} size="lg">
                        <Users className="w-4 h-4 mr-2" />
                        Start Live Session
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/my-quizzes')} size="lg">
                        <Eye className="w-4 h-4 mr-2" />
                        View My Quizzes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg">{quizTitle}</h4>
                      {quizDescription && (
                        <p className="text-gray-600">{quizDescription}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {questions.length} questions
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ~{Math.ceil(questions.length * 0.5)} minutes
                      </div>
                      <Badge variant={isPublic ? "default" : "secondary"}>
                        {isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
