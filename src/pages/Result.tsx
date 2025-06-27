
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target, RotateCcw, Users, Home, Brain } from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAnimation, setShowAnimation] = useState(false);

  const resultData = location.state || {
    score: 0,
    correct: 0,
    total: 25,
    timeUsed: 600
  };

  const { score, correct, total, timeUsed } = resultData;
  const accuracy = Math.round((correct / total) * 100);
  const timeBonus = Math.ceil((600 - timeUsed) / 6);
  const baseScore = correct * 4 - (total - correct) * 1;

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (accuracy >= 75) return { level: "Great", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (accuracy >= 60) return { level: "Good", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Keep Trying", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const performance = getPerformanceLevel();

  const stats = [
    {
      icon: Target,
      label: "Accuracy",
      value: `${accuracy}%`,
      description: `${correct} out of ${total} correct`
    },
    {
      icon: Clock,
      label: "Time Used",
      value: `${Math.floor(timeUsed / 60)}:${(timeUsed % 60).toString().padStart(2, '0')}`,
      description: `${timeBonus} bonus points`
    },
    {
      icon: Trophy,
      label: "Final Score",
      value: score.toString(),
      description: `Base: ${baseScore} + Bonus: ${timeBonus}`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
            </div>
            <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-900">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quiz Completed!
            </h1>
            
            <Badge className={`${performance.bgColor} ${performance.color} text-lg px-4 py-2 font-semibold`}>
              {performance.level}
            </Badge>
          </div>

          {/* Score Card */}
          <Card className={`mb-8 shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-1000 delay-300 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Your Score: {score}
              </CardTitle>
              <p className="text-blue-100 text-lg">
                Outstanding performance! 🎉
              </p>
            </CardHeader>
          </Card>

          {/* Stats Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-1000 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </CardTitle>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Score Breakdown */}
          <Card className={`mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm transition-all duration-1000 delay-700 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Correct Answers ({correct} × 4)</span>
                  <span className="text-green-700 font-bold">+{correct * 4}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700 font-medium">Wrong Answers ({total - correct} × 1)</span>
                  <span className="text-red-700 font-bold">-{total - correct}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700 font-medium">Time Bonus</span>
                  <span className="text-blue-700 font-bold">+{timeBonus}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Score</span>
                    <span className="text-blue-600">{score}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button
              onClick={() => navigate("/quiz")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Quiz
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/leaderboard")}
              className="px-8 py-3 font-medium border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <Users className="w-4 h-4 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
