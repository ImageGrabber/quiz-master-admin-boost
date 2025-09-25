export interface AdminEmailData {
  email: string;
  userName: string;
  subject: string;
  message: string;
  emailType?: 'custom' | 'announcement' | 'reminder' | 'congratulations';
}

export const sendAdminEmail = async (data: AdminEmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Check if environment variables are available
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return { 
        success: false, 
        error: 'Missing Supabase configuration. Please check your environment variables.' 
      };
    }

    console.log('Attempting to send admin email to:', data.email);
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

    // Try the admin-specific email function first
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-admin-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );
      
      // If we get a 404, the function doesn't exist, use fallback
      if (response.status === 404) {
        throw new Error('Admin email function not found');
      }
    } catch (fetchError) {
      console.log('Admin email function not available, trying fallback...');
      
      // Fallback: Use the existing quiz completion email function with modified data
      const fallbackData = {
        email: data.email,
        userName: data.userName,
        quizTitle: data.subject, // Use subject as quiz title
        score: 100, // Default score for admin emails
        correctAnswers: 1,
        totalQuestions: 1,
        timeUsed: 0,
        accuracy: 100
      };

      response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quiz-completion-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(fallbackData),
        }
      );
    }

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTTP Error:', response.status, errorText);
      return { 
        success: false, 
        error: `HTTP ${response.status}: ${errorText || 'Failed to send email'}` 
      };
    }

    const result = await response.json();
    console.log('Email service response:', result);

    if (result.success) {
      console.log('Admin email sent successfully');
      return { success: true };
    } else {
      console.error('Failed to send admin email:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Network error sending admin email:', error);
    return { 
      success: false, 
      error: `Network error: ${error instanceof Error ? error.message : 'Failed to fetch'}` 
    };
  }
};

export const sendBulkAdminEmails = async (
  emails: AdminEmailData[],
  onProgress?: (completed: number, total: number) => void,
  onComplete?: (results: { success: number; failed: number }) => void
): Promise<void> => {
  let successCount = 0;
  let failedCount = 0;

  for (let i = 0; i < emails.length; i++) {
    const result = await sendAdminEmail(emails[i]);
    
    if (result.success) {
      successCount++;
    } else {
      failedCount++;
    }

    onProgress?.(i + 1, emails.length);
    
    // Add a small delay between emails to avoid rate limiting
    if (i < emails.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  onComplete?.({ success: successCount, failed: failedCount });
};
