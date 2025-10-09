-- REMOVE SPECIFIC QUIZZES
-- This will remove only the quizzes that are currently showing up

-- 1. Remove quiz-question relationships for specific quizzes
DELETE FROM quiz_questions 
WHERE quiz_id IN (
  SELECT id FROM quizzes 
  WHERE title IN (
    'Bible Basics Quiz', 
    'Book of Romans Quiz', 
    'Book of Acts Quiz'
  )
);

-- 2. Remove the specific quizzes
DELETE FROM quizzes 
WHERE title IN (
  'Bible Basics Quiz', 
  'Book of Romans Quiz', 
  'Book of Acts Quiz'
);

-- 3. Show what's left
SELECT 'Remaining quizzes:' as info;
SELECT id, title, description FROM quizzes ORDER BY id;

-- 4. Show confirmation
SELECT 'SPECIFIC QUIZZES REMOVED!' as result;
