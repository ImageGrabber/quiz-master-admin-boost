import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Timer, CheckCircle2, Trophy } from "lucide-react";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";
import { md5 } from "@/utils/md5";

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

  // Initialize: Load questions pool
  useEffect(() => {
    const allQuestions: Question[] = [];
    Object.values(specificChapterQuizzes).forEach((quiz: any) => {
      if (quiz.questions) quiz.questions.forEach((q: any) => allQuestions.push({
        question: q.question, options: q.options, answer: q.options[q.answer] || q.answer
      }));
    });
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
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

  if (!current && !done) return null;

  return (
    <main className="h-screen w-full bg-[#fdfbf7] flex flex-col font-urbanist overflow-hidden selection:bg-amber-100 relative">
      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amber-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-50 blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/quiz-arena")} className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        
        <div className={`px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm flex items-center gap-2 text-xs font-black tracking-widest ${timeLeft < 30 ? 'text-rose-500 animate-pulse border-rose-100' : 'text-amber-600'}`}>
          <Timer className="h-3.5 w-3.5" /> {formatTime(timeLeft)}
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center min-h-0 px-6">
        <div className="mx-auto max-w-4xl w-full">
          <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col max-h-[85vh]">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700 ease-out relative" style={{ width: `${progress}%` }}>
                <div className="absolute top-0 right-0 h-full w-8 bg-white/30 blur-md animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {!done ? (
              <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex items-center justify-between">
                  <div className="px-3 py-1 rounded-lg bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest">Inquiry {index + 1} of 10</div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Scroll of Truth</div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-black leading-[1.1] text-slate-900 tracking-tight">{current.question}</h1>

                <div className="grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const isSelected = selected === option;
                    return (
                      <button key={option} disabled={!!selected} onClick={() => onAnswer(option)} className={`relative w-full text-left p-5 lg:p-6 rounded-2xl border transition-all duration-300 text-sm font-bold ${!selected ? 'bg-slate-50/30 border-slate-100 hover:bg-white hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/5' : ''} ${isSelected ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-lg shadow-amber-500/10' : ''} ${selected && !isSelected ? 'opacity-40 border-transparent grayscale' : ''}`}>
                        <div className="flex items-center justify-between gap-4"><span>{option}</span></div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6">
                  <button disabled={!selected} onClick={next} className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl transition-all disabled:opacity-0 disabled:pointer-events-none shadow-2xl shadow-slate-900/10">
                    {index === questions.length - 1 ? "FINISH QUEST" : "NEXT"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700 overflow-y-auto pr-2 custom-scrollbar">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-100 blur-[80px] rounded-full scale-150 animate-pulse" />
                  <div className="relative h-24 w-24 rounded-[2rem] bg-amber-500 flex items-center justify-center text-white shadow-2xl shadow-amber-500/30">
                    <Trophy className="h-12 w-12" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">{timeLeft === 0 ? "Trial Ended" : "Victory"}</h2>
                  <p className="text-slate-400 font-medium text-sm">Your wisdom has been recorded in the chronicles.</p>
                </div>

                <div className="bg-slate-50/50 backdrop-blur-sm border border-slate-100 rounded-3xl px-12 py-6 w-full max-w-sm">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black mb-1">Wisdom Level</p>
                  <p className="text-6xl font-black text-slate-900">{(score + (timeLeft / 1000)).toFixed(3).replace(/\.0+$/, '')}</p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{score} Correct • {timeLeft}s Bonus</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
                  <button onClick={() => window.location.reload()} className="flex-1 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-amber-500/10">Retry Trial</button>
                  <button onClick={() => navigate("/quiz-arena")} className="flex-1 py-4 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all">Exit Arena</button>
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }
      `}} />
    </main>
  );
};

export default ArenaSoloQuiz;
