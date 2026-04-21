import PublicQuiz from "../PublicQuiz";

// John Quiz Questions - 10 questions about Jesus as the divine Son of God
const johnQuestions = [
  {
    question: "What was John's main emphasis about Jesus?",
    options: [
      "Jesus as a teacher",
      "Jesus as the divine Son of God",
      "Jesus as a miracle worker only",
      "Jesus as a prophet only"
    ],
    answer: 1
  },
  {
    question: "What did John emphasize about Jesus' identity?",
    options: [
      "He was just a man",
      "He was the Word made flesh, the Son of God",
      "He was just a prophet",
      "He was just a teacher"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of John's Gospel?",
    options: [
      "Jesus as King",
      "Jesus as the divine Son of God who gives eternal life",
      "Jesus as a teacher",
      "Jesus as a prophet"
    ],
    answer: 1
  },
  {
    question: "What did John record about Jesus' miracles?",
    options: [
      "Only a few",
      "Seven signs that revealed his divinity",
      "None",
      "Only one"
    ],
    answer: 1
  },
  {
    question: "What did John emphasize about Jesus' teachings?",
    options: [
      "Only parables",
      "Deep spiritual truths about his identity and mission",
      "Only practical advice",
      "Only prophecies"
    ],
    answer: 1
  },
  {
    question: "What did John record about Jesus' 'I am' statements?",
    options: [
      "None",
      "Seven 'I am' statements revealing his divinity",
      "Only one",
      "Only three"
    ],
    answer: 1
  },
  {
    question: "What did John emphasize about Jesus' death?",
    options: [
      "It was accidental",
      "It was the ultimate act of love and sacrifice",
      "It was avoidable",
      "It was unexpected"
    ],
    answer: 1
  },
  {
    question: "What did John record about Jesus' resurrection?",
    options: [
      "It didn't happen",
      "He rose from the dead and appeared to his disciples",
      "He stayed dead",
      "It was a myth"
    ],
    answer: 1
  },
  {
    question: "What did John emphasize about eternal life?",
    options: [
      "It was not important",
      "It was the central gift Jesus came to give",
      "It was limited",
      "It was irrelevant"
    ],
    answer: 1
  },
  {
    question: "What was John's message about Jesus?",
    options: [
      "He was just a teacher",
      "He was the divine Son of God who came to give eternal life",
      "He was just a prophet",
      "He was just a miracle worker"
    ],
    answer: 1
  }
];

export default function JohnPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="John Quiz"
      questions={johnQuestions}
      bookName="John"
      canonicalPath={canonicalPath}
    />
  );
}
