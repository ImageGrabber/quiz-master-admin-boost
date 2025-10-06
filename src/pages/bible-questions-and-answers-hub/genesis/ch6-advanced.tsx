import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 6, question: "Ark length in cubits?", options: ["200", "300", "350", "400"], answer: 1 },
  { chapter: 6, question: "Width in cubits?", options: ["30", "40", "50", "60"], answer: 2 },
  { chapter: 6, question: "Height in cubits?", options: ["20", "30", "40", "50"], answer: 1 },
  { chapter: 6, question: "What feature was to be finished to a cubit above?", options: ["Door", "Window/roof opening", "Rudder", "Keel"], answer: 1 },
  { chapter: 6, question: "How many levels did the ark have?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
  { chapter: 6, question: "Term used for sealing the ark?", options: ["Kaphar (pitch)", "Baraq", "Nahar", "Basar"], answer: 0 },
  { chapter: 6, question: "Noah's righteousness is contrasted with", options: ["Nephilim", "Earth's corruption", "Sons of God", "Kings of Shinar"], answer: 1 },
  { chapter: 6, question: "What would destroy all flesh?", options: ["Fire", "Flood of waters", "Plague", "Sword"], answer: 1 },
  { chapter: 6, question: "How were animals to be brought?", options: ["By lots", "Two of every kind", "Only male", "Only female"], answer: 1 },
  { chapter: 6, question: "Who gave the specific ark instructions?", options: ["Angels", "God", "Methuselah", "Shem"], answer: 1 },
  { chapter: 6, question: "Noah did according to", options: ["His wisdom", "All that God commanded him", "Family advice", "City votes"], answer: 1 },
  { chapter: 6, question: "Hebrew for covenant", options: ["Berith", "Shalom", "Torah", "Shema"], answer: 0 },
  { chapter: 6, question: "Sons of Noah named in this section", options: ["Cain, Abel, Seth", "Shem, Ham, Japheth", "Gershom, Eliezer, Elkanah", "Reuben, Simeon, Levi"], answer: 1 },
  { chapter: 6, question: "Primary reason given for flood", options: ["Idolatry", "Corruption and violence", "Poverty", "War"], answer: 1 },
  { chapter: 6, question: "Material of ark floors", options: ["Stone", "Wooden decks", "Clay", "Bronze"], answer: 1 }
];

export default function GenesisCh6Advanced() {
  return <BibleBookQuiz title="Genesis 6 - Advanced" questions={questions} bookName="Genesis" />;
}


