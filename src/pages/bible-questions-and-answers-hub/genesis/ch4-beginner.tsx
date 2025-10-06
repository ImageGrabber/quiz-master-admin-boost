import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 4, question: "Who were Adam and Eve's first two sons?", options: ["Cain and Abel", "Seth and Enosh", "Jacob and Esau", "Joseph and Benjamin"], answer: 0 },
  { chapter: 4, question: "Whose offering did the LORD regard?", options: ["Cain's", "Abel's", "Both", "Neither"], answer: 1 },
  { chapter: 4, question: "What did Cain do to Abel?", options: ["Blessed him", "Killed him", "Sold him", "Ignored him"], answer: 1 },
  { chapter: 4, question: "What was Cain's punishment?", options: ["Exile and wandering", "Flood", "Fire", "Silence"], answer: 0 },
  { chapter: 4, question: "Who replaced Abel for Eve?", options: ["Lamech", "Enoch", "Seth", "Jared"], answer: 2 }
];

export default function GenesisCh4Beginner() {
  return (
    <BibleBookQuiz title="Genesis 4 - Beginner" questions={questions} bookName="Genesis" />
  );
}


