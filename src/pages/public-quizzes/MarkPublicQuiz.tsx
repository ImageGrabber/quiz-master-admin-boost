import PublicQuiz from "../PublicQuiz";

// Mark Quiz Questions - 10 questions about Jesus as the suffering servant
const markQuestions = [
  {
    question: "What was Mark's main emphasis about Jesus?",
    options: [
      "Jesus as a teacher",
      "Jesus as the suffering servant and Son of God",
      "Jesus as a miracle worker only",
      "Jesus as a prophet only"
    ],
    answer: 1
  },
  {
    question: "What did Mark emphasize about Jesus' actions?",
    options: [
      "His teachings only",
      "His deeds and miracles",
      "His parables only",
      "His prophecies only"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of Mark's Gospel?",
    options: [
      "Jesus as King",
      "Jesus as the suffering servant who came to serve",
      "Jesus as a teacher",
      "Jesus as a prophet"
    ],
    answer: 1
  },
  {
    question: "What did Mark record about Jesus' ministry?",
    options: [
      "Only his teachings",
      "His rapid ministry with many miracles",
      "Only his parables",
      "Only his prophecies"
    ],
    answer: 1
  },
  {
    question: "What did Mark emphasize about Jesus' identity?",
    options: [
      "He was just a teacher",
      "He was the Son of God",
      "He was just a prophet",
      "He was just a miracle worker"
    ],
    answer: 1
  },
  {
    question: "What did Mark record about Jesus' disciples?",
    options: [
      "They were perfect",
      "They often misunderstood Jesus",
      "They were always right",
      "They never failed"
    ],
    answer: 1
  },
  {
    question: "What did Mark emphasize about Jesus' death?",
    options: [
      "It was accidental",
      "It was the central purpose of his mission",
      "It was avoidable",
      "It was unexpected"
    ],
    answer: 1
  },
  {
    question: "What did Mark record about Jesus' resurrection?",
    options: [
      "It didn't happen",
      "He rose from the dead and appeared to his disciples",
      "He stayed dead",
      "It was a myth"
    ],
    answer: 1
  },
  {
    question: "What did Mark emphasize about Jesus' authority?",
    options: [
      "He had no authority",
      "He had authority over demons, disease, and death",
      "He had limited authority",
      "He had authority only over Jews"
    ],
    answer: 1
  },
  {
    question: "What was Mark's message about Jesus?",
    options: [
      "He was just a teacher",
      "He was the Son of God who came to serve and give his life",
      "He was just a prophet",
      "He was just a miracle worker"
    ],
    answer: 1
  }
];

export default function MarkPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Mark Quiz"
      questions={markQuestions}
      bookName="Mark"
      canonicalPath={canonicalPath}
    />
  );
}
