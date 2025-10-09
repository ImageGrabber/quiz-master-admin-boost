-- Diagnostic script to identify the challenge_requests issue
-- This will help us understand what's wrong

-- 1. Check if the table exists at all
SELECT 'Table existence check:' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table EXISTS'
    ELSE 'challenge_requests table DOES NOT EXIST'
  END as table_status;

-- 2. If table exists, check its structure
SELECT 'Table structure (if exists):' as info;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_requests'
ORDER BY ordinal_position;

-- 3. Check RLS status
SELECT 'RLS status:' as info;
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'challenge_requests';

-- 4. Check RLS policies
SELECT 'RLS policies:' as info;
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'challenge_requests';

-- 5. Check if user has access
SELECT 'User access test:' as info;
DO $$
DECLARE
  current_user_id UUID;
  test_result TEXT;
BEGIN
  -- Get current user
  SELECT auth.uid() INTO current_user_id;
  
  IF current_user_id IS NOT NULL THEN
    RAISE NOTICE 'Current user ID: %', current_user_id;
    
    -- Try to select from the table
    BEGIN
      PERFORM 1 FROM challenge_requests LIMIT 1;
      RAISE NOTICE 'SUCCESS: User can access challenge_requests table';
    EXCEPTION
      WHEN OTHERS THEN
        RAISE NOTICE 'ERROR: User cannot access challenge_requests table: %', SQLERRM;
    END;
  ELSE
    RAISE NOTICE 'No authenticated user found';
  END IF;
END $$;

-- 6. Check real-time status
SELECT 'Real-time status:' as info;
SELECT 
  schemaname,
  tablename,
  'Real-time enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename = 'challenge_requests';

-- 7. Try to create the table if it doesn't exist
SELECT 'Attempting to create table if missing...' as info;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') THEN
    -- Create the table
    CREATE TABLE challenge_requests (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      challenger_id UUID NOT NULL,
      challenged_id UUID NOT NULL,
      quiz_id TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      message TEXT,
      expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      responded_at TIMESTAMP WITH TIME ZONE
    );
    
    -- Enable RLS
    ALTER TABLE challenge_requests ENABLE ROW LEVEL SECURITY;
    
    -- Create simple policy
    CREATE POLICY "Enable all operations for authenticated users" ON challenge_requests
      FOR ALL USING (auth.uid() IS NOT NULL);
    
    -- Enable real-time
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;
    
    RAISE NOTICE 'SUCCESS: challenge_requests table created';
  ELSE
    RAISE NOTICE 'Table already exists, skipping creation';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'ERROR creating table: %', SQLERRM;
END $$;

-- 8. Final verification
SELECT 'Final verification:' as info;
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'challenge_requests') 
    THEN 'challenge_requests table is now available'
    ELSE 'challenge_requests table is still missing'
  END as final_status;

SELECT 'Diagnosis complete!' as result;
