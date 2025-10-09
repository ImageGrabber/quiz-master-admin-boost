-- EXTRACT BIBLE QUIZZES TO DATABASE
-- This will extract the comprehensive Bible quiz data from the static components
-- and add them to the database for the logged-in quiz selection page

-- 1. Clear existing quiz data to start fresh
DELETE FROM quiz_questions;
DELETE FROM questions;
DELETE FROM quizzes;

-- 2. Add comprehensive Bible quizzes to the database
INSERT INTO quizzes (title, description, is_public) VALUES
-- Genesis Quizzes
('Genesis Chapter 1 Quiz', 'Test your knowledge of Genesis Chapter 1 - The Creation Story', true),
('Genesis Chapter 2 Quiz', 'Test your knowledge of Genesis Chapter 2 - The Garden of Eden', true),
('Genesis Chapter 3 Quiz', 'Test your knowledge of Genesis Chapter 3 - The Fall of Man', true),
('Genesis Chapter 4 Quiz', 'Test your knowledge of Genesis Chapter 4 - Cain and Abel', true),
('Genesis Chapter 5 Quiz', 'Test your knowledge of Genesis Chapter 5 - The Genealogy of Adam', true),
('Genesis Chapter 6 Quiz', 'Test your knowledge of Genesis Chapter 6 - Noah and the Flood', true),
('Genesis Chapter 7 Quiz', 'Test your knowledge of Genesis Chapter 7 - The Great Flood', true),
('Genesis Chapter 8 Quiz', 'Test your knowledge of Genesis Chapter 8 - The Flood Ends', true),
('Genesis Chapter 9 Quiz', 'Test your knowledge of Genesis Chapter 9 - God''s Covenant with Noah', true),
('Genesis Chapter 10 Quiz', 'Test your knowledge of Genesis Chapter 10 - The Table of Nations', true),
('Genesis Chapter 11 Quiz', 'Test your knowledge of Genesis Chapter 11 - The Tower of Babel', true),
('Genesis Chapter 12 Quiz', 'Test your knowledge of Genesis Chapter 12 - The Call of Abram', true),
('Genesis Chapter 13 Quiz', 'Test your knowledge of Genesis Chapter 13 - Abram and Lot Separate', true),
('Genesis Chapter 14 Quiz', 'Test your knowledge of Genesis Chapter 14 - Abram Rescues Lot', true),
('Genesis Chapter 15 Quiz', 'Test your knowledge of Genesis Chapter 15 - God''s Covenant with Abram', true),
('Genesis Chapter 16 Quiz', 'Test your knowledge of Genesis Chapter 16 - Hagar and Ishmael', true),
('Genesis Chapter 17 Quiz', 'Test your knowledge of Genesis Chapter 17 - The Covenant of Circumcision', true),
('Genesis Chapter 18 Quiz', 'Test your knowledge of Genesis Chapter 18 - The Three Visitors', true),
('Genesis Chapter 19 Quiz', 'Test your knowledge of Genesis Chapter 19 - The Destruction of Sodom', true),
('Genesis Chapter 20 Quiz', 'Test your knowledge of Genesis Chapter 20 - Abraham and Abimelech', true),

