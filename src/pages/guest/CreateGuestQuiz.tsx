import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, Check, ArrowLeft, BookOpen, Clock, Users } from 'lucide-react';
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

const CreateGuestQuiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const isPublic = false;
  // Guest mode is always without login
  const requiresLogin = false;
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', question: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_index: 0 }
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState<string | null>(null);
  const [showParticipantFeedback, setShowParticipantFeedback] = useState(false);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<number>(30);

  const addQuestion = () => {
    const newQuestion: Question = { id: Date.now().toString(), question: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_index: 0 };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length > 1) setQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: string | number) => {
    setQuestions(questions.map(q => (q.id === questionId ? { ...q, [field]: value } : q)));
  };

  const validateQuiz = () => {
    if (!quizTitle.trim()) {
      toast({ title: 'Validation Error', description: 'Quiz title is required', variant: 'destructive' });
      return false;
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        toast({ title: 'Validation Error', description: `Question ${i + 1} is required`, variant: 'destructive' });
        return false;
      }
      if (!q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        toast({ title: 'Validation Error', description: `All options for Question ${i + 1} are required`, variant: 'destructive' });
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

      const { data: quizData, error: quizError } = await supabase
        .from('user_created_quizzes')
        .insert({ creator_id: user?.id || null, title: quizTitle, description: quizDescription, is_public: isPublic, requires_login: requiresLogin })
        .select()
        .single();

      if (quizError) throw quizError;

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

      const { error: questionsError } = await supabase.from('user_quiz_questions').insert(questionsToInsert);
      if (questionsError) throw questionsError;

      setSavedQuizId(quizData.id);
      toast({ title: 'Quiz Created', description: 'Your guest-mode quiz is ready to host.' });
    } catch (error) {
      console.error('Error saving guest quiz:', error);
      toast({ title: 'Error', description: 'Failed to save quiz. Please try again.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const startLiveSession = () => {
    if (savedQuizId) navigate(`/live-quiz/host/${savedQuizId}?feedback=${showParticipantFeedback ? '1' : '0'}&time=${timeLimitSeconds}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <Helmet>
        <title>Create Guest Mode Live Quiz | Bible Quiz Competition</title>
        <meta name="description" content="Create a guest-mode live quiz where participants can join without accounts using display names." />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}> 
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create Live Quiz (Guest Mode)</h1>
              <p className="text-gray-600">Participants can join using display names. No login required for participants.</p>
            </div>
          </div>

          {!savedQuizId ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" /> Quiz Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Quiz Title *</Label>
                    <Input id="title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Enter quiz title..." className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} placeholder="Describe your quiz..." className="mt-1" rows={3} />
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm text-emerald-800 bg-emerald-50 p-3 rounded-md border border-emerald-100">
                      <strong>Guest Mode enabled:</strong> Participants can join your live session with just a display name. Accounts are not required.
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        id="showFeedback"
                        type="checkbox"
                        className="mt-1"
                        checked={showParticipantFeedback}
                        onChange={(e) => setShowParticipantFeedback(e.target.checked)}
                      />
                      <Label htmlFor="showFeedback" className="font-normal">
                        Show “Correct/Incorrect” feedback to participants after they answer
                        <div className="text-xs text-gray-500">Uncheck for silent mode events.</div>
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="timeLimit">Time per question (seconds)</Label>
                      <Input
                        id="timeLimit"
                        type="number"
                        min={5}
                        max={300}
                        value={timeLimitSeconds}
                        onChange={(e) => setTimeLimitSeconds(Math.max(5, Math.min(300, Number(e.target.value) || 0)))}
                        className="mt-1 max-w-[200px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Questions ({questions.length})</span>
                    <Button onClick={addQuestion} size="sm"><Plus className="w-4 h-4 mr-2" />Add Question</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Question {index + 1}</h4>
                        {questions.length > 1 && (
                          <Button variant="outline" size="sm" onClick={() => removeQuestion(question.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <Label>Question *</Label>
                        <Textarea value={question.question} onChange={(e) => updateQuestion(question.id, 'question', e.target.value)} placeholder="Enter your question..." className="mt-1" rows={2} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {['option_a', 'option_b', 'option_c', 'option_d'].map((option, optionIndex) => (
                          <div key={option}>
                            <Label>Option {String.fromCharCode(65 + optionIndex)} *</Label>
                            <Input value={question[option as keyof Question] as string} onChange={(e) => updateQuestion(question.id, option as keyof Question, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + optionIndex)}...`} className="mt-1" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <Label>Correct Answer</Label>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          {['A', 'B', 'C', 'D'].map((letter, optionIndex) => (
                            <Button key={letter} variant={question.correct_index === optionIndex ? 'default' : 'outline'} size="sm" onClick={() => updateQuestion(question.id, 'correct_index', optionIndex)} className="w-full">
                              {letter}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

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
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-green-800 mb-4">
                    <Check className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Quiz Created Successfully!</h3>
                  </div>
                  <p className="text-green-700 mb-4">Your guest-mode quiz "{quizTitle}" has been saved and is ready to host.</p>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Button onClick={startLiveSession} size="lg"><Users className="w-4 h-4 mr-2" />Start Live Session</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg">{quizTitle}</h4>
                      {quizDescription && <p className="text-gray-600">{quizDescription}</p>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{questions.length} questions</div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" />~{Math.ceil(questions.length * 0.5)} minutes</div>
                      <Badge variant={isPublic ? 'default' : 'secondary'}>{isPublic ? 'Public' : 'Private'}</Badge>
                      <Badge variant={'secondary'}>Guest Mode</Badge>
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

export default CreateGuestQuiz;


