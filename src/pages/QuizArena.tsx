import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";

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
    <main className="h-screen w-full bg-[#020617] text-foreground font-urbanist selection:bg-primary/30 overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Ambience - Authentic Screenshot Spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(127,29,29,0.15)_0%,_transparent_60%)] blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 w-full space-y-12 lg:space-y-16">

          {/* Big Mission Portals - Premium Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto w-full">
            {[
              { 
                title: "Solo Quest", 
                desc: "The fastest way to sharpen your spirit. Play alone and master the Word.", 
                icon: Shield, 
                route: "/quiz-arena/solo", 
                color: "orange",
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
            ].map((mode, idx) => {
              const isDuel = mode.title === "Live Battle";
              return (
                <button
                  key={idx}
                  onClick={() => navigate(mode.route)}
                  className={`group relative flex flex-col items-center text-center p-8 lg:p-10 rounded-[3rem] bg-card border transition-all duration-700 overflow-hidden ${
                    isDuel 
                      ? 'border-primary/50 shadow-[0_40px_80px_rgba(0,0,0,0.4)] -translate-y-2' 
                      : 'border-border'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-700 ${
                    isDuel ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  <div className="relative mb-6 lg:mb-8">
                    <div className={`absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-125 transition-opacity duration-700 ${
                      isDuel ? 'opacity-100' : 'opacity-0'
                    }`} />
                    <img 
                      src={mode.img} 
                      alt={mode.title} 
                      className={`h-40 w-40 lg:h-48 lg:w-48 object-cover relative z-10 rounded-[2rem] shadow-2xl shadow-black/40 transition-all duration-700 ${
                        isDuel ? 'scale-110 rotate-3' : ''
                      }`} 
                    />
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-foreground mb-3 uppercase tracking-tighter">{mode.title}</h3>
                  <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed mb-8 max-w-xs">{mode.desc}</p>
                  
                  <div className={`mt-auto inline-flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-sm ${
                    isDuel 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    Enter Portal <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

        {loading && (
          <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/3 animate-[loading_1.5s_infinite]" />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-orange-600 font-black animate-pulse">Summoning Arena</p>
          </div>
        )}
      </section>

      {/* Community Banner - Inspired by Design */}
      <CommunityStickyBanner />

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
