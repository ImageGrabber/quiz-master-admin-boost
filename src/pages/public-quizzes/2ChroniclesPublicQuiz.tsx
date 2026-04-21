import PublicQuiz from "../PublicQuiz";

// 2 Chronicles Quiz Questions - 10 questions about Solomon's temple and Judah's kings
const secondChroniclesQuestions = [
  {
    question: "What was the main focus of 2 Chronicles?",
    options: [
      "The building and dedication of the temple",
      "The history of the southern kingdom of Judah",
      "The importance of worship and obedience",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How long did it take Solomon to build the temple?",
    options: [
      "7 years",
      "10 years",
      "12 years",
      "20 years"
    ],
    answer: 0
  },
  {
    question: "What happened when the temple was dedicated?",
    options: [
      "The glory of the Lord filled the temple",
      "Fire came down from heaven",
      "The people offered many sacrifices",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Which king of Judah was known for his great reforms?",
    options: [
      "Hezekiah",
      "Josiah",
      "Jehoshaphat",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Josiah do when the Book of the Law was found?",
    options: [
      "He tore his clothes in repentance",
      "He led a great revival",
      "He destroyed all idols and high places",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the name of the prophetess who confirmed Josiah's reforms?",
    options: [
      "Huldah",
      "Deborah",
      "Miriam",
      "Anna"
    ],
    answer: 0
  },
  {
    question: "What happened to the temple treasures?",
    options: [
      "They were taken to Babylon",
      "They were hidden by the priests",
      "They were destroyed by enemies",
      "They were lost forever"
    ],
    answer: 0
  },
  {
    question: "Who was the last king of Judah mentioned in Chronicles?",
    options: [
      "Zedekiah",
      "Jehoiakim",
      "Jehoiachin",
      "Josiah"
    ],
    answer: 0
  },
  {
    question: "What was the main message of Chronicles?",
    options: [
      "The importance of obedience to God",
      "The consequences of sin and idolatry",
      "The hope of restoration",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What happened to the people of Judah after the fall of Jerusalem?",
    options: [
      "They were taken into exile in Babylon",
      "They were scattered among the nations",
      "They lost their temple and land",
      "All of the above"
    ],
    answer: 3
  }
];

export default function SecondChroniclesPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="2 Chronicles Quiz"
      questions={secondChroniclesQuestions}
      bookName="2 Chronicles"
      canonicalPath={canonicalPath}
    />
  );
}
