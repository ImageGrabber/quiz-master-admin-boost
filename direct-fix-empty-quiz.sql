-- Direct fix for empty quiz - step by step approach
-- This will manually add questions to the existing session

-- 1. First, let's see exactly what we're working with
SELECT 'Current session info:' as step, lqs.id, lqs.session_code, lqs.quiz_id, lqs.title, lqs.total_questions
FROM live_quiz_sessions lqs 
WHERE lqs.session_code = 'F37EBD0CEF';

-- 2. Check if the quiz exists and get its details
SELECT 'Quiz info:' as step, ucq.id, ucq.title, ucq.share_code, ucq.is_public
FROM user_created_quizzes ucq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 3. Check current questions count
SELECT 'Current questions:' as step, COUNT(*) as count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 4. If no questions exist, add them directly
-- Get the quiz_id first
WITH quiz_id AS (
  SELECT lqs.quiz_id 
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
FROM quiz_id
ON CONFLICT DO NOTHING;

-- 5. Add second question
WITH quiz_id AS (
  SELECT lqs.quiz_id 
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
FROM quiz_id
ON CONFLICT DO NOTHING;

-- 6. Add third question
WITH quiz_id AS (
  SELECT lqs.quiz_id 
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
  'What did God create on the first day?',
  'Light',
  'Earth',
  'Animals',
  'Man',
  0,
  3
FROM quiz_id
ON CONFLICT DO NOTHING;

-- 7. Update the session with correct question count
UPDATE live_quiz_sessions 
SET total_questions = (
  SELECT COUNT(*) 
  FROM user_quiz_questions uqq 
  WHERE uqq.quiz_id = live_quiz_sessions.quiz_id
)
WHERE session_code = 'F37EBD0CEF';

-- 8. Verify the questions were added
SELECT 'After adding questions:' as step, COUNT(*) as question_count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 9. Show the questions
SELECT 'Questions added:' as step, uqq.question, uqq.option_a, uqq.option_b, uqq.option_c, uqq.option_d, uqq.correct_index
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF'
ORDER BY uqq.order_index;

-- 10. Test the final session data
SELECT 'Final session test:' as step, lqs.session_code, lqs.title, lqs.status, lqs.total_questions
FROM live_quiz_sessions lqs
WHERE lqs.session_code = 'F37EBD0CEF';
