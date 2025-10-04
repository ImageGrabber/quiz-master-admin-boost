import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who wrote the book of Revelation?",
    options: ["Peter", "Paul", "John", "Luke"],
    answer: 2,
    explanation: "Revelation 1:1 - The revelation from Jesus Christ, which God gave him to show his servants what must soon take place. He made it known by sending his angel to his servant John."
  },
  {
    id: 2,
    question: "Where was John when he received the revelation?",
    options: ["Jerusalem", "Rome", "Patmos", "Ephesus"],
    answer: 2,
    explanation: "Revelation 1:9 - I, John, your brother and companion in the suffering and kingdom and patient endurance that are ours in Jesus, was on the island of Patmos because of the word of God and the testimony of Jesus."
  },
  {
    id: 3,
    question: "How many churches did Jesus address in Revelation?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: 2,
    explanation: "Revelation 1:11 - 'Write on a scroll what you see and send it to the seven churches: to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia and Laodicea.'"
  },
  {
    id: 4,
    question: "What color was the horse of the first horseman of the apocalypse?",
    options: ["White", "Red", "Black", "Pale"],
    answer: 0,
    explanation: "Revelation 6:2 - I looked, and there before me was a white horse! Its rider held a bow, and he was given a crown, and he rode out as a conqueror bent on conquest."
  },
  {
    id: 5,
    question: "How many seals are there in Revelation?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: 2,
    explanation: "Revelation 6:1-17 - There are seven seals that are opened, each revealing different events."
  },
  {
    id: 6,
    question: "What is the number of the beast?",
    options: ["616", "666", "777", "888"],
    answer: 1,
    explanation: "Revelation 13:18 - This calls for wisdom. Let the person who has insight calculate the number of the beast, for it is the number of a man. That number is 666."
  },
  {
    id: 7,
    question: "How many trumpets are blown in Revelation?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: 2,
    explanation: "Revelation 8:2 - And I saw the seven angels who stand before God, and seven trumpets were given to them."
  },
  {
    id: 8,
    question: "What is the name of the city that comes down from heaven?",
    options: ["New Jerusalem", "New Zion", "New Salem", "New Bethlehem"],
    answer: 0,
    explanation: "Revelation 21:2 - I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband."
  },
  {
    id: 9,
    question: "What flows from the throne of God in the new heaven and earth?",
    options: ["Water", "Light", "The river of life", "Manna"],
    answer: 2,
    explanation: "Revelation 22:1 - Then the angel showed me the river of the water of life, as clear as crystal, flowing from the throne of God and of the Lamb."
  },
  {
    id: 10,
    question: "What is the last word of the Bible?",
    options: ["Amen", "Grace", "Peace", "Love"],
    answer: 0,
    explanation: "Revelation 22:21 - The grace of the Lord Jesus be with God's people. Amen."
  }
];

export default function RevelationPublicQuiz() {
  return (
    <PublicQuiz 
      title="Revelation Quiz - The End Times"
      questions={questions}
      bookName="Revelation"
    />
  );
}
