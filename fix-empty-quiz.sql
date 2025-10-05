-- Fix the empty quiz issue
-- The session exists but has no questions, which is causing the 406 error

-- 1. First, let's see what quiz the session is linked to
SELECT 
  'Session details:' as info,
  lqs.id as session_id,
  lqs.session_code,
  lqs.quiz_id,
  lqs.title as session_title,
  lqs.status,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 2. Check if the quiz has any questions
SELECT 
  'Quiz questions:' as info,
  COUNT(*) as question_count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 3. If no questions exist, let's add some test questions to the quiz
-- First, get the quiz ID
WITH quiz_info AS (
  SELECT lqs.quiz_id, lqs.session_code
  FROM live_quiz_sessions lqs
  WHERE lqs.session_code = 'F37EBD0CEF'
)
INSERT INTO user_quiz_questions (
  quiz_id, 
  question, 
  option_a, 
  option_b, 
  option_c, 
  option_d, 
  correct_index, 
  order_index
)
SELECT 
  quiz_id,
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus',
  'Leviticus', 
  'Numbers',
  0,
  1
FROM quiz_info
WHERE NOT EXISTS (
  SELECT 1 FROM user_quiz_questions uqq 
  WHERE uqq.quiz_id = quiz_info.quiz_id
);

-- 4. Add a second question
WITH quiz_info AS (
  SELECT lqs.quiz_id, lqs.session_code
  FROM live_quiz_sessions lqs
  WHERE lqs.session_code = 'F37EBD0CEF'
)
INSERT INTO user_quiz_questions (
  quiz_id, 
  question, 
  option_a, 
  option_b, 
  option_c, 
  option_d, 
  correct_index, 
  order_index
)
SELECT 
  quiz_id,
  'Who was the first man created by God?',
  'Adam',
  'Eve',
  'Noah',
  'Abraham',
  0,
  2
FROM quiz_info;

-- 5. Update the session to reflect the correct number of questions
UPDATE live_quiz_sessions 
SET total_questions = (
  SELECT COUNT(*) 
  FROM user_quiz_questions uqq 
  WHERE uqq.quiz_id = live_quiz_sessions.quiz_id
)
WHERE session_code = 'F37EBD0CEF';

-- 6. Verify the fix
SELECT 
  'After fix - Session details:' as info,
  lqs.session_code,
  lqs.title as session_title,
  lqs.status,
  lqs.total_questions,
  ucq.title as quiz_title
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

SELECT 
  'After fix - Questions:' as info,
  COUNT(*) as question_count,
  STRING_AGG(uqq.question, ' | ') as questions
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 7. Test the exact query the app uses
SELECT 
  'App query test:' as info,
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
WHERE lqs.session_code = 'F37EBD0CEF';
