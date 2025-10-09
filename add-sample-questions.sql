-- Add sample quiz questions so the quiz can actually start
-- This will populate the quiz_questions table with sample data

-- Add questions for quiz ID 1 (Bible Basics Quiz)
INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
(1, 'What is the first book of the Bible?', 'Genesis', 'Exodus', 'Leviticus', 'Numbers', 0, 1),
(1, 'Who built the ark?', 'Moses', 'Noah', 'Abraham', 'David', 1, 2),
(1, 'What is the last book of the Bible?', 'Malachi', 'Revelation', 'Jude', 'John', 1, 3),
(1, 'Who was the first man created by God?', 'Abel', 'Adam', 'Cain', 'Seth', 1, 4),
(1, 'How many days did God take to create the world?', 'Six', 'Seven', 'Five', 'Four', 0, 5);

-- Add questions for quiz ID 2 (Book of Romans Quiz)
INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
(2, 'Who wrote the Book of Romans?', 'Peter', 'Paul', 'John', 'James', 1, 1),
(2, 'What is the main theme of Romans?', 'The Law', 'Righteousness by Faith', 'The Kingdom', 'Prophecy', 1, 2),
(2, 'Romans 3:23 says "For all have sinned and fall short of..."', 'The Law', 'The Glory of God', 'Righteousness', 'Perfection', 1, 3),
(2, 'What is the "wages of sin" according to Romans 6:23?', 'Death', 'Suffering', 'Punishment', 'Separation', 0, 4),
(2, 'Romans 8:28 says "And we know that in all things God works for the good of..."', 'Those who love him', 'The righteous', 'His people', 'The faithful', 0, 5);

-- Add questions for quiz ID 3 (Book of Acts Quiz)
INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
(3, 'Who wrote the Book of Acts?', 'Paul', 'Luke', 'John', 'Peter', 1, 1),
(3, 'What happened on the Day of Pentecost?', 'Jesus was crucified', 'The Holy Spirit came', 'Paul was converted', 'The temple was destroyed', 1, 2),
(3, 'Who was the first Christian martyr?', 'Peter', 'Paul', 'Stephen', 'James', 2, 3),
(3, 'Where did Paul have his conversion experience?', 'Jerusalem', 'Damascus', 'Antioch', 'Rome', 1, 4),
(3, 'What was the name of the first Gentile convert?', 'Lydia', 'Cornelius', 'Timothy', 'Titus', 1, 5);

-- Verify the questions were added
SELECT 'Sample questions added successfully!' as result;
SELECT COUNT(*) as total_questions FROM quiz_questions;
SELECT quiz_id, COUNT(*) as question_count FROM quiz_questions GROUP BY quiz_id;
