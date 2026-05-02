import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Timer, Users, Bot, Zap, Swords, CheckCircle2, XCircle } from "lucide-react";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const ArenaMultiplayerQuiz = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'matchmaking' | 'battle' | 'results'>('matchmaking');
  const [matchmakingTime, setMatchmakingTime] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentName, setOpponentName] = useState("DISCIPLE BOT");
  const [isBot, setIsBot] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [botAction, setBotAction] = useState<string>("");
  const [lastResult, setLastResult] = useState<{ side: 'user' | 'opponent', correct: boolean } | null>(null);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(10);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [myRole, setMyRole] = useState<'p1' | 'p2'>('p1');
  
  const channelRef = useRef<any>(null);
  const myId = useMemo(() => {
    const saved = localStorage.getItem("arena_player_id");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("arena_player_id", newId);
    return newId;
  }, []);
  
  const myName = useMemo(() => localStorage.getItem("quiz_player_name") || `Disciple_${myId.slice(0,4)}`, [myId]);

  // Initialize: Load questions pool (Default for Bot/Host)
  const generateQuestions = () => {
    const allQuestions: Question[] = [];
    Object.values(specificChapterQuizzes).forEach((quiz: any) => {
      if (quiz.questions) quiz.questions.forEach((q: any) => allQuestions.push({
        question: q.question, options: q.options, answer: q.options[q.answer] || q.answer
      }));
    });
    return [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
  };

  // Matchmaking & Realtime Setup
  useEffect(() => {
    const channel = supabase.channel('arena_lobby', {
      config: { presence: { key: myId } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const others = Object.entries(state).filter(([key]) => key !== myId);
        
        if (others.length > 0 && phase === 'matchmaking') {
          // Found someone!
          const [id, presences]: [string, any] = others[0];
          const other = presences[0];
          
          if (other.status === 'searching') {
            const isHost = myId < id; // Smallest ID is host
            setMyRole(isHost ? 'p1' : 'p2');
            setIsBot(false);
            setOpponentName(other.name || "Opponent");
            setMatchId(isHost ? `${myId}_${id}` : `${id}_${myId}`);
            
            if (isHost) {
              const qs = generateQuestions();
              setQuestions(qs);
              channel.send({
                type: 'broadcast',
                event: 'match_start',
                payload: { questions: qs, p1: myId, p2: id, p1_name: myName }
              });
              setPhase('battle');
            }
          }
        }
      })
      .on('broadcast', { event: 'match_start' }, ({ payload }) => {
        if (payload.p2 === myId && phase === 'matchmaking') {
          setQuestions(payload.questions);
          setOpponentName(payload.p1_name);
          setIsBot(false);
          setMyRole('p2');
          setPhase('battle');
          setTurn('opponent'); // P2 starts as opponent (waiting for P1)
        }
      })
      .on('broadcast', { event: 'turn_data' }, ({ payload }) => {
        if (payload.sender !== myId) {
          if (payload.type === 'answer') {
            setOpponentScore(payload.score);
            setLastResult({ side: 'opponent', correct: payload.correct });
            setBotAction(`Answered: ${payload.answer}`);
            
            setTimeout(() => {
              if (index === questions.length - 1) {
                setPhase('results');
              } else {
                setIndex(i => i + 1);
                setTurn('user');
                setLastResult(null);
                setQuestionTimeLeft(10);
                setBotAction("");
              }
            }, 1500);
          }
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ status: 'searching', name: myName, joined_at: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => { channel.unsubscribe(); };
  }, [phase, myId, myName, index, questions.length]);

  // Matchmaking Timer (Fallback to Bot)
  useEffect(() => {
    if (phase !== 'matchmaking') return;
    const timer = setInterval(() => {
      setMatchmakingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isBot) {
            setQuestions(generateQuestions());
            setPhase('battle');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, isBot]);

  // Question Timer (User Turn Only)
  useEffect(() => {
    if (phase !== 'battle' || turn !== 'user' || selected || index >= questions.length) {
      setQuestionTimeLeft(10);
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onUserAnswer("TIMEOUT_EXPIRED");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, turn, selected, index, questions.length]);

  // Bot Turn Logic (Simulated if no real player)
  useEffect(() => {
    if (phase !== 'battle' || turn !== 'opponent' || !isBot || index >= questions.length) return;

    setBotAction("Contemplating...");
    const currentQ = questions[index];
    
    const timer = setTimeout(() => {
      const isCorrect = Math.random() > 0.3;
      const botChoice = isCorrect ? currentQ.answer : currentQ.options.find(o => o !== currentQ.answer);
      
      const newScore = isCorrect ? opponentScore + 1 : opponentScore;
      setOpponentScore(newScore);
      setBotAction(`Answered: ${botChoice}`);
      setLastResult({ side: 'opponent', correct: isCorrect });

      setTimeout(() => {
        if (index === questions.length - 1) {
          setPhase('results');
        } else {
          setIndex(i => i + 1);
          setTurn('user');
          setBotAction("");
          setLastResult(null);
          setQuestionTimeLeft(10);
        }
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [phase, turn, index, questions, isBot, opponentScore]);

  const onUserAnswer = (option: string) => {
    if (selected || turn !== 'user') return;
    setSelected(option);
    
    const isCorrect = option === questions[index].answer;
    const newScore = isCorrect ? userScore + 1 : userScore;
    if (isCorrect) setUserScore(newScore);
    setLastResult({ side: 'user', correct: isCorrect });

    // Sync with real opponent if exists
    if (!isBot && channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'turn_data',
        payload: { 
          sender: myId, 
          type: 'answer', 
          answer: option, 
          correct: isCorrect, 
          score: newScore 
        }
      });
    }

    // Switch to opponent after a delay
    setTimeout(() => {
      if (index === questions.length - 1) {
        setPhase('results');
      } else {
        setIndex(i => i + 1);
        setTurn('opponent');
        setSelected(null);
        setLastResult(null);
        setBotAction("");
      }
    }, 1500);
  };

  const current = questions[index];

  if (phase === 'matchmaking') {
    return (
      <main className="h-screen w-full bg-[#fdfbf7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/40 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-md w-full">
          <div className="relative inline-block">
            <div className="h-32 w-32 rounded-full border-4 border-slate-100 border-t-amber-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Users className="h-10 w-10 text-slate-300" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Searching for Opponent</h1>
            <p className="text-slate-400 font-medium">Seeking a worthy disciple in the realm...</p>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              <span>Time Remaining</span>
              <span className="text-amber-600">{matchmakingTime}s</span>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${(matchmakingTime) * 10}%` }} />
            </div>
          </div>

          <button onClick={() => navigate("/quiz-arena")} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">
            Cancel Matchmaking
          </button>
        </div>
      </main>
    );
  }

  if (phase === 'results') {
    const victory = userScore > opponentScore;
    return (
      <main className="h-screen w-full bg-[#fdfbf7] flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl border border-white rounded-[3.5rem] p-12 text-center space-y-12 shadow-[0_30px_100px_rgba(0,0,0,0.03)] animate-in zoom-in duration-500">
          <div className="space-y-4">
            <div className={`h-24 w-24 mx-auto rounded-3xl flex items-center justify-center text-white shadow-2xl ${victory ? 'bg-amber-500 shadow-amber-500/30' : 'bg-slate-400 shadow-slate-400/30'}`}>
              <Zap className="h-12 w-12" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase">
              {victory ? "Battle Victory!" : userScore === opponentScore ? "Draw Match" : "Defeated"}
            </h1>
            <p className="text-slate-400 font-medium italic">"The wisdom of the prudent is to give thought to their steps."</p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
            <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Score</p>
              <p className="text-6xl font-black text-slate-900">{userScore}</p>
            </div>
            <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Opponent Score</p>
              <p className="text-6xl font-black text-slate-400">{opponentScore}</p>
            </div>
          </div>

          <div className="flex gap-4 max-w-md mx-auto pt-6">
            <button onClick={() => window.location.reload()} className="flex-1 py-5 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-amber-500/20">Rematch</button>
            <button onClick={() => navigate("/quiz-arena")} className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all">Exit Arena</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-[#fdfbf7] flex flex-col font-urbanist overflow-hidden selection:bg-amber-100">
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amber-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-50 blur-[150px] rounded-full" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/quiz-arena")} className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Round</p>
            <p className="text-xl font-black text-slate-900">{index + 1} / 10</p>
          </div>
          <div className="h-10 w-px bg-slate-200 mx-2" />
          <div className="text-left">
            <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Battle Active</p>
            <div className="flex gap-2"><Swords className="h-4 w-4 text-slate-900" /></div>
          </div>
        </div>
        <div className="h-10 w-10" />
      </header>

      <div className="relative z-10 flex-1 grid grid-cols-2 p-6 gap-6 min-h-0">
        <div className={`flex flex-col transition-all duration-500 ${turn === 'user' ? 'scale-100 opacity-100' : 'scale-95 opacity-30 pointer-events-none grayscale blur-[2px]'}`}>
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 flex-1 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20"><Users className="h-6 w-6" /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Player One</p>
                <h3 className="text-xl font-black text-slate-900">YOU</h3>
              </div>
              <div className="ml-auto bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100"><span className="text-2xl font-black text-slate-900">{userScore}</span></div>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8 relative">
              {turn === 'user' && !selected && (
                <div className="absolute -top-4 left-0 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ease-linear ${questionTimeLeft <= 3 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} style={{ width: `${(questionTimeLeft / 10) * 100}%` }} />
                </div>
              )}
              <h2 className="text-2xl lg:text-3xl font-black leading-tight text-slate-900">{turn === 'user' ? current?.question : "Waiting for Opponent..."}</h2>
              <div className="grid gap-3">
                {current?.options.map((opt) => (
                  <button key={opt} disabled={!!selected || turn !== 'user'} onClick={() => onUserAnswer(opt)} className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 text-sm font-bold ${selected === opt ? 'bg-amber-50 border-amber-500 text-amber-900' : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-amber-200'}`}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col transition-all duration-500 ${turn === 'opponent' ? 'scale-100 opacity-100' : 'scale-95 opacity-30 pointer-events-none grayscale blur-[2px]'}`}>
          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 flex-1 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${isBot ? 'bg-indigo-500 shadow-indigo-500/20' : 'bg-sky-500 shadow-sky-500/20'}`}>{isBot ? <Bot className="h-6 w-6" /> : <Users className="h-6 w-6" />}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isBot ? 'Battle Automaton' : 'Real Opponent'}</p>
                <h3 className="text-xl font-black text-slate-900 uppercase">{opponentName}</h3>
              </div>
              <div className="ml-auto bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100"><span className="text-2xl font-black text-slate-900">{opponentScore}</span></div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
              {turn === 'opponent' ? (
                <>
                  <div className={`h-20 w-20 rounded-full flex items-center justify-center relative ${isBot ? 'bg-indigo-50' : 'bg-sky-50'}`}>
                    <div className={`absolute inset-0 border-2 border-t-transparent rounded-full animate-spin ${isBot ? 'border-indigo-500' : 'border-sky-500'}`} />
                    {isBot ? <Bot className="h-8 w-8 text-indigo-500" /> : <Users className="h-8 w-8 text-sky-500" />}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{botAction || "Thinking..."}</p>
                    <h2 className="text-xl font-black text-slate-900 italic">"{current?.question}"</h2>
                  </div>
                </>
              ) : (
                <div className="opacity-20 flex flex-col items-center">
                  {isBot ? <Bot className="h-16 w-16 mb-4" /> : <Users className="h-16 w-16 mb-4" />}
                  <p className="text-xs font-black uppercase tracking-widest">Opponent Waiting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className={`px-8 py-3 rounded-full shadow-2xl transition-all duration-500 flex items-center gap-3 backdrop-blur-md ${turn === 'user' ? 'bg-amber-500/90 text-white' : 'bg-indigo-500/90 text-white'}`}>
          <Zap className={`h-5 w-5 ${turn === 'user' ? 'animate-pulse' : ''}`} />
          <span className="font-black text-xs uppercase tracking-[0.3em]">{turn === 'user' ? "YOUR INQUIRY" : "OPPONENT'S TURN"}</span>
        </div>
      </div>

      {lastResult && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-black text-xs uppercase tracking-widest ${lastResult.correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            {lastResult.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {lastResult.side === 'user' ? (lastResult.correct ? "RIGHTEOUS!" : "MISSED!") : (lastResult.correct ? `${opponentName} WAS CORRECT` : `${opponentName} MISSED!`)}
          </div>
        </div>
      )}
    </main>
  );
};

export default ArenaMultiplayerQuiz;
