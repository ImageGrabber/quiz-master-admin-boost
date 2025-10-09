-- FIX CHALLENGE SESSION ISSUE
-- This will create the missing tables and fix the "Not found" issue

-- 1. Create challenge_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_request_id UUID,
  quiz_id INTEGER NOT NULL,
  challenger_id UUID NOT NULL,
  challenged_id UUID NOT NULL,
  status TEXT DEFAULT 'waiting',
  total_questions INTEGER DEFAULT 0,
  current_question INTEGER DEFAULT 0,
  time_limit INTEGER DEFAULT 30,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create challenge_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID NOT NULL,
  challenged_id UUID NOT NULL,
  quiz_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- 3. Create challenge_participants table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  is_ready BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create challenge_answers table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  participant_id UUID,
  question_id INTEGER,
  answer_index INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  response_time INTEGER NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create challenge_results table if it doesn't exist
CREATE TABLE IF NOT EXISTS challenge_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_session_id UUID,
  participant_id UUID,
  total_score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  average_response_time INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create online_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS online_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  current_activity TEXT DEFAULT 'idle',
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Disable RLS temporarily to avoid permission issues
ALTER TABLE challenge_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_answers DISABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_results DISABLE ROW LEVEL SECURITY;
ALTER TABLE online_users DISABLE ROW LEVEL SECURITY;

-- 8. Enable real-time for all tables
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_sessions;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_participants;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_answers;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE challenge_results;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE online_users;
  EXCEPTION WHEN duplicate_object THEN
    -- Table already in publication, ignore
  END;
END $$;

-- 9. Test creating a challenge session
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
    
    RAISE NOTICE 'Test challenge session created with ID: %', test_session_id;
    
    -- Clean up test data
    DELETE FROM challenge_sessions WHERE id = test_session_id;
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'Challenge session creation test PASSED';
  ELSE
    RAISE NOTICE 'No users found for testing';
  END IF;
END $$;

-- 10. Check if the specific session now exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM challenge_sessions WHERE id = 'a4923e30-993e-4fab-b56f-7aede182dce1')
    THEN 'Session EXISTS in database'
    ELSE 'Session NOT FOUND - may need to be recreated'
  END as session_status;

-- 11. Show all challenge sessions
SELECT 
  id,
  challenge_request_id,
  quiz_id,
  status,
  total_questions,
  created_at
FROM challenge_sessions 
ORDER BY created_at DESC;

SELECT 'Challenge session fix completed! Check the results above.' as result;
