import { useState, useEffect, useRef } from "react";
import { articles as sampleArticles } from "@/data/articles";
import { Link, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
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
  Menu,
  Users,
  Music,
  Heart,
  Sparkles
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

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
      <SEO
        title="Bible Study Articles, Quiz Strategies & Resources | Bible Quiz Competition"
        description="Explore expert Bible study articles, winning quiz strategies, and Scripture memorization guides. Improve your biblical knowledge with our free Christian resources and study tools."
        keywords="Bible study articles, Bible study methods, Scripture memorization, Bible quiz strategies, free Bible resources, Christian education, Bible trivia tips, worship lyrics chords"
        author="Bible Quiz Competition"
        url="/articles"
        structuredData={generateStructuredData()}
      />

      <Navigation />

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

        {/* Biblical Study Hubs - New SEO Resources */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-indigo-600" strokeWidth={1} />
            <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">Biblical Study Hubs</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border border-indigo-100 hover:border-indigo-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-indigo-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-urbanist font-semibold text-gray-900">Bible Characters</CardTitle>
                <CardDescription className="text-sm">Study the lives of Abraham, Moses, David, and Paul.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                  <Link to="/bible-characters">
                    Explore Characters <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-sky-100 hover:border-sky-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-5 h-5 text-sky-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-urbanist font-semibold text-gray-900">Peace & Anxiety</CardTitle>
                <CardDescription className="text-sm">Curated verses and reflections for spiritual comfort.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-sky-200 text-sky-700 hover:bg-sky-50">
                  <Link to="/verses/peace-and-anxiety">
                    Find Comfort <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-amber-100 hover:border-amber-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-amber-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-urbanist font-semibold text-gray-900">Parables of Jesus</CardTitle>
                <CardDescription className="text-sm">Interactive quiz on the stories and lessons of Christ.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Link to="/quizzes/parables-of-jesus">
                    Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-emerald-100 hover:border-emerald-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-5 h-5 text-emerald-600" strokeWidth={1} />
                </div>
                <CardTitle className="text-lg font-urbanist font-semibold text-gray-900">Top 100 Questions</CardTitle>
                <CardDescription className="text-sm">The ultimate Bible trivia resource for all levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Link to="/top-100-bible-quiz-questions">
                    Master Trivia <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trending Worship Lyrics - Added for SEO targeting */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Tag className="w-6 h-6 text-orange-600" strokeWidth={1} />
            <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-gray-900">Trending Worship Lyrics</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-blue-100 hover:border-blue-300 transition-all bg-white shadow-sm ring-1 ring-blue-50/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700 font-urbanist font-light border-none">Telugu</Badge>
                  <div className="flex -space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                  </div>
                </div>
                <CardTitle className="text-lg font-urbanist font-semibold">Stuthi Aradhana (Telugu)</CardTitle>
                <CardDescription className="text-sm">Ho Teri Stuti lyrics in Telugu script, Video & Chords</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Link to="/ho-teri-stuti-aur-aradhana-lyrics-telugu">
                    View Telugu Lessons <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-orange-100 hover:border-orange-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-urbanist font-semibold">Ho Teri Stuti Aur Aradhana</CardTitle>
                <CardDescription className="text-sm">English, Telugu, Kannada & Malayalam Translations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Link to="/ho-teri-stuti-aur-aradhana-lyrics-telugu-kannada-malayalam">
                    View All Versions <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-orange-100 hover:border-orange-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-urbanist font-semibold">Apna Bojh Prabhu Par Daal</CardTitle>
                <CardDescription className="text-sm">Complete Guitar Chords & Lyrics (Hindi)</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Link to="/apna-bojh-prabhu-par-daal-lyrics-chords">
                    View Lyrics & Chords <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-orange-100 hover:border-orange-300 transition-all bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-urbanist font-semibold">Hallelujah Stuti Gaye Hum</CardTitle>
                <CardDescription className="text-sm">Full Lyrics in Hindi & English (Romanized)</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full font-urbanist font-light border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Link to="/hallelujah-stuti-gaye-hum-lyrics">
                    View Full Lyrics <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

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

      <Footer />
    </div>
  );
};

export default Articles;