import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 11, question: "Plain where Babel was built", options: ["Hebron", "Shinar", "Bashan", "Moab"], answer: 1 },
  { chapter: 11, question: "Building materials used", options: ["Stone and mortar", "Brick and bitumen", "Wood", "Bronze"], answer: 1 },
  { chapter: 11, question: "Purpose stated by the builders", options: ["Worship", "Make a name and not be scattered", "Defend city", "Trade"], answer: 1 },
  { chapter: 11, question: "Name meaning of 'Babel'", options: ["Gate of God", "Confusion", "High place", "Stronghold"], answer: 1 },
  { chapter: 11, question: "From whom is Abram descended?", options: ["Japheth", "Shem", "Ham", "Canaan"], answer: 1 },
  { chapter: 11, question: "Terah's sons", options: ["Abram, Nahor, Haran", "Abram, Isaac, Jacob", "Shem, Ham, Japheth", "Esau, Jacob, Joseph"], answer: 0 },
  { chapter: 11, question: "Wife of Nahor", options: ["Sarai", "Milcah", "Rebekah", "Leah"], answer: 1 },
  { chapter: 11, question: "Lot's father", options: ["Nahor", "Haran", "Serug", "Terah"], answer: 1 },
  { chapter: 11, question: "Where did Terah die?", options: ["Ur", "Haran", "Canaan", "Egypt"], answer: 1 },
  { chapter: 11, question: "Sarai was", options: ["Barren", "A musician", "A prophetess", "A nurse"], answer: 0 }
];

export default function GenesisCh11Advanced() {
  return <BibleBookQuiz title="Genesis 11 - Advanced" questions={questions} bookName="Genesis" />;
}


