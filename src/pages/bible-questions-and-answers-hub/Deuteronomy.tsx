import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users, ScrollText, Flag, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Cinematic assets for the Deuteronomy Hub
const DEUTERONOMY_IMAGES = {
  hero: "/images/hubs/deuteronomy/moses-nebo.png",
  shema: "/images/hubs/deuteronomy/shema.png",
  promised_land: "/images/hubs/deuteronomy/promised-land.png",
  renewal: "/images/hubs/deuteronomy/renewal.png",
  heart_law: "/images/hubs/deuteronomy/heart-law.png", // New placeholder or specific asset
};

export default function DeuteronomyHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 34 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    const num = parseInt(q, 10);
    return chapterNumbers.filter((n) => n === num || String(n).startsWith(q));
  }, [query]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Narrative data for Deuteronomy chapters
  const chapterPoints1to11: Record<number, string[]> = {
    1: ["Moses recounts the journey from Horeb", "Reflections on the failed entry from Kadesh", "Appointment of leaders and judges"],
    2: ["Recalling the years in the wilderness", "Passing through Seir, Moab, and Ammon", "The defeat of Sihon, king of Heshbon"],
    3: ["Defeat of Og, king of Bashan", "Division of land for Reuben, Gad, Manasseh", "Moses' forbidden request to cross the Jordan"],
    4: ["A call to obedience and fearing God", "Warning against idolatry", "The cities of refuge East of the Jordan"],
    5: ["The Ten Commandments repeated", "The people's fear of God's voice at Sinai", "The core of the covenant relationship"],
    6: ["The Shema: 'Hear, O Israel'", "Commands to love God with all your heart", "Warning not to forget God in prosperity"],
    7: ["Command to drive out the seven nations", "Israel chosen as a holy and treasured people", "God's promise of victory over enemies"],
    8: ["Do not forget the Lord who fed you manna", "Warning against pride and self-sufficiency", "Remembering the 40-year test in the desert"],
    9: ["Moses recounts Israel's rebellions", "The incident of the Golden Calf recalled", "Moses' intercession for the people's survival"],
    10: ["The second set of stone tablets", "The requirements: fear, love, and serve God", "Circumcise your hearts"],
    11: ["Love and obey God for the sake of the land", "The blessing and the curse", "Proclaiming the law at Gerizim and Ebal"],
  };

  const chapterPoints12to26: Record<number, string[]> = {
    12: ["The law of the central sanctuary", "Worshipping only where God chooses", "Warning against pagan worship practices"],
    13: ["Warnings against false prophets", "Temptations to follow other gods", "Dealing with a rebellious city"],
    14: ["Clean and unclean food laws revised", "The law of the third-year tithe", "Being a holy people to the Lord"],
    15: ["The seven-year release of debts", "Generosity toward the poor and needy", "Setting free the Hebrew servants"],
    16: ["Passover, Weeks, and Tabernacles feasts", "Appointment of judges and officials", "Warning against forbidden worship poles"],
    17: ["Requirements for a future King of Israel", "The book of the Law for the king", "Purity in judicial cases"],
    18: ["Portions for priests and Levites", "Warning against occult practices", "The promise of a Prophet like Moses"],
    19: ["Cities of refuge for unintentional killers", "Boundaries and the two-witness rule", "Law of retribution: eye for an eye"],
    20: ["Laws for warfare and military exemption", "Offering terms of peace first", "Preserving fruit trees during a siege"],
    21: ["Atonement for unsolved murders", "Marriage to captive women; Inheritance rights", "The law of the rebellious son"],
    22: ["Laws of social responsibility & neighbors", "Marriage purity and distinct clothing", "Fairness in sexual misconduct cases"],
    23: ["Exclusion from the assembly; camp purity", "Laws on interest, vows, and neighbor's crops", "Protecting the runaway slave"],
    24: ["Laws of divorce and remarriage", "Protection for the poor, widows, orphans", "Fairness in justice for the vulnerable"],
    25: ["The limit on lashes; Levirate marriage", "Fair weights and measures", "Remembering the treachery of Amalek"],
    26: ["The firstfruits and the third-year tithe", "The declaration of covenant commitment", "A nation set high above all others"],
  };

  const chapterPoints27to34: Record<number, string[]> = {
    27: ["Altar on Mount Ebal; Blessings & Curses", "The Levites proclaim the curses", "The people's 'Amen' of commitment"],
    28: ["The magnificent blessings for obedience", "The terrifying curses for disobedience", "Prophecy of future exile and suffering"],
    29: ["The covenant renewal in the land of Moab", "Reflections on the miracles of the Exodus", "The secret things belong to the Lord"],
    30: ["The promise of restoration after exile", "The choice: Life and Death, Blessing and Curse", "Circumcision of the heart back in the land"],
    31: ["Joshua's commission; Reading the Law", "Moses writes the Law and gives it to priests", "The command to store the Law beside the Ark"],
    32: ["The Song of Moses: A witness against Israel", "God the Rock vs the people's unfaithfulness", "Moses' final warning and command to climb Nebo"],
    33: ["Moses' final blessing on the twelve tribes", "The safety of Benjamin and the abundance of Joseph", "God as the eternal refuge and shield"],
    34: ["The death of Moses on Mount Nebo", "God shows Moses the whole Promised Land", "Joshua takes lead; No prophet like Moses"],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Deuteronomy Quiz Hub | Covenant Renewal Study Guide"
        description="Master the book of Deuteronomy through 34 chapters of interactive quizzes and narrative insights. Explore Moses' final words and the choice for life."
        url="/bible-questions-and-answers-hub/deuteronomy"
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[72vh] sm:min-h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={DEUTERONOMY_IMAGES.hero} 
            alt="Moses on Mount Nebo viewing the Promised Land" 
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <ScrollText className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Second Law</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Deuteronomy <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            Moses' final charge to a new generation at the border of home. A timeless call to love God with wholehearted devotion.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 sm:px-12 py-4 sm:py-10 text-sm sm:text-xl rounded-3xl font-bold shadow-2xl transition-all active:scale-95 group text-black" onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin Quiz Journey <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all px-6 sm:px-12 py-4 sm:py-10 text-sm sm:text-xl rounded-3xl font-light active:scale-95 text-white" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Content
            </Button>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb Section */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Deuteronomy</span>
        </div>

        {/* Narrative Section 1: The Shema */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Golden Commandment
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900">The Shema: The Heart of Devotion</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                "Hear, O Israel: The Lord our God, the Lord is one." This single verse became the heartbeat of Hebrew faith and the cornerstone of Deuteronomy's theology, calling for a love that encompasses heart, soul, and strength.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "Choose life, so that you and your children may live and that you may love the Lord your God..."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Deuteronomy 30:19-20</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={DEUTERONOMY_IMAGES.shema} 
                alt="The Shema Visual" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6">
                  <ScrollText className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Calling</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black">Total Allegiance & Generational Faith</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section - High End Dark Mode Card */}
        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Heart className="w-8 h-8 text-amber-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">The Heart of the Commandment</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Deuteronomy shifts the focus from external ritual to internal devotion. It teaches that obedience is the natural overflow of a heart that truly loves God. The law is not a burden, but a guide to life, health, and flourishing in the community.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Flag className="w-8 h-8 text-blue-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Justice and Compassion</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    God's covenant creates a specific kind of society—one that protects the vulnerable, cares for the widow and orphan, and practices radical generosity. In Deuteronomy, justice is the social expression of holiness and the hallmark of God's people.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Difficulty Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase">Choose Your Study Depth</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">Test your grasp of Moses' final charge and the laws of the covenant.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the basics: the Shema, the Ten Commandments, and Moses' final day.", 
                icon: BookOpen, 
                color: "bg-green-50", 
                iconColor: "text-green-600",
                link: "beginner",
                accent: "bg-green-500",
                features: ["The core commands", "Moses' story", "Blessings intro"]
              },
              { 
                level: "Intermediate", 
                desc: "Deep dive into the laws of kings, war, and the release of debts.", 
                icon: Brain, 
                color: "bg-orange-50", 
                iconColor: "text-orange-600",
                link: "intermediate",
                accent: "bg-orange-500",
                features: ["Social laws", "Prophetic promises", "Restraint of power"]
              },
              { 
                level: "Advanced", 
                desc: "Master the Song of Moses, tribal blessings, and the Levirate laws.", 
                icon: Swords, 
                color: "bg-red-50", 
                iconColor: "text-red-600",
                link: "advanced",
                accent: "bg-red-500",
                features: ["Legal technicalities", "Prophetic imagery", "Hebrew theology"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/deuteronomy/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Deuteronomy Track</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10">{d.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {d.features.map(f => (
                      <li key={f} className="flex items-center text-sm font-light text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${d.accent} mr-3 opacity-50`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">Start Training</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Narrative Section 2: The Promised Land */}
        <section id="renewal" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-6 bg-amber-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={DEUTERONOMY_IMAGES.promised_land} 
                alt="The Promised Land View" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Boundless Inheritance
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase">Entering the Land of Milk and Honey</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic">
                From the height of Mount Nebo, Moses looked across the Jordan at the fulfillment of four centuries of promise. Deuteronomy is the bridge between the wilderness and the home, a final instruction manual for how to keep the land by keeping the covenant.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-amber-50/40 rounded-[2.5rem] border border-amber-100/50 hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50">
                  <Compass className="w-7 h-7 text-amber-600 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed text-left">"Be strong and courageous... for the Lord your God goes with you."</p>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">— Deuteronomy 31:6</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Hubs Section */}
        <section className="mb-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Specialized Training</h2>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">The Scrolls of Wisdom</h3>
              <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Refine your mastery through targeted narrative and logic modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Covenant Renewal", 
                  desc: "The oath at the Plains of Moab", 
                  icon: ScrollText, 
                  link: "covenant-renewal",
                  color: "bg-amber-50",
                  iconColor: "text-amber-600"
                },
                { 
                  title: "Blessing & Curse", 
                  desc: "Logic of Mount Ebal/Gerizim", 
                  icon: ShieldCheck, 
                  link: "blessings-curses",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600"
                },
                { 
                  title: "Central Altar", 
                  desc: "Worshipping in His chosen place", 
                  icon: Compass, 
                  link: "central-sanctuary",
                  color: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                },
                { 
                  title: "The Successor", 
                  desc: "Joshua's commissioning", 
                  icon: Flag, 
                  link: "joshua-commission",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((tool) => (
                <Card 
                  key={tool.title}
                  className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none bg-white rounded-[2rem] overflow-hidden text-left"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/deuteronomy/${tool.link}`)}
                >
                  <CardHeader className="pt-12 pb-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8 shadow-sm`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 italic serif mb-2 uppercase">{tool.title}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 leading-relaxed italic">
                      {tool.desc}
                    </CardDescription>
                  </CardHeader>
                  <div className="px-8 pb-8">
                    <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full w-0 group-hover:w-full transition-all duration-700 bg-black/10`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Library Grid */}
        <section id="deuteronomy-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-16 text-left">
            <div className="max-w-2xl">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500 mb-10">The Scrolls of Moab</h2>
              <h3 className="text-4xl sm:text-6xl md:text-8xl font-normal text-gray-900 mb-8 italic serif tracking-tighter uppercase leading-none">The Library of Wisdom</h3>
              <p className="text-2xl font-light text-gray-400 leading-relaxed italic border-l-2 border-gray-100 pl-8">Explore unique study materials and summaries for each of the 34 chapters.</p>
            </div>
            <div className="w-full lg:w-[500px]">
              <div className="relative group">
                <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-300 w-8 h-8" strokeWidth={1} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chapter # or keyword..."
                  className="pl-24 pr-12 py-12 text-2xl font-light border-0 bg-gray-50/70 focus:bg-white focus:ring-0 rounded-[3rem] shadow-inner transition-all duration-700 hover:bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 11) currentChapterPoints = chapterPoints1to11[ch];
              else if (ch >= 12 && ch <= 26) currentChapterPoints = chapterPoints12to26[ch];
              else if (ch >= 27 && ch <= 34) currentChapterPoints = chapterPoints27to34[ch];

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-gray-200/20 rounded-[2.5rem] overflow-hidden p-2 text-left" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/deuteronomy/chapter-${ch}`)}
                >
                  <CardHeader className="p-10 pb-6 text-black italic">
                    <div className="flex items-center justify-between mb-8 opacity-40">
                      <div className="text-sm font-bold text-gray-300 tracking-[0.2em] group-hover:text-amber-500 transition-colors uppercase">CHAPTER {ch}</div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 mb-6 italic serif line-clamp-1">Narrative Insight</CardTitle>
                    <div className="space-y-4">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0 group-hover:bg-black transition-colors" />
                          <p className="text-[15px] font-light text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors italic line-clamp-2">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <div className="mt-auto p-10 pt-0">
                    <Button variant="ghost" className="w-full justify-start px-0 text-xs font-semibold tracking-widest text-gray-400 uppercase group-hover:text-black hover:bg-transparent">
                      Explore Chapter
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Chapters Pagination */}
          {totalChapterPages > 1 && (
            <div className="mt-40 flex items-center justify-between border-t border-gray-100 pt-16 font-bold text-gray-400">
              <div className="text-[10px] uppercase tracking-[0.3em]">
                Page {chapterPage + 1} / {totalChapterPages}
              </div>
              <div className="flex gap-6">
                <Button 
                  variant="outline" 
                   className="rounded-[2.5rem] px-12 py-8 font-bold tracking-[0.2em] uppercase text-[10px] border-none bg-gray-50 hover:bg-black hover:text-white transition-all shadow-sm"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                   className="rounded-[2.5rem] px-12 py-8 font-bold tracking-[0.2em] uppercase text-[10px] border-none bg-gray-50 hover:bg-black hover:text-white transition-all shadow-sm"
                  disabled={chapterPage >= totalChapterPages - 1} 
                  onClick={() => setChapterPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
