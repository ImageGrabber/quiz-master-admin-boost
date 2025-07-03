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
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Recent Attempts</h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Quiz Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : attempts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No attempts found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 border-b text-left">Quiz</th>
                      <th className="px-4 py-2 border-b text-left">Score</th>
                      <th className="px-4 py-2 border-b text-left">Correct</th>
                      <th className="px-4 py-2 border-b text-left">Wrong</th>
                      <th className="px-4 py-2 border-b text-left">Time Used</th>
                      <th className="px-4 py-2 border-b text-left">Date Attempted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attempts.map((a) => {
                      const { correct, wrong } = getCorrectWrong(a.answers);
                      return (
                        <tr key={a.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{a.quizzes?.title || 'Quiz'}</td>
                          <td className="px-4 py-2 font-semibold">{a.score}</td>
                          <td className="px-4 py-2 text-green-700">{correct}</td>
                          <td className="px-4 py-2 text-red-700">{wrong}</td>
                          <td className="px-4 py-2">{formatTime(a.seconds_used)}</td>
                          <td className="px-4 py-2">{new Date(a.created_at).toLocaleString()}</td>
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
    </DashboardLayout>
  );
} 