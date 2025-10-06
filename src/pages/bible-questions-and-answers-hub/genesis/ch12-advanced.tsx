import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 12, question: "Locale between which Abram pitched his tent?", options: ["Hebron and Zoar", "Bethel and Ai", "Jericho and Shechem", "Dan and Beersheba"], answer: 1 },
  { chapter: 12, question: "What would God do to those who curse Abram?", options: ["Ignore", "Curse", "Bless", "Strike with famine"], answer: 1 },
  { chapter: 12, question: "Name of river associated with later promise bounds", options: ["Euphrates", "Nile", "Jordan", "Tigris"], answer: 0 },
  { chapter: 12, question: "Reason Pharaoh took Sarai", options: ["Trade", "Beauty and Abram’s claim she was his sister", "Treaty", "Payment"], answer: 1 },
  { chapter: 12, question: "How did God intervene in Egypt?", options: ["Dream", "Plagues on Pharaoh", "Angel’s sword", "Earthquake"], answer: 1 },
  { chapter: 12, question: "Abram’s age at departure", options: ["65", "70", "75", "80"], answer: 2 },
  { chapter: 12, question: "Two main promises reiterated", options: ["Temple & king", "Nation & blessing", "Throne & law", "Land & river"], answer: 1 },
  { chapter: 12, question: "Relationship of Sarai to Abram (elsewhere specified)", options: ["Cousin", "Half-sister", "Niece", "Unrelated"], answer: 1 },
  { chapter: 12, question: "Outcome from Pharaoh to Abram", options: ["Imprisoned", "Sent away with possessions", "Executed", "Stayed"], answer: 1 },
  { chapter: 12, question: "Altars built in", options: ["Shechem and Bethel", "Hebron and Dan", "Beersheba and Zoar", "Salem and Jericho"], answer: 0 }
];

export default function GenesisCh12Advanced() {
  return <BibleBookQuiz title="Genesis 12 - Advanced" questions={questions} bookName="Genesis" />;
}


