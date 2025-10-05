import PublicQuiz from "../PublicQuiz";

// 1 Peter Quiz Questions - 10 questions about Peter's first letter
const peter1Questions = [
  {
    question: "What is the main theme of 1 Peter?",
    options: [
      "Church organization",
      "Suffering and hope, living as exiles in the world",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does 1 Peter 1:3 say God has given us?",
    options: [
      "New birth into a living hope through the resurrection of Jesus Christ",
      "Wealth",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 1:8 say about those who believe in Christ?",
    options: [
      "Though you have not seen him, you love him; and even though you do not see him now, you believe in him",
      "They are foolish",
      "They are weak",
      "They are naive"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 2:9 say believers are?",
    options: [
      "A chosen people, a royal priesthood, a holy nation, God's special possession",
      "Ordinary people",
      "Better than others",
      "Superior to unbelievers"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 2:21 say Christ suffered for?",
    options: [
      "Leaving you an example, that you should follow in his steps",
      "Nothing",
      "His own mistakes",
      "His own sins"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 3:15 say believers should always be prepared to do?",
    options: [
      "Give an answer to everyone who asks you to give the reason for the hope that you have",
      "Stay silent",
      "Avoid questions",
      "Change the subject"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 4:8 say love does?",
    options: [
      "Covers over a multitude of sins",
      "Nothing",
      "Makes things worse",
      "Causes problems"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 5:7 say believers should do with their anxiety?",
    options: [
      "Cast all your anxiety on him because he cares for you",
      "Keep it to yourself",
      "Worry more",
      "Ignore it"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 5:8 say believers should be alert for?",
    options: [
      "Your enemy the devil prowls around like a roaring lion looking for someone to devour",
      "Opportunities",
      "Success",
      "Wealth"
    ],
    answer: 0
  },
  {
    question: "What does 1 Peter 5:10 say the God of all grace will do?",
    options: [
      "After you have suffered a little while, will himself restore you and make you strong",
      "Abandon you",
      "Punish you",
      "Ignore you"
    ],
    answer: 0
  }
];

export default function Peter1PublicQuiz() {
  return (
    <PublicQuiz 
      title="1 Peter Quiz"
      questions={peter1Questions}
      bookName="1 Peter"
    />
  );
}
