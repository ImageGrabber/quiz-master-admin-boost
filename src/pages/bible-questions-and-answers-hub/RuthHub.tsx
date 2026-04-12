import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronRight,
  Search,
  Quote,
  Heart,
  Sparkles,
  Crown,
  Compass,
  Library,
  Brain,
  Flower2,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const RUTH_IMAGES = {
  hero: "/images/book-study-hubs-hero.jpg",
  loyalty: "/images/books/ruth.png",
  harvest: "/images/books/ruth.png",
  redemption: "/images/books/ruth.png",
};

const chapterThemes: Record<
  number,
  {
    title: string;
    tag: string;
    accent: string;
    tagClass: string;
    points: string[];
  }
> = {
  1: {
    title: "Loss and Loyalty",
    tag: "Moab to Bethlehem",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Naomi returns in grief from Moab",
      "Ruth pledges covenant loyalty to Naomi",
      "A journey of faith begins in Bethlehem",
    ],
  },
  2: {
    title: "Providence in the Field",
    tag: "Gleaning Grace",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Ruth gleans in the field of Boaz",
      "Boaz protects and provides generously",
      "Naomi sees the first signs of hope",
    ],
  },
  3: {
    title: "Faithful Appeal",
    tag: "Threshing Floor",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Naomi guides Ruth with wise counsel",
      "Ruth asks Boaz to redeem their family line",
      "Boaz responds with integrity and honor",
    ],
  },
  4: {
    title: "Redemption and Legacy",
    tag: "The Gate of Bethlehem",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "Boaz redeems the family inheritance",
      "Ruth and Boaz are blessed in marriage",
      "Obed is born in David's royal line",
    ],
  },
};

