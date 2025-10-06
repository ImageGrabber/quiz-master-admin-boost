import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 12, question: "Who was called to leave his country?", options: ["Isaac", "Abram", "Jacob", "Joseph"], answer: 1 },
  { chapter: 12, question: "Age of Abram when he departed?", options: ["65", "70", "75", "80"], answer: 2 },
  { chapter: 12, question: "Promise included", options: ["A temple", "A great nation and blessing", "A king", "A city"], answer: 1 },
  { chapter: 12, question: "With whom did Abram travel?", options: ["Eliezer", "Lot", "Ishmael", "Benjamin"], answer: 1 },
  { chapter: 12, question: "Where did Abram build an altar?", options: ["Bethel", "Hebron", "Moab", "Zoar"], answer: 0 },
  { chapter: 12, question: "Where did he go during the famine?", options: ["Assyria", "Egypt", "Philistia", "Moab"], answer: 1 },
  { chapter: 12, question: "What did Abram say Sarai was?", options: ["Sister", "Mother", "Daughter", "Servant"], answer: 0 },
  { chapter: 12, question: "What happened to Pharaoh's house?", options: ["Blessed", "Plagues", "Fire", "Exile"], answer: 1 },
  { chapter: 12, question: "Outcome with Pharaoh?", options: ["Abram imprisoned", "Abram sent away with possessions", "Sarai stayed", "They fought"], answer: 1 },
  { chapter: 12, question: "Destination shown by God", options: ["Canaan", "Babylon", "Syria", "Midian"], answer: 0 }
];

export default function GenesisCh12Beginner() {
  return <BibleBookQuiz title="Genesis 12 - Beginner" questions={questions} bookName="Genesis" />;
}


