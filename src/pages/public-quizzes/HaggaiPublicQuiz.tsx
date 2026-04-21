import PublicQuiz from "../PublicQuiz";

// Haggai Quiz Questions - 10 questions about rebuilding the temple
const haggaiQuestions = [
  {
    question: "What was Haggai's main message?",
    options: [
      "Blessing for the people",
      "Rebuild the temple and put God first",
      "Leave the land",
      "Only judgment"
    ],
    answer: 1
  },
  {
    question: "What was the condition of the temple when Haggai began prophesying?",
    options: [
      "It was complete",
      "It was in ruins and needed rebuilding",
      "It was being built",
      "It was perfect"
    ],
    answer: 1
  },
  {
    question: "What did Haggai say about the people's priorities?",
    options: [
      "They were correct",
      "They were building their own houses while God's house lay in ruins",
      "They were doing well",
      "They were blessed"
    ],
    answer: 1
  },
  {
    question: "What did Haggai prophesy about the people's prosperity?",
    options: [
      "It would increase",
      "It would decrease until they rebuilt the temple",
      "It would stay the same",
      "It would be blessed"
    ],
    answer: 1
  },
  {
    question: "What did Haggai say about the glory of the new temple?",
    options: [
      "It would be less than the old one",
      "It would be greater than the old one",
      "It would be the same",
      "It would be ignored"
    ],
    answer: 1
  },
  {
    question: "What did Haggai prophesy about Zerubbabel?",
    options: [
      "He would be forgotten",
      "He would be like a signet ring to God",
      "He would be destroyed",
      "He would be ignored"
    ],
    answer: 1
  },
  {
    question: "What did Haggai say about the people's response?",
    options: [
      "They ignored him",
      "They obeyed and began rebuilding",
      "They were angry",
      "They were confused"
    ],
    answer: 1
  },
  {
    question: "What did Haggai prophesy about the future?",
    options: [
      "There would be no future",
      "God would bless them when they put Him first",
      "They would be destroyed",
      "They would be forgotten"
    ],
    answer: 1
  },
  {
    question: "What did Haggai say about God's presence?",
    options: [
      "God was absent",
      "God was with them when they obeyed",
      "God was distant",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What was Haggai's message about obedience?",
    options: [
      "Obedience was optional",
      "Obedience to God's commands was essential",
      "Obedience was impossible",
      "Obedience was unnecessary"
    ],
    answer: 1
  }
];

export default function HaggaiPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Haggai Quiz"
      questions={haggaiQuestions}
      bookName="Haggai"
      canonicalPath={canonicalPath}
    />
  );
}
