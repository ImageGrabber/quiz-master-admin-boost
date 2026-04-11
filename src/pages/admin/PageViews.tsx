import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Activity,
  Bot,
  Eye,
  Globe,
  MapPin,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

type TimeRange = "24h" | "7d" | "30d" | "all";
type TrafficViewMode = "real" | "all" | "bot";

interface PageViewRecord {
  id: string;
  page: string;
  ip_address: unknown | null;
  viewed_at: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  is_bot: boolean | null;
  bot_score: number | null;
  browser: string | null;
  device_type: string | null;
  user_agent: string | null;
}

interface VisitorSummary {
  ip: string;
  visits: number;
  botVisits: number;
  realVisits: number;
  location: string;
  lastSeen: string | null;
}

const BOT_COLORS = ["#ef4444", "#22c55e"];
const KNOWN_CRAWLER_IP_PREFIXES = [
  "66.249.",
  "64.233.173.",
  "72.14.199.",
  "74.125.",
  "157.55.",
  "40.77.",
];
const EXCLUDED_VISITOR_IPS = new Set(["99.227.50.157"]);
const CRAWLER_USER_AGENT_PATTERN = /googlebot|bingbot|slurp|duckduckbot|yandexbot|baiduspider|applebot|crawler|spider|bot/i;

function getSinceDate(range: TimeRange): Date | null {
  const now = new Date();

  if (range === "24h") {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  if (range === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  if (range === "30d") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  return null;
}

function toIpString(value: unknown): string {
  if (typeof value === "string" && value.trim().length > 0) {
    const normalized = normalizeIpAddress(value);
    return normalized ?? "Unknown";
  }

  return "Unknown";
}

function normalizeIpAddress(ipAddress: string | null): string | null {
  if (!ipAddress) return null;
  const trimmed = ipAddress.trim();
  if (!trimmed) return null;

  const withoutMask = trimmed.includes("/") ? trimmed.split("/")[0] : trimmed;
  if (withoutMask.startsWith("::ffff:")) {
    return withoutMask.replace("::ffff:", "");
  }

  return withoutMask;
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

function getEffectiveBotScore(row: PageViewRecord): number {
  const baseScore = row.bot_score ?? 0;
  const ip = toIpString(row.ip_address);
  if (isKnownCrawlerIp(ip)) return Math.max(baseScore, 85);
  if (row.user_agent && CRAWLER_USER_AGENT_PATTERN.test(row.user_agent)) return Math.max(baseScore, 80);
  return baseScore;
}

function toLocationLabel(row: Pick<PageViewRecord, "city" | "region" | "country">): string {
  const parts = [row.city, row.region, row.country].filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );

  return parts.length > 0 ? parts.join(", ") : "Unknown";
}

function formatDateTime(value: string | null): string {
  if (!value) return "Unknown";

  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDayLabel(value: string): string {
  const parsed = new Date(`${value}T00:00:00`);
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

async function lookupLocationFromIpWhoIs(ipAddress: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipwho.is/${ipAddress}`);
    if (!response.ok) return null;

    const payload = (await response.json()) as Record<string, unknown>;
    if (payload.success === false) return null;

    const city = typeof payload.city === "string" && payload.city.trim() ? payload.city.trim() : null;
    const region = typeof payload.region === "string" && payload.region.trim() ? payload.region.trim() : null;
    const country = typeof payload.country === "string" && payload.country.trim() ? payload.country.trim() : null;
    const parts = [city, region, country].filter((part): part is string => Boolean(part));
    return parts.length > 0 ? parts.join(", ") : null;
  } catch {
    return null;
  }
}

export default function PageViews() {
  const [records, setRecords] = useState<PageViewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [trafficViewMode, setTrafficViewMode] = useState<TrafficViewMode>("real");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedLocations, setResolvedLocations] = useState<Record<string, string>>({});

  const fetchViews = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const since = getSinceDate(timeRange);
      let query = supabase
        .from("page_views")
        .select("id, page, ip_address, viewed_at, country, region, city, is_bot, bot_score, browser, device_type, user_agent")
        .neq("page", "")
        .order("viewed_at", { ascending: false })
        .limit(5000);

      if (since) {
        query = query.gte("viewed_at", since.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setRecords((data ?? []) as PageViewRecord[]);
    } catch (error) {
      console.error("Failed to fetch traffic insights:", error);
      setErrorMessage("Could not load traffic analytics. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchViews();
  }, [fetchViews]);

  const visibleRecords = useMemo(() => {
    const filtered = records.filter((row) => {
      const ip = toIpString(row.ip_address);
      return !EXCLUDED_VISITOR_IPS.has(ip);
    });

    if (trafficViewMode === "all") return filtered;
    if (trafficViewMode === "bot") return filtered.filter((row) => isLikelyBotRecord(row));
    return filtered.filter((row) => !isLikelyBotRecord(row));
  }, [records, trafficViewMode]);

  useEffect(() => {
    const unknownIps = Array.from(
      new Set(
        visibleRecords
          .filter((row) => toLocationLabel(row) === "Unknown")
          .map((row) => toIpString(row.ip_address))
          .filter((ip) => ip !== "Unknown" && !EXCLUDED_VISITOR_IPS.has(ip)),
      ),
    )
      .filter((ip) => !resolvedLocations[ip])
      .slice(0, 15);

    if (unknownIps.length === 0) return;

    let cancelled = false;

    (async () => {
      const updates: Record<string, string> = {};

      await Promise.all(
        unknownIps.map(async (ip) => {
          const location = await lookupLocationFromIpWhoIs(ip);
          if (location) {
            updates[ip] = location;
          }
        }),
      );

      if (!cancelled && Object.keys(updates).length > 0) {
        setResolvedLocations((prev) => ({ ...prev, ...updates }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [visibleRecords, resolvedLocations]);

  const stats = useMemo(() => {
    const totalVisits = visibleRecords.length;
    const botVisits = visibleRecords.filter((row) => isLikelyBotRecord(row)).length;
    const realVisits = totalVisits - botVisits;

    const uniqueVisitorSet = new Set<string>();
    const uniqueCountries = new Set<string>();

    for (const row of visibleRecords) {
      const ip = toIpString(row.ip_address);
      uniqueVisitorSet.add(ip === "Unknown" ? `unknown:${row.id}` : ip);

      if (row.country && row.country.trim()) {
        uniqueCountries.add(row.country.trim());
      }
    }

    return {
      totalVisits,
      botVisits,
      realVisits,
      uniqueVisitors: uniqueVisitorSet.size,
      botRate: totalVisits > 0 ? (botVisits / totalVisits) * 100 : 0,
      uniqueCountries: uniqueCountries.size,
    };
  }, [visibleRecords]);

  const todayVisits = useMemo(() => {
    const today = new Date().toLocaleDateString("en-CA");
    return visibleRecords.filter((row) => {
      if (!row.viewed_at) return false;
      const viewedDate = new Date(row.viewed_at).toLocaleDateString("en-CA");
      return viewedDate === today;
    }).length;
  }, [visibleRecords]);

  const todayUniqueVisitors = useMemo(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const visitorSet = new Set<string>();

    for (const row of visibleRecords) {
      if (!row.viewed_at) continue;
      const viewedDate = new Date(row.viewed_at).toLocaleDateString("en-CA");
      if (viewedDate !== today) continue;

      const ip = toIpString(row.ip_address);
      visitorSet.add(ip === "Unknown" ? `unknown:${row.id}` : ip);
    }

    return visitorSet.size;
  }, [visibleRecords]);

  const trafficTrend = useMemo(() => {
    const byDay = new Map<string, { day: string; total: number; bots: number; real: number }>();

    for (const row of visibleRecords) {
      if (!row.viewed_at) continue;

      const day = row.viewed_at.slice(0, 10);
      if (!byDay.has(day)) {
        byDay.set(day, { day, total: 0, bots: 0, real: 0 });
      }

      const bucket = byDay.get(day)!;
      bucket.total += 1;
      if (isLikelyBotRecord(row)) {
        bucket.bots += 1;
      } else {
        bucket.real += 1;
      }
    }

    return Array.from(byDay.values())
      .sort((a, b) => a.day.localeCompare(b.day))
      .slice(-14)
      .map((item) => ({
        ...item,
        label: formatDayLabel(item.day),
      }));
  }, [visibleRecords]);

  const botSplitData = useMemo(() => {
    return [
      { name: "Likely Bot", value: stats.botVisits },
      { name: "Likely Real", value: stats.realVisits },
    ].filter((entry) => entry.value > 0);
  }, [stats.botVisits, stats.realVisits]);

  const topCountries = useMemo(() => {
    const countryMap = new Map<string, number>();

    for (const row of visibleRecords) {
      const country = row.country?.trim() || "Unknown";
      countryMap.set(country, (countryMap.get(country) ?? 0) + 1);
    }

    return Array.from(countryMap.entries())
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 8);
  }, [visibleRecords]);

  const topPages = useMemo(() => {
    const pageMap = new Map<string, number>();

    for (const row of visibleRecords) {
      const page = row.page || "(empty)";
      pageMap.set(page, (pageMap.get(page) ?? 0) + 1);
    }

    return Array.from(pageMap.entries())
      .map(([page, visits]) => ({ page, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
  }, [visibleRecords]);

  const topVisitors = useMemo(() => {
    const visitorMap = new Map<string, VisitorSummary>();

    for (const row of visibleRecords) {
      const ip = toIpString(row.ip_address);
      const existing = visitorMap.get(ip);
      const isBot = isLikelyBotRecord(row);

      if (!existing) {
        visitorMap.set(ip, {
          ip,
          visits: 1,
          botVisits: isBot ? 1 : 0,
          realVisits: isBot ? 0 : 1,
          location: toLocationLabel(row),
          lastSeen: row.viewed_at,
        });
      } else {
        existing.visits += 1;
        if (isBot) {
          existing.botVisits += 1;
        } else {
          existing.realVisits += 1;
        }
        const candidateLocation = toLocationLabel(row);
        if (existing.location === "Unknown" && candidateLocation !== "Unknown") {
          existing.location = candidateLocation;
        }

        if (!existing.lastSeen || (row.viewed_at && row.viewed_at > existing.lastSeen)) {
          existing.lastSeen = row.viewed_at;
        }
      }
    }

    return Array.from(visitorMap.values())
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 20);
  }, [visibleRecords]);

  const recentVisits = useMemo(() => visibleRecords.slice(0, 60), [visibleRecords]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Traffic Insights</h1>
            <p className="text-gray-600 mt-1">
              See who is visiting the site, where they are from, and whether traffic looks real or bot-like.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={trafficViewMode} onValueChange={(value: TrafficViewMode) => setTrafficViewMode(value)}>
              <SelectTrigger className="w-[170px] bg-white">
                <SelectValue placeholder="Traffic Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real">Real visitors only</SelectItem>
                <SelectItem value="all">All traffic</SelectItem>
                <SelectItem value="bot">Bots only</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-[140px] bg-white">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchViews} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-xl border bg-white min-h-[280px]">
            <div className="text-center text-gray-600">
              <Activity className="w-10 h-10 mx-auto mb-2 animate-pulse text-blue-600" />
              Loading traffic analytics...
            </div>
          </div>
        ) : errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{errorMessage}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Visits</p>
                      <p className="text-2xl font-bold text-gray-900">{todayVisits.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">for today</p>
                    </div>
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Unique Visitors (IP)</p>
                      <p className="text-2xl font-bold text-gray-900">{todayUniqueVisitors.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">for today</p>
                    </div>
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Likely Bot Visits</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.botVisits.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{stats.botRate.toFixed(1)}% of all traffic</p>
                    </div>
                    <Bot className="h-6 w-6 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Countries</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.uniqueCountries.toLocaleString()}</p>
                    </div>
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Traffic Trend</CardTitle>
                  <CardDescription>Daily visits split by likely real vs likely bot traffic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trafficTrend}>
                        <defs>
                          <linearGradient id="totalTrafficFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="label" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="total" name="Total" stroke="#2563eb" fill="url(#totalTrafficFill)" strokeWidth={2} />
                        <Area type="monotone" dataKey="real" name="Likely Real" stroke="#16a34a" fill="transparent" strokeWidth={2} />
                        <Area type="monotone" dataKey="bots" name="Likely Bot" stroke="#ef4444" fill="transparent" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Traffic Quality Split</CardTitle>
                  <CardDescription>Heuristic bot detection based on user-agent and browser signals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={botSplitData}
                          cx="50%"
                          cy="50%"
                          outerRadius={95}
                          dataKey="value"
                          nameKey="name"
                          label
                        >
                          {botSplitData.map((entry, index) => (
                            <Cell key={`${entry.name}-${index}`} fill={BOT_COLORS[index % BOT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Where visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topCountries} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis type="category" dataKey="country" width={130} />
                        <Tooltip />
                        <Bar dataKey="visits" fill="#6366f1" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited routes in selected timeframe</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topPages}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="page" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={70} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="visits" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  Top Visitor IPs
                </CardTitle>
                <CardDescription>Highest-volume IP addresses with location and bot ratio</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Total Visits</TableHead>
                      <TableHead>Likely Real</TableHead>
                      <TableHead>Likely Bot</TableHead>
                      <TableHead>Last Seen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topVisitors.length > 0 ? (
                      topVisitors.map((visitor) => (
                        <TableRow key={visitor.ip}>
                          <TableCell className="font-mono text-xs">{visitor.ip}</TableCell>
                          <TableCell>{resolvedLocations[visitor.ip] ?? visitor.location}</TableCell>
                          <TableCell>{visitor.visits}</TableCell>
                          <TableCell>{visitor.realVisits}</TableCell>
                          <TableCell>{visitor.botVisits}</TableCell>
                          <TableCell>{formatDateTime(visitor.lastSeen)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No traffic data available yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  Recent Visits
                </CardTitle>
                <CardDescription>Latest requests with IP, location, and traffic classification</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Traffic Type</TableHead>
                      <TableHead>Device / Browser</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVisits.length > 0 ? (
                      recentVisits.map((row) => {
                        const location = toLocationLabel(row);
                        const ip = toIpString(row.ip_address);
                        const displayLocation = location === "Unknown" ? (resolvedLocations[ip] ?? "Unknown") : location;
                        const isBot = isLikelyBotRecord(row);
                        const trafficType = isBot ? "Likely Bot" : "Likely Real";

                        return (
                          <TableRow key={row.id}>
                            <TableCell>{formatDateTime(row.viewed_at)}</TableCell>
                            <TableCell className="font-mono text-xs">{row.page}</TableCell>
                            <TableCell className="font-mono text-xs">{ip}</TableCell>
                            <TableCell>{displayLocation}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge className={isBot ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                                  {trafficType}
                                </Badge>
                                <span className="text-xs text-gray-500">score {getEffectiveBotScore(row)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {(row.device_type || "Unknown")} / {(row.browser || "Unknown")}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No visits captured for this timeframe.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
