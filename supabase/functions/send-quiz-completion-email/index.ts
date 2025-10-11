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
      quizTitle, 
      score, 
      correctAnswers, 
      totalQuestions, 
      timeUsed,
      accuracy 
    } = await req.json()

    // Validate required fields
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address')
    }
    if (!quizTitle || score === undefined) {
      throw new Error('Missing required quiz data')
    }

    // Calculate performance level
    const getPerformanceLevel = (accuracy: number) => {
      if (accuracy >= 90) return { level: "Excellent", emoji: "🏆", color: "#10B981" }
      if (accuracy >= 75) return { level: "Great", emoji: "🎉", color: "#3B82F6" }
      if (accuracy >= 60) return { level: "Good", emoji: "👍", color: "#F59E0B" }
      return { level: "Keep Trying", emoji: "💪", color: "#EF4444" }
    }

    const performance = getPerformanceLevel(accuracy)
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Create beautiful HTML email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz Completed - ${quizTitle}</title>
        <style>
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
          .performance-badge { 
            display: inline-block; 
            background: linear-gradient(135deg, ${performance.color}20, ${performance.color}10); 
            color: ${performance.color}; 
            padding: 12px 24px; 
            border-radius: 24px; 
            font-weight: 600; 
            font-size: 18px;
            margin: 16px 0;
            border: 2px solid ${performance.color}30;
          }
          .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
            gap: 20px; 
            margin: 24px 0; 
          }
          .stat-card { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 12px; 
            text-align: center;
            border: 1px solid #e2e8f0;
          }
          .stat-value { 
            font-size: 24px; 
            font-weight: 700; 
            color: #1f2937; 
            margin-bottom: 4px;
          }
          .stat-label { 
            font-size: 14px; 
            color: #6b7280; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
          }
          .score-highlight { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 24px; 
            border-radius: 16px; 
            text-align: center; 
            margin: 24px 0;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
          }
          .score-highlight h2 { 
            margin: 0 0 8px 0; 
            font-size: 36px; 
            font-weight: 800;
          }
          .score-highlight p { 
            margin: 0; 
            opacity: 0.9; 
            font-size: 16px;
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
            transition: all 0.2s ease;
          }
          .footer { 
            margin-top: 32px; 
            padding-top: 24px; 
            border-top: 1px solid #e5e7eb; 
            text-align: center; 
            color: #9ca3af; 
            font-size: 14px;
          }
          .icon { 
            font-size: 24px; 
            margin-right: 8px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Quiz Completed!</h1>
            <p>Congratulations on completing <strong>${quizTitle}</strong></p>
          </div>

          <div class="performance-badge">
            ${performance.emoji} ${performance.level} Performance!
          </div>

          <div class="score-highlight">
            <h2>${score} Points</h2>
            <p>Your final score</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${correctAnswers}/${totalQuestions}</div>
              <div class="stat-label">Correct Answers</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${accuracy}%</div>
              <div class="stat-label">Accuracy</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${formatTime(timeUsed)}</div>
              <div class="stat-label">Time Used</div>
            </div>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard" 
               class="cta-button">
              View Your Results
            </a>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 18px;">💡 Keep Learning!</h3>
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              ${accuracy >= 90 
                ? "Outstanding work! You're mastering the Bible knowledge. Try more challenging quizzes!" 
                : accuracy >= 75 
                ? "Great job! You're doing well. Consider reviewing some topics and taking more quizzes." 
                : accuracy >= 60 
                ? "Good effort! Consider reviewing the quiz topics and taking the quiz again." 
                : "Don't give up! Review the material and try again. Every attempt helps you learn more about the Bible."
              }
            </p>
          </div>

          <div class="footer">
            <p>This email was sent because you completed a quiz on Bible Quiz Competition.</p>
            <p>You can manage your email preferences in your <a href="${Deno.env.get('SITE_URL') || 'https://biblequizcompetition.com'}/dashboard/settings" style="color: #3b82f6;">account settings</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Brevo SMTP API
    const brevoApiKey = Deno.env.get('BREVO_API_KEY')
    if (!brevoApiKey) throw new Error('BREVO_API_KEY environment variable not set')
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: { 
          email: 'noreply@biblequizcompetition.com', 
          name: 'Bible Quiz Competition' 
        },
        to: [{ email: email }],
        subject: `🎉 Quiz Completed: ${quizTitle} - ${score} Points!`,
        htmlContent: emailContent,
        textContent: emailContent.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to send email via Brevo SMTP')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quiz completion email sent successfully via SMTP',
        email: email,
        quizTitle: quizTitle,
        score: score,
        provider: 'brevo-smtp',
        messageId: data.messageId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in send-quiz-completion-email function:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        provider: 'brevo-smtp'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
