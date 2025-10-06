import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 8, question: "Month and day the ark rested", options: ["5th month, 10th day", "7th month, 17th day", "8th month, 1st day", "10th month, 1st day"], answer: 1 },
  { chapter: 8, question: "Sequence of birds sent", options: ["Dove then raven", "Raven then dove", "Eagle then dove", "Sparrow then raven"], answer: 1 },
  { chapter: 8, question: "What did Noah do between dove sendings?", options: ["Three days", "Seven days", "Ten days", "Twelve days"], answer: 1 },
  { chapter: 8, question: "When were mountaintops seen?", options: ["3rd month", "5th month", "7th month", "10th month, 1st day"], answer: 3 },
  { chapter: 8, question: "After leaving the ark, animals were to", options: ["Stay nearby", "Be fruitful and multiply", "Return to the ark", "Be sacrificed"], answer: 1 },
  { chapter: 8, question: "The Lord smelled the", options: ["Incense", "Pleasing aroma", "Smoke", "Spices"], answer: 1 },
  { chapter: 8, question: "Promise given included not ceasing of", options: ["Rain", "Seasons and cycles", "Stars", "Moon"], answer: 1 },
  { chapter: 8, question: "Noah's altar used", options: ["Unclean animals", "Clean animals and birds", "Only incense", "Only grain"], answer: 1 },
  { chapter: 8, question: "Who remembered Noah?", options: ["Angel", "God", "Pharaoh", "Abraham"], answer: 1 },
  { chapter: 8, question: "What caused waters to subside?", options: ["Strong wind from God", "Sun", "Moon", "Stars"], answer: 0 }
];

export default function GenesisCh8Advanced() {
  return <BibleBookQuiz title="Genesis 8 - Advanced" questions={questions} bookName="Genesis" />;
}


