-- COMPLETE QUIZ RESTORATION
-- This will restore all missing quizzes and fix the database structure

-- 1. First, let's ensure we have the proper database structure
-- Create the main quizzes table if it doesn't exist
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the questions table if it doesn't exist
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the quiz_questions junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_questions (
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  PRIMARY KEY (quiz_id, question_id)
);

-- 2. Clear existing data to start fresh
DELETE FROM quiz_questions;
DELETE FROM questions;
DELETE FROM quizzes;

-- 3. Insert comprehensive Bible questions
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_index) VALUES
-- Genesis Questions
('Who built the ark according to the Bible?', 'Moses', 'Noah', 'Abraham', 'David', 1),
('What is the first book of the Bible?', 'Exodus', 'Genesis', 'Matthew', 'Psalms', 1),
('Who was the first man created by God?', 'Adam', 'Eve', 'Cain', 'Abel', 0),
('What did God create on the first day?', 'Light', 'Land', 'Animals', 'Humans', 0),
('How many days did God take to create the world?', '5 days', '6 days', '7 days', '8 days', 1),
('Who was the first woman?', 'Sarah', 'Eve', 'Rachel', 'Leah', 1),
('What was the name of the garden where Adam and Eve lived?', 'Garden of Eden', 'Garden of Gethsemane', 'Garden of Paradise', 'Garden of Heaven', 0),
('Who was thrown into the lions den?', 'Moses', 'Daniel', 'Joseph', 'Jonah', 1),

-- New Testament Questions
('How many days and nights did Jesus fast in the wilderness?', '30', '40', '50', '60', 1),
('How many disciples did Jesus have?', '10', '11', '12', '13', 2),
('What city was Jesus born in?', 'Jerusalem', 'Bethlehem', 'Nazareth', 'Jericho', 1),
('Who was the mother of Jesus?', 'Elizabeth', 'Mary', 'Sarah', 'Ruth', 1),
('What did Jesus turn water into at the wedding in Cana?', 'Milk', 'Wine', 'Oil', 'Honey', 1),
('Who betrayed Jesus for 30 pieces of silver?', 'Peter', 'Judas', 'Thomas', 'John', 1),
('What is the shortest verse in the Bible?', 'Jesus wept', 'God is love', 'Pray always', 'Be kind', 0),
('Who was the first person to see Jesus after his resurrection?', 'Peter', 'Mary Magdalene', 'John', 'Thomas', 1),
('How many books are in the New Testament?', '25', '26', '27', '28', 2),
('Who was the father of John the Baptist?', 'Zechariah', 'Joseph', 'Abraham', 'David', 0),
('What is the last book of the Bible?', 'Revelation', 'Jude', '3 John', 'Acts', 0),
('Who was the first martyr of the Christian church?', 'Peter', 'Stephen', 'Paul', 'James', 1),
('What is the longest book in the Bible?', 'Genesis', 'Psalms', 'Isaiah', 'Jeremiah', 1),
('Who wrote most of the New Testament books?', 'Peter', 'John', 'Paul', 'Luke', 2),
('What was the name of the place where Jesus was crucified?', 'Mount Sinai', 'Golgotha', 'Mount of Olives', 'Temple Mount', 1),
('How many days was Jesus in the tomb?', '1', '2', '3', '4', 2),
('Who was the first person to be baptized by John the Baptist?', 'Jesus', 'Peter', 'Andrew', 'Philip', 0),
('What is the first miracle Jesus performed?', 'Walking on water', 'Turning water to wine', 'Healing the blind', 'Raising Lazarus', 1),
('What is the name of the river where Jesus was baptized?', 'Jordan', 'Nile', 'Euphrates', 'Tigris', 0),

-- Old Testament Questions
('Who was the first king of Israel?', 'David', 'Solomon', 'Saul', 'Samuel', 2),
('Who was the first person to enter the promised land?', 'Moses', 'Joshua', 'Caleb', 'Aaron', 1),
('What is the name of the mountain where Moses received the Ten Commandments?', 'Mount Sinai', 'Mount Zion', 'Mount Carmel', 'Mount Tabor', 0),
('Who was the strongest man in the Bible?', 'David', 'Samson', 'Goliath', 'Saul', 1),
('What was the name of the giant that David defeated?', 'Goliath', 'Og', 'Sihon', 'Balak', 0),
('Who was the wisest king of Israel?', 'David', 'Solomon', 'Saul', 'Rehoboam', 1),
('What was the name of the first temple in Jerusalem?', 'Solomon''s Temple', 'Herod''s Temple', 'Zerubbabel''s Temple', 'Ezekiel''s Temple', 0),
('Who was the prophet who was swallowed by a great fish?', 'Ezekiel', 'Jeremiah', 'Jonah', 'Daniel', 2),
('What was the name of the Babylonian king who had dreams interpreted by Daniel?', 'Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus', 0),
('Who was the first high priest of Israel?', 'Aaron', 'Moses', 'Joshua', 'Caleb', 0),

