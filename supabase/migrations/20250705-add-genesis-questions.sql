-- Migration: Add 25 difficult Genesis questions and link to quiz_id 6

WITH inserted_questions AS (
  INSERT INTO public.questions (question, option_a, option_b, option_c, option_d, correct_index)
  VALUES
    ('Who was the father of Methuselah?', 'Enoch', 'Lamech', 'Jared', 'Noah', 0),
    ('What was the name of the well where Hagar encountered the angel of the Lord?', 'Beer-lahai-roi', 'Beersheba', 'Rehoboth', 'Shur', 0),
    ('Who was the king of Salem who blessed Abram?', 'Melchizedek', 'Abimelech', 'Pharaoh', 'Chedorlaomer', 0),
    ('How many years did Jacob serve Laban for Rachel and Leah?', '7', '14', '20', '21', 1),
    ('Who interpreted Pharaoh’s dreams in Genesis?', 'Joseph', 'Benjamin', 'Potiphar', 'Judah', 0),
    ('What was the sign of God’s covenant with Noah?', 'Rainbow', 'Olive branch', 'Dove', 'Fire', 0),
    ('Who was Rebekah’s brother?', 'Laban', 'Nahor', 'Bethuel', 'Haran', 0),
    ('What land did God promise to Abraham and his descendants?', 'Canaan', 'Egypt', 'Haran', 'Moab', 0),
    ('Who was the mother of Ishmael?', 'Hagar', 'Sarah', 'Keturah', 'Leah', 0),
    ('What did Esau trade his birthright for?', 'Lentil stew', 'Bread', 'Meat', 'Milk', 0),
    ('Who was buried in the cave of Machpelah?', 'Sarah', 'Rachel', 'Leah', 'Rebekah', 0),
    ('What was the name of Joseph’s Egyptian wife?', 'Asenath', 'Tamar', 'Dinah', 'Zipporah', 0),
    ('Who was the youngest son of Jacob?', 'Benjamin', 'Joseph', 'Gad', 'Naphtali', 0),
    ('What did God use to create Eve?', 'Adam’s rib', 'Dust', 'Clay', 'Breath', 0),
    ('Who deceived Jacob by giving him Leah instead of Rachel?', 'Laban', 'Esau', 'Rebekah', 'Bethuel', 0),
    ('What was the name of the tower built to reach the heavens?', 'Tower of Babel', 'Tower of Siloam', 'Tower of Shinar', 'Tower of Gilead', 0),
    ('Who was the first murderer in Genesis?', 'Cain', 'Abel', 'Lamech', 'Tubal-cain', 0),
    ('What was the name of Abraham’s second wife?', 'Keturah', 'Sarah', 'Hagar', 'Rebekah', 0),
    ('Who dreamed of a ladder reaching to heaven?', 'Jacob', 'Joseph', 'Isaac', 'Abraham', 0),
    ('What did Lot’s wife turn into?', 'Pillar of salt', 'Statue', 'Stone', 'Sand', 0),
    ('Who was the oldest man recorded in Genesis?', 'Methuselah', 'Noah', 'Adam', 'Enoch', 0),
    ('What was the name of Isaac’s mother?', 'Sarah', 'Rebekah', 'Rachel', 'Leah', 0),
    ('Who was the first person to plant a vineyard?', 'Noah', 'Abraham', 'Isaac', 'Jacob', 0),
    ('Who was the first hunter mentioned in Genesis?', 'Nimrod', 'Esau', 'Ishmael', 'Lamech', 0),
    ('What did Joseph’s brothers do with his coat of many colors?', 'Dipped it in blood', 'Burned it', 'Sold it', 'Tore it', 0)
  RETURNING id
)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index)
SELECT 6, id, ROW_NUMBER() OVER () 
FROM inserted_questions; 