import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Quote, Sparkles, Compass, ShieldCheck, Users, Flame, Heart, Tent, Cross } from "lucide-react";
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
  
  useEffect(() => { 
    setChapterPage(0); 
  }, [query]);

  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  const chapterMap: Record<number, string[]> = {
    1: ["Burnt Offerings: Laws for voluntary animals as a pleasing aroma"],
    2: ["Grain Offerings: Instructions for fine flour, oil, and frankincense"],
    3: ["Peace Offerings: Rituals for fellowship offerings from the herd"],
    4: ["Sin Offerings: Atonement for unintentional collective/individual sins"],
    5: ["Guilt Offerings: Restitution for sins involving holy things"],
    6: ["Altar Fire: Priestly duties and perpetual flame maintenance"],
    7: ["Priestly Portions: Laws concerning the priests' share of offerings"],
    8: ["The Ordination: Consecration of Aaron and sons before all Israel"],
    9: ["First Sacrifices: Aaron's ministry begins; glory of LORD appears"],
    10: ["Nadab and Abihu: The judgment for offering unauthorized fire"],
    11: ["Clean and Unclean: Defining land, sea, and air dietary laws"],
    12: ["Purification: Laws concerning offerings after childbirth"],
    13: ["Leprosy Laws: Procedures for managing infectious skin diseases"],
    14: ["Cleansing the Leper: Rituals for restoration to the community"],
    15: ["Bodily Discharges: Mantaining ceremonial purity in daily life"],
    16: ["Day of Atonement: Annual ritual in the Most Holy Place"],
    17: ["The Central Altar: Sacrifice at the Tabernacle & sanctity of blood"],
    18: ["Forbidden Relations: Moral laws against Egyptian/Canaanite acts"],
    19: ["Holiness in Life: Social justice and neighborly love requirements"],
    20: ["Penalties for Sin: Consequences for idolatry and moral failures"],
    21: ["Priestly Purity: High standards for those serving the altar"],
    22: ["Holy Offerings: Purity for eating and sacrificial perfection"],
    23: ["Appointed Feasts: The sacred calendar from Sabbath to Tabernacles"],
    24: ["Lamp and Showbread: Sanctuary light and bread of Presence laws"],
    25: ["Sabbath and Jubilee: Land rest and liberty in the fiftieth year"],
    26: ["Blessings and Curses: Promises for obedience vs warnings for rebellion"],
    27: ["Vows and Tithes: Regulations for vows and the holy tithe"],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Urbanist',sans-serif]">
      <SEO 
        title="Leviticus Hub | Biblical Holiness & Purity Training"
        description="Master the book of Leviticus with cinematic training modules, 27 detailed chapter quizzes, and deep narratives on the holiness of God."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={LEVITICUS_IMAGES.hero} 
            alt="The Tabernacle sacrifice" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-fade-in">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium tracking-wider uppercase">The School of Holiness</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight leading-none">
            LEVITICUS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Uncover the profound rituals, moral codes, and the eternal standard of holiness that bridging the gap between God and man.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
                onClick={() => navigate("/quiz/leviticus-1-27")}
                className="bg-white text-black hover:bg-black hover:text-white px-10 py-8 text-xl rounded-2xl transition-all duration-500 font-bold group border-2 border-transparent hover:border-white shadow-2xl"
            >
              Start Full Journey
              <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
                variant="outline"
                onClick={() => document.getElementById('chapter-library')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 px-10 py-8 text-xl rounded-2xl backdrop-blur-sm transition-all duration-500 font-semibold"
            >
              Explore Chapters
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* Narrative Section 1: Sacrifice & Priesthood */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 text-yellow-400 opacity-80 uppercase tracking-[0.2em] font-bold text-sm">
              <Flame className="w-5 h-5" />
              <span>Phase I: The Way to God</span>
            </div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight">
              Atonement Through <span className="text-yellow-500 italic">Sacrifice</span>
            </h2>
            <div className="prose prose-invert prose-lg text-gray-400 max-w-none space-y-4">
              <p>
                Leviticus begins where Exodus ended—at the entrance of the Tabernacle. It provides the essential vocabulary for dwelling with a Holy God. Through the systems of burnt, grain, peace, sin, and guilt offerings, we discover the weight of transgression and the pathway of restoration.
              </p>
              <p>
                Chapters 8-10 establish the Priesthood, the mediators who guard the sacred space and represent the people. This section culminates in the inaugural fire from heaven, shadowed by the tragedy of unauthorized fire.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-yellow-500/50 transition-colors">
                    <ListOrdered className="w-8 h-8 text-yellow-500 mb-3" />
                    <h4 className="font-bold mb-1 group-hover:text-yellow-500 transition-colors">The Offerings</h4>
                    <p className="text-sm text-gray-500">Master every ritual and its symbolic meaning from Chapters 1-7.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-yellow-500/50 transition-colors">
                    <ShieldCheck className="w-8 h-8 text-yellow-500 mb-3" />
                    <h4 className="font-bold mb-1 group-hover:text-yellow-500 transition-colors">The Priesthood</h4>
                    <p className="text-sm text-gray-500">Study the ordination and the heavy calling of the Levites.</p>
                </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-[2rem] border border-white/10">
            <img 
              src={LEVITICUS_IMAGES.sacrifices} 
              alt="Sacrificial Altar" 
              className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                    <p className="font-bold text-lg mb-1 italic">"It is the blood that makes atonement..."</p>
                    <p className="text-white/60 text-sm italic">— Leviticus 17:11</p>
                </div>
            </div>
          </div>
        </div>

        {/* Narrative Section 2: Purity & Feasts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 lg:order-last">
            <img 
              src={LEVITICUS_IMAGES.feasts} 
              alt="The Appointed Feasts" 
              className="w-full aspect-square object-cover transition-transform duration-1000 group-hover:scale-110 shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                    <p className="font-bold text-lg mb-1 italic">"You shall be holy, for I am holy..."</p>
                    <p className="text-white/60 text-sm italic">— Leviticus 19:2</p>
                </div>
            </div>
          </div>
          <div className="space-y-8 lg:order-first">
            <div className="inline-flex items-center gap-2 text-yellow-400 opacity-80 uppercase tracking-[0.2em] font-bold text-sm">
              <Users className="w-5 h-5" />
              <span>Phase II: The Walk with God</span>
            </div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight text-white">
              Holiness in the <span className="text-yellow-500 italic">Everyday</span>
            </h2>
            <div className="prose prose-invert prose-lg text-gray-400 max-w-none space-y-4">
              <p>
                Atonement leads to action. The second half of Leviticus (Chapters 11-27) defines what it means to live as a holy people in a broken world. This "Holiness Code" covers everything from dietary laws to business ethics and neighborly love.
              </p>
              <p>
                The chapter on the Day of Atonement (16) serves as the heart of the book, while Chapter 23 outlines the sacred rhythm of time through the annual festivals, calling a nation to remember, rest, and celebrate.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 text-white">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-yellow-500/50 transition-colors">
                    <Compass className="w-8 h-8 text-yellow-500 mb-3" />
                    <h4 className="font-bold mb-1 group-hover:text-yellow-500 transition-colors">Sacred Rhythm</h4>
                    <p className="text-sm text-gray-500 font-medium">Master the Feasts and the significance of the Sabbath Years.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-yellow-500/50 transition-colors">
                    <Heart className="w-8 h-8 text-yellow-500 mb-3" />
                    <h4 className="font-bold mb-1 group-hover:text-yellow-500 transition-colors">Holiness Code</h4>
                    <p className="text-sm text-gray-500 font-medium">Learn the laws of social justice and individual purity.</p>
                </div>
            </div>
          </div>
        </div>

        {/* Chapter Library Grid */}
        <section id="chapter-library" className="bg-white/5 rounded-[3rem] p-12 border border-white/10 shadow-3xl">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-5xl font-bold mb-4">Chapter Library</h2>
              <p className="text-gray-400 font-medium italic">27 chapters of concentrated training. Find your focus.</p>
            </div>
            <div className="w-full md:w-96 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
              <Input 
                placeholder="Search by chapter number..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 bg-black border-white/20 text-white rounded-2xl h-14 text-lg focus:ring-yellow-500/50"
              />
            </div>
          </div>

          {filteredChapters.length === 0 ? (
            <div className="text-center py-32 bg-black/40 rounded-3xl border border-dashed border-white/10">
              <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-2xl text-gray-500 font-light italic">No chapters matching your search...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2 rounded-3xl min-h-[420px]">
                {visibleChapters.map((num) => (
                  <div 
                    key={num}
                    onClick={() => navigate(`/quiz/leviticus-${num}`)}
                    className="group relative cursor-pointer overflow-hidden rounded-3xl bg-black border border-white/10 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/10 transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full bg-gradient-to-b from-black to-white/5 active:scale-95"
                  >
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-6xl font-black text-white/5 group-hover:text-yellow-500/20 transition-colors duration-700 leading-none">
                          {num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-400 transition-all duration-500 shadow-inner">
                          <ChevronRight className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold tracking-tight group-hover:text-yellow-500 transition-colors uppercase">
                          Leviticus {num}
                        </h4>
                        <div className="h-px w-12 bg-white/20 group-hover:w-full group-hover:bg-yellow-500/50 transition-all duration-700" />
                        <ul className="space-y-3">
                          {chapterMap[num]?.map((pt, i) => (
                            <li key={i} className="text-sm text-gray-400 font-medium leading-relaxed italic line-clamp-3">
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-12 bg-black/40 p-4 rounded-3xl border border-white/5">
                <p className="text-gray-500 font-medium tracking-wide">
                  Showing <span className="text-white">{startIdx + 1}</span> to <span className="text-white">{endIdx}</span> of {filteredChapters.length}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    disabled={chapterPage === 0}
                    onClick={() => setChapterPage(p => p - 1)}
                    className="h-12 w-12 rounded-xl border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalChapterPages }, (_, i) => (
                      <div 
                        key={i}
                        className={`w-3 h-3 rounded-full mt-4 mx-1 transition-all duration-500 ${i === chapterPage ? "bg-yellow-500 scale-125 shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    disabled={chapterPage >= totalChapterPages - 1}
                    onClick={() => setChapterPage(p => p + 1)}
                    className="h-12 w-12 rounded-xl border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Specialized Training Modules */}
        <section className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-6xl font-bold mb-6 tracking-tight">Advanced Mastery</h2>
            <p className="text-gray-400 text-xl font-light italic">Sharpen your understanding through targeted narrative modules.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#111] border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-500 group rounded-[2.5rem]">
              <CardHeader className="p-0">
                <div className="h-48 relative overflow-hidden">
                  <img src={LEVITICUS_IMAGES.priesthood} alt="The Priests" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-yellow-500 transition-colors leading-tight">THE HOLINESS CODE</CardTitle>
                <CardDescription className="text-gray-400 font-medium italic line-clamp-3">Master the intricate moral and ceremonial laws that defined Israel's identity as a kingdom of priests.</CardDescription>
                <Button className="w-full bg-white/5 hover:bg-yellow-500 hover:text-black py-6 rounded-2xl transition-all font-bold tracking-wider active:scale-95 border border-white/10 group-hover:border-transparent uppercase">Join Ministry</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-500 group rounded-[2.5rem]">
              <CardHeader className="p-0">
                <div className="h-48 relative overflow-hidden">
                  <img src={LEVITICUS_IMAGES.sacrifices} alt="Tabernacle" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                  <Flame className="w-6 h-6 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-yellow-500 transition-colors leading-tight uppercase">Blood & Atonement</CardTitle>
                <CardDescription className="text-gray-400 font-medium italic line-clamp-3 text-white/50">Experience the profound symbolism of the Day of Atonement and the theology of substitutionary sacrifice.</CardDescription>
                <Button className="w-full bg-white/5 hover:bg-yellow-500 hover:text-black py-6 rounded-2xl transition-all font-bold tracking-wider active:scale-95 border border-white/10 group-hover:border-transparent uppercase">Enter Sanctuary</Button>
              </CardContent>
            </Card>

            <Card className="bg-[#111] border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-500 group rounded-[2.5rem]">
              <CardHeader className="p-0">
                <div className="h-48 relative overflow-hidden">
                  <img src={LEVITICUS_IMAGES.feasts} alt="The Feasts" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-yellow-500 transition-colors leading-tight uppercase tracking-tight">THE SACRED CALENDAR</CardTitle>
                <CardDescription className="text-gray-400 font-medium italic line-clamp-3 text-white/50">Walk through the seven annual festivals and uncover their prophetic significance for Israel and the world.</CardDescription>
                <Button className="w-full bg-white/5 hover:bg-yellow-500 hover:text-black py-6 rounded-2xl transition-all font-bold tracking-wider active:scale-95 border border-white/10 group-hover:border-transparent uppercase">Begin Pilgrimage</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Training Modes Section */}
        <section className="bg-gradient-to-br from-yellow-900/10 to-transparent rounded-[3rem] p-16 border border-yellow-500/10 backdrop-blur-3xl shadow-3xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl font-bold leading-tight uppercase tracking-tight">Refine Your <br /><span className="text-yellow-500">Holiness Study</span></h2>
              <p className="text-gray-400 text-xl font-light italic leading-loose">
                Our advanced training modes leverage cognitive science to ensure you don't just memorize the laws, but master their spiritual DNA.
              </p>
              <div className="space-y-6 pt-4 italic">
                {[
                  { icon: Brain, title: "Narrative Memory", desc: "Connect ritual laws to historical events." },
                  { icon: Swords, title: "High Priest Challenge", desc: "A rigorous mode for those who seek total book mastery." },
                  { icon: Layers, title: "Prophetic Depth", desc: "Discover the New Testament fulfillment in every shadow." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 transition-all duration-300 active:scale-90">
                      <item.icon className="w-6 h-6 text-yellow-500 group-hover:text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-yellow-400 transition-colors italic">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative p-2 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-700 active:rotate-1">
              <img src={LEVITICUS_IMAGES.holiness} alt="Holiness glory" className="rounded-[2.2rem] shadow-3xl opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                <blockquote className="space-y-4 max-w-sm">
                  <Quote className="w-12 h-12 text-yellow-500 opacity-50 shadow-2xl" />
                  <p className="text-2xl font-medium text-white italic leading-snug">"Through those who are near me I will be sanctified..."</p>
                  <cite className="block text-yellow-500/70 font-bold tracking-[0.2em] text-sm italic uppercase">— Leviticus 10:3</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}