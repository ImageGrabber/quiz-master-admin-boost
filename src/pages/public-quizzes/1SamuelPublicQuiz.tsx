import PublicQuiz from "../PublicQuiz";

// 1 Samuel Quiz Questions - 10 questions about Samuel, Saul, and David
const firstSamuelQuestions = [
  {
    question: "What was the main theme of 1 Samuel?",
    options: [
      "The transition from judges to kings",
      "The life of David",
      "The building of the temple",
      "The conquest of Canaan"
    ],
    answer: 0
  },
  {
    question: "Who was Samuel's mother?",
    options: [
      "Hannah",
      "Deborah",
      "Miriam",
      "Ruth"
    ],
    answer: 0
  },
  {
    question: "What did Hannah promise to do if God gave her a son?",
    options: [
      "She would name him Samuel",
      "She would dedicate him to the Lord",
      "She would make him a priest",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was Israel's first king?",
    options: [
      "David",
      "Saul",
      "Samuel",
      "Solomon"
    ],
    answer: 1
  },
  {
    question: "What was Saul's great sin that cost him the kingdom?",
    options: [
      "He offered sacrifices instead of waiting for Samuel",
      "He spared the Amalekite king and livestock",
      "He consulted a medium",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who anointed David as the next king?",
    options: [
      "Samuel",
      "Saul",
      "Nathan",
      "Gad"
    ],
    answer: 0
  },
  {
    question: "What was David's famous victory over Goliath?",
    options: [
      "He used a sling and stone",
      "He cut off Goliath's head",
      "He trusted in the Lord",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the relationship between David and Jonathan?",
    options: [
      "They were brothers",
      "They were best friends",
      "They were enemies",
      "They were cousins"
    ],
    answer: 1
  },
  {
    question: "What happened to Saul at the end of 1 Samuel?",
    options: [
      "He was killed in battle",
      "He committed suicide",
      "He was captured by the Philistines",
      "He died of old age"
    ],
    answer: 1
  },
  {
    question: "What was the name of the priest who helped David?",
    options: [
      "Ahimelech",
      "Abiathar",
      "Zadok",
      "All of the above"
    ],
    answer: 0
  }
];

export default function FirstSamuelPublicQuiz() {
  return (
    <PublicQuiz 
      title="1 Samuel Quiz"
      questions={firstSamuelQuestions}
      bookName="1 Samuel"
    />
  );
}
