-- REMOVE ALL QUIZZES FROM DATABASE
-- This will completely clean the quiz system

-- 1. Remove all quiz-question relationships
DELETE FROM quiz_questions;

-- 2. Remove all questions
DELETE FROM questions;

-- 3. Remove all quizzes
DELETE FROM quizzes;

-- 4. Reset the auto-increment counters
ALTER SEQUENCE quizzes_id_seq RESTART WITH 1;
ALTER SEQUENCE questions_id_seq RESTART WITH 1;

-- 5. Verify everything is clean
SELECT 'Quizzes remaining:' as info, COUNT(*) as count FROM quizzes
UNION ALL
SELECT 'Questions remaining:', COUNT(*) FROM questions
UNION ALL
SELECT 'Quiz-Question links remaining:', COUNT(*) FROM quiz_questions;

-- 6. Show confirmation
SELECT 'ALL QUIZZES REMOVED SUCCESSFULLY!' as result;
