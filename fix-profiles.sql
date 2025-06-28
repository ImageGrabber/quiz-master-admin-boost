-- Fix Profile Issues
-- Run this in your Supabase SQL Editor

-- Check if there are users without profiles
SELECT 
  'Users without profiles:' as info,
  COUNT(*) as count
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Check if there are attempts from users without profiles
SELECT 
  'Attempts from users without profiles:' as info,
  COUNT(*) as count
FROM public.attempts a
LEFT JOIN public.profiles p ON a.user_id = p.id
WHERE p.id IS NULL;

-- Create missing profiles for users who have attempts but no profile
INSERT INTO public.profiles (id, email, full_name)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '')
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
  AND u.id IN (SELECT DISTINCT user_id FROM public.attempts)
ON CONFLICT (id) DO NOTHING;

-- Verify the fix
SELECT 
  'Total profiles after fix:' as info,
  COUNT(*) as count
FROM public.profiles;

-- Show sample leaderboard data
SELECT 
  a.user_id,
  a.score,
  p.full_name,
  p.email,
  CASE 
    WHEN p.full_name IS NOT NULL THEN p.full_name
    WHEN p.email IS NOT NULL THEN p.email
    ELSE 'Anonymous User'
  END as display_name
FROM public.attempts a
LEFT JOIN public.profiles p ON a.user_id = p.id
ORDER BY a.score DESC
LIMIT 10; 