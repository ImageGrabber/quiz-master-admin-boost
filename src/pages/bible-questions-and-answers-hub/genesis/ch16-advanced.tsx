import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 16, question: "What was Hagar's nationality?", options: ["Egyptian", "Canaanite", "Amorite", "Hittite"], answer: 0 },
  { chapter: 16, question: "What did Sarai give to Abram?", options: ["Gold", "Silver", "Hagar her Egyptian maidservant", "Land"], answer: 2 },
  { chapter: 16, question: "What happened when Hagar became pregnant?", options: ["She was happy", "She despised her mistress", "She left", "She died"], answer: 1 },
  { chapter: 16, question: "What did Sarai do to Hagar?", options: ["Blessed her", "Mistreated her", "Freed her", "Married her"], answer: 1 },
  { chapter: 16, question: "What did Hagar do?", options: ["Fought back", "Fled from her", "Cried", "Prayed"], answer: 1 },
  { chapter: 16, question: "Where did the angel find Hagar?", options: ["In the desert", "By a spring", "In a cave", "Under a tree"], answer: 1 },
  { chapter: 16, question: "What did the angel tell Hagar to do?", options: ["Stay where she was", "Go back to your mistress", "Go to Egypt", "Go to Canaan"], answer: 1 },
  { chapter: 16, question: "What did the angel promise about her son?", options: ["He would be a king", "He would have many descendants", "He would be a prophet", "He would be a priest"], answer: 1 },
  { chapter: 16, question: "What did Hagar name the spring?", options: ["Spring of Life", "Well of Living Water", "Beer Lahai Roi", "Fountain of Hope"], answer: 2 },
  { chapter: 16, question: "What did Abram name his son?", options: ["Isaac", "Ishmael", "Jacob", "Esau"], answer: 1 }
];

export default function GenesisCh16Advanced() {
  return <BibleBookQuiz title="Genesis 16 - Advanced" questions={questions} bookName="Genesis" />;
}
