import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who is traditionally attributed with writing the book of Lamentations?",
    options: ["Solomon", "Jeremiah", "David", "Isaiah"],
    answer: 1,
    explanation: "The author is not specifically named in the text, but Jewish tradition attributes it to Jeremiah."
  },
  {
    id: 2,
    question: "What major event is the subject of the book's grief?",
    options: ["The flood", "The creation", "The destruction of Jerusalem", "The exodus from Egypt"],
    answer: 2,
    explanation: "Lamentations contains five poems mourning the fall of Jerusalem to the Babylonians in 586 BC."
  },
  {
    id: 3,
    question: "The book of Lamentations consists of how many chapters (poems)?",
    options: ["3 chapters", "5 chapters", "7 chapters", "12 chapters"],
    answer: 1,
    explanation: "The book consists of five separate poems, which now form the five chapters."
  },
  {
    id: 4,
    question: "Most of the chapters in Lamentations are written as what kind of poetic structure?",
    options: ["Riddles", "Acrostics", "Hymns", "Psalms"],
    answer: 1,
    explanation: "Chapters 1, 2, 4, and 5 use an acrostic structure where each verse begins with a letter of the Hebrew alphabet."
  },
  {
    id: 5,
    question: "Which well-known verse from Lamentations 3:22-23 expresses hope in God's mercy?",
    options: ["'Because of his great love we are not consumed...'", "'The Lord is my shepherd...'", "'Fear God and keep his commandments...'", "'Holy, holy, holy is the Lord God Almighty'"],
    answer: 0,
    explanation: "Lamentations 3:22-23 - 'Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.'"
  },
  {
    id: 6,
    question: "The city of Jerusalem is personified as what in the first chapter?",
    options: ["A queen", "A widow", "A child", "A servant"],
    answer: 1,
    explanation: "Lamentations 1:1 - 'How deserted lies the city, once so full of people! How like a widow is she, who once was great among the nations!'"
  },
  {
    id: 7,
    question: "What reason does the book give for Jerusalem's suffering?",
    options: ["The cruelty of the Babylonians", "Lack of military strength", "The city's many sins and rebellion against God", "The heat of the sun"],
    answer: 2,
    explanation: "Lamentations 1:5 - 'The Lord has brought her grief because of her many sins.'"
  },
  {
    id: 8,
    question: "In Lamentations 3, the author says it is good to wait for what from the Lord?",
    options: ["Salvation", "Riches", "Judgment", "Power"],
    answer: 0,
    explanation: "Lamentations 3:26 - 'It is good to wait quietly for the salvation of the Lord.'"
  },
  {
    id: 9,
    question: "Finish the verse: 'The Lord is my portion,' says my soul; 'therefore I will—'",
    options: ["Rejoice", "Sing", "Hate", "Wait for him"],
    answer: 3,
    explanation: "Lamentations 3:24 - 'I say to myself, 'The Lord is my portion; therefore I will wait for him.''"
  },
  {
    id: 10,
    question: "The final chapter (5) is a prayer for what?",
    options: ["Destruction of the world", "Restoration and renewal", "Wealth and prosperity", "Eternal life"],
    answer: 1,
    explanation: "Lamentations 5:21 - 'Restore us to yourself, Lord, that we may return; renew our days as of old.'"
  }
];

export default function LamentationsPublicQuiz() {
  return (
    <PublicQuiz 
      title="Lamentations Quiz - Songs of Sorrow and Hope"
      questions={questions}
      bookName="Lamentations"
    />
  );
}
