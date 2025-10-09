import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface OnlineUser {
  id: string;
  user_id: string;
  display_name: string;
  last_seen: string;
  is_available: boolean;
  current_activity: 'idle' | 'in_quiz' | 'in_challenge';
  created_at: string;
}

export interface ChallengeRequest {
  id: string;
  challenger_id: string;
  challenged_id: string;
  quiz_id: number; // Changed from string to number for INTEGER type
  status: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
  message?: string;
  expires_at: string;
  created_at: string;
  responded_at?: string;
  challenger?: {
    display_name: string;
  };
  challenged?: {
    display_name: string;
  };
  quiz?: {
    title: string;
    description?: string;
  };
}

export interface ChallengeSession {
  id: string;
  challenge_request_id: string;
  quiz_id: number; // Changed from string to number for INTEGER type
  challenger_id: string;
  challenged_id: string;
  status: 'waiting' | 'active' | 'finished' | 'cancelled';
  time_limit: number;
  current_question: number;
  total_questions: number;
  started_at?: string;
  ended_at?: string;
  created_at: string;
}

export interface ChallengeParticipant {
  id: string;
  challenge_session_id: string;
  user_id: string;
  display_name: string;
  is_ready: boolean;
  joined_at: string;
}

export interface ChallengeAnswer {
  id: string;
  challenge_session_id: string;
  participant_id: string;
  question_id: string;
  answer_index: number;
  is_correct: boolean;
  response_time: number;
  answered_at: string;
}

export interface ChallengeResult {
  id: string;
  challenge_session_id: string;
  participant_id: string;
  total_score: number;
  correct_answers: number;
  total_questions: number;
  average_response_time: number;
  rank: number;
  completed_at: string;
  participant?: {
    display_name: string;
  };
}

class ChallengeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // Online Users Management
  async updateOnlineStatus(
    displayName: string,
    isAvailable: boolean = true,
    activity: 'idle' | 'in_quiz' | 'in_challenge' = 'idle'
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Clean the display name - remove email domain if present
    const cleanDisplayName = displayName.includes('@') 
      ? displayName.split('@')[0] 
      : displayName;

    try {
      // Simple insert/update without upsert complications
      const { error: deleteError } = await supabase
        .from('online_users')
        .delete()
        .eq('user_id', user.id);

      const { error: insertError } = await supabase
        .from('online_users')
        .insert({
          user_id: user.id,
          display_name: cleanDisplayName,
          is_available: isAvailable,
          current_activity: activity,
          last_seen: new Date().toISOString()
        });

      if (insertError) {
        console.error('Insert failed:', insertError);
        throw new Error(`Failed to update online status: ${insertError.message}`);
      }
    } catch (error) {
      console.error('Error updating online status:', error);
      throw new Error(`Failed to update online status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Cleanup method to remove stale entries
  async cleanupStaleOnlineUsers(): Promise<void> {
    try {
      await supabase.rpc('cleanup_stale_online_users');
    } catch (error) {
      console.error('Error cleaning up stale online users:', error);
    }
  }

  async getOnlineUsers(): Promise<OnlineUser[]> {
    const { data, error } = await supabase
      .from('online_users')
      .select('*')
      .eq('is_available', true)
      .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Last 5 minutes
      .order('last_seen', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getOnlineUsersExceptCurrent(): Promise<OnlineUser[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('online_users')
      .select('*')
      .eq('is_available', true)
      .neq('user_id', user.id)
      .gte('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString())
      .order('last_seen', { ascending: false });

    if (error) {
      console.error('Error loading online users:', error);
      throw error;
    }

    // Remove duplicates by user_id (keep the most recent entry for each user)
    const uniqueUsers = (data || []).reduce((acc: OnlineUser[], current: OnlineUser) => {
      const existingIndex = acc.findIndex(user => user.user_id === current.user_id);
      if (existingIndex === -1) {
        acc.push(current);
      } else {
        // Keep the more recent entry
        if (new Date(current.last_seen) > new Date(acc[existingIndex].last_seen)) {
          acc[existingIndex] = current;
        }
      }
      return acc;
    }, []);

    return uniqueUsers;
  }

  // Challenge Request Management
  async createChallengeRequest(
    challengedUserId: string,
    quizId: string,
    message?: string
  ): Promise<ChallengeRequest> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    console.log('Creating challenge request with:', {
      challenger_id: user.id,
      challenged_id: challengedUserId,
      quiz_id: quizId,
      message
    });

    try {
      // Convert quizId to integer if it's a string
      const quizIdInt = typeof quizId === 'string' ? parseInt(quizId, 10) : quizId;
      
      // Simple insert without any joins or complex queries
      const { data, error } = await supabase
        .from('challenge_requests')
        .insert({
          challenger_id: user.id,
          challenged_id: challengedUserId,
          quiz_id: quizIdInt,
          message: message || null
        })
        .select('*')
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw new Error(`Failed to create challenge request: ${error.message} (Code: ${error.code})`);
      }

      console.log('Challenge request created successfully:', data);

      // Get quiz details separately (optional)
      let quizDetails = null;
      try {
        // Try to get quiz details from simple quizzes table
        const { data: quizData } = await supabase
          .from('quizzes')
          .select('id, title, description')
          .eq('id', quizId)
          .single();

        if (quizData) {
          quizDetails = quizData;
        }
      } catch (quizError) {
        console.warn('Could not fetch quiz details from quizzes:', quizError);
        
        // Try main quizzes table as fallback
        try {
          const { data: mainQuizData } = await supabase
            .from('quizzes')
            .select('id, title, description')
            .eq('id', quizId)
            .single();

          if (mainQuizData) {
            quizDetails = {
              id: mainQuizData.id.toString(),
              title: mainQuizData.title,
              description: mainQuizData.description
            };
          }
        } catch (mainQuizError) {
          console.warn('Could not fetch quiz details from main quizzes table:', mainQuizError);
        }
      }

      return {
        ...data,
        quiz: quizDetails
      };
    } catch (error) {
      console.error('Error in createChallengeRequest:', error);
      throw error;
    }
  }

  async getChallengeRequests(): Promise<ChallengeRequest[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('No authenticated user found');
      return [];
    }

    console.log('Loading challenge requests for user:', user.id);

    try {
      // Simple query without joins to avoid issues
      const { data, error } = await supabase
        .from('challenge_requests')
        .select('*')
        .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading challenge requests:', error);
        throw new Error(`Failed to load challenge requests: ${error.message}`);
      }

      console.log('Loaded challenge requests:', data?.length || 0);

      // Get quiz details separately for each request
      const enrichedRequests = await Promise.all(
        (data || []).map(async (request) => {
          let quizDetails = null;
          let challengerInfo = { display_name: 'Unknown User' };
          let challengedInfo = { display_name: 'Unknown User' };

          try {
            // Get quiz details
            if (request.quiz_id) {
              const { data: userQuizData } = await supabase
                .from('quizzes')
                .select('id, title, description')
                .eq('id', request.quiz_id)
                .single();

              if (userQuizData) {
                quizDetails = userQuizData;
              } else {
                // Try main quizzes table
                const { data: mainQuizData } = await supabase
                  .from('quizzes')
                  .select('id, title, description')
                  .eq('id', request.quiz_id)
                  .single();

                if (mainQuizData) {
                  quizDetails = {
                    id: mainQuizData.id.toString(),
                    title: mainQuizData.title,
                    description: mainQuizData.description
                  };
                }
              }
            }

            // Get user info - AGGRESSIVE approach to get REAL names
            try {
              // First try online_users table
              const { data: challengerOnlineData } = await supabase
                .from('online_users')
                .select('display_name')
                .eq('user_id', request.challenger_id)
                .single();

              if (challengerOnlineData?.display_name && !challengerOnlineData.display_name.startsWith('Player ')) {
                challengerInfo = { display_name: challengerOnlineData.display_name };
              } else {
                // Try profiles table (using actual columns)
                const { data: challengerProfileData } = await supabase
                  .from('profiles')
                  .select('full_name, email')
                  .eq('id', request.challenger_id)
                  .single();

                if (challengerProfileData?.full_name && !challengerProfileData.full_name.startsWith('Player ')) {
                  challengerInfo = { display_name: challengerProfileData.full_name };
                } else if (challengerProfileData?.email) {
                  const emailName = challengerProfileData.email.split('@')[0];
                  challengerInfo = { display_name: emailName };
                } else {
                  // Try auth.users email
                  const { data: userData } = await supabase.auth.getUser();
                  if (userData?.user?.email) {
                    const emailName = userData.user.email.split('@')[0];
                    challengerInfo = { display_name: emailName };
                  } else {
                    challengerInfo = { display_name: 'Challenger' };
                  }
                }
              }
            } catch (error) {
              console.warn('Error fetching challenger info:', error);
              challengerInfo = { display_name: 'Challenger' };
            }

            try {
              // First try online_users table
              const { data: challengedOnlineData } = await supabase
                .from('online_users')
                .select('display_name')
                .eq('user_id', request.challenged_id)
                .single();

              if (challengedOnlineData?.display_name && !challengedOnlineData.display_name.startsWith('Player ')) {
                challengedInfo = { display_name: challengedOnlineData.display_name };
              } else {
                // Try profiles table (using actual columns)
                const { data: challengedProfileData } = await supabase
                  .from('profiles')
                  .select('full_name, email')
                  .eq('id', request.challenged_id)
                  .single();

                if (challengedProfileData?.full_name && !challengedProfileData.full_name.startsWith('Player ')) {
                  challengedInfo = { display_name: challengedProfileData.full_name };
                } else if (challengedProfileData?.email) {
                  const emailName = challengedProfileData.email.split('@')[0];
                  challengedInfo = { display_name: emailName };
                } else {
                  challengedInfo = { display_name: 'Player' };
                }
              }
            } catch (error) {
              console.warn('Error fetching challenged info:', error);
              challengedInfo = { display_name: 'Player' };
            }

          } catch (error) {
            console.warn('Error enriching challenge request:', error);
          }

          return {
            ...request,
            quiz: quizDetails,
            challenger: challengerInfo,
            challenged: challengedInfo
          };
        })
      );

      return enrichedRequests;
    } catch (error) {
      console.error('Error in getChallengeRequests:', error);
      throw error;
    }
  }

  async respondToChallenge(
    challengeRequestId: string,
    response: 'accepted' | 'declined'
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    console.log('DEBUG: Attempting to respond to challenge:', {
      challengeRequestId,
      response,
      userId: user.id
    });

    const { data, error } = await supabase
      .from('challenge_requests')
      .update({
        status: response,
        responded_at: new Date().toISOString()
      })
      .eq('id', challengeRequestId)
      .eq('challenged_id', user.id)
      .select();

    console.log('DEBUG: Update result:', { data, error });

    if (error) {
      console.error('DEBUG: Supabase error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
    }

    if (!data || data.length === 0) {
      throw new Error('No challenge request found or you are not authorized to respond to it');
    }

    // If accepted, create a challenge session
    if (response === 'accepted') {
      console.log('DEBUG: Creating challenge session for request:', challengeRequestId);
      try {
        const session = await this.createChallengeSession(challengeRequestId);
        console.log('DEBUG: Challenge session created:', session);
      } catch (error) {
        console.error('DEBUG: Failed to create challenge session:', error);
        throw error;
      }
    }
  }

  async cancelChallengeRequest(challengeRequestId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('challenge_requests')
      .update({ status: 'cancelled' })
      .eq('id', challengeRequestId)
      .eq('challenger_id', user.id);

    if (error) throw error;
  }

  // Challenge Session Management
  async createChallengeSession(challengeRequestId: string): Promise<ChallengeSession> {
    const { data: challengeRequest, error: requestError } = await supabase
      .from('challenge_requests')
      .select('*')
      .eq('id', challengeRequestId)
      .single();

    if (requestError) throw requestError;

    // Convert quiz_id to integer if needed
    const quizIdInt = typeof challengeRequest.quiz_id === 'string' ? parseInt(challengeRequest.quiz_id, 10) : challengeRequest.quiz_id;

    // Get quiz questions count from the new quiz_questions table
    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quizIdInt);

    if (questionsError) throw questionsError;
    
    const { data, error } = await supabase
      .from('challenge_sessions')
      .insert({
        challenge_request_id: challengeRequestId,
        quiz_id: quizIdInt,
        challenger_id: challengeRequest.challenger_id,
        challenged_id: challengeRequest.challenged_id,
        total_questions: questions?.length || 0,
        status: 'waiting',
        current_question: 0,
        time_limit: 30
      })
      .select()
      .single();

    if (error) throw error;

    // Automatically add both players as participants
    try {
      // Add challenger as participant
      await supabase
        .from('challenge_participants')
        .insert({
          challenge_session_id: data.id,
          user_id: challengeRequest.challenger_id,
          display_name: 'Challenger',
          is_ready: false
        });

      // Add challenged player as participant
      await supabase
        .from('challenge_participants')
        .insert({
          challenge_session_id: data.id,
          user_id: challengeRequest.challenged_id,
          display_name: 'Challenged Player',
          is_ready: false
        });

      console.log('Both players added as participants to challenge session');
    } catch (participantError) {
      console.error('Error adding participants:', participantError);
      // Don't throw here - the session was created successfully
    }

    return data;
  }

  async getChallengeSessions(): Promise<ChallengeSession[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('challenge_sessions')
      .select('*')
      .or(`challenger_id.eq.${user.id},challenged_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getChallengeSession(challengeSessionId: string): Promise<ChallengeSession | null> {
    const { data, error } = await supabase
      .from('challenge_sessions')
      .select('*')
      .eq('id', challengeSessionId)
      .single();

    if (error) {
      console.error('Error loading challenge session:', error);
      return null;
    }
    return data;
  }

  async getChallengeParticipants(challengeSessionId: string): Promise<ChallengeParticipant[]> {
    const { data, error } = await supabase
      .from('challenge_participants')
      .select('*')
      .eq('challenge_session_id', challengeSessionId);

    if (error) {
      console.error('Error loading challenge participants:', error);
      return [];
    }
    return data || [];
  }

  async joinChallengeSession(challengeSessionId: string, displayName: string): Promise<ChallengeParticipant> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('challenge_participants')
      .insert({
        challenge_session_id: challengeSessionId,
        user_id: user.id,
        display_name: displayName
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateParticipantReady(challengeSessionId: string, isReady: boolean): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('challenge_participants')
      .update({ is_ready: isReady })
      .eq('challenge_session_id', challengeSessionId)
      .eq('user_id', user.id);

    if (error) throw error;
  }

  async startChallengeSession(challengeSessionId: string): Promise<void> {
    const { error } = await supabase
      .from('challenge_sessions')
      .update({
        status: 'active',
        started_at: new Date().toISOString(),
        current_question: 0
      })
      .eq('id', challengeSessionId);

    if (error) throw error;
  }

  async nextQuestion(challengeSessionId: string, questionIndex: number): Promise<void> {
    const { error } = await supabase
      .from('challenge_sessions')
      .update({ current_question: questionIndex })
      .eq('id', challengeSessionId);

    if (error) throw error;
  }

  async finishChallengeSession(challengeSessionId: string): Promise<void> {
    const { error } = await supabase
      .from('challenge_sessions')
      .update({
        status: 'finished',
        ended_at: new Date().toISOString()
      })
      .eq('id', challengeSessionId);

    if (error) throw error;

    // Calculate results automatically
    await this.calculateResults(challengeSessionId);
  }

  async calculateResults(challengeSessionId: string): Promise<void> {
    console.log('Calculating results for session:', challengeSessionId);
    
    // Get all participants
    const { data: participants, error: participantsError } = await supabase
      .from('challenge_participants')
      .select('id, user_id, display_name')
      .eq('challenge_session_id', challengeSessionId);

    if (participantsError) {
      console.error('Error fetching participants:', participantsError);
      return;
    }

    // Calculate results for each participant
    for (const participant of participants || []) {
      // Count correct answers
      const { data: answers, error: answersError } = await supabase
        .from('challenge_answers')
        .select('is_correct, response_time')
        .eq('challenge_session_id', challengeSessionId)
        .eq('participant_id', participant.id);

      if (answersError) {
        console.error('Error fetching answers:', answersError);
        continue;
      }

      const correctCount = answers?.filter(a => a.is_correct).length || 0;
      const avgResponseTime = answers?.length > 0 
        ? answers.reduce((sum, a) => sum + (a.response_time || 0), 0) / answers.length 
        : 0;

      // Calculate time bonus
      const avgTimeSeconds = avgResponseTime / 1000;
      let timeBonus = 0;
      if (avgTimeSeconds <= 5) timeBonus = 50;
      else if (avgTimeSeconds <= 10) timeBonus = 40;
      else if (avgTimeSeconds <= 15) timeBonus = 30;
      else if (avgTimeSeconds <= 20) timeBonus = 20;
      else if (avgTimeSeconds <= 25) timeBonus = 10;

      const totalScore = (100 * correctCount) + timeBonus;

      console.log(`Participant ${participant.display_name}: ${correctCount} correct, ${avgTimeSeconds.toFixed(1)}s avg, ${timeBonus} bonus, ${totalScore} total`);

      // Insert or update result
      const { error: resultError } = await supabase
        .from('challenge_results')
        .upsert({
          challenge_session_id: challengeSessionId,
          participant_id: participant.id,
          total_score: totalScore,
          correct_answers: correctCount,
          total_questions: 5,
          average_response_time: Math.round(avgResponseTime),
          rank: 1, // Will be updated after all results are inserted
          completed_at: new Date().toISOString()
        });

      if (resultError) {
        console.error('Error inserting result:', resultError);
      }
    }

    // Update ranks based on scores
    const { data: results, error: resultsError } = await supabase
      .from('challenge_results')
      .select('id, total_score, average_response_time')
      .eq('challenge_session_id', challengeSessionId)
      .order('total_score', { ascending: false })
      .order('average_response_time', { ascending: true });

    if (resultsError) {
      console.error('Error fetching results for ranking:', resultsError);
      return;
    }

    // Update ranks
    for (let i = 0; i < results?.length || 0; i++) {
      const result = results[i];
      await supabase
        .from('challenge_results')
        .update({ rank: i + 1 })
        .eq('id', result.id);
    }

    console.log('Results calculation completed for session:', challengeSessionId);
  }

  // Answer Management
  async submitAnswer(
    challengeSessionId: string,
    questionId: string,
    answerIndex: number,
    isCorrect: boolean,
    responseTime: number
  ): Promise<ChallengeAnswer> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get participant ID
    const { data: participant, error: participantError } = await supabase
      .from('challenge_participants')
      .select('id')
      .eq('challenge_session_id', challengeSessionId)
      .eq('user_id', user.id)
      .single();

    if (participantError) throw participantError;

    const { data, error } = await supabase
      .from('challenge_answers')
      .insert({
        challenge_session_id: challengeSessionId,
        participant_id: participant.id,
        question_id: questionId,
        answer_index: answerIndex,
        is_correct: isCorrect,
        response_time: responseTime
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getChallengeResults(challengeSessionId: string): Promise<ChallengeResult[]> {
    console.log('Fetching results for session:', challengeSessionId);
    
    const { data, error } = await supabase
      .from('challenge_results')
      .select('*')
      .eq('challenge_session_id', challengeSessionId)
      .order('rank');

    if (error) {
      console.error('Error fetching challenge results:', error);
      throw error;
    }
    
    console.log('Fetched results:', data);
    return data || [];
  }

  // Real-time Subscriptions
  subscribeToOnlineUsers(onUpdate: (users: OnlineUser[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('online_users_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'online_users'
      }, async () => {
        const users = await this.getOnlineUsersExceptCurrent();
        onUpdate(users);
      })
      .subscribe();

    this.channels.set('online_users', channel);
    return channel;
  }

  subscribeToChallengeRequests(onUpdate: (requests: ChallengeRequest[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('challenge_requests_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'challenge_requests'
      }, async () => {
        const requests = await this.getChallengeRequests();
        onUpdate(requests);
      })
      .subscribe();

    this.channels.set('challenge_requests', channel);
    return channel;
  }

  subscribeToChallengeSession(
    challengeSessionId: string,
    onUpdate: (session: ChallengeSession) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`challenge_session_${challengeSessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'challenge_sessions',
        filter: `id=eq.${challengeSessionId}`
      }, (payload) => {
        onUpdate(payload.new as ChallengeSession);
      })
      .subscribe();

    this.channels.set(`challenge_session_${challengeSessionId}`, channel);
    return channel;
  }

  subscribeToChallengeParticipants(
    challengeSessionId: string,
    onUpdate: (participants: ChallengeParticipant[]) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`challenge_participants_${challengeSessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'challenge_participants',
        filter: `challenge_session_id=eq.${challengeSessionId}`
      }, async () => {
        const { data } = await supabase
          .from('challenge_participants')
          .select('*')
          .eq('challenge_session_id', challengeSessionId);
        onUpdate(data || []);
      })
      .subscribe();

    this.channels.set(`challenge_participants_${challengeSessionId}`, channel);
    return channel;
  }

  subscribeToChallengeResults(
    challengeSessionId: string,
    onUpdate: (results: ChallengeResult[]) => void
  ): RealtimeChannel {
    const channel = supabase
      .channel(`challenge_results_${challengeSessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'challenge_results',
        filter: `challenge_session_id=eq.${challengeSessionId}`
      }, async () => {
        const results = await this.getChallengeResults(challengeSessionId);
        onUpdate(results);
      })
      .subscribe();

    this.channels.set(`challenge_results_${challengeSessionId}`, channel);
    return channel;
  }

  // Cleanup
  unsubscribeFromChannel(channelName: string): void {
    const channel = this.channels.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  unsubscribeFromAll(): void {
    this.channels.forEach((channel, name) => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
  }
}

export const challengeService = new ChallengeService();
export default challengeService;
