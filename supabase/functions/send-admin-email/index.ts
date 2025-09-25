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
      email, 
      userName, 
      subject, 
      message,
      emailType = 'custom'
    } = await req.json()

    // Validate required fields
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address')
    }
    if (!subject || !message) {
      throw new Error('Subject and message are required')
    }

    // Create beautiful HTML email content based on type
    const getEmailContent = (type: string, userName: string, subject: string, message: string) => {
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
        .icon { 
          font-size: 24px; 
          margin-right: 8px;
        }
      `

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
                  <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard" 
                     class="cta-button">
                    Visit Dashboard
                  </a>
                </div>
                <div class="footer">
                  <p>This is an important announcement from Bible Quiz Competition.</p>
                  <p>You can manage your email preferences in your <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
                </div>
              </div>
            </body>
            </html>
          `

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
                  <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/quiz-selection" 
                     class="cta-button">
                    Take a Quiz Now
                  </a>
                </div>
                <div class="footer">
                  <p>This is a friendly reminder from Bible Quiz Competition.</p>
                  <p>You can manage your email preferences in your <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
                </div>
              </div>
            </body>
            </html>
          `

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
                  <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/leaderboard" 
                     class="cta-button">
                    View Leaderboard
                  </a>
                </div>
                <div class="footer">
                  <p>Congratulations from the Bible Quiz Competition team!</p>
                  <p>You can manage your email preferences in your <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
                </div>
              </div>
            </body>
            </html>
          `

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
                  <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard" 
                     class="cta-button">
                    Visit Dashboard
                  </a>
                </div>
                <div class="footer">
                  <p>This message was sent by the Bible Quiz Competition admin team.</p>
                  <p>You can manage your email preferences in your <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
                </div>
              </div>
            </body>
            </html>
          `
      }
    }

    const emailContent = getEmailContent(emailType, userName, subject, message)

    // Send email using Resend
    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) throw new Error('Resend API key not set in secrets!')

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bible Quiz Competition <noreply@biblequizcompetition.com>',
        to: email,
        subject: subject,
        html: emailContent,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to send email')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin email sent successfully',
        email: email,
        subject: subject,
        emailType: emailType,
        resend: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in send-admin-email function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        resend: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
