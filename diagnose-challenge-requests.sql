-- Diagnose challenge_requests table issues
-- This will help identify what's wrong with the table structure

-- 1. Check if challenge_requests table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table EXISTS'
    ELSE 'challenge_requests table MISSING'
  END as table_status;

-- 2. If table exists, check its structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_requests' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'challenge_requests';

-- 4. Check RLS policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'challenge_requests';

-- 5. Check if user_created_quizzes table exists (for foreign key)
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_created_quizzes') 
    THEN 'user_created_quizzes table EXISTS'
    ELSE 'user_created_quizzes table MISSING'
  END as quiz_table_status;

-- 6. Check for any existing challenge_requests data
SELECT COUNT(*) as existing_requests FROM challenge_requests;

-- 7. Test basic insert (if table exists)
DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id UUID;
  test_challenge_id UUID;
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') THEN
    -- Get any user ID for testing
    SELECT id INTO test_user_id FROM auth.users LIMIT 1;
    
    IF test_user_id IS NOT NULL THEN
      -- Get any quiz ID for testing
      SELECT id INTO test_quiz_id FROM user_created_quizzes LIMIT 1;
      
      IF test_quiz_id IS NOT NULL THEN
        -- Test challenge request creation
        BEGIN
          INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
          VALUES (test_user_id, test_user_id, test_quiz_id, 'pending')
          RETURNING id INTO test_challenge_id;
          
          -- Clean up test data
          DELETE FROM challenge_requests WHERE id = test_challenge_id;
          
          RAISE NOTICE 'Challenge request insert test PASSED';
        EXCEPTION WHEN OTHERS THEN
          RAISE NOTICE 'Challenge request insert test FAILED: %', SQLERRM;
        END;
      ELSE
        RAISE NOTICE 'No quizzes found for testing';
      END IF;
    ELSE
      RAISE NOTICE 'No users found for testing';
    END IF;
  ELSE
    RAISE NOTICE 'challenge_requests table does not exist';
  END IF;
END $$;

SELECT 'Diagnosis completed!' as result;
