import PublicQuiz from "../PublicQuiz";

const questions = [
  // Early World (Ch 1-11)
  {
    id: 1,
    question: "Which of the following was NOT one of the four rivers that flowed out of Eden?",
    options: ["Pishon", "Gihon", "Jordan", "Hiddekel"],
    answer: 2,
    explanation: "Genesis 2:11-14 lists Pishon, Gihon, Hiddekel (Tigris), and the Euphrates.",
    referenceVerse: "Genesis 2:11-14"
  },
  {
    id: 2,
    question: "What was the name of the garden in Eden where God put the man?",
    options: ["The Garden of Life", "The Garden of East", "The Garden of Eden", "The Garden of Truth"],
    answer: 2,
    explanation: "Genesis 2:8 - The Lord God planted a garden in the east, in Eden; and there he put the man he had formed.",
    referenceVerse: "Genesis 2:8"
  },
  {
    id: 3,
    question: "Who was the oldest man recorded in the Bible (living 969 years)?",
    options: ["Adam", "Enoch", "Noah", "Methuselah"],
    answer: 3,
    explanation: "Genesis 5:27 - Altogether, Methuselah lived a total of 969 years, and then he died.",
    referenceVerse: "Genesis 5:27"
  },
  {
    id: 4,
    question: "Which of Noah's sons was the ancestor of the Canaanites?",
    options: ["Shem", "Ham", "Japheth", "None of the above"],
    answer: 1,
    explanation: "Genesis 9:18 - The sons of Noah who came out of the ark were Shem, Ham and Japheth. (Ham was the father of Canaan.)",
    referenceVerse: "Genesis 9:18"
  },
  {
    id: 5,
    question: "What wood was used to build Noah's Ark?",
    options: ["Cedar", "Acacia", "Gopher wood", "Oak"],
    answer: 2,
    explanation: "Genesis 6:14 - So make yourself an ark of gopher wood.",
    referenceVerse: "Genesis 6:14"
  },
  {
    id: 6,
    question: "How old was Noah when the floodwaters came upon the earth?",
    options: ["400 years old", "500 years old", "600 years old", "700 years old"],
    answer: 2,
    explanation: "Genesis 7:6 - Noah was six hundred years old when the floodwaters came on the earth.",
    referenceVerse: "Genesis 7:6"
  },
  {
    id: 7,
    question: "Where did the ark come to rest after the flood?",
    options: ["Mount Sinai", "Mount Ararat", "Mount Nebo", "Mount Moriah"],
    answer: 1,
    explanation: "Genesis 8:4 - and on the seventeenth day of the seventh month the ark came to rest on the mountains of Ararat.",
    referenceVerse: "Genesis 8:4"
  },
  {
    id: 8,
    question: "What was the name of Noah's son from whom the line of David came?",
    options: ["Shem", "Ham", "Japheth", "Seth"],
    answer: 0,
    explanation: "Shem was the ancestor of the Semitic peoples, including the Israelites.",
    referenceVerse: "Genesis 10:21"
  },
  // Abrahamic Covenant (Ch 12-25)
  {
    id: 9,
    question: "How old was Abram when he left Haran for the land of Canaan?",
    options: ["50 years old", "75 years old", "99 years old", "100 years old"],
    answer: 1,
    explanation: "Genesis 12:4 - Abram was seventy-five years old when he set out from Haran.",
    referenceVerse: "Genesis 12:4"
  },
  {
    id: 10,
    question: "Who was the priest-king of Salem who blessed Abram after the battle of the kings?",
    options: ["Abimelech", "Melchizedek", "Chedorlaomer", "Potiphar"],
    answer: 1,
    explanation: "Genesis 14:18 - Then Melchizedek king of Salem brought out bread and wine. He was priest of God Most High.",
    referenceVerse: "Genesis 14:18"
  },
  {
    id: 11,
    question: "What did Sarai's name change to when God established His covenant with Abraham?",
    options: ["Sarah", "Rebekah", "Leah", "Keturah"],
    answer: 0,
    explanation: "Genesis 17:15 - God also said to Abraham, 'As for Sarai your wife, you are no longer to call her Sarai; her name will be Sarah.'",
    referenceVerse: "Genesis 17:15"
  },
  {
    id: 12,
    question: "Who was Hagar's son?",
    options: ["Isaac", "Ishmael", "Jacob", "Esau"],
    answer: 1,
    explanation: "Genesis 16:15 - So Hagar bore Abram a son, and Abram gave the name Ishmael to the son she had borne.",
    referenceVerse: "Genesis 16:15"
  },
  {
    id: 13,
    question: "What was the name of the cave where Sarah was buried?",
    options: ["Adullam", "Machpelah", "Engedi", "Mamre"],
    answer: 1,
    explanation: "Genesis 23:19 - Afterward Abraham buried his wife Sarah in the cave in the field of Machpelah.",
    referenceVerse: "Genesis 23:19"
  },
  {
    id: 14,
    question: "How many righteous people did Abraham ask God to spare Sodom for at the final count?",
    options: ["1 righteous person", "5 righteous people", "10 righteous people", "50 righteous people"],
    answer: 2,
    explanation: "Genesis 18:32 - He said, 'I will not destroy it for the sake of ten.'",
    referenceVerse: "Genesis 18:32"
  },
  {
    id: 15,
    question: "The covenant of circumcision was given to Abraham at what age?",
    options: ["75", "86", "99", "100"],
    answer: 2,
    explanation: "Genesis 17:1 - When Abram was ninety-nine years old, the Lord appeared to him.",
    referenceVerse: "Genesis 17:1"
  },
  {
    id: 16,
    question: "Who was Isaac's wife found by Abraham's servant?",
    options: ["Rachel", "Leah", "Rebekah", "Zilpah"],
    answer: 2,
    explanation: "Genesis 24 - Abraham's servant traveled back to his original land and found Rebekah at the well.",
    referenceVerse: "Genesis 24:67"
  },
  // Jacob & the Patriarchs (Ch 26-36)
  {
    id: 17,
    question: "At what place did Jacob have a dream of a ladder reaching to heaven?",
    options: ["Shechem", "Bethel", "Peniel", "Beersheba"],
    answer: 1,
    explanation: "Genesis 28:19 - He called that place Bethel, though the city used to be called Luz.",
    referenceVerse: "Genesis 28:19"
  },
  {
    id: 18,
    question: "How many years did Jacob serve Laban in total to marry both Leah and Rachel?",
    options: ["7 years", "14 years", "20 years", "21 years"],
    answer: 1,
    explanation: "Genesis 29:27, 30 - Jacob served Laban for 7 years for Rachel, but got Leah, then another 7 years for Rachel (14 total).",
    referenceVerse: "Genesis 29:27-30"
  },
  {
    id: 19,
    question: "What was the meaning of the name 'Jacob'?",
    options: ["Supplanter (heels-holder)", "Laughter", "Princes with God", "Hairy"],
    answer: 0,
    explanation: "Genesis 25:26 - his hand grasping Esau's heel; so he was named Jacob.",
    referenceVerse: "Genesis 25:26"
  },
  {
    id: 20,
    question: "What was the name of the place where Jacob wrestled with God?",
    options: ["Bethel", "Peniel", "Mahanaim", "Sucoth"],
    answer: 1,
    explanation: "Genesis 32:30 - So Jacob called the place Peniel, saying, 'It is because I saw God face to face, and yet my life was spared.'",
    referenceVerse: "Genesis 32:30"
  },
  {
    id: 21,
    question: "How many of the 12 tribes of Israel were born to Leah?",
    options: ["4 tribes", "6 tribes", "10 tribes", "12 tribes"],
    answer: 1,
    explanation: "Leah bore Reuben, Simeon, Levi, Judah, Issachar, and Zebulun (6 sons).",
    referenceVerse: "Genesis 35:23"
  },
  {
    id: 22,
    question: "What was the name of the eldest son of Jacob?",
    options: ["Judah", "Reuben", "Simeon", "Levi"],
    answer: 1,
    explanation: "Genesis 29:32 - Leah became pregnant and gave birth to a son. She named him Reuben.",
    referenceVerse: "Genesis 29:32"
  },
  {
    id: 23,
    question: "What daughter of Jacob was defiled by Shechem?",
    options: ["Dinah", "Tamar", "Deborah", "Rachel"],
    answer: 0,
    explanation: "Genesis 34:1-2 - Now Dinah, the daughter Leah had borne to Jacob... Shechem son of Hamor the Hivite... took her and defiled her.",
    referenceVerse: "Genesis 34:1-2"
  },
  {
    id: 24,
    question: "Rachel died giving birth to which of Jacob's sons?",
    options: ["Joseph", "Benjamin", "Dan", "Naphtali"],
    answer: 1,
    explanation: "Genesis 35:18 - As she breathed her last—for she was dying—she named her son Ben-Oni. But his father named him Benjamin.",
    referenceVerse: "Genesis 35:18"
  },
  // Joseph & Egypt (Ch 37-50)
  {
    id: 25,
    question: "How old was Joseph when he was sold into slavery by his brothers?",
    options: ["12 years old", "17 years old", "20 years old", "30 years old"],
    answer: 1,
    explanation: "Genesis 37:2 - Joseph, a young man of seventeen, was tending the flocks with his brothers.",
    referenceVerse: "Genesis 37:2"
  },
  {
    id: 26,
    question: "What name did Pharaoh give to Joseph after he interpreted the dreams?",
    options: ["Zaphenath-Paneah", "Potiphar", "Asenath", "Abimelech"],
    answer: 0,
    explanation: "Genesis 41:45 - Pharaoh gave Joseph the name Zaphenath-Paneah.",
    referenceVerse: "Genesis 41:45"
  },
  {
    id: 27,
    question: "Who was Joseph's Egyptian wife?",
    options: ["Tamar", "Asenath", "Keturah", "Zipporah"],
    answer: 1,
    explanation: "Genesis 41:45 - ...and gave him Asenath daughter of Potiphera, priest of On, to be his wife.",
    referenceVerse: "Genesis 41:45"
  },
  {
    id: 28,
    question: "How old was Joseph when he stood before Pharaoh?",
    options: ["17 years old", "20 years old", "30 years old", "40 years old"],
    answer: 2,
    explanation: "Genesis 41:46 - Joseph was thirty years old when he entered the service of Pharaoh king of Egypt.",
    referenceVerse: "Genesis 41:46"
  },
  {
    id: 29,
    question: "In which Egyptian province did Jacob and his family settle?",
    options: ["Cairo", "Avaris", "Goshen", "Thebes"],
    answer: 2,
    explanation: "Genesis 47:11 - So Joseph settled his father and his brothers in Egypt... in the region of Goshen.",
    referenceVerse: "Genesis 47:11"
  },
  {
    id: 30,
    question: "Which son did Jacob bless with the right of the firstborn even though he was the younger?",
    options: ["Ephraim", "Manasseh", "Benjamin", "Levi"],
    answer: 0,
    explanation: "Genesis 48:14-19 - Jacob crossed his hands and put his right hand on Ephraim's head, though he was the younger.",
    referenceVerse: "Genesis 48:14-19"
  }
];

export default function GenesisIntermediateQuiz() {
  return (
    <PublicQuiz 
      title="Genesis Intermediate Quiz"
      questions={questions}
      bookName="Genesis"
      chapter="Intermediate Level"
      seoDescription="Dive deeper into the Book of Genesis with our intermediate quiz. Test your knowledge on specific locations, names, and chronological details."
      canonicalPath="/bible-questions-and-answers-hub/genesis/intermediate"
    />
  );
}
