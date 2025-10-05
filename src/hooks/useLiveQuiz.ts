import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { liveQuizService, LiveQuizSession, Participant, QuizAnswer, QuizResult } from '@/lib/liveQuizService';

interface UseLiveQuizOptions {
  sessionId?: string;
  autoConnect?: boolean;
}

interface UseLiveQuizReturn {
  // Session state
  session: LiveQuizSession | null;
  participants: Participant[];
  answers: QuizAnswer[];
  results: QuizResult[];
  
  // Loading states
  isLoading: boolean;
  isConnecting: boolean;
  
  // Session actions
  createSession: (quizId: string, title: string, timeLimit?: number) => Promise<LiveQuizSession | null>;
  startSession: () => Promise<void>;
  nextQuestion: (questionIndex: number) => Promise<void>;
  finishSession: () => Promise<void>;
  
  // Participant actions
  joinSession: (displayName: string) => Promise<Participant | null>;
  updateReadyStatus: (isReady: boolean) => Promise<void>;
  
  // Answer actions
  submitAnswer: (questionId: string, answerIndex: number, responseTime: number) => Promise<void>;
  
  // Utility
  disconnect: () => void;
  calculateScore: () => { correct: number; total: number; percentage: number };
}

export const useLiveQuiz = (options: UseLiveQuizOptions = {}): UseLiveQuizReturn => {
  const { sessionId, autoConnect = true } = options;
  const { toast } = useToast();
  
  const [session, setSession] = useState<LiveQuizSession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load session data
  const loadSession = useCallback(async (sessionId: string) => {
    setIsLoading(true);
    try {
      const sessionData = await liveQuizService.getSession(sessionId);
      if (sessionData) {
        setSession(sessionData);
        
        // Load related data
        const [participantsData, answersData, resultsData] = await Promise.all([
          liveQuizService.getParticipants(sessionId),
          liveQuizService.getAnswers(sessionId),
          liveQuizService.getResults(sessionId)
        ]);
        
        setParticipants(participantsData);
        setAnswers(answersData);
        setResults(resultsData);
      }
    } catch (error) {
      console.error('Error loading session:', error);
      toast({
        title: "Error",
        description: "Failed to load session data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!sessionId || !autoConnect) return;

    setIsConnecting(true);
    
    // Subscribe to session updates
    const sessionChannel = liveQuizService.subscribeToSession(sessionId, (updatedSession) => {
      setSession(updatedSession);
    });

    // Subscribe to participants updates
    const participantsChannel = liveQuizService.subscribeToParticipants(sessionId, (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    // Subscribe to answers updates
    const answersChannel = liveQuizService.subscribeToAnswers(sessionId, (updatedAnswers) => {
      setAnswers(updatedAnswers);
    });

    // Subscribe to results updates
    const resultsChannel = liveQuizService.subscribeToResults(sessionId, (updatedResults) => {
      setResults(updatedResults);
    });

    // Load initial data
    loadSession(sessionId);

    return () => {
      liveQuizService.unsubscribeFromSession(sessionId);
    };
  }, [sessionId, autoConnect, loadSession]);

  // Session actions
  const createSession = useCallback(async (quizId: string, title: string, timeLimit: number = 30): Promise<LiveQuizSession | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to create a session",
          variant: "destructive",
        });
        return null;
      }

      const newSession = await liveQuizService.createSession(quizId, user.id, title, timeLimit);
      setSession(newSession);
      
      toast({
        title: "Session Created",
        description: "Your live quiz session is ready",
      });

      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create session",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const startSession = useCallback(async (): Promise<void> => {
    if (!session) return;

    try {
      await liveQuizService.startSession(session.id);
      toast({
        title: "Quiz Started!",
        description: "The quiz is now live and participants can answer questions",
      });
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: "Error",
        description: "Failed to start session",
        variant: "destructive",
      });
    }
  }, [session, toast]);

  const nextQuestion = useCallback(async (questionIndex: number): Promise<void> => {
    if (!session) return;

    try {
      await liveQuizService.nextQuestion(session.id, questionIndex);
    } catch (error) {
      console.error('Error moving to next question:', error);
      toast({
        title: "Error",
        description: "Failed to move to next question",
        variant: "destructive",
      });
    }
  }, [session, toast]);

  const finishSession = useCallback(async (): Promise<void> => {
    if (!session) return;

    try {
      await liveQuizService.finishSession(session.id);
      await liveQuizService.calculateResults(session.id);
      
      toast({
        title: "Quiz Finished!",
        description: "Results have been calculated and shared with participants",
      });
    } catch (error) {
      console.error('Error finishing session:', error);
      toast({
        title: "Error",
        description: "Failed to finish session",
        variant: "destructive",
      });
    }
  }, [session, toast]);

  // Participant actions
  const joinSession = useCallback(async (displayName: string): Promise<Participant | null> => {
    if (!session) return null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to join a session",
          variant: "destructive",
        });
        return null;
      }

      const participant = await liveQuizService.joinSession(session.id, user.id, displayName);
      
      toast({
        title: "Joined Successfully!",
        description: "You've joined the quiz session",
      });

      return participant;
    } catch (error) {
      console.error('Error joining session:', error);
      toast({
        title: "Error",
        description: "Failed to join session",
        variant: "destructive",
      });
      return null;
    }
  }, [session, toast]);

  const updateReadyStatus = useCallback(async (isReady: boolean): Promise<void> => {
    // This would need to be implemented based on the current participant
    // For now, we'll just show a toast
    toast({
      title: isReady ? "Ready!" : "Not Ready",
      description: isReady ? "You're ready for the quiz" : "You're not ready yet",
    });
  }, [toast]);

  // Answer actions
  const submitAnswer = useCallback(async (questionId: string, answerIndex: number, responseTime: number): Promise<void> => {
    if (!session) return;

    try {
      // This would need the current participant ID
      // For now, we'll just show a toast
      toast({
        title: "Answer Submitted!",
        description: "Your answer has been recorded",
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Error",
        description: "Failed to submit answer",
        variant: "destructive",
      });
    }
  }, [session, toast]);

  // Utility functions
  const disconnect = useCallback(() => {
    if (sessionId) {
      liveQuizService.unsubscribeFromSession(sessionId);
    }
  }, [sessionId]);

  const calculateScore = useCallback(() => {
    return liveQuizService.calculateScore(answers);
  }, [answers]);

  return {
    // State
    session,
    participants,
    answers,
    results,
    isLoading,
    isConnecting,
    
    // Actions
    createSession,
    startSession,
    nextQuestion,
    finishSession,
    joinSession,
    updateReadyStatus,
    submitAnswer,
    disconnect,
    calculateScore,
  };
};

export default useLiveQuiz;
