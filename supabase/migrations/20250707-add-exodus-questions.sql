-- Migration: Add 25 difficult Exodus questions and link to quiz_id 7

WITH inserted_questions AS (
  INSERT INTO public.questions (question, option_a, option_b, option_c, option_d, correct_index)
  VALUES
    ('What was the name of Moses’ father-in-law?', 'Jethro', 'Hobab', 'Reuel', 'Gershom', 0),
    ('What was the first plague that struck Egypt?', 'Frogs', 'Water turned to blood', 'Locusts', 'Darkness', 1),
    ('How old was Moses when he spoke to Pharaoh?', '40', '60', '80', '120', 2),
    ('What did God use to speak to Moses at Horeb?', 'A burning bush', 'A cloud', 'A pillar of fire', 'A dove', 0),
    ('What was the name of Moses’ wife?', 'Zipporah', 'Miriam', 'Rachel', 'Leah', 0),
    ('Which tribe did Moses and Aaron belong to?', 'Judah', 'Levi', 'Benjamin', 'Reuben', 1),
    ('What did the Israelites eat the night before leaving Egypt?', 'Quail', 'Unleavened bread and lamb', 'Fish', 'Manna', 1),
    ('How many days did the Israelites travel in the wilderness before finding water at Marah?', 'Three', 'Seven', 'Ten', 'Forty', 0),
    ('What did Aaron’s staff turn into before Pharaoh?', 'A frog', 'A serpent', 'A locust', 'A bird', 1),
    ('What was the name of the sea the Israelites crossed?', 'Red Sea', 'Dead Sea', 'Sea of Galilee', 'Mediterranean Sea', 0),
    ('What did the Israelites complain about at Marah?', 'No food', 'No water', 'No meat', 'No shelter', 1),
    ('What did God provide from heaven to feed the Israelites?', 'Quail', 'Manna', 'Fish', 'Honey', 1),
    ('Who held up Moses’ hands during the battle with Amalek?', 'Aaron and Hur', 'Joshua and Caleb', 'Miriam and Zipporah', 'Jethro and Hobab', 0),
    ('What was the punishment for gathering manna on the Sabbath?', 'Death', 'Exile', 'None was found', 'Imprisonment', 2),
    ('What did Moses do to make water come from the rock at Rephidim?', 'Struck it with his staff', 'Prayed', 'Spoke to it', 'Poured oil on it', 0),
    ('How many elders did Moses appoint to help him judge Israel?', '12', '24', '70', '120', 2),
    ('What mountain did Moses receive the Ten Commandments on?', 'Mount Sinai', 'Mount Horeb', 'Mount Nebo', 'Mount Carmel', 0),
    ('What did the Israelites make while Moses was on the mountain?', 'Golden calf', 'Bronze serpent', 'Stone altar', 'Wooden idol', 0),
    ('Who fashioned the golden calf?', 'Aaron', 'Miriam', 'Hur', 'Joshua', 0),
    ('What did Moses do with the first tablets of the law?', 'Kept them', 'Broke them', 'Buried them', 'Gave them to Aaron', 1),
    ('What was the Ark of the Covenant made of?', 'Acacia wood', 'Cedar', 'Pine', 'Olive wood', 0),
    ('What was placed inside the Ark of the Covenant?', 'Manna, Aaron’s rod, tablets of law', 'Moses’ staff, oil, incense', 'Gold, silver, bronze', 'Scrolls', 0),
    ('Who was appointed as the first high priest?', 'Aaron', 'Moses', 'Eleazar', 'Joshua', 0),
    ('What was the penalty for unauthorized entry into the Holy of Holies?', 'Death', 'Exile', 'Leprosy', 'Imprisonment', 0),
    ('How many days did Moses stay on Mount Sinai when receiving the law?', '7', '21', '30', '40', 3)
  RETURNING id
)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index)
SELECT 7, id, ROW_NUMBER() OVER ()
FROM inserted_questions; 