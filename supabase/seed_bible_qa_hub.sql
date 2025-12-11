DO $$
DECLARE
  new_quiz_id bigint;
BEGIN

  -- Create Quiz: Genesis Quiz - The Beginning of Everything
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Genesis Quiz - The Beginning of Everything', 'Test your knowledge of Genesis Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'In the beginning, what did God create first?', 'Light', 'Heaven', 'Earth', 'Man', 0, 1),
  (new_quiz_id, 'On which day did God create the sun, moon, and stars?', 'First day', 'Second day', 'Third day', 'Fourth day', 3, 2),
  (new_quiz_id, 'What was the name of the first man?', 'Abel', 'Adam', 'Cain', 'Seth', 1, 3),
  (new_quiz_id, 'From which part of Adam''s body was Eve created?', 'His rib', 'His finger', 'His foot', 'His head', 0, 4),
  (new_quiz_id, 'What was the name of the tree that Adam and Eve were forbidden to eat from?', 'Tree of Life', 'Tree of Knowledge of Good and Evil', 'Tree of Wisdom', 'Tree of Understanding', 1, 5),
  (new_quiz_id, 'Who was the first murderer in the Bible?', 'Abel', 'Cain', 'Adam', 'Seth', 1, 6),
  (new_quiz_id, 'How many sons did Adam and Eve have?', 'Two', 'Three', 'Four', 'Five', 1, 7),
  (new_quiz_id, 'How old was Adam when he died?', '800 years', '900 years', '930 years', '950 years', 2, 8),
  (new_quiz_id, 'Who was Noah''s father?', 'Lamech', 'Methuselah', 'Enoch', 'Jared', 0, 9),
  (new_quiz_id, 'How many days and nights did it rain during the flood?', '30 days', '40 days', '50 days', '60 days', 1, 10);

  -- Create Quiz: Exodus Quiz - The Great Deliverance
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Exodus Quiz - The Great Deliverance', 'Test your knowledge of Exodus Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the name of Moses'' brother?', 'Aaron', 'Joshua', 'Caleb', 'Miriam', 0, 1),
  (new_quiz_id, 'How many plagues did God send upon Egypt?', 'Seven', 'Nine', 'Ten', 'Twelve', 2, 2),
  (new_quiz_id, 'What was the first plague?', 'Frogs', 'Blood', 'Locusts', 'Darkness', 1, 3),
  (new_quiz_id, 'How many years did the Israelites wander in the wilderness?', '30 years', '40 years', '50 years', '60 years', 1, 4),
  (new_quiz_id, 'What did God provide for the Israelites to eat in the wilderness?', 'Bread and meat', 'Manna and quail', 'Fish and bread', 'Fruit and vegetables', 1, 5),
  (new_quiz_id, 'Where did God give Moses the Ten Commandments?', 'Mount Sinai', 'Mount Horeb', 'Mount Zion', 'Mount Carmel', 0, 6),
  (new_quiz_id, 'What was the name of Moses'' wife?', 'Miriam', 'Zipporah', 'Deborah', 'Hannah', 1, 7),
  (new_quiz_id, 'What did the Israelites build while Moses was on Mount Sinai?', 'A temple', 'A golden calf', 'An altar', 'A tabernacle', 1, 8),
  (new_quiz_id, 'How many commandments did God give Moses?', 'Seven', 'Ten', 'Twelve', 'Fifteen', 1, 9),
  (new_quiz_id, 'What was the name of the sea that the Israelites crossed?', 'Red Sea', 'Dead Sea', 'Mediterranean Sea', 'Sea of Galilee', 0, 10);

  -- Create Quiz: Leviticus Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Leviticus Quiz', 'Test your knowledge of Leviticus Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main purpose of the book of Leviticus?', 'To record Israel''s journey through the wilderness', 'To establish laws for worship and holiness', 'To tell the story of Moses'' life', 'To document the Ten Commandments', 1, 1),
  (new_quiz_id, 'What type of offering was required for unintentional sins?', 'Burnt offering', 'Sin offering', 'Peace offering', 'Grain offering', 1, 2),
  (new_quiz_id, 'Which animals were considered clean for sacrifice?', 'Any animal without blemish', 'Only cattle, sheep, and goats', 'All domestic animals', 'Only birds and fish', 1, 3),
  (new_quiz_id, 'What was the Day of Atonement called in Hebrew?', 'Yom Kippur', 'Passover', 'Sukkot', 'Shavuot', 0, 4),
  (new_quiz_id, 'Who was allowed to enter the Most Holy Place?', 'Any priest', 'Only the high priest', 'Moses and Aaron', 'All Levites', 1, 5),
  (new_quiz_id, 'What was the purpose of the scapegoat on the Day of Atonement?', 'To be sacrificed for the people''s sins', 'To carry the people''s sins into the wilderness', 'To be eaten as a meal offering', 'To be released as a sign of freedom', 1, 6),
  (new_quiz_id, 'Which of these was NOT a type of offering mentioned in Leviticus?', 'Burnt offering', 'Sin offering', 'Tithe offering', 'Peace offering', 2, 7),
  (new_quiz_id, 'What was required for a person to be considered ceremonially clean?', 'Washing with water', 'Sacrificing an animal', 'Waiting seven days', 'All of the above', 3, 8),
  (new_quiz_id, 'What did the phrase ''holy to the Lord'' mean in Leviticus?', 'Set apart for God''s use', 'Perfect and without sin', 'Blessed by God', 'Chosen by the people', 0, 9),
  (new_quiz_id, 'What was the penalty for eating blood according to Leviticus?', 'A fine', 'Excommunication', 'Death', 'Forty lashes', 2, 10);

  -- Create Quiz: Numbers Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Numbers Quiz', 'Test your knowledge of Numbers Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of the book of Numbers?', 'The creation of the world', 'Israel''s journey through the wilderness', 'The giving of the Ten Commandments', 'The conquest of Canaan', 1, 1),
  (new_quiz_id, 'How many men were counted in the first census of Israel?', '600,000', '603,550', '700,000', '500,000', 1, 2),
  (new_quiz_id, 'What happened when the people complained about the manna?', 'God sent quail', 'God sent plagues', 'God sent fire', 'All of the above', 3, 3),
  (new_quiz_id, 'Who was chosen to succeed Moses as leader?', 'Aaron', 'Joshua', 'Caleb', 'Eleazar', 1, 4),
  (new_quiz_id, 'What was the punishment for the spies who gave a bad report about Canaan?', 'They were stoned', 'They died in a plague', 'They were exiled', 'They were made slaves', 1, 5),
  (new_quiz_id, 'How long did Israel wander in the wilderness?', '30 years', '40 years', '50 years', '70 years', 1, 6),
  (new_quiz_id, 'What was the name of the bronze serpent that Moses made?', 'Nehushtan', 'Seraph', 'Cherub', 'It had no name', 0, 7),
  (new_quiz_id, 'Who was the prophetess who led Israel with Moses and Aaron?', 'Deborah', 'Miriam', 'Huldah', 'Anna', 1, 8),
  (new_quiz_id, 'What did the people do when they reached the border of the Promised Land?', 'They immediately entered', 'They sent spies to explore', 'They built an altar', 'They celebrated with a feast', 1, 9),
  (new_quiz_id, 'What was the purpose of the cloud and fire that guided Israel?', 'To provide light at night', 'To show God''s presence and guidance', 'To protect from enemies', 'To provide warmth', 1, 10);

  -- Create Quiz: Deuteronomy Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Deuteronomy Quiz', 'Test your knowledge of Deuteronomy Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What does the name ''Deuteronomy'' mean?', 'Second law', 'Final words', 'Moses'' testament', 'God''s covenant', 0, 1),
  (new_quiz_id, 'What was the main purpose of Deuteronomy?', 'To record Israel''s conquest of Canaan', 'To restate the law for the new generation', 'To tell the story of Moses'' death', 'To document the Ten Plagues', 1, 2),
  (new_quiz_id, 'What was the Shema, the central confession of Israel?', 'Hear, O Israel: The Lord our God, the Lord is one', 'I am the Lord your God', 'You shall have no other gods before me', 'Love the Lord your God with all your heart', 0, 3),
  (new_quiz_id, 'What was the condition for Israel to receive God''s blessings?', 'To offer sacrifices daily', 'To obey God''s commands', 'To build a temple', 'To appoint a king', 1, 4),
  (new_quiz_id, 'Who was chosen to succeed Moses as Israel''s leader?', 'Aaron', 'Joshua', 'Caleb', 'Eleazar', 1, 5),
  (new_quiz_id, 'What was the penalty for worshiping other gods?', 'Exile', 'Death', 'Fines', 'Imprisonment', 1, 6),
  (new_quiz_id, 'What did Moses do before his death?', 'He blessed the twelve tribes', 'He wrote a song', 'He appointed judges', 'All of the above', 3, 7),
  (new_quiz_id, 'What was the purpose of the cities of refuge?', 'To house the priests', 'To protect those who killed accidentally', 'To store the ark of the covenant', 'To hold religious festivals', 1, 8),
  (new_quiz_id, 'What did Moses predict would happen to Israel?', 'They would conquer all nations', 'They would be scattered among the nations', 'They would build a great temple', 'They would have many kings', 1, 9),
  (new_quiz_id, 'Where did Moses die?', 'Mount Sinai', 'Mount Nebo', 'Mount Horeb', 'The Jordan River', 1, 10);

  -- Create Quiz: Joshua Quiz - Conquering the Promised Land
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Joshua Quiz - Conquering the Promised Land', 'Test your knowledge of Joshua Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'Who was Joshua''s father?', 'Nun', 'Moses', 'Aaron', 'Caleb', 0, 1),
  (new_quiz_id, 'What was the name of the prostitute who helped the Israelite spies?', 'Rahab', 'Deborah', 'Miriam', 'Hannah', 0, 2),
  (new_quiz_id, 'How many times did the Israelites march around Jericho?', 'Six times', 'Seven times', 'Twelve times', 'Forty times', 1, 3),
  (new_quiz_id, 'What happened to the walls of Jericho?', 'They were destroyed by fire', 'They fell down flat', 'They were torn down by the Israelites', 'They remained standing', 1, 4),
  (new_quiz_id, 'What was the name of the city that was completely destroyed except for Rahab and her family?', 'Ai', 'Jericho', 'Gibeon', 'Hazor', 1, 5),
  (new_quiz_id, 'What happened to Achan and his family?', 'They were stoned to death', 'They were burned with fire', 'They were exiled', 'They were forgiven', 1, 6),
  (new_quiz_id, 'What did Joshua do when the sun stood still?', 'He prayed for more time', 'He commanded the sun to stand still', 'He asked God to stop the sun', 'All of the above', 1, 7),
  (new_quiz_id, 'How old was Joshua when he died?', '100 years', '110 years', '120 years', '130 years', 1, 8),
  (new_quiz_id, 'What did Joshua say to the people at the end of his life?', 'Choose this day whom you will serve', 'As for me and my household, we will serve the Lord', 'But if serving the Lord seems undesirable to you, then choose for yourselves this day whom you will serve', 'All of the above', 3, 9),
  (new_quiz_id, 'What was the name of the mountain where Joshua built an altar?', 'Mount Sinai', 'Mount Ebal', 'Mount Gerizim', 'Mount Carmel', 1, 10);

  -- Create Quiz: Judges Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Judges Quiz', 'Test your knowledge of Judges Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of the book of Judges?', 'Israel''s conquest of Canaan', 'A cycle of sin, oppression, repentance, and deliverance', 'The establishment of the monarchy', 'The building of the temple', 1, 1),
  (new_quiz_id, 'Who was the first judge mentioned in the book?', 'Gideon', 'Samson', 'Othniel', 'Deborah', 2, 2),
  (new_quiz_id, 'What did Deborah do for Israel?', 'She was a prophetess and judge', 'She led the army into battle', 'She wrote songs of victory', 'All of the above', 3, 3),
  (new_quiz_id, 'How many judges are mentioned in the book of Judges?', '10', '12', '15', '20', 1, 4),
  (new_quiz_id, 'What was Gideon''s famous test with the fleece?', 'To see if God would make it wet while the ground was dry', 'To see if God would make it dry while the ground was wet', 'Both A and B', 'To see if God would send fire from heaven', 2, 5),
  (new_quiz_id, 'What was Samson''s source of strength?', 'His hair', 'His faith in God', 'His physical training', 'His weapons', 0, 6),
  (new_quiz_id, 'What happened to Samson at the end of his life?', 'He was killed by the Philistines', 'He brought down the temple of Dagon', 'He died with the Philistines', 'All of the above', 3, 7),
  (new_quiz_id, 'What was the famous phrase repeated in Judges?', 'In those days Israel had no king', 'Everyone did what was right in their own eyes', 'The Lord raised up a deliverer', 'All of the above', 3, 8),
  (new_quiz_id, 'Who was the left-handed judge who killed the king of Moab?', 'Ehud', 'Shamgar', 'Tola', 'Jair', 0, 9),
  (new_quiz_id, 'What was the result of Israel''s disobedience during the period of the judges?', 'They were conquered by foreign nations', 'They lost their land', 'They were scattered among the nations', 'They were oppressed by their enemies', 3, 10);

  -- Create Quiz: Ruth Quiz - Loyalty and Redemption
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Ruth Quiz - Loyalty and Redemption', 'Test your knowledge of Ruth Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the name of Ruth''s mother-in-law?', 'Naomi', 'Orpah', 'Ruth', 'Deborah', 0, 1),
  (new_quiz_id, 'What was the name of Ruth''s husband who died?', 'Elimelek', 'Mahlon', 'Boaz', 'Obed', 1, 2),
  (new_quiz_id, 'What did Ruth say to Naomi when Naomi told her to go back to her people?', 'I will go with you', 'Where you go I will go', 'Your people will be my people and your God my God', 'All of the above', 3, 3),
  (new_quiz_id, 'What was the name of the man who became Ruth''s husband?', 'Elimelek', 'Mahlon', 'Boaz', 'Obed', 2, 4),
  (new_quiz_id, 'What was the name of Ruth and Boaz''s son?', 'Jesse', 'David', 'Obed', 'Solomon', 2, 5),
  (new_quiz_id, 'What did Ruth do to provide food for herself and Naomi?', 'She worked in the fields', 'She gleaned in the fields', 'She begged for food', 'She sold her possessions', 1, 6),
  (new_quiz_id, 'What did Boaz tell his workers to do for Ruth?', 'Leave extra grain for her', 'Don''t embarrass her', 'Let her drink from the water jars', 'All of the above', 3, 7),
  (new_quiz_id, 'What did Naomi tell Ruth to do to show her interest in Boaz?', 'Go to the threshing floor', 'Uncover his feet and lie down', 'Wait for him to tell you what to do', 'All of the above', 3, 8),
  (new_quiz_id, 'What did Boaz say when he found Ruth at his feet?', 'Who are you?', 'The Lord bless you', 'You are a woman of noble character', 'All of the above', 3, 9),
  (new_quiz_id, 'What was the name of Ruth''s great-grandson who became king?', 'Jesse', 'David', 'Solomon', 'Saul', 1, 10);

  -- Create Quiz: 1 Samuel Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Samuel Quiz', 'Test your knowledge of 1 Samuel Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of 1 Samuel?', 'The transition from judges to kings', 'The life of David', 'The building of the temple', 'The conquest of Canaan', 0, 1),
  (new_quiz_id, 'Who was Samuel''s mother?', 'Hannah', 'Deborah', 'Miriam', 'Ruth', 0, 2),
  (new_quiz_id, 'What did Hannah promise to do if God gave her a son?', 'She would name him Samuel', 'She would dedicate him to the Lord', 'She would make him a priest', 'All of the above', 3, 3),
  (new_quiz_id, 'Who was Israel''s first king?', 'David', 'Saul', 'Samuel', 'Solomon', 1, 4),
  (new_quiz_id, 'What was Saul''s great sin that cost him the kingdom?', 'He offered sacrifices instead of waiting for Samuel', 'He spared the Amalekite king and livestock', 'He consulted a medium', 'All of the above', 3, 5),
  (new_quiz_id, 'Who anointed David as the next king?', 'Samuel', 'Saul', 'Nathan', 'Gad', 0, 6),
  (new_quiz_id, 'What was David''s famous victory over Goliath?', 'He used a sling and stone', 'He cut off Goliath''s head', 'He trusted in the Lord', 'All of the above', 3, 7),
  (new_quiz_id, 'What was the relationship between David and Jonathan?', 'They were brothers', 'They were best friends', 'They were enemies', 'They were cousins', 1, 8),
  (new_quiz_id, 'What happened to Saul at the end of 1 Samuel?', 'He was killed in battle', 'He committed suicide', 'He was captured by the Philistines', 'He died of old age', 1, 9),
  (new_quiz_id, 'What was the name of the priest who helped David?', 'Ahimelech', 'Abiathar', 'Zadok', 'All of the above', 0, 10);

  -- Create Quiz: 2 Samuel Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Samuel Quiz', 'Test your knowledge of 2 Samuel Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of 2 Samuel?', 'David''s reign as king of Israel', 'The building of the temple', 'The division of the kingdom', 'The conquest of Jerusalem', 0, 1),
  (new_quiz_id, 'What city did David make his capital?', 'Jerusalem', 'Hebron', 'Bethlehem', 'Gibeon', 0, 2),
  (new_quiz_id, 'What was David''s great sin with Bathsheba?', 'He committed adultery', 'He had her husband killed', 'He tried to cover up his sin', 'All of the above', 3, 3),
  (new_quiz_id, 'Who was the prophet that confronted David about his sin?', 'Samuel', 'Nathan', 'Gad', 'Ahijah', 1, 4),
  (new_quiz_id, 'What happened to David''s first child with Bathsheba?', 'He lived to be king', 'He died as a baby', 'He became a priest', 'He was exiled', 1, 5),
  (new_quiz_id, 'Who was David''s son that rebelled against him?', 'Solomon', 'Absalom', 'Adonijah', 'Amnon', 1, 6),
  (new_quiz_id, 'What was the name of David''s loyal friend and advisor?', 'Joab', 'Abishai', 'Hushai', 'All of the above', 3, 7),
  (new_quiz_id, 'What did David do when he heard of Absalom''s death?', 'He celebrated', 'He mourned bitterly', 'He was relieved', 'He was angry', 1, 8),
  (new_quiz_id, 'What was David''s famous song of deliverance?', 'Psalm 23', 'Psalm 51', '2 Samuel 22', 'All of the above', 2, 9),
  (new_quiz_id, 'Who succeeded David as king?', 'Absalom', 'Adonijah', 'Solomon', 'Amnon', 2, 10);

  -- Create Quiz: 1 Kings Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Kings Quiz', 'Test your knowledge of 1 Kings Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of 1 Kings?', 'Solomon''s wisdom and the building of the temple', 'The division of the kingdom', 'The reign of various kings', 'All of the above', 3, 1),
  (new_quiz_id, 'What did Solomon ask God for when he became king?', 'Wealth and riches', 'Long life', 'Wisdom to govern the people', 'Victory over enemies', 2, 2),
  (new_quiz_id, 'How long did it take to build the temple?', '7 years', '10 years', '12 years', '20 years', 0, 3),
  (new_quiz_id, 'What was the name of the queen who visited Solomon?', 'Queen of Sheba', 'Queen of Egypt', 'Queen of Tyre', 'Queen of Arabia', 0, 4),
  (new_quiz_id, 'Who caused the kingdom to be divided after Solomon''s death?', 'Rehoboam', 'Jeroboam', 'Both A and B', 'The people of Israel', 2, 5),
  (new_quiz_id, 'What were the names of the two kingdoms after the division?', 'Israel and Judah', 'North and South', 'Samaria and Jerusalem', 'Ephraim and Benjamin', 0, 6),
  (new_quiz_id, 'Who was the prophet who confronted Ahab and Jezebel?', 'Elisha', 'Elijah', 'Micaiah', 'All of the above', 1, 7),
  (new_quiz_id, 'What happened at Mount Carmel?', 'Elijah challenged the prophets of Baal', 'God sent fire from heaven', 'The people turned back to God', 'All of the above', 3, 8),
  (new_quiz_id, 'What was the name of Ahab''s evil wife?', 'Jezebel', 'Athaliah', 'Michal', 'Abigail', 0, 9),
  (new_quiz_id, 'How did Elijah''s ministry end?', 'He died of old age', 'He was taken up to heaven in a whirlwind', 'He was killed by Jezebel', 'He was exiled', 1, 10);

  -- Create Quiz: 2 Kings Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Kings Quiz', 'Test your knowledge of 2 Kings Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of 2 Kings?', 'The fall of the northern kingdom of Israel', 'The fall of the southern kingdom of Judah', 'The ministry of Elisha', 'All of the above', 3, 1),
  (new_quiz_id, 'Who succeeded Elijah as prophet?', 'Elisha', 'Amos', 'Hosea', 'Isaiah', 0, 2),
  (new_quiz_id, 'What was Elisha''s first miracle?', 'Healing the waters of Jericho', 'Multiplying the widow''s oil', 'Raising the Shunammite''s son', 'Feeding 100 men with 20 loaves', 0, 3),
  (new_quiz_id, 'Which king of Judah was known for his reforms?', 'Hezekiah', 'Josiah', 'Jehoshaphat', 'All of the above', 3, 4),
  (new_quiz_id, 'What happened to the northern kingdom of Israel?', 'It was conquered by Assyria', 'The people were taken into exile', 'It never recovered', 'All of the above', 3, 5),
  (new_quiz_id, 'Who was the last king of Judah before the exile?', 'Zedekiah', 'Jehoiakim', 'Jehoiachin', 'Josiah', 0, 6),
  (new_quiz_id, 'What happened to the temple in Jerusalem?', 'It was destroyed by the Babylonians', 'All its treasures were taken to Babylon', 'It was burned with fire', 'All of the above', 3, 7),
  (new_quiz_id, 'How long did the exile last?', '40 years', '70 years', '100 years', '200 years', 1, 8),
  (new_quiz_id, 'What was the name of the Assyrian king who conquered Israel?', 'Sennacherib', 'Shalmaneser', 'Tiglath-Pileser', 'All of the above', 1, 9),
  (new_quiz_id, 'What happened to the people of Judah after the fall of Jerusalem?', 'They were taken to Babylon', 'They were scattered among the nations', 'They lost their identity', 'All of the above', 3, 10);

  -- Create Quiz: 1 Chronicles Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Chronicles Quiz', 'Test your knowledge of 1 Chronicles Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main purpose of 1 Chronicles?', 'To record genealogies from Adam to the exile', 'To focus on David''s reign and the temple', 'To provide a priestly perspective on history', 'All of the above', 3, 1),
  (new_quiz_id, 'What does the book of Chronicles emphasize?', 'The importance of the temple and worship', 'The role of the priests and Levites', 'God''s faithfulness to His people', 'All of the above', 3, 2),
  (new_quiz_id, 'Who was the first person mentioned in the genealogies?', 'Adam', 'Noah', 'Abraham', 'Jacob', 0, 3),
  (new_quiz_id, 'What was David''s great desire that he couldn''t fulfill?', 'To build the temple', 'To conquer all enemies', 'To establish a dynasty', 'To write psalms', 0, 4),
  (new_quiz_id, 'Who was chosen to build the temple instead of David?', 'Solomon', 'Nathan', 'Zadok', 'Abiathar', 0, 5),
  (new_quiz_id, 'What was the name of the place where David brought the ark?', 'Jerusalem', 'Zion', 'The City of David', 'All of the above', 3, 6),
  (new_quiz_id, 'How many warriors did David have in his army?', '300,000', '1,000,000', '1,300,000', '2,000,000', 2, 7),
  (new_quiz_id, 'What was the purpose of the genealogies in Chronicles?', 'To establish legitimate descent', 'To show God''s faithfulness through generations', 'To connect the past with the present', 'All of the above', 3, 8),
  (new_quiz_id, 'Who were the Levites and what was their role?', 'They were the priestly tribe', 'They were responsible for the temple service', 'They were musicians and gatekeepers', 'All of the above', 3, 9),
  (new_quiz_id, 'What happened to the ark of the covenant in David''s time?', 'It was brought to Jerusalem', 'It was placed in a tent', 'David danced before it', 'All of the above', 3, 10);

  -- Create Quiz: 2 Chronicles Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Chronicles Quiz', 'Test your knowledge of 2 Chronicles Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main focus of 2 Chronicles?', 'The building and dedication of the temple', 'The history of the southern kingdom of Judah', 'The importance of worship and obedience', 'All of the above', 3, 1),
  (new_quiz_id, 'How long did it take Solomon to build the temple?', '7 years', '10 years', '12 years', '20 years', 0, 2),
  (new_quiz_id, 'What happened when the temple was dedicated?', 'The glory of the Lord filled the temple', 'Fire came down from heaven', 'The people offered many sacrifices', 'All of the above', 3, 3),
  (new_quiz_id, 'Which king of Judah was known for his great reforms?', 'Hezekiah', 'Josiah', 'Jehoshaphat', 'All of the above', 3, 4),
  (new_quiz_id, 'What did Josiah do when the Book of the Law was found?', 'He tore his clothes in repentance', 'He led a great revival', 'He destroyed all idols and high places', 'All of the above', 3, 5),
  (new_quiz_id, 'What was the name of the prophetess who confirmed Josiah''s reforms?', 'Huldah', 'Deborah', 'Miriam', 'Anna', 0, 6),
  (new_quiz_id, 'What happened to the temple treasures?', 'They were taken to Babylon', 'They were hidden by the priests', 'They were destroyed by enemies', 'They were lost forever', 0, 7),
  (new_quiz_id, 'Who was the last king of Judah mentioned in Chronicles?', 'Zedekiah', 'Jehoiakim', 'Jehoiachin', 'Josiah', 0, 8),
  (new_quiz_id, 'What was the main message of Chronicles?', 'The importance of obedience to God', 'The consequences of sin and idolatry', 'The hope of restoration', 'All of the above', 3, 9),
  (new_quiz_id, 'What happened to the people of Judah after the fall of Jerusalem?', 'They were taken into exile in Babylon', 'They were scattered among the nations', 'They lost their temple and land', 'All of the above', 3, 10);

  -- Create Quiz: Ezra Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Ezra Quiz', 'Test your knowledge of Ezra Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of the book of Ezra?', 'The return of the exiles from Babylon', 'The rebuilding of the temple', 'The restoration of worship', 'All of the above', 3, 1),
  (new_quiz_id, 'Who led the first group of exiles back to Jerusalem?', 'Ezra', 'Nehemiah', 'Zerubbabel', 'Joshua', 2, 2),
  (new_quiz_id, 'What was the first thing the returned exiles did?', 'They rebuilt the walls', 'They rebuilt the temple', 'They restored the altar', 'They organized the people', 2, 3),
  (new_quiz_id, 'Who were the main opponents of the temple rebuilding?', 'The Samaritans', 'The Ammonites', 'The Moabites', 'All of the above', 3, 4),
  (new_quiz_id, 'What did the people do when the foundation of the temple was laid?', 'They shouted for joy', 'They wept with joy', 'They offered sacrifices', 'All of the above', 3, 5),
  (new_quiz_id, 'Who was the prophet who encouraged the people to rebuild?', 'Haggai', 'Zechariah', 'Both A and B', 'Malachi', 2, 6),
  (new_quiz_id, 'What was Ezra''s main role?', 'He was a priest', 'He was a scribe', 'He taught the Law', 'All of the above', 3, 7),
  (new_quiz_id, 'What did Ezra do when he found the people had intermarried with foreigners?', 'He led them in repentance', 'He made them put away their foreign wives', 'He fasted and prayed', 'All of the above', 3, 8),
  (new_quiz_id, 'How long did it take to complete the temple?', '2 years', '4 years', '6 years', '8 years', 1, 9),
  (new_quiz_id, 'What was the main message of Ezra''s ministry?', 'The importance of obedience to God''s Law', 'The need for separation from foreign influences', 'The restoration of proper worship', 'All of the above', 3, 10);

  -- Create Quiz: Nehemiah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Nehemiah Quiz', 'Test your knowledge of Nehemiah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Nehemiah''s main mission?', 'To rebuild the walls of Jerusalem', 'To restore the temple worship', 'To lead the people in repentance', 'All of the above', 3, 1),
  (new_quiz_id, 'What was Nehemiah''s job in the Persian court?', 'He was a cupbearer to the king', 'He was a scribe', 'He was a governor', 'He was a priest', 0, 2),
  (new_quiz_id, 'How did Nehemiah get permission to go to Jerusalem?', 'He asked the king directly', 'He prayed and the king granted his request', 'He was sent by the king', 'He escaped from the court', 1, 3),
  (new_quiz_id, 'How long did it take to rebuild the walls?', '42 days', '52 days', '62 days', '72 days', 1, 4),
  (new_quiz_id, 'Who were the main opponents of the wall rebuilding?', 'Sanballat', 'Tobiah', 'Geshem', 'All of the above', 3, 5),
  (new_quiz_id, 'What did the people do while rebuilding the walls?', 'They worked with one hand and held weapons with the other', 'They took turns working and standing guard', 'They worked day and night', 'All of the above', 3, 6),
  (new_quiz_id, 'What did Nehemiah do when he found the people were being oppressed?', 'He confronted the oppressors', 'He made them return what they had taken', 'He led the people in repentance', 'All of the above', 3, 7),
  (new_quiz_id, 'What did Nehemiah do to ensure the city was populated?', 'He brought people from other cities', 'He cast lots to choose who would live there', 'He offered incentives to live in Jerusalem', 'All of the above', 1, 8),
  (new_quiz_id, 'What was the main theme of Nehemiah''s reforms?', 'The importance of keeping the Sabbath', 'The prohibition of intermarriage with foreigners', 'The restoration of temple worship', 'All of the above', 3, 9),
  (new_quiz_id, 'What happened when the walls were completed?', 'The people celebrated with great joy', 'They dedicated the walls with music and thanksgiving', 'They read the Law and renewed their covenant', 'All of the above', 3, 10);

  -- Create Quiz: Esther Quiz - Courage and Deliverance
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Esther Quiz - Courage and Deliverance', 'Test your knowledge of Esther Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Esther''s Hebrew name?', 'Hadassah', 'Esther', 'Both A and B', 'Neither A nor B', 2, 1),
  (new_quiz_id, 'What was the name of Esther''s cousin who raised her?', 'Mordecai', 'Haman', 'Xerxes', 'Bigthana', 0, 2),
  (new_quiz_id, 'What was the name of the king who chose Esther as queen?', 'Nebuchadnezzar', 'Xerxes', 'Darius', 'Cyrus', 1, 3),
  (new_quiz_id, 'What was the name of the man who plotted to destroy the Jews?', 'Mordecai', 'Haman', 'Bigthana', 'Teresh', 1, 4),
  (new_quiz_id, 'What did Mordecai refuse to do that angered Haman?', 'Bow down to Haman', 'Pay tribute to Haman', 'Serve Haman', 'All of the above', 0, 5),
  (new_quiz_id, 'What did Haman plan to do to Mordecai?', 'Kill him', 'Hang him on a pole', 'Exile him', 'Imprison him', 1, 6),
  (new_quiz_id, 'What did Esther ask the king and Haman to do?', 'Come to a banquet', 'Come to a banquet she had prepared', 'Come to a banquet the next day', 'All of the above', 3, 7),
  (new_quiz_id, 'What happened to Haman in the end?', 'He was hanged on the pole he prepared for Mordecai', 'He was exiled', 'He was imprisoned', 'He was forgiven', 0, 8),
  (new_quiz_id, 'What did the king give Mordecai after Haman''s death?', 'Haman''s house', 'Haman''s position', 'Haman''s ring', 'All of the above', 3, 9),
  (new_quiz_id, 'What did the Jews do to celebrate their deliverance?', 'They had a feast', 'They gave presents to each other', 'They gave gifts to the poor', 'All of the above', 3, 10);

  -- Create Quiz: Job Quiz - Suffering and Faith
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Job Quiz - Suffering and Faith', 'Test your knowledge of Job Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Job''s occupation?', 'Farmer', 'Shepherd', 'Merchant', 'We don''t know specifically', 3, 1),
  (new_quiz_id, 'How many children did Job have?', 'Seven sons and three daughters', 'Ten sons and ten daughters', 'Five sons and five daughters', 'Three sons and seven daughters', 0, 2),
  (new_quiz_id, 'What did Satan say about Job''s faithfulness?', 'Job was faithful because he was blessed', 'Job would curse God if his blessings were taken away', 'Job was not truly faithful', 'All of the above', 1, 3),
  (new_quiz_id, 'What was the first thing Satan took from Job?', 'His health', 'His children', 'His wealth', 'His wife', 2, 4),
  (new_quiz_id, 'How many friends came to comfort Job?', 'Two', 'Three', 'Four', 'Five', 1, 5),
  (new_quiz_id, 'What did Job''s wife tell him to do?', 'Curse God and die', 'Pray harder', 'Give up', 'All of the above', 0, 6),
  (new_quiz_id, 'What did Job say about the Lord giving and taking away?', 'The Lord gives and the Lord takes away', 'Blessed be the name of the Lord', 'Naked I came from my mother''s womb, and naked I will depart', 'All of the above', 3, 7),
  (new_quiz_id, 'What did God restore to Job at the end?', 'His wealth', 'His children', 'His health', 'All of the above', 3, 8),
  (new_quiz_id, 'How many years did Job live after his restoration?', '100 years', '120 years', '140 years', '150 years', 2, 9),
  (new_quiz_id, 'What did Job say about God''s wisdom?', 'God''s wisdom is beyond understanding', 'God''s ways are higher than our ways', 'God''s thoughts are higher than our thoughts', 'All of the above', 3, 10);

  -- Create Quiz: Psalms Quiz - Songs of the Heart
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Psalms Quiz - Songs of the Heart', 'Test your knowledge of Psalms Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'Who wrote most of the Psalms?', 'Solomon', 'David', 'Moses', 'Asaph', 1, 1),
  (new_quiz_id, 'What is the first word of Psalm 23?', 'The', 'Lord', 'God', 'My', 0, 2),
  (new_quiz_id, 'How many Psalms are there in total?', '120', '130', '140', '150', 3, 3),
  (new_quiz_id, 'What is the longest Psalm?', 'Psalm 119', 'Psalm 118', 'Psalm 117', 'Psalm 116', 0, 4),
  (new_quiz_id, 'What is the shortest Psalm?', 'Psalm 117', 'Psalm 116', 'Psalm 115', 'Psalm 114', 0, 5),
  (new_quiz_id, 'In Psalm 1, what is the blessed man like?', 'A tree planted by streams of water', 'A mountain that cannot be moved', 'A fortress that cannot be shaken', 'A light that cannot be hidden', 0, 6),
  (new_quiz_id, 'What does Psalm 100 say we should do?', 'Be still and know that I am God', 'Make a joyful noise to the Lord', 'The Lord is my shepherd', 'I lift up my eyes to the hills', 1, 7),
  (new_quiz_id, 'In Psalm 51, what does David ask God to create in him?', 'A clean heart', 'A pure mind', 'A righteous spirit', 'A holy soul', 0, 8),
  (new_quiz_id, 'What does Psalm 46:10 say?', 'The Lord is my shepherd', 'Be still and know that I am God', 'The Lord is my light and my salvation', 'I will lift up my eyes to the hills', 1, 9),
  (new_quiz_id, 'In Psalm 139, what does David say God has done?', 'Created him', 'Known him', 'Loved him', 'All of the above', 3, 10);

  -- Create Quiz: Proverbs Quiz - Wisdom for Daily Living
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Proverbs Quiz - Wisdom for Daily Living', 'Test your knowledge of Proverbs Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'Who is credited with writing most of the book of Proverbs?', 'David', 'Solomon', 'Moses', 'Isaiah', 1, 1),
  (new_quiz_id, 'What is the beginning of wisdom according to Proverbs?', 'Knowledge', 'Understanding', 'The fear of the Lord', 'Experience', 2, 2),
  (new_quiz_id, 'What does Proverbs say about the tongue?', 'It has the power of life and death', 'It is sharper than a sword', 'It reveals what is in the heart', 'All of the above', 3, 3),
  (new_quiz_id, 'What does Proverbs say about training up a child?', 'In the way he should go', 'With discipline and love', 'In the fear of the Lord', 'With patience and understanding', 0, 4),
  (new_quiz_id, 'What does Proverbs say about the lazy person?', 'Will go hungry', 'Will be poor', 'Will be shamed', 'All of the above', 3, 5),
  (new_quiz_id, 'What does Proverbs say about a friend?', 'Sticks closer than a brother', 'Loves at all times', 'Is born for adversity', 'All of the above', 3, 6),
  (new_quiz_id, 'What does Proverbs say about the heart?', 'Is deceitful above all things', 'Guards the mouth', 'Is the wellspring of life', 'All of the above', 2, 7),
  (new_quiz_id, 'What does Proverbs say about answering a fool?', 'Answer him according to his folly', 'Don''t answer him at all', 'Answer him with wisdom', 'Answer him with patience', 0, 8),
  (new_quiz_id, 'What does Proverbs say about the righteous?', 'Will flourish like a palm tree', 'Will be like a tree planted by streams of water', 'Will never be shaken', 'All of the above', 3, 9),
  (new_quiz_id, 'What does Proverbs say about the wise person?', 'Listens to advice', 'Stores up knowledge', 'Seeks understanding', 'All of the above', 3, 10);

  -- Create Quiz: Isaiah Quiz - The Major Prophet
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Isaiah Quiz - The Major Prophet', 'Test your knowledge of Isaiah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Isaiah''s father''s name?', 'Amoz', 'Uzziah', 'Hezekiah', 'Josiah', 0, 1),
  (new_quiz_id, 'What did Isaiah see in his vision in chapter 6?', 'A burning bush', 'The Lord seated on a throne', 'A golden calf', 'A ladder to heaven', 1, 2),
  (new_quiz_id, 'What did the seraphim call out to each other?', 'Holy, holy, holy', 'Glory, glory, glory', 'Praise, praise, praise', 'Hallelujah, hallelujah, hallelujah', 0, 3),
  (new_quiz_id, 'What did Isaiah say would be the sign given to King Ahaz?', 'A child will be born', 'The virgin will conceive', 'A son will be given', 'All of the above', 3, 4),
  (new_quiz_id, 'What are the names of the child mentioned in Isaiah 9:6?', 'Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace', 'King of Kings, Lord of Lords, Alpha and Omega', 'Savior, Redeemer, Messiah, Christ', 'None of the above', 0, 5),
  (new_quiz_id, 'What did Isaiah say would happen to the wolf and the lamb?', 'The wolf would eat the lamb', 'They would live together in peace', 'They would be enemies forever', 'The lamb would rule over the wolf', 1, 6),
  (new_quiz_id, 'What did Isaiah say about the coming Messiah''s appearance?', 'He would be handsome and tall', 'He would have no beauty or majesty', 'He would be strong and mighty', 'He would be old and wise', 1, 7),
  (new_quiz_id, 'What did Isaiah say the Messiah would be called?', 'King of Kings', 'Prince of Peace', 'Lord of Lords', 'All of the above', 1, 8),
  (new_quiz_id, 'What did Isaiah say about the Messiah''s suffering?', 'He would be rejected by men', 'He would be pierced for our transgressions', 'He would be crushed for our iniquities', 'All of the above', 3, 9),
  (new_quiz_id, 'What did Isaiah say would happen to those who wait on the Lord?', 'They would be blessed', 'They would renew their strength', 'They would soar on wings like eagles', 'All of the above', 3, 10);

  -- Create Quiz: Daniel Quiz - Faith in the Lion''s Den
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Daniel Quiz - Faith in the Lion''s Den', 'Test your knowledge of Daniel Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Daniel''s Hebrew name?', 'Belteshazzar', 'Daniel', 'Both A and B', 'Neither A nor B', 2, 1),
  (new_quiz_id, 'What did Daniel and his friends refuse to eat?', 'Pork', 'The king''s food and wine', 'Meat', 'Bread', 1, 2),
  (new_quiz_id, 'What was the name of the king who threw Daniel''s friends into the furnace?', 'Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus', 0, 3),
  (new_quiz_id, 'What did King Nebuchadnezzar see in his dream?', 'A tree', 'A statue', 'A beast', 'A mountain', 1, 4),
  (new_quiz_id, 'What was written on the wall during Belshazzar''s feast?', 'MENE, MENE, TEKEL, PARSIN', 'HOLY, HOLY, HOLY', 'GLORY TO GOD', 'None of the above', 0, 5),
  (new_quiz_id, 'What happened to Daniel when he was thrown into the lions'' den?', 'He was eaten by the lions', 'God shut the lions'' mouths', 'He escaped through a secret passage', 'The lions became friendly', 1, 6),
  (new_quiz_id, 'What was the name of the king who threw Daniel into the lions'' den?', 'Nebuchadnezzar', 'Belshazzar', 'Darius', 'Cyrus', 2, 7),
  (new_quiz_id, 'What did Daniel see in his vision of the four beasts?', 'Four different animals', 'A lion, bear, leopard, and a terrifying beast', 'Four kings', 'All of the above', 3, 8),
  (new_quiz_id, 'How many times a day did Daniel pray?', 'Once', 'Twice', 'Three times', 'Four times', 2, 9),
  (new_quiz_id, 'What did the angel Gabriel tell Daniel about the 70 weeks?', 'They represented 70 years', 'They were about the coming Messiah', 'They were about the end times', 'All of the above', 3, 10);

  -- Create Quiz: Hosea Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Hosea Quiz', 'Test your knowledge of Hosea Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of Hosea''s message?', 'God''s judgment on Israel', 'God''s love despite Israel''s unfaithfulness', 'The coming Messiah', 'The fall of Jerusalem', 1, 1),
  (new_quiz_id, 'What did God command Hosea to do as a living illustration?', 'To marry a prostitute', 'To name his children symbolic names', 'To buy back his unfaithful wife', 'All of the above', 3, 2),
  (new_quiz_id, 'What were the names of Hosea''s children?', 'Jezreel, Lo-Ruhamah, Lo-Ammi', 'Immanuel, Maher-shalal-hash-baz', 'Shear-jashub, Immanuel', 'None of the above', 0, 3),
  (new_quiz_id, 'What did the name ''Lo-Ruhamah'' mean?', 'Not loved', 'Not my people', 'God sows', 'God is salvation', 0, 4),
  (new_quiz_id, 'What did Hosea say about Israel''s relationship with God?', 'Israel was faithful to God', 'Israel had forgotten God', 'Israel was God''s favorite', 'Israel was chosen above all nations', 1, 5),
  (new_quiz_id, 'What did Hosea prophesy about Israel''s future?', 'Complete destruction', 'Restoration and blessing', 'Eternal exile', 'No hope', 1, 6),
  (new_quiz_id, 'What was Hosea''s message about repentance?', 'It was too late for Israel', 'God would accept their repentance', 'Only sacrifices were needed', 'Repentance was impossible', 1, 7),
  (new_quiz_id, 'What did Hosea say about God''s love?', 'God''s love was conditional', 'God''s love was like a father''s love', 'God''s love was temporary', 'God''s love was earned', 1, 8),
  (new_quiz_id, 'What did Hosea prophesy about the Messiah?', 'He would come from Egypt', 'He would be called out of Egypt', 'He would be born in Bethlehem', 'He would come from the east', 1, 9),
  (new_quiz_id, 'What was Hosea''s final message?', 'Complete destruction', 'Hope and restoration', 'Eternal judgment', 'No future for Israel', 1, 10);

  -- Create Quiz: Joel Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Joel Quiz', 'Test your knowledge of Joel Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of Joel''s prophecy?', 'The coming Day of the Lord', 'The fall of Jerusalem', 'The restoration of Israel', 'The coming Messiah', 0, 1),
  (new_quiz_id, 'What natural disaster did Joel use as an illustration?', 'Earthquake', 'Flood', 'Locust plague', 'Famine', 2, 2),
  (new_quiz_id, 'What did Joel prophesy about God''s Spirit?', 'It would be withdrawn from Israel', 'It would be poured out on all people', 'It would only come to the priests', 'It would be limited to prophets', 1, 3),
  (new_quiz_id, 'What did Joel say about the Day of the Lord?', 'It would be a day of blessing', 'It would be a day of judgment and salvation', 'It would never come', 'It would be a day of peace', 1, 4),
  (new_quiz_id, 'What did Joel call the people to do?', 'To fight their enemies', 'To repent and return to God', 'To build a new temple', 'To leave the land', 1, 5),
  (new_quiz_id, 'What did Joel prophesy about the future restoration?', 'Israel would be destroyed', 'Israel would be restored and blessed', 'Israel would be scattered', 'Israel would be forgotten', 1, 6),
  (new_quiz_id, 'What did Joel say about the coming judgment?', 'It would be delayed forever', 'It would come like a thief', 'It would be announced in advance', 'It would never happen', 2, 7),
  (new_quiz_id, 'What did Joel prophesy about the nations?', 'They would be blessed', 'They would be judged in the Valley of Jehoshaphat', 'They would be destroyed', 'They would be ignored', 1, 8),
  (new_quiz_id, 'What did Joel say about God''s character?', 'God was only judgmental', 'God was gracious and compassionate', 'God was distant', 'God was uncaring', 1, 9),
  (new_quiz_id, 'What was Joel''s message about hope?', 'There was no hope', 'Hope was found in repentance and God''s mercy', 'Hope was in human effort', 'Hope was in alliances', 1, 10);

  -- Create Quiz: Amos Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Amos Quiz', 'Test your knowledge of Amos Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Amos''s profession before becoming a prophet?', 'Priest', 'Shepherd and fig farmer', 'King', 'Scribe', 1, 1),
  (new_quiz_id, 'What was the main theme of Amos''s message?', 'God''s love for Israel', 'Social justice and God''s judgment', 'The coming Messiah', 'The restoration of the temple', 1, 2),
  (new_quiz_id, 'What did Amos say about Israel''s worship?', 'It was acceptable to God', 'God hated their festivals and sacrifices', 'It was perfect', 'It was improving', 1, 3),
  (new_quiz_id, 'What did Amos prophesy about Israel''s future?', 'Great blessing', 'Exile and destruction', 'Peace and prosperity', 'Victory over enemies', 1, 4),
  (new_quiz_id, 'What did Amos say about the rich and poor?', 'The rich were blessed by God', 'The poor deserved their fate', 'God would judge the rich for oppressing the poor', 'Wealth was a sign of God''s favor', 2, 5),
  (new_quiz_id, 'What did Amos see in his visions?', 'A plumb line', 'A basket of ripe fruit', 'The Lord standing by the altar', 'All of the above', 3, 6),
  (new_quiz_id, 'What did Amos say about the Day of the Lord?', 'It would be a day of blessing', 'It would be darkness, not light', 'It would never come', 'It would be a day of peace', 1, 7),
  (new_quiz_id, 'What did Amos prophesy about the restoration?', 'There would be no restoration', 'The fallen booth of David would be rebuilt', 'Israel would be destroyed forever', 'Only the temple would be restored', 1, 8),
  (new_quiz_id, 'What did Amos say about God''s relationship with other nations?', 'God only cared about Israel', 'God held other nations accountable too', 'Other nations were irrelevant', 'God favored other nations over Israel', 1, 9),
  (new_quiz_id, 'What was Amos''s message about true worship?', 'Sacrifices were enough', 'Justice and righteousness were required', 'Only the priests mattered', 'Rituals were sufficient', 1, 10);

  -- Create Quiz: Obadiah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Obadiah Quiz', 'Test your knowledge of Obadiah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Obadiah''s main message?', 'Blessing for Edom', 'Judgment on Edom for their pride and violence', 'Peace for all nations', 'Restoration for Israel only', 1, 1),
  (new_quiz_id, 'What was Edom''s relationship to Israel?', 'They were allies', 'They were brothers (descendants of Esau)', 'They were enemies from the beginning', 'They were the same people', 1, 2),
  (new_quiz_id, 'What did Obadiah say about Edom''s pride?', 'It was justified', 'It would be their downfall', 'It was admirable', 'It was harmless', 1, 3),
  (new_quiz_id, 'What did Edom do to Israel that angered God?', 'They helped Israel', 'They stood aloof and rejoiced at Israel''s destruction', 'They were neutral', 'They were forced to attack', 1, 4),
  (new_quiz_id, 'What did Obadiah prophesy about Edom''s future?', 'Edom would be blessed', 'Edom would be completely destroyed', 'Edom would be restored', 'Edom would rule over Israel', 1, 5),
  (new_quiz_id, 'What did Obadiah say about the Day of the Lord?', 'It would be a day of blessing for all', 'It would be a day of judgment for all nations', 'It would never come', 'It would only affect Israel', 1, 6),
  (new_quiz_id, 'What did Obadiah prophesy about Israel''s restoration?', 'Israel would be destroyed forever', 'Israel would be restored and rule over Edom', 'Israel would be forgotten', 'Israel would serve Edom', 1, 7),
  (new_quiz_id, 'What was Obadiah''s message about God''s justice?', 'God was unfair', 'God would judge all nations according to their deeds', 'God only cared about Israel', 'God was powerless', 1, 8),
  (new_quiz_id, 'What did Obadiah say about Edom''s wisdom?', 'It would save them', 'It would be destroyed along with them', 'It was insufficient', 'It was their strength', 1, 9),
  (new_quiz_id, 'What was Obadiah''s final message?', 'Complete destruction for all', 'The kingdom would be the Lord''s', 'No hope for anyone', 'Edom would be restored', 1, 10);

  -- Create Quiz: Jonah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Jonah Quiz', 'Test your knowledge of Jonah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was God''s command to Jonah?', 'To go to Nineveh and preach against it', 'To go to Jerusalem and preach', 'To go to Babylon and preach', 'To stay in Israel', 0, 1),
  (new_quiz_id, 'What did Jonah do when God called him?', 'He obeyed immediately', 'He ran away to Tarshish', 'He asked for clarification', 'He went to Nineveh', 1, 2),
  (new_quiz_id, 'What happened to Jonah on the ship?', 'He was thrown overboard', 'He was swallowed by a great fish', 'He was rescued by sailors', 'All of the above', 3, 3),
  (new_quiz_id, 'How long was Jonah in the fish?', 'One day', 'Three days and three nights', 'Seven days', 'Forty days', 1, 4),
  (new_quiz_id, 'What did Jonah do when he was in the fish?', 'He prayed to God', 'He repented of his disobedience', 'He praised God for deliverance', 'All of the above', 3, 5),
  (new_quiz_id, 'What happened when Jonah preached to Nineveh?', 'They ignored him', 'They repented and turned to God', 'They attacked him', 'They laughed at him', 1, 6),
  (new_quiz_id, 'How did God respond to Nineveh''s repentance?', 'He destroyed them anyway', 'He relented and did not destroy them', 'He delayed the judgment', 'He was angry with Jonah', 1, 7),
  (new_quiz_id, 'What was Jonah''s reaction to Nineveh''s repentance?', 'He was happy', 'He was angry and wanted to die', 'He was surprised', 'He was proud', 1, 8),
  (new_quiz_id, 'What did God teach Jonah with the plant?', 'About God''s care for all creation', 'About God''s mercy for Nineveh', 'About God''s love for all people', 'All of the above', 3, 9),
  (new_quiz_id, 'What was the main message of the book of Jonah?', 'God''s judgment is certain', 'God''s mercy extends to all people', 'Prophets must obey God', 'All of the above', 3, 10);

  -- Create Quiz: Micah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Micah Quiz', 'Test your knowledge of Micah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Micah''s main message?', 'Blessing for the rich', 'Judgment for social injustice and hope for restoration', 'Peace for all nations', 'Only judgment', 1, 1),
  (new_quiz_id, 'What did Micah prophesy about the Messiah''s birthplace?', 'Jerusalem', 'Bethlehem', 'Nazareth', 'Hebron', 1, 2),
  (new_quiz_id, 'What did Micah say about what God requires?', 'Sacrifices and offerings', 'To act justly, love mercy, and walk humbly with God', 'Perfect obedience', 'Ritual purity', 1, 3),
  (new_quiz_id, 'What did Micah prophesy about Jerusalem?', 'It would be destroyed forever', 'It would be restored and become the center of God''s rule', 'It would be forgotten', 'It would be replaced', 1, 4),
  (new_quiz_id, 'What did Micah say about the leaders of Israel?', 'They were doing well', 'They were corrupt and oppressing the people', 'They were blessed by God', 'They were improving', 1, 5),
  (new_quiz_id, 'What did Micah prophesy about the nations?', 'They would be destroyed', 'They would come to Jerusalem to learn God''s ways', 'They would be ignored', 'They would rule over Israel', 1, 6),
  (new_quiz_id, 'What did Micah say about God''s character?', 'God was only judgmental', 'God was both just and merciful', 'God was distant', 'God was uncaring', 1, 7),
  (new_quiz_id, 'What did Micah prophesy about the future restoration?', 'There would be no restoration', 'Israel would be restored and blessed', 'Only the temple would be restored', 'Only the priests would be restored', 1, 8),
  (new_quiz_id, 'What did Micah say about the coming ruler?', 'He would be from Jerusalem', 'He would be from Bethlehem and rule in peace', 'He would be from Egypt', 'He would be from Babylon', 1, 9),
  (new_quiz_id, 'What was Micah''s message about hope?', 'There was no hope', 'Hope was found in God''s promises of restoration', 'Hope was in human effort', 'Hope was in alliances', 1, 10);

  -- Create Quiz: Nahum Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Nahum Quiz', 'Test your knowledge of Nahum Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Nahum''s main message?', 'Blessing for Nineveh', 'Judgment on Nineveh for their cruelty', 'Peace for all nations', 'Restoration for Israel only', 1, 1),
  (new_quiz_id, 'What was Nineveh known for?', 'Their kindness', 'Their cruelty and violence', 'Their wisdom', 'Their peace', 1, 2),
  (new_quiz_id, 'What did Nahum say about God''s character?', 'God was only loving', 'God was slow to anger but would not leave the guilty unpunished', 'God was powerless', 'God was uncaring', 1, 3),
  (new_quiz_id, 'What did Nahum prophesy about Nineveh''s destruction?', 'It would be delayed', 'It would be complete and final', 'It would never happen', 'It would be partial', 1, 4),
  (new_quiz_id, 'What did Nahum say about the fall of Nineveh?', 'It would be peaceful', 'It would be sudden and devastating', 'It would be delayed', 'It would be partial', 1, 5),
  (new_quiz_id, 'What did Nahum prophesy about Judah?', 'Judah would be destroyed', 'Judah would be restored and blessed', 'Judah would be forgotten', 'Judah would serve Nineveh', 1, 6),
  (new_quiz_id, 'What did Nahum say about Nineveh''s wealth?', 'It would save them', 'It would be plundered by their enemies', 'It would increase', 'It would be blessed', 1, 7),
  (new_quiz_id, 'What did Nahum prophesy about the nations?', 'They would be blessed', 'They would rejoice at Nineveh''s fall', 'They would be destroyed', 'They would be ignored', 1, 8),
  (new_quiz_id, 'What was Nahum''s message about God''s justice?', 'God was unfair', 'God would judge Nineveh for their evil deeds', 'God only cared about Israel', 'God was powerless', 1, 9),
  (new_quiz_id, 'What did Nahum say about the future?', 'There was no hope', 'There was hope for Judah''s restoration', 'Only judgment awaited', 'Nineveh would be restored', 1, 10);

  -- Create Quiz: Habakkuk Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Habakkuk Quiz', 'Test your knowledge of Habakkuk Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Habakkuk''s main concern?', 'His own safety', 'Why God allowed evil to go unpunished', 'The coming Messiah', 'The restoration of the temple', 1, 1),
  (new_quiz_id, 'What did Habakkuk do when he had questions?', 'He kept silent', 'He complained to God', 'He went to other prophets', 'He ignored his concerns', 1, 2),
  (new_quiz_id, 'What did God tell Habakkuk about the Babylonians?', 'They would be blessed', 'They would be used to judge Judah', 'They would be destroyed immediately', 'They would be ignored', 1, 3),
  (new_quiz_id, 'What was Habakkuk''s response to God''s answer?', 'He was satisfied', 'He had more questions about God''s justice', 'He was angry', 'He was confused', 1, 4),
  (new_quiz_id, 'What did God tell Habakkuk about the righteous?', 'They would be destroyed', 'They would live by faith', 'They would be forgotten', 'They would be blessed immediately', 1, 5),
  (new_quiz_id, 'What did Habakkuk say about God''s character?', 'God was unfair', 'God was just and would judge the wicked', 'God was powerless', 'God was uncaring', 1, 6),
  (new_quiz_id, 'What did Habakkuk prophesy about the Babylonians?', 'They would be blessed', 'They would be judged for their cruelty', 'They would rule forever', 'They would be ignored', 1, 7),
  (new_quiz_id, 'What was Habakkuk''s final response?', 'He was angry', 'He praised God and trusted in His justice', 'He was confused', 'He was disappointed', 1, 8),
  (new_quiz_id, 'What did Habakkuk say about God''s power?', 'God was weak', 'God was sovereign over all nations', 'God was limited', 'God was uncaring', 1, 9),
  (new_quiz_id, 'What was Habakkuk''s message about faith?', 'Faith was unnecessary', 'The righteous would live by faith', 'Faith was impossible', 'Faith was optional', 1, 10);

  -- Create Quiz: Zephaniah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Zephaniah Quiz', 'Test your knowledge of Zephaniah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Zephaniah''s main message?', 'Blessing for all nations', 'The coming Day of the Lord and restoration', 'Peace for Israel only', 'Only judgment', 1, 1),
  (new_quiz_id, 'What did Zephaniah prophesy about the Day of the Lord?', 'It would be a day of blessing', 'It would be a day of judgment and destruction', 'It would never come', 'It would be a day of peace', 1, 2),
  (new_quiz_id, 'What did Zephaniah say about Jerusalem?', 'It would be blessed', 'It would be destroyed for its sin', 'It would be ignored', 'It would be restored immediately', 1, 3),
  (new_quiz_id, 'What did Zephaniah prophesy about the nations?', 'They would be blessed', 'They would be judged by God', 'They would be ignored', 'They would rule over Israel', 1, 4),
  (new_quiz_id, 'What did Zephaniah say about the remnant?', 'There would be no remnant', 'A humble remnant would be spared', 'Only the rich would survive', 'Only the priests would survive', 1, 5),
  (new_quiz_id, 'What did Zephaniah prophesy about the future restoration?', 'There would be no restoration', 'Israel would be restored and blessed', 'Only the temple would be restored', 'Only the priests would be restored', 1, 6),
  (new_quiz_id, 'What did Zephaniah say about God''s character?', 'God was only judgmental', 'God was both just and merciful', 'God was distant', 'God was uncaring', 1, 7),
  (new_quiz_id, 'What did Zephaniah prophesy about the nations'' worship?', 'They would worship their own gods', 'They would come to worship the true God', 'They would be destroyed', 'They would be ignored', 1, 8),
  (new_quiz_id, 'What did Zephaniah say about the coming judgment?', 'It would be delayed forever', 'It would come suddenly and unexpectedly', 'It would never happen', 'It would be announced in advance', 1, 9),
  (new_quiz_id, 'What was Zephaniah''s message about hope?', 'There was no hope', 'Hope was found in God''s promises of restoration', 'Hope was in human effort', 'Hope was in alliances', 1, 10);

  -- Create Quiz: Haggai Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Haggai Quiz', 'Test your knowledge of Haggai Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Haggai''s main message?', 'Blessing for the people', 'Rebuild the temple and put God first', 'Leave the land', 'Only judgment', 1, 1),
  (new_quiz_id, 'What was the condition of the temple when Haggai began prophesying?', 'It was complete', 'It was in ruins and needed rebuilding', 'It was being built', 'It was perfect', 1, 2),
  (new_quiz_id, 'What did Haggai say about the people''s priorities?', 'They were correct', 'They were building their own houses while God''s house lay in ruins', 'They were doing well', 'They were blessed', 1, 3),
  (new_quiz_id, 'What did Haggai prophesy about the people''s prosperity?', 'It would increase', 'It would decrease until they rebuilt the temple', 'It would stay the same', 'It would be blessed', 1, 4),
  (new_quiz_id, 'What did Haggai say about the glory of the new temple?', 'It would be less than the old one', 'It would be greater than the old one', 'It would be the same', 'It would be ignored', 1, 5),
  (new_quiz_id, 'What did Haggai prophesy about Zerubbabel?', 'He would be forgotten', 'He would be like a signet ring to God', 'He would be destroyed', 'He would be ignored', 1, 6),
  (new_quiz_id, 'What did Haggai say about the people''s response?', 'They ignored him', 'They obeyed and began rebuilding', 'They were angry', 'They were confused', 1, 7),
  (new_quiz_id, 'What did Haggai prophesy about the future?', 'There would be no future', 'God would bless them when they put Him first', 'They would be destroyed', 'They would be forgotten', 1, 8),
  (new_quiz_id, 'What did Haggai say about God''s presence?', 'God was absent', 'God was with them when they obeyed', 'God was distant', 'God was uncaring', 1, 9),
  (new_quiz_id, 'What was Haggai''s message about obedience?', 'Obedience was optional', 'Obedience to God''s commands was essential', 'Obedience was impossible', 'Obedience was unnecessary', 1, 10);

  -- Create Quiz: Zechariah Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Zechariah Quiz', 'Test your knowledge of Zechariah Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Zechariah''s main message?', 'Only judgment', 'Encouragement to rebuild and hope for the future', 'Leave the land', 'Only blessing', 1, 1),
  (new_quiz_id, 'What did Zechariah see in his first vision?', 'A burning bush', 'A man on a red horse among myrtle trees', 'A golden calf', 'A burning mountain', 1, 2),
  (new_quiz_id, 'What did Zechariah prophesy about the coming Messiah?', 'He would come from Egypt', 'He would come riding on a donkey', 'He would come from the east', 'He would come from the north', 1, 3),
  (new_quiz_id, 'What did Zechariah say about the temple?', 'It would be destroyed', 'It would be rebuilt and God would dwell there', 'It would be ignored', 'It would be replaced', 1, 4),
  (new_quiz_id, 'What did Zechariah prophesy about Jerusalem?', 'It would be destroyed', 'It would be restored and become the center of God''s rule', 'It would be forgotten', 'It would be replaced', 1, 5),
  (new_quiz_id, 'What did Zechariah say about the nations?', 'They would be destroyed', 'They would come to Jerusalem to worship God', 'They would be ignored', 'They would rule over Israel', 1, 6),
  (new_quiz_id, 'What did Zechariah prophesy about the future?', 'There would be no future', 'God would establish His kingdom on earth', 'They would be destroyed', 'They would be forgotten', 1, 7),
  (new_quiz_id, 'What did Zechariah say about God''s presence?', 'God was absent', 'God would return to dwell with His people', 'God was distant', 'God was uncaring', 1, 8),
  (new_quiz_id, 'What did Zechariah prophesy about the coming king?', 'He would be from Egypt', 'He would be righteous and bring salvation', 'He would be from Babylon', 'He would be from the east', 1, 9),
  (new_quiz_id, 'What was Zechariah''s message about hope?', 'There was no hope', 'Hope was found in God''s promises of restoration', 'Hope was in human effort', 'Hope was in alliances', 1, 10);

  -- Create Quiz: Malachi Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Malachi Quiz', 'Test your knowledge of Malachi Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Malachi''s main message?', 'Only blessing', 'Call to repentance and the coming of the Messiah', 'Only judgment', 'Leave the land', 1, 1),
  (new_quiz_id, 'What did Malachi say about the people''s offerings?', 'They were perfect', 'They were giving God their worst instead of their best', 'They were too generous', 'They were unnecessary', 1, 2),
  (new_quiz_id, 'What did Malachi prophesy about the coming Messiah?', 'He would come from Egypt', 'He would come to His temple suddenly', 'He would come from the east', 'He would come from the north', 1, 3),
  (new_quiz_id, 'What did Malachi say about the priests?', 'They were doing well', 'They were corrupt and leading the people astray', 'They were blessed', 'They were improving', 1, 4),
  (new_quiz_id, 'What did Malachi prophesy about the future?', 'There would be no future', 'God would send Elijah before the great day', 'They would be destroyed', 'They would be forgotten', 1, 5),
  (new_quiz_id, 'What did Malachi say about God''s love?', 'God''s love was conditional', 'God''s love was demonstrated in choosing Israel', 'God''s love was temporary', 'God''s love was earned', 1, 6),
  (new_quiz_id, 'What did Malachi say about the people''s response?', 'They were obedient', 'They were questioning God''s love and justice', 'They were faithful', 'They were blessed', 1, 7),
  (new_quiz_id, 'What did Malachi prophesy about the coming judgment?', 'It would be delayed forever', 'It would come like a refiner''s fire', 'It would never happen', 'It would be partial', 1, 8),
  (new_quiz_id, 'What did Malachi say about the coming restoration?', 'There would be no restoration', 'God would restore the hearts of parents and children', 'They would be destroyed', 'They would be forgotten', 1, 9),
  (new_quiz_id, 'What was Malachi''s final message?', 'There was no hope', 'Hope was found in God''s promises and the coming Messiah', 'Hope was in human effort', 'Hope was in alliances', 1, 10);

  -- Create Quiz: Matthew Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Matthew Quiz', 'Test your knowledge of Matthew Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Matthew''s profession before following Jesus?', 'Fisherman', 'Tax collector', 'Shepherd', 'Scribe', 1, 1),
  (new_quiz_id, 'What did Matthew emphasize about Jesus?', 'His miracles only', 'His fulfillment of Old Testament prophecies', 'His parables only', 'His disciples only', 1, 2),
  (new_quiz_id, 'What was the main theme of Matthew''s Gospel?', 'Jesus as a teacher', 'Jesus as the promised Messiah and King', 'Jesus as a miracle worker', 'Jesus as a prophet', 1, 3),
  (new_quiz_id, 'What did Matthew record about Jesus'' birth?', 'He was born in Nazareth', 'He was born in Bethlehem and visited by wise men', 'He was born in Jerusalem', 'He was born in Egypt', 1, 4),
  (new_quiz_id, 'What did Matthew record about Jesus'' teachings?', 'Only parables', 'The Sermon on the Mount and many teachings', 'Only miracles', 'Only prophecies', 1, 5),
  (new_quiz_id, 'What did Matthew emphasize about the kingdom of heaven?', 'It was only for Jews', 'It was at hand and open to all who repented', 'It was far away', 'It was only for the righteous', 1, 6),
  (new_quiz_id, 'What did Matthew record about Jesus'' death and resurrection?', 'He died but didn''t rise', 'He died and rose again on the third day', 'He didn''t die', 'He died and stayed dead', 1, 7),
  (new_quiz_id, 'What did Matthew emphasize about Jesus'' authority?', 'He had no authority', 'He had authority over all things', 'He had limited authority', 'He had authority only over Jews', 1, 8),
  (new_quiz_id, 'What did Matthew record about Jesus'' final commission?', 'To stay in Jerusalem', 'To go and make disciples of all nations', 'To only teach Jews', 'To avoid Gentiles', 1, 9),
  (new_quiz_id, 'What was Matthew''s message about Jesus'' identity?', 'He was just a teacher', 'He was the Son of God and Savior of the world', 'He was just a prophet', 'He was just a miracle worker', 1, 10);

  -- Create Quiz: Mark Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Mark Quiz', 'Test your knowledge of Mark Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Mark''s main emphasis about Jesus?', 'Jesus as a teacher', 'Jesus as the suffering servant and Son of God', 'Jesus as a miracle worker only', 'Jesus as a prophet only', 1, 1),
  (new_quiz_id, 'What did Mark emphasize about Jesus'' actions?', 'His teachings only', 'His deeds and miracles', 'His parables only', 'His prophecies only', 1, 2),
  (new_quiz_id, 'What was the main theme of Mark''s Gospel?', 'Jesus as King', 'Jesus as the suffering servant who came to serve', 'Jesus as a teacher', 'Jesus as a prophet', 1, 3),
  (new_quiz_id, 'What did Mark record about Jesus'' ministry?', 'Only his teachings', 'His rapid ministry with many miracles', 'Only his parables', 'Only his prophecies', 1, 4),
  (new_quiz_id, 'What did Mark emphasize about Jesus'' identity?', 'He was just a teacher', 'He was the Son of God', 'He was just a prophet', 'He was just a miracle worker', 1, 5),
  (new_quiz_id, 'What did Mark record about Jesus'' disciples?', 'They were perfect', 'They often misunderstood Jesus', 'They were always right', 'They never failed', 1, 6),
  (new_quiz_id, 'What did Mark emphasize about Jesus'' death?', 'It was accidental', 'It was the central purpose of his mission', 'It was avoidable', 'It was unexpected', 1, 7),
  (new_quiz_id, 'What did Mark record about Jesus'' resurrection?', 'It didn''t happen', 'He rose from the dead and appeared to his disciples', 'He stayed dead', 'It was a myth', 1, 8),
  (new_quiz_id, 'What did Mark emphasize about Jesus'' authority?', 'He had no authority', 'He had authority over demons, disease, and death', 'He had limited authority', 'He had authority only over Jews', 1, 9),
  (new_quiz_id, 'What was Mark''s message about Jesus?', 'He was just a teacher', 'He was the Son of God who came to serve and give his life', 'He was just a prophet', 'He was just a miracle worker', 1, 10);

  -- Create Quiz: Luke Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Luke Quiz', 'Test your knowledge of Luke Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was Luke''s profession?', 'Fisherman', 'Physician', 'Tax collector', 'Scribe', 1, 1),
  (new_quiz_id, 'What did Luke emphasize about Jesus?', 'Jesus as a teacher only', 'Jesus as the Savior of all people, including Gentiles', 'Jesus as a miracle worker only', 'Jesus as a prophet only', 1, 2),
  (new_quiz_id, 'What was the main theme of Luke''s Gospel?', 'Jesus as King', 'Jesus as the universal Savior', 'Jesus as a teacher', 'Jesus as a prophet', 1, 3),
  (new_quiz_id, 'What did Luke record about Jesus'' birth?', 'He was born in Nazareth', 'He was born in Bethlehem and visited by shepherds', 'He was born in Jerusalem', 'He was born in Egypt', 1, 4),
  (new_quiz_id, 'What did Luke emphasize about Jesus'' ministry?', 'Only to Jews', 'To all people, including the poor and outcasts', 'Only to the rich', 'Only to the religious', 1, 5),
  (new_quiz_id, 'What did Luke record about Jesus'' parables?', 'Only a few', 'Many parables, including the Good Samaritan and Prodigal Son', 'None', 'Only one', 1, 6),
  (new_quiz_id, 'What did Luke emphasize about Jesus'' compassion?', 'He was harsh', 'He showed compassion to all, especially the marginalized', 'He was indifferent', 'He was selective', 1, 7),
  (new_quiz_id, 'What did Luke record about Jesus'' death and resurrection?', 'He died but didn''t rise', 'He died and rose again, appearing to many', 'He didn''t die', 'He died and stayed dead', 1, 8),
  (new_quiz_id, 'What did Luke emphasize about the Holy Spirit?', 'The Spirit was not important', 'The Spirit was central to Jesus'' ministry and the church', 'The Spirit was limited', 'The Spirit was irrelevant', 1, 9),
  (new_quiz_id, 'What was Luke''s message about Jesus?', 'He was just a teacher', 'He was the Savior of all people who came to seek and save the lost', 'He was just a prophet', 'He was just a miracle worker', 1, 10);

  -- Create Quiz: John Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('John Quiz', 'Test your knowledge of John Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was John''s main emphasis about Jesus?', 'Jesus as a teacher', 'Jesus as the divine Son of God', 'Jesus as a miracle worker only', 'Jesus as a prophet only', 1, 1),
  (new_quiz_id, 'What did John emphasize about Jesus'' identity?', 'He was just a man', 'He was the Word made flesh, the Son of God', 'He was just a prophet', 'He was just a teacher', 1, 2),
  (new_quiz_id, 'What was the main theme of John''s Gospel?', 'Jesus as King', 'Jesus as the divine Son of God who gives eternal life', 'Jesus as a teacher', 'Jesus as a prophet', 1, 3),
  (new_quiz_id, 'What did John record about Jesus'' miracles?', 'Only a few', 'Seven signs that revealed his divinity', 'None', 'Only one', 1, 4),
  (new_quiz_id, 'What did John emphasize about Jesus'' teachings?', 'Only parables', 'Deep spiritual truths about his identity and mission', 'Only practical advice', 'Only prophecies', 1, 5),
  (new_quiz_id, 'What did John record about Jesus'' ''I am'' statements?', 'None', 'Seven ''I am'' statements revealing his divinity', 'Only one', 'Only three', 1, 6),
  (new_quiz_id, 'What did John emphasize about Jesus'' death?', 'It was accidental', 'It was the ultimate act of love and sacrifice', 'It was avoidable', 'It was unexpected', 1, 7),
  (new_quiz_id, 'What did John record about Jesus'' resurrection?', 'It didn''t happen', 'He rose from the dead and appeared to his disciples', 'He stayed dead', 'It was a myth', 1, 8),
  (new_quiz_id, 'What did John emphasize about eternal life?', 'It was not important', 'It was the central gift Jesus came to give', 'It was limited', 'It was irrelevant', 1, 9),
  (new_quiz_id, 'What was John''s message about Jesus?', 'He was just a teacher', 'He was the divine Son of God who came to give eternal life', 'He was just a prophet', 'He was just a miracle worker', 1, 10);

  -- Create Quiz: Acts Quiz - The Birth of the Church
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Acts Quiz - The Birth of the Church', 'Test your knowledge of Acts Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'Who wrote the book of Acts?', 'Peter', 'Paul', 'Luke', 'John', 2, 1),
  (new_quiz_id, 'What happened on the Day of Pentecost?', 'Jesus was crucified', 'The Holy Spirit came upon the disciples', 'Paul was converted', 'The temple was destroyed', 1, 2),
  (new_quiz_id, 'How many people were added to the church on the Day of Pentecost?', 'About 1,000', 'About 2,000', 'About 3,000', 'About 5,000', 2, 3),
  (new_quiz_id, 'What was the name of the first Christian martyr?', 'Peter', 'Paul', 'Stephen', 'James', 2, 4),
  (new_quiz_id, 'Who was the first Gentile to be baptized?', 'Cornelius', 'Lydia', 'The Ethiopian eunuch', 'The Philippian jailer', 0, 5),
  (new_quiz_id, 'What was Paul''s original name?', 'Simon', 'Saul', 'Stephen', 'Silas', 1, 6),
  (new_quiz_id, 'Where was Paul when he was converted?', 'Jerusalem', 'Damascus', 'Antioch', 'Rome', 1, 7),
  (new_quiz_id, 'What was the name of the sorcerer who opposed Paul and Barnabas?', 'Simon Magus', 'Elymas', 'Bar-Jesus', 'Both B and C', 3, 8),
  (new_quiz_id, 'In which city did Paul and Silas sing hymns in prison?', 'Jerusalem', 'Antioch', 'Philippi', 'Corinth', 2, 9),
  (new_quiz_id, 'How did Paul travel to Rome?', 'By land', 'By sea', 'By air', 'He never went to Rome', 1, 10);

  -- Create Quiz: Romans Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Romans Quiz', 'Test your knowledge of Romans Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Romans?', 'The law and works', 'The gospel of God''s righteousness through faith', 'Church organization', 'End times prophecy', 1, 1),
  (new_quiz_id, 'What does Romans 1:16 say about the gospel?', 'It is the power of God for salvation', 'It is just for Jews', 'It is outdated', 'It is confusing', 0, 2),
  (new_quiz_id, 'What does Romans 3:23 say all have done?', 'Loved God', 'Sinned and fall short of God''s glory', 'Kept the law perfectly', 'Been justified', 1, 3),
  (new_quiz_id, 'How was Abraham''s faith credited to him according to Romans 4:3?', 'As righteousness', 'As works', 'As law-keeping', 'As sacrifice', 0, 4),
  (new_quiz_id, 'What does Romans 5:8 say God demonstrates?', 'His power', 'His love for us', 'His justice', 'His mercy', 1, 5),
  (new_quiz_id, 'What does Romans 6:23 say is the wages of sin?', 'Life', 'Death', 'Grace', 'Righteousness', 1, 6),
  (new_quiz_id, 'What does Romans 8:28 say works for the good of those who love God?', 'Some things', 'All things', 'Good things only', 'Righteous things', 1, 7),
  (new_quiz_id, 'What does Romans 10:9 say you must do to be saved?', 'Keep the law', 'Believe in your heart and confess with your mouth', 'Be baptized', 'Do good works', 1, 8),
  (new_quiz_id, 'What does Romans 12:1 say believers should offer to God?', 'Sacrifices', 'Their bodies as living sacrifices', 'Money', 'Time', 1, 9),
  (new_quiz_id, 'What does Romans 16:20 say will happen to Satan?', 'He will be destroyed', 'He will be crushed under your feet', 'He will be bound', 'He will be cast out', 1, 10);

  -- Create Quiz: 1 Corinthians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Corinthians Quiz', 'Test your knowledge of 1 Corinthians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main problem Paul addressed in 1 Corinthians?', 'Financial issues', 'Division and church problems', 'Travel difficulties', 'Language barriers', 1, 1),
  (new_quiz_id, 'What does 1 Corinthians 1:10 say Paul appeals to the Corinthians about?', 'Unity in Christ', 'Financial giving', 'Church leadership', 'Mission work', 0, 2),
  (new_quiz_id, 'What does 1 Corinthians 3:16 say believers are?', 'God''s children', 'God''s temple', 'God''s servants', 'God''s friends', 1, 3),
  (new_quiz_id, 'What does 1 Corinthians 6:19 say believers'' bodies are?', 'Temples of the Holy Spirit', 'Vessels of honor', 'Instruments of righteousness', 'Temples of God', 0, 4),
  (new_quiz_id, 'What does 1 Corinthians 10:13 say God will not let you be tempted beyond?', 'What you can handle', 'What you can bear', 'What you can endure', 'What you can resist', 1, 5),
  (new_quiz_id, 'What does 1 Corinthians 12:4 say there are different kinds of?', 'Gifts', 'Services', 'Works', 'All of the above', 3, 6),
  (new_quiz_id, 'What does 1 Corinthians 13:4 say love is?', 'Patient and kind', 'Jealous and proud', 'Self-seeking and easily angered', 'None of the above', 0, 7),
  (new_quiz_id, 'What does 1 Corinthians 13:13 say the greatest of these is?', 'Faith', 'Hope', 'Love', 'Wisdom', 2, 8),
  (new_quiz_id, 'What does 1 Corinthians 15:55 say death has lost?', 'Its power', 'Its sting', 'Its victory', 'Both B and C', 3, 9),
  (new_quiz_id, 'What does 1 Corinthians 16:14 say everything should be done in?', 'Faith', 'Hope', 'Love', 'Peace', 2, 10);

  -- Create Quiz: 2 Corinthians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Corinthians Quiz', 'Test your knowledge of 2 Corinthians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main theme of 2 Corinthians?', 'Church organization', 'Paul''s defense of his apostolic ministry', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does 2 Corinthians 1:3 say God is?', 'The God of all comfort', 'The God of power', 'The God of justice', 'The God of mercy', 0, 2),
  (new_quiz_id, 'What does 2 Corinthians 3:6 say makes us competent?', 'Our abilities', 'Our education', 'The new covenant of the Spirit', 'Our experience', 2, 3),
  (new_quiz_id, 'What does 2 Corinthians 4:7 say we have this treasure in?', 'Jars of clay', 'Gold vessels', 'Silver containers', 'Bronze pots', 0, 4),
  (new_quiz_id, 'What does 2 Corinthians 5:17 say happens to those in Christ?', 'They become new creations', 'They become perfect', 'They become sinless', 'They become wealthy', 0, 5),
  (new_quiz_id, 'What does 2 Corinthians 6:14 say believers should not be?', 'Unequally yoked with unbelievers', 'Friends with sinners', 'In the world', 'Different from others', 0, 6),
  (new_quiz_id, 'What does 2 Corinthians 8:9 say about Christ''s example?', 'He was rich but became poor', 'He was poor but became rich', 'He stayed the same', 'He became powerful', 0, 7),
  (new_quiz_id, 'What does 2 Corinthians 9:7 say God loves?', 'A cheerful giver', 'A reluctant giver', 'A forced giver', 'A proud giver', 0, 8),
  (new_quiz_id, 'What does 2 Corinthians 12:9 say about God''s grace?', 'It is sufficient', 'It is limited', 'It is conditional', 'It is earned', 0, 9),
  (new_quiz_id, 'What does 2 Corinthians 13:14 mention about the Trinity?', 'The grace of the Lord Jesus Christ', 'The love of God', 'The fellowship of the Holy Spirit', 'All of the above', 3, 10);

  -- Create Quiz: Galatians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Galatians Quiz', 'Test your knowledge of Galatians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What was the main issue Paul addressed in Galatians?', 'Financial problems', 'Justification by faith vs. works of the law', 'Church leadership', 'End times', 1, 1),
  (new_quiz_id, 'What does Galatians 1:8 say about preaching a different gospel?', 'It''s acceptable', 'Let them be under God''s curse', 'It''s fine if sincere', 'It''s just a mistake', 1, 2),
  (new_quiz_id, 'What does Galatians 2:16 say we are justified by?', 'Works of the law', 'Faith in Jesus Christ', 'Good deeds', 'Circumcision', 1, 3),
  (new_quiz_id, 'What does Galatians 3:28 say about believers in Christ?', 'They are all different', 'There is neither Jew nor Gentile, slave nor free, male nor female', 'They must follow the law', 'They are superior to others', 1, 4),
  (new_quiz_id, 'What does Galatians 4:4 say God sent?', 'His Son, born of a woman', 'An angel', 'A prophet', 'A teacher', 0, 5),
  (new_quiz_id, 'What does Galatians 5:1 say Christ has set us free for?', 'Freedom', 'Slavery', 'The law', 'Works', 0, 6),
  (new_quiz_id, 'What does Galatians 5:22-23 list as the fruit of the Spirit?', 'Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control', 'Power, wealth, fame, success', 'Anger, jealousy, pride, greed', 'Fear, doubt, worry, anxiety', 0, 7),
  (new_quiz_id, 'What does Galatians 6:2 say believers should do?', 'Carry each other''s burdens', 'Ignore others'' problems', 'Judge each other', 'Compete with each other', 0, 8),
  (new_quiz_id, 'What does Galatians 6:7 say about what we reap?', 'Whatever we sow', 'Whatever we want', 'Whatever we pray for', 'Whatever we deserve', 0, 9),
  (new_quiz_id, 'What does Galatians 6:14 say Paul boasts in?', 'His achievements', 'The cross of our Lord Jesus Christ', 'His knowledge', 'His power', 1, 10);

  -- Create Quiz: Ephesians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Ephesians Quiz', 'Test your knowledge of Ephesians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Ephesians?', 'Church organization', 'The church as Christ''s body and spiritual warfare', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does Ephesians 1:3 say God has blessed us with?', 'Every spiritual blessing in Christ', 'Material wealth', 'Perfect health', 'Worldly success', 0, 2),
  (new_quiz_id, 'What does Ephesians 2:8 say we are saved by?', 'Works', 'Grace through faith', 'The law', 'Our efforts', 1, 3),
  (new_quiz_id, 'What does Ephesians 3:20 say God is able to do?', 'Immeasurably more than all we ask or imagine', 'Only what we ask', 'Less than we need', 'Only what we deserve', 0, 4),
  (new_quiz_id, 'What does Ephesians 4:11 say God gave to the church?', 'Apostles, prophets, evangelists, pastors and teachers', 'Only pastors', 'Only apostles', 'Only prophets', 0, 5),
  (new_quiz_id, 'What does Ephesians 5:25 say husbands should do?', 'Love their wives as Christ loved the church', 'Rule over their wives', 'Ignore their wives', 'Control their wives', 0, 6),
  (new_quiz_id, 'What does Ephesians 6:10 say believers should be strong in?', 'The Lord and in his mighty power', 'Their own strength', 'Their wealth', 'Their knowledge', 0, 7),
  (new_quiz_id, 'What does Ephesians 6:12 say our struggle is not against?', 'Flesh and blood', 'The devil', 'Demons', 'Evil spirits', 0, 8),
  (new_quiz_id, 'What does Ephesians 6:17 say the sword of the Spirit is?', 'The word of God', 'Physical weapons', 'Human wisdom', 'Church authority', 0, 9),
  (new_quiz_id, 'What does Ephesians 6:18 say believers should do?', 'Pray in the Spirit on all occasions', 'Only pray when needed', 'Pray only for themselves', 'Pray only in church', 0, 10);

  -- Create Quiz: Philippians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Philippians Quiz', 'Test your knowledge of Philippians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Philippians?', 'Church organization', 'Joy in Christ and Christian living', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does Philippians 1:6 say God will do?', 'Carry it on to completion until the day of Christ Jesus', 'Abandon us', 'Test us beyond our limits', 'Leave us alone', 0, 2),
  (new_quiz_id, 'What does Philippians 2:5 say believers should have?', 'The same mindset as Christ Jesus', 'Their own mindset', 'A worldly mindset', 'A selfish mindset', 0, 3),
  (new_quiz_id, 'What does Philippians 2:7 say Christ did?', 'Made himself nothing, taking the form of a servant', 'Came in glory', 'Ruled as king', 'Stayed in heaven', 0, 4),
  (new_quiz_id, 'What does Philippians 3:8 say Paul considers everything else?', 'Loss for the sake of Christ', 'Gain', 'Important', 'Valuable', 0, 5),
  (new_quiz_id, 'What does Philippians 3:14 say Paul presses on toward?', 'The goal to win the prize', 'Worldly success', 'Personal achievement', 'Material wealth', 0, 6),
  (new_quiz_id, 'What does Philippians 4:4 say believers should do?', 'Rejoice in the Lord always', 'Worry about everything', 'Complain constantly', 'Be anxious', 0, 7),
  (new_quiz_id, 'What does Philippians 4:6 say believers should not be?', 'Anxious about anything', 'Joyful', 'Peaceful', 'Content', 0, 8),
  (new_quiz_id, 'What does Philippians 4:7 say God''s peace will do?', 'Guard your hearts and minds in Christ Jesus', 'Leave you alone', 'Make you worry more', 'Cause anxiety', 0, 9),
  (new_quiz_id, 'What does Philippians 4:13 say Paul can do?', 'Do all things through Christ who strengthens him', 'Do nothing', 'Do only easy things', 'Do only what he wants', 0, 10);

  -- Create Quiz: Colossians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Colossians Quiz', 'Test your knowledge of Colossians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Colossians?', 'Church organization', 'The supremacy of Christ and Christian living', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does Colossians 1:15 say Christ is?', 'The image of the invisible God', 'Just a man', 'An angel', 'A prophet', 0, 2),
  (new_quiz_id, 'What does Colossians 1:16 say all things were created?', 'Through him and for him', 'By chance', 'By evolution', 'By other gods', 0, 3),
  (new_quiz_id, 'What does Colossians 2:9 say dwells in Christ?', 'All the fullness of the Deity', 'Partial divinity', 'Human nature only', 'Nothing special', 0, 4),
  (new_quiz_id, 'What does Colossians 3:1 say believers should set their hearts on?', 'Things above, where Christ is', 'Earthly things', 'Material wealth', 'Worldly success', 0, 5),
  (new_quiz_id, 'What does Colossians 3:12 say believers should clothe themselves with?', 'Compassion, kindness, humility, gentleness and patience', 'Expensive clothes', 'Worldly fashion', 'Nothing special', 0, 6),
  (new_quiz_id, 'What does Colossians 3:13 say believers should do?', 'Forgive as the Lord forgave you', 'Hold grudges', 'Seek revenge', 'Ignore others', 0, 7),
  (new_quiz_id, 'What does Colossians 3:16 say the word of Christ should dwell in believers?', 'Richly', 'Poorly', 'Occasionally', 'Never', 0, 8),
  (new_quiz_id, 'What does Colossians 3:23 say believers should work at?', 'Whatever you do, work at it with all your heart', 'Only what you want', 'Only when you feel like it', 'Only for yourself', 0, 9),
  (new_quiz_id, 'What does Colossians 4:6 say believers'' conversation should be?', 'Always full of grace, seasoned with salt', 'Harsh and critical', 'Boring and dull', 'Self-centered', 0, 10);

  -- Create Quiz: 1 Thessalonians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Thessalonians Quiz', 'Test your knowledge of 1 Thessalonians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 1 Thessalonians?', 'Church organization', 'The Lord''s return and Christian living', 'Financial giving', 'End times only', 1, 1),
  (new_quiz_id, 'What does 1 Thessalonians 1:3 say Paul remembers about the Thessalonians?', 'Their work produced by faith, labor prompted by love, and endurance inspired by hope', 'Their wealth', 'Their power', 'Their knowledge', 0, 2),
  (new_quiz_id, 'What does 1 Thessalonians 2:4 say God entrusted Paul with?', 'The gospel', 'Money', 'Power', 'Authority', 0, 3),
  (new_quiz_id, 'What does 1 Thessalonians 3:12 say the Lord should make the Thessalonians'' love?', 'Increase and overflow for each other and for everyone else', 'Decrease', 'Stay the same', 'Be selective', 0, 4),
  (new_quiz_id, 'What does 1 Thessalonians 4:3 say God''s will is?', 'That you should be sanctified', 'That you should be wealthy', 'That you should be powerful', 'That you should be famous', 0, 5),
  (new_quiz_id, 'What does 1 Thessalonians 4:16 say will happen when the Lord comes?', 'The Lord himself will come down from heaven with a loud command', 'Nothing special', 'Only some will notice', 'It will be silent', 0, 6),
  (new_quiz_id, 'What does 1 Thessalonians 5:2 say about the day of the Lord?', 'It will come like a thief in the night', 'It will be announced', 'It will be gradual', 'It will be obvious', 0, 7),
  (new_quiz_id, 'What does 1 Thessalonians 5:16 say believers should do?', 'Rejoice always', 'Worry constantly', 'Complain often', 'Be anxious', 0, 8),
  (new_quiz_id, 'What does 1 Thessalonians 5:17 say believers should do?', 'Pray continually', 'Pray only when needed', 'Pray only in church', 'Pray only for themselves', 0, 9),
  (new_quiz_id, 'What does 1 Thessalonians 5:18 say believers should do in all circumstances?', 'Give thanks', 'Complain', 'Worry', 'Be anxious', 0, 10);

  -- Create Quiz: 2 Thessalonians Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Thessalonians Quiz', 'Test your knowledge of 2 Thessalonians Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 2 Thessalonians?', 'Church organization', 'The day of the Lord and Christian discipline', 'Financial giving', 'Personal success', 1, 1),
  (new_quiz_id, 'What does 2 Thessalonians 1:3 say Paul thanks God for about the Thessalonians?', 'Their faith is growing more and more, and their love for one another is increasing', 'Their wealth', 'Their power', 'Their knowledge', 0, 2),
  (new_quiz_id, 'What does 2 Thessalonians 2:3 say must happen before the day of the Lord?', 'The rebellion occurs and the man of lawlessness is revealed', 'Nothing special', 'Only good things', 'Peace on earth', 0, 3),
  (new_quiz_id, 'What does 2 Thessalonians 2:4 say the man of lawlessness will do?', 'Exalt himself over everything that is called God', 'Serve God', 'Help others', 'Be humble', 0, 4),
  (new_quiz_id, 'What does 2 Thessalonians 2:8 say will happen to the lawless one?', 'The Lord Jesus will overthrow him with the breath of his mouth', 'He will rule forever', 'He will be ignored', 'He will be accepted', 0, 5),
  (new_quiz_id, 'What does 2 Thessalonians 3:6 say believers should keep away from?', 'Every brother or sister who is idle and disruptive', 'All unbelievers', 'Everyone', 'No one', 0, 6),
  (new_quiz_id, 'What does 2 Thessalonians 3:10 say about those who don''t work?', 'They should not eat', 'They should be fed anyway', 'They should be supported', 'They should be helped', 0, 7),
  (new_quiz_id, 'What does 2 Thessalonians 3:13 say believers should not become?', 'Weary in doing good', 'Too busy', 'Too successful', 'Too happy', 0, 8),
  (new_quiz_id, 'What does 2 Thessalonians 3:16 say the Lord of peace will give?', 'Peace at all times and in every way', 'Wealth', 'Power', 'Fame', 0, 9),
  (new_quiz_id, 'What does 2 Thessalonians 3:18 say Paul''s closing wish is?', 'The grace of our Lord Jesus Christ be with you all', 'Peace and prosperity', 'Health and wealth', 'Success and fame', 0, 10);

  -- Create Quiz: 1 Timothy Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Timothy Quiz', 'Test your knowledge of 1 Timothy Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 1 Timothy?', 'Church organization and pastoral leadership', 'End times prophecy', 'Financial giving', 'Personal success', 0, 1),
  (new_quiz_id, 'What does 1 Timothy 1:15 say is a trustworthy saying?', 'Christ Jesus came into the world to save sinners', 'Money is everything', 'Power is important', 'Success is key', 0, 2),
  (new_quiz_id, 'What does 1 Timothy 2:5 say there is one of?', 'One God and one mediator between God and mankind, the man Christ Jesus', 'Many gods', 'No God', 'Many mediators', 0, 3),
  (new_quiz_id, 'What does 1 Timothy 3:2 say an overseer must be?', 'Above reproach, faithful to his wife, temperate, self-controlled, respectable', 'Wealthy', 'Powerful', 'Famous', 0, 4),
  (new_quiz_id, 'What does 1 Timothy 4:12 say Timothy should not let anyone look down on him because he is?', 'Young', 'Old', 'Poor', 'Unknown', 0, 5),
  (new_quiz_id, 'What does 1 Timothy 4:16 say Timothy should watch?', 'His life and doctrine closely', 'His wealth', 'His power', 'His fame', 0, 6),
  (new_quiz_id, 'What does 1 Timothy 5:8 say about those who don''t provide for relatives?', 'They have denied the faith and are worse than unbelievers', 'They are fine', 'They are blessed', 'They are successful', 0, 7),
  (new_quiz_id, 'What does 1 Timothy 6:6 say godliness with contentment is?', 'Great gain', 'Nothing special', 'A burden', 'Unnecessary', 0, 8),
  (new_quiz_id, 'What does 1 Timothy 6:10 say is a root of all kinds of evil?', 'The love of money', 'Poverty', 'Hard work', 'Generosity', 0, 9),
  (new_quiz_id, 'What does 1 Timothy 6:12 say Timothy should fight?', 'The good fight of the faith', 'Other people', 'The government', 'His enemies', 0, 10);

  -- Create Quiz: 2 Timothy Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Timothy Quiz', 'Test your knowledge of 2 Timothy Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 2 Timothy?', 'Paul''s final words and encouragement to Timothy', 'Church organization', 'Financial giving', 'End times only', 0, 1),
  (new_quiz_id, 'What does 2 Timothy 1:7 say God has not given us?', 'A spirit of fear, but of power, love and self-discipline', 'Any gifts', 'Any abilities', 'Any hope', 0, 2),
  (new_quiz_id, 'What does 2 Timothy 2:15 say Timothy should do?', 'Do your best to present yourself to God as one approved', 'Do nothing', 'Do only what''s easy', 'Do only what he wants', 0, 3),
  (new_quiz_id, 'What does 2 Timothy 3:16 say all Scripture is?', 'God-breathed and useful for teaching, rebuking, correcting and training in righteousness', 'Just stories', 'Outdated', 'Unimportant', 0, 4),
  (new_quiz_id, 'What does 2 Timothy 4:2 say Timothy should do?', 'Preach the word; be prepared in season and out of season', 'Stay quiet', 'Only preach when convenient', 'Only preach to friends', 0, 5),
  (new_quiz_id, 'What does 2 Timothy 4:3 say people will do?', 'Gather around them teachers to say what their itching ears want to hear', 'Listen to truth', 'Seek God', 'Follow Christ', 0, 6),
  (new_quiz_id, 'What does 2 Timothy 4:7 say Paul has done?', 'Fought the good fight, finished the race, kept the faith', 'Nothing', 'Failed', 'Given up', 0, 7),
  (new_quiz_id, 'What does 2 Timothy 4:8 say awaits Paul?', 'The crown of righteousness', 'Nothing', 'Punishment', 'Failure', 0, 8),
  (new_quiz_id, 'What does 2 Timothy 4:16 say happened when Paul was first put on trial?', 'Everyone deserted him', 'Everyone supported him', 'Everyone helped him', 'Everyone praised him', 0, 9),
  (new_quiz_id, 'What does 2 Timothy 4:17 say stood at Paul''s side?', 'The Lord stood at his side and gave him strength', 'No one', 'His friends', 'His enemies', 0, 10);

  -- Create Quiz: Titus Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Titus Quiz', 'Test your knowledge of Titus Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Titus?', 'Church organization and qualifications for leaders', 'End times prophecy', 'Financial giving', 'Personal success', 0, 1),
  (new_quiz_id, 'What does Titus 1:5 say Paul left Titus in Crete to do?', 'Put in order what was left unfinished and appoint elders', 'Take a vacation', 'Start a business', 'Build a house', 0, 2),
  (new_quiz_id, 'What does Titus 1:9 say an elder must do?', 'Hold firmly to the trustworthy message as taught', 'Be wealthy', 'Be powerful', 'Be famous', 0, 3),
  (new_quiz_id, 'What does Titus 2:7 say Titus should show himself to be?', 'An example by doing what is good', 'Better than others', 'Wealthy', 'Powerful', 0, 4),
  (new_quiz_id, 'What does Titus 2:11 say has appeared?', 'The grace of God that offers salvation to all people', 'Nothing special', 'Only judgment', 'Only punishment', 0, 5),
  (new_quiz_id, 'What does Titus 2:12 say grace teaches us to do?', 'Say ''No'' to ungodliness and worldly passions, and to live self-controlled, upright and godly lives', 'Do whatever we want', 'Follow our desires', 'Ignore God', 0, 6),
  (new_quiz_id, 'What does Titus 3:3 say we were at one time?', 'Foolish, disobedient, deceived and enslaved by all kinds of passions and pleasures', 'Perfect', 'Sinless', 'Righteous', 0, 7),
  (new_quiz_id, 'What does Titus 3:4 say appeared?', 'The kindness and love of God our Savior', 'Nothing', 'Only judgment', 'Only punishment', 0, 8),
  (new_quiz_id, 'What does Titus 3:5 say God saved us through?', 'The washing of rebirth and renewal by the Holy Spirit', 'Our good works', 'Our efforts', 'Our wisdom', 0, 9),
  (new_quiz_id, 'What does Titus 3:8 say believers should be careful to do?', 'Devote themselves to doing what is good', 'Do nothing', 'Do only what''s easy', 'Do only what they want', 0, 10);

  -- Create Quiz: Philemon Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Philemon Quiz', 'Test your knowledge of Philemon Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Philemon?', 'A personal appeal for forgiveness and Christian brotherhood', 'Church organization', 'End times prophecy', 'Financial giving', 0, 1),
  (new_quiz_id, 'What does Philemon 1:3 say Paul''s greeting includes?', 'Grace and peace from God our Father and the Lord Jesus Christ', 'Money and power', 'Success and fame', 'Health and wealth', 0, 2),
  (new_quiz_id, 'What does Philemon 1:4 say Paul always does?', 'Thanks God for Philemon in his prayers', 'Asks for money', 'Complains', 'Worries', 0, 3),
  (new_quiz_id, 'What does Philemon 1:6 say Paul prays for?', 'That Philemon''s partnership in the faith may become effective', 'That Philemon becomes wealthy', 'That Philemon becomes powerful', 'That Philemon becomes famous', 0, 4),
  (new_quiz_id, 'What does Philemon 1:7 say Paul has great joy and encouragement from?', 'Philemon''s love, because the hearts of the saints have been refreshed', 'Philemon''s wealth', 'Philemon''s power', 'Philemon''s fame', 0, 5),
  (new_quiz_id, 'What does Philemon 1:9 say Paul appeals to Philemon as?', 'An old man and now also a prisoner of Christ Jesus', 'A young man', 'A wealthy man', 'A powerful man', 0, 6),
  (new_quiz_id, 'What does Philemon 1:10 say Paul has a son?', 'Whose father he became while in chains', 'Who is perfect', 'Who is wealthy', 'Who is powerful', 0, 7),
  (new_quiz_id, 'What does Philemon 1:15 say perhaps Onesimus was separated for?', 'A little while so that Philemon might have him back forever', 'No reason', 'Punishment', 'Failure', 0, 8),
  (new_quiz_id, 'What does Philemon 1:16 say Onesimus should be?', 'No longer as a slave, but better than a slave, as a dear brother', 'Treated as a slave', 'Punished', 'Rejected', 0, 9),
  (new_quiz_id, 'What does Philemon 1:20 say Paul wants from Philemon?', 'Some benefit from Philemon in the Lord', 'Money', 'Power', 'Fame', 0, 10);

  -- Create Quiz: Hebrews Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Hebrews Quiz', 'Test your knowledge of Hebrews Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Hebrews?', 'Church organization', 'The superiority of Christ and the new covenant', 'Financial giving', 'End times only', 1, 1),
  (new_quiz_id, 'What does Hebrews 1:3 say the Son is?', 'The radiance of God''s glory and the exact representation of his being', 'Just a man', 'An angel', 'A prophet', 0, 2),
  (new_quiz_id, 'What does Hebrews 2:14 say Christ shared in?', 'Our humanity so that by his death he might break the power of him who holds the power of death', 'Our wealth', 'Our power', 'Our fame', 0, 3),
  (new_quiz_id, 'What does Hebrews 4:12 say the word of God is?', 'Sharper than any double-edged sword', 'Dull and useless', 'Just stories', 'Outdated', 0, 4),
  (new_quiz_id, 'What does Hebrews 4:15 say our high priest is?', 'One who is able to empathize with our weaknesses', 'One who cannot understand us', 'One who is distant', 'One who is harsh', 0, 5),
  (new_quiz_id, 'What does Hebrews 6:19 say hope is?', 'An anchor for the soul, firm and secure', 'Unreliable', 'Useless', 'Unnecessary', 0, 6),
  (new_quiz_id, 'What does Hebrews 7:25 say Jesus is able to do?', 'Save completely those who come to God through him', 'Save only some', 'Save only the perfect', 'Save only the wealthy', 0, 7),
  (new_quiz_id, 'What does Hebrews 9:27 say is destined for everyone?', 'To die once, and after that to face judgment', 'To live forever', 'To be reincarnated', 'To disappear', 0, 8),
  (new_quiz_id, 'What does Hebrews 11:1 say faith is?', 'Confidence in what we hope for and assurance about what we do not see', 'Just feelings', 'Just thoughts', 'Just wishes', 0, 9),
  (new_quiz_id, 'What does Hebrews 12:2 say we should fix our eyes on?', 'Jesus, the pioneer and perfecter of faith', 'Our problems', 'Our wealth', 'Our success', 0, 10);

  -- Create Quiz: James Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('James Quiz', 'Test your knowledge of James Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of James?', 'Church organization', 'Faith and works, practical Christian living', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does James 1:2 say believers should consider?', 'It pure joy whenever you face trials of many kinds', 'Trials as punishment', 'Trials as failure', 'Trials as unfair', 0, 2),
  (new_quiz_id, 'What does James 1:5 say God gives to those who ask?', 'Wisdom generously to all without finding fault', 'Money', 'Power', 'Fame', 0, 3),
  (new_quiz_id, 'What does James 1:22 say believers should be?', 'Doers of the word, and not merely hearers', 'Only hearers', 'Only talkers', 'Only thinkers', 0, 4),
  (new_quiz_id, 'What does James 2:17 say faith without works is?', 'Dead', 'Perfect', 'Enough', 'Sufficient', 0, 5),
  (new_quiz_id, 'What does James 3:2 say about those who never stumble?', 'They are perfect, able to keep their whole body in check', 'They are weak', 'They are average', 'They are normal', 0, 6),
  (new_quiz_id, 'What does James 3:8 say no human being can tame?', 'The tongue', 'The mind', 'The heart', 'The body', 0, 7),
  (new_quiz_id, 'What does James 4:7 say believers should do?', 'Submit yourselves, then, to God. Resist the devil, and he will flee from you', 'Fight the devil', 'Ignore the devil', 'Make friends with the devil', 0, 8),
  (new_quiz_id, 'What does James 5:16 say the prayer of a righteous person is?', 'Powerful and effective', 'Useless', 'Weak', 'Unnecessary', 0, 9),
  (new_quiz_id, 'What does James 5:19-20 say about bringing back a sinner?', 'Whoever turns a sinner from the error of their way will save them from death', 'It''s not worth it', 'It''s impossible', 'It''s dangerous', 0, 10);

  -- Create Quiz: 1 Peter Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 Peter Quiz', 'Test your knowledge of 1 Peter Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 1 Peter?', 'Church organization', 'Suffering and hope, living as exiles in the world', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does 1 Peter 1:3 say God has given us?', 'New birth into a living hope through the resurrection of Jesus Christ', 'Wealth', 'Power', 'Fame', 0, 2),
  (new_quiz_id, 'What does 1 Peter 1:8 say about those who believe in Christ?', 'Though you have not seen him, you love him; and even though you do not see him now, you believe in him', 'They are foolish', 'They are weak', 'They are naive', 0, 3),
  (new_quiz_id, 'What does 1 Peter 2:9 say believers are?', 'A chosen people, a royal priesthood, a holy nation, God''s special possession', 'Ordinary people', 'Better than others', 'Superior to unbelievers', 0, 4),
  (new_quiz_id, 'What does 1 Peter 2:21 say Christ suffered for?', 'Leaving you an example, that you should follow in his steps', 'Nothing', 'His own mistakes', 'His own sins', 0, 5),
  (new_quiz_id, 'What does 1 Peter 3:15 say believers should always be prepared to do?', 'Give an answer to everyone who asks you to give the reason for the hope that you have', 'Stay silent', 'Avoid questions', 'Change the subject', 0, 6),
  (new_quiz_id, 'What does 1 Peter 4:8 say love does?', 'Covers over a multitude of sins', 'Nothing', 'Makes things worse', 'Causes problems', 0, 7),
  (new_quiz_id, 'What does 1 Peter 5:7 say believers should do with their anxiety?', 'Cast all your anxiety on him because he cares for you', 'Keep it to yourself', 'Worry more', 'Ignore it', 0, 8),
  (new_quiz_id, 'What does 1 Peter 5:8 say believers should be alert for?', 'Your enemy the devil prowls around like a roaring lion looking for someone to devour', 'Opportunities', 'Success', 'Wealth', 0, 9),
  (new_quiz_id, 'What does 1 Peter 5:10 say the God of all grace will do?', 'After you have suffered a little while, will himself restore you and make you strong', 'Abandon you', 'Punish you', 'Ignore you', 0, 10);

  -- Create Quiz: 2 Peter Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 Peter Quiz', 'Test your knowledge of 2 Peter Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 2 Peter?', 'Church organization', 'False teachers and the day of the Lord', 'Financial giving', 'Personal success', 1, 1),
  (new_quiz_id, 'What does 2 Peter 1:3 say God''s divine power has given us?', 'Everything we need for a godly life through our knowledge of him', 'Wealth', 'Power', 'Fame', 0, 2),
  (new_quiz_id, 'What does 2 Peter 1:4 say God has given us?', 'His very great and precious promises, so that through them you may participate in the divine nature', 'Nothing special', 'Only problems', 'Only challenges', 0, 3),
  (new_quiz_id, 'What does 2 Peter 1:21 say about prophecy?', 'Prophecy never had its origin in the human will, but prophets, though human, spoke from God', 'It''s just human ideas', 'It''s unreliable', 'It''s outdated', 0, 4),
  (new_quiz_id, 'What does 2 Peter 2:1 say will arise among the people?', 'False prophets and false teachers', 'True prophets', 'Good teachers', 'Perfect leaders', 0, 5),
  (new_quiz_id, 'What does 2 Peter 3:8 say about time with the Lord?', 'A day is like a thousand years, and a thousand years are like a day', 'Time doesn''t matter', 'Time is everything', 'Time is meaningless', 0, 6),
  (new_quiz_id, 'What does 2 Peter 3:9 say the Lord is not slow about?', 'His promise, as some understand slowness. Instead he is patient with you', 'His judgment', 'His punishment', 'His discipline', 0, 7),
  (new_quiz_id, 'What does 2 Peter 3:10 say will happen to the heavens?', 'They will disappear with a roar; the elements will be destroyed by fire', 'They will stay the same', 'They will get better', 'They will expand', 0, 8),
  (new_quiz_id, 'What does 2 Peter 3:13 say we are looking forward to?', 'A new heaven and a new earth, where righteousness dwells', 'Nothing', 'The same old thing', 'More problems', 0, 9),
  (new_quiz_id, 'What does 2 Peter 3:18 say believers should grow in?', 'The grace and knowledge of our Lord and Savior Jesus Christ', 'Wealth', 'Power', 'Fame', 0, 10);

  -- Create Quiz: 1 John Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('1 John Quiz', 'Test your knowledge of 1 John Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 1 John?', 'Church organization', 'Love, fellowship, and walking in the light', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does 1 John 1:5 say God is?', 'Light; in him there is no darkness at all', 'Darkness', 'Confusion', 'Mystery', 0, 2),
  (new_quiz_id, 'What does 1 John 1:9 say God will do if we confess our sins?', 'He is faithful and just and will forgive us our sins and purify us from all unrighteousness', 'Nothing', 'Punish us', 'Ignore us', 0, 3),
  (new_quiz_id, 'What does 1 John 2:15 say believers should not love?', 'The world or anything in the world', 'God', 'Others', 'Themselves', 0, 4),
  (new_quiz_id, 'What does 1 John 3:16 say we know love by?', 'This: Jesus Christ laid down his life for us', 'Our feelings', 'Our thoughts', 'Our desires', 0, 5),
  (new_quiz_id, 'What does 1 John 4:8 say God is?', 'Love', 'Hate', 'Anger', 'Fear', 0, 6),
  (new_quiz_id, 'What does 1 John 4:18 say perfect love does?', 'Drives out fear', 'Causes fear', 'Creates fear', 'Increases fear', 0, 7),
  (new_quiz_id, 'What does 1 John 5:3 say God''s commands are?', 'Not burdensome', 'Too hard', 'Impossible', 'Unfair', 0, 8),
  (new_quiz_id, 'What does 1 John 5:14 say about asking according to God''s will?', 'He hears us', 'He ignores us', 'He punishes us', 'He abandons us', 0, 9),
  (new_quiz_id, 'What does 1 John 5:21 say believers should keep themselves from?', 'Idols', 'God', 'Prayer', 'Good works', 0, 10);

  -- Create Quiz: 2 John Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('2 John Quiz', 'Test your knowledge of 2 John Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 2 John?', 'Church organization', 'Walking in truth and love, warning against false teachers', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does 2 John 1:3 say grace, mercy and peace will be with us?', 'From God the Father and from Jesus Christ, the Father''s Son', 'From nowhere', 'From ourselves', 'From others', 0, 2),
  (new_quiz_id, 'What does 2 John 1:4 say John has found?', 'Some of your children are walking in the truth', 'Nothing good', 'Only problems', 'Only failures', 0, 3),
  (new_quiz_id, 'What does 2 John 1:6 say love is?', 'Walking in obedience to his commands', 'Just feelings', 'Just thoughts', 'Just words', 0, 4),
  (new_quiz_id, 'What does 2 John 1:7 say has gone out into the world?', 'Many deceivers, who do not acknowledge Jesus Christ as coming in the flesh', 'True prophets', 'Good teachers', 'Perfect leaders', 0, 5),
  (new_quiz_id, 'What does 2 John 1:8 say believers should watch out for?', 'That you do not lose what we have worked for', 'Nothing', 'Everything', 'Everyone', 0, 6),
  (new_quiz_id, 'What does 2 John 1:9 say about those who run ahead?', 'Anyone who runs ahead and does not continue in the teaching of Christ does not have God', 'They are blessed', 'They are wise', 'They are right', 0, 7),
  (new_quiz_id, 'What does 2 John 1:10 say believers should not do with false teachers?', 'Take them into your house or welcome them', 'Pray for them', 'Love them', 'Help them', 0, 8),
  (new_quiz_id, 'What does 2 John 1:11 say about welcoming a false teacher?', 'Anyone who welcomes them shares in their wicked work', 'It''s fine', 'It''s helpful', 'It''s good', 0, 9),
  (new_quiz_id, 'What does 2 John 1:12 say John hopes to do?', 'Visit you and talk with you face to face', 'Avoid you', 'Ignore you', 'Forget you', 0, 10);

  -- Create Quiz: 3 John Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('3 John Quiz', 'Test your knowledge of 3 John Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of 3 John?', 'Church organization', 'Hospitality and support for traveling teachers', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does 3 John 1:2 say John prays for Gaius?', 'That you may enjoy good health and that all may go well with you', 'That you become wealthy', 'That you become powerful', 'That you become famous', 0, 2),
  (new_quiz_id, 'What does 3 John 1:3 say John was told about Gaius?', 'That you are faithful to the truth and are walking in the truth', 'That you are unfaithful', 'That you are lost', 'That you are confused', 0, 3),
  (new_quiz_id, 'What does 3 John 1:4 say gives John no greater joy?', 'To hear that my children are walking in the truth', 'To hear about wealth', 'To hear about power', 'To hear about fame', 0, 4),
  (new_quiz_id, 'What does 3 John 1:5 say Gaius is faithful in?', 'What you are doing for the brothers and sisters, even though they are strangers to you', 'Nothing', 'Only for friends', 'Only for family', 0, 5),
  (new_quiz_id, 'What does 3 John 1:6 say these people have told the church about?', 'Your love', 'Your wealth', 'Your power', 'Your fame', 0, 6),
  (new_quiz_id, 'What does 3 John 1:7 say these people went out for?', 'The sake of the Name, receiving no help from the pagans', 'Money', 'Power', 'Fame', 0, 7),
  (new_quiz_id, 'What does 3 John 1:8 say believers should support?', 'Such people so that we may be fellow workers for the truth', 'Only themselves', 'Only their friends', 'Only their family', 0, 8),
  (new_quiz_id, 'What does 3 John 1:9 say Diotrephes likes to do?', 'Be first among them', 'Serve others', 'Help others', 'Love others', 0, 9),
  (new_quiz_id, 'What does 3 John 1:11 say believers should not imitate?', 'What is evil', 'What is good', 'What is right', 'What is true', 0, 10);

  -- Create Quiz: Jude Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Jude Quiz', 'Test your knowledge of Jude Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Jude?', 'Church organization', 'Contending for the faith against false teachers', 'End times prophecy', 'Financial giving', 1, 1),
  (new_quiz_id, 'What does Jude 1:3 say Jude was compelled to write about?', 'The salvation we share, urging you to contend for the faith', 'Money', 'Power', 'Fame', 0, 2),
  (new_quiz_id, 'What does Jude 1:4 say certain individuals have secretly slipped in among you?', 'Ungodly people, who pervert the grace of our God into a license for immorality', 'Good people', 'Perfect people', 'Righteous people', 0, 3),
  (new_quiz_id, 'What does Jude 1:6 say about angels who did not keep their positions of authority?', 'He has kept in darkness, bound with everlasting chains for judgment on the great Day', 'He has blessed them', 'He has rewarded them', 'He has promoted them', 0, 4),
  (new_quiz_id, 'What does Jude 1:9 say the archangel Michael did?', 'When he was disputing with the devil about the body of Moses, he did not dare to bring a slanderous accusation against him', 'He fought the devil', 'He ignored the devil', 'He made friends with the devil', 0, 5),
  (new_quiz_id, 'What does Jude 1:14 say Enoch prophesied about?', 'The Lord is coming with thousands upon thousands of his holy ones', 'Peace on earth', 'Good times ahead', 'Nothing special', 0, 6),
  (new_quiz_id, 'What does Jude 1:20 say believers should do?', 'Build yourselves up in your most holy faith and pray in the Holy Spirit', 'Tear yourselves down', 'Ignore your faith', 'Abandon your faith', 0, 7),
  (new_quiz_id, 'What does Jude 1:21 say believers should keep themselves in?', 'God''s love as you wait for the mercy of our Lord Jesus Christ', 'Their own love', 'Worldly love', 'Selfish love', 0, 8),
  (new_quiz_id, 'What does Jude 1:22 say believers should be merciful to?', 'Those who doubt', 'Only the perfect', 'Only the righteous', 'Only the wealthy', 0, 9),
  (new_quiz_id, 'What does Jude 1:24 say God is able to do?', 'Keep you from stumbling and to present you before his glorious presence without fault', 'Nothing', 'Only punish', 'Only judge', 0, 10);

  -- Create Quiz: Revelation Quiz
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('Revelation Quiz', 'Test your knowledge of Revelation Quiz', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
  (new_quiz_id, 'What is the main theme of Revelation?', 'Church organization', 'The end times, Christ''s return, and the final victory', 'Financial giving', 'Personal success', 1, 1),
  (new_quiz_id, 'What does Revelation 1:3 say about those who read this prophecy?', 'Blessed is the one who reads aloud the words of this prophecy', 'Cursed', 'Punished', 'Ignored', 0, 2),
  (new_quiz_id, 'What does Revelation 1:8 say the Lord God is?', 'The Alpha and the Omega, who is, and who was, and who is to come, the Almighty', 'Just a man', 'An angel', 'A prophet', 0, 3),
  (new_quiz_id, 'What does Revelation 3:20 say Jesus is doing?', 'I stand at the door and knock. If anyone hears my voice and opens the door, I will come in', 'Waiting outside', 'Ignoring us', 'Abandoning us', 0, 4),
  (new_quiz_id, 'What does Revelation 4:8 say the four living creatures never stop saying?', 'Holy, holy, holy is the Lord God Almighty', 'Nothing', 'Praise to themselves', 'Praise to others', 0, 5),
  (new_quiz_id, 'What does Revelation 5:5 say the Lion of the tribe of Judah has done?', 'Has triumphed', 'Has failed', 'Has given up', 'Has lost', 0, 6),
  (new_quiz_id, 'What does Revelation 7:9 say John saw?', 'A great multitude that no one could count, from every nation, tribe, people and language', 'Only a few people', 'Only one nation', 'Only one language', 0, 7),
  (new_quiz_id, 'What does Revelation 11:15 say the kingdom of the world has become?', 'The kingdom of our Lord and of his Messiah', 'Nothing', 'The same', 'Worse', 0, 8),
  (new_quiz_id, 'What does Revelation 19:11 say John saw?', 'Heaven standing open and there before me was a white horse, whose rider is called Faithful and True', 'Nothing', 'A black horse', 'A red horse', 0, 9),
  (new_quiz_id, 'What does Revelation 21:4 say God will wipe away?', 'Every tear from their eyes. There will be no more death or mourning or crying or pain', 'Nothing', 'Only some tears', 'Only some pain', 0, 10);

END $$;
