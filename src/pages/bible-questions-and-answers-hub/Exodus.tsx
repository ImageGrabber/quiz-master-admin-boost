import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Menu } from "lucide-react";
import SEO from "@/components/SEO";

export default function ExodusHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const chapterNumbers = Array.from({ length: 40 }, (_, i) => i + 1);
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
  const chapterPoints: Record<number, string[]> = {
    1: [
      "Israel multiplies in Egypt",
      "New Pharaoh's oppression",
      "Midwives Shiphrah and Puah obey God",
    ],
    2: [
      "Birth and hiding of Moses",
      "Pharaoh's daughter finds Moses",
      "Moses flees to Midian; marries Zipporah",
    ],
    3: [
      "The Burning Bush at Horeb",
      "The Name of God: 'I AM WHO I AM'",
      "Moses commissioned to deliver Israel",
    ],
    4: [
      "Three signs for Moses (staff, hand, water)",
      "Aaron appointed as spokesman",
      "Return to Egypt; circumcision incident",
    ],
    5: [
      "First audience with Pharaoh",
      "Bricks without straw decree",
      "Israelite officers' complaint",
    ],
    6: [
      "God's promise of deliverance renewed",
      "Genealogy of Reuben, Simeon, and Levi",
      "Moses and Aaron's charge",
    ],
    7: [
      "Moses' staff becomes a serpent",
      "Plague 1: Nile turned to blood",
      "Egyptian magicians' imitation",
    ],
    8: [
      "Plague 2: Frogs cover the land",
      "Plague 3: Gnats (Dust to lice)",
      "Plague 4: Swarms of flies",
    ],
  };

  // Detailed bullet points for chapters 9–12
  const chapterPoints9to12: Record<number, string[]> = {
    9: [
      "Plague 5: Egyptian livestock die",
      "Plague 6: Boils on man and beast",
      "Plague 7: Thunder and hail",
    ],
    10: [
      "Plague 8: Locusts consume the land",
      "Plague 9: Three days of darkness",
      "Pharaoh's heart remains hardened",
    ],
    11: [
      "Final plague announced: death of firstborn",
      "Israelites ask for silver and gold",
      "Pharaoh refuses to let the people go",
    ],
    12: [
      "Passover instructions; the blood sign",
      "Feast of Unleavened Bread instituted",
      "Death of firstborn; the Exodus begins",
    ],
  };

  // Detailed bullet points for chapters 13–16
  const chapterPoints13to16: Record<number, string[]> = {
    13: [
      "Consecration of the firstborn",
      "God leads by pillars of cloud and fire",
      "Bones of Joseph carried out",
    ],
    14: [
      "Crossing of the Red Sea",
      "Egyptians pursue and are drowned",
      "Israel fears and trusts the Lord",
    ],
    15: [
      "The Song of Moses and Miriam",
      "Waters of Marah made sweet",
      "Arrival at Elim's springs and palms",
    ],
    16: [
      "Manna and quail provided in the desert",
      "Sabbath regulations for manna",
      "Pot of manna kept as a testimony",
    ],
  };

  // Detailed bullet points for chapters 17–24
  const chapterPoints17to24: Record<number, string[]> = {
    17: [
      "Water from the rock at Rephidim",
      "Victory over Amalek; Moses' hands held up",
      "The Lord is my Banner (Jehovah Nissi)",
    ],
    18: [
      "Jethro (Moses' father-in-law) visits",
      "Advice on delegating judgment",
      "Appointment of capable leaders",
    ],
    19: [
      "Arrival at Mount Sinai",
      "Consecration of the people",
      "God's descent in fire and cloud",
    ],
    20: [
      "The Ten Commandments given",
      "People's fear of the divine voice",
      "Altar laws: unhewn stones",
    ],
    21: [
      "Laws concerning Hebrew slaves",
      "Legislation on personal injuries",
      "Restitution and property rights",
    ],
    22: [
      "Laws on social responsibility",
      "Protection of widows and orphans",
      "Moral and religious regulations",
    ],
    23: [
      "Justice for all; Sabbath years/days",
      "Three annual feasts commanded",
      "Promise of the Angel's guidance",
    ],
    24: [
      "The Covenant confirmed with blood",
      "Moses and elders see God on the sapphire pavement",
      "Moses enters the cloud for forty days",
    ],
  };

  // Detailed bullet points for chapters 25–32
  const chapterPoints25to32: Record<number, string[]> = {
    25: [
      "Offering for the Tabernacle",
      "Ark of the Covenant design",
      "Table for the Bread and Lampstand",
    ],
    26: [
      "Curtains and frames of the Tabernacle",
      "The Veil and the Screen",
      "The Most Holy Place design",
    ],
    27: [
      "The Bronze Altar construction",
      "The Court of the Tabernacle",
      "Oil for the lamp regulations",
    ],
    28: [
      "Garments for the priesthood",
      "The Ephod and Breastpiece",
      "Urim and Thummim",
    ],
    29: [
      "Consecration of the priests",
      "Daily offerings on the altar",
      "God's promise to dwell among Israel",
    ],
    30: [
      "Altar of Incense and Ransom Money",
      "The Bronze Basin for washing",
      "Anointing Oil and Incense formulas",
    ],
    31: [
      "Bezalel and Oholiab called",
      "Sabbath as a sign",
      "Moses receives the two tablets",
    ],
    32: [
      "The Golden Calf rebellion",
      "Moses' intercession and anger",
      "The Levites' loyalty",
    ],
  };

  // Detailed bullet points for chapters 33–40
  const chapterPoints33to40: Record<number, string[]> = {
    33: [
      "The Command to leave Sinai",
      "The Tent of Meeting",
      "Moses sees God's glory",
    ],
    34: [
      "The New Tablets of Stone",
      "The Covenant renewed",
      "The radiant face of Moses",
    ],
    35: [
      "Sabbath laws and contributions",
      "The Tabernacle artisans begin",
      "Heart-stirred offerings from the people",
    ],
    36: [
      "Restraint of the offerings",
      "Curtains and boards constructed",
      "The Veil and Screen made",
    ],
    37: [
      "Making the Ark and Mercy Seat",
      "Making the Table and Lampstand",
      "Making the Altars and Anointing Oil",
    ],
    38: [
      "Making the Bronze Altar and Basin",
      "Construction of the Court",
      "Inventory of materials used",
    ],
    39: [
      "Making the Priestly garments",
      "Completion of the Tabernacle work",
      "Moses inspects and blesses the work",
    ],
    40: [
      "Setting up the Tabernacle",
      "Consecration of priests",
      "The Glory of the Lord fills the Tabernacle",
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Exodus Quiz Hub | Bible Quiz Competition"
        description="Explore the journey from slavery to the Tabernacle with our comprehensive Exodus study hub and interactive quizzes."
        url="/bible-questions-and-answers-hub/exodus"
      />
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Bible Q&A</button>
            <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Articles</button>
            <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            className="bg-black hover:bg-gray-800 font-urbanist font-light"
            onClick={() => navigate("/auth/register")}
          >
            Get Started
          </Button>
          <button className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col">
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white px-4 py-3 mx-4 mb-4 font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-urbanist font-normal text-gray-900 mb-6 leading-tight">
            Exodus Quiz Hub
          </h1>
          <p className="text-2xl font-urbanist font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the journey from slavery to the Tabernacle. Search through 40 chapters, take interactive quizzes, and master the second book of the Bible.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chapters 1–40 (e.g., '12' or 'Passover')..."
                className="pl-12 pr-4 py-4 text-lg font-urbanist font-light border border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#difficulty" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-urbanist font-light transition-colors">Difficulty</a>
            <a href="#ranges" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-urbanist font-light transition-colors">Ranges</a>
            <a href="#exodus-chapter-wise" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-urbanist font-light transition-colors">Chapter Wise</a>
            <a href="#types" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-urbanist font-light transition-colors">By Type</a>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-base font-urbanist font-light text-gray-500 mb-12">
          <button className="hover:text-gray-900" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Q&A Hub</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide">Exodus</span>
        </div>

        {/* Difficulty section */}
        <section id="difficulty" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-urbanist font-semibold text-gray-900">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/ch1-beginner")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-100">
                  <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-green-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-urbanist font-semibold text-gray-900">Beginner</CardTitle>
                <CardDescription className="text-lg font-urbanist font-light text-gray-600">10 questions on major events</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-urbanist font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Moses, Plagues, Passover & Red Sea highlights</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Fundamental stories and key characters</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-urbanist font-light border-gray-200 text-base py-6" variant="outline">Start Beginner</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/ch1-intermediate")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-yellow-100">
                  <Layers className="w-6 h-6 text-gray-700 group-hover:text-yellow-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-urbanist font-semibold text-gray-900">Intermediate</CardTitle>
                <CardDescription className="text-lg font-urbanist font-light text-gray-600">15 questions across the book</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-urbanist font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Wilderness journey, Sinai, and Commandments</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Focus on laws and historical context</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-urbanist font-light border-gray-200 text-base py-6" variant="outline">Start Intermediate</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/ch1-advanced")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-red-100">
                  <Swords className="w-6 h-6 text-gray-700 group-hover:text-red-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-urbanist font-semibold text-gray-900">Advanced</CardTitle>
                <CardDescription className="text-lg font-urbanist font-light text-gray-600">25 challenging questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-urbanist font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Tabernacle dimensions and specific laws</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Nuanced details for Bible scholars</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-urbanist font-light border-gray-300 bg-black text-white hover:bg-gray-800 text-base py-6">Start Advanced</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ranges section */}
        <section id="ranges" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-urbanist font-semibold text-gray-900">By Chapter Range</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { range: "1–12", title: "Slavery to Passover", desc: "Moses’ birth, Plagues, Freedom" },
              { range: "13–18", title: "Wilderness Journey", desc: "Red Sea, Manna, Jethro" },
              { range: "19–24", title: "Sinai & Covenant", desc: "Commandments, Law, Blood oath" },
              { range: "25–40", title: "Tabernacle", desc: "Designs, Golden Calf, Glory" }
            ].map((r) => (
              <Card key={r.range} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full bg-white group shadow-none">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-urbanist font-semibold text-gray-900">Exodus {r.range}</CardTitle>
                  <CardDescription className="text-lg font-urbanist font-light text-gray-600">{r.title}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <p className="text-base font-urbanist font-light text-gray-500 mb-4 leading-relaxed">{r.desc}</p>
                </CardContent>
                <CardContent className="pt-4 border-t border-gray-50">
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="w-full font-urbanist font-light text-base py-5" onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/ch${r.range.replace("–", "-")}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="w-full font-urbanist font-light bg-black text-white hover:bg-gray-800 text-base py-5" onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/ch${r.range.replace("–", "-")}-advanced`)}>Advanced Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Exodus Quiz Chapter Wise */}
        <section id="exodus-chapter-wise" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-urbanist font-semibold text-gray-900">Exodus Quiz Chapter Wise</h2>
            <div className="hidden sm:flex items-center text-sm font-urbanist font-light text-gray-500">
              Showing {filteredChapters.length} Chapters
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints[ch];
              else if (ch >= 9 && ch <= 12) currentChapterPoints = chapterPoints9to12[ch];
              else if (ch >= 13 && ch <= 16) currentChapterPoints = chapterPoints13to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 32) currentChapterPoints = chapterPoints25to32[ch];
              else if (ch >= 33 && ch <= 40) currentChapterPoints = chapterPoints33to40[ch];

              return (
                <Card key={ch} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full cursor-pointer group bg-white shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/chapter-${ch}`)}>
                  <CardHeader className="pb-3 border-b border-gray-50">
                    <CardTitle className="text-xl font-urbanist font-semibold text-gray-900">Chapter {ch}</CardTitle>
                    <CardDescription className="text-sm font-urbanist font-light text-gray-500 uppercase tracking-widest mt-1">
                      {ch === 1 && "Israel in Egypt"}
                      {ch === 2 && "Birth of Moses"}
                      {ch === 3 && "The Burning Bush"}
                      {ch === 4 && "Signs for Moses"}
                      {ch === 5 && "Moses and Pharaoh"}
                      {ch === 6 && "Promises of God"}
                      {ch === 7 && "The Nile to Blood"}
                      {ch === 8 && "Frogs, Gnats, Flies"}
                      {ch === 9 && "Livestock, Boils, Hail"}
                      {ch === 10 && "Locusts, Darkness"}
                      {ch === 11 && "Final Warning"}
                      {ch === 12 && "Passover"}
                      {ch === 13 && "Firstborn"}
                      {ch === 14 && "Red Sea"}
                      {ch === 15 && "Song & Marah"}
                      {ch === 16 && "Manna"}
                      {ch === 17 && "Water & Amalek"}
                      {ch === 18 && "Jethro"}
                      {ch === 19 && "At Sinai"}
                      {ch === 20 && "Commandments"}
                      {ch === 21 && "Injuries"}
                      {ch === 22 && "Property"}
                      {ch === 23 && "Justice"}
                      {ch === 24 && "Covenant"}
                      {ch === 25 && "Ark"}
                      {ch === 26 && "Curtains"}
                      {ch === 27 && "Altar"}
                      {ch === 28 && "Garments"}
                      {ch === 29 && "Consecration"}
                      {ch === 30 && "Incense"}
                      {ch === 31 && "Artisans"}
                      {ch === 32 && "Golden Calf"}
                      {ch === 33 && "God's Glory"}
                      {ch === 34 && "Renewal"}
                      {ch === 35 && "Offerings"}
                      {ch === 36 && "Construction"}
                      {ch === 37 && "Furniture"}
                      {ch === 38 && "Metals"}
                      {ch === 39 && "Garments Done"}
                      {ch === 40 && "Tabernacle"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    {currentChapterPoints && (
                      <ul className="text-sm font-urbanist font-light text-gray-600 space-y-1.5">
                        {currentChapterPoints.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardContent className="pt-2 border-t border-gray-50">
                    <Button variant="ghost" size="sm" className="w-full text-sm font-urbanist font-light group-hover:bg-gray-100">
                      Chapter Details →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {totalChapterPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="font-urbanist font-light"
                disabled={chapterPage === 0} 
                onClick={() => setChapterPage(p => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm font-urbanist font-light text-gray-500">Page {chapterPage + 1} of {totalChapterPages}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="font-urbanist font-light"
                disabled={chapterPage >= totalChapterPages - 1} 
                onClick={() => setChapterPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </section>

        {/* Types section */}
        <section id="types" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-urbanist font-semibold text-gray-900">By Type</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fill in the Blanks", desc: "Complete key verses from Exodus", icon: BookOpen, link: "fill-in-the-blanks" },
              { title: "True / False", desc: "Quick facts on the Exodus journey", icon: Brain, link: "true-false" },
              { title: "Characters", desc: "Moses, Aaron, Miriam, and more", icon: Brain, link: "characters" },
              { title: "Match the Following", icon: ListOrdered, desc: "Pair items, events, and names", link: "match-the-following" }
            ].map((t) => (
              <Card key={t.title} className="cursor-pointer border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col group bg-white shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/${t.link}`)}> 
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                    <t.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-xl font-urbanist font-semibold text-gray-900">{t.title}</CardTitle>
                  <CardDescription className="font-urbanist font-light text-gray-600">{t.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
              </div>
              <p className="text-gray-500 font-urbanist font-light leading-relaxed max-w-sm">
                Empowering faith through interactive Scripture knowledge and competitive spirit. Join thousands of students learning the Word through fun, challenging quizzes.
              </p>
            </div>
            <div>
              <h4 className="font-urbanist font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 font-urbanist font-light">
                <li><button onClick={() => navigate("/bible-questions-and-answers-hub")} className="hover:text-black transition-colors">Quiz Hub</button></li>
                <li><button onClick={() => navigate("/articles")} className="hover:text-black transition-colors">Study Articles</button></li>
                <li><button onClick={() => navigate("/leaderboard")} className="hover:text-black transition-colors">Leaderboards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-urbanist font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4 text-gray-500 font-urbanist font-light">
                <li><button className="hover:text-black transition-colors">Help Center</button></li>
                <li><button className="hover:text-black transition-colors">Contact Us</button></li>
                <li><button className="hover:text-black transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-sm font-urbanist font-light text-gray-400">
            <p>© 2025 QuizMaster. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-black cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-black cursor-pointer transition-colors">Facebook</span>
              <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}