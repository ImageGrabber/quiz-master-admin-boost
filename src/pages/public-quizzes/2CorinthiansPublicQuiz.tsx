import PublicQuiz from "../PublicQuiz";

// 2 Corinthians Quiz Questions - 10 questions about Paul's second letter to the Corinthians
const corinthians2Questions = [
  {
    question: "What was the main theme of 2 Corinthians?",
    options: [
      "Church organization",
      "Paul's defense of his apostolic ministry",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does 2 Corinthians 1:3 say God is?",
    options: [
      "The God of all comfort",
      "The God of power",
      "The God of justice",
      "The God of mercy"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 3:6 say makes us competent?",
    options: [
      "Our abilities",
      "Our education",
      "The new covenant of the Spirit",
      "Our experience"
    ],
    answer: 2
  },
  {
    question: "What does 2 Corinthians 4:7 say we have this treasure in?",
    options: [
      "Jars of clay",
      "Gold vessels",
      "Silver containers",
      "Bronze pots"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 5:17 say happens to those in Christ?",
    options: [
      "They become new creations",
      "They become perfect",
      "They become sinless",
      "They become wealthy"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 6:14 say believers should not be?",
    options: [
      "Unequally yoked with unbelievers",
      "Friends with sinners",
      "In the world",
      "Different from others"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 8:9 say about Christ's example?",
    options: [
      "He was rich but became poor",
      "He was poor but became rich",
      "He stayed the same",
      "He became powerful"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 9:7 say God loves?",
    options: [
      "A cheerful giver",
      "A reluctant giver",
      "A forced giver",
      "A proud giver"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 12:9 say about God's grace?",
    options: [
      "It is sufficient",
      "It is limited",
      "It is conditional",
      "It is earned"
    ],
    answer: 0
  },
  {
    question: "What does 2 Corinthians 13:14 mention about the Trinity?",
    options: [
      "The grace of the Lord Jesus Christ",
      "The love of God",
      "The fellowship of the Holy Spirit",
      "All of the above"
    ],
    answer: 3
  }
];

export default function Corinthians2PublicQuiz() {
  return (
    <PublicQuiz 
      title="2 Corinthians Quiz"
      questions={corinthians2Questions}
      bookName="2 Corinthians"
    />
  );
}
