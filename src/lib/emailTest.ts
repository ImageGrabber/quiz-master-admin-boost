import { sendAdminEmail } from './adminEmailService';

export const testSMTPEmail = async (testEmail: string): Promise<{ success: boolean; error?: string }> => {
  console.log('Testing SMTP email functionality...');
  
  const testData = {
    email: testEmail,
    userName: 'Test User',
    subject: 'SMTP Test Email',
    message: 'This is a test email to verify SMTP functionality with Brevo.',
    emailType: 'custom' as const
  };

  try {
    const result = await sendAdminEmail(testData);
    console.log('SMTP test result:', result);
    return result;
  } catch (error) {
    console.error('SMTP test error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
