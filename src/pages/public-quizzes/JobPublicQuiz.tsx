import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was Job's occupation?",
    options: ["Farmer", "Shepherd", "Merchant", "We don't know specifically"],
    answer: 3,
    explanation: "Job 1:3 - He owned seven thousand sheep, three thousand camels, five hundred yoke of oxen and five hundred donkeys, and had a large number of servants. He was the greatest man among all the people of the East."
  },
  {
    id: 2,
    question: "How many children did Job have?",
    options: ["Seven sons and three daughters", "Ten sons and ten daughters", "Five sons and five daughters", "Three sons and seven daughters"],
    answer: 0,
    explanation: "Job 1:2 - He had seven sons and three daughters."
  },
  {
    id: 3,
    question: "What did Satan say about Job's faithfulness?",
    options: ["Job was faithful because he was blessed", "Job would curse God if his blessings were taken away", "Job was not truly faithful", "All of the above"],
    answer: 1,
    explanation: "Job 1:9-11 - Does Job fear God for nothing? Have you not put a hedge around him and his household and everything he has? But now stretch out your hand and strike everything he has, and he will surely curse you to your face."
  },
  {
    id: 4,
    question: "What was the first thing Satan took from Job?",
    options: ["His health", "His children", "His wealth", "His wife"],
    answer: 2,
    explanation: "Job 1:13-17 - One day when Job's sons and daughters were feasting and drinking wine at the oldest brother's house, a messenger came to Job and said, 'The oxen were plowing and the donkeys were grazing nearby, and the Sabeans attacked and made off with them. They put the servants to the sword, and I am the only one who has escaped to tell you!'"
  },
  {
    id: 5,
    question: "How many friends came to comfort Job?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1,
    explanation: "Job 2:11 - When Job's three friends, Eliphaz the Temanite, Bildad the Shuhite and Zophar the Naamathite, heard about all the troubles that had come upon him, they set out from their homes and met together by agreement to go and sympathize with him and comfort him."
  },
  {
    id: 6,
    question: "What did Job's wife tell him to do?",
    options: ["Curse God and die", "Pray harder", "Give up", "All of the above"],
    answer: 0,
    explanation: "Job 2:9 - His wife said to him, 'Are you still maintaining your integrity? Curse God and die!'"
  },
  {
    id: 7,
    question: "What did Job say about the Lord giving and taking away?",
    options: ["The Lord gives and the Lord takes away", "Blessed be the name of the Lord", "Naked I came from my mother's womb, and naked I will depart", "All of the above"],
    answer: 3,
    explanation: "Job 1:21 - Naked I came from my mother's womb, and naked I will depart. The Lord gave and the Lord has taken away; may the name of the Lord be praised."
  },
  {
    id: 8,
    question: "What did God restore to Job at the end?",
    options: ["His wealth", "His children", "His health", "All of the above"],
    answer: 3,
    explanation: "Job 42:10-17 - After Job had prayed for his friends, the Lord restored his fortunes and gave him twice as much as he had before. The Lord blessed the latter part of Job's life more than the former part."
  },
  {
    id: 9,
    question: "How many years did Job live after his restoration?",
    options: ["100 years", "120 years", "140 years", "150 years"],
    answer: 2,
    explanation: "Job 42:16 - After this, Job lived a hundred and forty years; he saw his children and their children to the fourth generation."
  },
  {
    id: 10,
    question: "What did Job say about God's wisdom?",
    options: ["God's wisdom is beyond understanding", "God's ways are higher than our ways", "God's thoughts are higher than our thoughts", "All of the above"],
    answer: 3,
    explanation: "Job 28:28 - And he said to the human race, 'The fear of the Lord—that is wisdom, and to shun evil is understanding.'"
  }
];

export default function JobPublicQuiz() {
  return (
    <PublicQuiz 
      title="Job Quiz - Suffering and Faith"
      questions={questions}
      bookName="Job"
    />
  );
}
