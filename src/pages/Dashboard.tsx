import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Trophy, Clock, Target, LogOut, User, Filter, BookOpen, Calendar, Heart, CheckCircle, Play, Star, Lightbulb, TrendingUp, Flame, Award, Crown, Bolt, Sun, Moon, Book, Share } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Competition } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import DashboardLayout from "@/components/DashboardLayout";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  plan?: string;
}

interface AttemptStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
}

interface Quiz {
  id: number;
  title: string;
}

interface CompetitionWithDetails extends Competition {
  quiz: {
    id: number;
    title: string;
    description: string | null;
  };
  entries_count: number;
  user_has_entered: boolean;
  user_payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
}

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<AttemptStats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0
  });
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [competitions, setCompetitions] = useState<CompetitionWithDetails[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hideMembership, setHideMembership] = useState<boolean>(true);
  const [streakData, setStreakData] = useState<any>(null);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [isRecordingRead, setIsRecordingRead] = useState(false);
  const [joinCode, setJoinCode] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchQuizzes();
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (profile) {
      fetchUserStats();
      fetchUserBadges();
    }
  }, [profile, selectedQuizId]);
  const fetchUserBadges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Step 1: fetch user_badges for this user
      const { data: userBadgeRows, error: ubError } = await supabase
        .from('user_badges')
        .select('id, badge_id, awarded_at, metadata')
        .eq('user_id', user.id)
        .order('awarded_at', { ascending: false });
      if (ubError) return;

      if (!userBadgeRows || userBadgeRows.length === 0) {
        // Backfill historical badges if none exist
        const { ensureSeedBadges, evaluateBadgesForUserHistory } = await import("@/lib/badgeService");
        await ensureSeedBadges();
        await evaluateBadgesForUserHistory(user.id);
        const { data: refetchedUB } = await supabase
          .from('user_badges')
          .select('id, badge_id, awarded_at, metadata')
          .eq('user_id', user.id)
          .order('awarded_at', { ascending: false });
        if (!refetchedUB || refetchedUB.length === 0) {
          setUserBadges([]);
          return;
        }
        // Fetch badges for refetched rows
        const badgeIds = Array.from(new Set(refetchedUB.map((r: any) => r.badge_id)));
        const { data: badgeDefs } = await supabase
          .from('badges')
          .select('id, slug, name, description, icon')
          .in('id', badgeIds);
        const byId = new Map((badgeDefs || []).map((b: any) => [b.id, b]));
        let merged = refetchedUB.map((r: any) => ({ id: r.id, awarded_at: r.awarded_at, badges: byId.get(r.badge_id), metadata: r.metadata }));
        merged = await enrichMissingQuizTitles(user.id, merged);
        setUserBadges(merged);
        return;
      }

      // Step 2: fetch badge definitions and merge
      const badgeIds = Array.from(new Set(userBadgeRows.map((r: any) => r.badge_id)));
      const { data: badgeDefs } = await supabase
        .from('badges')
        .select('id, slug, name, description, icon')
        .in('id', badgeIds);
      const byId = new Map((badgeDefs || []).map((b: any) => [b.id, b]));
      let merged = userBadgeRows.map((r: any) => ({ id: r.id, awarded_at: r.awarded_at, badges: byId.get(r.badge_id), metadata: r.metadata }));
      merged = await enrichMissingQuizTitles(user.id, merged);
      setUserBadges(merged);
    } catch (e) {
      console.error('Error fetching badges', e);
    }
  };

  const enrichMissingQuizTitles = async (userId: string, rows: any[]) => {
    const needsQuiz = rows.filter((r) => (r.badges?.slug === 'fast-finisher' || r.badges?.slug === 'score-100') && (!r.metadata || !r.metadata.quizTitle));
    if (needsQuiz.length === 0) return rows;
    // Fetch attempts once
    const { data: attempts } = await supabase
      .from('attempts')
      .select('quiz_id, score, seconds_used')
      .eq('user_id', userId);
    const quizzesNeeded: number[] = [];
    let fastestQuizId: number | undefined;
    let perfectQuizId: number | undefined;
    if (attempts && attempts.length > 0) {
      const fastest = attempts.reduce((best: any, a: any) => (a.seconds_used || 999999) < (best?.seconds_used || 999999) ? a : best, null);
      fastestQuizId = fastest?.quiz_id;
      const best = attempts.reduce((prev: any, a: any) => (a.score || 0) > (prev?.score || 0) ? a : prev, null);
      perfectQuizId = best?.quiz_id;
      if (fastestQuizId) quizzesNeeded.push(fastestQuizId);
      if (perfectQuizId) quizzesNeeded.push(perfectQuizId);
    }
    if (quizzesNeeded.length === 0) return rows;
    const uniqueIds = Array.from(new Set(quizzesNeeded));
    const { data: quizDefs } = await supabase
      .from('quizzes')
      .select('id, title')
      .in('id', uniqueIds);
    const titleById = new Map((quizDefs || []).map((q: any) => [q.id, q.title]));

    // Update rows locally and persist metadata
    for (const r of rows) {
      if (r.badges?.slug === 'fast-finisher' && (!r.metadata || !r.metadata.quizTitle) && fastestQuizId) {
        const quizTitle = titleById.get(fastestQuizId);
        if (quizTitle) {
          const newMeta = { ...(r.metadata || {}), quizTitle };
          await supabase.from('user_badges').update({ metadata: newMeta }).eq('id', r.id);
          r.metadata = newMeta;
        }
      }
      if (r.badges?.slug === 'score-100' && (!r.metadata || !r.metadata.quizTitle) && perfectQuizId) {
        const quizTitle = titleById.get(perfectQuizId);
        if (quizTitle) {
          const newMeta = { ...(r.metadata || {}), quizTitle };
          await supabase.from('user_badges').update({ metadata: newMeta }).eq('id', r.id);
          r.metadata = newMeta;
        }
      }
    }
    return rows;
  };

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'Crown': return <Crown className="w-6 h-6 text-yellow-600" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-600" />;
      case 'Star': return <Star className="w-6 h-6 text-yellow-500" />;
      case 'Bolt': return <Bolt className="w-6 h-6 text-blue-600" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-500" />;
      case 'Book': return <Book className="w-6 h-6 text-emerald-600" />;
      case 'Share': return <Share className="w-6 h-6 text-purple-600" />;
      case 'Calendar': return <Calendar className="w-6 h-6 text-blue-600" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-yellow-600" />;
      default: return <Award className="w-6 h-6 text-purple-600" />;
    }
  };

  const getBadgeRingClass = (icon: string) => {
    switch (icon) {
      case 'Crown': return 'from-yellow-300 via-amber-500 to-yellow-600';
      case 'Flame': return 'from-orange-300 via-red-500 to-orange-600';
      case 'Star': return 'from-amber-300 via-yellow-500 to-pink-400';
      case 'Bolt': return 'from-blue-300 via-cyan-400 to-indigo-500';
      default: return 'from-purple-300 via-fuchsia-500 to-indigo-600';
    }
  };


  useEffect(() => {
    const fetchStreak = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: streak } = await supabase
        .from('devotional_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setStreakData(streak);
    };
    fetchStreak();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth/login");
        return;
      }

      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Ensure 'plan' property is always present and type-safe
      setProfile(profileData ? {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: profileData.role,
        plan: typeof (profileData as any).plan === 'string' ? (profileData as any).plan : undefined
      } : null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      let query = supabase
        .from('attempts')
        .select(`
          *,
          quizzes!inner(title)
        `)
        .eq('user_id', profile!.id);

      // Filter by specific quiz if selected
      if (selectedQuizId !== "all") {
        query = query.eq('quiz_id', parseInt(selectedQuizId));
      }

      const { data: attempts } = await query.order('created_at', { ascending: false });

      if (attempts) {
        const totalAttempts = attempts.length;
        const averageScore = totalAttempts > 0 
          ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts)
          : 0;
        const bestScore = totalAttempts > 0 
          ? Math.max(...attempts.map(attempt => attempt.score))
          : 0;
        const totalTimeSpent = attempts.reduce((sum, attempt) => sum + attempt.seconds_used, 0);

        setStats({
          totalAttempts,
          averageScore,
          bestScore,
          totalTimeSpent
        });

        setRecentAttempts(attempts.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCompetitions([]);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          entries_count:competition_entries(count),
          competition_entries(user_id, paid)
        `)
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) {
        console.warn('Competitions query error (non-critical):', error);
        // Don't throw error, just return empty array
        setCompetitions([]);
        return;
      }

      // Map competitions to include user_has_entered and user_payment_status
      const competitionsWithDetails = (data || []).map((competition: any) => {
        const userEntry = (competition.competition_entries || []).find((entry: any) => entry.user_id === user.id);
        return {
          ...competition,
          entries_count: competition.entries_count?.[0]?.count || 0,
          user_has_entered: !!userEntry,
          user_payment_status: userEntry ? (userEntry.paid ? 'completed' : 'pending') : undefined,
        };
      });

      setCompetitions(competitionsWithDetails);
    } catch (error: any) {
      console.warn('Competitions fetch error (non-critical):', error);
      // Silently handle the error without showing toast
      setCompetitions([]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const recordDevotionalRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || isRecordingRead) return;
    setIsRecordingRead(true);
    try {
      const today = new Date();
      const devotionalDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const { data, error } = await supabase.rpc('record_devotional_read', {
        p_user_id: user.id,
        p_devotional_date: devotionalDate,
        p_devotional_title: 'Daily Devotional',
        p_devotional_verse: '',
        p_time_spent_seconds: 300
      });
      if (error) throw error;
      setStreakData({
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        total_days_read: data.total_days_read,
        last_read_date: new Date().toISOString().split('T')[0]
      });
      toast({ title: "Devotional Recorded!", description: data.message });
    } catch (error) {
      toast({ title: "Error", description: "Failed to record devotional read.", variant: "destructive" });
    } finally {
      setIsRecordingRead(false);
    }
  };

  // Add a function to handle upgrade navigation
  const handleUpgrade = () => {
    navigate("/dashboard/upgrade");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/60 backdrop-blur rounded-2xl p-3 border border-white/50 shadow-sm">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Quiz:</span>
          <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
            <SelectTrigger className="w-64 rounded-xl">
              <SelectValue placeholder="Select a quiz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quizzes</SelectItem>
              {quizzes.map((quiz) => (
                <SelectItem key={quiz.id} value={quiz.id.toString()}>
                  {quiz.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Upgrade to Pro button hidden */}
        {/* {profile?.plan === "free" && (
          <button
            onClick={handleUpgrade}
            className="ml-2 px-4 py-2 rounded bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition whitespace-nowrap"
          >
            Upgrade to Pro
          </button>
        )} */}
      </div>

      {/* Stats Grid */}
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 min-w-0">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white min-w-0 rounded-2xl hover:shadow-2xl transition">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{stats.totalAttempts}</div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white min-w-0 rounded-2xl hover:shadow-2xl transition">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{stats.bestScore}</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-white min-w-0 rounded-2xl hover:shadow-2xl transition">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                  <Target className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{stats.averageScore}</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white min-w-0 rounded-2xl hover:shadow-2xl transition">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-gray-900">{formatTime(stats.totalTimeSpent)}</div>
                  <div className="text-sm text-gray-600">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Quiz - Full width primary card, with quick actions moved aside */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Weekly Bible Quiz Section */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Weekly Bible Quiz
            </CardTitle>
            <CardDescription>Test your knowledge with this week's special Bible challenge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="h-12" onClick={() => navigate('/weekly-quiz')}>
                <Play className="w-4 h-4 mr-2" /> Start Weekly Quiz
              </Button>
              <Button variant="outline" className="h-12" onClick={() => navigate('/leaderboard')}>
                <Trophy className="w-4 h-4 mr-2" /> View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5 text-purple-600" />
              Live Quiz
            </CardTitle>
            <CardDescription>Join an ongoing live quiz or learn how it works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Join by Code */}
              <div className="p-4 rounded-xl border bg-white/80">
                <div className="text-sm text-gray-700 mb-2">Enter session code</div>
                <div className="flex gap-2">
                  <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="8‑char code"
                    className="flex-1 px-3 py-3 border rounded-xl font-mono tracking-widest uppercase"
                    maxLength={8}
                  />
                  <Button onClick={() => joinCode.trim().length >= 6 && navigate(`/live-quiz/join/${joinCode.trim()}`)}>
                    Join
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">Ask the host for the 8‑character code</div>
              </div>
              {/* Learn / Host */}
              <div className="p-4 rounded-xl border bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="text-sm text-gray-700 mb-2">Want to host?</div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" onClick={() => navigate('/live-quiz')}>
                    Live Quiz Hub
                  </Button>
                  <Button className="flex-1" onClick={() => navigate('/dashboard/quizzes')}>
                    Create Quiz
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenge System */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              Challenge Players
            </CardTitle>
            <CardDescription>Challenge other online players to quiz battles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-gradient-to-r from-orange-50 to-red-50">
                <div className="text-sm text-gray-700 mb-2">Ready for a challenge?</div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => navigate('/challenge')}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Challenge Center
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">Find online players and start quiz battles</div>
              </div>
              <div className="p-4 rounded-xl border bg-white/80">
                <div className="text-sm text-gray-700 mb-2">Quick Stats</div>
                <div className="text-xs text-gray-500">
                  • Real-time player matching<br/>
                  • Head-to-head quiz battles<br/>
                  • Live scoring and rankings
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attempts + Badges side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Attempts */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur h-full rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Attempts</CardTitle>
              <CardDescription>Your latest quiz activity</CardDescription>
            </CardHeader>
            <CardContent>
              {recentAttempts.length === 0 ? (
                <div className="text-gray-600">No attempts yet. Take your first quiz!</div>
              ) : (
                <div className="space-y-3">
                  {recentAttempts.slice(0, 5).map((a: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border bg-white/80 hover:bg-white transition">
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{a.quizzes?.title || 'Quiz'}</div>
                        <div className="text-xs text-gray-600">{new Date(a.created_at).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-blue-700">{a.score}%</div>
                        <div className="text-xs text-gray-500">{Math.round((a.seconds_used || 0) / 60)}m</div>
                      </div>
                    </div>
                  ))}
                  {/* <div className="text-right">
                    <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/recent-attempts')}>View All</Button>
                  </div> */}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur h-full rounded-2xl">
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Your achievements</CardDescription>
            </CardHeader>
            <CardContent>
              {userBadges.length === 0 ? (
                <div className="text-gray-600">No badges yet. Complete quizzes to earn badges!</div>
              ) : (
                <TooltipProvider>
                  <div className="grid grid-cols-2 gap-4">
                    {userBadges.map((ub, i) => (
                      <Tooltip key={i}>
                        <TooltipTrigger asChild>
                          <div className="p-4 rounded-2xl border border-gray-100 bg-white/60 backdrop-blur-sm hover:shadow-lg transition cursor-default">
                            <div className="flex items-center gap-3 mb-1">
                              <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ring-2 ring-transparent`} style={{ boxShadow: `0 0 0 4px rgba(255,255,255,0.8)` }}>
                                <div className={`w-12 h-12 rounded-full p-2 bg-gradient-to-br ${getBadgeRingClass(ub.badges?.icon || '')}` }>
                                  <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                                    {renderBadgeIcon(ub.badges?.icon || '')}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="truncate font-semibold text-gray-900">{ub.badges?.name}</div>
                                <div className="text-xs text-gray-600">{new Date(ub.awarded_at).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-800 mt-1">
                              {ub.badges?.description}
                              {ub.metadata?.quizTitle && (
                                <span className="block text-xs text-gray-700 mt-1">Quiz: {ub.metadata.quizTitle}</span>
                              )}
                              {ub.badges?.slug === 'first-quiz' && ub.metadata?.firstQuizTitle && (
                                <span className="block text-xs text-gray-700 mt-1">First quiz: {ub.metadata.firstQuizTitle}</span>
                              )}
                              {ub.badges?.slug === 'five-quizzes' && Array.isArray(ub.metadata?.quizzes) && (
                                <div className="mt-2">
                                  <div className="text-xs font-semibold text-gray-900 mb-1">Your first 5 quizzes:</div>
                                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                                    {ub.metadata.quizzes.map((t: string, i: number) => (
                                      <li key={i}>{t}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            {(ub.metadata?.score || ub.metadata?.timeUsedSeconds) && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {ub.metadata?.score !== undefined && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Score: {ub.metadata.score}</span>
                                )}
                                {ub.metadata?.timeUsedSeconds !== undefined && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">Time: {Math.floor(ub.metadata.timeUsedSeconds / 60)}m {ub.metadata.timeUsedSeconds % 60}s</span>
                                )}
                                {ub.metadata?.totalAttempts !== undefined && (
                                  <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">Attempts: {ub.metadata.totalAttempts}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="text-xs text-gray-900">
                            {ub.badges?.description || 'Badge earned'}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions & Featured Competitions */}
      {/* This section is now replaced by the above grid */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"> ... </div> */}

      {/* Membership Tiers Section hidden */}
      {/* {!hideMembership && (
        <Card className="mb-8 mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Membership Tiers</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Choose the plan that fits your quiz journey.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>1 quiz per day</li>
                  <li>Basic profile and stats</li>
                  <li>Access to standard quizzes</li>
                  <li>Participate in weekly leaderboard</li>
                  <li>Community support</li>
                </ul>
              </div>
              <div className="relative p-4 border rounded-lg bg-gradient-to-br from-purple-200 to-purple-100 text-gray-900">
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow">Pro</span>
                <h3 className="text-xl font-bold mb-2 flex items-center">Pro Plan <span className="ml-3 text-base font-semibold text-purple-700">$6/month</span></h3>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>Unlimited quizzes</li>
                  <li>Bonus content (verse memory, themed quizzes)</li>
                  <li>Detailed reports on strengths/weaknesses</li>
                  <li>Access to past attempts and analytics</li>
                </ul>
                <Button className="mt-4" variant="default">Upgrade Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}
    </DashboardLayout>
  );
};

export default Dashboard;
