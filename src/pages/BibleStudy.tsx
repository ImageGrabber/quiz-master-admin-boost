import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  Zap,
  User,
  LogOut,
  Flame,
  Trophy
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

export default function BibleStudy() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [studyProgress, setStudyProgress] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState<any>(null);
  const [isRecordingRead, setIsRecordingRead] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);
        
        // Get study progress
        const { data: progress } = await supabase
          .from('study_progress')
          .select('*')
          .eq('user_id', user.id);
        
        if (progress) {
          const progressMap = progress.reduce((acc, item) => {
            acc[item.plan_id] = item;
            return acc;
          }, {});
          setStudyProgress(progressMap);
        }

        // Get devotional streak data
        const { data: streak } = await supabase
          .from('devotional_streaks')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        setStreakData(streak);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setStudyProgress({});
    setStreakData(null);
    navigate('/');
  };

  const handleStartPlan = async (planId: string) => {
    if (!user) {
      navigate('/auth/register');
      return;
    }

    setSelectedPlan(planId);
    
    // Save or update study progress
    const existingProgress = studyProgress[planId];
    const progressData = {
      user_id: user.id,
      plan_id: planId,
      started_at: new Date().toISOString(),
      completed_lessons: existingProgress?.completed_lessons || 0,
      total_lessons: studyPlans.find(p => p.id === planId)?.totalLessons || 0,
      last_accessed: new Date().toISOString()
    };

    if (existingProgress) {
      await supabase
        .from('study_progress')
        .update(progressData)
        .eq('id', existingProgress.id);
    } else {
      await supabase
        .from('study_progress')
        .insert(progressData);
    }

    // Update local state
    setStudyProgress(prev => ({
      ...prev,
      [planId]: progressData
    }));

    console.log(`Starting study plan: ${planId}`);
  };

  const getPlanProgress = (planId: string) => {
    const progress = studyProgress[planId];
    if (!progress) return 0;
    return Math.round((progress.completed_lessons / progress.total_lessons) * 100);
  };

  const getCompletedLessons = (planId: string) => {
    const progress = studyProgress[planId];
    return progress?.completed_lessons || 0;
  };

  const recordDevotionalRead = async () => {
    if (!user || isRecordingRead) return;

    setIsRecordingRead(true);
    try {
      const { data, error } = await supabase.rpc('record_devotional_read', {
        p_user_id: user.id,
        p_devotional_date: dailyDevotional.date,
        p_devotional_title: dailyDevotional.title,
        p_devotional_verse: dailyDevotional.verse,
        p_time_spent_seconds: 300 // Default 5 minutes
      });

      if (error) throw error;

      // Update streak data
      setStreakData({
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        total_days_read: data.total_days_read,
        last_read_date: new Date().toISOString().split('T')[0]
      });

      // Show success message
      alert(data.message);
    } catch (error) {
      console.error('Error recording devotional read:', error);
      alert('Failed to record devotional read. Please try again.');
    } finally {
      setIsRecordingRead(false);
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
            <a href="/bible-questions-and-answers-hub" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Bible Q&amp;A</a>
            <a href="/bible-study" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Bible Study</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{userProfile?.full_name || user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
                <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section with Tabs */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Deepen Your <span className="text-blue-600">Bible Study</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore daily devotionals, follow structured study plans, and grow in your faith through 
            guided Bible study experiences designed for every level of spiritual maturity.
          </p>
          {/* Tabs now inside hero section */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="devotionals">Daily Devotional</TabsTrigger>
              <TabsTrigger value="plans">Study Plans</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <section className="text-center py-8">
                <h2 className="text-3xl font-bold mb-4">Welcome to Bible Study</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Explore daily devotionals, follow structured study plans, and grow in your faith. Create an account to save your progress and unlock all features.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                  <div className="bg-blue-50 rounded-lg p-6 text-left">
                    <h3 className="font-semibold text-blue-700 mb-2">Why Join?</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Track your devotional and study plan progress</li>
                      <li>Earn streaks and celebrate your growth</li>
                      <li>Personalized recommendations and reminders</li>
                      <li>Access from any device, anytime</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6 text-left">
                    <h3 className="font-semibold text-purple-700 mb-2">How It Works</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-1">
                      <li>Choose a study plan that fits your journey</li>
                      <li>Read daily devotionals and reflect</li>
                      <li>Mark as read to build your streak</li>
                      <li>Review your progress and revisit past days</li>
                    </ol>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate('/auth/register')}>
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="bg-black text-white border-black hover:bg-gray-900 hover:text-white" onClick={() => navigate('/auth/login')}>
                    Sign In
                  </Button>
                </div>
              </section>
            </TabsContent>

            {/* Daily Devotional Tab */}
            <TabsContent value="devotionals" className="space-y-6">
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
                    {/* Streak Display for all users */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            <span className="font-semibold text-orange-700">Current Streak: {(streakData?.current_streak || 0)} days</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-yellow-700">Longest: {(streakData?.longest_streak || 0)} days</span>
                          </div>
                        </div>
                        {user && (
                          <Button 
                            onClick={recordDevotionalRead}
                            disabled={isRecordingRead}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {isRecordingRead ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Recording...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Read
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-orange-600">
                        Total days read: {(streakData?.total_days_read || 0)}
                      </div>
                    </div>

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

                    {/* Call to action for non-logged-in users */}
                    {!user && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                        <p className="text-blue-800 mb-3">Create an account to track your devotional streak and save your progress!</p>
                        <Button onClick={() => navigate("/auth/register")} className="bg-blue-600 hover:bg-blue-700">
                          Sign Up to Track Streak
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            {/* Study Plans Tab */}
            <TabsContent value="plans" className="space-y-6">
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
                              <span>{getCompletedLessons(plan.id)}/{plan.totalLessons} lessons</span>
                            </div>
                            <Progress value={getPlanProgress(plan.id)} className="h-2" />
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
                            onClick={() => {
                              if (!user) {
                                navigate('/auth/register');
                                return;
                              }
                              handleStartPlan(plan.id);
                            }}
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
                          
                          <Button size="lg" className="w-full" onClick={() => {
                            if (!user) {
                              navigate('/auth/register');
                              return;
                            }
                            handleStartPlan(plan.id);
                          }}>
                            <Zap className="w-4 h-4 mr-2" />
                            Start Featured Plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
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
            <Button size="lg" variant="outline" className="bg-black text-white border-black hover:bg-gray-900 hover:text-white" onClick={() => navigate("/auth/login")}>Sign In</Button>
          </div>
        </div>
      </section>
    </div>
  );
} 