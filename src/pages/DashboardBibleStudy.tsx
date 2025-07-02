import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Play,
  BookMarked,
  Award,
  Zap,
  ArrowLeft,
  Star,
  ChevronRight,
  Book,
  Flame,
  Trophy
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

interface StudyProgress {
  id: string;
  user_id: string;
  plan_id: string;
  started_at: string;
  completed_lessons: number;
  total_lessons: number;
  last_accessed: string;
  completed_at?: string;
}

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
    totalLessons: 30,
    topics: ["Creation", "Faith", "Love", "Forgiveness", "Prayer"],
    icon: BookOpen,
    color: "bg-blue-500",
    featured: true,
    lessons: [
      { id: 1, title: "God's Creation", scripture: "Genesis 1:1-31", duration: "15 min" },
      { id: 2, title: "The Fall of Man", scripture: "Genesis 3:1-24", duration: "15 min" },
      { id: 3, title: "Noah's Faith", scripture: "Genesis 6:9-22", duration: "15 min" },
      { id: 4, title: "Abraham's Call", scripture: "Genesis 12:1-9", duration: "15 min" },
      { id: 5, title: "Moses and the Exodus", scripture: "Exodus 14:1-31", duration: "15 min" }
    ]
  },
  {
    id: "90-day-discipleship",
    title: "90-Day Discipleship Journey",
    description: "Deep dive into following Christ and spiritual growth",
    duration: "90 days",
    difficulty: "Intermediate",
    totalLessons: 90,
    topics: ["Discipleship", "Spiritual Gifts", "Fruit of the Spirit", "Kingdom Living"],
    icon: Target,
    color: "bg-green-500",
    featured: true,
    lessons: [
      { id: 1, title: "What is Discipleship?", scripture: "Matthew 28:18-20", duration: "20 min" },
      { id: 2, title: "Following Jesus", scripture: "Luke 9:23-27", duration: "20 min" },
      { id: 3, title: "Spiritual Gifts", scripture: "1 Corinthians 12:1-11", duration: "20 min" },
      { id: 4, title: "Fruit of the Spirit", scripture: "Galatians 5:22-23", duration: "20 min" },
      { id: 5, title: "Kingdom Living", scripture: "Matthew 6:25-34", duration: "20 min" }
    ]
  },
  {
    id: "30-day-wisdom",
    title: "30-Day Wisdom from Proverbs",
    description: "Daily wisdom for practical living",
    duration: "30 days",
    difficulty: "Beginner",
    totalLessons: 30,
    topics: ["Wisdom", "Character", "Relationships", "Work", "Speech"],
    icon: Lightbulb,
    color: "bg-yellow-500",
    featured: false,
    lessons: [
      { id: 1, title: "The Beginning of Wisdom", scripture: "Proverbs 1:1-7", duration: "15 min" },
      { id: 2, title: "Trust in the Lord", scripture: "Proverbs 3:5-6", duration: "15 min" },
      { id: 3, title: "Guarding Your Heart", scripture: "Proverbs 4:23", duration: "15 min" },
      { id: 4, title: "The Power of Words", scripture: "Proverbs 18:21", duration: "15 min" },
      { id: 5, title: "Diligence in Work", scripture: "Proverbs 22:29", duration: "15 min" }
    ]
  },
  {
    id: "90-day-character",
    title: "90-Day Character Building",
    description: "Developing Christ-like character through Scripture",
    duration: "90 days",
    difficulty: "Intermediate",
    totalLessons: 90,
    topics: ["Integrity", "Humility", "Courage", "Compassion", "Perseverance"],
    icon: Award,
    color: "bg-purple-500",
    featured: false,
    lessons: [
      { id: 1, title: "Integrity", scripture: "Psalm 15:1-5", duration: "20 min" },
      { id: 2, title: "Humility", scripture: "Philippians 2:3-4", duration: "20 min" },
      { id: 3, title: "Courage", scripture: "Joshua 1:9", duration: "20 min" },
      { id: 4, title: "Compassion", scripture: "Colossians 3:12", duration: "20 min" },
      { id: 5, title: "Perseverance", scripture: "James 1:2-4", duration: "20 min" }
    ]
  }
];

const DashboardBibleStudy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [studyProgress, setStudyProgress] = useState<Record<string, StudyProgress>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [streakData, setStreakData] = useState<any>(null);
  const [isRecordingRead, setIsRecordingRead] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth/login");
        return;
      }

      setUser(user);

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
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load your Bible study data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartPlan = async (planId: string) => {
    if (!user) return;

    try {
      const existingProgress = studyProgress[planId];
      const plan = studyPlans.find(p => p.id === planId);
      
      if (!plan) return;

      const progressData = {
        user_id: user.id,
        plan_id: planId,
        started_at: new Date().toISOString(),
        completed_lessons: existingProgress?.completed_lessons || 0,
        total_lessons: plan.totalLessons,
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

      toast({
        title: "Study Plan Started",
        description: `You've started the ${plan.title}. Your progress will be saved automatically.`,
      });

    } catch (error) {
      console.error('Error starting plan:', error);
      toast({
        title: "Error",
        description: "Failed to start study plan. Please try again.",
        variant: "destructive",
      });
    }
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

  const isPlanStarted = (planId: string) => {
    return !!studyProgress[planId];
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

      toast({
        title: "Devotional Recorded!",
        description: data.message,
      });
    } catch (error) {
      console.error('Error recording devotional read:', error);
      toast({
        title: "Error",
        description: "Failed to record devotional read. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRecordingRead(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading your Bible study...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bible Study</h1>
            <p className="text-gray-600 mt-1">Deepen your faith through daily devotionals and structured study plans</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devotionals">Daily Devotional</TabsTrigger>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Devotional Preview */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Today's Devotional
                </CardTitle>
                <CardDescription>{dailyDevotional.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-blue-900 mb-1">{dailyDevotional.verse}</p>
                    <p className="text-gray-700 italic text-sm">
                      "{dailyDevotional.scripture.substring(0, 100)}..."
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{dailyDevotional.title}</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("devotionals")}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Read Full Devotional
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Progress Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Study Progress
                </CardTitle>
                <CardDescription>Your current study plan progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlans.filter(plan => isPlanStarted(plan.id)).slice(0, 2).map((plan) => (
                    <div key={plan.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{plan.title}</span>
                        <span className="text-xs text-gray-500">
                          {getCompletedLessons(plan.id)}/{plan.totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={getPlanProgress(plan.id)} className="h-2" />
                    </div>
                  ))}
                  {studyPlans.filter(plan => isPlanStarted(plan.id)).length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No study plans started yet</p>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("plans")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Study Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Daily Devotional Tab */}
        <TabsContent value="devotionals" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{dailyDevotional.title}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    {dailyDevotional.verse}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {dailyDevotional.date}
                </Badge>
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
                </div>
                <div className="mt-2 text-sm text-orange-600">
                  Total days read: {(streakData?.total_days_read || 0)}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "{dailyDevotional.scripture}"
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  Reflection
                </h4>
                <p className="text-gray-700 leading-relaxed">{dailyDevotional.reflection}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600" />
                  Application
                </h4>
                <p className="text-gray-700 leading-relaxed">{dailyDevotional.application}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Prayer
                </h4>
                <p className="text-gray-700 italic">{dailyDevotional.prayer}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyPlans.map((plan) => (
              <Card key={plan.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
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
                      onClick={() => handleStartPlan(plan.id)}
                      variant={isPlanStarted(plan.id) ? "outline" : "default"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isPlanStarted(plan.id) ? "Continue Plan" : "Start Plan"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DashboardBibleStudy; 