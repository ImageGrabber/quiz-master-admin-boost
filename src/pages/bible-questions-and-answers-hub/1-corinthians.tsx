import BibleBookQuiz from "../BibleBookQuiz";

export default function _1CorinthiansQuiz() {
  // Add 25 difficult 1 Corinthians questions
  const corinthiansQuestions = [
    {
      chapter: 1,
      question: "What does 1 Corinthians 1:10 say Paul appeals to the Corinthians about?",
      options: ["Unity", "Love", "Faith", "Hope"],
      answer: 0
    },
    {
      chapter: 2,
      question: "What does 1 Corinthians 2:9 say no eye has seen?",
      options: ["The glory of God", "What God has prepared", "The face of Jesus", "The kingdom of heaven"],
      answer: 1
    },
    {
      chapter: 3,
      question: "What does 1 Corinthians 3:16 say believers are?",
      options: ["God's temple", "God's children", "God's servants", "God's friends"],
      answer: 0
    },
    {
      chapter: 4,
      question: "What does 1 Corinthians 4:2 say is required of stewards?",
      options: ["Faithfulness", "Wisdom", "Strength", "Knowledge"],
      answer: 0
    },
    {
      chapter: 5,
      question: "What does 1 Corinthians 5:6 say a little yeast does?",
      options: ["Makes bread rise", "Leavens the whole batch", "Tastes good", "Preserves bread"],
      answer: 1
    },
    {
      chapter: 6,
      question: "What does 1 Corinthians 6:19 say believers' bodies are?",
      options: ["Temples of the Holy Spirit", "Vessels of honor", "Instruments of righteousness", "Temples of God"],
      answer: 0
    },
    {
      chapter: 7,
      question: "What does 1 Corinthians 7:7 say Paul wishes all were?",
      options: ["Married", "Single like him", "Rich", "Wise"],
      answer: 1
    },
    {
      chapter: 8,
      question: "What does 1 Corinthians 8:1 say knowledge does?",
      options: ["Puffs up", "Builds up", "Tears down", "Confuses"],
      answer: 0
    },
    {
      chapter: 9,
      question: "What does 1 Corinthians 9:24 say runners do?",
      options: ["Run aimlessly", "Run to get a crown", "Run in vain", "Run for fun"],
      answer: 1
    },
    {
      chapter: 10,
      question: "What does 1 Corinthians 10:13 say God will not let you be tempted beyond?",
      options: ["What you can bear", "What you can handle", "What you can endure", "What you can resist"],
      answer: 0
    },
    {
      chapter: 11,
      question: "What does 1 Corinthians 11:1 say Paul tells the Corinthians to follow?",
      options: ["His example", "The law", "Tradition", "Custom"],
      answer: 0
    },
    {
      chapter: 12,
      question: "What does 1 Corinthians 12:4 say there are different kinds of?",
      options: ["Gifts", "Services", "Works", "All of the above"],
      answer: 3
    },
    {
      chapter: 13,
      question: "What does 1 Corinthians 13:4 say love is?",
      options: ["Patient", "Kind", "Both A and B", "Neither A nor B"],
      answer: 2
    },
    {
      chapter: 14,
      question: "What does 1 Corinthians 14:33 say God is not?",
      options: ["A God of confusion", "A God of disorder", "A God of chaos", "All of the above"],
      answer: 3
    },
    {
      chapter: 15,
      question: "What does 1 Corinthians 15:55 say death has lost?",
      options: ["Its power", "Its sting", "Its victory", "Both B and C"],
      answer: 3
    },
    {
      chapter: 16,
      question: "What does 1 Corinthians 16:14 say everything should be done in?",
      options: ["Faith", "Hope", "Love", "Peace"],
      answer: 2
    }
  ];

  return (
    <BibleBookQuiz 
      title="1 Corinthians Quiz"
      questions={corinthiansQuestions}
      bookName="1 Corinthians"
    />
  );
}