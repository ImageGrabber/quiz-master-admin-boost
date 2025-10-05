import PublicQuiz from "../PublicQuiz";

// Romans Quiz Questions - 10 questions about Paul's letter to the Romans
const romansQuestions = [
  {
    question: "What is the main theme of Romans?",
    options: [
      "The law and works",
      "The gospel of God's righteousness through faith",
      "Church organization",
      "End times prophecy"
    ],
    answer: 1
  },
  {
    question: "What does Romans 1:16 say about the gospel?",
    options: [
      "It is the power of God for salvation",
      "It is just for Jews",
      "It is outdated",
      "It is confusing"
    ],
    answer: 0
  },
  {
    question: "What does Romans 3:23 say all have done?",
    options: [
      "Loved God",
      "Sinned and fall short of God's glory",
      "Kept the law perfectly",
      "Been justified"
    ],
    answer: 1
  },
  {
    question: "How was Abraham's faith credited to him according to Romans 4:3?",
    options: [
      "As righteousness",
      "As works",
      "As law-keeping",
      "As sacrifice"
    ],
    answer: 0
  },
  {
    question: "What does Romans 5:8 say God demonstrates?",
    options: [
      "His power",
      "His love for us",
      "His justice",
      "His mercy"
    ],
    answer: 1
  },
  {
    question: "What does Romans 6:23 say is the wages of sin?",
    options: [
      "Life",
      "Death",
      "Grace",
      "Righteousness"
    ],
    answer: 1
  },
  {
    question: "What does Romans 8:28 say works for the good of those who love God?",
    options: [
      "Some things",
      "All things",
      "Good things only",
      "Righteous things"
    ],
    answer: 1
  },
  {
    question: "What does Romans 10:9 say you must do to be saved?",
    options: [
      "Keep the law",
      "Believe in your heart and confess with your mouth",
      "Be baptized",
      "Do good works"
    ],
    answer: 1
  },
  {
    question: "What does Romans 12:1 say believers should offer to God?",
    options: [
      "Sacrifices",
      "Their bodies as living sacrifices",
      "Money",
      "Time"
    ],
    answer: 1
  },
  {
    question: "What does Romans 16:20 say will happen to Satan?",
    options: [
      "He will be destroyed",
      "He will be crushed under your feet",
      "He will be bound",
      "He will be cast out"
    ],
    answer: 1
  }
];

export default function RomansPublicQuiz() {
  return (
    <PublicQuiz 
      title="Romans Quiz"
      questions={romansQuestions}
      bookName="Romans"
    />
  );
}
