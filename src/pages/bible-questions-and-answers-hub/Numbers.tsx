import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Cinematic assets generated for the Numbers Hub
const NUMBERS_IMAGES = {
  hero: "/images/hubs/numbers/wilderness.png",
  wilderness: "/images/hubs/numbers/wilderness.png",
  spies: "/images/hubs/numbers/spies.png",
  serpent: "/images/hubs/numbers/serpent.png",
};

export default function NumbersHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 36 }, (_, i) => i + 1);
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
    1: ["Census of the fighting men at Sinai", "Total of 603,550 men counted", "Levites exempted from military service"],
    2: ["Arrangement of the tribal camps", "Judah leads on the East side", "Tabernacle positioned in the center"],
    3: ["Duties of the Levite clans", "Redemption of the firstborn", "Nadab and Abihu's death recalled"],
    4: ["Tasks for Kohathites, Gershonites, Merarites", "Transporting holy articles and frames", "Age of service: 30 to 50 years"],
    5: ["Purity of the camp; restitution laws", "Test for an unfaithful wife", "The 'Bitter Water' ritual"],
    6: ["The Nazirite vow and its rules", "Abstinence from wine and grapes", "The famous Priestly Blessing"],
    7: ["Dedication offerings of tribal leaders", "12 days of unique gifts for the altar", "Moses hears God from the Mercy Seat"],
    8: ["Setting up the seven lamps", "Purification and setting apart of Levites", "Retirement age for Levites set at 50"],
  };

  // Detailed bullet points for chapters 9–16
  const chapterPoints9to16: Record<number, string[]> = {
    9: ["Second Passover celebration", "Guidance by the Cloud and Fire", "Provision for travelers and those unclean"],
    10: ["Two silver trumpets for signals", "Setting out from the Desert of Sinai", "Moses' request to Hobab"],
    11: ["Fire at Taberah; Craving for meat", "Appointment of seventy elders", "The quail and the great plague"],
    12: ["Miriam and Aaron speak against Moses", "Moses' humility; Miriam's leprosy", "Seven days of isolation outside camp"],
    13: ["The twelve spies sent to explore Canaan", "The report of a land of milk and honey", "The bad report of giant inhabitants"],
    14: ["The rebellion of the community", "Judgment: 40 years of wandering", "Faith of Joshua and Caleb rewarded"],
    15: ["Laws on offerings and unintentional sins", "The man gathering wood on the Sabbath", "Commands regarding tassels (Tzitzit)"],
    16: ["Rebellion of Korah, Dathan, and Abiram", "The earth swallows the rebels", "The plague stopped by Aaron's incense"],
  };

  // Detailed bullet points for chapters 17–24
  const chapterPoints17to24: Record<number, string[]> = {
    17: ["Aaron's staff sprouts and buds", "Confirmation of the priestly line", "A sign to the rebellious preserved"],
    18: ["Duties and portions for priests and Levites", "The 'Covenant of Salt'", "The tithe of the tithes"],
    19: ["Sacrifice of the red heifer", "Preparation of the water of cleansing", "Purification for touching the dead"],
    20: ["Death of Miriam at Kadesh", "Moses strikes the rock at Meribah", "Death of Aaron on Mount Hor"],
    21: ["Victory over Arad; The Bronze Serpent", "Defeat of Sihon king of the Amorites", "Defeat of Og king of Bashan"],
    22: ["Balak sends for Balaam", "Balaam's donkey speaks", "The Angel with a drawn sword"],
    23: ["Balaam's first and second oracles", "Blessing instead of cursing", "The 'God is not a human' declaration"],
    24: ["Balaam's third and fourth oracles", "Prophecy of the Star and Scepter", "Balak's anger and dismissal of Balaam"],
  };

  // Detailed bullet points for chapters 25–32
  const chapterPoints25to32: Record<number, string[]> = {
    25: ["Sin at Peor with Moabite women", "Phinehas' zeal stops the plague", "Midianites declared enemies"],
    26: ["The second census at Moab", "Total of 601,730 fighting men", "Preparation for land division"],
    27: ["Request of Zelophehad's daughters", "Moses views the land from Abarim", "Joshua appointed to succeed Moses"],
    28: ["Laws of daily and Sabbath offerings", "Monthly offerings and Passover rules", "Feast of Weeks sacrifices"],
    29: ["Feast of Trumpets and Day of Atonement", "7-day Festival of Tabernacles offerings", "The 70 bulls of the festival"],
    30: ["Laws concerning vows of men and women", "Nullification and confirmation of vows", "Binding nature of oaths"],
    31: ["The war of vengeance against Midian", "Death of Balaam; The plunder taken", "Purification and allocation of spoil"],
    32: ["Reuben, Gad, and Manasseh's request", "Settling East of the Jordan", "The promise to fight with their brothers"],
  };

  // Detailed bullet points for chapters 33–36
  const chapterPoints33to36: Record<number, string[]> = {
    33: ["Summary of the stages of the journey", "Command to drive out all inhabitants", "Warning about remaining idols"],
    34: ["The boundaries of the Promised Land", "Leaders appointed for land division", "Defining the 9.5 tribal portions"],
    35: ["Forty-eight towns for the Levites", "Six Cities of Refuge for manslayers", "Laws on murder and manslaughter"],
    36: ["Marriage rules for female heirs", "Keeping inheritance within the tribe", "Conclusion of the wilderness laws"],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Numbers Quiz Hub | The Wilderness Journey Study Guide"
        description="Explore the Book of Numbers through 36 chapters and multi-difficulty quizzes. From the census at Sinai to the plains of Moab."
        url="/bible-questions-and-answers-hub/numbers"
      />
      <Navigation />

      {/* Modern Hero Section with Cinematic Background */}
      <section className="relative min-h-[68vh] sm:min-h-[75vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 text-white">
          <img 
            src={NUMBERS_IMAGES.wilderness} 
            alt="Numbers Wilderness Sinai Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20000ms] hover:scale-110"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-light tracking-widest uppercase text-white tracking-[0.3em]">The Wilderness Trek</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Numbers <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Two censuses, one long journey. From the camp at Sinai to the threshold of the Promised Land.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-5 sm:px-10 py-4 sm:py-8 text-sm sm:text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin Quiz Journey
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all px-5 sm:px-10 py-4 sm:py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Content
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Numbers</span>
        </div>

        {/* Narrative Overview Segment: Intro */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Test of Faith
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">The Report of the Twelve Spies</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Numbers records a journey that should have taken weeks but lasted forty years. It is a profound study of divine patience and human fallibility. From the magnificent arrangements of the tribal camps at Sinai to the rebellions that delayed entry into the Land, every chapter reveals God's faithfulness to a stiff-necked people.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-amber-50/30 border border-amber-100/50 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-amber-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-amber-900/60 leading-relaxed">
                    "The Lord is slow to anger, abounding in love and forgiving sin..."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-amber-400 uppercase">— Numbers 14:18</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-amber-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={NUMBERS_IMAGES.spies} 
                alt="The Twelve Spies of Numbers" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 text-white">Narrative Peak</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic">The Failure at Kadesh Barnea & The Forty-Year Sentence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section */}
        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-orange-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16 px-2">Theological Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Layers className="w-8 h-8 text-amber-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">God's Faithfulness Amidst Unbelief</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Despite the failure of the first generation at the border of Canaan, God's promise to Abraham remained unshakeable. Numbers transitions from the old generation that died in the wilderness to a new generation prepared for conquest, showcasing that God's plans aren't hindered by man's delay.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-orange-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">Shadows of the Messiah</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    The bronze serpent in Chapter 21, which Jesus Himself referenced in John 3:14, and Balaam's prophecy of the 'Star out of Jacob' (Numbers 24:17) are powerful Messianic markers, pointing users toward the coming Savior who heals from the poison of sin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Difficulty Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif tracking-tight">Master Numbers</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed uppercase tracking-widest text-[0.45em]">Academic Tracks</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the basics: the census, the 12 spies, and the bronze serpent.", 
                icon: BookOpen, 
                color: "bg-blue-50", 
                iconColor: "text-blue-600",
                link: "beginner",
                accent: "bg-blue-500",
                features: ["Story-driven questions", "Key characters", "Thematic basics"]
              },
              { 
                level: "Intermediate", 
                desc: "Deep dive into special laws, the rebellion of Korah, and Aaron's staff.", 
                icon: Brain, 
                color: "bg-purple-50", 
                iconColor: "text-purple-600",
                link: "intermediate",
                accent: "bg-purple-500",
                features: ["Wilderness miracles", "Internal conflicts", "Priestly duties"]
              },
              { 
                level: "Advanced", 
                desc: "Master the complex geography, genealogy, and Balaam's oracles.", 
                icon: Swords, 
                color: "bg-slate-50", 
                iconColor: "text-slate-600",
                link: "advanced",
                accent: "bg-slate-500",
                features: ["Detailed demographics", "Prophetic imagery", "Tribal boundaries"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/numbers/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
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

        {/* Narrative Flow: The Serpent of Brazen Hope */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={NUMBERS_IMAGES.serpent} 
                alt="Bronze Serpent of Numbers" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Judgment & Healing
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif">The Serpent in the Desert</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif opacity-80">
                When the people complained once more, God sent venomous snakes into the camp. But in His mercy, He provided a way of escape: a bronze serpent lifted high for all to see. It stands as one of the most powerful shadows of Christ in the Old Testament.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-slate-50/40 rounded-[2.5rem] border border-slate-100/50 hover:bg-slate-50 transition-colors">
                <div className="w-16 h-16 bg-slate-200 rounded-3xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-7 h-7 text-slate-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"Just as Moses lifted up the snake in the wilderness..."</p>
                  <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">— John 3:14</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Wise Grid with Pagination */}
        <section id="numbers-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-normal text-gray-900 mb-6 italic serif tracking-tight tracking-tighter">The Library of the Desert</h2>
              <p className="text-2xl font-light text-gray-400 leading-relaxed">Detailed analysis and interactive quizzes for every single chapter of Numbers.</p>
            </div>
            <div className="w-full lg:w-[450px]">
              <div className="relative group font-urbanist not-italic">
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-300 w-6 h-6" strokeWidth={1} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to Chapter (1-36)..."
                  className="pl-20 pr-10 py-10 text-xl font-light border-0 bg-gray-50/50 focus:bg-white focus:ring-0 rounded-[2rem] shadow-inner transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-urbanist not-italic">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints1to8[ch];
              else if (ch >= 9 && ch <= 16) currentChapterPoints = chapterPoints9to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 32) currentChapterPoints = chapterPoints25to32[ch];
              else if (ch >= 33 && ch <= 36) currentChapterPoints = chapterPoints33to36[ch];

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-gray-200/20 rounded-[2.5rem] overflow-hidden p-2" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/numbers/chapter-${ch}`)}
                >
                  <CardHeader className="p-10 pb-6">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-sm font-bold text-gray-300 tracking-[0.2em] group-hover:text-black transition-colors uppercase">CH. {ch}</div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 mb-6 italic serif line-clamp-1 italic text-[1.4rem]">Narrative Insight</CardTitle>
                    <div className="space-y-4">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2 shrink-0 group-hover:bg-amber-400 transition-colors" />
                          <p className="text-[0.95rem] font-light text-gray-500 leading-relaxed group-hover:text-gray-900 transition-colors uppercase tracking-widest text-[0.45rem]">{pt}</p>
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
                   className="rounded-2xl px-8 py-6 font-light tracking-widest uppercase text-xs border-gray-100"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-2xl px-8 py-6 font-light tracking-widest uppercase text-xs border-gray-100"
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