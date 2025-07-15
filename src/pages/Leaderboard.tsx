import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Brain, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import AdminLayout from "@/components/AdminLayout";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  attempts: number;
  avgScore: number;
  rank: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUserRole();
    fetchLeaderboard();
  }, [selectedPeriod]);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setUserRole(profile?.role || 'user');
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('user');
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      
      // Simple query to get attempts data
      let query = supabase
        .from('attempts')
        .select('user_id, score, created_at');

      // Apply date filter based on selected period
      if (selectedPeriod === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      } else if (selectedPeriod === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('created_at', monthAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Leaderboard query error:', error);
        setLeaderboard([]);
        return;
      }

      console.log('Leaderboard data:', data); // Debug log

      // Process the data to create leaderboard
      const userStats = new Map();
      
      data?.forEach((attempt: any) => {
        const userId = attempt.user_id;
        
        if (userStats.has(userId)) {
          const existing = userStats.get(userId);
          userStats.set(userId, {
            ...existing,
            maxScore: Math.max(existing.maxScore, attempt.score),
            totalScore: existing.totalScore + attempt.score,
            attempts: existing.attempts + 1
          });
        } else {
          userStats.set(userId, {
            id: userId,
            name: 'Loading...', // Will be updated with real name
            maxScore: attempt.score,
            totalScore: attempt.score,
            attempts: 1
          });
        }
      });

      // Get user names from profiles table
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

          // Update user stats with real names
          userStats.forEach((user, userId) => {
            const profile = profileMap.get(userId);
            user.name = profile?.full_name || profile?.email || 'Anonymous User';
          });
        }
      }

      // Convert to array and calculate averages
      const leaderboardData = Array.from(userStats.values())
        .map((user: any) => ({
          id: user.id,
          name: user.name,
          score: user.maxScore,
          attempts: user.attempts,
          avgScore: Math.round(user.totalScore / user.attempts),
          rank: 0
        }))
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({
          ...user,
          rank: index + 1
        }));

      console.log('Processed leaderboard data:', leaderboardData); // Debug log
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const LeaderboardContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-lg text-gray-600 mb-2">See how you rank against other quiz masters</p>
        <p className="text-sm text-blue-700 mb-8">Note: This leaderboard shows performance in weekly quizzes and is not related to competitions.</p>
        
        {/* Period Filter */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("week")}
            className={selectedPeriod === "week" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            This Week
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("month")}
            className={selectedPeriod === "month" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            This Month
          </Button>
          <Button
            variant={selectedPeriod === "all" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("all")}
            className={selectedPeriod === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="space-y-4">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{entry.name}</div>
                      <div className="text-sm text-gray-600">
                        {entry.attempts} {entry.attempts === 1 ? 'attempt' : 'attempts'} • Avg: {entry.avgScore} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getRankBadgeColor(entry.rank)}>
                      #{entry.rank}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{entry.score}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No leaderboard data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Action */}
      {userRole === 'user' && (
        <div className="text-center">
          <Button
            onClick={() => navigate("/quiz-selection")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Take Quiz & Compete
          </Button>
        </div>
      )}
    </div>
  );

  // Use appropriate layout based on user role
  if (userRole === 'admin') {
    return <AdminLayout><LeaderboardContent /></AdminLayout>;
  } else {
    return <DashboardLayout><LeaderboardContent /></DashboardLayout>;
  }
};

export default Leaderboard;