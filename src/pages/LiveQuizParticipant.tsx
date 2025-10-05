import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Play,
  ArrowRight,
  Crown
} from 'lucide-react';
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

interface Session {
  id: string;
  title: string;
  status: string;
  current_question: number;
  total_questions: number;
  time_limit: number;
  show_participant_feedback?: boolean;
}

interface Result {
  rank?: number;
  score: number;
  correct_answers: number;
  total_questions: number;
  average_response_time: number;
}

const LiveQuizParticipant = () => {
  const { sessionCode } = useParams<{ sessionCode: string }>();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [awaitingResults, setAwaitingResults] = useState(false);

  // Load session data
  useEffect(() => {
    if (sessionCode) {
      loadSessionData();
    }
  }, [sessionCode]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (session?.id) {
      const sessionChannel = supabase
        .channel(`live_quiz_session_${session.id}`)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_quiz_sessions',
          filter: `id=eq.${session.id}`
        }, (payload) => {
          console.log('Session update received:', payload);
          const updatedSession = payload.new as Session;
          setSession(updatedSession);
          
          if (updatedSession.status === 'active' && updatedSession.current_question !== currentQuestion?.order_index) {
            console.log('Session became active, loading question:', updatedSession.current_question);
            setAwaitingResults(false);
            loadCurrentQuestion(updatedSession.current_question);
          }
          
          if (updatedSession.status === 'finished') {
            console.log('Session finished, loading results');
            setAwaitingResults(false);
            loadResults();
          }
        })
        .subscribe();

      const participantsChannel = supabase
        .channel(`live_quiz_participants_${session.id}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'live_quiz_participants',
          filter: `session_id=eq.${session.id}`
        }, () => {
          loadParticipants();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(sessionChannel);
        supabase.removeChannel(participantsChannel);
      };
    }
  }, [session?.id]);

  // Local countdown for current question
  useEffect(() => {
    if (session?.status === 'active' && currentQuestion && !showResults) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1 && selectedAnswer == null) {
            // Auto-submit a guaranteed incorrect answer within [0..3] to represent timeout
            const wrongIndex = ((currentQuestion.correct_index + 1) % 4);
            submitAnswer(wrongIndex, true);
            return 0;
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session?.status, currentQuestion?.id, showResults, selectedAnswer]);

  const loadSessionData = async () => {
    try {
      // Try a simpler query first to debug the 406 error
      console.log('Attempting to load session with code:', sessionCode);
      
      // First try without the join to see if basic session lookup works
      const { data: basicSessionData, error: basicError } = await supabase
        .from('live_quiz_sessions')
        .select('*, requires_login')
        .eq('session_code', sessionCode)
        .single();

      console.log('Basic session query result:', { basicSessionData, basicError });

      if (basicError) {
        throw basicError;
      }

      // If basic query works, try to get the quiz data separately
      const { data: quizData, error: quizError } = await supabase
        .from('user_created_quizzes')
        .select('*')
        .eq('id', basicSessionData.quiz_id)
        .single();

      console.log('Quiz query result:', { quizData, quizError });

      if (quizError) {
        throw quizError;
      }

      // Combine the data manually
      const sessionData = {
        ...basicSessionData,
        quiz: quizData
      };

      if (sessionData.status === 'finished') {
        setSession(sessionData);
        await loadResults();
        return;
      }

      setSession(sessionData);
      console.log('Session loaded:', sessionData);

      // Load questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('user_quiz_questions')
        .select('*')
        .eq('quiz_id', sessionData.quiz_id)
        .order('order_index');

      console.log('Questions loaded:', questionsData, 'Error:', questionsError);
      if (questionsError) throw questionsError;
      setQuestions(questionsData);

      // Load current question if session is active
      if (sessionData.status === 'active') {
        console.log('Session is active, loading current question:', sessionData.current_question);
        await loadCurrentQuestion(sessionData.current_question);
      } else {
        console.log('Session status:', sessionData.status, 'Not loading current question');
      }

      await loadParticipants();

    } catch (error) {
      console.error('Error loading session:', error);
      console.error('Session code:', sessionCode);
      console.error('Full error object:', error);
      
      // Provide more specific error messages
      let errorTitle = "Session Not Found";
      let errorDescription = "The quiz session you're looking for doesn't exist or has ended";
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error code:', (error as any).code);
        
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          errorTitle = "Database Setup Required";
          errorDescription = "The live quiz feature requires database setup. Please contact the administrator.";
        } else if (error.message.includes('PGRST116')) {
          errorTitle = "Session Not Found";
          errorDescription = "No quiz session found with this code. Please check the code and try again.";
        } else if (error.message.includes('permission denied') || error.message.includes('insufficient_privilege')) {
          errorTitle = "Permission Denied";
          errorDescription = "You don't have permission to access this session. This might be due to database security settings.";
        } else if (error.message.includes('infinite recursion')) {
          errorTitle = "Database Configuration Issue";
          errorDescription = "There's a database configuration issue. Please contact the administrator.";
        } else {
          errorDescription = `Error: ${error.message}`;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentQuestion = async (questionIndex: number) => {
    console.log('Loading current question:', questionIndex, 'Questions length:', questions.length);
    
    // Set question start time when question loads
    setQuestionStartTime(Date.now());
    
    if (questions.length > 0 && questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex]);
      setSelectedAnswer(null);
      setTimeLeft(10);
      setQuestionStartTime(Date.now());
    } else {
      console.log('Cannot load question - questions not loaded or index out of bounds');
      // If questions aren't loaded yet, try to load them
      if (questions.length === 0 && session?.quiz_id) {
        console.log('Reloading questions for quiz:', session.quiz_id);
        const { data: questionsData, error: questionsError } = await supabase
          .from('user_quiz_questions')
          .select('*')
          .eq('quiz_id', session.quiz_id)
          .order('order_index');

        if (!questionsError && questionsData) {
          setQuestions(questionsData);
          if (questionIndex < questionsData.length) {
            setCurrentQuestion(questionsData[questionIndex]);
            setSelectedAnswer(null);
            setTimeLeft(10);
            setQuestionStartTime(Date.now());
          }
        }
      }
    }
  };

  const loadParticipants = async () => {
    if (!session?.id) return;

    try {
      const { data, error } = await supabase
        .from('live_quiz_participants')
        .select('*')
        .eq('session_id', session.id)
        .order('joined_at');

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error loading participants:', error);
    }
  };

  const loadResults = async () => {
    if (!session?.id || !participantId) return;

    try {
      console.log('Loading results for session:', session.id, 'participant:', participantId);
      
      // First, get the participant's result
      const { data: participantResult, error: participantError } = await supabase
        .from('live_quiz_results')
        .select('*')
        .eq('session_id', session.id)
        .eq('participant_id', participantId)
        .single();

      if (participantError) {
        console.error('Error loading participant results:', participantError);
        // Try to load results with a delay if they're not ready yet
        setTimeout(() => loadResults(), 2000);
        return;
      }

      // Get all results for this session to calculate rank
      const { data: allResults, error: allResultsError } = await supabase
        .from('live_quiz_results')
        .select('*')
        .eq('session_id', session.id)
        .order('score', { ascending: false });

      if (allResultsError) {
        console.error('Error loading all results:', allResultsError);
        setResults(participantResult);
        setShowResults(true);
        return;
      }

      // Calculate rank based on score (higher score = better rank)
      const rank = allResults.findIndex(result => result.participant_id === participantId) + 1;
      
      const resultsWithRank = {
        ...participantResult,
        rank: rank
      };
      
      console.log('Results loaded with rank:', resultsWithRank);
      console.log('All results for comparison:', allResults);
      setResults(resultsWithRank);
      setShowResults(true);
    } catch (error) {
      console.error('Error loading results:', error);
      // Set showResults to true even if results fail to load
      setShowResults(true);
    }
  };

  const joinSession = async () => {
    if (!displayName.trim() || !session?.id) return;
    // Block joining if session already started or finished
    if (session.status !== 'waiting') return;

    try {
      // Check if session requires login
      if (session.requires_login) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication Required",
            description: "This quiz requires you to be logged in to participate",
            variant: "destructive",
          });
          navigate('/auth/login');
          return;
        }

        // Join with authentication
        const { data, error } = await supabase
          .from('live_quiz_participants')
          .insert({
            session_id: session.id,
            user_id: user.id,
            display_name: displayName.trim()
          })
          .select()
          .single();

        if (error) throw error;
        setParticipantId(data.id);
      } else {
        // Join without authentication (anonymous)
        const { data, error } = await supabase
          .from('live_quiz_participants')
          .insert({
            session_id: session.id,
            user_id: null, // Anonymous user
            display_name: displayName.trim()
          })
          .select()
          .single();

        if (error) throw error;
        setParticipantId(data.id);
      }

      setHasJoined(true);

      toast({
        title: "Joined Successfully!",
        description: "You've joined the quiz session. Wait for the host to start.",
      });

    } catch (error) {
      console.error('Error joining session:', error);
      toast({
        title: "Error",
        description: "Failed to join session. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleReady = async () => {
    if (!participantId) return;

    try {
      const { error } = await supabase
        .from('live_quiz_participants')
        .update({ is_ready: !isReady })
        .eq('id', participantId);

      if (error) throw error;

      setIsReady(!isReady);

    } catch (error) {
      console.error('Error updating ready status:', error);
    }
  };

  const submitAnswer = async (answerIndex: number, silent = false) => {
    if (!participantId || !currentQuestion || isSubmitting) return;

    setIsSubmitting(true);
    const responseTime = Date.now() - questionStartTime;

    try {
      const { error } = await supabase
        .from('live_quiz_answers')
        .insert({
          session_id: session?.id,
          participant_id: participantId,
          question_id: currentQuestion.id,
          answer_index: answerIndex,
          is_correct: answerIndex === currentQuestion.correct_index,
          response_time: responseTime
        });

      if (error) throw error;

      const isLastQuestion = !!session && session.current_question >= session.total_questions - 1;
      if (!silent && !isLastQuestion) {
        setSelectedAnswer(answerIndex);
      } else {
        // On last question or silent submit: go straight to awaiting results and keep UI neutral
        setSelectedAnswer(null);
        if (isLastQuestion) {
          setAwaitingResults(true);
        }
      }

    } catch (error) {
      console.error('Error submitting answer:', error);
      // no toasts on participant page
    } finally {
      setIsSubmitting(false);
    }
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

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Session Not Found</h2>
          <p className="text-gray-600 mb-4">The quiz session you're looking for doesn't exist or has ended.</p>
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Join Live Quiz | {session.title}</title>
        <meta name="description" content={`Join live quiz: ${session.title}`} />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{session.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {participants.length} participants
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {session.total_questions} questions
              </div>
            </div>
          </div>

          {/* Join Form - only when session is waiting */}
          {!hasJoined && session.status === 'waiting' && (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Join Quiz Session</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name..."
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={joinSession} 
                  disabled={!displayName.trim()}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Join Session
                </Button>
              </CardContent>
            </Card>
          )}

          {/* If session already started or finished, show info instead of join */}
          {!hasJoined && session.status !== 'waiting' && (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Quiz In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">This session has already started or finished. New participants cannot join now.</p>
              </CardContent>
            </Card>
          )}

          {/* Waiting Room */}
          {hasJoined && session.status === 'waiting' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">Waiting for Quiz to Start</span>
                    </div>
                    <p className="text-gray-600">
                      The host will start the quiz when everyone is ready.
                    </p>
                    <Button 
                      onClick={toggleReady}
                      variant={isReady ? "default" : "outline"}
                      className="w-full max-w-xs"
                    >
                      {isReady ? "I'm Ready!" : "Mark as Ready"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Participants List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
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
                </CardContent>
              </Card>
            </div>
          )}

          {/* Active Quiz */}
          {hasJoined && session.status === 'active' && currentQuestion && !awaitingResults && (
            <div className="space-y-6">
              {/* Question Progress */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      Question {session.current_question + 1} of {session.total_questions}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
                      <div className="text-sm text-gray-500">Time Remaining</div>
                    </div>
                  </div>
                  {/* Removed visual countdown slider per requirements */}
                </CardContent>
              </Card>

              {/* Current Question */}
              <Card>
                <CardHeader>
                  <CardTitle>Question {session.current_question + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg font-medium">{currentQuestion.question}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
                      <Button
                        key={option}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="p-4 h-auto text-left justify-start"
                        onClick={() => !selectedAnswer && submitAnswer(index)}
                        disabled={!!selectedAnswer || isSubmitting}
                      >
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                        <span>{currentQuestion[option as keyof Question] as string}</span>
                      </Button>
                    ))}
                  </div>

                  {/* Show manual feedback only if host enabled it */}
                  {selectedAnswer !== null && session.show_participant_feedback && (
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        selectedAnswer === currentQuestion.correct_index 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedAnswer === currentQuestion.correct_index ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                        <span className="font-semibold">
                          {selectedAnswer === currentQuestion.correct_index ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quiz Finished - Waiting for Results */}
          {(awaitingResults || (hasJoined && session.status === 'finished' && !showResults)) && (
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-900">Quiz Finished!</h2>
                    <p className="text-gray-600">Thank you for participating! {awaitingResults ? 'Awaiting results from host...' : 'The quiz has ended and results are being calculated.'}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      <span>Calculating results...</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button onClick={() => navigate('/')} size="lg">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          )}

          {/* Quiz Finished - No Results Available */}
          {hasJoined && session.status === 'finished' && showResults && !results && (
            <div className="space-y-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Trophy className="w-16 h-16 text-blue-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-900">Quiz Completed!</h2>
                    <p className="text-gray-600">
                      Great job! You've completed the quiz. Results will be shared by the host.
                    </p>
                    <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Thank you for participating!</strong> The quiz host will share the final results and leaderboard.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button onClick={() => navigate('/')} size="lg">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {hasJoined && session.status === 'finished' && showResults && results && (
            <div className="space-y-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-900">Quiz Completed!</h2>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-blue-600">
                        Rank #{results.rank || '?'}
                      </div>
                      <div className="text-lg text-gray-600">
                        {results.correct_answers} / {results.total_questions} correct
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        Score: {results.score.toFixed(1)} points
                      </div>
                      <div className="text-sm text-gray-500">
                        Average response time: {Math.round(results.average_response_time / 1000)}s
                      </div>
                      <div className="text-xs text-gray-400">
                        Faster answers earn more points!
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button onClick={() => navigate('/')} size="lg">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveQuizParticipant;
