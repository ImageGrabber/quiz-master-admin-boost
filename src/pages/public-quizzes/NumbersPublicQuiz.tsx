import PublicQuiz from "../PublicQuiz";

// Numbers Quiz Questions - 10 questions about wilderness journey and God's faithfulness
const numbersQuestions = [
  {
    question: "What was the main theme of the book of Numbers?",
    options: [
      "The creation of the world",
      "Israel's journey through the wilderness",
      "The giving of the Ten Commandments",
      "The conquest of Canaan"
    ],
    answer: 1
  },
  {
    question: "How many men were counted in the first census of Israel?",
    options: [
      "600,000",
      "603,550", 
      "700,000",
      "500,000"
    ],
    answer: 1
  },
  {
    question: "What happened when the people complained about the manna?",
    options: [
      "God sent quail",
      "God sent plagues",
      "God sent fire",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was chosen to succeed Moses as leader?",
    options: [
      "Aaron",
      "Joshua",
      "Caleb",
      "Eleazar"
    ],
    answer: 1
  },
  {
    question: "What was the punishment for the spies who gave a bad report about Canaan?",
    options: [
      "They were stoned",
      "They died in a plague",
      "They were exiled",
      "They were made slaves"
    ],
    answer: 1
  },
  {
    question: "How long did Israel wander in the wilderness?",
    options: [
      "30 years",
      "40 years",
      "50 years",
      "70 years"
    ],
    answer: 1
  },
  {
    question: "What was the name of the bronze serpent that Moses made?",
    options: [
      "Nehushtan",
      "Seraph",
      "Cherub",
      "It had no name"
    ],
    answer: 0
  },
  {
    question: "Who was the prophetess who led Israel with Moses and Aaron?",
    options: [
      "Deborah",
      "Miriam",
      "Huldah",
      "Anna"
    ],
    answer: 1
  },
  {
    question: "What did the people do when they reached the border of the Promised Land?",
    options: [
      "They immediately entered",
      "They sent spies to explore",
      "They built an altar",
      "They celebrated with a feast"
    ],
    answer: 1
  },
  {
    question: "What was the purpose of the cloud and fire that guided Israel?",
    options: [
      "To provide light at night",
      "To show God's presence and guidance",
      "To protect from enemies",
      "To provide warmth"
    ],
    answer: 1
  }
];

export default function NumbersPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Numbers Quiz"
      questions={numbersQuestions}
      bookName="Numbers"
      canonicalPath={canonicalPath}
    />
  );
}
