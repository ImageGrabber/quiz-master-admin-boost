import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_37_50, pickDifficulty } from "./range-questions";

export default function GenesisRange37to50Advanced() {
  return (
    <BibleBookQuiz title="Genesis 37–50 - Advanced" questions={pickDifficulty(GEN_37_50, "advanced")} bookName="Genesis" />
  );
}


