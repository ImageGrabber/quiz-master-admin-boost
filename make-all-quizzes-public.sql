-- Simple script to make all quizzes available for challenges
-- This will ensure all existing quizzes can be used in challenges

-- 1. Make all existing user_created_quizzes public
UPDATE user_created_quizzes 
SET is_public = true 
WHERE is_public = false;

-- 2. Check how many quizzes are now public
SELECT 'Public quizzes count:' as info;
SELECT COUNT(*) as public_quizzes_count 
FROM user_created_quizzes 
WHERE is_public = true;

-- 3. Show all available quizzes for challenges
SELECT 'Available quizzes for challenges:' as info;
SELECT 
  id,
  title,
  description,
  is_public,
  created_at
FROM user_created_quizzes 
WHERE is_public = true
ORDER BY created_at DESC;

-- 4. If there are no quizzes in user_created_quizzes, create some from main quizzes table
INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code, created_at)
SELECT 
  NULL as creator_id,
  q.title,
  q.description,
  true as is_public,
  UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 10)) as share_code,
  q.created_at
FROM quizzes q
WHERE NOT EXISTS (
  SELECT 1 FROM user_created_quizzes ucq 
  WHERE ucq.title = q.title
)
LIMIT 20; -- Limit to avoid too many duplicates

-- 5. Final count
SELECT 'Final public quizzes count:' as info;
SELECT COUNT(*) as public_quizzes_count 
FROM user_created_quizzes 
WHERE is_public = true;

SELECT 'All quizzes are now public for challenges!' as result;
