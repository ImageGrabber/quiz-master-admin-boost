import PublicQuiz from "../PublicQuiz";

// Matthew Quiz Questions - 10 questions about the life and teachings of Jesus
const matthewQuestions = [
  {
    question: "What was Matthew's profession before following Jesus?",
    options: [
      "Fisherman",
      "Tax collector",
      "Shepherd",
      "Scribe"
    ],
    answer: 1
  },
  {
    question: "What did Matthew emphasize about Jesus?",
    options: [
      "His miracles only",
      "His fulfillment of Old Testament prophecies",
      "His parables only",
      "His disciples only"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of Matthew's Gospel?",
    options: [
      "Jesus as a teacher",
      "Jesus as the promised Messiah and King",
      "Jesus as a miracle worker",
      "Jesus as a prophet"
    ],
    answer: 1
  },
  {
    question: "What did Matthew record about Jesus' birth?",
    options: [
      "He was born in Nazareth",
      "He was born in Bethlehem and visited by wise men",
      "He was born in Jerusalem",
      "He was born in Egypt"
    ],
    answer: 1
  },
  {
    question: "What did Matthew record about Jesus' teachings?",
    options: [
      "Only parables",
      "The Sermon on the Mount and many teachings",
      "Only miracles",
      "Only prophecies"
    ],
    answer: 1
  },
  {
    question: "What did Matthew emphasize about the kingdom of heaven?",
    options: [
      "It was only for Jews",
      "It was at hand and open to all who repented",
      "It was far away",
      "It was only for the righteous"
    ],
    answer: 1
  },
  {
    question: "What did Matthew record about Jesus' death and resurrection?",
    options: [
      "He died but didn't rise",
      "He died and rose again on the third day",
      "He didn't die",
      "He died and stayed dead"
    ],
    answer: 1
  },
  {
    question: "What did Matthew emphasize about Jesus' authority?",
    options: [
      "He had no authority",
      "He had authority over all things",
      "He had limited authority",
      "He had authority only over Jews"
    ],
    answer: 1
  },
  {
    question: "What did Matthew record about Jesus' final commission?",
    options: [
      "To stay in Jerusalem",
      "To go and make disciples of all nations",
      "To only teach Jews",
      "To avoid Gentiles"
    ],
    answer: 1
  },
  {
    question: "What was Matthew's message about Jesus' identity?",
    options: [
      "He was just a teacher",
      "He was the Son of God and Savior of the world",
      "He was just a prophet",
      "He was just a miracle worker"
    ],
    answer: 1
  }
];

export default function MatthewPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Matthew Quiz"
      questions={matthewQuestions}
      bookName="Matthew"
      canonicalPath={canonicalPath}
    />
  );
}