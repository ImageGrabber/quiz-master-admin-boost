-- Check what columns exist in the profiles table
-- This will help us understand the actual structure

-- 1. Check profiles table structure
SELECT 'Profiles table structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Check what data exists in profiles
SELECT 'Sample profiles data:' as info;
SELECT * FROM profiles LIMIT 3;

-- 3. Check online_users table structure
SELECT 'Online users table structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'online_users'
ORDER BY ordinal_position;

-- 4. Check what data exists in online_users
SELECT 'Current online users data:' as info;
SELECT * FROM online_users LIMIT 3;
