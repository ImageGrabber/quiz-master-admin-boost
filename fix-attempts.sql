-- Fix for attempts not being saved
-- Run this in your Supabase SQL Editor

-- Insert a default quiz if it doesn't exist
INSERT INTO public.quizzes (id, title, description) 
VALUES (1, 'General Knowledge Quiz', 'Test your knowledge with these general questions')
ON CONFLICT (id) DO NOTHING;

-- Link questions to the default quiz if not already linked
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index) 
VALUES 
  (1, 1, 1),
  (1, 2, 2),
  (1, 3, 3),
  (1, 4, 4),
  (1, 5, 5)
ON CONFLICT (quiz_id, question_id) DO NOTHING;

-- Verify the quiz exists
SELECT * FROM public.quizzes WHERE id = 1;

-- Verify questions are linked
SELECT qq.*, q.question 
FROM public.quiz_questions qq 
JOIN public.questions q ON qq.question_id = q.id 
WHERE qq.quiz_id = 1; 