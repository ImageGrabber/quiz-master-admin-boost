import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 9, question: "What sign did God give for His covenant with Noah?", options: ["Circumcision", "Rainbow", "Sabbath", "Stone"], answer: 1 },
  { chapter: 9, question: "What is prohibited regarding meat?", options: ["Salt", "Blood", "Bread", "Wine"], answer: 1 },
  { chapter: 9, question: "Whose nakedness was seen?", options: ["Shem", "Ham saw Noah's", "Japheth", "Canaan"], answer: 1 },
  { chapter: 9, question: "Who was cursed after the incident?", options: ["Ham", "Canaan", "Shem", "Japheth"], answer: 1 },
  { chapter: 9, question: "Be fruitful and multiply was", options: ["A curse", "A command and blessing", "A warning", "A proverb"], answer: 1 },
  { chapter: 9, question: "Who would require a reckoning for lifeblood?", options: ["Kings", "Animals and man", "Only God", "Priests"], answer: 1 },
  { chapter: 9, question: "Noah became a man of", options: ["War", "The soil", "Trade", "Letters"], answer: 1 },
  { chapter: 9, question: "Shem and Japheth covered their father walking", options: ["Forward", "Backward", "Sideways", "Running"], answer: 1 },
  { chapter: 9, question: "Who shall dwell in the tents of Shem?", options: ["Canaan", "Japheth", "Ham", "Ishmael"], answer: 1 },
  { chapter: 9, question: "Noah lived how many years after the flood?", options: ["150", "200", "350", "500"], answer: 2 }
];

export default function GenesisCh9Beginner() {
  return <BibleBookQuiz title="Genesis 9 - Beginner" questions={questions} bookName="Genesis" />;
}


