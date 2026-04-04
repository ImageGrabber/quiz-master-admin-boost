import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy, Search, BookOpen, Clock, TrendingUp, Menu, Brain, X, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { bibleBooks, featuredQuizzes, categories } from "@/data/bible-data";

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
  const [isSearching, setIsSearching] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
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
    <div className="min-h-screen bg-white">
      <SEO
        title="Bible Q&A Hub | Bible Quiz Competition 2025"
        description="Explore our Bible Q&A Hub for comprehensive quizzes and study guides for every book of the Bible, from Genesis to Revelation."
        url="/bible-questions-and-answers-hub"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Bible Q&A Hub",
          "description": "Comprehensive Bible quizzes and study guides for every book of the Bible.",
          "url": "https://biblequizcompetition.com/bible-questions-and-answers-hub",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": featuredQuizzes.map((quiz, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://biblequizcompetition.com${quiz.link}`,
              "name": quiz.title
            }))
          }
        }}
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

      {/* Hero Section with Search */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-urbanist font-normal text-gray-900 mb-6 leading-tight">
            Discover Your Bible Knowledge
          </h1>
          <p className="text-xl font-urbanist font-light text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Search through 66 Bible books, take interactive quizzes, and challenge yourself with thousands of questions. Find exactly what you're looking for or explore new topics.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
              <Input
                type="text"
                placeholder="Search for any Bible book (e.g., Genesis, Matthew, Psalms)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg font-urbanist font-light border border-gray-300 focus:border-gray-400 rounded-lg"
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="mt-4 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => {
                    // Find the corresponding quiz for this book
                    const quiz = featuredQuizzes.find(q =>
                      q.title.toLowerCase().includes(book.toLowerCase()) ||
                      book.toLowerCase().includes(q.title.toLowerCase().replace(' quiz', ''))
                    );

                    return (
                      <div
                        key={book}
                        onClick={() => handleSearch(book)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-urbanist font-medium text-gray-900">{book}</span>
                          {quiz && (
                            <span className="text-xs font-urbanist font-light text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              {quiz.difficulty}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-urbanist font-light text-gray-600">Take Quiz →</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-4 py-3 font-urbanist font-light text-gray-600">No books found matching "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 mx-auto mb-2">
                  <stat.icon className="w-4 h-4 text-gray-700" strokeWidth={1} />
                </div>
                <div className="text-2xl font-urbanist font-semibold text-gray-900">{stat.value}</div>
                <div className="text-sm font-urbanist font-light text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Book Hubs (e.g., Genesis) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">Book Study Hubs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Genesis Hub Card */}
            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group bg-white" onClick={() => navigate('/bible-questions-and-answers-hub/genesis')}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-700" strokeWidth={1} />
                  </div>
                </div>
                <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">Genesis Hub</CardTitle>
                <CardDescription className="font-urbanist font-light text-gray-600">Questions, answers, and quizzes for the Book of Genesis</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full font-urbanist font-light border-gray-300" variant="outline">
                  Open Genesis Hub
                </Button>
              </CardContent>
            </Card>

            {/* Exodus Hub Card */}
            <Card className="border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group bg-white" onClick={() => navigate('/bible-questions-and-answers-hub/exodus')}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-gray-700" strokeWidth={1} />
                  </div>
                </div>
                <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">Exodus Hub</CardTitle>
                <CardDescription className="font-urbanist font-light text-gray-600">Questions, answers, and quizzes for the Book of Exodus</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full font-urbanist font-light border-gray-300" variant="outline">
                  Open Exodus Hub
                </Button>
              </CardContent>
            </Card>

            {/* Placeholder slots for upcoming hubs */}
            <div className="border border-dashed border-gray-200 rounded-lg p-6 bg-gray-50 flex items-center justify-center">
              <span className="font-urbanist font-light text-gray-500">More book hubs coming soon</span>
            </div>
          </div>
        </section>
        {/* Featured Quizzes */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">Featured Quizzes</h2>
            <Button variant="outline" onClick={() => setSearchQuery("")} className="font-urbanist font-light border-gray-300">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomFeaturedQuizzes.map((quiz) => (
              <Card key={quiz.title} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group bg-white" onClick={() => navigate(quiz.link)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <quiz.icon className="w-6 h-6 text-gray-700" strokeWidth={1} />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-urbanist font-medium text-gray-600">{quiz.difficulty}</div>
                      <div className="text-sm font-urbanist font-light text-gray-500">{quiz.questions} questions</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{quiz.title}</CardTitle>
                  <CardDescription className="font-urbanist font-light text-gray-600">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full font-urbanist font-light border-gray-300" variant="outline">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid - Organized by Biblical Order */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900 mb-8">Browse by Biblical Category</h2>
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryQuizzes = featuredQuizzes.filter(quiz => quiz.category === category.name);
              const isClickable = categoryQuizzes.length > 0;

              return (
                <div key={category.name} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div
                    className={`flex items-center space-x-3 mb-4 ${isClickable ? 'cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors' : ''}`}
                    onClick={isClickable ? () => handleCategoryClick(category.name) : undefined}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="text-xl font-urbanist font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm font-urbanist font-light text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  {categoryQuizzes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryQuizzes.map((quiz) => (
                        <Card key={quiz.title} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group bg-white" onClick={() => navigate(quiz.link)}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <quiz.icon className="w-4 h-4 text-gray-700" strokeWidth={1} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-urbanist font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{quiz.title}</h4>
                                <p className="text-sm font-urbanist font-light text-gray-500">{quiz.difficulty} • {quiz.questions} questions</p>
                              </div>
                            </div>
                            <p className="text-sm font-urbanist font-light text-gray-600 mb-3">{quiz.description}</p>
                            <Button className="w-full font-urbanist font-light border-gray-300" variant="outline" size="sm">
                              Start Quiz
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="font-urbanist font-light text-gray-500 italic">Quizzes for this category coming soon...</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Dialog */}
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-urbanist font-semibold text-gray-900">{selectedCategory}</DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCategoryDialogOpen(false)}
                  className="h-8 w-8 p-0"
                >
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
                    <h3 className="font-urbanist font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">{book}</h3>
                    <p className="text-sm font-urbanist font-light text-gray-500 mt-1">Take Quiz</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-urbanist font-semibold text-gray-900 mb-6">Recently Viewed</h2>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((book) => (
                <Button
                  key={book}
                  variant="outline"
                  onClick={() => handleSearch(book)}
                  className="flex items-center space-x-2 font-urbanist font-light border-gray-300"
                >
                  <Clock className="w-4 h-4" strokeWidth={1} />
                  <span>{book}</span>
                </Button>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-urbanist font-semibold text-gray-900 mb-4">Ready to Challenge Yourself?</h2>
            <p className="text-xl font-urbanist font-light text-gray-600 mb-6">
              Join thousands of users competing in Bible quiz competitions and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-urbanist font-light" onClick={() => navigate("/auth/register")}>
                Sign Up Free
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 font-urbanist font-light" onClick={() => navigate("/auth/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg font-urbanist font-light text-gray-900">Bible Quiz Competition</span>
              </div>
              <p className="font-urbanist font-light text-gray-600 mb-4 max-w-md">
                Free Bible quiz platform that helps you test your knowledge, compete with others, and grow in your understanding of Scripture.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4 font-urbanist">Product</h3>
              <ul className="space-y-3">
                <li><a href="/todays-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Today's Quiz</a></li>
                <li><a href="/weekly-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Weekly Quiz</a></li>
                <li><a href="/public-leaderboard" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Leaderboard</a></li>
                <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4 font-urbanist">Support</h3>
              <ul className="space-y-3">
                <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                <li><a href="#faq" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                <li><a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="font-urbanist font-light text-gray-600">© 2024 Bible Quiz Competition. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}