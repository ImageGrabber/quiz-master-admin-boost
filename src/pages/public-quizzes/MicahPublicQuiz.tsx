import PublicQuiz from "../PublicQuiz";

// Micah Quiz Questions - 10 questions about social justice and the coming Messiah
const micahQuestions = [
  {
    question: "What was Micah's main message?",
    options: [
      "Blessing for the rich",
      "Judgment for social injustice and hope for restoration",
      "Peace for all nations",
      "Only judgment"
    ],
    answer: 1
  },
  {
    question: "What did Micah prophesy about the Messiah's birthplace?",
    options: [
      "Jerusalem",
      "Bethlehem",
      "Nazareth",
      "Hebron"
    ],
    answer: 1
  },
  {
    question: "What did Micah say about what God requires?",
    options: [
      "Sacrifices and offerings",
      "To act justly, love mercy, and walk humbly with God",
      "Perfect obedience",
      "Ritual purity"
    ],
    answer: 1
  },
  {
    question: "What did Micah prophesy about Jerusalem?",
    options: [
      "It would be destroyed forever",
      "It would be restored and become the center of God's rule",
      "It would be forgotten",
      "It would be replaced"
    ],
    answer: 1
  },
  {
    question: "What did Micah say about the leaders of Israel?",
    options: [
      "They were doing well",
      "They were corrupt and oppressing the people",
      "They were blessed by God",
      "They were improving"
    ],
    answer: 1
  },
  {
    question: "What did Micah prophesy about the nations?",
    options: [
      "They would be destroyed",
      "They would come to Jerusalem to learn God's ways",
      "They would be ignored",
      "They would rule over Israel"
    ],
    answer: 1
  },
  {
    question: "What did Micah say about God's character?",
    options: [
      "God was only judgmental",
      "God was both just and merciful",
      "God was distant",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What did Micah prophesy about the future restoration?",
    options: [
      "There would be no restoration",
      "Israel would be restored and blessed",
      "Only the temple would be restored",
      "Only the priests would be restored"
    ],
    answer: 1
  },
  {
    question: "What did Micah say about the coming ruler?",
    options: [
      "He would be from Jerusalem",
      "He would be from Bethlehem and rule in peace",
      "He would be from Egypt",
      "He would be from Babylon"
    ],
    answer: 1
  },
  {
    question: "What was Micah's message about hope?",
    options: [
      "There was no hope",
      "Hope was found in God's promises of restoration",
      "Hope was in human effort",
      "Hope was in alliances"
    ],
    answer: 1
  }
];

export default function MicahPublicQuiz() {
  return (
    <PublicQuiz 
      title="Micah Quiz"
      questions={micahQuestions}
      bookName="Micah"
    />
  );
}
