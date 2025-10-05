import PublicQuiz from "../PublicQuiz";

// Nehemiah Quiz Questions - 10 questions about rebuilding the walls of Jerusalem
const nehemiahQuestions = [
  {
    question: "What was Nehemiah's main mission?",
    options: [
      "To rebuild the walls of Jerusalem",
      "To restore the temple worship",
      "To lead the people in repentance",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was Nehemiah's job in the Persian court?",
    options: [
      "He was a cupbearer to the king",
      "He was a scribe",
      "He was a governor",
      "He was a priest"
    ],
    answer: 0
  },
  {
    question: "How did Nehemiah get permission to go to Jerusalem?",
    options: [
      "He asked the king directly",
      "He prayed and the king granted his request",
      "He was sent by the king",
      "He escaped from the court"
    ],
    answer: 1
  },
  {
    question: "How long did it take to rebuild the walls?",
    options: [
      "42 days",
      "52 days",
      "62 days",
      "72 days"
    ],
    answer: 1
  },
  {
    question: "Who were the main opponents of the wall rebuilding?",
    options: [
      "Sanballat",
      "Tobiah",
      "Geshem",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did the people do while rebuilding the walls?",
    options: [
      "They worked with one hand and held weapons with the other",
      "They took turns working and standing guard",
      "They worked day and night",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Nehemiah do when he found the people were being oppressed?",
    options: [
      "He confronted the oppressors",
      "He made them return what they had taken",
      "He led the people in repentance",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Nehemiah do to ensure the city was populated?",
    options: [
      "He brought people from other cities",
      "He cast lots to choose who would live there",
      "He offered incentives to live in Jerusalem",
      "All of the above"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of Nehemiah's reforms?",
    options: [
      "The importance of keeping the Sabbath",
      "The prohibition of intermarriage with foreigners",
      "The restoration of temple worship",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What happened when the walls were completed?",
    options: [
      "The people celebrated with great joy",
      "They dedicated the walls with music and thanksgiving",
      "They read the Law and renewed their covenant",
      "All of the above"
    ],
    answer: 3
  }
];

export default function NehemiahPublicQuiz() {
  return (
    <PublicQuiz 
      title="Nehemiah Quiz"
      questions={nehemiahQuestions}
      bookName="Nehemiah"
    />
  );
}
