export interface QuizQuestion {
  chapter: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type QuizData = Record<string, Record<number | string, Record<string, QuizQuestion[]>>>;

export const quizData: QuizData = {
  genesis: {
    1: {
      beginner: [
        { chapter: 1, question: "What was created on day 1?", options: ["Light", "Land", "Sun", "Animals"], answer: 0, explanation: "Genesis 1:3-5 — God said, 'Let there be light,' and there was light." },
        { chapter: 1, question: "What separated day from night?", options: ["Stars", "Moon", "Light", "Clouds"], answer: 2, explanation: "Genesis 1:4 — God separated the light from the darkness." },
        { chapter: 1, question: "What was created on day 2?", options: ["Sky", "Plants", "Fish", "Birds"], answer: 0, explanation: "Genesis 1:6-8 — God made the expanse (sky) to separate waters from waters." },
        { chapter: 1, question: "Humans were made in whose image?", options: ["Angels", "Animals", "God", "Kings"], answer: 2, explanation: "Genesis 1:26-27 — 'Let us make man in our image, after our likeness.'" },
        { chapter: 1, question: "What did God see about His creation?", options: ["It was average", "It was good", "It was unfinished", "It was dark"], answer: 1, explanation: "Genesis 1 (repeated refrain) — 'And God saw that it was good.'" }
      ],
      intermediate: [
        { chapter: 1, question: "What was the condition of the earth before the first day of creation?", options: ["Fully formed", "Floating in space", "Without form and void", "Filled with fire"], answer: 2, explanation: "Genesis 1:2 — 'The earth was without form and void, and darkness was over the face of the deep.'" },
        { chapter: 1, question: "What moved over the face of the waters before light was created?", options: ["The Spirit of God", "The angels", "A mighty wind", "The sun"], answer: 0, explanation: "Genesis 1:2 — 'And the Spirit of God was hovering over the face of the waters.'" },
        { chapter: 1, question: "Which day did God create the sun, moon, and stars?", options: ["Day 1", "Day 2", "Day 3", "Day 4"], answer: 3, explanation: "Genesis 1:14-19 — God made the two great lights and the stars on the fourth day." },
        { chapter: 1, question: "What did God tell the sea creatures and birds to do?", options: ["Build shelters", "Be fruitful and multiply", "Worship Him", "Rule over the earth"], answer: 1, explanation: "Genesis 1:22 — 'And God blessed them, saying, \"Be fruitful and multiply and fill the waters in the seas...\"'" },
        { chapter: 1, question: "What food did God initially give to humans and animals?", options: ["Meat", "Every green plant and fruit", "Manna", "Bread"], answer: 1, explanation: "Genesis 1:29-30 — 'I have given you every plant yielding seed... and every tree with seed in its fruit. You shall have them for food.'" }
      ],
      advanced: [
        { chapter: 1, question: "What Hebrew word is used for 'God' throughout Genesis Chapter 1?", options: ["Yahweh", "El Shaddai", "Elohim", "Adonai"], answer: 2, explanation: "In the original Hebrew of Genesis 1, 'Elohim' is the name used for God." },
        { chapter: 1, question: "What did God create to separate the 'waters which were under' from the 'waters which were above'?", options: ["The Firmament (Expanse)", "The Clouds", "The Mountains", "The Atmosphere"], answer: 0, explanation: "Genesis 1:6-7 — God said, 'Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.'" },
        { chapter: 1, question: "On which day did dry land appear and plants begin to grow?", options: ["Day 2", "Day 3", "Day 4", "Day 5"], answer: 1, explanation: "Genesis 1:9-13 — Both the appearance of dry land and the creation of vegetation occurred on the third day." },
        { chapter: 1, question: "What phrase does God use to refer to Himself when planning the creation of man?", options: ["'I shall make'", "'Let us make'", "'Behold the man'", "'I AM WHO I AM'"], answer: 1, explanation: "Genesis 1:26 — 'Then God said, \"Let us make man in our image, after our likeness.\"' This plural reference is of significant theological discussion." },
        { chapter: 1, question: "What was the very first command God gave to humanity?", options: ["'Thou shalt not eat'", "'Be fruitful and multiply'", "'Work the garden'", "'Have no other gods'"], answer: 1, explanation: "Genesis 1:28 — 'And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it...\"'" }
      ]
    },
    // Adding range for 1-11
    "1-11": {
      beginner: [
        { chapter: 1, question: "On which day did God create the animals and humans?", options: ["Day 4", "Day 5", "Day 6", "Day 7"], answer: 2, explanation: "Genesis 1:24-31 — God created land animals and humanity on the sixth day." },
        { chapter: 3, question: "What was the consequence of Adam and Eve eating the forbidden fruit?", options: ["They gained immortality", "They were expelled from Eden", "They became kings", "They were turned into salt"], answer: 1, explanation: "Genesis 3:23-24 — The LORD God sent them out from the garden of Eden." },
        { chapter: 4, question: "Who was the first murderer in the Bible?", options: ["Cain", "Abel", "Lamech", "Seth"], answer: 0, explanation: "Genesis 4:8 — Cain rose up against his brother Abel and killed him." },
        { chapter: 6, question: "Why did God send the great flood?", options: ["Due to a natural disaster", "Because of humanity's great wickedness", "To water the earth", "To separate the nations"], answer: 1, explanation: "Genesis 6:5-7 — The LORD saw that the wickedness of man was great in the earth." },
        { chapter: 11, question: "What was the name of the tower built in Shinar to reach the heavens?", options: ["Tower of Babel", "The Pyramid", "The Ziggurat", "The Citadel"], answer: 0, explanation: "Genesis 11:1-9 — The tower was called Babel because the Lord confused the language of the whole world." }
      ],
      advanced: [
        { chapter: 2, question: "Which river flowed out of Eden to water the garden and divided into four branches?", options: ["The Jordan", "The Nile", "The Pishon", "An unnamed river"], answer: 3, explanation: "Genesis 2:10 — 'A river flowed out of Eden to water the garden, and there it divided and became four rivers.'" },
        { chapter: 5, question: "Which man 'walked with God, and he was not, for God took him'?", options: ["Methuselah", "Enoch", "Lamech", "Noah"], answer: 1, explanation: "Genesis 5:24 — Enoch walked with God; then he was no more, because God took him." },
        { chapter: 6, question: "What specific type of wood was Noah commanded to use for the Ark?", options: ["Oak", "Cedar", "Gopher wood", "Pine"], answer: 2, explanation: "Genesis 6:14 — 'Make yourself an ark of gopher wood.'" },
        { chapter: 10, question: "Which individual is described as 'the first on earth to be a mighty man' and 'a mighty hunter before the LORD'?", options: ["Nimrod", "Cush", "Japheth", "Canaan"], answer: 0, explanation: "Genesis 10:8-9 — Nimrod was the first on earth to be a mighty man. He was a mighty hunter before the LORD." },
        { chapter: 11, question: "Who was the father of Abram (Abraham), Nahor, and Haran?", options: ["Shem", "Eber", "Terah", "Peleg"], answer: 2, explanation: "Genesis 11:26-27 — Terah was the father of Abram, Nahor, and Haran." }
      ]
    },
    // Adding 1-50 Master Quiz
    "1-50": {
      beginner: [
        { chapter: 1, question: "Who was the first man created by God?", options: ["Noah", "Abraham", "Adam", "Moses"], answer: 2, explanation: "Genesis 2:7, 3:20 — Adam was the first man." },
        { chapter: 22, question: "Who was Abraham's son whom God asked him to sacrifice?", options: ["Ishmael", "Isaac", "Jacob", "Esau"], answer: 1, explanation: "Genesis 22:2 — 'Take your son, your only son Isaac... and offer him there as a burnt offering.'" },
        { chapter: 37, question: "What special gift did Jacob give to his son Joseph?", options: ["A golden ring", "A silver cup", "A coat of many colors", "A staff"], answer: 2, explanation: "Genesis 37:3 — 'Now Israel loved Joseph more than all his children... and he made him a coat of many colors.'" },
        { chapter: 45, question: "To which country was Joseph sold as a slave by his brothers?", options: ["Babylon", "Assyria", "Egypt", "Canaan"], answer: 2, explanation: "Genesis 37:36 — Joseph was sold into Egypt." }
      ]
    },
    // Adding 12-50 Patriarchs Quiz
    "12-50": {
      beginner: [
        { chapter: 12, question: "God told Abram to leave his country and go to which land?", options: ["Egypt", "Canaan", "Ur", "Haran"], answer: 1, explanation: "Genesis 12:5 — Abram went forth to go into the land of Canaan." },
        { chapter: 25, question: "Who were the twin sons of Isaac and Rebekah?", options: ["Cain and Abel", "Jacob and Esau", "Joseph and Benjamin", "Ephraim and Manasseh"], answer: 1, explanation: "Genesis 25:24-26 — Jacob and Esau were born to Isaac and Rebekah." }
      ]
    },
    6: {
      beginner: [
        { chapter: 6, question: "What did God instruct Noah to build?", options: ["A temple", "An altar", "An ark", "A city"], answer: 2, explanation: "Genesis 6:14 — 'Make yourself an ark of gopher wood.'" },
        { chapter: 6, question: "What material was used to seal the Ark?", options: ["Wax", "Pitch", "Mud", "Glue"], answer: 1, explanation: "Genesis 6:14 — '...and cover it inside and out with pitch.'" },
        { chapter: 6, question: "How many cubits long was the Ark?", options: ["100", "200", "300", "400"], answer: 2, explanation: "Genesis 6:15 — 'the length of the ark 300 cubits...'" }
      ]
    }
  },
  exodus: {
    1: {
      beginner: [
        { chapter: 1, question: "Who were the Hebrew midwives that feared God?", options: ["Shiphrah and Puah", "Miriam and Zipporah", "Sarah and Hagar", "Leah and Rachel"], answer: 0, explanation: "Exodus 1:15-17 — The king of Egypt spoke to the Hebrew midwives, Shiphrah and Puah, but they feared God." },
        { chapter: 1, question: "How many souls of the house of Jacob came into Egypt?", options: ["50", "60", "70", "100"], answer: 2, explanation: "Exodus 1:5 — All the descendants of Jacob were seventy persons; Joseph was already in Egypt." }
      ],
      advanced: [
        { chapter: 1, question: "What were the names of the two store cities the Israelites built for Pharaoh?", options: ["Pithom and Rameses", "Memphis and Thebes", "Ur and Haran", "Succoth and Etham"], answer: 0, explanation: "Exodus 1:11 — They built for Pharaoh store cities, Pithom and Raamses." }
      ]
    },
    2: {
      beginner: [
        { chapter: 2, question: "Who found Moses in the basket among the reeds?", options: ["A Hebrew slave", "Pharaoh's daughter", "Miriam", "Zipporah"], answer: 1, explanation: "Exodus 2:5 — Now the daughter of Pharaoh came down to bathe at the river... She saw the basket among the reeds." },
        { chapter: 2, question: "Moses was from which tribe of Israel?", options: ["Judah", "Levi", "Benjamin", "Reuben"], answer: 1, explanation: "Exodus 2:1 — Now a man from the house of Levi went and took as his wife a Levite woman." }
      ],
      advanced: [
        { chapter: 2, question: "What was the name of the priest of Midian, Moses' father-in-law, in Chapter 2?", options: ["Jethro", "Reuel", "Hobab", "Putiel"], answer: 1, explanation: "Exodus 2:18 — When they came to their father Reuel, he said, 'How is it that you have come home so soon today?'" }
      ]
    },
    3: {
      beginner: [
        { chapter: 3, question: "Where did God appear to Moses in a burning bush?", options: ["Mount Moriah", "Mount Sinai (Horeb)", "Mount Nebo", "Mount Carmel"], answer: 1, explanation: "Exodus 3:1 — Moses... came to Horeb, the mountain of God. And the angel of the LORD appeared to him in a flame of fire out of the midst of a bush." },
        { chapter: 3, question: "What name did God reveal to Moses from the bush?", options: ["The Almighty", "Elohim", "I AM WHO I AM", "The God of Wonders"], answer: 2, explanation: "Exodus 3:14 — God said to Moses, 'I AM WHO I AM.'" }
      ]
    },
    "1-12": {
      beginner: [
        { chapter: 2, question: "Who found the baby Moses in the Nile river?", options: ["His mother", "Pharaoh's daughter", "Miriam", "An Egyptian soldier"], answer: 1, explanation: "Exodus 2:5 — 'Then the daughter of Pharaoh came down to bathe at the river... She saw the basket among the reeds.'" },
        { chapter: 3, question: "God spoke to Moses from what miraculous object?", options: ["A pillar of cloud", "A burning bush", "A stone tablet", "A mountain top"], answer: 1, explanation: "Exodus 3:2 — 'And the angel of the Lord appeared to him in a flame of fire out of the midst of a bush.'" },
        { chapter: 12, question: "What did the Israelites put on their doorposts to be spared from the final plague?", options: ["Olive oil", "Lamb's blood", "White linen", "Sacred water"], answer: 1, explanation: "Exodus 12:7 — 'Then they shall take some of the blood and put it on the two doorposts...'" }
      ],
      advanced: [
        { chapter: 1, question: "What were the names of the two Hebrew midwives who feared God and saved the baby boys?", options: ["Leah and Rachel", "Shiphrah and Puah", "Miriam and Zipporah", "Sarah and Hagar"], answer: 1, explanation: "Exodus 1:15 — 'Then the king of Egypt said to the Hebrew midwives, one of whom was named Shiphrah and the other Puah...'" },
        { chapter: 7, question: "What was the very first plague brought upon Egypt?", options: ["Frogs", "Gnats", "Water turned to blood", "Darkness"], answer: 2, explanation: "Exodus 7:17-21 — The first plague was the turning of the Nile into blood." }
      ]
    },
    // Ranges for ExodusHub
    "13-18": {
      beginner: [
        { chapter: 14, question: "Which body of water did God part for the Israelites?", options: ["The Jordan River", "The Nile River", "The Red Sea", "The Sea of Galilee"], answer: 2, explanation: "Exodus 14:21-22 — 'Then Moses stretched out his hand over the sea... and the people of Israel went into the midst of the sea on dry ground.'" }
      ]
    },
    "19-24": {
      beginner: [
        { chapter: 20, question: "How many commandments did God give to Moses on Mount Sinai?", options: ["7", "10", "12", "40"], answer: 1, explanation: "Exodus 20 — God gave the Ten Commandments." }
      ]
    },
    "25-40": {
      beginner: [
        { chapter: 25, question: "What was the name of the portable earthly dwelling place of God?", options: ["The Temple", "The Tabernacle", "The Citadel", "The Altar"], answer: 1, explanation: "Exodus 25-27 — God gave instructions for the Tabernacle." }
      ]
    }
  },
  nehemiah: {
    "1-13": {
      beginner: [
        { chapter: 1, question: "What was Nehemiah's occupation at the start of the book?", options: ["Priest", "Prophet", "Cupbearer", "Stone-mason"], answer: 2, explanation: "Nehemiah 1:11 — 'Now I was cupbearer to the king.'" },
        { chapter: 6, question: "How many days did it take to finish rebuilding the wall of Jerusalem?", options: ["40 days", "52 days", "7 days", "100 days"], answer: 1, explanation: "Nehemiah 6:15 — 'So the wall was finished on the twenty-fifth day of the month Elul, in fifty-two days.'" },
        { chapter: 13, question: "What did Nehemiah stop the merchants from doing on the Sabbath?", options: ["Building houses", "Buying and selling", "Singing", "Working in fields"], answer: 1, explanation: "Nehemiah 13:15-21 — Nehemiah rebuked them for trading on the Sabbath and shut the gates." }
      ],
      advanced: [
        { chapter: 3, question: "Who was the High Priest who lead the rebuilding of the Sheep Gate?", options: ["Ezra", "Eliashib", "Zerubbabel", "Jeshua"], answer: 1, explanation: "Nehemiah 3:1 — 'Then Eliashib the high priest rose up with his brothers the priests, and they built the Sheep Gate.'" },
        { chapter: 4, question: "Which two leaders mocked the Jews' wall-building, saying even a fox could break it?", options: ["Pharaoh and Herod", "Sanballat and Tobiah", "Goliath and Saul", "Ahab and Jezebel"], answer: 1, explanation: "Nehemiah 4:3 — 'Tobiah the Ammonite was beside him, and he said, \"Yes, what they are building—if a fox goes up on it he will break down their stone wall!\"'" }
      ]
    },
    1: {
      beginner: [
        { chapter: 1, question: "What was Nehemiah's position in the Persian court?", options: ["Scribe", "Priest", "Cupbearer", "Governor"], answer: 2, explanation: "Nehemiah 1:11 — 'I was cupbearer to the king.'" },
        { chapter: 1, question: "How did Nehemiah react when he heard about the ruins of Jerusalem?", options: ["He was angry", "He wept and prayed", "He ignored it", "He celebrated"], answer: 1, explanation: "Nehemiah 1:4 — 'When I heard these things, I sat down and wept. For some days I mourned and fasted and prayed before the God of heaven.'" }
      ],
      advanced: [
        { chapter: 1, question: "Who was Nehemiah's brother who brought him the report from Jerusalem?", options: ["Hanani", "Hananiah", "Eliashib", "Sanballat"], answer: 0, explanation: "Nehemiah 1:2 — 'Hanani, one of my brothers, came from Judah with some other men, and I questioned them about the Jewish remnant...'" }
      ]
    }
  },
  matthew: {
    1: {
      beginner: [
        { chapter: 1, question: "Who was the earthly father of Joseph?", options: ["Jacob", "Isaac", "David", "Solomon"], answer: 0, explanation: "Matthew 1:16 — 'and Jacob the father of Joseph the husband of Mary, of whom Jesus was born...'" },
        { chapter: 1, question: "What does the name 'Immanuel' mean?", options: ["God is great", "God with us", "God saves", "Prince of Peace"], answer: 1, explanation: "Matthew 1:23 — '...and they shall call his name Immanuel' (which means, God with us)." }
      ]
    },
    // Adding 1-28 Matthew Foundation
    "1-28": {
      beginner: [
        { chapter: 5, question: "What is the collective name for the blessings Jesus gave at the start of the Sermon on the Mount?", options: ["The Commandments", "The Beatitudes", "The Parables", "The Epistles"], answer: 1, explanation: "Matthew 5:1-12 contains the Beatitudes ('Blessed are the...')." },
        { chapter: 14, question: "Which disciple tried to walk on water towards Jesus?", options: ["John", "James", "Peter", "Andrew"], answer: 2, explanation: "Matthew 14:29 — 'And Peter got out of the boat and walked on the water and came to Jesus.'" },
        { chapter: 28, question: "What is the 'Great Commission' found at the end of Matthew?", options: ["Feed the hungry", "Go and make disciples of all nations", "Build many churches", "Stay in Jerusalem"], answer: 1, explanation: "Matthew 28:19 — 'Go therefore and make disciples of all nations...'" }
      ]
    }
  },
  romans: {
    1: {
      beginner: [
        { chapter: 1, question: "Who wrote the Book of Romans?", options: ["Peter", "John", "Paul", "James"], answer: 2, explanation: "Romans 1:1 — 'Paul, a servant of Christ Jesus, called to be an apostle...'" },
        { chapter: 1, question: "Paul says the gospel is the ______ of God for salvation.", options: ["Word", "Power", "Gift", "Love"], answer: 1, explanation: "Romans 1:16 — 'For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes...'" }
      ]
    },
    // Adding 1-16 Romans Foundation
    "1-16": {
      beginner: [
        { chapter: 3, question: "Fill in the blank: 'For all have ______ and fall short of the glory of God.'", options: ["Failed", "Sinned", "Lied", "Forgotten"], answer: 1, explanation: "Romans 3:23 — 'for all have sinned and fall short of the glory of God.'" },
        { chapter: 8, question: "Paul states that 'all things work together for ______' to those who love God.", options: ["Wealth", "Good", "Success", "Peace"], answer: 1, explanation: "Romans 8:28 — 'And we know that for those who love God all things work together for good...'" }
      ]
    }
  }
};
