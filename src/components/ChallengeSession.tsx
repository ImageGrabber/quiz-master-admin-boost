import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useChallenge } from '@/hooks/useChallenge';
import { useBrowserNotifications } from '@/hooks/useBrowserNotifications';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Trophy, Users, CheckCircle, XCircle, Brain } from 'lucide-react';

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

interface ChallengeSessionProps {
  challengeSessionId: string;
}

const ChallengeSession: React.FC<ChallengeSessionProps> = ({ challengeSessionId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    currentChallengeSession,
    challengeParticipants,
    challengeResults,
    updateParticipantReady,
    startChallengeSession,
    nextQuestion,
    finishChallengeSession,
    submitAnswer
  } = useChallenge({ challengeSessionId });

  const {
    permission: notificationPermission,
    isSupported: notificationsSupported,
    sendQuizCompleteNotification
  } = useBrowserNotifications();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      if (!currentChallengeSession) return;

      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', currentChallengeSession.quiz_id)
        .order('order_index');

      if (error) {
        console.error('Error loading questions:', error);
        return;
      }

      setQuestions(data || []);
      setIsLoading(false);
    };

    loadQuestions();
  }, [currentChallengeSession]);

  // Update current question
  useEffect(() => {
    if (currentChallengeSession && questions.length > 0) {
      console.log('Finding current question:', {
        currentQuestionIndex: currentChallengeSession.current_question,
        currentQuestionType: typeof currentChallengeSession.current_question,
        questionsCount: questions.length,
        questions: questions.map(q => ({ 
          id: q.id, 
          order_index: q.order_index, 
          order_index_type: typeof q.order_index,
          question: q.question 
        }))
      });
      
      // Try different matching approaches
      let question = questions.find(q => q.order_index === currentChallengeSession.current_question);
      console.log('Match by order_index === current_question:', question);
      
      if (!question) {
        // Try matching by array index (0-based)
        question = questions[currentChallengeSession.current_question];
        console.log('Match by array index:', question);
      }
      
      if (!question) {
        // Try matching by order_index === current_question + 1 (1-based)
        question = questions.find(q => q.order_index === currentChallengeSession.current_question + 1);
        console.log('Match by order_index === current_question + 1:', question);
      }
      
      console.log('Final found question:', question);
      setCurrentQuestion(question || null);
    }
  }, [currentChallengeSession, questions]);

  // Timer
  useEffect(() => {
    if (currentChallengeSession?.status === 'active' && currentQuestion) {
      setTimeLeft(30); // 30 seconds per question
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentChallengeSession?.status, currentQuestion]);

  // Auto-advance to next question
  useEffect(() => {
    if (currentChallengeSession?.status === 'active' && currentChallengeSession.current_question >= questions.length) {
      handleFinishChallenge();
    }
  }, [currentChallengeSession, questions.length]);

  // Auto-start challenge when both players are ready
  useEffect(() => {
    console.log('Auto-start check:', {
      status: currentChallengeSession?.status,
      participantsCount: challengeParticipants.length,
      participants: challengeParticipants.map(p => ({ 
        id: p.id, 
        display_name: p.display_name, 
        is_ready: p.is_ready 
      }))
    });
    
    if (currentChallengeSession?.status === 'waiting' && challengeParticipants.length >= 2) {
      const readyParticipants = challengeParticipants.filter(p => p.is_ready);
      console.log('Ready participants:', readyParticipants.length, 'out of', challengeParticipants.length);
      
      if (readyParticipants.length >= 2) {
        console.log('🚀 Both players are ready, starting challenge...');
        startChallengeSession(currentChallengeSession.id).then(() => {
          console.log('✅ Challenge started successfully');
        }).catch((error) => {
          console.error('❌ Error starting challenge:', error);
        });
      } else {
        console.log('⏳ Waiting for more players to be ready...');
      }
    }
  }, [currentChallengeSession, challengeParticipants, startChallengeSession]);

  const handleReadyToggle = async () => {
    if (!currentChallengeSession) return;

    const newReadyState = !isReady;
    setIsReady(newReadyState);
    await updateParticipantReady(currentChallengeSession.id, newReadyState);

    // If both participants are ready, start the challenge
    const readyParticipants = challengeParticipants.filter(p => p.is_ready);
    if (readyParticipants.length >= 2 && newReadyState) {
      await startChallengeSession(currentChallengeSession.id);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (!currentChallengeSession || !currentQuestion || selectedAnswer === null) return;

    const startTime = Date.now();
    const isCorrect = selectedAnswer === currentQuestion.correct_index;
    const responseTime = Date.now() - startTime;

    console.log('Submitting answer:', {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      responseTime,
      currentQuestionIndex: currentChallengeSession.current_question,
      totalQuestions: questions.length
    });

    await submitAnswer(
      currentChallengeSession.id,
      currentQuestion.id,
      selectedAnswer,
      isCorrect,
      responseTime
    );

    // Move to next question or finish challenge
    const nextQuestionIndex = currentChallengeSession.current_question + 1;
    console.log('Next question index:', nextQuestionIndex, 'Total questions:', questions.length);
    
    if (nextQuestionIndex < questions.length) {
      console.log('Moving to next question:', nextQuestionIndex);
      await nextQuestion(currentChallengeSession.id, nextQuestionIndex);
    } else {
      console.log('All questions completed, finishing challenge');
      await handleFinishChallenge();
    }

    setSelectedAnswer(null);
  };

  const handleFinishChallenge = async () => {
    if (!currentChallengeSession) return;

    await finishChallengeSession(currentChallengeSession.id);
    setShowResults(true);
    
    // Send browser notification when challenge completes
    if (notificationPermission === 'granted' && notificationsSupported) {
      try {
        // Get user's score from results
        const userResult = challengeResults.find(result => 
          challengeParticipants.find(p => p.id === result.participant_id)?.user_id === user?.id
        );
        
        if (userResult) {
          await sendQuizCompleteNotification(
            userResult.correct_answers,
            userResult.total_questions
          );
        }
      } catch (error) {
        console.error('Error sending quiz complete notification:', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentUserParticipant = () => {
    return challengeParticipants.find(p => p.user_id === user?.id);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center py-8">
          <div>Loading challenge session...</div>
          <div className="text-sm text-gray-500 mt-2">
            Session ID: {challengeSessionId}
          </div>
          <div className="text-sm text-gray-500">
            Current Session: {currentChallengeSession ? 'Found' : 'Not found'}
          </div>
        </div>
      </div>
    );
  }

  if (!currentChallengeSession) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Challenge Session Not Found</h2>
          <Button onClick={() => navigate('/challenge')}>
            Back to Challenge Center
          </Button>
        </div>
      </div>
    );
  }

  if (showResults || currentChallengeSession.status === 'finished') {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Challenge Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {challengeResults.length === 0 ? (
              <div className="text-center py-8">Calculating results...</div>
            ) : (
              <div className="space-y-4">
                {challengeResults.map((result, index) => {
                  // Check if this result belongs to the current user
                  const isCurrentUser = result.participant_id && user?.id && 
                    challengeParticipants.find(p => p.id === result.participant_id)?.user_id === user.id;
                  
                  const displayName = isCurrentUser ? 'Your score' : 'Challenger score';
                  const avatarLetter = isCurrentUser ? 'Y' : 'C';
                  
                  return (
                    <Card key={result.id} className={`p-4 ${index === 0 ? 'border-yellow-400 bg-yellow-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold">
                            #{result.rank}
                          </div>
                          <Avatar>
                            <AvatarFallback>
                              {avatarLetter}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {displayName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.correct_answers}/{result.total_questions} correct
                            </div>
                          </div>
                        </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{result.total_score} pts</div>
                        <div className="text-sm text-gray-600">
                          {Math.round(result.average_response_time / 1000)}s avg
                        </div>
                      </div>
                    </div>
                  </Card>
                  );
                })}
              </div>
            )}
            <div className="mt-6 flex gap-4">
              <Button onClick={() => navigate('/challenge')}>
                Back to Challenge Center
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Challenge Battle</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Status: <Badge>{currentChallengeSession.status}</Badge></span>
          <span>Question {currentChallengeSession.current_question + 1} of {currentChallengeSession.total_questions}</span>
        </div>
      </div>

      {/* Participants */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Participants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {challengeParticipants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {participant.display_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{participant.display_name}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {participant.is_ready ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>{participant.is_ready ? 'Ready' : 'Not Ready'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {currentChallengeSession.status === 'waiting' && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Waiting for Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="mb-4">All participants must be ready to start the challenge</p>
              <Button
                onClick={handleReadyToggle}
                variant={isReady ? "destructive" : "default"}
                size="lg"
              >
                {isReady ? 'Not Ready' : 'I\'m Ready'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentChallengeSession.status === 'active' && currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Question {currentChallengeSession.current_question + 1}
              </CardTitle>
              <div className="flex items-center gap-2 text-lg font-mono">
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={(timeLeft / 30) * 100} className="w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium">
                {currentQuestion.question}
              </div>
              
              <div className="grid gap-3">
                {[
                  { index: 0, option: currentQuestion.option_a, label: 'A' },
                  { index: 1, option: currentQuestion.option_b, label: 'B' },
                  { index: 2, option: currentQuestion.option_c, label: 'C' },
                  { index: 3, option: currentQuestion.option_d, label: 'D' }
                ].map(({ index, option, label }) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="justify-start h-auto p-4 text-left"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="font-bold mr-3">{label}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  size="lg"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChallengeSession;
