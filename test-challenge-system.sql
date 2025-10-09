-- Test script to verify challenge system is working
-- Run this after the fix to ensure everything is set up correctly

-- 1. Check if all required tables exist
SELECT 'Checking required tables...' as info;

SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = table_name) 
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as status
FROM (VALUES 
  ('online_users'),
  ('challenge_requests'),
  ('challenge_sessions'),
  ('challenge_participants'),
  ('challenge_answers'),
  ('challenge_results'),
  ('user_created_quizzes')
) AS required_tables(table_name);

-- 2. Check RLS policies
SELECT 'Checking RLS policies...' as info;
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results')
ORDER BY tablename, policyname;

-- 3. Check real-time subscriptions
SELECT 'Checking real-time subscriptions...' as info;
SELECT 
  schemaname,
  tablename,
  'Real-time enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('online_users', 'challenge_requests', 'challenge_sessions', 'challenge_participants', 'challenge_answers', 'challenge_results')
ORDER BY tablename;

-- 4. Test challenge request creation
SELECT 'Testing challenge request creation...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
  challenge_count INTEGER;
BEGIN
  -- Get a test user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- Get a test quiz ID
  SELECT id INTO test_quiz_id FROM user_created_quizzes WHERE is_public = true LIMIT 1;
  
  IF test_quiz_id IS NULL THEN
    -- Try main quizzes table
    SELECT id::text INTO test_quiz_id FROM quizzes LIMIT 1;
  END IF;
  
  IF test_user_id IS NOT NULL AND test_quiz_id IS NOT NULL THEN
    -- Count existing challenges
    SELECT COUNT(*) INTO challenge_count FROM challenge_requests;
    
    -- Insert a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'Test challenge request')
    RETURNING id INTO test_challenge_id;
    
    -- Verify it was created
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Challenge request created with ID: %', test_challenge_id;
      
      -- Clean up test data
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
      RAISE NOTICE 'Test challenge request cleaned up';
    ELSE
      RAISE NOTICE 'FAILED: Challenge request was not created';
    END IF;
  ELSE
    RAISE NOTICE 'SKIPPED: No users or quizzes available for testing';
    RAISE NOTICE 'User ID: %, Quiz ID: %', test_user_id, test_quiz_id;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'ERROR: Challenge request test failed: %', SQLERRM;
END $$;

-- 5. Check for any existing challenge requests
SELECT 'Current challenge requests:' as info;
SELECT COUNT(*) as total_requests FROM challenge_requests;

-- 6. Check online users
SELECT 'Current online users:' as info;
SELECT COUNT(*) as total_online_users FROM online_users;

-- 7. Check public quizzes
SELECT 'Public quizzes available:' as info;
SELECT COUNT(*) as public_quizzes_count FROM user_created_quizzes WHERE is_public = true;

SELECT 'Challenge system test complete!' as result;
