import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 14, question: "What happened to Lot?", options: ["He died", "He was taken captive", "He moved away", "He got sick"], answer: 1 },
  { chapter: 14, question: "How many men did Abram take?", options: ["100", "200", "318", "500"], answer: 2 },
  { chapter: 14, question: "Who was Melchizedek?", options: ["A king", "A priest", "A priest-king", "A prophet"], answer: 2 },
  { chapter: 14, question: "What did Abram give Melchizedek?", options: ["Gold", "Silver", "A tenth of everything", "His sword"], answer: 2 },
  { chapter: 14, question: "What did Melchizedek bring?", options: ["Gold and silver", "Bread and wine", "Meat and water", "Clothes and shoes"], answer: 1 },
  { chapter: 14, question: "What did Abram refuse from the king of Sodom?", options: ["Gold", "Silver", "A thread or sandal strap", "A horse"], answer: 2 },
  { chapter: 14, question: "Why did Abram refuse the king's offer?", options: ["He didn't need it", "So the king couldn't say he made Abram rich", "He was afraid", "God told him not to"], answer: 1 },
  { chapter: 14, question: "What did Abram do with the goods?", options: ["Kept them", "Gave them to his men", "Returned them to the kings", "Burned them"], answer: 2 },
  { chapter: 14, question: "Who was with Abram when he rescued Lot?", options: ["His brothers", "His servants", "His sons", "His friends"], answer: 1 },
  { chapter: 14, question: "What did Melchizedek bless Abram for?", options: ["His wealth", "His victory", "His faith", "His kindness"], answer: 1 }
];

export default function GenesisCh14Beginner() {
  return <BibleBookQuiz title="Genesis 14 - Beginner" questions={questions} bookName="Genesis" />;
}
