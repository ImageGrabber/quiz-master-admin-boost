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
      id: "nehemiah",
      title: "Nehemiah Hub",
      description: "Leadership, rebuilding, and spiritual renewal studies with focused quizzes.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist">
      <SEO
        title="Bible Q&A Hub | Bible Quiz Competition"
        description="Explore all 66 Bible books with chapter quizzes, category hubs, and guided study paths from Genesis to Revelation."
        url="/bible-questions-and-answers-hub"
      />

      <Navigation />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-normal text-gray-900 mb-6 leading-tight">Bible Q&amp;A Hub</h1>
          <p className="text-2xl font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Search through all 66 books, open chapter study hubs, and challenge yourself with interactive Bible quizzes.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books (e.g., Genesis, Matthew, Romans)..."
                className="pl-12 pr-4 py-4 text-lg font-light border border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>

            {searchQuery && (
              <div className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto text-left">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <button
                      key={book}
                      onClick={() => handleSearch(book)}
                      className="w-full px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between transition-colors"
                    >
                      <span className="font-light text-gray-900">{book}</span>
                      <span className="text-sm text-gray-500">Open Hub →</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 font-light">No books found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#hubs" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">
              Study Hubs
            </a>
            <a href="#quizzes" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">
              Featured Quizzes
            </a>
            <a href="#categories" className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-light transition-colors">
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

        <section id="hubs" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">Book Study Hubs</h2>
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
                    className="flex-shrink-0 w-36 sm:w-44 snap-start h-full"
                    onClick={() => handleSearch(book)}
                  >
                    <Card className="border border-gray-100 hover:border-blue-200 transition-all duration-500 bg-white overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer h-full rounded-2xl relative">
                      <div className="aspect-[3/4] w-full bg-blue-50/10 overflow-hidden relative border-b border-gray-50">
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
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center fallback-icon opacity-40';
                              fallback.innerHTML = `<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner border border-blue-100">
                                <span class="text-xl font-bold text-blue-300 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        
                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm p-4 flex flex-col justify-end text-white z-20">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mb-1">{info.chapters} Chapters</p>
                           <p className="text-xs font-light leading-relaxed mb-4 line-clamp-4 italic opacity-90">{info.summary}</p>
                           <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-[10px] h-7 rounded-full font-semibold mb-2">Study Now</Button>
                        </div>
                      </div>
                      <CardContent className="p-3 flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{book}</span>
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
                    className="flex-shrink-0 w-36 sm:w-44 snap-start h-full"
                    onClick={() => handleSearch(book)}
                  >
                    <Card className="border border-gray-100 hover:border-red-200 transition-all duration-500 bg-white overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer h-full rounded-2xl relative">
                      <div className="aspect-[3/4] w-full bg-red-50/10 overflow-hidden relative border-b border-gray-50">
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
                              fallback.className = 'absolute inset-0 bg-gradient-to-br from-red-50 to-white flex items-center justify-center fallback-icon opacity-40';
                              fallback.innerHTML = `<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-inner border border-red-100">
                                <span class="text-xl font-bold text-red-300 font-urbanist">${book.charAt(0)}</span>
                              </div>`;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                        
                        {/* Discovery Overlay */}
                        <div className="absolute inset-x-0 bottom-0 top-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm p-4 flex flex-col justify-end text-white z-20">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-red-300 mb-1">{info.chapters} Chapters</p>
                           <p className="text-xs font-light leading-relaxed mb-4 line-clamp-4 italic opacity-90">{info.summary}</p>
                           <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-[10px] h-7 rounded-full font-semibold mb-2">Study Now</Button>
                        </div>
                      </div>
                      <CardContent className="p-3 flex flex-col items-center text-center">
                        <span className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors uppercase tracking-tight">{book}</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHubs.map((hub) => (
              <Card
                key={hub.id}
                className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col bg-white overflow-hidden group shadow-none cursor-pointer"
                onClick={() => navigate(`/bible-questions-and-answers-hub/${hub.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-colors group-hover:bg-gray-200">
                    <BookOpen className="w-6 h-6 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">{hub.title}</CardTitle>
                  <CardDescription className="text-lg font-light text-gray-600">{hub.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 mt-auto">
                  <Button className="w-full font-light border-gray-200 text-base py-6" variant="outline">
                    Open Hub
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="quizzes" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">Featured Quizzes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomFeaturedQuizzes.map((quiz) => (
              <Card
                key={quiz.title}
                className="border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col h-full bg-white group shadow-none cursor-pointer"
                onClick={() => navigate(quiz.link)}
              >
                <CardHeader className="pb-3 border-b border-gray-50 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                    <quiz.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">{quiz.title}</CardTitle>
                  <CardDescription className="text-base font-light text-gray-600">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-grow">
                  <p className="text-sm font-light text-gray-500 mb-4 leading-relaxed">
                    {quiz.questions} questions • {quiz.difficulty}
                  </p>
                </CardContent>
                <CardContent className="pt-4 border-t border-gray-50">
                  <Button size="sm" variant="outline" className="w-full font-light text-base py-5">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="categories" className="mb-20 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-semibold text-gray-900">Browse by Biblical Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer border border-gray-200 hover:border-gray-400 transition-all duration-300 flex flex-col group bg-white shadow-none"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                    <category.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900">{category.name}</CardTitle>
                  <CardDescription className="text-base font-light text-gray-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full text-sm font-light group-hover:bg-gray-100">
                    View Books →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {recentSearches.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-semibold text-gray-900">Recently Viewed</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((book) => (
                <Button key={book} variant="outline" onClick={() => handleSearch(book)} className="font-light border-gray-300">
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
