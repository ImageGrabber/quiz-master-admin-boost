import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_1_11, pickDifficulty } from "./range-questions";

export default function GenesisRange1to11Advanced() {
  return (
    <BibleBookQuiz title="Genesis 1–11 - Advanced" questions={pickDifficulty(GEN_1_11, "advanced")} bookName="Genesis" />
  );
}


