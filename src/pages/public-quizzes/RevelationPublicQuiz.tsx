import PublicQuiz from "../PublicQuiz";

// Revelation Quiz Questions - 10 questions about the book of Revelation
const revelationQuestions = [
  {
    question: "What is the main theme of Revelation?",
    options: [
      "Church organization",
      "The end times, Christ's return, and the final victory",
      "Financial giving",
      "Personal success"
    ],
    answer: 1
  },
  {
    question: "What does Revelation 1:3 say about those who read this prophecy?",
    options: [
      "Blessed is the one who reads aloud the words of this prophecy",
      "Cursed",
      "Punished",
      "Ignored"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 1:8 say the Lord God is?",
    options: [
      "The Alpha and the Omega, who is, and who was, and who is to come, the Almighty",
      "Just a man",
      "An angel",
      "A prophet"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 3:20 say Jesus is doing?",
    options: [
      "I stand at the door and knock. If anyone hears my voice and opens the door, I will come in",
      "Waiting outside",
      "Ignoring us",
      "Abandoning us"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 4:8 say the four living creatures never stop saying?",
    options: [
      "Holy, holy, holy is the Lord God Almighty",
      "Nothing",
      "Praise to themselves",
      "Praise to others"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 5:5 say the Lion of the tribe of Judah has done?",
    options: [
      "Has triumphed",
      "Has failed",
      "Has given up",
      "Has lost"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 7:9 say John saw?",
    options: [
      "A great multitude that no one could count, from every nation, tribe, people and language",
      "Only a few people",
      "Only one nation",
      "Only one language"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 11:15 say the kingdom of the world has become?",
    options: [
      "The kingdom of our Lord and of his Messiah",
      "Nothing",
      "The same",
      "Worse"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 19:11 say John saw?",
    options: [
      "Heaven standing open and there before me was a white horse, whose rider is called Faithful and True",
      "Nothing",
      "A black horse",
      "A red horse"
    ],
    answer: 0
  },
  {
    question: "What does Revelation 21:4 say God will wipe away?",
    options: [
      "Every tear from their eyes. There will be no more death or mourning or crying or pain",
      "Nothing",
      "Only some tears",
      "Only some pain"
    ],
    answer: 0
  }
];

export default function RevelationPublicQuiz() {
  return (
    <PublicQuiz 
      title="Revelation Quiz"
      questions={revelationQuestions}
      bookName="Revelation"
    />
  );
}