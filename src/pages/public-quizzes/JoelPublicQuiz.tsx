import PublicQuiz from "../PublicQuiz";

// Joel Quiz Questions - 10 questions about the Day of the Lord and God's Spirit
const joelQuestions = [
  {
    question: "What was the main theme of Joel's prophecy?",
    options: [
      "The coming Day of the Lord",
      "The fall of Jerusalem",
      "The restoration of Israel",
      "The coming Messiah"
    ],
    answer: 0
  },
  {
    question: "What natural disaster did Joel use as an illustration?",
    options: [
      "Earthquake",
      "Flood",
      "Locust plague",
      "Famine"
    ],
    answer: 2
  },
  {
    question: "What did Joel prophesy about God's Spirit?",
    options: [
      "It would be withdrawn from Israel",
      "It would be poured out on all people",
      "It would only come to the priests",
      "It would be limited to prophets"
    ],
    answer: 1
  },
  {
    question: "What did Joel say about the Day of the Lord?",
    options: [
      "It would be a day of blessing",
      "It would be a day of judgment and salvation",
      "It would never come",
      "It would be a day of peace"
    ],
    answer: 1
  },
  {
    question: "What did Joel call the people to do?",
    options: [
      "To fight their enemies",
      "To repent and return to God",
      "To build a new temple",
      "To leave the land"
    ],
    answer: 1
  },
  {
    question: "What did Joel prophesy about the future restoration?",
    options: [
      "Israel would be destroyed",
      "Israel would be restored and blessed",
      "Israel would be scattered",
      "Israel would be forgotten"
    ],
    answer: 1
  },
  {
    question: "What did Joel say about the coming judgment?",
    options: [
      "It would be delayed forever",
      "It would come like a thief",
      "It would be announced in advance",
      "It would never happen"
    ],
    answer: 2
  },
  {
    question: "What did Joel prophesy about the nations?",
    options: [
      "They would be blessed",
      "They would be judged in the Valley of Jehoshaphat",
      "They would be destroyed",
      "They would be ignored"
    ],
    answer: 1
  },
  {
    question: "What did Joel say about God's character?",
    options: [
      "God was only judgmental",
      "God was gracious and compassionate",
      "God was distant",
      "God was uncaring"
    ],
    answer: 1
  },
  {
    question: "What was Joel's message about hope?",
    options: [
      "There was no hope",
      "Hope was found in repentance and God's mercy",
      "Hope was in human effort",
      "Hope was in alliances"
    ],
    answer: 1
  }
];

export default function JoelPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Joel Quiz"
      questions={joelQuestions}
      bookName="Joel"
      canonicalPath={canonicalPath}
    />
  );
}
