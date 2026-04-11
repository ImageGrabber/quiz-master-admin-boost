import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What is the central theme that is repeated throughout the book of Leviticus?",
    options: ["War and Conquest", "Holiness", "The History of Kings", "Poetry and Song"],
    answer: 1,
    explanation: "Leviticus repeatedly calls the people to be holy because God is holy (Lev 11:44-45, 19:2, 20:7).",
    referenceVerse: "Leviticus 19:2"
  },
  {
    id: 2,
    question: "Who was appointed as the first High Priest to lead the worship in the Tabernacle?",
    options: ["Moses", "Aaron", "Joshua", "Caleb"],
    answer: 1,
    explanation: "Leviticus 8 describes the consecration of Aaron and his sons as priests, with Aaron as the High Priest.",
    referenceVerse: "Leviticus 8:12"
  },
  {
    id: 3,
    question: "Which tribe was set apart by God to serve in the sanctuary and assist the priests?",
    options: ["Judah", "Benjamin", "Levi", "Ephraim"],
    answer: 2,
    explanation: "The tribe of Levi was dedicated to the service of the Tabernacle, which is why the book is called 'Leviticus.'",
    referenceVerse: "Leviticus 1:1"
  },
  {
    id: 4,
    question: "What was the name of the most sacred day of the year when the High Priest entered the Most Holy Place to make atonement for sins?",
    options: ["Passover", "Day of Atonement (Yom Kippur)", "Feast of Weeks", "Sabbath"],
    answer: 1,
    explanation: "Leviticus 16 details the rituals for the Day of Atonement, the once-a-year entry into the presence of God.",
    referenceVerse: "Leviticus 16:30"
  },
  {
    id: 5,
    question: "On the Day of Atonement, what happened to the 'Scapegoat'?",
    options: ["It was sacrificed on the altar", "It was kept in the Tabernacle", "It was sent into the wilderness carrying the people's sins", "It was given to the poor"],
    answer: 2,
    explanation: "Leviticus 16:21-22 - Aaron shall lay both hands on the head of the live goat and confess over it all the wickedness... and send it away into the wilderness.",
    referenceVerse: "Leviticus 16:21-22"
  },
  {
    id: 6,
    question: "According to Leviticus, how many primary annual festivals (appointed feasts) was Israel commanded to celebrate?",
    options: ["Three", "Seven", "Twelve", "None"],
    answer: 1,
    explanation: "Leviticus 23 lists the seven feasts: Passover, Unleavened Bread, Firstfruits, Weeks, Trumpets, Day of Atonement, and Tabernacles.",
    referenceVerse: "Leviticus 23:4-44"
  },
  {
    id: 7,
    question: "What happened to Nadab and Abihu, the sons of Aaron, when they offered 'unauthorized fire' before the Lord?",
    options: ["They were promoted", "They were blinded", "They died before the Lord", "They were sent into exile"],
    answer: 2,
    explanation: "Leviticus 10:1-2 - Fire came out from the presence of the Lord and consumed them, and they died before the Lord.",
    referenceVerse: "Leviticus 10:2"
  },
  {
    id: 8,
    question: "To be considered 'clean' for eating among land animals, what two features must the animal have?",
    options: ["Walk on four legs and eat grass", "Have split hooves and chew the cud", "Be large and strong", "Be able to run fast"],
    answer: 1,
    explanation: "Leviticus 11:3 - You may eat any animal that has a divided hoof and that chews the cud.",
    referenceVerse: "Leviticus 11:3"
  },
  {
    id: 9,
    question: "What is the famous commandment found in Leviticus 19 regarding how to treat your neighbors?",
    options: ["Keep your distance", "Don't talk to them", "Love your neighbor as yourself", "Give them half your food"],
    answer: 2,
    explanation: "Leviticus 19:18 - Do not seek revenge or bear a grudge... but love your neighbor as yourself. I am the Lord.",
    referenceVerse: "Leviticus 19:18"
  },
  {
    id: 10,
    question: "What were the Israelites supposed to do with the corners of their fields during harvest?",
    options: ["Harvest them first", "Leave them for the poor and the foreigner", "Burn them as a sacrifice", "Sell them to other nations"],
    answer: 1,
    explanation: "Leviticus 19:9 - When you reap the harvest of your land, do not reap to the very edges of your field... leave them for the poor and the foreigner.",
    referenceVerse: "Leviticus 19:9-10"
  }
];

export default function LeviticusBeginnerQuiz() {
  return (
    <PublicQuiz 
      title="Leviticus Beginner Quiz"
      questions={questions}
      bookName="Leviticus"
      chapter="Beginner Level"
      seoDescription="Begin your journey into the holiness of God. Learn about the feasts, the priesthood, and the heart of the Law in Leviticus."
      canonicalPath="/bible-questions-and-answers-hub/leviticus/beginner"
    />
  );
}
