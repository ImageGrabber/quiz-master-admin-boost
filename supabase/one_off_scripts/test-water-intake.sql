-- Test Queries for Water Intake Tracking
-- Run these in Supabase SQL Editor to verify everything works

-- 1. Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'water_intake';

-- 2. Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'water_intake'
ORDER BY ordinal_position;

-- 3. Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'water_intake';

-- 4. Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
AND tablename = 'water_intake';

-- 5. Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'water_intake';

-- 6. Check function exists
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'upsert_water_intake';

-- 7. Test the function (replace 'YOUR_USER_ID' with an actual user ID from auth.users)
-- First, get a user ID:
SELECT id, email FROM auth.users LIMIT 1;

-- Then test the function with that user ID:
-- SELECT upsert_water_intake(
--   'YOUR_USER_ID_HERE'::UUID,
--   1500,
--   CURRENT_DATE
-- );

-- 8. Test inserting water intake (replace 'YOUR_USER_ID' with actual user ID)
-- INSERT INTO water_intake (user_id, amount_ml, date)
-- VALUES ('YOUR_USER_ID_HERE'::UUID, 2000, CURRENT_DATE)
-- ON CONFLICT (user_id, date) DO NOTHING;

-- 9. Query water intake data (replace 'YOUR_USER_ID' with actual user ID)
-- SELECT * FROM water_intake WHERE user_id = 'YOUR_USER_ID_HERE'::UUID;

-- 10. Test updating existing record
-- UPDATE water_intake 
-- SET amount_ml = 2500, updated_at = NOW()
-- WHERE user_id = 'YOUR_USER_ID_HERE'::UUID 
-- AND date = CURRENT_DATE;

-- 11. Test weekly average calculation (for wellness stats)
-- SELECT 
--   AVG(amount_ml) as weekly_average,
--   COUNT(*) as days_tracked
-- FROM water_intake
-- WHERE user_id = 'YOUR_USER_ID_HERE'::UUID
-- AND date >= CURRENT_DATE - INTERVAL '7 days';

-- 12. Clean up test data (optional - be careful!)
-- DELETE FROM water_intake WHERE user_id = 'YOUR_USER_ID_HERE'::UUID;

