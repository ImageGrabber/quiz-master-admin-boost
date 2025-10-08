import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 19, question: "How many angels came to Sodom?", options: ["One", "Two", "Three", "Four"], answer: 1 },
  { chapter: 19, question: "Where was Lot sitting when they came?", options: ["In his house", "At the gate", "In the field", "By the well"], answer: 1 },
  { chapter: 19, question: "What did Lot do when he saw them?", options: ["Ran away", "Bowed down", "Called his family", "Warned them"], answer: 1 },
  { chapter: 19, question: "What did Lot offer the angels?", options: ["Gold and silver", "Bread and water", "A place to stay", "A feast"], answer: 2 },
  { chapter: 19, question: "What did the men of Sodom want to do?", options: ["Kill the angels", "Know the angels", "Rob the angels", "Follow the angels"], answer: 1 },
  { chapter: 19, question: "What did Lot offer instead?", options: ["His daughters", "His sons", "His wealth", "His life"], answer: 0 },
  { chapter: 19, question: "What did the angels do to the men?", options: ["Killed them", "Blinded them", "Cursed them", "Scared them"], answer: 1 },
  { chapter: 19, question: "What did the angels tell Lot to do?", options: ["Stay in Sodom", "Leave immediately", "Pray for the city", "Warn the people"], answer: 1 },
  { chapter: 19, question: "What happened to Lot's wife?", options: ["She died", "She became a pillar of salt", "She was saved", "She ran away"], answer: 1 },
  { chapter: 19, question: "What did Lot and his daughters do?", options: ["Went to Zoar", "Went to Egypt", "Went to Canaan", "Went to the mountains"], answer: 0 }
];

export default function GenesisCh19Beginner() {
  return <BibleBookQuiz title="Genesis 19 - Beginner" questions={questions} bookName="Genesis" />;
}
