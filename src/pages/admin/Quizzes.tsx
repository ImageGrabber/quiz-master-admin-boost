
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/AdminLayout";

// Sample quiz data - in real app this would come from Supabase
const sampleQuizzes = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your knowledge across various topics",
    questionCount: 25,
    attempts: 142,
    avgScore: 76.8,
    createdAt: "2024-01-10T10:00:00Z",
    status: "active"
  },
  {
    id: 2,
    title: "Science & Technology",
    description: "Questions about science, tech, and innovation",
    questionCount: 25,
    attempts: 89,
    avgScore: 72.3,
    createdAt: "2024-01-12T14:30:00Z",
    status: "active"
  },
  {
    id: 3,
    title: "History Quiz",
    description: "Journey through historical events and figures",
    questionCount: 25,
    attempts: 67,
    avgScore: 68.9,
    createdAt: "2024-01-15T09:15:00Z",
    status: "draft"
  }
];

const Quizzes = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    questionSelection: "random" // "random" or "manual"
  });
  const { toast } = useToast();

  const handleCreateQuiz = async () => {
    if (!newQuiz.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a quiz title.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate quiz creation - in real app this would call Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Quiz created successfully!",
        description: `"${newQuiz.title}" has been added to your quiz collection.`,
      });

      setIsCreateDialogOpen(false);
      setNewQuiz({ title: "", description: "", questionSelection: "random" });
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
            <p className="text-gray-600 mt-2">Create and manage your quiz collection</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Quiz</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
                <DialogDescription>
                  Set up a new quiz with your desired questions and settings.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter quiz title..."
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this quiz covers..."
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Question Selection</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="random"
                        name="questionSelection"
                        value="random"
                        checked={newQuiz.questionSelection === "random"}
                        onChange={(e) => setNewQuiz({...newQuiz, questionSelection: e.target.value})}
                        className="text-blue-600"
                      />
                      <Label htmlFor="random" className="font-normal">
                        Random Selection (25 questions from database)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="manual"
                        name="questionSelection"
                        value="manual"
                        checked={newQuiz.questionSelection === "manual"}
                        onChange={(e) => setNewQuiz({...newQuiz, questionSelection: e.target.value})}
                        className="text-blue-600"
                      />
                      <Label htmlFor="manual" className="font-normal">
                        Manual Selection (choose specific questions)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateQuiz} className="bg-blue-600 hover:bg-blue-700">
                  Create Quiz
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{sampleQuizzes.length}</div>
                  <div className="text-sm text-gray-600">Total Quizzes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {sampleQuizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Attempts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {sampleQuizzes.filter(q => q.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600">Active Quizzes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle>All Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Details</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleQuizzes.map((quiz) => (
                    <TableRow key={quiz.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{quiz.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {quiz.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{quiz.questionCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{quiz.attempts}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{quiz.avgScore}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(quiz.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(quiz.createdAt)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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

export default Quizzes;
