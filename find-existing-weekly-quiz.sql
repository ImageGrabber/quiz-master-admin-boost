-- Find existing weekly quizzes and their IDs
-- Run this in Supabase SQL Editor to see what quizzes exist

-- 1. Check all weekly quizzes
SELECT 
  id,
  title,
  description,
  theme,
  difficulty,
  total_questions,
  time_limit,
  is_active,
  week_start_date,
  week_end_date,
  created_at
FROM weekly_quizzes 
ORDER BY id DESC;

-- 2. Check which quiz is active for the current week
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

-- 3. Check if quiz ID 5 exists specifically
SELECT 
  id,
  title,
  is_active,
  week_start_date,
  week_end_date
FROM weekly_quizzes 
WHERE id = 5;

-- 4. Check questions for each quiz
SELECT 
  wq.id as quiz_id,
  wq.title,
  wq.is_active,
  COUNT(wqq.id) as question_count
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
GROUP BY wq.id, wq.title, wq.is_active
ORDER BY wq.id DESC;

-- 5. Find the most recent active quiz
SELECT 
  id,
  title,
  week_start_date,
  week_end_date,
  total_questions
FROM weekly_quizzes 
WHERE is_active = true
  AND week_start_date <= CURRENT_DATE 
  AND week_end_date >= CURRENT_DATE
ORDER BY week_start_date DESC
LIMIT 1;
