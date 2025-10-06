import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 8, question: "Where did the ark rest?", options: ["Sinai", "Ararat", "Carmel", "Zion"], answer: 1 },
  { chapter: 8, question: "Which bird did Noah send first?", options: ["Dove", "Raven", "Eagle", "Sparrow"], answer: 1 },
  { chapter: 8, question: "What leaf did the dove bring back?", options: ["Fig", "Olive", "Vine", "Palm"], answer: 1 },
  { chapter: 8, question: "What did Noah build after leaving the ark?", options: ["Tower", "Altar", "House", "City"], answer: 1 },
  { chapter: 8, question: "God’s promise after the flood", options: ["No more rain", "Never again destroy all life by flood", "No more storms", "No more winter"], answer: 1 },
  { chapter: 8, question: "What happened to the waters?", options: ["Prevailed", "Receded steadily", "Stood still", "Boiled"], answer: 1 },
  { chapter: 8, question: "How many times was the dove sent?", options: ["Once", "Twice", "Thrice", "Four times"], answer: 2 },
  { chapter: 8, question: "What did the pleasing aroma cause?", options: ["Judgment", "Covenant promise", "Fire", "Silence"], answer: 1 },
  { chapter: 8, question: "Which seasons will not cease?", options: ["Planting only", "Summer only", "Seedtime and harvest, cold and heat, summer and winter", "None"], answer: 2 },
  { chapter: 8, question: "Who left the ark with Noah?", options: ["Only sons", "Family and animals", "Angels", "Kings"], answer: 1 }
];

export default function GenesisCh8Beginner() {
  return <BibleBookQuiz title="Genesis 8 - Beginner" questions={questions} bookName="Genesis" />;
}


