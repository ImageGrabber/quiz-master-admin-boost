
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Calendar } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

// Sample attempts data - in real app this would come from Supabase
const sampleAttempts = [
  {
    id: 1,
    user: "Alex Johnson",
    email: "alex@example.com", 
    quizId: "quiz-001",
    quizTitle: "General Knowledge",
    score: 95,
    accuracy: 92,
    secondsUsed: 480,
    createdAt: "2024-01-15T10:30:00Z",
    status: "completed"
  },
  {
    id: 2,
    user: "Sarah Chen",
    email: "sarah@example.com",
    quizId: "quiz-001", 
    quizTitle: "General Knowledge",
    score: 88,
    accuracy: 84,
    secondsUsed: 520,
    createdAt: "2024-01-15T09:15:00Z",
    status: "completed"
  },
  {
    id: 3,
    user: "Mike Rodriguez", 
    email: "mike@example.com",
    quizId: "quiz-002",
    quizTitle: "Science & Tech",
    score: 72,
    accuracy: 68,
    secondsUsed: 600,
    createdAt: "2024-01-14T16:45:00Z",
    status: "completed"
  },
  {
    id: 4,
    user: "Emily Davis",
    email: "emily@example.com",
    quizId: "quiz-001",
    quizTitle: "General Knowledge", 
    score: 0,
    accuracy: 0,
    secondsUsed: 120,
    createdAt: "2024-01-14T14:20:00Z",
    status: "abandoned"
  },
  {
    id: 5,
    user: "David Kim",
    email: "david@example.com",
    quizId: "quiz-003",
    quizTitle: "History Quiz",
    score: 91,
    accuracy: 88,
    secondsUsed: 450,
    createdAt: "2024-01-14T11:10:00Z", 
    status: "completed"
  }
];

const Attempts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "abandoned":
        return <Badge className="bg-red-100 text-red-700">Abandoned</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredAttempts = sampleAttempts
    .filter((attempt) => {
      const matchesSearch = attempt.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           attempt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           attempt.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || attempt.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
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
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="abandoned">Abandoned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
              
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Time Used</TableHead>
                    <TableHead>Status</TableHead>
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
                        <div>
                          <div className="font-medium">{attempt.quizTitle}</div>
                          <div className="text-sm text-gray-500">ID: {attempt.quizId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-lg">{attempt.score}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{attempt.accuracy}%</div>
                          <div className={`w-2 h-2 rounded-full ${
                            attempt.accuracy >= 80 ? "bg-green-500" :
                            attempt.accuracy >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono">{formatTime(attempt.secondsUsed)}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(attempt.status)}
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Attempts;
