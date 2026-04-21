import PublicQuiz from "../PublicQuiz";

// Amos Quiz Questions - 10 questions about social justice and God's judgment
const amosQuestions = [
  {
    question: "What was Amos's profession before becoming a prophet?",
    options: [
      "Priest",
      "Shepherd and fig farmer",
      "King",
      "Scribe"
    ],
    answer: 1
  },
  {
    question: "What was the main theme of Amos's message?",
    options: [
      "God's love for Israel",
      "Social justice and God's judgment",
      "The coming Messiah",
      "The restoration of the temple"
    ],
    answer: 1
  },
  {
    question: "What did Amos say about Israel's worship?",
    options: [
      "It was acceptable to God",
      "God hated their festivals and sacrifices",
      "It was perfect",
      "It was improving"
    ],
    answer: 1
  },
  {
    question: "What did Amos prophesy about Israel's future?",
    options: [
      "Great blessing",
      "Exile and destruction",
      "Peace and prosperity",
      "Victory over enemies"
    ],
    answer: 1
  },
  {
    question: "What did Amos say about the rich and poor?",
    options: [
      "The rich were blessed by God",
      "The poor deserved their fate",
      "God would judge the rich for oppressing the poor",
      "Wealth was a sign of God's favor"
    ],
    answer: 2
  },
  {
    question: "What did Amos see in his visions?",
    options: [
      "A plumb line",
      "A basket of ripe fruit",
      "The Lord standing by the altar",
      "All of the above"
    ],
    answer: 3
  },
  {
    question: "What did Amos say about the Day of the Lord?",
    options: [
      "It would be a day of blessing",
      "It would be darkness, not light",
      "It would never come",
      "It would be a day of peace"
    ],
    answer: 1
  },
  {
    question: "What did Amos prophesy about the restoration?",
    options: [
      "There would be no restoration",
      "The fallen booth of David would be rebuilt",
      "Israel would be destroyed forever",
      "Only the temple would be restored"
    ],
    answer: 1
  },
  {
    question: "What did Amos say about God's relationship with other nations?",
    options: [
      "God only cared about Israel",
      "God held other nations accountable too",
      "Other nations were irrelevant",
      "God favored other nations over Israel"
    ],
    answer: 1
  },
  {
    question: "What was Amos's message about true worship?",
    options: [
      "Sacrifices were enough",
      "Justice and righteousness were required",
      "Only the priests mattered",
      "Rituals were sufficient"
    ],
    answer: 1
  }
];

export default function AmosPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Amos Quiz"
      questions={amosQuestions}
      bookName="Amos"
      canonicalPath={canonicalPath}
    />
  );
}
