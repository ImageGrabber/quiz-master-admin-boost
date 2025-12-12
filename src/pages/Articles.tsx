import { useState, useEffect, useRef } from "react";
import { articles as sampleArticles } from "@/data/articles";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  TrendingUp,
  Star,
  Grid,
  List,
  Trophy,
  Brain,
  Menu
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string;
}


const categories = [
  "All",
  "Quiz Guide",
  "Quiz Strategy",
  "Competition",
  "Bible Characters",
  "Bible Topics",
  "Study Methods"
];

const Articles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredArticles = sampleArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Bible Study Articles and Resources",
      "description": "Comprehensive collection of Bible study articles, quiz preparation guides, and spiritual growth resources.",
      "url": "https://biblequizcompetition.com/articles",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": sampleArticles.map((article, index) => ({
          "@type": "Article",
          "position": index + 1,
          "name": article.title,
          "description": article.excerpt,
          "author": {
            "@type": "Person",
            "name": article.author
          },
          "datePublished": article.publishDate,
          "url": `https://biblequizcompetition.com/articles/${article.id}`,
          "articleSection": article.category,
          "keywords": article.tags.join(", ")
        }))
      }
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Bible Study Articles & Resources | Bible Quiz Competition</title>
        <meta name="description" content="Discover comprehensive Bible study articles, quiz preparation guides, and spiritual growth resources. Learn effective study methods, memorize Scripture, and deepen your biblical knowledge." />
        <meta name="keywords" content="Bible study articles, Bible study methods, Scripture memorization, Bible quiz preparation, biblical knowledge, spiritual growth, Christian education" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://biblequizcompetition.com/articles" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bible Study Articles & Resources" />
        <meta property="og:description" content="Discover comprehensive Bible study articles, quiz preparation guides, and spiritual growth resources." />
        <meta property="og:url" content="https://biblequizcompetition.com/articles" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:image" content="https://biblequizcompetition.com/og-image-articles.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bible Study Articles & Resources" />
        <meta name="twitter:description" content="Discover comprehensive Bible study articles, quiz preparation guides, and spiritual growth resources." />
        <meta name="twitter:image" content="https://biblequizcompetition.com/og-image-articles.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>

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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 mb-6">
            Bible Study Articles & Resources
          </h1>
          <p className="text-xl font-urbanist font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive guides, study methods, and spiritual growth resources to deepen your understanding of Scripture and enhance your Bible study experience.
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1" ref={searchRef}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1} />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-gray-300 focus:border-gray-400 rounded-lg font-urbanist font-light"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`font-urbanist font-light border-gray-300 ${viewMode === "grid" ? "bg-black hover:bg-gray-800 text-white" : ""}`}
                >
                  <Grid className="w-4 h-4" strokeWidth={1} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`font-urbanist font-light border-gray-300 ${viewMode === "list" ? "bg-black hover:bg-gray-800 text-white" : ""}`}
                >
                  <List className="w-4 h-4" strokeWidth={1} />
                </Button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`font-urbanist font-light border-gray-300 mb-2 ${selectedCategory === category ? "bg-black hover:bg-gray-800 text-white" : "hover:bg-gray-50"
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-gray-700" strokeWidth={1} />
              <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 mb-2">{article.title}</CardTitle>
                        <CardDescription className="font-urbanist font-light text-gray-600 mb-3">
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-urbanist font-light border-gray-200">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm font-urbanist font-light text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" strokeWidth={1} />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" strokeWidth={1} />
                        {article.publishDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" strokeWidth={1} />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="font-urbanist font-light border-gray-300">{article.category}</Badge>
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-urbanist font-light bg-gray-100 text-gray-700 border-gray-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" asChild className="font-urbanist font-light border-gray-300">
                        <Link to={`/articles/${article.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">
              All Articles ({filteredArticles.length})
            </h2>
            <div className="flex items-center gap-2 text-sm font-urbanist font-light text-gray-500">
              <TrendingUp className="w-4 h-4" strokeWidth={1} />
              Most Recent
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-urbanist font-semibold text-gray-900 mb-2">{article.title}</CardTitle>
                    <CardDescription className="font-urbanist font-light text-gray-600">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm font-urbanist font-light text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" strokeWidth={1} />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" strokeWidth={1} />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-urbanist font-light border-gray-300">{article.category}</Badge>
                      <Button variant="outline" size="sm" asChild className="font-urbanist font-light border-gray-300">
                        <Link to={`/articles/${article.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {regularArticles.map((article) => (
                <Card key={article.id} className="border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="font-urbanist font-light text-gray-600 mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm font-urbanist font-light text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" strokeWidth={1} />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" strokeWidth={1} />
                            {article.publishDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" strokeWidth={1} />
                            {article.readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-urbanist font-light border-gray-300">{article.category}</Badge>
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs font-urbanist font-light bg-gray-100 text-gray-700 border-gray-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4 font-urbanist font-light border-gray-300" asChild>
                        <Link to={`/articles/${article.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-urbanist font-semibold text-gray-900 mb-4">Ready to Test Your Knowledge?</h3>
          <p className="font-urbanist font-light text-gray-600 mb-6">
            Put your Bible knowledge to the test with our comprehensive quiz collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-urbanist font-light" asChild>
              <Link to="/public-quiz/genesis">
                <BookOpen className="w-5 h-5 mr-2" strokeWidth={1} />
                Take a Quiz
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 font-urbanist font-light" asChild>
              <Link to="/public-leaderboard">
                <Trophy className="w-5 h-5 mr-2" strokeWidth={1} />
                View Leaderboard
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-16 bg-gray-50 mt-16">
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
};

export default Articles;