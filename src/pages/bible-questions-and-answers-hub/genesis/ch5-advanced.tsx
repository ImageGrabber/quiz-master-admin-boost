import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 5, question: "Formula 'This is the book of the generations of Adam' echoes which later phrase?", options: ["Book of life", "Generations formula (toledot)", "Chronicles preface", "Exodus genealogy"], answer: 1 },
  { chapter: 5, question: "Which name's meaning aligns with 'his death shall bring' in some traditions?", options: ["Seth", "Enos", "Methuselah", "Lamech"], answer: 2 },
  { chapter: 5, question: "Which patriarch lived the second-longest after Methuselah?", options: ["Jared", "Noah", "Adam", "Lamech"], answer: 0 },
  { chapter: 5, question: "Which verse states 'and he was not, for God took him'?", options: ["5:21", "5:22", "5:24", "5:27"], answer: 2 },
  { chapter: 5, question: "Which theme contrasts with chapter 4's line of Cain?", options: ["Violence", "City-building", "Worship", "Hope through Seth's line"], answer: 3 }
];

export default function GenesisCh5Advanced() {
  return (
    <BibleBookQuiz title="Genesis 5 - Advanced" questions={questions} bookName="Genesis" />
  );
}


