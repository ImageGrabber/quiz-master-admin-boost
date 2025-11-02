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
  Grid,
  List,
  Trophy,
  Brain,
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
  },
  
  // Additional Quiz Guide Articles
  {
    id: "quiz-navigation-guide",
    title: "How to Navigate Our Quiz Platform: A Complete User Guide",
    excerpt: "Master the art of navigating our quiz platform with this comprehensive guide. Learn about all features, shortcuts, and hidden gems that will enhance your quiz experience.",
    content: "Full article content here...",
    author: "Quiz Master Team",
    publishDate: "2024-11-25",
    readTime: "6 min read",
    category: "Quiz Guide",
    tags: ["Navigation", "User Guide", "Platform", "Tutorial", "Features"],
    featured: false,
    imageUrl: "/images/quiz-navigation.jpg"
  },
  {
    id: "quiz-scoring-explained",
    title: "Understanding Quiz Scoring: How Points Are Calculated",
    excerpt: "Get a detailed breakdown of how our scoring system works. Learn about base points, bonuses, multipliers, and how to maximize your score in every quiz.",
    content: "Full article content here...",
    author: "Quiz Master Team",
    publishDate: "2024-11-22",
    readTime: "5 min read",
    category: "Quiz Guide",
    tags: ["Scoring", "Points", "Calculation", "System", "Guide"],
    featured: false,
    imageUrl: "/images/quiz-scoring.jpg"
  },
  {
    id: "quiz-difficulty-levels",
    title: "Quiz Difficulty Levels Explained: From Beginner to Expert",
    excerpt: "Understand the different difficulty levels in our quiz system and how to progress from beginner to expert level. Find the right quizzes for your current skill level.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-11-20",
    readTime: "7 min read",
    category: "Quiz Guide",
    tags: ["Difficulty", "Levels", "Progression", "Skills", "Expert"],
    featured: false,
    imageUrl: "/images/quiz-difficulty.jpg"
  },
  {
    id: "quiz-feedback-system",
    title: "Making the Most of Quiz Feedback: Learning from Your Mistakes",
    excerpt: "Learn how to use quiz feedback effectively to improve your biblical knowledge. Discover how to analyze wrong answers and turn them into learning opportunities.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-11-18",
    readTime: "6 min read",
    category: "Quiz Guide",
    tags: ["Feedback", "Learning", "Mistakes", "Improvement", "Analysis"],
    featured: false,
    imageUrl: "/images/quiz-feedback.jpg"
  },
  {
    id: "quiz-progress-tracking",
    title: "Tracking Your Quiz Progress: Setting Goals and Measuring Success",
    excerpt: "Learn how to effectively track your quiz progress and set meaningful goals. Discover tools and techniques to measure your improvement over time.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-11-15",
    readTime: "8 min read",
    category: "Quiz Guide",
    tags: ["Progress", "Tracking", "Goals", "Success", "Improvement"],
    featured: false,
    imageUrl: "/images/quiz-progress.jpg"
  },

  // Additional Quiz Strategy Articles
  {
    id: "memory-techniques-quiz",
    title: "Memory Techniques for Bible Quiz Success",
    excerpt: "Master powerful memory techniques specifically designed for Bible quiz preparation. Learn mnemonic devices, visualization, and other proven memory strategies.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-11-12",
    readTime: "9 min read",
    category: "Quiz Strategy",
    tags: ["Memory", "Techniques", "Mnemonics", "Visualization", "Preparation"],
    featured: false,
    imageUrl: "/images/memory-techniques.jpg"
  },
  {
    id: "quiz-anxiety-management",
    title: "Overcoming Quiz Anxiety: Staying Calm Under Pressure",
    excerpt: "Learn effective techniques to manage quiz anxiety and perform your best under pressure. Discover breathing exercises, mental preparation, and confidence-building strategies.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-11-10",
    readTime: "7 min read",
    category: "Quiz Strategy",
    tags: ["Anxiety", "Pressure", "Calm", "Confidence", "Performance"],
    featured: false,
    imageUrl: "/images/quiz-anxiety.jpg"
  },
  {
    id: "question-pattern-recognition",
    title: "Recognizing Question Patterns: Anticipating What Comes Next",
    excerpt: "Develop the skill of recognizing common question patterns in Bible quizzes. Learn to anticipate question types and prepare more effectively for different formats.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-11-08",
    readTime: "6 min read",
    category: "Quiz Strategy",
    tags: ["Patterns", "Recognition", "Anticipation", "Questions", "Formats"],
    featured: false,
    imageUrl: "/images/question-patterns.jpg"
  },
  {
    id: "quiz-concentration-techniques",
    title: "Maintaining Focus During Quizzes: Concentration Techniques That Work",
    excerpt: "Master concentration techniques that will help you stay focused during long quiz sessions. Learn how to maintain mental clarity and avoid distractions.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-11-05",
    readTime: "8 min read",
    category: "Quiz Strategy",
    tags: ["Concentration", "Focus", "Clarity", "Distractions", "Mental"],
    featured: false,
    imageUrl: "/images/concentration.jpg"
  },
  {
    id: "quiz-recovery-strategies",
    title: "Bouncing Back from Poor Performance: Recovery Strategies",
    excerpt: "Learn how to recover from disappointing quiz results and use them as stepping stones to improvement. Discover resilience techniques for quiz success.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-11-03",
    readTime: "6 min read",
    category: "Quiz Strategy",
    tags: ["Recovery", "Resilience", "Improvement", "Performance", "Bouncing Back"],
    featured: false,
    imageUrl: "/images/quiz-recovery.jpg"
  },

  // Additional Competition Articles
  {
    id: "competition-preparation",
    title: "Preparing for Bible Quiz Competitions: A Complete Guide",
    excerpt: "Get ready for competitive Bible quiz events with this comprehensive preparation guide. Learn about training schedules, mental preparation, and competition strategies.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-11-01",
    readTime: "10 min read",
    category: "Competition",
    tags: ["Competition", "Preparation", "Training", "Mental", "Strategy"],
    featured: false,
    imageUrl: "/images/competition-prep.jpg"
  },
  {
    id: "team-quiz-strategies",
    title: "Team Quiz Strategies: Working Together for Victory",
    excerpt: "Master the art of team-based Bible quiz competitions. Learn communication techniques, role assignments, and collaborative strategies for team success.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-10-29",
    readTime: "8 min read",
    category: "Competition",
    tags: ["Team", "Collaboration", "Communication", "Roles", "Victory"],
    featured: false,
    imageUrl: "/images/team-strategies.jpg"
  },
  {
    id: "competition-psychology",
    title: "The Psychology of Competition: Mental Strategies for Success",
    excerpt: "Understand the psychological aspects of competitive Bible quiz events. Learn how to manage pressure, build confidence, and maintain focus during intense competitions.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-10-27",
    readTime: "9 min read",
    category: "Competition",
    tags: ["Psychology", "Mental", "Pressure", "Confidence", "Focus"],
    featured: false,
    imageUrl: "/images/competition-psychology.jpg"
  },
  {
    id: "competition-etiquette",
    title: "Bible Quiz Competition Etiquette: Sportsmanship and Respect",
    excerpt: "Learn proper etiquette for Bible quiz competitions. Understand the importance of sportsmanship, respect for opponents, and maintaining a positive competitive spirit.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-10-25",
    readTime: "6 min read",
    category: "Competition",
    tags: ["Etiquette", "Sportsmanship", "Respect", "Opponents", "Spirit"],
    featured: false,
    imageUrl: "/images/competition-etiquette.jpg"
  },
  {
    id: "post-competition-analysis",
    title: "Analyzing Your Competition Performance: Learning from Every Event",
    excerpt: "Learn how to analyze your competition performance to identify strengths and areas for improvement. Discover post-competition review techniques that lead to better results.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-10-23",
    readTime: "7 min read",
    category: "Competition",
    tags: ["Analysis", "Performance", "Review", "Improvement", "Results"],
    featured: false,
    imageUrl: "/images/post-competition.jpg"
  },

  // Additional Bible Characters Articles
  {
    id: "moses-leadership-lessons",
    title: "Moses: Leadership Lessons from the Great Deliverer",
    excerpt: "Explore the leadership qualities of Moses and discover timeless principles for effective leadership. Learn from his humility, courage, and dependence on God.",
    content: "Full article content here...",
    author: "Professor Lisa Martinez",
    publishDate: "2024-10-21",
    readTime: "9 min read",
    category: "Bible Characters",
    tags: ["Moses", "Leadership", "Humility", "Courage", "Dependence"],
    featured: false,
    imageUrl: "/images/moses-leadership.jpg"
  },
  {
    id: "esther-strategic-wisdom",
    title: "Esther's Strategic Wisdom: Lessons in Courage and Timing",
    excerpt: "Study Esther's strategic approach to saving her people. Learn about timing, courage, and the importance of being prepared for God's calling.",
    content: "Full article content here...",
    author: "Rev. James Wilson",
    publishDate: "2024-10-19",
    readTime: "8 min read",
    category: "Bible Characters",
    tags: ["Esther", "Strategy", "Wisdom", "Timing", "Courage"],
    featured: false,
    imageUrl: "/images/esther-wisdom.jpg"
  },
  {
    id: "abraham-faith-journey",
    title: "Abraham: The Father of Faith and His Journey of Trust",
    excerpt: "Follow Abraham's incredible journey of faith from Ur to the Promised Land. Discover how his trust in God can inspire our own faith walk today.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-10-17",
    readTime: "10 min read",
    category: "Bible Characters",
    tags: ["Abraham", "Faith", "Trust", "Journey", "Promise"],
    featured: false,
    imageUrl: "/images/abraham-faith.jpg"
  },
  {
    id: "joseph-forgiveness-story",
    title: "Joseph: From Prison to Palace - A Story of Forgiveness",
    excerpt: "Explore Joseph's remarkable story of forgiveness and how God used his trials for a greater purpose. Learn about resilience, forgiveness, and God's perfect timing.",
    content: "Full article content here...",
    author: "Professor Lisa Martinez",
    publishDate: "2024-10-15",
    readTime: "9 min read",
    category: "Bible Characters",
    tags: ["Joseph", "Forgiveness", "Prison", "Palace", "Resilience"],
    featured: false,
    imageUrl: "/images/joseph-forgiveness.jpg"
  },
  {
    id: "ruth-loyalty-devotion",
    title: "Ruth: A Story of Loyalty, Love, and Divine Providence",
    excerpt: "Discover Ruth's beautiful story of loyalty and devotion. Learn how her faithfulness led to unexpected blessings and her place in the lineage of Christ.",
    content: "Full article content here...",
    author: "Rev. James Wilson",
    publishDate: "2024-10-13",
    readTime: "7 min read",
    category: "Bible Characters",
    tags: ["Ruth", "Loyalty", "Love", "Devotion", "Providence"],
    featured: false,
    imageUrl: "/images/ruth-loyalty.jpg"
  },

  // Additional Bible Topics Articles
  {
    id: "forgiveness-healing-power",
    title: "The Healing Power of Forgiveness: Biblical Principles",
    excerpt: "Explore the transformative power of forgiveness as taught in Scripture. Learn how forgiveness brings healing to relationships and spiritual growth.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-10-11",
    readTime: "8 min read",
    category: "Bible Topics",
    tags: ["Forgiveness", "Healing", "Relationships", "Growth", "Transformation"],
    featured: false,
    imageUrl: "/images/forgiveness-healing.jpg"
  },
  {
    id: "hope-biblical-perspective",
    title: "Hope in Difficult Times: A Biblical Perspective",
    excerpt: "Discover how the Bible teaches us to maintain hope during life's challenges. Learn from biblical examples of hope and perseverance through trials.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-10-09",
    readTime: "9 min read",
    category: "Bible Topics",
    tags: ["Hope", "Difficult", "Challenges", "Perseverance", "Trials"],
    featured: false,
    imageUrl: "/images/hope-biblical.jpg"
  },
  {
    id: "love-gods-greatest-commandment",
    title: "Love: God's Greatest Commandment in Action",
    excerpt: "Explore the depth of God's love and how we are called to love others. Learn practical ways to demonstrate love in our daily lives and relationships.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-10-07",
    readTime: "7 min read",
    category: "Bible Topics",
    tags: ["Love", "Commandment", "Action", "Relationships", "Daily"],
    featured: false,
    imageUrl: "/images/love-commandment.jpg"
  },
  {
    id: "faith-works-james",
    title: "Faith and Works: Understanding James' Teaching",
    excerpt: "Dive deep into James' teaching on the relationship between faith and works. Learn how genuine faith produces good works and transforms our lives.",
    content: "Full article content here...",
    author: "Rev. James Wilson",
    publishDate: "2024-10-05",
    readTime: "8 min read",
    category: "Bible Topics",
    tags: ["Faith", "Works", "James", "Teaching", "Transformation"],
    featured: false,
    imageUrl: "/images/faith-works.jpg"
  },
  {
    id: "peace-gods-promise",
    title: "Peace That Passes Understanding: God's Promise to Believers",
    excerpt: "Discover the biblical concept of peace and how God provides peace that transcends our circumstances. Learn to experience God's peace in daily life.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-10-03",
    readTime: "6 min read",
    category: "Bible Topics",
    tags: ["Peace", "Promise", "Circumstances", "Daily", "Experience"],
    featured: false,
    imageUrl: "/images/peace-promise.jpg"
  },

  // Additional Study Methods Articles
  {
    id: "scripture-memorization-techniques",
    title: "Effective Scripture Memorization: Techniques That Work",
    excerpt: "Master the art of memorizing Scripture with proven techniques. Learn about repetition, visualization, and other methods that make memorization easier and more effective.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-10-01",
    readTime: "9 min read",
    category: "Study Methods",
    tags: ["Memorization", "Scripture", "Techniques", "Repetition", "Visualization"],
    featured: false,
    imageUrl: "/images/scripture-memorization.jpg"
  },
  {
    id: "inductive-bible-study",
    title: "Inductive Bible Study: A Step-by-Step Approach",
    excerpt: "Learn the inductive method of Bible study that helps you discover truth for yourself. Master observation, interpretation, and application techniques.",
    content: "Full article content here...",
    author: "Professor Lisa Martinez",
    publishDate: "2024-09-29",
    readTime: "10 min read",
    category: "Study Methods",
    tags: ["Inductive", "Study", "Observation", "Interpretation", "Application"],
    featured: false,
    imageUrl: "/images/inductive-study.jpg"
  },
  {
    id: "bible-study-journaling",
    title: "Bible Study Journaling: Recording Your Spiritual Journey",
    excerpt: "Discover the power of journaling in your Bible study. Learn how to record insights, prayers, and spiritual growth through effective journaling techniques.",
    content: "Full article content here...",
    author: "Dr. Sarah Johnson",
    publishDate: "2024-09-27",
    readTime: "8 min read",
    category: "Study Methods",
    tags: ["Journaling", "Recording", "Insights", "Prayers", "Growth"],
    featured: false,
    imageUrl: "/images/bible-journaling.jpg"
  },
  {
    id: "group-bible-study-leading",
    title: "Leading Effective Group Bible Studies: A Practical Guide",
    excerpt: "Learn how to lead engaging and meaningful group Bible studies. Discover facilitation techniques, discussion starters, and methods for encouraging participation.",
    content: "Full article content here...",
    author: "Pastor Michael Chen",
    publishDate: "2024-09-25",
    readTime: "9 min read",
    category: "Study Methods",
    tags: ["Group", "Leading", "Facilitation", "Discussion", "Participation"],
    featured: false,
    imageUrl: "/images/group-study.jpg"
  },
  {
    id: "bible-study-technology",
    title: "Using Technology in Bible Study: Digital Tools and Resources",
    excerpt: "Explore how technology can enhance your Bible study experience. Learn about useful apps, online resources, and digital tools that support spiritual growth.",
    content: "Full article content here...",
    author: "Dr. David Thompson",
    publishDate: "2024-09-23",
    readTime: "7 min read",
    category: "Study Methods",
    tags: ["Technology", "Digital", "Tools", "Resources", "Apps"],
    featured: false,
    imageUrl: "/images/bible-technology.jpg"
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
                  className={`font-urbanist font-light border-gray-300 mb-2 ${
                    selectedCategory === category ? "bg-black hover:bg-gray-800 text-white" : "hover:bg-gray-50"
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