import PublicQuiz from "../PublicQuiz";

// Titus Quiz Questions - 10 questions about Paul's letter to Titus
const titusQuestions = [
  {
    question: "What is the main theme of Titus?",
    options: [
      "Church organization and qualifications for leaders",
      "End times prophecy",
      "Financial giving",
      "Personal success"
    ],
    answer: 0
  },
  {
    question: "What does Titus 1:5 say Paul left Titus in Crete to do?",
    options: [
      "Put in order what was left unfinished and appoint elders",
      "Take a vacation",
      "Start a business",
      "Build a house"
    ],
    answer: 0
  },
  {
    question: "What does Titus 1:9 say an elder must do?",
    options: [
      "Hold firmly to the trustworthy message as taught",
      "Be wealthy",
      "Be powerful",
      "Be famous"
    ],
    answer: 0
  },
  {
    question: "What does Titus 2:7 say Titus should show himself to be?",
    options: [
      "An example by doing what is good",
      "Better than others",
      "Wealthy",
      "Powerful"
    ],
    answer: 0
  },
  {
    question: "What does Titus 2:11 say has appeared?",
    options: [
      "The grace of God that offers salvation to all people",
      "Nothing special",
      "Only judgment",
      "Only punishment"
    ],
    answer: 0
  },
  {
    question: "What does Titus 2:12 say grace teaches us to do?",
    options: [
      "Say 'No' to ungodliness and worldly passions, and to live self-controlled, upright and godly lives",
      "Do whatever we want",
      "Follow our desires",
      "Ignore God"
    ],
    answer: 0
  },
  {
    question: "What does Titus 3:3 say we were at one time?",
    options: [
      "Foolish, disobedient, deceived and enslaved by all kinds of passions and pleasures",
      "Perfect",
      "Sinless",
      "Righteous"
    ],
    answer: 0
  },
  {
    question: "What does Titus 3:4 say appeared?",
    options: [
      "The kindness and love of God our Savior",
      "Nothing",
      "Only judgment",
      "Only punishment"
    ],
    answer: 0
  },
  {
    question: "What does Titus 3:5 say God saved us through?",
    options: [
      "The washing of rebirth and renewal by the Holy Spirit",
      "Our good works",
      "Our efforts",
      "Our wisdom"
    ],
    answer: 0
  },
  {
    question: "What does Titus 3:8 say believers should be careful to do?",
    options: [
      "Devote themselves to doing what is good",
      "Do nothing",
      "Do only what's easy",
      "Do only what they want"
    ],
    answer: 0
  }
];

export default function TitusPublicQuiz() {
  return (
    <PublicQuiz 
      title="Titus Quiz"
      questions={titusQuestions}
      bookName="Titus"
    />
  );
}
