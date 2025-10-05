import { useState } from "react";
import { Link } from "react-router-dom";
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
  Filter,
  Grid,
  List,
  Trophy,
  Brain,
  Target,
  Heart,
  Crown,
  Shield
} from "lucide-react";
import Header from "@/components/Header";

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

const sampleArticles: Article[] = [
  {
    id: "complete-quiz-guide",
    title: "The Complete Guide to Bible Quiz Competition: How to Master Every Quiz",
    excerpt: "Learn everything you need to know about using our Bible quiz platform effectively. From registration to advanced strategies, this comprehensive guide will help you excel.",
    content: "Full article content here...",
    author: "Quiz Master Team",
    publishDate: "2024-12-20",
    readTime: "12 min read",
    category: "Quiz Guide",
    tags: ["Quiz Guide", "Tutorial", "Getting Started", "Platform"],
    featured: true,
    imageUrl: "/images/quiz-guide.jpg"
  },
  {
    id: "quiz-strategies",
    title: "5 Proven Strategies to Improve Your Bible Quiz Scores",
    excerpt: "Discover expert techniques used by top performers to consistently achieve high scores in Bible quizzes. Learn time management, study methods, and test-taking strategies.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-12-18",
    readTime: "8 min read",
    category: "Quiz Strategy",
    tags: ["Strategy", "Scoring", "Performance", "Tips"],
    featured: true,
    imageUrl: "/images/quiz-strategies.jpg"
  },
  {
    id: "leaderboard-tips",
    title: "How to Climb the Leaderboard: A Step-by-Step Guide",
    excerpt: "Want to see your name at the top? Learn the secrets of successful quiz takers and discover how to consistently rank high on our leaderboards.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-12-15",
    readTime: "6 min read",
    category: "Competition",
    tags: ["Leaderboard", "Competition", "Ranking", "Success"],
    featured: false,
    imageUrl: "/images/leaderboard-tips.jpg"
  },
  {
    id: "david-king-israel",
    title: "King David: The Shepherd Who Became Israel's Greatest King",
    excerpt: "Explore the life of David, from shepherd boy to king of Israel. Discover his victories, struggles, and the lessons we can learn from his relationship with God.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-12-12",
    readTime: "10 min read",
    category: "Bible Characters",
    tags: ["David", "King", "Israel", "Leadership", "Faith"],
    featured: false,
    imageUrl: "/images/david-king.jpg"
  },
  {
    id: "moses-exodus-story",
    title: "Moses: The Reluctant Leader Who Delivered Israel",
    excerpt: "Follow Moses' incredible journey from Egyptian prince to deliverer of God's people. Learn about his calling, the plagues, and the Exodus story.",
    content: "Full article content here...",
    author: "Professor Lisa Martinez",
    publishDate: "2024-12-10",
    readTime: "9 min read",
    category: "Bible Characters",
    tags: ["Moses", "Exodus", "Leadership", "Deliverance", "Faith"],
    featured: false,
    imageUrl: "/images/moses-exodus.jpg"
  },
  {
    id: "esther-courage-story",
    title: "Esther: A Queen's Courage That Saved Her People",
    excerpt: "Discover how Esther's bravery and faith saved the Jewish people from destruction. Learn about her strategic wisdom and unwavering trust in God.",
    content: "Full article content here...",
    author: "Rev. James Wilson",
    publishDate: "2024-12-08",
    readTime: "7 min read",
    category: "Bible Characters",
    tags: ["Esther", "Courage", "Queen", "Deliverance", "Faith"],
    featured: false,
    imageUrl: "/images/esther-queen.jpg"
  },
  {
    id: "understanding-grace",
    title: "Understanding God's Grace: The Foundation of Christian Faith",
    excerpt: "Dive deep into the concept of grace in the Bible. Learn how God's unmerited favor transforms lives and discover what it means to live in grace.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-12-05",
    readTime: "11 min read",
    category: "Bible Topics",
    tags: ["Grace", "Salvation", "Faith", "Theology", "Christian Life"],
    featured: false,
    imageUrl: "/images/gods-grace.jpg"
  },
  {
    id: "prayer-life-guide",
    title: "Building a Strong Prayer Life: Lessons from Biblical Examples",
    excerpt: "Learn how to develop a meaningful prayer life by studying the prayer practices of Jesus, David, and other biblical figures. Practical tips for modern believers.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-12-03",
    readTime: "9 min read",
    category: "Bible Topics",
    tags: ["Prayer", "Spiritual Life", "Jesus", "David", "Worship"],
    featured: false,
    imageUrl: "/images/prayer-life.jpg"
  },
  {
    id: "quiz-time-management",
    title: "Time Management for Bible Quizzes: How to Answer Questions Efficiently",
    excerpt: "Master the art of time management during Bible quizzes. Learn how to pace yourself, prioritize questions, and maximize your score within time limits.",
    content: "Full article content here...",
    author: "Quiz Master Team",
    publishDate: "2024-12-01",
    readTime: "5 min read",
    category: "Quiz Guide",
    tags: ["Time Management", "Quiz Tips", "Efficiency", "Strategy"],
    featured: false,
    imageUrl: "/images/time-management.jpg"
  },
  {
    id: "bible-study-methods",
    title: "5 Effective Bible Study Methods for Quiz Preparation",
    excerpt: "Discover proven Bible study techniques that will help you prepare for quizzes and deepen your understanding of Scripture. From inductive study to memorization strategies.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-11-28",
    readTime: "8 min read",
    category: "Study Methods",
    tags: ["Bible Study", "Preparation", "Learning", "Scripture", "Methods"],
    featured: false,
    imageUrl: "/images/bible-study.jpg"
  }
];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
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

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bible Study Articles & Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover comprehensive guides, study methods, and spiritual growth resources to deepen your understanding of Scripture and enhance your Bible study experience.
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
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
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription className="text-gray-600 mb-3">
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.publishDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline">{article.category}</Badge>
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/articles/${article.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              All Articles ({filteredArticles.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              Most Recent
            </div>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{article.category}</Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/articles/${article.id}`}>
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
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
                <Card key={article.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.publishDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{article.category}</Badge>
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
          <p className="text-blue-100 mb-6">
            Put your Bible knowledge to the test with our comprehensive quiz collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/public-quiz/genesis">
                <BookOpen className="w-5 h-5 mr-2" />
                Take a Quiz
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/public-leaderboard">
                <Trophy className="w-5 h-5 mr-2" />
                View Leaderboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;