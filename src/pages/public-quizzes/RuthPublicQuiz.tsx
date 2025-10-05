import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was the name of Ruth's mother-in-law?",
    options: ["Naomi", "Orpah", "Ruth", "Deborah"],
    answer: 0,
    explanation: "Ruth 1:2 - The man's name was Elimelek, his wife's name was Naomi, and the names of his two sons were Mahlon and Kilion."
  },
  {
    id: 2,
    question: "What was the name of Ruth's husband who died?",
    options: ["Elimelek", "Mahlon", "Boaz", "Obed"],
    answer: 1,
    explanation: "Ruth 1:5 - Both Mahlon and Kilion also died, and Naomi was left without her two sons and her husband."
  },
  {
    id: 3,
    question: "What did Ruth say to Naomi when Naomi told her to go back to her people?",
    options: ["I will go with you", "Where you go I will go", "Your people will be my people and your God my God", "All of the above"],
    answer: 3,
    explanation: "Ruth 1:16 - But Ruth replied, 'Don't urge me to leave you or to turn back from you. Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.'"
  },
  {
    id: 4,
    question: "What was the name of the man who became Ruth's husband?",
    options: ["Elimelek", "Mahlon", "Boaz", "Obed"],
    answer: 2,
    explanation: "Ruth 4:13 - So Boaz took Ruth and she became his wife. When he made love to her, the Lord enabled her to conceive, and she gave birth to a son."
  },
  {
    id: 5,
    question: "What was the name of Ruth and Boaz's son?",
    options: ["Jesse", "David", "Obed", "Solomon"],
    answer: 2,
    explanation: "Ruth 4:17 - The women living there said, 'Naomi has a son!' And they named him Obed. He was the father of Jesse, the father of David."
  },
  {
    id: 6,
    question: "What did Ruth do to provide food for herself and Naomi?",
    options: ["She worked in the fields", "She gleaned in the fields", "She begged for food", "She sold her possessions"],
    answer: 1,
    explanation: "Ruth 2:2 - And Ruth the Moabite said to Naomi, 'Let me go to the fields and pick up the leftover grain behind anyone in whose eyes I find favor.'"
  },
  {
    id: 7,
    question: "What did Boaz tell his workers to do for Ruth?",
    options: ["Leave extra grain for her", "Don't embarrass her", "Let her drink from the water jars", "All of the above"],
    answer: 3,
    explanation: "Ruth 2:15-16 - As she got up to glean, Boaz gave orders to his men, 'Let her gather among the sheaves and don't reprimand her. Even pull out some stalks for her from the bundles and leave them for her to pick up, and don't rebuke her.'"
  },
  {
    id: 8,
    question: "What did Naomi tell Ruth to do to show her interest in Boaz?",
    options: ["Go to the threshing floor", "Uncover his feet and lie down", "Wait for him to tell you what to do", "All of the above"],
    answer: 3,
    explanation: "Ruth 3:3-4 - Wash, put on perfume, and get dressed in your best clothes. Then go down to the threshing floor, but don't let him know you are there until he has finished eating and drinking. When he lies down, note the place where he is lying. Then go and uncover his feet and lie down."
  },
  {
    id: 9,
    question: "What did Boaz say when he found Ruth at his feet?",
    options: ["Who are you?", "The Lord bless you", "You are a woman of noble character", "All of the above"],
    answer: 3,
    explanation: "Ruth 3:9-11 - 'Who are you?' he asked. 'I am your servant Ruth,' she said. 'Spread the corner of your garment over me, since you are a guardian-redeemer of our family.' 'The Lord bless you, my daughter,' he replied. 'This kindness is greater than that which you showed earlier.'"
  },
  {
    id: 10,
    question: "What was the name of Ruth's great-grandson who became king?",
    options: ["Jesse", "David", "Solomon", "Saul"],
    answer: 1,
    explanation: "Ruth 4:17-22 - Obed the father of Jesse, and Jesse the father of David. This, then, is the family line of Perez: Perez was the father of Hezron, Hezron the father of Ram, Ram the father of Amminadab, Amminadab the father of Nahshon, Nahshon the father of Salmon, Salmon the father of Boaz, Boaz the father of Obed, Obed the father of Jesse, and Jesse the father of David."
  }
];

export default function RuthPublicQuiz() {
  return (
    <PublicQuiz 
      title="Ruth Quiz - Loyalty and Redemption"
      questions={questions}
      bookName="Ruth"
    />
  );
}
