import BibleBookQuiz from "../BibleBookQuiz";

export default function RomansQuiz() {
  // Add 25 difficult Romans questions
  const romansQuestions = [
    {
      chapter: 1,
      question: "What is the theme of Romans 1:16?",
      options: ["The gospel is the power of God", "All have sinned", "The wages of sin is death", "God's love is unconditional"],
      answer: 0
    },
    {
      chapter: 2,
      question: "According to Romans 2:4, what leads people to repentance?",
      options: ["Fear of judgment", "God's kindness", "The law", "Good works"],
      answer: 1
    },
    {
      chapter: 3,
      question: "What does Romans 3:23 say all have done?",
      options: ["Loved God", "Sinned and fall short", "Kept the law", "Been justified"],
      answer: 1
    },
    {
      chapter: 4,
      question: "How was Abraham's faith credited to him according to Romans 4:3?",
      options: ["As righteousness", "As works", "As law", "As grace"],
      answer: 0
    },
    {
      chapter: 5,
      question: "What does Romans 5:8 say God demonstrates?",
      options: ["His power", "His love", "His justice", "His mercy"],
      answer: 1
    },
    {
      chapter: 6,
      question: "What does Romans 6:23 say is the wages of sin?",
      options: ["Life", "Death", "Grace", "Righteousness"],
      answer: 1
    },
    {
      chapter: 7,
      question: "According to Romans 7:24, what does Paul call himself?",
      options: ["A wretched man", "A righteous man", "A perfect man", "A blessed man"],
      answer: 0
    },
    {
      chapter: 8,
      question: "What does Romans 8:28 say works for the good of those who love God?",
      options: ["All things", "Some things", "Good things", "Righteous things"],
      answer: 0
    },
    {
      chapter: 9,
      question: "What does Romans 9:15 say God will have mercy on?",
      options: ["The righteous", "Whom he will have mercy", "The faithful", "The obedient"],
      answer: 1
    },
    {
      chapter: 10,
      question: "What does Romans 10:9 say you must do to be saved?",
      options: ["Believe and confess", "Keep the law", "Be baptized", "Do good works"],
      answer: 0
    },
    {
      chapter: 11,
      question: "What does Romans 11:33 say about God's wisdom?",
      options: ["It is limited", "It is unsearchable", "It is simple", "It is obvious"],
      answer: 1
    },
    {
      chapter: 12,
      question: "What does Romans 12:1 say believers should offer to God?",
      options: ["Sacrifices", "Their bodies", "Money", "Time"],
      answer: 1
    },
    {
      chapter: 13,
      question: "What does Romans 13:1 say everyone must be subject to?",
      options: ["The church", "The governing authorities", "The law", "The elders"],
      answer: 1
    },
    {
      chapter: 14,
      question: "What does Romans 14:12 say each of us will give?",
      options: ["An offering", "An account", "A testimony", "A confession"],
      answer: 1
    },
    {
      chapter: 15,
      question: "What does Romans 15:13 say God is the God of?",
      options: ["Hope", "Love", "Faith", "Peace"],
      answer: 0
    },
    {
      chapter: 16,
      question: "What does Romans 16:20 say will happen to Satan?",
      options: ["He will be destroyed", "He will be crushed", "He will be bound", "He will be cast out"],
      answer: 1
    }
  ];

  return (
    <BibleBookQuiz 
      title="Romans Quiz"
      questions={romansQuestions}
      bookName="Romans"
    />
  );
}