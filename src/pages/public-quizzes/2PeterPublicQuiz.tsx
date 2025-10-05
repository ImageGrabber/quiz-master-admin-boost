import PublicQuiz from "../PublicQuiz";

// 2 Peter Quiz Questions - 10 questions about Peter's second letter
const peter2Questions = [
  {
    question: "What is the main theme of 2 Peter?",
    options: [
      "Church organization",
      "False teachers and the day of the Lord",
      "Financial giving",
      "Personal success"
    ],
    answer: 1
  },
  {
    question: "What does 2 Peter 1:3 say God's divine power has given us?",
    options: [
      "Everything we need for a godly life through our knowledge of him",
      "Wealth",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 1:4 say God has given us?",
    options: [
      "His very great and precious promises, so that through them you may participate in the divine nature",
      "Nothing special",
      "Only problems",
      "Only challenges"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 1:21 say about prophecy?",
    options: [
      "Prophecy never had its origin in the human will, but prophets, though human, spoke from God",
      "It's just human ideas",
      "It's unreliable",
      "It's outdated"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 2:1 say will arise among the people?",
    options: [
      "False prophets and false teachers",
      "True prophets",
      "Good teachers",
      "Perfect leaders"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 3:8 say about time with the Lord?",
    options: [
      "A day is like a thousand years, and a thousand years are like a day",
      "Time doesn't matter",
      "Time is everything",
      "Time is meaningless"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 3:9 say the Lord is not slow about?",
    options: [
      "His promise, as some understand slowness. Instead he is patient with you",
      "His judgment",
      "His punishment",
      "His discipline"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 3:10 say will happen to the heavens?",
    options: [
      "They will disappear with a roar; the elements will be destroyed by fire",
      "They will stay the same",
      "They will get better",
      "They will expand"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 3:13 say we are looking forward to?",
    options: [
      "A new heaven and a new earth, where righteousness dwells",
      "Nothing",
      "The same old thing",
      "More problems"
    ],
    answer: 0
  },
  {
    question: "What does 2 Peter 3:18 say believers should grow in?",
    options: [
      "The grace and knowledge of our Lord and Savior Jesus Christ",
      "Wealth",
      "Power",
      "Fame"
    ],
    answer: 0
  }
];

export default function Peter2PublicQuiz() {
  return (
    <PublicQuiz 
      title="2 Peter Quiz"
      questions={peter2Questions}
      bookName="2 Peter"
    />
  );
}
