-- Debug real-time functionality for live quiz participants
-- This will help identify if real-time updates are working

-- 1. Check if live_quiz_participants table has RLS enabled
SELECT 'RLS status for live_quiz_participants:' as info;
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'live_quiz_participants';

-- 2. Check RLS policies on live_quiz_participants
SELECT 'RLS policies on live_quiz_participants:' as info;
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'live_quiz_participants';

-- 3. Check if there are any existing participants
SELECT 'Current participants in database:' as info;
SELECT 
  id,
  session_id,
  user_id,
  display_name,
  joined_at,
  is_ready
FROM live_quiz_participants 
ORDER BY joined_at DESC
LIMIT 10;

-- 4. Check if there are any live quiz sessions
SELECT 'Current live quiz sessions:' as info;
SELECT 
  id,
  session_code,
  title,
  status,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 5;

-- 5. Test inserting a participant (this should trigger real-time updates)
SELECT 'Testing participant insertion:' as info;
INSERT INTO live_quiz_participants (session_id, user_id, display_name, is_ready)
SELECT 
  (SELECT id FROM live_quiz_sessions ORDER BY created_at DESC LIMIT 1),
  NULL, -- Anonymous user
  'Test Participant',
  false
RETURNING id, session_id, display_name;

-- 6. Clean up test participant
DELETE FROM live_quiz_participants WHERE display_name = 'Test Participant';

-- 7. Check if real-time is enabled for the table
SELECT 'Real-time status for live_quiz_participants:' as info;
-- Check if the table is in the realtime publication
SELECT 
  schemaname,
  tablename,
  'Table exists in realtime publication' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename = 'live_quiz_participants';

-- If no results, real-time is not enabled
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' 
      AND tablename = 'live_quiz_participants'
    ) 
    THEN 'Real-time is ENABLED for live_quiz_participants'
    ELSE 'Real-time is NOT ENABLED for live_quiz_participants'
  END as realtime_status;
