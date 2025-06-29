import React, { useState, useEffect } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { Competition, Quiz } from '../../integrations/supabase/types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from '../../hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Users, Trophy, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface CompetitionWithDetails extends Competition {
  quiz: Quiz;
  entries_count: number;
  results_count: number;
}

export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionWithDetails[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    entry_fee: '',
    prize_pool: '',
    max_participants: '',
    start_date: '',
    end_date: '',
    quiz_id: '',
    status: 'upcoming' as const
  });

  useEffect(() => {
    fetchCompetitions();
    fetchQuizzes();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(*),
          entries_count:competition_entries(count),
          results_count:competition_results(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch competitions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .order('title');

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const { error } = await supabase
        .from('competitions')
        .insert({
          title: formData.title,
          description: formData.description,
          entry_fee: parseFloat(formData.entry_fee),
          prize_pool: parseFloat(formData.prize_pool),
          max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
          start_date: formData.start_date,
          end_date: formData.end_date,
          quiz_id: formData.quiz_id,
          status: formData.status
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Competition created successfully",
      });

      setIsCreateDialogOpen(false);
      resetForm();
      fetchCompetitions();
    } catch (error) {
      console.error('Error creating competition:', error);
      toast({
        title: "Error",
        description: "Failed to create competition",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedCompetition) return;

    try {
      const { error } = await supabase
        .from('competitions')
        .update({
          title: formData.title,
          description: formData.description,
          entry_fee: parseFloat(formData.entry_fee),
          prize_pool: parseFloat(formData.prize_pool),
          max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
          start_date: formData.start_date,
          end_date: formData.end_date,
          quiz_id: formData.quiz_id,
          status: formData.status
        })
        .eq('id', selectedCompetition.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Competition updated successfully",
      });

      setIsEditDialogOpen(false);
      resetForm();
      fetchCompetitions();
    } catch (error) {
      console.error('Error updating competition:', error);
      toast({
        title: "Error",
        description: "Failed to update competition",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competition? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('competitions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Competition deleted successfully",
      });

      fetchCompetitions();
    } catch (error) {
      console.error('Error deleting competition:', error);
      toast({
        title: "Error",
        description: "Failed to delete competition",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      entry_fee: '',
      prize_pool: '',
      max_participants: '',
      start_date: '',
      end_date: '',
      quiz_id: '',
      status: 'upcoming'
    });
    setSelectedCompetition(null);
  };

  const openEditDialog = (competition: Competition) => {
    setSelectedCompetition(competition);
    setFormData({
      title: competition.title,
      description: competition.description || '',
      entry_fee: competition.entry_fee.toString(),
      prize_pool: competition.prize_pool.toString(),
      max_participants: competition.max_participants?.toString() || '',
      start_date: competition.start_date.split('T')[0],
      end_date: competition.end_date.split('T')[0],
      quiz_id: competition.quiz_id,
      status: competition.status
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading competitions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Competitions</h1>
          <p className="text-gray-600">Manage paid competitions and tournaments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Competition
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Competition</DialogTitle>
              <DialogDescription>
                Set up a new paid competition with entry fees and prizes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Competition title"
                  />
                </div>
                <div>
                  <Label htmlFor="quiz">Quiz</Label>
                  <Select value={formData.quiz_id} onValueChange={(value) => setFormData({ ...formData, quiz_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a quiz" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizzes.map((quiz) => (
                        <SelectItem key={quiz.id} value={quiz.id.toString()}>
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Competition description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entry_fee">Entry Fee ($)</Label>
                  <Input
                    id="entry_fee"
                    type="number"
                    step="0.01"
                    value={formData.entry_fee}
                    onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="prize_pool">Prize Pool ($)</Label>
                  <Input
                    id="prize_pool"
                    type="number"
                    step="0.01"
                    value={formData.prize_pool}
                    onChange={(e) => setFormData({ ...formData, prize_pool: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="max_participants">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                    placeholder="Unlimited"
                  />
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>Create Competition</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {competitions.map((competition) => (
          <Card key={competition.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {competition.title}
                    <Badge className={getStatusColor(competition.status)}>
                      {competition.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {competition.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Competition Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Quiz</h3>
                          <p>{competition.quiz.title}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold">Entry Fee</h3>
                            <p>${competition.entry_fee}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Prize Pool</h3>
                            <p>${competition.prize_pool}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold">Start Date</h3>
                            <p>{format(new Date(competition.start_date), 'PPP')}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">End Date</h3>
                            <p>{format(new Date(competition.end_date), 'PPP')}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">Participants</h3>
                          <p>{competition.entries_count} / {competition.max_participants || '∞'}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(competition)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(competition.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>${competition.entry_fee} entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span>${competition.prize_pool} prize</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{competition.entries_count} participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span>{format(new Date(competition.start_date), 'MMM dd')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Competition</DialogTitle>
            <DialogDescription>
              Update competition details and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Competition title"
                />
              </div>
              <div>
                <Label htmlFor="edit-quiz">Quiz</Label>
                <Select value={formData.quiz_id} onValueChange={(value) => setFormData({ ...formData, quiz_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quiz" />
                  </SelectTrigger>
                  <SelectContent>
                    {quizzes.map((quiz) => (
                      <SelectItem key={quiz.id} value={quiz.id.toString()}>
                        {quiz.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Competition description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-entry_fee">Entry Fee ($)</Label>
                <Input
                  id="edit-entry_fee"
                  type="number"
                  step="0.01"
                  value={formData.entry_fee}
                  onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="edit-prize_pool">Prize Pool ($)</Label>
                <Input
                  id="edit-prize_pool"
                  type="number"
                  step="0.01"
                  value={formData.prize_pool}
                  onChange={(e) => setFormData({ ...formData, prize_pool: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-max_participants">Max Participants</Label>
                <Input
                  id="edit-max_participants"
                  type="number"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                  placeholder="Unlimited"
                />
              </div>
              <div>
                <Label htmlFor="edit-start_date">Start Date</Label>
                <Input
                  id="edit-start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-end_date">End Date</Label>
                <Input
                  id="edit-end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Update Competition</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 