-- Test the results system
-- This will create test data and verify everything works

-- 1. Check if we have any sessions
SELECT 'Available sessions:' as info;
SELECT id, session_code, title, status FROM live_quiz_sessions ORDER BY created_at DESC LIMIT 3;

-- 2. Check if we have any participants
SELECT 'Available participants:' as info;
SELECT 
  lqp.id,
  lqp.display_name,
  lqs.session_code,
  lqs.status
FROM live_quiz_participants lqp
JOIN live_quiz_sessions lqs ON lqs.id = lqp.session_id
ORDER BY lqp.joined_at DESC
LIMIT 5;

-- 3. Check if we have any answers
SELECT 'Available answers:' as info;
SELECT 
  lqa.id,
  lqa.participant_id,
  lqa.answer_index,
  lqa.response_time,
  lqp.display_name
FROM live_quiz_answers lqa
JOIN live_quiz_participants lqp ON lqp.id = lqa.participant_id
LIMIT 5;

-- 4. Test the function with the most recent session
SELECT 'Testing function with recent session:' as info;
SELECT calculate_quiz_results(
  (SELECT id FROM live_quiz_sessions ORDER BY created_at DESC LIMIT 1)
);

-- 5. Check if results were created
SELECT 'Results after test:' as info;
SELECT 
  id,
  session_id,
  participant_name,
  score,
  correct_answers,
  total_questions,
  average_response_time
FROM live_quiz_results 
ORDER BY completed_at DESC
LIMIT 5;
