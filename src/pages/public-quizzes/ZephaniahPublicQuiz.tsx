import PublicQuiz from "../PublicQuiz";

// Zephaniah Quiz Questions - 10 questions about the Day of the Lord and restoration
const zephaniahQuestions = [
  {
    question: "What was Zephaniah's main message?",
    options: [
      "Blessing for all nations",
      "The coming Day of the Lord and restoration",
      "Peace for Israel only",
      "Only judgment"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah prophesy about the Day of the Lord?",
    options: [
      "It would be a day of blessing",
      "It would be a day of judgment and destruction",
      "It would never come",
      "It would be a day of peace"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah say about Jerusalem?",
    options: [
      "It would be blessed",
      "It would be destroyed for its sin",
      "It would be ignored",
      "It would be restored immediately"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah prophesy about the nations?",
    options: [
      "They would be blessed",
      "They would be judged by God",
      "They would be ignored",
      "They would rule over Israel"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah say about the remnant?",
    options: [
      "There would be no remnant",
      "A humble remnant would be spared",
      "Only the rich would survive",
      "Only the priests would survive"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah prophesy about the future restoration?",
    options: [
      "There would be no restoration",
      "Israel would be restored and blessed",
      "Only the temple would be restored",
      "Only the priests would be restored"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah say about God's character?",
    options: [
      "God was only judgmental",
      "God was both just and merciful",
      "God was distant",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah prophesy about the nations' worship?",
    options: [
      "They would worship their own gods",
      "They would come to worship the true God",
      "They would be destroyed",
      "They would be ignored"
    ],
    answer: 1
  },
  {
    question: "What did Zephaniah say about the coming judgment?",
    options: [
      "It would be delayed forever",
      "It would come suddenly and unexpectedly",
      "It would never happen",
      "It would be announced in advance"
    ],
    answer: 1
  },
  {
    question: "What was Zephaniah's message about hope?",
    options: [
      "There was no hope",
      "Hope was found in God's promises of restoration",
      "Hope was in human effort",
      "Hope was in alliances"
    ],
    answer: 1
  }
];

export default function ZephaniahPublicQuiz() {
  return (
    <PublicQuiz 
      title="Zephaniah Quiz"
      questions={zephaniahQuestions}
      bookName="Zephaniah"
    />
  );
}
