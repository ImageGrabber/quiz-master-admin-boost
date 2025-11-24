
-- Empty all weekly quiz tables
TRUNCATE TABLE weekly_quiz_attempts, weekly_quiz_leaderboard, weekly_quiz_questions, weekly_quizzes RESTART IDENTITY CASCADE;

DO $$
DECLARE
    quiz_id INTEGER;
BEGIN
    -- Create the Hebrews quiz for the current week
    INSERT INTO weekly_quizzes (
        week_start_date,
        week_end_date,
        title,
        description,
        theme,
        difficulty,
        total_questions
    ) VALUES (
        DATE_TRUNC('week', CURRENT_DATE)::DATE,
        DATE_TRUNC('week', CURRENT_DATE)::DATE + INTERVAL '6 days',
        'Weekly Bible Challenge - Hebrews Focus',
        'Test your knowledge of the Book of Hebrews',
        'Hebrews',
        'Hard',
        15
    ) RETURNING id INTO quiz_id;

    -- Delete existing questions for this quiz to avoid duplicates
    DELETE FROM weekly_quiz_questions WHERE weekly_quiz_id = quiz_id;

    -- Insert Questions
    INSERT INTO weekly_quiz_questions (weekly_quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
    (quiz_id, 'Who is described as "the radiance of God''s glory and the exact representation of his being" in Hebrews 1:3?', 'Jesus Christ', 'The Holy Spirit', 'Moses', 'Elijah', 0, 1),
    (quiz_id, 'According to Hebrews 1:5, which Psalm is quoted when God says "You are my Son; today I have become your Father"?', 'Psalm 2:7', 'Psalm 110:1', 'Psalm 45:6', 'Psalm 102:25', 0, 2),
    (quiz_id, 'In Hebrews 2:9, what does it say Jesus was made "a little lower than" for a little while?', 'The angels', 'God', 'The prophets', 'The apostles', 0, 3),
    (quiz_id, 'According to Hebrews 3:1, who is called "the apostle and high priest whom we confess"?', 'Jesus', 'Moses', 'Aaron', 'Melchizedek', 0, 4),
    (quiz_id, 'In Hebrews 4:12, what is described as "sharper than any double-edged sword"?', 'The word of God', 'The law of Moses', 'The gospel', 'The prophets', 0, 5),
    (quiz_id, 'According to Hebrews 4:15, in what way was Jesus tempted?', 'In every way, just as we are', 'Only in the wilderness', 'Only by Satan', 'Only by the Pharisees', 0, 6),
    (quiz_id, 'In Hebrews 5:6, which Psalm is quoted when God says "You are a priest forever, in the order of Melchizedek"?', 'Psalm 110:4', 'Psalm 2:7', 'Psalm 45:6', 'Psalm 102:25', 0, 7),
    (quiz_id, 'According to Hebrews 6:19, what is described as "an anchor for the soul, firm and secure"?', 'Hope', 'Faith', 'Love', 'Grace', 0, 8),
    (quiz_id, 'In Hebrews 7:3, Melchizedek is described as being "without father or mother, without genealogy, without beginning of days or end of life." What does this make him like?', 'The Son of God', 'An angel', 'A prophet', 'A king', 0, 9),
    (quiz_id, 'According to Hebrews 7:17, which Psalm is quoted to show that Jesus is a priest forever?', 'Psalm 110:4', 'Psalm 2:7', 'Psalm 45:6', 'Psalm 102:25', 0, 10),
    (quiz_id, 'In Hebrews 8:1, where is Jesus described as sitting?', 'At the right hand of the throne of the Majesty in heaven', 'In the temple', 'On Mount Zion', 'In the holy of holies', 0, 11),
    (quiz_id, 'According to Hebrews 8:6, Jesus has obtained a more excellent ministry than the old covenant. How much more excellent?', 'As much as the covenant he mediates is superior to the old one', 'Twice as excellent', 'Ten times more excellent', 'Infinitely more excellent', 0, 12),
    (quiz_id, 'In Hebrews 9:12, how did Jesus enter the Most Holy Place?', 'By his own blood', 'By the blood of bulls and goats', 'By the blood of lambs', 'By water and the Spirit', 0, 13),
    (quiz_id, 'According to Hebrews 9:22, what is required for the forgiveness of sins?', 'The shedding of blood', 'Good works', 'Prayer and fasting', 'Sacrifices and offerings', 0, 14),
    (quiz_id, 'In Hebrews 10:4, why can the blood of bulls and goats never take away sins?', 'Because it is impossible', 'Because God doesn''t accept them', 'Because they are not perfect', 'Because they are not human', 0, 15);

    -- Update total_questions to match the actual number of questions inserted
    UPDATE weekly_quizzes
    SET total_questions = (
        SELECT COUNT(*)
        FROM weekly_quiz_questions
        WHERE weekly_quiz_id = quiz_id
    )
    WHERE id = quiz_id;
END $$;
