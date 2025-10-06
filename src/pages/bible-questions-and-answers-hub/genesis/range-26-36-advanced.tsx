import BibleBookQuiz from "../../BibleBookQuiz";
import { GEN_26_36, pickDifficulty } from "./range-questions";

export default function GenesisRange26to36Advanced() {
  return (
    <BibleBookQuiz title="Genesis 26–36 - Advanced" questions={pickDifficulty(GEN_26_36, "advanced")} bookName="Genesis" />
  );
}


