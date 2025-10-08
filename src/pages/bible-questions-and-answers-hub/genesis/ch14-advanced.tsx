import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 14, question: "Names of the four kings who made war", options: ["Amraphel, Arioch, Chedorlaomer, Tidal", "Bera, Birsha, Shinab, Shemeber", "Abram, Lot, Melchizedek, Aner"], answer: 0 },
  { chapter: 14, question: "How many years had the kings served Chedorlaomer?", options: ["10", "12", "13", "15"], answer: 2 },
  { chapter: 14, question: "What did Abram do when he heard Lot was taken?", options: ["Mourned", "Called his allies", "Pursued them to Dan", "Prayed"], answer: 2 },
  { chapter: 14, question: "Who were Abram's allies?", options: ["Aner, Eshcol, Mamre", "Lot, Melchizedek, Eliezer", "Shem, Ham, Japheth"], answer: 0 },
  { chapter: 14, question: "What did Melchizedek bring out?", options: ["Bread and wine", "Gold and silver", "Meat and water", "Clothes and shoes"], answer: 0 },
  { chapter: 14, question: "What did Abram give Melchizedek?", options: ["A tenth of everything", "All the spoils", "Gold and silver", "His sword"], answer: 0 },
  { chapter: 14, question: "What did Abram refuse from the king of Sodom?", options: ["A thread or sandal strap", "Gold and silver", "The people", "The land"], answer: 0 },
  { chapter: 14, question: "Why did Abram refuse the king's offer?", options: ["So the king couldn't say he made Abram rich", "He didn't need it", "God told him not to", "He was afraid"], answer: 0 },
  { chapter: 14, question: "What did Abram do with the goods?", options: ["Kept them", "Gave them to his men", "Returned them to the kings", "Burned them"], answer: 2 },
  { chapter: 14, question: "What did Melchizedek bless Abram for?", options: ["His wealth", "His victory", "His faith", "His kindness"], answer: 1 }
];

export default function GenesisCh14Advanced() {
  return <BibleBookQuiz title="Genesis 14 - Advanced" questions={questions} bookName="Genesis" />;
}
