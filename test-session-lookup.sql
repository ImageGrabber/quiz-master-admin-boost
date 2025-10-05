-- Test session lookup functionality
-- This will help identify if the issue is with the session lookup or RLS policies

-- First, let's see if there are any sessions in the database
SELECT COUNT(*) as total_sessions FROM live_quiz_sessions;

-- Check if there are any user-created quizzes
SELECT COUNT(*) as total_quizzes FROM user_created_quizzes;

-- Check if there are any quiz questions
SELECT COUNT(*) as total_questions FROM user_quiz_questions;

-- If no data exists, let's create a test session
-- First create a test quiz
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- Use first user as creator
  'Test Quiz',
  'A test quiz for debugging',
  true,
  'TEST12345'
) RETURNING id, share_code;

-- Create a test question for the quiz
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'TEST12345'),
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus', 
  'Leviticus',
  'Numbers',
  0,
  1;

-- Create a test session
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  (SELECT id FROM user_created_quizzes WHERE share_code = 'TEST12345'),
  (SELECT id FROM auth.users LIMIT 1),
  'TEST1234',
  'Test Session',
  'waiting',
  1
RETURNING session_code;

-- Test the session lookup that the app uses
SELECT 
  lqs.*,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'TEST1234';
