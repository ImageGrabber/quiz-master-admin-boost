import PublicQuiz from "../PublicQuiz";

// Zechariah Quiz Questions - 10 questions about visions and the coming Messiah
const zechariahQuestions = [
  {
    question: "What was Zechariah's main message?",
    options: [
      "Only judgment",
      "Encouragement to rebuild and hope for the future",
      "Leave the land",
      "Only blessing"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah see in his first vision?",
    options: [
      "A burning bush",
      "A man on a red horse among myrtle trees",
      "A golden calf",
      "A burning mountain"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah prophesy about the coming Messiah?",
    options: [
      "He would come from Egypt",
      "He would come riding on a donkey",
      "He would come from the east",
      "He would come from the north"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah say about the temple?",
    options: [
      "It would be destroyed",
      "It would be rebuilt and God would dwell there",
      "It would be ignored",
      "It would be replaced"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah prophesy about Jerusalem?",
    options: [
      "It would be destroyed",
      "It would be restored and become the center of God's rule",
      "It would be forgotten",
      "It would be replaced"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah say about the nations?",
    options: [
      "They would be destroyed",
      "They would come to Jerusalem to worship God",
      "They would be ignored",
      "They would rule over Israel"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah prophesy about the future?",
    options: [
      "There would be no future",
      "God would establish His kingdom on earth",
      "They would be destroyed",
      "They would be forgotten"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah say about God's presence?",
    options: [
      "God was absent",
      "God would return to dwell with His people",
      "God was distant",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What did Zechariah prophesy about the coming king?",
    options: [
      "He would be from Egypt",
      "He would be righteous and bring salvation",
      "He would be from Babylon",
      "He would be from the east"
    ],
    answer: 1
  },
  {
    question: "What was Zechariah's message about hope?",
    options: [
      "There was no hope",
      "Hope was found in God's promises of restoration",
      "Hope was in human effort",
      "Hope was in alliances"
    ],
    answer: 1
  }
];

export default function ZechariahPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Zechariah Quiz"
      questions={zechariahQuestions}
      bookName="Zechariah"
      canonicalPath={canonicalPath}
    />
  );
}