-- Other Bible Book Quizzes
('Exodus Quiz', 'Test your knowledge of the Book of Exodus', true),
('Leviticus Quiz', 'Test your knowledge of the Book of Leviticus', true),
('Numbers Quiz', 'Test your knowledge of the Book of Numbers', true),
('Deuteronomy Quiz', 'Test your knowledge of the Book of Deuteronomy', true),
('Joshua Quiz', 'Test your knowledge of the Book of Joshua', true),
('Judges Quiz', 'Test your knowledge of the Book of Judges', true),
('Ruth Quiz', 'Test your knowledge of the Book of Ruth', true),
('1 Samuel Quiz', 'Test your knowledge of the First Book of Samuel', true),
('2 Samuel Quiz', 'Test your knowledge of the Second Book of Samuel', true),
('1 Kings Quiz', 'Test your knowledge of the First Book of Kings', true),
('2 Kings Quiz', 'Test your knowledge of the Second Book of Kings', true),
('1 Chronicles Quiz', 'Test your knowledge of the First Book of Chronicles', true),
('2 Chronicles Quiz', 'Test your knowledge of the Second Book of Chronicles', true),
('Ezra Quiz', 'Test your knowledge of the Book of Ezra', true),
('Nehemiah Quiz', 'Test your knowledge of the Book of Nehemiah', true),
('Esther Quiz', 'Test your knowledge of the Book of Esther', true),
('Job Quiz', 'Test your knowledge of the Book of Job', true),
('Psalms Quiz', 'Test your knowledge of the Book of Psalms', true),
('Proverbs Quiz', 'Test your knowledge of the Book of Proverbs', true),
('Ecclesiastes Quiz', 'Test your knowledge of the Book of Ecclesiastes', true),
('Song of Solomon Quiz', 'Test your knowledge of the Song of Solomon', true),
('Isaiah Quiz', 'Test your knowledge of the Book of Isaiah', true),
('Jeremiah Quiz', 'Test your knowledge of the Book of Jeremiah', true),
('Lamentations Quiz', 'Test your knowledge of the Book of Lamentations', true),
('Ezekiel Quiz', 'Test your knowledge of the Book of Ezekiel', true),
('Daniel Quiz', 'Test your knowledge of the Book of Daniel', true),
('Hosea Quiz', 'Test your knowledge of the Book of Hosea', true),
('Joel Quiz', 'Test your knowledge of the Book of Joel', true),
('Amos Quiz', 'Test your knowledge of the Book of Amos', true),
('Obadiah Quiz', 'Test your knowledge of the Book of Obadiah', true),
('Jonah Quiz', 'Test your knowledge of the Book of Jonah', true),
('Micah Quiz', 'Test your knowledge of the Book of Micah', true),
('Nahum Quiz', 'Test your knowledge of the Book of Nahum', true),
('Habakkuk Quiz', 'Test your knowledge of the Book of Habakkuk', true),
('Zephaniah Quiz', 'Test your knowledge of the Book of Zephaniah', true),
('Haggai Quiz', 'Test your knowledge of the Book of Haggai', true),
('Zechariah Quiz', 'Test your knowledge of the Book of Zechariah', true),
('Malachi Quiz', 'Test your knowledge of the Book of Malachi', true),
('Matthew Quiz', 'Test your knowledge of the Gospel of Matthew', true),
('Mark Quiz', 'Test your knowledge of the Gospel of Mark', true),
('Luke Quiz', 'Test your knowledge of the Gospel of Luke', true),
('John Quiz', 'Test your knowledge of the Gospel of John', true),
('Acts Quiz', 'Test your knowledge of the Book of Acts', true),
('Romans Quiz', 'Test your knowledge of the Book of Romans', true),
('1 Corinthians Quiz', 'Test your knowledge of the First Book of Corinthians', true),
('2 Corinthians Quiz', 'Test your knowledge of the Second Book of Corinthians', true),
('Galatians Quiz', 'Test your knowledge of the Book of Galatians', true),
('Ephesians Quiz', 'Test your knowledge of the Book of Ephesians', true),
('Philippians Quiz', 'Test your knowledge of the Book of Philippians', true),
('Colossians Quiz', 'Test your knowledge of the Book of Colossians', true),
('1 Thessalonians Quiz', 'Test your knowledge of the First Book of Thessalonians', true),
('2 Thessalonians Quiz', 'Test your knowledge of the Second Book of Thessalonians', true),
('1 Timothy Quiz', 'Test your knowledge of the First Book of Timothy', true),
('2 Timothy Quiz', 'Test your knowledge of the Second Book of Timothy', true),
('Titus Quiz', 'Test your knowledge of the Book of Titus', true),
('Philemon Quiz', 'Test your knowledge of the Book of Philemon', true),
('Hebrews Quiz', 'Test your knowledge of the Book of Hebrews', true),
('James Quiz', 'Test your knowledge of the Book of James', true),
('1 Peter Quiz', 'Test your knowledge of the First Book of Peter', true),
('2 Peter Quiz', 'Test your knowledge of the Second Book of Peter', true),
('1 John Quiz', 'Test your knowledge of the First Book of John', true),
('2 John Quiz', 'Test your knowledge of the Second Book of John', true),
('3 John Quiz', 'Test your knowledge of the Third Book of John', true),
('Jude Quiz', 'Test your knowledge of the Book of Jude', true),
('Revelation Quiz', 'Test your knowledge of the Book of Revelation', true);

