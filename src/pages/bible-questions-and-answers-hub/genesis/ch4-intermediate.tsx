import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 4, question: "What was Abel's offering?", options: ["Fruit of the ground", "Firstborn of his flock", "Grain", "Oil"], answer: 1 },
  { chapter: 4, question: "What warning did God give Cain?", options: ["Flood is coming", "Sin is crouching at the door", "Leave Eden", "Offer more"], answer: 1 },
  { chapter: 4, question: "What mark was set for Cain?", options: ["Seal on forehead", "Unknown sign for protection", "Tattoo", "Ring"], answer: 1 },
  { chapter: 4, question: "Name of Cain's city?", options: ["Ur", "Nod", "Enoch", "Shinar"], answer: 2 },
  { chapter: 4, question: "Which descendant was a musician?", options: ["Jabal", "Jubal", "Tubal-cain", "Lamech"], answer: 1 }
];

export default function GenesisCh4Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 4 - Intermediate" questions={questions} bookName="Genesis" />
  );
}


