import PublicQuiz from "../PublicQuiz";

// 1 Corinthians Quiz Questions - 10 questions about Paul's first letter to the Corinthians
const corinthiansQuestions = [
  {
    question: "What was the main problem Paul addressed in 1 Corinthians?",
    options: [
      "Financial issues",
      "Division and church problems",
      "Travel difficulties",
      "Language barriers"
    ],
    answer: 1
  },
  {
    question: "What does 1 Corinthians 1:10 say Paul appeals to the Corinthians about?",
    options: [
      "Unity in Christ",
      "Financial giving",
      "Church leadership",
      "Mission work"
    ],
    answer: 0
  },
  {
    question: "What does 1 Corinthians 3:16 say believers are?",
    options: [
      "God's children",
      "God's temple",
      "God's servants",
      "God's friends"
    ],
    answer: 1
  },
  {
    question: "What does 1 Corinthians 6:19 say believers' bodies are?",
    options: [
      "Temples of the Holy Spirit",
      "Vessels of honor",
      "Instruments of righteousness",
      "Temples of God"
    ],
    answer: 0
  },
  {
    question: "What does 1 Corinthians 10:13 say God will not let you be tempted beyond?",
    options: [
      "What you can handle",
      "What you can bear",
      "What you can endure",
      "What you can resist"
    ],
    answer: 1
  },
  {
    question: "What does 1 Corinthians 12:4 say there are different kinds of?",
    options: [
      "Gifts",
      "Services",
      "Works",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What does 1 Corinthians 13:4 say love is?",
    options: [
      "Patient and kind",
      "Jealous and proud",
      "Self-seeking and easily angered",
      "None of the above"
    ],
    answer: 0
  },
  {
    question: "What does 1 Corinthians 13:13 say the greatest of these is?",
    options: [
      "Faith",
      "Hope",
      "Love",
      "Wisdom"
    ],
    answer: 2
  },
  {
    question: "What does 1 Corinthians 15:55 say death has lost?",
    options: [
      "Its power",
      "Its sting",
      "Its victory",
      "Both B and C"
    ],
    answer: 3
  },
  {
    question: "What does 1 Corinthians 16:14 say everything should be done in?",
    options: [
      "Faith",
      "Hope",
      "Love",
      "Peace"
    ],
    answer: 2
  }
];

export default function CorinthiansPublicQuiz() {
  return (
    <PublicQuiz 
      title="1 Corinthians Quiz"
      questions={corinthiansQuestions}
      bookName="1 Corinthians"
    />
  );
}
