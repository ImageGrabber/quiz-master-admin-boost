import BibleBookQuiz from "../BibleBookQuiz";



export default function PsalmsQuiz() {
  return (
    <BibleBookQuiz 
      title="Psalms Quiz"
      questions={questions}
      bookName="Psalms"
    />
  );
}