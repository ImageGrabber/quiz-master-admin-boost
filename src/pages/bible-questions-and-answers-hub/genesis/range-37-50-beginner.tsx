import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_37_50, pickDifficulty } from "./range-questions";

export default function GenesisRange37to50Beginner() {
  return (
    <BibleBookQuiz title="Genesis 37–50 - Beginner" questions={pickDifficulty(GEN_37_50, "beginner")} bookName="Genesis" />
  );
}


