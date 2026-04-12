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
  Flame,
  Library,
  Brain,
  Compass,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const FIRST_KINGS_IMAGES = {
  hero: "/images/hubs/1-kings/hero.png",
  temple: "/images/hubs/1-kings/temple.png",
  wisdom: "/images/hubs/1-kings/wisdom.png",
  fire: "/images/hubs/1-kings/fire.png",
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
    title: "The Succession Crisis",
    tag: "Adonijah and the Throne",
    accent: "bg-slate-600",
    tagClass: "text-slate-600/70",
    points: [
      "David's old age exposes political tension",
      "Adonijah exalts himself as king",
      "Nathan and Bathsheba intervene for Solomon",
    ],
  },
  2: {
    title: "Solomon Established",
    tag: "Kingdom Secured",
    accent: "bg-slate-600",
    tagClass: "text-slate-600/70",
    points: [
      "David's final charge to Solomon",
      "Threats to the throne are removed",
      "Solomon's reign is firmly established",
    ],
  },
  3: {
    title: "Wisdom from God",
    tag: "Gibeon and the Two Mothers",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Solomon asks for discernment, not riches",
      "God grants unmatched wisdom",
      "The child judgment reveals royal insight",
    ],
  },
  4: {
    title: "Royal Administration",
    tag: "Peace and Plenty",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Officials and districts are organized",
      "The kingdom flourishes in stability",
      "Solomon's wisdom draws global attention",
    ],
  },
  5: {
    title: "Preparing the Temple",
    tag: "Alliance with Hiram",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Tyrian partnership supplies cedar",
      "Massive labor is mobilized",
      "The temple project formally begins",
    ],
  },
  6: {
    title: "Building the Temple",
    tag: "House for the Lord",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Temple dimensions and design are detailed",
      "Inner sanctuary and sacred furnishings unfold",
      "God's promise ties blessing to obedience",
    ],
  },
  7: {
    title: "Palace and Furnishings",
    tag: "Glory and Craftsmanship",
    accent: "bg-amber-500",
    tagClass: "text-amber-600/70",
    points: [
      "Royal complex is completed",
      "Bronze work by Huram is described",
      "Temple furniture is fully arranged",
    ],
  },
  8: {
    title: "Temple Dedication",
    tag: "Glory Fills the House",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "The ark is brought into the temple",
      "God's glory-cloud fills the sanctuary",
      "Solomon prays for covenant mercy",
    ],
  },
  9: {
    title: "Divine Warning and Works",
    tag: "Promise with Conditions",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "God appears again to Solomon",
      "Faithfulness is required for enduring blessing",
      "Building projects continue across the land",
    ],
  },
  10: {
    title: "The Queen of Sheba",
    tag: "Global Renown",
    accent: "bg-emerald-500",
    tagClass: "text-emerald-600/70",
    points: [
      "Sheba tests Solomon's wisdom",
      "His wealth and splendor are displayed",
      "International admiration reaches its peak",
    ],
  },
  11: {
    title: "Solomon's Decline",
    tag: "Divided Heart",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Foreign marriages pull Solomon toward idols",
      "The kingdom judgment is announced",
      "Jeroboam is marked for future rule",
    ],
  },
  12: {
    title: "Kingdom Divides",
    tag: "Rehoboam and Jeroboam",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Harsh policy fractures national unity",
      "Ten tribes break from David's house",
      "Jeroboam installs rival worship centers",
    ],
  },
  13: {
    title: "The Man of God",
    tag: "Word and Judgment",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Prophecy confronts the altar at Bethel",
      "Jeroboam receives a warning sign",
      "Disobedience brings swift consequence",
    ],
  },
  14: {
    title: "Households Judged",
    tag: "Jeroboam and Rehoboam",
    accent: "bg-rose-500",
    tagClass: "text-rose-600/70",
    points: [
      "Ahijah pronounces judgment on Jeroboam",
      "Rehoboam's Judah slips into unfaithfulness",
      "Foreign pressure rises against Jerusalem",
    ],
  },
  15: {
    title: "A String of Kings",
    tag: "Asa's Reform",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Judah and Israel see rapid transitions",
      "Asa removes idolatrous practices",
      "Regional wars persist along the border",
    ],
  },
  16: {
    title: "Rise of Omri and Ahab",
    tag: "Northern Instability",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Dynasties rise and fall violently",
      "Omri founds Samaria as capital",
      "Ahab's reign deepens covenant apostasy",
    ],
  },
  17: {
    title: "Elijah Appears",
    tag: "Drought and Provision",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Elijah announces drought to Ahab",
      "God sustains him by brook and widow",
      "A dead son is restored to life",
    ],
  },
  18: {
    title: "Mount Carmel",
    tag: "Fire from Heaven",
    accent: "bg-sky-500",
    tagClass: "text-sky-600/70",
    points: [
      "Elijah challenges Baal's prophets",
      "The Lord answers with consuming fire",
      "Rain returns after long drought",
    ],
  },
  19: {
    title: "At Horeb",
    tag: "Still Small Voice",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "Elijah flees under Jezebel's threat",
      "God strengthens him in wilderness",
      "Elisha is called to prophetic service",
    ],
  },
  20: {
    title: "Wars with Aram",
    tag: "Mercy Misused",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "Ahab defeats Ben-Hadad twice",
      "God grants victory despite Ahab",
      "Ahab's compromise invites rebuke",
    ],
  },
  21: {
    title: "Naboth's Vineyard",
    tag: "Abuse of Power",
    accent: "bg-purple-500",
    tagClass: "text-purple-600/70",
    points: [
      "Ahab covets Naboth's inheritance",
      "Jezebel engineers judicial murder",
      "Elijah declares judgment on the house",
    ],
  },
  22: {
    title: "Micaiah's Warning",
    tag: "Final Battles",
    accent: "bg-teal-500",
    tagClass: "text-teal-600/70",
    points: [
      "Ahab rejects true prophetic counsel",
      "Battle at Ramoth-Gilead turns deadly",
      "Ahab dies and prophecy is fulfilled",
    ],
  },
};

