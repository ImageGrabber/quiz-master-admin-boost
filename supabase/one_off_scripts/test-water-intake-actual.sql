-- Test Queries for Water Intake Tracking - Works for ALL Users
-- The migration and code are already set up to work for any authenticated user

-- First, get all users to test with:
SELECT id, email FROM auth.users ORDER BY created_at DESC;

-- ============================================
-- TEST 1: Test with any user (replace USER_ID with actual user ID)
-- ============================================

-- 1. Test the upsert function - Insert/Update water intake for any user
-- Replace 'USER_ID_HERE' with any user's ID from the query above
SELECT upsert_water_intake(
  'USER_ID_HERE'::UUID,  -- Replace with any user ID
  1500,
  CURRENT_DATE
);

-- 2. Check if the record was created/updated for any user
-- Replace 'USER_ID_HERE' with the user ID you tested
SELECT * FROM water_intake 
WHERE user_id = 'USER_ID_HERE'::UUID
ORDER BY date DESC;

-- 3. Test updating with a different amount (same user)
SELECT upsert_water_intake(
  'USER_ID_HERE'::UUID,  -- Same user ID
  2000,
  CURRENT_DATE
);

-- 4. Verify it updated (not created duplicate)
SELECT * FROM water_intake 
WHERE user_id = 'USER_ID_HERE'::UUID
AND date = CURRENT_DATE;

-- 5. Test weekly average calculation (for wellness stats)
SELECT 
  AVG(amount_ml) as weekly_average,
  COUNT(*) as days_tracked,
  SUM(amount_ml) as total_ml
FROM water_intake
WHERE user_id = 'USER_ID_HERE'::UUID
AND date >= CURRENT_DATE - INTERVAL '7 days';

-- 6. Test inserting for multiple days (to test weekly average)
SELECT upsert_water_intake(
  'USER_ID_HERE'::UUID,
  1800,
  CURRENT_DATE - INTERVAL '1 day'
);

SELECT upsert_water_intake(
  'USER_ID_HERE'::UUID,
  2200,
  CURRENT_DATE - INTERVAL '2 days'
);

-- 7. View all water intake records for any user
SELECT 
  date,
  amount_ml,
  ROUND(amount_ml / 250.0, 1) as cups,
  created_at,
  updated_at
FROM water_intake
WHERE user_id = 'USER_ID_HERE'::UUID
ORDER BY date DESC;

-- 8. Count total days tracked for any user
SELECT COUNT(DISTINCT date) as total_days_tracked
FROM water_intake
WHERE user_id = 'USER_ID_HERE'::UUID;

-- ============================================
-- TEST 2: Verify RLS works for all users
-- ============================================

-- 9. View all water intake records (admin view - shows all users)
-- Note: This works because we're using SECURITY DEFINER in the function
-- But RLS policies ensure users can only see their own data in the app
SELECT 
  u.email,
  wi.date,
  wi.amount_ml,
  wi.created_at
FROM water_intake wi
JOIN auth.users u ON wi.user_id = u.id
ORDER BY wi.date DESC, u.email;

-- 10. Count records per user (verify multiple users can use it)
SELECT 
  u.email,
  COUNT(*) as total_records,
  COUNT(DISTINCT wi.date) as days_tracked,
  AVG(wi.amount_ml) as avg_daily_intake
FROM water_intake wi
JOIN auth.users u ON wi.user_id = u.id
GROUP BY u.email
ORDER BY total_records DESC;

-- 11. Test with multiple different users
-- Get two different user IDs first:
-- SELECT id, email FROM auth.users LIMIT 2;

-- Then test with user 1:
-- SELECT upsert_water_intake('USER_1_ID'::UUID, 1500, CURRENT_DATE);

-- And user 2:
-- SELECT upsert_water_intake('USER_2_ID'::UUID, 2000, CURRENT_DATE);

-- Verify both have separate records:
-- SELECT u.email, wi.amount_ml, wi.date
-- FROM water_intake wi
-- JOIN auth.users u ON wi.user_id = u.id
-- WHERE wi.user_id IN ('USER_1_ID'::UUID, 'USER_2_ID'::UUID)
-- ORDER BY wi.date DESC;

-- ============================================
-- CLEANUP (optional - be careful!)
-- ============================================

-- 12. Clean up test data for a specific user
-- DELETE FROM water_intake 
-- WHERE user_id = 'USER_ID_HERE'::UUID;

-- 13. Clean up ALL test data (very careful!)
-- DELETE FROM water_intake;

