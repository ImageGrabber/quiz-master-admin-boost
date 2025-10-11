-- Comprehensive debugging script for weekly attendance dashboard
-- Run this in Supabase SQL Editor to diagnose the issue

-- 1. Check if weekly_quiz_attempts table exists and has data
SELECT 
  'weekly_quiz_attempts table check' as test,
  COUNT(*) as total_records,
  COUNT(DISTINCT weekly_quiz_id) as unique_quizzes,
  COUNT(DISTINCT user_id) as unique_users
FROM weekly_quiz_attempts;

-- 2. Check if weekly_quizzes table exists and has data
SELECT 
  'weekly_quizzes table check' as test,
  COUNT(*) as total_quizzes,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_quizzes
FROM weekly_quizzes;

-- 3. Check RLS policies on weekly_quiz_attempts
SELECT 
  'RLS policies check' as test,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'weekly_quiz_attempts';

-- 4. Check if is_admin() function works
SELECT 
  'is_admin function test' as test,
  public.is_admin() as current_user_is_admin;

-- 5. Test direct query without RLS (if possible)
-- This might fail due to RLS, but let's see
SELECT 
  'Direct query test' as test,
  wqa.id,
  wqa.user_id,
  wqa.weekly_quiz_id,
  wqa.score,
  wqa.completed,
  wq.title as quiz_title
FROM weekly_quiz_attempts wqa
LEFT JOIN weekly_quizzes wq ON wqa.weekly_quiz_id = wq.id
LIMIT 5;

-- 6. Check if there are any attempts for quiz ID 1 (the one shown in your screenshot)
SELECT 
  'Quiz ID 1 attempts' as test,
  COUNT(*) as attempts_count,
  AVG(score) as avg_score,
  COUNT(CASE WHEN completed = true OR score > 0 THEN 1 END) as completed_count
FROM weekly_quiz_attempts 
WHERE weekly_quiz_id = 1;

-- 7. Check profiles table and join
SELECT 
  'Profiles join test' as test,
  COUNT(*) as profiles_count,
  COUNT(CASE WHEN full_name IS NOT NULL THEN 1 END) as profiles_with_names
FROM profiles;

-- 8. Test the exact query that the dashboard uses
SELECT 
  'Dashboard query test' as test,
  wqa.*,
  p.full_name,
  p.email
FROM weekly_quiz_attempts wqa
LEFT JOIN profiles p ON wqa.user_id = p.id
WHERE wqa.weekly_quiz_id = 1
LIMIT 5;
