import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_12_25, pickDifficulty } from "./range-questions";

export default function GenesisRange12to25Beginner() {
  return (
    <BibleBookQuiz title="Genesis 12–25 - Beginner" questions={pickDifficulty(GEN_12_25, "beginner")} bookName="Genesis" />
  );
}


