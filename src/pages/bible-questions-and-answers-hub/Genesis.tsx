import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search, Menu } from "lucide-react";
import SEO from "@/components/SEO";

export default function GenesisHub() {
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

  const chapterNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    return chapterNumbers.filter((n) => String(n).startsWith(q));
  }, [query]);
  // Show 4 at a time (e.g., 1–4) with simple paging controls
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
      "Creation days 1–6 and Sabbath pattern",
      "Heavens and earth; light vs darkness",
      "Image of God; mandate to rule and fill",
    ],
    2: [
      "Garden of Eden; rivers and Havilah gold",
      "Tree of life vs tree of knowledge",
      "Formation of woman; one flesh design",
    ],
    3: [
      "Temptation and the Fall; consequences",
      "Protoevangelium (3:15) promise",
      "Garments of skin; expulsion and cherubim",
    ],
    4: [
      "Cain and Abel offerings; murder and mark",
      "City of Enoch; Lamech's poem",
      "Birth of Seth; people begin to call on the Lord",
    ],
    5: [
      "Genealogy of Adam through Seth",
      "Long lifespans; refrain 'and he died'",
      "Enoch walks with God; Methuselah & Lamech; Noah named",
    ],
    6: [
      "Human wickedness; violence fills the earth",
      "Nephilim mentioned; God resolves to send the flood",
      "Noah finds favor; ark instructions and dimensions",
    ],
    7: [
      "Noah, family, and animals enter the ark",
      "Seven pairs of clean animals; 40 days and nights of rain",
      "Waters prevail; 150 days",
    ],
    8: [
      "Waters recede; ark rests; raven and dove sent out",
      "Altar built; pleasing aroma",
      "Covenant promise: never again a worldwide flood",
    ],
  };

  // Detailed bullet points for chapters 9–12
  const chapterPoints9to12: Record<number, string[]> = {
    9: [
      "Noah plants vineyard; gets drunk",
      "Ham sees father's nakedness; cursed",
      "Shem and Japheth blessed; Canaan cursed",
    ],
    10: [
      "Table of Nations; Japheth's descendants",
      "Ham's descendants; Canaan's sons",
      "Shem's descendants; Eber's line",
    ],
    11: [
      "Tower of Babel; language confusion",
      "Shem's genealogy to Terah",
      "Terah's family; Abram, Nahor, Haran",
    ],
    12: [
      "God calls Abram; leaves Haran",
      "Abram in Canaan; builds altars",
      "Famine; goes to Egypt; Sarai taken",
    ],
  };

  // Detailed bullet points for chapters 13–16
  const chapterPoints13to16: Record<number, string[]> = {
    13: [
      "Abram and Lot separate; Lot chooses Jordan plain",
      "Abram settles at Hebron; builds altar",
      "God renews promises to Abram",
    ],
    14: [
      "War of the kings; Lot taken captive",
      "Abram rescues Lot with 318 men",
      "Melchizedek blesses Abram; tithe given",
    ],
    15: [
      "God's covenant with Abram; stars promise",
      "Abram's faith counted as righteousness",
      "Covenant ceremony; future slavery foretold",
    ],
    16: [
      "Sarai gives Hagar to Abram; Ishmael born",
      "Hagar flees; angel meets her at spring",
      "Promise of Ishmael's descendants",
    ],
  };


  // Detailed bullet points for chapters 17–24
  const chapterPoints17to24: Record<number, string[]> = {
    17: [
      "Covenant of circumcision; Abram becomes Abraham",
      "Sarai becomes Sarah; Isaac promised",
      "Ishmael blessed; covenant established",
    ],
    18: [
      "Three visitors at Mamre; Sarah laughs",
      "Abraham intercedes for Sodom",
      "Bargaining for righteous people",
    ],
    19: [
      "Angels visit Lot; Sodom's destruction",
      "Lot's wife becomes pillar of salt",
      "Lot and daughters in Zoar",
    ],
    20: [
      "Abraham in Gerar; Sarah taken",
      "Abimelech's dream; God's warning",
      "Abraham prays; Abimelech healed",
    ],
    21: [
      "Isaac born to Abraham and Sarah",
      "Hagar and Ishmael sent away",
      "Treaty at Beersheba with Abimelech",
    ],
    22: [
      "God tests Abraham with Isaac",
      "Abraham's faith and obedience",
      "The Lord provides a ram as substitute",
    ],
    23: [
      "Sarah dies at age 127",
      "Abraham purchases cave of Machpelah",
      "First land ownership in Canaan",
    ],
    24: [
      "Abraham sends servant to find Isaac a wife",
      "Servant's prayer and divine guidance",
      "Isaac marries Rebekah",
    ],
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
    <div className="min-h-screen bg-white text-gray-900 font-urbanist">
      <SEO 
        title="Genesis Quiz Hub | Bible Quiz Competition"
        description="Master the first book of the Bible with our comprehensive Genesis study hub and interactive quizzes."
        url="/bible-questions-and-answers-hub/genesis"
      />
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-light">Bible Q&A</button>
            <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-light">Articles</button>
            <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-light">Help</button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            className="bg-black hover:bg-gray-800 font-light"
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
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white px-4 py-3 mx-4 mb-4 font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-normal text-gray-900 mb-6 leading-tight">
            Genesis Quiz Hub
          </h1>
          <p className="text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Pick a difficulty, jump to a chapter, or try special types. Search through 50 chapters and master the book of beginnings.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quick search chapters (e.g., '1' or 'Creation')..."
                className="pl-12 pr-4 py-4 text-lg font-light border border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#difficulty" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Difficulty</a>
            <a href="#ranges" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Ranges</a>
            <a href="#genesis-chapter-wise" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Chapter Wise</a>
            <a href="#types" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">By Type</a>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm font-light text-gray-500 mb-12">
          <button className="hover:text-gray-900" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Q&A Hub</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide">Genesis</span>
        </div>

        {/* Difficulty section */}
        <section id="difficulty" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-beginner")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-100">
                  <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-green-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Beginner</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">10 questions from core stories</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Creation, Fall, Noah, Abraham & Joseph highlights</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Great for first-timers and kids</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-light border-gray-200 text-base py-6" variant="outline">Start Beginner</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-intermediate")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-yellow-100">
                  <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-yellow-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Intermediate</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">15 questions across the book</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Mix of people, places, and covenant moments</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Ideal for youth groups and small studies</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-light border-gray-200 text-base py-6" variant="outline">Start Intermediate</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-advanced")}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-red-100">
                  <Swords className="w-6 h-6 text-gray-700 group-hover:text-red-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Advanced</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">25 challenging questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Deeper details: Hebrew terms, locations, numbers</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Perfect for quiz bowls or seasoned readers</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-light border-gray-300 bg-black text-white hover:bg-gray-800 text-base py-6">Start Advanced</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ranges section */}
        <section id="ranges" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">By Chapter Range</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { range: "1–11", title: "Creation to Babel", desc: "Creation days, Fall, Flood, Nations" },
              { range: "12–25", title: "Abraham Cycle", desc: "Call, covenant, Isaac, Mount Moriah" },
              { range: "26–36", title: "Isaac, Jacob & Esau", desc: "Birthright, ladder, Leah, Rachel" },
              { range: "37–50", title: "Joseph Narrative", desc: "Dreams, Egypt, Famine, Forgiveness" }
            ].map((r) => (
              <Card key={r.range} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full bg-white group shadow-none">
                <CardHeader className="pb-3 border-b border-gray-50 mb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-900">Genesis {r.range}</CardTitle>
                  <CardDescription className="text-lg font-light text-gray-600">{r.title}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <p className="text-base font-light text-gray-500 mb-4 leading-relaxed">{r.desc}</p>
                </CardContent>
                <CardContent className="pt-4 border-t border-gray-50">
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="w-full font-light text-base py-5" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${r.range.replace("–", "-")}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="w-full font-light bg-black text-white hover:bg-gray-800 text-base py-5" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${r.range.replace("–", "-")}-advanced`)}>Advanced Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Genesis Quiz Chapter Wise */}
        <section id="genesis-chapter-wise" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">Genesis Quiz Chapter Wise</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleChapters.map((ch) => {
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) currentChapterPoints = chapterPoints[ch];
              else if (ch >= 9 && ch <= 12) currentChapterPoints = chapterPoints9to12[ch];
              else if (ch >= 13 && ch <= 16) currentChapterPoints = chapterPoints13to16[ch];
              else if (ch >= 17 && ch <= 24) currentChapterPoints = chapterPoints17to24[ch];
              else if (ch >= 25 && ch <= 36) currentChapterPoints = chapterPoints25to36[ch];
              else if (ch >= 37 && ch <= 50) currentChapterPoints = chapterPoints37to50[ch];

              return (
                <Card key={ch} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full cursor-pointer group bg-white shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/chapter-${ch}`)}>
                  <CardHeader className="pb-3 border-b border-gray-50">
                    <CardTitle className="text-xl font-semibold text-gray-900">Chapter {ch}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 uppercase tracking-widest mt-1">
                      {ch === 1 && "Creation & Sabbath"}
                      {ch === 2 && "Garden of Eden"}
                      {ch === 3 && "The Fall"}
                      {ch === 4 && "Cain & Abel"}
                      {ch === 5 && "Genealogy"}
                      {ch === 6 && "Noah & the Flood"}
                      {ch === 7 && "The Flood"}
                      {ch === 8 && "After the Flood"}
                      {ch === 9 && "Noah's Drunkenness"}
                      {ch === 10 && "Table of Nations"}
                      {ch === 11 && "Tower of Babel"}
                      {ch === 12 && "Abram's Call"}
                      {ch === 13 && "Abram & Lot Separate"}
                      {ch === 14 && "War of the Kings"}
                      {ch === 15 && "God's Covenant"}
                      {ch === 16 && "Hagar & Ishmael"}
                      {ch === 21 && "Birth of Isaac"}
                      {ch === 22 && "Abraham Tested"}
                      {ch === 27 && "Jacob's Blessing"}
                      {ch === 28 && "Jacob's Ladder"}
                      {ch === 32 && "Jacob Wrestles God"}
                      {ch === 37 && "Joseph's Dreams"}
                      {ch === 41 && "Pharaoh's Dreams"}
                      {ch === 45 && "Joseph Revealed"}
                      {ch === 50 && "Death of Joseph"}
                      {(![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,21,22,27,28,32,37,41,45,50].includes(ch)) && "Genesis Study"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    {currentChapterPoints && (
                      <ul className="text-sm font-light text-gray-600 space-y-1.5">
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
                    <Button variant="ghost" size="sm" className="w-full text-sm font-light group-hover:bg-gray-100">
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
                className="font-light"
                disabled={chapterPage === 0} 
                onClick={() => setChapterPage(p => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm font-light text-gray-500">Page {chapterPage + 1} of {totalChapterPages}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="font-light"
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
            <h2 className="text-4xl font-urbanist font-semibold text-gray-900">By Type</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fill in the Blanks", desc: "Complete key verses from Genesis", icon: BookOpen, link: "fill-in-the-blanks" },
              { title: "True / False", desc: "Quick facts on the Genesis journey", icon: Brain, link: "true-false" },
              { title: "Characters", desc: "Adam to Joseph's brothers", icon: Brain, link: "characters" },
              { title: "Match the Following", icon: ListOrdered, desc: "Pair people, places, and names", link: "match-the-following" }
            ].map((t) => (
              <Card key={t.title} className="cursor-pointer border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col group bg-white shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/${t.link}`)}> 
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                    <t.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-2xl font-urbanist font-semibold text-gray-900">{t.title}</CardTitle>
                  <CardDescription className="text-base font-urbanist font-light text-gray-600">{t.desc}</CardDescription>
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
                <span className="text-xl font-semibold text-gray-900">Bible Quiz Competition</span>
              </div>
              <p className="text-gray-500 font-light leading-relaxed max-w-sm">
                Empowering faith through interactive Scripture knowledge and competitive spirit. Join thousands of students learning the Word through fun, challenging quizzes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 font-light">
                <li><button onClick={() => navigate("/bible-questions-and-answers-hub")} className="hover:text-black transition-colors">Quiz Hub</button></li>
                <li><button onClick={() => navigate("/articles")} className="hover:text-black transition-colors">Study Articles</button></li>
                <li><button onClick={() => navigate("/leaderboard")} className="hover:text-black transition-colors">Leaderboards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4 text-gray-500 font-light">
                <li><button className="hover:text-black transition-colors">Help Center</button></li>
                <li><button className="hover:text-black transition-colors">Contact Us</button></li>
                <li><button className="hover:text-black transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-sm font-light text-gray-400">
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