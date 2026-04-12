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
  Crown,
  ShieldCheck,
  Swords,
  Library,
  Brain,
  Compass,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const SECOND_SAMUEL_IMAGES = {
  hero: "/images/book-study-hubs-hero.jpg",
  throne: "/images/books/2-samuel.png",
  covenant: "/images/books/2-samuel.png",
  conflict: "/images/books/2-samuel.png",
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
    title: "News from Gilboa",
    tag: "David Mourns",
    accent: "bg-slate-600",
    tagClass: "text-slate-600/70",
    points: [
      "Saul and Jonathan fall in battle",
      "David laments with deep honor",
      "The song of the bow is remembered",
    ],
  },
  2: {
    title: "A Divided Kingdom",
    tag: "Hebron and Mahanaim",
    accent: "bg-indigo-500",
    tagClass: "text-indigo-600/70",
    points: [
      "David is anointed in Hebron",
      "Ish-bosheth rules the north",
      "Conflict rises between two houses",
    ],
  },
  3: {
    title: "House of Saul Weakens",
    tag: "Abner's Turn",
    accent: "bg-indigo-500",
    tagClass: "text-indigo-600/70",
    points: [
      "War continues between factions",
      "Abner defects toward David",
      "Joab kills Abner at Hebron",
    ],
  },
  4: {
    title: "The End of Ish-bosheth",
    tag: "Justice at the Gate",
    accent: "bg-indigo-500",
    tagClass: "text-indigo-600/70",
    points: [
      "Ish-bosheth is assassinated",
      "Murderers seek reward from David",
      "David executes the guilty men",
    ],
  },
  5: {
    title: "King over All Israel",
    tag: "Jerusalem Captured",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "All tribes anoint David king",
      "Jerusalem becomes the royal city",
      "Philistines are defeated decisively",
    ],
  },
  6: {
    title: "The Ark in Jerusalem",
    tag: "Joy and Reverence",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Uzzah dies touching the ark",
      "David later brings the ark with worship",
      "Michal despises David's celebration",
    ],
  },
  7: {
    title: "The Davidic Covenant",
    tag: "An Eternal Promise",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "David plans a house for God",
      "God promises David an enduring house",
      "David responds with humble prayer",
    ],
  },
  8: {
    title: "Kingdom Expansion",
    tag: "Victories and Order",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "David subdues neighboring enemies",
      "Tribute and peace secure the realm",
      "Justice and righteousness define his reign",
    ],
  },
  9: {
    title: "Kindness to Mephibosheth",
    tag: "Covenant Mercy",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "David seeks descendants of Saul",
      "Mephibosheth is restored and honored",
      "He eats continually at the king's table",
    ],
  },
  10: {
    title: "War with Ammon and Aram",
    tag: "Dishonor and Defense",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "David's envoys are humiliated",
      "Israel confronts a coalition army",
      "Joab and Abishai secure victory",
    ],
  },
  11: {
    title: "David and Bathsheba",
    tag: "A King Falls",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "David commits adultery with Bathsheba",
      "Uriah is arranged to die in battle",
      "The king's hidden sin grows public",
    ],
  },
  12: {
    title: "Nathan's Confrontation",
    tag: "Repentance and Consequence",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Nathan exposes David through a parable",
      "David confesses: I have sinned",
      "Judgment comes, then Solomon is born",
    ],
  },
  13: {
    title: "Amnon and Tamar",
    tag: "Violence in the House",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Amnon violates Tamar",
      "Absalom harbors vengeance",
      "Amnon is murdered at a feast",
    ],
  },
  14: {
    title: "Absalom Returns",
    tag: "Unresolved Fracture",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Joab uses a wise woman's appeal",
      "Absalom returns but remains estranged",
      "The family tension remains unresolved",
    ],
  },
  15: {
    title: "Absalom's Rebellion",
    tag: "David Flees Jerusalem",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Absalom wins the people's hearts",
      "He declares himself king in Hebron",
      "David escapes with loyal companions",
    ],
  },
  16: {
    title: "Humiliation and Counsel",
    tag: "Crisis Deepens",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Ziba's report alters perceptions",
      "Shimei curses David on the road",
      "Ahithophel advises Absalom",
    ],
  },
  17: {
    title: "Competing Strategies",
    tag: "Hushai Prevails",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Ahithophel urges immediate attack",
      "Hushai delays Absalom's response",
      "David prepares for coming battle",
    ],
  },
  18: {
    title: "Absalom Falls",
    tag: "Victory with Grief",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Israel and David's men clash",
      "Joab kills Absalom in the forest",
      "David mourns: O my son Absalom",
    ],
  },
  19: {
    title: "The King's Return",
    tag: "Restoring Unity",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "David is urged to encourage his troops",
      "Judah welcomes the king back",
      "Old disputes are managed with mercy",
    ],
  },
  20: {
    title: "Sheba's Revolt",
    tag: "One More Uprising",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "Sheba leads a fresh rebellion",
      "Joab pursues through northern towns",
      "A wise woman saves her city",
    ],
  },
  21: {
    title: "Famine and Justice",
    tag: "National Reckoning",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "A famine exposes Saul's bloodguilt",
      "Justice is sought for the Gibeonites",
      "Philistine giants are defeated again",
    ],
  },
  22: {
    title: "David's Song",
    tag: "The Lord My Rock",
    accent: "bg-teal-500",
    tagClass: "text-teal-600/70",
    points: [
      "David sings of God's deliverance",
      "Strength and rescue are celebrated",
      "The king testifies to divine faithfulness",
    ],
  },
  23: {
    title: "Last Words and Mighty Men",
    tag: "Legacy of Leadership",
    accent: "bg-teal-500",
    tagClass: "text-teal-600/70",
    points: [
      "David's final oracle is recorded",
      "The mighty men are honored",
      "Courage and loyalty shape remembrance",
    ],
  },
  24: {
    title: "Census and Altar",
    tag: "Mercy at Araunah's Threshing Floor",
    accent: "bg-teal-500",
    tagClass: "text-teal-600/70",
    points: [
      "David orders a census and repents",
      "A plague strikes the nation",
      "An altar is raised and judgment stops",
    ],
  },
};

