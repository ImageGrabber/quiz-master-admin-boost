import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronRight,
  Search,
  Quote,
  Crown,
  ShieldCheck,
  Flame,
  Library,
  Brain,
  Compass,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { bibleStructure } from "@/data/bible-structure";
import { bookNames } from "@/data/bible-data";
import { bibleData } from "@/data/bibleData";
import bibleBooksDetail from "@/data/bible-books-detail.json";

interface BookMetadata {
  author: string;
  date: string;
  genre: string;
  themes: string;
  chapters: number;
}

interface BibleBookDetail {
  title: string;
  subtitle: string;
  metadata: BookMetadata;
  fullOverview: string;
  biblicalMeaning: string;
  lifeLesson: string;
  keyVerses: { ref: string; text: string }[];
}

const THEMES = [
  {
    accent: "bg-amber-500",
    soft: "bg-amber-50",
    icon: "text-amber-600",
    text: "text-amber-600/70",
    glowA: "bg-amber-500/10",
    glowB: "bg-sky-500/10",
    ring: "focus:ring-amber-500/20",
  },
  {
    accent: "bg-sky-500",
    soft: "bg-sky-50",
    icon: "text-sky-600",
    text: "text-sky-600/70",
    glowA: "bg-sky-500/10",
    glowB: "bg-indigo-500/10",
    ring: "focus:ring-sky-500/20",
  },
  {
    accent: "bg-emerald-500",
    soft: "bg-emerald-50",
    icon: "text-emerald-600",
    text: "text-emerald-600/70",
    glowA: "bg-emerald-500/10",
    glowB: "bg-teal-500/10",
    ring: "focus:ring-emerald-500/20",
  },
  {
    accent: "bg-rose-500",
    soft: "bg-rose-50",
    icon: "text-rose-600",
    text: "text-rose-600/70",
    glowA: "bg-rose-500/10",
    glowB: "bg-orange-500/10",
    ring: "focus:ring-rose-500/20",
  },
  {
    accent: "bg-purple-500",
    soft: "bg-purple-50",
    icon: "text-purple-600",
    text: "text-purple-600/70",
    glowA: "bg-purple-500/10",
    glowB: "bg-fuchsia-500/10",
    ring: "focus:ring-purple-500/20",
  },
];

const chapterBandLabel = (ch: number, total: number) => {
  if (total <= 4) return `Chapter Focus`;
  const quarter = Math.ceil((ch / total) * 4);
  if (quarter === 1) return "Opening Movement";
  if (quarter === 2) return "Middle Arc";
  if (quarter === 3) return "Turning Point";
  return "Closing Movement";
};

