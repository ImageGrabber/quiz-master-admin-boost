import PublicQuiz from "../PublicQuiz";

// 1 Kings Quiz Questions - 10 questions about Solomon's reign and the divided kingdom
const firstKingsQuestions = [
  {
    question: "What was the main theme of 1 Kings?",
    options: [
      "Solomon's wisdom and the building of the temple",
      "The division of the kingdom",
      "The reign of various kings",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Solomon ask God for when he became king?",
    options: [
      "Wealth and riches",
      "Long life",
      "Wisdom to govern the people",
      "Victory over enemies"
    ],
    answer: 2
  },
  {
    question: "How long did it take to build the temple?",
    options: [
      "7 years",
      "10 years",
      "12 years",
      "20 years"
    ],
    answer: 0
  },
  {
    question: "What was the name of the queen who visited Solomon?",
    options: [
      "Queen of Sheba",
      "Queen of Egypt",
      "Queen of Tyre",
      "Queen of Arabia"
    ],
    answer: 0
  },
  {
    question: "Who caused the kingdom to be divided after Solomon's death?",
    options: [
      "Rehoboam",
      "Jeroboam",
      "Both A and B",
      "The people of Israel"
    ],
    answer: 2
  },
  {
    question: "What were the names of the two kingdoms after the division?",
    options: [
      "Israel and Judah",
      "North and South",
      "Samaria and Jerusalem",
      "Ephraim and Benjamin"
    ],
    answer: 0
  },
  {
    question: "Who was the prophet who confronted Ahab and Jezebel?",
    options: [
      "Elisha",
      "Elijah",
      "Micaiah",
      "All of the above"
    ],
    answer: 1
  },
  {
    question: "What happened at Mount Carmel?",
    options: [
      "Elijah challenged the prophets of Baal",
      "God sent fire from heaven",
      "The people turned back to God",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the name of Ahab's evil wife?",
    options: [
      "Jezebel",
      "Athaliah",
      "Michal",
      "Abigail"
    ],
    answer: 0
  },
  {
    question: "How did Elijah's ministry end?",
    options: [
      "He died of old age",
      "He was taken up to heaven in a whirlwind",
      "He was killed by Jezebel",
      "He was exiled"
    ],
    answer: 1
  }
];

export default function FirstKingsPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="1 Kings Quiz"
      questions={firstKingsQuestions}
      bookName="1 Kings"
      canonicalPath={canonicalPath}
    />
  );
}
