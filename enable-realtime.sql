-- Enable real-time for live quiz tables
-- This will ensure real-time updates work for participants joining

-- 1. Check current real-time status
SELECT 'Current real-time status:' as info;
SELECT 
  schemaname,
  tablename
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results');

-- 2. Enable real-time for live quiz tables
ALTER PUBLICATION supabase_realtime ADD TABLE live_quiz_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE live_quiz_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE live_quiz_answers;
ALTER PUBLICATION supabase_realtime ADD TABLE live_quiz_results;

-- 3. Verify real-time is enabled
SELECT 'Real-time enabled for:' as info;
SELECT 
  schemaname,
  tablename,
  'Real-time enabled' as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results');

-- 4. Test real-time by inserting a test participant
SELECT 'Testing real-time with test participant:' as info;
INSERT INTO live_quiz_participants (session_id, user_id, display_name, is_ready)
SELECT 
  (SELECT id FROM live_quiz_sessions ORDER BY created_at DESC LIMIT 1),
  NULL,
  'Real-time Test',
  false
RETURNING id, session_id, display_name;

-- 5. Clean up test
DELETE FROM live_quiz_participants WHERE display_name = 'Real-time Test';

SELECT 'Real-time setup complete!' as result;
