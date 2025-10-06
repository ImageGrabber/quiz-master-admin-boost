import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 2, question: "Which two trees are named in the garden?", options: ["Olive and fig", "Life and knowledge of good and evil", "Cedars and oaks", "Pine and palm"], answer: 1 },
  { chapter: 2, question: "Which river is NOT listed among the four?", options: ["Pishon", "Gihon", "Tigris", "Jordan"], answer: 3 },
  { chapter: 2, question: "What task was man given in the garden?", options: ["To till and keep it", "To build a tower", "To hunt", "To write laws"], answer: 0 },
  { chapter: 2, question: "What did God bring to Adam to name?", options: ["Stars", "Animals and birds", "Rivers", "Mountains"], answer: 1 },
  { chapter: 2, question: "What becomes of the two who marry?", options: ["One flesh", "Two houses", "A tribe", "A covenant"], answer: 0 }
];

export default function GenesisCh2Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 2 - Intermediate" questions={questions} bookName="Genesis" />
  );
}


