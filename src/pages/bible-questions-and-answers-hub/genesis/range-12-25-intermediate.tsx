import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_12_25, pickDifficulty } from "./range-questions";

export default function GenesisRange12to25Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 12–25 - Intermediate" questions={pickDifficulty(GEN_12_25, "intermediate")} bookName="Genesis" />
  );
}


