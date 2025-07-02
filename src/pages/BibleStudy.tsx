import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  Star, 
  Heart, 
  Lightbulb, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Play,
  BookMarked,
  Award,
  Zap
} from "lucide-react";

const dailyDevotional = {
  date: new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  verse: "Philippians 4:6-7",
  scripture: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
  title: "Finding Peace in Prayer",
  reflection: "In today's fast-paced world, anxiety can easily overwhelm us. Paul reminds us that prayer is our direct line to God's peace. When we bring our concerns to Him with thanksgiving, He promises to guard our hearts and minds with His peace that goes beyond human understanding.",
  application: "Take time today to pray about your specific concerns. Instead of just asking for solutions, thank God for His presence and trust that He will provide peace regardless of the outcome.",
  prayer: "Lord, help me to bring all my worries to You in prayer. Teach me to trust in Your peace that surpasses all understanding. Amen."
};

const studyPlans = [
  {
    id: "30-day-foundations",
    title: "30-Day Bible Foundations",
    description: "Essential teachings and stories for new believers",
    duration: "30 days",
    difficulty: "Beginner",
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    topics: ["Creation", "Faith", "Love", "Forgiveness", "Prayer"],
    icon: BookOpen,
    color: "bg-blue-500",
    featured: true
  },
  {
    id: "90-day-discipleship",
    title: "90-Day Discipleship Journey",
    description: "Deep dive into following Christ and spiritual growth",
    duration: "90 days",
    difficulty: "Intermediate",
    progress: 0,
    totalLessons: 90,
    completedLessons: 0,
    topics: ["Discipleship", "Spiritual Gifts", "Fruit of the Spirit", "Kingdom Living"],
    icon: Target,
    color: "bg-green-500",
    featured: true
  },
  {
    id: "30-day-wisdom",
    title: "30-Day Wisdom from Proverbs",
    description: "Daily wisdom for practical living",
    duration: "30 days",
    difficulty: "Beginner",
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    topics: ["Wisdom", "Character", "Relationships", "Work", "Speech"],
    icon: Lightbulb,
    color: "bg-yellow-500",
    featured: false
  },
  {
    id: "90-day-character",
    title: "90-Day Character Building",
    description: "Developing Christ-like character through Scripture",
    duration: "90 days",
    difficulty: "Intermediate",
    progress: 0,
    totalLessons: 90,
    completedLessons: 0,
    topics: ["Integrity", "Humility", "Courage", "Compassion", "Perseverance"],
    icon: Award,
    color: "bg-purple-500",
    featured: false
  }
];

const quickStats = [
  { label: "Study Plans", value: "4", icon: BookMarked, color: "text-blue-600" },
  { label: "Daily Devotionals", value: "365", icon: Calendar, color: "text-green-600" },
  { label: "Active Learners", value: "2,847", icon: Users, color: "text-purple-600" },
  { label: "Completion Rate", value: "78%", icon: TrendingUp, color: "text-orange-600" }
];

export default function BibleStudy() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleStartPlan = (planId: string) => {
    setSelectedPlan(planId);
    // In a full implementation, this would start the study plan
    console.log(`Starting study plan: ${planId}`);
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
            <a href="/bible-questions-and-answers-hub" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Bible Q&amp;A</a>
            <a href="/bible-study" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Bible Study</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Deepen Your <span className="text-blue-600">Bible Study</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore daily devotionals, follow structured study plans, and grow in your faith through 
            guided Bible study experiences designed for every level of spiritual maturity.
          </p>
          
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
        {/* Daily Devotional */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Daily Devotional</h2>
            <Badge variant="secondary" className="text-sm">
              <Calendar className="w-3 h-3 mr-1" />
              {dailyDevotional.date}
            </Badge>
          </div>
          
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{dailyDevotional.title}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    {dailyDevotional.verse}
                  </CardDescription>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "{dailyDevotional.scripture}"
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Reflection</h4>
                <p className="text-gray-700 leading-relaxed">{dailyDevotional.reflection}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Application</h4>
                <p className="text-gray-700 leading-relaxed">{dailyDevotional.application}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">Prayer</h4>
                <p className="text-gray-700 italic">{dailyDevotional.prayer}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Study Plans */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Study Plans</h2>
            <Button variant="outline" onClick={() => navigate("/auth/register")}>
              Create Account to Save Progress
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyPlans.map((plan) => (
              <Card key={plan.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{plan.difficulty}</Badge>
                      <div className="text-sm text-gray-500">{plan.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{plan.completedLessons}/{plan.totalLessons} lessons</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {plan.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {plan.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{plan.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleStartPlan(plan.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Study Plans */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Plans</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studyPlans.filter(plan => plan.featured).map((plan) => (
              <Card key={plan.id} className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-16 h-16 rounded-xl ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{plan.title}</CardTitle>
                      <CardDescription className="text-lg">{plan.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {plan.duration}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {plan.difficulty}
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {plan.totalLessons} lessons
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {plan.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button size="lg" className="w-full" onClick={() => handleStartPlan(plan.id)}>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Featured Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Deepen Your Faith?</h2>
            <p className="text-xl mb-6 opacity-90">
              Create an account to save your study progress, track your spiritual growth, and join a community of learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => navigate("/auth/register")}>
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" onClick={() => navigate("/auth/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 