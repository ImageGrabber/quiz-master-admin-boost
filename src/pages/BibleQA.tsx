import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy, Search, BookOpen, Clock, TrendingUp, Brain, X, Users, Target, Swords, ChevronRight, Filter, BookMarked, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bibleBooks, featuredQuizzes, categories as categoryData } from "@/data/bible-data";

const quickStats = [
  { label: "Total Quizzes", value: "66", icon: BookOpen, color: "text-blue-600" },
  { label: "Active Users", value: "1,247", icon: Users, color: "text-green-600" },
  { label: "Questions Answered", value: "45,892", icon: Target, color: "text-purple-600" },
  { label: "Average Score", value: "78%", icon: TrendingUp, color: "text-orange-600" }
];

export default function BibleQA() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  // Create a separate random array for Featured Quizzes that changes daily
  const getDailyRandomQuizzes = () => {
    const today = new Date().toDateString(); // Get today's date as string
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // Create seed from date

    // Simple seeded random function
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Create a copy and shuffle using the daily seed
    const shuffled = [...featuredQuizzes].sort((a, b) => {
      const randomA = seededRandom(seed + a.title.charCodeAt(0));
      const randomB = seededRandom(seed + b.title.charCodeAt(0));
      return randomA - randomB;
    });

    return shuffled.slice(0, 9);
  };

  const randomFeaturedQuizzes = getDailyRandomQuizzes();

  // Get all books for search
  const allBooks = [
    ...bibleBooks.oldTestament.Pentateuch,
    ...bibleBooks.oldTestament.Historical,
    ...bibleBooks.oldTestament.Wisdom,
    ...bibleBooks.oldTestament.MajorProphets,
    ...bibleBooks.oldTestament.MinorProphets,
    ...bibleBooks.newTestament.Gospels,
    ...bibleBooks.newTestament.Historical,
    ...bibleBooks.newTestament.PaulineEpistles,
    ...bibleBooks.newTestament.GeneralEpistles,
    ...bibleBooks.newTestament.Apocalyptic
  ];

  const filteredBooks = allBooks.filter(book =>
    book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (book: string) => {
    // Find the corresponding quiz from featuredQuizzes
    const quiz = featuredQuizzes.find(q =>
      q.title.toLowerCase().includes(book.toLowerCase()) ||
      book.toLowerCase().includes(q.title.toLowerCase().replace(' quiz', ''))
    );

    if (quiz) {
      navigate(quiz.link);
    } else {
      // Fallback to the old behavior if no quiz found
      const link = `/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, '-')}`;
      navigate(link);
    }

    // Add to recent searches
    if (!recentSearches.includes(book)) {
      setRecentSearches(prev => [book, ...prev.slice(0, 4)]);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCategoryDialogOpen(true);
  };

  const getBooksByCategory = (categoryName: string) => {
    switch (categoryName) {
      case "Pentateuch": return bibleBooks.oldTestament.Pentateuch;
      case "Historical Books": return bibleBooks.oldTestament.Historical;
      case "Wisdom Literature": return bibleBooks.oldTestament.Wisdom;
      case "Major Prophets": return bibleBooks.oldTestament.MajorProphets;
      case "Minor Prophets": return bibleBooks.oldTestament.MinorProphets;
      case "Gospels": return bibleBooks.newTestament.Gospels;
      case "Historical Books (NT)": return bibleBooks.newTestament.Historical;
      case "Pauline Epistles": return bibleBooks.newTestament.PaulineEpistles;
      case "General Epistles": return bibleBooks.newTestament.GeneralEpistles;
      case "Apocalyptic": return bibleBooks.newTestament.Apocalyptic;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-white font-urbanist pb-24 selection:bg-gray-100 selection:text-black">
      <SEO
        title="Bible Q&A Hub | Master Your Scripture Knowledge"
        description="Comprehensive Bible quizzes and study guides for every book of the Bible, from Genesis to Revelation. Track your progress and master the Word."
        url="/bible-questions-and-answers-hub"
      />

      <Navigation />

      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-50/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-50/30 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Trophy className="h-3.5 w-3.5 text-black" strokeWidth={1.5} />
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Master Your Bible Knowledge</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-normal text-gray-900 mb-8 leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Discover <span className="font-light italic text-gray-400">the</span> Word
          </h1>

          <p className="text-lg md:text-2xl font-light text-gray-500 mb-14 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Explore 66 sacred books through interactive quests, in-depth study hubs, and thousands of expert-curated questions.
          </p>

          {/* Premium Search Bar */}
          <div className="max-w-2xl mx-auto relative group animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
            <div className="absolute inset-0 bg-gray-900/5 blur-3xl group-focus-within:bg-gray-900/10 transition-colors" />
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-300 group-focus-within:text-gray-900 transition-colors" strokeWidth={1} />
              <Input
                type="text"
                placeholder="Search for any book (Genesis, John, Matthew)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-20 pl-16 pr-8 rounded-[2.5rem] border-gray-100 bg-white shadow-2xl shadow-gray-100/50 text-xl font-light focus:ring-0 focus:border-gray-900 transition-all hover:border-gray-200"
              />
            </div>

            {/* Live Search Results */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-h-[400px] overflow-y-auto z-50 p-2 animate-in fade-in slide-in-from-top-2">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div
                      key={book}
                      onClick={() => handleSearch(book)}
                      className="flex items-center justify-between p-4 hover:bg-white rounded-2xl cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="h-5 w-5 text-gray-900" strokeWidth={1} />
                        </div>
                        <span className="text-lg font-light text-gray-900">{book} Hub</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 translate-x-0 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 font-light italic">No scriptures found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {quickStats.map((stat, idx) => (
            <div key={stat.label} className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 text-center animate-in fade-in zoom-in-95 duration-700" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-50">
                <stat.icon className={`h-5 w-5 ${stat.color.replace('text-', 'text-opacity-70 text-')}`} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1 leading-none">{stat.value}</div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="container mx-auto px-6 max-w-7xl">

        {/* Book Study Hubs (Genesis Hub, Exodus Hub) */}
        <section className="mb-32">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">Bible Study Hubs</h2>
            <p className="text-xl font-medium text-gray-500 max-w-2xl mx-auto">Master every book of the Bible through structured guides and in-depth quizzes.</p>
          </div>

          <Tabs defaultValue="old" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="h-16 p-2 bg-gray-100 rounded-[2rem] border-none">
                <TabsTrigger value="old" className="px-10 rounded-[1.5rem] text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-lg transition-all">
                  Old Testament
                </TabsTrigger>
                <TabsTrigger value="new" className="px-10 rounded-[1.5rem] text-lg font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-lg transition-all">
                  New Testament
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="old" className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {[
                { name: "Pentateuch", books: bibleBooks.oldTestament.Pentateuch },
                { name: "Historical Books", books: bibleBooks.oldTestament.Historical },
                { name: "Wisdom Literature", books: bibleBooks.oldTestament.Wisdom },
                { name: "Major Prophets", books: bibleBooks.oldTestament.MajorProphets },
                { name: "Minor Prophets", books: bibleBooks.oldTestament.MinorProphets },
              ].map((cat) => {
                const meta = categoryData.find(c => c.name === cat.name);
                return (
                  <div key={cat.name} className="space-y-10">
                    <div className="flex items-center gap-6 px-4">
                      <div className={`h-12 w-12 ${meta?.color.split(' ')[0]} rounded-2xl flex items-center justify-center`}>
                        {meta && <meta.icon className="h-6 w-6 text-gray-900" strokeWidth={1.5} />}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">{cat.name}</h3>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {cat.books.map((book) => (
                        <div
                          key={book}
                          onClick={() => handleSearch(book)}
                          className="group p-6 rounded-[2rem] border border-gray-100 bg-white hover:border-gray-900 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 cursor-pointer"
                        >
                          <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <BookOpen className="h-6 w-6 text-gray-300 group-hover:text-gray-900 transition-colors" strokeWidth={1} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors truncate">{book}</h4>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Study Hub</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="new" className="space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {[
                { name: "Gospels", books: bibleBooks.newTestament.Gospels },
                { name: "Historical Books (NT)", books: bibleBooks.newTestament.Historical },
                { name: "Pauline Epistles", books: bibleBooks.newTestament.PaulineEpistles },
                { name: "General Epistles", books: bibleBooks.newTestament.GeneralEpistles },
                { name: "Apocalyptic", books: bibleBooks.newTestament.Apocalyptic },
              ].map((cat) => {
                const meta = categoryData.find(c => c.name === cat.name || (cat.name === "Historical Books (NT)" && c.name === "Historical Books"));
                return (
                  <div key={cat.name} className="space-y-10">
                    <div className="flex items-center gap-6 px-4">
                      <div className={`h-12 w-12 ${meta?.color.split(' ')[0] || 'bg-blue-50'} rounded-2xl flex items-center justify-center`}>
                        {meta && <meta.icon className="h-6 w-6 text-gray-900" strokeWidth={1.5} />}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">{cat.name}</h3>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {cat.books.map((book) => (
                        <div
                          key={book}
                          onClick={() => handleSearch(book)}
                          className="group p-6 rounded-[2rem] border border-gray-100 bg-white hover:border-gray-900 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 cursor-pointer"
                        >
                          <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <BookOpen className="h-6 w-6 text-gray-300 group-hover:text-gray-900 transition-colors" strokeWidth={1} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors truncate">{book}</h4>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">Study Hub</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </section>

        {/* Featured Quizzes section */}
        <section className="mb-24 px-10 py-20 bg-gray-50 rounded-[4rem] border border-gray-100">
          <div className="flex items-end justify-between mb-16 px-4">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-normal text-gray-900 tracking-tight">Today's Quests</h2>
              <p className="text-xl font-light text-gray-500">Curated challenges to test your understanding.</p>
            </div>
            <Button variant="outline" onClick={() => setSearchQuery("")} className="hidden sm:flex h-14 px-10 rounded-2xl border-gray-200 font-light text-lg">View Library</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomFeaturedQuizzes.map((quiz) => (
              <Card
                key={quiz.title}
                className="group border-none shadow-none hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 rounded-[2rem] cursor-pointer bg-white overflow-hidden p-2"
                onClick={() => navigate(quiz.link)}
              >
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <quiz.icon className="h-6 w-6 text-gray-900" strokeWidth={1} />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-widest bg-gray-50 border-gray-100 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-normal text-gray-900 mb-3 leading-tight">{quiz.title}</CardTitle>
                  <CardDescription className="text-sm font-light text-gray-500 line-clamp-2 leading-relaxed">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                    <Target className="h-3.5 w-3.5" />
                    <span>{quiz.questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-gray-900 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    Begin <ChevronRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Biblical Categories Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 tracking-tight text-center md:text-left">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {categoryData.slice(0, 8).map((category) => (
                  <button
                    key={category.name}
                    className="px-6 py-2 rounded-full border border-gray-100 text-sm font-light text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-white transition-all shadow-sm"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.slice(0, 6).map((cat) => (
              <div
                key={cat.name}
                className="p-10 rounded-[3rem] border border-gray-50 bg-white hover:border-gray-100 hover:shadow-xl hover:shadow-gray-50 transition-all duration-700 cursor-pointer group"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                  <cat.icon className="h-8 w-8 text-gray-900" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-2">{cat.name}</h3>
                <p className="text-sm font-light text-gray-500 leading-relaxed">{cat.description}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] group-hover:text-gray-900 transition-colors">
                  Explore Books <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unified Call to Action */}
        <section className="bg-gray-900 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
          {/* Decorative Background for CTA */}
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-7xl font-normal leading-[1.1] tracking-tight">Master <span className="font-light italic text-gray-400">the</span> Complete Scripture</h2>
            <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed max-w-xl mx-auto">
              Join a community of believers tracking their growth and exploring the word together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Button
                size="lg"
                onClick={() => navigate("/auth/register")}
                className="w-full sm:w-auto h-20 px-14 rounded-3xl bg-white text-gray-900 hover:bg-gray-100 shadow-2xl transition-all hover:scale-105 active:scale-95 text-lg font-normal"
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth/login")}
                className="w-full sm:w-auto h-20 px-14 rounded-3xl border-gray-700 text-white hover:bg-gray-800 text-lg font-light"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Category Selection Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0 rounded-[3rem] border-none bg-white font-urbanist selection:bg-gray-100">
          <div className="p-12 h-full flex flex-col">
            <DialogHeader className="mb-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {selectedCategory && categoryData.find(c => c.name === selectedCategory)?.icon && (() => {
                    const Icon = categoryData.find(c => c.name === selectedCategory)!.icon;
                    return <Icon className="h-8 w-8 text-gray-900" strokeWidth={1} />;
                  })()}
                </div>
                <DialogTitle className="text-4xl font-normal text-gray-900 tracking-tight leading-none">{selectedCategory}</DialogTitle>
                <p className="text-lg font-light text-gray-500">{categoryData.find(c => c.name === selectedCategory)?.description}</p>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
                {selectedCategory && getBooksByCategory(selectedCategory).map((book) => (
                  <div
                    key={book}
                    className="p-6 rounded-[2rem] border border-gray-50 bg-white hover:border-gray-900 hover:shadow-xl hover:shadow-gray-50 transition-all duration-300 cursor-pointer text-center group"
                    onClick={() => { handleSearch(book); setIsCategoryDialogOpen(false); }}
                  >
                    <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-5 w-5 text-gray-900" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-normal text-gray-900 group-hover:text-gray-700 transition-colors mb-1">{book}</h4>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Explore Hub</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}