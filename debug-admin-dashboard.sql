-- Debug Admin Dashboard Data
-- Run this in your Supabase SQL Editor to see what data is available

-- Check profiles table
SELECT 'Profiles table:' as info, COUNT(*) as count FROM public.profiles;

-- Check attempts table
SELECT 'Attempts table:' as info, COUNT(*) as count FROM public.attempts;

-- Check if there are any attempts
SELECT 
  'Recent attempts:' as info,
  COUNT(*) as count
FROM public.attempts
WHERE created_at > NOW() - INTERVAL '7 days';

-- Show sample attempts data
SELECT 
  id,
  user_id,
  quiz_id,
  score,
  seconds_used,
  created_at
FROM public.attempts
ORDER BY created_at DESC
LIMIT 10;

-- Show sample profiles data
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 10;

-- Check if attempts have valid user_ids
SELECT 
  'Attempts with valid user_ids:' as info,
  COUNT(*) as count
FROM public.attempts a
JOIN public.profiles p ON a.user_id = p.id;

-- Check if attempts have valid quiz_ids
SELECT 
  'Attempts with valid quiz_ids:' as info,
  COUNT(*) as count
FROM public.attempts a
JOIN public.quizzes q ON a.quiz_id = q.id;

-- Calculate admin dashboard stats manually
SELECT 
  'Manual calculation:' as info,
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.attempts) as total_attempts,
  (SELECT ROUND(AVG(score)) FROM public.attempts) as avg_score,
  (SELECT MAX(score) FROM public.attempts) as highest_score; 