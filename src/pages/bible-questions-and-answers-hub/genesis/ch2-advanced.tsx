import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 2, question: "Which region is associated with the river Pishon?", options: ["Cush", "Assyria", "Havilah", "Aram"], answer: 2 },
  { chapter: 2, question: "The Hebrew word for 'man' in Genesis 2 relates to which word?", options: ["Eretz", "Adamah", "Ruach", "Chesed"], answer: 1 },
  { chapter: 2, question: "What precious materials are mentioned in the land of Havilah?", options: ["Silver and onyx", "Gold and onyx", "Gold and silver", "Emerald and pearl"], answer: 1 },
  { chapter: 2, question: "What did God do to Adam before creating the woman?", options: ["Put him into a deep sleep", "Sent him to the field", "Brought animals", "Fed him manna"], answer: 0 },
  { chapter: 2, question: "Which river runs east of Assyria?", options: ["Euphrates", "Pishon", "Gihon", "Tigris"], answer: 3 }
];

export default function GenesisCh2Advanced() {
  return (
    <BibleBookQuiz title="Genesis 2 - Advanced" questions={questions} bookName="Genesis" />
  );
}


