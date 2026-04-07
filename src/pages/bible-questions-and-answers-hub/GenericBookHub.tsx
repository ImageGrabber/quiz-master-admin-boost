import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Swords, ChevronRight, Search, ListOrdered, Brain } from "lucide-react";
import SEO from "@/components/SEO";
import { bibleStructure, bookNames } from "@/data/bible-data";
import { bibleData } from "@/data/bibleData";
import { Navigation } from "@/components/Navigation";

export default function GenericBookHub() {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Normalize book name to human-readable form
  const bookName = useMemo(() => {
    if (!bookSlug) return "Bible Book";
    return bookNames[bookSlug.toLowerCase()] || bookSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, [bookSlug]);

  const chapterCount = useMemo(() => {
    if (!bookSlug) return 0;
    return (bibleStructure as any)[bookSlug.toLowerCase()] || 0;
  }, [bookSlug]);

  const chapterNumbers = Array.from({ length: chapterCount }, (_, i) => i + 1);
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    // Check if query is numeric
    const qNum = parseInt(query.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(qNum)) {
       return chapterNumbers.filter((n) => String(n).startsWith(String(qNum)));
    }
    // Otherwise check titles if available in bibleData
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

  // Helper to get chapter overview from bibleData
  const getChapterData = (ch: number) => {
    const bookContent = (bibleData as any)[bookSlug?.toLowerCase() || ""];
    return bookContent ? bookContent[ch] : null;
  };

  // Determine chapter ranges dynamically (groups of ~10-15 chapters)
  const ranges = useMemo(() => {
    if (chapterCount <= 15) return [{ range: `1–${chapterCount}`, title: `${bookName} Study`, desc: `Complete study for the book of ${bookName}` }];
    const numRanges = Math.ceil(chapterCount / 12);
    const result = [];
    for (let i = 0; i < numRanges; i++) {
        const start = i * 12 + 1;
        const end = Math.min((i + 1) * 12, chapterCount);
        result.push({
            range: `${start}–${end}`,
            title: `${bookName} Part ${i + 1}`,
            desc: `Focused study on chapters ${start} through ${end}`
        });
    }
    return result;
  }, [chapterCount, bookName]);

  if (!bookSlug || chapterCount === 0) {
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
    <div className="min-h-screen bg-white text-gray-900 font-urbanist">
      <SEO 
        title={`${bookName} Hub | Bible Quiz Competition`}
        description={`Master ${bookName} with our comprehensive study hub and interactive quizzes.`}
        url={`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}`}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-normal text-gray-900 mb-6 leading-tight">
            {bookName} Hub
          </h1>
          <p className="text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Search through {chapterCount} chapters, jump to a study guide, or test your knowledge with interactive quizzes.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${bookName} (e.g., 'Chapter 1' or keywords)...`}
                className="pl-12 pr-4 py-4 text-lg font-light border border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#difficulty" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Difficulty</a>
            <a href="#ranges" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Ranges</a>
            <a href="#chapters" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">Chapter Wise</a>
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
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide">{bookName}</span>
        </div>

        {/* Difficulty section */}
        <section id="difficulty" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/beginner`)}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-green-100">
                  <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-green-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Beginner</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">Quick facts and core themes</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Highlighting major characters and events</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Perfect for getting started with {bookName}</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-light bg-black text-white hover:bg-gray-800 text-base py-6 border-none transition-all">Start Beginner</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/intermediate`)}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-yellow-100">
                  <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-yellow-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Intermediate</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">Deeper study through the book</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Mix of chronological and character-based questions</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Ideal for individual or group study sessions</li>
                </ul>
              </CardContent>
              <CardContent className="pt-4 mt-auto">
                <Button className="w-full font-light bg-black text-white hover:bg-gray-800 text-base py-6 border-none transition-all">Start Intermediate</Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/advanced`)}> 
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-red-100">
                  <Swords className="w-6 h-6 text-gray-700 group-hover:text-red-700" strokeWidth={1} />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Advanced</CardTitle>
                <CardDescription className="text-lg font-light text-gray-600">A challenge for Bible experts</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-base font-light text-gray-600 flex-grow">
                <ul className="space-y-2">
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Challenging questions on details and context</li>
                  <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 mr-2 flex-shrink-0" />Test your absolute mastery of {bookName}</li>
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
            {ranges.map((r) => (
              <Card key={r.range} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full bg-white group shadow-none">
                <CardHeader className="pb-3 border-b border-gray-50 mb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-900">{bookName} {r.range}</CardTitle>
                  <CardDescription className="text-lg font-light text-gray-600">{r.title}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <p className="text-base font-light text-gray-500 mb-4 leading-relaxed">{r.desc}</p>
                </CardContent>
                <CardContent className="pt-4 border-t border-gray-50">
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="w-full font-light bg-black text-white hover:bg-gray-800 text-base py-5 border-none transition-all" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/ch${r.range.replace("–", "-")}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="w-full font-light bg-black text-white hover:bg-gray-800 text-base py-5" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/ch${r.range.replace("–", "-")}-advanced`)}>Advanced Quiz</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Chapter Wise section */}
        <section id="chapters" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">{bookName} Chapters</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleChapters.map((ch) => {
              const chData = getChapterData(ch);
              return (
                <Card 
                    key={ch} 
                    className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full cursor-pointer group bg-white shadow-none" 
                    onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/chapter-${ch}`)}
                >
                  <CardHeader className="pb-3 border-b border-gray-50">
                    <CardTitle className="text-xl font-semibold text-gray-900">Chapter {ch}</CardTitle>
                    <CardDescription className="text-sm font-light text-gray-500 uppercase tracking-widest mt-1">
                      {chData?.subtitle || "Study Guide"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 flex-grow">
                    {chData?.keyPoints && (
                      <ul className="text-sm font-light text-gray-600 space-y-1.5">
                        {chData.keyPoints.slice(0, 2).map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) || (
                        <p className="text-sm font-light text-gray-500 italic">Jump into a deep-dive study of {bookName} chapter {ch}.</p>
                    )}
                  </CardContent>
                  <CardContent className="pt-2 border-t border-gray-50">
                    <Button size="sm" className="w-full text-sm font-light bg-black text-white hover:bg-gray-800 border-none transition-all">
                      Explore Chapter →
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
            <h2 className="text-4xl font-urbanist font-semibold text-gray-900">Quiz Types</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fill in the Blanks", desc: `Complete key verses from ${bookName}`, icon: BookOpen, link: "fill-in-the-blanks" },
              { title: "True / False", desc: `Quick facts on the ${bookName} journey`, icon: Brain, link: "true-false" },
              { title: "Characters", desc: `Key figures throughout ${bookName}`, icon: Brain, link: "characters" },
              { title: "Match the Following", icon: ListOrdered, desc: "Pair people, places, and themes", link: "match-the-following" }
            ].map((t) => (
              <Card key={t.title} className="cursor-pointer border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col group bg-white shadow-none" onClick={() => navigate(`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/${t.link}`)}> 
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
            <p>© 2026 Bible Quiz Competition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
