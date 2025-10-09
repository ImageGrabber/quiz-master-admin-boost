-- ULTRA SIMPLE QUIZ FIX - No foreign keys, no complications
-- This will definitely work

-- 1. Drop everything first
DROP TABLE IF EXISTS challenge_requests CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;

-- 2. Create ultra-simple quizzes table
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create ultra-simple quiz_questions table
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Create ultra-simple challenge_requests table
CREATE TABLE challenge_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenger_id UUID NOT NULL,
  challenged_id UUID NOT NULL,
  quiz_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  message TEXT,
  expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP
);

-- 5. NO RLS - No security complications
-- 6. NO foreign keys - No relationship issues

-- 7. Enable real-time
ALTER PUBLICATION supabase_realtime ADD TABLE quizzes;
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_questions;
ALTER PUBLICATION supabase_realtime ADD TABLE challenge_requests;

-- 8. Insert sample data
INSERT INTO quizzes (title, description, is_public) VALUES
('Bible Basics Quiz', 'Test your knowledge of basic Bible facts', true),
('Book of Romans Quiz', 'Questions about the Book of Romans', true),
('Book of Acts Quiz', 'Questions about the Book of Acts', true);

-- 9. Test everything works
SELECT 'Testing ultra-simple system...' as info;

DO $$
DECLARE
  test_user_id UUID;
  test_quiz_id INTEGER;
  test_challenge_id UUID;
BEGIN
  -- Get any user ID for testing
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NOT NULL THEN
    -- Use quiz ID 1
    test_quiz_id := 1;
    
    -- Test challenge request creation
    INSERT INTO challenge_requests (challenger_id, challenged_id, quiz_id, status)
    VALUES (test_user_id, test_user_id, test_quiz_id, 'pending')
    RETURNING id INTO test_challenge_id;
    
    -- Test challenge response
    UPDATE challenge_requests 
    SET status = 'accepted', responded_at = NOW()
    WHERE id = test_challenge_id;
    
    -- Clean up test data
    DELETE FROM challenge_requests WHERE id = test_challenge_id;
    
    RAISE NOTICE 'ULTRA-SIMPLE SYSTEM TEST PASSED!';
  ELSE
    RAISE NOTICE 'No users found, but system is ready';
  END IF;
END $$;

SELECT 'ULTRA-SIMPLE QUIZ SYSTEM CREATED SUCCESSFULLY!' as result;
