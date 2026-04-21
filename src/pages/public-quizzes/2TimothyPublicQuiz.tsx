import PublicQuiz from "../PublicQuiz";

// 2 Timothy Quiz Questions - 10 questions about Paul's second letter to Timothy
const timothy2Questions = [
  {
    question: "What is the main theme of 2 Timothy?",
    options: [
      "Paul's final words and encouragement to Timothy",
      "Church organization",
      "Financial giving",
      "End times only"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 1:7 say God has not given us?",
    options: [
      "A spirit of fear, but of power, love and self-discipline",
      "Any gifts",
      "Any abilities",
      "Any hope"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 2:15 say Timothy should do?",
    options: [
      "Do your best to present yourself to God as one approved",
      "Do nothing",
      "Do only what's easy",
      "Do only what he wants"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 3:16 say all Scripture is?",
    options: [
      "God-breathed and useful for teaching, rebuking, correcting and training in righteousness",
      "Just stories",
      "Outdated",
      "Unimportant"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:2 say Timothy should do?",
    options: [
      "Preach the word; be prepared in season and out of season",
      "Stay quiet",
      "Only preach when convenient",
      "Only preach to friends"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:3 say people will do?",
    options: [
      "Gather around them teachers to say what their itching ears want to hear",
      "Listen to truth",
      "Seek God",
      "Follow Christ"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:7 say Paul has done?",
    options: [
      "Fought the good fight, finished the race, kept the faith",
      "Nothing",
      "Failed",
      "Given up"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:8 say awaits Paul?",
    options: [
      "The crown of righteousness",
      "Nothing",
      "Punishment",
      "Failure"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:16 say happened when Paul was first put on trial?",
    options: [
      "Everyone deserted him",
      "Everyone supported him",
      "Everyone helped him",
      "Everyone praised him"
    ],
    answer: 0
  },
  {
    question: "What does 2 Timothy 4:17 say stood at Paul's side?",
    options: [
      "The Lord stood at his side and gave him strength",
      "No one",
      "His friends",
      "His enemies"
    ],
    answer: 0
  }
];

export default function Timothy2PublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="2 Timothy Quiz"
      questions={timothy2Questions}
      bookName="2 Timothy"
      canonicalPath={canonicalPath}
    />
  );
}
