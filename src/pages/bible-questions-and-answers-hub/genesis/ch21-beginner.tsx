import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 21, question: "What was the name of Abraham and Sarah's son?", options: ["Ishmael", "Isaac", "Jacob", "Esau"], answer: 1 },
  { chapter: 21, question: "How old was Abraham when Isaac was born?", options: ["90", "95", "100", "105"], answer: 2 },
  { chapter: 21, question: "What did Sarah say God had brought her?", options: ["Joy", "Laughter", "Peace", "Hope"], answer: 1 },
  { chapter: 21, question: "Who was sent away with her son?", options: ["Sarah", "Hagar", "Rebekah", "Leah"], answer: 1 },
  { chapter: 21, question: "What was the name of Hagar's son?", options: ["Isaac", "Ishmael", "Jacob", "Esau"], answer: 1 },
  { chapter: 21, question: "Where did Hagar wander?", options: ["Desert of Paran", "Desert of Beersheba", "Desert of Sinai", "Desert of Judah"], answer: 1 },
  { chapter: 21, question: "What did God open for Hagar to see?", options: ["A tree", "A well of water", "A mountain", "A city"], answer: 1 },
  { chapter: 21, question: "What did Ishmael become?", options: ["A shepherd", "An archer", "A farmer", "A merchant"], answer: 1 },
  { chapter: 21, question: "Who made a treaty with Abraham?", options: ["Pharaoh", "Abimelech", "Melchizedek", "Bera"], answer: 1 },
  { chapter: 21, question: "What was the name of the place where the treaty was made?", options: ["Bethel", "Beersheba", "Hebron", "Gerar"], answer: 1 }
];

export default function GenesisCh21Beginner() {
  return <BibleBookQuiz title="Genesis 21 - Beginner" questions={questions} bookName="Genesis" />;
}
