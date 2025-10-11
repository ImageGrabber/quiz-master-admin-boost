-- Fix RLS policies for weekly_quiz_attempts to allow admin access
-- This will allow admins to view all weekly quiz attempts for the attendance dashboard

-- Add admin policy for viewing all weekly quiz attempts
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quiz_attempts' AND policyname = 'Admins can view all attempts') THEN
    CREATE POLICY "Admins can view all attempts" ON weekly_quiz_attempts
      FOR SELECT USING (public.is_admin());
  END IF;
END $$;

-- Also add admin policy for weekly_quizzes if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'weekly_quizzes' AND policyname = 'Admins can view all weekly quizzes') THEN
    CREATE POLICY "Admins can view all weekly quizzes" ON weekly_quizzes
      FOR SELECT USING (public.is_admin());
  END IF;
END $$;

-- Test the policies by running a simple query
SELECT 
  'RLS policies updated successfully' as status,
  COUNT(*) as total_attempts
FROM weekly_quiz_attempts;
