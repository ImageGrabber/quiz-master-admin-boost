import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { challengeService, OnlineUser, ChallengeRequest, ChallengeSession, ChallengeParticipant, ChallengeResult } from '@/lib/challengeService';

interface UseChallengeOptions {
  autoConnect?: boolean;
  challengeSessionId?: string;
}

interface UseChallengeReturn {
  // Online users
  onlineUsers: OnlineUser[];
  isLoadingOnlineUsers: boolean;
  
  // Challenge requests
  challengeRequests: ChallengeRequest[];
  isLoadingRequests: boolean;
  
  // Challenge sessions
  challengeSessions: ChallengeSession[];
  currentChallengeSession: ChallengeSession | null;
  challengeParticipants: ChallengeParticipant[];
  challengeResults: ChallengeResult[];
  
  // Loading states
  isLoading: boolean;
  isConnecting: boolean;
  
  // Actions
  updateOnlineStatus: (displayName: string, isAvailable?: boolean, activity?: 'idle' | 'in_quiz' | 'in_challenge') => Promise<void>;
  createChallengeRequest: (challengedUserId: string, quizId: string, message?: string) => Promise<ChallengeRequest | null>;
  respondToChallenge: (challengeRequestId: string, response: 'accepted' | 'declined') => Promise<void>;
  cancelChallengeRequest: (challengeRequestId: string) => Promise<void>;
  joinChallengeSession: (challengeSessionId: string, displayName: string) => Promise<ChallengeParticipant | null>;
  updateParticipantReady: (challengeSessionId: string, isReady: boolean) => Promise<void>;
  startChallengeSession: (challengeSessionId: string) => Promise<void>;
  nextQuestion: (challengeSessionId: string, questionIndex: number) => Promise<void>;
  finishChallengeSession: (challengeSessionId: string) => Promise<void>;
  submitAnswer: (challengeSessionId: string, questionId: string, answerIndex: number, isCorrect: boolean, responseTime: number) => Promise<void>;
  
  // Utility
  disconnect: () => void;
}

