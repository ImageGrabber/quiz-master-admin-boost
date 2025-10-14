-- Simple fix for weekly quiz - automatically finds and fixes the active quiz
-- Run this entire script in Supabase SQL Editor

-- 1. First, let's see what quizzes exist
SELECT 
  id,
  title,
  is_active,
  week_start_date,
  week_end_date,
  total_questions
FROM weekly_quizzes 
ORDER BY id DESC;

-- 2. Find the active quiz for the current week
WITH active_quiz AS (
  SELECT id, title, total_questions
  FROM weekly_quizzes 
  WHERE is_active = true
    AND week_start_date <= CURRENT_DATE 
    AND week_end_date >= CURRENT_DATE
  ORDER BY week_start_date DESC
  LIMIT 1
)
SELECT 
  aq.id as active_quiz_id,
  aq.title,
  aq.total_questions,
  COUNT(wqq.id) as existing_questions
FROM active_quiz aq
LEFT JOIN weekly_quiz_questions wqq ON aq.id = wqq.weekly_quiz_id
GROUP BY aq.id, aq.title, aq.total_questions;

-- 3. Add questions to the active quiz (this will work automatically)
-- First, let's get the active quiz ID and add questions
DO $$
DECLARE
  active_quiz_id INTEGER;
BEGIN
  -- Get the active quiz ID
  SELECT id INTO active_quiz_id
  FROM weekly_quizzes 
  WHERE is_active = true
    AND week_start_date <= CURRENT_DATE 
    AND week_end_date >= CURRENT_DATE
  ORDER BY week_start_date DESC
  LIMIT 1;
  
  -- Only proceed if we found an active quiz
  IF active_quiz_id IS NOT NULL THEN
    -- Add questions if they don't exist
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
      active_quiz_id,
      'Who was the first man created by God?',
      'Adam',
      'Eve', 
      'Noah',
      'Abraham',
      0,
      1
    WHERE NOT EXISTS (
      SELECT 1 FROM weekly_quiz_questions 
      WHERE weekly_quiz_id = active_quiz_id AND order_index = 1
    );
    
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
      active_quiz_id,
      'How many days did God take to create the world?',
      '5 days',
      '6 days',
      '7 days', 
      '8 days',
      2,
      2
    WHERE NOT EXISTS (
      SELECT 1 FROM weekly_quiz_questions 
      WHERE weekly_quiz_id = active_quiz_id AND order_index = 2
    );
    
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
      active_quiz_id,
      'What was the name of the garden where Adam and Eve lived?',
      'Garden of Eden',
      'Garden of Gethsemane',
      'Garden of Olives',
      'Garden of Paradise',
      0,
      3
    WHERE NOT EXISTS (
      SELECT 1 FROM weekly_quiz_questions 
      WHERE weekly_quiz_id = active_quiz_id AND order_index = 3
    );
    
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
      active_quiz_id,
      'Who built the ark?',
      'Moses',
      'Noah',
      'Abraham',
      'David',
      1,
      4
    WHERE NOT EXISTS (
      SELECT 1 FROM weekly_quiz_questions 
      WHERE weekly_quiz_id = active_quiz_id AND order_index = 4
    );
    
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
      active_quiz_id,
      'What was the name of the mountain where Moses received the Ten Commandments?',
      'Mount Sinai',
      'Mount Zion',
      'Mount Carmel',
      'Mount Olive',
      0,
      5
    WHERE NOT EXISTS (
      SELECT 1 FROM weekly_quiz_questions 
      WHERE weekly_quiz_id = active_quiz_id AND order_index = 5
    );
    
    RAISE NOTICE 'Added questions to quiz ID: %', active_quiz_id;
  ELSE
    RAISE NOTICE 'No active quiz found for current week';
  END IF;
END $$;

-- 4. Show the final result
SELECT 
  wq.id as quiz_id,
  wq.title,
  wq.is_active,
  wq.week_start_date,
  wq.week_end_date,
  wq.total_questions,
  COUNT(wqq.id) as actual_questions
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.is_active = true
GROUP BY wq.id, wq.title, wq.is_active, wq.week_start_date, wq.week_end_date, wq.total_questions
ORDER BY wq.week_start_date DESC;

-- 5. Show the correct URL to use
SELECT 
  CONCAT('/weekly-quiz/', wq.id) as correct_url,
  wq.id as quiz_id,
  wq.title,
  wq.total_questions,
  COUNT(wqq.id) as actual_questions
FROM weekly_quizzes wq
LEFT JOIN weekly_quiz_questions wqq ON wq.id = wqq.weekly_quiz_id
WHERE wq.is_active = true
GROUP BY wq.id, wq.title, wq.total_questions
ORDER BY wq.week_start_date DESC
LIMIT 1;
