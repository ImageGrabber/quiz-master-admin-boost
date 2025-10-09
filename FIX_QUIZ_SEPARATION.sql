-- FIX QUIZ SEPARATION
-- This will properly separate challenge quizzes from regular quizzes

-- 1. Add a field to distinguish quiz types
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS quiz_type VARCHAR(20) DEFAULT 'regular';

-- 2. Mark the challenge quizzes as challenge type
UPDATE quizzes 
SET quiz_type = 'challenge' 
WHERE title IN (
  'Bible Basics Quiz', 
  'Book of Romans Quiz', 
  'Book of Acts Quiz'
);

-- 3. Ensure all other quizzes are marked as regular
UPDATE quizzes 
SET quiz_type = 'regular' 
WHERE quiz_type IS NULL OR quiz_type = 'regular';

-- 4. Show the separation
SELECT 'Quiz separation completed:' as info;
SELECT id, title, quiz_type FROM quizzes ORDER BY quiz_type, title;

-- 5. Show counts
SELECT 'Regular quizzes:' as type, COUNT(*) as count FROM quizzes WHERE quiz_type = 'regular'
UNION ALL
SELECT 'Challenge quizzes:', COUNT(*) FROM quizzes WHERE quiz_type = 'challenge';
