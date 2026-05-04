import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Zap, Swords, CheckCircle2, XCircle, UserRound, Share2, Activity, Trophy, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { loadArenaQuestions, type ArenaDifficulty } from "@/lib/arenaQuestions";
import { v4 as uuidv4 } from 'uuid';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type DifficultyConfig = {
  label: ArenaDifficulty;
  secondsPerQuestion: number;
  pointsPerCorrect: number;
  botAccuracy: number;
  badgeClass: string;
  accentColor: string;
};

const DIFFICULTY_CONFIG: Record<ArenaDifficulty, DifficultyConfig> = {
  Easy: {
    label: "Easy",
    secondsPerQuestion: 12,
    pointsPerCorrect: 1,
    botAccuracy: 0.55,
    badgeClass: "text-emerald-600 border-emerald-100 bg-emerald-50",
    accentColor: "bg-emerald-500",
  },
  Medium: {
    label: "Medium",
    secondsPerQuestion: 10,
    pointsPerCorrect: 2,
    botAccuracy: 0.72,
    badgeClass: "text-blue-600 border-blue-100 bg-blue-50",
    accentColor: "bg-blue-500",
  },
  Hard: {
    label: "Hard",
    secondsPerQuestion: 8,
    pointsPerCorrect: 3,
    botAccuracy: 0.85,
    badgeClass: "text-rose-600 border-rose-100 bg-rose-50",
    accentColor: "bg-rose-500",
  },
};

