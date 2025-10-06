import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "The Hebrew term 'bara' appears in which verse of Genesis 1?", options: ["1:1", "1:2", "1:3", "1:4"], answer: 0, explanation: "Genesis 1:1 — 'In the beginning God created (bara) the heavens and the earth.'" },
  { chapter: 1, question: "What separated the waters above from the waters below?", options: ["Dry land", "Firmament/expanse", "Wind", "Mountains"], answer: 1, explanation: "Genesis 1:6-7 — God made the expanse and separated the waters." },
  { chapter: 1, question: "According to the text, the greater light was to rule the...", options: ["Times", "Years", "Day", "Seasons"], answer: 2, explanation: "Genesis 1:16 — The greater light to rule the day, and the lesser light to rule the night." },
  { chapter: 1, question: "What blessing accompanies sea creatures and birds?", options: ["Fill the earth", "Multiply and fill the waters/earth", "Subdue the land", "Rule the animals"], answer: 1, explanation: "Genesis 1:22 — 'Be fruitful and multiply and fill the waters... and let birds multiply.'" },
  { chapter: 1, question: "Which verse explicitly states mankind was created male and female?", options: ["1:26", "1:27", "1:28", "1:31"], answer: 1, explanation: "Genesis 1:27 — 'Male and female he created them.'" }
];

export default function GenesisCh1Advanced() {
  return (
    <BibleBookQuiz title="Genesis 1 - Advanced" questions={questions} bookName="Genesis" />
  );
}


