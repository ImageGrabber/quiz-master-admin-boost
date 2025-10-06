import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_26_36, pickDifficulty } from "./range-questions";

export default function GenesisRange26to36Beginner() {
  return (
    <BibleBookQuiz title="Genesis 26–36 - Beginner" questions={pickDifficulty(GEN_26_36, "beginner")} bookName="Genesis" />
  );
}


