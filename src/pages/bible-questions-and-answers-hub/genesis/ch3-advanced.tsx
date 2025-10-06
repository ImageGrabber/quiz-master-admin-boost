import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 3, question: "Protoevangelium refers to which verse?", options: ["3:14", "3:15", "3:16", "3:21"], answer: 1 },
  { chapter: 3, question: "What did God make for Adam and his wife?", options: ["Fig garments", "Leather tunics", "Wool cloaks", "Linen robes"], answer: 1 },
  { chapter: 3, question: "Whose head would be bruised according to the promise?", options: ["The woman's", "The serpent's", "The man's", "The child's"], answer: 1 },
  { chapter: 3, question: "The tree of life was guarded by...", options: ["Seraphim", "Cherubim and a flaming sword", "An angel", "A prophet"], answer: 1 },
  { chapter: 3, question: "Adam named his wife 'Eve' because she was...", options: ["Mother of all living", "Helper suitable", "Beautiful", "Life giver of Adam"], answer: 0 }
];

export default function GenesisCh3Advanced() {
  return (
    <BibleBookQuiz title="Genesis 3 - Advanced" questions={questions} bookName="Genesis" />
  );
}


