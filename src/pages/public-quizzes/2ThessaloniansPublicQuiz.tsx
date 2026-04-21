import PublicQuiz from "../PublicQuiz";

// 2 Thessalonians Quiz Questions - 10 questions about Paul's second letter to the Thessalonians
const thessalonians2Questions = [
  {
    question: "What is the main theme of 2 Thessalonians?",
    options: [
      "Church organization",
      "The day of the Lord and Christian discipline",
      "Financial giving",
      "Personal success"
    ],
    answer: 1
  },
  {
    question: "What does 2 Thessalonians 1:3 say Paul thanks God for about the Thessalonians?",
    options: [
      "Their faith is growing more and more, and their love for one another is increasing",
      "Their wealth",
      "Their power",
      "Their knowledge"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 2:3 say must happen before the day of the Lord?",
    options: [
      "The rebellion occurs and the man of lawlessness is revealed",
      "Nothing special",
      "Only good things",
      "Peace on earth"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 2:4 say the man of lawlessness will do?",
    options: [
      "Exalt himself over everything that is called God",
      "Serve God",
      "Help others",
      "Be humble"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 2:8 say will happen to the lawless one?",
    options: [
      "The Lord Jesus will overthrow him with the breath of his mouth",
      "He will rule forever",
      "He will be ignored",
      "He will be accepted"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 3:6 say believers should keep away from?",
    options: [
      "Every brother or sister who is idle and disruptive",
      "All unbelievers",
      "Everyone",
      "No one"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 3:10 say about those who don't work?",
    options: [
      "They should not eat",
      "They should be fed anyway",
      "They should be supported",
      "They should be helped"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 3:13 say believers should not become?",
    options: [
      "Weary in doing good",
      "Too busy",
      "Too successful",
      "Too happy"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 3:16 say the Lord of peace will give?",
    options: [
      "Peace at all times and in every way",
      "Wealth",
      "Power",
      "Fame"
    ],
    answer: 0
  },
  {
    question: "What does 2 Thessalonians 3:18 say Paul's closing wish is?",
    options: [
      "The grace of our Lord Jesus Christ be with you all",
      "Peace and prosperity",
      "Health and wealth",
      "Success and fame"
    ],
    answer: 0
  }
];

export default function Thessalonians2PublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="2 Thessalonians Quiz"
      questions={thessalonians2Questions}
      bookName="2 Thessalonians"
      canonicalPath={canonicalPath}
      seoDescription="Practice with this free 2 Thessalonians quiz and answers. Review key verses on the day of the Lord, perseverance, and Christian discipline from Paul's second letter."
    />
  );
}
