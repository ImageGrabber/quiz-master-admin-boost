import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "In the 'Shema', where were the Israelites told to write the commandments of God to ensure they never forgot them?",
    options: ["In a book locked in the Ark", "On their doorframes and gates", "Only on stone tablets", "In the sand of the desert"],
    answer: 1,
    explanation: "Deuteronomy 6:9 - Write them on the doorframes of your houses and on your gates.",
    referenceVerse: "Deuteronomy 6:9"
  },
  {
    id: 2,
    question: "What specific warning did Moses give the people in Deuteronomy 8 regarding their attitude once they became wealthy in the new land?",
    options: ["Not to sleep too much", "Not to forget the Lord and think their own power produced their wealth", "To build larger silos", "To stop eating manna"],
    answer: 1,
    explanation: "Deuteronomy 8:17-18 - You may say to yourself, 'My power and the strength of my hands have produced this wealth for me.' But remember the Lord your God.",
    referenceVerse: "Deuteronomy 8:17-18"
  },
  {
    id: 3,
    question: "What is the core message of the 'Choose Life' passage in Deuteronomy 30?",
    options: ["Choose the best land for farming", "Choose to obey God's commands so you and your children may live", "Choose a strong king to lead you", "Choose to return to Egypt"],
    answer: 1,
    explanation: "Deuteronomy 30:19 - I have set before you life and death, blessings and curses. Now choose life, so that you and your children may live.",
    referenceVerse: "Deuteronomy 30:19"
  },
  {
    id: 4,
    question: "Which two mountains were designated for the proclamation of the blessings and the curses?",
    options: ["Mount Sinai and Mount Horeb", "Mount Gerizim and Mount Ebal", "Mount Hermon and Mount Tabor", "Mount Ararat and Mount Carmel"],
    answer: 1,
    explanation: "Deuteronomy 11:29 - You are to proclaim on Mount Gerizim the blessings, and on Mount Ebal the curses.",
    referenceVerse: "Deuteronomy 11:29"
  },
  {
    id: 5,
    question: "What were the primary requirements for a future King of Israel, according to Deuteronomy 17?",
    options: ["Must be the strongest warrior", "Must be an Israelite and must not collect many horses, wives, or gold", "Must be from the tribe of Levi", "Must have been born in Egypt"],
    answer: 1,
    explanation: "Deuteronomy 17:15-17 - The king must be an Israelite and must not take many wives, or accumulate large amounts of silver and gold, or acquire great numbers of horses.",
    referenceVerse: "Deuteronomy 17:15-17"
  },
  {
    id: 6,
    question: "How does Deuteronomy say the community should identify a 'False Prophet'?",
    options: ["By the clothes they wear", "By whether their prophecy comes true and if they lead people to other gods", "By their age and wisdom", "By the number of followers they have"],
    answer: 1,
    explanation: "Deuteronomy 18:21-22 - If what a prophet proclaims... does not take place or come true, that is a message the Lord has not spoken.",
    referenceVerse: "Deuteronomy 18:22"
  },
  {
    id: 7,
    question: "What was the 'Law of Release' described in Deuteronomy 15?",
    options: ["Releasing all prisoners of war", "Canceling all debts every seven years", "Letting the animals out of the camp", "Returning to Egypt for a visit"],
    answer: 1,
    explanation: "Deuteronomy 15:1-2 - At the end of every seven years you must cancel debts. This is how it is to be done: Every creditor shall cancel any loan...",
    referenceVerse: "Deuteronomy 15:1-2"
  },
  {
    id: 8,
    question: "How many years did it take for the Israelites to travel from Kadesh Barnea until they crossed the Zered Valley?",
    options: ["2 years", "12 years", "38 years", "40 years"],
    answer: 2,
    explanation: "Deuteronomy 2:14 - Thirty-eight years passed from the time we left Kadesh Barnea until we crossed the Zered Valley.",
    referenceVerse: "Deuteronomy 2:14"
  },
  {
    id: 9,
    question: "What was the purpose of the 'Cities of Refuge' mentioned in Deuteronomy 19?",
    options: ["Places for the priests to live", "Places for someone who killed another unintentionally to flee for safety", "Storage for the harvest", "Fortresses against the Canaanites"],
    answer: 1,
    explanation: "Deuteronomy 19:2-6 - Set aside three cities... so that anyone who kills a person could flee there... provided he did not kill them with malice aforethought.",
    referenceVerse: "Deuteronomy 19:2-4"
  },
  {
    id: 10,
    question: "In the Tenth Commandment as repeated in Deuteronomy 5, what is added to 'You shall not covet' that wasn't in Exodus 20?",
    options: ["Your neighbor's field", "Your neighbor's ox", "Your neighbor's gold", "Your neighbor's donkey"],
    answer: 0,
    explanation: "Deuteronomy 5:21 adds 'his field' to the list of items not to be coveted, reflecting the transition to a landed, agricultural life.",
    referenceVerse: "Deuteronomy 5:21"
  }
];

export default function DeuteronomyIntermediateQuiz() {
  return (
    <PublicQuiz 
      title="Deuteronomy Intermediate Quiz"
      questions={questions}
      bookName="Deuteronomy"
      chapter="Intermediate Level"
      seoDescription="Dive deeper into the final words of Moses. Explore the laws of social justice, the requirements for kings, and the magnificent 'Choose Life' charge."
      canonicalPath="/bible-questions-and-answers-hub/deuteronomy/intermediate"
    />
  );
}
