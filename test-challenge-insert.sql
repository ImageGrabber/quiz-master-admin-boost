-- Simple test to verify challenge_requests table is working
-- This will test the exact same operation that's failing in the frontend

-- 1. Get a user ID for testing
SELECT 'Getting test user...' as info;
SELECT id as test_user_id FROM auth.users LIMIT 1;

-- 2. Test the exact insert operation that's failing
SELECT 'Testing challenge request creation...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_challenge_id UUID;
  insert_success BOOLEAN := FALSE;
BEGIN
  -- Get a user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    RAISE NOTICE 'Using user ID: %', test_user_id;
    
    -- Try the exact same insert that the frontend is trying
    BEGIN
      INSERT INTO challenge_requests (
        challenger_id, 
        challenged_id, 
        quiz_id, 
        message
      ) VALUES (
        test_user_id,
        test_user_id,
        'test-quiz-123',
        'Test challenge message'
      ) RETURNING id INTO test_challenge_id;
      
      insert_success := TRUE;
      RAISE NOTICE 'SUCCESS: Challenge request created with ID: %', test_challenge_id;
      
    EXCEPTION
      WHEN OTHERS THEN
        RAISE NOTICE 'ERROR during insert: %', SQLERRM;
        RAISE NOTICE 'Error code: %', SQLSTATE;
    END;
    
    -- Clean up if successful
    IF insert_success AND test_challenge_id IS NOT NULL THEN
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
      RAISE NOTICE 'Test record cleaned up';
    END IF;
    
  ELSE
    RAISE NOTICE 'ERROR: No users found in auth.users table';
  END IF;
END $$;

-- 3. Check if the table is accessible via REST API
SELECT 'Checking table accessibility...' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'Table exists and should be accessible via REST API'
    ELSE 'Table does not exist - this is the problem!'
  END as api_accessibility;

-- 4. Show any existing challenge requests
SELECT 'Existing challenge requests:' as info;
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

SELECT 'Challenge insert test complete!' as result;
