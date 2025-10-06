import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "In the beginning, God created...", options: ["Man", "Israel", "Heavens and earth", "Animals"], answer: 2 },
  { chapter: 1, question: "Man was made on which day?", options: ["5th", "6th", "7th", "4th"], answer: 1 },
  { chapter: 2, question: "Garden planted in...", options: ["Hebron", "Eden", "Babel", "Bethel"], answer: 1 },
  { chapter: 3, question: "Who tempted Eve?", options: ["A lion", "A serpent", "A prophet", "An angel"], answer: 1 },
  { chapter: 4, question: "Abel's offering was of...", options: ["Grain", "Fruit", "Firstborn flock", "Wine"], answer: 2 },
  { chapter: 5, question: "Enoch was...", options: ["Killed", "Translated", "Drowned", "Banished"], answer: 1 },
  { chapter: 6, question: "Reason for the flood?", options: ["Overpopulation", "Violence and wickedness", "Famine", "Noise"], answer: 1 },
  { chapter: 7, question: "Clean animals entered by...", options: ["Twos", "Sevens", "Threes", "Fours"], answer: 1 },
  { chapter: 8, question: "First thing Noah did after exiting the ark?", options: ["Built a city", "Built an altar", "Planted a vineyard", "Made a treaty"], answer: 1 },
  { chapter: 11, question: "Purpose of Babel's tower?", options: ["Worship God", "Make a name", "Astronomy", "Defense"], answer: 1 }
];

export default function GenesisCh1to11() {
  return (
    <BibleBookQuiz title="Genesis 1–11" questions={questions} bookName="Genesis" />
  );
}


