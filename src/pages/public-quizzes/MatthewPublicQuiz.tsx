import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who was the father of Jesus according to Matthew's genealogy?",
    options: ["Joseph", "David", "Abraham", "Jacob"],
    answer: 0,
    explanation: "Matthew 1:16 - and Jacob the father of Joseph, the husband of Mary, and Mary was the mother of Jesus who is called the Messiah."
  },
  {
    id: 2,
    question: "Where was Jesus born?",
    options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"],
    answer: 2,
    explanation: "Matthew 2:1 - After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem."
  },
  {
    id: 3,
    question: "How many wise men came to visit Jesus?",
    options: ["Two", "Three", "Four", "The Bible doesn't specify"],
    answer: 3,
    explanation: "Matthew 2:1 - The Bible mentions 'Magi from the east' and mentions three gifts, but doesn't specify the exact number of wise men."
  },
  {
    id: 4,
    question: "What was the name of the man who baptized Jesus?",
    options: ["Peter", "John", "James", "Andrew"],
    answer: 1,
    explanation: "Matthew 3:13 - Then Jesus came from Galilee to the Jordan to be baptized by John."
  },
  {
    id: 5,
    question: "How many days did Jesus fast in the wilderness?",
    options: ["30 days", "40 days", "50 days", "60 days"],
    answer: 1,
    explanation: "Matthew 4:2 - After fasting forty days and forty nights, he was hungry."
  },
  {
    id: 6,
    question: "What are the first four disciples Jesus called?",
    options: ["Peter, Andrew, James, John", "Peter, James, John, Matthew", "Andrew, James, John, Philip", "Peter, Andrew, Philip, Nathanael"],
    answer: 0,
    explanation: "Matthew 4:18-22 - Jesus called Peter, Andrew, James, and John to be his first disciples."
  },
  {
    id: 7,
    question: "On which mountain did Jesus give the Sermon on the Mount?",
    options: ["Mount Sinai", "Mount Zion", "Mount of Olives", "The Bible doesn't specify the name"],
    answer: 3,
    explanation: "Matthew 5:1 - Now when Jesus saw the crowds, he went up on a mountainside and sat down. The Bible doesn't give the specific name of the mountain."
  },
  {
    id: 8,
    question: "How many loaves of bread did Jesus use to feed the 5,000?",
    options: ["Three", "Five", "Seven", "Twelve"],
    answer: 1,
    explanation: "Matthew 14:17 - 'We have here only five loaves of bread and two fish,' they answered."
  },
  {
    id: 9,
    question: "What did Peter say when Jesus asked 'Who do you say I am?'",
    options: ["You are the Messiah", "You are the Son of God", "You are the King of Israel", "You are the Christ, the Son of the living God"],
    answer: 3,
    explanation: "Matthew 16:16 - Simon Peter answered, 'You are the Messiah, the Son of the living God.'"
  },
  {
    id: 10,
    question: "How many times did Peter deny Jesus?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1,
    explanation: "Matthew 26:34 - 'Truly I tell you,' Jesus answered, 'this very night, before the rooster crows, you will disown me three times.'"
  }
];

export default function MatthewPublicQuiz() {
  return (
    <PublicQuiz 
      title="Matthew Quiz - The Gospel of the King"
      questions={questions}
      bookName="Matthew"
    />
  );
}
