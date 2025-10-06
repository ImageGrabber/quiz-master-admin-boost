import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 10, question: "Meaning of Peleg's note", options: ["Division of earth", "Flood ended", "Temple built", "Language unified"], answer: 0 },
  { chapter: 10, question: "Lineage of Nimrod", options: ["From Shem", "From Ham through Cush", "From Japheth", "From Canaan"], answer: 1 },
  { chapter: 10, question: "Cities of Nimrod in Shinar", options: ["Ur and Haran", "Babel, Erech, Accad, Calneh", "Nineveh and Rehoboth", "Damascus and Tyre"], answer: 1 },
  { chapter: 10, question: "Who built Nineveh?", options: ["Asshur", "Nimrod", "Sidon", "Peleg"], answer: 0 },
  { chapter: 10, question: "Who is Mizraim identified with?", options: ["Assyria", "Egypt", "Moab", "Edom"], answer: 1 },
  { chapter: 10, question: "Joktan fathered many sons dwelling toward", options: ["Egypt", "Sephar, the hill country of the east", "Canaan", "Shinar"], answer: 1 },
  { chapter: 10, question: "Sidon is firstborn of", options: ["Cush", "Canaan", "Japheth", "Shem"], answer: 1 },
  { chapter: 10, question: "Phrase repeated in the chapter", options: ["And he died", "According to their languages, clans, and nations", "And they reigned", "And they fought"], answer: 1 },
  { chapter: 10, question: "Who are the maritime peoples?", options: ["From Shem", "From Japheth", "From Ham", "From Canaan"], answer: 1 },
  { chapter: 10, question: "Land of Shinar refers to", options: ["Egypt", "Mesopotamia (Babylonia)", "Canaan", "Arabia"], answer: 1 }
];

export default function GenesisCh10Advanced() {
  return <BibleBookQuiz title="Genesis 10 - Advanced" questions={questions} bookName="Genesis" />;
}


