import PublicQuiz from "../PublicQuiz";

// Philemon Quiz Questions - 10 questions about Paul's letter to Philemon
const philemonQuestions = [
  {
    question: "What is the main theme of Philemon?",
    options: [
      "A personal appeal for forgiveness and Christian brotherhood",
      "Church organization",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:3 say Paul's greeting includes?",
    options: [
      "Grace and peace from God our Father and the Lord Jesus Christ",
      "Money and power",
      "Success and fame",
      "Health and wealth"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:4 say Paul always does?",
    options: [
      "Thanks God for Philemon in his prayers",
      "Asks for money",
      "Complains",
      "Worries"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:6 say Paul prays for?",
    options: [
      "That Philemon's partnership in the faith may become effective",
      "That Philemon becomes wealthy",
      "That Philemon becomes powerful",
      "That Philemon becomes famous"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:7 say Paul has great joy and encouragement from?",
    options: [
      "Philemon's love, because the hearts of the saints have been refreshed",
      "Philemon's wealth",
      "Philemon's power",
      "Philemon's fame"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:9 say Paul appeals to Philemon as?",
    options: [
      "An old man and now also a prisoner of Christ Jesus",
      "A young man",
      "A wealthy man",
      "A powerful man"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:10 say Paul has a son?",
    options: [
      "Whose father he became while in chains",
      "Who is perfect",
      "Who is wealthy",
      "Who is powerful"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:15 say perhaps Onesimus was separated for?",
    options: [
      "A little while so that Philemon might have him back forever",
      "No reason",
      "Punishment",
      "Failure"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:16 say Onesimus should be?",
    options: [
      "No longer as a slave, but better than a slave, as a dear brother",
      "Treated as a slave",
      "Punished",
      "Rejected"
    ],
    answer: 0
  },
  {
    question: "What does Philemon 1:20 say Paul wants from Philemon?",
    options: [
      "Some benefit from Philemon in the Lord",
      "Money",
      "Power",
      "Fame"
    ],
    answer: 0
  }
];

export default function PhilemonPublicQuiz() {
  return (
    <PublicQuiz 
      title="Philemon Quiz"
      questions={philemonQuestions}
      bookName="Philemon"
    />
  );
}
