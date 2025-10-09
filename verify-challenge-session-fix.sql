-- VERIFY CHALLENGE SESSION FIX
-- Check if the challenge session issue has been resolved

-- 1. Check if challenge_sessions table now exists and has data
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_sessions') 
    THEN 'challenge_sessions table EXISTS'
    ELSE 'challenge_sessions table MISSING'
  END as table_status;

-- 2. Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if the specific session exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = 'a4923e30-993e-4fab-b56f-7aede182dce1')
    THEN 'Session EXISTS in database'
    ELSE 'Session NOT FOUND in database'
  END as session_status;

-- 4. Show all challenge sessions
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  challenger_id,
  challenged_id,
  status,
  total_questions,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC;

-- 5. Check challenge_requests table
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table EXISTS'
    ELSE 'challenge_requests table MISSING'
  END as requests_table_status;

-- 6. Show recent challenge requests
SELECT 
  id,
  challenger_id,
  challenged_id,
  quiz_id,
  status,
  created_at
FROM challenge_requests 
ORDER BY created_at DESC 
LIMIT 5;

-- 7. Test creating a new challenge session
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id INTEGER := 1;
  test_challenge_id UUID;
  test_session_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Create a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'accepted')
    RETURNING id INTO test_challenge_id;
    
    -- Create a test challenge session
    INSERT INTO challenge_sessions (
      challenge_request_id, 
      quiz_id, 
      challenger_id, 
      challenged_id, 
      total_questions
    )
    VALUES (
      test_challenge_id, 
      test_quiz_id, 
      test_user_id, 
      test_user_id, 
      5
    )
    RETURNING id INTO test_session_id;
    
    RAISE NOTICE 'New test challenge session created with ID: %', test_session_id;
    
    -- Log the created session details
    RAISE NOTICE 'Created session details: ID=%, Quiz=%, Status=%, Questions=%', 
      test_session_id, test_quiz_id, 'waiting', 5;
    
    -- Clean up test data
    DELETE FROM challenge_sessions WHERE id = test_session_id;
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Test challenge session creation and cleanup completed successfully';
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
END $$;

-- 8. Check if RLS is disabled (should be for testing)
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'challenge_sessions';

SELECT 'Verification completed! Check the results above.' as result;
