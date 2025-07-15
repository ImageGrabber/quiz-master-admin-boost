import BibleBookQuiz from "../BibleBookQuiz";



export default function GenesisQuiz() {
  // Add 25 difficult Genesis questions
  const genesisQuestions = [
    {
      chapter: 1,
      question: "What is the Hebrew word for 'create' used in Genesis 1:1?",
      options: ["Asah", "Bara", "Yatsar", "Qal"],
      answer: 1
    },
    {
      chapter: 2,
      question: "Which river did NOT flow out of Eden?",
      options: ["Pishon", "Gihon", "Euphrates", "Jordan"],
      answer: 3
    },
    {
      chapter: 3,
      question: "What was the first thing Adam and Eve did after eating the forbidden fruit?",
      options: ["Hid from God", "Sewed fig leaves", "Blamed each other", "Left the garden"],
      answer: 1
    },
    {
      chapter: 4,
      question: "Who was the father of those who play the harp and flute?",
      options: ["Jubal", "Tubal-cain", "Lamech", "Enoch"],
      answer: 0
    },
    {
      chapter: 5,
      question: "How old was Methuselah when he died?",
      options: ["969", "777", "930", "950"],
      answer: 0
    },
    {
      chapter: 6,
      question: "What was the length of Noah's ark in cubits?",
      options: ["100", "200", "300", "400"],
      answer: 2
    },
    {
      chapter: 7,
      question: "How many days did the floodwaters prevail on the earth?",
      options: ["40", "150", "365", "7"],
      answer: 1
    },
    {
      chapter: 8,
      question: "What type of leaf did the dove bring back to Noah?",
      options: ["Fig", "Olive", "Palm", "Vine"],
      answer: 1
    },
    {
      chapter: 9,
      question: "What was the sign of God's covenant with Noah?",
      options: ["Rainbow", "Altar", "Sacrifice", "Circumcision"],
      answer: 0
    },
    {
      chapter: 10,
      question: "Who was the mighty hunter before the Lord?",
      options: ["Nimrod", "Ham", "Cush", "Japheth"],
      answer: 0
    },
    {
      chapter: 11,
      question: "What city did the people build in Genesis 11?",
      options: ["Babel", "Ur", "Nineveh", "Sodom"],
      answer: 0
    },
    {
      chapter: 12,
      question: "How old was Abram when he left Haran?",
      options: ["75", "80", "99", "100"],
      answer: 0
    },
    {
      chapter: 13,
      question: "What land did Lot choose for himself?",
      options: ["Canaan", "Egypt", "Plain of Jordan", "Hebron"],
      answer: 2
    },
    {
      chapter: 14,
      question: "Who was the king of Salem and priest of God Most High?",
      options: ["Melchizedek", "Abimelech", "Pharaoh", "Bera"],
      answer: 0
    },
    {
      chapter: 15,
      question: "What did God count to Abram as righteousness?",
      options: ["His faith", "His works", "His sacrifice", "His obedience"],
      answer: 0
    },
    {
      chapter: 16,
      question: "What was the name of Hagar's son?",
      options: ["Ishmael", "Isaac", "Esau", "Jacob"],
      answer: 0
    },
    {
      chapter: 17,
      question: "What was the sign of the covenant with Abraham?",
      options: ["Rainbow", "Circumcision", "Sacrifice", "Altar"],
      answer: 1
    },
    {
      chapter: 18,
      question: "Who pleaded with God to spare Sodom?",
      options: ["Abraham", "Lot", "Sarah", "Melchizedek"],
      answer: 0
    },
    {
      chapter: 19,
      question: "What did Lot's wife become when she looked back?",
      options: ["Pillar of salt", "Statue", "Stone", "Sand"],
      answer: 0
    },
    {
      chapter: 20,
      question: "Who was the king of Gerar who took Sarah?",
      options: ["Abimelech", "Pharaoh", "Bera", "Melchizedek"],
      answer: 0
    },
    {
      chapter: 21,
      question: "How old was Abraham when Isaac was born?",
      options: ["75", "86", "99", "100"],
      answer: 3
    },
    {
      chapter: 22,
      question: "What did God provide as a substitute for Isaac?",
      options: ["Ram", "Goat", "Bull", "Lamb"],
      answer: 0
    },
    {
      chapter: 24,
      question: "Who was Rebekah's brother?",
      options: ["Laban", "Nahor", "Bethuel", "Haran"],
      answer: 0
    },
    {
      chapter: 27,
      question: "Who helped Jacob deceive Isaac?",
      options: ["Rebekah", "Leah", "Rachel", "Zilpah"],
      answer: 0
    },
    {
      chapter: 37,
      question: "What did Joseph's brothers do with his coat of many colors?",
      options: ["Sold it", "Burned it", "Dipped it in blood", "Gave it to Jacob"],
      answer: 2
    },
    {
      chapter: 50,
      question: "What did Joseph say to his brothers about their evil intentions?",
      options: ["You meant evil against me, but God meant it for good", "I will punish you", "You are forgiven", "Do not be afraid"],
      answer: 0
    }
  ];
  return (
    <BibleBookQuiz 
      title="Genesis Quiz"
      questions={genesisQuestions}
      bookName="Genesis"
    />
  );
}