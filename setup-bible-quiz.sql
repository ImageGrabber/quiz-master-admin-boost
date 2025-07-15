-- Setup Bible Quiz System
-- Run this in your Supabase SQL Editor

-- Insert Bible-themed questions
INSERT INTO public.questions (question, option_a, option_b, option_c, option_d, correct_index) VALUES
('Who built the ark according to the Bible?', 'Moses', 'Noah', 'Abraham', 'David', 1),
('How many days and nights did Jesus fast in the wilderness?', '30', '40', '50', '60', 1),
('Who was the first king of Israel?', 'David', 'Solomon', 'Saul', 'Samuel', 2),
('What is the first book of the Bible?', 'Exodus', 'Genesis', 'Matthew', 'Psalms', 1),
('Who was thrown into the lions den?', 'Moses', 'Daniel', 'Joseph', 'Jonah', 1),
('How many disciples did Jesus have?', '10', '11', '12', '13', 2),
('What city was Jesus born in?', 'Jerusalem', 'Bethlehem', 'Nazareth', 'Jericho', 1),
('Who was the mother of Jesus?', 'Elizabeth', 'Mary', 'Sarah', 'Ruth', 1),
('What did Jesus turn water into at the wedding in Cana?', 'Milk', 'Wine', 'Oil', 'Honey', 1),
('Who betrayed Jesus for 30 pieces of silver?', 'Peter', 'Judas', 'Thomas', 'John', 1),
('What is the shortest verse in the Bible?', 'Jesus wept', 'God is love', 'Pray always', 'Be kind', 0),
('Who was the first person to see Jesus after his resurrection?', 'Peter', 'Mary Magdalene', 'John', 'Thomas', 1),
('How many books are in the New Testament?', '25', '26', '27', '28', 2),
('What was the name of the garden where Adam and Eve lived?', 'Garden of Eden', 'Garden of Gethsemane', 'Garden of Paradise', 'Garden of Heaven', 0),
('Who was the father of John the Baptist?', 'Zechariah', 'Joseph', 'Abraham', 'David', 0),
('What is the last book of the Bible?', 'Revelation', 'Jude', '3 John', 'Acts', 0),
('Who was the first martyr of the Christian church?', 'Peter', 'Stephen', 'Paul', 'James', 1),
('What is the longest book in the Bible?', 'Genesis', 'Psalms', 'Isaiah', 'Jeremiah', 1),
('Who wrote most of the New Testament books?', 'Peter', 'John', 'Paul', 'Luke', 2),
('What was the name of the place where Jesus was crucified?', 'Mount Sinai', 'Golgotha', 'Mount of Olives', 'Temple Mount', 1),
('How many days was Jesus in the tomb?', '1', '2', '3', '4', 2),
('Who was the first person to be baptized by John the Baptist?', 'Jesus', 'Peter', 'Andrew', 'Philip', 0),
('What is the first miracle Jesus performed?', 'Walking on water', 'Turning water to wine', 'Healing the blind', 'Raising Lazarus', 1),
('Who was the first person to enter the promised land?', 'Moses', 'Joshua', 'Caleb', 'Aaron', 1),
('What is the name of the river where Jesus was baptized?', 'Jordan', 'Nile', 'Euphrates', 'Tigris', 0);

-- Create a default Bible quiz
INSERT INTO public.quizzes (id, title, description) VALUES
(1, 'Bible Basics Quiz', 'Test your knowledge of fundamental Bible stories and characters'),
(2, 'New Testament Quiz', 'Focus on the life of Jesus and the early church'),
(3, 'Old Testament Quiz', 'Explore the stories and characters from the Hebrew Scriptures')
ON CONFLICT (id) DO NOTHING;

-- Link questions to the Bible Basics Quiz (first 10 questions)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5),
(1, 6, 6), (1, 7, 7), (1, 8, 8), (1, 9, 9), (1, 10, 10)
ON CONFLICT (quiz_id, question_id) DO NOTHING;

-- Link questions to the New Testament Quiz (questions 11-20)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index) VALUES
(2, 11, 1), (2, 12, 2), (2, 13, 3), (2, 14, 4), (2, 15, 5),
(2, 16, 6), (2, 17, 7), (2, 18, 8), (2, 19, 9), (2, 20, 10)
ON CONFLICT (quiz_id, question_id) DO NOTHING;

-- Link questions to the Old Testament Quiz (questions 21-25)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index) VALUES
(3, 21, 1), (3, 22, 2), (3, 23, 3), (3, 24, 4), (3, 25, 5)
ON CONFLICT (quiz_id, question_id) DO NOTHING;

-- Verify the setup
SELECT 'Questions created:' as info, COUNT(*) as count FROM public.questions
UNION ALL
SELECT 'Quizzes created:', COUNT(*) FROM public.quizzes
UNION ALL
SELECT 'Quiz questions linked:', COUNT(*) FROM public.quiz_questions; 