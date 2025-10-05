-- Comprehensive debugging for 406 error
-- Run this in your Supabase SQL Editor

-- 1. Check if RLS is actually disabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename IN (
  'live_quiz_sessions',
  'live_quiz_participants', 
  'live_quiz_answers',
  'live_quiz_results',
  'user_created_quizzes',
  'user_quiz_questions'
)
ORDER BY tablename;

-- 2. Check if there are any remaining policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results', 'user_created_quizzes', 'user_quiz_questions')
ORDER BY tablename, policyname;

-- 3. Check if the session actually exists
SELECT * FROM live_quiz_sessions WHERE session_code = 'F37EBD0CEF';

-- 4. Check if the quiz exists
SELECT ucq.*, lqs.session_code 
FROM user_created_quizzes ucq
JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 5. Test the exact query that the app is using
SELECT 
  lqs.*,
  ucq.*
FROM live_quiz_sessions lqs
JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 6. Check if there are any foreign key constraints causing issues
SELECT 
  tc.table_name, 
  tc.constraint_name, 
  tc.constraint_type,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results', 'user_created_quizzes', 'user_quiz_questions');

-- 7. Check if there are any triggers that might be causing issues
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE event_object_table IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results', 'user_created_quizzes', 'user_quiz_questions');
