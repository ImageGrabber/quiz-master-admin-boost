import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was the name of the woman Moses married in Midian?",
    options: ["Miriam", "Zipporah", "Rebekah", "Leah"],
    answer: 1,
    explanation: "Exodus 2:21 - Moses agreed to stay with the man (Jethro/Reuel), who gave his daughter Zipporah to Moses in marriage.",
    referenceVerse: "Exodus 2:21"
  },
  {
    id: 2,
    question: "Who was Moses' father-in-law, also known as the priest of Midian?",
    options: ["Aaron", "Jethro", "Joshua", "Eleazar"],
    answer: 1,
    explanation: "Exodus 3:1 - Now Moses was tending the flock of Jethro his father-in-law, the priest of Midian.",
    referenceVerse: "Exodus 3:1"
  },
  {
    id: 3,
    question: "Which of the twelve tribes of Israel were Moses and Aaron from?",
    options: ["Judah", "Benjamin", "Levi", "Ephraim"],
    answer: 2,
    explanation: "Exodus 2:1 - Now a man of the tribe of Levi married a Levite woman...",
    referenceVerse: "Exodus 2:1"
  },
  {
    id: 4,
    question: "How many years did the people of Israel dwell in the land of Egypt before the Exodus?",
    options: ["40 years", "100 years", "430 years", "215 years"],
    answer: 2,
    explanation: "Exodus 12:40 - Now the length of time the Israelite people lived in Egypt was 430 years.",
    referenceVerse: "Exodus 12:40"
  },
  {
    id: 5,
    question: "What did the Israelites use to mark their doorframes so the angel of death would 'pass over' them?",
    options: ["Water from the Nile", "Lamb's blood", "Oil and wine", "Ash from the altar"],
    answer: 1,
    explanation: "Exodus 12:7 - Then they are to take some of the blood and put it on the sides and tops of the doorframes of the houses where they eat the lambs.",
    referenceVerse: "Exodus 12:7"
  },
  {
    id: 6,
    question: "At Marah, the water was too bitter to drink. What did Moses use to make the water sweet?",
    options: ["A special salt", "A piece of wood (tree)", "His staff", "A prayer"],
    answer: 1,
    explanation: "Exodus 15:25 - Then Moses cried out to the Lord, and the Lord pointed out to him a piece of wood. He threw it into the water, and the water became fit to drink.",
    referenceVerse: "Exodus 15:25"
  },
  {
    id: 7,
    question: "Who led the Israelite army against the Amalekites while Moses held his hands up on the hill?",
    options: ["Aaron", "Hur", "Joshua", "Caleb"],
    answer: 2,
    explanation: "Exodus 17:9-10 - Moses said to Joshua, 'Choose some of our men and go out to fight the Amalekites.'",
    referenceVerse: "Exodus 17:9-10"
  },
  {
    id: 8,
    question: "What is the focused theme of the Fourth Commandment?",
    options: ["Honoring parents", "Observing the Sabbath", "Avoiding murder", "Avoiding theft"],
    answer: 1,
    explanation: "Exodus 20:8 - Remember the Sabbath day by keeping it holy.",
    referenceVerse: "Exodus 20:8"
  },
  {
    id: 9,
    question: "Which craftsman was specifically called by name and filled with the Spirit of God for artistic designs in the Tabernacle?",
    options: ["Bezalel", "Eleazar", "Nadab", "Abihu"],
    answer: 0,
    explanation: "Exodus 31:2-3 - See, I have chosen Bezalel son of Uri... and I have filled him with the Spirit of God... to make artistic designs.",
    referenceVerse: "Exodus 31:2-3"
  },
  {
    id: 10,
    question: "What was the name of the place where Moses struck the rock for water, meaning 'testing' or 'quarreling'?",
    options: ["Elim", "Massah and Meribah", "Rephidim", "Beersheba"],
    answer: 1,
    explanation: "Exodus 17:7 - And he called the name of the place Massah and Meribah because the Israelites quarreled and because they tested the Lord.",
    referenceVerse: "Exodus 17:7"
  }
];

export default function ExodusIntermediateQuiz() {
  return (
    <PublicQuiz 
      title="Exodus Intermediate Quiz"
      questions={questions}
      bookName="Exodus"
      chapter="Intermediate Level"
      seoDescription="Dive deeper into the journey of Israel. Test your knowledge on the wilderness miracles, the battle with Amalek, and the divine laws given at Sinai."
      canonicalPath="/bible-questions-and-answers-hub/exodus/intermediate"
    />
  );
}
