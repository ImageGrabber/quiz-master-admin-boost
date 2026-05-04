import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Timer, CheckCircle2, Trophy, Zap, Coins, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
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
      <main className="h-screen w-full bg-[#FDFDFF] text-slate-900 flex items-center justify-center p-6 font-urbanist">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-400">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-black tracking-tight">Unable to start Quest</p>
            <p className="text-sm text-slate-500 font-medium">{loadError ?? "Preparing your spiritual journey..."}</p>
          </div>
          <button onClick={() => navigate("/quiz-arena")} className="px-8 py-3 rounded-2xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            Return to Arena
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-[#FDFDFF] text-slate-900 flex flex-col font-urbanist overflow-hidden selection:bg-blue-100 relative">
      {/* Premium Light Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-[100px] -z-10" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/quiz-arena")} className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className={`px-5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 text-xs font-black tracking-widest ${timeLeft < 30 ? 'text-rose-600 animate-pulse border-rose-100 bg-rose-50' : 'text-blue-600'}`}>
            <Timer className="h-4 w-4" /> {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row justify-center items-center gap-8 min-h-0 px-6 max-w-6xl mx-auto w-full relative z-10">
        <div className="flex-1 w-full">
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden flex flex-col max-h-[85vh]">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
            </div>

            {!done ? (
              <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <div className="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">Solo Mission {index + 1} of 10</div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Sparkles className="h-3 w-3" /> Digital Scripture
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900 tracking-tight">{current.question}</h1>

                <div className="grid gap-4 sm:grid-cols-2">
                  {current.options.map((option, idx) => {
                    const isCorrect = option === current.answer;
                    const isSelected = selected === option;
                    return (
                      <button 
                        key={option} 
                        disabled={!!selected} 
                        onClick={() => onAnswer(option)} 
                        className={`group relative w-full text-left p-6 rounded-2xl border transition-all duration-300
                          ${!selected ? 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1' : ''}
                          ${isSelected && isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100' : ''}
                          ${isSelected && !isCorrect ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-lg shadow-rose-100' : ''}
                          ${selected && !isSelected && isCorrect ? 'bg-emerald-50/50 border-emerald-200 text-emerald-600' : ''}
                          ${selected && !isSelected && !isCorrect ? 'opacity-40 border-slate-100 grayscale-[0.5]' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black border transition-colors ${
                              isSelected ? 'bg-white border-transparent shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-base font-bold">{option}</span>
                          </div>
                          {isSelected && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-8">
                  <button 
                    disabled={!selected} 
                    onClick={next} 
                    className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all disabled:opacity-0 disabled:pointer-events-none shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                  >
                    {index === questions.length - 1 ? "FINISH QUEST" : "NEXT INQUIRY"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700 overflow-y-auto pr-2 custom-scrollbar py-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full scale-150 animate-pulse" />
                  <div className="relative h-28 w-28 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-200">
                    <Trophy className="h-14 w-14" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Quest Complete</h2>
                  <p className="text-slate-500 font-medium">Your wisdom has been sealed and recorded.</p>
                </div>

                <div className="bg-slate-50 rounded-[2.5rem] px-12 py-10 w-full max-w-sm border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-bl-full -z-0" />
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-2">Knowledge Index</p>
                    <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600">{(score + (timeLeft / 1000)).toFixed(3).replace(/\.0+$/, '')}</p>
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                         <div className="w-2 h-2 rounded-full bg-emerald-500" />
                         <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{score} Correct</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                         <Timer className="h-3.5 w-3.5 text-blue-500" />
                         <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{timeLeft}s Bonus</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-6">
                  <button onClick={() => window.location.reload()} className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-lg shadow-blue-100">Retry Quest</button>
                  <button onClick={() => navigate("/quiz-arena")} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-sm">Exit Arena</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}} />
    </main>
  );
};

export default ArenaSoloQuiz;
