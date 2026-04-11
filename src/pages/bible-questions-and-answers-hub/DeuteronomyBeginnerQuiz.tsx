import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What does the name 'Deuteronomy' mean in its Greek origin?",
    options: ["The Wilderness Journey", "The Second Law", "Moses' Last Words", "The Holy Covenant"],
    answer: 1,
    explanation: "Deuteronomy is derived from the Greek words 'deuteros' (second) and 'nomos' (law), as it contains a second giving of the Law to a new generation.",
    referenceVerse: "Deuteronomy 17:18"
  },
  {
    id: 2,
    question: "Who gave the speeches that make up most of the book of Deuteronomy?",
    options: ["Joshua", "Aaron", "Moses", "Caleb"],
    answer: 2,
    explanation: "Deuteronomy consists practically entirely of the final speeches given by Moses to the Israelites before they crossed into Canaan.",
    referenceVerse: "Deuteronomy 1:1"
  },
  {
    id: 3,
    question: "Where were the Israelites camped when Moses delivered these last messages?",
    options: ["At Mount Sinai", "In the land of Egypt", "On the plains of Moab at the Jordan", "On the summit of Mount Ararat"],
    answer: 2,
    explanation: "Deuteronomy 1:5 - East of the Jordan in the territory of Moab, Moses began to expound this law.",
    referenceVerse: "Deuteronomy 1:5"
  },
  {
    id: 4,
    question: "What is the name of the famous prayer in Deuteronomy 6 that begins with 'Hear, O Israel'?",
    options: ["The Magnificat", "The Kaddish", "The Shema", "The Lord's Prayer"],
    answer: 2,
    explanation: "The 'Shema' (Deuteronomy 6:4-9) is the centerpiece of Jewish prayer service and the most fundamental expression of monotheism.",
    referenceVerse: "Deuteronomy 6:4"
  },
  {
    id: 5,
    question: "What did Moses specifically see from the summit of Mount Nebo before he died?",
    options: ["The burning bush", "A giant cedar forest", "The Promised Land", "An approaching army"],
    answer: 2,
    explanation: "Deuteronomy 34:1-3 - Moses climbed Mount Nebo... and the Lord showed him the whole land.",
    referenceVerse: "Deuteronomy 34:1"
  },
  {
    id: 6,
    question: "According to Deuteronomy 6, how are the Israelites supposed to love God?",
    options: ["Only during the Sabbath", "With all their heart, soul, and strength", "By giving half their wealth", "By staying inside the camp"],
    answer: 1,
    explanation: "Deuteronomy 6:5 - Love the Lord your God with all your heart and with all your soul and with all your strength.",
    referenceVerse: "Deuteronomy 6:5"
  },
  {
    id: 7,
    question: "Who was chosen and commissioned to lead Israel after the death of Moses?",
    options: ["Eleazar", "Caleb", "Joshua", "Gideon"],
    answer: 2,
    explanation: "Deuteronomy 31:7-8 - Then Moses summoned Joshua and said to him... 'for you must go with this people into the land.'",
    referenceVerse: "Deuteronomy 31:7"
  },
  {
    id: 8,
    question: "When Moses reminds the people of their history, what does he say he did to the two stone tablets in the past?",
    options: ["He hid them in a cave", "He gave them to the Egyptians", "He broke them at the foot of the mountain", "He lost them in the wilderness"],
    answer: 2,
    explanation: "Deuteronomy 9:17 - 'So I took the two tablets and threw them out of my hands, breaking them to pieces before your eyes.'",
    referenceVerse: "Deuteronomy 9:17"
  },
  {
    id: 9,
    question: "How old was Moses when he died on Mount Nebo?",
    options: ["80 years old", "100 years old", "120 years old", "150 years old"],
    answer: 2,
    explanation: "Deuteronomy 34:7 - Moses was a hundred and twenty years old when he died, yet his eyes were not weak nor his strength gone.",
    referenceVerse: "Deuteronomy 34:7"
  },
  {
    id: 10,
    question: "Did Moses ever physically enter the Promised Land of Canaan?",
    options: ["Yes, he lived there for ten years", "No, he died in Moab after seeing it from a distance", "Yes, he entered with Joshua", "The Bible doesn't say"],
    answer: 1,
    explanation: "Deuteronomy 34:4-5 - 'I have let you see it with your eyes, but you will not cross over into it.' And Moses the servant of the Lord died there in Moab.",
    referenceVerse: "Deuteronomy 34:4-5"
  }
];

export default function DeuteronomyBeginnerQuiz() {
  return (
    <PublicQuiz 
      title="Deuteronomy Beginner Quiz"
      questions={questions}
      bookName="Deuteronomy"
      chapter="Beginner Level"
      seoDescription="Master the basics of Moses' final charge. Explore the Shema, the history of Israel's journey, and the core of the covenant in Deuteronomy."
      canonicalPath="/bible-questions-and-answers-hub/deuteronomy/beginner"
    />
  );
}