export default function SecondSamuelHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 24 }, (_, i) => i + 1);
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
        title="2 Samuel Quiz Hub | Kingdom, Covenant, and Conflict"
        description="Explore 2 Samuel through chapter-based study and interactive quizzes. Follow David's rise, covenant promises, failures, and legacy."
        url="/bible-questions-and-answers-hub/2-samuel"
      />
      <Navigation />

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={SECOND_SAMUEL_IMAGES.hero}
            alt="The Book of 2 Samuel"
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Crown className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Historical Books</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            2 Samuel <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/75 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "Your house and your kingdom will endure forever before me."
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
          <span className="text-black font-semibold">2 Samuel</span>
        </div>

        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Kingship and Covenant
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">The Rise and Testing of David</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                Second Samuel traces David's reign from triumph to turmoil. We witness Jerusalem established, a covenant promise given, and then deep fractures caused by sin and rebellion. Yet the book also reveals God's persistent mercy and His commitment to redemptive purposes through imperfect leaders.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "I will establish the throne of his kingdom forever."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">- 2 Samuel 7:13</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={SECOND_SAMUEL_IMAGES.throne}
                alt="2 Samuel royal narrative"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-amber-500/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Theme</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif">Promise, Power, and Repentance</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-500/10 blur-[120px] rounded-full -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Core</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Crown className="w-8 h-8 text-amber-300" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Covenant Kingship</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Chapter 7 anchors the book with God's covenant to David. The promise of an enduring house reshapes Israel's hope and points beyond immediate politics toward a long-range messianic horizon.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Swords className="w-8 h-8 text-sky-300" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Sin, Judgment, and Mercy</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    David's moral collapse and its aftermath show the devastating reach of sin. At the same time, confession, discipline, and restored worship reveal a God who is holy yet merciful toward the repentant.
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
              Master the covenant narrative, political shifts, and chapter-level details.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                level: "Beginner",
                desc: "Learn the major storyline from David's reign to his final years.",
                icon: BookOpen,
                color: "bg-amber-50",
                iconColor: "text-amber-600",
                link: "beginner",
                accent: "bg-amber-500",
                features: ["Key events", "Main characters", "Core chapter flow"],
              },
              {
                level: "Intermediate",
                desc: "Explore covenant themes, royal decisions, and family conflicts.",
                icon: Brain,
                color: "bg-sky-50",
                iconColor: "text-sky-600",
                link: "intermediate",
                accent: "bg-sky-500",
                features: ["Davidic covenant", "Absalom's rebellion", "Prophetic confrontation"],
              },
              {
                level: "Advanced",
                desc: "Tackle fine details, historical context, and theological threads.",
                icon: Compass,
                color: "bg-purple-50",
                iconColor: "text-purple-600",
                link: "advanced",
                accent: "bg-purple-500",
                features: ["Chapter precision", "Political chronology", "Poetic sections"],
              },
            ].map((d) => (
              <Card
                key={d.level}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                onClick={() => navigate(`/bible-questions-and-answers-hub/2-samuel/${d.link}`)}
              >
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">2 Samuel Track</CardDescription>
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
                src={SECOND_SAMUEL_IMAGES.covenant}
                alt="2 Samuel covenant"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Covenant Center
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                From Throne to Promise
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                As David secures Jerusalem and brings the ark near, the story reaches its theological summit in God's covenant promise. This section establishes the framework for Israel's royal hope and gives the book its enduring spiritual significance.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-amber-50/40 rounded-[2.5rem] border border-amber-100/50 hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50 text-amber-600">
                  <Crown className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "I will be his father, and he will be my son."
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">- 2 Samuel 7:14</p>
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
                Fracture and Mercy
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                Sin, Sword, and Restoration
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                The second half of the book exposes the heavy fallout of sin across family and nation. Even so, repentance, prophetic truth, and restored worship frame the final chapters with hope. The narrative remains sobering, yet saturated with divine patience.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-sky-50/40 rounded-[2.5rem] border border-sky-100/50 hover:bg-sky-50 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200/50 text-sky-600">
                  <Swords className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "The Lord has taken away your sin."
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">- 2 Samuel 12:13</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={SECOND_SAMUEL_IMAGES.conflict}
                alt="2 Samuel conflict and restoration"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
          </div>
        </section>

        <section id="second-samuel-chapter-wise" className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white p-12 md:p-20">
              <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
              <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors" />

              <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 mb-4">
                  <Library className="w-5 h-5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Chapter Wise Study</span>
                </div>

                <h3 className="text-6xl md:text-8xl font-normal text-slate-900 tracking-tighter uppercase leading-[0.9] italic serif">
                  The Story of <span className="text-amber-600 italic">2 Samuel</span>
                </h3>

                <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Navigate all 24 chapters from coronation to closing songs and altar.
                </p>

                <div className="flex justify-center max-w-xl mx-auto pt-8">
                  <div className="relative w-full group/search">
                    <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-300 w-8 h-8 group-focus-within/search:text-amber-500 transition-colors" strokeWidth={1} />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for a chapter or theme..."
                      className="pl-24 pr-12 py-12 text-2xl font-light border-slate-100 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-[3rem] shadow-inner transition-all duration-700 w-full"
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
                  onClick={() => navigate(`/bible-questions-and-answers-hub/2-samuel/chapter-${ch}`)}
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
