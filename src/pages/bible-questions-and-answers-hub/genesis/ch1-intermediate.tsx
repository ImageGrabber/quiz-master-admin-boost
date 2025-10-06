import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "On which day were the sun, moon, and stars created?", options: ["Day 2", "Day 3", "Day 4", "Day 5"], answer: 2, explanation: "Genesis 1:14-19 — Lights in the expanse on day four." },
  { chapter: 1, question: "What command did God give mankind regarding the earth?", options: ["Conquer nations", "Be fruitful and multiply", "Plant vineyards", "Build cities"], answer: 1, explanation: "Genesis 1:28 — Be fruitful and multiply; fill the earth and subdue it." },
  { chapter: 1, question: "What were humans given to rule over?", options: ["Only the land", "Fish, birds, and every living thing", "Only the sea", "Only birds"], answer: 1, explanation: "Genesis 1:26,28 — Dominion over fish, birds, and every living thing." },
  { chapter: 1, question: "What was given as food to mankind initially?", options: ["Meat", "Vegetables only", "Every seed-bearing plant", "Bread"], answer: 2, explanation: "Genesis 1:29 — Every seed-bearing plant and fruit with seed." },
  { chapter: 1, question: "What phrase repeats after each creative act?", options: ["And God said", "It was evening", "It was good", "He rested"], answer: 2, explanation: "Genesis 1 — Refrain: 'And God saw that it was good.'" }
];

export default function GenesisCh1Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 1 - Intermediate" questions={questions} bookName="Genesis" />
  );
}


