import PublicQuiz from "../PublicQuiz";

// Jude Quiz Questions - 10 questions about the letter of Jude
const judeQuestions = [
  {
    question: "What is the main theme of Jude?",
    options: [
      "Church organization",
      "Contending for the faith against false teachers",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does Jude 1:3 say Jude was compelled to write about?",
    options: [
      "The salvation we share, urging you to contend for the faith",
      "Money",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:4 say certain individuals have secretly slipped in among you?",
    options: [
      "Ungodly people, who pervert the grace of our God into a license for immorality",
      "Good people",
      "Perfect people",
      "Righteous people"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:6 say about angels who did not keep their positions of authority?",
    options: [
      "He has kept in darkness, bound with everlasting chains for judgment on the great Day",
      "He has blessed them",
      "He has rewarded them",
      "He has promoted them"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:9 say the archangel Michael did?",
    options: [
      "When he was disputing with the devil about the body of Moses, he did not dare to bring a slanderous accusation against him",
      "He fought the devil",
      "He ignored the devil",
      "He made friends with the devil"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:14 say Enoch prophesied about?",
    options: [
      "The Lord is coming with thousands upon thousands of his holy ones",
      "Peace on earth",
      "Good times ahead",
      "Nothing special"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:20 say believers should do?",
    options: [
      "Build yourselves up in your most holy faith and pray in the Holy Spirit",
      "Tear yourselves down",
      "Ignore your faith",
      "Abandon your faith"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:21 say believers should keep themselves in?",
    options: [
      "God's love as you wait for the mercy of our Lord Jesus Christ",
      "Their own love",
      "Worldly love",
      "Selfish love"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:22 say believers should be merciful to?",
    options: [
      "Those who doubt",
      "Only the perfect",
      "Only the righteous",
      "Only the wealthy"
    ],
    answer: 0
  },
  {
    question: "What does Jude 1:24 say God is able to do?",
    options: [
      "Keep you from stumbling and to present you before his glorious presence without fault",
      "Nothing",
      "Only punish",
      "Only judge"
    ],
    answer: 0
  }
];

export default function JudePublicQuiz() {
  return (
    <PublicQuiz 
      title="Jude Quiz"
      questions={judeQuestions}
      bookName="Jude"
    />
  );
}
