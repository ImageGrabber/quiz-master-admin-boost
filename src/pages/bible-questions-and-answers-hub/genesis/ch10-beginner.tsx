import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 10, question: "What is Genesis 10 often called?", options: ["Book of Kings", "Table of Nations", "Law of Moses", "Songs"], answer: 1 },
  { chapter: 10, question: "Who was a mighty hunter before the Lord?", options: ["Ham", "Cush", "Nimrod", "Japheth"], answer: 2 },
  { chapter: 10, question: "From which son came maritime peoples?", options: ["Shem", "Ham", "Japheth", "Canaan"], answer: 2 },
  { chapter: 10, question: "Nimrod’s kingdom began with", options: ["Ur", "Babel", "Haran", "Gaza"], answer: 1 },
  { chapter: 10, question: "Who were the sons of Noah?", options: ["Cain, Abel, Seth", "Shem, Ham, Japheth", "Esau, Jacob, Joseph", "Peleg, Joktan, Sheba"], answer: 1 },
  { chapter: 10, question: "Peleg’s days noted because", options: ["He lived long", "Earth was divided", "He was a king", "He built a tower"], answer: 1 },
  { chapter: 10, question: "Canaan fathered", options: ["Nineveh", "Sidon", "Jerusalem", "Shinar"], answer: 1 },
  { chapter: 10, question: "Mizraim is associated with", options: ["Egypt", "Assyria", "Edom", "Moab"], answer: 0 },
  { chapter: 10, question: "Asshur went out and built", options: ["Nineveh", "Tyre", "Damascus", "Hebron"], answer: 0 },
  { chapter: 10, question: "The descendants spread by", options: ["Languages, clans, nations", "Votes", "Wars", "Trade"], answer: 0 }
];

export default function GenesisCh10Beginner() {
  return <BibleBookQuiz title="Genesis 10 - Beginner" questions={questions} bookName="Genesis" />;
}


