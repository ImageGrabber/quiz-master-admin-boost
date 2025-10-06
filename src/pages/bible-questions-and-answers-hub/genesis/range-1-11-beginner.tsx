import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_1_11, pickDifficulty } from "./range-questions";

export default function GenesisRange1to11Beginner() {
  return (
    <BibleBookQuiz title="Genesis 1–11 - Beginner" questions={pickDifficulty(GEN_1_11, "beginner")} bookName="Genesis" />
  );
}


