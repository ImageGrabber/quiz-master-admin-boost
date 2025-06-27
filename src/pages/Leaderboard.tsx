
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Home, Brain, Play } from "lucide-react";

// Sample leaderboard data - in real app this would come from Supabase
const sampleLeaderboard = [
  { id: 1, name: "Alex Johnson", score: 95, attempts: 3, avgScore: 89, rank: 1 },
  { id: 2, name: "Sarah Chen", score: 92, attempts: 5, avgScore: 85, rank: 2 },
  { id: 3, name: "Mike Rodriguez", score: 88, attempts: 2, avgScore: 86, rank: 3 },
  { id: 4, name: "Emily Davis", score: 84, attempts: 4, avgScore: 78, rank: 4 },
  { id: 5, name: "David Kim", score: 82, attempts: 6, avgScore: 75, rank: 5 },
  { id: 6, name: "Lisa Wang", score: 79, attempts: 3, avgScore: 74, rank: 6 },
  { id: 7, name: "Tom Wilson", score: 76, attempts: 2, avgScore: 73, rank: 7 },
  { id: 8, name: "Anna Brown", score: 74, attempts: 1, avgScore: 74, rank: 8 },
  { id: 9, name: "Chris Lee", score: 71, attempts: 4, avgScore: 69, rank: 9 },
  { id: 10, name: "Jess Taylor", score: 68, attempts: 2, avgScore: 65, rank: 10 }
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");

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
              <Button onClick={() => navigate("/quiz")} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sampleLeaderboard.slice(0, 3).map((player, index) => (
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

          {/* Full Leaderboard */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sampleLeaderboard.map((player) => (
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

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Climb the Ranks?</h3>
                <p className="text-blue-100 mb-6">Take a quiz now and see if you can make it to the top!</p>
                <Button
                  onClick={() => navigate("/quiz")}
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
