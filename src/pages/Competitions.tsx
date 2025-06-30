import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Competition } from '../integrations/supabase/types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from '../hooks/use-toast';
import { Trophy, Users, Calendar, DollarSign, Clock, Award, Lock, Play } from 'lucide-react';
import { format } from 'date-fns';
import DashboardLayout from '../components/DashboardLayout';

interface CompetitionWithDetails extends Competition {
  quiz: {
    id: number;
    title: string;
    description: string | null;
  };
  entries_count: number;
  user_has_entered: boolean;
  user_payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
}

export default function Competitions() {
  const [competitions, setCompetitions] = useState<CompetitionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionWithDetails | null>(null);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentSuccess = params.get('success');
  const paymentCanceled = params.get('canceled');
  const sessionId = params.get('session_id');

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (paymentSuccess && sessionId) {
      // Try to fetch the session from Supabase Edge Function to get the competition_id
      const fetchCompetitionId = async () => {
        try {
          const res = await fetch(`https://kejiqzpfiyamjznpdjrp.supabase.co/functions/v1/get-stripe-session?session_id=${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.competition_id) {
              setTimeout(() => {
                navigate(`/competition-quiz/${data.competition_id}`);
              }, 3000);
            }
          }
        } catch (e) {
          // Ignore, fallback to manual entry
        }
      };
      fetchCompetitionId();
    }
  }, [paymentSuccess, sessionId, navigate]);

  // Add a manual refresh button and force fetch on dialog close
  useEffect(() => {
    if (!isJoinDialogOpen) {
      fetchCompetitions();
    }
  }, [isJoinDialogOpen]);

  const fetchCompetitions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCompetitions([]);
        setLoading(false);
        return;
      }
      const { data, error } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(id, title, description),
          entries_count:competition_entries(count),
          competition_entries(user_id, paid)
        `);

      if (error) throw error;
      // Map competitions to include user_has_entered and user_payment_status
      const competitionsWithDetails = (data || []).map((competition: any) => {
        console.log('competition_entries for', competition.title, competition.competition_entries);
        const userEntry = (competition.competition_entries || []).find((entry: any) => entry.user_id === user.id);
        return {
          ...competition,
          entries_count: competition.entries_count?.[0]?.count || 0,
          user_has_entered: !!userEntry,
          user_payment_status: userEntry ? (userEntry.paid ? 'completed' : 'pending') : undefined,
        };
      });
      setCompetitions(competitionsWithDetails);
    } catch (error: any) {
      console.error('Error fetching competitions:', error);
      toast({
        title: "Error",
        description: `Failed to fetch competitions: ${error?.message || error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCompetition = async () => {
    if (!selectedCompetition) return;

    setJoining(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to join competitions",
          variant: "destructive",
        });
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('https://kejiqzpfiyamjznpdjrp.supabase.co/functions/v1/create-competition-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          competition_id: selectedCompetition.id,
          user_id: user.id,
          entry_fee: selectedCompetition.entry_fee,
          title: selectedCompetition.title
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error joining competition:', error);
      toast({
        title: "Error",
        description: "Failed to join competition. Please try again.",
        variant: "destructive",
      });
    } finally {
      setJoining(false);
      setIsJoinDialogOpen(false);
    }
  };

  const handleStartQuiz = (competition: CompetitionWithDetails) => {
    if (competition.user_payment_status !== 'completed') {
      toast({
        title: "Payment Required",
        description: "You must complete payment before starting the quiz",
        variant: "destructive",
      });
      return;
    }

    navigate(`/competition-quiz/${competition.id}`);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
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
    <DashboardLayout>
      <div className="p-6">
        {paymentSuccess && sessionId && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
            Payment successful! Thank you for joining the competition.<br />
            (Session ID: {sessionId})<br />
            <span>If you are not redirected, <button className="underline text-blue-700" onClick={() => navigate('/competition-quiz')}>click here to enter the competition</button>.</span>
          </div>
        )}
        {paymentCanceled && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded">
            Payment was canceled. You have not been charged.
          </div>
        )}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Competitions</h1>
            <p className="text-gray-600">Join paid competitions and win prizes</p>
          </div>
          <Button variant="outline" onClick={fetchCompetitions}>Refresh</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <Card key={competition.id} className="relative">
              {competition.user_has_entered && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800">
                    Joined
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      {competition.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {competition.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(competition.status)}>
                    {competition.status}
                  </Badge>
                  {competition.user_has_entered && competition.user_payment_status && (
                    <Badge className={getPaymentStatusColor(competition.user_payment_status)}>
                      {competition.user_payment_status}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>Entry: ${competition.entry_fee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span>Prize Pool: ${competition.prize_pool}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{competition.entries_count} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>Starts: {format(new Date(competition.start_date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span>Ends: {format(new Date(competition.end_date), 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {competition.user_has_entered ? (
                    competition.user_payment_status === 'completed' ? (
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartQuiz(competition)}
                        disabled={competition.status !== 'active'}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {competition.status === 'active' ? 'Start Quiz' : 'Quiz Not Active'}
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        Payment Pending
                      </Button>
                    )
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full"
                          onClick={() => setSelectedCompetition(competition)}
                        >
                          Join Competition
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join Competition</DialogTitle>
                          <DialogDescription>
                            You're about to join "{competition.title}" for ${competition.entry_fee}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Competition Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Entry Fee:</span>
                                <span className="font-semibold">${competition.entry_fee}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Prize Pool:</span>
                                <span className="font-semibold">${competition.prize_pool}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Participants:</span>
                                <span>{competition.entries_count}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Start Date:</span>
                                <span>{format(new Date(competition.start_date), 'PPP')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>End Date:</span>
                                <span>{format(new Date(competition.end_date), 'PPP')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleJoinCompetition} disabled={joining}>
                              {joining ? 'Processing...' : `Pay $${competition.entry_fee}`}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {competition.user_has_entered && competition.user_payment_status === 'completed' && (
                    <Button 
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => navigate(`/competition-leaderboard/${competition.id}`)}
                    >
                      View Leaderboard
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {competitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Competitions Available</h3>
            <p className="text-gray-600">Check back later for new competitions!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 