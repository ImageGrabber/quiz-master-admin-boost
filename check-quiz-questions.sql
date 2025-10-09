-- Check if weekly quiz ID 1 has questions
-- This is likely the issue - empty page means no questions

-- 1. Count questions for quiz ID 1
SELECT COUNT(*) as question_count 
FROM weekly_quiz_questions 
WHERE weekly_quiz_id = 1;

-- 2. Show first few questions if they exist
SELECT 
  id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
FROM weekly_quiz_questions 
WHERE weekly_quiz_id = 1
ORDER BY order_index
LIMIT 3;

-- 3. Check if there are any questions at all in the database
SELECT 
  weekly_quiz_id,
  COUNT(*) as question_count
FROM weekly_quiz_questions 
GROUP BY weekly_quiz_id
ORDER BY weekly_quiz_id;
