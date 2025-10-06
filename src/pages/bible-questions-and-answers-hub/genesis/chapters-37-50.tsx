import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 37, question: "Whose dreams foretold greatness?", options: ["Reuben", "Judah", "Joseph", "Benjamin"], answer: 2 },
  { chapter: 39, question: "Who falsely accused Joseph?", options: ["Pharaoh", "Potiphar's wife", "Cupbearer", "Baker"], answer: 1 },
  { chapter: 40, question: "Whose dream interpretation led to freedom?", options: ["Cupbearer", "Baker", "Both", "Neither"], answer: 0 },
  { chapter: 41, question: "How many years of plenty then famine?", options: ["3 & 3", "5 & 5", "7 & 7", "10 & 10"], answer: 2 },
  { chapter: 42, question: "Which brother stayed in Egypt first?", options: ["Levi", "Simeon", "Reuben", "Judah"], answer: 1 },
  { chapter: 44, question: "Who pleaded for Benjamin?", options: ["Reuben", "Judah", "Levi", "Issachar"], answer: 1 },
  { chapter: 45, question: "Joseph revealed himself in...", options: ["Canaan", "Goshen", "Egypt", "Hebron"], answer: 2 },
  { chapter: 46, question: "Jacob moved to...", options: ["Moab", "Goshen", "Philistia", "Edom"], answer: 1 },
  { chapter: 49, question: "Tribe with scepter promise", options: ["Reuben", "Levi", "Judah", "Joseph"], answer: 2 },
  { chapter: 50, question: "Joseph's statement about evil", options: ["Forgotten", "Punished", "God meant it for good", "Excused"], answer: 2 }
];

export default function GenesisCh37to50() {
  return (
    <BibleBookQuiz title="Genesis 37–50" questions={questions} bookName="Genesis" />
  );
}


