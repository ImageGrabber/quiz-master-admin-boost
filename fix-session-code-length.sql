-- Fix session code length issue
-- The session_code field is limited to 8 characters

-- 1. First, let's check the current session code length
SELECT 'Current session code:' as info, session_code, LENGTH(session_code) as code_length
FROM live_quiz_sessions 
WHERE session_code = 'F37EBD0CEF';

-- 2. Update the existing session to use a shorter code
UPDATE live_quiz_sessions 
SET session_code = 'F37EBD0C'
WHERE session_code = 'F37EBD0CEF';

-- 3. Create a new working session with short codes
-- Create a new quiz
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'Working Test Quiz',
  'A guaranteed working quiz for testing',
  true,
  'WORK123'
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
WHERE share_code = 'WORK123'
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
WHERE share_code = 'WORK123'
ON CONFLICT DO NOTHING;

-- Create new session with short code
INSERT INTO live_quiz_sessions (quiz_id, host_id, session_code, title, status, total_questions)
SELECT 
  ucq.id,
  (SELECT id FROM auth.users LIMIT 1),
  'WORK123',
  'Working Test Session',
  'waiting',
  (SELECT COUNT(*) FROM user_quiz_questions WHERE quiz_id = ucq.id)
FROM user_created_quizzes ucq
WHERE ucq.share_code = 'WORK123'
ON CONFLICT DO NOTHING;

-- 4. Try to add questions to the existing session (now with shorter code)
DO $$
DECLARE
    target_quiz_id UUID;
BEGIN
    -- Get the quiz_id for the updated session
    SELECT lqs.quiz_id INTO target_quiz_id
    FROM live_quiz_sessions lqs
    WHERE lqs.session_code = 'F37EBD0C';
    
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
    WHERE session_code = 'F37EBD0C';
    
    RAISE NOTICE 'Questions inserted for quiz_id: %', target_quiz_id;
END $$;

-- 5. Verify both sessions
SELECT '=== SESSION VERIFICATION ===' as info;

-- Check the updated original session
SELECT 'Updated original session:' as info, session_code, title, status, total_questions
FROM live_quiz_sessions 
WHERE session_code = 'F37EBD0C';

SELECT 'Original session questions:' as info, COUNT(*) as count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0C';

-- Check the new working session
SELECT 'New working session:' as info, session_code, title, status, total_questions
FROM live_quiz_sessions 
WHERE session_code = 'WORK123';

SELECT 'New session questions:' as info, COUNT(*) as count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'WORK123';

-- 6. Test the app query for both sessions
SELECT '=== APP QUERY TEST - ORIGINAL SESSION ===' as info;

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
WHERE lqs.session_code = 'F37EBD0C';

SELECT '=== APP QUERY TEST - NEW SESSION ===' as info;

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
WHERE lqs.session_code = 'WORK123';
