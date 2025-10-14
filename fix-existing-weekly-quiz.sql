-- Fix existing weekly quiz by adding questions if missing
-- Run this after finding the correct quiz ID

-- 1. First, let's see what quiz IDs exist and which one is active
SELECT 
  id,
  title,
  is_active,
  week_start_date,
  week_end_date,
  total_questions
FROM weekly_quizzes 
WHERE is_active = true
ORDER BY week_start_date DESC;

-- 2. Check if the active quiz has questions
-- Replace [QUIZ_ID] with the actual quiz ID from step 1
SELECT 
  wq.id as quiz_id,
  wq.title,
  wq.total_questions,
  COUNT(wqq.id) as actual_questions
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.is_active = true
GROUP BY wq.id, wq.title, wq.total_questions;

-- 3. If no questions exist, add them to the active quiz
-- First, get the active quiz ID, then run this with the correct ID:
-- Replace [ACTIVE_QUIZ_ID] with the actual quiz ID

INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) 
SELECT 
  [ACTIVE_QUIZ_ID], -- Replace with actual quiz ID
  'Who was the first man created by God?',
  'Adam',
  'Eve', 
  'Noah',
  'Abraham',
  0,
  1
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions 
  WHERE weekly_quiz_id = [ACTIVE_QUIZ_ID] -- Replace with actual quiz ID
);

-- 4. Add more questions if needed
-- Run these one by one, replacing [ACTIVE_QUIZ_ID] with the actual quiz ID

-- Question 2
INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) 
SELECT 
  [ACTIVE_QUIZ_ID], -- Replace with actual quiz ID
  'How many days did God take to create the world?',
  '5 days',
  '6 days',
  '7 days', 
  '8 days',
  2,
  2
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions 
  WHERE weekly_quiz_id = [ACTIVE_QUIZ_ID] AND order_index = 2
);

-- Question 3
INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) 
SELECT 
  [ACTIVE_QUIZ_ID], -- Replace with actual quiz ID
  'What was the name of the garden where Adam and Eve lived?',
  'Garden of Eden',
  'Garden of Gethsemane',
  'Garden of Olives',
  'Garden of Paradise',
  0,
  3
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions 
  WHERE weekly_quiz_id = [ACTIVE_QUIZ_ID] AND order_index = 3
);

-- Question 4
INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) 
SELECT 
  [ACTIVE_QUIZ_ID], -- Replace with actual quiz ID
  'Who built the ark?',
  'Moses',
  'Noah',
  'Abraham',
  'David',
  1,
  4
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions 
  WHERE weekly_quiz_id = [ACTIVE_QUIZ_ID] AND order_index = 4
);

-- Question 5
INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) 
SELECT 
  [ACTIVE_QUIZ_ID], -- Replace with actual quiz ID
  'What was the name of the mountain where Moses received the Ten Commandments?',
  'Mount Sinai',
  'Mount Zion',
  'Mount Carmel',
  'Mount Olive',
  0,
  5
WHERE NOT EXISTS (
  SELECT 1 FROM weekly_quiz_questions 
  WHERE weekly_quiz_id = [ACTIVE_QUIZ_ID] AND order_index = 5
);

-- 5. Verify the quiz now has questions
SELECT 
  wq.id as quiz_id,
  wq.title,
  wq.total_questions,
  COUNT(wqq.id) as actual_questions,
  wq.week_start_date,
  wq.week_end_date
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.is_active = true
GROUP BY wq.id, wq.title, wq.total_questions, wq.week_start_date, wq.week_end_date;
