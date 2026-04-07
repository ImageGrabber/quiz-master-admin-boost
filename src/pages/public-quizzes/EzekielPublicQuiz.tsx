import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Where was Ezekiel when God called him to be a prophet?",
    options: ["By the river Jordan", "By the Kebar River in Babylon", "At the temple in Jerusalem", "In the mountains"],
    answer: 1,
    explanation: "Ezekiel 1:1 - 'Now it came to pass... as I was among the captives by the river Chebar (Kebar), that the heavens were opened and I saw visions of God.'"
  },
  {
    id: 2,
    question: "Ezekiel was of what profession when he was called by God?",
    options: ["A king", "A priest", "A shepherd", "A fisherman"],
    answer: 1,
    explanation: "Ezekiel 1:3 - '...the word of the Lord came expressly to Ezekiel the priest, the son of Buzi...'"
  },
  {
    id: 3,
    question: "What famous object did Ezekiel see in his vision that had four wheels and were full of eyes?",
    options: ["A chariot", "A tower", "A golden ark", "A ladder"],
    answer: 0,
    explanation: "Ezekiel 1:15-18 describes the vision of the four wheels and their appearance like burning coals and a chariot."
  },
  {
    id: 4,
    question: "In Ezekiel 37, God showed Ezekiel a valley full of what?",
    options: ["Water", "Dry bones", "Scorpions", "Statues"],
    answer: 1,
    explanation: "Ezekiel 37:1 - 'The hand of the Lord was upon me... and set me down in the midst of the valley; and it was full of bones.'"
  },
  {
    id: 5,
    question: "What did Ezekiel have to do with a scroll God gave to him in a vision?",
    options: ["Burn it", "Bury it", "Eat it", "Tear it"],
    answer: 2,
    explanation: "Ezekiel 3:1-3 - 'He said to me, 'Son of man, eat what you find; eat this scroll... so I ate, and it was in my mouth like honey for sweetness.'"
  },
  {
    id: 6,
    question: "Ezekiel is often addressed by God with what title throughout the book?",
    options: ["King of Zion", "Son of Man", "Prophet of Fire", "Priest of the Most High"],
    answer: 1,
    explanation: "God addresses Ezekiel as 'Son of man' over 90 times in the book."
  },
  {
    id: 7,
    question: "Ezekiel predicted that God would give His people a 'new heart' and replace the heart of stone with what?",
    options: ["A heart of flesh", "A heart of gold", "A heart of light", "A heart of fire"],
    answer: 0,
    explanation: "Ezekiel 36:26 - 'I will give you a new heart and put a new spirit within you; I will take the heart of stone out of your flesh and give you a heart of flesh.'"
  },
  {
    id: 8,
    question: "What happens when Ezekiel speaks to the dry bones in the valley?",
    options: ["They disappear", "They become trees", "They come back to life forming a vast army", "The earth swallows them"],
    answer: 2,
    explanation: "Ezekiel 37:10 - 'So I prophesied as He commanded me, and breath came into them, and they lived, and stood up on their feet, an exceedingly great army.'"
  },
  {
    id: 9,
    question: "Ezekiel had a vision of God's 'Glory'—what was its movement during the destruction of Jerusalem?",
    options: ["It grew brighter", "It departed from the temple", "It stayed forever", "It fell like rain"],
    answer: 1,
    explanation: "Ezekiel 10:18-19 describes the glory of the Lord departing from the threshold of the temple."
  },
  {
    id: 10,
    question: "The final chapters of Ezekiel (40-48) focus on the vision of what coming structure?",
    options: ["A new temple", "A huge bridge", "A great wall", "A giant statue"],
    answer: 0,
    explanation: "The latter part of Ezekiel contains a detailed vision for the restoration and plan of the future new temple."
  }
];

export default function EzekielPublicQuiz() {
  return (
    <PublicQuiz 
      title="Ezekiel Quiz - Visions of the Glory"
      questions={questions}
      bookName="Ezekiel"
    />
  );
}
