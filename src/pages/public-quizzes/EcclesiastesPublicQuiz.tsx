import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What is the primary theme repeated throughout the book of Ecclesiastes?",
    options: ["Victory", "Vanity (Meaningless)", "War", "Wealth"],
    answer: 1,
    explanation: "Ecclesiastes 1:2 - 'Meaningless! Meaningless!' says the Teacher. 'Utterly meaningless! Everything is meaningless.'"
  },
  {
    id: 2,
    question: "Who is traditionally considered the 'Teacher' (Qoheleth) who wrote Ecclesiastes?",
    options: ["David", "Solomon", "Hezekiah", "Josiah"],
    answer: 1,
    explanation: "The author is described as the 'son of David, king in Jerusalem' (Ecclesiastes 1:1), traditionally identified as Solomon."
  },
  {
    id: 3,
    question: "According to Ecclesiastes 3, there is a time for everything and a season for every activity under what?",
    options: ["The ocean", "The stars", "The heavens", "The sun"],
    answer: 2,
    explanation: "Ecclesiastes 3:1 - 'There is a time for everything, and a season for every activity under the heavens.'"
  },
  {
    id: 4,
    question: "What did the Teacher conclude about the heart of man when God has set it there?",
    options: ["Desire for food", "Eternity", "Fear of death", "Hatred"],
    answer: 1,
    explanation: "Ecclesiastes 3:11 - 'He has also set eternity in the human heart; yet no one can fathom what God has done from beginning to end.'"
  },
  {
    id: 5,
    question: "What is better than a house of feasting, according to the Teacher?",
    options: ["A house of sleep", "A house of work", "A house of mourning", "A house of gold"],
    answer: 2,
    explanation: "Ecclesiastes 7:2 - 'It is better to go to a house of mourning than to go to a house of feasting, for death is the destiny of everyone.'"
  },
  {
    id: 6,
    question: "What does the Teacher say about a 'threefold cord'?",
    options: ["It is easily broken", "It is not quickly broken", "It is used for the temple", "It is a sign of royalty"],
    answer: 1,
    explanation: "Ecclesiastes 4:12 - 'Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken.'"
  },
  {
    id: 7,
    question: "Finish the verse: 'God is in heaven and you are on earth, so let your words be—'",
    options: ["Many", "Loud", "Few", "Wise"],
    answer: 2,
    explanation: "Ecclesiastes 5:2 - 'God is in heaven and you are on earth, so let your words be few.'"
  },
  {
    id: 8,
    question: "The Teacher says that 'of making many books there is no end,' and much study is a weariness to what?",
    options: ["The eyes", "The mind", "The flesh", "The soul"],
    answer: 2,
    explanation: "Ecclesiastes 12:12 - 'Of making many books there is no end, and much study wearies the body (flesh).'"
  },
  {
    id: 9,
    question: "What is the 'conclusion of the matter' according to the final chapter of Ecclesiastes?",
    options: ["Enjoy life", "Seek wisdom", "Fear God and keep his commandments", "Work hard"],
    answer: 2,
    explanation: "Ecclesiastes 12:13 - 'Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind.'"
  },
  {
    id: 10,
    question: "The Teacher observes that 'the race is not to the swift or the battle to the strong,' but what happens to them all?",
    options: ["Victory", "Time and chance", "Death", "Judgment"],
    answer: 1,
    explanation: "Ecclesiastes 9:11 - '...the race is not to the swift or the battle to the strong... but time and chance happen to them all.'"
  }
];

export default function EcclesiastesPublicQuiz() {
  return (
    <PublicQuiz 
      title="Ecclesiastes Quiz - Wisdom & Vanity"
      questions={questions}
      bookName="Ecclesiastes"
    />
  );
}
