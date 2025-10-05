import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Play, 
  Pause, 
  Square, 
  Copy, 
  Share2, 
  Clock, 
  Trophy,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet-async';

interface Participant {
  id: string;
  display_name: string;
  is_ready: boolean;
  joined_at: string;
}

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
  order_index: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  share_code: string;
}

const LiveQuizHost = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionCode, setSessionCode] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sessionStatus, setSessionStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  // Load quiz data
  useEffect(() => {
    if (quizId) {
      loadQuizData();
    }
  }, [quizId]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (sessionId) {
      const participantsChannel = supabase
        .channel(`live_quiz_participants_${sessionId}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'live_quiz_participants',
          filter: `session_id=eq.${sessionId}`
        }, (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            loadParticipants();
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(participantsChannel);
      };
    }
  }, [sessionId]);

  const loadQuizData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }

      // Load quiz details
      const { data: quizData, error: quizError } = await supabase
        .from('user_created_quizzes')
        .select('*, requires_login')
        .eq('id', quizId)
        .eq('creator_id', user.id)
        .single();

      if (quizError) throw quizError;
      setQuiz(quizData);

      // Load questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('user_quiz_questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('order_index');

      if (questionsError) throw questionsError;
      setQuestions(questionsData);

      // Create or get existing session
      await createOrGetSession(quizData);

    } catch (error) {
      console.error('Error loading quiz:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz data",
        variant: "destructive",
      });
      navigate('/my-quizzes');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a unique 8-character session code
  const generateSessionCode = async (): Promise<string> => {
    const generateCode = () => {
      // Generate exactly 8 characters using a more reliable method
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let code = generateCode();
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      // Check if code already exists
      const { data: existing } = await supabase
        .from('live_quiz_sessions')
        .select('id')
        .eq('session_code', code)
        .single();

      if (!existing) {
        return code;
      }

      code = generateCode();
      attempts++;
    }

    // Fallback: use timestamp-based code if we can't find a unique random one
    // Ensure exactly 8 characters by taking the last 8 characters
    const timestampCode = Date.now().toString(36).toUpperCase();
    return timestampCode.slice(-8).padStart(8, '0');
  };

  const createOrGetSession = async (quizData: Quiz) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check for existing active session
      const { data: existingSession } = await supabase
        .from('live_quiz_sessions')
        .select('*')
        .eq('quiz_id', quizId)
        .eq('host_id', user.id)
        .in('status', ['waiting', 'active'])
        .single();

      if (existingSession) {
        setSessionId(existingSession.id);
        setSessionCode(existingSession.session_code);
        setSessionStatus(existingSession.status);
        setCurrentQuestion(existingSession.current_question);
        await loadParticipants();
        return;
      }

      // Generate a unique 8-character session code
      const sessionCode = await generateSessionCode();
      console.log('🔍 DEBUG: Generated session code:', sessionCode, 'Length:', sessionCode.length);
      console.log('🔍 DEBUG: About to insert with code:', sessionCode);

      // Create new session with the generated code
      const { data: sessionData, error: sessionError } = await supabase
        .from('live_quiz_sessions')
        .insert({
          quiz_id: quizId,
          host_id: user.id,
          session_code: sessionCode,
          title: quizData.title,
          total_questions: questions.length,
          time_limit: 30,
          requires_login: quizData.requires_login
        })
        .select()
        .single();

      console.log('🔍 DEBUG: Session created with code:', sessionData?.session_code, 'Length:', sessionData?.session_code?.length);
      console.log('🔍 DEBUG: Code changed by database?', sessionCode !== sessionData?.session_code);
      console.log('🔍 DEBUG: Original code:', sessionCode);
      console.log('🔍 DEBUG: Database returned:', sessionData?.session_code);

      if (sessionError) throw sessionError;

      setSessionId(sessionData.id);
      setSessionCode(sessionData.session_code);
      setSessionStatus('waiting');

    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create quiz session",
        variant: "destructive",
      });
    }
  };

  const loadParticipants = async () => {
    if (!sessionId) return;

    try {
      const { data, error } = await supabase
        .from('live_quiz_participants')
        .select('*')
        .eq('session_id', sessionId)
        .order('joined_at');

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error loading participants:', error);
    }
  };

  const startQuiz = async () => {
    if (!sessionId) return;

    try {
      const { error } = await supabase
        .from('live_quiz_sessions')
        .update({
          status: 'active',
          started_at: new Date().toISOString(),
          current_question: 0
        })
        .eq('id', sessionId);

      if (error) throw error;

      setSessionStatus('active');
      setCurrentQuestion(0);
      setTimeLeft(30);

      toast({
        title: "Quiz Started!",
        description: "The quiz is now live and participants can answer questions",
      });

    } catch (error) {
      console.error('Error starting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to start quiz",
        variant: "destructive",
      });
    }
  };

  const nextQuestion = async () => {
    if (!sessionId || currentQuestion >= questions.length - 1) {
      await finishQuiz();
      return;
    }

    try {
      const nextQ = currentQuestion + 1;
      const { error } = await supabase
        .from('live_quiz_sessions')
        .update({
          current_question: nextQ
        })
        .eq('id', sessionId);

      if (error) throw error;

      setCurrentQuestion(nextQ);
      setTimeLeft(30);
      setShowAnswers(false);

    } catch (error) {
      console.error('Error moving to next question:', error);
    }
  };

  const finishQuiz = async () => {
    if (!sessionId) return;

    try {
      console.log('Finishing quiz for session:', sessionId);

      // Update session status to finished (do this first)
      const { error: sessionError } = await supabase
        .from('live_quiz_sessions')
        .update({
          status: 'finished',
          ended_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (sessionError) {
        console.error('Session update error:', sessionError);
        throw sessionError;
      }

      console.log('Session status updated to finished');

      // Try to calculate results (optional - don't fail if this doesn't work)
      try {
        console.log('Attempting to calculate results for session:', sessionId);
        const { data: resultsData, error: resultsError } = await supabase.rpc('calculate_quiz_results', {
          session_uuid: sessionId
        });

        console.log('Results calculation response:', { resultsData, resultsError });

        if (resultsError) {
          console.warn('Results calculation failed (this is optional):', resultsError);
        } else {
          console.log('Results calculated successfully:', resultsData);
        }
      } catch (resultsError) {
        console.warn('Results calculation failed (this is optional):', resultsError);
      }

      setSessionStatus('finished');

      // Load results after finishing
      await loadResults();

      toast({
        title: "Quiz Finished!",
        description: "The quiz has been completed successfully",
      });

    } catch (error) {
      console.error('Error finishing quiz:', error);
      toast({
        title: "Error",
        description: "Failed to finish quiz",
        variant: "destructive",
      });
    }
  };

  const copySessionCode = () => {
    navigator.clipboard.writeText(sessionCode);
    toast({
      title: "Code Copied!",
      description: "Share this code with participants to join",
    });
  };

  const loadResults = async () => {
    if (!sessionId) return;

    try {
      console.log('Loading results for session:', sessionId);
      
      const { data, error } = await supabase
        .from('live_quiz_results')
        .select('*')
        .eq('session_id', sessionId)
        .order('score', { ascending: false })
        .limit(3);

      console.log('Results query result:', { data, error });

      if (error) {
        console.error('Results query error:', error);
        throw error;
      }
      
      console.log('Setting results:', data);
      setResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  const copyJoinLink = () => {
    const link = `${window.location.origin}/live-quiz/join/${sessionCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied!",
      description: "Share this link with participants to join",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz session...</p>
        </div>
      </div>
    );
  }

  if (!quiz || !sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quiz Not Found</h2>
          <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist or you don't have permission to host it.</p>
          <Button onClick={() => navigate('/my-quizzes')}>
            Back to My Quizzes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Host Live Quiz | {quiz.title}</title>
        <meta name="description" content={`Host live quiz: ${quiz.title}`} />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Session Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        sessionStatus === 'waiting' ? 'secondary' :
                        sessionStatus === 'active' ? 'default' : 'destructive'
                      }>
                        {sessionStatus === 'waiting' ? 'Waiting for Participants' :
                         sessionStatus === 'active' ? 'Quiz Active' : 'Quiz Finished'}
                      </Badge>
                      {sessionStatus === 'active' && (
                        <span className="text-sm text-gray-500">
                          Question {currentQuestion + 1} of {questions.length}
                        </span>
                      )}
                    </div>
                    {sessionStatus === 'active' && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
                        <div className="text-sm text-gray-500">Time Remaining</div>
                      </div>
                    )}
                  </div>

                  {sessionStatus === 'waiting' && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Share the session code or link below with participants to join the quiz.
                      </p>
                      <div className="flex gap-2">
                        <Button onClick={startQuiz} disabled={participants.length === 0}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Quiz
                        </Button>
                        <Button variant="outline" onClick={() => setShowAnswers(!showAnswers)}>
                          {showAnswers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                          {showAnswers ? 'Hide' : 'Show'} Answers
                        </Button>
                      </div>
                    </div>
                  )}

                  {sessionStatus === 'active' && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button onClick={nextQuestion} disabled={currentQuestion >= questions.length - 1}>
                          Next Question
                        </Button>
                        <Button variant="outline" onClick={finishQuiz}>
                          <Square className="w-4 h-4 mr-2" />
                          End Quiz
                        </Button>
                      </div>
                    </div>
                  )}

                  {sessionStatus === 'finished' && (
                    <div className="text-center py-4">
                      <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Completed!</h3>
                      <p className="text-gray-600 mb-4">Results have been calculated and shared with participants.</p>
                      
                      {results.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-md font-semibold text-gray-800 mb-3">🏆 Top 3 Results</h4>
                          <div className="space-y-2">
                            {results.map((result, index) => (
                              <div key={result.id} className={`flex items-center justify-between p-3 rounded-lg ${
                                index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' :
                                index === 1 ? 'bg-gray-50 border-2 border-gray-200' :
                                'bg-orange-50 border-2 border-orange-200'
                              }`}>
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                    index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-500' :
                                    'bg-orange-500'
                                  }`}>
                                    {index + 1}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{result.participant_name || 'Participant'}</div>
                                    <div className="text-sm text-gray-600">
                                      {result.correct_answers}/{result.total_questions} correct
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">{result.score.toFixed(1)}%</div>
                                  <div className="text-xs text-gray-500">
                                    {result.average_response_time.toFixed(1)}s avg
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Question */}
              {sessionStatus === 'active' && questions[currentQuestion] && (
                <Card>
                  <CardHeader>
                    <CardTitle>Question {currentQuestion + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
                          <div key={option} className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                              <span>{questions[currentQuestion][option as keyof Question] as string}</span>
                              {showAnswers && questions[currentQuestion].correct_index === index && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Session Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Session Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Session Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input value={sessionCode} readOnly className="font-mono" />
                      <Button size="sm" onClick={copySessionCode}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Join Link</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        value={`${window.location.origin}/live-quiz/join/${sessionCode}`} 
                        readOnly 
                        className="text-xs font-mono flex-1 min-w-0" 
                        style={{ fontSize: '11px' }}
                      />
                      <Button size="sm" onClick={copyJoinLink}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {participants.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No participants yet</p>
                  ) : (
                    <div className="space-y-2">
                      {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-2 border rounded">
                          <span className="font-medium">{participant.display_name}</span>
                          <div className="flex items-center gap-2">
                            {participant.is_ready ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                            <Badge variant={participant.is_ready ? "default" : "secondary"}>
                              {participant.is_ready ? "Ready" : "Waiting"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveQuizHost;
