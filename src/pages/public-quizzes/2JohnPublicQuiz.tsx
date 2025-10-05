import PublicQuiz from "../PublicQuiz";

// 2 John Quiz Questions - 10 questions about John's second letter
const john2Questions = [
  {
    question: "What is the main theme of 2 John?",
    options: [
      "Church organization",
      "Walking in truth and love, warning against false teachers",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does 2 John 1:3 say grace, mercy and peace will be with us?",
    options: [
      "From God the Father and from Jesus Christ, the Father's Son",
      "From nowhere",
      "From ourselves",
      "From others"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:4 say John has found?",
    options: [
      "Some of your children are walking in the truth",
      "Nothing good",
      "Only problems",
      "Only failures"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:6 say love is?",
    options: [
      "Walking in obedience to his commands",
      "Just feelings",
      "Just thoughts",
      "Just words"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:7 say has gone out into the world?",
    options: [
      "Many deceivers, who do not acknowledge Jesus Christ as coming in the flesh",
      "True prophets",
      "Good teachers",
      "Perfect leaders"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:8 say believers should watch out for?",
    options: [
      "That you do not lose what we have worked for",
      "Nothing",
      "Everything",
      "Everyone"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:9 say about those who run ahead?",
    options: [
      "Anyone who runs ahead and does not continue in the teaching of Christ does not have God",
      "They are blessed",
      "They are wise",
      "They are right"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:10 say believers should not do with false teachers?",
    options: [
      "Take them into your house or welcome them",
      "Pray for them",
      "Love them",
      "Help them"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:11 say about welcoming a false teacher?",
    options: [
      "Anyone who welcomes them shares in their wicked work",
      "It's fine",
      "It's helpful",
      "It's good"
    ],
    answer: 0
  },
  {
    question: "What does 2 John 1:12 say John hopes to do?",
    options: [
      "Visit you and talk with you face to face",
      "Avoid you",
      "Ignore you",
      "Forget you"
    ],
    answer: 0
  }
];

export default function John2PublicQuiz() {
  return (
    <PublicQuiz 
      title="2 John Quiz"
      questions={john2Questions}
      bookName="2 John"
    />
  );
}
