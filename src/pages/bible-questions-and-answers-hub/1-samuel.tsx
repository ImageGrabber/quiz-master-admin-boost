import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Sword, 
  ChevronRight, 
  BookOpen, 
  ScrollText, 
  Users,
  Mountain,
  Library,
  Flame,
  Search,
  Quote,
  Heart,
  Crown,
  Compass,
  ShieldCheck,
  Brain,
  Swords
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const SAMUEL_IMAGES = {
  hero: "/images/hubs/1-samuel/samuel-hero.png",
  davidGoliath: "/images/hubs/1-samuel/david-goliath.png",
  saulAnointing: "/images/hubs/1-samuel/saul-anointing.png",
  davidJonathan: "/images/hubs/1-samuel/david-jonathan.png",
  arkCaptured: "/images/hubs/1-samuel/ark-captured.png",
};

export default function FirstSamuelHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 31 }, (_, i) => i + 1);
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

  // Narrative data for 1 Samuel chapters
  const chapterPoints1to10: Record<number, string[]> = {
    1: ["Hannah's barrenness and fervent prayer", "Eli the priest's mistaken rebuke", "The vow to dedicate Samuel to the Lord"],
    2: ["Hannah's song of praise and thanksgiving", "The wickedness of Eli's sons, Hophni and Phinehas", "The boy Samuel ministers before the Lord"],
    3: ["The Lord calls Samuel in the night", "'Speak, Lord, for your servant is listening'", "Samuel established as a prophet in Israel"],
    4: ["The Ark of the Covenant captured by the Philistines", "The deaths of Hophni and Phinehas in battle", "Eli falls and dies upon hearing the news"],
    5: ["The Ark in the temple of Dagon", "Dagon falls before the Ark twice", "Plagues upon the Philistine cities"],
    6: ["The Philistines return the Ark on a new cart", "The guilt offering of golden tumors and rats", "The men of Beth Shemesh struck for looking into the Ark"],
    7: ["Samuel calls Israel to repentance", "Victory over the Philistines at Mizpah", "The Ebenezer stone: 'Thus far the Lord has helped us'"],
    8: ["Israel demands a king like other nations", "Samuel warns of the cost of kingship", "God grants their request despite the rejection"],
    9: ["Saul searches for his father's lost donkeys", "Saul meets Samuel in the city", "God reveals Saul as the chosen one to Samuel"],
    10: ["Samuel anoints Saul as king privately", "The Spirit of the Lord comes upon Saul", "Saul chosen by lot at Mizpah"]
  };

  const chapterPoints11to20: Record<number, string[]> = {
    11: ["Saul rallies Israel to rescue Jabesh Gilead", "A decisive victory over the Ammonites", "The kingdom confirmed at Gilgal"],
    12: ["Samuel's farewell speech to the nation", "A review of God's faithfulness through history", "Thunder and rain as a sign of Israel's sin"],
    13: ["Saul's unlawful sacrifice at Gilgal", "Samuel declares Saul's kingdom will not endure", "Israel left without weapons against the Philistines"],
    14: ["Jonathan's daring raid on the Philistine outpost", "Saul's rash oath that nearly kills Jonathan", "The people rescue Jonathan from death"],
    15: ["Saul's incomplete obedience against the Amalekites", "To obey is better than sacrifice", "God rejects Saul as king of Israel"],
    16: ["Samuel anoints David in Bethlehem", "'The Lord looks at the heart'", "David enters Saul's service as a musician"],
    17: ["David and Goliath in the Valley of Elah", "'I come in the name of the Lord Almighty'", "A single stone fells the Philistine champion"],
    18: ["Jonathan and David's covenant friendship", "Saul's growing jealousy of David", "'Saul has slain his thousands, David his tens of thousands'"],
    19: ["Saul attempts to kill David with a spear", "Michal helps David escape through a window", "Saul prophesies at Naioth in Ramah"],
    20: ["David and Jonathan's farewell covenant", "The arrow signal in the field", "A tearful parting between brothers"]
  };

  const chapterPoints21to31: Record<number, string[]> = {
    21: ["David flees to Nob and receives holy bread", "Doeg the Edomite witnesses the priests' aid", "David feigns madness before King Achish"],
    22: ["David gathers followers at the cave of Adullam", "Saul orders the massacre of the priests of Nob", "Abiathar escapes to join David"],
    23: ["David saves the city of Keilah from the Philistines", "Saul pursues David in the wilderness of Ziph", "Jonathan strengthens David's hand in God"],
    24: ["David spares Saul's life in the cave at En Gedi", "David cuts the corner of Saul's robe", "Saul weeps and acknowledges David's righteousness"],
    25: ["The death of Samuel the prophet", "Nabal's foolishness and Abigail's wisdom", "David spares Nabal; God strikes him down"],
    26: ["David spares Saul a second time in the wilderness", "David takes Saul's spear and water jug", "Saul confesses his sin once more"],
    27: ["David takes refuge with Achish king of Gath", "Living among the Philistines for sixteen months", "David raids Israel's enemies while deceiving Achish"],
    28: ["Saul consults the medium at Endor", "The spirit of Samuel appears with a dire prophecy", "'Tomorrow you and your sons will be with me'"],
    29: ["The Philistine commanders reject David from battle", "David dismissed from the march against Israel", "God's providence protects David from fighting his own people"],
    30: ["The Amalekites raid and burn Ziklag", "David's men speak of stoning him", "David strengthens himself in the Lord and recovers everything"],
    31: ["The final battle on Mount Gilboa", "The deaths of Saul and Jonathan", "The men of Jabesh Gilead recover their bodies"]
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="1 Samuel Quiz Hub | Rise of the Kingdom"
        description="Explore the Book of 1 Samuel through 31 chapters of interactive quizzes and narrative insights. Master the stories of Samuel, Saul, David, and Jonathan."
        url="/bible-questions-and-answers-hub/1-samuel"
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[72vh] sm:min-h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={SAMUEL_IMAGES.hero} 
            alt="The Call of Samuel" 
            className="w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-[30000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Historical Books</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[10rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 uppercase">
            1 Samuel <span className="italic font-serif block mt-2 text-white/90">Hub</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/70 mb-16 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "Speak, Lord, for your servant is listening."
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
          <span className="text-black font-semibold">1 Samuel</span>
        </div>

        {/* Narrative Section 1: The Prophet's Call */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Birth of the Monarchy
                </h2>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-gray-900 italic serif">From Priest to Prophet to King</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none capitalize">
                First Samuel chronicles the dramatic transition from the era of the judges to the establishment of the monarchy. Through Hannah's prayer, Samuel's calling, Saul's rise and fall, and David's anointing, this book reveals how God's sovereign purposes unfold through flawed human instruments.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed italic">
                    "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— 1 Samuel 16:7</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={SAMUEL_IMAGES.arkCaptured} 
                alt="The Ark of the Covenant" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4 shadow-amber-500/5">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6 text-white">
                  <Crown className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Transition of Power</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic text-black serif italic">From Theocracy to Monarchy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section */}
        <section className="mb-24 sm:mb-40 py-14 sm:py-24 bg-gray-900 rounded-[2rem] sm:rounded-[4rem] text-white px-5 sm:px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40 text-left">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Core</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Heart className="w-8 h-8 text-amber-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">God Looks at the Heart</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed antialiased italic">
                    While Israel chose Saul for his stature and appearance, God chose David — a forgotten shepherd boy — for his heart. This theme echoes throughout 1 Samuel: true leadership is measured not by outward power but by inward devotion to God.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-sky-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif text-white italic">Obedience Over Sacrifice</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed antialiased italic">
                    Saul's downfall teaches that God values faithful obedience above religious performance. When Saul spared what he should have destroyed, Samuel declared: "To obey is better than sacrifice." This principle defines the contrast between Saul and David.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Difficulty Selection Section */}
        <section id="difficulty" className="mb-40 scroll-mt-24 text-center">
          <div className="mb-20">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif uppercase leading-tight font-serif tracking-tighter italic">Choose Your Path</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed italic">Master the rise of the kingdom and the heart of a shepherd king.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on the essentials: Samuel's call, David vs Goliath, and the anointing of kings.", 
                icon: BookOpen, 
                color: "bg-sky-50", 
                iconColor: "text-sky-600",
                link: "beginner",
                accent: "bg-sky-500",
                features: ["Hannah's prayer", "David and Goliath", "Samuel's calling"]
              },
              { 
                level: "Intermediate", 
                desc: "Explore Saul's disobedience, Jonathan's courage, and David's wilderness years.", 
                icon: Brain, 
                color: "bg-amber-50", 
                iconColor: "text-amber-600",
                link: "intermediate",
                accent: "bg-amber-500",
                features: ["Saul's rejection", "The Ark's journey", "David's fugitive years"]
              },
              { 
                level: "Advanced", 
                desc: "Master Abigail's wisdom, the witch of Endor, and the final battle on Gilboa.", 
                icon: Swords, 
                color: "bg-indigo-50", 
                iconColor: "text-indigo-600",
                link: "advanced",
                accent: "bg-indigo-500",
                features: ["Prophetic politics", "Covenant theology", "Military strategies"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/1-samuel/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3 italic font-serif">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em] font-urbanist">1 Samuel Track</CardDescription>
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

        {/* Narrative Section 2: David & Goliath */}
        <section id="david-goliath" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={SAMUEL_IMAGES.davidGoliath} 
                alt="David faces Goliath" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                The Valley of Elah
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase font-serif tracking-tighter">David & Goliath</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                When a nation's army trembled before a nine-foot champion, a shepherd boy stepped forward with five smooth stones and an unshakeable faith. David's victory over Goliath remains the Bible's most iconic picture of how God uses the small and the unlikely to defeat the greatest of enemies.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-amber-50/40 rounded-[2.5rem] border border-amber-100/50 hover:bg-amber-50 transition-colors">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-200/50 text-amber-600">
                  <Sword className="w-7 h-7 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"I come against you in the name of the Lord Almighty."</p>
                  <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase">— 1 Samuel 17:45</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Section 3: David & Jonathan */}
        <section id="david-jonathan" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-10 text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                A Covenant of Brotherhood
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif uppercase font-serif tracking-tighter">David & Jonathan's Bond</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] italic font-serif">
                In the midst of political turmoil and a jealous king's rage, the friendship between David and Jonathan stands as one of Scripture's most powerful testaments to sacrificial love. Jonathan, the heir to the throne, willingly surrendered his claim because he recognized God's hand upon David.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-sky-50/40 rounded-[2.5rem] border border-sky-100/50 hover:bg-sky-50 transition-colors">
                <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-200/50 text-sky-600">
                  <Heart className="w-7 h-7 font-bold" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"Jonathan became one in spirit with David, and he loved him as himself."</p>
                  <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">— 1 Samuel 18:1</p>
                </div>
              </div>
            </div>
            <div className="relative group text-left">
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={SAMUEL_IMAGES.davidJonathan} 
                alt="David and Jonathan's covenant" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
          </div>
        </section>

        {/* Chapter Library Grid */}
        <section id="samuel-chapter-wise" className="mb-40 scroll-mt-24 pt-32 px-4 md:px-0">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-slate-100 shadow-2xl bg-white p-12 md:p-20">
               <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
               <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors" />
               
               <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 mb-4">
                     <Library className="w-5 h-5 text-amber-500" />
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 font-urbanist">Chapter Wise Study</span>
                  </div>
                  
                  <h3 className="text-4xl sm:text-6xl md:text-8xl font-normal text-slate-900 tracking-tighter uppercase leading-[0.9] italic serif">
                    The Library of <span className="text-amber-600 italic">1 Samuel</span>
                  </h3>
                  
                  <p className="text-2xl font-light text-slate-400 max-w-2xl mx-auto leading-relaxed italic antialiased">
                    Journey through the rise and fall of kings across 31 meticulously curated chapters.
                  </p>

                  <div className="flex justify-center max-w-xl mx-auto pt-8">
                    <div className="relative w-full group/search">
                      <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-slate-300 w-8 h-8 group-focus-within/search:text-amber-500 transition-colors" strokeWidth={1} />
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a chapter or keyword..."
                        className="pl-24 pr-12 py-12 text-2xl font-light border-slate-100 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-[3rem] shadow-inner transition-all duration-700 w-full font-urbanist"
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
              let cardColor = "amber";
              let accentColor = "bg-amber-500";
              
              if (ch >= 1 && ch <= 10) {
                currentChapterPoints = chapterPoints1to10[ch];
                cardColor = "amber";
                accentColor = "bg-amber-600";
              } else if (ch >= 11 && ch <= 20) {
                currentChapterPoints = chapterPoints11to20[ch];
                cardColor = "sky";
                accentColor = "bg-sky-500";
              } else if (ch >= 21 && ch <= 31) {
                currentChapterPoints = chapterPoints21to31[ch];
                cardColor = "emerald";
                accentColor = "bg-emerald-500";
              }

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/1-samuel/chapter-${ch}`)}
                >
                  <div className={`h-2 w-full ${accentColor} absolute top-0`} />
                  
                  <CardHeader className="pt-16 pb-8 px-10 text-left">
                    <CardTitle className="text-5xl font-normal text-gray-900 italic serif mb-4 tracking-tighter uppercase font-serif italic">Chapter {ch}</CardTitle>
                    <CardDescription className={`text-[10px] font-bold uppercase tracking-[0.3em] font-urbanist text-${cardColor}-600/60 tracking-widest`}>
                      {ch <= 7 ? "The Prophet" : ch <= 15 ? "The First King" : ch <= 20 ? "The Shepherd King" : "The Fugitive"}
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