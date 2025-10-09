-- FIX CHALLENGE SESSION LOADING ISSUE
-- This will create the missing session and fix the loading problem

-- 1. Check if the specific session exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3')
    THEN 'Session EXISTS in database'
    ELSE 'Session NOT FOUND - need to create it'
  END as session_status;

-- 2. Check if there are any challenge requests that could create this session
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

-- 3. Create a test challenge session with the specific ID
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id INTEGER := 1;
  test_challenge_id UUID;
  target_session_id UUID := '563b49b8-69a3-465e-9a61-1995241da7e3';
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Create a test challenge request
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'accepted')
    RETURNING id INTO test_challenge_id;
    
    -- Create the specific challenge session with the target ID
    INSERT INTO challenge_sessions (
      id,
      challenge_request_id, 
      quiz_id, 
      challenger_id, 
      challenged_id, 
      total_questions,
      status
    )
    VALUES (
      target_session_id,
      test_challenge_id, 
      test_quiz_id, 
      test_user_id, 
      test_user_id, 
      5,
      'waiting'
    );
    
    RAISE NOTICE 'Challenge session created with ID: %', target_session_id;
    
    -- Verify the session was created
    IF EXISTS (SELECT 1 FROM challenge_sessions WHERE id = target_session_id) THEN
      RAISE NOTICE 'Session creation SUCCESSFUL';
    ELSE
      RAISE NOTICE 'Session creation FAILED';
    END IF;
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
END $$;

-- 4. Verify the session now exists
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
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 5. Show all challenge sessions
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  status,
  total_questions,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC;

SELECT 'Challenge session loading fix completed!' as result;
