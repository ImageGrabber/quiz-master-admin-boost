# Quiz Completion Email Setup

This document explains how the quiz completion email functionality works and how to set it up.

## Overview

When a user completes a quiz, an automated email is sent to their registered email address with their quiz results, performance statistics, and encouraging messages.

## Components

### 1. Supabase Edge Function
- **File**: `supabase/functions/send-quiz-completion-email/index.ts`
- **Purpose**: Handles the actual email sending using Resend API
- **Features**:
  - Beautiful HTML email templates
  - Performance-based messaging
  - Responsive design
  - Error handling

### 2. Email Service Utility
- **File**: `src/lib/emailService.ts`
- **Purpose**: Provides a clean interface for sending quiz completion emails
- **Features**:
  - Checks user email notification preferences
  - Handles errors gracefully
  - Provides fallback callbacks

### 3. Integration Points
The email functionality is integrated into:
- **Regular Quizzes**: `src/pages/Quiz.tsx`
- **Bible Book Quizzes**: `src/pages/BibleBookQuiz.tsx`
- **Competition Quizzes**: `src/pages/CompetitionQuiz.tsx`

## Email Content

The email includes:
- **Personalized greeting** with user's name
- **Quiz title** and completion celebration
- **Performance badge** (Excellent, Great, Good, Keep Trying)
- **Score highlights** with visual emphasis
- **Detailed statistics**:
  - Correct answers vs total questions
  - Accuracy percentage
  - Time taken
- **Encouraging message** based on performance
- **Call-to-action** button to view results
- **Footer** with preference management link

## Setup Requirements

### 1. Environment Variables
Make sure these are set in your Supabase project:
```
RESEND_API_KEY=your_resend_api_key_here
SITE_URL=https://your-domain.com
```

### 2. Resend API Setup
1. Sign up for a Resend account at https://resend.com
2. Get your API key from the dashboard
3. Add it to your Supabase project secrets
4. Verify your domain for sending emails

### 3. Database Requirements
The system requires these tables:
- `profiles` - User profile information including email preferences
- `quizzes` - Quiz information
- `attempts` - Quiz attempt records

## User Preferences

Users can control email notifications through their profile settings:
- **Email Notifications**: Master toggle for all email notifications
- **Quiz Reminders**: Specific to quiz-related emails
- **Leaderboard Updates**: For competition updates

## Email Template Features

### Visual Design
- **Gradient backgrounds** for modern appeal
- **Performance-based color coding**
- **Responsive layout** for all devices
- **Professional typography**

### Performance Levels
- **🏆 Excellent** (90%+): Outstanding work message
- **🎉 Great** (75-89%): Great job message  
- **👍 Good** (60-74%): Good effort message
- **💪 Keep Trying** (<60%): Encouraging message

### Interactive Elements
- **Call-to-action buttons** with hover effects
- **Statistics cards** with visual icons
- **Performance badges** with emojis

## Error Handling

The system includes comprehensive error handling:
- **API failures**: Graceful fallback without breaking quiz completion
- **Missing data**: Safe defaults for all required fields
- **Network issues**: Retry logic and user feedback
- **Invalid emails**: Validation before sending

## Testing

To test the email functionality:

1. **Complete a quiz** as a registered user
2. **Check your email** for the completion notification
3. **Verify email content** matches your quiz results
4. **Test different performance levels** to see various messages

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check RESEND_API_KEY is set correctly
   - Verify domain is verified in Resend
   - Check Supabase function logs

2. **Email preferences not working**
   - Ensure user has a profile record
   - Check email_notifications field in profiles table

3. **Template rendering issues**
   - Verify HTML is valid
   - Check for missing environment variables
   - Test with different email clients

### Debug Steps

1. Check browser console for errors
2. Review Supabase function logs
3. Test with a simple email first
4. Verify all required data is present

## Future Enhancements

Potential improvements:
- **Email templates** for different quiz types
- **Scheduled follow-up emails** for low scores
- **Social sharing** of achievements
- **Email analytics** and open rates
- **Custom email signatures**
- **Multi-language support**

## Security Considerations

- **Email validation** before sending
- **Rate limiting** to prevent spam
- **User consent** through preferences
- **Secure API keys** in environment variables
- **No sensitive data** in email content
