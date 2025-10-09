import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useChallenge } from '@/hooks/useChallenge';
import { challengeService } from '@/lib/challengeService';
import { supabase } from '@/integrations/supabase/client';
import ChallengeNotification from './ChallengeNotification';
import { Users, Trophy, Clock, MessageSquare, UserPlus, Gamepad2, Bell } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description?: string;
  share_code: string;
}

const ChallengeInterface: React.FC = () => {
  const { toast } = useToast();
  const {
    onlineUsers,
    challengeRequests,
    challengeSessions,
    isLoadingOnlineUsers,
    isLoadingRequests,
    updateOnlineStatus,
    createChallengeRequest,
    respondToChallenge,
    cancelChallengeRequest,
    joinChallengeSession,
    updateParticipantReady,
    startChallengeSession,
    finishChallengeSession,
    submitAnswer
  } = useChallenge();

  // Notification functionality removed - using OneSignal instead

  const [user, setUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<string>('');
  const [challengeMessage, setChallengeMessage] = useState('');
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState('');
  const [incomingChallenge, setIncomingChallenge] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  // Load user and quizzes
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Try to get a proper display name from user metadata
        const displayName = user.user_metadata?.display_name || 
                           user.user_metadata?.full_name || 
                           user.user_metadata?.name ||
                           user.user_metadata?.username ||
                           user.email?.split('@')[0] || 
                           'User';
        setDisplayName(displayName);
        // Update online status
        await updateOnlineStatus(displayName, true, 'idle');
      }
    };

    const loadQuizzes = async () => {
      try {
        // First try to load from user_created_quizzes
        const { data: userQuizzes, error: userQuizzesError } = await supabase
          .from('user_created_quizzes')
          .select('id, title, description, share_code')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (userQuizzesError) {
          console.error('Error loading user quizzes:', userQuizzesError);
        }

        // If no user quizzes, try to load from main quizzes table
        let mainQuizzes = [];
        if (!userQuizzes || userQuizzes.length === 0) {
          const { data: mainQuizzesData, error: mainQuizzesError } = await supabase
            .from('quizzes')
            .select('id, title, description')
            .order('created_at', { ascending: false });

          if (mainQuizzesError) {
            console.error('Error loading main quizzes:', mainQuizzesError);
          } else {
            mainQuizzes = (mainQuizzesData || []).map(quiz => ({
              id: quiz.id.toString(),
              title: quiz.title,
              description: quiz.description,
              share_code: `QZ${quiz.id}`
            }));
          }
        }

        const allQuizzes = [...(userQuizzes || []), ...mainQuizzes];
        
        if (allQuizzes.length === 0) {
          toast({
            title: "No Quizzes Available",
            description: "No public quizzes found. Create some quizzes first or ask an admin to make quizzes public.",
            variant: "destructive",
          });
        }

        setQuizzes(allQuizzes);
      } catch (error) {
        console.error('Error loading quizzes:', error);
        toast({
          title: "Error Loading Quizzes",
          description: "An unexpected error occurred while loading quizzes.",
          variant: "destructive",
        });
      }
    };

    loadUser();
    loadQuizzes();
    
    // Clean up stale online users when component mounts
    const cleanupStaleUsers = async () => {
      try {
        await challengeService.cleanupStaleOnlineUsers();
      } catch (error) {
        console.error('Error cleaning up stale users:', error);
      }
    };
    
    cleanupStaleUsers();
  }, [updateOnlineStatus, displayName]);

  // Set up real-time notifications for incoming challenges
  useEffect(() => {
    if (!user) return;

    // Listen for challenge request notifications
    const channel = supabase
      .channel('challenge_notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'challenge_requests',
        filter: `challenged_id=eq.${user.id}`
      }, async (payload) => {
        console.log('Received challenge notification:', payload);
        setIncomingChallenge(payload.new);
        setShowNotification(true);
        
        // Notification handled by OneSignal
      })
      .subscribe();

    // Also listen for PostgreSQL notifications
    const notificationChannel = supabase
      .channel(`challenge_request_${user.id}`)
      .on('broadcast', { event: 'challenge_request' }, async (payload) => {
        console.log('Received challenge broadcast:', payload);
        setIncomingChallenge(payload);
        setShowNotification(true);
        
        // Notification handled by OneSignal
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(notificationChannel);
    };
  }, [user]);

  // Update online status when component unmounts
  useEffect(() => {
    return () => {
      if (user) {
        updateOnlineStatus(displayName, false, 'idle');
      }
    };
  }, [user, displayName, updateOnlineStatus]);

  const handleChallengeUser = async (challengedUser: any) => {
    if (!selectedQuiz) {
      toast({
        title: "No Quiz Selected",
        description: "Please select a quiz before challenging someone",
        variant: "destructive",
      });
      return;
    }

    try {
      await createChallengeRequest(challengedUser.user_id, selectedQuiz, challengeMessage);
      setShowChallengeDialog(false);
      setChallengeMessage('');
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const handleRespondToChallenge = async (challengeId: string, response: 'accepted' | 'declined') => {
    try {
      await respondToChallenge(challengeId, response);
    } catch (error) {
      console.error('Error responding to challenge:', error);
    }
  };

  const handleCancelChallenge = async (challengeId: string) => {
    try {
      await cancelChallengeRequest(challengeId);
    } catch (error) {
      console.error('Error cancelling challenge:', error);
    }
  };

  const handleAcceptChallenge = async (challengeId: string) => {
    try {
      await respondToChallenge(challengeId, 'accepted');
      setShowNotification(false);
      setIncomingChallenge(null);
      
      // Notification handled by OneSignal
      
      // Wait a moment for the challenge session to be created
      setTimeout(async () => {
        try {
          // Get the challenge sessions to find the one that was just created
          const { data: sessions } = await supabase
            .from('challenge_sessions')
            .select('id')
            .eq('challenge_request_id', challengeId)
            .single();
          
          if (sessions) {
            // Redirect to the challenge session
            window.location.href = `/challenge/${sessions.id}`;
          }
        } catch (error) {
          console.error('Error finding challenge session:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('Error accepting challenge:', error);
    }
  };

  const handleDeclineChallenge = async (challengeId: string) => {
    try {
      await respondToChallenge(challengeId, 'declined');
      setShowNotification(false);
      setIncomingChallenge(null);
      
      // Notification handled by OneSignal
    } catch (error) {
      console.error('Error declining challenge:', error);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setIncomingChallenge(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'in_quiz': return <Gamepad2 className="h-4 w-4" />;
      case 'in_challenge': return <Trophy className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Challenge Center</h1>
        <p className="text-gray-600">Challenge other players to quiz battles!</p>
      </div>

      {/* Notification handled by OneSignal */}

      <Tabs defaultValue="online" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="online">Online Players</TabsTrigger>
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Online Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOnlineUsers ? (
                <div className="text-center py-8">Loading online users...</div>
              ) : onlineUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No other players are currently online
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {onlineUsers.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {user.display_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{user.display_name}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {getActivityIcon(user.current_activity)}
                            <span className="capitalize">{user.current_activity}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowChallengeDialog(true);
                          }}
                          disabled={user.current_activity !== 'idle'}
                        >
                          Challenge
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingRequests ? (
                <div className="text-center py-8">Loading challenges...</div>
              ) : challengeRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No challenge requests
                </div>
              ) : (
                <div className="space-y-4">
                  {challengeRequests.map((request) => (
                    <Card key={request.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">
                            {request.challenger?.display_name} challenged you to "{request.quiz?.title}"
                          </div>
                          {request.message && (
                            <div className="text-sm text-gray-600 mt-1">
                              "{request.message}"
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(request.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRespondToChallenge(request.id, 'declined')}
                              >
                                Decline
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleRespondToChallenge(request.id, 'accepted')}
                              >
                                Accept
                              </Button>
                            </>
                          )}
                          {request.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancelChallenge(request.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Challenge Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {challengeSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No active challenge sessions
                </div>
              ) : (
                <div className="space-y-4">
                  {challengeSessions.map((session) => (
                    <Card key={session.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">Challenge Session</div>
                          <div className="text-sm text-gray-600">
                            Status: <Badge>{session.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(session.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              // Navigate to challenge session
                              window.location.href = `/challenge/${session.id}`;
                            }}
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Challenge Dialog */}
      <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Challenge {selectedUser?.display_name}</DialogTitle>
            <DialogDescription>
              Send a challenge request to start a quiz battle
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quiz-select">Select Quiz</Label>
              <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a quiz" />
                </SelectTrigger>
                <SelectContent>
                  {quizzes.length === 0 ? (
                    <SelectItem value="no-quizzes" disabled>
                      No public quizzes available
                    </SelectItem>
                  ) : (
                    quizzes.map((quiz) => (
                      <SelectItem key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {quizzes.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  No public quizzes are available for challenges. Create a quiz first or ask an admin to make quizzes public.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="message">Challenge Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a message to your challenge..."
                value={challengeMessage}
                onChange={(e) => setChallengeMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowChallengeDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleChallengeUser(selectedUser)}
              disabled={!selectedQuiz}
            >
              Send Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Challenge Notification Dialog */}
      {showNotification && incomingChallenge && (
        <ChallengeNotification
          challengeRequest={incomingChallenge}
          onAccept={handleAcceptChallenge}
          onDecline={handleDeclineChallenge}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default ChallengeInterface;
