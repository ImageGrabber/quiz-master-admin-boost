-- Add the foreign key constraint that PostgREST needs
-- This will fix the PGRST200 error

-- Add foreign key constraint between challenge_requests and quizzes
ALTER TABLE challenge_requests 
ADD CONSTRAINT fk_challenge_requests_quiz_id 
FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE;

-- Test the constraint works
SELECT 'Foreign key constraint added successfully!' as result;
