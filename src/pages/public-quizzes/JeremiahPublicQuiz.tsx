import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was Jeremiah's nickname due to his prophecies and suffering?",
    options: ["The Silent Prophet", "The Weeping Prophet", "The Warrior Prophet", "The Joyful Prophet"],
    answer: 1,
    explanation: "Jeremiah is often called the 'Weeping Prophet' because of his sorrow for the people of Judah."
  },
  {
    id: 2,
    question: "How old did Jeremiah claim to be when God called him to be a prophet?",
    options: ["A child", "A young man (youth)", "An old man", "A king"],
    answer: 1,
    explanation: "Jeremiah 1:6 - 'Alas, Sovereign Lord,' I said, 'I do not know how to speak; I am too young.'"
  },
  {
    id: 3,
    question: "Where did God tell Jeremiah to go to see an object lesson about how He could mold Israel?",
    options: ["The temple", "The potter's house", "The king's court", "The mountains"],
    answer: 1,
    explanation: "Jeremiah 18:2 - 'Go down to the potter's house, and there I will give you my message.'"
  },
  {
    id: 4,
    question: "Finish the verse from Jeremiah 29:11: 'For I know the plans I have for you—plans to prosper you and not to harm you, plans to—'",
    options: ["Make you rich", "Give you a future and a hope", "Protect you from enemies", "Rule the world"],
    answer: 1,
    explanation: "Jeremiah 29:11 - '...plans to give you hope and a future.'"
  },
  {
    id: 5,
    question: "Which king of Judah threw Jeremiah into a cistern (muddy pit)?",
    options: ["Josiah", "Zedekiah", "Jehoiakim", "Nebuchadnezzar"],
    answer: 1,
    explanation: "Jeremiah 38:6 - 'So they took Jeremiah and put him into the cistern... Jeremiah was lowered by ropes into the cistern; it had no water in it, only mud, and Jeremiah sank into the mud.'"
  },
  {
    id: 6,
    question: "How long was the Babylonian captivity predicted to last, according to Jeremiah?",
    options: ["40 years", "50 years", "70 years", "100 years"],
    answer: 2,
    explanation: "Jeremiah 25:11 - 'This whole country will become a desolate wasteland, and these nations will serve the king of Babylon seventy years.'"
  },
  {
    id: 7,
    question: "In Jeremiah 31:31, God promises to make a 'new—' what with the house of Israel?",
    options: ["Temple", "Law", "Covenant", "Kingdom"],
    answer: 2,
    explanation: "Jeremiah 31:31 - 'The days are coming,' declares the Lord, 'when I will make a new covenant with the people of Israel and with the people of Judah.'"
  },
  {
    id: 8,
    question: "Who was Jeremiah's secretary (scribe) who wrote down his prophecies?",
    options: ["Baruch", "Ezekiel", "Isaiah", "Daniel"],
    answer: 0,
    explanation: "Jeremiah 36:4 - 'So Jeremiah called Baruch son of Neriah, and while Jeremiah dictated... Baruch wrote on the scroll all the words the Lord had spoken...'"
  },
  {
    id: 9,
    question: "What object did God show Jeremiah to confirm He was watching over His word to perform it?",
    options: ["An almond tree branch", "A boiling pot", "A broken jar", "A yoke of iron"],
    answer: 0,
    explanation: "Jeremiah 1:11-12 - 'The word of the Lord came to me: 'What do you see, Jeremiah?' 'I see the branch of an almond tree,' I replied. The Lord said to me, 'You have seen correctly, for I am watching to see that my word is fulfilled.'"
  },
  {
    id: 10,
    question: "Which city was Jeremiah repeatedly warning about its impending destruction?",
    options: ["Samaria", "Nineveh", "Jerusalem", "Babylon"],
    answer: 2,
    explanation: "Jeremiah's primary message was the coming judgment and destruction of Jerusalem by the Babylonians."
  }
];

export default function JeremiahPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Jeremiah Quiz - The Call of the Prophet"
      questions={questions}
      bookName="Jeremiah"
      canonicalPath={canonicalPath}
    />
  );
}
