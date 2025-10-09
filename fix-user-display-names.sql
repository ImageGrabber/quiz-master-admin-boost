-- Fix user display names in online_users table
-- This will ensure proper names are shown instead of "Player xyz"

-- 1. Check current online users
SELECT 'Current online users:' as info;
SELECT 
  user_id,
  display_name,
  is_available,
  current_activity
FROM online_users 
ORDER BY last_seen DESC;

-- 2. Update display names from profiles table
SELECT 'Updating display names from profiles...' as info;

UPDATE online_users 
SET display_name = profiles.display_name
FROM profiles 
WHERE online_users.user_id = profiles.id 
AND profiles.display_name IS NOT NULL 
AND profiles.display_name != '';

-- 3. Update display names from user metadata if profiles don't have names
SELECT 'Updating display names from user metadata...' as info;

UPDATE online_users 
SET display_name = COALESCE(
  NULLIF(profiles.full_name, ''),
  NULLIF(profiles.display_name, ''),
  SPLIT_PART(auth.users.email, '@', 1)
)
FROM profiles 
JOIN auth.users ON profiles.id = auth.users.id
WHERE online_users.user_id = profiles.id 
AND (online_users.display_name IS NULL OR online_users.display_name = '' OR online_users.display_name LIKE 'Player %');

-- 4. Clean up any remaining generic names
SELECT 'Cleaning up generic names...' as info;

UPDATE online_users 
SET display_name = SPLIT_PART(auth.users.email, '@', 1)
FROM auth.users 
WHERE online_users.user_id = auth.users.id 
AND (online_users.display_name LIKE 'Player %' OR online_users.display_name = '' OR online_users.display_name IS NULL);

-- 5. Show updated online users
SELECT 'Updated online users:' as info;
SELECT 
  user_id,
  display_name,
  is_available,
  current_activity,
  last_seen
FROM online_users 
ORDER BY last_seen DESC;

-- 6. Test challenge request with real names
SELECT 'Testing challenge request with real names...' as info;

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
    VALUES (test_user_id, other_user_id, test_quiz_id::text, 'Test challenge with real names!')
    RETURNING id INTO test_challenge_id;
    
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Test challenge created with real names';
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

-- 7. Show current challenge requests with names
SELECT 'Current challenge requests with names:' as info;
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

SELECT 'User display names fix complete!' as result;
