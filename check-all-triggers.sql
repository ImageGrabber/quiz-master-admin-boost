-- Check ALL triggers and functions that might be interfering
-- This will help us find what's still generating 10-character codes

-- 1. Check ALL triggers in the database
SELECT 'ALL TRIGGERS IN DATABASE:' as info;
SELECT 
  trigger_name,
  event_object_table,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
ORDER BY event_object_table, trigger_name;

-- 2. Check ALL functions that might be related to sessions
SELECT 'ALL FUNCTIONS RELATED TO SESSIONS:' as info;
SELECT 
  routine_name,
  routine_type,
  routine_definition
FROM information_schema.routines 
WHERE routine_definition ILIKE '%session%'
AND routine_schema = 'public';

-- 3. Check if there are any other functions that generate codes
SELECT 'ALL FUNCTIONS THAT MIGHT GENERATE CODES:' as info;
SELECT 
  routine_name,
  routine_type,
  routine_definition
FROM information_schema.routines 
WHERE (routine_definition ILIKE '%random%' OR routine_definition ILIKE '%generate%' OR routine_definition ILIKE '%code%')
AND routine_schema = 'public';

-- 4. Check the exact schema of the live_quiz_sessions table
SELECT 'LIVE_QUIZ_SESSIONS TABLE SCHEMA:' as info;
SELECT 
  column_name,
  data_type,
  character_maximum_length,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'live_quiz_sessions'
ORDER BY ordinal_position;

-- 5. Check if there are any constraints that might be affecting the session_code
SELECT 'CONSTRAINTS ON LIVE_QUIZ_SESSIONS:' as info;
SELECT 
  tc.constraint_name,
  tc.constraint_type,
  cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'live_quiz_sessions';

-- 6. Check the most recent sessions to see what's actually being stored
SELECT 'MOST RECENT SESSIONS:' as info;
SELECT 
  session_code,
  LENGTH(session_code) as code_length,
  title,
  created_at
FROM live_quiz_sessions 
ORDER BY created_at DESC
LIMIT 20;
