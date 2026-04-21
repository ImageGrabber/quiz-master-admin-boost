import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who is credited with writing most of the book of Proverbs?",
    options: ["David", "Solomon", "Moses", "Isaiah"],
    answer: 1,
    explanation: "Proverbs 1:1 - The proverbs of Solomon son of David, king of Israel."
  },
  {
    id: 2,
    question: "What is the beginning of wisdom according to Proverbs?",
    options: ["Knowledge", "Understanding", "The fear of the Lord", "Experience"],
    answer: 2,
    explanation: "Proverbs 9:10 - The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding."
  },
  {
    id: 3,
    question: "What does Proverbs say about the tongue?",
    options: ["It has the power of life and death", "It is sharper than a sword", "It reveals what is in the heart", "All of the above"],
    answer: 3,
    explanation: "Proverbs 18:21 - The tongue has the power of life and death, and those who love it will eat its fruit."
  },
  {
    id: 4,
    question: "What does Proverbs say about training up a child?",
    options: ["In the way he should go", "With discipline and love", "In the fear of the Lord", "With patience and understanding"],
    answer: 0,
    explanation: "Proverbs 22:6 - Start children off on the way they should go, and even when they are old they will not turn from it."
  },
  {
    id: 5,
    question: "What does Proverbs say about the lazy person?",
    options: ["Will go hungry", "Will be poor", "Will be shamed", "All of the above"],
    answer: 3,
    explanation: "Proverbs 19:15 - Laziness brings on deep sleep, and the shiftless go hungry."
  },
  {
    id: 6,
    question: "What does Proverbs say about a friend?",
    options: ["Sticks closer than a brother", "Loves at all times", "Is born for adversity", "All of the above"],
    answer: 3,
    explanation: "Proverbs 17:17 - A friend loves at all times, and a brother is born for a time of adversity."
  },
  {
    id: 7,
    question: "What does Proverbs say about the heart?",
    options: ["Is deceitful above all things", "Guards the mouth", "Is the wellspring of life", "All of the above"],
    answer: 2,
    explanation: "Proverbs 4:23 - Above all else, guard your heart, for everything you do flows from it."
  },
  {
    id: 8,
    question: "What does Proverbs say about answering a fool?",
    options: ["Answer him according to his folly", "Don't answer him at all", "Answer him with wisdom", "Answer him with patience"],
    answer: 0,
    explanation: "Proverbs 26:5 - Answer a fool according to his folly, or he will be wise in his own eyes."
  },
  {
    id: 9,
    question: "What does Proverbs say about the righteous?",
    options: ["Will flourish like a palm tree", "Will be like a tree planted by streams of water", "Will never be shaken", "All of the above"],
    answer: 3,
    explanation: "Proverbs 11:28 - Those who trust in their riches will fall, but the righteous will thrive like a green leaf."
  },
  {
    id: 10,
    question: "What does Proverbs say about the wise person?",
    options: ["Listens to advice", "Stores up knowledge", "Seeks understanding", "All of the above"],
    answer: 3,
    explanation: "Proverbs 1:5 - Let the wise listen and add to their learning, and let the discerning get guidance."
  }
];

export default function ProverbsPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Proverbs Quiz - Wisdom for Daily Living"
      questions={questions}
      bookName="Proverbs"
      canonicalPath={canonicalPath}
    />
  );
}
