import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Timer, CheckCircle2, Trophy, Zap, Coins, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { loadArenaQuestions } from "@/lib/arenaQuestions";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const ArenaSoloQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes
  const [session, setSession] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize: Load questions pool from Supabase table only
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fromTable = await loadArenaQuestions(10);
        if (fromTable.length > 0) {
          setQuestions(fromTable);
          return;
        }
        setLoadError("No competition questions available in database.");
      } catch (error: any) {
        setLoadError(error?.message || "Failed to load questions from database.");
      }
    };

    void loadQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (done || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [done, timeLeft]);

  const onAnswer = (option: string) => {
    setSelected(option);
    if (option === questions[index].answer) {
      setScore(s => s + 1);
    }
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((index + (selected ? 1 : 0)) / questions.length) * 100;
  const current = questions[index];

  if (!current && !done) {
    return (
      <main className="h-screen w-full bg-[#020617] text-foreground flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <p className="text-xl font-bold">Unable to start Solo Quest</p>
          <p className="text-sm text-muted-foreground">{loadError ?? "Loading questions..."}</p>
          <button onClick={() => navigate("/quiz-arena")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            Back to Arena
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-[#020617] text-foreground flex flex-col font-urbanist overflow-hidden selection:bg-primary/30 relative">
      {/* Background ambience - Dark Theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(127,29,29,0.15)_0%,_transparent_60%)] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/quiz-arena")} className="h-10 w-10 rounded-full bg-slate-900/50 border border-white/10 flex items-center justify-center hover:bg-slate-800 transition-all shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        
        <div className={`px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 shadow-sm flex items-center gap-2 text-xs font-black tracking-widest text-primary ${timeLeft < 30 ? 'animate-pulse border-primary/20' : ''}`}>
          <Timer className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row justify-center items-center gap-8 min-h-0 px-6 max-w-[1400px] mx-auto w-full relative z-10">
        <div className="flex-1 max-w-5xl w-full">
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-orange-600 transition-all duration-700 ease-out relative" style={{ width: `${progress}%` }}>
                <div className="absolute top-0 right-0 h-full w-8 bg-white/30 blur-md animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {!done ? (
              <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">Inquiry {index + 1} of 10</div>
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Scroll of Truth</div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-black leading-[1.1] text-foreground tracking-tight">{current.question}</h1>

                <div className="grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const isCorrect = option === current.answer;
                    const isSelected = selected === option;
                    return (
                      <button 
                        key={option} 
                        disabled={!!selected} 
                        onClick={() => onAnswer(option)} 
                        className={`relative w-full text-left p-5 lg:p-6 rounded-2xl border transition-all duration-300 text-sm font-bold 
                          ${!selected ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 text-foreground' : ''}
                          ${isSelected && isCorrect ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : ''}
                          ${isSelected && !isCorrect ? 'bg-rose-500/20 border-rose-500 text-rose-400' : ''}
                          ${selected && !isSelected ? 'opacity-20 border-transparent grayscale' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between gap-4"><span>{option}</span></div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6">
                  <button disabled={!selected} onClick={next} className="w-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all disabled:opacity-0 disabled:pointer-events-none shadow-2xl shadow-primary/20">
                    {index === questions.length - 1 ? "FINISH QUEST" : "NEXT"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700 overflow-y-auto pr-2 custom-scrollbar">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-150 animate-pulse" />
                  <div className="relative h-24 w-24 rounded-[2rem] bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30">
                    <Trophy className="h-12 w-12" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter uppercase leading-none">{timeLeft === 0 ? "Trial Ended" : "Victory"}</h2>
                  <p className="text-muted-foreground font-medium text-sm">Your wisdom has been recorded in the chronicles.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl px-12 py-6 w-full max-w-sm">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-black mb-1">Wisdom Level</p>
                  <p className="text-6xl font-black text-foreground">{(score + (timeLeft / 1000)).toFixed(3).replace(/\.0+$/, '')}</p>
                  <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">{score} Correct • {timeLeft}s Bonus</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
                  <button onClick={() => window.location.reload()} className="flex-1 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-primary/20">Retry Trial</button>
                  <button onClick={() => navigate("/quiz-arena")} className="flex-1 py-4 bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all">Exit Arena</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}} />
    </main>
  );
};

export default ArenaSoloQuiz;
