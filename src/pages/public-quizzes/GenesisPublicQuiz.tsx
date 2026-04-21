import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "In the beginning, what did God create first?",
    options: ["Light", "Heaven", "Earth", "Man"],
    answer: 0,
    explanation: "Genesis 1:3 - And God said, 'Let there be light,' and there was light."
  },
  {
    id: 2,
    question: "On which day did God create the sun, moon, and stars?",
    options: ["First day", "Second day", "Third day", "Fourth day"],
    answer: 3,
    explanation: "Genesis 1:14-19 - God created the sun, moon, and stars on the fourth day."
  },
  {
    id: 3,
    question: "What was the name of the first man?",
    options: ["Abel", "Adam", "Cain", "Seth"],
    answer: 1,
    explanation: "Genesis 2:7 - The Lord God formed the man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being."
  },
  {
    id: 4,
    question: "From which part of Adam's body was Eve created?",
    options: ["His rib", "His finger", "His foot", "His head"],
    answer: 0,
    explanation: "Genesis 2:21-22 - So the Lord God caused the man to fall into a deep sleep; and while he was sleeping, he took one of the man's ribs and then closed up the place with flesh. Then the Lord God made a woman from the rib he had taken out of the man."
  },
  {
    id: 5,
    question: "What was the name of the tree that Adam and Eve were forbidden to eat from?",
    options: ["Tree of Life", "Tree of Knowledge of Good and Evil", "Tree of Wisdom", "Tree of Understanding"],
    answer: 1,
    explanation: "Genesis 2:17 - But you must not eat from the tree of the knowledge of good and evil, for when you eat from it you will certainly die."
  },
  {
    id: 6,
    question: "Who was the first murderer in the Bible?",
    options: ["Abel", "Cain", "Adam", "Seth"],
    answer: 1,
    explanation: "Genesis 4:8 - Now Cain said to his brother Abel, 'Let's go out to the field.' And while they were in the field, Cain attacked his brother Abel and killed him."
  },
  {
    id: 7,
    question: "How many sons did Adam and Eve have?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1,
    explanation: "Genesis 4:1-2, 4:25 - Adam and Eve had Cain, Abel, and Seth (and other sons and daughters)."
  },
  {
    id: 8,
    question: "How old was Adam when he died?",
    options: ["800 years", "900 years", "930 years", "950 years"],
    answer: 2,
    explanation: "Genesis 5:5 - Altogether, Adam lived a total of 930 years, and then he died."
  },
  {
    id: 9,
    question: "Who was Noah's father?",
    options: ["Lamech", "Methuselah", "Enoch", "Jared"],
    answer: 0,
    explanation: "Genesis 5:28-29 - When Lamech had lived 182 years, he had a son. He named him Noah and said, 'He will comfort us in the labor and painful toil of our hands caused by the ground the Lord has cursed.'"
  },
  {
    id: 10,
    question: "How many days and nights did it rain during the flood?",
    options: ["30 days", "40 days", "50 days", "60 days"],
    answer: 1,
    explanation: "Genesis 7:12 - And rain fell on the earth forty days and forty nights."
  }
];

export default function GenesisPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Genesis Quiz - The Beginning of Everything"
      questions={questions}
      bookName="Genesis"
      canonicalPath={canonicalPath}
    />
  );
}
