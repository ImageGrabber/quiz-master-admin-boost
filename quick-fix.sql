-- Quick fix: Disable trigger and fix existing codes
DROP TRIGGER IF EXISTS trigger_set_session_code ON live_quiz_sessions CASCADE;
DROP FUNCTION IF EXISTS set_session_code() CASCADE;
DROP FUNCTION IF EXISTS generate_session_code() CASCADE;
UPDATE live_quiz_sessions SET session_code = LEFT(session_code, 8) WHERE LENGTH(session_code) = 10;
UPDATE live_quiz_sessions SET session_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8)) WHERE LENGTH(session_code) != 8;
SELECT 'SUCCESS: Trigger disabled, codes fixed to 8 characters' as result;
