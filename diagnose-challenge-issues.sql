-- DIAGNOSE CHALLENGE SESSION ISSUES
-- Check why questions and participants aren't loading

-- 1. Check the challenge session details
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

-- 2. Check if quiz_questions exist for this quiz_id
SELECT 
  COUNT(*) as question_count,
  quiz_id
FROM quiz_questions 
WHERE quiz_id::text = (SELECT quiz_id::text FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
GROUP BY quiz_id;

-- 3. Check if there are any questions at all
SELECT 
  id,
  quiz_id,
  question,
  order_index
FROM quiz_questions 
WHERE quiz_id::text = (SELECT quiz_id::text FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
ORDER BY order_index
LIMIT 3;

-- 4. Check challenge participants
SELECT 
  cp.id,
  cp.challenge_session_id,
  cp.user_id,
  cp.display_name,
  cp.is_ready,
  cp.joined_at
FROM challenge_participants cp
WHERE cp.challenge_session_id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 5. Check if there are any participants at all
SELECT COUNT(*) as total_participants FROM challenge_participants;

-- 6. Check the challenge request
SELECT 
  cr.id,
  cr.challenger_id,
  cr.challenged_id,
  cr.quiz_id,
  cr.status,
  cr.created_at
FROM challenge_requests cr
JOIN challenge_sessions cs ON cr.id = cs.challenge_request_id
WHERE cs.id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 7. Check if the quiz exists
SELECT 
  id,
  title,
  description
FROM user_created_quizzes 
WHERE id::text = (SELECT quiz_id::text FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3');

SELECT 'Challenge session diagnosis completed!' as result;
