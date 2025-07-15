import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity as ActivityIcon, Search, Filter, Eye, Calendar, Clock, User, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface ActivityItem {
  id: string;
  user: string;
  email: string;
  action: string;
  score?: number;
  quizTitle?: string;
  time: string;
  createdAt: string;
  user_id: string;
}

const Activity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [displayCount, setDisplayCount] = useState(10);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [activities, searchTerm, selectedAction, selectedTimeRange, displayCount]);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      
      // Fetch recent attempts with user and quiz information
      const { data: attemptsData, error: attemptsError } = await supabase
        .from('attempts')
        .select(`
          *,
          quizzes(title)
        `)
        .order('created_at', { ascending: false })
        .limit(50); // Get last 50 attempts

      if (attemptsError) throw attemptsError;

      // Get unique user IDs from attempts
      const userIds = [...new Set(attemptsData?.map(attempt => attempt.user_id).filter(Boolean))];

      // Fetch profiles for these users
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Create a map of user_id to profile data
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      // Format activities
      const formattedActivities = attemptsData?.map(attempt => {
        const profile = profilesMap.get(attempt.user_id);
        const timeAgo = new Date(attempt.created_at);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - timeAgo.getTime()) / (1000 * 60));
        
        let timeString;
        if (diffMinutes < 1) {
          timeString = "Just now";
        } else if (diffMinutes < 60) {
          timeString = `${diffMinutes} minutes ago`;
        } else if (diffMinutes < 1440) {
          timeString = `${Math.floor(diffMinutes / 60)} hours ago`;
        } else {
          timeString = `${Math.floor(diffMinutes / 1440)} days ago`;
        }

        return {
          id: attempt.id,
          user: profile?.full_name || `User ${attempt.user_id?.slice(0, 8) || 'Unknown'}`,
          email: profile?.email || 'No email',
          action: "Completed quiz",
          score: attempt.score,
          quizTitle: attempt.quizzes?.title || 'Unknown Quiz',
          time: timeString,
          createdAt: attempt.created_at,
          user_id: attempt.user_id
        };
      }) || [];

      setActivities(formattedActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to load recent activities.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = activities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.quizTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by action
    if (selectedAction !== "all") {
      filtered = filtered.filter(activity => activity.action === selectedAction);
    }

    // Filter by time range
    if (selectedTimeRange !== "all") {
      const now = new Date();
      const hoursAgo = parseInt(selectedTimeRange);
      const cutoffTime = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000));
      
      filtered = filtered.filter(activity => 
        new Date(activity.createdAt) >= cutoffTime
      );
    }

    // Limit display count
    filtered = filtered.slice(0, displayCount);

    setFilteredActivities(filtered);
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-100 text-green-700">Excellent</Badge>;
    } else if (score >= 80) {
      return <Badge className="bg-blue-100 text-blue-700">Great</Badge>;
    } else if (score >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-700">Good</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700">Needs Improvement</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ActivityIcon className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading recent activities...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recent Activity</h1>
            <p className="text-gray-600 mt-2">Monitor latest user activities on the platform</p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => fetchActivities()}
            className="flex items-center space-x-2"
          >
            <ActivityIcon className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{activities.length}</div>
                  <div className="text-sm text-gray-600">Total Activities</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(activities.map(a => a.user_id)).size}
                  </div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {activities.length > 0 ? Math.round(activities.reduce((sum, a) => sum + (a.score || 0), 0) / activities.length) : 0}
                  </div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {activities.filter(a => {
                      const hoursAgo = (new Date().getTime() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60);
                      return hoursAgo < 24;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">Last 24h</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ActivityIcon className="w-5 h-5 text-blue-600" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users, emails, or quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="Completed quiz">Quiz Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="1">Last Hour</SelectItem>
                  <SelectItem value="24">Last 24 Hours</SelectItem>
                  <SelectItem value="168">Last Week</SelectItem>
                </SelectContent>
              </Select>

              <Select value={displayCount.toString()} onValueChange={(value) => setDisplayCount(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Show count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Show 5</SelectItem>
                  <SelectItem value="10">Show 10</SelectItem>
                  <SelectItem value="20">Show 20</SelectItem>
                  <SelectItem value="50">Show 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ActivityIcon className="w-5 h-5 text-blue-600" />
                <span>Recent Activities ({filteredActivities.length})</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <ActivityIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{activity.user}</div>
                            <div className="text-sm text-gray-500">{activity.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-700">
                              {activity.action}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{activity.quizTitle}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="font-bold text-lg">{activity.score}</div>
                            {activity.score && getScoreBadge(activity.score)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <ActivityIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{activity.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <ActivityIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{formatDate(activity.createdAt)}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Activity; 