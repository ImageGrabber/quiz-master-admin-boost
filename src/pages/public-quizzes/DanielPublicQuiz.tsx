import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was Daniel's Hebrew name?",
    options: ["Belteshazzar", "Daniel", "Both A and B", "Neither A nor B"],
    answer: 2,
    explanation: "Daniel 1:7 - The chief official gave them new names: to Daniel, the name Belteshazzar; to Hananiah, Shadrach; to Mishael, Meshach; and to Azariah, Abednego."
  },
  {
    id: 2,
    question: "What did Daniel and his friends refuse to eat?",
    options: ["Pork", "The king's food and wine", "Meat", "Bread"],
    answer: 1,
    explanation: "Daniel 1:8 - But Daniel resolved not to defile himself with the royal food and wine, and he asked the chief official for permission not to defile himself this way."
  },
  {
    id: 3,
    question: "What was the name of the king who threw Daniel's friends into the furnace?",
    options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
    answer: 0,
    explanation: "Daniel 3:19-20 - Then Nebuchadnezzar was furious with Shadrach, Meshach and Abednego, and his attitude toward them changed. He ordered the furnace heated seven times hotter than usual and commanded some of the strongest soldiers in his army to tie up Shadrach, Meshach and Abednego and throw them into the blazing furnace."
  },
  {
    id: 4,
    question: "What did King Nebuchadnezzar see in his dream?",
    options: ["A tree", "A statue", "A beast", "A mountain"],
    answer: 1,
    explanation: "Daniel 2:31 - You looked, O king, and there before you stood a large statue—an enormous, dazzling statue, awesome in appearance."
  },
  {
    id: 5,
    question: "What was written on the wall during Belshazzar's feast?",
    options: ["MENE, MENE, TEKEL, PARSIN", "HOLY, HOLY, HOLY", "GLORY TO GOD", "None of the above"],
    answer: 0,
    explanation: "Daniel 5:25 - This is the inscription that was written: MENE, MENE, TEKEL, PARSIN."
  },
  {
    id: 6,
    question: "What happened to Daniel when he was thrown into the lions' den?",
    options: ["He was eaten by the lions", "God shut the lions' mouths", "He escaped through a secret passage", "The lions became friendly"],
    answer: 1,
    explanation: "Daniel 6:22 - My God sent his angel, and he shut the mouths of the lions. They have not hurt me, because I was found innocent in his sight."
  },
  {
    id: 7,
    question: "What was the name of the king who threw Daniel into the lions' den?",
    options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"],
    answer: 2,
    explanation: "Daniel 6:16 - So the king gave the order, and they brought Daniel and threw him into the lions' den."
  },
  {
    id: 8,
    question: "What did Daniel see in his vision of the four beasts?",
    options: ["Four different animals", "A lion, bear, leopard, and a terrifying beast", "Four kings", "All of the above"],
    answer: 3,
    explanation: "Daniel 7:3-7 - Four great beasts, each different from the others, came up out of the sea. The first was like a lion, the second like a bear, the third like a leopard, and the fourth was terrifying and very strong."
  },
  {
    id: 9,
    question: "How many times a day did Daniel pray?",
    options: ["Once", "Twice", "Three times", "Four times"],
    answer: 2,
    explanation: "Daniel 6:10 - Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before."
  },
  {
    id: 10,
    question: "What did the angel Gabriel tell Daniel about the 70 weeks?",
    options: ["They represented 70 years", "They were about the coming Messiah", "They were about the end times", "All of the above"],
    answer: 3,
    explanation: "Daniel 9:24-27 - Seventy 'sevens' are decreed for your people and your holy city to finish transgression, to put an end to sin, to atone for wickedness, to bring in everlasting righteousness, to seal up vision and prophecy and to anoint the Most Holy Place."
  }
];

export default function DanielPublicQuiz() {
  return (
    <PublicQuiz 
      title="Daniel Quiz - Faith in the Lion's Den"
      questions={questions}
      bookName="Daniel"
    />
  );
}
