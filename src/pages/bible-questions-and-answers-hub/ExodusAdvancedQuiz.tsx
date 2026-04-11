import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What were the exact dimensions of the Ark of the Covenant, as commanded by God?",
    options: ["2.5 x 1.5 x 1.5 cubits", "3 x 2 x 2 cubits", "1.5 x 1.5 x 1.5 cubits", "5 x 3 x 3 cubits"],
    answer: 0,
    explanation: "Exodus 25:10 - Have them make an ark of acacia wood—two and a half cubits long, a cubit and a half wide, and a cubit and a half high.",
    referenceVerse: "Exodus 25:10"
  },
  {
    id: 2,
    question: "Which specific wood was designated for the structural frames of the Tabernacle and its furniture?",
    options: ["Cedar", "Olive", "Acacia (Shittim)", "Oak"],
    answer: 2,
    explanation: "Exodus 25, 26, 36 - Acacia wood was the primary material for the Ark, the Table, and the Tabernacle frames.",
    referenceVerse: "Exodus 26:15"
  },
  {
    id: 3,
    question: "Who were the two Hebrew midwives named for fearing God and refusing Pharaoh's command to kill baby boys?",
    options: ["Miriam and Zipporah", "Shiphrah and Puah", "Leah and Rachel", "Bilhah and Zilpah"],
    answer: 1,
    explanation: "Exodus 1:15 - The king of Egypt said to the Hebrew midwives, whose names were Shiphrah and Puah...",
    referenceVerse: "Exodus 1:15"
  },
  {
    id: 4,
    question: "What was the name of the spring location where Israel found twelve wells and seventy palm trees?",
    options: ["Marah", "Elim", "Rephidim", "Kadesh"],
    answer: 1,
    explanation: "Exodus 15:27 - Then they came to Elim, where there were twelve springs and seventy palm trees.",
    referenceVerse: "Exodus 15:27"
  },
  {
    id: 5,
    question: "What was inscribed on the pure gold plate (the holy diadem) attached to the High Priest's turban?",
    options: ["The Name of Yahweh", "Holy to the Lord", "Israel's Salvation", "Glory to God"],
    answer: 1,
    explanation: "Exodus 28:36 - Make a plate of pure gold and engrave on it as on a seal: HOLY TO THE LORD.",
    referenceVerse: "Exodus 28:36"
  },
  {
    id: 6,
    question: "How many lamps were on the pure gold lampstand (Menorah) in the Tabernacle?",
    options: ["Seven", "Twelve", "Ten", "Three"],
    answer: 0,
    explanation: "Exodus 25:37 - Then make its seven lamps and set them up on it so that they light the space in front of it.",
    referenceVerse: "Exodus 25:37"
  },
  {
    id: 7,
    question: "What were the names of the two men God filled with the Spirit of wisdom for the construction of the Tabernacle?",
    options: ["Aaron and Eleazar", "Joshua and Caleb", "Bezalel and Oholiab", "Nadab and Abihu"],
    answer: 2,
    explanation: "Exodus 31:1-6 - God called Bezalel... and appointed Oholiab... to help him make everything I have commanded.",
    referenceVerse: "Exodus 31:1-6"
  },
  {
    id: 8,
    question: "After the Golden Calf incident, where did Moses regularly pitch the 'Tent of Meeting' to seek the Lord?",
    options: ["Across the Red Sea", "Outside the camp, some distance away", "In the center of the camp", "On the summit of Sinai"],
    answer: 1,
    explanation: "Exodus 33:7 - Now Moses used to take a tent and pitch it outside the camp some distance away, calling it the 'tent of meeting.'",
    referenceVerse: "Exodus 33:7"
  },
  {
    id: 9,
    question: "Which of these was NOT a component of the High Priest's Ephod?",
    options: ["Two onyx stones", "The Breastpiece of Judgment", "The Bronze Basin", "Urim and Thummim"],
    answer: 2,
    explanation: "The Bronze Basin (Exodus 30:18) was a piece of Tabernacle furniture in the courtyard, not part of the priestly garments.",
    referenceVerse: "Exodus 30:18"
  },
  {
    id: 10,
    question: "What specific judgment did God command for a person who made perfume similar to the holy anointing oil for common use?",
    options: ["He must be cut off from his people", "He must pay ten talents", "He must be stoned", "He must offer a burnt sacrifice"],
    answer: 0,
    explanation: "Exodus 30:33 - Whoever makes perfume like it... must be cut off from his people.",
    referenceVerse: "Exodus 30:33"
  }
];

export default function ExodusAdvancedQuiz() {
  return (
    <PublicQuiz 
      title="Exodus Advanced Quiz"
      questions={questions}
      bookName="Exodus"
      chapter="Advanced Level"
      seoDescription="A master-level challenge on the technical and theological depths of Exodus. Tabernacle specifications, priestly garments, and divine judgments."
      canonicalPath="/bible-questions-and-answers-hub/exodus/advanced"
    />
  );
}
