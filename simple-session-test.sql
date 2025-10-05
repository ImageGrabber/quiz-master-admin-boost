-- Simple session test - bypass complex joins
-- This will help identify if the issue is with the join or the basic query

-- 1. Test basic session lookup without joins
SELECT * FROM live_quiz_sessions WHERE session_code = 'F37EBD0CEF';

-- 2. Test basic quiz lookup
SELECT * FROM user_created_quizzes WHERE id IN (
  SELECT quiz_id FROM live_quiz_sessions WHERE session_code = 'F37EBD0CEF'
);

-- 3. Test the join separately
SELECT 
  lqs.id as session_id,
  lqs.session_code,
  lqs.title as session_title,
  lqs.status,
  ucq.id as quiz_id,
  ucq.title as quiz_title,
  ucq.share_code as quiz_share_code
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';

-- 4. If the above works, test with the exact Supabase query format
-- This mimics what the app is trying to do
SELECT 
  lqs.*,
  json_build_object(
    'id', ucq.id,
    'title', ucq.title,
    'description', ucq.description,
    'is_public', ucq.is_public,
    'share_code', ucq.share_code,
    'created_at', ucq.created_at,
    'updated_at', ucq.updated_at
  ) as quiz
FROM live_quiz_sessions lqs
LEFT JOIN user_created_quizzes ucq ON ucq.id = lqs.quiz_id
WHERE lqs.session_code = 'F37EBD0CEF';
