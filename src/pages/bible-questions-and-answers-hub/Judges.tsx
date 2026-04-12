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

// Cinematic assets for the Judges Hub
const JUDGES_IMAGES = {
  hero: "/images/hubs/judges/judges-hero.png",
  gideon: "/images/hubs/judges/gideon-torches.png",
  deborah: "/images/hubs/judges/deborah-victory.png",
  samson: "/images/hubs/judges/samson-final.png",
  restoration: "/images/hubs/judges/liberty-restoration.png",
};

export default function JudgesHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 21 }, (_, i) => i + 1);
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

  // Narrative data for Judges chapters
  const chapterPoints1to7: Record<number, string[]> = {
    1: ["The incomplete conquest of Canaan", "Judah and Simeon join forces", "The angel's message at Bochim"],
    2: ["Israel's disobedience and idolatry", "The repetitive cycle of the Judges", "The Lord's anger and mercy"],
    3: ["Othniel: The first faithful judge", "Ehud's daring act against Eglon", "Shamgar's exploit with an oxgoad"],
    4: ["Deborah and Barak's leadership", "Sisera's defeat at the Kishon", "Jael's scarlet victory in the tent"],
    5: ["The Song of Deborah and Barak", "Praising the tribes who fought", "Nature itself fighting for Israel"],
    6: ["Gideon's call and the threshing floor", "Tearing down the altar of Baal", "The test of the fleece and dew"],
    7: ["The divine reduction to 300 men", "Panic in the Midianite camp", "The victory of torches and trumpets"]
  };

  const chapterPoints8to14: Record<number, string[]> = {
    8: ["The capture of the Midianite kings", "Gideon's refusal of the kingship", "The golden ephod and its snare"],
    9: ["Abimelech's bloody rise to power", "Jotham's parable of the trees", "The judgment on Shechem"],
    10: ["The judges Tola and Jair", "Deepening apostasy and oppression", "Israel's desperate cry for help"],
    11: ["Jephthah: The rejected warrior", "Victory over the Ammonites", "The tragic vow and its price"],
    12: ["Civil strife between Gilead and Ephraim", "The Shibboleth test at the Jordan", "Ibzan, Elon, and Abdon"],
    13: ["The angelic promise of Samson", "The Nazirite vow from the womb", "Manoah's offering to the Lord"],
    14: ["Samson's desire for a Philistine wife", "The riddle of the lion and honey", "Thirty companions and betrayal"]
  };

  const chapterPoints15to21: Record<number, string[]> = {
    15: ["Burning the Philistine grain fields", "Defeating 1,000 men with a jawbone", "A miraculous spring at Ramath Lehi"],
    16: ["Samson and Delilah's fatal game", "The loss of strength and sight", "A final stand in the temple of Dagon"],
    17: ["Micah's idols and hired priest", "A private shrine in the hill country", "A Levite finds a home"],
    18: ["The tribe of Dan's search for land", "Seizing Micah's priest and idols", "Establishing a new center for worship"],
    19: ["The horrifying outrage at Gibeah", "A Levite and his concubine", "The news that shocked all Israel"],
    20: ["The tribes gather for civil war", "Two days of defeat for the assembly", "The near destruction of Benjamin"],
    21: ["Securing wives for the survivors", "Grieving for the broken tribe", "Conclusion: A land without a king"]
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Judges Quiz Hub | Cycles of Deliverance"
        description="Explore the Book of Judges through 21 chapters of interactive quizzes and narrative insights. Master the stories of Deborah, Gideon, and Samson."
        url="/bible-questions-and-answers-hub/judges"
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[72vh] sm:min-h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={JUDGES_IMAGES.hero} 
            alt="The Era of the Judges" 
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Shield className="w-5 h-5 text-orange-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Historical Books</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            Judges <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "In those days Israel had no king; everyone did as they saw fit."
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <button 
              className="bg-white text-black hover:bg-gray-100 px-6 sm:px-12 py-4 sm:py-6 text-sm sm:text-xl rounded-3xl font-bold shadow-2xl transition-all active:scale-95 group flex items-center" 
              onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Begin Quiz Journey <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all px-6 sm:px-12 py-4 sm:py-6 text-sm sm:text-xl rounded-3xl font-light active:scale-95" 
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
          <span className="text-black font-semibold">Judges</span>
        </div>

        {/* Narrative Section 1: The Cycle */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  Lessons in Fragility
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">The Era of the Deliverers</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                The book of judges marks a period of profound transition and moral struggle. As the generation of Joshua passed, Israel found itself in a recurring cycle of spiritual neglect and divine rescue. Through unlikely heroes, God demonstrated that His strength is perfected in human weakness.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed italic">
                    "Then the Lord raised up judges, who saved them out of the hands of these raiders."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Judges 2:16</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={JUDGES_IMAGES.restoration} 
                alt="Repentance and Deliverance" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-orange-500/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <Flame className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3 uppercase tracking-widest">Divine Cycle</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif italic">From Apostasy to Rest</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section */}
        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
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
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">Strength in Weakness</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed antialiased italic">
                    Judges showcases leaders like the reluctant Gideon and the flawed Samson. It reveals a God who doesn't wait for perfect men to act, but one who empowers the available to fulfill His sovereign purposes amidst national failure.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Compass className="w-8 h-8 text-sky-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">The Need for the King</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed antialiased italic">
                    The chaotic final chapters serve as a dark backdrop for the necessity of righteous leadership. The spiritual vacuum in Israel points forward to the need for a true King who would rule by both law and spirit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty Selection Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24 text-center">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase leading-tight font-serif tracking-tighter italic">Choose Your Deployment</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">Master the cycles of deliverance and the rise of the judges.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the basics: Ehud's dagger, Deborah's song, and Gideon's 300.", 
                icon: BookOpen, 
                color: "bg-sky-50", 
                iconColor: "text-sky-600",
                link: "beginner",
                accent: "bg-sky-500",
                features: ["The major judges", "Famous victories", "The cycle pattern"]
              },
              { 
                level: "Intermediate", 
                desc: "Explore Jael's tent, Jephthah's vow, and the early years of Samson.", 
                icon: Brain, 
                color: "bg-orange-50", 
                iconColor: "text-orange-600",
                link: "intermediate",
                accent: "bg-orange-500",
                features: ["Tribal conflicts", "Samson's riddles", "Prophetic leadership"]
              },
              { 
                level: "Advanced", 
                desc: "Master the 31 minor details, the Shibboleth test, and the anarchy of Gibeah.", 
                icon: Swords, 
                color: "bg-indigo-50", 
                iconColor: "text-indigo-600",
                link: "advanced",
                accent: "bg-indigo-500",
                features: ["The twelve judges", "Civil war details", "Geographic boundaries"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/judges/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3 italic font-serif">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em] font-urbanist">Judges Track</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10 italic">{d.desc}</p>
                  <ul className="space-y-4 mb-10">
                    {d.features.map(f => (
                      <li key={f} className="flex items-center text-sm font-light text-gray-400 antialiased">
                        <div className={`w-1.5 h-1.5 rounded-full ${d.accent} mr-3 opacity-50`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full font-bold bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">Start Training</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Narrative Section 2: Gideon's Strategy */}
        <section id="gideon" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={JUDGES_IMAGES.gideon} 
                alt="Gideon's Torches and Trumpets" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Power of the 300
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase font-serif tracking-tighter">Gideon's Faith & Divine Strategy</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                When Gideon faced an army "as thick as locusts," God stripped him of his numbers to clothe him in His own glory. With only 300 men, jars, and torches, Israel learned that victory is won not by might, nor by power, but by the Spirit of the Lord. The sound of broken jars and rising trumpets shattered the Midianite pride.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-orange-50/40 rounded-[2.5rem] border border-orange-100/50 hover:bg-orange-50 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-200/50 text-orange-600">
                  <Flame className="w-7 h-7 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"A sword for the Lord and for Gideon!"</p>
                  <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase">— Judges 7:20</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Section 3: Samson's Fall & Rise */}
        <section id="samson" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Nazirite's Stand
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase font-serif tracking-tighter">Samson's Strength & Final Vow</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                A man of immense strength and immense failure, Samson's life is a cautionary paradox. Yet, in his final moments of blindness and chains, he cried out for strength one last time. His death brought a definitive blow to the Philistine gods, proving that God's grace remains accessible even to the most broken of His servants.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-sky-50/40 rounded-[2.5rem] border border-sky-100/50 hover:bg-sky-50 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200/50 text-sky-600">
                  <Mountain className="w-7 h-7 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"Sovereign Lord, remember me. Please, God, strengthen me..."</p>
                  <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">— Judges 16:28</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={JUDGES_IMAGES.samson} 
                alt="Samson and the Pillars" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
          </div>
        </section>

        {/* Chapter Library Grid - Ultra Premium Overhaul */}
        <section id="judges-chapter-wise" className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white p-12 md:p-20">
               <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-orange-500/10 transition-colors" />
               <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors" />
               
               <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 mb-4">
                     <Library className="w-5 h-5 text-orange-500" />
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 font-urbanist">Chapter Wise Study</span>
                  </div>
                  
                  <h3 className="text-4xl sm:text-6xl md:text-8xl font-normal text-slate-900 tracking-tighter uppercase leading-[0.9] italic serif">
                    The Library of <span className="text-orange-600 italic">Judges</span>
                  </h3>
                  
                  <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic antialiased">
                    Explore the spiral of history and the rise of deliverers through 21 detailed chapter modules.
                  </p>

                  <div className="flex justify-center max-w-xl mx-auto pt-8">
                    <div className="relative w-full group/search">
                      <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-300 w-8 h-8 group-focus-within/search:text-orange-500 transition-colors" strokeWidth={1} />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a chapter or keyword..."
                        className="pl-24 pr-12 py-12 text-2xl font-light border-slate-100 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-orange-500/20 rounded-[3rem] shadow-inner transition-all duration-700 w-full font-urbanist"
                      />
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Chapters Pagination - Top Placement */}
          {totalChapterPages > 1 && (
            <div className="mb-12 max-w-7xl mx-auto flex items-center justify-between border-b border-slate-100 pb-12 font-bold text-slate-400">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-1 px bg-slate-50 rounded-full overflow-hidden shrink-0">
                    <div className="h-full bg-slate-900 transition-all duration-700" style={{ width: `${(chapterPage + 1) / totalChapterPages * 100}%` }} />
                 </div>
                 <div className="text-[11px] uppercase tracking-[0.3em] font-bold font-urbanist">
                   {chapterPage + 1} / {totalChapterPages}
                 </div>
              </div>
              <div className="flex gap-4">
                <button 
                  className="rounded-full px-10 py-6 font-bold tracking-[0.2em] uppercase text-[10px] border border-slate-100 bg-white hover:bg-black hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-urbanist"
                  disabled={chapterPage === 0} 
                  onClick={() => setChapterPage(p => p - 1)}
                >
                  Previous
                </button>
                <button 
                   className="rounded-full px-10 py-6 font-bold tracking-[0.2em] uppercase text-[10px] border border-slate-100 bg-white hover:bg-black hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-urbanist"
                  disabled={chapterPage >= totalChapterPages - 1} 
                  onClick={() => setChapterPage(p => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              let cardColor = "orange";
              let accentColor = "bg-orange-500";
              
              if (ch >= 1 && ch <= 7) {
                currentChapterPoints = chapterPoints1to7[ch];
                cardColor = "orange";
                accentColor = "bg-orange-600";
              } else if (ch >= 8 && ch <= 14) {
                currentChapterPoints = chapterPoints8to14[ch];
                cardColor = "sky";
                accentColor = "bg-sky-500";
              } else if (ch >= 15 && ch <= 21) {
                currentChapterPoints = chapterPoints15to21[ch];
                cardColor = "emerald";
                accentColor = "bg-emerald-500";
              }

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/judges/chapter-${ch}`)}
                >
                  <div className={`h-2 w-full ${accentColor} absolute top-0`} />
                  
                  <CardHeader className="pt-16 pb-8 px-10 text-left">
                    <CardTitle className="text-5xl font-normal text-gray-900 italic serif mb-4 tracking-tighter uppercase font-serif italic">Chapter {ch}</CardTitle>
                    <CardDescription className={`text-[10px] font-bold uppercase tracking-[0.3em] font-urbanist text-${cardColor}-600/60 tracking-widest`}>
                      {ch <= 3 ? "The Prologue" : ch <= 16 ? "The Deliverers" : "The Aftermath"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                    <div className="space-y-6 mb-12">
                      {currentChapterPoints?.map((pt, idx) => (
                        <div key={idx} className="flex items-start text-xl font-light text-gray-500 group/pt transition-colors">
                          <div className={`w-2 h-2 rounded-full ${accentColor} mr-4 mt-2.5 opacity-40 group-hover/pt:opacity-100 transition-opacity`} />
                          <p className="italic group-hover:text-black transition-colors leading-relaxed antialiased font-serif">{pt}</p>
                        </div>
                      ))}
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