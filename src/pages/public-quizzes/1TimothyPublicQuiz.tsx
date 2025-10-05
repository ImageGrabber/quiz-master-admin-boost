import PublicQuiz from "../PublicQuiz";

// 1 Timothy Quiz Questions - 10 questions about Paul's first letter to Timothy
const timothy1Questions = [
  {
    question: "What is the main theme of 1 Timothy?",
    options: [
      "Church organization and pastoral leadership",
      "End times prophecy",
      "Financial giving",
      "Personal success"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 1:15 say is a trustworthy saying?",
    options: [
      "Christ Jesus came into the world to save sinners",
      "Money is everything",
      "Power is important",
      "Success is key"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 2:5 say there is one of?",
    options: [
      "One God and one mediator between God and mankind, the man Christ Jesus",
      "Many gods",
      "No God",
      "Many mediators"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 3:2 say an overseer must be?",
    options: [
      "Above reproach, faithful to his wife, temperate, self-controlled, respectable",
      "Wealthy",
      "Powerful",
      "Famous"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 4:12 say Timothy should not let anyone look down on him because he is?",
    options: [
      "Young",
      "Old",
      "Poor",
      "Unknown"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 4:16 say Timothy should watch?",
    options: [
      "His life and doctrine closely",
      "His wealth",
      "His power",
      "His fame"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 5:8 say about those who don't provide for relatives?",
    options: [
      "They have denied the faith and are worse than unbelievers",
      "They are fine",
      "They are blessed",
      "They are successful"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 6:6 say godliness with contentment is?",
    options: [
      "Great gain",
      "Nothing special",
      "A burden",
      "Unnecessary"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 6:10 say is a root of all kinds of evil?",
    options: [
      "The love of money",
      "Poverty",
      "Hard work",
      "Generosity"
    ],
    answer: 0
  },
  {
    question: "What does 1 Timothy 6:12 say Timothy should fight?",
    options: [
      "The good fight of the faith",
      "Other people",
      "The government",
      "His enemies"
    ],
    answer: 0
  }
];

export default function Timothy1PublicQuiz() {
  return (
    <PublicQuiz 
      title="1 Timothy Quiz"
      questions={timothy1Questions}
      bookName="1 Timothy"
    />
  );
}
