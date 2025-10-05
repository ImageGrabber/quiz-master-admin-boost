import PublicQuiz from "../PublicQuiz";

// Hosea Quiz Questions - 10 questions about God's love and Israel's unfaithfulness
const hoseaQuestions = [
  {
    question: "What was the main theme of Hosea's message?",
    options: [
      "God's judgment on Israel",
      "God's love despite Israel's unfaithfulness",
      "The coming Messiah",
      "The fall of Jerusalem"
    ],
    answer: 1
  },
  {
    question: "What did God command Hosea to do as a living illustration?",
    options: [
      "To marry a prostitute",
      "To name his children symbolic names",
      "To buy back his unfaithful wife",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What were the names of Hosea's children?",
    options: [
      "Jezreel, Lo-Ruhamah, Lo-Ammi",
      "Immanuel, Maher-shalal-hash-baz",
      "Shear-jashub, Immanuel",
      "None of the above"
    ],
    answer: 0
  },
  {
    question: "What did the name 'Lo-Ruhamah' mean?",
    options: [
      "Not loved",
      "Not my people",
      "God sows",
      "God is salvation"
    ],
    answer: 0
  },
  {
    question: "What did Hosea say about Israel's relationship with God?",
    options: [
      "Israel was faithful to God",
      "Israel had forgotten God",
      "Israel was God's favorite",
      "Israel was chosen above all nations"
    ],
    answer: 1
  },
  {
    question: "What did Hosea prophesy about Israel's future?",
    options: [
      "Complete destruction",
      "Restoration and blessing",
      "Eternal exile",
      "No hope"
    ],
    answer: 1
  },
  {
    question: "What was Hosea's message about repentance?",
    options: [
      "It was too late for Israel",
      "God would accept their repentance",
      "Only sacrifices were needed",
      "Repentance was impossible"
    ],
    answer: 1
  },
  {
    question: "What did Hosea say about God's love?",
    options: [
      "God's love was conditional",
      "God's love was like a father's love",
      "God's love was temporary",
      "God's love was earned"
    ],
    answer: 1
  },
  {
    question: "What did Hosea prophesy about the Messiah?",
    options: [
      "He would come from Egypt",
      "He would be called out of Egypt",
      "He would be born in Bethlehem",
      "He would come from the east"
    ],
    answer: 1
  },
  {
    question: "What was Hosea's final message?",
    options: [
      "Complete destruction",
      "Hope and restoration",
      "Eternal judgment",
      "No future for Israel"
    ],
    answer: 1
  }
];

export default function HoseaPublicQuiz() {
  return (
    <PublicQuiz 
      title="Hosea Quiz"
      questions={hoseaQuestions}
      bookName="Hosea"
    />
  );
}
