import { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, UserRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";

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
    <main className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 overflow-hidden relative flex flex-col items-center justify-center px-4 sm:px-6">
      <SEO 
        title="Setup Your Arena Profile | Bible Quiz Competition 2026"
        description="Choose your display name to enter the Bible Quiz Arena and compete with believers worldwide."
      />
      
      {/* Premium Light Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-[100px] -z-10" />
      </div>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl content-center gap-12 lg:grid-cols-[1fr_0.8fr] py-12">
        <div className="flex flex-col justify-center space-y-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-700">
            <Zap className="h-4 w-4" />
            Arena Onboarding
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl leading-[1.1] uppercase">Identify Yourself <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Disciple</span></h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 font-medium sm:text-lg">
              Your identity will be forged in the chronicles of the arena. Choose a name that will be remembered across the global leaderboards.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    <UserRound className="h-4 w-4" />
                  </div>
                ))}
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">+500 Saints Active</p>
          </div>
        </div>

        <Card className="border-white bg-white/70 shadow-2xl shadow-blue-900/5 backdrop-blur-2xl rounded-[3rem] p-4 lg:p-8 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform duration-700" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Enter Identity</CardTitle>
            <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Portal Initialization</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 pt-4">
            <form onSubmit={handleContinue} className="space-y-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                  <UserRound className="h-4 w-4 text-blue-500" />
                  Chosen Display Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="e.g. Peter the Great"
                  className="h-16 w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 text-lg font-bold text-slate-900 outline-none transition-all focus:border-blue-300 focus:bg-white focus:shadow-xl focus:shadow-blue-50"
                  maxLength={30}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={!trimmedName}
                className="h-16 w-full rounded-2xl bg-slate-900 text-xs font-black uppercase tracking-[0.4em] text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-20 flex items-center justify-center gap-3"
              >
                Enter Quiz Arena
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-8 text-center text-[9px] font-black uppercase tracking-widest text-slate-300 leading-relaxed">
              By entering, you agree to the sanctuary rules and <br/>honor code of the Bible Quiz Competition.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CompetitionPlayerName;
