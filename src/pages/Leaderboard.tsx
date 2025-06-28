import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Home, Brain, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedPeriod]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-900">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button onClick={() => navigate("/quiz-selection")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Leaderboard
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              See how you rank against other quiz masters
            </p>

            {/* Period Filter */}
            <div className="flex justify-center space-x-2 mb-8">
              {["all", "week", "month"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : ""}
                >
                  {period === "all" ? "All Time" : period === "week" ? "This Week" : "This Month"}
                </Button>
              ))}
            </div>
          </div>

          {leaderboard.length === 0 ? (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No scores yet</h3>
                <p className="text-gray-500 mb-6">Be the first to take a quiz and appear on the leaderboard!</p>
                <Button onClick={() => navigate("/quiz-selection")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Take First Quiz
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Top 3 Podium */}
              {leaderboard.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {leaderboard.slice(0, 3).map((player, index) => (
                    <Card key={player.id} className={`shadow-xl border-0 transition-all duration-300 hover:scale-105 ${
                      index === 0 ? "md:order-2 bg-gradient-to-br from-yellow-50 to-yellow-100" :
                      index === 1 ? "md:order-1 bg-gradient-to-br from-gray-50 to-gray-100" :
                      "md:order-3 bg-gradient-to-br from-amber-50 to-amber-100"
                    }`}>
                      <CardHeader className="text-center pb-2">
                        <div className="flex justify-center mb-4">
                          {getRankIcon(player.rank)}
                        </div>
                        <Badge className={`${getRankBadgeColor(player.rank)} mb-2`}>
                          #{player.rank}
                        </Badge>
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {player.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {player.score}
                        </div>
                        <div className="text-sm text-gray-600">
                          Avg: {player.avgScore} ({player.attempts} attempts)
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Full Leaderboard */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Full Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard.map((player) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:bg-blue-50 ${
                          player.rank <= 3 ? "bg-gradient-to-r from-blue-50 to-purple-50" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <Badge className={getRankBadgeColor(player.rank)}>
                            #{player.rank}
                          </Badge>
                          
                          <div>
                            <div className="font-semibold text-gray-900">{player.name}</div>
                            <div className="text-sm text-gray-600">
                              {player.attempts} attempts • Avg: {player.avgScore}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">{player.score}</div>
                          <div className="text-sm text-gray-500">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Climb the Ranks?</h3>
                <p className="text-blue-100 mb-6">Take a quiz now and see if you can make it to the top!</p>
                <Button
                  onClick={() => navigate("/quiz-selection")}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
