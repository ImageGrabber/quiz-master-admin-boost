import BibleBookQuiz from "../../BibleBookQuiz";

// Use MCQ options to simulate fill-in: include the correct phrase among distractors
const questions = [
  { chapter: 1, question: "In the beginning God created the ______ and the earth.", options: ["heavens", "angels", "stars", "sun"], answer: 0 },
  { chapter: 2, question: "God formed man from the dust of the ______.", options: ["ground", "mountain", "sea", "wilderness"], answer: 0 },
  { chapter: 3, question: "They sewed ______ leaves together.", options: ["olive", "fig", "grape", "palm"], answer: 1 },
  { chapter: 6, question: "Noah was a ______ man, blameless in his generation.", options: ["mighty", "rich", "righteous", "wise"], answer: 2 },
  { chapter: 9, question: "I set my ______ in the cloud.", options: ["crown", "bow", "seal", "sign"], answer: 1 },
  { chapter: 12, question: "Go from your country and your kindred to the ______.", options: ["east", "land I will show you", "mountain", "sea"], answer: 1 },
  { chapter: 15, question: "Abram believed the LORD, and he ______ it to him as righteousness.", options: ["counted", "showed", "gave", "promised"], answer: 0 },
  { chapter: 22, question: "God will provide for himself the ______ for a burnt offering.", options: ["bull", "goat", "lamb", "ram"], answer: 2 },
  { chapter: 28, question: "This is none other than the ______ of God.", options: ["gate", "house", "ladder", "altar"], answer: 1 },
  { chapter: 50, question: "You meant evil against me, but God meant it for ______.", options: ["justice", "mercy", "good", "judgment"], answer: 2 }
];

export default function GenesisFillInTheBlanks() {
  return (
    <BibleBookQuiz title="Genesis Fill in the Blanks" questions={questions} bookName="Genesis" />
  );
}


