import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Note: These images were generated specifically for this epic design
const GENESIS_IMAGES = {
  hero: "/images/hubs/genesis/creation.png", 
  creation: "/images/hubs/genesis/creation.png",
  eden: "/images/hubs/genesis/eden.png",
  flood: "/images/hubs/genesis/flood.png",
  abraham: "/images/hubs/genesis/abraham.png",
};

export default function GenesisHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    return chapterNumbers.filter((n) => String(n).startsWith(q));
  }, [query]);

  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Preservation of existing detailed chapter descriptions
  const chapterPoints: Record<number, string[]> = {
    1: ["Creation days 1–6 and Sabbath pattern", "Heavens and earth; light vs darkness", "Image of God; mandate to rule and fill"],
    2: ["Garden of Eden; rivers and Havilah gold", "Tree of life vs tree of knowledge", "Formation of woman; one flesh design"],
    3: ["Temptation and the Fall; consequences", "Protoevangelium (3:15) promise", "Garments of skin; expulsion and cherubim"],
    4: ["Cain and Abel offerings; murder and mark", "City of Enoch; Lamech's poem", "Birth of Seth; people begin to call on the Lord"],
    5: ["Genealogy of Adam through Seth", "Long lifespans; refrain 'and he died'", "Enoch walks with God; Methuselah & Lamech; Noah named"],
    6: ["Human wickedness; violence fills the earth", "Nephilim mentioned; God resolves to send the flood", "Noah finds favor; ark instructions and dimensions"],
    7: ["Noah, family, and animals enter the ark", "Seven pairs of clean animals; 40 days and nights of rain", "Waters prevail; 150 days"],
    8: ["Waters recede; ark rests; raven and dove sent out", "Altar built; pleasing aroma", "Covenant promise: never again a worldwide flood"],
  };

  const chapterPoints9to12: Record<number, string[]> = {
    9: ["Noah plants vineyard; gets drunk", "Ham sees father's nakedness; cursed", "Shem and Japheth blessed; Canaan cursed"],
    10: ["Table of Nations; Japheth's descendants", "Ham's descendants; Canaan's sons", "Shem's descendants; Eber's line"],
    11: ["Tower of Babel; language confusion", "Shem's genealogy to Terah", "Terah's family; Abram, Nahor, Haran"],
    12: ["God calls Abram; leaves Haran", "Abram in Canaan; builds altars", "Famine; goes to Egypt; Sarai taken"],
  };

  const chapterPoints13to16: Record<number, string[]> = {
    13: ["Abram and Lot separate; Lot chooses Jordan plain", "Abram settles at Hebron; builds altar", "God renews promises to Abram"],
    14: ["War of the kings; Lot taken captive", "Abram rescues Lot with 318 men", "Melchizedek blesses Abram; tithe given"],
    15: ["God's covenant with Abram; stars promise", "Abram's faith counted as righteousness", "Covenant ceremony; future slavery foretold"],
    16: ["Sarai gives Hagar to Abram; Ishmael born", "Hagar flees; angel meets her at spring", "Promise of Ishmael's descendants"],
  };

  const chapterPoints17to24: Record<number, string[]> = {
    17: ["Covenant of circumcision; Abram becomes Abraham", "Sarai becomes Sarah; Isaac promised", "Ishmael blessed; covenant established"],
    18: ["Three visitors at Mamre; Sarah laughs", "Abraham intercedes for Sodom", "Bargaining for righteous people"],
    19: ["Angels visit Lot; Sodom's destruction", "Lot's wife becomes pillar of salt", "Lot and daughters in Zoar"],
    20: ["Abraham in Gerar; Sarah taken", "Abimelech's dream; God's warning", "Abraham prays; Abimelech healed"],
    21: ["Isaac born to Abraham and Sarah", "Hagar and Ishmael sent away", "Treaty at Beersheba with Abimelech"],
    22: ["God tests Abraham with Isaac", "Abraham's faith and obedience", "The Lord provides a ram as substitute"],
    23: ["Sarah dies at age 127", "Abraham purchases cave of Machpelah", "First land ownership in Canaan"],
    24: ["Abraham sends servant to find Isaac a wife", "Servant's prayer and divine guidance", "Isaac marries Rebekah"],
  };

  const chapterPoints25to36: Record<number, string[]> = {
    25: ["Death of Abraham", "Ishmael's genealogy", "Birth of Jacob and Esau"],
    26: ["Isaac in Gerar", "Covenant with Abimelech", "Esau's wives"],
    27: ["Jacob steals Esau's blessing", "Esau's anger", "Jacob flees to Laban"],
    28: ["Jacob's ladder dream", "God's promise at Bethel", "Jacob's vow"],
    29: ["Jacob meets Rachel", "Jacob serves Laban", "Marriage to Leah and Rachel"],
    30: ["Jacob's children", "Jacob's flocks increase", "Prosperity in Haran"],
    31: ["Jacob flees from Laban", "Laban pursues Jacob", "Covenant at Mizpah"],
    32: ["Jacob prepares to meet Esau", "Jacob wrestles with God", "Name changed to Israel"],
    33: ["Jacob and Esau reconcile", "Jacob settles in Shechem", "Building an altar"],
    34: ["The defilement of Dinah", "Revenge of Simeon and Levi", "Trouble in Shechem"],
    35: ["Return to Bethel", "Death of Rachel and Isaac", "Benjamin's birth"],
    36: ["Esau's genealogy", "Chiefs of Edom", "The land of Seir"],
  };

  const chapterPoints37to50: Record<number, string[]> = {
    37: ["Joseph's dreams", "Sold into slavery", "Jacob's mourning"],
    38: ["Judah and Tamar", "Birth of Perez and Zerah", "Family lineage"],
    39: ["Joseph in Potiphar's house", "Potiphar's wife's accusation", "Joseph in prison"],
    40: ["The cupbearer and baker", "Joseph interprets dreams", "Forgotten in prison"],
    41: ["Pharaoh's dreams", "Joseph becomes ruler", "The gathering of grain"],
    42: ["Joseph's brothers in Egypt", "First meeting in Egypt", "The return for Benjamin"],
    43: ["Return with Benjamin", "Feast at Joseph's house", "Brotherly recognition"],
    44: ["The silver cup test", "Judah's plea for Benjamin", "Sacrificial love"],
    45: ["Joseph reveals himself", "Reunion with brothers", "Invitation to Jacob"],
    46: ["Jacob moves to Egypt", "Meeting Joseph in Goshen", "God's promise at Beersheba"],
    47: ["Presentation to Pharaoh", "Famine management", "Jacob's request"],
    48: ["Jacob blesses Ephraim and Manasseh", "Adopted grandsons", "Crossing hands"],
    49: ["Jacob's blessing on 12 sons", "Prophetic words", "Death of Jacob"],
    50: ["Mourning for Jacob", "Joseph's brothers' fear", "Joseph's death and hope"],
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Genesis Quiz Hub | Book of Beginnings Study Guide"
        description="Master the first book of the Bible with our comprehensive Genesis study hub. Deep theological insights, life lessons, and interactive chapter quizzes."
        url="/bible-questions-and-answers-hub/genesis"
      />
      <Navigation />

      {/* Modern Hero Section with Cinematic Background */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={GENESIS_IMAGES.creation} 
            alt="Genesis Creation Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20s] hover:scale-110"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-light tracking-widest uppercase">The Book of Beginnings</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Genesis <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            From the dawn of creation to the providential journey of Joseph. A comprehensive interactive portal to master the foundation of Scripture.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-8 text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => document.getElementById('difficulty')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin Quiz Journey
            </Button>
            <Button size="lg" variant="outline" className="border-black/20 text-black hover:bg-black/5 backdrop-blur-sm px-10 py-8 text-lg rounded-2xl font-light transition-all active:scale-95" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Content
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10 relative">
        {/* Breadcrumb - Clean & Minimal */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Genesis</span>
        </div>

        {/* Narrative Overview Segment: Intro */}
        <section id="overview" className="mb-40 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <span className="w-12 h-px bg-gray-200 mr-6" />
                  The Foundations
                </h2>
                <h3 className="text-5xl md:text-6xl font-normal leading-tight text-gray-900">A Majestic Start to the Divine Narrative</h3>
              </div>
              <p className="text-2xl font-light text-gray-600 leading-[1.8] first-letter:text-6xl first-letter:font-serif first-letter:mr-4 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Genesis, the first book of the Bible, serves as the majestic foundation for the entire scriptural narrative. Its name, derived from the Greek word for 'origin' or 'beginning,' perfectly encapsulates its purpose: to detail the beginning of the universe, humanity, sin, and God's plan for redemption.
              </p>
              <div className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-start space-x-8 hover:shadow-xl transition-all duration-500">
                <Quote className="w-12 h-12 text-gray-200 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="text-xl italic font-light text-gray-500 leading-relaxed">
                    "In the beginning, God created the heavens and the earth."
                  </p>
                  <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">— Genesis 1:1</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gray-50 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={GENESIS_IMAGES.eden} 
                alt="Majestic Garden of Eden" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[600px] border border-white"
              />
              <div className="absolute -bottom-10 -left-10 z-20 p-10 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl max-w-xs transition-transform group-hover:translate-x-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Key Pillar</p>
                <p className="text-xl font-light text-gray-900 leading-snug tracking-tight italic">Exploring the Lost Paradise & God's Original Intent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theological Insight Section - High End Dark Mode Card */}
        <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl shadow-gray-900/40">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-16">Theological Significance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Layers className="w-8 h-8 text-blue-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">Sovereign Creator & Covenant-Maker</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    Genesis establishes the 'Kingdom' pattern: God's people in God's place under God's rule. Crucially, Genesis 3:15 (the Protoevangelium) provides the first prophecy of the Messiah, promising that the 'seed of the woman' would eventually crush the head of the serpent.
                  </p>
                </div>
              </div>
              <div className="space-y-10 group">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-green-400" strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-normal leading-tight italic serif">Justification by Faith</h3>
                  <p className="text-xl font-light text-white/50 leading-relaxed">
                    The book introduces the concept of 'Justification by Faith' through Abraham (Genesis 15:6), a theme that becomes the cornerstone of the New Testament gospel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge/Difficulty Section - Preserving Existing Functionality with Better UI */}
        <section id="difficulty" className="mb-40 scroll-mt-24">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif">Master Genesis</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">Choose your study depth and test your grasp of the book's complex narratives.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                level: "Beginner", 
                desc: "Focus on iconic stories: Creation, Noah, Abraham, and Joseph.", 
                icon: BookOpen, 
                color: "bg-green-50", 
                iconColor: "text-green-600",
                link: "beginner",
                accent: "bg-green-500",
                features: ["Visual storytelling", "Core characters", "Essential verses"]
              },
              { 
                level: "Intermediate", 
                desc: "Deep dive into covenants, genealogies, and geographic names.", 
                icon: Brain, 
                color: "bg-yellow-50", 
                iconColor: "text-yellow-600",
                link: "intermediate",
                accent: "bg-yellow-500",
                features: ["Covenant details", "Geography & maps", "Jacob's family tree"]
              },
              { 
                level: "Advanced", 
                desc: "Master Hebrew terms, chronologies, and subtle scriptural parallels.", 
                icon: Swords, 
                color: "bg-red-50", 
                iconColor: "text-red-600",
                link: "advanced",
                accent: "bg-red-500",
                features: ["Theological depth", "Chronology tasks", "Contextual cross-refs"]
              }
            ].map((d) => (
              <Card 
                key={d.level} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/${d.link}`)}
              > 
                <div className={`h-2 w-full ${d.accent} absolute top-0`} />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500`}>
                    <d.icon className={`w-8 h-8 ${d.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{d.level}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Genesis Study Track</CardDescription>
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
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">Start Challenge</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Narrative Flow: Judgment & Renewal */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-6 bg-blue-50 rounded-[3rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
              <img 
                src={GENESIS_IMAGES.flood} 
                alt="The Flood & Noah's Ark" 
                className="relative z-10 w-full rounded-[2.5rem] shadow-2xl object-cover h-[700px] border border-white"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400 flex items-center">
                <span className="w-12 h-px bg-gray-200 mr-6" />
                Judgment & Mercy
              </h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif">The Chronicle of the Great Flood</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8]">
                From paradise lost, Genesis traces the descending spiral of human rebellion—from Cain's murder of Abel to the wickedness that necessitated the Great Flood. In the ark, God provides a vessel of mercy, establishing a promise that endures for every generation.
              </p>
              <div className="flex items-center space-x-6 p-10 bg-blue-50/40 rounded-[2.5rem] border border-blue-100/50 hover:bg-blue-50 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200/50">
                  <Quote className="w-7 h-7 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 text-xl font-light italic leading-relaxed">"But Noah found favor in the eyes of the Lord."</p>
                  <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">— Genesis 6:8</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Hubs Section */}
        <section className="mb-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Specialized Hubs</h2>
              <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Targeted Training</h3>
              <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Specific training tools for targeted memorization and logic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  title: "Fill in the Blanks", 
                  desc: "Scripture memorization", 
                  icon: Quote, 
                  link: "fill-in-the-blanks",
                  color: "bg-amber-50",
                  iconColor: "text-amber-600"
                },
                { 
                  title: "True or False", 
                  desc: "Rapid logic testing", 
                  icon: ShieldCheck, 
                  link: "true-false",
                  color: "bg-blue-50",
                  iconColor: "text-blue-600"
                },
                { 
                  title: "Patriarchs", 
                  desc: "Character focused", 
                  icon: Users, 
                  link: "characters",
                  color: "bg-emerald-50",
                  iconColor: "text-emerald-600"
                },
                { 
                  title: "Timeline Match", 
                  desc: "Historical sequencing", 
                  icon: ListOrdered, 
                  link: "match-the-following",
                  color: "bg-indigo-50",
                  iconColor: "text-indigo-600"
                }
              ].map((tool) => (
                <Card 
                  key={tool.title}
                  className="group hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer border-none bg-white rounded-[2rem] overflow-hidden"
                  onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/${tool.link}`)}
                >
                  <CardHeader className="pt-12 pb-8 px-8">
                    <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center mb-8`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-2xl font-normal text-gray-900 italic serif mb-2">{tool.title}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 leading-relaxed">
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
        <section id="genesis-chapter-wise" className="mb-40 scroll-mt-24 pt-32 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif">The Chapter Library</h2>
              <p className="text-2xl font-light text-gray-400 leading-relaxed">Each of the 50 chapters contains unique study materials, summaries, and specialized quizzes.</p>
            </div>
            {/* Search Bar - Modern & Large */}
            <div className="w-full lg:w-[450px]">
              <div className="relative group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/0 group-focus-within:bg-black/10 transition-colors" />
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-300 w-6 h-6" strokeWidth={1} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chapter # or keyword (e.g. 'Noah')..."
                  className="pl-20 pr-10 py-10 text-xl font-light border-0 bg-gray-50/50 focus:bg-white focus:ring-0 rounded-[2rem] shadow-inner transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints[ch];
              else if (ch >= 9 && ch <= 12) currentChapterPoints = chapterPoints9to12[ch];
              else if (ch >= 13 && ch <= 16) currentChapterPoints = chapterPoints13to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 36) currentChapterPoints = chapterPoints25to36[ch];
              else if (ch >= 37 && ch <= 50) currentChapterPoints = chapterPoints37to50[ch];

              return (
                <Card 
                  key={ch} 
                  className="group relative border border-gray-100 hover:border-black/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col h-full cursor-pointer bg-white shadow-xl shadow-gray-200/20 rounded-[2.5rem] overflow-hidden p-2" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/chapter-${ch}`)}
                >
                  <CardHeader className="p-10 pb-6">
                    <div className="text-[5rem] font-serif italic text-gray-50 absolute -top-4 -right-2 transition-colors group-hover:text-gray-100 leading-none select-none">
                      {ch}
                    </div>
                    <CardTitle className="text-3xl font-normal text-gray-900 relative z-10">Chapter {ch}</CardTitle>
                    <CardDescription className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] relative z-10 mt-3 block">
                      {ch === 1 && "Creation"}
                      {ch === 2 && "The Garden"}
                      {ch === 3 && "The Fall"}
                      {ch === 4 && "First Blood"}
                      {ch === 5 && "The Lineage"}
                      {ch === 6 && "The Nephilim"}
                      {ch === 7 && "The Storm"}
                      {ch === 8 && "New Earth"}
                      {ch === 12 && "The Call"}
                      {ch === 15 && "The Oath"}
                      {ch === 22 && "The test"}
                      {ch === 37 && "The Dreams"}
                      {ch === 50 && "The End"}
                      {(![1,2,3,4,5,6,7,8,12,15,22,37,50].includes(ch)) && "Genesis Study"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-10 pb-10 flex-grow">
                    {currentChapterPoints && (
                      <ul className="text-base font-light text-gray-500 space-y-4">
                        {currentChapterPoints.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2.5 mr-4 shrink-0 transition-colors group-hover:bg-black/30" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <div className="p-4 bg-gray-50 group-hover:bg-black text-gray-400 group-hover:text-white transition-all text-center rounded-[1.5rem] mt-auto mx-4 mb-4 text-xs font-semibold tracking-widest uppercase">
                    View Details →
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination Component - Modernized */}
          {totalChapterPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-16">
              <Button 
                variant="ghost" 
                size="lg" 
                className="font-light tracking-[0.3em] uppercase text-[10px] hover:bg-gray-50 px-10 py-8 rounded-2xl"
                disabled={chapterPage === 0} 
                onClick={() => setChapterPage(p => p - 1)}
              >
                ← Prev
              </Button>
              <div className="flex gap-4">
                {Array.from({length: totalChapterPages}).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setChapterPage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 scale-100 ${chapterPage === i ? 'bg-black w-8' : 'bg-gray-200 hover:bg-gray-300'}`} 
                  />
                ))}
              </div>
              <Button 
                variant="ghost" 
                size="lg" 
                className="font-light tracking-[0.3em] uppercase text-[10px] hover:bg-gray-50 px-10 py-8 rounded-2xl"
                disabled={chapterPage >= totalChapterPages - 1} 
                onClick={() => setChapterPage(p => p + 1)}
              >
                Next →
              </Button>
            </div>
          )}
        </section>

        {/* Narrative Segment: Abraham's Promise */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400">Patriarchal Age</h2>
              <h3 className="text-5xl font-normal leading-tight text-gray-900 italic serif">Abraham & The Promise of Stars</h3>
              <p className="text-2xl font-light text-gray-600 leading-[1.8]">
                In Chapter 12, the narrative shifts dramatically from the global stage to a single family. God calls Abram out of Ur, promising to make him a great nation through which all families of the earth will be blessed. This covenant is the pulsating heartbeat of the entire Bible.
              </p>
              <div className="space-y-6 pt-6">
                {[
                  { id: "01", text: "The call from Ur into the unknown" },
                  { id: "02", text: "The unconditional oath of Genesis 15" },
                  { id: "03", text: "The ultimate trial on Mount Moriah" }
                ].map(item => (
                  <div key={item.id} className="flex items-center space-x-6 group">
                    <div className="text-sm font-bold tracking-tighter text-gray-200 group-hover:text-black transition-colors">{item.id}</div>
                    <p className="text-xl font-light text-gray-500 group-hover:text-black transition-colors">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[3.5rem] group shadow-2xl border border-white">
              <img 
                src={GENESIS_IMAGES.abraham} 
                alt="Abraham Looking at Stars" 
                className="w-full h-[750px] object-cover transition-transform duration-[4s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-16 left-16 right-16 text-white space-y-6">
                <p className="text-4xl md:text-5xl font-light italic serif leading-tight">"Look up at the sky and count the stars..."</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-px bg-white/40" />
                  <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-semibold">Genesis 15:5</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars of Truth: Key Verse Grid - High End Cards */}
        <section className="mb-40 py-32 bg-gray-50 rounded-[5rem] px-10 lg:px-20 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/[0.03] rounded-full blur-[120px]" />
          
          <div className="relative z-10 mb-20">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-6 italic serif">Scriptural Anchors</h2>
            <p className="text-2xl font-light text-gray-400 max-w-2xl mx-auto italic">Master the key verses that hold the theological weight of the book.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { ref: "Genesis 1:1", text: "In the beginning, God created the heavens and the earth.", theme: "Creation", sub: "Establishing God's absolute sovereignty." },
              { ref: "Genesis 12:3", text: "I will bless those who bless you... and all peoples on earth will be blessed through you.", theme: "The Blessing", sub: "The source of the messianic line." },
              { ref: "Genesis 50:20", text: "You intended to harm me, but God intended it for good to accomplish the saving of many lives.", theme: "Providence", sub: "The ultimate summary of Joseph's life." }
            ].map((v) => (
              <div key={v.ref} className="bg-white p-14 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group text-left h-full flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300 mb-8 block group-hover:text-black transition-colors">{v.theme}</div>
                  <p className="text-3xl font-light italic text-gray-900 leading-[1.6] mb-10 group-hover:text-black">"{v.text}"</p>
                  <p className="text-base font-light text-gray-400 leading-relaxed mb-6">{v.sub}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-10">
                  <span className="font-serif italic text-2xl text-black">{v.ref}</span>
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center transition-transform group-hover:rotate-12 duration-500">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Life Lessons Segment */}
        <section className="mb-40">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-10">Modern Wisdom</h2>
            <h3 className="text-6xl font-normal mb-20 italic serif">Life Lessons from Beginnings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Objective Purpose", 
                  text: "You are not an accident. Genesis teaches that we are created with absolute intention, bearing the Image of God.",
                  icon: Sparkles,
                  color: "bg-blue-50",
                  textCol: "text-blue-600"
                },
                { 
                  title: "The Invisible Hand", 
                  text: "God's Providence works through our mistakes and others' ill-intent to bring about ultimate redemption.",
                  icon: ShieldCheck,
                  color: "bg-green-50",
                  textCol: "text-green-600"
                },
                { 
                  title: "Radical Trust", 
                  text: "Living by faith means stepping into the unknown based on the character of the Promise-Maker.",
                  icon: Compass,
                  color: "bg-purple-50",
                  textCol: "text-purple-600"
                }
              ].map(item => (
                <div key={item.title} className="p-12 rounded-[3.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 text-left hover:shadow-2xl transition-all duration-500 group">
                  <div className={`w-20 h-20 rounded-3xl ${item.color} flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform`}>
                    <item.icon className={`w-10 h-10 ${item.textCol}`} />
                  </div>
                  <h4 className="text-2xl font-normal mb-6 italic serif">{item.title}</h4>
                  <p className="text-lg font-light text-gray-500 leading-[1.7]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialty Quiz Grid: High End Selection */}
        <section id="types" className="mb-40 scroll-mt-24 py-32 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 italic serif">Specialized Hubs</h2>
            <p className="text-xl font-light text-gray-400 max-w-sm">Specific training tools for targeted memorization and logic.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Fill in the Blanks", desc: "Scripture memorization", icon: Quote, link: "fill-in-the-blanks" },
              { title: "True or False", desc: "Rapid logic testing", icon: ShieldCheck, link: "true-false" },
              { title: "Patriarchs", desc: "Character focused", icon: Brain, link: "characters" },
              { title: "Timeline Match", desc: "Historical sequencing", icon: ListOrdered, link: "match-the-following" }
            ].map((t) => (
              <div 
                key={t.title} 
                className="group cursor-pointer p-10 rounded-[3rem] border border-gray-100/60 bg-white hover:bg-gray-50/50 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 text-center shadow-lg shadow-gray-200/20 flex flex-col items-center" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/${t.link}`)}
              > 
                <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex items-center justify-center mb-10 group-hover:scale-110 shadow-inner transition-transform duration-500">
                  <t.icon className="w-9 h-9 text-gray-700" strokeWidth={1} />
                </div>
                <h4 className="text-2xl font-normal text-gray-900 mb-3 italic serif">{t.title}</h4>
                <p className="text-sm font-light text-gray-400 uppercase tracking-widest">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
