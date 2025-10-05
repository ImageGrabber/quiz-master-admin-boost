import PublicQuiz from "../PublicQuiz";

// 1 Chronicles Quiz Questions - 10 questions about genealogies and David's reign
const firstChroniclesQuestions = [
  {
    question: "What was the main purpose of 1 Chronicles?",
    options: [
      "To record genealogies from Adam to the exile",
      "To focus on David's reign and the temple",
      "To provide a priestly perspective on history",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What does the book of Chronicles emphasize?",
    options: [
      "The importance of the temple and worship",
      "The role of the priests and Levites",
      "God's faithfulness to His people",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was the first person mentioned in the genealogies?",
    options: [
      "Adam",
      "Noah",
      "Abraham",
      "Jacob"
    ],
    answer: 0
  },
  {
    question: "What was David's great desire that he couldn't fulfill?",
    options: [
      "To build the temple",
      "To conquer all enemies",
      "To establish a dynasty",
      "To write psalms"
    ],
    answer: 0
  },
  {
    question: "Who was chosen to build the temple instead of David?",
    options: [
      "Solomon",
      "Nathan",
      "Zadok",
      "Abiathar"
    ],
    answer: 0
  },
  {
    question: "What was the name of the place where David brought the ark?",
    options: [
      "Jerusalem",
      "Zion",
      "The City of David",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How many warriors did David have in his army?",
    options: [
      "300,000",
      "1,000,000",
      "1,300,000",
      "2,000,000"
    ],
    answer: 2
  },
  {
    question: "What was the purpose of the genealogies in Chronicles?",
    options: [
      "To establish legitimate descent",
      "To show God's faithfulness through generations",
      "To connect the past with the present",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who were the Levites and what was their role?",
    options: [
      "They were the priestly tribe",
      "They were responsible for the temple service",
      "They were musicians and gatekeepers",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What happened to the ark of the covenant in David's time?",
    options: [
      "It was brought to Jerusalem",
      "It was placed in a tent",
      "David danced before it",
      "All of the above"
    ],
    answer: 3
  }
];

export default function FirstChroniclesPublicQuiz() {
  return (
    <PublicQuiz 
      title="1 Chronicles Quiz"
      questions={firstChroniclesQuestions}
      bookName="1 Chronicles"
    />
  );
}
