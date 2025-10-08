import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 20, question: "Where did Abraham go?", options: ["Egypt", "Gerar", "Canaan", "Haran"], answer: 1 },
  { chapter: 20, question: "Who was the king of Gerar?", options: ["Abimelech", "Pharaoh", "Melchizedek", "Bera"], answer: 0 },
  { chapter: 20, question: "What did Abraham say about Sarah?", options: ["She is my wife", "She is my sister", "She is my daughter", "She is my servant"], answer: 1 },
  { chapter: 20, question: "What did Abimelech do?", options: ["Took Sarah", "Killed Abraham", "Blessed Abraham", "Gave Abraham gifts"], answer: 0 },
  { chapter: 20, question: "What happened to Abimelech in a dream?", options: ["He was blessed", "He was warned", "He was cursed", "He was healed"], answer: 1 },
  { chapter: 20, question: "What did God say to Abimelech?", options: ["You are a dead man", "You are blessed", "You are cursed", "You are healed"], answer: 0 },
  { chapter: 20, question: "What did Abimelech do when he woke up?", options: ["Called Abraham", "Told his servants", "Prayed to God", "All of the above"], answer: 3 },
  { chapter: 20, question: "What did Abraham say about Sarah?", options: ["She is my wife", "She is my sister", "She is my daughter", "She is my servant"], answer: 1 },
  { chapter: 20, question: "What did Abimelech give Abraham?", options: ["Gold", "Silver", "Sheep, oxen, servants, and silver", "Land"], answer: 2 },
  { chapter: 20, question: "What did Abraham do for Abimelech?", options: ["Blessed him", "Prayed for him", "Cursed him", "Left him"], answer: 1 }
];

export default function GenesisCh20Advanced() {
  return <BibleBookQuiz title="Genesis 20 - Advanced" questions={questions} bookName="Genesis" />;
}
