import PublicQuiz from "../PublicQuiz";

// Hebrews Quiz Questions - 10 questions about the letter to the Hebrews
const hebrewsQuestions = [
  {
    question: "What is the main theme of Hebrews?",
    options: [
      "Church organization",
      "The superiority of Christ and the new covenant",
      "Financial giving",
      "End times only"
    ],
    answer: 1
  },
  {
    question: "What does Hebrews 1:3 say the Son is?",
    options: [
      "The radiance of God's glory and the exact representation of his being",
      "Just a man",
      "An angel",
      "A prophet"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 2:14 say Christ shared in?",
    options: [
      "Our humanity so that by his death he might break the power of him who holds the power of death",
      "Our wealth",
      "Our power",
      "Our fame"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 4:12 say the word of God is?",
    options: [
      "Sharper than any double-edged sword",
      "Dull and useless",
      "Just stories",
      "Outdated"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 4:15 say our high priest is?",
    options: [
      "One who is able to empathize with our weaknesses",
      "One who cannot understand us",
      "One who is distant",
      "One who is harsh"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 6:19 say hope is?",
    options: [
      "An anchor for the soul, firm and secure",
      "Unreliable",
      "Useless",
      "Unnecessary"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 7:25 say Jesus is able to do?",
    options: [
      "Save completely those who come to God through him",
      "Save only some",
      "Save only the perfect",
      "Save only the wealthy"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 9:27 say is destined for everyone?",
    options: [
      "To die once, and after that to face judgment",
      "To live forever",
      "To be reincarnated",
      "To disappear"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 11:1 say faith is?",
    options: [
      "Confidence in what we hope for and assurance about what we do not see",
      "Just feelings",
      "Just thoughts",
      "Just wishes"
    ],
    answer: 0
  },
  {
    question: "What does Hebrews 12:2 say we should fix our eyes on?",
    options: [
      "Jesus, the pioneer and perfecter of faith",
      "Our problems",
      "Our wealth",
      "Our success"
    ],
    answer: 0
  }
];

export default function HebrewsPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Hebrews Quiz"
      questions={hebrewsQuestions}
      bookName="Hebrews"
      canonicalPath={canonicalPath}
    />
  );
}
