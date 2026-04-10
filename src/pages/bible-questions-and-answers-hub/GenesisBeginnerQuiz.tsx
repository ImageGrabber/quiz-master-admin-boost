import PublicQuiz from "../PublicQuiz";

const questions = [
  // Creation & Eden (1-5)
  {
    id: 1,
    question: "In the beginning, what did God create first?",
    options: ["Light", "Heaven", "Earth", "Man"],
    answer: 0,
    explanation: "Genesis 1:3 - And God said, 'Let there be light,' and there was light.",
    referenceVerse: "Genesis 1:3"
  },
  {
    id: 2,
    question: "On which day did God create the sun, moon, and stars?",
    options: ["First day", "Second day", "Third day", "Fourth day"],
    answer: 3,
    explanation: "Genesis 1:14-19 - God created the sun, moon, and stars on the fourth day.",
    referenceVerse: "Genesis 1:14-19"
  },
  {
    id: 3,
    question: "What was the name of the first man?",
    options: ["Abel", "Adam", "Cain", "Seth"],
    answer: 1,
    explanation: "Genesis 2:7 - The Lord God formed the man from the dust of the ground.",
    referenceVerse: "Genesis 2:7"
  },
  {
    id: 4,
    question: "From which part of Adam's body was Eve created?",
    options: ["His rib", "His finger", "His foot", "His head"],
    answer: 0,
    explanation: "Genesis 2:21-22 - The Lord God made a woman from the rib he had taken out of the man.",
    referenceVerse: "Genesis 2:21-22"
  },
  {
    id: 5,
    question: "What was the name of the tree that Adam and Eve were forbidden to eat from?",
    options: ["Tree of Life", "Tree of Knowledge of Good and Evil", "Tree of Wisdom", "Tree of Understanding"],
    answer: 1,
    explanation: "Genesis 2:17 - But you must not eat from the tree of the knowledge of good and evil.",
    referenceVerse: "Genesis 2:17"
  },
  // Flood & Noah (6-10)
  {
    id: 6,
    question: "Who was the first murderer in the Bible?",
    options: ["Abel", "Cain", "Adam", "Seth"],
    answer: 1,
    explanation: "Genesis 4:8 - Cain attacked his brother Abel and killed him.",
    referenceVerse: "Genesis 4:8"
  },
  {
    id: 7,
    question: "How many days and nights did it rain during the flood?",
    options: ["30 days", "40 days", "50 days", "60 days"],
    answer: 1,
    explanation: "Genesis 7:12 - And rain fell on the earth forty days and forty nights.",
    referenceVerse: "Genesis 7:12"
  },
  {
    id: 8,
    question: "What bird did Noah send out first to see if the land was dry?",
    options: ["Dove", "Sparrow", "Raven", "Eagle"],
    answer: 2,
    explanation: "Genesis 8:7 - He sent out a raven, and it kept flying back and forth until the water had dried up from the earth.",
    referenceVerse: "Genesis 8:7"
  },
  {
    id: 9,
    question: "What sign did God give that He would never flood the earth again?",
    options: ["A rainbow", "A bright star", "A dove with an olive branch", "A cloud of fire"],
    answer: 0,
    explanation: "Genesis 9:13 - I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.",
    referenceVerse: "Genesis 9:13"
  },
  {
    id: 10,
    question: "What was the name of the tower where languages were confused?",
    options: ["Tower of Zion", "Tower of Babel", "Tower of Nineveh", "Tower of Babylon"],
    answer: 1,
    explanation: "Genesis 11:9 - That is why it was called Babel—because there the Lord confused the language of the whole world.",
    referenceVerse: "Genesis 11:9"
  },
  // Abraham & patriarchs (11-15)
  {
    id: 11,
    question: "Who did God tell to leave his country and go to a new land?",
    options: ["Lot", "Isaac", "Abram (Abraham)", "Jacob"],
    answer: 2,
    explanation: "Genesis 12:1 - The Lord had said to Abram, 'Go from your country... to the land I will show you.'",
    referenceVerse: "Genesis 12:1"
  },
  {
    id: 12,
    question: "Who was Abraham's wife?",
    options: ["Rachel", "Rebecca", "Sarah", "Leah"],
    answer: 2,
    explanation: "Genesis 17:15 - God also said to Abraham, 'As for Sarai your wife, you are no longer to call her Sarai; her name will be Sarah.'",
    referenceVerse: "Genesis 17:15"
  },
  {
    id: 13,
    question: "What happened to Lot's wife when she looked back at Sodom?",
    options: ["She turned into a pillar of salt", "She was struck by lightning", "She was swallowed by the earth", "She became blind"],
    answer: 0,
    explanation: "Genesis 19:26 - But Lot's wife looked back, and she became a pillar of salt.",
    referenceVerse: "Genesis 19:26"
  },
  {
    id: 14,
    question: "What was the name of Abraham and Sarah's son?",
    options: ["Ishmael", "Isaac", "Jacob", "Esau"],
    answer: 1,
    explanation: "Genesis 21:3 - Abraham gave the name Isaac to the son Sarah bore him.",
    referenceVerse: "Genesis 21:3"
  },
  {
    id: 15,
    question: "What animal did God provide as a sacrifice instead of Isaac?",
    options: ["A lamb", "A ram", "A goat", "A calf"],
    answer: 1,
    explanation: "Genesis 22:13 - Abraham looked up and there in a thicket he saw a ram caught by its horns.",
    referenceVerse: "Genesis 22:13"
  },
  // Jacob & Esau (16-20)
  {
    id: 16,
    question: "Which of Isaac's twin sons was born first?",
    options: ["Jacob", "Esau", "Joseph", "Benjamin"],
    answer: 1,
    explanation: "Genesis 25:25 - The first to come out was red, and his whole body was like a hairy garment; so they named him Esau.",
    referenceVerse: "Genesis 25:25"
  },
  {
    id: 17,
    question: "What did Esau sell his birthright for?",
    options: ["Silver", "A flock of sheep", "A bowl of stew", "A new tent"],
    answer: 2,
    explanation: "Genesis 25:34 - Then Jacob gave Esau some bread and some lentil stew.",
    referenceVerse: "Genesis 25:34"
  },
  {
    id: 18,
    question: "How many sons did Jacob have?",
    options: ["7 sons", "10 sons", "12 sons", "14 sons"],
    answer: 2,
    explanation: "Genesis 35:22 - Jacob had twelve sons.",
    referenceVerse: "Genesis 35:22"
  },
  {
    id: 19,
    question: "What was the name of Jacob's favorite wife (mother of Joseph)?",
    options: ["Leah", "Rachel", "Bilhah", "Zilpah"],
    answer: 1,
    explanation: "Genesis 29:30 - Jacob... loved Rachel more than Leah.",
    referenceVerse: "Genesis 29:30"
  },
  {
    id: 20,
    question: "What did God change Jacob's name to?",
    options: ["Abraham", "Isaac", "Israel", "Judah"],
    answer: 2,
    explanation: "Genesis 32:28 - Then the man said, 'Your name will no longer be Jacob, but Israel.'",
    referenceVerse: "Genesis 32:28"
  },
  // Joseph & Egypt (21-25)
  {
    id: 21,
    question: "What special gift did Jacob give to his son Joseph?",
    options: ["A gold ring", "A silver cup", "An ornate robe (coat of many colors)", "A beautiful staff"],
    answer: 2,
    explanation: "Genesis 37:3 - Now Israel loved Joseph more than any of his other sons... and he made an ornate robe for him.",
    referenceVerse: "Genesis 37:3"
  },
  {
    id: 22,
    question: "Where did Joseph's brothers sell him to?",
    options: ["Nineveh", "Egypt", "Babylon", "Assyria"],
    answer: 1,
    explanation: "Genesis 37:36 - Meanwhile, the Midianites sold Joseph in Egypt.",
    referenceVerse: "Genesis 37:36"
  },
  {
    id: 23,
    question: "What was Joseph's special ability that helped him in Egypt?",
    options: ["Interpreting dreams", "Building pyramids", "Leading armies", "Playing the harp"],
    answer: 0,
    explanation: "Genesis 41 - Joseph interpreted the Pharaoh's dreams about the seven years of plenty and seven years of famine.",
    referenceVerse: "Genesis 41:1-57"
  },
  {
    id: 24,
    question: "Who was Joseph's youngest brother?",
    options: ["Reuben", "Simeon", "Judah", "Benjamin"],
    answer: 3,
    explanation: "Genesis 43:29 - Joseph looked and saw his brother Benjamin, his own mother's son.",
    referenceVerse: "Genesis 43:29"
  },
  {
    id: 25,
    question: "How did Joseph treat his brothers when they came to Egypt for food?",
    options: ["He put them in prison forever", "He forgave and provided for them", "He ignored them", "He sent them back empty-handed"],
    answer: 1,
    explanation: "Genesis 45:5 - 'And now, do not be distressed and do not be angry with yourselves for selling me here, because it was to save lives that God sent me ahead of you.'",
    referenceVerse: "Genesis 45:5"
  }
];

export default function GenesisBeginnerQuiz() {
  return (
    <PublicQuiz 
      title="Genesis Beginner Quiz"
      questions={questions}
      bookName="Genesis"
      chapter="Beginner Level"
      seoDescription="Master the core stories of Genesis with this beginner-friendly interactive quiz covering creation, the flood, Abraham, and Joseph."
      canonicalPath="/bible-questions-and-answers-hub/genesis/beginner"
    />
  );
}
