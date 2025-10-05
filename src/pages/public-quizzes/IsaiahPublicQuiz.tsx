import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "What was Isaiah's father's name?",
    options: ["Amoz", "Uzziah", "Hezekiah", "Josiah"],
    answer: 0,
    explanation: "Isaiah 1:1 - The vision concerning Judah and Jerusalem that Isaiah son of Amoz saw during the reigns of Uzziah, Jotham, Ahaz and Hezekiah, kings of Judah."
  },
  {
    id: 2,
    question: "What did Isaiah see in his vision in chapter 6?",
    options: ["A burning bush", "The Lord seated on a throne", "A golden calf", "A ladder to heaven"],
    answer: 1,
    explanation: "Isaiah 6:1 - In the year that King Uzziah died, I saw the Lord, high and exalted, seated on a throne; and the train of his robe filled the temple."
  },
  {
    id: 3,
    question: "What did the seraphim call out to each other?",
    options: ["Holy, holy, holy", "Glory, glory, glory", "Praise, praise, praise", "Hallelujah, hallelujah, hallelujah"],
    answer: 0,
    explanation: "Isaiah 6:3 - And they were calling to one another: 'Holy, holy, holy is the Lord Almighty; the whole earth is full of his glory.'"
  },
  {
    id: 4,
    question: "What did Isaiah say would be the sign given to King Ahaz?",
    options: ["A child will be born", "The virgin will conceive", "A son will be given", "All of the above"],
    answer: 3,
    explanation: "Isaiah 7:14 - Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel."
  },
  {
    id: 5,
    question: "What are the names of the child mentioned in Isaiah 9:6?",
    options: ["Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace", "King of Kings, Lord of Lords, Alpha and Omega", "Savior, Redeemer, Messiah, Christ", "None of the above"],
    answer: 0,
    explanation: "Isaiah 9:6 - For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."
  },
  {
    id: 6,
    question: "What did Isaiah say would happen to the wolf and the lamb?",
    options: ["The wolf would eat the lamb", "They would live together in peace", "They would be enemies forever", "The lamb would rule over the wolf"],
    answer: 1,
    explanation: "Isaiah 11:6 - The wolf will live with the lamb, the leopard will lie down with the goat, the calf and the lion and the yearling together; and a little child will lead them."
  },
  {
    id: 7,
    question: "What did Isaiah say about the coming Messiah's appearance?",
    options: ["He would be handsome and tall", "He would have no beauty or majesty", "He would be strong and mighty", "He would be old and wise"],
    answer: 1,
    explanation: "Isaiah 53:2 - He had no beauty or majesty to attract us to him, nothing in his appearance that we should desire him."
  },
  {
    id: 8,
    question: "What did Isaiah say the Messiah would be called?",
    options: ["King of Kings", "Prince of Peace", "Lord of Lords", "All of the above"],
    answer: 1,
    explanation: "Isaiah 9:6 - And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."
  },
  {
    id: 9,
    question: "What did Isaiah say about the Messiah's suffering?",
    options: ["He would be rejected by men", "He would be pierced for our transgressions", "He would be crushed for our iniquities", "All of the above"],
    answer: 3,
    explanation: "Isaiah 53:3-5 - He was despised and rejected by mankind, a man of suffering, and familiar with pain. But he was pierced for our transgressions, he was crushed for our iniquities."
  },
  {
    id: 10,
    question: "What did Isaiah say would happen to those who wait on the Lord?",
    options: ["They would be blessed", "They would renew their strength", "They would soar on wings like eagles", "All of the above"],
    answer: 3,
    explanation: "Isaiah 40:31 - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
  }
];

export default function IsaiahPublicQuiz() {
  return (
    <PublicQuiz 
      title="Isaiah Quiz - The Major Prophet"
      questions={questions}
      bookName="Isaiah"
    />
  );
}
