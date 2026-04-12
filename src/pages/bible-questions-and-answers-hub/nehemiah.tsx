import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function NehemiahHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = Array.from({ length: 13 }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    return chapterNumbers.filter((n) => String(n).startsWith(q));
  }, [query]);

  // Show 4 at a time with simple paging controls
  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Detailed bullet points for Nehemiah chapters
  const chapterPoints: Record<number, string[]> = {
    1: [
      "Bad news from Jerusalem; walls broken",
      "Nehemiah's deep grief and fasting",
      "Prayer of confession and appeal to God",
    ],
    2: [
      "Artaxerxes grants permission to rebuild",
      "Safe passage and timber resources provided",
      "Night inspection of the ruined walls",
    ],
    3: [
      "Organized labor: priests and rulers lead",
      "Gate by gate reconstruction details",
      "Community cooperation across all trades",
    ],
    4: [
      "Facing ridicule from Sanballat and Tobiah",
      "Prayer for protection against enemies",
      "Workers armed with tools and weapons",
    ],
    5: [
      "Addressing internal economic oppression",
      "Nobles rebuked for high interest (usury)",
      "Nehemiah's personal example of generosity",
    ],
    6: [
      "Plots to trap and intimidate Nehemiah",
      "Wall completed in just 52 days",
      "Enemies realize God helped the work",
    ],
    7: [
      "Security measures: guards and gates",
      "Hanani and Hananiah put in charge",
      "List of returned exiles rediscovered",
    ],
    8: [
      "Ezra reads the Law to the assembled people",
      "Spiritual awakening and mass weeping",
      "Feast of Booths celebrated with joy",
    ],
    9: [
      "National day of fasting and confession",
      "Levites recount God's history with Israel",
      "Acknowledgment of God's righteousness",
    ],
    10: [
      "People seal a covenant to keep the Law",
      "Commitments on marriage and Sabbath",
      "Provisions for the support of the Temple",
    ],
    11: [
      "Casting lots to populate Jerusalem",
      "Leaders and volunteers settle in the city",
      "Lists of residents and provincial leaders",
    ],
    12: [
      "Lists of priests and Levites through history",
      "Joyful dedication of the city wall",
      "Two large choirs lead the celebration",
    ],
    13: [
      "Nehemiah returns to enact final reforms",
      "Cleansing the Temple and enforce Sabbath",
      "Addressing intermarriage with foreigners",
    ]
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-orange-100 selection:text-orange-900">
      <SEO 
        title="Nehemiah Hub: Rebuilding the Walls | Study & Quizzes" 
        description="Comprehensive study guide and interactive quizzes for the Book of Nehemiah. Explore Nehemiah's leadership, the 52-day wall reconstruction, and the spiritual reforms in Jerusalem." 
      />
      <Navigation />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-900 mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Swords className="h-3 w-3" />
            <span>EXILE & RECONSTRUCTION</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            The Book of Nehemiah
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-stone-600 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Witness the incredible journey of Nehemiah—a leader who turned grief into action, 
            overcame fierce opposition, and restored the walls and the spirit of Jerusalem in just 52 days.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Global Book Quizzes */}
            <section className="animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-stone-900 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Challenge Your Knowledge</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="group border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border-orange-100 bg-orange-50/30"
                      onClick={() => navigate('/public-quiz/nehemiah')}>
                  <CardHeader className="pb-3 px-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-orange-100">
                        <Brain className="h-5 w-5 text-orange-600" />
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-900 border-none font-semibold">15 QUESTIONS</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardTitle className="text-xl mb-2 group-hover:text-orange-900 transition-colors">Public Master Quiz</CardTitle>
                    <CardDescription className="text-stone-600 mb-4 line-clamp-2">
                      Test your understanding of the entire book of Nehemiah with our comprehensive 15-question master quiz.
                    </CardDescription>
                    <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white gap-2 shadow-sm underline-offset-4 group-hover:underline">
                      Start Quiz <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border-stone-100"
                      onClick={() => navigate('/bible-questions-and-answers-hub/nehemiah/ch1-13-beginner')}>
                  <CardHeader className="pb-3 px-6 pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-100">
                        <Layers className="h-5 w-5 text-stone-600" />
                      </div>
                      <Badge variant="outline" className="text-stone-500 font-semibold border-stone-200">BEGINNER</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardTitle className="text-xl mb-2">Foundation Quiz (1–13)</CardTitle>
                    <CardDescription className="text-stone-600 mb-4 line-clamp-2">
                      Identify key gates, leaders, and major events across All 13 chapters in this foundation quiz.
                    </CardDescription>
                    <Button variant="outline" className="w-full border-stone-200 group-hover:bg-stone-50 gap-2 font-semibold">
                      Start Challenge <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Chapter Study Section */}
            <section className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-stone-900 rounded-full" />
                  <h2 className="text-2xl font-bold tracking-tight">Chapter Study Guides</h2>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input 
                    placeholder="Search Chapter..." 
                    className="pl-9 bg-white border-stone-200 focus-visible:ring-stone-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-6">
                {visibleChapters.map((num) => (
                  <Card key={num} className="group overflow-hidden border shadow-sm hover:shadow-md transition-all border-stone-100 bg-white">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="p-6 md:w-32 flex flex-col items-center justify-center bg-stone-50 border-b md:border-b-0 md:border-r border-stone-100 text-center">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">CH.</span>
                        <span className="text-4xl font-black text-stone-900">{num}</span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-stone-700 transition-colors">Key Highlights</h3>
                          <ul className="space-y-2">
                            {chapterPoints[num]?.map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                                <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-auto pt-4 flex flex-wrap gap-2">
                          <Button size="sm" variant="default" className="bg-stone-900 hover:bg-stone-800 text-xs font-bold px-4"
                                  onClick={() => navigate(`/bible-questions-and-answers-hub/nehemiah/chapter-${num}`)}>
                            Read Study Guide
                          </Button>
                          <Button size="sm" variant="outline" className="border-stone-200 text-xs font-bold px-4 hover:bg-stone-50"
                                  onClick={() => navigate(`/bible-questions-and-answers-hub/nehemiah/ch${num}-beginner`)}>
                            Quick Quiz
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Paging Controls */}
              {totalChapterPages > 1 && (
                <div className="mt-8 flex items-center justify-between px-2">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Page {chapterPage + 1} of {totalChapterPages}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-stone-200 text-xs font-bold" 
                            disabled={chapterPage === 0} onClick={() => setChapterPage(chapterPage - 1)}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-stone-200 text-xs font-bold" 
                            disabled={chapterPage === totalChapterPages - 1} onClick={() => setChapterPage(chapterPage + 1)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-1000">
            
            {/* Quick Stats / Info Card */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-stone-900 to-stone-800 text-white overflow-hidden">
              <CardHeader className="relative pb-4">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <BookOpen className="h-24 w-24" />
                </div>
                <CardTitle className="text-xl">Quick Overview</CardTitle>
                <CardDescription className="text-stone-300">Fast facts about Nehemiah</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <ListOrdered className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Total Chapters</div>
                    <div className="text-lg font-bold">13 Chapters</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">Major Theme</div>
                    <div className="text-lg font-bold">Leadership & Reform</div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Top Study Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {["The Gates", "Sanballat", "52 Days", "Ezra's Reading", "The Covenant"].map(tag => (
                      <Badge key={tag} className="bg-white/10 text-white hover:bg-white/20 border-none px-3 py-1 pointer-events-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Card */}
            <Card className="border shadow-sm border-stone-100 bg-white">
              <CardHeader className="pb-3 border-b border-stone-50">
                <CardTitle className="text-base font-bold">Explore More Books</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <button 
                  onClick={() => navigate('/bible-questions-and-answers-hub/genesis')}
                  className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-stone-200 group-hover:bg-stone-900 transition-colors" />
                    <span className="text-sm font-medium text-stone-600">The Book of Genesis</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-stone-900 transition-all group-hover:translate-x-0.5" />
                </button>
                <div className="h-px bg-stone-50 mx-4" />
                <button 
                  onClick={() => navigate('/bible-questions-and-answers-hub/exodus')}
                  className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-stone-200 group-hover:bg-stone-900 transition-colors" />
                    <span className="text-sm font-medium text-stone-600">The Book of Exodus</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-stone-300 group-hover:text-stone-900 transition-all group-hover:translate-x-0.5" />
                </button>
              </CardContent>
            </Card>

          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Inline Badge component to ensure it renders correctly if UI library varies
function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: string, className?: string }) {
  const variantStyles = {
    default: "bg-stone-900 text-white",
    secondary: "bg-stone-100 text-stone-900",
    outline: "border-stone-200 text-stone-500",
  };
  
  const currentStyles = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;
  
  return (
    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${currentStyles} ${className}`}>
      {children}
    </div>
  );
}
