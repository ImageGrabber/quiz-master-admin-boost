import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What is the alternative name for the book 'Song of Solomon'?",
    options: ["Song of David", "Song of Songs", "Song of Zion", "Song of Love"],
    answer: 1,
    explanation: "Song of Solomon 1:1 - 'Solomon's Song of Songs.'"
  },
  {
    id: 2,
    question: "How is the book traditionally interpreted in addition to a celebration of love?",
    options: ["As a legal document", "As an allegory of God's love for His people", "As a political treaty", "As a war song"],
    answer: 1,
    explanation: "Many theologians view the book as an allegory of God's relationship with Israel or Christ's relationship with the Church."
  },
  {
    id: 3,
    question: "Which king's name is associated with this book?",
    options: ["Saul", "Hezekiah", "David", "Solomon"],
    answer: 3,
    explanation: "The opening verse attributes the song to Solomon (Song of Solomon 1:1)."
  },
  {
    id: 4,
    question: "The bride describes herself as 'dark, but beautiful' and a 'rose of—' where?",
    options: ["Eden", "Jerusalem", "Sharon", "Bethlehem"],
    answer: 2,
    explanation: "Song of Solomon 2:1 - 'I am a rose of Sharon, a lily of the valleys.'"
  },
  {
    id: 5,
    question: "The beloved describes his bride as being like what among the thorns?",
    options: ["A rose", "A lily", "A grape", "A fruit"],
    answer: 1,
    explanation: "Song of Solomon 2:2 - 'Like a lily among thorns is my darling among the young women.'"
  },
  {
    id: 6,
    question: "What is compared to death in Song of Solomon 8:6?",
    options: ["Life", "Love", "Wealth", "Wisdom"],
    answer: 1,
    explanation: "Song of Solomon 8:6 - '...for love is as strong as death, its jealousy unyielding as the grave.'"
  },
  {
    id: 7,
    question: "How is the beloved's speech described in Song of Solomon 4:11?",
    options: ["Like honey and milk", "Like a sword", "Like the wind", "Like a lion"],
    answer: 0,
    explanation: "Song of Solomon 4:11 - 'Your lips drop sweetness like the honeycomb, my bride; milk and honey are under your tongue.'"
  },
  {
    id: 8,
    question: "A recurring line in the book is 'Do not arouse or awaken love until—' when?",
    options: ["The sun rises", "The wedding", "It so desires", "The spring"],
    answer: 2,
    explanation: "Song of Solomon 2:7, 3:5, 8:4 - 'Do not arouse or awaken love until it so desires.'"
  },
  {
    id: 9,
    question: "The bride searches for her beloved in the city during what time?",
    options: ["At noon", "At daybreak", "At night", "At the festival"],
    answer: 2,
    explanation: "Song of Solomon 3:1-2 - 'All night long on my bed I looked for the one my heart loves... I will get up now and go about the city...'"
  },
  {
    id: 10,
    question: "What cannot quench love, according to Song of Solomon 8:7?",
    options: ["Mountains", "Many waters", "Many people", "Many kings"],
    answer: 1,
    explanation: "Song of Solomon 8:7 - 'Many waters cannot quench love; rivers cannot sweep it away.'"
  }
];

export default function SongOfSolomonPublicQuiz() {
  return (
    <PublicQuiz 
      title="Song of Solomon Quiz - The Greatest Song"
      questions={questions}
      bookName="Song of Solomon"
    />
  );
}