export default function FirstKingsHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
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
        title="1 Kings Quiz Hub | Temple, Thrones, and Prophets"
        description="Explore 1 Kings through chapter-based study and interactive quizzes. Follow Solomon's wisdom, the divided kingdom, and Elijah's fire-filled ministry."
        url="/bible-questions-and-answers-hub/1-kings"
      />
      <Navigation />

      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={FIRST_KINGS_IMAGES.hero}
            alt="The Book of 1 Kings"
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
            1 Kings <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/75 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "If the Lord is God, follow him; but if Baal is God, follow him."
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
          <span className="text-black font-semibold">1 Kings</span>
        </div>

        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Temple and Kingdom
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">From Glory to Division</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                First Kings opens with Solomon's wisdom and the temple's dedication, then turns toward spiritual compromise and national fracture. The narrative contrasts covenant faithfulness with idolatry, showing how leadership decisions shape the destiny of an entire people.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "The cloud filled the house of the Lord."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">- 1 Kings 8:10</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={FIRST_KINGS_IMAGES.temple}
                alt="1 Kings temple narrative"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-amber-500/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Core Theme</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif">Wisdom, Worship, and Warning</p>
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
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Wisdom and Covenant Responsibility</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Solomon's early reign demonstrates the beauty of God-given wisdom. Yet covenant blessing is never automatic; the book repeatedly ties security and flourishing to faithful obedience.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Flame className="w-8 h-8 text-sky-300" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white">Prophetic Confrontation</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed italic">
                    Through Elijah, God confronts false worship and calls His people back. The fire on Carmel is not spectacle alone, but a covenant summons to wholehearted allegiance.
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
              Explore the temple era, divided monarchy, and Elijah narratives with precision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                level: "Beginner",
                desc: "Master the main storyline from Solomon to Ahab.",
                icon: BookOpen,
                color: "bg-amber-50",
                iconColor: "text-amber-600",
                link: "beginner",
                accent: "bg-amber-500",
                features: ["Major kings", "Temple story", "Key events"],
              },
              {
                level: "Intermediate",
                desc: "Dive into covenant patterns, reforms, and failures.",
                icon: Brain,
                color: "bg-sky-50",
                iconColor: "text-sky-600",
                link: "intermediate",
                accent: "bg-sky-500",
                features: ["Kingdom split", "Prophetic words", "Idolatry dynamics"],
              },
              {
                level: "Advanced",
                desc: "Test detailed chapter knowledge and theological links.",
                icon: Compass,
                color: "bg-purple-50",
                iconColor: "text-purple-600",
                link: "advanced",
                accent: "bg-purple-500",
                features: ["Chronology", "Royal policy details", "Narrative structure"],
              },
            ].map((d) => (
              <Card
                key={d.level}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]"
                onClick={() => navigate(`/bible-questions-and-answers-hub/1-kings/${d.link}`)}
              >
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">1 Kings Track</CardDescription>
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
                src={FIRST_KINGS_IMAGES.wisdom}
                alt="1 Kings wisdom and temple"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Royal Zenith
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                Wisdom and the Temple
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                The opening chapters reveal the high point of united monarchy: prudent governance, architectural grandeur, and temple-centered worship. These chapters show what covenant life can look like when wisdom and devotion align.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-amber-50/40 rounded-[2.5rem] border border-amber-100/50 hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50 text-amber-600">
                  <Crown className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "Give your servant a discerning heart."
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">- 1 Kings 3:9</p>
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
                Prophetic Fire
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase tracking-tighter">
                Elijah and Covenant Call
              </h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                As idolatry spreads, Elijah confronts kings and crowds with uncompromising truth. The Carmel narrative centers the book's choice: divided allegiance or wholehearted devotion to the living God.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-sky-50/40 rounded-[2.5rem] border border-sky-100/50 hover:bg-sky-50 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200/50 text-sky-600">
                  <Flame className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">
                    "The Lord, he is God!"
                  </p>
                  <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">- 1 Kings 18:39</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img
                src={FIRST_KINGS_IMAGES.fire}
                alt="1 Kings Elijah and fire"
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
          </div>
        </section>

        <section id="first-kings-chapter-wise" className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
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
                  The Story of <span className="text-amber-600 italic">1 Kings</span>
                </h3>

                <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
                  Study all 22 chapters from Solomon's coronation to Ahab's final battle.
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
                  onClick={() => navigate(`/bible-questions-and-answers-hub/1-kings/chapter-${ch}`)}
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
