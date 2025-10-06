import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 1, question: "What was created on day 1?", options: ["Light", "Land", "Sun", "Animals"], answer: 0, explanation: "Genesis 1:3-5 — God said, 'Let there be light,' and there was light." },
  { chapter: 1, question: "What separated day from night?", options: ["Stars", "Moon", "Light", "Clouds"], answer: 2, explanation: "Genesis 1:4 — God separated the light from the darkness." },
  { chapter: 1, question: "What was created on day 2?", options: ["Sky", "Plants", "Fish", "Birds"], answer: 0, explanation: "Genesis 1:6-8 — God made the expanse (sky) to separate waters from waters." },
  { chapter: 1, question: "Humans were made in whose image?", options: ["Angels", "Animals", "God", "Kings"], answer: 2, explanation: "Genesis 1:26-27 — 'Let us make man in our image, after our likeness.'" },
  { chapter: 1, question: "What did God see about His creation?", options: ["It was average", "It was good", "It was unfinished", "It was dark"], answer: 1, explanation: "Genesis 1 (repeated refrain) — 'And God saw that it was good.'" }
];

export default function GenesisCh1Beginner() {
  return (
    <BibleBookQuiz title="Genesis 1 - Beginner" questions={questions} bookName="Genesis" />
  );
}


