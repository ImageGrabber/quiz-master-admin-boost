import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users, Flame, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Cinematic assets generated for the Leviticus Hub
const LEVITICUS_IMAGES = {
  hero: "/images/hubs/leviticus/hero.png",
  priesthood: "/images/hubs/leviticus/priesthood.png",
  sacrifices: "/images/hubs/leviticus/sacrifices.png",
  feasts: "/images/hubs/leviticus/feasts.png",
  holiness: "/images/hubs/leviticus/holiness.png",
};

export default function LeviticusHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 27 }, (_, i) => i + 1);
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

  // Detailed bullet points for chapters 1–8
  const chapterPoints1to8: Record<number, string[]> = {
    1: ["Burnt Offerings: Voluntary acts of worship", "Unblemished males of herd or flock", "Completely consumed by fire"],
    2: ["Grain Offerings: Fine flour and oil", "Seasoned with salt; no leaven", "Memorial portion for the Lord"],
    3: ["Peace Offerings: Fellowship with God", "Animal's fat offered on the altar", "Shared meal for priest and offerer"],
    4: ["Sin Offerings: Atonement for mistakes", "Specific rituals for priests & leaders", "Blood sprinkled before the veil"],
    5: ["Guilt Offerings: Repaying holy debts", "Restitution plus one-fifth penalty", "Atonement for social wrongs"],
    6: ["Priestly Duties: Maintaining the flame", "The perpetual fire of the altar", "Disposal of sacrificial ashes"],
    7: ["The Priestly Portions: Sacred shares", "Laws of wave and heave offerings", "Purity required to eat holy food"],
    8: ["The Ordination: Seven days of service", "Aaron and sons washed and robed", "The ram of consecration blood"],
  };

  // Detailed bullet points for chapters 9–16
  const chapterPoints9to16: Record<number, string[]> = {
    9: ["The First Ministry: Fire from heaven", "Aaron blesses the congregation", "The Glory of the Lord appears"],
    10: ["Unauthorized Fire: Nadab and Abihu", "Tragedy of strange fire sacrifice", "Laws for grieving for the priests"],
    11: ["Dietary Holiness: Clean and unclean", "Distinguishing land/sea/air life", "Call to be holy as God is holy"],
    12: ["Motherhood Laws: Rites after birth", "Purification times for sons/daughters", "Offering of turtledoves or pigeons"],
    13: ["Diagnosis: Infectious skin diseases", "Priestly inspection and quarantine", "Rules for identifying true leprosy"],
    14: ["Restoration: Cleansing the leper", "The ritual of two clean birds", "Inspecting the holy plague in houses"],
    15: ["Ceremonial Purity: Bodily discharges", "Maintaining sanctity in daily life", "The requirement of washing and water"],
    16: ["Yom Kippur: The Day of Atonement", "Entering the Most Holy Place", "The Scapegoat for Israel's sins"],
  };

  // Detailed bullet points for chapters 17–24
  const chapterPoints17to24: Record<number, string[]> = {
    17: ["The Sanctuary: Centralized sacrifice", "Sanctity of the blood of the animal", "Forbidden acts of eating blood"],
    18: ["Moral Standards: Forbidden relations", "Rejecting the customs of Egypt/Canaan", "Laws of sexual integrity/holiness"],
    19: ["The Heart of the Law: Neighborly love", "Honoring parents/elderly; social justice", "'Love your neighbor as yourself'"],
    20: ["The Penalties: Guarding the covenant", "Capital punishment for spiritism/idolatry", "Maintaining separation from nations"],
    21: ["High Priesthood: Standards of purity", "Rules for mourning and marriage", "Physical requirements for the altar"],
    22: ["Sacrificial Perfection: Holy food", "Only unblemished animals accepted", "Purity rules for those eating offerings"],
    23: ["Appointed Feasts: The Sacred Seven", "From Sabbath to Feast of Booths", "The rhythm of the holy calendar"],
    24: ["Sanctuary Light: Oil and Showbread", "The perpetual lamp in the Tabernacle", "Judgment of the blasphemer"],
  };

  // Detailed bullet points for chapters 25–27
  const chapterPoints25to27: Record<number, string[]> = {
    25: ["Sabbath & Jubilee: Radical rest", "Release of debts; return of land", "Redemption of the poor and the slave"],
    26: ["Blessings & Curses: Divine promises", "Rewards for walking in God's statutes", "Sevenfold correction for rebellion"],
    27: ["Vows & Tithes: Sacred dedications", "Valuations of people and animals", "Redeeming what is devoted to God"],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Leviticus Hub | Biblical Holiness & Purity training"
        description="Master the book of Leviticus with cinematic training modules, 27 detailed chapter quizzes, and deep narratives on the holiness of God."
        url="/bible-questions-and-answers-hub/leviticus"
      />
      <Navigation />

      {/* Modern Hero Section with Cinematic Background */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 text-white">
          <img 
            src={LEVITICUS_IMAGES.hero} 
            alt="Leviticus Sanctuary Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20s] hover:scale-110"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-light tracking-widest uppercase">The School of Holiness</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Leviticus <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Uncover the profound rituals, moral codes, and the eternal standard of holiness that bridges the gap between God and man.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-8 text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => navigate("/quiz/leviticus-1-27")}>
              Begin Full Journey
            </Button>
            <Button size="lg" variant="outline" className="border-black/20 text-black hover:bg-black hover:text-white hover:border-black backdrop-blur-sm px-10 py-8 text-lg rounded-2xl font-light transition-all active:scale-95" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Chapters
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb - Clean & Minimal */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Leviticus</span>
        </div>

        {/* Narrative Overview Segment: Intro */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Way of Holiness
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900">A Divine Revelation of Purity and Devotion</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Leviticus provides the essential vocabulary for dwelling with a Holy God. Through the systems of burnt, grain, peace, sin, and guilt offerings, we discover the weight of transgression and the pathway of restoration in the presence of the Almighty.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "You shall be holy, for I the LORD your God am holy."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Leviticus 19:2</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={LEVITICUS_IMAGES.priesthood} 
                alt="High Priest in garments" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Calling</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black">Mediation through the Priesthood & Sacred Distinction</p>
              </div>
            </div>
          </div>
        </section>

         {/* Theological Insight Section - High End Dark Mode Card */}
         <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-red-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Flame className="w-8 h-8 text-yellow-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">The Way of Sacrifice</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Leviticus reveals that a holy God cannot simply ignore sin. Atonement by blood is the only way for biological life to exist in the presence of Uncreated Light. Every sacrifice points forward to the ultimate Lamb who would take away the sins of the world.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Heart className="w-8 h-8 text-red-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">The Walk of Purity</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Holiness isn't just about ritual; it's about a lifestyle of devotion. Leviticus provides the "Holiness Code," transforming how a people eats, works, loves, and treats the poor. It defines the lifestyle of a redeemed community set apart for God's purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Difficulty Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24">
          <div className="text-center mb-20 text-white">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase">The School of Wisdom</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">Choose your study depth and test your grasp of God's holy standard.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the five major offerings and the rules for clean animals.", 
                icon: BookOpen, 
                color: "bg-green-50", 
                iconColor: "text-green-600",
                link: "beginner",
                accent: "bg-green-500",
                features: ["Ritual basics", "Sacred food laws", "Major feasts"]
              },
              { 
                level: "Intermediate", 
                desc: "Study the ordination of priests and the laws of infectious diseases.", 
                icon: Brain, 
                color: "bg-yellow-50", 
                iconColor: "text-yellow-600",
                link: "intermediate",
                accent: "bg-yellow-500",
                features: ["Priestly ministry", "Purity rituals", "Yom Kippur"]
              },
              { 
                level: "Advanced", 
                desc: "Master the complexities of the Jubilee, vows, and the Holiness Code.", 
                icon: Swords, 
                color: "bg-red-50", 
                iconColor: "text-red-600",
                link: "advanced",
                accent: "bg-red-500",
                features: ["Jubilee laws", "Theological shadows", "Vow valuations"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/leviticus/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Leviticus Study Track</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between">
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

        {/* Narrative Flow: Sacred Rhythms */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center text-white">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-6 bg-yellow-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={LEVITICUS_IMAGES.feasts} 
                alt="Sacred Feasts gathering" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Sacred Calendar
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase">The Sacred Rhythms of a Holy Nation</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic">
                From the weekly Sabbath to the once-in-a-lifetime Jubilee, God established a rhythm for Israel. Through seven annual festivals, the community was called to remember their redemption, celebrate God's bounty, and rest in His provision. This sacred timing kept their hearts aligned with the Holy One.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-yellow-50/40 rounded-[2.5rem] border border-yellow-100/50 hover:bg-yellow-50 transition-colors">
                <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-yellow-200/50">
                  <Compass className="w-7 h-7 text-yellow-600 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"These are the appointed feasts of the LORD..."</p>
                  <p className="text-xs font-semibold tracking-widest text-yellow-500 uppercase">— Leviticus 23:2</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Hubs Section */}
        <section className="mb-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 text-white">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Specialized Hubs</h2>
              <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Targeted Training</h3>
              <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Refine your understanding through targeted narrative and logic tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Fill in the Blanks", 
                  desc: "Master the exact language of sacrifice", 
                  icon: Quote, 
                  link: "fill-in-the-blanks",
                  color: "bg-amber-50",
                  iconColor: "text-amber-600"
                },
                { 
                  title: "True or False", 
                  desc: "Quick logic for Clean vs Unclean", 
                  icon: ShieldCheck, 
                  link: "true-false",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600"
                },
                { 
                  title: "Consecration", 
                  desc: "Aaron, Nadab, and High Priests", 
                  icon: Users, 
                  link: "characters",
                  color: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                },
                { 
                  title: "Festival Match", 
                  desc: "Aligning the Sacred Feasts", 
                  icon: ListOrdered, 
                  link: "match-the-following",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((tool) => (
                <Card 
                  key={tool.title}
                  className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none bg-white rounded-[2rem] overflow-hidden"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/leviticus/${tool.link}`)}
                >
                  <CardHeader className="pt-12 pb-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8`}>
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

        {/* Integrated Search & Chapter Wisdom */}
        <section id="leviticus-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 text-black">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase leading-none tracking-tight">The Library of Holiness</h2>
              <p className="text-2xl font-light text-gray-400 leading-relaxed italic">Explore unique study materials and summaries for each of the 27 chapters.</p>
            </div>
            {/* Search Bar */}
            <div className="w-full lg:w-[450px]">
              <div className="relative group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/0 group-focus-within:bg-black/10 transition-colors" />
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-300 w-6 h-6" strokeWidth={1} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chapter # or keyword (e.g. '19' or 'Love')..."
                  className="pl-20 pr-10 py-10 text-xl font-light border-0 bg-gray-50/50 focus:bg-white focus:ring-0 rounded-[2rem] shadow-inner transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints1to8[ch];
              else if (ch >= 9 && ch <= 16) currentChapterPoints = chapterPoints9to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 27) currentChapterPoints = chapterPoints25to27[ch];

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-gray-200/20 rounded-[2.5rem] overflow-hidden p-2" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/leviticus/chapter-${ch}`)}
                >
                  <CardHeader className="p-10 pb-6 text-black italic">
                    <div className="flex items-center justify-between mb-8 opacity-40">
                      <div className="text-sm font-bold text-gray-300 tracking-[0.2em] group-hover:text-black transition-colors">CHAPTER {ch}</div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 mb-6 italic serif line-clamp-1">Narrative Summary</CardTitle>
                    <div className="space-y-4">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0 group-hover:bg-black transition-colors" />
                          <p className="text-sm font-light text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors">{pt}</p>
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
            <div className="mt-32 flex items-center justify-between border-t border-gray-100 pt-12">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">
                Page {chapterPage + 1} of {totalChapterPages}
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 font-light tracking-widest uppercase text-xs shadow-inner"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 font-light tracking-widest uppercase text-xs"
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