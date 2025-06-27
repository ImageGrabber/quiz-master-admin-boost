
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, TrendingUp, Trophy, Plus, Upload, Eye, Brain } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample admin stats - in real app this would come from Supabase
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "Active quiz takers"
    },
    {
      title: "Total Attempts",
      value: "3,891",
      change: "+23%",
      changeType: "positive", 
      icon: FileText,
      description: "Quiz attempts this month"
    },
    {
      title: "Average Score",
      value: "76.8",
      change: "+2.1",
      changeType: "positive",
      icon: TrendingUp,
      description: "Points per attempt"
    },
    {
      title: "Highest Score",
      value: "98",
      change: "New record!",
      changeType: "neutral",
      icon: Trophy,
      description: "Personal best achieved"
    }
  ];

  const recentActivity = [
    { user: "Alex Johnson", action: "Achieved new high score", score: 98, time: "2 minutes ago" },
    { user: "Sarah Chen", action: "Completed quiz", score: 85, time: "5 minutes ago" },
    { user: "Mike Rodriguez", action: "Started quiz", score: null, time: "8 minutes ago" },
    { user: "Emily Davis", action: "Completed quiz", score: 92, time: "12 minutes ago" },
    { user: "David Kim", action: "Registered", score: null, time: "15 minutes ago" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Overview of your QuizMaster platform</p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/upload")}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Questions</span>
            </Button>
            
            <Button
              onClick={() => navigate("/admin/quizzes")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Quiz</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center mt-2">
                  <Badge 
                    variant={stat.changeType === "positive" ? "default" : "secondary"}
                    className={stat.changeType === "positive" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest user activities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{activity.user}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                    {activity.score && (
                      <Badge className="bg-blue-100 text-blue-700">
                        {activity.score} pts
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/admin/attempts")}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  View All Quiz Attempts
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/admin/upload")}
                >
                  <Upload className="w-4 h-4 mr-3" />
                  Bulk Upload Questions
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/admin/quizzes")}
                >
                  <Plus className="w-4 h-4 mr-3" />
                  Create New Quiz
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => navigate("/leaderboard")}
                >
                  <Trophy className="w-4 h-4 mr-3" />
                  View Public Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">125ms</div>
                <div className="text-blue-100">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Active</div>
                <div className="text-blue-100">All Services</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
