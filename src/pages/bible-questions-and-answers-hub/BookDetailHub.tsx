import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Swords, ChevronRight, Search, ListOrdered, Brain, Info, HelpCircle, Heart, ScrollText, User, Calendar, Tag, Layers } from "lucide-react";
import SEO from "@/components/SEO";
import { bibleStructure, bookNames } from "@/data/bible-data";
import { bibleData } from "@/data/bibleData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import bibleBooksDetail from "@/data/bible-books-detail.json";

interface BookMetadata {
  author: string;
  date: string;
  genre: string;
  themes: string;
  chapters: number;
}

interface BibleBook {
  title: string;
  slug: string;
  subtitle: string;
  metadata: BookMetadata;
  heroImage?: string;
  fullOverview: string;
  biblicalMeaning: string;
  lifeLesson: string;
  reflectionQuestions: string[];
  keyVerses: { ref: string; text: string }[];
}

export default function BookDetailHub() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Load expanded data if available
  const expandedData = useMemo(() => {
    if (!bookSlug) return null;
    return (bibleBooksDetail as Record<string, BibleBook>)[bookSlug.toLowerCase()] || null;
  }, [bookSlug]);

  // Normalize book name to human-readable form
  const bookName = useMemo(() => {
    if (expandedData) return expandedData.title;
    if (!bookSlug) return "Bible Book";
    return bookNames[bookSlug.toLowerCase()] || bookSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, [bookSlug, expandedData]);

  const chapterCount = useMemo(() => {
    if (expandedData) return expandedData.metadata.chapters;
    if (!bookSlug) return 0;
    return (bibleStructure as any)[bookSlug.toLowerCase()] || 0;
  }, [bookSlug, expandedData]);

  const chapterNumbers = Array.from({ length: chapterCount }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const qNum = parseInt(query.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(qNum)) {
       return chapterNumbers.filter((n) => String(n).startsWith(String(qNum)));
    }
    const bookContent = (bibleData as any)[bookSlug?.toLowerCase() || ""];
    if (bookContent) {
        return chapterNumbers.filter(n => {
            const chapter = bookContent[n];
            return chapter?.title?.toLowerCase().includes(query.toLowerCase()) || 
                   chapter?.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
                   chapter?.description?.toLowerCase().includes(query.toLowerCase());
        });
    }
    return chapterNumbers;
  }, [query, chapterNumbers, bookSlug]);

  const pageSize = 8;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  
  useEffect(() => { setChapterPage(0); }, [query]);
  
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  const getChapterData = (ch: number) => {
    const bookContent = (bibleData as any)[bookSlug?.toLowerCase() || ""];
    return bookContent ? bookContent[ch] : null;
  };

  if (!bookSlug || (chapterCount === 0 && !expandedData)) {
      return (
        <div className="min-h-screen flex items-center justify-center font-urbanist p-6 text-center">
          <div>
            <h1 className="text-4xl font-semibold mb-4 text-gray-900 tracking-tight">Book Not Found</h1>
            <p className="text-xl font-light text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              We couldn't find a study hub for "{bookSlug}". It might be coming soon!
            </p>
            <Button onClick={() => navigate("/bible-questions-and-answers-hub")} className="bg-black hover:bg-gray-800 text-base font-light px-10 py-6 rounded-xl">
              Back to Bible Q&A Hub
            </Button>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black selection:text-white">
      <SEO 
        title={`${bookName} Hub | Bible Quiz Competition`}
        description={expandedData ? expandedData.fullOverview.substring(0, 160) : `Master ${bookName} with our comprehensive study hub and interactive quizzes.`}
        url={`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}`}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-gray-50">
        <div className="flex items-center text-xs font-light text-gray-400">
          <button className="hover:text-gray-900 transition-colors" onClick={() => navigate("/")}>HOME</button>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
          <button className="hover:text-gray-900 transition-colors" onClick={() => navigate("/bible-questions-and-answers-hub")}>BIBLE Q&A HUB</button>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
          <span className="font-medium text-gray-900 tracking-wider uppercase">{bookName}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 transform translate-x-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 text-center mb-12">
               <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-400 text-xs font-medium tracking-widest uppercase mb-6">
                Biblical Study Hub
              </span>
              <h1 className="text-6xl md:text-8xl font-normal text-gray-900 mb-6 leading-[1.1] tracking-tight">
                The Book of <span className="italic serif font-light">{bookName}</span>
              </h1>
              {expandedData && (
                <p className="text-2xl font-light text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {expandedData.subtitle}
                </p>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {expandedData ? (
                <div className="space-y-12">
                   {/* Tabs for expanded content */}
                   <div className="flex border-b border-gray-100 mb-8 space-x-8">
                    {["Overview", "Meaning", "Lessons", "Questions"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-4 text-sm font-medium tracking-widest uppercase transition-all relative ${
                          activeTab === tab.toLowerCase() 
                          ? "text-black border-b-2 border-black" 
                          : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="prose prose-lg max-w-none prose-gray">
                    {activeTab === "overview" && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                          <ScrollText className="w-8 h-8 mr-3 text-gray-300" strokeWidth={1} />
                          Narrative & Overview
                        </h2>
                        <div className="text-xl font-light text-gray-600 leading-relaxed space-y-6">
                          {expandedData.fullOverview.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                      </div>
                    )}

                    {activeTab === "meaning" && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                          <Brain className="w-8 h-8 mr-3 text-gray-300" strokeWidth={1} />
                          Theological Significance
                        </h2>
                        <p className="text-xl font-light text-gray-600 leading-relaxed mb-10">
                          {expandedData.biblicalMeaning}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                           <Card className="bg-gray-50 border-none shadow-none">
                            <CardHeader>
                              <CardTitle className="text-lg font-semibold flex items-center">
                                <ScrollText className="w-5 h-5 mr-2 text-gray-400" />
                                Key Verses
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {expandedData.keyVerses.map((v, i) => (
                                <div key={i} className="border-l-2 border-gray-200 pl-4 py-1">
                                  <p className="text-gray-900 italic font-medium mb-1">"{v.text}"</p>
                                  <p className="text-xs text-gray-400 tracking-widest uppercase">— {v.ref}</p>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {activeTab === "lessons" && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                          <Heart className="w-8 h-8 mr-3 text-gray-300" strokeWidth={1} />
                          Life Lessons Today
                        </h2>
                        <div className="text-xl font-light text-gray-600 leading-relaxed p-8 bg-blue-50/30 rounded-3xl border border-blue-50 transition-all hover:bg-blue-50/50">
                          {expandedData.lifeLesson}
                        </div>
                      </div>
                    )}

                    {activeTab === "questions" && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-8 flex items-center">
                          <HelpCircle className="w-8 h-8 mr-3 text-gray-300" strokeWidth={1} />
                          Reflection & Discussion
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          {expandedData.reflectionQuestions.map((q, i) => (
                            <div key={i} className="flex items-start p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group">
                              <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-6 text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                                {i + 1}
                              </span>
                              <p className="text-lg font-light text-gray-700 pt-1.5">{q}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 border-2 border-dashed border-gray-100 rounded-[3rem] text-center">
                   <Info className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                   <h2 className="text-3xl font-semibold mb-4">Study Overview Coming Soon</h2>
                   <p className="text-xl font-light text-gray-500 max-w-lg mx-auto">
                    We are currently expanding the deep study guides for {bookName}. You can still jump into chapter-wise studies and quizzes below.
                   </p>
                </div>
              )}
            </div>

            {/* Sidebar / Stats Area */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <Card className="border-none shadow-[L_24px_64px_-16px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden bg-white">
                <div className="p-8 bg-black">
                  <h3 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-1">Book Identity</h3>
                  <p className="text-white/60 text-sm font-light italic">Quick Reference Guide</p>
                </div>
                <CardContent className="p-8 space-y-8">
                  {expandedData ? (
                    <>
                      <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Author</p>
                          <p className="font-medium text-gray-900">{expandedData.metadata.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-purple-50 transition-colors">
                          <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Date Written</p>
                          <p className="font-medium text-gray-900">{expandedData.metadata.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-green-50 transition-colors">
                          <Tag className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Genre</p>
                          <p className="font-medium text-gray-900">{expandedData.metadata.genre}</p>
                        </div>
                      </div>
                      <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-orange-50 transition-colors">
                          <Layers className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Structure</p>
                          <p className="font-medium text-gray-900">{expandedData.metadata.chapters} Chapters</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-400 font-light italic">
                      Standard {bookName} Data
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-black text-white hover:bg-gray-800 rounded-2xl py-7 text-lg group overflow-hidden" 
                      onClick={() => navigate(`/quiz/${bookSlug?.toLowerCase()}`)}
                    >
                      <span className="relative z-10 flex items-center">
                        Quick Master Quiz
                        <Swords className="w-5 h-5 ml-3" strokeWidth={1} />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Selection & Interactive Area */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-gray-100">
        
        {/* Search & Statistics */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-xl w-full">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Step-by-Step Study</h2>
            <p className="text-lg font-light text-gray-500 mb-8">Jump to a specific chapter for deep-dive questions and summaries.</p>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Which chapter in ${bookName} interest you?...`}
                className="pl-14 pr-6 py-8 text-lg font-light border border-gray-100 focus:border-gray-300 rounded-[2rem] bg-gray-50/50 shadow-none transition-all placeholder:text-gray-300 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex gap-4">
             <Card className="bg-gray-50 border-none p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
               <span className="text-4xl font-semibold text-gray-900 mb-1">{chapterCount}</span>
               <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Chapters</span>
             </Card>
             <Card className="bg-gray-50 border-none p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
               <span className="text-4xl font-semibold text-gray-900 mb-1">100%</span>
               <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Coverage</span>
             </Card>
          </div>
        </div>

        {/* Global Quiz Types */}
        <section id="difficulty" className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 flex flex-col bg-white rounded-[2.5rem] group shadow-none overflow-hidden" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug?.toLowerCase()}/beginner`)}> 
              <CardHeader className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-green-50">
                  <BookOpen className="w-8 h-8 text-gray-400 group-hover:text-green-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Beginner Mastery</CardTitle>
                <CardDescription className="text-lg font-light text-gray-500 mt-2 leading-relaxed">Core stories, primary characters, and major themes in {bookName}.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 mt-auto">
                <Button className="w-full font-medium border-gray-100 text-base py-7 rounded-2xl group-hover:bg-black group-hover:text-white transition-all" variant="outline">
                  Launch Study →
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 flex flex-col bg-white rounded-[2.5rem] group shadow-none overflow-hidden" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug?.toLowerCase()}/intermediate`)}> 
              <CardHeader className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-blue-50">
                  <Brain className="w-8 h-8 text-gray-400 group-hover:text-blue-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Intermediate Path</CardTitle>
                <CardDescription className="text-lg font-light text-gray-500 mt-2 leading-relaxed">Detailed chronologies and theological connections through the book.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 mt-auto">
                <Button className="w-full font-medium bg-black text-white hover:bg-gray-800 text-base py-7 rounded-2xl border-none transition-all">
                  Standard Level →
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 flex flex-col bg-white rounded-[2.5rem] group shadow-none overflow-hidden" 
                  onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug?.toLowerCase()}/advanced`)}> 
              <CardHeader className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-red-50">
                  <Swords className="w-8 h-8 text-gray-400 group-hover:text-red-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Mastery Level</CardTitle>
                <CardDescription className="text-lg font-light text-gray-500 mt-2 leading-relaxed">Challenging questions on nuance, context, and detailed scriptures.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 mt-auto">
                <Button className="w-full font-medium bg-black text-white hover:bg-gray-800 text-base py-7 rounded-2xl border-none">
                  Ultimate Mastery →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chapter Grid Selection */}
        <section id="chapters" className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleChapters.map((ch) => {
              const chData = getChapterData(ch);
              return (
                <Card 
                    key={ch} 
                    className="border border-gray-50 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 flex flex-col h-full cursor-pointer group bg-white rounded-3xl" 
                    onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug?.toLowerCase()}/chapter-${ch}`)}
                >
                  <CardHeader className="p-6 border-b border-gray-50">
                    <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">{bookSlug?.charAt(0).toUpperCase()} {ch}</CardTitle>
                    <CardDescription className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">
                      {chData?.subtitle || "Detail Study"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    {chData?.keyPoints && (
                      <ul className="text-sm font-light text-gray-500 space-y-3">
                        {chData.keyPoints.slice(0, 2).map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-1.5 mr-3 group-hover:bg-black transition-colors" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) || (
                        <p className="text-sm font-light text-gray-400 italic">No summary available for chapter {ch} yet.</p>
                    )}
                  </CardContent>
                  <CardContent className="p-4 border-t border-gray-50">
                    <Button size="sm" className="w-full text-xs font-bold uppercase tracking-widest bg-black text-white rounded-xl transition-all hover:bg-gray-800 border-none">
                      Read Chapter →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {totalChapterPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-12 h-12 rounded-full border-gray-100 disabled:opacity-30"
                disabled={chapterPage === 0} 
                onClick={() => setChapterPage(p => p - 1)}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>
              <div className="flex items-center">
                 <span className="text-sm font-bold tracking-[0.2em] text-gray-900">{chapterPage + 1}</span>
                 <span className="mx-2 text-gray-300">/</span>
                 <span className="text-sm font-light text-gray-400">{totalChapterPages}</span>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-12 h-12 rounded-full border-gray-100 disabled:opacity-30"
                disabled={chapterPage >= totalChapterPages - 1} 
                onClick={() => setChapterPage(p => p + 1)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
