import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 5, question: "Which chapter lists Adam's descendants?", options: ["Genesis 4", "Genesis 5", "Genesis 6", "Genesis 7"], answer: 1 },
  { chapter: 5, question: "Who lived 969 years?", options: ["Jared", "Enoch", "Methuselah", "Lamech"], answer: 2 },
  { chapter: 5, question: "Who walked with God and was taken?", options: ["Noah", "Enoch", "Seth", "Jared"], answer: 1 },
  { chapter: 5, question: "Who was Noah's father?", options: ["Methuselah", "Lamech", "Jared", "Enosh"], answer: 1 },
  { chapter: 5, question: "This is the book of the ______ of Adam.", options: ["descendants", "life", "generations", "children"], answer: 2 }
];

export default function GenesisCh5Beginner() {
  return (
    <BibleBookQuiz title="Genesis 5 - Beginner" questions={questions} bookName="Genesis" />
  );
}


