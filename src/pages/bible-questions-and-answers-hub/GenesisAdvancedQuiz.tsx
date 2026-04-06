import PublicQuiz from "../PublicQuiz";

const questions = [
  // Creation & Early World (Ch 1-11)
  {
    id: 1,
    question: "In Genesis 1, which day of creation is NOT explicitly described by God as 'good'?",
    options: ["First day", "Second day", "Third day", "Fourth day"],
    answer: 1,
    explanation: "In Genesis 1:6-8, God separates the waters but does not declare it 'good' until the third day when dry land appears."
  },
  {
    id: 2,
    question: "What were the names of the two wives of Lamech, the descendant of Cain?",
    options: ["Adah and Zillah", "Sarah and Hagar", "Leah and Rachel", "Bilhah and Zilpah"],
    answer: 0,
    explanation: "Genesis 4:19 - Lamech married two women, one named Adah and the other Zillah."
  },
  {
    id: 3,
    question: "Who was the father of those who live in tents and raise livestock?",
    options: ["Jabal", "Jubal", "Tubal-Cain", "Enosh"],
    answer: 0,
    explanation: "Genesis 4:20 - Adah gave birth to Jabal; he was the father of those who live in tents and raise livestock."
  },
  {
    id: 4,
    question: "Which son of Lamech was the 'forger of all instruments of bronze and iron'?",
    options: ["Jabal", "Jubal", "Tubal-Cain", "Seth"],
    answer: 2,
    explanation: "Genesis 4:22 - Zillah also had a son, Tubal-Cain, who forged all kinds of tools out of bronze and iron."
  },
  {
    id: 5,
    question: "After the birth of which son did people first 'begin to call on the name of the Lord'?",
    options: ["Cain", "Abel", "Seth", "Enosh"],
    answer: 3,
    explanation: "Genesis 4:26 - Seth also had a son, and he named him Enosh. At that time people began to call on the name of the Lord."
  },
  {
    id: 6,
    question: "How long was the ark in terms of cubits?",
    options: ["300 cubits", "450 cubits", "500 cubits", "100 cubits"],
    answer: 0,
    explanation: "Genesis 6:15 - The ark is to be three hundred cubits long, fifty cubits wide and thirty cubits high."
  },
  {
    id: 7,
    question: "How old was Noah's father, Lamech, when he died?",
    options: ["777 years", "969 years", "930 years", "800 years"],
    answer: 0,
    explanation: "Genesis 5:31 - Altogether, Lamech lived a total of 777 years, and then he died."
  },
  {
    id: 8,
    question: "Noah was a descendant of which son of Adam?",
    options: ["Cain", "Abel", "Seth", "None of the above"],
    answer: 2,
    explanation: "Noah's genealogy in Genesis 5 traces back through Lamech and Methuselah to Seth."
  },
  {
    id: 9,
    question: "What was the name of the son of Ham who was cursed by Noah?",
    options: ["Cush", "Egypt", "Put", "Canaan"],
    answer: 3,
    explanation: "Genesis 9:25 - he said, 'Cursed be Canaan! The lowest of slaves will he be to his brothers.'"
  },
  {
    id: 10,
    question: "Who was described as a 'mighty hunter before the Lord'?",
    options: ["Esau", "Nimrod", "Ishmael", "Cain"],
    answer: 1,
    explanation: "Genesis 10:9 - He was a mighty hunter before the Lord; that is why it is said, 'Like Nimrod, a mighty hunter before the Lord.'"
  },
  // Abrahamic Narrative (Ch 12-25)
  {
    id: 11,
    question: "How old was Terah when he died in Haran?",
    options: ["175 years", "205 years", "147 years", "110 years"],
    answer: 1,
    explanation: "Genesis 11:32 - Terah lived 205 years, and he died in Haran."
  },
  {
    id: 12,
    question: "Who was the first person in the Bible specifically called 'the Hebrew'?",
    options: ["Noah", "Lot", "Abram", "Isaac"],
    answer: 2,
    explanation: "Genesis 14:13 - A man who had escaped came and reported this to Abram the Hebrew."
  },
  {
    id: 13,
    question: "What was the name of the king of Sodom with whom Abram interacted?",
    options: ["Bera", "Birsha", "Shinab", "Shemeber"],
    answer: 0,
    explanation: "Genesis 14:2 - ...Bera king of Sodom, Birsha king of Gomorrah..."
  },
  {
    id: 14,
    question: "What was the name of the spring or well where the angel spoke to Hagar?",
    options: ["Beer Lahai Roi", "Beersheba", "Esek", "Sitnah"],
    answer: 0,
    explanation: "Genesis 16:14 - That is why the well was called Beer Lahai Roi; it is still there, between Kadesh and Bered."
  },
  {
    id: 15,
    question: "How many shekels of silver did Abraham pay Ephron for the field and cave of Machpelah?",
    options: ["100 shekels", "200 shekels", "400 shekels", "600 shekels"],
    answer: 2,
    explanation: "Genesis 23:15-16 - 'Listen to me, my lord; the land is worth four hundred shekels of silver... Abraham agreed to Ephron’s terms and weighed out for him the price he had named...'"
  },
  {
    id: 16,
    question: "Abraham's second wife after Sarah's death was named what?",
    options: ["Hagar", "Asenath", "Keturah", "Zipporah"],
    answer: 2,
    explanation: "Genesis 25:1 - Abraham had taken another wife, whose name was Keturah."
  },
  {
    id: 17,
    question: "Which of the following was NOT a son of Keturah?",
    options: ["Zimran", "Jokshan", "Midian", "Ishmael"],
    answer: 3,
    explanation: "Genesis 25:2 - She bore him Zimran, Jokshan, Medan, Midian, Ishbak and Shuah. Ishmael was Hagar's son."
  },
  {
    id: 18,
    question: "At what age did Abraham die?",
    options: ["120", "147", "175", "180"],
    answer: 2,
    explanation: "Genesis 25:7 - Abraham lived a hundred and seventy-five years."
  },
  {
    id: 19,
    question: "What did Abraham call the location where he was prepared to sacrifice Isaac?",
    options: ["Jehovah Jireh", "Jehovah Nissi", "Jehovah Shalom", "Jehovah Raah"],
    answer: 0,
    explanation: "Genesis 22:14 - So Abraham called that place The Lord Will Provide (Jehovah Jireh)."
  },
  {
    id: 20,
    question: "Abimelech was king of what people when Isaac visited them?",
    options: ["Philistines", "Canaanites", "Amalekites", "Edomites"],
    answer: 0,
    explanation: "Genesis 26:1 - Now there was a famine in the land... and Isaac went to Abimelech king of the Philistines in Gerar."
  },
  // Jacob & the Tribes (Ch 26-36)
  {
    id: 21,
    question: "What was the name of the nurse of Rebekah who died and was buried near Bethel?",
    options: ["Deborah", "Delilah", "Dinah", "Bilhah"],
    answer: 0,
    explanation: "Genesis 35:8 - Now Deborah, Rebekah's nurse, died and was buried under the oak outside Bethel."
  },
  {
    id: 22,
    question: "What was the name of the treaty monument Jacob and Laban set up?",
    options: ["Mizpah (Galeed)", "Bethel", "Peniel", "El-Elohe-Israel"],
    answer: 0,
    explanation: "Genesis 31:47-49 - Laban called it Jegar Sahadutha, and Jacob called it Galeed... It was also called Mizpah."
  },
  {
    id: 23,
    question: "Which of the twelve tribes of Israel was the youngest?",
    options: ["Joseph", "Benjamin", "Asher", "Gad"],
    answer: 1,
    explanation: "Benjamin was the 12th son of Jacob, born to Rachel near Bethlehem."
  },
  {
    id: 24,
    question: "What was the name of the son born to Judah and his daughter-in-law Tamar?",
    options: ["Perez", "Pharez", "Zerah", "Both A and C"],
    answer: 3,
    explanation: "Genesis 38:29-30 - Tamar gave birth to twins: Perez and Zerah."
  },
  {
    id: 25,
    question: "Jacob had 12 sons. Which mother bore the most tribes (sons)?",
    options: ["Leah", "Rachel", "Bilhah", "Zilpah"],
    answer: 0,
    explanation: "Leah bore 6 sons (Reuben, Simeon, Levi, Judah, Issachar, Zebulun), whereas Rachel bore 2, and the handmaids each bore 2."
  },
  {
    id: 26,
    question: "What was the name of the place where Jacob first settled after returning from Padan Aram?",
    options: ["Shechem", "Hebron", "Beersheba", "Peniel"],
    answer: 0,
    explanation: "Genesis 33:18 - After Jacob came from Paddan Aram, he arrived safely at the city of Shechem in Canaan and camped within sight of the city."
  },
  {
    id: 27,
    question: "What was the meaning of the name Ben-oni, which Rachel first named her son?",
    options: ["Son of my right hand", "Son of my sorrow", "Son of my strength", "Son of my journey"],
    answer: 1,
    explanation: "Genesis 35:18 - As she breathed her last... she named her son Ben-Oni (Son of my sorrow). But his father named him Benjamin (Son of my right hand)."
  },
  {
    id: 28,
    question: "Who was the father of the Moabites and Ammonites?",
    options: ["Esau", "Ishmael", "Lot", "Haran"],
    answer: 2,
    explanation: "Genesis 19:37-38 - Lot's elder daughter had a son named Moab, and the younger had a son named Ben-Ammi (ancestor of the Ammonites)."
  },
  // Joseph Narrative & Egypt (Ch 37-50)
  {
    id: 29,
    question: "What was the name of Joseph's master in Egypt, whose wife falsely accused him?",
    options: ["Potiphar", "Potiphera", "Zaphenath-Paneah", "Abimelech"],
    answer: 0,
    explanation: "Genesis 39:1 - Now Joseph had been taken down to Egypt. Potiphar, an Egyptian who was one of Pharaoh’s officials, the captain of the guard, bought him."
  },
  {
    id: 30,
    question: "Which of Joseph's fellow prisoners was restored to their position as he had predicted?",
    options: ["The Baker", "The Cupbearer", "The Guard", "The Scribe"],
    answer: 1,
    explanation: "Genesis 40:21 - He restored the chief cupbearer to his position, so that he once again put the cup into Pharaoh’s hand."
  },
  {
    id: 31,
    question: "How much did Joseph's brothers receive for selling him to the Ishmaelites?",
    options: ["10 pieces of silver", "20 pieces of silver", "30 pieces of silver", "50 pieces of silver"],
    answer: 1,
    explanation: "Genesis 37:28 - ...and sold him for twenty shekels of silver to the Ishmaelites, who took him to Egypt."
  },
  {
    id: 32,
    question: "Which brother offered to stay behind in Egypt as a slave in place of Benjamin?",
    options: ["Reuben", "Simeon", "Judah", "Levi"],
    answer: 2,
    explanation: "Genesis 44:33 - 'Now then, please let your servant stay here as my lord’s slave in place of the boy...'"
  },
  {
    id: 33,
    question: "Before he died, Jacob predicted that the 'scepter' would not depart from which son?",
    options: ["Joseph", "Reuben", "Levi", "Judah"],
    answer: 3,
    explanation: "Genesis 49:10 - The scepter will not depart from Judah, nor the ruler’s staff from between his feet, until he to whom it belongs shall come."
  },
  {
    id: 34,
    question: "How long was the famine that Joseph predicted for Egypt?",
    options: ["3 years", "7 years", "10 years", "12 years"],
    answer: 1,
    explanation: "Genesis 41:27 - The seven lean, ugly cows... are seven years of famine."
  },
  {
    id: 35,
    question: "What was the total number of people in Jacob's household who went to Egypt?",
    options: ["66", "70", "75", "100"],
    answer: 1,
    explanation: "Genesis 46:27 - With the two sons who had been born to Joseph in Egypt, the members of Jacob’s family, which went to Egypt, were seventy in all."
  },
  {
    id: 36,
    question: "At what age did Jacob die in Egypt?",
    options: ["110", "130", "147", "175"],
    answer: 2,
    explanation: "Genesis 47:28 - Jacob lived in Egypt seventeen years, and the years of his life were a hundred and forty-seven."
  },
  {
    id: 37,
    question: "Whose remains were carried out of Egypt by the Israelites hundreds of years later, as he had requested?",
    options: ["Jacob", "Joseph", "Abraham", "Isaac"],
    answer: 1,
    explanation: "Genesis 50:25 - And Joseph made the Israelites swear an oath and said, 'God will surely come to your aid, and then you must carry my bones up from this place.'"
  },
  {
    id: 38,
    question: "How old was Joseph when he died?",
    options: ["110", "120", "130", "147"],
    answer: 0,
    explanation: "Genesis 50:26 - So Joseph died at the age of a hundred and ten."
  },
  {
    id: 39,
    question: "Which son of Jacob is described as a 'rawboned donkey' in Jacob's blessing?",
    options: ["Asher", "Naphtali", "Issachar", "Dan"],
    answer: 2,
    explanation: "Genesis 49:14 - Issachar is a rawboned donkey lying down among the sheep pens."
  },
  {
    id: 40,
    question: "Joseph's sons were blessed by Jacob. Which son received the greater blessing?",
    options: ["Manasseh (firstborn)", "Ephraim (younger)", "Both received equal blessing", "Neither received a full blessing"],
    answer: 1,
    explanation: "Genesis 48:19 - ...'his younger brother will be greater than he, and his descendants will become a group of nations.'"
  }
];

export default function GenesisAdvancedQuiz() {
  return (
    <PublicQuiz 
      title="Genesis Advanced Quiz"
      questions={questions}
      bookName="Genesis"
      chapter="Advanced Level"
      seoDescription="Challenge your ultimate knowledge of the Book of Genesis with our advanced quiz. Only for true Bible scholars."
      canonicalPath="/bible-questions-and-answers-hub/genesis/advanced"
    />
  );
}
