-- Debug Leaderboard Data
-- Run this in your Supabase SQL Editor to see what's happening

-- Check if there are any attempts
SELECT 'Total attempts:' as info, COUNT(*) as count FROM public.attempts;

-- Check if there are any profiles
SELECT 'Total profiles:' as info, COUNT(*) as count FROM public.profiles;

-- Check attempts with user details
SELECT 
  a.id,
  a.user_id,
  a.score,
  a.created_at,
  p.full_name,
  p.email
FROM public.attempts a
LEFT JOIN public.profiles p ON a.user_id = p.id
ORDER BY a.created_at DESC
LIMIT 10;

-- Check if there are any attempts without corresponding profiles
SELECT 
  'Attempts without profiles:' as info,
  COUNT(*) as count
FROM public.attempts a
LEFT JOIN public.profiles p ON a.user_id = p.id
WHERE p.id IS NULL;

-- Test the leaderboard query
SELECT 
  a.user_id,
  a.score,
  a.created_at,
  p.full_name,
  p.email
FROM public.attempts a
LEFT JOIN public.profiles p ON a.user_id = p.id
ORDER BY a.score DESC
LIMIT 10; 