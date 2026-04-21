import PublicQuiz from "../PublicQuiz";

// Colossians Quiz Questions - 10 questions about Paul's letter to the Colossians
const colossiansQuestions = [
  {
    question: "What is the main theme of Colossians?",
    options: [
      "Church organization",
      "The supremacy of Christ and Christian living",
      "End times prophecy",
      "Financial giving"
    ],
    answer: 1
  },
  {
    question: "What does Colossians 1:15 say Christ is?",
    options: [
      "The image of the invisible God",
      "Just a man",
      "An angel",
      "A prophet"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 1:16 say all things were created?",
    options: [
      "Through him and for him",
      "By chance",
      "By evolution",
      "By other gods"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 2:9 say dwells in Christ?",
    options: [
      "All the fullness of the Deity",
      "Partial divinity",
      "Human nature only",
      "Nothing special"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 3:1 say believers should set their hearts on?",
    options: [
      "Things above, where Christ is",
      "Earthly things",
      "Material wealth",
      "Worldly success"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 3:12 say believers should clothe themselves with?",
    options: [
      "Compassion, kindness, humility, gentleness and patience",
      "Expensive clothes",
      "Worldly fashion",
      "Nothing special"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 3:13 say believers should do?",
    options: [
      "Forgive as the Lord forgave you",
      "Hold grudges",
      "Seek revenge",
      "Ignore others"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 3:16 say the word of Christ should dwell in believers?",
    options: [
      "Richly",
      "Poorly",
      "Occasionally",
      "Never"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 3:23 say believers should work at?",
    options: [
      "Whatever you do, work at it with all your heart",
      "Only what you want",
      "Only when you feel like it",
      "Only for yourself"
    ],
    answer: 0
  },
  {
    question: "What does Colossians 4:6 say believers' conversation should be?",
    options: [
      "Always full of grace, seasoned with salt",
      "Harsh and critical",
      "Boring and dull",
      "Self-centered"
    ],
    answer: 0
  }
];

export default function ColossiansPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Colossians Quiz"
      questions={colossiansQuestions}
      bookName="Colossians"
      canonicalPath={canonicalPath}
    />
  );
}
