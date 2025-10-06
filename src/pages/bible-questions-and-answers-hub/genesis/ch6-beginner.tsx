import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 6, question: "Why did God decide to send the flood?", options: ["Idolatry", "Violence and wickedness", "Famine", "Kings"], answer: 1 },
  { chapter: 6, question: "Who found favor in the eyes of the Lord?", options: ["Lamech", "Shem", "Noah", "Enoch"], answer: 2 },
  { chapter: 6, question: "What was Noah instructed to build?", options: ["Temple", "Tower", "Ark", "Altar"], answer: 2 },
  { chapter: 6, question: "What wood was specified for the ark?", options: ["Cedar", "Gopher", "Acacia", "Pine"], answer: 1 },
  { chapter: 6, question: "How many decks did the ark have?", options: ["One", "Two", "Three", "Four"], answer: 2 },
  { chapter: 6, question: "Noah was described as", options: ["King", "Blameless in his generation", "Priest", "Warrior"], answer: 1 },
  { chapter: 6, question: "What covered the ark inside and out?", options: ["Clay", "Tar/pitch", "Gold", "Stone"], answer: 1 },
  { chapter: 6, question: "With whom did God establish His covenant?", options: ["Abraham", "Noah", "Jacob", "Moses"], answer: 1 },
  { chapter: 6, question: "Who was to enter the ark with Noah?", options: ["Only Noah", "Noah's family and animals", "The whole city", "Only birds"], answer: 1 },
  { chapter: 6, question: "What creatures were to be brought to keep alive?", options: ["Only clean animals", "Only birds", "Every kind of living thing", "Only fish"], answer: 2 }
];

export default function GenesisCh6Beginner() {
  return <BibleBookQuiz title="Genesis 6 - Beginner" questions={questions} bookName="Genesis" />;
}


