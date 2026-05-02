import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PLAYER_NAME_KEY = "quizArenaPlayerName";

const CompetitionPlayerName = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");

  const trimmedName = useMemo(() => playerName.trim(), [playerName]);

  const handleContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedName) return;
    localStorage.setItem(PLAYER_NAME_KEY, trimmedName);
    navigate("/quiz-arena");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fef3c7,transparent_40%),radial-gradient(circle_at_top_right,#bfdbfe,transparent_38%),linear-gradient(145deg,#fffaf2,#f8fafc_48%,#eef2ff)] px-4 sm:px-6">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl content-center gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Quiz Arena Entry
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Before We Start, What Should We Call You?</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Your name appears in your arena profile, match invites, and leaderboards.
          </p>
        </div>

        <Card className="border-white/80 bg-white/80 shadow-2xl shadow-slate-900/10 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Player Setup</CardTitle>
            <CardDescription>Pick a display name to enter the arena.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContinue} className="space-y-4">
              <label className="block">
                <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  <UserRound className="h-4 w-4" />
                  Name
                </span>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none ring-0 transition focus:border-slate-400"
                  maxLength={30}
                />
              </label>

              <Button
                type="submit"
                disabled={!trimmedName}
                className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-slate-700"
              >
                Enter Quiz Arena
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CompetitionPlayerName;
