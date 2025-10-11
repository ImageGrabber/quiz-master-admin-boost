export interface AdminEmailData {
  email: string;
  userName: string;
  subject: string;
  message: string;
  emailType?: 'custom' | 'announcement' | 'reminder' | 'congratulations';
}

// SMTP is now the only email provider

// Helper function to create HTML content for emails
const createEmailHTML = (data: AdminEmailData): string => {
  const baseStyles = `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.6; 
      color: #374151; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px;
      background-color: #f9fafb;
    }
    .container { 
      background: white; 
      border-radius: 12px; 
      padding: 32px; 
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }
    .header { 
      text-align: center; 
      margin-bottom: 32px; 
      padding-bottom: 24px;
      border-bottom: 2px solid #f3f4f6;
    }
    .header h1 { 
      color: #1f2937; 
      font-size: 28px; 
      margin: 0 0 8px 0;
      font-weight: 700;
    }
    .header p { 
      color: #6b7280; 
      font-size: 16px; 
      margin: 0;
    }
    .message-content {
      background: #f8fafc;
      padding: 24px;
      border-radius: 12px;
      border-left: 4px solid #3b82f6;
      margin: 24px 0;
      font-size: 16px;
      line-height: 1.7;
    }
    .footer { 
      margin-top: 32px; 
      padding-top: 24px; 
      border-top: 1px solid #e5e7eb; 
      text-align: center; 
      color: #9ca3af; 
      font-size: 14px;
    }
    .cta-button { 
      display: inline-block; 
      background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
      color: white; 
      padding: 16px 32px; 
      text-decoration: none; 
      border-radius: 12px; 
      font-weight: 600; 
      text-align: center; 
      margin: 24px 0;
      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
    }
  `;

  const getEmailTemplate = (type: string, userName: string, subject: string, message: string) => {
    switch (type) {
      case 'announcement':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>${baseStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📢 Important Announcement</h1>
                <p>From the Bible Quiz Competition Team</p>
              </div>
              <div class="message-content">
                <p><strong>Hello ${userName},</strong></p>
                <p>${message}</p>
              </div>
              <div style="text-align: center;">
                <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard" 
                   class="cta-button">
                  Visit Dashboard
                </a>
              </div>
              <div class="footer">
                <p>This is an important announcement from Bible Quiz Competition.</p>
                <p>You can manage your email preferences in your <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'reminder':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>${baseStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Friendly Reminder</h1>
                <p>Don't miss out on your Bible learning journey!</p>
              </div>
              <div class="message-content">
                <p><strong>Hi ${userName},</strong></p>
                <p>${message}</p>
              </div>
              <div style="text-align: center;">
                <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/quiz-selection" 
                   class="cta-button">
                  Take a Quiz Now
                </a>
              </div>
              <div class="footer">
                <p>This is a friendly reminder from Bible Quiz Competition.</p>
                <p>You can manage your email preferences in your <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'congratulations':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>${baseStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Congratulations!</h1>
                <p>You're doing amazing in your Bible learning journey!</p>
              </div>
              <div class="message-content">
                <p><strong>Dear ${userName},</strong></p>
                <p>${message}</p>
              </div>
              <div style="text-align: center;">
                <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/leaderboard" 
                   class="cta-button">
                  View Leaderboard
                </a>
              </div>
              <div class="footer">
                <p>Congratulations from the Bible Quiz Competition team!</p>
                <p>You can manage your email preferences in your <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
              </div>
            </div>
          </body>
          </html>
        `;

      default: // custom
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>${baseStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Message from Admin</h1>
                <p>Personal message from Bible Quiz Competition</p>
              </div>
              <div class="message-content">
                <p><strong>Hello ${userName},</strong></p>
                <p>${message}</p>
              </div>
              <div style="text-align: center;">
                <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard" 
                   class="cta-button">
                  Visit Dashboard
                </a>
              </div>
              <div class="footer">
                <p>This message was sent by the Bible Quiz Competition admin team.</p>
                <p>You can manage your email preferences in your <a href="${import.meta.env.VITE_SITE_URL || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
              </div>
            </div>
          </body>
          </html>
        `;
    }
  };

  return getEmailTemplate(data.emailType || 'custom', data.userName, data.subject, data.message);
};

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
    console.log('Using SMTP provider (Brevo)');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

    // Create HTML content for SMTP
    const htmlContent = createEmailHTML(data);
    
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-smtp-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          to: data.email,
          subject: data.subject,
          html: htmlContent,
          from: 'Bible Quiz Competition <noreply@biblequizcompetition.com>'
        }),
      }
    );

    // If SMTP function is not available, throw an error instead of falling back to Resend
    if (response.status === 404) {
      throw new Error('SMTP email function not deployed. Please deploy the send-smtp-email function.');
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
