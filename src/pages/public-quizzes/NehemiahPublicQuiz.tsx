import BibleBookQuiz from "../BibleBookQuiz";

// Nehemiah Quiz Questions - 15 detailed questions about leadership, rebuilding, and reforms
const nehemiahQuestions = [
  {
    id: 1,
    question: "What was Nehemiah's main mission when he arrived in Jerusalem?",
    options: [
      "To rebuild the temple worship",
      "To rebuild the walls of Jerusalem",
      "To lead the people in repentance",
      "To establish a new king"
    ],
    answer: 1,
    explanation: "Nehemiah was specifically burdened by the report that Jerusalem's walls were broken down and its gates burned.",
    referenceVerse: "Nehemiah 2:17"
  },
  {
    id: 2,
    question: "What was Nehemiah's job in the Persian court of King Artaxerxes?",
    options: [
      "He was a scribe",
      "He was a priest",
      "He was a cupbearer",
      "He was a general"
    ],
    answer: 2,
    explanation: "Nehemiah served as the royal cupbearer, a position of high trust and influence in the Persian court.",
    referenceVerse: "Nehemiah 1:11"
  },
  {
    id: 3,
    question: "What did Nehemiah do just before answering the King's question about his request?",
    options: [
      "He consulted his advisors",
      "He prayed to the God of heaven",
      "He checked his scrolls",
      "He asked for a sign"
    ],
    answer: 1,
    explanation: "This is a record-breaking example of a quick 'arrow prayer' offered in the middle of a high-pressure conversation.",
    referenceVerse: "Nehemiah 2:4"
  },
  {
    id: 4,
    question: "How long did it take for the people to complete the rebuilding of the walls?",
    options: [
      "40 days",
      "52 days",
      "70 days",
      "120 days"
    ],
    answer: 1,
    explanation: "Despite constant opposition, the wall was completed in an astonishing 52 days, which awed the surrounding nations.",
    referenceVerse: "Nehemiah 6:15"
  },
  {
    id: 5,
    question: "Who were the primary leaders of the opposition against the rebuilding of the wall?",
    options: [
      "Sanballat, Tobiah, and Geshem",
      "Pharaoh and his charioteers",
      "Nebuchadnezzar and Belshazzar",
      "Haman and the Agagites"
    ],
    answer: 0,
    explanation: "Sanballat (the Horonite), Tobiah (the Ammonite), and Geshem (the Arab) were the main antagonists.",
    referenceVerse: "Nehemiah 2:19, 4:7"
  },
  {
    id: 6,
    question: "How did the builders protect themselves while they worked?",
    options: [
      "They built a temporary wooden fence",
      "They worked with one hand and held a weapon in the other",
      "They only worked at night",
      "They hired mercenaries from Persia"
    ],
    answer: 1,
    explanation: "Nehemiah organized the laborers so that they were perpetually ready for battle while finishing the construction.",
    referenceVerse: "Nehemiah 4:17-18"
  },
  {
    id: 7,
    question: "What refrain did Nehemiah repeatedly use in his prayers throughout the book?",
    options: [
      "'Remember me, my God, for good'",
      "'O Lord, save us now'",
      "'Give us our daily bread'",
      "'Destroy my enemies, O God'"
    ],
    answer: 0,
    explanation: "Nehemiah often asked God to remember his faithful service and the work he had done for the people.",
    referenceVerse: "Nehemiah 13:31"
  },
  {
    id: 8,
    question: "What socio-economic issue did Nehemiah have to confront among the Jews?",
    options: [
      "Lack of education",
      "The charging of high interest (usury) to their own brothers",
      "Internal fighting over land ownership",
      "Refusal to work on the wall"
    ],
    answer: 1,
    explanation: "Nehemiah rebuked the nobles for exploiting the poor during a time of famine and forced them to return property and interest.",
    referenceVerse: "Nehemiah 5:7-13"
  },
  {
    id: 9,
    question: "Who was the scribe who read the Law of Moses to the people at the Water Gate?",
    options: [
      "Nehemiah",
      "Ezra",
      "Zerubbabel",
      "Malachi"
    ],
    answer: 1,
    explanation: "Ezra the scribe led the spiritual renewal by reading and explaining the Law to all the people.",
    referenceVerse: "Nehemiah 8:1-3"
  },
  {
    id: 10,
    question: "What was the emotional reaction of the people when they heard the Law read?",
    options: [
      "They laughed and celebrated",
      "They wept because they realized their disobedience",
      "They were bored and left",
      "They argued with Ezra"
    ],
    answer: 1,
    explanation: "The Word of God brought deep conviction, leading to national mourning and eventual repentance.",
    referenceVerse: "Nehemiah 8:9"
  },
  {
    id: 11,
    question: "Nehemiah famously said, 'The ______ of the LORD is your strength.'",
    options: [
      "Peace",
      "Power",
      "Joy",
      "Wisdom"
    ],
    answer: 2,
    explanation: "He encouraged the people to find their strength in the joy of God's presence rather than remaining in sorrow.",
    referenceVerse: "Nehemiah 8:10"
  },
  {
    id: 12,
    question: "How did Nehemiah ensure the city of Jerusalem was populated?",
    options: [
      "He cast lots to bring one out of every ten people to live there",
      "He offered gold to anyone who moved to the city",
      "He forced the army to live there",
      "He invited the surrounding nations to move in"
    ],
    answer: 0,
    explanation: "Lots were cast to bring a portion of the population from the surrounding countryside into the holy city.",
    referenceVerse: "Nehemiah 11:1"
  },
  {
    id: 13,
    question: "What did Nehemiah do to those who were trading in the city on the Sabbath?",
    options: [
      "He taxed their goods",
      "He shut the gates and rebuked the nobles",
      "He allowed it for the sake of the economy",
      "He arrested the buyers only"
    ],
    answer: 1,
    explanation: "Nehemiah took strict measures to ensure the Sabbath was kept holy, including locking the gates against merchants.",
    referenceVerse: "Nehemiah 13:19-21"
  },
  {
    id: 14,
    question: "Who was the High Priest who helped Nehemiah rebuild the Sheep Gate?",
    options: [
      "Joshua",
      "Eliashib",
      "Zadok",
      "Aaron"
    ],
    answer: 1,
    explanation: "Eliashib the high priest and his fellow priests were the first to arise and build the Sheep Gate.",
    referenceVerse: "Nehemiah 3:1"
  },
  {
    id: 15,
    question: "When enemies tried to lure Nehemiah to a meeting to harm him, what was his reply?",
    options: [
      "'I am doing a great work, so that I cannot come down'",
      "'I will meet you at sunset'",
      "'The King of Persia will hear of this'",
      "'Wait until the wall is finished'"
    ],
    answer: 0,
    explanation: "This classic response shows Nehemiah's focus and discernment in the face of distraction and danger.",
    referenceVerse: "Nehemiah 6:3"
  }
];

const getChapterFromReference = (referenceVerse?: string): number => {
  const match = referenceVerse?.match(/(\d+):\d+/);
  return match ? Number(match[1]) : 1;
};

const nehemiahBibleBookQuizQuestions = nehemiahQuestions.map((question) => ({
  chapter: getChapterFromReference(question.referenceVerse),
  question: question.question,
  options: question.options,
  answer: question.answer
}));

export default function NehemiahPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <BibleBookQuiz
      title="The Book of Nehemiah Quiz"
      questions={nehemiahBibleBookQuizQuestions}
      bookName="Nehemiah"
      canonicalPath={canonicalPath}
      useLandingShell
    />
  );
}
