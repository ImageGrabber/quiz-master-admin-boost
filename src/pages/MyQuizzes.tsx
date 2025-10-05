import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Play, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Clock,
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Helmet } from 'react-helmet-async';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface UserQuiz {
  id: string;
  title: string;
  description: string;
  is_public: boolean;
  share_code: string;
  created_at: string;
  updated_at: string;
  question_count: number;
}

const MyQuizzes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<UserQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublic, setFilterPublic] = useState<'all' | 'public' | 'private'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }

      const { data, error } = await supabase
        .from('user_created_quizzes')
        .select(`
          *,
          questions:user_quiz_questions(count)
        `)
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedQuizzes = data.map(quiz => ({
        ...quiz,
        question_count: quiz.questions?.[0]?.count || 0
      }));

      setQuizzes(formattedQuizzes);

    } catch (error) {
      console.error('Error loading quizzes:', error);
      toast({
        title: "Error",
        description: "Failed to load your quizzes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuiz = async (quizId: string) => {
    try {
      const { error } = await supabase
        .from('user_created_quizzes')
        .delete()
        .eq('id', quizId);

      if (error) throw error;

      setQuizzes(quizzes.filter(q => q.id !== quizId));
      setDeleteDialogOpen(false);
      setQuizToDelete(null);

      toast({
        title: "Quiz Deleted",
        description: "Your quiz has been deleted successfully",
      });

    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to delete quiz",
        variant: "destructive",
      });
    }
  };


  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPublic === 'all' || 
                         (filterPublic === 'public' && quiz.is_public) ||
                         (filterPublic === 'private' && !quiz.is_public);
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>My Quizzes | Bible Quiz Competition</title>
        <meta name="description" content="Manage your created quizzes and start live sessions" />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Quizzes</h1>
              <p className="text-gray-600">Create and manage your live quiz sessions</p>
            </div>
            <Button onClick={() => navigate('/create-quiz')} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Quiz
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterPublic === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPublic('all')}
              >
                All
              </Button>
              <Button
                variant={filterPublic === 'public' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPublic('public')}
              >
                Public
              </Button>
              <Button
                variant={filterPublic === 'private' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPublic('private')}
              >
                Private
              </Button>
            </div>
          </div>

          {/* Quizzes Grid */}
          {filteredQuizzes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm || filterPublic !== 'all' ? 'No quizzes found' : 'No quizzes yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterPublic !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Create your first quiz to get started'
                  }
                </p>
                {!searchTerm && filterPublic === 'all' && (
                  <Button onClick={() => navigate('/create-quiz')} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Quiz
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{quiz.title}</CardTitle>
                        <p className="text-gray-600 text-sm line-clamp-2">{quiz.description}</p>
                      </div>
                      <Badge variant={quiz.is_public ? "default" : "secondary"}>
                        {quiz.is_public ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {quiz.question_count} questions
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(quiz.created_at).toLocaleDateString()}
                      </div>
                    </div>


                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/live-quiz/host/${quiz.id}`)}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Host Live
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/quiz-results/${quiz.id}`)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Results
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setQuizToDelete(quiz.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Quiz</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this quiz? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => quizToDelete && deleteQuiz(quizToDelete)}
                >
                  Delete Quiz
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyQuizzes;