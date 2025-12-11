-- Update Quiz ID 11 to Current Week Dates (Active Until Next Week)
-- This only updates the dates, keeping everything else the same (including existing questions)

-- Calculate current week start and next week end
DO $$
DECLARE
  current_week_start DATE;
  next_week_end DATE;
  day_of_week INTEGER;
BEGIN
  -- Get current date's day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
  day_of_week := EXTRACT(DOW FROM CURRENT_DATE)::INTEGER;
  
  -- Calculate Monday of current week
  IF day_of_week = 0 THEN
    current_week_start := CURRENT_DATE - INTERVAL '6 days';
  ELSE
    current_week_start := CURRENT_DATE - INTERVAL '1 day' * (day_of_week - 1);
  END IF;
  
  -- Calculate Sunday of next week (end of next week)
  next_week_end := current_week_start + INTERVAL '13 days'; -- Current Monday + 13 days = Next Sunday
  
  RAISE NOTICE 'Updating quiz ID 11: Start % to End % (active until next week)', current_week_start, next_week_end;
  
  -- Update quiz ID 11 with current week start and next week end
  UPDATE weekly_quizzes
  SET 
    week_start_date = current_week_start,
    week_end_date = next_week_end,
    is_active = true,
    updated_at = NOW()
  WHERE id = 11;
  
  IF FOUND THEN
    RAISE NOTICE '✅ Successfully updated quiz ID 11';
  ELSE
    RAISE NOTICE '❌ Quiz ID 11 not found';
  END IF;
END $$;

-- Verify the update
SELECT 
  id,
  week_start_date,
  week_end_date,
  title,
  is_active,
  total_questions,
  CURRENT_DATE as today,
  CASE 
    WHEN week_start_date <= CURRENT_DATE AND week_end_date >= CURRENT_DATE AND is_active = true THEN '✅ ACTIVE - Current Week'
    WHEN week_end_date < CURRENT_DATE THEN '❌ PAST'
    WHEN week_start_date > CURRENT_DATE THEN '⏭️ FUTURE'
    WHEN is_active = false THEN '❌ INACTIVE'
    ELSE '❌ NOT MATCHING'
  END as status
FROM weekly_quizzes
WHERE id = 11;

