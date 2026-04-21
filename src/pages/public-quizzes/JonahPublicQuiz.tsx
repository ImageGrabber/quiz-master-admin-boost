import PublicQuiz from "../PublicQuiz";

// Jonah Quiz Questions - 10 questions about God's mercy and Jonah's mission
const jonahQuestions = [
  {
    question: "What was God's command to Jonah?",
    options: [
      "To go to Nineveh and preach against it",
      "To go to Jerusalem and preach",
      "To go to Babylon and preach",
      "To stay in Israel"
    ],
    answer: 0
  },
  {
    question: "What did Jonah do when God called him?",
    options: [
      "He obeyed immediately",
      "He ran away to Tarshish",
      "He asked for clarification",
      "He went to Nineveh"
    ],
    answer: 1
  },
  {
    question: "What happened to Jonah on the ship?",
    options: [
      "He was thrown overboard",
      "He was swallowed by a great fish",
      "He was rescued by sailors",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "How long was Jonah in the fish?",
    options: [
      "One day",
      "Three days and three nights",
      "Seven days",
      "Forty days"
    ],
    answer: 1
  },
  {
    question: "What did Jonah do when he was in the fish?",
    options: [
      "He prayed to God",
      "He repented of his disobedience",
      "He praised God for deliverance",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What happened when Jonah preached to Nineveh?",
    options: [
      "They ignored him",
      "They repented and turned to God",
      "They attacked him",
      "They laughed at him"
    ],
    answer: 1
  },
  {
    question: "How did God respond to Nineveh's repentance?",
    options: [
      "He destroyed them anyway",
      "He relented and did not destroy them",
      "He delayed the judgment",
      "He was angry with Jonah"
    ],
    answer: 1
  },
  {
    question: "What was Jonah's reaction to Nineveh's repentance?",
    options: [
      "He was happy",
      "He was angry and wanted to die",
      "He was surprised",
      "He was proud"
    ],
    answer: 1
  },
  {
    question: "What did God teach Jonah with the plant?",
    options: [
      "About God's care for all creation",
      "About God's mercy for Nineveh",
      "About God's love for all people",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What was the main message of the book of Jonah?",
    options: [
      "God's judgment is certain",
      "God's mercy extends to all people",
      "Prophets must obey God",
      "All of the above"
    ],
    answer: 3
  }
];

export default function JonahPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Jonah Quiz"
      questions={jonahQuestions}
      bookName="Jonah"
      canonicalPath={canonicalPath}
    />
  );
}
