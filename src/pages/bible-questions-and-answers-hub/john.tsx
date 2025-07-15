import BibleBookQuiz from "../BibleBookQuiz";



export default function JohnQuiz() {
  return (
    <BibleBookQuiz 
      title="John Quiz"
      questions={questions}
      bookName="John"
    />
  );
}