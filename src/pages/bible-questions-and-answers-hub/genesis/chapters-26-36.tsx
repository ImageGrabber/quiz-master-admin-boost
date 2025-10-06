import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 26, question: "Who repeated Abraham's lie about his wife?", options: ["Isaac", "Jacob", "Esau", "Lot"], answer: 0 },
  { chapter: 27, question: "Who helped Jacob obtain the blessing?", options: ["Rachel", "Rebekah", "Leah", "Zilpah"], answer: 1 },
  { chapter: 28, question: "What did Jacob see in his dream?", options: ["Chariot", "Ladder", "Temple", "River"], answer: 1 },
  { chapter: 29, question: "Who was Jacob tricked into marrying first?", options: ["Rachel", "Leah", "Zilpah", "Bilhah"], answer: 1 },
  { chapter: 30, question: "Jacob's wages became...", options: ["Gold", "Spotted and speckled flocks", "Land", "Tents"], answer: 1 },
  { chapter: 31, question: "Laban pursued Jacob because...", options: ["Idols stolen", "Lost sheep", "Taxes", "War"], answer: 0 },
  { chapter: 32, question: "Jacob wrestled with...", options: ["Esau", "An angel", "A priest", "A stranger"], answer: 1 },
  { chapter: 33, question: "Jacob met Esau at...", options: ["Bethel", "Succoth", "Shechem", "Hebron"], answer: 1 },
  { chapter: 34, question: "Dinah's incident occurred at...", options: ["Hebron", "Bethel", "Shechem", "Beersheba"], answer: 2 },
  { chapter: 35, question: "Jacob renamed to...", options: ["Judah", "Israel", "Joseph", "Benjamin"], answer: 1 }
];

export default function GenesisCh26to36() {
  return (
    <BibleBookQuiz title="Genesis 26–36" questions={questions} bookName="Genesis" />
  );
}


