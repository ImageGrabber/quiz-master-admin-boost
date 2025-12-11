# Live Quiz Feature Setup Guide

## 🚨 Important: Database Migration Required

The "Session Not Found" error occurs because the live quiz database tables haven't been created yet. Follow these steps to set up the live quiz feature:

## Step 1: Run Database Migration

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor

2. **Execute the Migration**
   - Copy the contents of `supabase/migrations/20250108000000-add-live-quiz-system.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the migration

3. **Verify Tables Created**
   - Run this query to check if tables exist:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN (
     'user_created_quizzes',
     'user_quiz_questions', 
     'live_quiz_sessions',
     'live_quiz_participants',
     'live_quiz_answers',
     'live_quiz_results'
   )
   ORDER BY table_name;
   ```

## Step 2: Update TypeScript Types (Optional)

If you're still getting TypeScript errors, regenerate the types:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
```

## Step 3: Test the Feature

1. **Create a Quiz**
   - Go to `/create-quiz`
   - Create a simple quiz with a few questions
   - Save the quiz

2. **Start a Live Session**
   - Go to `/dashboard/quizzes`
   - Click "Host Live" on your quiz
   - Copy the session code

3. **Join the Session**
   - Open another browser/incognito window
   - Go to `/live-quiz/join/YOUR_SESSION_CODE`
   - Test the live quiz functionality

## Troubleshooting

### If you still get "Session Not Found":

1. **Check Database Connection**
   - Verify your Supabase project is running
   - Check if the migration was successful

2. **Check Console Errors**
   - Open browser developer tools
   - Look for specific error messages in the console
   - The improved error handling will show more specific messages

3. **Verify Tables Exist**
   - Run the verification query above
   - All 6 tables should be listed

### Common Issues:

- **Migration failed**: Check for syntax errors in the SQL
- **Permission denied**: Ensure you have admin access to the database
- **Tables exist but still errors**: Check RLS policies and permissions

## Features Available After Setup:

✅ **Create Custom Quizzes** - Users can create their own quizzes
✅ **Live Session Hosting** - Host real-time quiz sessions
✅ **Real-time Participation** - Multiple users can join simultaneously
✅ **Live Scoring** - Instant score updates and rankings
✅ **Share System** - Unique codes and shareable links
✅ **Results & Rankings** - Final scores and leaderboards

## Need Help?

If you're still experiencing issues:

1. Check the browser console for specific error messages
2. Verify all database tables exist
3. Ensure RLS policies are properly configured
4. Test with a simple quiz first

The live quiz feature is now ready to use once the database migration is complete! 🎉
