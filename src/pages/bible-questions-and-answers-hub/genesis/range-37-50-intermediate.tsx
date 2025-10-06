import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_37_50, pickDifficulty } from "./range-questions";

export default function GenesisRange37to50Intermediate() {
  return (
    <BibleBookQuiz title="Genesis 37–50 - Intermediate" questions={pickDifficulty(GEN_37_50, "intermediate")} bookName="Genesis" />
  );
}


