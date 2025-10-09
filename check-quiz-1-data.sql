-- Check specific data for weekly quiz ID 1
-- This will help diagnose why the frontend shows empty

-- 1. Check if weekly quiz ID 1 exists and its details
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
WHERE id = 1;

-- 2. Check how many questions exist for quiz ID 1
SELECT 
  COUNT(*) as total_questions_in_db,
  MIN(order_index) as min_order,
  MAX(order_index) as max_order
FROM weekly_quiz_questions 
WHERE weekly_quiz_id = 1;

-- 3. Check if quiz is active and within date range
SELECT 
  id,
  title,
  is_active,
  week_start_date,
  week_end_date,
  CURRENT_DATE as today,
  CASE 
    WHEN week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE THEN 'ACTIVE - Current Week'
    WHEN week_start_date > CURRENT_DATE THEN 'FUTURE - Not Yet Active'
    ELSE 'PAST - Expired'
  END as status
FROM weekly_quizzes 
WHERE id = 1;

-- 4. Check if there are any questions for this quiz
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
LIMIT 5;
