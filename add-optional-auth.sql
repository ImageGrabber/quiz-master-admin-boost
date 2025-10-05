-- Add optional authentication support for live quizzes
-- This allows quizzes to be created with or without login requirements

-- 1. Add column to user_created_quizzes to specify if login is required
ALTER TABLE user_created_quizzes 
ADD COLUMN IF NOT EXISTS requires_login BOOLEAN DEFAULT true;

-- 2. Add column to live_quiz_sessions to inherit the login requirement
ALTER TABLE live_quiz_sessions 
ADD COLUMN IF NOT EXISTS requires_login BOOLEAN DEFAULT true;

-- 3. Update live_quiz_participants to support anonymous users
ALTER TABLE live_quiz_participants 
ALTER COLUMN user_id DROP NOT NULL;

-- 4. Add a display_name column to live_quiz_participants if it doesn't exist
ALTER TABLE live_quiz_participants 
ADD COLUMN IF NOT EXISTS display_name VARCHAR(100);

-- 5. Update existing sessions to inherit login requirement from their quiz
UPDATE live_quiz_sessions 
SET requires_login = ucq.requires_login
FROM user_created_quizzes ucq
WHERE live_quiz_sessions.quiz_id = ucq.id;

-- 6. Create RLS policies for anonymous access
-- Allow anonymous users to read sessions that don't require login
DROP POLICY IF EXISTS "Allow anonymous read access to public sessions" ON live_quiz_sessions;
CREATE POLICY "Allow anonymous read access to public sessions" ON live_quiz_sessions
FOR SELECT USING (requires_login = false);

-- Allow anonymous users to join sessions that don't require login
DROP POLICY IF EXISTS "Allow anonymous join to public sessions" ON live_quiz_participants;
CREATE POLICY "Allow anonymous join to public sessions" ON live_quiz_participants
FOR INSERT WITH CHECK (
  session_id IN (
    SELECT id FROM live_quiz_sessions WHERE requires_login = false
  )
);

-- Allow anonymous users to update their own participation
DROP POLICY IF EXISTS "Allow anonymous update participation" ON live_quiz_participants;
CREATE POLICY "Allow anonymous update participation" ON live_quiz_participants
FOR UPDATE USING (user_id IS NULL);

-- 7. Verify the changes
SELECT 'Schema updated successfully!' as result;
SELECT 
  'user_created_quizzes columns:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_created_quizzes' 
AND column_name IN ('requires_login', 'is_public');

SELECT 
  'live_quiz_sessions columns:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'live_quiz_sessions' 
AND column_name = 'requires_login';

SELECT 
  'live_quiz_participants columns:' as info,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'live_quiz_participants' 
AND column_name IN ('user_id', 'display_name');
