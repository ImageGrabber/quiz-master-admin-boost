import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 24, question: "Who did Abraham send to find a wife for Isaac?", options: ["His son", "His senior servant", "His brother", "His friend"], answer: 1 },
  { chapter: 24, question: "Where was the servant supposed to go?", options: ["Canaan", "Egypt", "Abraham's country and relatives", "Sodom"], answer: 2 },
  { chapter: 24, question: "How many camels did the servant take?", options: ["Five", "Ten", "Fifteen", "Twenty"], answer: 1 },
  { chapter: 24, question: "What was the name of the town where the servant went?", options: ["Beersheba", "Nahor", "Hebron", "Mamre"], answer: 1 },
  { chapter: 24, question: "What was Rebekah's father's name?", options: ["Nahor", "Bethuel", "Laban", "Milkah"], answer: 1 },
  { chapter: 24, question: "What did the servant ask Rebekah for?", options: ["Food", "Water", "Shelter", "Directions"], answer: 1 },
  { chapter: 24, question: "What did Rebekah offer to do for the camels?", options: ["Feed them", "Water them", "Ride them", "Groom them"], answer: 1 },
  { chapter: 24, question: "What gifts did the servant give Rebekah?", options: ["Gold ring and bracelets", "Silver coins", "Clothing", "Jewelry"], answer: 0 },
  { chapter: 24, question: "Who was Rebekah's brother?", options: ["Bethuel", "Nahor", "Laban", "Milkah"], answer: 2 },
  { chapter: 24, question: "What did Isaac do when he saw the camels?", options: ["Ran away", "Went out to meet them", "Hid", "Prayed"], answer: 1 }
];

export default function GenesisCh24Beginner() {
  return <BibleBookQuiz title="Genesis 24 - Beginner" questions={questions} bookName="Genesis" />;
}

