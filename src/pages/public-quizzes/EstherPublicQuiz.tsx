import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was Esther's Hebrew name?",
    options: ["Hadassah", "Esther", "Both A and B", "Neither A nor B"],
    answer: 2,
    explanation: "Esther 2:7 - Mordecai had a cousin named Hadassah, whom he had brought up because she had neither father nor mother. This young woman, who was also known as Esther, had a lovely figure and was beautiful."
  },
  {
    id: 2,
    question: "What was the name of Esther's cousin who raised her?",
    options: ["Mordecai", "Haman", "Xerxes", "Bigthana"],
    answer: 0,
    explanation: "Esther 2:5-7 - Now there was in the citadel of Susa a Jew of the tribe of Benjamin, named Mordecai son of Jair, the son of Shimei, the son of Kish, who had been carried into exile from Jerusalem by Nebuchadnezzar king of Babylon. Mordecai had a cousin named Hadassah, whom he had brought up because she had neither father nor mother."
  },
  {
    id: 3,
    question: "What was the name of the king who chose Esther as queen?",
    options: ["Nebuchadnezzar", "Xerxes", "Darius", "Cyrus"],
    answer: 1,
    explanation: "Esther 1:1 - This is what happened during the time of Xerxes, the Xerxes who ruled over 127 provinces stretching from India to Cush."
  },
  {
    id: 4,
    question: "What was the name of the man who plotted to destroy the Jews?",
    options: ["Mordecai", "Haman", "Bigthana", "Teresh"],
    answer: 1,
    explanation: "Esther 3:1 - After these events, King Xerxes honored Haman son of Hammedatha, the Agagite, elevating him and giving him a seat of honor higher than that of all the other nobles."
  },
  {
    id: 5,
    question: "What did Mordecai refuse to do that angered Haman?",
    options: ["Bow down to Haman", "Pay tribute to Haman", "Serve Haman", "All of the above"],
    answer: 0,
    explanation: "Esther 3:2 - All the royal officials at the king's gate knelt down and paid honor to Haman, for the king had commanded this concerning him. But Mordecai would not kneel down or pay him honor."
  },
  {
    id: 6,
    question: "What did Haman plan to do to Mordecai?",
    options: ["Kill him", "Hang him on a pole", "Exile him", "Imprison him"],
    answer: 1,
    explanation: "Esther 5:14 - His wife Zeresh and all his friends said to him, 'Have a pole set up, reaching to a height of fifty cubits, and ask the king in the morning to have Mordecai impaled on it.'"
  },
  {
    id: 7,
    question: "What did Esther ask the king and Haman to do?",
    options: ["Come to a banquet", "Come to a banquet she had prepared", "Come to a banquet the next day", "All of the above"],
    answer: 3,
    explanation: "Esther 5:4-8 - 'If it pleases the king,' replied Esther, 'let the king, together with Haman, come today to a banquet I have prepared for him.' 'Bring Haman at once,' the king said, 'so that we may do what Esther asks.' So the king and Haman went to the banquet Esther had prepared."
  },
  {
    id: 8,
    question: "What happened to Haman in the end?",
    options: ["He was hanged on the pole he prepared for Mordecai", "He was exiled", "He was imprisoned", "He was forgiven"],
    answer: 0,
    explanation: "Esther 7:10 - So they impaled Haman on the pole he had set up for Mordecai. Then the king's fury subsided."
  },
  {
    id: 9,
    question: "What did the king give Mordecai after Haman's death?",
    options: ["Haman's house", "Haman's position", "Haman's ring", "All of the above"],
    answer: 3,
    explanation: "Esther 8:1-2 - That same day King Xerxes gave Queen Esther the estate of Haman, the enemy of the Jews. And Mordecai came into the presence of the king, for Esther had told how he was related to her. The king took off his signet ring, which he had reclaimed from Haman, and presented it to Mordecai."
  },
  {
    id: 10,
    question: "What did the Jews do to celebrate their deliverance?",
    options: ["They had a feast", "They gave presents to each other", "They gave gifts to the poor", "All of the above"],
    answer: 3,
    explanation: "Esther 9:22 - As the time when the Jews got relief from their enemies, and as the month when their sorrow was turned into joy and their mourning into a day of celebration. He wrote them to observe the days as days of feasting and joy and giving presents of food to one another and gifts to the poor."
  }
];

export default function EstherPublicQuiz() {
  return (
    <PublicQuiz 
      title="Esther Quiz - Courage and Deliverance"
      questions={questions}
      bookName="Esther"
    />
  );
}
