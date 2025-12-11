
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Brain, Trophy, Flame, Target, TrendingUp, BookOpen, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, format, subMonths, startOfWeek, addDays, isSameDay, subDays, differenceInDays } from "date-fns";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalQuizzes: 0,
        avgScore: 0,
        streak: 0,
        ranking: "N/A"
    });

    const [performanceData, setPerformanceData] = useState<any[]>([]);
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [topicData, setTopicData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            console.log("Fetching dashboard data for:", user.id);

            // Fetch all COMPLETED attempts for the user
            const { data: attempts, error: attemptsError } = await supabase
                .from('attempts')
                .select('*')
                .eq('user_id', user.id)
                .eq('completed', true)
                .order('created_at', { ascending: true });

            if (attemptsError) {
                console.error("Error fetching attempts:", attemptsError);
                throw attemptsError;
            }

            console.log("Attempts found:", attempts?.length);

            if (!attempts || attempts.length === 0) {
                setStats({
                    totalQuizzes: 0,
                    avgScore: 0,
                    streak: 0,
                    ranking: "N/A"
                });
                setPerformanceData([]);
                setWeeklyData([]);
                setTopicData([]);
                setLoading(false);
                return;
            }

            // Fetch quizzes lookup map
            const quizIds = [...new Set(attempts.map(a => a.quiz_id))];
            const { data: quizzesData, error: quizzesError } = await supabase
                .from('quizzes')
                .select('id, title')
                .in('id', quizIds);

            if (quizzesError) console.error("Error fetching quizzes for lookup:", quizzesError);

            const quizzesMap = (quizzesData || []).reduce((acc, q) => {
                acc[q.id] = q;
                return acc;
            }, {} as Record<number, any>);

            // Attach quiz data to attempts manually
            const attemptsWithQuiz = attempts.map(a => ({
                ...a,
                quizzes: a.quiz_id ? quizzesMap[a.quiz_id] : null
            }));

            // --- 1. Basic Stats ---
            const totalQuizzes = attempts.length;
            const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
            const avgScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

            // Calculate Streak
            const sortedAttempts = [...attempts].sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime());

            const uniqueDates = Array.from(new Set(
                sortedAttempts.map(a => format(new Date(a.created_at!), 'yyyy-MM-dd'))
            )).sort(); // Ascending dates for easier iteration

            let currentStreak = 0;
            const today = new Date();
            const todayStr = format(today, 'yyyy-MM-dd');
            const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');

            // Check if there was an attempt today or yesterday
            let lastAttemptDay = null;
            if (uniqueDates.includes(todayStr)) {
                lastAttemptDay = today;
            } else if (uniqueDates.includes(yesterdayStr)) {
                lastAttemptDay = subDays(today, 1);
            }

            if (lastAttemptDay) {
                currentStreak = 1;
                let checkDate = subDays(lastAttemptDay, 1);
                for (let i = uniqueDates.length - 1; i >= 0; i--) {
                    const attemptDate = new Date(uniqueDates[i]);
                    if (isSameDay(attemptDate, lastAttemptDay)) {
                        continue;
                    }
                    if (isSameDay(attemptDate, checkDate)) {
                        currentStreak++;
                        checkDate = subDays(checkDate, 1);
                    } else if (attemptDate < checkDate) {
                        break;
                    }
                }
            }

            setStats({
                totalQuizzes,
                avgScore,
                streak: currentStreak,
                ranking: "Top 20%" // Placeholder until leaderboard logic exists
            });

            // --- 2. Performance Data (Last 6 Months) ---
            const monthlyStats: Record<string, { total: number, count: number }> = {};
            const sixMonthsAgo = subMonths(new Date(), 5); // Start of the 6-month period

            // Initialize last 6 months
            for (let i = 5; i >= 0; i--) {
                const d = subMonths(new Date(), i);
                const key = format(d, 'MMM');
                monthlyStats[key] = { total: 0, count: 0 };
            }

            attempts.forEach(a => {
                const attemptDate = new Date(a.created_at!);
                if (attemptDate >= sixMonthsAgo) { // Only consider attempts within the last 6 months
                    const month = format(attemptDate, 'MMM');
                    if (monthlyStats[month]) { // Ensure month is one of the 6 we're tracking
                        monthlyStats[month].total += a.score;
                        monthlyStats[month].count += 1;
                    }
                }
            });

            const perfChartData = Object.keys(monthlyStats).map(key => ({
                month: key,
                score: monthlyStats[key].count ? Math.round(monthlyStats[key].total / monthlyStats[key].count) : 0
            }));
            setPerformanceData(perfChartData);

            // --- 3. Weekly Data ---
            const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
            const weekDays = Array.from({ length: 7 }).map((_, i) => format(addDays(weekStart, i), 'EEE'));

            const weeklyCounts: Record<string, number> = {};
            weekDays.forEach(d => weeklyCounts[d] = 0);

            attempts.forEach(a => {
                const attemptDate = new Date(a.created_at!);
                if (attemptDate >= weekStart && attemptDate <= today) { // Only count if it's in the current week up to today
                    const day = format(attemptDate, 'EEE');
                    if (weeklyCounts[day] !== undefined) weeklyCounts[day]++;
                }
            });

            setWeeklyData(weekDays.map(day => ({ day, quizzes: weeklyCounts[day] })));

            // --- 4. Topic Data ---
            const topicCounts: Record<string, number> = {};
            attemptsWithQuiz.forEach(a => {
                const title = a.quizzes?.title || "Unknown";
                let category = "General";

                // Simple heuristic categorization
                if (title.match(/Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi/i)) {
                    category = "Old Testament";
                } else if (title.match(/Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation/i)) {
                    category = "New Testament";
                } else if (title.match(/Prophecy|Apocalypse|End Times/i)) {
                    category = "Prophecy";
                } else if (title.match(/Gospels|Life of Christ/i)) {
                    category = "Gospels";
                }

                topicCounts[category] = (topicCounts[category] || 0) + 1;
            });

            const pieData = Object.keys(topicCounts).map(key => ({
                name: key,
                value: topicCounts[key]
            }));
            setTopicData(pieData);

            setLoading(false);

        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-slate-400 animate-pulse">Loading stats...</div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            title="Dashboard"
            subtitle="Welcome back! Here's your learning overview."
        >
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Total Quizzes</CardTitle>
                            <Brain className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.totalQuizzes}</div>
                            <p className="text-xs text-slate-500 mt-1">Lifetime attempts</p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Average Score</CardTitle>
                            <Target className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.avgScore}%</div>
                            <p className="text-xs text-slate-500 mt-1">Overall performance</p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Current Streak</CardTitle>
                            <Flame className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.streak} Days</div>
                            <p className="text-xs text-slate-500 mt-1">Consistency is key!</p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">Ranking</CardTitle>
                            <Trophy className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{stats.ranking}</div>
                            <p className="text-xs text-slate-500 mt-1">Keep competing!</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Performance Trend */}
                    <Card className="col-span-1 border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Performance History
                            </CardTitle>
                            <CardDescription>Average score trends over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#1e293b' }}
                                        />
                                        <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Activity */}
                    <Card className="col-span-1 border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-600" />
                                Weekly Activity
                            </CardTitle>
                            <CardDescription>Number of quizzes completed this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            cursor={{ fill: '#f1f5f9' }}
                                        />
                                        <Bar dataKey="quizzes" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                </div>



            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
