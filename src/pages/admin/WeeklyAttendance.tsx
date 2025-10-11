import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, TrendingUp, Trophy, Clock, CheckCircle, XCircle } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface WeeklyQuiz {
  id: number;
  title: string;
  week_start_date: string;
  week_end_date: string;
  theme: string;
  total_questions: number;
  is_active: boolean;
}

interface AttendanceStats {
  total_attempts: number;
  completed_attempts: number;
  completion_rate: number;
  average_score: number;
  unique_participants: number;
}

interface Participant {
  user_id: string;
  full_name: string;
  email: string;
  score: number;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
}

const WeeklyAttendance = () => {
  const navigate = useNavigate();
  const [weeklyQuizzes, setWeeklyQuizzes] = useState<WeeklyQuiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<WeeklyQuiz | null>(null);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    async function checkAdminAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profile?.role !== 'admin') {
        navigate('/auth/login');
        return;
      }
      fetchWeeklyQuizzes();
    }
    checkAdminAuth();
  }, [navigate]);

  const fetchWeeklyQuizzes = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching weekly quizzes...');
      const { data, error } = await supabase
        .from('weekly_quizzes')
        .select('*')
        .order('week_start_date', { ascending: false });

      if (error) {
        console.error('Error fetching weekly quizzes:', error);
        return;
      }

      console.log('Fetched weekly quizzes:', data);
      setWeeklyQuizzes(data || []);
      if (data && data.length > 0) {
        setSelectedQuiz(data[0]);
        fetchAttendanceStats(data[0].id);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAttendanceStats = async (quizId: number) => {
    try {
      setIsLoadingStats(true);
      console.log('Fetching attendance stats for quiz ID:', quizId);
      
      // Get all attempts for this quiz - fetch attempts and profiles separately
      console.log('Fetching attempts without join...');
      const { data: attempts, error: attemptsError } = await supabase
        .from('weekly_quiz_attempts')
        .select('*')
        .eq('weekly_quiz_id', quizId);

      if (attemptsError) {
        console.error('Error fetching attempts:', attemptsError);
        return;
      }

      console.log('Fetched attempts:', attempts);

      // Get user profiles separately
      const userIds = attempts?.map(attempt => attempt.user_id).filter(Boolean) || [];
      let profilesData: any[] = [];
      
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds);
        
        if (profilesError) {
          console.warn('Error fetching profiles:', profilesError);
        } else {
          profilesData = profiles || [];
        }
      }

      // Combine attempts with profile data
      const attemptsWithProfiles = attempts?.map(attempt => {
        const profile = profilesData.find(p => p.id === attempt.user_id);
        return {
          ...attempt,
          profiles: profile || null
        };
      }) || [];

      console.log('Combined attempts with profiles:', attemptsWithProfiles);
      console.log('Number of attempts found:', attemptsWithProfiles?.length || 0);

      processAttemptsData(attemptsWithProfiles);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const processAttemptsData = (attempts: any[]) => {
    console.log('Processing attempts data:', attempts);
    
    // Consider an attempt completed if it has completed=true OR has a score > 0
    const completedAttempts = attempts?.filter(attempt => attempt.completed || attempt.score > 0) || [];
    const totalAttempts = attempts?.length || 0;
    const completionRate = totalAttempts > 0 ? (completedAttempts.length / totalAttempts) * 100 : 0;
    const averageScore = completedAttempts.length > 0 
      ? completedAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / completedAttempts.length 
      : 0;

    const uniqueParticipants = new Set(attempts?.map(attempt => attempt.user_id) || []).size;

    console.log('Processed stats:', {
      totalAttempts,
      completedAttempts: completedAttempts.length,
      completionRate,
      averageScore,
      uniqueParticipants
    });

    setAttendanceStats({
      total_attempts: totalAttempts,
      completed_attempts: completedAttempts.length,
      completion_rate: completionRate,
      average_score: averageScore,
      unique_participants: uniqueParticipants
    });

    // Format participants data
    const participantsData: Participant[] = attempts?.map(attempt => ({
      user_id: attempt.user_id,
      full_name: attempt.profiles?.full_name || 'Unknown User',
      email: attempt.profiles?.email || 'No email',
      score: attempt.score,
      completed: attempt.completed || attempt.score > 0, // Consider completed if score > 0
      created_at: attempt.created_at,
      completed_at: attempt.completed_at
    })) || [];

    setParticipants(participantsData);
  };

  const handleQuizSelect = (quiz: WeeklyQuiz) => {
    setSelectedQuiz(quiz);
    fetchAttendanceStats(quiz.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatWeekRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Weekly Quiz Attendance</h1>
            <p className="text-gray-600 mt-2">Track participation and completion rates for weekly quizzes</p>
          </div>
        </div>

        {/* Quiz Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Weekly Quiz
            </CardTitle>
            <CardDescription>
              Choose a weekly quiz to view attendance statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedQuiz?.id === quiz.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleQuizSelect(quiz)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                    <Badge variant={quiz.is_active ? "default" : "secondary"}>
                      {quiz.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{quiz.theme}</p>
                  <p className="text-sm text-gray-500">
                    {formatWeekRange(quiz.week_start_date, quiz.week_end_date)}
                  </p>
                  <p className="text-sm text-gray-500">{quiz.total_questions} questions</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Statistics */}
        {selectedQuiz && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingStats ? '...' : attendanceStats?.total_attempts || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    People who started the quiz
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingStats ? '...' : attendanceStats?.completed_attempts || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Finished the quiz
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingStats ? '...' : `${Math.round(attendanceStats?.completion_rate || 0)}%`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Success rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoadingStats ? '...' : Math.round(attendanceStats?.average_score || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Points per completion
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Participants List */}
            <Card>
              <CardHeader>
                <CardTitle>Participants ({attendanceStats?.unique_participants || 0} unique)</CardTitle>
                <CardDescription>
                  List of all participants who attempted this weekly quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {participants.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No participants found for this quiz
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Started</th>
                              <th className="text-left py-3 px-4 font-medium text-gray-900">Completed</th>
                            </tr>
                          </thead>
                          <tbody>
                            {participants.map((participant, index) => (
                              <tr key={participant.user_id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{participant.full_name}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{participant.email}</td>
                                <td className="py-3 px-4 font-medium">{participant.score}</td>
                                <td className="py-3 px-4">
                                  <Badge variant={participant.completed ? "default" : "secondary"}>
                                    {participant.completed ? (
                                      <><CheckCircle className="w-3 h-3 mr-1" />Completed</>
                                    ) : (
                                      <><XCircle className="w-3 h-3 mr-1" />Incomplete</>
                                    )}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {formatDate(participant.created_at)}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {participant.completed_at ? formatDate(participant.completed_at) : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {weeklyQuizzes.length === 0 && !isLoading && (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Weekly Quizzes Found</h3>
              <p className="text-gray-600">Create your first weekly quiz to start tracking attendance.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default WeeklyAttendance;
