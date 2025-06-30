import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Trophy, Medal, Clock, Award, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface CompetitionResult {
  id: string;
  user_id: string;
  score: number;
  time_taken: number;
  rank: number;
  prize_amount: number | null;
  created_at: string;
  user: {
    full_name: string;
    email: string;
  };
}

interface Competition {
  id: string;
  title: string;
  description: string | null;
  entry_fee: number;
  prize_pool: number;
  start_date: string;
  end_date: string;
  status: string;
  quiz: {
    id: number;
    title: string;
  };
}

export default function CompetitionLeaderboard() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [results, setResults] = useState<CompetitionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [userHasAttempted, setUserHasAttempted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (competitionId) {
      fetchCompetitionLeaderboard();
    }
  }, [competitionId]);

  const fetchCompetitionLeaderboard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Fetch competition details
      const { data: competitionData, error: competitionError } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(id, title)
        `)
        .eq('id', competitionId)
        .single();

      if (competitionError) throw competitionError;
      setCompetition(competitionData);

      // Check if current user has attempted this competition
      if (user) {
        const { data: userResult } = await (supabase as any)
          .from('competition_results')
          .select('id')
          .eq('competition_id', competitionId)
          .eq('user_id', user.id)
          .single();
        
        setUserHasAttempted(!!userResult);
      }

      // Fetch results with user details
      const { data: resultsData, error: resultsError } = await (supabase as any)
        .from('competition_results')
        .select('*')
        .eq('competition_id', competitionId)
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true });

      console.log('resultsData', resultsData);

      if (resultsError && resultsError.code !== 'PGRST116') throw resultsError; // PGRST116 is "no rows returned"

      // Calculate ranks and prize amounts
      const rankedResults = (resultsData || []).map((result: any, index: number) => ({
        ...result,
        rank: index + 1,
        prize_amount: calculatePrizeAmount(index + 1, competitionData.prize_pool, resultsData?.length || 0)
      }));

      setResults(rankedResults);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrizeAmount = (rank: number, prizePool: number, totalParticipants: number): number => {
    if (totalParticipants === 0) return 0;
    
    // Simple prize distribution: 50% to 1st, 30% to 2nd, 20% to 3rd
    switch (rank) {
      case 1:
        return Math.round(prizePool * 0.5 * 100) / 100;
      case 2:
        return Math.round(prizePool * 0.3 * 100) / 100;
      case 3:
        return Math.round(prizePool * 0.2 * 100) / 100;
      default:
        return 0;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 text-center font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-white text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Competition Not Found</h1>
          <Button onClick={() => window.history.back()} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Competitions
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-600" />
              {competition.title} Leaderboard
            </h1>
            <p className="text-gray-600 mt-2">{competition.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">${competition.prize_pool}</div>
            <div className="text-sm text-gray-600">Prize Pool</div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Started: {format(new Date(competition.start_date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>Ended: {format(new Date(competition.end_date), 'MMM dd, yyyy')}</span>
          </div>
          <Badge className={competition.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
            {competition.status}
          </Badge>
        </div>
      </div>

      {/* Prize Distribution Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Prize Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1st</div>
              <div className="text-lg font-semibold">${Math.round(competition.prize_pool * 0.5 * 100) / 100}</div>
              <div className="text-sm text-gray-600">50% of pool</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">2nd</div>
              <div className="text-lg font-semibold">${Math.round(competition.prize_pool * 0.3 * 100) / 100}</div>
              <div className="text-sm text-gray-600">30% of pool</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">3rd</div>
              <div className="text-lg font-semibold">${Math.round(competition.prize_pool * 0.2 * 100) / 100}</div>
              <div className="text-sm text-gray-600">20% of pool</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Final Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Yet</h3>
              <p className="text-gray-600">Competition results will appear here once participants complete the quiz.</p>
              {!userHasAttempted && (
                <Button 
                  className="mt-4"
                  onClick={() => navigate(`/competition-quiz/${competitionId}`)}
                >
                  Start Quiz
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${getRankColor(result.rank)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(result.rank)}
                    </div>
                    <div>
                      <div className="font-semibold">{result.user_id || 'Anonymous'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{result.score}%</div>
                      <div className="text-sm text-gray-600">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{formatTime(result.time_taken)}</div>
                      <div className="text-sm text-gray-600">Time</div>
                    </div>
                    {result.prize_amount > 0 && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">${result.prize_amount}</div>
                        <div className="text-sm text-gray-600">Prize</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Competition Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{results.length}</div>
            <div className="text-sm text-gray-600">Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {results.length > 0 ? formatTime(Math.round(results.reduce((sum, r) => sum + r.time_taken, 0) / results.length)) : '0:00'}
            </div>
            <div className="text-sm text-gray-600">Average Time</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 