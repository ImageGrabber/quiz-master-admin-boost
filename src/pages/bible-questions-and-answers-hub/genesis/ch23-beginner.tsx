import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 23, question: "How old was Sarah when she died?", options: ["120", "125", "127", "130"], answer: 2 },
  { chapter: 23, question: "Where did Sarah die?", options: ["Beersheba", "Hebron", "Mamre", "Gerar"], answer: 1 },
  { chapter: 23, question: "Who did Abraham speak to about buying land?", options: ["Canaanites", "Hittites", "Amorites", "Philistines"], answer: 1 },
  { chapter: 23, question: "What did Abraham call himself?", options: ["A prince", "A foreigner and stranger", "A sojourner", "A pilgrim"], answer: 1 },
  { chapter: 23, question: "What did the Hittites call Abraham?", options: ["A mighty prince", "A great man", "A noble lord", "A wise elder"], answer: 0 },
  { chapter: 23, question: "Who was the owner of the cave of Machpelah?", options: ["Zohar", "Ephron", "Mamre", "Hebron"], answer: 1 },
  { chapter: 23, question: "What was Ephron's father's name?", options: ["Zohar", "Mamre", "Hebron", "Machpelah"], answer: 0 },
  { chapter: 23, question: "How much did Abraham pay for the field?", options: ["300 shekels", "400 shekels", "500 shekels", "600 shekels"], answer: 1 },
  { chapter: 23, question: "What was the name of the cave?", options: ["Machpelah", "Mamre", "Hebron", "Zohar"], answer: 0 },
  { chapter: 23, question: "Where was the cave located?", options: ["Near Beersheba", "Near Mamre", "Near Gerar", "Near Sodom"], answer: 1 }
];

export default function GenesisCh23Beginner() {
  return <BibleBookQuiz title="Genesis 23 - Beginner" questions={questions} bookName="Genesis" />;
}

