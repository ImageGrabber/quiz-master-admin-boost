import PublicQuiz from "../PublicQuiz";

// 3 John Quiz Questions - 10 questions about John's third letter
const john3Questions = [
  {
    question: "What is the main theme of 3 John?",
    options: [
      "Church organization",
      "Hospitality and support for traveling teachers",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does 3 John 1:2 say John prays for Gaius?",
    options: [
      "That you may enjoy good health and that all may go well with you",
      "That you become wealthy",
      "That you become powerful",
      "That you become famous"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:3 say John was told about Gaius?",
    options: [
      "That you are faithful to the truth and are walking in the truth",
      "That you are unfaithful",
      "That you are lost",
      "That you are confused"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:4 say gives John no greater joy?",
    options: [
      "To hear that my children are walking in the truth",
      "To hear about wealth",
      "To hear about power",
      "To hear about fame"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:5 say Gaius is faithful in?",
    options: [
      "What you are doing for the brothers and sisters, even though they are strangers to you",
      "Nothing",
      "Only for friends",
      "Only for family"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:6 say these people have told the church about?",
    options: [
      "Your love",
      "Your wealth",
      "Your power",
      "Your fame"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:7 say these people went out for?",
    options: [
      "The sake of the Name, receiving no help from the pagans",
      "Money",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:8 say believers should support?",
    options: [
      "Such people so that we may be fellow workers for the truth",
      "Only themselves",
      "Only their friends",
      "Only their family"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:9 say Diotrephes likes to do?",
    options: [
      "Be first among them",
      "Serve others",
      "Help others",
      "Love others"
    ],
    answer: 0
  },
  {
    question: "What does 3 John 1:11 say believers should not imitate?",
    options: [
      "What is evil",
      "What is good",
      "What is right",
      "What is true"
    ],
    answer: 0
  }
];

export default function John3PublicQuiz() {
  return (
    <PublicQuiz 
      title="3 John Quiz"
      questions={john3Questions}
      bookName="3 John"
    />
  );
}
