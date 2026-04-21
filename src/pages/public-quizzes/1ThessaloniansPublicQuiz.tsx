import PublicQuiz from "../PublicQuiz";

// 1 Thessalonians Quiz Questions - 10 questions about Paul's first letter to the Thessalonians
const thessalonians1Questions = [
  {
    question: "What is the main theme of 1 Thessalonians?",
    options: [
      "Church organization",
      "The Lord's return and Christian living",
      "Financial giving",
      "End times only"
    ],
    answer: 1
  },
  {
    question: "What does 1 Thessalonians 1:3 say Paul remembers about the Thessalonians?",
    options: [
      "Their work produced by faith, labor prompted by love, and endurance inspired by hope",
      "Their wealth",
      "Their power",
      "Their knowledge"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 2:4 say God entrusted Paul with?",
    options: [
      "The gospel",
      "Money",
      "Power",
      "Authority"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 3:12 say the Lord should make the Thessalonians' love?",
    options: [
      "Increase and overflow for each other and for everyone else",
      "Decrease",
      "Stay the same",
      "Be selective"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 4:3 say God's will is?",
    options: [
      "That you should be sanctified",
      "That you should be wealthy",
      "That you should be powerful",
      "That you should be famous"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 4:16 say will happen when the Lord comes?",
    options: [
      "The Lord himself will come down from heaven with a loud command",
      "Nothing special",
      "Only some will notice",
      "It will be silent"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 5:2 say about the day of the Lord?",
    options: [
      "It will come like a thief in the night",
      "It will be announced",
      "It will be gradual",
      "It will be obvious"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 5:16 say believers should do?",
    options: [
      "Rejoice always",
      "Worry constantly",
      "Complain often",
      "Be anxious"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 5:17 say believers should do?",
    options: [
      "Pray continually",
      "Pray only when needed",
      "Pray only in church",
      "Pray only for themselves"
    ],
    answer: 0
  },
  {
    question: "What does 1 Thessalonians 5:18 say believers should do in all circumstances?",
    options: [
      "Give thanks",
      "Complain",
      "Worry",
      "Be anxious"
    ],
    answer: 0
  }
];

export default function Thessalonians1PublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="1 Thessalonians Quiz"
      questions={thessalonians1Questions}
      bookName="1 Thessalonians"
      canonicalPath={canonicalPath}
    />
  );
}
