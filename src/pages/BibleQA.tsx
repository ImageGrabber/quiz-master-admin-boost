import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Trophy, Search, BookOpen, Users, Target, TrendingUp, Star, Clock, Zap, BookMarked, Heart, Award, Lightbulb, Globe, Shield, Crown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const bibleBooks = {
  oldTestament: {
    Pentateuch: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
    Historical: [
      "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"
    ],
    Wisdom: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"],
    MajorProphets: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"],
    MinorProphets: [
      "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
    ]
  },
  newTestament: {
    Gospels: ["Matthew", "Mark", "Luke", "John"],
    Historical: ["Acts"],
    PaulineEpistles: [
      "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"
    ],
    GeneralEpistles: [
      "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"
    ],
    Apocalyptic: ["Revelation"]
  }
};

const featuredQuizzes = [
  { title: "Genesis Quiz", description: "The beginning of everything", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-blue-500", link: "/public-quiz/genesis" },
  { title: "Matthew Quiz", description: "The Gospel of the King", difficulty: "Intermediate", questions: 10, icon: Crown, color: "bg-purple-500", link: "/public-quiz/matthew" },
  { title: "Psalms Quiz", description: "Songs of the heart", difficulty: "Beginner", questions: 10, icon: Heart, color: "bg-green-500", link: "/public-quiz/psalms" },
  { title: "Acts Quiz", description: "The birth of the Church", difficulty: "Intermediate", questions: 10, icon: Globe, color: "bg-orange-500", link: "/public-quiz/acts" },
  { title: "Revelation Quiz", description: "The end times", difficulty: "Advanced", questions: 10, icon: Shield, color: "bg-red-500", link: "/public-quiz/revelation" },
  { title: "Proverbs Quiz", description: "Wisdom for daily living", difficulty: "Beginner", questions: 10, icon: Lightbulb, color: "bg-yellow-500", link: "/public-quiz/proverbs" }
];

const categories = [
  { name: "Pentateuch", description: "The first five books", count: 5, icon: BookOpen, color: "bg-blue-100 text-blue-700" },
  { name: "Historical Books", description: "Israel's history", count: 12, icon: BookMarked, color: "bg-green-100 text-green-700" },
  { name: "Wisdom Literature", description: "Poetry and wisdom", count: 5, icon: Lightbulb, color: "bg-yellow-100 text-yellow-700" },
  { name: "Major Prophets", description: "Major prophetic books", count: 5, icon: Target, color: "bg-purple-100 text-purple-700" },
  { name: "Minor Prophets", description: "Minor prophetic books", count: 12, icon: Zap, color: "bg-orange-100 text-orange-700" },
  { name: "Gospels", description: "The life of Jesus", count: 4, icon: Crown, color: "bg-red-100 text-red-700" },
  { name: "Pauline Epistles", description: "Paul's letters", count: 13, icon: Users, color: "bg-indigo-100 text-indigo-700" },
  { name: "General Epistles", description: "Other letters", count: 8, icon: Star, color: "bg-pink-100 text-pink-700" },
  { name: "Apocalyptic", description: "End times and prophecy", count: 1, icon: Shield, color: "bg-red-100 text-red-700" }
];

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
    const link = `/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, '-')}`;
    navigate(link);
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
            <span className="text-lg font-semibold text-gray-900">BibleBattles</span>
          </div>
          <nav className="flex items-center space-x-2">
            <a href="/" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Home</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Discover Your <span className="text-blue-600">Bible Knowledge</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Search through 66 Bible books, take interactive quizzes, and challenge yourself with thousands of questions. 
            Find exactly what you're looking for or explore new topics.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for any Bible book (e.g., Genesis, Matthew, Psalms)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
              />
            </div>
            
            {/* Search Results */}
            {searchQuery && (
              <div className="mt-4 bg-white rounded-xl shadow-xl border border-gray-200 max-h-64 overflow-y-auto">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div
                      key={book}
                      onClick={() => handleSearch(book)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-800">{book}</span>
                      <span className="text-sm text-blue-600">Take Quiz →</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No books found matching "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mx-auto mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 py-10">
        {/* Featured Quizzes */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Quizzes</h2>
            <Button variant="outline" onClick={() => setSearchQuery("")}>View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <Card key={quiz.title} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => navigate(quiz.link)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${quiz.color} flex items-center justify-center`}>
                      <quiz.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-500">{quiz.difficulty}</div>
                      <div className="text-sm text-gray-400">{quiz.questions} questions</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{quiz.title}</CardTitle>
                  <CardDescription className="text-gray-600">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid - COMMENTED OUT */}
        {/* <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const isClickable = category.name === "Pentateuch" || category.name === "Historical Books";
              return (
                <Card 
                  key={category.name} 
                  className={`shadow-lg border-0 transition-all duration-300 group ${
                    isClickable 
                      ? "hover:shadow-xl cursor-pointer" 
                      : "cursor-not-allowed opacity-60"
                  }`}
                  onClick={isClickable ? () => handleCategoryClick(category.name) : undefined}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold text-gray-900 transition-colors ${
                            isClickable ? "group-hover:text-blue-600" : ""
                          }`}>{category.name}</h3>
                          {!isClickable && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              PRO
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{category.count} quizzes</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    {!isClickable && (
                      <p className="text-xs text-gray-400 mt-2 italic">Upgrade to Pro to unlock</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section> */}

        {/* Category Dialog */}
        <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-gray-900">{selectedCategory}</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsCategoryDialogOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {getBooksByCategory(selectedCategory).map((book) => (
                <Card 
                  key={book} 
                  className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    handleSearch(book);
                    setIsCategoryDialogOpen(false);
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{book}</h3>
                    <p className="text-sm text-gray-500 mt-1">Take Quiz</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Viewed</h2>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((book) => (
                <Button
                  key={book}
                  variant="outline"
                  onClick={() => handleSearch(book)}
                  className="flex items-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>{book}</span>
                </Button>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Challenge Yourself?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of users competing in Bible quiz competitions and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => navigate("/auth/register")}>
                Sign Up Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100" onClick={() => navigate("/auth/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 