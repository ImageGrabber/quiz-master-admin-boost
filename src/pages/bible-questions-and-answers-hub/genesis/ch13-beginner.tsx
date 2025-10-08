import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 13, question: "Why did Abram and Lot separate?", options: ["They fought", "Land couldn't support both", "God told them to", "Lot wanted to leave"], answer: 1 },
  { chapter: 13, question: "What did Lot choose?", options: ["The hills", "The Jordan plain", "The desert", "The mountains"], answer: 1 },
  { chapter: 13, question: "Where did Abram settle?", options: ["Bethel", "Hebron", "Shechem", "Jerusalem"], answer: 1 },
  { chapter: 13, question: "What did Abram build at Hebron?", options: ["A house", "An altar", "A wall", "A tower"], answer: 1 },
  { chapter: 13, question: "What did God promise Abram?", options: ["A son", "All the land he could see", "A kingdom", "A temple"], answer: 1 },
  { chapter: 13, question: "How many descendants would Abram have?", options: ["As many as the stars", "As many as the sand", "As many as the trees", "As many as the rivers"], answer: 0 },
  { chapter: 13, question: "What did Abram do after the promise?", options: ["Built a city", "Moved his tent", "Made an offering", "Called his family"], answer: 1 },
  { chapter: 13, question: "Where was Lot living when he separated?", options: ["Near Sodom", "In Egypt", "In Canaan", "In the hills"], answer: 0 },
  { chapter: 13, question: "What was Abram's relationship to Lot?", options: ["Brother", "Nephew", "Son", "Cousin"], answer: 1 },
  { chapter: 13, question: "What did Abram call on the name of the Lord?", options: ["At Bethel", "At Hebron", "At Shechem", "At Salem"], answer: 1 }
];

export default function GenesisCh13Beginner() {
  return <BibleBookQuiz title="Genesis 13 - Beginner" questions={questions} bookName="Genesis" />;
}
