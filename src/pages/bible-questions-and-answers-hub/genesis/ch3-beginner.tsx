import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 3, question: "Who tempted Eve?", options: ["A lion", "A serpent", "A prophet", "An angel"], answer: 1 },
  { chapter: 3, question: "What did Adam and Eve realize after eating?", options: ["They were tall", "They were naked", "They were lost", "They were alone"], answer: 1 },
  { chapter: 3, question: "What did they sew together?", options: ["Olive leaves", "Fig leaves", "Palm leaves", "Grape leaves"], answer: 1 },
  { chapter: 3, question: "Who did Adam blame?", options: ["The serpent", "Himself", "The woman", "God"], answer: 2 },
  { chapter: 3, question: "What guarded the way to the tree of life?", options: ["A wall", "Cherubim and flaming sword", "A river", "A prophet"], answer: 1 }
];

export default function GenesisCh3Beginner() {
  return (
    <BibleBookQuiz title="Genesis 3 - Beginner" questions={questions} bookName="Genesis" />
  );
}


