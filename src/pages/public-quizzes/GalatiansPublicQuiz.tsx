import PublicQuiz from "../PublicQuiz";

// Galatians Quiz Questions - 10 questions about Paul's letter to the Galatians
const galatiansQuestions = [
  {
    question: "What was the main issue Paul addressed in Galatians?",
    options: [
      "Financial problems",
      "Justification by faith vs. works of the law",
      "Church leadership",
      "End times"
    ],
    answer: 1
  },
  {
    question: "What does Galatians 1:8 say about preaching a different gospel?",
    options: [
      "It's acceptable",
      "Let them be under God's curse",
      "It's fine if sincere",
      "It's just a mistake"
    ],
    answer: 1
  },
  {
    question: "What does Galatians 2:16 say we are justified by?",
    options: [
      "Works of the law",
      "Faith in Jesus Christ",
      "Good deeds",
      "Circumcision"
    ],
    answer: 1
  },
  {
    question: "What does Galatians 3:28 say about believers in Christ?",
    options: [
      "They are all different",
      "There is neither Jew nor Gentile, slave nor free, male nor female",
      "They must follow the law",
      "They are superior to others"
    ],
    answer: 1
  },
  {
    question: "What does Galatians 4:4 say God sent?",
    options: [
      "His Son, born of a woman",
      "An angel",
      "A prophet",
      "A teacher"
    ],
    answer: 0
  },
  {
    question: "What does Galatians 5:1 say Christ has set us free for?",
    options: [
      "Freedom",
      "Slavery",
      "The law",
      "Works"
    ],
    answer: 0
  },
  {
    question: "What does Galatians 5:22-23 list as the fruit of the Spirit?",
    options: [
      "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control",
      "Power, wealth, fame, success",
      "Anger, jealousy, pride, greed",
      "Fear, doubt, worry, anxiety"
    ],
    answer: 0
  },
  {
    question: "What does Galatians 6:2 say believers should do?",
    options: [
      "Carry each other's burdens",
      "Ignore others' problems",
      "Judge each other",
      "Compete with each other"
    ],
    answer: 0
  },
  {
    question: "What does Galatians 6:7 say about what we reap?",
    options: [
      "Whatever we sow",
      "Whatever we want",
      "Whatever we pray for",
      "Whatever we deserve"
    ],
    answer: 0
  },
  {
    question: "What does Galatians 6:14 say Paul boasts in?",
    options: [
      "His achievements",
      "The cross of our Lord Jesus Christ",
      "His knowledge",
      "His power"
    ],
    answer: 1
  }
];

export default function GalatiansPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Galatians Quiz"
      questions={galatiansQuestions}
      bookName="Galatians"
      canonicalPath={canonicalPath}
    />
  );
}
