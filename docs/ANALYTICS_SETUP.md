# Analytics Setup Guide

This guide will help you set up comprehensive analytics tracking for your Bible Quiz application.

## Overview

The application now includes:
- **Vercel Analytics** - Already configured and working
- **Google Analytics 4 (GA4)** - Requires setup
- **Custom Event Tracking** - For quiz-specific analytics

## Google Analytics 4 (GA4) Setup

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new account or use an existing one
3. Create a new property for your website
4. Choose "Web" as the platform
5. Enter your website URL

### Step 2: Get Your Measurement ID

1. In your GA4 property, go to **Admin** → **Data Streams**
2. Click on your web stream
3. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Configure Environment Variables

Create a `.env` file in your project root with:

```env
# Google Analytics 4 (GA4) Configuration
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 4: Deploy and Test

1. Deploy your application
2. Visit your website and take a quiz
3. Check Google Analytics Real-time reports to see if events are being tracked

## Analytics Events Being Tracked

### Quiz Events
- `quiz_start` - When a user starts a quiz
- `quiz_complete` - When a user completes a quiz
- `quiz_abandon` - When a user abandons a quiz
- `question_answer` - When a user answers a question

### User Events
- `user_registration` - When a user registers
- `user_login` - When a user logs in
- `page_view` - When a user visits a page

### Live Quiz Events
- `live_quiz_join` - When a user joins a live quiz
- `live_quiz_host` - When a user hosts a live quiz

### Competition Events
- `competition_join` - When a user joins a competition
- `weekly_quiz_complete` - When a user completes a weekly quiz

### Other Events
- `leaderboard_view` - When a user views leaderboards
- `bible_study_access` - When a user accesses Bible study materials
- `search` - When a user performs a search
- `error` - When an error occurs
- `share` - When content is shared on social media

## Custom Analytics Functions

The application includes utility functions in `src/utils/analytics.ts` for tracking custom events:

```typescript
import { trackQuizStart, trackQuizComplete, trackPageView } from '@/utils/analytics';

// Track quiz start
trackQuizStart('quiz-id', 'Quiz Title', 'difficulty');

// Track quiz completion
trackQuizComplete('quiz-id', 'Quiz Title', score, totalQuestions, timeSpent, 'difficulty');

// Track page view
trackPageView('/page-path', 'Page Title');
```

## Testing Analytics

### Vercel Analytics
- Vercel Analytics works automatically once deployed
- Check your Vercel dashboard for analytics data

### Google Analytics
1. Open Google Analytics dashboard
2. Go to **Reports** → **Realtime**
3. Visit your website and perform actions
4. Check if events appear in real-time

### Browser Developer Tools
1. Open browser developer tools (F12)
2. Go to **Network** tab
3. Look for requests to `google-analytics.com` or `googletagmanager.com`
4. Check **Console** for any analytics-related errors

## Privacy Considerations

- The analytics implementation respects user privacy
- No personally identifiable information is tracked
- Users can opt out through browser settings
- Consider adding a privacy policy and cookie consent banner

## Troubleshooting

### Analytics Not Working
1. Check if `VITE_GA_MEASUREMENT_ID` is set correctly
2. Verify the Measurement ID format (G-XXXXXXXXXX)
3. Check browser console for errors
4. Ensure the website is deployed (analytics may not work in development)

### Events Not Appearing
1. Wait a few minutes (analytics data can be delayed)
2. Check if ad blockers are interfering
3. Verify the events are being triggered in the code
4. Test in incognito mode

## Advanced Configuration

### Custom Dimensions
You can add custom dimensions in Google Analytics to track additional data:

1. Go to **Admin** → **Custom Definitions** → **Custom Dimensions**
2. Create dimensions for quiz difficulty, user type, etc.
3. Update the analytics code to send custom dimension values

### Enhanced E-commerce
For tracking quiz "purchases" or completions as transactions:

```typescript
import { trackQuizPurchase } from '@/utils/analytics';

trackQuizPurchase('quiz-id', 'Quiz Title', 0); // Free quiz
```

## Support

If you need help with analytics setup:
1. Check the Google Analytics documentation
2. Review the Vercel Analytics documentation
3. Check the browser console for error messages
4. Test with different browsers and devices