const ArenaMultiplayerQuiz = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'matchmaking' | 'battle' | 'results'>('matchmaking');
  const [matchmakingTime, setMatchmakingTime] = useState(10);
  const [difficulty, setDifficulty] = useState<ArenaDifficulty>("Medium");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<'user' | 'opponent'>('user');
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentName, setOpponentName] = useState("DISCIPLE RIVAL");
  const [isBot, setIsBot] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [opponentSelected, setOpponentSelected] = useState<string | null>(null);
  const [botAction, setBotAction] = useState<string>("");
  const [lastResult, setLastResult] = useState<{ side: 'user' | 'opponent', correct: boolean } | null>(null);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(DIFFICULTY_CONFIG.Medium.secondsPerQuestion);
  const [matchId, setMatchId] = useState<string | null>(null);
  const [myRole, setMyRole] = useState<'p1' | 'p2'>('p1');
  const [loadError, setLoadError] = useState<string | null>(null);
  
  const channelRef = useRef<any>(null);
  const myId = useMemo(() => {
    const saved = localStorage.getItem("arena_player_id");
    if (saved) return saved;
    const newId = uuidv4();
    localStorage.setItem("arena_player_id", newId);
    return newId;
  }, []);
  
  const myName = useMemo(() => localStorage.getItem("quiz_player_name") || `Disciple_${myId.slice(0,4)}`, [myId]);
  const mode = DIFFICULTY_CONFIG[difficulty];

  const openShareUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const buildQuestionSet = async () => {
    const fromTable = await loadArenaQuestions(10, difficulty);
    if (fromTable.length > 0) return fromTable;
    throw new Error(`No ${difficulty} competition questions available in database.`);
  };

  const startBattleWithDbQuestions = async (onReady: (qs: Question[]) => void) => {
    try {
      const qs = await buildQuestionSet();
      onReady(qs);
      setLoadError(null);
    } catch (error: any) {
      setLoadError(error?.message || "Failed to load questions from database.");
    }
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
          
          if (other.status === 'searching' && other.difficulty === difficulty) {
            const isHost = myId < id; // Smallest ID is host
            setMyRole(isHost ? 'p1' : 'p2');
            setIsBot(false);
            setOpponentName(other.name || "Opponent");
            setMatchId(isHost ? `${myId}_${id}` : `${id}_${myId}`);
            
            if (isHost) {
              void startBattleWithDbQuestions((qs) => {
                setQuestions(qs);
                channel.send({
                  type: 'broadcast',
                  event: 'match_start',
                  payload: { questions: qs, p1: myId, p2: id, p1_name: myName, difficulty }
                });
                setPhase('battle');
              });
            }
          }
        }
      })
      .on('broadcast', { event: 'match_start' }, ({ payload }) => {
        if (payload.p2 === myId && phase === 'matchmaking') {
          setQuestions(payload.questions);
          setOpponentName(payload.p1_name);
          if (payload.difficulty === "Easy" || payload.difficulty === "Medium" || payload.difficulty === "Hard") {
            setDifficulty(payload.difficulty);
          }
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
            setOpponentSelected(payload.answer);
            setBotAction(`Answered: ${payload.answer}`);
            
            setTimeout(() => {
              if (index === questions.length - 1) {
                setPhase('results');
              } else {
                setIndex(i => i + 1);
                setTurn('user');
                setLastResult(null);
                setOpponentSelected(null);
                setQuestionTimeLeft(DIFFICULTY_CONFIG[difficulty].secondsPerQuestion);
                setBotAction("");
              }
            }, 1500);
          }
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ status: 'searching', name: myName, difficulty, joined_at: Date.now() });
        }
      });

    channelRef.current = channel;
    return () => { channel.unsubscribe(); };
  }, [phase, myId, myName, index, questions.length, difficulty]);

  // Matchmaking Timer (Fallback to Bot)
  useEffect(() => {
    if (phase !== 'matchmaking') return;
    const timer = setInterval(() => {
      setMatchmakingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isBot) {
            void startBattleWithDbQuestions((qs) => {
              setQuestions(qs);
              setPhase('battle');
            });
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
      setQuestionTimeLeft(mode.secondsPerQuestion);
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
  }, [phase, turn, selected, index, questions.length, mode.secondsPerQuestion]);

  // Bot Turn Logic (Simulated if no real player)
  useEffect(() => {
    if (phase !== 'battle' || turn !== 'opponent' || !isBot || index >= questions.length) return;

      setBotAction("Preparing move...");
    const currentQ = questions[index];
    
    const timer = setTimeout(() => {
      const isCorrect = Math.random() < mode.botAccuracy;
      const botChoice = isCorrect ? currentQ.answer : currentQ.options.find(o => o !== currentQ.answer);
      
      const newScore = isCorrect ? opponentScore + mode.pointsPerCorrect : opponentScore;
      setOpponentScore(newScore);
      setOpponentSelected(botChoice);
      setBotAction(`Answered: ${botChoice}`);
      setLastResult({ side: 'opponent', correct: isCorrect });

      setTimeout(() => {
        if (index === questions.length - 1) {
          setPhase('results');
        } else {
          setIndex(i => i + 1);
          setTurn('user');
          setBotAction("");
          setOpponentSelected(null);
          setLastResult(null);
          setQuestionTimeLeft(mode.secondsPerQuestion);
        }
      }, 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, [phase, turn, index, questions, isBot, opponentScore, mode.botAccuracy, mode.pointsPerCorrect, mode.secondsPerQuestion]);

  const onUserAnswer = (option: string) => {
    if (selected || turn !== 'user') return;
    setSelected(option);
    
    const isCorrect = option === questions[index].answer;
    const newScore = isCorrect ? userScore + mode.pointsPerCorrect : userScore;
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
      <main className="h-screen w-full bg-[#FDFDFF] flex flex-col items-center justify-center p-6 relative overflow-hidden font-urbanist">
        {/* Premium Light Ambience */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.08)_0%,_transparent_60%)] blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/20 rounded-full blur-[100px] -z-10" />
        </div>

        <div className="relative z-10 text-center space-y-12 max-w-md w-full">
          {loadError && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-600 animate-in fade-in slide-in-from-top-4">
              {loadError}
            </div>
          )}
          
          <div className="relative inline-block">
             <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full scale-150 animate-pulse" />
             <div className="relative h-48 w-48 rounded-full border-[6px] border-slate-50 border-t-blue-600 animate-spin transition-all duration-1000" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-14 w-14 text-blue-600 animate-bounce" />
             </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase leading-none">Seeking Rival</h1>
            <p className="text-slate-500 font-medium text-sm tracking-tight">Summoning a worthy opponent for the scripture battle...</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-6 shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Battle Settings</p>
            <div className="grid grid-cols-3 gap-3">
              {(["Easy", "Medium", "Hard"] as ArenaDifficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.16em] transition-all ${
                    difficulty === d
                      ? `${DIFFICULTY_CONFIG[d].badgeClass} border-blue-200 shadow-lg scale-105`
                      : "bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">
              <span>Finding Match</span>
              <span className="text-blue-600">{matchmakingTime}s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(matchmakingTime) * 10}%` }} />
            </div>
          </div>

          <button onClick={() => navigate("/quiz-arena")} className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-rose-500 transition-all">
            Abort Matchmaking
          </button>
        </div>
      </main>
    );
  }

  if (phase === 'results') {
    const victory = userScore > opponentScore;
    const resultLabel = victory ? "Battle Victory" : userScore === opponentScore ? "Draw Match" : "Defeated";
    const shareText = `${resultLabel}! I scored ${userScore}-${opponentScore} in Bible Quiz Arena.`;
    const pageUrl = window.location.origin + "/quiz-arena";
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(pageUrl);

    const shareLinks = [
      { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` },
      { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
      { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
      { label: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
      { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}` },
    ];

    const handleNativeShare = async () => {
      if (!navigator.share) return;
      try {
        await navigator.share({
          title: "Bible Quiz Arena",
          text: shareText,
          url: pageUrl,
        });
      } catch {
        // User cancelled share dialog.
      }
    };

    return (
      <main className="h-screen w-full bg-[#FDFDFF] flex items-center justify-center p-6 overflow-hidden font-urbanist">
        {/* Premium Light Ambience */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)] blur-[80px]" />
        </div>

        <div className="max-w-4xl w-full bg-white border border-white rounded-[3.5rem] p-12 text-center space-y-12 shadow-2xl relative z-10 animate-in zoom-in duration-700">
          <div className="space-y-6">
            <div className={`h-28 w-28 mx-auto rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl relative ${victory ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-200' : 'bg-slate-800 shadow-slate-200'}`}>
              <Trophy className="h-14 w-14 relative z-10" />
            </div>
            <div className="space-y-3">
              <div className={`inline-flex rounded-xl border px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] ${mode.badgeClass}`}>
                {difficulty} Battle
              </div>
              <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                {victory ? "Victory!" : userScore === opponentScore ? "Draw!" : "Defeated"}
              </h1>
              <p className="text-slate-500 font-bold tracking-tight text-sm uppercase tracking-[0.2em]">The word has spoken.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Your Score</p>
              <p className="text-7xl font-black text-slate-900 tabular-nums leading-none">{userScore}</p>
            </div>
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm opacity-60">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Rival Score</p>
              <p className="text-7xl font-black text-slate-900 tabular-nums leading-none">{opponentScore}</p>
            </div>
          </div>

          <div className="flex gap-4 max-w-md mx-auto pt-6">
            <button onClick={() => window.location.reload()} className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl shadow-blue-100">Rematch</button>
            <button onClick={() => navigate("/quiz-arena")} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all shadow-sm">Exit Arena</button>
          </div>

          <div className="max-w-3xl mx-auto w-full pt-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {shareLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => openShareUrl(item.href)}
                  className="py-3 px-3 bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 rounded-xl text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 hover:text-blue-600 transition-all shadow-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-[#FDFDFF] text-slate-900 flex flex-col font-urbanist overflow-hidden selection:bg-blue-100 relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.06)_0%,_transparent_60%)] blur-[80px]" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <button onClick={() => navigate("/quiz-arena")} className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">BATTLE STAGE</p>
            <p className="text-xl font-black text-slate-900">{index + 1} / 10</p>
          </div>
          <div className="h-10 w-px bg-slate-100 mx-2" />
          <div className="text-left">
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">LIVE CONFLICT</p>
            <div className="flex items-center gap-2">
              <Swords className="h-4 w-4 text-slate-900" />
              <span className={`text-[9px] font-black uppercase tracking-wider rounded-lg border px-2 py-0.5 ${mode.badgeClass}`}>{difficulty}</span>
            </div>
          </div>
        </div>
        <div className="h-12 w-12" />
      </header>

      <div className="relative z-10 flex-1 grid grid-cols-2 p-8 gap-8 min-h-0">
        {/* PLAYER ONE: YOU */}
        <div className={`flex flex-col transition-all duration-700 ${turn === 'user' ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-20 pointer-events-none grayscale-[0.8] blur-[1px]'}`}>
          <div className={`bg-white border border-white rounded-[3rem] p-10 flex-1 flex flex-col shadow-2xl relative overflow-hidden ${turn === 'user' ? 'ring-4 ring-blue-50' : ''}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[4rem] -z-0" />
            <div className="relative z-10 flex items-center gap-5 mb-10">
              <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100"><Users className="h-7 w-7" /></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CHALLENGER</p>
                <h3 className="text-2xl font-black text-slate-900 uppercase">YOU</h3>
              </div>
              <div className="ml-auto bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm"><span className="text-3xl font-black text-slate-900">{userScore}</span></div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-10 relative">
              {turn === 'user' && !selected && (
                <div className="absolute -top-6 left-0 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ease-linear bg-blue-600 ${questionTimeLeft <= 3 ? 'animate-pulse bg-rose-500' : ''}`} style={{ width: `${(questionTimeLeft / mode.secondsPerQuestion) * 100}%` }} />
                </div>
              )}
              <h2 className="text-2xl lg:text-3xl font-black leading-tight text-slate-900 tracking-tight">{turn === 'user' ? current?.question : "Awaiting opponent action..."}</h2>
              <div className="grid gap-4">
                {current?.options.map((opt, idx) => {
                  const isCorrect = opt === current.answer;
                  const isSelected = selected === opt;
                  return (
                    <button 
                      key={opt} 
                      disabled={!!selected || turn !== 'user'} 
                      onClick={() => onUserAnswer(opt)} 
                      className={`group relative w-full text-left p-6 rounded-2xl border transition-all duration-300
                        ${!selected ? 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1' : ''}
                        ${isSelected && isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100' : ''}
                        ${isSelected && !isCorrect ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-lg shadow-rose-100' : ''}
                        ${selected && !isSelected ? 'opacity-20 border-transparent grayscale' : ''}
                      `}
                    >
                      <div className="flex items-center gap-4">
                         <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black border transition-colors ${
                            isSelected ? 'bg-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                         }`}>
                           {String.fromCharCode(65 + idx)}
                         </span>
                         <span className="text-base font-bold">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* PLAYER TWO: RIVAL */}
        <div className={`flex flex-col transition-all duration-700 ${turn === 'opponent' ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-20 pointer-events-none grayscale-[0.8] blur-[1px]'}`}>
          <div className={`bg-white border border-white rounded-[3rem] p-10 flex-1 flex flex-col shadow-2xl relative overflow-hidden ${turn === 'opponent' ? 'ring-4 ring-indigo-50' : ''}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[4rem] -z-0" />
            <div className="relative z-10 flex items-center gap-5 mb-10">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${isBot ? 'bg-indigo-600 shadow-indigo-100' : 'bg-sky-600 shadow-sky-100'}`}>
                 {isBot ? <UserRound className="h-7 w-7" /> : <Users className="h-7 w-7" />}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ARENA RIVAL</p>
                <h3 className="text-2xl font-black text-slate-900 uppercase truncate max-w-[200px]">{opponentName}</h3>
              </div>
              <div className="ml-auto bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm"><span className="text-3xl font-black text-slate-900">{opponentScore}</span></div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-8">
              {turn === 'opponent' ? (
                <>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-400 mb-2">
                       <MessageSquare className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">Opponent View</span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-black text-slate-900 leading-tight mb-8">"{current?.question}"</h2>
                    <div className="grid gap-3 w-full max-w-sm">
                      {current?.options.map((opt, idx) => {
                        const isCorrect = opt === current.answer;
                        const isOpponentChoice = opponentSelected === opt;
                        return (
                          <div 
                            key={opt}
                            className={`p-4 rounded-2xl border text-sm font-bold transition-all duration-500
                              ${!opponentSelected ? 'bg-slate-50 border-slate-100 text-slate-300' : ''}
                              ${isOpponentChoice && isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-50' : ''}
                              ${isOpponentChoice && !isCorrect ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-md shadow-rose-50' : ''}
                              ${opponentSelected && !isOpponentChoice ? 'opacity-10 border-transparent grayscale' : ''}
                            `}
                          >
                            <div className="flex items-center gap-4">
                               <span className="w-6 h-6 rounded-lg bg-white/50 border border-slate-100 flex items-center justify-center text-[9px] font-black">
                                 {String.fromCharCode(65 + idx)}
                               </span>
                               {opt}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-8 flex flex-col items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center relative ${isBot ? 'bg-indigo-50' : 'bg-sky-50'}`}>
                      <div className={`absolute inset-0 border-[3px] border-transparent border-t-indigo-500 rounded-full animate-spin`} />
                      {isBot ? <UserRound className="h-6 w-6 text-indigo-600" /> : <Users className="h-6 w-6 text-sky-600" />}
                    </div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] animate-pulse">{botAction || "Thinking..."}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center opacity-10 py-20">
                   <Swords className="h-20 w-20 mb-6 text-slate-900" />
                   <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Rival Resting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className={`px-10 py-4 rounded-full shadow-2xl transition-all duration-700 flex items-center gap-4 backdrop-blur-xl border border-white/20 ${turn === 'user' ? 'bg-blue-600/90 text-white' : 'bg-slate-900/90 text-white'}`}>
          <Zap className={`h-5 w-5 ${turn === 'user' ? 'animate-pulse' : ''}`} />
          <span className="font-black text-xs uppercase tracking-[0.4em]">{turn === 'user' ? "YOUR TURN" : "RIVAL'S TURN"}</span>
        </div>
      </div>

    </main>
  );
};

export default ArenaMultiplayerQuiz;
