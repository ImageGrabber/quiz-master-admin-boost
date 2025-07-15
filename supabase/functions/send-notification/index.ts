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
    const { email, preferences, type = 'test' } = await req.json()

    // Validate email
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address')
    }

    // Create email content based on preferences
    const enabledPrefs = []
    if (preferences.emailNotifications) enabledPrefs.push('Email Notifications')
    if (preferences.quizReminders) enabledPrefs.push('Quiz Reminders')
    if (preferences.leaderboardUpdates) enabledPrefs.push('Leaderboard Updates')

    const emailContent = `
      <h2>QuizMaster Notification Test</h2>
      <p>Hello!</p>
      <p>This is a test email from QuizMaster to verify your notification preferences.</p>
      
      <h3>Your Current Preferences:</h3>
      <ul>
        <li>Email Notifications: ${preferences.emailNotifications ? '✅ Enabled' : '❌ Disabled'}</li>
        <li>Quiz Reminders: ${preferences.quizReminders ? '✅ Enabled' : '❌ Disabled'}</li>
        <li>Leaderboard Updates: ${preferences.leaderboardUpdates ? '✅ Enabled' : '❌ Disabled'}</li>
      </ul>
      
      <p>Enabled notification types: ${enabledPrefs.join(', ') || 'None'}</p>
      
      <p>In a production environment, you would receive real notifications based on these preferences.</p>
      
      <hr>
      <p><small>This is a test email from QuizMaster. You can update your preferences in your account settings.</small></p>
    `

    // === RESEND EMAIL SENDING ===
    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) throw new Error('Resend API key not set in secrets!')

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@biblequizcompetition.com',
        to: email,
        subject: 'QuizMaster - Notification Test',
        html: emailContent,
      }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Failed to send email')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test email sent successfully',
        email: email,
        preferences: preferences,
        resend: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in send-notification function:', error)
    
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