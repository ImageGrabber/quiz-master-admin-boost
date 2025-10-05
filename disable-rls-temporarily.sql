-- Temporarily disable RLS for live quiz tables to test functionality
-- This will allow full access for testing purposes

-- Disable RLS on all live quiz tables
ALTER TABLE live_quiz_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_answers DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_created_quizzes DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_questions DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
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
