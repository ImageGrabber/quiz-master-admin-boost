import BibleBookQuiz from "../BibleBookQuiz";



export default function LukeQuiz() {
  return (
    <BibleBookQuiz 
      title="Luke Quiz"
      questions={questions}
      bookName="Luke"
    />
  );
}