-- Create a test weekly quiz to fix the /weekly-quiz/5 issue
-- Run this in your Supabase SQL Editor

-- 1. First, let's see what weekly quizzes exist
SELECT 
  id, 
  title, 
  is_active,
  week_start_date, 
  week_end_date,
  created_at
FROM weekly_quizzes 
ORDER BY id DESC;

-- 2. Create a test weekly quiz for the current week
INSERT INTO weekly_quizzes (
  week_start_date,
  week_end_date,
  title,
  description,
  theme,
  difficulty,
  total_questions,
  time_limit,
  is_active
) VALUES (
  -- Current week (Monday to Sunday)
  DATE_TRUNC('week', CURRENT_DATE)::DATE,
  DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '6 days',
  'Weekly Bible Challenge',
  'Test your knowledge with this week''s special Bible quiz',
  'Bible Knowledge',
  'Medium',
  5,
  300, -- 5 minutes
  true
) RETURNING id;

-- 3. Add test questions (replace the quiz_id with the ID returned above)
-- You'll need to get the quiz ID from the INSERT above first
INSERT INTO weekly_quiz_questions (
  weekly_quiz_id,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_index,
  order_index
) VALUES 
-- Replace 1 with the actual quiz ID from step 2
(1, 'Who was the first man created by God?', 'Adam', 'Eve', 'Noah', 'Abraham', 0, 1),
(1, 'How many days did God take to create the world?', '5 days', '6 days', '7 days', '8 days', 2, 2),
(1, 'What was the name of the garden where Adam and Eve lived?', 'Garden of Eden', 'Garden of Gethsemane', 'Garden of Olives', 'Garden of Paradise', 0, 3),
(1, 'Who built the ark?', 'Moses', 'Noah', 'Abraham', 'David', 1, 4),
(1, 'What was the name of the mountain where Moses received the Ten Commandments?', 'Mount Sinai', 'Mount Zion', 'Mount Carmel', 'Mount Olive', 0, 5);

-- 4. Verify the quiz was created
SELECT 
  wq.id,
  wq.title,
  wq.is_active,
  wq.week_start_date,
  wq.week_end_date,
  COUNT(wqq.id) as question_count
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.id = 1 -- Replace with the actual quiz ID
GROUP BY wq.id, wq.title, wq.is_active, wq.week_start_date, wq.week_end_date;

-- 5. Check if there's an active quiz for the current week
SELECT 
  id,
  title,
  total_questions,
  time_limit,
  week_start_date,
  week_end_date,
  CASE 
    WHEN week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE THEN 'Current Week'
    WHEN week_start_date > CURRENT_DATE THEN 'Future Week'
    ELSE 'Past Week'
  END as week_status
FROM weekly_quizzes 
WHERE is_active = true
ORDER BY week_start_date DESC;
