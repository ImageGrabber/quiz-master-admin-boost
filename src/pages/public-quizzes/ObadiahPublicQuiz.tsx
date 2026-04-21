import PublicQuiz from "../PublicQuiz";

// Obadiah Quiz Questions - 10 questions about Edom's judgment
const obadiahQuestions = [
  {
    question: "What was Obadiah's main message?",
    options: [
      "Blessing for Edom",
      "Judgment on Edom for their pride and violence",
      "Peace for all nations",
      "Restoration for Israel only"
    ],
    answer: 1
  },
  {
    question: "What was Edom's relationship to Israel?",
    options: [
      "They were allies",
      "They were brothers (descendants of Esau)",
      "They were enemies from the beginning",
      "They were the same people"
    ],
    answer: 1
  },
  {
    question: "What did Obadiah say about Edom's pride?",
    options: [
      "It was justified",
      "It would be their downfall",
      "It was admirable",
      "It was harmless"
    ],
    answer: 1
  },
  {
    question: "What did Edom do to Israel that angered God?",
    options: [
      "They helped Israel",
      "They stood aloof and rejoiced at Israel's destruction",
      "They were neutral",
      "They were forced to attack"
    ],
    answer: 1
  },
  {
    question: "What did Obadiah prophesy about Edom's future?",
    options: [
      "Edom would be blessed",
      "Edom would be completely destroyed",
      "Edom would be restored",
      "Edom would rule over Israel"
    ],
    answer: 1
  },
  {
    question: "What did Obadiah say about the Day of the Lord?",
    options: [
      "It would be a day of blessing for all",
      "It would be a day of judgment for all nations",
      "It would never come",
      "It would only affect Israel"
    ],
    answer: 1
  },
  {
    question: "What did Obadiah prophesy about Israel's restoration?",
    options: [
      "Israel would be destroyed forever",
      "Israel would be restored and rule over Edom",
      "Israel would be forgotten",
      "Israel would serve Edom"
    ],
    answer: 1
  },
  {
    question: "What was Obadiah's message about God's justice?",
    options: [
      "God was unfair",
      "God would judge all nations according to their deeds",
      "God only cared about Israel",
      "God was powerless"
    ],
    answer: 1
  },
  {
    question: "What did Obadiah say about Edom's wisdom?",
    options: [
      "It would save them",
      "It would be destroyed along with them",
      "It was insufficient",
      "It was their strength"
    ],
    answer: 1
  },
  {
    question: "What was Obadiah's final message?",
    options: [
      "Complete destruction for all",
      "The kingdom would be the Lord's",
      "No hope for anyone",
      "Edom would be restored"
    ],
    answer: 1
  }
];

export default function ObadiahPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Obadiah Quiz"
      questions={obadiahQuestions}
      bookName="Obadiah"
      canonicalPath={canonicalPath}
    />
  );
}
