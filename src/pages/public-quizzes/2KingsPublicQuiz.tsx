import PublicQuiz from "../PublicQuiz";

// 2 Kings Quiz Questions - 10 questions about the fall of Israel and Judah
const secondKingsQuestions = [
  {
    question: "What was the main theme of 2 Kings?",
    options: [
      "The fall of the northern kingdom of Israel",
      "The fall of the southern kingdom of Judah",
      "The ministry of Elisha",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who succeeded Elijah as prophet?",
    options: [
      "Elisha",
      "Amos",
      "Hosea",
      "Isaiah"
    ],
    answer: 0
  },
  {
    question: "What was Elisha's first miracle?",
    options: [
      "Healing the waters of Jericho",
      "Multiplying the widow's oil",
      "Raising the Shunammite's son",
      "Feeding 100 men with 20 loaves"
    ],
    answer: 0
  },
  {
    question: "Which king of Judah was known for his reforms?",
    options: [
      "Hezekiah",
      "Josiah",
      "Jehoshaphat",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What happened to the northern kingdom of Israel?",
    options: [
      "It was conquered by Assyria",
      "The people were taken into exile",
      "It never recovered",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was the last king of Judah before the exile?",
    options: [
      "Zedekiah",
      "Jehoiakim",
      "Jehoiachin",
      "Josiah"
    ],
    answer: 0
  },
  {
    question: "What happened to the temple in Jerusalem?",
    options: [
      "It was destroyed by the Babylonians",
      "All its treasures were taken to Babylon",
      "It was burned with fire",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How long did the exile last?",
    options: [
      "40 years",
      "70 years",
      "100 years",
      "200 years"
    ],
    answer: 1
  },
  {
    question: "What was the name of the Assyrian king who conquered Israel?",
    options: [
      "Sennacherib",
      "Shalmaneser",
      "Tiglath-Pileser",
      "All of the above"
    ],
    answer: 1
  },
  {
    question: "What happened to the people of Judah after the fall of Jerusalem?",
    options: [
      "They were taken to Babylon",
      "They were scattered among the nations",
      "They lost their identity",
      "All of the above"
    ],
    answer: 3
  }
];

export default function SecondKingsPublicQuiz() {
  return (
    <PublicQuiz 
      title="2 Kings Quiz"
      questions={secondKingsQuestions}
      bookName="2 Kings"
    />
  );
}
