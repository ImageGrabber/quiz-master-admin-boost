import { supabase } from "@/integrations/supabase/client";

export interface QuizCompletionEmailData {
  email: string;
  userName: string;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeUsed: number;
  accuracy: number;
}

export const sendQuizCompletionEmail = async (data: QuizCompletionEmailData): Promise<boolean> => {
  try {
    // Check if user has email notifications enabled
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Get user's notification preferences
    const { data: profile } = await supabase
      .from('profiles')
      .select('email_notifications')
      .eq('id', user.id)
      .single();

    // If email notifications are disabled, don't send email
    if (profile && profile.email_notifications === false) {
      console.log('Email notifications disabled for user');
      return false;
    }

    // Call the Supabase Edge Function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quiz-completion-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log('Quiz completion email sent successfully');
      return true;
    } else {
      console.error('Failed to send quiz completion email:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error sending quiz completion email:', error);
    return false;
  }
};

export const sendQuizCompletionEmailWithFallback = async (
  data: QuizCompletionEmailData,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    const success = await sendQuizCompletionEmail(data);
    
    if (success) {
      onSuccess?.();
    } else {
      onError?.('Failed to send completion email');
    }
  } catch (error) {
    console.error('Error in quiz completion email fallback:', error);
    onError?.(error instanceof Error ? error.message : 'Unknown error');
  }
};
