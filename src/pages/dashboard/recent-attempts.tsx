import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import DashboardLayout from "../../components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

interface Attempt {
  id: string;
  quiz_id: number;
  score: number;
  seconds_used: number;
  created_at: string;
  answers: any;
  quizzes: {
    title: string;
  };
}

export default function RecentAttempts() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAttempts() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAttempts([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('attempts')
        .select('id, quiz_id, score, seconds_used, created_at, answers, quizzes(title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setAttempts(data || []);
      setLoading(false);
    }
    fetchAttempts();
  }, []);

  function getCorrectWrong(answers: any) {
    if (!answers || !Array.isArray(answers)) return { correct: 0, wrong: 0 };
    let correct = 0, wrong = 0;
    for (const ans of answers) {
      if (ans.is_correct) correct++;
      else wrong++;
    }
    return { correct, wrong };
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen p-0 m-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 pt-10 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">Recent Attempts</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
        <div className="w-full px-2 md:px-8 pb-10">
          <Card className="w-full bg-white/80 shadow-2xl rounded-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6">
              <CardTitle className="text-white text-2xl font-bold tracking-tight">Your Quiz Attempts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-16 text-gray-500 text-lg">Loading...</div>
              ) : attempts.length === 0 ? (
                <div className="text-center py-16 text-gray-500 text-lg">No attempts found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm rounded-b-2xl overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-100 to-purple-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Quiz</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Score</th>
                        <th className="px-6 py-4 text-left font-semibold text-green-700">Correct</th>
                        <th className="px-6 py-4 text-left font-semibold text-red-700">Wrong</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Time Used</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Date Attempted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts.map((a, idx) => {
                        const { correct, wrong } = getCorrectWrong(a.answers);
                        return (
                          <tr
                            key={a.id}
                            className={`transition-all duration-200 ${idx % 2 === 0 ? 'bg-white/80' : 'bg-blue-50/60'} hover:bg-purple-50/80`}
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{a.quizzes?.title || 'Quiz'}</td>
                            <td className="px-6 py-4 font-bold text-lg text-purple-700 whitespace-nowrap">{a.score}</td>
                            <td className="px-6 py-4 text-green-700 font-semibold whitespace-nowrap">{correct}</td>
                            <td className="px-6 py-4 text-red-700 font-semibold whitespace-nowrap">{wrong}</td>
                            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{formatTime(a.seconds_used)}</td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(a.created_at).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 