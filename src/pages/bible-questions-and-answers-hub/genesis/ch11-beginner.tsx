import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 11, question: "What city/tower did people build?", options: ["Ur", "Babel", "Nineveh", "Hebron"], answer: 1 },
  { chapter: 11, question: "Why did they build it?", options: ["Worship", "Make a name and not be scattered", "Defense", "Trade"], answer: 1 },
  { chapter: 11, question: "How did God judge them?", options: ["Flood", "Fire", "Confused languages", "Plague"], answer: 2 },
  { chapter: 11, question: "Language before Babel was", options: ["Many", "One", "Two", "Unknown"], answer: 1 },
  { chapter: 11, question: "Which family line is traced to Abram?", options: ["Canaan", "Shem", "Ham", "Japheth"], answer: 1 },
  { chapter: 11, question: "Abram’s father", options: ["Nahor", "Terah", "Serug", "Peleg"], answer: 1 },
  { chapter: 11, question: "Abram’s wife", options: ["Rebekah", "Sarai", "Leah", "Rachel"], answer: 1 },
  { chapter: 11, question: "Where did they settle before Canaan?", options: ["Egypt", "Haran", "Moab", "Edom"], answer: 1 },
  { chapter: 11, question: "Who died in Ur of the Chaldeans?", options: ["Terah", "Haran", "Nahor", "Peleg"], answer: 1 },
  { chapter: 11, question: "Who were Abram’s brothers?", options: ["Haran and Nahor", "Esau and Jacob", "Shem and Japheth", "Peleg and Joktan"], answer: 0 }
];

export default function GenesisCh11Beginner() {
  return <BibleBookQuiz title="Genesis 11 - Beginner" questions={questions} bookName="Genesis" />;
}


