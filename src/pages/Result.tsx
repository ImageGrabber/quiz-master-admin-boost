import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target, RotateCcw, Users, Home, Brain } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

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
  const baseScore = correct * 4 - (total - correct) * 1;
  const timeBonus = (600 - timeUsed) * 0.1667;
  const speedFactor = 1 + (600 - timeUsed) / 1000;
  const finalScore = baseScore + timeBonus + speedFactor * 0.1;

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
      description: `${timeBonus.toFixed(2)} bonus points`
    },
    {
      icon: Trophy,
      label: "Final Score",
      value: finalScore.toFixed(2),
      description: `Base: ${baseScore} + Bonus: ${timeBonus.toFixed(2)}`
    }
  ];

  return (
    <DashboardLayout>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Result Header removed */}

          {/* Score Card */}
          <Card className={`mb-8 shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-1000 delay-300 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Your Score: {finalScore.toFixed(2)}
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
                  <span className="text-blue-700 font-medium">Time Bonus ({timeUsed} seconds used, {timeBonus.toFixed(2)} points)</span>
                  <span className="text-blue-700 font-bold">+{timeBonus.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Score</span>
                    <span className="text-blue-600">{finalScore.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Result;
