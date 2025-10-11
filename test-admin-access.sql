-- Simple test to verify admin access to weekly quiz data
-- Run this in Supabase SQL Editor

-- 1. Check current user and admin status
SELECT 
  'Current user check' as test,
  auth.uid() as current_user_id,
  public.is_admin() as is_admin_user;

-- 2. Test if we can see weekly quizzes
SELECT 
  'Weekly quizzes access' as test,
  COUNT(*) as total_quizzes,
  string_agg(id::text, ', ') as quiz_ids
FROM weekly_quizzes;

-- 3. Test if we can see attempts (this should work if RLS is fixed)
SELECT 
  'Weekly attempts access' as test,
  COUNT(*) as total_attempts,
  COUNT(DISTINCT weekly_quiz_id) as unique_quiz_ids,
  string_agg(DISTINCT weekly_quiz_id::text, ', ') as quiz_ids_with_attempts
FROM weekly_quiz_attempts;

-- 4. Test specific quiz ID 1 (from your screenshot)
SELECT 
  'Quiz ID 1 specific test' as test,
  COUNT(*) as attempts_for_quiz_1,
  AVG(score) as avg_score,
  MIN(score) as min_score,
  MAX(score) as max_score
FROM weekly_quiz_attempts 
WHERE weekly_quiz_id = 1;

-- 5. Test the exact join query
SELECT 
  'Join query test' as test,
  wqa.id,
  wqa.weekly_quiz_id,
  wqa.score,
  wqa.completed,
  p.full_name,
  p.email
FROM weekly_quiz_attempts wqa
LEFT JOIN profiles p ON wqa.user_id = p.id
WHERE wqa.weekly_quiz_id = 1
LIMIT 3;