export const useChallenge = (options: UseChallengeOptions = {}): UseChallengeReturn => {
  const { autoConnect = true, challengeSessionId } = options;
  const { toast } = useToast();
  
  // State
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [challengeRequests, setChallengeRequests] = useState<ChallengeRequest[]>([]);
  const [challengeSessions, setChallengeSessions] = useState<ChallengeSession[]>([]);
  const [currentChallengeSession, setCurrentChallengeSession] = useState<ChallengeSession | null>(null);
  const [challengeParticipants, setChallengeParticipants] = useState<ChallengeParticipant[]>([]);
  const [challengeResults, setChallengeResults] = useState<ChallengeResult[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingOnlineUsers, setIsLoadingOnlineUsers] = useState(false);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  // Load initial data
  const loadOnlineUsers = useCallback(async () => {
    setIsLoadingOnlineUsers(true);
    try {
      const users = await challengeService.getOnlineUsersExceptCurrent();
      setOnlineUsers(users);
    } catch (error) {
      console.error('Error loading online users:', error);
      toast({
        title: "Error",
        description: "Failed to load online users",
        variant: "destructive",
      });
    } finally {
      setIsLoadingOnlineUsers(false);
    }
  }, [toast]);

  const loadChallengeRequests = useCallback(async () => {
    setIsLoadingRequests(true);
    try {
      const requests = await challengeService.getChallengeRequests();
      setChallengeRequests(requests);
    } catch (error) {
      console.error('Error loading challenge requests:', error);
      toast({
        title: "Error",
        description: "Failed to load challenge requests",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRequests(false);
    }
  }, [toast]);

  const loadChallengeSessions = useCallback(async () => {
    try {
      const sessions = await challengeService.getChallengeSessions();
      setChallengeSessions(sessions);
    } catch (error) {
      console.error('Error loading challenge sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load challenge sessions",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!autoConnect) return;

    setIsConnecting(true);
    
    // Subscribe to online users
    const onlineUsersChannel = challengeService.subscribeToOnlineUsers((users) => {
      setOnlineUsers(users);
    });

    // Subscribe to challenge requests
    const challengeRequestsChannel = challengeService.subscribeToChallengeRequests((requests) => {
      setChallengeRequests(requests);
    });

    // Load initial data
    loadOnlineUsers();
    loadChallengeRequests();
    loadChallengeSessions();

    return () => {
      challengeService.unsubscribeFromChannel('online_users');
      challengeService.unsubscribeFromChannel('challenge_requests');
    };
  }, [autoConnect, loadOnlineUsers, loadChallengeRequests, loadChallengeSessions]);

  // Set up challenge session subscriptions
  useEffect(() => {
    if (!challengeSessionId) return;

    // Load initial session data, participants, and results
    const loadInitialData = async () => {
      try {
        const [session, participants, results] = await Promise.all([
          challengeService.getChallengeSession(challengeSessionId),
          challengeService.getChallengeParticipants(challengeSessionId),
          challengeService.getChallengeResults(challengeSessionId)
        ]);
        
        if (session) {
          setCurrentChallengeSession(session);
        }
        
        setChallengeParticipants(participants);
        setChallengeResults(results);
        
        console.log('Loaded initial challenge data:', { session, participants, results });
      } catch (error) {
        console.error('Error loading initial challenge data:', error);
      }
    };

    loadInitialData();

    const sessionChannel = challengeService.subscribeToChallengeSession(
      challengeSessionId,
      (session) => {
        setCurrentChallengeSession(session);
      }
    );

    const participantsChannel = challengeService.subscribeToChallengeParticipants(
      challengeSessionId,
      (participants) => {
        setChallengeParticipants(participants);
      }
    );

    const resultsChannel = challengeService.subscribeToChallengeResults(
      challengeSessionId,
      (results) => {
        setChallengeResults(results);
      }
    );

    return () => {
      challengeService.unsubscribeFromChannel(`challenge_session_${challengeSessionId}`);
      challengeService.unsubscribeFromChannel(`challenge_participants_${challengeSessionId}`);
      challengeService.unsubscribeFromChannel(`challenge_results_${challengeSessionId}`);
    };
  }, [challengeSessionId]);

  // Actions
  const updateOnlineStatus = useCallback(async (
    displayName: string,
    isAvailable: boolean = true,
    activity: 'idle' | 'in_quiz' | 'in_challenge' = 'idle'
  ): Promise<void> => {
    try {
      await challengeService.updateOnlineStatus(displayName, isAvailable, activity);
    } catch (error) {
      console.error('Error updating online status:', error);
      toast({
        title: "Error",
        description: "Failed to update online status",
        variant: "destructive",
      });
    }
  }, [toast]);

  const createChallengeRequest = useCallback(async (
    challengedUserId: string,
    quizId: string,
    message?: string
  ): Promise<ChallengeRequest | null> => {
    try {
      const request = await challengeService.createChallengeRequest(challengedUserId, quizId, message);
      toast({
        title: "Challenge Sent!",
        description: "Your challenge request has been sent",
      });
      return request;
    } catch (error) {
      console.error('Error creating challenge request:', error);
      toast({
        title: "Error",
        description: "Failed to create challenge request",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const respondToChallenge = useCallback(async (
    challengeRequestId: string,
    response: 'accepted' | 'declined'
  ): Promise<void> => {
    try {
      await challengeService.respondToChallenge(challengeRequestId, response);
      toast({
        title: response === 'accepted' ? "Challenge Accepted!" : "Challenge Declined",
        description: response === 'accepted' 
          ? "You've accepted the challenge" 
          : "You've declined the challenge",
      });
    } catch (error) {
      console.error('Error responding to challenge:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);
      console.error('Error stringified:', JSON.stringify(error, null, 2));
      
      let errorMessage = 'Unknown error';
      let errorCode = '';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        if ('code' in error) {
          errorCode = ` (Code: ${error.code})`;
        }
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = error.message || error.error || JSON.stringify(error);
        if (error.code) {
          errorCode = ` (Code: ${error.code})`;
        }
      }
      
      toast({
        title: "Error",
        description: `Failed to respond to challenge: ${errorMessage}${errorCode}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const cancelChallengeRequest = useCallback(async (challengeRequestId: string): Promise<void> => {
    try {
      await challengeService.cancelChallengeRequest(challengeRequestId);
      toast({
        title: "Challenge Cancelled",
        description: "Your challenge request has been cancelled",
      });
    } catch (error) {
      console.error('Error cancelling challenge request:', error);
      toast({
        title: "Error",
        description: "Failed to cancel challenge request",
        variant: "destructive",
      });
    }
  }, [toast]);

  const joinChallengeSession = useCallback(async (
    challengeSessionId: string,
    displayName: string
  ): Promise<ChallengeParticipant | null> => {
    try {
      const participant = await challengeService.joinChallengeSession(challengeSessionId, displayName);
      toast({
        title: "Joined Challenge!",
        description: "You've joined the challenge session",
      });
      return participant;
    } catch (error) {
      console.error('Error joining challenge session:', error);
      toast({
        title: "Error",
        description: "Failed to join challenge session",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const updateParticipantReady = useCallback(async (
    challengeSessionId: string,
    isReady: boolean
  ): Promise<void> => {
    try {
      await challengeService.updateParticipantReady(challengeSessionId, isReady);
    } catch (error) {
      console.error('Error updating participant ready status:', error);
      toast({
        title: "Error",
        description: "Failed to update ready status",
        variant: "destructive",
      });
    }
  }, [toast]);

  const startChallengeSession = useCallback(async (challengeSessionId: string): Promise<void> => {
    try {
      await challengeService.startChallengeSession(challengeSessionId);
      toast({
        title: "Challenge Started!",
        description: "The challenge quiz has begun",
      });
    } catch (error) {
      console.error('Error starting challenge session:', error);
      toast({
        title: "Error",
        description: "Failed to start challenge session",
        variant: "destructive",
      });
    }
  }, [toast]);

  const nextQuestion = useCallback(async (
    challengeSessionId: string,
    questionIndex: number
  ): Promise<void> => {
    try {
      await challengeService.nextQuestion(challengeSessionId, questionIndex);
    } catch (error) {
      console.error('Error moving to next question:', error);
      toast({
        title: "Error",
        description: "Failed to move to next question",
        variant: "destructive",
      });
    }
  }, [toast]);

  const finishChallengeSession = useCallback(async (challengeSessionId: string): Promise<void> => {
    try {
      await challengeService.finishChallengeSession(challengeSessionId);
      toast({
        title: "Challenge Finished!",
        description: "Results have been calculated",
      });
    } catch (error) {
      console.error('Error finishing challenge session:', error);
      toast({
        title: "Error",
        description: "Failed to finish challenge session",
        variant: "destructive",
      });
    }
  }, [toast]);

  const submitAnswer = useCallback(async (
    challengeSessionId: string,
    questionId: string,
    answerIndex: number,
    isCorrect: boolean,
    responseTime: number
  ): Promise<void> => {
    try {
      await challengeService.submitAnswer(challengeSessionId, questionId, answerIndex, isCorrect, responseTime);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Error",
        description: "Failed to submit answer",
        variant: "destructive",
      });
    }
  }, [toast]);

  const disconnect = useCallback(() => {
    challengeService.unsubscribeFromAll();
  }, []);

  return {
    // State
    onlineUsers,
    challengeRequests,
    challengeSessions,
    currentChallengeSession,
    challengeParticipants,
    challengeResults,
    
    // Loading states
    isLoading,
    isConnecting,
    isLoadingOnlineUsers,
    isLoadingRequests,
    
    // Actions
    updateOnlineStatus,
    createChallengeRequest,
    respondToChallenge,
    cancelChallengeRequest,
    joinChallengeSession,
    updateParticipantReady,
    startChallengeSession,
    nextQuestion,
    finishChallengeSession,
    submitAnswer,
    
    // Utility
    disconnect,
  };
};

export default useChallenge;
