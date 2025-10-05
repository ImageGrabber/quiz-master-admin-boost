-- Complete debug and fix for the live quiz issue
-- This will identify the exact problem and fix it

-- 1. First, let's see the exact state of everything
SELECT '=== CURRENT STATE DEBUG ===' as info;

-- Check if session exists
SELECT 'Session exists:' as check_type, 
  CASE WHEN EXISTS(SELECT 1 FROM live_quiz_sessions WHERE session_code = 'F37EBD0CEF') 
  THEN 'YES' ELSE 'NO' END as result;

-- Check if quiz exists
SELECT 'Quiz exists:' as check_type,
  CASE WHEN EXISTS(
    SELECT 1 FROM user_created_quizzes ucq
    JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
    WHERE lqs.session_code = 'F37EBD0CEF'
  ) THEN 'YES' ELSE 'NO' END as result;

-- Get exact IDs
SELECT 'Session details:' as info, id, session_code, quiz_id, title, status, total_questions
FROM live_quiz_sessions 
WHERE session_code = 'F37EBD0CEF';

SELECT 'Quiz details:' as info, ucq.id, ucq.title, ucq.share_code, ucq.is_public
FROM user_created_quizzes ucq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 2. Check RLS status on all tables
SELECT '=== RLS STATUS ===' as info;

SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('live_quiz_sessions', 'user_created_quizzes', 'user_quiz_questions')
AND schemaname = 'public';

-- 3. Try to manually insert questions with explicit quiz_id
-- First get the exact quiz_id
WITH session_info AS (
  SELECT lqs.quiz_id, lqs.session_code
  FROM live_quiz_sessions lqs
  WHERE lqs.session_code = 'F37EBD0CEF'
)
SELECT 'Quiz ID for session:' as info, quiz_id, session_code
FROM session_info;

-- 4. Try inserting questions with the exact quiz_id
-- Get the quiz_id first and store it
DO $$
DECLARE
    target_quiz_id UUID;
BEGIN
    -- Get the quiz_id
    SELECT lqs.quiz_id INTO target_quiz_id
    FROM live_quiz_sessions lqs
    WHERE lqs.session_code = 'F37EBD0CEF';
    
    -- Insert questions directly
    INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
    VALUES 
        (target_quiz_id, 'What is the first book of the Bible?', 'Genesis', 'Exodus', 'Leviticus', 'Numbers', 0, 1),
        (target_quiz_id, 'Who was the first man created by God?', 'Adam', 'Eve', 'Noah', 'Abraham', 0, 2),
        (target_quiz_id, 'What did God create on the first day?', 'Light', 'Earth', 'Animals', 'Man', 0, 3)
    ON CONFLICT DO NOTHING;
    
    -- Update session question count
    UPDATE live_quiz_sessions 
    SET total_questions = (
        SELECT COUNT(*) 
        FROM user_quiz_questions uqq 
        WHERE uqq.quiz_id = target_quiz_id
    )
    WHERE session_code = 'F37EBD0CEF';
    
    RAISE NOTICE 'Questions inserted for quiz_id: %', target_quiz_id;
END $$;

-- 5. Verify the questions were added
SELECT '=== AFTER INSERT VERIFICATION ===' as info;

SELECT 'Questions count:' as check_type, COUNT(*) as count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

SELECT 'Questions details:' as info, uqq.question, uqq.option_a, uqq.option_b, uqq.option_c, uqq.option_d, uqq.correct_index, uqq.order_index
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF'
ORDER BY uqq.order_index;

-- 6. Test the exact app query
SELECT '=== APP QUERY TEST ===' as info;

SELECT lqs.*,
  json_build_object(
    'id', ucq.id,
    'title', ucq.title,
    'description', ucq.description,
    'is_public', ucq.is_public,
    'share_code', ucq.share_code,
    'created_at', ucq.created_at,
    'updated_at', ucq.updated_at
  ) as quiz
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 7. If still no questions, create a completely new session
-- This is a fallback if the above doesn't work
SELECT '=== FALLBACK: CREATE NEW SESSION ===' as info;

-- Create a new quiz
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Working Test Quiz',
  'A guaranteed working quiz for testing',
  true,
  'WORKING123'
) ON CONFLICT DO NOTHING;

-- Add questions to the new quiz
INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  id,
  'What is the first book of the Bible?',
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  0,
  1
FROM user_created_quizzes 
WHERE share_code = 'WORKING123'
ON CONFLICT DO NOTHING;

INSERT INTO user_quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
SELECT 
  id,
  'Who was the first man created by God?',
  'Adam',
  'Eve',
  'Noah',
  'Abraham',
  0,
  2
FROM user_created_quizzes 
WHERE share_code = 'WORKING123'
ON CONFLICT DO NOTHING;

-- Create new session
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'WORKING123',
  'Working Test Session',
  'waiting',
  (SELECT COUNT(*) FROM user_quiz_questions WHERE quiz_id = ucq.id)
FROM user_created_quizzes ucq
WHERE ucq.share_code = 'WORKING123'
ON CONFLICT DO NOTHING;

-- Verify the new session
SELECT 'New working session:' as info, session_code, title, status, total_questions
FROM live_quiz_sessions 
WHERE session_code = 'WORKING123';

SELECT 'New session questions:' as info, COUNT(*) as count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'WORKING123';