-- 3. Add sample questions for each quiz (you can expand this with more questions)
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_index) VALUES
-- Genesis Chapter 1 Questions
('What did God create on the first day?', 'Light', 'Land', 'Animals', 'Humans', 0),
('What did God create on the second day?', 'Light', 'Sky/Heaven', 'Land', 'Plants', 1),
('What did God create on the third day?', 'Light', 'Sky', 'Land and Plants', 'Sun and Moon', 2),
('What did God create on the fourth day?', 'Light', 'Sky', 'Land', 'Sun, Moon, and Stars', 3),
('What did God create on the fifth day?', 'Land animals', 'Birds and Sea creatures', 'Humans', 'Plants', 1),
('What did God create on the sixth day?', 'Light', 'Sky', 'Land animals and Humans', 'Plants', 2),
('What did God do on the seventh day?', 'Created more animals', 'Rested', 'Created humans', 'Created plants', 1),

-- Genesis Chapter 2 Questions
('What was the name of the garden where God placed Adam?', 'Paradise', 'Garden of Eden', 'Heaven', 'Zion', 1),
('What tree was in the middle of the garden?', 'Tree of Life', 'Tree of Knowledge', 'Both A and B', 'Neither', 2),
('What was the name of the first man?', 'Eve', 'Adam', 'Cain', 'Abel', 1),
('What was the name of the first woman?', 'Eve', 'Sarah', 'Rachel', 'Leah', 0),
('What was Adam made from?', 'Clay', 'Dust of the ground', 'Water', 'Fire', 1),
('What was Eve made from?', 'Clay', 'Dust', 'Adam''s rib', 'Water', 2),

-- Genesis Chapter 3 Questions
('Who tempted Eve in the garden?', 'The serpent', 'Adam', 'God', 'An angel', 0),
('What fruit did Eve eat?', 'Apple', 'Fig', 'Fruit from the tree of knowledge', 'Grape', 2),
('What happened after Adam and Eve ate the fruit?', 'Nothing', 'They became like God', 'They realized they were naked', 'They died immediately', 2),
('What did God make for Adam and Eve after they sinned?', 'Nothing', 'Clothes of skin', 'New garden', 'New animals', 1),
('What was the consequence of their sin?', 'Nothing', 'They were banished from the garden', 'They died', 'They became immortal', 1),

-- Add more questions for other chapters and books...
('Who built the ark?', 'Moses', 'Noah', 'Abraham', 'David', 1),
('How many days did it rain during the flood?', '30', '40', '50', '60', 1),
('What was the sign of God''s covenant with Noah?', 'Rainbow', 'Dove', 'Olive branch', 'Mountain', 0),
('Who was the father of Abraham?', 'Terah', 'Noah', 'Isaac', 'Jacob', 0),
('What was Abraham''s original name?', 'Abram', 'Isaac', 'Jacob', 'Joseph', 0);

-- 4. Link questions to quizzes (this is a simplified version - you'd need to expand this)
-- Genesis Chapter 1 Quiz (questions 1-7)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5), (1, 6, 6), (1, 7, 7);

-- Genesis Chapter 2 Quiz (questions 8-13)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(2, 8, 1), (2, 9, 2), (2, 10, 3), (2, 11, 4), (2, 12, 5), (2, 13, 6);

-- Genesis Chapter 3 Quiz (questions 14-18)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(3, 14, 1), (3, 15, 2), (3, 16, 3), (3, 17, 4), (3, 18, 5);

-- Genesis Chapter 6 Quiz (questions 19-21)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(6, 19, 1), (6, 20, 2), (6, 21, 3);

-- Genesis Chapter 12 Quiz (questions 22-24)
INSERT INTO quiz_questions (quiz_id, question_id, order_index) VALUES
(12, 22, 1), (12, 23, 2), (12, 24, 3);

-- 5. Show the results
SELECT 'Bible quizzes created:' as info, COUNT(*) as count FROM quizzes
UNION ALL
SELECT 'Questions created:', COUNT(*) FROM questions
UNION ALL
SELECT 'Quiz-Question links:', COUNT(*) FROM quiz_questions;

-- 6. Show all available quizzes
SELECT 'Available Bible quizzes:' as info;
SELECT id, title, description FROM quizzes ORDER BY id;

