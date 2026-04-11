import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was the specific difference in restitution required for a Guilt Offering compared to a Sin Offering?",
    options: ["No restitution was needed", "One-tenth additional was added", "One-fifth (20%) additional was added", "Double the value was required"],
    answer: 2,
    explanation: "Leviticus 6:5 - He must make full restitution, add a fifth of the value to it and give it all to the owner.",
    referenceVerse: "Leviticus 6:5"
  },
  {
    id: 2,
    question: "During the consecration of the priests, where did Moses put the blood of the ram of ordination on Aaron?",
    options: ["Only on his forehead", "On his right ear, right thumb, and right big toe", "On his heart and hands", "On his feet and shoulders"],
    answer: 1,
    explanation: "Leviticus 8:23-24 - Moses took some of its blood and put it on the lobe of Aaron’s right ear, on the thumb of his right hand and on the big toe of his right foot.",
    referenceVerse: "Leviticus 8:23-24"
  },
  {
    id: 3,
    question: "Which feast celebrated the conclusion of the grain harvest and occurred 50 days after the Passover?",
    options: ["Feast of Trumpets", "Feast of Tabernacles", "Feast of Weeks (Pentecost)", "Feast of Firstfruits"],
    answer: 2,
    explanation: "Leviticus 23:15-16 - From the day after the Sabbath... count off seven full weeks... then present an offering of new grain to the Lord.",
    referenceVerse: "Leviticus 23:15-16"
  },
  {
    id: 4,
    question: "What was the 'Year of Jubilee', and how often was it celebrated?",
    options: ["Every 7th year, to rest the land", "Every 50th year, for the release of debts and return of property", "Every 12th year, for new leadership", "Every 100th year, for a great temple feast"],
    answer: 1,
    explanation: "Leviticus 25:10 - Consecrate the fiftieth year and proclaim liberty throughout the land to all its inhabitants. It shall be a jubilee for you.",
    referenceVerse: "Leviticus 25:10"
  },
  {
    id: 5,
    question: "What happened to the person who was caught blaspheming the Name of the Lord in Leviticus 24?",
    options: ["He was exiled from the camp", "He was forgiven after a sacrifice", "The entire community stoned him to death", "He had to pay 50 shekels"],
    answer: 2,
    explanation: "Leviticus 24:14-16 - Anyone who blasphemes the name of the Lord is to be put to death. The entire assembly must stone them.",
    referenceVerse: "Leviticus 24:16"
  },
  {
    id: 6,
    question: "What was the purpose of the 'Urim and Thummim' placed in the High Priest's breastpiece?",
    options: ["They were precious jewels for beauty", "They were used for determining the Lord's will", "They were symbols of the twelve tribes", "They were used for counting money"],
    answer: 1,
    explanation: "Exodus 28:30 & Lev 8:8 - Moses put the breastpiece on him and put the Urim and Thummim in the breastpiece (used for divine guidance).",
    referenceVerse: "Leviticus 8:8"
  },
  {
    id: 7,
    question: "What was the spiritual requirement for the Sabbath rest of the land (the Sabbatical Year)?",
    options: ["Planting half as much", "Not sowing fields or pruning vineyards every seventh year", "Giving all produce to the king", "Moving to a different land"],
    answer: 1,
    explanation: "Leviticus 25:4 - But in the seventh year the land is to have a year of sabbath rest... Do not sow your fields or prune your vineyards.",
    referenceVerse: "Leviticus 25:4"
  },
  {
    id: 8,
    question: "What ritual was performed with a 'wave offering' before the Lord?",
    options: ["Burying it in the ground", "Moving it toward the altar and back to acknowledge God's ownership", "Burning it completely", "Dividing it among the twelve tribes"],
    answer: 1,
    explanation: "A wave offering (tenuphah) was a symbolic movement of the sacrifice toward the sanctuary to designate it as the Lord's.",
    referenceVerse: "Leviticus 7:30"
  },
  {
    id: 9,
    question: "Which of these was NOT one of the five primary offerings described at the start of Leviticus?",
    options: ["Burnt Offering", "Grain Offering", "Incense Offering", "Peace Offering"],
    answer: 2,
    explanation: "The five primary offerings in Lev 1-7 are Burnt, Grain, Peace, Sin, and Guilt. The daily incense was a separate priestly duty.",
    referenceVerse: "Leviticus 1-7"
  },
  {
    id: 10,
    question: "According to Leviticus 19:32, what was the required attitude towards the elderly?",
    options: ["Ignore them", "Stand up in their presence and show respect", "Let them do all the work", "Talk over them"],
    answer: 1,
    explanation: "Leviticus 19:32 - Stand up in the presence of the aged, show respect for the elderly and revere your God. I am the Lord.",
    referenceVerse: "Leviticus 19:32"
  }
];

export default function LeviticusIntermediateQuiz() {
  return (
    <PublicQuiz 
      title="Leviticus Intermediate Quiz"
      questions={questions}
      bookName="Leviticus"
      chapter="Intermediate Level"
      seoDescription="Challenge your grasp of the Law. Explore the Year of Jubilee, the priestly consecration, and the deep symbolism of the five offerings."
      canonicalPath="/bible-questions-and-answers-hub/leviticus/intermediate"
    />
  );
}
