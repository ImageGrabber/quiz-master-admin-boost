export interface QuizQuestion {
  chapter: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type QuizData = Record<string, Record<number, Record<string, QuizQuestion[]>>>;

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
    }
  },
  nehemiah: {
    1: {
      beginner: [
        { chapter: 1, question: "What was Nehemiah's position in the Persian court?", options: ["Scribe", "Priest", "Cupbearer", "Governor"], answer: 2, explanation: "Nehemiah 1:11 — 'I was cupbearer to the king.'" },
        { chapter: 1, question: "How did Nehemiah react when he heard about the ruins of Jerusalem?", options: ["He was angry", "He wept and prayed", "He ignored it", "He celebrated"], answer: 1, explanation: "Nehemiah 1:4 — 'When I heard these things, I sat down and wept. For some days I mourned and fasted and prayed before the God of heaven.'" }
      ],
      advanced: [
        { chapter: 1, question: "Who was Nehemiah's brother who brought him the report from Jerusalem?", options: ["Hanani", "Hananiah", "Eliashib", "Sanballat"], answer: 0, explanation: "Nehemiah 1:2 — 'Hanani, one of my brothers, came from Judah with some other men, and I questioned them about the Jewish remnant...'" }
      ]
    }
  }
};
