import PublicQuiz from "../PublicQuiz";

// Ezra Quiz Questions - 10 questions about the return from exile and rebuilding
const ezraQuestions = [
  {
    question: "What was the main theme of the book of Ezra?",
    options: [
      "The return of the exiles from Babylon",
      "The rebuilding of the temple",
      "The restoration of worship",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who led the first group of exiles back to Jerusalem?",
    options: [
      "Ezra",
      "Nehemiah",
      "Zerubbabel",
      "Joshua"
    ],
    answer: 2
  },
  {
    question: "What was the first thing the returned exiles did?",
    options: [
      "They rebuilt the walls",
      "They rebuilt the temple",
      "They restored the altar",
      "They organized the people"
    ],
    answer: 2
  },
  {
    question: "Who were the main opponents of the temple rebuilding?",
    options: [
      "The Samaritans",
      "The Ammonites",
      "The Moabites",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did the people do when the foundation of the temple was laid?",
    options: [
      "They shouted for joy",
      "They wept with joy",
      "They offered sacrifices",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was the prophet who encouraged the people to rebuild?",
    options: [
      "Haggai",
      "Zechariah",
      "Both A and B",
      "Malachi"
    ],
    answer: 2
  },
  {
    question: "What was Ezra's main role?",
    options: [
      "He was a priest",
      "He was a scribe",
      "He taught the Law",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Ezra do when he found the people had intermarried with foreigners?",
    options: [
      "He led them in repentance",
      "He made them put away their foreign wives",
      "He fasted and prayed",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How long did it take to complete the temple?",
    options: [
      "2 years",
      "4 years",
      "6 years",
      "8 years"
    ],
    answer: 1
  },
  {
    question: "What was the main message of Ezra's ministry?",
    options: [
      "The importance of obedience to God's Law",
      "The need for separation from foreign influences",
      "The restoration of proper worship",
      "All of the above"
    ],
    answer: 3
  }
];

export default function EzraPublicQuiz() {
  return (
    <PublicQuiz 
      title="Ezra Quiz"
      questions={ezraQuestions}
      bookName="Ezra"
    />
  );
}
