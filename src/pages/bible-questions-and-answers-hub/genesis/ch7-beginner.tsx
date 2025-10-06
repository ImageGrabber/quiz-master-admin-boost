import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 7, question: "How many days and nights did it rain?", options: ["30", "40", "50", "60"], answer: 1 },
  { chapter: 7, question: "How many pairs of clean animals entered?", options: ["Two", "Three", "Seven pairs", "Ten"], answer: 2 },
  { chapter: 7, question: "Who entered the ark with Noah?", options: ["City elders", "Family only", "Kings", "Priests"], answer: 1 },
  { chapter: 7, question: "What happened to the waters?", options: ["Receded immediately", "Prevailed on the earth", "Froze", "Boiled"], answer: 1 },
  { chapter: 7, question: "How long did the waters prevail?", options: ["120 days", "150 days", "300 days", "365 days"], answer: 1 },
  { chapter: 7, question: "Door of the ark was shut by", options: ["Noah", "Shem", "God", "An angel"], answer: 2 },
  { chapter: 7, question: "What perished from the earth?", options: ["Only birds", "Only animals", "All flesh outside the ark", "Only plants"], answer: 2 },
  { chapter: 7, question: "What mountains did the waters cover?", options: ["Some hills", "The highest mountains", "Only valleys", "None"], answer: 1 },
  { chapter: 7, question: "How many people were saved on the ark?", options: ["Six", "Seven", "Eight", "Nine"], answer: 2 },
  { chapter: 7, question: "What type of animals went by sevens?", options: ["Unclean", "Clean and birds", "Fish", "Reptiles"], answer: 1 }
];

export default function GenesisCh7Beginner() {
  return <BibleBookQuiz title="Genesis 7 - Beginner" questions={questions} bookName="Genesis" />;
}


