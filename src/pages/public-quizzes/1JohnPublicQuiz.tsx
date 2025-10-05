import PublicQuiz from "../PublicQuiz";

// 1 John Quiz Questions - 10 questions about John's first letter
const john1Questions = [
  {
    question: "What is the main theme of 1 John?",
    options: [
      "Church organization",
      "Love, fellowship, and walking in the light",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does 1 John 1:5 say God is?",
    options: [
      "Light; in him there is no darkness at all",
      "Darkness",
      "Confusion",
      "Mystery"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 1:9 say God will do if we confess our sins?",
    options: [
      "He is faithful and just and will forgive us our sins and purify us from all unrighteousness",
      "Nothing",
      "Punish us",
      "Ignore us"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 2:15 say believers should not love?",
    options: [
      "The world or anything in the world",
      "God",
      "Others",
      "Themselves"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 3:16 say we know love by?",
    options: [
      "This: Jesus Christ laid down his life for us",
      "Our feelings",
      "Our thoughts",
      "Our desires"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 4:8 say God is?",
    options: [
      "Love",
      "Hate",
      "Anger",
      "Fear"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 4:18 say perfect love does?",
    options: [
      "Drives out fear",
      "Causes fear",
      "Creates fear",
      "Increases fear"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 5:3 say God's commands are?",
    options: [
      "Not burdensome",
      "Too hard",
      "Impossible",
      "Unfair"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 5:14 say about asking according to God's will?",
    options: [
      "He hears us",
      "He ignores us",
      "He punishes us",
      "He abandons us"
    ],
    answer: 0
  },
  {
    question: "What does 1 John 5:21 say believers should keep themselves from?",
    options: [
      "Idols",
      "God",
      "Prayer",
      "Good works"
    ],
    answer: 0
  }
];

export default function John1PublicQuiz() {
  return (
    <PublicQuiz 
      title="1 John Quiz"
      questions={john1Questions}
      bookName="1 John"
    />
  );
}
