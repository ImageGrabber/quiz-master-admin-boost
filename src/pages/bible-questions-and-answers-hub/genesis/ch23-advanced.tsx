import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 23, question: "What was the other name for Kiriath Arba?", options: ["Mamre", "Hebron", "Machpelah", "Beersheba"], answer: 1 },
  { chapter: 23, question: "What did Abraham do when he rose from beside his dead wife?", options: ["Wept", "Prayed", "Spoke to the Hittites", "Built an altar"], answer: 2 },
  { chapter: 23, question: "What did Abraham say he was among the Hittites?", options: ["A foreigner and stranger", "A sojourner and pilgrim", "A guest and visitor", "A stranger and alien"], answer: 0 },
  { chapter: 23, question: "What did the Hittites offer Abraham first?", options: ["The choicest of their tombs", "A field for free", "The cave of Machpelah", "A burial site"], answer: 0 },
  { chapter: 23, question: "What did Abraham do before the people of the land?", options: ["Bowed down", "Stood up", "Kneeled", "Sat down"], answer: 0 },
  { chapter: 23, question: "What did Abraham want to pay for the cave?", options: ["The full price", "Half price", "Whatever Ephron asked", "A fair price"], answer: 0 },
  { chapter: 23, question: "Where was Ephron sitting when he replied?", options: ["At the gate", "Among his people", "In his house", "In the field"], answer: 1 },
  { chapter: 23, question: "What did Ephron say he was giving to Abraham?", options: ["The field and cave", "The cave only", "The field only", "The trees"], answer: 0 },
  { chapter: 23, question: "What was included in the deed besides the field and cave?", options: ["The trees within the borders", "The water rights", "The mineral rights", "The grazing rights"], answer: 0 },
  { chapter: 23, question: "Where did the transaction take place?", options: ["At the gate of the city", "In the field", "At Ephron's house", "At the cave"], answer: 0 }
];

export default function GenesisCh23Advanced() {
  return <BibleBookQuiz title="Genesis 23 - Advanced" questions={questions} bookName="Genesis" />;
}
