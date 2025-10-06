import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 12, question: "Abram left Haran at age...", options: ["65", "70", "75", "80"], answer: 2 },
  { chapter: 13, question: "Lot chose the...", options: ["Hills of Hebron", "Plain of Jordan", "Negev", "Coast"], answer: 1 },
  { chapter: 14, question: "Priest-king who blessed Abram", options: ["Abimelech", "Melchizedek", "Pharaoh", "Bera"], answer: 1 },
  { chapter: 15, question: "Counted as righteousness", options: ["Law", "Faith", "Circumcision", "Offerings"], answer: 1 },
  { chapter: 16, question: "Hagar's son", options: ["Ishmael", "Isaac", "Esau", "Jacob"], answer: 0 },
  { chapter: 17, question: "Covenant sign to Abraham", options: ["Rainbow", "Circumcision", "Altar", "Sabbath"], answer: 1 },
  { chapter: 18, question: "Interceded for Sodom", options: ["Lot", "Abraham", "Isaac", "Moses"], answer: 1 },
  { chapter: 19, question: "Lot's wife became...", options: ["Ash", "Stone", "Pillar of salt", "Sand"], answer: 2 },
  { chapter: 21, question: "Age of Abraham at Isaac's birth", options: ["86", "90", "99", "100"], answer: 3 },
  { chapter: 22, question: "Substitute for Isaac", options: ["Ram", "Goat", "Bull", "Lamb"], answer: 0 }
];

export default function GenesisCh12to25() {
  return (
    <BibleBookQuiz title="Genesis 12–25" questions={questions} bookName="Genesis" />
  );
}


