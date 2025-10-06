import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "On which day were the sun, moon, and stars made?", options: ["Day 2", "Day 3", "Day 4", "Day 5"], answer: 2 },
  { chapter: 4, question: "Who killed Abel?", options: ["Cain", "Lamech", "Seth", "Enoch"], answer: 0 },
  { chapter: 9, question: "What covenant sign did God give after the flood?", options: ["Circumcision", "Rainbow", "Sabbath", "Stone"], answer: 1 },
  { chapter: 11, question: "What did God confuse at Babel?", options: ["Tongues", "Nations", "Families", "Years"], answer: 0 },
  { chapter: 12, question: "Who accompanied Abram from Haran?", options: ["Nahor", "Lot", "Eliezer", "Ishmael"], answer: 1 },
  { chapter: 14, question: "Who blessed Abram with bread and wine?", options: ["Melchizedek", "Abimelech", "Pharaoh", "Bera"], answer: 0 },
  { chapter: 15, question: "What was counted to Abram as righteousness?", options: ["Faith", "Works", "Sacrifice", "Law"], answer: 0 },
  { chapter: 18, question: "Who negotiated for Sodom?", options: ["Lot", "Abraham", "Isaac", "Jacob"], answer: 1 },
  { chapter: 22, question: "Where did Abraham offer Isaac?", options: ["Sinai", "Moriah", "Horeb", "Carmel"], answer: 1 },
  { chapter: 24, question: "Who was Rebekah's brother?", options: ["Haran", "Nahor", "Laban", "Bethuel"], answer: 2 },
  { chapter: 27, question: "Who urged Jacob to deceive Isaac?", options: ["Rachel", "Rebekah", "Leah", "Zilpah"], answer: 1 },
  { chapter: 28, question: "What did Jacob see in his dream?", options: ["Chariot", "Ladder", "Ark", "Temple"], answer: 1 },
  { chapter: 32, question: "With whom did Jacob wrestle?", options: ["Esau", "An angel", "Laban", "A man from Shechem"], answer: 1 },
  { chapter: 37, question: "Who sold Joseph to Ishmaelites?", options: ["Simeon", "Levi", "Judah", "Reuben"], answer: 2 },
  { chapter: 50, question: "What was Joseph's perspective on his brothers' evil?", options: ["Unforgivable", "God meant it for good", "Forgotten", "Punished"], answer: 1 }
];

export default function GenesisIntermediate() {
  return (
    <BibleBookQuiz title="Genesis Intermediate" questions={questions} bookName="Genesis" />
  );
}


