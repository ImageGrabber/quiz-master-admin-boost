import { useState, useMemo } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, ChevronRight, X, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { bibleBooks, featuredQuizzes, categories as categoryData, bibleStructure } from "@/data/bible-data";
import { Navigation } from "@/components/Navigation";

export default function BibleQA() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  
  const getBookSlug = (book: string) => {
    return book.toLowerCase().replace(/ /g, "-");
  };

  const allBooks = useMemo(
    () => [
      ...bibleBooks.oldTestament.Pentateuch,
      ...bibleBooks.oldTestament.Historical,
      ...bibleBooks.oldTestament.Wisdom,
      ...bibleBooks.oldTestament.MajorProphets,
      ...bibleBooks.oldTestament.MinorProphets,
      ...bibleBooks.newTestament.Gospels,
      ...bibleBooks.newTestament.Historical,
      ...bibleBooks.newTestament.PaulineEpistles,
      ...bibleBooks.newTestament.GeneralEpistles,
      ...bibleBooks.newTestament.Apocalyptic,
    ],
    []
  );

  const getBookInfo = (book: string) => {
    const slug = getBookSlug(book);
    const quiz = featuredQuizzes.find(q => q.link.includes(slug));
    const chapters = bibleStructure[slug as keyof typeof bibleStructure] || 0;
    
    return {
      summary: quiz?.description || `Study the ${book} with deep-dive chapter quizzes and guided learning.`,
      chapters: chapters
    };
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bible Question & Answer Hub",
    "description": "Comprehensive study library for all 66 Bible books with interactive quizzes and chapter guides.",
    "url": "https://biblequizcompetition.com/bible-questions-and-answers-hub",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": allBooks.slice(0, 10).map((book, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://biblequizcompetition.com/bible-questions-and-answers-hub/${getBookSlug(book)}`,
        "name": book
      }))
    }
  };

  const filteredBooks = allBooks.filter((book) => book.toLowerCase().includes(searchQuery.toLowerCase()));

  const getDailyRandomQuizzes = () => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const seededRandom = (seedValue: number) => {
      const x = Math.sin(seedValue) * 10000;
      return x - Math.floor(x);
    };

    const shuffled = [...featuredQuizzes].sort((a, b) => {
      const randomA = seededRandom(seed + a.title.charCodeAt(0));
      const randomB = seededRandom(seed + b.title.charCodeAt(0));
      return randomA - randomB;
    });

    return shuffled.slice(0, 9);
  };

  const randomFeaturedQuizzes = useMemo(() => getDailyRandomQuizzes(), []);

  const handleSearch = (bookInput: string) => {
    const book = bookInput.trim();
    if (!book) return;

    const directMatch = allBooks.find((b) => b.toLowerCase() === book.toLowerCase());
    if (directMatch) {
      navigate(`/bible-questions-and-answers-hub/${directMatch.toLowerCase().replace(/ /g, "-")}`);
    } else {
      const quiz = featuredQuizzes.find(
        (q) =>
          q.title.toLowerCase().includes(book.toLowerCase()) ||
          book.toLowerCase().includes(q.title.toLowerCase().replace(" quiz", ""))
      );

      if (quiz) {
        navigate(quiz.link);
      } else {
        navigate(`/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, "-")}`);
      }
    }

    if (!recentSearches.includes(book)) {
      setRecentSearches((prev) => [book, ...prev.slice(0, 4)]);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCategoryDialogOpen(true);
  };

  const getBooksByCategory = (categoryName: string) => {
    switch (categoryName) {
      case "Pentateuch":
        return bibleBooks.oldTestament.Pentateuch;
      case "Historical Books":
        return bibleBooks.oldTestament.Historical;
      case "Wisdom Literature":
        return bibleBooks.oldTestament.Wisdom;
      case "Major Prophets":
        return bibleBooks.oldTestament.MajorProphets;
      case "Minor Prophets":
        return bibleBooks.oldTestament.MinorProphets;
      case "Gospels":
        return bibleBooks.newTestament.Gospels;
      case "Historical Books (NT)":
        return bibleBooks.newTestament.Historical;
      case "Pauline Epistles":
        return bibleBooks.newTestament.PaulineEpistles;
      case "General Epistles":
        return bibleBooks.newTestament.GeneralEpistles;
      case "Apocalyptic":
        return bibleBooks.newTestament.Apocalyptic;
      default:
        return [];
    }
  };

  const featuredHubs = [
    {
      id: "genesis",
      title: "Genesis Hub",
      description: "Questions, answers, and chapter study guides for the Book of Genesis.",
    },
    {
      id: "exodus",
      title: "Exodus Hub",
      description: "Deep-dive into deliverance, covenant, and the tabernacle with structured quizzes.",
    },
    {
      id: "leviticus",
      title: "Leviticus Hub",
      description: "Master the laws of holiness, offerings, and sacred rituals with cinematic study guides.",
    },
    {
      id: "numbers",
      title: "Numbers Hub",
      description: "Explore the census, the wilderness journey, and the test of faith with interactive chapter quizzes.",
    },
    {
      id: "nehemiah",
      title: "Nehemiah Hub",
      description: "Leadership, rebuilding, and spiritual renewal studies with focused quizzes.",
    },
  ];

  const HUB_IMAGES = {
    hero: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop", // Majestic Library
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO
        title="Bible Q&A Hub | Bible Quiz Competition"
        description="Explore all 66 Bible books with chapter quizzes, category hubs, and guided study paths from Genesis to Revelation."
        url="/bible-questions-and-answers-hub"
      />

      <Navigation />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Modern Cinematic Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HUB_IMAGES.hero} 
            alt="Majestic Bible Hub Background" 
            className="w-full h-full object-cover brightness-[0.4] transition-transform duration-[20000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Brain className="w-4 h-4 text-white" />
            <span className="text-sm font-light tracking-widest uppercase italic">Master the Scriptures</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Bible Q&A <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Search through all 66 books, explore cinematic study hubs, and challenge yourself with interactive Scripture quizzes.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/40 group-focus-within:text-white w-6 h-6 transition-colors" strokeWidth={1} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books (e.g., Genesis, Matthew)..."
                className="pl-20 pr-10 py-10 text-xl font-light border-white/20 bg-white/10 backdrop-blur-2xl focus:bg-white/20 focus:ring-0 focus:border-white/40 rounded-[2.5rem] placeholder:text-white/30 text-white shadow-2xl transition-all duration-500"
              />
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white/20 max-h-80 overflow-y-auto text-left z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <button
                        key={book}
                        onClick={() => handleSearch(book)}
                        className="w-full px-8 py-5 hover:bg-black hover:text-white rounded-2xl flex items-center justify-between transition-all group/item"
                      >
                        <span className="text-lg font-light">{book}</span>
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </button>
                    ))
                  ) : (
                    <div className="px-8 py-5 text-gray-400 font-light italic">No results found for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900">
            <a href="#hubs" className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black backdrop-blur-md text-sm font-light tracking-widest uppercase transition-all">
              Study Hubs
            </a>
            <a href="#quizzes" className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black backdrop-blur-md text-sm font-light tracking-widest uppercase transition-all">
              Featured Quizzes
            </a>
            <a href="#categories" className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black backdrop-blur-md text-sm font-light tracking-widest uppercase transition-all">
              Categories
            </a>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center text-sm font-light text-gray-500 mb-12">
          <button className="hover:text-gray-900" onClick={() => navigate("/")}>
            Home
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide">Bible Q&amp;A Hub</span>
        </div>

        <section id="hubs" className="mb-40 scroll-mt-24">
          <div className="text-center mb-24">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Guided Journeys</h2>
            <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Book Study Hubs</h3>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Step into cinematic environments designed for deep scriptural exploration.
            </p>
          </div>

          {/* Old Testament Slider */}
          <div className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-gray-700 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
                Old Testament
              </h3>
              <span className="text-sm text-gray-400 font-light hidden sm:block italic">39 Books • Scroll to explore →</span>
            </div>
            
            <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
              {Object.values(bibleBooks.oldTestament).flat().map((book) => {
                const info = getBookInfo(book);
                return (
                  <div 
                    key={book}
                    className="flex-shrink-0 w-44 sm:w-52 snap-start h-full"
                    onClick={() => handleSearch(book)}
                  >
                    <Card className="border border-gray-100 hover:border-black/5 transition-all duration-500 bg-white overflow-hidden group shadow-2xl shadow-gray-200/40 cursor-pointer h-full rounded-[2rem] relative">
                      <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden relative">
                        <img 
                          src={`/images/books/${getBookSlug(book)}.png`}
                          alt={`${book} - Chapter Hub & Quizzes`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-icon')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center fallback-icon opacity-40';
                              fallback.innerHTML = `<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner border border-gray-100">
                                <span class="text-xl font-bold text-gray-300 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        
                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-md p-6 flex flex-col justify-end text-white z-20">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">{info.chapters} Chapters</p>
                           <p className="text-sm font-light leading-relaxed mb-6 line-clamp-4 italic opacity-90 font-serif">{info.summary}</p>
                           <Button size="sm" className="w-full bg-white text-black hover:bg-gray-200 text-[10px] h-9 rounded-xl font-semibold uppercase tracking-widest transition-all">Explore</Button>
                        </div>
                      </div>
                      <CardContent className="p-5 flex flex-col items-center text-center">
                        <span className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors uppercase tracking-widest">{book}</span>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Testament Slider */}
          <div className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium text-gray-700 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
                New Testament
              </h3>
              <span className="text-sm text-gray-400 font-light hidden sm:block italic">27 Books • Scroll to explore →</span>
            </div>
            
            <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
              {Object.values(bibleBooks.newTestament).flat().map((book) => {
                const info = getBookInfo(book);
                return (
                  <div 
                    key={book}
                    className="flex-shrink-0 w-44 sm:w-52 snap-start h-full"
                    onClick={() => handleSearch(book)}
                  >
                    <Card className="border border-gray-100 hover:border-black/5 transition-all duration-500 bg-white overflow-hidden group shadow-2xl shadow-gray-200/40 cursor-pointer h-full rounded-[2rem] relative">
                      <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden relative">
                        <img 
                          src={`/images/books/${getBookSlug(book)}.png`}
                          alt={`${book} - Chapter Hub & Quizzes`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-icon')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center fallback-icon opacity-40';
                              fallback.innerHTML = `<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner border border-gray-100">
                                <span class="text-xl font-bold text-gray-300 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        
                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-md p-6 flex flex-col justify-end text-white z-20">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">{info.chapters} Chapters</p>
                           <p className="text-sm font-light leading-relaxed mb-6 line-clamp-4 italic opacity-90 font-serif">{info.summary}</p>
                           <Button size="sm" className="w-full bg-white text-black hover:bg-gray-200 text-[10px] h-9 rounded-xl font-semibold uppercase tracking-widest transition-all">Explore</Button>
                        </div>
                      </div>
                      <CardContent className="p-5 flex flex-col items-center text-center">
                        <span className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors uppercase tracking-widest">{book}</span>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
            
            {/* Custom scrollbar styling */}
            <style dangerouslySetInnerHTML={{ __html: `
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredHubs.map((hub) => (
              <Card
                key={hub.id}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(`/bible-questions-and-answers-hub/${hub.id}`)}
              > 
                <div className="h-2 w-full bg-black absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500">
                    <BookOpen className="w-8 h-8 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{hub.title}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Study Portal</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10">{hub.description}</p>
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">
                    Explore Hub
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="quizzes" className="mb-40 scroll-mt-24 border-t border-gray-100 pt-32">
          <div className="text-center mb-24">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Test Your Knowledge</h2>
            <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Featured Quizzes</h3>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Daily refreshed challenges to keep your Word study sharp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomFeaturedQuizzes.map((quiz) => (
              <Card
                key={quiz.title}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full bg-white shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem] overflow-hidden"
                onClick={() => navigate(quiz.link)}
              > 
                <div className="h-2 w-full bg-gray-900 absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pt-12 pb-8 px-10 border-b border-gray-50 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500">
                    <quiz.icon className="w-8 h-8 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-3xl font-normal text-gray-900 italic serif mb-3">{quiz.title}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Featured Challenge</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-4 flex-grow">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-6">{quiz.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100">
                      {quiz.questions} Questions
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-100">
                      {quiz.difficulty}
                    </div>
                  </div>
                </CardContent>
                <CardContent className="px-10 pb-12 pt-6">
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="categories" className="mb-40 scroll-mt-24 border-t border-gray-100 pt-32">
          <div className="text-center mb-24">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8">Structured Discovery</h2>
            <h3 className="text-5xl md:text-7xl font-normal text-gray-900 mb-8 italic serif">Biblical Categories</h3>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the Word through its literary and historical divisions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((category) => (
              <Card
                key={category.name}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => handleCategoryClick(category.name)}
              > 
                <div className="h-2 w-full bg-black absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="pt-12 pb-8 px-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500">
                    <category.icon className="w-8 h-8 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-3xl font-normal text-gray-900 italic serif mb-3">{category.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">Bible Category</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between">
                  <p className="text-xl font-light text-gray-500 leading-relaxed mb-10">{category.description}</p>
                  <Button variant="ghost" className="w-full justify-start px-0 text-xs font-semibold tracking-widest text-gray-400 uppercase group-hover:text-black hover:bg-transparent">
                    View Books →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {recentSearches.length > 0 && (
          <section className="mb-40 border-t border-gray-100 pt-32">
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-6">Continue Your Journey</h2>
              <h3 className="text-4xl font-normal text-gray-900 italic serif">Recently Viewed</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {recentSearches.map((book) => (
                <Button key={book} variant="outline" onClick={() => handleSearch(book)} className="font-light border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-full px-8 py-6 transition-all text-base">
                  {book}
                </Button>
              ))}
            </div>
          </section>
        )}
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
                <li><button onClick={() => navigate("/public-leaderboard")} className="hover:text-black transition-colors">Leaderboards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4 text-gray-500 font-light">
                <li><button onClick={() => navigate("/help")} className="hover:text-black transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate("/contact")} className="hover:text-black transition-colors">Contact Us</button></li>
                <li><button onClick={() => navigate("/privacy")} className="hover:text-black transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-sm font-light text-gray-400">
            <p>© 2026 Bible Quiz Competition. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="hover:text-black cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-black cursor-pointer transition-colors">Facebook</span>
              <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold text-gray-900">{selectedCategory}</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsCategoryDialogOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" strokeWidth={1} />
              </Button>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {getBooksByCategory(selectedCategory).map((book) => (
              <Card
                key={book}
                className="border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group bg-white"
                onClick={() => {
                  handleSearch(book);
                  setIsCategoryDialogOpen(false);
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-gray-700" strokeWidth={1} />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{book}</h3>
                  <p className="text-sm font-light text-gray-500 mt-1">Open Hub</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
