import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 7, question: "How many days after entering did the floodwaters come?", options: ["Immediately", "After 3 days", "After 7 days", "After 40 days"], answer: 2 },
  { chapter: 7, question: "Month and day the fountains burst?", options: ["2nd month, 17th day", "1st month, 1st day", "7th month, 10th day", "12th month, 25th day"], answer: 0 },
  { chapter: 7, question: "Depth of waters above mountains (in cubits)", options: ["5", "10", "15", "20"], answer: 2 },
  { chapter: 7, question: "Which kinds were by sevens?", options: ["Only birds", "Clean animals and birds", "All animals", "Only livestock"], answer: 1 },
  { chapter: 7, question: "Who shut the door of the ark?", options: ["Noah", "Shem", "God", "Angel"], answer: 2 },
  { chapter: 7, question: "Duration waters prevailed before beginning to abate", options: ["120 days", "150 days", "300 days", "365 days"], answer: 1 },
  { chapter: 7, question: "Total humans on ark", options: ["6", "7", "8", "9"], answer: 2 },
  { chapter: 7, question: "Main reason given for the flood in this chapter", options: ["Idolatry", "Corruption and violence", "Lack of worship", "Kings"], answer: 1 },
  { chapter: 7, question: "How long were the windows of heaven opened?", options: ["30 days", "40 days", "60 days", "Unknown"], answer: 1 },
  { chapter: 7, question: "All flesh outside the ark", options: ["Survived", "Perished", "Migrated", "Hid"], answer: 1 }
];

export default function GenesisCh7Advanced() {
  return <BibleBookQuiz title="Genesis 7 - Advanced" questions={questions} bookName="Genesis" />;
}


