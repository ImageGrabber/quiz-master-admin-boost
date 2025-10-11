import BibleBookQuiz from "../../BibleBookQuiz";

const questions = [
  { chapter: 21, question: "At what age was Isaac circumcised?", options: ["Seven days", "Eight days", "Nine days", "Ten days"], answer: 1 },
  { chapter: 21, question: "What did Sarah say about nursing children?", options: ["She was too old", "Who would have said to Abraham that Sarah would nurse children?", "She was blessed", "She was grateful"], answer: 1 },
  { chapter: 21, question: "What did Sarah see Ishmael doing?", options: ["Playing", "Mocking", "Working", "Sleeping"], answer: 1 },
  { chapter: 21, question: "What did Sarah call Hagar?", options: ["My servant", "That slave woman", "My handmaid", "My helper"], answer: 1 },
  { chapter: 21, question: "What did God promise about Ishmael?", options: ["He would be blessed", "I will make him into a great nation", "He would be a prince", "He would be successful"], answer: 1 },
  { chapter: 21, question: "How far did Hagar sit from Ishmael?", options: ["A stones throw", "A bowshot away", "A mile", "A league"], answer: 1 },
  { chapter: 21, question: "What did Hagar think when she put Ishmael under the bush?", options: ["He would be safe", "I cannot watch the boy die", "He would sleep", "He would be found"], answer: 1 },
  { chapter: 21, question: "Where did Ishmael live as he grew up?", options: ["In a city", "In the desert", "In a village", "In a tent"], answer: 1 },
  { chapter: 21, question: "How many ewe lambs did Abraham set apart?", options: ["Five", "Six", "Seven", "Eight"], answer: 2 },
  { chapter: 21, question: "What did Abraham plant in Beersheba?", options: ["An olive tree", "A fig tree", "A tamarisk tree", "A palm tree"], answer: 2 }
];

export default function GenesisCh21Advanced() {
  return <BibleBookQuiz title="Genesis 21 - Advanced" questions={questions} bookName="Genesis" />;
}
