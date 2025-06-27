
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Calendar } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface AttemptData {
  id: string;
  user: string;
  email: string;
  score: number;
  secondsUsed: number;
  createdAt: string;
  answers: any;
  profile?: {
    full_name: string;
    email: string;
  };
}

const Attempts = () => {
  const [attempts, setAttempts] = useState<AttemptData[]>([]);
  const [filteredAttempts, setFilteredAttempts] = useState<AttemptData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  useEffect(() => {
    filterAndSortAttempts();
  }, [attempts, searchTerm, sortBy, sortOrder]);

  const fetchAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('attempts')
        .select(`
          *,
          profiles!inner(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAttempts = data?.map(attempt => ({
        id: attempt.id,
        user: attempt.profiles?.full_name || 'Anonymous User',
        email: attempt.profiles?.email || 'No email',
        score: attempt.score,
        secondsUsed: attempt.seconds_used,
        createdAt: attempt.created_at,
        answers: attempt.answers,
        profile: attempt.profiles
      })) || [];

      setAttempts(formattedAttempts);
    } catch (error) {
      console.error('Error fetching attempts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortAttempts = () => {
    let filtered = attempts.filter((attempt) => {
      const matchesSearch = 
        attempt.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attempt.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort attempts
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "score":
          aValue = a.score;
          bValue = b.score;
          break;
        case "user":
          aValue = a.user;
          bValue = b.user;
          break;
        case "createdAt":
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAttempts(filtered);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateAccuracy = (answers: any, totalQuestions = 25) => {
    if (!answers || !Array.isArray(answers)) return 0;
    // This is a simplified calculation - in a real app you'd compare with correct answers
    const correctCount = Math.round((answers.length / totalQuestions) * 100);
    return Math.min(correctCount, 100);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading quiz attempts...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Quiz Attempts</h1>
            <p className="text-gray-600 mt-2">Monitor and analyze all quiz attempts</p>
          </div>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Attempts Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>All Attempts ({filteredAttempts.length})</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAttempts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No quiz attempts yet</h3>
                <p className="text-gray-500">Quiz attempts will appear here once users start taking quizzes.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Time Used</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttempts.map((attempt) => (
                      <TableRow key={attempt.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{attempt.user}</div>
                            <div className="text-sm text-gray-500">{attempt.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="font-bold text-lg">{attempt.score}</div>
                            <Badge className={attempt.score >= 80 ? "bg-green-100 text-green-700" : 
                                           attempt.score >= 60 ? "bg-yellow-100 text-yellow-700" : 
                                           "bg-red-100 text-red-700"}>
                              {attempt.score >= 80 ? "Excellent" : attempt.score >= 60 ? "Good" : "Needs Improvement"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono">{formatTime(attempt.secondsUsed)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{formatDate(attempt.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
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

export default Attempts;
