import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Swords, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const duelQuestions = [
  {
    question: "Who led the Israelites out of Egypt?",
    options: ["Moses", "Aaron", "Joshua", "Elijah"],
    answer: "Moses",
  },
  {
    question: "Which book comes after Acts?",
    options: ["Romans", "John", "Hebrews", "Corinthians"],
    answer: "Romans",
  },
];

const ArenaDuelQuiz = () => {
  const navigate = useNavigate();
  const [playerA, setPlayerA] = useState("Player 1");
  const [playerB, setPlayerB] = useState("Player 2");
  const [started, setStarted] = useState(false);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [picked, setPicked] = useState<string | null>(null);

  const names = useMemo(() => [playerA.trim() || "Player 1", playerB.trim() || "Player 2"], [playerA, playerB]);
  const current = duelQuestions[index];

  const lock = () => {
    if (!picked) return;
    const updated = [...scores] as [number, number];
    if (picked === current.answer) updated[turn] += 1;
    setScores(updated);
    setPicked(null);
    if (turn === 0) {
      setTurn(1);
      return;
    }
    if (index < duelQuestions.length - 1) {
      setIndex((i) => i + 1);
      setTurn(0);
    } else {
      setStarted(false);
    }
  };

  const winner = scores[0] === scores[1] ? "Draw" : scores[0] > scores[1] ? names[0] : names[1];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_10%,#fde68a,transparent_30%),radial-gradient(circle_at_92%_0%,#fbcfe8,transparent_35%),linear-gradient(165deg,#fff7ed,#f8fafc_38%,#eef2ff)] px-4 py-8 sm:px-6">
      <section className="mx-auto max-w-4xl">
        <Button variant="outline" className="mb-6" onClick={() => navigate("/quiz-arena")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Arena
        </Button>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Duel Mode</h1>
            <span className="inline-flex items-center gap-2 text-sm text-slate-600"><Swords className="h-4 w-4" /> Pass-and-Play</span>
          </div>

          {!started ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={playerA} onChange={(e) => setPlayerA(e.target.value)} className="h-11 rounded-xl border border-slate-200 px-3" />
                <input value={playerB} onChange={(e) => setPlayerB(e.target.value)} className="h-11 rounded-xl border border-slate-200 px-3" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Final Score: {names[0]} {scores[0]} - {scores[1]} {names[1]} {scores[0] + scores[1] > 0 ? `(Winner: ${winner})` : ""}
              </div>
              <Button
                onClick={() => {
                  setScores([0, 0]);
                  setIndex(0);
                  setTurn(0);
                  setPicked(null);
                  setStarted(true);
                }}
              >
                Start Duel
              </Button>
            </div>
          ) : (
            <div>
              <p className="mb-2 text-sm text-slate-500">Question {index + 1} of {duelQuestions.length}</p>
              <p className="mb-5 text-sm font-semibold text-fuchsia-700">Turn: {names[turn]}</p>
              <h2 className="mb-4 text-xl font-medium">{current.question}</h2>
              <div className="grid gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPicked(opt)}
                    className={`rounded-xl border px-4 py-3 text-left ${picked === opt ? "border-fuchsia-500 bg-fuchsia-50" : "hover:border-slate-400"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <Button disabled={!picked} onClick={lock} className="mt-5 w-full bg-fuchsia-600 hover:bg-fuchsia-700">Lock & Pass Device</Button>
              <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700">
                <Trophy className="h-4 w-4" /> Score: {names[0]} {scores[0]} - {scores[1]} {names[1]}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ArenaDuelQuiz;
