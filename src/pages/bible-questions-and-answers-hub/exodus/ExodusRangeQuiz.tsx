import { useParams } from "react-router-dom";
import BibleBookQuiz from "../../BibleBookQuiz";
import { EX_1_12, EX_13_18, EX_19_24, EX_25_40, pickDifficulty } from "./range-questions";

export default function ExodusRangeQuiz() {
  const { range, difficulty } = useParams<{ range: string; difficulty: string }>();

  let pool = EX_1_12;
  let title = "Exodus 1–12";

  if (range === "13-18") {
    pool = EX_13_18;
    title = "Exodus 13–18";
  } else if (range === "19-24") {
    pool = EX_19_24;
    title = "Exodus 19–24";
  } else if (range === "25-40") {
    pool = EX_25_40;
    title = "Exodus 25–40";
  }

  const questions = pickDifficulty(pool, (difficulty as any) || "beginner");

  return (
    <BibleBookQuiz 
      title={`${title} - ${difficulty?.charAt(0).toUpperCase()}${difficulty?.slice(1)}`} 
      questions={questions} 
      bookName="Exodus" 
    />
  );
}
