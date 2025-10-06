import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 2, question: "Where did God plant a garden?", options: ["Hebron", "Eden", "Babel", "Bethel"], answer: 1 },
  { chapter: 2, question: "From what was man formed?", options: ["Clay", "Dust of the ground", "Stone", "Water"], answer: 1 },
  { chapter: 2, question: "What tree were Adam and Eve forbidden to eat?", options: ["Tree of life", "Fig tree", "Tree of knowledge of good and evil", "Olive tree"], answer: 2 },
  { chapter: 2, question: "Eve was made from Adam's...", options: ["Head", "Foot", "Rib", "Heart"], answer: 2 },
  { chapter: 2, question: "What river split into four?", options: ["Jordan", "Eden's river", "Nile", "Euphrates"], answer: 1 }
];

export default function GenesisCh2Beginner() {
  return (
    <BibleBookQuiz title="Genesis 2 - Beginner" questions={questions} bookName="Genesis" />
  );
}


