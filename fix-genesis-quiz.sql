-- Fix existing Genesis quizzes to generic format
-- This will update any existing Genesis quizzes to remove the book-specific reference

-- Update the default value for total_questions to 35
ALTER TABLE weekly_quizzes ALTER COLUMN total_questions SET DEFAULT 35;

UPDATE weekly_quizzes 
SET 
  title = 'Weekly Bible Challenge',
  description = 'Test your knowledge with this week''s special Bible quiz',
  theme = 'Bible',
  total_questions = 35
WHERE title LIKE '%Genesis%' OR title LIKE '%Genesis Focus%';

-- Also update any Psalms quizzes to generic format if they have specific references
UPDATE weekly_quizzes 
SET 
  title = 'Weekly Bible Challenge',
  description = 'Test your knowledge with this week''s special Bible quiz',
  theme = 'Bible',
  total_questions = 35
WHERE title LIKE '%Psalms%' OR title LIKE '%Psalms Focus%';

-- Show the updated quizzes
SELECT id, title, description, theme, total_questions, week_start_date, week_end_date 
FROM weekly_quizzes 
ORDER BY week_start_date DESC;
