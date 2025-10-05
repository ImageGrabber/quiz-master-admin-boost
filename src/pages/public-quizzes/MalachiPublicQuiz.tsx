import PublicQuiz from "../PublicQuiz";

// Malachi Quiz Questions - 10 questions about the last prophet and the coming Messiah
const malachiQuestions = [
  {
    question: "What was Malachi's main message?",
    options: [
      "Only blessing",
      "Call to repentance and the coming of the Messiah",
      "Only judgment",
      "Leave the land"
    ],
    answer: 1
  },
  {
    question: "What did Malachi say about the people's offerings?",
    options: [
      "They were perfect",
      "They were giving God their worst instead of their best",
      "They were too generous",
      "They were unnecessary"
    ],
    answer: 1
  },
  {
    question: "What did Malachi prophesy about the coming Messiah?",
    options: [
      "He would come from Egypt",
      "He would come to His temple suddenly",
      "He would come from the east",
      "He would come from the north"
    ],
    answer: 1
  },
  {
    question: "What did Malachi say about the priests?",
    options: [
      "They were doing well",
      "They were corrupt and leading the people astray",
      "They were blessed",
      "They were improving"
    ],
    answer: 1
  },
  {
    question: "What did Malachi prophesy about the future?",
    options: [
      "There would be no future",
      "God would send Elijah before the great day",
      "They would be destroyed",
      "They would be forgotten"
    ],
    answer: 1
  },
  {
    question: "What did Malachi say about God's love?",
    options: [
      "God's love was conditional",
      "God's love was demonstrated in choosing Israel",
      "God's love was temporary",
      "God's love was earned"
    ],
    answer: 1
  },
  {
    question: "What did Malachi say about the people's response?",
    options: [
      "They were obedient",
      "They were questioning God's love and justice",
      "They were faithful",
      "They were blessed"
    ],
    answer: 1
  },
  {
    question: "What did Malachi prophesy about the coming judgment?",
    options: [
      "It would be delayed forever",
      "It would come like a refiner's fire",
      "It would never happen",
      "It would be partial"
    ],
    answer: 1
  },
  {
    question: "What did Malachi say about the coming restoration?",
    options: [
      "There would be no restoration",
      "God would restore the hearts of parents and children",
      "They would be destroyed",
      "They would be forgotten"
    ],
    answer: 1
  },
  {
    question: "What was Malachi's final message?",
    options: [
      "There was no hope",
      "Hope was found in God's promises and the coming Messiah",
      "Hope was in human effort",
      "Hope was in alliances"
    ],
    answer: 1
  }
];

export default function MalachiPublicQuiz() {
  return (
    <PublicQuiz 
      title="Malachi Quiz"
      questions={malachiQuestions}
      bookName="Malachi"
    />
  );
}
