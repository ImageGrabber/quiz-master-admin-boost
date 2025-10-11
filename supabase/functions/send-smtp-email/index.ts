import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      to, 
      subject, 
      html,
      from = 'Bible Quiz Competition <noreply@biblequizcompetition.com>'
    } = await req.json()

    // Validate required fields
    if (!to || !to.includes('@')) {
      throw new Error('Invalid email address')
    }
    if (!subject || !html) {
      throw new Error('Subject and HTML content are required')
    }

    // Brevo SMTP Configuration
    const smtpConfig = {
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '9910ac001@smtp-brevo.com',
        pass: 'NPd2F9mEIJCBj08U'
      }
    };

    // Create email message
    const emailMessage = {
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    };

    // Send email using Deno's built-in SMTP capabilities
    // Note: This is a simplified implementation. In production, you might want to use a more robust SMTP library
    const smtpResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': smtpConfig.auth.pass, // Using the password as API key for Brevo
      },
      body: JSON.stringify({
        sender: { email: from.split('<')[1]?.split('>')[0] || 'noreply@biblequizcompetition.com', name: 'Bible Quiz Competition' },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
        textContent: emailMessage.text,
      }),
    });

    if (!smtpResponse.ok) {
      const errorData = await smtpResponse.json();
      throw new Error(`Brevo API error: ${errorData.message || 'Failed to send email'}`);
    }

    const result = await smtpResponse.json();
    console.log('Brevo SMTP response:', result);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'SMTP email sent successfully via Brevo',
        email: to,
        subject: subject,
        messageId: result.messageId || 'unknown',
        provider: 'brevo'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in send-smtp-email function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        provider: 'brevo'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
