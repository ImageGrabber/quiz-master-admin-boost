import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Menu } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-row justify-between items-center relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 inline-block align-middle" />
            <span className="text-base sm:text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
          </button>
          {/* Nav links for desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/bible-questions-and-answers-hub")}>
              <span className="hidden lg:inline">Bible Q&A Hub</span>
              <span className="lg:hidden">Q&A Hub</span>
            </button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/articles")}>Articles</button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/host-live-bible-quizzes-with-confidence")}>
              <span className="hidden lg:inline">Hosting Guide</span>
              <span className="lg:hidden">Hosting</span>
            </button>
            <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/login")}>Sign In</button>
            <Button variant="ghost" className="bg-black text-white font-semibold px-2 md:px-3 lg:px-4 py-2 rounded hover:bg-gray-800 transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/register")}>Sign Up</Button>
          </nav>
          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-blue-100 z-50 flex flex-col items-stretch overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/host-live-bible-quizzes-with-confidence"); }}>Hosting Guide</button>
              <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
              <button className="bg-black text-white font-semibold px-4 py-4 text-left hover:bg-gray-900 active:bg-gray-800 transition-colors duration-200 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
            </div>
          )}
        </div>
      </header>
      {/* Full-width hero */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">Exodus Quiz Hub</h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">Explore the journey from slavery to the Tabernacle.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chapters 1–40"
                className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <a href="#difficulty" className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">Difficulty</a>
              <a href="#ranges" className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold shadow">Ranges</a>
              <a href="#exodus-chapter-wise" className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow">Chapter Wise</a>
              <a href="#types" className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold shadow">Types</a>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/")}> <Home className="w-4 h-4 mr-1" /> Home</Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Q&A Hub</Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Exodus</span>
        </div>

        {/* Difficulty section */}
        <section id="difficulty" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/beginner")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Beginner</CardTitle>
                <CardDescription>10 questions on major events</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Moses, Plagues, Passover & Red Sea highlights</li>
                  <li>Fundamental stories and key characters</li>
                  <li>Ideal for children and new readers</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button variant="outline" className="w-full">Start Beginner</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/intermediate")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Intermediate</CardTitle>
                <CardDescription>15 questions across the book</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Wilderness journey, Sinai, and Commandments</li>
                  <li>Focus on laws and historical context</li>
                  <li>Great for study groups and youth</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button variant="outline" className="w-full">Start Intermediate</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/advanced")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <Swords className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Advanced</CardTitle>
                <CardDescription>25 challenging questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Tabernacle dimensions, priestly garments, specific laws</li>
                  <li>Nuanced details and less-known figures</li>
                  <li>Perfect for Bible scholars and experts</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button className="w-full">Start Advanced</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chapters section */}
        <section id="ranges" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <ListOrdered className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Chapter Range</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/chapters-1-12")}>
              <CardHeader>
                <CardTitle>Exodus 1–12</CardTitle>
                <CardDescription>Slavery to Passover • Moses’ birth, Plagues, Freedom</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">Chs 1–12</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Israel’s bondage and Pharaoh’s decree</li>
                    <li>The burning bush and God’s name</li>
                    <li>The ten plagues on Egypt</li>
                    <li>The first Passover and final departure</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/1-12/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/1-12/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/chapters-13-18")}>
              <CardHeader>
                <CardTitle>Exodus 13–18</CardTitle>
                <CardDescription>Wilderness Journey • Red Sea, Manna, Jethro</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">Chs 13–18</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Crossing the Red Sea triumph</li>
                    <li>Songs of praise and early trials</li>
                    <li>Manna and water from the rock</li>
                    <li>Jethro’s advice on governance</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/13-18/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/13-18/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/chapters-19-24")}>
              <CardHeader>
                <CardTitle>Exodus 19–24</CardTitle>
                <CardDescription>Sinai & Covenant • Commandments, Law, Blood oath</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">Chs 19–24</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The majesty of God on Mt. Sinai</li>
                    <li>Receiving the Ten Commandments</li>
                    <li>Laws of the Covenant (Book of the Covenant)</li>
                    <li>Confirmation of the covenant oath</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/19-24/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/19-24/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/chapters-25-40")}>
              <CardHeader>
                <CardTitle>Exodus 25–40</CardTitle>
                <CardDescription>Tabernacle • Designs, Golden Calf, Construction</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">Chs 25–40</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Detailed designs for the Tabernacle</li>
                    <li>The Golden Calf and Moses’ intercession</li>
                    <li>Renewal of the tablets of law</li>
                    <li>God’s glory fills the finished Tabernacle</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/25-40/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/exodus/25-40/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Exodus Quiz Chapter Wise */}
        <section id="exodus-chapter-wise" className="mt-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">Exodus Quiz Chapter Wise</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {chapterNumbers.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints[ch];
              else if (ch >= 9 && ch <= 12) currentChapterPoints = chapterPoints9to12[ch];
              else if (ch >= 13 && ch <= 16) currentChapterPoints = chapterPoints13to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 32) currentChapterPoints = chapterPoints25to32[ch];
              else if (ch >= 33 && ch <= 40) currentChapterPoints = chapterPoints33to40[ch];

              return (
                <Card key={ch} className="p-4 flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/bible-questions-and-answers-hub/exodus/chapter-${ch}`)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-600">Chapter {ch}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
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
                      {ch === 11 && "Firstborn Death Announced"}
                      {ch === 12 && "Passover & Exodus"}
                      {ch === 13 && "Firstborn Consecrated"}
                      {ch === 14 && "Crossing the Red Sea"}
                      {ch === 15 && "The Song of Moses"}
                      {ch === 16 && "Manna and Quail"}
                      {ch === 17 && "Water from the Rock"}
                      {ch === 18 && "Jethro’s Visit"}
                      {ch === 19 && "Arrival at Sinai"}
                      {ch === 20 && "The Ten Commandments"}
                      {ch === 21 && "Personal Injury Laws"}
                      {ch === 22 && "Property & Social Laws"}
                      {ch === 23 && "Justice & Festivals"}
                      {ch === 24 && "The Covenant Confirmed"}
                      {ch === 25 && "Tabernacle & Ark"}
                      {ch === 26 && "Curtains & Frames"}
                      {ch === 27 && "Bronze Altar & Court"}
                      {ch === 28 && "Priestly Garments"}
                      {ch === 29 && "Consecration of Priests"}
                      {ch === 30 && "Incense Altar & Ransom"}
                      {ch === 31 && "Artisans & Sabbath"}
                      {ch === 32 && "The Golden Calf"}
                      {ch === 33 && "God's Glory Revealed"}
                      {ch === 34 && "Covenant Renewed"}
                      {ch === 35 && "Sabbath & Offerings"}
                      {ch === 36 && "Tabernacle Construction"}
                      {ch === 37 && "Ark & Table Made"}
                      {ch === 38 && "Altar & Court Made"}
                      {ch === 39 && "Garments Completed"}
                      {ch === 40 && "Tabernacle Set Up"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {currentChapterPoints && (
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
                        {currentChapterPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardContent className="mt-auto pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/bible-questions-and-answers-hub/exodus/chapter-${ch}`); }}>
                        View Chapter Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Types section */}
        <section id="types" className="mt-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Type</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/fill-in-the-blanks")}> 
              <CardHeader>
                <CardTitle>Fill in the Blanks</CardTitle>
                <CardDescription>Complete key verses from Exodus</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Master the words of God and Moses by completing key passages from the book.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/true-false")}> 
              <CardHeader>
                <CardTitle>True / False</CardTitle>
                <CardDescription>Quick facts on the Exodus journey</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Rapid-fire statements testing your accuracy on plagues, laws, and the Tabernacle.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/characters")}> 
              <CardHeader>
                <CardTitle>Characters</CardTitle>
                <CardDescription>Moses, Aaron, Miriam, and more</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Identify leaders, enemies, and family members throughout the book of Exodus.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/exodus/match-the-following")}> 
              <CardHeader>
                <CardTitle>Match the Following</CardTitle>
                <CardDescription>Pair items, events, and names</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Connect plagues to their effects, laws to their categories, and more.</CardContent>
            </Card>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Bible Quiz Competition</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
          </div>
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Links</h4>
              <ul className="space-y-2">
                <li><a href="/bible-questions-and-answers-hub" className="hover:underline text-gray-300">Hub</a></li>
                <li><a href="/articles" className="hover:underline text-gray-300">Articles</a></li>
                <li><a href="/leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2024 QuizMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}