import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "When the Israelites set up camp, which tribe was assigned the prominent position on the East side, leading the march?",
    options: ["Reuben", "Judah", "Ephraim", "Dan"],
    answer: 1,
    explanation: "Numbers 2:3 - On the east, toward the sunrise, the divisions of the camp of Judah are to encamp under their standard.",
    referenceVerse: "Numbers 2:3"
  },
  {
    id: 2,
    question: "Which clan of the Levites was responsible for carrying the most holy objects, including the Ark of the Covenant?",
    options: ["Gershonites", "Merarites", "Kohathites", "Zadokites"],
    answer: 2,
    explanation: "Numbers 4:4-15 - The Kohathites were responsible for the care and transport of the most holy things in the sanctuary.",
    referenceVerse: "Numbers 4:4"
  },
  {
    id: 3,
    question: "What was the purpose of the 'test of unfaithfulness' involving bitter water in Numbers 5?",
    options: ["To heal a disease", "To determine if a wife had been unfaithful to her husband", "To celebrate a harvest", "To appoint a new leader"],
    answer: 1,
    explanation: "Numbers 5:11-31 describes the 'law of jealousy,' a ritual performed when a husband suspected his wife of infidelity.",
    referenceVerse: "Numbers 5:11-31"
  },
  {
    id: 4,
    question: "A person taking a specialized vow of separation to the Lord, involving no wine and not cutting their hair, was known as a what?",
    options: ["Levite", "Nazirite", "Prophet", "Eunuch"],
    answer: 1,
    explanation: "Numbers 6:2-5 - When a man or woman makes a special vow, a vow of separation to the Lord as a Nazirite...",
    referenceVerse: "Numbers 6:2"
  },
  {
    id: 5,
    question: "Why were the Levites chosen by God to serve in the Tabernacle instead of any other tribe?",
    options: ["They were the strongest", "They were the wealthiest", "They were taken in place of the firstborn of all Israelites", "They were the only ones who knew how to build it"],
    answer: 2,
    explanation: "Numbers 3:12 - I have taken the Levites from among the Israelites in place of the firstborn male of every Israelite woman.",
    referenceVerse: "Numbers 3:12"
  },
  {
    id: 6,
    question: "What did the two silver trumpets made by Moses signify for the community?",
    options: ["To celebrate birthdays", "To signal the calling of assemblies and the breaking of camp", "To warn of an earthquake", "To announce the arrival of rain"],
    answer: 1,
    explanation: "Numbers 10:2 - Make two trumpets of hammered silver, and use them for calling the community together and for having the camps set out.",
    referenceVerse: "Numbers 10:2"
  },
  {
    id: 7,
    question: "Who was Hobab, and what did Moses ask him to do for the Israelites?",
    options: ["He was a spy; to find water", "He was Moses' brother-in-law; to be 'eyes' for them in the wilderness", "He was a king; to give them passage", "He was a priest; to offer a sacrifice"],
    answer: 1,
    explanation: "Numbers 10:29-31 - Moses said to Hobab... 'Please do not leave us. You know where we should camp in the wilderness, and you can be our eyes.'",
    referenceVerse: "Numbers 10:29-31"
  },
  {
    id: 8,
    question: "Who were the primary leaders of the rebellion against Moses and Aaron in Numbers 16?",
    options: ["Joshua and Caleb", "Balak and Balaam", "Korah, Dathan, and Abiram", "Nadab and Abihu"],
    answer: 2,
    explanation: "Numbers 16:1-3 - Korah... along with Dathan and Abiram... rose up against Moses.",
    referenceVerse: "Numbers 16:1-2"
  },
  {
    id: 9,
    question: "What is the 'Covenant of Salt' mentioned in Numbers 18 in relation to the priests' portions?",
    options: ["A covenant to eat only salt", "An everlasting and incorruptible covenant", "A covenant to trade salt with Moab", "A covenant for cleaning the altar"],
    answer: 1,
    explanation: "Numbers 18:19 - It is an everlasting covenant of salt before the Lord for both you and your offspring.",
    referenceVerse: "Numbers 18:19"
  },
  {
    id: 10,
    question: "How many fighting men were counted in the first census at Mount Sinai?",
    options: ["144,000", "603,550", "1,000,000", "22,000"],
    answer: 1,
    explanation: "Numbers 1:46 - All those who were listed were 603,550 Fighting men.",
    referenceVerse: "Numbers 1:46"
  }
];

export default function NumbersIntermediateQuiz() {
  return (
    <PublicQuiz 
      title="Numbers Intermediate Quiz"
      questions={questions}
      bookName="Numbers"
      chapter="Intermediate Level"
      seoDescription="Deepen your knowledge of the wilderness wanderings. Test your grasp of the tribal arrangements, the rebellion of Korah, and the laws of the Nazirite."
      canonicalPath="/bible-questions-and-answers-hub/numbers/intermediate"
    />
  );
}
