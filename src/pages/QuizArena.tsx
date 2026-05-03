import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Sparkles,
  Users,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const PLAYER_NAME_KEY = "quizArenaPlayerName";
const ONLINE_WINDOW_MS = 5 * 60 * 1000;

type OnlineUser = {
  id: string;
  display_name: string;
  current_activity: string | null;
  last_seen: string | null;
};

type LiveCompetition = {
  id: string;
  title: string;
  status: string | null;
  prize_pool: number;
  start_date: string;
};

type PublicQuiz = {
  id: number;
  title: string;
};

const QuizArena = () => {
  const navigate = useNavigate();
  const playerName = useMemo(
    () => (localStorage.getItem(PLAYER_NAME_KEY) || "Player").trim() || "Player",
    []
  );

  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [liveCompetitions, setLiveCompetitions] = useState<LiveCompetition[]>([]);
  const [publicQuizzes, setPublicQuizzes] = useState<PublicQuiz[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [activeCompetitionCount, setActiveCompetitionCount] = useState(0);
  const [publicQuizCount, setPublicQuizCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [session, setSession] = useState<any>(null);

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

  const loadArenaData = async () => {
    const onlineSince = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();

    const [
      onlineRes,
      onlineCountRes,
      competitionsRes,
      activeCompetitionsCountRes,
      quizzesRes,
      quizCountRes,
    ] = await Promise.all([
      supabase
        .from("online_users")
        .select("id, display_name, current_activity, last_seen")
        .eq("is_available", true)
        .gte("last_seen", onlineSince)
        .order("last_seen", { ascending: false })
        .limit(12),
      supabase
        .from("online_users")
        .select("id", { count: "exact", head: true })
        .eq("is_available", true)
        .gte("last_seen", onlineSince),
      supabase
        .from("competitions")
        .select("id, title, status, prize_pool, start_date")
        .in("status", ["active", "upcoming"])
        .order("start_date", { ascending: true })
        .limit(8),
      supabase
        .from("competitions")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("quizzes")
        .select("id, title")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(12),
      supabase
        .from("quizzes")
        .select("id", { count: "exact", head: true })
        .eq("is_public", true),
    ]);

    setOnlineUsers(onlineRes.error ? [] : ((onlineRes.data as OnlineUser[]) || []));
    setOnlineCount(onlineCountRes.error ? 0 : onlineCountRes.count || 0);
    setLiveCompetitions(
      competitionsRes.error ? [] : ((competitionsRes.data as LiveCompetition[]) || [])
    );
    setActiveCompetitionCount(
      activeCompetitionsCountRes.error ? 0 : activeCompetitionsCountRes.count || 0
    );
    setPublicQuizzes(quizzesRes.error ? [] : ((quizzesRes.data as PublicQuiz[]) || []));
    setPublicQuizCount(quizCountRes.error ? 0 : quizCountRes.count || 0);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem(PLAYER_NAME_KEY)) {
      navigate("/quiz-arena/name", { replace: true });
      return;
    }

    loadArenaData();
    const interval = setInterval(loadArenaData, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <main className="min-h-screen w-full bg-[#fdfbf7] text-slate-900 font-urbanist selection:bg-amber-200 overflow-x-hidden">
      {/* Background Ambience - Light Theme */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-amber-100 to-transparent blur-[120px] opacity-60" />
        <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-12 space-y-16">
        {/* Minimal Header - Light */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] shadow-sm">
            <Sparkles className="h-3 w-3" /> The Celestial Arena
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900">
            CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">MISSION.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl font-light">
            Welcome back, <span className="text-slate-900 font-medium">{playerName}</span>. Select a portal to begin your trial of knowledge.
          </p>
        </header>

        {/* Big Mission Portals - Light */}
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { 
              title: "Solo Quest", 
              desc: "The fastest way to sharpen your spirit. Play alone and master the Word.", 
              icon: Shield, 
              route: "/quiz-arena/solo", 
              color: "amber",
              img: "/images/arena/scroll.png"
            },
            { 
              title: "Live Battle", 
              desc: "Join the assembly of believers in real-time battle for glory.", 
              icon: Users, 
              route: "/quiz-arena/multiplayer", 
              color: "indigo",
              img: "/images/arena/shield.png"
            }
          ].map((mode, idx) => (
            <button
              key={idx}
              onClick={() => navigate(mode.route)}
              className="group relative flex flex-col items-center text-center p-10 rounded-[3.5rem] bg-white border border-slate-100 hover:border-amber-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-amber-100/50 blur-[60px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={mode.img} 
                  alt={mode.title} 
                  className="h-44 w-44 object-cover relative z-10 rounded-[2rem] shadow-2xl shadow-black/10 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{mode.title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-10">{mode.desc}</p>
              <div className="mt-auto inline-flex items-center gap-3 px-8 py-3 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                Enter Portal <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Earn Rewards Banner */}
        <section className="bg-white border border-slate-100 rounded-[3.5rem] p-8 lg:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.03)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50 to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                <Coins className="h-3 w-3" /> Bonus Wisdom Available
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
                Earn Rewards while you play
              </h2>
              <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                Unlock premium scrolls and boost your ranking by completing quick inquiries in our new reward portal.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {session ? (
                <button 
                  onClick={() => navigate("/dashboard/earn")}
                  className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => navigate("/auth/login")}
                    className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate("/auth/register")}
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                  >
                    Join Now
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {loading && (
          <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-1/3 animate-[loading_1.5s_infinite]" />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-amber-600 font-black animate-pulse">Summoning Arena</p>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
    </main>
  );
};

export default QuizArena;
