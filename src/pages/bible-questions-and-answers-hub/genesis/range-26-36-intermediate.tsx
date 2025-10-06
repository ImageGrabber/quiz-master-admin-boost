import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_26_36, pickDifficulty } from "./range-questions";

export default function GenesisRange26to36Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 26–36 - Intermediate" questions={pickDifficulty(GEN_26_36, "intermediate")} bookName="Genesis" />
  );
}


