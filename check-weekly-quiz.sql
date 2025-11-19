-- Check and Create Weekly Quiz for Current Week
-- This script checks if there's a weekly quiz for the current week and creates one if it doesn't exist

-- First, let's see what weekly quizzes exist
SELECT 
  id,
  week_start_date,
  week_end_date,
  title,
  is_active,
  CURRENT_DATE as today,
  CASE 
    WHEN week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE THEN 'ACTIVE - Current Week'
    WHEN week_end_date < CURRENT_DATE THEN 'PAST'
    WHEN week_start_date > CURRENT_DATE THEN 'FUTURE'
    ELSE 'INACTIVE'
  END as status
FROM weekly_quizzes
ORDER BY week_start_date DESC
LIMIT 10;

-- Calculate current week (Monday to Sunday)
-- PostgreSQL: Monday = 1, Sunday = 0
DO $$
DECLARE
  current_week_start DATE;
  current_week_end DATE;
  quiz_id INTEGER;
  day_of_week INTEGER;
BEGIN
  -- Get current date's day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
  day_of_week := EXTRACT(DOW FROM CURRENT_DATE)::INTEGER;
  
  -- Calculate Monday of current week
  -- If today is Sunday (0), go back 6 days to get Monday
  -- If today is Monday (1), use today
  -- Otherwise, go back (day_of_week - 1) days
  IF day_of_week = 0 THEN
    current_week_start := CURRENT_DATE - INTERVAL '6 days';
  ELSE
    current_week_start := CURRENT_DATE - INTERVAL '1 day' * (day_of_week - 1);
  END IF;
  
  -- Calculate Sunday of current week
  current_week_end := current_week_start + INTERVAL '6 days';
  
  RAISE NOTICE 'Current week: % to %', current_week_start, current_week_end;
  
  -- Check if a quiz already exists for this week
  SELECT id INTO quiz_id
  FROM weekly_quizzes
  WHERE week_start_date = current_week_start
  LIMIT 1;
  
  -- If no quiz exists, create one
  IF quiz_id IS NULL THEN
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
      current_week_start,
      current_week_end,
      'Weekly Bible Challenge',
      'Test your knowledge with this week''s special Bible quiz covering various books and themes from Scripture.',
      'Bible',
      'Medium',
      25,
      600, -- 10 minutes
      true
    )
    RETURNING id INTO quiz_id;
    
    RAISE NOTICE 'Created new weekly quiz with ID: %', quiz_id;
  ELSE
    -- Update existing quiz to make sure it's active
    UPDATE weekly_quizzes
    SET 
      is_active = true,
      week_end_date = current_week_end,
      updated_at = NOW()
    WHERE id = quiz_id;
    
    RAISE NOTICE 'Updated existing weekly quiz with ID: %', quiz_id;
  END IF;
  
  -- Show the current week's quiz
  RAISE NOTICE 'Current week quiz details:';
  PERFORM * FROM weekly_quizzes WHERE id = quiz_id;
END $$;

-- Verify the current week's quiz
SELECT 
  id,
  week_start_date,
  week_end_date,
  title,
  is_active,
  total_questions,
  CASE 
    WHEN week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE THEN '✅ ACTIVE'
    ELSE '❌ NOT ACTIVE'
  END as status
FROM weekly_quizzes
WHERE week_start_date <= CURRENT_DATE 
  AND week_end_date >= CURRENT_DATE
  AND is_active = true
ORDER BY week_start_date DESC
LIMIT 1;

