import BibleBookQuiz from "../../BibleBookQuiz";

// Represent True/False as two options, index 0 = True, 1 = False
const questions = [
  { chapter: 1, question: "God created humans in His image.", options: ["True", "False"], answer: 0 },
  { chapter: 2, question: "Eve was created before Adam.", options: ["True", "False"], answer: 1 },
  { chapter: 3, question: "The serpent told the truth to Eve.", options: ["True", "False"], answer: 1 },
  { chapter: 6, question: "Noah was a righteous man.", options: ["True", "False"], answer: 0 },
  { chapter: 7, question: "It rained for 20 days and nights.", options: ["True", "False"], answer: 1 },
  { chapter: 9, question: "The rainbow was a sign of God's covenant with Noah.", options: ["True", "False"], answer: 0 },
  { chapter: 12, question: "Abram stayed in Ur and never moved to Canaan.", options: ["True", "False"], answer: 1 },
  { chapter: 17, question: "Circumcision was given as a covenant sign to Abraham.", options: ["True", "False"], answer: 0 },
  { chapter: 22, question: "God provided a ram instead of Isaac.", options: ["True", "False"], answer: 0 },
  { chapter: 37, question: "Joseph was the firstborn of Jacob.", options: ["True", "False"], answer: 1 }
];

export default function GenesisTrueFalse() {
  return (
    <BibleBookQuiz title="Genesis True / False" questions={questions} bookName="Genesis" />
  );
}


