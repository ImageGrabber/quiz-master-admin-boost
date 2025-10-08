import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 15, question: "What did Abram say he had no heir?", options: ["A son", "A daughter", "A servant", "A brother"], answer: 0 },
  { chapter: 15, question: "What did God promise Abram?", options: ["A son", "A great reward", "A kingdom", "A temple"], answer: 0 },
  { chapter: 15, question: "What did Abram ask about?", options: ["How will I know?", "When will it happen?", "Where will I go?", "What should I do?"], answer: 0 },
  { chapter: 15, question: "What did God tell Abram to bring?", options: ["A heifer, goat, ram, dove, pigeon", "Gold and silver", "Bread and wine", "Clothes and shoes"], answer: 0 },
  { chapter: 15, question: "What did Abram do with the animals?", options: ["Ate them", "Sold them", "Cut them in half", "Set them free"], answer: 2 },
  { chapter: 15, question: "What came down between the pieces?", options: ["An angel", "A smoking firepot", "A flaming torch", "Both B and C"], answer: 3 },
  { chapter: 15, question: "What did God promise about the land?", options: ["Abram would own it", "His descendants would possess it", "He would live there forever", "It would be destroyed"], answer: 1 },
  { chapter: 15, question: "How long would Abram's descendants be strangers?", options: ["100 years", "200 years", "400 years", "500 years"], answer: 2 },
  { chapter: 15, question: "What would happen to the nation that enslaved them?", options: ["They would be blessed", "They would be judged", "They would be destroyed", "They would be forgiven"], answer: 1 },
  { chapter: 15, question: "What was counted as righteousness for Abram?", options: ["His works", "His faith", "His sacrifices", "His prayers"], answer: 1 }
];

export default function GenesisCh15Beginner() {
  return <BibleBookQuiz title="Genesis 15 - Beginner" questions={questions} bookName="Genesis" />;
}
