import { useState, useMemo, useEffect, useRef } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Search, BookOpen, ChevronRight, ChevronLeft, X, Brain, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { bibleBooks, featuredQuizzes, categories as categoryData, bibleStructure } from "@/data/bible-data";
import { Navigation } from "@/components/Navigation";

const getBookSlug = (book: string) => {
  return book.toLowerCase().replace(/ /g, "-");
};

const PremiumBookCard = ({ book, info, onClick }: { book: string; info: any; onClick: () => void }) => {
  return (
    <div 
      className="flex-shrink-0 w-64 sm:w-72 snap-start h-full pb-8"
      onClick={onClick}
    >
      <Card className="border border-gray-100/50 hover:border-black/10 transition-all duration-700 bg-white overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] cursor-pointer h-full rounded-[2.5rem] relative">
        <div className="aspect-[3/4.5] w-full bg-gray-50 overflow-hidden relative">
          <img 
            src={`/images/books/${getBookSlug(book)}.png`}
            alt={`${book} - Chapter Hub & Quizzes`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-icon')) {
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center fallback-icon opacity-40';
                fallback.innerHTML = `<div class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner border border-gray-100">
                  <span class="text-4xl font-bold text-gray-300 font-urbanist">${book.charAt(0)}</span>
                </div>`;
                parent.appendChild(fallback);
              }
            }}
          />
          
          {/* Permanent Floating Badge (Glassmorphic) */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="bg-white/40 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl flex items-center justify-between transition-all duration-500 group-hover:bg-white group-hover:translate-y-[-10px] shadow-lg">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 line-clamp-1">{book}</span>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center transition-transform group-hover:rotate-45">
                 <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Premium Discovery Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 text-white z-20">
             <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-700 delay-100">
               <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/60 mb-3">{info.chapters} Chapters</p>
               <h4 className="text-2xl font-normal italic serif mb-4">{book}</h4>
               <p className="text-base font-light leading-relaxed mb-8 line-clamp-4 italic opacity-80 font-serif">{info.summary}</p>
               <Button className="w-full bg-white text-black hover:bg-gray-100 py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.25em] transition-all">
                 Enter Portal
               </Button>
             </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function BibleQA() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  
  const otSliderRef = useRef<HTMLDivElement>(null);
  const ntSliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
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

      <Navigation transparent={true} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Modern Cinematic Hero Section */}
      <section className="relative h-[70vh] md:h-[95vh] min-h-[500px] md:min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HUB_IMAGES.hero} 
            alt="Majestic Bible Hub Background" 
            className="w-full h-full object-cover brightness-[0.35] transition-transform duration-[20000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-normal mb-8 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Bible Q&A <span className="italic font-serif">Hub</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Search through all 66 books, explore cinematic study hubs, and challenge yourself with interactive Scripture quizzes.
          </p>
          
          <div className="max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="relative group">
              <Search className="absolute left-6 md:left-8 top-1/2 transform -translate-y-1/2 text-black/40 group-focus-within:text-black w-5 h-5 md:w-6 md:h-6 transition-colors" strokeWidth={1} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="pl-16 md:pl-20 pr-10 py-8 md:py-12 text-lg md:text-2xl font-light border-transparent bg-white focus:bg-white focus:ring-0 rounded-2xl md:rounded-[2.5rem] placeholder:text-black/30 text-black shadow-2xl transition-all duration-500"
              />
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white backdrop-blur-3xl rounded-2xl md:rounded-[2rem] shadow-2xl border border-gray-100 max-h-80 overflow-y-auto text-left z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                      <button
                        key={book}
                        onClick={() => handleSearch(book)}
                        className="w-full px-8 py-5 hover:bg-black hover:text-white rounded-2xl flex items-center justify-between transition-all group/item text-black"
                      >
                        <span className="text-lg font-normal">{book}</span>
                        <ChevronRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-opacity text-black group-hover:text-white" />
                      </button>
                    ))
                  ) : (
                    <div className="px-8 py-5 text-gray-400 font-light italic">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-900">
            <a href="#hubs" className="px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-black hover:bg-black hover:text-white hover:scale-105 transition-all shadow-2xl shadow-black/20 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Study Hubs
            </a>
            <a href="#quizzes" className="px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-black hover:bg-black hover:text-white hover:scale-105 transition-all shadow-2xl shadow-black/20 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Featured Quizzes
            </a>
            <a href="#categories" className="px-8 md:px-12 py-4 md:py-6 rounded-full bg-white text-black hover:bg-black hover:text-white hover:scale-105 transition-all shadow-2xl shadow-black/20 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
              Categories
            </a>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1700px] mx-auto px-4 md:px-12 pt-20">
        <div className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-20 opacity-60">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-4 h-4 mx-3" />
          <span className="text-black">Bible Q&A Hub</span>
        </div>

        <section id="hubs" className="mb-60 scroll-mt-24">
          <div className="text-center mb-32">
            <div className="inline-block px-6 py-2 rounded-full border border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-8">Guided Journeys</div>
            <h2 className="text-6xl md:text-8xl font-normal text-gray-900 mb-10 italic serif">Book Study Hubs</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Step into cinematic environments designed for deep scriptural exploration from Genesis to Revelation.
            </p>
          </div>

          {/* Old Testament Slider */}
          <div className="mb-48 relative group/slider">
            <div className="flex items-end justify-between mb-12 px-2">
              <div>
                <h3 className="text-3xl font-normal text-gray-900 italic serif mb-2">Old Testament</h3>
                <p className="text-[10px] md:text-sm font-light text-gray-400 tracking-widest uppercase">The Foundational Covenant • 39 Books</p>
              </div>
              <div className="hidden md:flex gap-3">
                <button 
                  onClick={() => scrollSlider(otSliderRef, 'left')}
                  className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                   onClick={() => scrollSlider(otSliderRef, 'right')}
                   className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div 
              ref={otSliderRef}
              className="flex overflow-x-auto pb-12 gap-8 md:gap-10 no-scrollbar -mx-4 px-4 snap-x snap-mandatory"
            >
              {Object.values(bibleBooks.oldTestament).flat().map((book) => (
                <PremiumBookCard 
                  key={book} 
                  book={book} 
                  info={getBookInfo(book)} 
                  onClick={() => handleSearch(book)} 
                />
              ))}
            </div>
          </div>

          {/* New Testament Slider */}
          <div className="mb-48 relative group/slider">
            <div className="flex items-end justify-between mb-12 px-2">
              <div>
                <h3 className="text-3xl font-normal text-gray-900 italic serif mb-2">New Testament</h3>
                <p className="text-[10px] md:text-sm font-light text-gray-400 tracking-widest uppercase">The Fulfillment of Promise • 27 Books</p>
              </div>
              <div className="hidden md:flex gap-3">
                <button 
                  onClick={() => scrollSlider(ntSliderRef, 'left')}
                  className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                   onClick={() => scrollSlider(ntSliderRef, 'right')}
                   className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div 
              ref={ntSliderRef}
              className="flex overflow-x-auto pb-12 gap-8 md:gap-10 no-scrollbar -mx-4 px-4 snap-x snap-mandatory"
            >
              {Object.values(bibleBooks.newTestament).flat().map((book) => (
                <PremiumBookCard 
                  key={book} 
                  book={book} 
                  info={getBookInfo(book)} 
                  onClick={() => handleSearch(book)} 
                />
              ))}
            </div>
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

        <section id="quizzes" className="mb-60 scroll-mt-24">
          <div className="text-center mb-32">
            <div className="inline-block px-6 py-2 rounded-full border border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-8">Test Your Knowledge</div>
            <h2 className="text-6xl md:text-8xl font-normal text-gray-900 mb-10 italic serif">Featured Quizzes</h2>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Challenge yourself with our curated selection of high-fidelity scriptural examinations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {randomFeaturedQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
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

        <section id="categories" className="mb-40 scroll-mt-24 border-t border-gray-100 pt-32 text-gray-900">
          <div className="text-center mb-32">
            <div className="inline-block px-6 py-2 rounded-full border border-gray-100 bg-gray-50 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 mb-8">Structured Discovery</div>
            <h3 className="text-6xl md:text-8xl font-normal text-gray-900 mb-10 italic serif">Biblical Categories</h3>
            <p className="text-2xl font-light text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the Word through its literary and historical divisions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <p className="text-lg font-light text-gray-500 leading-relaxed mb-10 opacity-80">{category.description}</p>
                  <Button variant="ghost" className="w-full justify-start px-0 text-[10px] font-bold tracking-[0.3em] text-gray-300 uppercase group-hover:text-black hover:bg-transparent transition-colors">
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
              <h3 className="text-4xl font-normal text-gray-900 italic serif mb-4">Recently Viewed</h3>
              <p className="text-gray-400 font-light italic">Your history of scriptural exploration.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {recentSearches.map((book) => (
                <Button key={book} variant="outline" onClick={() => handleSearch(book)} className="font-bold border-gray-100 hover:border-black hover:bg-black hover:text-white rounded-full px-10 py-8 transition-all text-xs tracking-[0.2em] uppercase shadow-lg shadow-gray-100/50">
                  {book}
                </Button>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="bg-white border-t border-gray-100 pt-32 pb-20">
        <div className="max-w-[1700px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center transform -rotate-6 transition-transform hover:rotate-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 tracking-tighter">Bible Quiz <span className="italic serif font-normal">Competition</span></span>
              </div>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-sm italic serif">
                "Thy word is a lamp unto my feet, and a light unto my path."
              </p>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm mt-8">
                Empowering faith through interactive Scripture knowledge and cinematic study experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-10 uppercase tracking-[0.3em] text-[10px]">Quick Links</h4>
              <ul className="space-y-6 text-sm font-medium text-gray-400">
                <li><button onClick={() => navigate("/bible-questions-and-answers-hub")} className="hover:text-black hover:translate-x-2 transition-all">Quiz Hub</button></li>
                <li><button onClick={() => navigate("/articles")} className="hover:text-black hover:translate-x-2 transition-all">Study Articles</button></li>
                <li><button onClick={() => navigate("/public-leaderboard")} className="hover:text-black hover:translate-x-2 transition-all">Leaderboards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-10 uppercase tracking-[0.3em] text-[10px]">Support</h4>
              <ul className="space-y-6 text-sm font-medium text-gray-400">
                <li><button onClick={() => navigate("/help")} className="hover:text-black hover:translate-x-2 transition-all">Help Center</button></li>
                <li><button onClick={() => navigate("/contact")} className="hover:text-black hover:translate-x-2 transition-all">Contact Us</button></li>
                <li><button onClick={() => navigate("/privacy")} className="hover:text-black hover:translate-x-2 transition-all">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <p>© 2026 Bible Quiz Competition. Crafted for Excellence.</p>
            <div className="flex space-x-10 mt-8 md:mt-0">
              <span className="hover:text-black cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-black cursor-pointer transition-colors">Facebook</span>
              <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-none shadow-3xl p-12">
          <DialogHeader className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">Category Portal</DialogDescription>
                <DialogTitle className="text-5xl font-normal text-gray-900 italic serif">{selectedCategory}</DialogTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsCategoryDialogOpen(false)} className="h-14 w-14 rounded-full bg-gray-50 hover:bg-black hover:text-white transition-all">
                <X className="h-6 w-6" strokeWidth={1} />
              </Button>
            </div>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getBooksByCategory(selectedCategory).map((book) => (
              <Card
                key={book}
                className="group border border-gray-100 hover:border-black/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-white overflow-hidden rounded-3xl p-6"
                onClick={() => {
                  handleSearch(book);
                  setIsCategoryDialogOpen(false);
                }}
              >
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <BookOpen className="w-8 h-8 text-gray-400" strokeWidth={1} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors uppercase tracking-widest">{book}</h3>
                  <div className="mt-4 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Enter Hub →</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
