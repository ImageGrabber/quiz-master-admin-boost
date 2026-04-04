import { useParams } from "react-router-dom";
import BibleBookQuiz from "../../BibleBookQuiz";
import { EX_BOOK_WIDE, pickDifficulty } from "./range-questions";

export default function ExodusLevelQuiz() {
  const { difficulty } = useParams<{ difficulty: string }>();

  const questions = pickDifficulty(EX_BOOK_WIDE, (difficulty as any) || "beginner");

  return (
    <BibleBookQuiz 
      title={`Exodus ${difficulty?.charAt(0).toUpperCase()}${difficulty?.slice(1)}`} 
      questions={questions} 
      bookName="Exodus" 
    />
  );
}
