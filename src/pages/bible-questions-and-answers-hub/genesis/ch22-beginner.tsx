import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 22, question: "What did God ask Abraham to sacrifice?", options: ["A lamb", "Isaac", "A ram", "A bull"], answer: 1 },
  { chapter: 22, question: "Where did God tell Abraham to go?", options: ["Mount Sinai", "Mount Moriah", "Mount Carmel", "Mount Zion"], answer: 1 },
  { chapter: 22, question: "How many servants did Abraham take?", options: ["One", "Two", "Three", "Four"], answer: 1 },
  { chapter: 22, question: "What did Isaac carry?", options: ["The knife", "The fire", "The wood", "The water"], answer: 2 },
  { chapter: 22, question: "What did Isaac ask about?", options: ["The mountain", "The lamb", "The altar", "The fire"], answer: 1 },
  { chapter: 22, question: "What did Abraham say God would provide?", options: ["A mountain", "A lamb", "A ram", "A bull"], answer: 1 },
  { chapter: 22, question: "What did the angel call Abraham?", options: ["Abraham! Abraham!", "Abraham! Isaac!", "Abraham! My son!", "Abraham! Here I am!"], answer: 0 },
  { chapter: 22, question: "What did Abraham see in the thicket?", options: ["A lamb", "A ram", "A goat", "A bull"], answer: 1 },
  { chapter: 22, question: "What did Abraham name the place?", options: ["The Lord Will Provide", "Mount Moriah", "Beersheba", "The Lord's Mountain"], answer: 0 },
  { chapter: 22, question: "Who became the father of Rebekah?", options: ["Nahor", "Bethuel", "Kemuel", "Uz"], answer: 1 }
];

export default function GenesisCh22Beginner() {
  return <BibleBookQuiz title="Genesis 22 - Beginner" questions={questions} bookName="Genesis" />;
}
