import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  FileText,
  TrendingUp,
  Trophy,
  Eye,
  Brain,
  RefreshCw,
  Clock,
  BarChart3,
  Activity,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface ProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  plan: string | null;
  role: string | null;
  created_at: string | null;
}

interface AttemptRow {
  id: string | null;
  user_id: string | null;
  quiz_id: number | null;
  score: number | null;
  seconds_used: number | null;
  completed: boolean | null;
  created_at: string | null;
}

interface QuizRow {
  id: number;
  title: string;
}

interface PageViewStats {
  today: number;
  sevenDays: number;
  thirtyDays: number;
  mode: "real";
}

interface TrendPoint {
  date: string;
  label: string;
  attempts: number;
  avgScore: number;
  uniqueUsers: number;
  newUsers: number;
}

interface RecentActivity {
  id: string;
  userName: string;
  quizTitle: string;
  score: number;
  secondsUsed: number | null;
  timeAgo: string;
  createdAt: string;
}

interface LeaderboardRow {
  userId: string;
  userName: string;
  attempts: number;
  averageScore: number;
  bestScore: number;
  lastActive: string;
}

interface PageViewRecord {
  id: string;
  viewed_at: string | null;
  ip_address: unknown | null;
  is_bot: boolean | null;
  user_agent: string | null;
}

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4"];
const BATCH_SIZE = 1000;
const KNOWN_CRAWLER_IP_PREFIXES = ["66.249.", "64.233.173.", "72.14.199.", "74.125.", "157.55.", "40.77."];
const EXCLUDED_VISITOR_IPS = new Set(["99.227.50.157", "2607:fea8:339e:4b00:9dc9:92f5:de04:ccce"]);
const CRAWLER_USER_AGENT_PATTERN = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider|applebot|crawler|spider|bot/i;

function formatDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatDayLabel(dayKey: string): string {
  const parsed = new Date(`${dayKey}T00:00:00`);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatRelativeTime(dateIso: string): string {
  const created = new Date(dateIso);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function compactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function safeAverage(total: number, count: number): number {
  if (!count) return 0;
  return Number((total / count).toFixed(1));
}

function normalizePlanLabel(profile: ProfileRow): string {
  if (profile.role?.toLowerCase() === "admin") return "Admin";
  const raw = profile.plan?.trim();
  if (!raw) return "Free";
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function hasProfileIdentity(profile: ProfileRow | undefined): boolean {
  if (!profile) return false;
  return Boolean(profile.full_name?.trim() || profile.email?.trim());
}

function normalizeIpAddress(ipAddress: string | null): string | null {
  if (!ipAddress) return null;
  const trimmed = ipAddress.trim();
  if (!trimmed) return null;
  const withoutMask = trimmed.includes("/") ? trimmed.split("/")[0] : trimmed;
  if (withoutMask.startsWith("::ffff:")) return withoutMask.replace("::ffff:", "");
  return withoutMask;
}

function toIpString(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return normalizeIpAddress(value) ?? "Unknown";
  }
  return "Unknown";
}

function isKnownCrawlerIp(ipAddress: string): boolean {
  if (!ipAddress || ipAddress === "Unknown") return false;
  return KNOWN_CRAWLER_IP_PREFIXES.some((prefix) => ipAddress.startsWith(prefix));
}

function isLikelyBotRecord(row: PageViewRecord): boolean {
  const ip = toIpString(row.ip_address);
  if (isKnownCrawlerIp(ip)) return true;
  if (row.is_bot) return true;
  if (row.user_agent && CRAWLER_USER_AGENT_PATTERN.test(row.user_agent)) return true;
  return false;
}

function isSameLocalDay(dateIso: string, target: Date): boolean {
  const date = new Date(dateIso);
  return (
    date.getFullYear() === target.getFullYear() &&
    date.getMonth() === target.getMonth() &&
    date.getDate() === target.getDate()
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [quizzes, setQuizzes] = useState<QuizRow[]>([]);
  const [pageViewStats, setPageViewStats] = useState<PageViewStats>({ today: 0, sevenDays: 0, thirtyDays: 0, mode: "real" });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkAdminAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/auth/login");
      }
    }

    checkAdminAuth();
  }, [navigate]);

  const fetchAdminData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const fetchProfiles = async (): Promise<ProfileRow[]> => {
        let from = 0;
        const rows: ProfileRow[] = [];

        while (true) {
          const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, email, plan, role, created_at")
            .order("created_at", { ascending: false })
            .range(from, from + BATCH_SIZE - 1);

          if (error) throw error;
          const batch = (data ?? []) as ProfileRow[];
          rows.push(...batch);
          if (batch.length < BATCH_SIZE) break;
          from += BATCH_SIZE;
        }

        return rows;
      };

      const fetchAttempts = async (): Promise<AttemptRow[]> => {
        let from = 0;
        const rows: AttemptRow[] = [];

        while (true) {
          const { data, error } = await supabase
            .from("attempts")
            .select("id, user_id, quiz_id, score, seconds_used, completed, created_at")
            .order("created_at", { ascending: false })
            .range(from, from + BATCH_SIZE - 1);

          if (error) throw error;
          const batch = (data ?? []) as AttemptRow[];
          rows.push(...batch);
          if (batch.length < BATCH_SIZE) break;
          from += BATCH_SIZE;
        }

        return rows;
      };

      const fetchPageViews = async (): Promise<PageViewRecord[]> => {
        let from = 0;
        const rows: PageViewRecord[] = [];

        while (true) {
          const { data, error } = await supabase
            .from("page_views")
            .select("id, viewed_at, ip_address, is_bot, user_agent")
            .gte("viewed_at", thirtyDaysAgo)
            .order("viewed_at", { ascending: false })
            .range(from, from + BATCH_SIZE - 1);

          if (error) throw error;
          const batch = (data ?? []) as PageViewRecord[];
          rows.push(...batch);
          if (batch.length < BATCH_SIZE) break;
          from += BATCH_SIZE;
        }

        return rows;
      };

      const [profilesData, attemptsData, quizzesRes, pageViews] = await Promise.all([
        fetchProfiles(),
        fetchAttempts(),
        supabase.from("quizzes").select("id, title"),
        fetchPageViews(),
      ]);

      if (quizzesRes.error) throw quizzesRes.error;

      const filteredRealViews = pageViews.filter((row) => {
        const ip = toIpString(row.ip_address);
        if (EXCLUDED_VISITOR_IPS.has(ip)) return false;
        return !isLikelyBotRecord(row);
      });

      const today = new Date();
      const todayCount = filteredRealViews.filter((row) => row.viewed_at && isSameLocalDay(row.viewed_at, today)).length;
      const sevenDayCount = filteredRealViews.filter((row) => row.viewed_at && row.viewed_at >= sevenDaysAgo).length;
      const thirtyDayCount = filteredRealViews.length;

      setProfiles(profilesData);
      setAttempts(attemptsData);
      setQuizzes((quizzesRes.data ?? []) as QuizRow[]);
      setPageViewStats({
        today: todayCount,
        sevenDays: sevenDayCount,
        thirtyDays: thirtyDayCount,
        mode: "real",
      });
    } catch (error) {
      console.error("Failed to fetch admin dashboard data:", error);
      setErrorMessage("Could not load full dashboard analytics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const profileMap = useMemo(() => {
    const map = new Map<string, ProfileRow>();
    profiles.forEach((profile) => map.set(profile.id, profile));
    return map;
  }, [profiles]);

  const quizMap = useMemo(() => {
    const map = new Map<number, QuizRow>();
    quizzes.forEach((quiz) => map.set(quiz.id, quiz));
    return map;
  }, [quizzes]);

  const validAttempts = useMemo(() => {
    return attempts.filter(
      (attempt) => typeof attempt.score === "number" && Number.isFinite(attempt.score) && Boolean(attempt.created_at),
    );
  }, [attempts]);

  const analyticsAttempts = useMemo(() => {
    return validAttempts.filter((attempt) => {
      const isCompleted = attempt.completed === true || (attempt.score ?? 0) > 0;
      if (!isCompleted) return false;
      if (!attempt.user_id) return false;
      return hasProfileIdentity(profileMap.get(attempt.user_id));
    });
  }, [validAttempts, profileMap]);

  const coreStats = useMemo(() => {
    const now = new Date();
    const todayStart = startOfLocalDay(now);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const totalUsers = profiles.length;
    const totalAttempts = analyticsAttempts.length;
    const totalScore = analyticsAttempts.reduce((sum, attempt) => sum + (attempt.score ?? 0), 0);
    const averageScore = safeAverage(totalScore, totalAttempts);
    const highestScore = analyticsAttempts.length ? Math.max(...analyticsAttempts.map((attempt) => attempt.score ?? 0)) : 0;

    let attemptsToday = 0;
    let attemptsLast7 = 0;
    let attemptsPrev7 = 0;
    const activeUsers7 = new Set<string>();

    analyticsAttempts.forEach((attempt) => {
      const created = new Date(attempt.created_at as string);

      if (created >= todayStart) attemptsToday += 1;
      if (created >= sevenDaysAgo) {
        attemptsLast7 += 1;
        if (attempt.user_id) activeUsers7.add(attempt.user_id);
      } else if (created >= fourteenDaysAgo && created < sevenDaysAgo) {
        attemptsPrev7 += 1;
      }
    });

    const attemptsGrowth = attemptsPrev7 > 0 ? ((attemptsLast7 - attemptsPrev7) / attemptsPrev7) * 100 : attemptsLast7 > 0 ? 100 : 0;

    return {
      totalUsers,
      totalAttempts,
      averageScore,
      highestScore,
      attemptsToday,
      attemptsLast7,
      attemptsGrowth,
      activeUsers7: activeUsers7.size,
      pageViewsToday: pageViewStats.today,
      pageViews7: pageViewStats.sevenDays,
      pageViews30: pageViewStats.thirtyDays,
    };
  }, [profiles.length, analyticsAttempts, pageViewStats]);

  const attemptsTrend = useMemo<TrendPoint[]>(() => {
    const points = new Map<
      string,
      { date: string; label: string; attempts: number; totalScore: number; users: Set<string>; newUsers: number }
    >();

    const now = new Date();
    const days = 30;

    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const key = formatDayKey(date);
      points.set(key, {
        date: key,
        label: formatDayLabel(key),
        attempts: 0,
        totalScore: 0,
        users: new Set<string>(),
        newUsers: 0,
      });
    }

    analyticsAttempts.forEach((attempt) => {
      const key = formatDayKey(new Date(attempt.created_at as string));
      const bucket = points.get(key);
      if (!bucket) return;

      bucket.attempts += 1;
      bucket.totalScore += attempt.score ?? 0;
      if (attempt.user_id) bucket.users.add(attempt.user_id);
    });

    profiles.forEach((profile) => {
      if (!profile.created_at) return;
      const key = formatDayKey(new Date(profile.created_at));
      const bucket = points.get(key);
      if (bucket) bucket.newUsers += 1;
    });

    return Array.from(points.values()).map((point) => ({
      date: point.date,
      label: point.label,
      attempts: point.attempts,
      avgScore: safeAverage(point.totalScore, point.attempts),
      uniqueUsers: point.users.size,
      newUsers: point.newUsers,
    }));
  }, [analyticsAttempts, profiles]);

  const scoreDistribution = useMemo(() => {
    const ranges = [
      { label: "0-49", min: 0, max: 49 },
      { label: "50-59", min: 50, max: 59 },
      { label: "60-69", min: 60, max: 69 },
      { label: "70-79", min: 70, max: 79 },
      { label: "80-89", min: 80, max: 89 },
      { label: "90-100", min: 90, max: 100 },
    ];

    return ranges.map((range) => {
      const count = analyticsAttempts.filter((attempt) => {
        const score = attempt.score ?? 0;
        return score >= range.min && score <= range.max;
      }).length;

      return { range: range.label, count };
    });
  }, [analyticsAttempts]);

  const topQuizzes = useMemo(() => {
    const quizStats = new Map<number, { attempts: number; totalScore: number }>();

    analyticsAttempts.forEach((attempt) => {
      if (!attempt.quiz_id) return;
      const existing = quizStats.get(attempt.quiz_id) ?? { attempts: 0, totalScore: 0 };
      existing.attempts += 1;
      existing.totalScore += attempt.score ?? 0;
      quizStats.set(attempt.quiz_id, existing);
    });

    return Array.from(quizStats.entries())
      .map(([quizId, stat]) => {
        const title = quizMap.get(quizId)?.title ?? `Quiz #${quizId}`;
        return {
          title: title.length > 24 ? `${title.slice(0, 24)}...` : title,
          attempts: stat.attempts,
          avgScore: safeAverage(stat.totalScore, stat.attempts),
        };
      })
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 8);
  }, [analyticsAttempts, quizMap]);

  const planDistribution = useMemo(() => {
    const planCount = new Map<string, number>();

    profiles.forEach((profile) => {
      const label = normalizePlanLabel(profile);
      planCount.set(label, (planCount.get(label) ?? 0) + 1);
    });

    return Array.from(planCount.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [profiles]);

  const attemptsByHour = useMemo(() => {
    const buckets = Array.from({ length: 24 }, (_, hour) => ({ label: `${String(hour).padStart(2, "0")}:00`, attempts: 0 }));

    analyticsAttempts.forEach((attempt) => {
      const created = new Date(attempt.created_at as string);
      const hour = created.getHours();
      if (buckets[hour]) buckets[hour].attempts += 1;
    });

    return buckets;
  }, [analyticsAttempts]);

  const recentActivity = useMemo<RecentActivity[]>(() => {
    return [...analyticsAttempts]
      .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
      .slice(0, 8)
      .map((attempt) => {
        const profile = attempt.user_id ? profileMap.get(attempt.user_id) : null;
        const userName = profile?.full_name?.trim() || profile?.email?.trim() || "Unknown user";

        return {
          id: attempt.id ?? `${attempt.user_id ?? "user"}-${attempt.created_at ?? Date.now()}`,
          userName,
          quizTitle: attempt.quiz_id ? quizMap.get(attempt.quiz_id)?.title ?? `Quiz #${attempt.quiz_id}` : "Unknown quiz",
          score: attempt.score ?? 0,
          secondsUsed: attempt.seconds_used,
          timeAgo: attempt.created_at ? formatRelativeTime(attempt.created_at) : "Unknown",
          createdAt: attempt.created_at ?? "",
        };
      });
  }, [analyticsAttempts, profileMap, quizMap]);

  const topPerformers = useMemo<LeaderboardRow[]>(() => {
    const byUser = new Map<string, { attempts: number; total: number; best: number; lastActive: string }>();

    analyticsAttempts.forEach((attempt) => {
      if (!attempt.user_id) return;

      const existing = byUser.get(attempt.user_id) ?? {
        attempts: 0,
        total: 0,
        best: 0,
        lastActive: attempt.created_at ?? "",
      };

      existing.attempts += 1;
      existing.total += attempt.score ?? 0;
      existing.best = Math.max(existing.best, attempt.score ?? 0);
      if ((attempt.created_at ?? "") > existing.lastActive) {
        existing.lastActive = attempt.created_at ?? "";
      }

      byUser.set(attempt.user_id, existing);
    });

    return Array.from(byUser.entries())
      .map(([userId, stat]) => {
        const profile = profileMap.get(userId);
        const userName = profile?.full_name?.trim() || profile?.email?.trim() || "Unknown user";

        return {
          userId,
          userName,
          attempts: stat.attempts,
          averageScore: safeAverage(stat.total, stat.attempts),
          bestScore: stat.best,
          lastActive: stat.lastActive,
        };
      })
      .sort((a, b) => {
        if (b.averageScore !== a.averageScore) return b.averageScore - a.averageScore;
        return b.attempts - a.attempts;
      })
      .slice(0, 10);
  }, [analyticsAttempts, profileMap]);

  const statCards = [
    {
      title: "Total Users",
      value: coreStats.totalUsers.toLocaleString(),
      subtitle: `${compactNumber(coreStats.activeUsers7)} active in 7d`,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      onClick: () => navigate("/admin/users"),
    },
    {
      title: "Total Attempts",
      value: coreStats.totalAttempts.toLocaleString(),
      subtitle: `${coreStats.attemptsToday.toLocaleString()} today`,
      icon: FileText,
      color: "from-indigo-500 to-blue-600",
      onClick: () => navigate("/admin/attempts"),
    },
    {
      title: "Average Score",
      value: coreStats.averageScore.toFixed(1),
      subtitle: `${coreStats.highestScore.toFixed(0)} highest`,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Attempt Growth (7d)",
      value: `${coreStats.attemptsGrowth >= 0 ? "+" : ""}${coreStats.attemptsGrowth.toFixed(1)}%`,
      subtitle: `${coreStats.attemptsLast7} vs previous week`,
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Page Views (Today)",
      value: coreStats.pageViewsToday.toLocaleString(),
      subtitle: `${coreStats.pageViews7.toLocaleString()} real visits in last 7d`,
      icon: Eye,
      color: "from-rose-500 to-pink-500",
      onClick: () => navigate("/admin/page-views"),
    },
    {
      title: "Page Views (30d)",
      value: coreStats.pageViews30.toLocaleString(),
      subtitle: "Real visitors only",
      icon: Activity,
      color: "from-purple-500 to-indigo-600",
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[420px]">
          <div className="text-center">
            <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading detailed admin analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Detailed operational analytics for users, quizzes, scores, and traffic.</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={fetchAdminData}>
            <RefreshCw className="w-4 h-4" />
            Refresh Analytics
          </Button>
        </div>

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {statCards.map((card) => (
            <Card
              key={card.title}
              className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white"
              onClick={card.onClick}
              role={card.onClick ? "button" : undefined}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-2">{card.subtitle}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-sm`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Attempts & Score Trend (30 Days)</CardTitle>
              <CardDescription>Daily attempts with average score and new-user overlay.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={attemptsTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" />
                    <YAxis yAxisId="left" allowDecimals={false} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="attempts" name="Attempts" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score" stroke="#16a34a" strokeWidth={2} dot={false} />
                    <Line yAxisId="left" type="monotone" dataKey="newUsers" name="New Users" stroke="#a855f7" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>How quiz scores are spread across all attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="range" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Top Quizzes By Attempts</CardTitle>
              <CardDescription>Most played quizzes and their average score.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topQuizzes} layout="vertical" margin={{ left: 12, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="title" width={160} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attempts" name="Attempts" fill="#6366f1" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>User Plan Distribution</CardTitle>
              <CardDescription>Breakdown by plan/role from profile records.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={planDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {planDistribution.map((entry, index) => (
                        <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Attempts By Hour</CardTitle>
              <CardDescription>Hourly activity pattern (local time) across all recorded attempts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attemptsByHour}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" interval={1} tick={{ fontSize: 10 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="attempts" fill="#14b8a6" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest user quiz completions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((item) => (
                    <div key={item.id} className="rounded-lg border bg-slate-50/70 px-3 py-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{item.userName}</p>
                        <p className="text-sm text-slate-600">{item.quizTitle}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.timeAgo}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700">{item.score} pts</Badge>
                        <p className="text-xs text-slate-500 mt-1">{item.secondsUsed ? `${item.secondsUsed}s` : "time n/a"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No recent activity available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                Top Performers
              </CardTitle>
              <CardDescription>Users ranked by average score with attempt volume context.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Avg</TableHead>
                    <TableHead>Best</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.length > 0 ? (
                    topPerformers.map((row) => (
                      <TableRow key={row.userId}>
                        <TableCell className="font-medium text-slate-900">{row.userName}</TableCell>
                        <TableCell>{row.attempts}</TableCell>
                        <TableCell>{row.averageScore.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-100 text-emerald-700">{row.bestScore}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                        No leaderboard data yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
