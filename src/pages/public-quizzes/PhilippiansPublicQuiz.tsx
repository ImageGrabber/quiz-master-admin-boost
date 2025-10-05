import PublicQuiz from "../PublicQuiz";

// Philippians Quiz Questions - 10 questions about Paul's letter to the Philippians
const philippiansQuestions = [
  {
    question: "What is the main theme of Philippians?",
    options: [
      "Church organization",
      "Joy in Christ and Christian living",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does Philippians 1:6 say God will do?",
    options: [
      "Carry it on to completion until the day of Christ Jesus",
      "Abandon us",
      "Test us beyond our limits",
      "Leave us alone"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 2:5 say believers should have?",
    options: [
      "The same mindset as Christ Jesus",
      "Their own mindset",
      "A worldly mindset",
      "A selfish mindset"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 2:7 say Christ did?",
    options: [
      "Made himself nothing, taking the form of a servant",
      "Came in glory",
      "Ruled as king",
      "Stayed in heaven"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 3:8 say Paul considers everything else?",
    options: [
      "Loss for the sake of Christ",
      "Gain",
      "Important",
      "Valuable"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 3:14 say Paul presses on toward?",
    options: [
      "The goal to win the prize",
      "Worldly success",
      "Personal achievement",
      "Material wealth"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 4:4 say believers should do?",
    options: [
      "Rejoice in the Lord always",
      "Worry about everything",
      "Complain constantly",
      "Be anxious"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 4:6 say believers should not be?",
    options: [
      "Anxious about anything",
      "Joyful",
      "Peaceful",
      "Content"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 4:7 say God's peace will do?",
    options: [
      "Guard your hearts and minds in Christ Jesus",
      "Leave you alone",
      "Make you worry more",
      "Cause anxiety"
    ],
    answer: 0
  },
  {
    question: "What does Philippians 4:13 say Paul can do?",
    options: [
      "Do all things through Christ who strengthens him",
      "Do nothing",
      "Do only easy things",
      "Do only what he wants"
    ],
    answer: 0
  }
];

export default function PhilippiansPublicQuiz() {
  return (
    <PublicQuiz 
      title="Philippians Quiz"
      questions={philippiansQuestions}
      bookName="Philippians"
    />
  );
}
