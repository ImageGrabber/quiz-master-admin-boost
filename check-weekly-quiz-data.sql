-- Check if weekly quizzes exist in the database
-- Run these queries to see what data is available

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
ORDER BY week_start_date DESC;

-- 2. Check if there are any active weekly quizzes for current week
SELECT 
  id, 
  title, 
  total_questions,
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

-- 3. Check weekly quiz questions for quiz ID 1 (if it exists)
SELECT 
  wq.id as quiz_id,
  wq.title,
  wq.total_questions,
  COUNT(wqq.id) as actual_questions_count
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.id = 1
GROUP BY wq.id, wq.title, wq.total_questions;

-- 4. Check all weekly quiz questions
SELECT 
  wq.id as quiz_id,
  wq.title,
  wqq.id as question_id,
  wqq.question,
  wqq.order_index
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
ORDER BY wq.id, wqq.order_index;

-- 5. Check weekly quiz attempts
SELECT 
  wqa.id,
  wqa.user_id,
  wqa.weekly_quiz_id,
  wqa.score,
  wqa.completed,
  wqa.created_at
FROM weekly_quiz_attempts wqa
ORDER BY wqa.created_at DESC
LIMIT 10;
