import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 17, question: "Hebrew meaning of 'Abraham'", options: ["Father of many", "Father of nations", "Father of multitudes", "Father of the faithful"], answer: 1 },
  { chapter: 17, question: "Hebrew meaning of 'Sarah'", options: ["Princess", "Queen", "Lady", "Mother"], answer: 0 },
  { chapter: 17, question: "What was the covenant sign?", options: ["Rainbow", "Circumcision", "Sabbath", "Altar"], answer: 1 },
  { chapter: 17, question: "What did God promise about Sarah?", options: ["She would be blessed", "She would have a son", "She would be a princess", "She would live long"], answer: 1 },
  { chapter: 17, question: "What did Abraham do when he heard about Isaac?", options: ["Laughed", "Cried", "Prayed", "Sang"], answer: 0 },
  { chapter: 17, question: "What did Abraham ask about Ishmael?", options: ["Would he live?", "Would he be blessed?", "Would he have children?", "Would he be a king?"], answer: 1 },
  { chapter: 17, question: "What did God promise about Ishmael?", options: ["He would be a king", "He would have 12 sons", "He would be blessed and fruitful", "He would be a prophet"], answer: 2 },
  { chapter: 17, question: "What did Abraham do immediately?", options: ["Built an altar", "Circumcised himself and Ishmael", "Moved his tent", "Called his family"], answer: 1 },
  { chapter: 17, question: "How old was Ishmael when circumcised?", options: ["8", "13", "15", "17"], answer: 1 },
  { chapter: 17, question: "What was the penalty for uncircumcised males?", options: ["Exile", "Death", "Cut off from people", "Curse"], answer: 2 }
];

export default function GenesisCh17Advanced() {
  return <BibleBookQuiz title="Genesis 17 - Advanced" questions={questions} bookName="Genesis" />;
}
