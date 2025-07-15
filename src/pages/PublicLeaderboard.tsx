import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Star, Users, TrendingUp, Award, Calendar, Clock, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  id: string;
  name: string;
  maxScore: number;
  totalScore: number;
  attempts: number;
  averageScore: number;
  lastAttempt: string;
}

interface CompetitionEntry {
  id: string;
  name: string;
  score: number;
  time_taken: number;
  rank: number;
  prize_amount?: number;
}

export default function PublicLeaderboard() {
  const navigate = useNavigate();
  const [globalLeaders, setGlobalLeaders] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<LeaderboardEntry[]>([]);
  const [competitionLeaders, setCompetitionLeaders] = useState<CompetitionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch global leaderboard
      const { data: attempts, error } = await supabase
        .from('attempts')
        .select('user_id, score, created_at')
        .order('score', { ascending: false });

      if (error) {
        console.error('Error fetching attempts:', error);
        return;
      }

      // Process global leaderboard
      const userStats = new Map();
      attempts?.forEach((attempt) => {
        const userId = attempt.user_id;
        if (userStats.has(userId)) {
          const existing = userStats.get(userId);
          userStats.set(userId, {
            ...existing,
            maxScore: Math.max(existing.maxScore, attempt.score),
            totalScore: existing.totalScore + attempt.score,
            attempts: existing.attempts + 1,
            lastAttempt: new Date(attempt.created_at) > new Date(existing.lastAttempt) ? attempt.created_at : existing.lastAttempt
          });
        } else {
          userStats.set(userId, {
            id: userId,
            name: 'Loading...',
            maxScore: attempt.score,
            totalScore: attempt.score,
            attempts: 1,
            averageScore: attempt.score,
            lastAttempt: attempt.created_at
          });
        }
      });

      // Get user names
      const userIds = Array.from(userStats.keys());
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds);

        if (!profilesError && profiles) {
          const profileMap = new Map();
          profiles.forEach(profile => {
            profileMap.set(profile.id, profile);
          });

          userStats.forEach((user, userId) => {
            const profile = profileMap.get(userId);
            user.name = profile?.full_name || profile?.email || 'Anonymous User';
            user.averageScore = Math.round(user.totalScore / user.attempts);
          });
        }
      }

      const globalData = Array.from(userStats.values())
        .sort((a, b) => b.maxScore - a.maxScore)
        .slice(0, 3);
      setGlobalLeaders(globalData);

      // Fetch weekly and monthly data (simplified for now)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const weeklyData = globalData.filter(user => 
        new Date(user.lastAttempt) >= oneWeekAgo
      ).slice(0, 3);

      const monthlyData = globalData.filter(user => 
        new Date(user.lastAttempt) >= oneMonthAgo
      ).slice(0, 3);

      setWeeklyLeaders(weeklyData);
      setMonthlyLeaders(monthlyData);

      // Fetch competition data
      const { data: competitions, error: compError } = await supabase
        .from('competitions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (!compError && competitions && competitions.length > 0) {
        const latestCompetition = competitions[0];
        const { data: compAttempts, error: compAttemptsError } = await supabase
          .from('competition_attempts')
          .select(`
            id,
            user_id,
            score,
            time_taken,
            profiles!inner(full_name, email)
          `)
          .eq('competition_id', latestCompetition.id)
          .order('score', { ascending: false })
          .order('time_taken', { ascending: true });

        if (!compAttemptsError && compAttempts) {
          const compData = compAttempts.map((attempt, index) => ({
            id: attempt.id,
            name: attempt.profiles?.full_name || attempt.profiles?.email || 'Anonymous',
            score: attempt.score,
            time_taken: attempt.time_taken,
            rank: index + 1,
            prize_amount: index < 3 ? [100, 50, 25][index] : undefined
          }));
          setCompetitionLeaders(compData);
        }
      }

    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-sm font-semibold text-gray-600">#{rank}</span>;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'global', label: 'Global Leaderboard', icon: Trophy },
    { id: 'weekly', label: 'Weekly Top 10', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly Champions', icon: Calendar },
    { id: 'competition', label: 'Latest Competition', icon: Award }
  ];

  const renderLeaderboardTable = (data: any[], showTime = false) => (
    <div className="space-y-3">
      {data.map((entry, index) => (
        <div key={entry.id} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{entry.name}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Show crown for top 3, with respective color, and points */}
            {index === 0 && <Crown className="w-6 h-6 text-yellow-500 mr-1" />}
            {index === 1 && <Crown className="w-6 h-6 text-gray-400 mr-1" />}
            {index === 2 && <Crown className="w-6 h-6 text-amber-700 mr-1" />}
            <div className="text-lg font-bold text-blue-600">
              {showTime ? entry.score : entry.maxScore}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
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
            <a href="/public-leaderboard" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Bible Quiz Leaderboard</h1>
          <p className="text-lg text-gray-700 mb-6">
            Compete with believers from around the world! See who's leading the pack in our Bible quiz competitions. 
            Track your progress, challenge yourself, and climb the ranks to become a Bible Quiz Champion.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">🏆 Global Champions</span>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">📈 Weekly Winners</span>
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">🎯 Monthly Masters</span>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">💰 Prize Winners</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard Content */}
        <Card className="shadow-lg border-0 px-8 py-8">
          <CardHeader className="py-8 px-8">
            <CardTitle className="flex items-center space-x-2 py-4 px-8">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span>
                {activeTab === 'global' && 'Global Leaderboard'}
                {activeTab === 'weekly' && 'Weekly Top 10'}
                {activeTab === 'monthly' && 'Monthly Champions'}
                {activeTab === 'competition' && 'Latest Competition Results'}
              </span>
            </CardTitle>
            <CardDescription>
              {activeTab === 'global' && 'All-time highest scores from our Bible quiz community'}
              {activeTab === 'weekly' && 'Top performers from the last 7 days'}
              {activeTab === 'monthly' && 'Champions from the current month'}
              {activeTab === 'competition' && 'Results from our most recent live competition'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading leaderboard...</span>
              </div>
            ) : (
              <div>
                {activeTab === 'global' && renderLeaderboardTable(globalLeaders)}
                {activeTab === 'weekly' && renderLeaderboardTable(weeklyLeaders)}
                {activeTab === 'monthly' && renderLeaderboardTable(monthlyLeaders)}
                {activeTab === 'competition' && renderLeaderboardTable(competitionLeaders, true)}
                
                {activeTab === 'global' && globalLeaders.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No leaderboard data available yet.</p>
                    <p className="text-sm">Be the first to take a quiz and claim the top spot!</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-40">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">{globalLeaders.length}</div>
                  <div className="text-sm text-blue-600">Active Players</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">
                    {globalLeaders.length > 0 ? globalLeaders[0].maxScore : 0}
                  </div>
                  <div className="text-sm text-purple-600">Highest Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New card for number of users (inflated) */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">5,000+</div>
                  <div className="text-sm text-green-600">Quiz Takers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Competition?</h3>
            <p className="text-blue-100 mb-6">
              Take your first quiz and start climbing the leaderboard. Compete with believers worldwide and win exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/auth/login")}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Quiz Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/sword.png" alt="BibleBattles Logo" className="w-10 h-10 mr-2" />
              <span className="text-xl font-bold text-white">BibleBattles</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="text-gray-400 text-sm">Need help? Email <a href="mailto:info@biblequizcompetition.com" className="underline">info@biblequizcompetition.com</a></p>
          </div>
          {/* Center/Right: Links */}
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
                <li><a href="/bible-questions-and-answers-hub" className="hover:underline text-gray-300">Bible Q&amp;A</a></li>
                <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                <li><a href="/auth/login" className="hover:underline text-gray-300">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:underline text-gray-300">Privacy</a></li>
                <li><a href="#terms" className="hover:underline text-gray-300">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2024 BibleBattles. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 