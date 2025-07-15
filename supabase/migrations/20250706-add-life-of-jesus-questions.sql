-- Migration: Add 15 Life Of Jesus questions and link to quiz_id 2

WITH inserted_questions AS (
  INSERT INTO public.questions (question, option_a, option_b, option_c, option_d, correct_index)
  VALUES
    ('Where was Jesus born?', 'Nazareth', 'Bethlehem', 'Jerusalem', 'Capernaum', 1),
    ('Who baptized Jesus?', 'Peter', 'John the Baptist', 'Paul', 'James', 1),
    ('How many disciples did Jesus choose?', '10', '11', '12', '13', 2),
    ('What was Jesus’ first miracle?', 'Walking on water', 'Feeding 5000', 'Turning water into wine', 'Healing a leper', 2),
    ('Who denied Jesus three times?', 'Judas', 'Peter', 'John', 'Thomas', 1),
    ('What did Jesus ride into Jerusalem on?', 'Horse', 'Camel', 'Donkey', 'Chariot', 2),
    ('Who betrayed Jesus for 30 pieces of silver?', 'Peter', 'Judas Iscariot', 'Thomas', 'James', 1),
    ('Where did Jesus pray before his arrest?', 'Mount Sinai', 'Garden of Gethsemane', 'Sea of Galilee', 'Nazareth', 1),
    ('Who was the Roman governor who sentenced Jesus to be crucified?', 'Herod', 'Pilate', 'Caesar', 'Augustus', 1),
    ('What inscription was placed above Jesus on the cross?', 'King of the Jews', 'Son of God', 'Messiah', 'Savior', 0),
    ('Who was the first to see Jesus after His resurrection?', 'Peter', 'Mary Magdalene', 'John', 'James', 1),
    ('How did Jesus ascend to heaven?', 'By chariot', 'He walked', 'He was taken up in a cloud', 'He disappeared', 2),
    ('Who replaced Judas as a disciple?', 'Barnabas', 'Matthias', 'Stephen', 'Silas', 1),
    ('What event marked the coming of the Holy Spirit to the apostles?', 'Ascension', 'Pentecost', 'Transfiguration', 'Passover', 1),
    ('Who was the first Christian martyr?', 'Peter', 'Stephen', 'Paul', 'James', 1)
  RETURNING id
)
INSERT INTO public.quiz_questions (quiz_id, question_id, order_index)
SELECT 2, id, ROW_NUMBER() OVER ()
FROM inserted_questions; 