export default function RuthHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 4 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");

    if (q) {
      const num = parseInt(q, 10);
      return chapterNumbers.filter((n) => n === num || String(n).startsWith(q));
    }

    return chapterNumbers.filter((n) => {
      const theme = chapterThemes[n];
      return (
        theme.title.toLowerCase().includes(query.toLowerCase()) ||
        theme.tag.toLowerCase().includes(query.toLowerCase()) ||
        theme.points.some((pt) => pt.toLowerCase().includes(query.toLowerCase()))
      );
    });
  }, [query, chapterNumbers]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));

  useEffect(() => {
    setChapterPage(0);
  }, [query]);

  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO
        title="Ruth Quiz Hub | Loyalty and Redemption"
        description="Explore the Book of Ruth through chapter-based study and interactive quiz paths. Learn loyalty, providence, and redemption in four rich chapters."
        url="/bible-questions-and-answers-hub/ruth"
      />
      <Navigation />

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={RUTH_IMAGES.hero}
            alt="The Book of Ruth"
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Flower2 className="w-5 h-5 text-rose-300" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Historical Books</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            Ruth <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/75 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "Where you go I will go, and where you stay I will stay."
          </p>

          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <button
              className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl rounded-3xl font-bold shadow-2xl transition-all active:scale-95 group flex items-center"
              onClick={() => document.getElementById("difficulty")?.scrollIntoView({ behavior: "smooth" })}
            >
              Begin Quiz Journey <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all px-12 py-6 text-xl rounded-3xl font-light active:scale-95"
              onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Content
            </button>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Ruth</span>
        </div>

        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Covenant Loyalty
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">A Story of Faithful Love</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                Ruth is a short but powerful narrative of loss, loyalty, providence, and restoration. In ordinary fields and family decisions, God quietly writes an extraordinary future. This four-chapter book shows that faithful love in hidden places can shape generations.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "Your people will be my people and your God my God."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">- Ruth 1:16</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={RUTH_IMAGES.loyalty}
                alt="Ruth and Naomi"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-rose-500/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Theme</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif">Loyal Love in Action</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-emerald-500/10 blur-[120px] rounded-full -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Core</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Sparkles className="w-8 h-8 text-rose-300" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Hesed in Daily Life</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Ruth highlights steadfast love through practical obedience and sacrificial commitment. The book reveals how covenant love is not abstract theology, but lived fidelity in everyday choices.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Crown className="w-8 h-8 text-emerald-300" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">The Redeemer Motif</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Boaz as kinsman-redeemer points forward to a larger redemptive pattern. Ruth ends with a genealogy that places this family story in the line of King David, linking quiet faithfulness to kingdom history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="difficulty" className="mb-40 scroll-mt-24 text-center">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase leading-tight font-serif tracking-tighter">
              Choose Your Track
            </h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
              Learn the complete arc of Ruth from sorrow to restoration.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                level: "Beginner",
                desc: "Focus on the core storyline, key people, and chapter flow.",
                icon: BookOpen,
                color: "bg-rose-50",
                iconColor: "text-rose-600",
                link: "beginner",
                accent: "bg-rose-500",
                features: ["Naomi and Ruth", "Boaz's kindness", "The final genealogy"],
              },
              {
                level: "Intermediate",
                desc: "Go deeper into covenant loyalty, customs, and redemption themes.",
                icon: Brain,
                color: "bg-amber-50",
                iconColor: "text-amber-600",
                link: "intermediate",
                accent: "bg-amber-500",
                features: ["Gleaning laws", "Kinsman-redeemer role", "Narrative structure"],
              },
              {
                level: "Advanced",
                desc: "Master details, literary patterns, and theological significance.",
                icon: Compass,
                color: "bg-emerald-50",
                iconColor: "text-emerald-600",
                link: "advanced",
                accent: "bg-emerald-500",
                features: ["Hebrew motifs", "Canonical connections", "Davidic line themes"],
              },
            ].map((d) => (
              <Card
                key={d.level}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                onClick={() => navigate(`/bible-questions-and-answers-hub/ruth/${d.link}`)}
              >
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Ruth Track</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10 italic">{d.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {d.features.map((f) => (
                      <li key={f} className="flex items-center text-sm font-light text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${d.accent} mr-3 opacity-50`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full font-bold bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">
                    Start Training
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={RUTH_IMAGES.harvest}
                alt="Ruth in the fields"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Quiet Providence
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                Grace in the Fields
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                In Bethlehem's harvest fields, God works behind the scenes through small acts of mercy. Boaz notices Ruth, honors her faithfulness, and extends protection. The storyline teaches that providence often unfolds through ordinary people who choose generosity and integrity.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-amber-50/40 rounded-[2.5rem] border border-amber-100/50 hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50 text-amber-600">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "May the Lord repay you for what you have done."
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">- Ruth 2:12</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Redemption Fulfilled
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                Boaz at the City Gate
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                Chapter 4 culminates in public redemption, marriage, and restored family heritage. What began as famine and emptiness ends in blessing and legacy. The final genealogy links Ruth's faithfulness to the lineage that leads to David, highlighting God's long-range purposes.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-emerald-50/40 rounded-[2.5rem] border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200/50 text-emerald-600">
                  <Crown className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "The women said to Naomi: Praise be to the Lord..."
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase">- Ruth 4:14</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={RUTH_IMAGES.redemption}
                alt="Redemption in Ruth"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
          </div>
        </section>

        <section id="ruth-chapter-wise" className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white p-12 md:p-20">
              <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-rose-500/10 transition-colors" />
              <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

              <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 mb-4">
                  <Library className="w-5 h-5 text-rose-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Chapter Wise Study</span>
                </div>

                <h3 className="text-6xl md:text-8xl font-normal text-slate-900 tracking-tighter uppercase leading-[0.9] italic serif">
                  The Story of <span className="text-rose-600 italic">Ruth</span>
                </h3>

                <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Walk through each chapter from loyalty to redemption in four focused modules.
                </p>

                <div className="flex justify-center max-w-xl mx-auto pt-8">
                  <div className="relative w-full group/search">
                    <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-300 w-8 h-8 group-focus-within/search:text-rose-500 transition-colors" strokeWidth={1} />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for a chapter or theme..."
                      className="pl-24 pr-12 py-12 text-2xl font-light border-slate-100 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-rose-500/20 rounded-[3rem] shadow-inner transition-all duration-700 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {totalChapterPages > 1 && (
            <div className="mb-12 max-w-7xl mx-auto flex items-center justify-between border-b border-slate-100 pb-12 font-bold text-slate-400">
              <div className="flex items-center gap-4">
                <div className="w-28 h-1 bg-slate-100 rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-slate-900 transition-all duration-700" style={{ width: `${((chapterPage + 1) / totalChapterPages) * 100}%` }} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.3em]">{chapterPage + 1} / {totalChapterPages}</div>
              </div>
              <div className="flex gap-4">
                <button
                  className="rounded-full px-10 py-6 font-bold tracking-[0.2em] uppercase text-[10px] border border-slate-100 bg-white hover:bg-black hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={chapterPage === 0}
                  onClick={() => setChapterPage((p) => p - 1)}
                >
                  Previous
                </button>
                <button
                  className="rounded-full px-10 py-6 font-bold tracking-[0.2em] uppercase text-[10px] border border-slate-100 bg-white hover:bg-black hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={chapterPage >= totalChapterPages - 1}
                  onClick={() => setChapterPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {visibleChapters.map((ch) => {
              const chapter = chapterThemes[ch];

              return (
                <Card
                  key={ch}
                  className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/ruth/chapter-${ch}`)}
                >
                  <div className={`h-2 w-full ${chapter.accent} absolute top-0`} />

                  <CardHeader className="pt-16 pb-8 px-10 text-left">
                    <CardTitle className="text-5xl font-normal text-gray-900 italic serif mb-4 tracking-tighter uppercase">Chapter {ch}</CardTitle>
                    <CardDescription className={`text-[10px] font-bold uppercase tracking-[0.3em] ${chapter.tagClass}`}>{chapter.tag}</CardDescription>
                  </CardHeader>

                  <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-700 mb-5">{chapter.title}</h4>
                      <div className="space-y-6 mb-12">
                        {chapter.points.map((pt, idx) => (
                          <div key={idx} className="flex items-start text-xl font-light text-gray-500">
                            <div className={`w-2 h-2 rounded-full ${chapter.accent} mr-4 mt-2.5 opacity-40`} />
                            <p className="italic leading-relaxed font-serif">{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full font-bold bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">
                      Explore Chapter
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
