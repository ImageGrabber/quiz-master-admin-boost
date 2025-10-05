import PublicQuiz from "../PublicQuiz";

// Nahum Quiz Questions - 10 questions about Nineveh's judgment
const nahumQuestions = [
  {
    question: "What was Nahum's main message?",
    options: [
      "Blessing for Nineveh",
      "Judgment on Nineveh for their cruelty",
      "Peace for all nations",
      "Restoration for Israel only"
    ],
    answer: 1
  },
  {
    question: "What was Nineveh known for?",
    options: [
      "Their kindness",
      "Their cruelty and violence",
      "Their wisdom",
      "Their peace"
    ],
    answer: 1
  },
  {
    question: "What did Nahum say about God's character?",
    options: [
      "God was only loving",
      "God was slow to anger but would not leave the guilty unpunished",
      "God was powerless",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What did Nahum prophesy about Nineveh's destruction?",
    options: [
      "It would be delayed",
      "It would be complete and final",
      "It would never happen",
      "It would be partial"
    ],
    answer: 1
  },
  {
    question: "What did Nahum say about the fall of Nineveh?",
    options: [
      "It would be peaceful",
      "It would be sudden and devastating",
      "It would be delayed",
      "It would be partial"
    ],
    answer: 1
  },
  {
    question: "What did Nahum prophesy about Judah?",
    options: [
      "Judah would be destroyed",
      "Judah would be restored and blessed",
      "Judah would be forgotten",
      "Judah would serve Nineveh"
    ],
    answer: 1
  },
  {
    question: "What did Nahum say about Nineveh's wealth?",
    options: [
      "It would save them",
      "It would be plundered by their enemies",
      "It would increase",
      "It would be blessed"
    ],
    answer: 1
  },
  {
    question: "What did Nahum prophesy about the nations?",
    options: [
      "They would be blessed",
      "They would rejoice at Nineveh's fall",
      "They would be destroyed",
      "They would be ignored"
    ],
    answer: 1
  },
  {
    question: "What was Nahum's message about God's justice?",
    options: [
      "God was unfair",
      "God would judge Nineveh for their evil deeds",
      "God only cared about Israel",
      "God was powerless"
    ],
    answer: 1
  },
  {
    question: "What did Nahum say about the future?",
    options: [
      "There was no hope",
      "There was hope for Judah's restoration",
      "Only judgment awaited",
      "Nineveh would be restored"
    ],
    answer: 1
  }
];

export default function NahumPublicQuiz() {
  return (
    <PublicQuiz 
      title="Nahum Quiz"
      questions={nahumQuestions}
      bookName="Nahum"
    />
  );
}
