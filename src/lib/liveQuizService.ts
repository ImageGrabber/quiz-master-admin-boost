import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface LiveQuizSession {
  id: string;
  quiz_id: string;
  host_id: string;
  session_code: string;
  title: string;
  status: 'waiting' | 'active' | 'finished' | 'cancelled';
  max_participants: number;
  time_limit: number;
  current_question: number;
  total_questions: number;
  started_at?: string;
  ended_at?: string;
  created_at: string;
}

export interface Participant {
  id: string;
  session_id: string;
  user_id: string;
  display_name: string;
  joined_at: string;
  is_ready: boolean;
}

export interface QuizAnswer {
  id: string;
  session_id: string;
  participant_id: string;
  question_id: string;
  answer_index: number;
  is_correct: boolean;
  answered_at: string;
  response_time: number;
}

export interface QuizResult {
  id: string;
  session_id: string;
  participant_id: string;
  total_score: number;
  correct_answers: number;
  total_questions: number;
  average_response_time: number;
  rank: number;
  completed_at: string;
}

class LiveQuizService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // Session Management
  async createSession(quizId: string, hostId: string, title: string, timeLimit: number = 30): Promise<LiveQuizSession> {
    const { data, error } = await supabase
      .from('live_quiz_sessions')
      .insert({
        quiz_id: quizId,
        host_id: hostId,
        title,
        time_limit: timeLimit,
        status: 'waiting'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSession(sessionCode: string): Promise<LiveQuizSession | null> {
    const { data, error } = await supabase
      .from('live_quiz_sessions')
      .select('*')
      .eq('session_code', sessionCode)
      .single();

    if (error) return null;
    return data;
  }

  async updateSession(sessionId: string, updates: Partial<LiveQuizSession>): Promise<void> {
    const { error } = await supabase
      .from('live_quiz_sessions')
      .update(updates)
      .eq('id', sessionId);

    if (error) throw error;
  }

  async startSession(sessionId: string): Promise<void> {
    await this.updateSession(sessionId, {
      status: 'active',
      started_at: new Date().toISOString(),
      current_question: 0
    });
  }

  async nextQuestion(sessionId: string, questionIndex: number): Promise<void> {
    await this.updateSession(sessionId, {
      current_question: questionIndex
    });
  }

  async finishSession(sessionId: string): Promise<void> {
    await this.updateSession(sessionId, {
      status: 'finished',
      ended_at: new Date().toISOString()
    });
  }

  // Participant Management
  async joinSession(sessionId: string, userId: string, displayName: string): Promise<Participant> {
    const { data, error } = await supabase
      .from('live_quiz_participants')
      .insert({
        session_id: sessionId,
        user_id: userId,
        display_name: displayName
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getParticipants(sessionId: string): Promise<Participant[]> {
    const { data, error } = await supabase
      .from('live_quiz_participants')
      .select('*')
      .eq('session_id', sessionId)
      .order('joined_at');

    if (error) throw error;
    return data || [];
  }

  async updateParticipantReady(participantId: string, isReady: boolean): Promise<void> {
    const { error } = await supabase
      .from('live_quiz_participants')
      .update({ is_ready: isReady })
      .eq('id', participantId);

    if (error) throw error;
  }

  // Answer Management
  async submitAnswer(
    sessionId: string,
    participantId: string,
    questionId: string,
    answerIndex: number,
    isCorrect: boolean,
    responseTime: number
  ): Promise<QuizAnswer> {
    const { data, error } = await supabase
      .from('live_quiz_answers')
      .insert({
        session_id: sessionId,
        participant_id: participantId,
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

  async getAnswers(sessionId: string, questionId?: string): Promise<QuizAnswer[]> {
    let query = supabase
      .from('live_quiz_answers')
      .select('*')
      .eq('session_id', sessionId);

    if (questionId) {
      query = query.eq('question_id', questionId);
    }

    const { data, error } = await query.order('answered_at');

    if (error) throw error;
    return data || [];
  }

  // Results Management
  async calculateResults(sessionId: string): Promise<void> {
    const { error } = await supabase.rpc('calculate_quiz_results', {
      session_uuid: sessionId
    });

    if (error) throw error;
  }

  async getResults(sessionId: string): Promise<QuizResult[]> {
    const { data, error } = await supabase
      .from('live_quiz_results')
      .select(`
        *,
        participant:live_quiz_participants(display_name)
      `)
      .eq('session_id', sessionId)
      .order('rank');

    if (error) throw error;
    return data || [];
  }

  // Real-time Subscriptions
  subscribeToSession(sessionId: string, onUpdate: (session: LiveQuizSession) => void): RealtimeChannel {
    const channel = supabase
      .channel(`live_quiz_session_${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'live_quiz_sessions',
        filter: `id=eq.${sessionId}`
      }, (payload) => {
        onUpdate(payload.new as LiveQuizSession);
      })
      .subscribe();

    this.channels.set(`session_${sessionId}`, channel);
    return channel;
  }

  subscribeToParticipants(sessionId: string, onUpdate: (participants: Participant[]) => void): RealtimeChannel {
    const channel = supabase
      .channel(`live_quiz_participants_${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'live_quiz_participants',
        filter: `session_id=eq.${sessionId}`
      }, async () => {
        const participants = await this.getParticipants(sessionId);
        onUpdate(participants);
      })
      .subscribe();

    this.channels.set(`participants_${sessionId}`, channel);
    return channel;
  }

  subscribeToAnswers(sessionId: string, onUpdate: (answers: QuizAnswer[]) => void): RealtimeChannel {
    const channel = supabase
      .channel(`live_quiz_answers_${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'live_quiz_answers',
        filter: `session_id=eq.${sessionId}`
      }, async () => {
        const answers = await this.getAnswers(sessionId);
        onUpdate(answers);
      })
      .subscribe();

    this.channels.set(`answers_${sessionId}`, channel);
    return channel;
  }

  subscribeToResults(sessionId: string, onUpdate: (results: QuizResult[]) => void): RealtimeChannel {
    const channel = supabase
      .channel(`live_quiz_results_${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'live_quiz_results',
        filter: `session_id=eq.${sessionId}`
      }, async () => {
        const results = await this.getResults(sessionId);
        onUpdate(results);
      })
      .subscribe();

    this.channels.set(`results_${sessionId}`, channel);
    return channel;
  }

  // Cleanup
  unsubscribeFromSession(sessionId: string): void {
    const sessionChannel = this.channels.get(`session_${sessionId}`);
    const participantsChannel = this.channels.get(`participants_${sessionId}`);
    const answersChannel = this.channels.get(`answers_${sessionId}`);
    const resultsChannel = this.channels.get(`results_${sessionId}`);

    if (sessionChannel) {
      supabase.removeChannel(sessionChannel);
      this.channels.delete(`session_${sessionId}`);
    }
    if (participantsChannel) {
      supabase.removeChannel(participantsChannel);
      this.channels.delete(`participants_${sessionId}`);
    }
    if (answersChannel) {
      supabase.removeChannel(answersChannel);
      this.channels.delete(`answers_${sessionId}`);
    }
    if (resultsChannel) {
      supabase.removeChannel(resultsChannel);
      this.channels.delete(`results_${sessionId}`);
    }
  }

  // Utility Methods
  generateSessionCode(): string {
    // Generate exactly 8 characters using a more reliable method
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  formatTimeRemaining(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  calculateScore(answers: QuizAnswer[]): { correct: number; total: number; percentage: number } {
    const correct = answers.filter(a => a.is_correct).length;
    const total = answers.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return { correct, total, percentage };
  }

  getAverageResponseTime(answers: QuizAnswer[]): number {
    if (answers.length === 0) return 0;
    const totalTime = answers.reduce((sum, answer) => sum + answer.response_time, 0);
    return Math.round(totalTime / answers.length);
  }
}

export const liveQuizService = new LiveQuizService();
export default liveQuizService;
