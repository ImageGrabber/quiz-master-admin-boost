import PublicQuiz from "../PublicQuiz";

// Habakkuk Quiz Questions - 10 questions about faith and God's justice
const habakkukQuestions = [
  {
    question: "What was Habakkuk's main concern?",
    options: [
      "His own safety",
      "Why God allowed evil to go unpunished",
      "The coming Messiah",
      "The restoration of the temple"
    ],
    answer: 1
  },
  {
    question: "What did Habakkuk do when he had questions?",
    options: [
      "He kept silent",
      "He complained to God",
      "He went to other prophets",
      "He ignored his concerns"
    ],
    answer: 1
  },
  {
    question: "What did God tell Habakkuk about the Babylonians?",
    options: [
      "They would be blessed",
      "They would be used to judge Judah",
      "They would be destroyed immediately",
      "They would be ignored"
    ],
    answer: 1
  },
  {
    question: "What was Habakkuk's response to God's answer?",
    options: [
      "He was satisfied",
      "He had more questions about God's justice",
      "He was angry",
      "He was confused"
    ],
    answer: 1
  },
  {
    question: "What did God tell Habakkuk about the righteous?",
    options: [
      "They would be destroyed",
      "They would live by faith",
      "They would be forgotten",
      "They would be blessed immediately"
    ],
    answer: 1
  },
  {
    question: "What did Habakkuk say about God's character?",
    options: [
      "God was unfair",
      "God was just and would judge the wicked",
      "God was powerless",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What did Habakkuk prophesy about the Babylonians?",
    options: [
      "They would be blessed",
      "They would be judged for their cruelty",
      "They would rule forever",
      "They would be ignored"
    ],
    answer: 1
  },
  {
    question: "What was Habakkuk's final response?",
    options: [
      "He was angry",
      "He praised God and trusted in His justice",
      "He was confused",
      "He was disappointed"
    ],
    answer: 1
  },
  {
    question: "What did Habakkuk say about God's power?",
    options: [
      "God was weak",
      "God was sovereign over all nations",
      "God was limited",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What was Habakkuk's message about faith?",
    options: [
      "Faith was unnecessary",
      "The righteous would live by faith",
      "Faith was impossible",
      "Faith was optional"
    ],
    answer: 1
  }
];

export default function HabakkukPublicQuiz() {
  return (
    <PublicQuiz 
      title="Habakkuk Quiz"
      questions={habakkukQuestions}
      bookName="Habakkuk"
    />
  );
}
