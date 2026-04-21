import PublicQuiz from "../PublicQuiz";

// Leviticus Quiz Questions - 10 questions about laws, sacrifices, and holiness
const leviticusQuestions = [
  {
    question: "What was the main purpose of the book of Leviticus?",
    options: [
      "To record Israel's journey through the wilderness",
      "To establish laws for worship and holiness",
      "To tell the story of Moses' life",
      "To document the Ten Commandments"
    ],
    answer: 1
  },
  {
    question: "What type of offering was required for unintentional sins?",
    options: [
      "Burnt offering",
      "Sin offering", 
      "Peace offering",
      "Grain offering"
    ],
    answer: 1
  },
  {
    question: "Which animals were considered clean for sacrifice?",
    options: [
      "Any animal without blemish",
      "Only cattle, sheep, and goats",
      "All domestic animals",
      "Only birds and fish"
    ],
    answer: 1
  },
  {
    question: "What was the Day of Atonement called in Hebrew?",
    options: [
      "Yom Kippur",
      "Passover",
      "Sukkot",
      "Shavuot"
    ],
    answer: 0
  },
  {
    question: "Who was allowed to enter the Most Holy Place?",
    options: [
      "Any priest",
      "Only the high priest",
      "Moses and Aaron",
      "All Levites"
    ],
    answer: 1
  },
  {
    question: "What was the purpose of the scapegoat on the Day of Atonement?",
    options: [
      "To be sacrificed for the people's sins",
      "To carry the people's sins into the wilderness",
      "To be eaten as a meal offering",
      "To be released as a sign of freedom"
    ],
    answer: 1
  },
  {
    question: "Which of these was NOT a type of offering mentioned in Leviticus?",
    options: [
      "Burnt offering",
      "Sin offering",
      "Tithe offering",
      "Peace offering"
    ],
    answer: 2
  },
  {
    question: "What was required for a person to be considered ceremonially clean?",
    options: [
      "Washing with water",
      "Sacrificing an animal",
      "Waiting seven days",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did the phrase 'holy to the Lord' mean in Leviticus?",
    options: [
      "Set apart for God's use",
      "Perfect and without sin",
      "Blessed by God",
      "Chosen by the people"
    ],
    answer: 0
  },
  {
    question: "What was the penalty for eating blood according to Leviticus?",
    options: [
      "A fine",
      "Excommunication",
      "Death",
      "Forty lashes"
    ],
    answer: 2
  }
];

export default function LeviticusPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Leviticus Quiz"
      questions={leviticusQuestions}
      bookName="Leviticus"
      canonicalPath={canonicalPath}
    />
  );
}
