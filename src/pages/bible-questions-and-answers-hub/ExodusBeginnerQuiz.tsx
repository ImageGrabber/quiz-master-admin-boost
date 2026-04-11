import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Where was Moses found as a baby by Pharaoh's daughter?",
    options: ["In a basket in the Nile River", "In a palace room", "In a desert cave", "In a village well"],
    answer: 0,
    explanation: "Exodus 2:3-5 - Pharaoh's daughter found Moses in a papyrus basket among the reeds along the bank of the Nile.",
    referenceVerse: "Exodus 2:3-5"
  },
  {
    id: 2,
    question: "What form did God take when He first spoke to Moses from the mountain?",
    options: ["A pillar of cloud", "A burning bush", "A bright star", "A powerful wind"],
    answer: 1,
    explanation: "Exodus 3:2 - The angel of the Lord appeared to him in flames of fire from within a bush.",
    referenceVerse: "Exodus 3:2"
  },
  {
    id: 3,
    question: "How many plagues did God send upon Egypt to force Pharaoh to let the Israelites go?",
    options: ["7 plagues", "10 plagues", "12 plagues", "3 plagues"],
    answer: 1,
    explanation: "There were 10 plagues in total, ranging from the Nile turning to blood to the death of the firstborn.",
    referenceVerse: "Exodus 7-12"
  },
  {
    id: 4,
    question: "What was the final and most devastating plague?",
    options: ["Three days of darkness", "The plague of locusts", "The death of the firstborn", "Turning water to blood"],
    answer: 2,
    explanation: "Exodus 11:5 - Every firstborn son in Egypt will die, from the firstborn son of Pharaoh... to the firstborn of all the livestock.",
    referenceVerse: "Exodus 11:5"
  },
  {
    id: 5,
    question: "Through which body of water did the Israelites cross on dry land to escape the Egyptian army?",
    options: ["The Dead Sea", "The Jordan River", "The Red Sea", "The Mediterranean Sea"],
    answer: 2,
    explanation: "Exodus 14:21-22 - The Lord drove the sea back with a strong east wind... and the Israelites went through the sea on dry ground.",
    referenceVerse: "Exodus 14:21-22"
  },
  {
    id: 6,
    question: "What food did God provide from heaven every morning for the Israelites in the wilderness?",
    options: ["Bread from Egypt", "Manna", "Figs and Dates", "Wheat"],
    answer: 1,
    explanation: "Exodus 16:14-15 - When the dew was gone, thin flakes like frost appeared on the desert floor... the Israelites called it Manna.",
    referenceVerse: "Exodus 16:14-15"
  },
  {
    id: 7,
    question: "On which mountain did Moses receive the Ten Commandments?",
    options: ["Mount Zion", "Mount Carmel", "Mount Sinai", "Mount Ararat"],
    answer: 2,
    explanation: "Exodus 19:20 - The Lord descended to the top of Mount Sinai and called Moses to the top of the mountain.",
    referenceVerse: "Exodus 19:20"
  },
  {
    id: 8,
    question: "What idol did the Israelites make and worship while Moses was on the mountain?",
    options: ["A golden calf", "A stone altar", "A bronze serpent", "A wooden pole"],
    answer: 0,
    explanation: "Exodus 32:4 - He took what they handed him and made it into an idol cast in the shape of a calf.",
    referenceVerse: "Exodus 32:4"
  },
  {
    id: 9,
    question: "What was the name of the portable tent sanctuary where God dwelled among His people?",
    options: ["The Temple", "The Tabernacle", "The Synagogue", "The Cathedral"],
    answer: 1,
    explanation: "The Tabernacle was the portable dwelling place for the divine presence from the time of the Exodus until the conquering of Canaan.",
    referenceVerse: "Exodus 25-40"
  },
  {
    id: 10,
    question: "Who was Moses' brother that served as his spokesperson before Pharaoh?",
    options: ["Caleb", "Joshua", "Aaron", "Hur"],
    answer: 2,
    explanation: "Exodus 4:14 - Is there not your brother, Aaron the Levite? I know he can speak well.",
    referenceVerse: "Exodus 4:14"
  }
];

export default function ExodusBeginnerQuiz() {
  return (
    <PublicQuiz 
      title="Exodus Beginner Quiz"
      questions={questions}
      bookName="Exodus"
      chapter="Beginner Level"
      seoDescription="Master the epic story of deliverance in Exodus. From the Plagues of Egypt to the Ten Commandments at Sinai."
      canonicalPath="/bible-questions-and-answers-hub/exodus/beginner"
    />
  );
}
