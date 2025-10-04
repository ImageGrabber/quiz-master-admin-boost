import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who wrote most of the Psalms?",
    options: ["Solomon", "David", "Moses", "Asaph"],
    answer: 1,
    explanation: "David is credited with writing 73 of the 150 Psalms, making him the primary author."
  },
  {
    id: 2,
    question: "What is the first word of Psalm 23?",
    options: ["The", "Lord", "God", "My"],
    answer: 0,
    explanation: "Psalm 23:1 - 'The Lord is my shepherd, I lack nothing.'"
  },
  {
    id: 3,
    question: "How many Psalms are there in total?",
    options: ["120", "130", "140", "150"],
    answer: 3,
    explanation: "There are exactly 150 Psalms in the Bible."
  },
  {
    id: 4,
    question: "What is the longest Psalm?",
    options: ["Psalm 119", "Psalm 118", "Psalm 117", "Psalm 116"],
    answer: 0,
    explanation: "Psalm 119 is the longest chapter in the Bible with 176 verses."
  },
  {
    id: 5,
    question: "What is the shortest Psalm?",
    options: ["Psalm 117", "Psalm 116", "Psalm 115", "Psalm 114"],
    answer: 0,
    explanation: "Psalm 117 is the shortest Psalm with only 2 verses."
  },
  {
    id: 6,
    question: "In Psalm 1, what is the blessed man like?",
    options: ["A tree planted by streams of water", "A mountain that cannot be moved", "A fortress that cannot be shaken", "A light that cannot be hidden"],
    answer: 0,
    explanation: "Psalm 1:3 - 'That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither.'"
  },
  {
    id: 7,
    question: "What does Psalm 100 say we should do?",
    options: ["Be still and know that I am God", "Make a joyful noise to the Lord", "The Lord is my shepherd", "I lift up my eyes to the hills"],
    answer: 1,
    explanation: "Psalm 100:1 - 'Shout for joy to the Lord, all the earth.'"
  },
  {
    id: 8,
    question: "In Psalm 51, what does David ask God to create in him?",
    options: ["A clean heart", "A pure mind", "A righteous spirit", "A holy soul"],
    answer: 0,
    explanation: "Psalm 51:10 - 'Create in me a pure heart, O God, and renew a steadfast spirit within me.'"
  },
  {
    id: 9,
    question: "What does Psalm 46:10 say?",
    options: ["The Lord is my shepherd", "Be still and know that I am God", "The Lord is my light and my salvation", "I will lift up my eyes to the hills"],
    answer: 1,
    explanation: "Psalm 46:10 - 'He says, 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.''"
  },
  {
    id: 10,
    question: "In Psalm 139, what does David say God has done?",
    options: ["Created him", "Known him", "Loved him", "All of the above"],
    answer: 3,
    explanation: "Psalm 139 speaks of God's intimate knowledge, creation, and love for David."
  }
];

export default function PsalmsPublicQuiz() {
  return (
    <PublicQuiz 
      title="Psalms Quiz - Songs of the Heart"
      questions={questions}
      bookName="Psalms"
    />
  );
}
