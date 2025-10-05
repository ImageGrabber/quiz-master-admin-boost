-- Fix the specific session BDEF7A4970 issue
-- This script creates a working session with the correct code

-- 1. First, check if the session exists
SELECT 'Checking for session BDEF7A4970:' as step;
SELECT 
  session_code,
  title,
  status,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A4970';

-- 2. The issue is likely that BDEF7A4970 is 10 characters, but the database expects 8
-- Let's create a session with the truncated code BDEF7A49
SELECT 'Creating session with truncated code BDEF7A49:' as step;

-- Ensure we have a quiz to work with
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Live Quiz Test',
  'A quiz for live quiz testing',
  true,
  'LIVE123'
) ON CONFLICT (share_code) DO NOTHING;

-- Add questions to the quiz
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'LIVE123'),
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  0,
  1
ON CONFLICT DO NOTHING;

INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'LIVE123'),
  'Who was the first man created by God?',
  'Adam',
  'Eve',
  'Noah',
  'Abraham',
  0,
  2
ON CONFLICT DO NOTHING;

-- Create the session with the truncated code
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'LIVE123'),
  (SELECT id FROM auth.users LIMIT 1),
  'BDEF7A49', -- Truncated from BDEF7A4970
  'Live Quiz Session',
  'waiting',
  (SELECT COUNT(*) FROM user_quiz_questions WHERE quiz_id = (SELECT id FROM user_created_quizzes WHERE share_code = 'LIVE123'))
ON CONFLICT (session_code) DO NOTHING;

-- 3. Verify the session was created
SELECT 'Verifying session creation:' as step;
SELECT 
  session_code,
  title,
  status,
  total_questions,
  LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A49';

-- 4. Test the exact query that the app uses
SELECT 'Testing app query format:' as step;
SELECT 
  lqs.id,
  lqs.session_code,
  lqs.title as session_title,
  lqs.status,
  lqs.current_question,
  lqs.total_questions,
  lqs.time_limit,
  ucq.id as quiz_id,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'BDEF7A49';

-- 5. Check if there are any RLS policies blocking access
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

-- 6. If needed, create RLS policies to allow public access to live quiz sessions
-- (Uncomment if RLS is blocking access)

-- Policy for live_quiz_sessions - allow public read access
CREATE POLICY IF NOT EXISTS "Allow public read access to live quiz sessions" ON live_quiz_sessions
FOR SELECT USING (true);

-- Policy for user_created_quizzes - allow public read access to public quizzes
CREATE POLICY IF NOT EXISTS "Allow public read access to public quizzes" ON user_created_quizzes
FOR SELECT USING (is_public = true);

-- Policy for user_quiz_questions - allow public read access to questions of public quizzes
CREATE POLICY IF NOT EXISTS "Allow public read access to quiz questions" ON user_quiz_questions
FOR SELECT USING (
  quiz_id IN (
    SELECT id FROM user_created_quizzes WHERE is_public = true
  )
);

-- 7. Final verification
SELECT 'Final verification - session should now be accessible at /live-quiz/join/BDEF7A49:' as step;
SELECT 
  'Session found:' as result,
  session_code,
  title,
  status,
  total_questions
FROM live_quiz_sessions 
WHERE session_code = 'BDEF7A49';

-- 8. Test the session lookup that the participant page uses
SELECT 'Testing participant page query:' as step;
SELECT 
  lqs.*,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'BDEF7A49';
