-- Create a completely new test session with questions
-- This ensures we have a working session to test with

-- 1. Create a new quiz with questions
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Test Bible Quiz',
  'A test quiz for debugging the live quiz feature',
  true,
  'TESTQUIZ123'
) RETURNING id, share_code;

-- 2. Add questions to the new quiz
-- Get the quiz ID we just created
WITH new_quiz AS (
  SELECT id FROM user_created_quizzes WHERE share_code = 'TESTQUIZ123'
)
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  id,
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  0,
  1
FROM new_quiz;

WITH new_quiz AS (
  SELECT id FROM user_created_quizzes WHERE share_code = 'TESTQUIZ123'
)
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  id,
  'Who was the first man created by God?',
  'Adam',
  'Eve',
  'Noah',
  'Abraham',
  0,
  2
FROM new_quiz;

WITH new_quiz AS (
  SELECT id FROM user_created_quizzes WHERE share_code = 'TESTQUIZ123'
)
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  id,
  'What did God create on the first day?',
  'Light',
  'Earth',
  'Animals',
  'Man',
  0,
  3
FROM new_quiz;

-- 3. Create a new session for this quiz
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'NEWTEST123',
  'Test Live Session',
  'waiting',
  (SELECT COUNT(*) FROM user_quiz_questions WHERE quiz_id = ucq.id)
FROM user_created_quizzes ucq
WHERE ucq.share_code = 'TESTQUIZ123'
RETURNING session_code, title, status, total_questions;

-- 4. Verify everything was created correctly
SELECT 'New quiz created:' as info, id, title, share_code, is_public
FROM user_created_quizzes 
WHERE share_code = 'TESTQUIZ123';

SELECT 'Questions added:' as info, COUNT(*) as question_count
FROM user_quiz_questions uqq
JOIN user_created_quizzes ucq ON ucq.id = uqq.quiz_id
WHERE ucq.share_code = 'TESTQUIZ123';

SELECT 'New session created:' as info, session_code, title, status, total_questions
FROM live_quiz_sessions 
WHERE session_code = 'NEWTEST123';

-- 5. Test the new session with the app query format
SELECT 'App query test for new session:' as info,
  lqs.*,
  json_build_object(
    'id', ucq.id,
    'title', ucq.title,
    'description', ucq.description,
    'is_public', ucq.is_public,
    'share_code', ucq.share_code,
    'created_at', ucq.created_at,
    'updated_at', ucq.updated_at
  ) as quiz
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'NEWTEST123';
