-- Add Weekly Quiz Data Migration
-- This migration adds data to existing weekly quiz tables

-- First, let's check if we need to add the Psalms quiz
-- Insert Psalms weekly quiz if it doesn't exist
INSERT INTO weekly_quizzes (
  week_start_date,
  week_end_date,
  title,
  description,
  theme,
  difficulty,
  total_questions
) VALUES (
  DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '1 week',
  DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '1 week' + INTERVAL '6 days',
  'Weekly Bible Challenge - Psalms Focus',
  'Test your knowledge of the Book of Psalms with this week''s special quiz',
  'Psalms',
  'Medium',
  35
) ON CONFLICT (week_start_date) DO NOTHING;

-- Get the Psalms quiz ID (assuming it's the second quiz)
-- Add 35 Psalms questions
INSERT INTO weekly_quiz_questions (weekly_quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
(2, 'How many Psalms are there in the Bible?', '100', '120', '150', '200', 2, 1),
(2, 'Who is traditionally credited with writing most of the Psalms?', 'Solomon', 'David', 'Moses', 'Isaiah', 1, 2),
(2, 'What does Psalm 23 begin with?', 'The Lord is my shepherd', 'Bless the Lord, O my soul', 'The heavens declare the glory of God', 'I will lift up mine eyes unto the hills', 0, 3),
(2, 'Which Psalm is known as the "Shepherd Psalm"?', 'Psalm 1', 'Psalm 23', 'Psalm 91', 'Psalm 100', 1, 4),
(2, 'What is the shortest Psalm?', 'Psalm 1', 'Psalm 23', 'Psalm 117', 'Psalm 150', 2, 5),
(2, 'What is the longest Psalm?', 'Psalm 100', 'Psalm 119', 'Psalm 150', 'Psalm 1', 1, 6),
(2, 'How many verses are in Psalm 119?', '150', '176', '200', '220', 1, 7),
(2, 'What does Psalm 1 say about the blessed man?', 'He walks in the counsel of the wicked', 'He stands in the way of sinners', 'He sits in the seat of mockers', 'He delights in the law of the Lord', 3, 8),
(2, 'Which Psalm begins with "The Lord is my light and my salvation"?', 'Psalm 23', 'Psalm 27', 'Psalm 91', 'Psalm 100', 1, 9),
(2, 'What does Psalm 100 say we should do?', 'Make a joyful noise unto the Lord', 'Be still and know that I am God', 'The Lord is my shepherd', 'Bless the Lord, O my soul', 0, 10),
(2, 'Which Psalm is known as the "Penitential Psalm"?', 'Psalm 23', 'Psalm 32', 'Psalm 51', 'Psalm 100', 2, 11),
(2, 'What does Psalm 91 say about God''s protection?', 'He will give his angels charge over you', 'The Lord is my shepherd', 'Make a joyful noise', 'Bless the Lord, O my soul', 0, 12),
(2, 'Which Psalm begins with "The heavens declare the glory of God"?', 'Psalm 1', 'Psalm 19', 'Psalm 23', 'Psalm 100', 1, 13),
(2, 'What does Psalm 46 say about God?', 'He is my shepherd', 'He is our refuge and strength', 'He is my light', 'He is my salvation', 1, 14),
(2, 'Which Psalm is often called the "Pilgrim Psalm"?', 'Psalm 23', 'Psalm 84', 'Psalm 100', 'Psalm 150', 1, 15),
(2, 'What does Psalm 103 say about God''s benefits?', 'He forgives all your iniquities', 'He heals all your diseases', 'He redeems your life from destruction', 'All of the above', 3, 16),
(2, 'Which Psalm begins with "Bless the Lord, O my soul"?', 'Psalm 23', 'Psalm 103', 'Psalm 150', 'Psalm 1', 1, 17),
(2, 'What does Psalm 139 say about God''s knowledge?', 'He knows when I sit and when I rise', 'He knows my thoughts from afar', 'He knows all my ways', 'All of the above', 3, 18),
(2, 'Which Psalm is known as the "Royal Psalm"?', 'Psalm 2', 'Psalm 23', 'Psalm 91', 'Psalm 100', 0, 19),
(2, 'What does Psalm 8 say about man?', 'He is made a little lower than the angels', 'He is crowned with glory and honor', 'He has dominion over the works of God''s hands', 'All of the above', 3, 20),
(2, 'Which Psalm begins with "O Lord, our Lord, how excellent is thy name"?', 'Psalm 1', 'Psalm 8', 'Psalm 23', 'Psalm 100', 1, 21),
(2, 'What does Psalm 15 ask?', 'Who shall abide in thy tabernacle?', 'Who shall dwell in thy holy hill?', 'Who shall ascend into the hill of the Lord?', 'All of the above', 3, 22),
(2, 'Which Psalm is known as the "Messianic Psalm"?', 'Psalm 2', 'Psalm 22', 'Psalm 110', 'All of the above', 3, 23),
(2, 'What does Psalm 22 begin with?', 'The Lord is my shepherd', 'My God, my God, why hast thou forsaken me?', 'The Lord is my light', 'Bless the Lord, O my soul', 1, 24),
(2, 'Which Psalm is known as the "Suffering Servant Psalm"?', 'Psalm 22', 'Psalm 23', 'Psalm 91', 'Psalm 100', 0, 25),
(2, 'What does Psalm 37 say about the wicked?', 'They shall be cut off', 'They shall not be in authority', 'They shall perish', 'All of the above', 3, 26),
(2, 'Which Psalm begins with "Fret not thyself because of evildoers"?', 'Psalm 1', 'Psalm 23', 'Psalm 37', 'Psalm 100', 2, 27),
(2, 'What does Psalm 40 say about God?', 'He inclined unto me and heard my cry', 'He brought me up out of a horrible pit', 'He set my feet upon a rock', 'All of the above', 3, 28),
(2, 'Which Psalm is known as the "Thanksgiving Psalm"?', 'Psalm 23', 'Psalm 100', 'Psalm 150', 'Both B and C', 3, 29),
(2, 'What does Psalm 150 say about praising God?', 'Praise him with the sound of the trumpet', 'Praise him with the psaltery and harp', 'Let everything that hath breath praise the Lord', 'All of the above', 3, 30),
(2, 'Which Psalm begins with "Praise ye the Lord"?', 'Psalm 100', 'Psalm 150', 'Psalm 1', 'Psalm 23', 1, 31),
(2, 'What does Psalm 121 say about help?', 'My help cometh from the Lord', 'The Lord is thy keeper', 'The Lord shall preserve thee from all evil', 'All of the above', 3, 32),
(2, 'Which Psalm is known as the "Song of Ascents"?', 'Psalm 120', 'Psalm 121', 'Psalm 122', 'All of the above', 3, 33),
(2, 'What does Psalm 127 say about building?', 'Except the Lord build the house, they labor in vain', 'Except the Lord keep the city, the watchman waketh but in vain', 'It is vain for you to rise up early', 'All of the above', 3, 34),
(2, 'Which Psalm is known as the "Wisdom Psalm"?', 'Psalm 1', 'Psalm 37', 'Psalm 49', 'All of the above', 3, 35)
ON CONFLICT (weekly_quiz_id, order_index) DO NOTHING;
