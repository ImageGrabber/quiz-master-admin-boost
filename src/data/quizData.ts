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
  leviticus: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What is the primary theme of the book of Leviticus?", options: ["Wandering", "Holiness", "History", "Fasting"], answer: 1, explanation: "Leviticus 19:2 — 'You shall be holy, for I the LORD your God am holy.'" },
        { chapter: 16, question: "What is the name of the special day where the High Priest enters the Most Holy Place to make atonement for the people?", options: ["Passover", "Day of Atonement (Yom Kippur)", "Purim", "Feast of Booths"], answer: 1, explanation: "Leviticus 16 describes the Day of Atonement rituals." },
        { chapter: 11, question: "The laws in Leviticus regarding clean and unclean animals are commonly known as what?", options: ["Sabbath laws", "Dietary (Kosher) laws", "Sacrificial laws", "Levitical decorum"], answer: 1, explanation: "Leviticus 11 outlines which animals are clean and unclean for food." }
      ]
    }
  },
  numbers: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Why is the book of Numbers called by its name?", options: ["Because of God's many promises", "Because of the two census (numberings) of the people", "Because of the number of years in Egypt", "Because of the 10 commandments"], answer: 1, explanation: "Numbers records two major census takings of the Israelites." },
        { chapter: 13, question: "How many spies were sent by Moses to explore the land of Canaan?", options: ["2", "10", "12", "70"], answer: 2, explanation: "Numbers 13:1-16 — Moses sent 12 leaders, one from each tribe." },
        { chapter: 21, question: "What did Moses lift up on a pole so that whoever looked at it would live after being bitten by snakes?", options: ["A golden calf", "A bronze serpent", "A wooden cross", "A stone tablet"], answer: 1, explanation: "Numbers 21:8-9 — 'Moses made a bronze serpent and set it on a pole...'" }
      ]
    }
  },
  deuteronomy: {
    foundation: {
      beginner: [
        { chapter: 6, question: "The famous command 'Hear, O Israel: The LORD our God, the LORD is one' is known as what?", options: ["The Shema", "The Decalogue", "The Covenant", "The Benediction"], answer: 0, explanation: "Deuteronomy 6:4 is the core of the Shema." },
        { chapter: 34, question: "On which mountain did Moses die after seeing the Promised Land from a distance?", options: ["Mount Sinai", "Mount Nebo", "Mount Ararat", "Mount Carmel"], answer: 1, explanation: "Deuteronomy 34:1-5 — Moses died on Mount Nebo in the land of Moab." }
      ]
    }
  },
  joshua: {
    foundation: {
      beginner: [
        { chapter: 6, question: "What city's walls fell down after the Israelites marched around them for seven days?", options: ["Ai", "Gaza", "Jericho", "Jerusalem"], answer: 2, explanation: "Joshua 6 describes the fall of Jericho." },
        { chapter: 2, question: "Who was the woman in Jericho who hid the two spies sent by Joshua?", options: ["Deborah", "Rahab", "Ruth", "Delilah"], answer: 1, explanation: "Joshua 2 — Rahab the prostitute hid the spies." }
      ]
    }
  },
  judges: {
    foundation: {
      beginner: [
        { chapter: 16, question: "Which judge had extraordinary strength because of his hair?", options: ["Gideon", "Samson", "Ehud", "Barak"], answer: 1, explanation: "Judges 13-16 tells the story of Samson." },
        { chapter: 4, question: "Who was the only female judge mentioned in the book of Judges?", options: ["Jael", "Deborah", "Naomi", "Esther"], answer: 1, explanation: "Judges 4-5 tells the story of Deborah." }
      ]
    }
  },
  ruth: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Who was Ruth's mother-in-law whom she refused to leave?", options: ["Orpah", "Naomi", "Hannah", "Sarah"], answer: 1, explanation: "Ruth 1:16 — 'But Ruth said, \"Do not urge me to leave you...\"'" },
        { chapter: 4, question: "Who was the 'kinsman-redeemer' that married Ruth?", options: ["David", "Boaz", "Jesse", "Salmon"], answer: 1, explanation: "Ruth 4 — Boaz married Ruth." }
      ]
    }
  },
  "1-samuel": {
    foundation: {
      beginner: [
        { chapter: 17, question: "Which young shepherd defeated the giant Goliath?", options: ["Saul", "Jonathan", "David", "Eliab"], answer: 2, explanation: "1 Samuel 17 — David defeated Goliath with a sling and a stone." },
        { chapter: 3, question: "Who was the boy prophet that was called by God in the middle of the night while serving Eli?", options: ["Samuel", "Nathan", "Elisha", "Jeremiah"], answer: 0, explanation: "1 Samuel 3 — The LORD called Samuel." }
      ]
    }
  },
  "2-samuel": {
    foundation: {
      beginner: [
        { chapter: 5, question: "Which city did David capture and make the capital of Israel?", options: ["Hebron", "Jerusalem", "Bethlehem", "Samaria"], answer: 1, explanation: "2 Samuel 5 — David captured the stronghold of Zion (Jerusalem)." }
      ]
    }
  },
  "1-kings": {
    foundation: {
      beginner: [
        { chapter: 3, question: "What did Solomon ask God for when offered anything he wanted?", options: ["Wealth", "Long life", "Wisdom", "Victory in war"], answer: 2, explanation: "1 Kings 3:9 — 'Give your servant therefore an understanding mind...'" }
      ]
    }
  },
  "2-kings": {
    foundation: {
      beginner: [
        { chapter: 2, question: "How did the prophet Elijah depart from this world?", options: ["He died of old age", "He was taken up in a whirlwind", "He was killed in battle", "He disappeared in a cave"], answer: 1, explanation: "2 Kings 2:11 — 'And Elijah went up by a whirlwind into heaven.'" }
      ]
    }
  },
  "1-chronicles": {
    foundation: {
      beginner: [
        { chapter: 29, question: "Who was the king that prepared the resources for the first Temple but was not allowed to build it?", options: ["Saul", "David", "Solomon", "Hezekiah"], answer: 1, explanation: "1 Chronicles 22, 29 — David prepared resources but Solomon built it." }
      ]
    }
  },
  "2-chronicles": {
    foundation: {
      beginner: [
        { chapter: 7, question: "Complete the verse: 'If my people, who are called by my name, ______ themselves and pray...'", options: ["Exalt", "Humble", "Purify", "Prepare"], answer: 1, explanation: "2 Chronicles 7:14 — 'if my people... humble themselves and pray...'" }
      ]
    }
  },
  ezra: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Which Persian king issued the decree allowing the Jews to return and rebuild the Temple?", options: ["Cyrus", "Darius", "Artaxerxes", "Xerxes"], answer: 0, explanation: "Ezra 1:1-3 — Cyrus king of Persia made a proclamation." }
      ]
    }
  },
  esther: {
    foundation: {
      beginner: [
        { chapter: 4, question: "Mordecai told Esther she may have been chosen as Queen for what reason?", options: ["For her beauty", "For such a time as this", "To live in luxury", "To travel the world"], answer: 1, explanation: "Esther 4:14 — '...who knows whether you have not come to the kingdom for such a time as this?'" }
      ]
    }
  },
  job: {
    foundation: {
      beginner: [
        { chapter: 1, question: "How does the Bible describe Job's character at the beginning of the book?", options: ["Rich and powerful", "Blameless and upright", "Patient and kind", "A great king"], answer: 1, explanation: "Job 1:1 — '...that man was blameless and upright...'" }
      ]
    }
  },
  psalms: {
    foundation: {
      beginner: [
        { chapter: 23, question: "Complete the famous opening to Psalm 23: 'The LORD is my ______, I shall not want.'", options: ["King", "Shepherd", "Rock", "Shield"], answer: 1, explanation: "Psalm 23:1 — 'The LORD is my shepherd; I shall not want.'" }
      ]
    }
  },
  proverbs: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What is called 'the beginning of knowledge' in Proverbs?", options: ["Hard work", "The fear of the LORD", "Reading books", "Listening to elders"], answer: 1, explanation: "Proverbs 1:7 — 'The fear of the LORD is the beginning of knowledge.'" }
      ]
    }
  },
  ecclesiastes: {
    foundation: {
      beginner: [
        { chapter: 3, question: "According to Ecclesiastes 3, what is there for every matter under heaven?", options: ["A reason", "A season (and a time)", "A consequence", "A reward"], answer: 1, explanation: "Ecclesiastes 3:1 — 'For everything there is a season, and a time for every matter under heaven.'" }
      ]
    }
  },
  "song-of-solomon": {
    foundation: {
      beginner: [
        { chapter: 1, question: "What is the primary theme of the Song of Solomon?", options: ["Wisdom", "Love and marriage", "History", "Prophecy"], answer: 1, explanation: "Song of Solomon is a poetic celebration of romantic love." }
      ]
    }
  },
  isaiah: {
    foundation: {
      beginner: [
        { chapter: 6, question: "What was Isaiah's response when he heard the Lord ask, 'Whom shall I send'?", options: ["'Send my brother'", "'I am not worthy'", "'Here I am! Send me.'", "'I will go tomorrow'"], answer: 2, explanation: "Isaiah 6:8 — 'Then I said, \"Here I am! Send me.\"' " }
      ]
    }
  },
  jeremiah: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Jeremiah is often known by what nickname due to his sorrow for Israel?", options: ["The Silent Prophet", "The Weeping Prophet", "The Angry Prophet", "The Joyful Prophet"], answer: 1, explanation: "Jeremiah wept deeply over the destruction of Jerusalem." }
      ]
    }
  },
  lamentations: {
    foundation: {
      beginner: [
        { chapter: 3, question: "In the middle of his grief, the author says God's mercies are what every morning?", options: ["New", "Gone", "Hidden", "Strong"], answer: 0, explanation: "Lamentations 3:22-23 — 'his mercies... they are new every morning.'" }
      ]
    }
  },
  ezekiel: {
    foundation: {
      beginner: [
        { chapter: 37, question: "In a famous vision, Ezekiel saw a valley full of what?", options: ["Gold", "Dry bones", "Living water", "Fruit trees"], answer: 1, explanation: "Ezekiel 37 — The vision of the Valley of Dry Bones." }
      ]
    }
  },
  daniel: {
    foundation: {
      beginner: [
        { chapter: 6, question: "Where was Daniel thrown because he refused to stop praying to God?", options: ["A fiery furnace", "A dark dungeon", "A lions' den", "Into the sea"], answer: 2, explanation: "Daniel 6 describes Daniel in the lions' den." }
      ]
    }
  },
  hosea: {
    foundation: {
      beginner: [
        { chapter: 1, question: "God told Hosea to marry an unfaithful woman as a symbol of what?", options: ["Israel's unfaithfulness to God", "Economic hardship", "The end of the world", "A new covenant"], answer: 0, explanation: "Hosea 1-3 uses his marriage as a metaphor for Israel's relationship with God." }
      ]
    }
  },
  joel: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Joel uses a plague of what insects to warn about the Day of the Lord?", options: ["Flies", "Gnats", "Locusts", "Bees"], answer: 2, explanation: "Joel 1 describes a devastating locust plague." }
      ]
    }
  },
  amos: {
    foundation: {
      beginner: [
        { chapter: 5, question: "Amos famously called for justice to roll down like what?", options: ["A mountain", "Waters", "Thunder", "Fire"], answer: 1, explanation: "Amos 5:24 — 'But let justice roll down like waters...'" }
      ]
    }
  },
  obadiah: {
    foundation: {
      beginner: [
        { chapter: 1, question: "The book of Obadiah is a prophecy against which nation?", options: ["Egypt", "Edom", "Assyria", "Moab"], answer: 1, explanation: "Obadiah is a short prophecy specifically against Edom." }
      ]
    }
  },
  jonah: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What swallowed Jonah after he was thrown overboard while fleeing from God?", options: ["A giant shark", "A great fish", "A whirlpool", "A sea dragon"], answer: 1, explanation: "Jonah 1:17 — 'the LORD appointed a great fish to swallow up Jonah.'" }
      ]
    }
  },
  micah: {
    foundation: {
      beginner: [
        { chapter: 5, question: "Which small town did Micah prophesy would be the birthplace of the Messiah?", options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"], answer: 2, explanation: "Micah 5:2 — 'But you, O Bethlehem Ephrathah...'" }
      ]
    }
  },
  nahum: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Nahah's prophecy focuses on the fall of which great city?", options: ["Babylon", "Nineveh", "Tyre", "Sidon"], answer: 1, explanation: "Nahum prophesies the destruction of Nineveh." }
      ]
    }
  },
  habakkuk: {
    foundation: {
      beginner: [
        { chapter: 2, question: "Finish the verse: 'the righteous shall live by his ______.'", options: ["Works", "Faith", "Strength", "Wisdom"], answer: 1, explanation: "Habakkuk 2:4 — '...but the righteous shall live by his faith.'" }
      ]
    }
  },
  zephaniah: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What is the major theme of Zephaniah?", options: ["The Day of the LORD", "The Exodus", "The Flood", "The Temple"], answer: 0, explanation: "Zephaniah repeatedly warns about the coming Day of the LORD." }
      ]
    }
  },
  haggai: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What did Haggai encourage the returned exiles to finish building?", options: ["The city walls", "The Temple", "The market", "The palace"], answer: 1, explanation: "Haggai 1 — Aggai urged the people to rebuild the house of the LORD." }
      ]
    }
  },
  zechariah: {
    foundation: {
      beginner: [
        { chapter: 9, question: "Zechariah prophesied the King coming to Jerusalem riding on what animal?", options: ["A horse", "A donkey", "A camel", "A chariot"], answer: 1, explanation: "Zechariah 9:9 — '...humble and mounted on a donkey...'" }
      ]
    }
  },
  malachi: {
    foundation: {
      beginner: [
        { chapter: 3, question: "Malachi prophesied the coming of a messenger to prepare the way, often identified with whom?", options: ["John the Baptist", "Elijah", "Moses", "David"], answer: 0, explanation: "Malachi 3:1 is seen as a prophecy of John the Baptist preparing the way for Jesus." }
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
    foundation: {
      beginner: [
        { chapter: 5, question: "What is the collective name for the blessings Jesus gave at the start of the Sermon on the Mount?", options: ["The Commandments", "The Beatitudes", "The Parables", "The Epistles"], answer: 1, explanation: "Matthew 5:1-12 contains the Beatitudes." }
      ]
    },
    1: {
      beginner: [
        { chapter: 1, question: "Who was the earthly father of Joseph?", options: ["Jacob", "Isaac", "David", "Solomon"], answer: 0, explanation: "Matthew 1:16 — 'and Jacob the father of Joseph...'" },
        { chapter: 1, question: "What does the name 'Immanuel' mean?", options: ["God is great", "God with us", "God saves", "Prince of Peace"], answer: 1, explanation: "Matthew 1:23 — '...which means, God with us.'" }
      ]
    },
    "1-28": {
      beginner: [
        { chapter: 5, question: "What is the collective name for the blessings Jesus gave at the start of the Sermon on the Mount?", options: ["The Commandments", "The Beatitudes", "The Parables", "The Epistles"], answer: 1, explanation: "Matthew 5:1-12 contains the Beatitudes ('Blessed are the...')." },
        { chapter: 14, question: "Which disciple tried to walk on water towards Jesus?", options: ["John", "James", "Peter", "Andrew"], answer: 2, explanation: "Matthew 14:29 — 'And Peter got out of the boat and walked on the water and came to Jesus.'" },
        { chapter: 28, question: "What is the 'Great Commission' found at the end of Matthew?", options: ["Feed the hungry", "Go and make disciples of all nations", "Build many churches", "Stay in Jerusalem"], answer: 1, explanation: "Matthew 28:19 — 'Go therefore and make disciples of all nations...'" }
      ]
    }
  },
  mark: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Mark opens his gospel with the ministry of which person?", options: ["John the Baptist", "Jesus", "Peter", "The Magi"], answer: 0, explanation: "Mark 1:1-4 begins with John the Baptist in the wilderness." }
      ]
    }
  },
  luke: {
    foundation: {
      beginner: [
        { chapter: 2, question: "In which city was Jesus born, according to Luke's account?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Hebron"], answer: 2, explanation: "Luke 2:4-7 — Joseph and Mary went to the city of David, which is called Bethlehem." }
      ]
    }
  },
  john: {
    foundation: {
      beginner: [
        { chapter: 1, question: "How does John's gospel refer to Jesus in the very first verse?", options: ["The Messiah", "The Son of Man", "The Word", "The Light"], answer: 2, explanation: "John 1:1 — 'In the beginning was the Word, and the Word was with God...'" }
      ]
    }
  },
  acts: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What event occurred 40 days after Jesus' resurrection, as described in Acts 1?", options: ["The Ascension", "The Crucifixion", "The Pentecost", "The Baptism"], answer: 0, explanation: "Acts 1:9-11 — Jesus was taken up into heaven." },
        { chapter: 9, question: "Who was famously converted on the road to Damascus after seeing a bright light?", options: ["Peter", "Saul (Paul)", "Stephen", "Barnabas"], answer: 1, explanation: "Acts 9 describes Saul's vision and conversion." }
      ]
    }
  },
  romans: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Who wrote the Book of Romans?", options: ["Peter", "John", "Paul", "James"], answer: 2, explanation: "Romans 1:1 — 'Paul, a servant of Christ Jesus...'" }
      ]
    },
    1: {
      beginner: [
        { chapter: 1, question: "Who wrote the Book of Romans?", options: ["Peter", "John", "Paul", "James"], answer: 2, explanation: "Romans 1:1 — 'Paul, a servant of Christ Jesus...'" },
        { chapter: 1, question: "Paul says the gospel is the ______ of God for salvation.", options: ["Word", "Power", "Gift", "Love"], answer: 1, explanation: "Romans 1:16 — 'For I am not ashamed of the gospel... it is the power of God for salvation...'" }
      ]
    },
    "1-16": {
      beginner: [
        { chapter: 3, question: "Fill in the blank: 'For all have ______ and fall short of the glory of God.'", options: ["Failed", "Sinned", "Lied", "Forgotten"], answer: 1, explanation: "Romans 3:23 — 'for all have sinned and fall short of the glory of God.'" },
        { chapter: 8, question: "Paul states that 'all things work together for ______' to those who love God.", options: ["Wealth", "Good", "Success", "Peace"], answer: 1, explanation: "Romans 8:28 — '...work together for good...'" }
      ]
    }
  },
  "1-corinthians": {
    foundation: {
      beginner: [
        { chapter: 13, question: "What is the primary topic of the famous 'Love Chapter' in 1 Corinthians?", options: ["Faith", "Hope", "Love", "Wisdom"], answer: 2, explanation: "1 Corinthians 13 is commonly referred to as the Love Chapter." }
      ]
    }
  },
  "2-corinthians": {
    foundation: {
      beginner: [
        { chapter: 12, question: "Paul says God told him, 'My ______ is sufficient for you, for my power is made perfect in weakness.'", options: ["Strength", "Love", "Grace", "Peace"], answer: 2, explanation: "2 Corinthians 12:9 — '...My grace is sufficient for you...'" }
      ]
    }
  },
  galatians: {
    foundation: {
      beginner: [
        { chapter: 5, question: "What is the collective name for the qualities such as love, joy, and peace described in Galatians 5?", options: ["The Gifts of the Spirit", "The Fruit of the Spirit", "The Laws of God", "The Beatitudes"], answer: 1, explanation: "Galatians 5:22-23 lists the Fruit of the Spirit." }
      ]
    }
  },
  ephesians: {
    foundation: {
      beginner: [
        { chapter: 6, question: "In Ephesians 6, Paul tells believers to put on what for spiritual protection?", options: ["The Armor of God", "The Robe of Righteousness", "The Sandal of Peace", "The Crown of Life"], answer: 0, explanation: "Ephesians 6:11-17 describes the Full Armor of God." }
      ]
    }
  },
  philippians: {
    foundation: {
      beginner: [
        { chapter: 4, question: "Complete the verse: 'I can do all things through ______ who strengthens me.'", options: ["Love", "Faith", "Him (Christ)", "Prayer"], answer: 2, explanation: "Philippians 4:13 — 'I can do all things through him who strengthens me.'" }
      ]
    }
  },
  colossians: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Paul emphasizes that Jesus is the image of the ______ God.", options: ["Eternal", "Invisible", "Almighty", "Holy"], answer: 1, explanation: "Colossians 1:15 — 'He is the image of the invisible God...'" }
      ]
    }
  },
  "1-thessalonians": {
    foundation: {
      beginner: [
        { chapter: 5, question: "Complete the shortest verse in the Bible (in some versions): '______ always.'", options: ["Pray", "Rejoice", "Love", "Believe"], answer: 1, explanation: "1 Thessalonians 5:16 — 'Rejoice always.'" }
      ]
    }
  },
  "2-thessalonians": {
    foundation: {
      beginner: [
        { chapter: 3, question: "What was Paul's rule about work in 2 Thessalonians?", options: ["Work only 6 days", "If anyone is not willing to work, let him not eat", "Work for the Lord", "Do not work on the Sabbath"], answer: 1, explanation: "2 Thessalonians 3:10 — 'If anyone is not willing to work, let him not eat.'" }
      ]
    }
  },
  "1-timothy": {
    foundation: {
      beginner: [
        { chapter: 6, question: "What does Paul call 'a root of all kinds of evils'?", options: ["Money", "The love of money", "Pride", "Lies"], answer: 1, explanation: "1 Timothy 6:10 — 'For the love of money is a root of all kinds of evils.'" }
      ]
    }
  },
  "2-timothy": {
    foundation: {
      beginner: [
        { chapter: 3, question: "Paul says that all Scripture is ______ by God and profitable for teaching.", options: ["Written", "Breathed (Inspired)", "Created", "Sent"], answer: 1, explanation: "2 Timothy 3:16 — 'All Scripture is breathed out by God...'" }
      ]
    }
  },
  titus: {
    foundation: {
      beginner: [
        { chapter: 2, question: "Titus was left on which island to appoint elders in every town?", options: ["Cyprus", "Malta", "Crete", "Patmos"], answer: 2, explanation: "Titus 1:5 — 'This is why I left you in Crete...'" }
      ]
    }
  },
  philemon: {
    foundation: {
      beginner: [
        { chapter: 1, question: "Who was the runaway slave whom Paul asks Philemon to welcome back as a brother?", options: ["Onesimus", "Tychicus", "Timothy", "Epaphras"], answer: 0, explanation: "The letter of Philemon is an appeal for the runaway slave Onesimus." }
      ]
    }
  },
  hebrews: {
    foundation: {
      beginner: [
        { chapter: 11, question: "Hebrews 11 is famous for listing historical figures of what quality?", options: ["Wisdom", "Strength", "Faith", "Patience"], answer: 2, explanation: "Hebrews 11 is often called the 'Hall of Faith'." }
      ]
    }
  },
  james: {
    foundation: {
      beginner: [
        { chapter: 2, question: "James famously states that 'faith by itself, if it does not have ______, is dead.'", options: ["Hope", "Love", "Works", "Prayer"], answer: 2, explanation: "James 2:17 — 'So also faith by itself, if it does not have works, is dead.'" }
      ]
    }
  },
  "1-peter": {
    foundation: {
      beginner: [
        { chapter: 5, question: "Complete the instruction: 'casting all your ______ on Him, because He cares for you.'", options: ["Sins", "Anxieties (Cares)", "Hopes", "Needs"], answer: 1, explanation: "1 Peter 5:7 — 'casting all your anxieties on him, because he cares for you.'" }
      ]
    }
  },
  "2-peter": {
    foundation: {
      beginner: [
        { chapter: 3, question: "Peter says that with the Lord, one day is as how many years?", options: ["100", "1,000", "10,000", "Infinite"], answer: 1, explanation: "2 Peter 3:8 — '...with the Lord one day is as a thousand years...'" }
      ]
    }
  },
  "1-john": {
    foundation: {
      beginner: [
        { chapter: 4, question: "What famous three-word definition of God is found in 1 John 4?", options: ["God is Holy", "God is Love", "God is Spirit", "God is Light"], answer: 1, explanation: "1 John 4:8, 16 — 'God is love.'" }
      ]
    }
  },
  "2-john": {
    foundation: {
      beginner: [
        { chapter: 1, question: "What is the primary commandment emphasized in 2 John?", options: ["Go and baptize", "Walk in love", "Observe the Sabbath", "Fast and pray"], answer: 1, explanation: "2 John 1:5-6 — 'And now I ask you... that we love one another... this is love, that we walk according to his commandments.'" }
      ]
    }
  },
  "3-john": {
    foundation: {
      beginner: [
        { chapter: 1, question: "To whom is the third letter of John addressed?", options: ["Gaius", "Theophilus", "Timothy", "The Elect Lady"], answer: 0, explanation: "3 John 1:1 — 'The elder to the beloved Gaius...'" }
      ]
    }
  },
  jude: {
    foundation: {
      beginner: [
        { chapter: 1, question: "What does Jude urge believers to 'contend earnestly' for?", options: ["The land", "The faith", "The truth", "The law"], answer: 1, explanation: "Jude 1:3 — '...I found it necessary to write appealing to you to contend for the faith...'" }
      ]
    }
  },
  revelation: {
    foundation: {
      beginner: [
        { chapter: 1, question: "To whom was the vision of Revelation given on the island of Patmos?", options: ["Peter", "John", "Paul", "Stephen"], answer: 1, explanation: "Revelation 1:9 — 'I, John, your brother... was on the island called Patmos...'" },
        { chapter: 22, question: "What is the very last word of the Bible?", options: ["Amen", "Forever", "Life", "Victory"], answer: 0, explanation: "Revelation 22:21 — 'The grace of the Lord Jesus be with all. Amen.'" }
      ]
    }
  }
};
