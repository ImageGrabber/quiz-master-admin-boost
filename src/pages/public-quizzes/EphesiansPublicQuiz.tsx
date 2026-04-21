import PublicQuiz from "../PublicQuiz";

// Ephesians Quiz Questions - 10 questions about Paul's letter to the Ephesians
const ephesiansQuestions = [
  {
    question: "What is the main theme of Ephesians?",
    options: [
      "Church organization",
      "The church as Christ's body and spiritual warfare",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does Ephesians 1:3 say God has blessed us with?",
    options: [
      "Every spiritual blessing in Christ",
      "Material wealth",
      "Perfect health",
      "Worldly success"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 2:8 say we are saved by?",
    options: [
      "Works",
      "Grace through faith",
      "The law",
      "Our efforts"
    ],
    answer: 1
  },
  {
    question: "What does Ephesians 3:20 say God is able to do?",
    options: [
      "Immeasurably more than all we ask or imagine",
      "Only what we ask",
      "Less than we need",
      "Only what we deserve"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 4:11 say God gave to the church?",
    options: [
      "Apostles, prophets, evangelists, pastors and teachers",
      "Only pastors",
      "Only apostles",
      "Only prophets"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 5:25 say husbands should do?",
    options: [
      "Love their wives as Christ loved the church",
      "Rule over their wives",
      "Ignore their wives",
      "Control their wives"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 6:10 say believers should be strong in?",
    options: [
      "The Lord and in his mighty power",
      "Their own strength",
      "Their wealth",
      "Their knowledge"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 6:12 say our struggle is not against?",
    options: [
      "Flesh and blood",
      "The devil",
      "Demons",
      "Evil spirits"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 6:17 say the sword of the Spirit is?",
    options: [
      "The word of God",
      "Physical weapons",
      "Human wisdom",
      "Church authority"
    ],
    answer: 0
  },
  {
    question: "What does Ephesians 6:18 say believers should do?",
    options: [
      "Pray in the Spirit on all occasions",
      "Only pray when needed",
      "Pray only for themselves",
      "Pray only in church"
    ],
    answer: 0
  }
];

export default function EphesiansPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Ephesians Quiz"
      questions={ephesiansQuestions}
      bookName="Ephesians"
      canonicalPath={canonicalPath}
    />
  );
}
