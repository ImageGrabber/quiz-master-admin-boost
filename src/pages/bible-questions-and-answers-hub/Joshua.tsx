import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Sword, 
  Map, 
  Trophy, 
  ChevronRight, 
  BookOpen, 
  Star, 
  ScrollText, 
  Users,
  Mountain,
  CheckCircle2,
  Library,
  Flame,
  Globe,
  Search,
  Quote,
  Heart,
  Flag,
  Compass,
  ShieldCheck,
  Sparkles,
  Brain,
  Swords
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Cinematic assets for the Joshua Hub
const JOSHUA_IMAGES = {
  hero: "/images/hubs/joshua/joshua-hero.png",
  conquest: "/images/hubs/joshua/jericho-conquest.png",
  rahab: "/images/hubs/joshua/rahab-faith.png",
  inheritance: "/images/hubs/joshua/inheritance.png",
  covenant: "/images/hubs/joshua/shechem-covenant.png",
};

export default function JoshuaHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 24 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    const num = parseInt(q, 10);
    return chapterNumbers.filter((n) => n === num || String(n).startsWith(q));
  }, [query, chapterNumbers]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Narrative data for Joshua chapters
  const chapterPoints1to8: Record<number, string[]> = {
    1: ["Joshua's commission to lead Israel", "The charge: 'Be strong and courageous'", "Preparation to cross the Jordan"],
    2: ["Two spies sent secretly to Jericho", "Rahab's faith and the scarlet cord", "The report: 'The Lord has given us the land'"],
    3: ["The miraculous crossing of the Jordan", "Priests carry the Ark into flood waters", "Crossing on dry ground at harvest time"],
    4: ["Twelve memorial stones from the Jordan", "Teaching future generations of God's power", "Israel camps at Gilgal"],
    5: ["Covenant renewal: Circumcision at Gilgal", "The first Passover in the Promised Land", "The Commander of the Lord's Army appears"],
    6: ["The strategic fall of Jericho", "Blowing trumpets and the great shout", "Rahab and her family are spared"],
    7: ["The defeat at Ai due to hidden sin", "Achan's theft of devoted things", "Judgment and restoration of the camp"],
    8: ["The successful conquest of Ai", "Ambush strategy and total victory", "Building an altar and reading the Law"]
  };

  const chapterPoints9to16: Record<number, string[]> = {
    9: ["The deception of the Gibeonites", "Israel fails to consult the Lord", "Deceptive treaty honored by the leaders"],
    10: ["The sun stands still over Gibeon", "Defeat of the five Amorite kings", "The southern campaign and victories"],
    11: ["The northern campaign and total conquest", "Defeat of Jabin of Hazor", "The land finally rests from war"],
    12: ["Summary of defeated kings (31 total)", "Recap of victories east of Jordan", "Recap of victories west of Jordan"],
    13: ["The command to divide the remaining land", "Inheritance of Reuben, Gad, and Manasseh", "The Levites' inheritance: the Lord Himself"],
    14: ["Caleb's request for Hebron", "A reward for wholehearted devotion", "Caleb's strength at eighty-five"],
    15: ["The inheritance for the tribe of Judah", "Othniel's capture of Debir", "The boundaries of Judah's territory"],
    16: ["The inheritance for the sons of Joseph", "The borders of Ephraim's land", "Failure to drive out some Canaanites"]
  };

  const chapterPoints17to24: Record<number, string[]> = {
    17: ["The inheritance for Manasseh", "The request of Zelophehad's daughters", "Clearing forests for more territory"],
    18: ["Setting up the Tabernacle at Shiloh", "Surveying the remaining territory", "The inheritance for Benjamin"],
    19: ["Inheritance for Simeon, Zebulun, Issachar", "Asher, Naphtali, and Dan's territories", "Joshua's own city: Timnath Serah"],
    20: ["Establishment of the Cities of Refuge", "Safety for the unintentional killer", "Protection within the covenant land"],
    21: ["Allocating towns for the Levites", "Cities for Kohath, Gershon, and Merari", "Not one of God's promises failed"],
    22: ["The eastern tribes return home", "The altar of witness (Ed) built", "Resolving a misunderstanding at the Jordan"],
    23: ["Joshua's farewell to the leaders", "A charge to hold fast to the Lord", "Warning against intermingling with nations"],
    24: ["Covenant renewal at Shechem", "The choice: 'As for me and my house...'", "The death and burial of Joshua and Eleazar"]
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Joshua Quiz Hub | The Conquest & Inheritance"
        description="Master the book of Joshua through 24 chapters of interactive quizzes and narrative insights. Explore Rahab's faith, Jericho's fall, and the Promised Land."
        url="/bible-questions-and-answers-hub/joshua"
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={JOSHUA_IMAGES.hero} 
            alt="Joshua at the Jordan River" 
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Sword className="w-5 h-5 text-orange-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Historical Books</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Joshua <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <button 
              className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-xl rounded-3xl font-bold shadow-2xl transition-all active:scale-95 group flex items-center" 
              onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Begin Quiz Journey <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all px-12 py-6 text-xl rounded-3xl font-light active:scale-95" 
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Content
            </button>
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
          <span className="text-black font-semibold">Joshua</span>
        </div>

        {/* Narrative Section 1: The Conquest */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Divinely Ordained Victory
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900">The Jordan & The Walls of Jericho</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Joshua leads Israel into a new era. No longer a wandering people, they become a nation of conquest. The miraculous parting of the Jordan and the dramatic fall of Jericho serve as powerful reminders that God fights for His people when they walk in obedience.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "I have given you every place where you set your foot, as I promised Moses."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Joshua 1:3</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={JOSHUA_IMAGES.conquest} 
                alt="The Walls of Jericho" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <Flame className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 uppercase">Strategic Faith</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black">Obedience as Military Strategy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section */}
        <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Core</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-orange-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">God's Promised Rest</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Joshua represents the fulfillment of the land promise. God provides rest for Israel after centuries of Egyptian slavery and decades of wilderness wandering, yet this rest remains a shadow of the eternal rest promised in Christ.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Star className="w-8 h-8 text-sky-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">Faith Across Borders</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Through Rahab, the book of Joshua shows that God's grace and covenant are not restricted by ethnicity. Faith is the defining mark of inclusion into the people of God, placing an unlikely foreigner into the very lineage of the Messiah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty Selection Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24 text-center">
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase">Choose Your Deployment</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">Master the campaigns and inheritance of the Promised Land.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the basics: Rahab's story, Jordan crossing, and the fall of Jericho.", 
                icon: BookOpen, 
                color: "bg-sky-50", 
                iconColor: "text-sky-600",
                link: "beginner",
                accent: "bg-sky-500",
                features: ["The core battles", "Faith figures", "Crossing miracles"]
              },
              { 
                level: "Intermediate", 
                desc: "Deep dive into military strategies, the sun standing still, and tribal borders.", 
                icon: Brain, 
                color: "bg-orange-50", 
                iconColor: "text-orange-600",
                link: "intermediate",
                accent: "bg-orange-500",
                features: ["Southern campaigns", "The sun miracle", "Land boundaries"]
              },
              { 
                level: "Advanced", 
                desc: "Master the full list of defeated kings, Caleb's lineage, and final covenant charges.", 
                icon: Swords, 
                color: "bg-indigo-50", 
                iconColor: "text-indigo-600",
                link: "advanced",
                accent: "bg-indigo-500",
                features: ["31 Defeated Kings", "Covenant at Shechem", "Joseph's bones"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/joshua/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Joshua Track</CardDescription>
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

        {/* Narrative Section 2: The Inheritance */}
        <section id="renewal" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={JOSHUA_IMAGES.inheritance} 
                alt="Division of the Land" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Faithful Allotment
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase">The Land Divided & The Rest Received</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic">
                Canaan was more than land; it was an inheritance of promise. From the peaks of Hebron to the plains of Judah, each tribe received their portion by lot, showing that God's provision is both specific and sovereign. "Not one of all the Lord’s good promises to Israel failed; every one was fulfilled."
              </p>
              <div className="flex items-center space-x-6 p-10 bg-sky-50/40 rounded-[2.5rem] border border-sky-100/50 hover:bg-sky-50 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200/50 text-sky-600">
                  <Map className="w-7 h-7 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"Every one of all the Lord's good promises... was fulfilled."</p>
                  <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase tracking-widest">— Joshua 21:45</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Hubs Section */}
        <section className="mb-40 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">Specialized Training</h2>
              <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif tracking-tight">Immersive Campaigns</h3>
              <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Refine your mastery through targeted narrative and logic modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                { 
                  title: "Jericho Campaign", 
                  desc: "Strategy, Shouts, and Walls.", 
                  icon: Flame, 
                  link: "jericho-campaign",
                  color: "bg-orange-50",
                  iconColor: "text-orange-600"
                },
                { 
                  title: "Rahab's Faith", 
                  desc: "The scarlet cord of redemptive grace.", 
                  icon: Star, 
                  link: "rahab-faith",
                  color: "bg-sky-50",
                  iconColor: "text-sky-600"
                },
                { 
                  title: "Shechem Covenant", 
                  desc: "Choosing whom to serve in peace.", 
                  icon: Users, 
                  link: "shechem-covenant",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((tool) => (
                <Card 
                  key={tool.title}
                  className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none bg-white rounded-[2rem] overflow-hidden p-4"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/joshua/${tool.link}`)}
                >
                  <CardHeader className="pt-12 pb-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8 shadow-sm`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 italic serif mb-2 uppercase tracking-wide">{tool.title}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 leading-relaxed italic antialiased">
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
        <section id="joshua-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100 text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-16 text-left">
            <div className="max-w-2xl">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-orange-500 mb-10 tracking-widest">The Scrolls of Conquest</h2>
              <h3 className="text-6xl md:text-8xl font-normal text-gray-900 mb-8 italic serif tracking-tighter uppercase leading-none italic">The Library of Joshua</h3>
              <p className="text-2xl font-light text-gray-400 leading-relaxed italic border-l-2 border-gray-100 pl-8">Complete chapter-by-chapter quiz repository (24 Chapters)</p>
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
              const isConquest = ch >= 1 && ch <= 12;
              const isInheritance = ch >= 13 && ch <= 21;
              const isFarewell = ch >= 22;

              let currentChapterPoints = null;
              let cardTitle = "Narrative Insight";
              let cardColor = "orange";
              
              if (ch >= 1 && ch <= 8) {
                currentChapterPoints = chapterPoints1to8[ch];
                cardTitle = "Battle Record";
                cardColor = "orange";
              } else if (ch >= 9 && ch <= 16) {
                currentChapterPoints = chapterPoints9to16[ch];
                cardTitle = isConquest ? "Campaign Note" : "Tribal Legacy";
                cardColor = isConquest ? "orange" : "sky";
              } else if (ch >= 17 && ch <= 24) {
                currentChapterPoints = chapterPoints17to24[ch];
                cardTitle = isInheritance ? "Inheritance" : "Final Charge";
                cardColor = isInheritance ? "sky" : "emerald";
              }

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-slate-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-slate-200/20 rounded-[2.5rem] overflow-hidden p-1" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/joshua/chapter-${ch}`)}
                >
                  <CardHeader className="p-8 pb-6 text-black italic">
                    <div className="flex items-center justify-between mb-8 opacity-40">
                      <div className={`text-[10px] font-bold tracking-[0.3em] group-hover:text-${cardColor}-500 transition-colors uppercase tracking-widest font-urbanist`}>
                        CHAPTER {ch}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                       <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] text-${cardColor}-600/60 font-urbanist`}>
                         {isConquest ? "The Conquest" : isInheritance ? "The Allotment" : "National Legacy"}
                       </h4>
                       <CardTitle className="text-2xl font-normal text-slate-900 italic serif tracking-tight">
                         {cardTitle}
                       </CardTitle>
                    </div>

                    <div className="space-y-4 min-h-[100px]">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0 group-hover:bg-${cardColor}-500 transition-colors`} />
                          <p className="text-[14px] font-light text-slate-500 leading-relaxed group-hover:text-slate-900 transition-colors italic line-clamp-2 antialiased">
                            {pt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <div className="mt-auto p-8 pt-0">
                    <div className="w-full h-px bg-slate-100 mb-6 group-hover:bg-black/5 transition-colors" />
                    <Button variant="ghost" className="w-full justify-start px-0 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase group-hover:text-black hover:bg-transparent tracking-widest transition-colors font-urbanist">
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
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold tracking-[0.3em] font-urbanist">
                Page {chapterPage + 1} / {totalChapterPages}
              </div>
              <div className="flex gap-6">
                <Button 
                  variant="outline" 
                   className="rounded-[2.5rem] px-12 py-8 font-bold tracking-[0.2em] uppercase text-[10px] border-none bg-gray-50 hover:bg-black hover:text-white transition-all shadow-sm tracking-[0.2em] font-bold"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                   className="rounded-[2.5rem] px-12 py-8 font-bold tracking-[0.2em] uppercase text-[10px] border-none bg-gray-50 hover:bg-black hover:text-white transition-all shadow-sm tracking-[0.2em] font-bold"
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