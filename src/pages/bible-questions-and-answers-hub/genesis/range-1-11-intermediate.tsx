import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_1_11, pickDifficulty } from "./range-questions";

export default function GenesisRange1to11Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 1–11 - Intermediate" questions={pickDifficulty(GEN_1_11, "intermediate")} bookName="Genesis" />
  );
}


