import BibleBookQuiz from "../../BibleBookQuiz";

// Simulate "match the following" by asking direct pair questions as MCQs
const questions = [
  { chapter: 2, question: "Match: Adam —", options: ["King of Salem", "First man", "Father of faith", "Interpreter of dreams"], answer: 1 },
  { chapter: 14, question: "Match: Melchizedek —", options: ["Priest-king of Salem", "Egyptian ruler", "Prophet of Nineveh", "Esau's son"], answer: 0 },
  { chapter: 16, question: "Match: Hagar —", options: ["Jacob's wife", "Ishmael's mother", "Noah's wife", "Abraham's nephew"], answer: 1 },
  { chapter: 22, question: "Match: Moriah —", options: ["Jacob's dream", "Abraham's sacrifice site", "Joseph's prison", "Eden's river"], answer: 1 },
  { chapter: 28, question: "Match: Bethel —", options: ["City of palms", "House of God", "Tower of confusion", "City of David"], answer: 1 },
  { chapter: 29, question: "Match: Leah —", options: ["Jacob's first wife", "Isaac's wife", "Noah's wife", "Esau's wife"], answer: 0 },
  { chapter: 37, question: "Match: Coat of many colors —", options: ["Benjamin", "Reuben", "Joseph", "Judah"], answer: 2 },
  { chapter: 39, question: "Match: Potiphar —", options: ["Pharaoh's cupbearer", "Captain of the guard", "Chief baker", "High priest"], answer: 1 },
  { chapter: 41, question: "Match: Seven lean cows —", options: ["Seven years of famine", "Seven days of rain", "Seven years of plenty", "Seven plagues"], answer: 0 },
  { chapter: 50, question: "Match: 'God meant it for good' —", options: ["Noah", "Joseph", "Abraham", "Jacob"], answer: 1 }
];

export default function GenesisMatchFollowing() {
  return (
    <BibleBookQuiz title="Genesis Match the Following" questions={questions} bookName="Genesis" />
  );
}


