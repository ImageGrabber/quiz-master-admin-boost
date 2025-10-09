-- Quick check to see the current status of challenge_requests table
-- Run this to see what the diagnostic script found

-- 1. Check if table exists
SELECT 'Table existence:' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as status;

-- 2. If table exists, show its structure
SELECT 'Table structure:' as info;
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'challenge_requests'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT 'RLS policies:' as info;
SELECT 
  policyname,
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'challenge_requests';

-- 4. Test if we can insert a record
SELECT 'Testing insert capability...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_challenge_id UUID;
BEGIN
  -- Get a user ID
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Try to insert a test record
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, message)
    VALUES (test_user_id, test_user_id, 'test-quiz-123', 'Test challenge')
    RETURNING id INTO test_challenge_id;
    
    IF test_challenge_id IS NOT NULL THEN
      RAISE NOTICE 'SUCCESS: Can insert into challenge_requests';
      -- Clean up
      DELETE FROM challenge_requests WHERE id = test_challenge_id;
    ELSE
      RAISE NOTICE 'FAILED: Insert did not work';
    END IF;
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'ERROR: %', SQLERRM;
END $$;

-- 5. Show current record count
SELECT 'Current records:' as info;
SELECT COUNT(*) as total_records FROM challenge_requests;

SELECT 'Status check complete!' as result;
