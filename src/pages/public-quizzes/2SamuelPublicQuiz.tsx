import PublicQuiz from "../PublicQuiz";

// 2 Samuel Quiz Questions - 10 questions about David's reign as king
const secondSamuelQuestions = [
  {
    question: "What was the main theme of 2 Samuel?",
    options: [
      "David's reign as king of Israel",
      "The building of the temple",
      "The division of the kingdom",
      "The conquest of Jerusalem"
    ],
    answer: 0
  },
  {
    question: "What city did David make his capital?",
    options: [
      "Jerusalem",
      "Hebron",
      "Bethlehem",
      "Gibeon"
    ],
    answer: 0
  },
  {
    question: "What was David's great sin with Bathsheba?",
    options: [
      "He committed adultery",
      "He had her husband killed",
      "He tried to cover up his sin",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was the prophet that confronted David about his sin?",
    options: [
      "Samuel",
      "Nathan",
      "Gad",
      "Ahijah"
    ],
    answer: 1
  },
  {
    question: "What happened to David's first child with Bathsheba?",
    options: [
      "He lived to be king",
      "He died as a baby",
      "He became a priest",
      "He was exiled"
    ],
    answer: 1
  },
  {
    question: "Who was David's son that rebelled against him?",
    options: [
      "Solomon",
      "Absalom",
      "Adonijah",
      "Amnon"
    ],
    answer: 1
  },
  {
    question: "What was the name of David's loyal friend and advisor?",
    options: [
      "Joab",
      "Abishai",
      "Hushai",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did David do when he heard of Absalom's death?",
    options: [
      "He celebrated",
      "He mourned bitterly",
      "He was relieved",
      "He was angry"
    ],
    answer: 1
  },
  {
    question: "What was David's famous song of deliverance?",
    options: [
      "Psalm 23",
      "Psalm 51",
      "2 Samuel 22",
      "All of the above"
    ],
    answer: 2
  },
  {
    question: "Who succeeded David as king?",
    options: [
      "Absalom",
      "Adonijah",
      "Solomon",
      "Amnon"
    ],
    answer: 2
  }
];

export default function SecondSamuelPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="2 Samuel Quiz"
      questions={secondSamuelQuestions}
      bookName="2 Samuel"
      canonicalPath={canonicalPath}
    />
  );
}
