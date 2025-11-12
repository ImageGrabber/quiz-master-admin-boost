-- Add Weekly Quiz for Current Week - Romans 1:1-32
-- This creates a weekly quiz focused on Romans 1

DO $$
DECLARE
  current_week_start DATE;
  current_week_end DATE;
  quiz_id INTEGER;
BEGIN
  -- Calculate Monday of current week
  current_week_start := DATE_TRUNC('week', CURRENT_DATE)::DATE;
  -- If DATE_TRUNC gives Sunday, adjust to Monday
  IF EXTRACT(DOW FROM current_week_start) = 0 THEN
    current_week_start := current_week_start - INTERVAL '6 days';
  END IF;
  
  -- Calculate Sunday of current week
  current_week_end := current_week_start + INTERVAL '6 days';

  -- Insert weekly quiz for current week (update if exists)
  INSERT INTO weekly_quizzes (
    week_start_date,
    week_end_date,
    title,
    description,
    theme,
    difficulty,
    total_questions,
    time_limit,
    is_active
  ) VALUES (
    current_week_start,
    current_week_end,
    'Weekly Bible Challenge - Romans 1',
    'Test your knowledge of Romans 1:1-32. This passage covers Paul''s introduction, the power of the gospel, and God''s wrath against sin.',
    'Romans',
    'Medium',
    25,
    30, -- 30 seconds for testing
    true
  )
  ON CONFLICT (week_start_date) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    theme = EXCLUDED.theme,
    difficulty = EXCLUDED.difficulty,
    total_questions = EXCLUDED.total_questions,
    time_limit = EXCLUDED.time_limit,
    is_active = EXCLUDED.is_active,
    updated_at = NOW()
  RETURNING id INTO quiz_id;

  -- Delete existing questions for this quiz and insert new ones
  DELETE FROM weekly_quiz_questions WHERE weekly_quiz_id = quiz_id;

  -- Insert 25 questions based on Romans 1:1-32
  INSERT INTO weekly_quiz_questions (weekly_quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index) VALUES
  (quiz_id, 'How does Paul describe himself at the beginning of Romans 1?', 'A teacher of Christ', 'A servant of Christ Jesus, called to be an apostle', 'A follower of Jesus', 'A disciple of the Lord', 1, 1),
  (quiz_id, 'What was Paul set apart for?', 'The law', 'The gospel of God', 'Teaching', 'Preaching to Jews only', 1, 2),
  (quiz_id, 'Through whom did God promise the gospel beforehand?', 'The apostles', 'His prophets in the Holy Scriptures', 'The disciples', 'The angels', 1, 3),
  (quiz_id, 'As to his earthly life, Jesus was a descendant of whom?', 'Moses', 'David', 'Abraham', 'Isaac', 1, 4),
  (quiz_id, 'How was Jesus appointed the Son of God in power?', 'By his birth', 'By his baptism', 'By his resurrection from the dead', 'By his miracles', 2, 5),
  (quiz_id, 'Through Jesus, what did Paul receive?', 'Wisdom and knowledge', 'Grace and apostleship', 'Power and authority', 'Strength and courage', 1, 6),
  (quiz_id, 'Who was Paul called to call to obedience?', 'Only the Jews', 'All the Gentiles', 'Only the Greeks', 'Only the Romans', 1, 7),
  (quiz_id, 'To whom is the letter to the Romans addressed?', 'All believers everywhere', 'All in Rome who are loved by God and called to be his holy people', 'The church leaders in Rome', 'The Jewish community in Rome', 1, 8),
  (quiz_id, 'What does Paul say is being reported all over the world?', 'The church in Rome', 'The faith of the Romans', 'The gospel message', 'The miracles in Rome', 1, 9),
  (quiz_id, 'What does Paul pray for regarding his visit to Rome?', 'That he may rest there', 'That the way may be opened for him to come to them', 'That they may send for him', 'That he may teach them', 1, 10),
  (quiz_id, 'Why does Paul long to see the Romans?', 'To rest from his travels', 'To impart some spiritual gift to make them strong', 'To learn from them', 'To establish a new church', 1, 11),
  (quiz_id, 'What does Paul say he is obligated to?', 'Only the Jews', 'Both to Greeks and non-Greeks, both to the wise and the foolish', 'Only the Gentiles', 'Only the Romans', 1, 12),
  (quiz_id, 'Why is Paul not ashamed of the gospel?', 'Because it is popular', 'Because it is the power of God that brings salvation', 'Because it is easy to understand', 'Because everyone accepts it', 1, 13),
  (quiz_id, 'To whom does the gospel bring salvation?', 'Only to the Jews', 'To everyone who believes: first to the Jew, then to the Gentile', 'Only to the Gentiles', 'Only to the Romans', 1, 14),
  (quiz_id, 'What is revealed in the gospel?', 'The wisdom of God', 'The righteousness of God', 'The power of God', 'The love of God', 1, 15),
  (quiz_id, 'How is the righteousness of God revealed?', 'By works', 'By faith from first to last', 'By the law', 'By tradition', 1, 16),
  (quiz_id, 'What is being revealed from heaven against all godlessness?', 'God''s love', 'The wrath of God', 'God''s mercy', 'God''s grace', 1, 17),
  (quiz_id, 'What have been clearly seen since the creation of the world?', 'God''s visible qualities', 'God''s invisible qualities—his eternal power and divine nature', 'God''s physical form', 'God''s angels', 1, 18),
  (quiz_id, 'What happened to those who knew God but did not glorify him?', 'They were blessed', 'Their thinking became futile and their foolish hearts were darkened', 'They prospered', 'They were rewarded', 1, 19),
  (quiz_id, 'What did people exchange the glory of God for?', 'The glory of angels', 'Images made to look like a mortal human being and birds and animals and reptiles', 'The glory of creation', 'The glory of wisdom', 1, 20),
  (quiz_id, 'What did God give them over to in their sinful desires?', 'His mercy', 'Sexual impurity for the degrading of their bodies', 'His grace', 'His love', 1, 21),
  (quiz_id, 'What did people exchange the truth about God for?', 'Wisdom', 'A lie', 'Knowledge', 'Understanding', 1, 22),
  (quiz_id, 'What did people worship instead of the Creator?', 'The angels', 'Created things', 'The prophets', 'The law', 1, 23),
  (quiz_id, 'What did God give them over to because they did not retain the knowledge of God?', 'His grace', 'A depraved mind', 'His mercy', 'His love', 1, 24),
  (quiz_id, 'What do those who practice wickedness know about God''s decree?', 'That they will be forgiven', 'That those who do such things deserve death', 'That they will be blessed', 'That they will be rewarded', 1, 25);

END $$;

