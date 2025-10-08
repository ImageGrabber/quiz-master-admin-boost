import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 18, question: "Where was Abraham sitting when the visitors came?", options: ["In his tent", "At the door of his tent", "Under a tree", "By the well"], answer: 1 },
  { chapter: 18, question: "What did Abraham offer the visitors?", options: ["Gold and silver", "Bread and water", "A little food", "A feast"], answer: 2 },
  { chapter: 18, question: "What did Sarah do when she heard she would have a son?", options: ["Cried", "Laughed to herself", "Prayed", "Sang"], answer: 1 },
  { chapter: 18, question: "What did the Lord say about Sarah's laughter?", options: ["It was good", "It was wrong", "Is anything too hard for the Lord?", "She should not laugh"], answer: 2 },
  { chapter: 18, question: "What did Abraham do for Sodom?", options: ["Warned them", "Prayed for them", "Interceded for them", "Blessed them"], answer: 2 },
  { chapter: 18, question: "How many righteous people did Abraham start with?", options: ["50", "45", "40", "30"], answer: 0 },
  { chapter: 18, question: "What was the final number Abraham asked for?", options: ["10", "5", "3", "1"], answer: 0 },
  { chapter: 18, question: "What did the Lord say He would do for 10 righteous?", options: ["Bless the city", "Spare the city", "Destroy the city", "Move the city"], answer: 1 },
  { chapter: 18, question: "What did Abraham do after the conversation?", options: ["Built an altar", "Returned to his tent", "Went to Sodom", "Prayed"], answer: 1 },
  { chapter: 18, question: "What did Abraham say about himself?", options: ["I am dust and ashes", "I am nothing", "I am unworthy", "I am a sinner"], answer: 0 }
];

export default function GenesisCh18Advanced() {
  return <BibleBookQuiz title="Genesis 18 - Advanced" questions={questions} bookName="Genesis" />;
}
