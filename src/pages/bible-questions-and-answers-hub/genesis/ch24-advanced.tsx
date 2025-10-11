import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 24, question: "What did Abraham make the servant swear by?", options: ["The Lord, God of heaven and earth", "The God of Abraham", "The God of Isaac", "The God of the covenant"], answer: 0 },
  { chapter: 24, question: "What was the servant's specific prayer request?", options: ["A beautiful woman", "A woman who would give him water", "A woman who would water his camels", "A woman from Abraham's family"], answer: 2 },
  { chapter: 24, question: "What was the weight of the gold nose ring?", options: ["Half a shekel", "A beka", "Ten shekels", "One shekel"], answer: 1 },
  { chapter: 24, question: "What was the weight of the two gold bracelets?", options: ["Five shekels", "Ten shekels", "Fifteen shekels", "Twenty shekels"], answer: 1 },
  { chapter: 24, question: "What did the servant do when he realized God had answered his prayer?", options: ["Danced", "Bowed down and worshiped", "Shouted", "Ran to tell everyone"], answer: 1 },
  { chapter: 24, question: "What did Laban say when he saw the gifts?", options: ["Come, you who are blessed by the Lord", "Welcome, friend", "Greetings, traveler", "Peace be with you"], answer: 0 },
  { chapter: 24, question: "What did the servant refuse to do until he told his story?", options: ["Sleep", "Eat", "Drink", "Rest"], answer: 1 },
  { chapter: 24, question: "What did Laban and Bethuel say about the matter?", options: ["We need time to think", "This is from the Lord", "We must consult others", "We need more information"], answer: 1 },
  { chapter: 24, question: "How long did the family want Rebekah to stay before leaving?", options: ["Three days", "Seven days", "Ten days", "Two weeks"], answer: 2 },
  { chapter: 24, question: "Where was Isaac living when the servant returned?", options: ["Beer Lahai Roi", "Beersheba", "Hebron", "Mamre"], answer: 0 }
];

export default function GenesisCh24Advanced() {
  return <BibleBookQuiz title="Genesis 24 - Advanced" questions={questions} bookName="Genesis" />;
}

