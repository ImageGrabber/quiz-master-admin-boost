import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "Who created the heavens and the earth?", options: ["Adam", "Moses", "God", "Abraham"], answer: 2 },
  { chapter: 2, question: "From which part of Adam was Eve made?", options: ["Head", "Rib", "Foot", "Heart"], answer: 1 },
  { chapter: 3, question: "What did Adam and Eve eat?", options: ["Manna", "Forbidden fruit", "Bread", "Meat"], answer: 1 },
  { chapter: 6, question: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "David"], answer: 1 },
  { chapter: 7, question: "How many days did it rain?", options: ["10", "20", "30", "40"], answer: 3 },
  { chapter: 8, question: "Which bird brought an olive leaf?", options: ["Raven", "Dove", "Eagle", "Sparrow"], answer: 1 },
  { chapter: 12, question: "Who was called out of Haran?", options: ["Isaac", "Jacob", "Abram", "Joseph"], answer: 2 },
  { chapter: 17, question: "What was the sign of God's covenant with Abraham?", options: ["Rainbow", "Circumcision", "Sacrifice", "Stone"], answer: 1 },
  { chapter: 22, question: "Who was Abraham's promised son?", options: ["Esau", "Ishmael", "Jacob", "Isaac"], answer: 3 },
  { chapter: 37, question: "Whose dreams angered his brothers?", options: ["Joseph", "Benjamin", "Levi", "Judah"], answer: 0 }
];

export default function GenesisBeginner() {
  return (
    <BibleBookQuiz title="Genesis Beginner" questions={questions} bookName="Genesis" />
  );
}


