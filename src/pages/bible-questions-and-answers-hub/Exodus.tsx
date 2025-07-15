import BibleBookQuiz from "../BibleBookQuiz";



export default function ExodusQuiz() {
  return (
    <BibleBookQuiz 
      title="Exodus Quiz"
      questions={exodusQuestions}
      bookName="Exodus"
    />
  );
}