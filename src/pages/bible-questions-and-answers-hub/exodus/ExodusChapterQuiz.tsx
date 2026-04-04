import { useParams } from "react-router-dom";
import BibleBookQuiz from "../../BibleBookQuiz";
import { EX_1_12, EX_13_18, EX_19_24, EX_25_40 } from "./range-questions";

export default function ExodusChapterQuiz() {
  const { id } = useParams<{ id: string }>();
  const chapter = parseInt(id || "0", 10);

  const allQuestions = [...EX_1_12, ...EX_13_18, ...EX_19_24, ...EX_25_40];
  const chapterQuestions = allQuestions.filter(q => q.chapter === chapter);

  return (
    <BibleBookQuiz 
      title={`Exodus Chapter ${chapter} Quiz`} 
      questions={chapterQuestions} 
      bookName="Exodus" 
    />
  );
}
