import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What does the book of 'Numbers' primarily get its name from?",
    options: ["The number of days in the wilderness", "The two censuses or 'numberings' of the people", "The number of laws given", "The number of spies sent"],
    answer: 1,
    explanation: "The name comes from the Greek 'Arithmoi' and Latin 'Numeri' because the book records two major censuses of the Israelites.",
    referenceVerse: "Numbers 1, 26"
  },
  {
    id: 2,
    question: "How many spies were sent by Moses to explore the land of Canaan?",
    options: ["2 spies", "10 spies", "12 spies", "40 spies"],
    answer: 2,
    explanation: "Numbers 13:2-16 - Moses sent one leader from each of the twelve tribes to explore the land.",
    referenceVerse: "Numbers 13:2"
  },
  {
    id: 3,
    question: "Which two spies brought back a faithful report and encouraged the people to take the land?",
    options: ["Moses and Aaron", "Joshua and Caleb", "Dathan and Abiram", "Nadab and Abihu"],
    answer: 1,
    explanation: "Numbers 14:6-9 - Joshua and Caleb, who were among those who had explored the land, tore their clothes and told the people the Lord would lead them in.",
    referenceVerse: "Numbers 14:6-9"
  },
  {
    id: 4,
    question: "Because of their unbelief, how many years did the Israelites wander in the wilderness?",
    options: ["7 years", "12 years", "40 years", "430 years"],
    answer: 2,
    explanation: "Numbers 14:34 - For forty years—one year for each of the forty days you explored the land—you will suffer for your sins.",
    referenceVerse: "Numbers 14:34"
  },
  {
    id: 5,
    question: "What bit the Israelites after they spoke against God and Moses in the desert?",
    options: ["Vinegar-tongued vipers", "Fiery serpents", "Locusts", "Giant scorpions"],
    answer: 1,
    explanation: "Numbers 21:6 - Then the Lord sent fiery serpents among the people; they bit the people, and many Israelites died.",
    referenceVerse: "Numbers 21:6"
  },
  {
    id: 6,
    question: "What did Moses make and lift on a pole so that anyone bitten by a serpent could look at it and live?",
    options: ["A golden calf", "A stone tablet", "A bronze serpent", "A wooden cross"],
    answer: 2,
    explanation: "Numbers 21:9 - So Moses made a bronze serpent and put it on a pole. Then when anyone was bitten by a snake and looked at the bronze snake, they lived.",
    referenceVerse: "Numbers 21:9"
  },
  {
    id: 7,
    question: "Who was the Moabite king who hired Balaam to curse the Israelites?",
    options: ["Balak", "Eglon", "Sihon", "Og"],
    answer: 0,
    explanation: "Numbers 22:2-6 - Balak son of Zippor... sent messengers to summon Balaam... saying 'come and put a curse on these people for me.'",
    referenceVerse: "Numbers 22:5"
  },
  {
    id: 8,
    question: "What animal spoke to the prophet Balaam after seeing an angel blocking the path?",
    options: ["His camel", "His sheep", "His donkey", "A lion"],
    answer: 2,
    explanation: "Numbers 22:28 - Then the Lord opened the donkey’s mouth, and it said to Balaam, 'What have I done to you to make you beat me these three times?'",
    referenceVerse: "Numbers 22:28"
  },
  {
    id: 9,
    question: "What happened to Aaron's staff to prove he was God's chosen leader among the tribes?",
    options: ["It turned into a snake", "It sprouted, budded, blossomed, and produced almonds", "It glowed with white light", "It became a sword"],
    answer: 1,
    explanation: "Numbers 17:8 - The next day Moses entered the tent... and Aaron’s staff... had not only sprouted but had budded, blossomed and produced almonds.",
    referenceVerse: "Numbers 17:8"
  },
  {
    id: 10,
    question: "Who did God choose to succeed Moses as the leader of Israel?",
    options: ["Caleb", "Eleazar", "Joshua", "Gershom"],
    answer: 2,
    explanation: "Numbers 27:18-23 - So the Lord said to Moses, 'Take Joshua son of Nun, a man in whom is the spirit, and lay your hand on him.'",
    referenceVerse: "Numbers 27:18"
  }
];

export default function NumbersBeginnerQuiz() {
  return (
    <PublicQuiz 
      title="Numbers Beginner Quiz"
      questions={questions}
      bookName="Numbers"
      chapter="Beginner Level"
      seoDescription="Step into the wilderness. Master the foundational stories of the census, the spies, and the bronze serpent in Numbers."
      canonicalPath="/bible-questions-and-answers-hub/numbers/beginner"
    />
  );
}
