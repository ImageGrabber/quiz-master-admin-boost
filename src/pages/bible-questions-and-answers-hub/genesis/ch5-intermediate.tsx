import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 5, question: "At what age did Adam father Seth?", options: ["105", "130", "150", "200"], answer: 1 },
  { chapter: 5, question: "How long did Enoch live before he was taken?", options: ["300 years", "365 years", "430 years", "500 years"], answer: 1 },
  { chapter: 5, question: "Whose years were 777?", options: ["Enosh", "Lamech", "Jared", "Noah"], answer: 1 },
  { chapter: 5, question: "Who was Methuselah's father?", options: ["Lamech", "Jared", "Enoch", "Noah"], answer: 2 },
  { chapter: 5, question: "What phrase repeats for each patriarch?", options: ["And he died", "He reigned", "He fought", "He built"], answer: 0 }
];

export default function GenesisCh5Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 5 - Intermediate" questions={questions} bookName="Genesis" />
  );
}


