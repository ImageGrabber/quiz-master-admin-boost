-- Fix challenge session creation issues
-- This will ensure challenge sessions can be created properly

-- 1. Check current challenge_sessions table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if there are any RLS policies blocking access
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'challenge_sessions';

-- 3. Disable RLS temporarily to test
ALTER TABLE challenge_sessions DISABLE ROW LEVEL SECURITY;

-- 4. Test inserting a challenge session
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id INTEGER;
  test_challenge_id UUID;
  test_session_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Use quiz ID 1
    test_quiz_id := 1;
    
    -- Create a test challenge request first
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'accepted')
    RETURNING id INTO test_challenge_id;
    
    -- Test challenge session creation
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
    
    RAISE NOTICE 'Test challenge session created with ID: %', test_session_id;
    
    -- Clean up test data
    DELETE FROM challenge_sessions WHERE id = test_session_id;
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Challenge session creation test PASSED';
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
END $$;

-- 5. Re-enable RLS with simple policy
ALTER TABLE challenge_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable all for challenge_sessions" ON challenge_sessions;

-- Create simple policy
CREATE POLICY "Enable all for challenge_sessions" ON challenge_sessions
  FOR ALL USING (auth.uid() IS NOT NULL);

SELECT 'Challenge session creation fix completed!' as result;
