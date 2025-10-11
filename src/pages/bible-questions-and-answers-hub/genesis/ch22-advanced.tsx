import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 22, question: "On which day did Abraham see the place in the distance?", options: ["First day", "Second day", "Third day", "Fourth day"], answer: 2 },
  { chapter: 22, question: "What did Abraham tell his servants they would do?", options: ["Sacrifice and return", "Worship and return", "Pray and return", "Build and return"], answer: 1 },
  { chapter: 22, question: "What did Abraham carry himself?", options: ["The wood and knife", "The fire and knife", "The wood and fire", "The knife and water"], answer: 1 },
  { chapter: 22, question: "What did Abraham say when Isaac asked about the lamb?", options: ["God will provide a lamb", "God himself will provide the lamb", "The Lord will provide", "I will find a lamb"], answer: 1 },
  { chapter: 22, question: "How was the ram caught?", options: ["By its legs", "By its horns", "By its neck", "By its tail"], answer: 1 },
  { chapter: 22, question: "What did the angel say Abraham had not withheld?", options: ["His only son", "His beloved son", "His firstborn son", "His precious son"], answer: 0 },
  { chapter: 22, question: "What did God promise Abraham's descendants would be like?", options: ["Stars in the sky", "Sand on the seashore", "Both stars and sand", "Dust of the earth"], answer: 2 },
  { chapter: 22, question: "How many sons did Milkah bear to Nahor?", options: ["Six", "Seven", "Eight", "Nine"], answer: 2 },
  { chapter: 22, question: "What was the name of Nahor's concubine?", options: ["Milkah", "Rebekah", "Reumah", "Sarah"], answer: 2 },
  { chapter: 22, question: "How many sons did Reumah have?", options: ["Three", "Four", "Five", "Six"], answer: 1 }
];

export default function GenesisCh22Advanced() {
  return <BibleBookQuiz title="Genesis 22 - Advanced" questions={questions} bookName="Genesis" />;
}
