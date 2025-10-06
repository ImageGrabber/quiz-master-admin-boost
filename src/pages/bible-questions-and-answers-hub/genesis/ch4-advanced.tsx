import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 4, question: "What does 'Nod' signify in the narrative?", options: ["Rest", "Wandering", "Judgment", "Refuge"], answer: 1 },
  { chapter: 4, question: "Lamech's poem refers to vengeance of...", options: ["Sevenfold", "Seventy-sevenfold", "Tenfold", "Hundredfold"], answer: 1 },
  { chapter: 4, question: "Who fathered those who dwell in tents and have livestock?", options: ["Jabal", "Jubal", "Tubal-cain", "Lamech"], answer: 0 },
  { chapter: 4, question: "Who forged instruments of bronze and iron?", options: ["Jabal", "Jubal", "Tubal-cain", "Methushael"], answer: 2 },
  { chapter: 4, question: "Meaning of 'Seth' as given by Eve?", options: ["Appointed", "Gift", "Saved", "Living"], answer: 0 }
];

export default function GenesisCh4Advanced() {
  return (
    <BibleBookQuiz title="Genesis 4 - Advanced" questions={questions} bookName="Genesis" />
  );
}


