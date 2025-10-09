-- Fix challenge system to include all available quizzes
-- This script will make existing quizzes available for challenges

-- 1. Check what quizzes exist in different tables
SELECT 'Quizzes in main quizzes table:' as info;
SELECT id, title, description, created_at 
FROM quizzes 
ORDER BY created_at DESC 
LIMIT 10;

SELECT 'Quizzes in user_created_quizzes table:' as info;
SELECT id, title, description, is_public, created_at 
FROM user_created_quizzes 
ORDER BY created_at DESC 
LIMIT 10;

-- 2. Check if there are any public quizzes
SELECT 'Public quizzes count:' as info;
SELECT COUNT(*) as public_quizzes_count 
FROM user_created_quizzes 
WHERE is_public = true;

-- 3. Create a function to migrate quizzes from main table to user_created_quizzes
CREATE OR REPLACE FUNCTION migrate_quizzes_for_challenges()
RETURNS void AS $$
DECLARE
  quiz_record RECORD;
  new_quiz_id UUID;
BEGIN
  -- Loop through all quizzes in the main quizzes table
  FOR quiz_record IN 
    SELECT q.id, q.title, q.description, q.created_at
    FROM quizzes q
    WHERE NOT EXISTS (
      SELECT 1 FROM user_created_quizzes ucq 
      WHERE ucq.title = q.title
    )
  LOOP
    -- Insert into user_created_quizzes with is_public = true
    INSERT INTO user_created_quizzes (
      creator_id,
      title,
      description,
      is_public,
      share_code,
      created_at
    ) VALUES (
      NULL, -- No specific creator for migrated quizzes
      quiz_record.title,
      quiz_record.description,
      true, -- Make them public for challenges
      UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 10)), -- Generate share code
      quiz_record.created_at
    ) RETURNING id INTO new_quiz_id;
    
    -- Migrate questions for this quiz
    INSERT INTO user_quiz_questions (
      quiz_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_index,
      order_index,
      created_at
    )
    SELECT 
      new_quiz_id,
      q.question,
      q.option_a,
      q.option_b,
      q.option_c,
      q.option_d,
      q.correct_index,
      qq.order_index,
      q.created_at
    FROM questions q
    JOIN quiz_questions qq ON q.id = qq.question_id
    WHERE qq.quiz_id = quiz_record.id
    ORDER BY qq.order_index;
    
    RAISE NOTICE 'Migrated quiz: % (ID: %)', quiz_record.title, new_quiz_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4. Run the migration
SELECT 'Migrating quizzes for challenges...' as status;
SELECT migrate_quizzes_for_challenges();

-- 5. Make all existing user_created_quizzes public
UPDATE user_created_quizzes 
SET is_public = true 
WHERE is_public = false;

-- 6. Verify the results
SELECT 'Final public quizzes count:' as info;
SELECT COUNT(*) as public_quizzes_count 
FROM user_created_quizzes 
WHERE is_public = true;

SELECT 'Available quizzes for challenges:' as info;
SELECT id, title, description, is_public, created_at
FROM user_created_quizzes 
WHERE is_public = true
ORDER BY created_at DESC;

-- 7. Check if there are questions for these quizzes
SELECT 'Quiz questions count:' as info;
SELECT 
  ucq.title,
  COUNT(uqq.id) as question_count
FROM user_created_quizzes ucq
LEFT JOIN user_quiz_questions uqq ON ucq.id = uqq.quiz_id
WHERE ucq.is_public = true
GROUP BY ucq.id, ucq.title
ORDER BY question_count DESC;

SELECT 'Challenge quizzes setup complete!' as result;
