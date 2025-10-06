import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 9, question: "Hebrew for covenant sign", options: ["Berith", "Qeshet (bow/rainbow)", "Tamim", "Torah"], answer: 1 },
  { chapter: 9, question: "Who is specifically cursed?", options: ["Ham", "Canaan", "Shem", "Japheth"], answer: 1 },
  { chapter: 9, question: "What posture did Shem and Japheth take?", options: ["Forward", "Backward with garment", "Kneeling", "Running"], answer: 1 },
  { chapter: 9, question: "To whom is God’s bow set as a reminder?", options: ["To Noah only", "To God to remember", "To angels", "To animals"], answer: 1 },
  { chapter: 9, question: "What is required for shedding human blood?", options: ["Temple offering", "Capital accountability", "Sevenfold repayment", "Exile"], answer: 1 },
  { chapter: 9, question: "Who shall dwell in the tents of Shem?", options: ["Canaan", "Japheth", "Ham", "Ishmael"], answer: 1 },
  { chapter: 9, question: "Noah’s occupation after the flood", options: ["Shepherd", "Man of the soil/vineyard", "Fisherman", "Hunter"], answer: 1 },
  { chapter: 9, question: "Years Noah lived after the flood", options: ["120", "200", "350", "400"], answer: 2 },
  { chapter: 9, question: "Food concession granted", options: ["Only grains", "Every moving thing (without blood)", "Only clean animals", "Only fish"], answer: 1 },
  { chapter: 9, question: "Which sons are named in blessing/curse?", options: ["Shem & Japheth blessed; Canaan cursed", "Ham & Shem blessed", "Japheth & Canaan blessed", "All cursed"], answer: 0 }
];

export default function GenesisCh9Advanced() {
  return <BibleBookQuiz title="Genesis 9 - Advanced" questions={questions} bookName="Genesis" />;
}


