import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 3, question: "What was the serpent's first question?", options: ["Where are you?", "Did God actually say...?", "Why are you naked?", "Who are you?"], answer: 1 },
  { chapter: 3, question: "What consequence was given to the serpent?", options: ["Lose wings", "Eat dust", "Lose voice", "Die"], answer: 1 },
  { chapter: 3, question: "What was multiplied for the woman?", options: ["Joy", "Food", "Pain in childbearing", "Wealth"], answer: 2 },
  { chapter: 3, question: "What would the ground produce for the man?", options: ["Gold", "Thorns and thistles", "Milk and honey", "Vineyards"], answer: 1 },
  { chapter: 3, question: "From what was man taken and to what would he return?", options: ["Water to water", "Dust to dust", "Clay to clay", "Ashes to ashes"], answer: 1 }
];

export default function GenesisCh3Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 3 - Intermediate" questions={questions} bookName="Genesis" />
  );
}


