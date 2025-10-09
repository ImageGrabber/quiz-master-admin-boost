-- Populate test data for challenge system
-- This will add some sample data so we can see proper names and quizzes

-- 1. Get a user ID for testing
SELECT 'Getting test user...' as info;
SELECT id as test_user_id FROM auth.users LIMIT 1;

-- 2. Add some test online users
SELECT 'Adding test online users...' as info;

DO $$
DECLARE
  test_user_id UUID;
  other_user_id UUID;
BEGIN
  -- Get test users
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- Create a fake "other user" ID for testing
  other_user_id := gen_random_uuid();
  
  -- Add test online users
  INSERT INTO online_users (user_id, display_name, is_available, current_activity, last_seen)
  VALUES 
    (test_user_id, 'Test User', true, 'idle', NOW()),
    (other_user_id, 'Challenge Player', true, 'idle', NOW())
  ON CONFLICT (user_id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    is_available = EXCLUDED.is_available,
    current_activity = EXCLUDED.current_activity,
    last_seen = NOW();
    
  RAISE NOTICE 'Test online users added';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error adding test users: %', SQLERRM;
END $$;

-- 3. Add some test quizzes if none exist
SELECT 'Adding test quizzes...' as info;

DO $$
DECLARE
  test_quiz_id UUID;
  quiz_count INTEGER;
BEGIN
  -- Check if we have any public quizzes
  SELECT COUNT(*) INTO quiz_count FROM user_created_quizzes WHERE is_public = true;
  
  IF quiz_count = 0 THEN
    -- Add a test quiz
    INSERT INTO user_created_quizzes (creator_id, title, description, is_public, share_code)
    VALUES 
      (NULL, 'Bible Knowledge Quiz', 'Test your Bible knowledge with this challenging quiz!', true, 'BIBLE123'),
      (NULL, 'Quick Bible Facts', 'Fast-paced Bible facts and trivia', true, 'QUICK456'),
      (NULL, 'Bible Stories Quiz', 'Questions about famous Bible stories', true, 'STORY789')
    ON CONFLICT (share_code) DO NOTHING;
    
    RAISE NOTICE 'Test quizzes added';
  ELSE
    RAISE NOTICE 'Public quizzes already exist: %', quiz_count;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error adding test quizzes: %', SQLERRM;
END $$;

-- 4. Show current online users
SELECT 'Current online users:' as info;
SELECT 
  user_id,
  display_name,
  is_available,
  current_activity,
  last_seen
FROM online_users 
ORDER BY last_seen DESC;

-- 5. Show available quizzes
SELECT 'Available quizzes:' as info;
SELECT 
  id,
  title,
  description,
  is_public,
  share_code
FROM user_created_quizzes 
WHERE is_public = true
ORDER BY created_at DESC;

-- 6. Test challenge request creation
SELECT 'Testing challenge request with real data...' as info;

DO $$
DECLARE
  test_user_id UUID;
  other_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get test users
  SELECT user_id INTO test_user_id FROM online_users LIMIT 1;
  SELECT user_id INTO other_user_id FROM online_users WHERE user_id != test_user_id LIMIT 1;
  
  -- Get a test quiz
  SELECT id INTO test_quiz_id FROM user_created_quizzes WHERE is_public = true LIMIT 1;
  
  IF test_user_id IS NOT NULL AND other_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- Create a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, other_user_id, test_quiz_id::text, 'Test challenge with real data!')
    RETURNING id INTO test_challenge_id;
    
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Test challenge created with real data';
      RAISE NOTICE 'Challenge ID: %', test_challenge_id;
      RAISE NOTICE 'Challenger: %', test_user_id;
      RAISE NOTICE 'Challenged: %', other_user_id;
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

-- 7. Show current challenge requests
SELECT 'Current challenge requests:' as info;
SELECT 
  id,
  challenger_id,
  challenged_id,
  quiz_id,
  status,
  message,
  created_at
FROM challenge_requests 
ORDER BY created_at DESC;

SELECT 'Test data population complete!' as result;
