import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What specific sin at Meribah resulted in Moses and Aaron being prohibited from entering the Promised Land?",
    options: ["Refusing to lead the people", "Striking the rock twice instead of speaking to it", "Building an altar to a foreign god", "Refusing to circumcise the new generation"],
    answer: 1,
    explanation: "Numbers 20:8-12 - The Lord told Moses to speak to the rock, but Moses struck it twice. The Lord said, 'Because you did not trust in me enough to honor me as holy... you will not bring this community into the land.'",
    referenceVerse: "Numbers 20:8-12"
  },
  {
    id: 2,
    question: "What was the specific purpose of the 'Red Heifer' sacrifice described in Numbers 19?",
    options: ["To celebrate the Passover", "To provide water of cleansing for those who touched a dead body", "To ordain new priests", "To declare war on the Canaanites"],
    answer: 1,
    explanation: "Numbers 19:1-10 - The ashes of the red heifer were mixed with water to create the 'water of cleansing' used for ritual purification after contact with death.",
    referenceVerse: "Numbers 19:9"
  },
  {
    id: 3,
    question: "Who were the five daughters of Zelophehad, and what significant legal precedent did they establish?",
    options: ["They requested land inheritance for female heirs", "They were the first female priests", "They led a rebellion against Aaron", "They discovered a new well"],
    answer: 0,
    explanation: "Numbers 27:1-7 - The daughters of Zelophehad argued that their father's name shouldn't disappear because he had no sons. God told Moses their request was just.",
    referenceVerse: "Numbers 27:7"
  },
  {
    id: 4,
    question: "What was the 'Star out of Jacob' prophecy in Balaam's fourth and final oracle?",
    options: ["A promise of a great harvest", "A Messianic prophecy of a future ruler of Israel", "A warning of a falling meteor", "A sign for the Magi in the New Testament only"],
    answer: 1,
    explanation: "Numbers 24:17 - 'I see him, but not now; I behold him, but not near. A star will come out of Jacob; a scepter will rise out of Israel.'",
    referenceVerse: "Numbers 24:17"
  },
  {
    id: 5,
    question: "At what age were the Levites required to retire from their regular 'heavy service' in the tent of meeting?",
    options: ["40 years old", "50 years old", "65 years old", "70 years old"],
    answer: 1,
    explanation: "Numbers 8:25 - But at the age of fifty, they must retire from their regular service and work no longer.",
    referenceVerse: "Numbers 8:25"
  },
  {
    id: 6,
    question: "What was the name of the location where the Israelites found twelve wells and seventy palm trees (though they arrived there in Exodus, it is referenced as a stage in Numbers 33)?",
    options: ["Elim", "Marah", "Kadesh", "Hazeroth"],
    answer: 0,
    explanation: "Numbers 33:9 - They left Marah and came to Elim, where there were twelve springs and seventy palm trees, and they camped there.",
    referenceVerse: "Numbers 33:9"
  },
  {
    id: 7,
    question: "Which two Amorite kings did the Israelites defeat in battle before they reached the plains of Moab?",
    options: ["Balak and Balaam", "Sihon and Og", "Agag and Adoni-Bezek", "Pharaoh and Abimelek"],
    answer: 1,
    explanation: "Numbers 21:21-35 describes the defeat of Sihon king of the Amorites and Og king of Bashan.",
    referenceVerse: "Numbers 21:21-35"
  },
  {
    id: 8,
    question: "What was the specific fate of the bronze censers used by Korah's 250 followers after they were consumed by fire?",
    options: ["They were thrown into the Red Sea", "They were hammered into sheets to overlay the altar", "They were melted down for the Ark", "They were given to the tribe of Judah"],
    answer: 1,
    explanation: "Numbers 16:36-40 - Eleazar the priest took the bronze censers... and they were hammered out to overlay the altar.",
    referenceVerse: "Numbers 16:39"
  },
  {
    id: 9,
    question: "For how many days did Miriam have to stay outside the camp after being struck with leprosy for speaking against Moses?",
    options: ["3 days", "7 days", "14 days", "40 days"],
    answer: 1,
    explanation: "Numbers 12:14-15 - 'Confine her outside the camp for seven days; after that she can be brought back.' So Miriam was confined outside the camp for seven days.",
    referenceVerse: "Numbers 12:14-15"
  },
  {
    id: 10,
    question: "In the second census (Numbers 26), which was the only tribe to see a significant decrease in population compared to the first census?",
    options: ["Judah", "Simeon", "Benjamin", "Dan"],
    answer: 1,
    explanation: "Simeon dropped from 59,300 in Num 1 to 22,200 in Num 26, likely due to the plague following the sin at Peor (Num 25).",
    referenceVerse: "Numbers 26:14"
  }
];

export default function NumbersAdvancedQuiz() {
  return (
    <PublicQuiz 
      title="Numbers Advanced Quiz"
      questions={questions}
      bookName="Numbers"
      chapter="Advanced Level"
      seoDescription="The ultimate challenge on the Book of Numbers. Explore the technicalities of the Red Heifer, the oracles of Balaam, and the tribal census shifts."
      canonicalPath="/bible-questions-and-answers-hub/numbers/advanced"
    />
  );
}
