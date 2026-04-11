import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was the specific penalty for eating the blood of any animal, according to Leviticus 17?",
    options: ["Paying a fine to the Tabernacle", "Being cut off from the people", "Fasting for seven days", "A public reprimand"],
    answer: 1,
    explanation: "Leviticus 17:10-14 - Any Israelite... who eats any blood—I will set my face against that person... and will cut them off from their people... for the life of every creature is in its blood.",
    referenceVerse: "Leviticus 17:10-14"
  },
  {
    id: 2,
    question: "What were the specific requirements for the birds used in the ritual cleansing of a person healed from a skin disease (leprosy)?",
    options: ["One dead and one alive", "Two clean live birds, cedar wood, scarlet yarn, and hyssop", "Two doves from the desert", "Three pigeons from the temple"],
    answer: 1,
    explanation: "Leviticus 14:4 - The priest shall order two live clean birds and some cedar wood, scarlet yarn and hyssop to be brought for the person to be cleansed.",
    referenceVerse: "Leviticus 14:4"
  },
  {
    id: 3,
    question: "Why were Aaron and his remaining sons forbidden to let their hair become unkempt or tear their clothes after the death of Nadab and Abihu?",
    options: ["They were too busy", "The anointing oil of the Lord was upon them", "It was a sign of joy", "They didn't have enough clothes"],
    answer: 1,
    explanation: "Leviticus 10:6-7 - Do not let your hair become unkempt and do not tear your clothes... because the Lord’s anointing oil is on you.",
    referenceVerse: "Leviticus 10:6-7"
  },
  {
    id: 4,
    question: "What was the valuation of a male between 20 and 60 years old who made a special vow to the Lord, according to the sanctuary shekel?",
    options: ["10 shekels of silver", "50 shekels of silver", "100 shekels of silver", "30 shekels of silver"],
    answer: 1,
    explanation: "Leviticus 27:3 - Set the value of a male between the ages of twenty and sixty at fifty shekels of silver, according to the sanctuary shekel.",
    referenceVerse: "Leviticus 27:3"
  },
  {
    id: 5,
    question: "What was the specific rule regarding marriage for the High Priest, as distinguished from other priests?",
    options: ["He could not marry", "He must marry a widow", "He must marry a virgin from his own people", "He could marry anyone from Israel"],
    answer: 2,
    explanation: "Leviticus 21:13-14 - The woman he marries must be a virgin. He must not marry a widow, a divorced woman... but only a virgin from his own people.",
    referenceVerse: "Leviticus 21:13-14"
  },
  {
    id: 6,
    question: "God commanded that the fire on the altar of burnt offering should never do what?",
    options: ["Be seen from outside", "Grow too large", "Go out", "Be touched by a commoner"],
    answer: 2,
    explanation: "Leviticus 6:13 - The fire must be kept burning on the altar continuously; it must not go out.",
    referenceVerse: "Leviticus 6:13"
  },
  {
    id: 7,
    question: "What is the Hebrew name for the book of Leviticus, which is also the first word of the book?",
    options: ["Bereshit", "Shemot", "Vayikra", "Bamidbar"],
    answer: 2,
    explanation: "The Hebrew title for Leviticus is Vayikra (וַיִּקְרָא), which means 'And He called.'",
    referenceVerse: "Leviticus 1:1"
  },
  {
    id: 8,
    question: "What was the fate of a house with persistent leprous mildew (or 'tzaraat') that remained after stones were replaced and the house scraped?",
    options: ["It was blessed by the priest", "It was sold to a foreigner", "It was torn down and its materials taken outside the town", "It was left vacant for seven years"],
    answer: 2,
    explanation: "Leviticus 14:45 - It must be torn down—its stones, timbers and all the plaster—and taken out of the town to an unclean place.",
    referenceVerse: "Leviticus 14:45"
  },
  {
    id: 9,
    question: "In the ritual of the 'peace offering,' which specific part was considered the 'food of the Lord' and belonged only to Him?",
    options: ["The right thigh", "The breast", "All the fat", "The skin"],
    answer: 2,
    explanation: "Leviticus 3:16 - The priest shall burn them on the altar as food, an offering made by fire, a pleasing aroma. All the fat is the Lord's.",
    referenceVerse: "Leviticus 3:16"
  },
  {
    id: 10,
    question: "What happened to a woman's vow if her father or husband heard it and remained silent?",
    options: ["It was automatically voided", "It stood as valid", "It had to be confirmed with a sacrifice", "It was only half-valid"],
    answer: 1,
    explanation: "Numbers 30 (often linked with Lev 27) - If her husband/father hears of it and says nothing to her, then all her vows... shall stand.",
    referenceVerse: "Numbers 30:4"
  }
];

export default function LeviticusAdvancedQuiz() {
  return (
    <PublicQuiz 
      title="Leviticus Advanced Quiz"
      questions={questions}
      bookName="Leviticus"
      chapter="Advanced Level"
      seoDescription="A master-level exploration of the Holiness Code. Deep dive into the technicalities of sacrificial law, priestly purity, and sabbatical rest."
      canonicalPath="/bible-questions-and-answers-hub/leviticus/advanced"
    />
  );
}
