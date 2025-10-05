-- Quick verification that the session is accessible
-- Run this to confirm the session exists and can be queried

-- Check if the session exists
SELECT 
  'Session exists:' as check_type,
  session_code,
  title,
  status,
  created_at
FROM live_quiz_sessions 
WHERE session_code = 'F37EBD0CEF';

-- Check if the quiz exists
SELECT 
  'Quiz exists:' as check_type,
  ucq.id,
  ucq.title,
  ucq.share_code,
  ucq.is_public
FROM user_created_quizzes ucq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
WHERE lqs.session_code = 'F37EBD0CEF';

-- Check if there are any questions
SELECT 
  'Questions exist:' as check_type,
  COUNT(*) as question_count
FROM user_quiz_questions uqq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = uqq.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- Test the exact Supabase query format
SELECT 
  'Supabase query test:' as check_type,
  lqs.id,
  lqs.session_code,
  lqs.title as session_title,
  lqs.status,
  lqs.current_question,
  lqs.total_questions,
  ucq.id as quiz_id,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';
