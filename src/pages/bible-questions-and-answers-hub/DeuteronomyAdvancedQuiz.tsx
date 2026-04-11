import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What is the primary theme of the 'Song of Moses' in Deuteronomy 32, which he was commanded to teach to the Israelites?",
    options: ["A victory song over Egypt", "A witness against Israel's future unfaithfulness", "A celebration of the harvest", "A detailed map of Canaan"],
    answer: 1,
    explanation: "Deuteronomy 31:19-21 - God commanded Moses to write the song to serve as a witness against the Israelites when they turned to other gods in the future.",
    referenceVerse: "Deuteronomy 31:19"
  },
  {
    id: 2,
    question: "In Deuteronomy 18, who is the 'Prophet like Moses' that God promised to raise up from among their fellow Israelites?",
    options: ["Joshua", "Gideon", "A reference to the coming Messiah", "Aaron's successor"],
    answer: 2,
    explanation: "Deuteronomy 18:15 - The Lord your God will raise up for you a prophet like me from among you... You must listen to him. This is widely understood as a Messianic prophecy.",
    referenceVerse: "Deuteronomy 18:15"
  },
  {
    id: 3,
    question: "What was the 'Levirate Marriage' law described in Deuteronomy 25?",
    options: ["Marriage within the tribe of Levi only", "A brother marrying his deceased brother's widow to carry on his name", "A priest marrying the daughter of another priest", "A law prohibiting marriage to foreigners"],
    answer: 1,
    explanation: "Deuteronomy 25:5-6 - If brothers are living together and one of them dies without a son... her husband's brother shall take her and marry her.",
    referenceVerse: "Deuteronomy 25:5-6"
  },
  {
    id: 4,
    question: "What were the specific rules for warfare when approaching a city, according to Deuteronomy 20?",
    options: ["Attack immediately without warning", "Offer terms of peace first", "Surround the city for seven days", "Wait for a sign from heaven"],
    answer: 1,
    explanation: "Deuteronomy 20:10 - When you march up to attack a city, make its people an offer of peace.",
    referenceVerse: "Deuteronomy 20:10"
  },
  {
    id: 5,
    question: "How is Moses' burial described in the final chapter of Deuteronomy?",
    options: ["He was buried in a magnificent tomb built by Joshua", "The Lord buried him in a valley in Moab, and no one knows where his grave is", "He was taken directly to heaven in a whirlwind", "He was buried in the cave of Machpelah"],
    answer: 1,
    explanation: "Deuteronomy 34:6 - He (the Lord) buried him in Moab, in the valley opposite Beth Peor, but to this day no one knows where his grave is.",
    referenceVerse: "Deuteronomy 34:6"
  },
  {
    id: 6,
    question: "What was the 'Law of the Central Sanctuary' in Deuteronomy 12?",
    options: ["Building an altar in every town", "Worshipping only at the place the Lord chooses to put His Name", "Worshipping only in Egypt", "Worshipping on any high mountain"],
    answer: 1,
    explanation: "Deuteronomy 12:5-6 - You are to seek the place the Lord your God will choose from among all your tribes to put his Name... To that place you must go.",
    referenceVerse: "Deuteronomy 12:5-6"
  },
  {
    id: 7,
    question: "What did Moses do with the Law he had written down just before he died?",
    options: ["He buried it in the sand", "He gave it to the priests to place beside the Ark of the Covenant", "He read it and then burned it", "He sent it to the king of Moab"],
    answer: 1,
    explanation: "Deuteronomy 31:24-26 - Moses gave this command to the Levites... 'Take this Book of the Law and place it beside the ark of the covenant.'",
    referenceVerse: "Deuteronomy 31:26"
  },
  {
    id: 8,
    question: "In the blessing of the tribes (Deut 33), which tribe is described as 'the beloved of the Lord' who 'dwells in safety'?",
    options: ["Judah", "Joseph", "Benjamin", "Asher"],
    answer: 2,
    explanation: "Deuteronomy 33:12 - About Benjamin he said: 'Let the beloved of the Lord rest secure in him, for he shields him all day long.'",
    referenceVerse: "Deuteronomy 33:12"
  },
  {
    id: 9,
    question: "What specifically did the 'Urim and Thummim' belong to in the blessing of Levi (Deut 33:8)?",
    options: ["The king of Israel", "The 'godly man'", "The tribe of Judah", "The military commanders"],
    answer: 1,
    explanation: "Deuteronomy 33:8 - About Levi he said: 'Your Thummim and Urim belong to your godly man whom you tested at Massah.'",
    referenceVerse: "Deuteronomy 33:8"
  },
  {
    id: 10,
    question: "In the Song of Moses (Deut 32), what metaphorical title is frequently used for God to describe His stability and faithfulness?",
    options: ["The River", "The Cloud", "The Rock", "The Eagle"],
    answer: 2,
    explanation: "Deuteronomy 32:4 - He is the Rock, his works are perfect, and all his ways are just.",
    referenceVerse: "Deuteronomy 32:4"
  }
];

export default function DeuteronomyAdvancedQuiz() {
  return (
    <PublicQuiz 
      title="Deuteronomy Advanced Quiz"
      questions={questions}
      bookName="Deuteronomy"
      chapter="Advanced Level"
      seoDescription="The ultimate challenge on the Fifth Book of Moses. Explore the Messianic prophecies, the Song of Moses, and the technicalities of the Levirate laws."
      canonicalPath="/bible-questions-and-answers-hub/deuteronomy/advanced"
    />
  );
}
