import PublicQuiz from "../PublicQuiz";

// James Quiz Questions - 10 questions about the letter of James
const jamesQuestions = [
  {
    question: "What is the main theme of James?",
    options: [
      "Church organization",
      "Faith and works, practical Christian living",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does James 1:2 say believers should consider?",
    options: [
      "It pure joy whenever you face trials of many kinds",
      "Trials as punishment",
      "Trials as failure",
      "Trials as unfair"
    ],
    answer: 0
  },
  {
    question: "What does James 1:5 say God gives to those who ask?",
    options: [
      "Wisdom generously to all without finding fault",
      "Money",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does James 1:22 say believers should be?",
    options: [
      "Doers of the word, and not merely hearers",
      "Only hearers",
      "Only talkers",
      "Only thinkers"
    ],
    answer: 0
  },
  {
    question: "What does James 2:17 say faith without works is?",
    options: [
      "Dead",
      "Perfect",
      "Enough",
      "Sufficient"
    ],
    answer: 0
  },
  {
    question: "What does James 3:2 say about those who never stumble?",
    options: [
      "They are perfect, able to keep their whole body in check",
      "They are weak",
      "They are average",
      "They are normal"
    ],
    answer: 0
  },
  {
    question: "What does James 3:8 say no human being can tame?",
    options: [
      "The tongue",
      "The mind",
      "The heart",
      "The body"
    ],
    answer: 0
  },
  {
    question: "What does James 4:7 say believers should do?",
    options: [
      "Submit yourselves, then, to God. Resist the devil, and he will flee from you",
      "Fight the devil",
      "Ignore the devil",
      "Make friends with the devil"
    ],
    answer: 0
  },
  {
    question: "What does James 5:16 say the prayer of a righteous person is?",
    options: [
      "Powerful and effective",
      "Useless",
      "Weak",
      "Unnecessary"
    ],
    answer: 0
  },
  {
    question: "What does James 5:19-20 say about bringing back a sinner?",
    options: [
      "Whoever turns a sinner from the error of their way will save them from death",
      "It's not worth it",
      "It's impossible",
      "It's dangerous"
    ],
    answer: 0
  }
];

export default function JamesPublicQuiz() {
  return (
    <PublicQuiz 
      title="James Quiz"
      questions={jamesQuestions}
      bookName="James"
    />
  );
}
