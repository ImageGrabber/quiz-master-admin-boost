-- Debug the results system
-- This will help identify why results aren't showing

-- 1. Check if live_quiz_results table exists and has data
SELECT 'Checking live_quiz_results table:' as info;
SELECT COUNT(*) as total_results FROM live_quiz_results;

-- 2. Check if there are any live quiz sessions
SELECT 'Current live quiz sessions:' as info;
SELECT 
  id,
  session_code,
  title,
  status,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 5;

-- 3. Check if there are any participants in recent sessions
SELECT 'Recent participants:' as info;
SELECT 
  lqp.id,
  lqp.session_id,
  lqp.display_name,
  lqp.joined_at,
  lqs.session_code,
  lqs.status
FROM live_quiz_participants lqp
JOIN live_quiz_sessions lqs ON lqs.id = lqp.session_id
ORDER BY lqp.joined_at DESC
LIMIT 10;

-- 4. Check if there are any answers submitted
SELECT 'Recent answers:' as info;
SELECT 
  lqa.id,
  lqa.participant_id,
  lqa.question_id,
  lqa.answer_index,
  lqa.response_time,
  lqp.display_name
FROM live_quiz_answers lqa
JOIN live_quiz_participants lqp ON lqp.id = lqa.participant_id
ORDER BY lqa.id DESC
LIMIT 10;

-- 5. Test the calculate_quiz_results function with the most recent session
SELECT 'Testing calculate_quiz_results function:' as info;
SELECT * FROM calculate_quiz_results(
  (SELECT id FROM live_quiz_sessions ORDER BY created_at DESC LIMIT 1)
);

-- 6. Check if results were created after running the function
SELECT 'Results after function test:' as info;
SELECT 
  id,
  session_id,
  participant_id,
  score,
  correct_answers,
  total_questions,
  average_response_time,
  completed_at
FROM live_quiz_results 
ORDER BY completed_at DESC
LIMIT 5;
