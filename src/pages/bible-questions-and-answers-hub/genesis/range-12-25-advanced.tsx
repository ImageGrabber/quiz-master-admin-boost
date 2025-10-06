import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_12_25, pickDifficulty } from "./range-questions";

export default function GenesisRange12to25Advanced() {
  return (
    <BibleBookQuiz title="Genesis 12–25 - Advanced" questions={pickDifficulty(GEN_12_25, "advanced")} bookName="Genesis" />
  );
}


