import PublicQuiz from "../PublicQuiz";

// Judges Quiz Questions - 10 questions about the period of judges and deliverers
const judgesQuestions = [
  {
    question: "What was the main theme of the book of Judges?",
    options: [
      "Israel's conquest of Canaan",
      "A cycle of sin, oppression, repentance, and deliverance",
      "The establishment of the monarchy",
      "The building of the temple"
    ],
    answer: 1
  },
  {
    question: "Who was the first judge mentioned in the book?",
    options: [
      "Gideon",
      "Samson",
      "Othniel",
      "Deborah"
    ],
    answer: 2
  },
  {
    question: "What did Deborah do for Israel?",
    options: [
      "She was a prophetess and judge",
      "She led the army into battle",
      "She wrote songs of victory",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How many judges are mentioned in the book of Judges?",
    options: [
      "10",
      "12",
      "15",
      "20"
    ],
    answer: 1
  },
  {
    question: "What was Gideon's famous test with the fleece?",
    options: [
      "To see if God would make it wet while the ground was dry",
      "To see if God would make it dry while the ground was wet",
      "Both A and B",
      "To see if God would send fire from heaven"
    ],
    answer: 2
  },
  {
    question: "What was Samson's source of strength?",
    options: [
      "His hair",
      "His faith in God",
      "His physical training",
      "His weapons"
    ],
    answer: 0
  },
  {
    question: "What happened to Samson at the end of his life?",
    options: [
      "He was killed by the Philistines",
      "He brought down the temple of Dagon",
      "He died with the Philistines",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the famous phrase repeated in Judges?",
    options: [
      "In those days Israel had no king",
      "Everyone did what was right in their own eyes",
      "The Lord raised up a deliverer",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "Who was the left-handed judge who killed the king of Moab?",
    options: [
      "Ehud",
      "Shamgar",
      "Tola",
      "Jair"
    ],
    answer: 0
  },
  {
    question: "What was the result of Israel's disobedience during the period of the judges?",
    options: [
      "They were conquered by foreign nations",
      "They lost their land",
      "They were scattered among the nations",
      "They were oppressed by their enemies"
    ],
    answer: 3
  }
];

export default function JudgesPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Judges Quiz"
      questions={judgesQuestions}
      bookName="Judges"
      canonicalPath={canonicalPath}
    />
  );
}
