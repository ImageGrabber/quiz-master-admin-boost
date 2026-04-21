import PublicQuiz from "../PublicQuiz";

// Luke Quiz Questions - 10 questions about Jesus as the Savior of all people
const lukeQuestions = [
  {
    question: "What was Luke's profession?",
    options: [
      "Fisherman",
      "Physician",
      "Tax collector",
      "Scribe"
    ],
    answer: 1
  },
  {
    question: "What did Luke emphasize about Jesus?",
    options: [
      "Jesus as a teacher only",
      "Jesus as the Savior of all people, including Gentiles",
      "Jesus as a miracle worker only",
      "Jesus as a prophet only"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of Luke's Gospel?",
    options: [
      "Jesus as King",
      "Jesus as the universal Savior",
      "Jesus as a teacher",
      "Jesus as a prophet"
    ],
    answer: 1
  },
  {
    question: "What did Luke record about Jesus' birth?",
    options: [
      "He was born in Nazareth",
      "He was born in Bethlehem and visited by shepherds",
      "He was born in Jerusalem",
      "He was born in Egypt"
    ],
    answer: 1
  },
  {
    question: "What did Luke emphasize about Jesus' ministry?",
    options: [
      "Only to Jews",
      "To all people, including the poor and outcasts",
      "Only to the rich",
      "Only to the religious"
    ],
    answer: 1
  },
  {
    question: "What did Luke record about Jesus' parables?",
    options: [
      "Only a few",
      "Many parables, including the Good Samaritan and Prodigal Son",
      "None",
      "Only one"
    ],
    answer: 1
  },
  {
    question: "What did Luke emphasize about Jesus' compassion?",
    options: [
      "He was harsh",
      "He showed compassion to all, especially the marginalized",
      "He was indifferent",
      "He was selective"
    ],
    answer: 1
  },
  {
    question: "What did Luke record about Jesus' death and resurrection?",
    options: [
      "He died but didn't rise",
      "He died and rose again, appearing to many",
      "He didn't die",
      "He died and stayed dead"
    ],
    answer: 1
  },
  {
    question: "What did Luke emphasize about the Holy Spirit?",
    options: [
      "The Spirit was not important",
      "The Spirit was central to Jesus' ministry and the church",
      "The Spirit was limited",
      "The Spirit was irrelevant"
    ],
    answer: 1
  },
  {
    question: "What was Luke's message about Jesus?",
    options: [
      "He was just a teacher",
      "He was the Savior of all people who came to seek and save the lost",
      "He was just a prophet",
      "He was just a miracle worker"
    ],
    answer: 1
  }
];

export default function LukePublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Luke Quiz"
      questions={lukeQuestions}
      bookName="Luke"
      canonicalPath={canonicalPath}
    />
  );
}
