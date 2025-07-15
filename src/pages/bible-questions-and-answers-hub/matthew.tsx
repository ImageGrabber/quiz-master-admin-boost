import BibleBookQuiz from "../BibleBookQuiz";



export default function MatthewQuiz() {
  return (
    <BibleBookQuiz 
      title="Matthew Quiz"
      questions={questions}
      bookName="Matthew"
    />
  );
}