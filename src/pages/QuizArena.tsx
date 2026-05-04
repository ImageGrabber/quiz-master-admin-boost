import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Users,
  Sparkles,
  Trophy,
  Activity
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import CommunityStickyBanner from "@/components/CommunityStickyBanner";
import SEO from "@/components/SEO";
import { trackEvent } from "@/utils/analytics";

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
  const siteUrl = "https://biblequizcompetition.com";

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

    try {
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

      setOnlineUsers(onlineRes?.error ? [] : ((onlineRes?.data as OnlineUser[]) || []));
      setOnlineCount(onlineCountRes?.error ? 0 : onlineCountRes?.count || 0);
      setLiveCompetitions(
        competitionsRes?.error ? [] : ((competitionsRes?.data as LiveCompetition[]) || [])
      );
      setActiveCompetitionCount(
        activeCompetitionsCountRes?.error ? 0 : activeCompetitionsCountRes?.count || 0
      );
      setPublicQuizzes(quizzesRes?.error ? [] : ((quizzesRes?.data as PublicQuiz[]) || []));
      setPublicQuizCount(quizCountRes?.error ? 0 : quizCountRes?.count || 0);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading arena data:", error);
    } finally {
      setLoading(false);
    }
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
    <main className="h-screen w-full bg-[#FDFDFF] text-slate-900 font-urbanist selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative flex flex-col items-center justify-center">
      <SEO
        title="Quiz Arena | Bible Quiz Competition 2026 | Solo & Live Battle"
        description="Enter Quiz Arena for Bible Quiz Competition 2026. Play solo Bible quiz challenges or join live multiplayer battles with leaderboard-ready scoring."
        keywords="quiz arena, bible quiz arena, bible quiz competition 2026, live bible quiz, multiplayer bible quiz, solo bible quiz, christian quiz battle"
        url="/quiz-arena"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "name": "Quiz Arena - Bible Quiz Competition 2026",
              "url": `${siteUrl}/quiz-arena`,
              "description": "Play solo and live multiplayer Bible quiz battles inside Quiz Arena.",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Bible Quiz Competition",
                "url": siteUrl
              }
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `${siteUrl}/`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Quiz Arena",
                  "item": `${siteUrl}/quiz-arena`
                }
              ]
            }
          ]
        }}
      />
      <h1 className="sr-only">Quiz Arena - Bible Quiz Competition 2026</h1>

      {/* Premium Light Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_60%)] blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[120px] -z-10" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 w-full space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Competitive Arena v2.0</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none uppercase">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Battle Path</span></h2>
          <p className="text-slate-500 max-w-lg font-medium">Select a mode to enter the sanctuary and test your knowledge against the word and fellow believers.</p>
        </div>

        {/* Big Mission Portals - Premium Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto w-full">
          {[
            { 
              title: "Solo Quest", 
              desc: "Perfect your accuracy and speed. Master the word at your own pace.", 
              icon: Shield, 
              route: "/quiz-arena/solo", 
              accent: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-100",
              img: "/images/arena/scroll.png"
            },
            { 
              title: "Live Battle", 
              desc: "Join the assembly of believers in real-time battle for global rankings.", 
              icon: Users, 
              route: "/quiz-arena/multiplayer", 
              accent: "text-blue-600",
              bg: "bg-blue-50",
              border: "border-blue-100",
              img: "/images/arena/shield.png",
              featured: true
            }
          ].map((mode, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  trackEvent("quiz_arena_mode_selected", {
                    mode_title: mode.title,
                    mode_route: mode.route,
                  });
                  navigate(mode.route);
                }}
                className={`group relative flex flex-col items-center text-center p-10 rounded-[3rem] bg-white border transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 ${
                  mode.featured ? 'border-blue-200' : 'border-slate-100'
                }`}
              >
                {/* Glassmorphic Overlay */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${mode.bg} opacity-20 rounded-bl-[5rem] transition-transform duration-700 group-hover:scale-125`} />
                
                <div className="relative mb-8">
                  <div className={`absolute inset-0 ${mode.bg} blur-[60px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <img 
                    src={mode.img} 
                    alt={mode.title} 
                    className="h-40 w-40 lg:h-48 lg:w-48 object-cover relative z-10 rounded-[2.5rem] shadow-xl group-hover:scale-105 transition-transform duration-700" 
                  />
                  {mode.featured && (
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-lg z-20 animate-bounce">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter">{mode.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 max-w-xs">{mode.desc}</p>
                
                <div className={`mt-auto inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-sm ${
                  mode.featured 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                  Enter Portal <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 pt-8">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-sm">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{onlineCount} Saints Online</span>
           </div>
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-sm">
             <Activity className="h-4 w-4 text-blue-500" />
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{activeCompetitionCount} Active Battles</span>
           </div>
        </div>

        {loading && (
          <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
            <div className="relative w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-blue-600 w-full -translate-x-full animate-[loading_1.5s_infinite]" />
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-blue-600 font-black animate-pulse">Summoning Arena</p>
          </div>
        )}
      </section>

      {/* Community Banner */}
      <CommunityStickyBanner />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </main>
  );
};

export default QuizArena;