-- Additional Bible Knowledge Questions
('What is the name of the sea that the Israelites crossed on dry ground?', 'Red Sea', 'Dead Sea', 'Mediterranean Sea', 'Sea of Galilee', 0),
('Who was the woman who hid the Israelite spies in Jericho?', 'Rahab', 'Ruth', 'Esther', 'Deborah', 0),
('What was the name of the judge who defeated the Midianites?', 'Gideon', 'Samson', 'Deborah', 'Jephthah', 0),
('Who was the prophet who called down fire from heaven?', 'Elijah', 'Elisha', 'Isaiah', 'Jeremiah', 0),
('What was the name of the valley where David fought Goliath?', 'Valley of Elah', 'Kidron Valley', 'Hinnom Valley', 'Valley of Achor', 0),
('Who was the king who built the first temple in Jerusalem?', 'David', 'Solomon', 'Saul', 'Rehoboam', 1),
('What was the name of the queen who saved her people from destruction?', 'Esther', 'Ruth', 'Deborah', 'Miriam', 0),
('Who was the prophet who saw the valley of dry bones?', 'Ezekiel', 'Jeremiah', 'Isaiah', 'Daniel', 0),
('What was the name of the city where Jesus performed his first miracle?', 'Cana', 'Bethlehem', 'Nazareth', 'Jerusalem', 0),
('Who was the disciple who doubted Jesus'' resurrection?', 'Peter', 'Thomas', 'John', 'James', 1);

-- 4. Create comprehensive Bible quizzes
INSERT INTO quizzes (title, description, is_public) VALUES
('Bible Basics Quiz', 'Test your knowledge of fundamental Bible stories and characters', true),
('Genesis Quiz', 'Test your knowledge of the first book of the Bible - from creation to Joseph''s story', true),
('New Testament Quiz', 'Focus on the life of Jesus and the early church', true),
('Old Testament Quiz', 'Explore the stories and characters from the Hebrew Scriptures', true),
('Gospels Quiz', 'Test your knowledge of the four Gospels - Matthew, Mark, Luke, and John', true),
('Acts of the Apostles Quiz', 'Questions about the early church and the spread of Christianity', true),
('Paul''s Letters Quiz', 'Test your knowledge of the epistles written by the Apostle Paul', true),
('Prophets Quiz', 'Questions about the major and minor prophets of the Old Testament', true),
('Kings and Judges Quiz', 'Test your knowledge of the kings and judges of Israel', true),
('Bible Geography Quiz', 'Questions about places and locations mentioned in the Bible', true),
('Bible Characters Quiz', 'Test your knowledge of famous Bible characters and their stories', true),
('Bible Miracles Quiz', 'Questions about the miracles performed by Jesus and others', true),
('Bible Parables Quiz', 'Test your knowledge of the parables told by Jesus', true),
('Bible Verses Quiz', 'Famous Bible verses and their meanings', true),
('Bible History Quiz', 'Historical events and timelines in the Bible', true);

-- 5. Link questions to quizzes
-- Bible Basics Quiz (questions 1-10)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5),
(1, 6, 6), (1, 7, 7), (1, 8, 8), (1, 9, 9), (1, 10, 10);

-- Genesis Quiz (questions 3-7)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(2, 3, 1), (2, 4, 2), (2, 5, 3), (2, 6, 4), (2, 7, 5);

-- New Testament Quiz (questions 9-18)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(3, 9, 1), (3, 10, 2), (3, 11, 3), (3, 12, 4), (3, 13, 5),
(3, 14, 6), (3, 15, 7), (3, 16, 8), (3, 17, 9), (3, 18, 10);

-- Old Testament Quiz (questions 20-25)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(4, 20, 1), (4, 21, 2), (4, 22, 3), (4, 23, 4), (4, 24, 5);

-- Gospels Quiz (questions 10-15)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(5, 10, 1), (5, 11, 2), (5, 12, 3), (5, 13, 4), (5, 14, 5);

-- Acts Quiz (questions 16-18)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(6, 16, 1), (6, 17, 2), (6, 18, 3);

-- Paul's Letters Quiz (questions 19-20)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(7, 19, 1), (7, 20, 2);

-- Prophets Quiz (questions 21-22)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(8, 21, 1), (8, 22, 2);

-- Kings and Judges Quiz (questions 23-24)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(9, 23, 1), (9, 24, 2);

-- Bible Geography Quiz (questions 25-26)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(10, 25, 1), (10, 26, 2);

-- Bible Characters Quiz (questions 27-28)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(11, 27, 1), (11, 28, 2);

-- Bible Miracles Quiz (questions 29-30)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(12, 29, 1), (12, 30, 2);

-- Bible Parables Quiz (questions 31-32)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(13, 31, 1), (13, 32, 2);

-- Bible Verses Quiz (questions 33-34)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(14, 33, 1), (14, 34, 2);

-- Bible History Quiz (questions 35-36)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(15, 35, 1), (15, 36, 2);

-- 6. Verify the setup
SELECT 'Questions created:' as info, COUNT(*) as count FROM questions
UNION ALL
SELECT 'Quizzes created:', COUNT(*) FROM quizzes
UNION ALL
SELECT 'Quiz questions linked:', COUNT(*) FROM quiz_questions;

-- 7. Show all quizzes
SELECT 'All available quizzes:' as info;
SELECT id, title, description FROM quizzes ORDER BY id;

-- 8. Show quiz question counts
SELECT 'Quiz question counts:' as info;
SELECT 
  q.id,
  q.title,
  COUNT(qq.question_id) as question_count
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
ORDER BY q.id;
