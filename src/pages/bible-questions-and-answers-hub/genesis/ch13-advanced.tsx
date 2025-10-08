import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 13, question: "Hebrew term for 'lift up your eyes' in the promise", options: ["Nasah", "Ra'ah", "Shama", "Halak"], answer: 1 },
  { chapter: 13, question: "Specific direction Abram was told to look", options: ["North, south, east, west", "All around", "Toward the sea", "Toward the mountains"], answer: 0 },
  { chapter: 13, question: "What made the land unable to support both?", options: ["Drought", "Their possessions were too great", "War", "Famine"], answer: 1 },
  { chapter: 13, question: "Lot's choice was described as", options: ["Wise", "Well-watered like the garden of the Lord", "Safe", "Beautiful"], answer: 1 },
  { chapter: 13, question: "Abram's response to Lot's choice", options: ["Objected", "Agreed and blessed him", "Followed him", "Fought with him"], answer: 1 },
  { chapter: 13, question: "Where did Abram move his tent after separation?", options: ["Near Hebron", "To the oaks of Mamre", "To the plain", "To the hills"], answer: 1 },
  { chapter: 13, question: "What did Abram build at the oaks of Mamre?", options: ["A house", "An altar to the Lord", "A wall", "A tower"], answer: 1 },
  { chapter: 13, question: "Promise included descendants as numerous as", options: ["The stars of heaven", "The sand on the seashore", "The dust of the earth", "The leaves on trees"], answer: 2 },
  { chapter: 13, question: "What was Abram told to walk through?", options: ["The land", "The city", "The plain", "The mountains"], answer: 0 },
  { chapter: 13, question: "When did this separation occur?", options: ["After Egypt", "Before the famine", "During the journey", "After the promise"], answer: 0 }
];

export default function GenesisCh13Advanced() {
  return <BibleBookQuiz title="Genesis 13 - Advanced" questions={questions} bookName="Genesis" />;
}
