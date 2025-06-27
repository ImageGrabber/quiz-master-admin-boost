
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/auth/login");
    }, 300);
  };

  const features = [
    {
      icon: Brain,
      title: "25 Questions",
      description: "Challenging questions across various topics"
    },
    {
      icon: Clock,
      title: "10 Minutes",
      description: "Fast-paced quiz with time bonus scoring"
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Compete with others and track your progress"
    },
    {
      icon: Users,
      title: "Real-time Results",
      description: "Instant scoring and performance analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QuizMaster
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/leaderboard")}>
              Leaderboard
            </Button>
            <Button onClick={() => navigate("/auth/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            🎯 Challenge Your Knowledge
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Test Your Skills with
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Interactive Quizzes
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Take on challenging 25-question quizzes with a 10-minute timer. 
            Earn points for correct answers and time bonuses. Compete on the leaderboard!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}
              onClick={handleStartQuiz}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-medium border-2 border-blue-200 hover:border-blue-300 rounded-xl"
              onClick={() => navigate("/leaderboard")}
            >
              View Leaderboard
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Scoring System */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold mb-2">
                Smart Scoring System
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Rewarding both accuracy and speed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">+4 Points</div>
                  <div className="text-blue-100">For each correct answer</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Time Bonus</div>
                  <div className="text-blue-100">Extra points for quick completion</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm text-blue-100">
                  <strong>Formula:</strong> Base Score (correct × 4 - wrong × 1) + Time Bonus (remaining time / 6)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">QuizMaster</span>
          </div>
          <p className="text-gray-600">© 2024 QuizMaster. Challenge your knowledge.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
