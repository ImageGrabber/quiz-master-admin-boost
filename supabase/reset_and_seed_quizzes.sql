DO $$
DECLARE
  genesis_quiz_id bigint;
  exodus_quiz_id bigint;
  matthew_quiz_id bigint;
BEGIN
  -- 1. Clear existing data
  DELETE FROM attempts;
  DELETE FROM quiz_questions;
  DELETE FROM quizzes;
  -- We leave 'questions' table alone as it seems unconnected to the current quiz logic based on types.ts

  -- 2. Create Genesis Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Genesis Quiz', 'Test your knowledge of the first book of the Bible - from creation to Joseph''s story.', NOW())
  RETURNING id INTO genesis_quiz_id;

  -- Questions for Genesis
  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (genesis_quiz_id, 'Who was the first man created by God?', 'Adam', 'Eve', 'Cain', 'Abel', 0, 1),
  (genesis_quiz_id, 'What did God create on the first day?', 'Light', 'Land', 'Animals', 'Humans', 0, 2),
  (genesis_quiz_id, 'How many days did God take to create the world?', '5 days', '6 days', '7 days', '8 days', 1, 3),
  (genesis_quiz_id, 'Who was the first woman?', 'Sarah', 'Eve', 'Rachel', 'Leah', 1, 4),
  (genesis_quiz_id, 'What was the name of the garden where Adam and Eve lived?', 'Eden', 'Paradise', 'Heaven', 'Zion', 0, 5);


  -- 3. Create Exodus Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Exodus Quiz', 'Journey through the deliverance of Israel, the Ten Commandments, and the Tabernacle.', NOW())
  RETURNING id INTO exodus_quiz_id;

  -- Questions for Exodus
  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (exodus_quiz_id, 'Who led the Israelites out of Egypt?', 'Aaron', 'Moses', 'Joshua', 'Caleb', 1, 1),
  (exodus_quiz_id, 'What was the first plague of Egypt?', 'Frogs', 'Locusts', 'Water turned to blood', 'Darkness', 2, 2),
  (exodus_quiz_id, 'Which sea did the Israelites cross on dry ground?', 'Dead Sea', 'Mediterranean Sea', 'Red Sea', 'Sea of Galilee', 2, 3),
  (exodus_quiz_id, 'What food did God provide for the Israelites in the wilderness?', 'Quail', 'Manna', 'Bread', 'Fish', 1, 4),
  (exodus_quiz_id, 'On which mountain did Moses receive the Ten Commandments?', 'Mount Zion', 'Mount Sinai', 'Mount Ararat', 'Mount Carmel', 1, 5);


  -- 4. Create Matthew Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Matthew Quiz', 'Test your knowledge of the first Gospel - the life and teachings of Jesus Christ.', NOW())
  RETURNING id INTO matthew_quiz_id;

  -- Questions for Matthew
  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (matthew_quiz_id, 'Where was Jesus born?', 'Nazareth', 'Bethlehem', 'Jerusalem', 'Galilee', 1, 1),
  (matthew_quiz_id, 'Who baptized Jesus?', 'John the Baptist', 'Peter', 'Andrew', 'Philip', 0, 2),
  (matthew_quiz_id, 'How many disciples did Jesus have?', '10', '11', '12', '13', 2, 3),
  (matthew_quiz_id, 'What is the first beatitude?', 'Blessed are the poor', 'Blessed are the meek', 'Blessed are the pure', 'Blessed are the peacemakers', 0, 4),
  (matthew_quiz_id, 'What did Jesus say about salt?', 'It is worthless', 'It is good', 'You are the salt of the earth', 'It is expensive', 2, 5);

END $$;
