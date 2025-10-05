import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowLeft, CheckCircle, XCircle, Clock, Users, Calendar } from 'lucide-react';

interface QuizResult {
  id: string;
  participant_name: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  average_response_time: number;
  completed_at: string;
  rank?: number;
}

interface SessionInfo {
  id: string;
  session_code: string;
  created_at: string;
  status: string;
  total_participants: number;
}

const QuizResults = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('Quiz Results');

  useEffect(() => {
    if (quizId) {
      fetchQuizSessions();
      fetchQuizTitle();
    }
  }, [quizId]);

  const fetchQuizTitle = async () => {
    try {
      const { data, error } = await supabase
        .from('user_created_quizzes')
        .select('title')
        .eq('id', quizId)
        .single();

      if (data?.title) {
        setQuizTitle(`Results for "${data.title}"`);
      }
    } catch (error) {
      console.error('Error fetching quiz title:', error);
    }
  };

  const fetchQuizSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('live_quiz_sessions')
        .select(`
          id,
          session_code,
          created_at,
          status,
          live_quiz_participants(count)
        `)
        .eq('quiz_id', quizId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const sessionsWithCounts = data.map(session => ({
        ...session,
        total_participants: session.live_quiz_participants[0]?.count || 0
      }));

      setSessions(sessionsWithCounts);
    } catch (error: any) {
      console.error('Error fetching quiz sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quiz sessions.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionResults = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('live_quiz_results')
        .select('*')
        .eq('session_id', sessionId)
        .order('score', { ascending: false });

      if (error) throw error;

      const rankedResults = data.map((result, index) => ({
        ...result,
        rank: index + 1,
      }));

      setResults(rankedResults);
      setSelectedSession(sessionId);
    } catch (error: any) {
      console.error('Error fetching session results:', error);
      toast({
        title: 'Error',
        description: 'Failed to load session results.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>{quizTitle} - Bible Quiz Competition</title>
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard/quizzes')} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">{quizTitle}</h1>
        </div>

        {sessions.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Sessions Yet</h2>
              <p className="text-gray-600 mb-4">This quiz hasn't been used in any live sessions yet.</p>
              <Button onClick={() => navigate(`/live-quiz/host/${quizId}`)}>
                Start Live Session
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sessions List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Past Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedSession === session.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => fetchSessionResults(session.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">
                            {new Date(session.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(session.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={session.status === 'finished' ? 'default' : 'secondary'}>
                            {session.status}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            <Users className="w-3 h-3 inline mr-1" />
                            {session.total_participants} participants
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-2">
              {selectedSession && results.length > 0 ? (
                <div className="space-y-4">
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="pt-6 text-center">
                      <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900">Session Results</h2>
                      <p className="text-gray-600">Detailed results for this live quiz session.</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((result, index) => (
                      <Card key={result.id} className={`${
                        index === 0 ? 'border-yellow-500 bg-yellow-100' :
                        index === 1 ? 'border-gray-400 bg-gray-100' :
                        index === 2 ? 'border-orange-400 bg-orange-100' :
                        'border-gray-200 bg-white'
                      }`}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-lg font-semibold">
                            {result.rank && <span className="mr-2 text-xl font-bold">#{result.rank}</span>}
                            {result.participant_name || 'Participant'}
                          </CardTitle>
                          <Badge variant={result.score > 0 ? 'default' : 'secondary'}>
                            {result.score.toFixed(1)} Points
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            {result.correct_answers > 0 ? (
                              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-1 text-red-500" />
                            )}
                            {result.correct_answers} / {result.total_questions} Correct
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1 text-blue-500" />
                            Avg. Time: {result.average_response_time.toFixed(1)}s
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Completed: {new Date(result.completed_at).toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : selectedSession ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <p className="text-gray-600">No results found for this session.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center py-8">
                  <CardContent>
                    <p className="text-gray-600">Select a session to view results.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizResults;
