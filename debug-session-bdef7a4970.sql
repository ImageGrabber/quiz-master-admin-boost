-- Debug session BDEF7A4970 issue
-- This script will help identify and fix the session not found issue

-- 1. Check if the session exists in the database
SELECT 'Checking if session BDEF7A4970 exists:' as step;
SELECT 
  session_code,
  title,
  status,
  created_at,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A4970';

-- 2. Check if there are any sessions at all
SELECT 'Total sessions in database:' as step;
SELECT COUNT(*) as total_sessions FROM live_quiz_sessions;

-- 3. Check if there are any user-created quizzes
SELECT 'Total quizzes in database:' as step;
SELECT COUNT(*) as total_quizzes FROM user_created_quizzes;

-- 4. Check if there are any quiz questions
SELECT 'Total questions in database:' as step;
SELECT COUNT(*) as total_questions FROM user_quiz_questions;

-- 5. Check if the session code is too long (should be 8 characters max)
SELECT 'Sessions with codes longer than 8 characters:' as step;
SELECT 
  session_code,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE LENGTH(session_code) > 8;

-- 6. If the session doesn't exist, let's create a working test session
-- First, ensure we have a quiz to work with
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Debug Test Quiz',
  'A quiz for debugging the session issue',
  true,
  'DEBUG123'
) ON CONFLICT (share_code) DO NOTHING;

-- Add a test question
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'DEBUG123'),
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  0,
  1
ON CONFLICT DO NOTHING;

-- Create a new session with the exact code BDEF7A4970 (truncated to 8 chars)
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'DEBUG123'),
  (SELECT id FROM auth.users LIMIT 1),
  'BDEF7A49', -- Truncated to 8 characters
  'Debug Test Session',
  'waiting',
  1
ON CONFLICT (session_code) DO NOTHING;

-- 7. Verify the session was created
SELECT 'Verifying session creation:' as step;
SELECT 
  session_code,
  title,
  status,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A49';

-- 8. Test the exact query that the app uses
SELECT 'Testing app query format:' as step;
SELECT 
  lqs.id,
  lqs.session_code,
  lqs.title as session_title,
  lqs.status,
  lqs.current_question,
  lqs.total_questions,
  ucq.id as quiz_id,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'BDEF7A49';

-- 9. Check RLS policies
SELECT 'Checking RLS policies:' as step;
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('live_quiz_sessions', 'user_created_quizzes', 'user_quiz_questions');

-- 10. If RLS is blocking access, temporarily disable it for testing
-- (Uncomment the next line if needed)
-- ALTER TABLE live_quiz_sessions DISABLE ROW LEVEL SECURITY;

-- 11. Final verification
SELECT 'Final verification - session should be accessible now:' as step;
SELECT 
  'Session found:' as result,
  session_code,
  title,
  status
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A49';
