import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 2, question: "Who was formed from Adam's rib?", options: ["Leah", "Rachel", "Eve", "Sarah"], answer: 2 },
  { chapter: 4, question: "Who killed his brother?", options: ["Lamech", "Cain", "Seth", "Enoch"], answer: 1 },
  { chapter: 5, question: "Who walked with God and was taken?", options: ["Noah", "Enoch", "Methuselah", "Jared"], answer: 1 },
  { chapter: 6, question: "Who found favor in the eyes of the Lord?", options: ["Noah", "Lot", "Abraham", "Isaac"], answer: 0 },
  { chapter: 11, question: "Who was Abram's father?", options: ["Nahor", "Haran", "Terah", "Serug"], answer: 2 },
  { chapter: 12, question: "Who accompanied Abram to Canaan?", options: ["Eliezer", "Lot", "Ishmael", "Benjamin"], answer: 1 },
  { chapter: 16, question: "Who was the mother of Ishmael?", options: ["Rebekah", "Hagar", "Sarah", "Keturah"], answer: 1 },
  { chapter: 24, question: "Who became Isaac's wife?", options: ["Rachel", "Leah", "Rebekah", "Zilpah"], answer: 2 },
  { chapter: 29, question: "Who was Jacob's first wife?", options: ["Leah", "Rachel", "Bilhah", "Zilpah"], answer: 0 },
  { chapter: 41, question: "Who interpreted Pharaoh's dreams?", options: ["Moses", "Daniel", "Joseph", "Samuel"], answer: 2 }
];

export default function GenesisCharacters() {
  return (
    <BibleBookQuiz title="Genesis Characters" questions={questions} bookName="Genesis" />
  );
}