const shorten = (value: string, max = 78) => {
  const text = value.trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}...`;
};

const fallbackBullets = (bookName: string, chapter: number) => [
  `Key people and events in ${bookName} ${chapter}`,
  `Main theological insights from chapter ${chapter}`,
  `How this chapter connects to the wider biblical storyline`,
];

export default function AllBooksCinematicHub() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const normalizedSlug = (bookSlug || "").toLowerCase();
  const chapterCount = (bibleStructure as Record<string, number>)[normalizedSlug] || 0;

  const bookName = useMemo(() => {
    if (!normalizedSlug) return "Bible Book";
    return (
      bookNames[normalizedSlug] ||
      normalizedSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [normalizedSlug]);

  const detail = useMemo(() => {
    return (bibleBooksDetail as Record<string, BibleBookDetail>)[normalizedSlug] || null;
  }, [normalizedSlug]);

  const allSlugs = useMemo(() => Object.keys(bibleStructure), []);
  const theme = useMemo(() => {
    const index = Math.max(0, allSlugs.indexOf(normalizedSlug));
    return THEMES[index % THEMES.length];
  }, [allSlugs, normalizedSlug]);

  const chapterNumbers = useMemo(
    () => Array.from({ length: chapterCount }, (_, i) => i + 1),
    [chapterCount],
  );

  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;

    const q = query.toLowerCase();
    const qNum = parseInt(q.replace(/[^0-9]/g, ""), 10);

    if (!isNaN(qNum)) {
      return chapterNumbers.filter((n) => String(n).startsWith(String(qNum)));
    }

    const bookContent = (bibleData as Record<string, Record<number, { title?: string; subtitle?: string; description?: string }>>)[normalizedSlug];
    if (!bookContent) return chapterNumbers;

    return chapterNumbers.filter((n) => {
      const c = bookContent[n];
      return (
        c?.title?.toLowerCase().includes(q) ||
        c?.subtitle?.toLowerCase().includes(q) ||
        c?.description?.toLowerCase().includes(q)
      );
    });
  }, [query, chapterNumbers, normalizedSlug]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));

  useEffect(() => {
    setChapterPage(0);
  }, [query]);

  const startIdx = chapterPage * pageSize;
  const visibleChapters = filteredChapters.slice(startIdx, startIdx + pageSize);

  const chapterCards = useMemo(() => {
    const content = (bibleData as Record<string, Record<number, { title?: string; subtitle?: string; description?: string }>>)[normalizedSlug] || {};

    return chapterNumbers.reduce(
      (acc, ch) => {
        const c = content[ch] || {};
        const points = [c.title, c.subtitle, c.description]
          .filter((v): v is string => Boolean(v && v.trim()))
          .map((v) => shorten(v));

        const filled = points.length >= 3 ? points.slice(0, 3) : [...points, ...fallbackBullets(bookName, ch)].slice(0, 3);
        acc[ch] = {
          tag: chapterBandLabel(ch, chapterCount),
          points: filled,
        };
        return acc;
      },
      {} as Record<number, { tag: string; points: string[] }>,
    );
  }, [normalizedSlug, chapterNumbers, bookName, chapterCount]);

  if (!normalizedSlug || chapterCount === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-urbanist flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Book Not Found</h1>
          <p className="text-gray-500 mb-8">No hub found for "{bookSlug}".</p>
          <Button onClick={() => navigate("/bible-questions-and-answers-hub")} className="bg-black hover:bg-gray-800 text-white">
            Back to Bible Hub
          </Button>
        </div>
      </div>
    );
  }

  const quoteText = detail?.keyVerses?.[0]?.text || `Explore the key themes and chapter flow of ${bookName}.`;
  const quoteRef = detail?.keyVerses?.[0]?.ref || `${bookName}`;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO
        title={`${bookName} Quiz Hub | Chapter-Wise Bible Study`}
        description={
          detail?.fullOverview?.slice(0, 160) ||
          `Explore ${bookName} through chapter-wise quizzes, themed study tracks, and interactive learning.`
        }
        url={`/bible-questions-and-answers-hub/${normalizedSlug}`}
      />
      <Navigation />

      <section className="relative min-h-[72vh] sm:min-h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/book-study-hubs-hero.jpg"
            alt={`The Book of ${bookName}`}
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <BookOpen className="w-5 h-5 text-white/90" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Bible Study Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            {bookName} <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/75 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            {detail?.subtitle || `Discover chapter-wise insight, context, and quiz pathways for ${bookName}.`}
          </p>

          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <button
              className="bg-white text-black hover:bg-gray-100 px-6 sm:px-12 py-4 sm:py-6 text-sm sm:text-xl rounded-3xl font-bold shadow-2xl transition-all active:scale-95 group flex items-center"
              onClick={() => document.getElementById("difficulty")?.scrollIntoView({ behavior: "smooth" })}
            >
              Begin Quiz Journey <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all px-6 sm:px-12 py-4 sm:py-6 text-sm sm:text-xl rounded-3xl font-light active:scale-95"
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
          <span className="text-black font-semibold">{bookName}</span>
        </div>

        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Narrative Overview
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">The Story of {bookName}</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                {detail?.fullOverview?.split("\n\n")[0] || `${bookName} invites deep chapter-by-chapter exploration through its themes, characters, and theological movement.`}
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">"{shorten(quoteText, 110)}"</p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">- {quoteRef}</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={`/images/books/${normalizedSlug}.png`}
                alt={`${bookName} artwork`}
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-black/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Theme</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif">
                  {detail?.biblicalMeaning ? shorten(detail.biblicalMeaning, 58) : `Chapter-wise study for ${bookName}`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className={`absolute top-0 right-0 w-1/2 h-full ${theme.glowA} blur-[150px] rounded-full translate-x-1/3`} />
          <div className={`absolute bottom-0 left-0 w-1/3 h-full ${theme.glowB} blur-[120px] rounded-full -translate-x-1/2`} />

          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Core</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Crown className="w-8 h-8 text-white/80" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Meaning and Message</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    {detail?.biblicalMeaning || `${bookName} reveals God's character and covenant purposes through historical movement, human response, and divine faithfulness.`}
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Flame className="w-8 h-8 text-white/80" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Life Application</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    {detail?.lifeLesson || `As you move chapter by chapter through ${bookName}, look for patterns of trust, failure, repentance, and renewal.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="difficulty" className="mb-40 scroll-mt-24 text-center">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase leading-tight font-serif tracking-tighter">
              Choose Your Track
            </h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
              Build mastery in {bookName} with progressive challenge levels.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                level: "Beginner",
                desc: `Learn the core events, characters, and chapter flow of ${bookName}.`,
                icon: BookOpen,
                color: theme.soft,
                iconColor: theme.icon,
                link: "beginner",
                accent: theme.accent,
                features: ["Core storyline", "Key names", "Main turning points"],
              },
              {
                level: "Intermediate",
                desc: `Explore deeper themes, patterns, and theological structure in ${bookName}.`,
                icon: Brain,
                color: "bg-slate-50",
                iconColor: "text-slate-700",
                link: "intermediate",
                accent: "bg-slate-600",
                features: ["Thematic links", "Context cues", "Narrative movement"],
              },
              {
                level: "Advanced",
                desc: `Test chapter-level precision and advanced biblical understanding.`,
                icon: Compass,
                color: "bg-zinc-50",
                iconColor: "text-zinc-700",
                link: "advanced",
                accent: "bg-zinc-700",
                features: ["Fine details", "Cross-book links", "Applied interpretation"],
              },
            ].map((d) => (
              <Card
                key={d.level}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                onClick={() => navigate(`/bible-questions-and-answers-hub/${normalizedSlug}/${d.link}`)}
              >
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">{bookName} Track</CardDescription>
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

        <section id={`${normalizedSlug}-chapter-wise`} className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white p-12 md:p-20">
              <div className={`absolute top-0 left-1/4 w-1/2 h-1/2 ${theme.glowA} blur-[120px] rounded-full pointer-events-none`} />
              <div className={`absolute bottom-0 right-1/4 w-1/2 h-1/2 ${theme.glowB} blur-[120px] rounded-full pointer-events-none`} />

              <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 mb-4">
                  <Library className={`w-5 h-5 ${theme.icon}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Chapter Wise Study</span>
                </div>

                <h3 className="text-4xl sm:text-6xl md:text-8xl font-normal text-slate-900 tracking-tighter uppercase leading-[0.9] italic serif">
                  The Story of <span className="text-slate-900 italic">{bookName}</span>
                </h3>

                <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Study all {chapterCount} chapters with chapter-level insight cards.
                </p>

                <div className="flex justify-center max-w-xl mx-auto pt-8">
                  <div className="relative w-full group/search">
                    <Search className={`absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-300 w-8 h-8 group-focus-within/search:${theme.icon} transition-colors`} strokeWidth={1} />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for a chapter or theme..."
                      className={`pl-24 pr-12 py-12 text-2xl font-light border-slate-100 bg-slate-50/70 focus:bg-white ${theme.ring} rounded-[3rem] shadow-inner transition-all duration-700 w-full`}
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
              const card = chapterCards[ch];

              return (
                <Card
                  key={ch}
                  className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/${normalizedSlug}/chapter-${ch}`)}
                >
                  <div className={`h-2 w-full ${theme.accent} absolute top-0`} />

                  <CardHeader className="pt-16 pb-8 px-10 text-left">
                    <CardTitle className="text-5xl font-normal text-gray-900 italic serif mb-4 tracking-tighter uppercase">Chapter {ch}</CardTitle>
                    <CardDescription className={`text-[10px] font-bold uppercase tracking-[0.3em] ${theme.text}`}>{card.tag}</CardDescription>
                  </CardHeader>

                  <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-700 mb-5">{bookName} {ch}</h4>
                      <div className="space-y-6 mb-12">
                        {card.points.map((pt, idx) => (
                          <div key={idx} className="flex items-start text-xl font-light text-gray-500">
                            <div className={`w-2 h-2 rounded-full ${theme.accent} mr-4 mt-2.5 opacity-40`} />
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
