import PublicQuiz from "../PublicQuiz";

// Deuteronomy Quiz Questions - 10 questions about Moses' final words and laws
const deuteronomyQuestions = [
  {
    question: "What does the name 'Deuteronomy' mean?",
    options: [
      "Second law",
      "Final words",
      "Moses' testament",
      "God's covenant"
    ],
    answer: 0
  },
  {
    question: "What was the main purpose of Deuteronomy?",
    options: [
      "To record Israel's conquest of Canaan",
      "To restate the law for the new generation",
      "To tell the story of Moses' death",
      "To document the Ten Plagues"
    ],
    answer: 1
  },
  {
    question: "What was the Shema, the central confession of Israel?",
    options: [
      "Hear, O Israel: The Lord our God, the Lord is one",
      "I am the Lord your God",
      "You shall have no other gods before me",
      "Love the Lord your God with all your heart"
    ],
    answer: 0
  },
  {
    question: "What was the condition for Israel to receive God's blessings?",
    options: [
      "To offer sacrifices daily",
      "To obey God's commands",
      "To build a temple",
      "To appoint a king"
    ],
    answer: 1
  },
  {
    question: "Who was chosen to succeed Moses as Israel's leader?",
    options: [
      "Aaron",
      "Joshua",
      "Caleb",
      "Eleazar"
    ],
    answer: 1
  },
  {
    question: "What was the penalty for worshiping other gods?",
    options: [
      "Exile",
      "Death",
      "Fines",
      "Imprisonment"
    ],
    answer: 1
  },
  {
    question: "What did Moses do before his death?",
    options: [
      "He blessed the twelve tribes",
      "He wrote a song",
      "He appointed judges",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the purpose of the cities of refuge?",
    options: [
      "To house the priests",
      "To protect those who killed accidentally",
      "To store the ark of the covenant",
      "To hold religious festivals"
    ],
    answer: 1
  },
  {
    question: "What did Moses predict would happen to Israel?",
    options: [
      "They would conquer all nations",
      "They would be scattered among the nations",
      "They would build a great temple",
      "They would have many kings"
    ],
    answer: 1
  },
  {
    question: "Where did Moses die?",
    options: [
      "Mount Sinai",
      "Mount Nebo",
      "Mount Horeb",
      "The Jordan River"
    ],
    answer: 1
  }
];

export default function DeuteronomyPublicQuiz() {
  return (
    <PublicQuiz 
      title="Deuteronomy Quiz"
      questions={deuteronomyQuestions}
      bookName="Deuteronomy"
    />
  );
}
