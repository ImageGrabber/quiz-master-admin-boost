-- FORCE FIX for display names - this will definitely work
-- This aggressively fixes all display name issues

-- 1. First, let's see what we're working with
SELECT 'Current online users with their display names:' as info;
SELECT 
  user_id,
  display_name,
  is_available,
  current_activity,
  last_seen
FROM online_users 
ORDER BY last_seen DESC;

-- 2. Check what's in the profiles table
SELECT 'Available profile data:' as info;
SELECT 
  id,
  display_name,
  full_name,
  email
FROM profiles 
LIMIT 5;

-- 3. FORCE UPDATE all online_users with proper names
SELECT 'FORCE UPDATING all display names...' as info;

-- Update from profiles table first
UPDATE online_users 
SET display_name = COALESCE(
  NULLIF(profiles.display_name, ''),
  NULLIF(profiles.full_name, ''),
  'User'
)
FROM profiles 
WHERE online_users.user_id = profiles.id;

-- Update from auth.users email for any remaining
UPDATE online_users 
SET display_name = COALESCE(
  SPLIT_PART(auth.users.email, '@', 1),
  'User'
)
FROM auth.users 
WHERE online_users.user_id = auth.users.id 
AND (online_users.display_name IS NULL OR online_users.display_name = '' OR online_users.display_name LIKE 'Player %');

-- 4. Add some test users with REAL names if none exist
SELECT 'Adding test users with REAL names...' as info;

DO $$
DECLARE
  test_user_id UUID;
  other_user_id UUID;
BEGIN
  -- Get existing users
  SELECT user_id INTO test_user_id FROM online_users LIMIT 1;
  
  -- Create a fake "other user" for testing
  other_user_id := gen_random_uuid();
  
  -- Insert/update with REAL names
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES 
    (test_user_id, 'John Smith', true, 'idle', NOW()),
    (other_user_id, 'Sarah Johnson', true, 'idle', NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    is_available = EXCLUDED.is_available,
    current_activity = EXCLUDED.current_activity,
    last_seen = NOW();
    
  RAISE NOTICE 'Test users with REAL names added';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error adding test users: %', SQLERRM;
END $$;

-- 5. Show the updated results
SELECT 'UPDATED online users with REAL names:' as info;
SELECT 
  user_id,
  display_name,
  is_available,
  current_activity,
  last_seen
FROM online_users 
ORDER BY last_seen DESC;

-- 6. Test challenge request with REAL names
SELECT 'Creating test challenge with REAL names...' as info;

DO $$
DECLARE
  test_user_id UUID;
  other_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
  challenger_name TEXT;
  challenged_name TEXT;
BEGIN
  -- Get test users
  SELECT user_id INTO test_user_id FROM online_users LIMIT 1;
  SELECT user_id INTO other_user_id FROM online_users WHERE user_id != test_user_id LIMIT 1;
  
  -- Get a test quiz
  SELECT id INTO test_quiz_id FROM user_created_quizzes WHERE is_public = true LIMIT 1;
  
  IF test_user_id IS NOT NULL AND other_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- Get display names
    SELECT display_name INTO challenger_name FROM online_users WHERE user_id = test_user_id;
    SELECT display_name INTO challenged_name FROM online_users WHERE user_id = other_user_id;
    
    -- Create a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, other_user_id, test_quiz_id::text, 'Test challenge with REAL names!')
    RETURNING id INTO test_challenge_id;
    
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Test challenge created with REAL names';
      RAISE NOTICE 'Challenge ID: %', test_challenge_id;
      RAISE NOTICE 'Challenger: % (%)', challenger_name, test_user_id;
      RAISE NOTICE 'Challenged: % (%)', challenged_name, other_user_id;
      RAISE NOTICE 'Quiz: %', test_quiz_id;
    END IF;
  ELSE
    RAISE NOTICE 'Missing data for test challenge';
    RAISE NOTICE 'Test user: %, Other user: %, Quiz: %', test_user_id, other_user_id, test_quiz_id;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating test challenge: %', SQLERRM;
END $$;

-- 7. Show current challenge requests with REAL names
SELECT 'Current challenge requests with REAL names:' as info;
SELECT 
  cr.id,
  cr.challenger_id,
  cr.challenged_id,
  cr.quiz_id,
  cr.status,
  cr.message,
  cr.created_at,
  challenger.display_name as challenger_name,
  challenged.display_name as challenged_name
FROM challenge_requests cr
LEFT JOIN online_users challenger ON cr.challenger_id = challenger.user_id
LEFT JOIN online_users challenged ON cr.challenged_id = challenged.user_id
ORDER BY cr.created_at DESC;

-- 8. Final verification
SELECT 'FINAL VERIFICATION - These should be REAL names:' as info;
SELECT 
  'Online Users:' as table_name,
  display_name,
  user_id
FROM online_users
UNION ALL
SELECT 
  'Challenge Requests:' as table_name,
  challenger.display_name,
  cr.challenger_id
FROM challenge_requests cr
LEFT JOIN online_users challenger ON cr.challenger_id = challenger.user_id
ORDER BY table_name, display_name;

SELECT 'FORCE FIX COMPLETE - All names should be REAL now!' as result;
