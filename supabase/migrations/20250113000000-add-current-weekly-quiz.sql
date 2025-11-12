-- Add Weekly Quiz for Current Week
-- This creates a weekly quiz for the current week (Monday to Sunday)

-- Calculate current week (Monday to Sunday)
-- PostgreSQL: Monday = 1, Sunday = 0
DO $$
DECLARE
  current_week_start DATE;
  current_week_end DATE;
  quiz_id INTEGER;
BEGIN
  -- Calculate Monday of current week
  -- If today is Monday (DOW = 1), use today, otherwise go back to Monday
  current_week_start := DATE_TRUNC('week', CURRENT_DATE)::DATE;
  -- If DATE_TRUNC gives Sunday, adjust to Monday
  IF EXTRACT(DOW FROM current_week_start) = 0 THEN
    current_week_start := current_week_start - INTERVAL '6 days';
  END IF;
  
  -- Calculate Sunday of current week
  current_week_end := current_week_start + INTERVAL '6 days';

  -- Insert weekly quiz for current week (only if it doesn't exist)
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
  ON CONFLICT (week_start_date) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    theme = EXCLUDED.theme,
    difficulty = EXCLUDED.difficulty,
    total_questions = EXCLUDED.total_questions,
    time_limit = EXCLUDED.time_limit,
    is_active = EXCLUDED.is_active,
    updated_at = NOW()
  RETURNING id INTO quiz_id;

  -- Only insert questions if quiz was just created (not updated)
  -- Check if questions already exist
  IF NOT EXISTS (SELECT 1 FROM weekly_quiz_questions WHERE weekly_quiz_id = quiz_id) THEN
    -- Insert 25 Bible questions
    INSERT INTO weekly_quiz_questions (weekly_quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
    (quiz_id, 'Who wrote the first five books of the Bible?', 'Moses', 'David', 'Solomon', 'Isaiah', 0, 1),
    (quiz_id, 'What is the first book of the Bible?', 'Exodus', 'Genesis', 'Leviticus', 'Numbers', 1, 2),
    (quiz_id, 'How many days did it take God to create the world?', '5 days', '6 days', '7 days', '8 days', 1, 3),
    (quiz_id, 'Who was the first man created by God?', 'Noah', 'Adam', 'Abraham', 'Moses', 1, 4),
    (quiz_id, 'What was the name of the garden where Adam and Eve lived?', 'Garden of Gethsemane', 'Garden of Eden', 'Garden of Babylon', 'Garden of Paradise', 1, 5),
    (quiz_id, 'Who built the ark?', 'Moses', 'Noah', 'Abraham', 'David', 1, 6),
    (quiz_id, 'How many people were saved in the ark?', '6', '7', '8', '10', 2, 7),
    (quiz_id, 'Who was called the father of many nations?', 'Moses', 'Noah', 'Abraham', 'Isaac', 2, 8),
    (quiz_id, 'What was the name of Abraham''s wife?', 'Rebecca', 'Sarah', 'Rachel', 'Leah', 1, 9),
    (quiz_id, 'Who was sold into slavery by his brothers?', 'Benjamin', 'Joseph', 'Judah', 'Reuben', 1, 10),
    (quiz_id, 'Who led the Israelites out of Egypt?', 'Aaron', 'Moses', 'Joshua', 'Caleb', 1, 11),
    (quiz_id, 'How many plagues did God send to Egypt?', '7', '10', '12', '15', 1, 12),
    (quiz_id, 'What were the Ten Commandments written on?', 'Paper', 'Stone tablets', 'Gold plates', 'Wood', 1, 13),
    (quiz_id, 'Who was the first king of Israel?', 'David', 'Solomon', 'Saul', 'Samuel', 2, 14),
    (quiz_id, 'Who killed Goliath?', 'Saul', 'Jonathan', 'David', 'Samuel', 2, 15),
    (quiz_id, 'Who was known as the wisest man in the Bible?', 'David', 'Solomon', 'Moses', 'Daniel', 1, 16),
    (quiz_id, 'What was the name of the sea that Moses parted?', 'Red Sea', 'Dead Sea', 'Mediterranean Sea', 'Black Sea', 0, 17),
    (quiz_id, 'Who was thrown into a lions'' den?', 'Shadrach', 'Meshach', 'Daniel', 'Abednego', 2, 18),
    (quiz_id, 'Who was swallowed by a great fish?', 'Moses', 'Jonah', 'Elijah', 'Elisha', 1, 19),
    (quiz_id, 'What is the last book of the Old Testament?', 'Zechariah', 'Malachi', 'Haggai', 'Zephaniah', 1, 20),
    (quiz_id, 'Who was the mother of Jesus?', 'Elizabeth', 'Mary', 'Anna', 'Martha', 1, 21),
    (quiz_id, 'Where was Jesus born?', 'Nazareth', 'Jerusalem', 'Bethlehem', 'Jericho', 2, 22),
    (quiz_id, 'How many disciples did Jesus have?', '10', '11', '12', '13', 2, 23),
    (quiz_id, 'What was the name of the disciple who betrayed Jesus?', 'Peter', 'Judas', 'Thomas', 'John', 1, 24),
    (quiz_id, 'How many books are in the New Testament?', '25', '26', '27', '28', 2, 25);
  END IF;
END $$;

