-- COMPLETE CHALLENGE SETUP FIX
-- This will add participants and questions to make the challenge work for both players

-- 1. First, let's see what we have
SELECT 'Current session details:' as info;
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  challenger_id,
  challenged_id,
  status,
  total_questions,
  created_at
FROM challenge_sessions 
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 2. Add participants to the challenge session
DO $$
DECLARE
  session_id UUID := '563b49b8-69a3-465e-9a61-1995241da7e3';
  challenger_id UUID;
  challenged_id UUID;
  test_user_id UUID;
BEGIN
  -- Get the session details
  SELECT cs.challenger_id, cs.challenged_id 
  INTO challenger_id, challenged_id
  FROM challenge_sessions cs
  WHERE cs.id = session_id;
  
  -- Get any user for testing (in case we need a fallback)
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF challenger_id IS NOT NULL AND challenged_id IS NOT NULL THEN
    -- Add challenger as participant (only if not already exists)
    INSERT INTO challenge_participants (
      challenge_session_id,
      user_id,
      display_name,
      is_ready
    ) 
    SELECT session_id, challenger_id, 'Challenger', false
    WHERE NOT EXISTS (
      SELECT 1 FROM challenge_participants 
      WHERE challenge_session_id = session_id AND user_id = challenger_id
    );
    
    -- Add challenged as participant (only if not already exists)
    INSERT INTO challenge_participants (
      challenge_session_id,
      user_id,
      display_name,
      is_ready
    ) 
    SELECT session_id, challenged_id, 'Challenged Player', false
    WHERE NOT EXISTS (
      SELECT 1 FROM challenge_participants 
      WHERE challenge_session_id = session_id AND user_id = challenged_id
    );
    
    RAISE NOTICE 'Participants added to challenge session';
  ELSE
    RAISE NOTICE 'Could not find challenger/challenged IDs';
  END IF;
END $$;

-- 3. Check if we have questions for this quiz
SELECT 'Checking for questions...' as info;
SELECT 
  COUNT(*) as question_count
FROM quiz_questions 
WHERE quiz_id::text = (SELECT quiz_id::text FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3');

-- 4. If no questions exist, create some sample questions
DO $$
DECLARE
  session_quiz_id INTEGER;
  question_count INTEGER;
BEGIN
  -- Get the quiz_id from the session
  SELECT quiz_id INTO session_quiz_id 
  FROM challenge_sessions 
  WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';
  
  -- Check if questions exist
  SELECT COUNT(*) INTO question_count
  FROM quiz_questions 
  WHERE quiz_id = session_quiz_id;
  
  -- If no questions, create some sample ones
  IF question_count = 0 THEN
    INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
    (session_quiz_id, 'What is the first book of the Bible?', 'Genesis', 'Exodus', 'Leviticus', 'Numbers', 0, 1),
    (session_quiz_id, 'Who built the ark?', 'Moses', 'Noah', 'Abraham', 'David', 1, 2),
    (session_quiz_id, 'What is the shortest verse in the Bible?', 'Jesus wept', 'God is love', 'In the beginning', 'Amen', 0, 3),
    (session_quiz_id, 'Who was thrown into the lions den?', 'Daniel', 'David', 'Moses', 'Paul', 0, 4),
    (session_quiz_id, 'What does "Emmanuel" mean?', 'God with us', 'God is great', 'God saves', 'God loves', 0, 5);
    
    -- Update the session with the correct question count
    UPDATE challenge_sessions 
    SET total_questions = 5
    WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';
    
    RAISE NOTICE 'Sample questions created for quiz %', session_quiz_id;
  ELSE
    RAISE NOTICE 'Questions already exist for this quiz';
  END IF;
END $$;

-- 5. Verify participants were added
SELECT 'Participants in challenge:' as info;
SELECT 
  cp.id,
  cp.user_id,
  cp.display_name,
  cp.is_ready,
  cp.joined_at
FROM challenge_participants cp
WHERE cp.challenge_session_id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 6. Verify questions exist
SELECT 'Questions for this quiz:' as info;
SELECT 
  id,
  question,
  order_index
FROM quiz_questions 
WHERE quiz_id::text = (SELECT quiz_id::text FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
ORDER BY order_index;

-- 7. Update session status to waiting (ready for players)
UPDATE challenge_sessions 
SET status = 'waiting'
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 8. Final verification
SELECT 'Final session status:' as info;
SELECT 
  id,
  status,
  total_questions,
  challenger_id,
  challenged_id
FROM challenge_sessions 
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

SELECT 'Challenge setup completed! Both players should now be able to join and start the challenge.' as result;
