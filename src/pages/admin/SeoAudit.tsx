import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  FileText,
  FilterX,
  RefreshCw,
  Search,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

type SeoQuality = "good" | "fair" | "poor";
type IndexingStatus = "likely-indexed" | "crawled" | "no-signal";
type WordRangeFilter = "all" | "in-range" | "out-of-range";
type SortDirection = "asc" | "desc";
type SortColumn = "path" | "title" | "wordCount" | "seoScore" | "seoQuality" | "indexingStatus" | "googleBotHits" | "organicGoogleVisits" | "totalVisits";

interface SeoAuditPage {
  path: string;
  title: string;
  description: string;
  wordCount: number;
  titleLength: number;
  descriptionLength: number;
  hasH1: boolean;
  seoScore: number;
  seoQuality: SeoQuality;
}

interface SeoAuditSummary {
  totalPages: number;
  good: number;
  fair: number;
  poor: number;
  averageWords: number;
  averageSeoScore: number;
}

interface SeoAuditManifest {
  generatedAt: string;
  source: string;
  summary: SeoAuditSummary;
  pages: SeoAuditPage[];
}

interface PageViewSignalRow {
  page: string;
  referrer: string | null;
  user_agent: string | null;
  viewed_at: string | null;
}

interface GooglePageSignal {
  googleBotHits: number;
  organicGoogleVisits: number;
  totalVisits: number;
  lastSeen: string | null;
}

interface SeoPageRow extends SeoAuditPage {
  indexingStatus: IndexingStatus;
  googleBotHits: number;
  organicGoogleVisits: number;
  totalVisits: number;
  gscCoverageState: string | null;
  gscLastCrawlTime: string | null;
  gscPageFetchState: string | null;
  gscVerdict: string | null;
  indexingSource: "gsc" | "traffic-signals";
}

interface GscInspectionResult {
  ok: boolean;
  verdict?: string;
  coverageState?: string;
  indexingState?: string;
  pageFetchState?: string;
  lastCrawlTime?: string;
  error?: string;
}

interface GscInvokeResponse {
  data: GscInspectionResult | null;
  error: unknown;
}

const GOOGLE_BOT_PATTERN = /googlebot|adsbot-google|googleother/i;
const DEFAULT_PAGE_SIZE = 50;

function toAbsoluteInspectionUrl(path: string, baseUrl: string): string {
  const normalizedPath = normalizePath(path);
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase}${normalizedPath === "/" ? "/" : normalizedPath}`;
}

function mapGscToIndexingStatus(result: GscInspectionResult): IndexingStatus {
  const coverage = (result.coverageState || "").toLowerCase();
  const verdict = (result.verdict || "").toUpperCase();
  const indexingState = (result.indexingState || "").toUpperCase();

  if (coverage.includes("indexed") || verdict === "PASS") {
    return "likely-indexed";
  }

  if (indexingState.includes("INDEXING_ALLOWED") || result.lastCrawlTime) {
    return "crawled";
  }

  return "no-signal";
}

function formatGscCrawlTime(value: string | null): string {
  if (!value) return "N/A";
  return new Date(value).toLocaleString();
}

function normalizePath(value: string): string {
  if (!value) return "/";
  let normalized = value.trim();
  if (!normalized) return "/";

  if (/^https?:\/\//i.test(normalized)) {
    try {
      normalized = new URL(normalized).pathname || "/";
    } catch {
      normalized = "/";
    }
  }

  normalized = normalized.split("?")[0].split("#")[0];
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/{2,}/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || "/";
}

function isGoogleReferrer(referrer: string | null): boolean {
  if (!referrer) return false;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host === "google.com" || host.endsWith(".google.com") || host.includes(".google.");
  } catch {
    return false;
  }
}

function toStatusLabel(status: IndexingStatus): string {
  if (status === "likely-indexed") return "Likely Indexed";
  if (status === "crawled") return "Crawled by Googlebot";
  return "No Google Signals";
}

function toQualityClass(quality: SeoQuality): string {
  if (quality === "good") return "bg-green-100 text-green-700";
  if (quality === "fair") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

function toIndexClass(status: IndexingStatus): string {
  if (status === "likely-indexed") return "bg-green-100 text-green-700";
  if (status === "crawled") return "bg-blue-100 text-blue-700";
  return "bg-slate-100 text-slate-700";
}

export default function SeoAudit() {
  const [manifest, setManifest] = useState<SeoAuditManifest | null>(null);
  const [signalsByPage, setSignalsByPage] = useState<Record<string, GooglePageSignal>>({});
  const [gscResultsByPath, setGscResultsByPath] = useState<Record<string, GscInspectionResult>>({});
  const [loadingManifest, setLoadingManifest] = useState(true);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [loadingGsc, setLoadingGsc] = useState(false);
  const [manifestError, setManifestError] = useState<string | null>(null);
  const [signalError, setSignalError] = useState<string | null>(null);
  const [gscError, setGscError] = useState<string | null>(null);
  const [gscSuccess, setGscSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [qualityFilter, setQualityFilter] = useState<SeoQuality | "all">("all");
  const [indexFilter, setIndexFilter] = useState<IndexingStatus | "all">("all");
  const [wordRangeFilter, setWordRangeFilter] = useState<WordRangeFilter>("all");
  const [sortColumn, setSortColumn] = useState<SortColumn>("seoScore");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [gscBatchSize, setGscBatchSize] = useState<number>(10);

  const gscProperty =
    import.meta.env.VITE_GSC_PROPERTY_URL ||
    import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_PROPERTY ||
    import.meta.env.VITE_GSC_SITE_URL ||
    "sc-domain:biblequizcompetition.com";
  const publicSiteUrl = import.meta.env.VITE_SITE_URL || "https://biblequizcompetition.com";
  const gscFunctionPath = import.meta.env.VITE_GSC_FUNCTION_NAME || "gsc-url-inspection";
  const gscConnected = Boolean(gscProperty && gscFunctionPath);

  const fetchManifest = useCallback(async () => {
    setLoadingManifest(true);
    setManifestError(null);

    try {
      const candidates = ["/seo-audit.json", "/dist/seo-audit.json"];
      let loaded: SeoAuditManifest | null = null;

      for (const candidate of candidates) {
        const response = await fetch(candidate, { cache: "no-store" });
        if (!response.ok) continue;
        loaded = (await response.json()) as SeoAuditManifest;
        break;
      }

      if (!loaded) {
        throw new Error("SEO manifest unavailable");
      }

      setManifest(loaded);
    } catch (error) {
      console.error("Failed to load SEO audit manifest:", error);
      setManifest(null);
      setManifestError("seo-audit.json was not found. Run `npm run build` to generate SEO audit data.");
    } finally {
      setLoadingManifest(false);
    }
  }, []);

  const fetchGoogleSignals = useCallback(async () => {
    setLoadingSignals(true);
    setSignalError(null);

    try {
      const { data, error } = await supabase
        .from("page_views")
        .select("page, referrer, user_agent, viewed_at")
        .neq("page", "")
        .order("viewed_at", { ascending: false })
        .limit(10000);

      if (error) throw error;

      const rows = (data ?? []) as PageViewSignalRow[];
      const map: Record<string, GooglePageSignal> = {};

      for (const row of rows) {
        const path = normalizePath(row.page);
        if (!map[path]) {
          map[path] = {
            googleBotHits: 0,
            organicGoogleVisits: 0,
            totalVisits: 0,
            lastSeen: row.viewed_at,
          };
        }

        map[path].totalVisits += 1;
        if (!map[path].lastSeen || (row.viewed_at && row.viewed_at > map[path].lastSeen)) {
          map[path].lastSeen = row.viewed_at;
        }
        if (row.user_agent && GOOGLE_BOT_PATTERN.test(row.user_agent)) {
          map[path].googleBotHits += 1;
        }
        if (isGoogleReferrer(row.referrer)) {
          map[path].organicGoogleVisits += 1;
        }
      }

      setSignalsByPage(map);
    } catch (error) {
      console.error("Failed to load Google indexing signals:", error);
      setSignalsByPage({});
      setSignalError("Could not load Google crawl/indexing signals from traffic data.");
    } finally {
      setLoadingSignals(false);
    }
  }, []);

  const runGscInspection = useCallback(
    async (paths: string[]) => {
      if (!paths.length) return;

      setLoadingGsc(true);
      setGscError(null);
      setGscSuccess(null);

      const uniquePaths = Array.from(new Set(paths.map((path) => normalizePath(path))));
      const updates: Record<string, GscInspectionResult> = {};
      let successCount = 0;
      let failCount = 0;

      // Keep a conservative concurrency to avoid quota spikes.
      const chunkSize = 3;
      for (let i = 0; i < uniquePaths.length; i += chunkSize) {
        const chunk = uniquePaths.slice(i, i + chunkSize);

        const chunkResponses = await Promise.all(
          chunk.map(async (path) => {
            const inspectionUrl = toAbsoluteInspectionUrl(path, publicSiteUrl);
            const invokeResult = (await supabase.functions.invoke(gscFunctionPath, {
              body: {
                inspectionUrl,
                siteUrl: gscProperty,
              },
            })) as GscInvokeResponse;

            if (invokeResult.error) {
              return { path, result: { ok: false, error: "Function invoke failed" } as GscInspectionResult };
            }

            const payload = invokeResult.data;
            if (!payload || payload.ok === false) {
              return {
                path,
                result: {
                  ok: false,
                  error: payload?.error || "No result from GSC function",
                } as GscInspectionResult,
              };
            }

            return { path, result: payload };
          }),
        );

        chunkResponses.forEach(({ path, result }) => {
          updates[path] = result;
          if (result.ok) successCount += 1;
          else failCount += 1;
        });
      }

      setGscResultsByPath((prev) => ({ ...prev, ...updates }));

      if (successCount > 0) {
        setGscSuccess(`GSC inspected ${successCount} page(s).${failCount > 0 ? ` ${failCount} failed.` : ""}`);
      }
      if (failCount > 0 && successCount === 0) {
        setGscError("GSC inspection failed for all selected pages. Check function logs and credentials.");
      }

      setLoadingGsc(false);
    },
    [gscFunctionPath, gscProperty, publicSiteUrl],
  );

  useEffect(() => {
    fetchManifest();
    fetchGoogleSignals();
  }, [fetchManifest, fetchGoogleSignals]);

  const rows = useMemo<SeoPageRow[]>(() => {
    if (!manifest?.pages?.length) return [];

    return manifest.pages.map((page) => {
      const normalizedPath = normalizePath(page.path);
      const signal = signalsByPage[normalizedPath];
      const gscResult = gscResultsByPath[normalizedPath];

      const signalBasedStatus: IndexingStatus = signal?.organicGoogleVisits
        ? "likely-indexed"
        : signal?.googleBotHits
          ? "crawled"
          : "no-signal";

      const hasGscResult = Boolean(gscResult?.ok);
      const indexingStatus: IndexingStatus = hasGscResult ? mapGscToIndexingStatus(gscResult) : signalBasedStatus;

      return {
        ...page,
        indexingStatus,
        googleBotHits: signal?.googleBotHits ?? 0,
        organicGoogleVisits: signal?.organicGoogleVisits ?? 0,
        totalVisits: signal?.totalVisits ?? 0,
        gscCoverageState: gscResult?.coverageState ?? null,
        gscLastCrawlTime: gscResult?.lastCrawlTime ?? null,
        gscPageFetchState: gscResult?.pageFetchState ?? null,
        gscVerdict: gscResult?.verdict ?? null,
        indexingSource: hasGscResult ? "gsc" : "traffic-signals",
      };
    });
  }, [manifest, signalsByPage, gscResultsByPath]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        row.path.toLowerCase().includes(q) ||
        row.title.toLowerCase().includes(q) ||
        row.seoQuality.toLowerCase().includes(q);

      const matchesQuality = qualityFilter === "all" || row.seoQuality === qualityFilter;
      const matchesIndex = indexFilter === "all" || row.indexingStatus === indexFilter;
      const inWordRange = row.wordCount >= 300 && row.wordCount <= 400;
      const matchesWordRange =
        wordRangeFilter === "all" ||
        (wordRangeFilter === "in-range" && inWordRange) ||
        (wordRangeFilter === "out-of-range" && !inWordRange);

      return matchesSearch && matchesQuality && matchesIndex && matchesWordRange;
    });
  }, [rows, searchQuery, qualityFilter, indexFilter, wordRangeFilter]);

  const sortedRows = useMemo(() => {
    const qualityRank: Record<SeoQuality, number> = { poor: 1, fair: 2, good: 3 };
    const indexRank: Record<IndexingStatus, number> = { "no-signal": 1, crawled: 2, "likely-indexed": 3 };

    const multiplier = sortDirection === "asc" ? 1 : -1;

    return [...filteredRows].sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "path":
          comparison = a.path.localeCompare(b.path);
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "wordCount":
          comparison = a.wordCount - b.wordCount;
          break;
        case "seoScore":
          comparison = a.seoScore - b.seoScore;
          break;
        case "seoQuality":
          comparison = qualityRank[a.seoQuality] - qualityRank[b.seoQuality];
          break;
        case "indexingStatus":
          comparison = indexRank[a.indexingStatus] - indexRank[b.indexingStatus];
          break;
        case "googleBotHits":
          comparison = a.googleBotHits - b.googleBotHits;
          break;
        case "organicGoogleVisits":
          comparison = a.organicGoogleVisits - b.organicGoogleVisits;
          break;
        case "totalVisits":
          comparison = a.totalVisits - b.totalVisits;
          break;
      }

      if (comparison === 0) {
        comparison = a.path.localeCompare(b.path);
      }

      return comparison * multiplier;
    });
  }, [filteredRows, sortColumn, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, qualityFilter, indexFilter, wordRangeFilter, sortColumn, sortDirection, pageSize]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedRows.length / pageSize));
  }, [sortedRows.length, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedRows.slice(start, end);
  }, [sortedRows, currentPage, pageSize]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count += 1;
    if (qualityFilter !== "all") count += 1;
    if (indexFilter !== "all") count += 1;
    if (wordRangeFilter !== "all") count += 1;
    return count;
  }, [searchQuery, qualityFilter, indexFilter, wordRangeFilter]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setQualityFilter("all");
    setIndexFilter("all");
    setWordRangeFilter("all");
    setSortColumn("seoScore");
    setSortDirection("desc");
    setPageSize(DEFAULT_PAGE_SIZE);
    setCurrentPage(1);
  }, []);

  const exportCurrentRows = useCallback(() => {
    if (sortedRows.length === 0) return;

    const headers = [
      "path",
      "title",
      "word_count",
      "seo_score",
      "seo_quality",
      "index_signal",
      "googlebot_hits",
      "google_visits",
      "total_visits",
    ];

    const escapeCsv = (value: string | number) => {
      const stringValue = String(value ?? "");
      if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const lines = sortedRows.map((row) =>
      [
        row.path,
        row.title,
        row.wordCount,
        row.seoScore,
        row.seoQuality,
        row.indexingStatus,
        row.googleBotHits,
        row.organicGoogleVisits,
        row.totalVisits,
      ]
        .map(escapeCsv)
        .join(","),
    );

    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seo-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [sortedRows]);

  const summary = useMemo(() => {
    const total = rows.length;
    const inWordTarget = rows.filter((row) => row.wordCount >= 300 && row.wordCount <= 400).length;
    const likelyIndexed = rows.filter((row) => row.indexingStatus === "likely-indexed").length;
    const crawled = rows.filter((row) => row.indexingStatus === "crawled").length;

    return {
      total,
      inWordTarget,
      likelyIndexed,
      crawled,
      good: rows.filter((row) => row.seoQuality === "good").length,
      averageWords: manifest?.summary?.averageWords ?? 0,
      averageSeoScore: manifest?.summary?.averageSeoScore ?? 0,
    };
  }, [rows, manifest]);

  const loading = loadingManifest || loadingSignals;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Audit</h1>
            <p className="text-gray-600 mt-1">
              Review page count, word count quality, and Google crawl/indexing signals from your traffic data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={fetchManifest} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh SEO Data
            </Button>
            <Button variant="outline" onClick={fetchGoogleSignals} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Google Signals
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Google Search Console
            </CardTitle>
            <CardDescription>
              Connection status and indexing source used in this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={gscConnected ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                {gscConnected ? "Configured" : "Not Connected"}
              </Badge>
              <span className="text-sm text-gray-600">
                {gscConnected
                  ? `Using function "${gscFunctionPath}" with property ${gscProperty}`
                  : "GSC function/property not configured. Index status below uses traffic-based Google signals."}
              </span>
            </div>
            {!gscConnected && (
              <p className="text-xs text-gray-500">
                To show true Search Console indexing status, add GSC API integration and credentials, then connect this page to the URL Inspection or Index Coverage data source.
              </p>
            )}
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center rounded-xl border bg-white min-h-[260px]">
            <div className="text-center text-gray-600">
              <BarChart3 className="w-10 h-10 mx-auto mb-2 animate-pulse text-blue-600" />
              Loading SEO audit dashboard...
            </div>
          </div>
        ) : (
          <>
            {(manifestError || signalError || gscError || gscSuccess) && (
              <div className="space-y-2">
                {manifestError && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    {manifestError}
                  </div>
                )}
                {signalError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    {signalError}
                  </div>
                )}
                {gscError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    {gscError}
                  </div>
                )}
                {gscSuccess && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 text-sm">
                    {gscSuccess}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Total Pages Audited</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.total.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Pages in 300-400 Words</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.inWordTarget.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    {summary.total > 0 ? `${((summary.inWordTarget / summary.total) * 100).toFixed(1)}%` : "0%"}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Good SEO Quality</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.good.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Average score {summary.averageSeoScore.toFixed(1)} / 100</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">Likely Indexed (Google)</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.likelyIndexed.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{summary.crawled.toLocaleString()} crawled, index unknown</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  SEO Quality Health
                </CardTitle>
                <CardDescription>Quick distribution of page quality scores from generated SEO content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Good</span>
                    <span>{manifest?.summary.good ?? 0}</span>
                  </div>
                  <Progress value={summary.total > 0 ? ((manifest?.summary.good ?? 0) / summary.total) * 100 : 0} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fair</span>
                    <span>{manifest?.summary.fair ?? 0}</span>
                  </div>
                  <Progress value={summary.total > 0 ? ((manifest?.summary.fair ?? 0) / summary.total) * 100 : 0} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Poor</span>
                    <span>{manifest?.summary.poor ?? 0}</span>
                  </div>
                  <Progress value={summary.total > 0 ? ((manifest?.summary.poor ?? 0) / summary.total) * 100 : 0} />
                </div>
                <p className="text-xs text-gray-500">
                  SEO audit generated: {manifest?.generatedAt ? new Date(manifest.generatedAt).toLocaleString() : "N/A"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Page-Level SEO Audit
                </CardTitle>
                <CardDescription>
                  Showing page {currentPage} of {totalPages}. Total matching pages: {sortedRows.length.toLocaleString()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
                  <div className="xl:col-span-4">
                    <Input
                      placeholder="Search by URL path or title..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </div>

                  <div className="xl:col-span-2">
                    <Select value={qualityFilter} onValueChange={(value: SeoQuality | "all") => setQualityFilter(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="SEO Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Quality</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-2">
                    <Select value={indexFilter} onValueChange={(value: IndexingStatus | "all") => setIndexFilter(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Index Signal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Index Signals</SelectItem>
                        <SelectItem value="likely-indexed">Likely Indexed</SelectItem>
                        <SelectItem value="crawled">Crawled</SelectItem>
                        <SelectItem value="no-signal">No Signal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-2">
                    <Select value={wordRangeFilter} onValueChange={(value: WordRangeFilter) => setWordRangeFilter(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Word Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Words</SelectItem>
                        <SelectItem value="in-range">300-400</SelectItem>
                        <SelectItem value="out-of-range">Outside 300-400</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-2 flex items-center gap-2">
                    <Button variant="outline" className="w-full gap-2" onClick={clearFilters}>
                      <FilterX className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-center">
                  <div className="xl:col-span-3">
                    <Select value={sortColumn} onValueChange={(value: SortColumn) => setSortColumn(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seoScore">SEO Score</SelectItem>
                        <SelectItem value="wordCount">Words</SelectItem>
                        <SelectItem value="seoQuality">SEO Quality</SelectItem>
                        <SelectItem value="indexingStatus">Index Signal</SelectItem>
                        <SelectItem value="googleBotHits">Googlebot Hits</SelectItem>
                        <SelectItem value="organicGoogleVisits">Google Visits</SelectItem>
                        <SelectItem value="totalVisits">Total Visits</SelectItem>
                        <SelectItem value="path">Path</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-2">
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
                    >
                      {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {sortDirection.toUpperCase()}
                    </Button>
                  </div>

                  <div className="xl:col-span-2">
                    <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rows per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 rows</SelectItem>
                        <SelectItem value="50">50 rows</SelectItem>
                        <SelectItem value="100">100 rows</SelectItem>
                        <SelectItem value="250">250 rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-3 text-sm text-gray-500">
                    Active filters: {activeFiltersCount} | Results: {sortedRows.length.toLocaleString()}
                  </div>

                  <div className="xl:col-span-2">
                    <Button variant="outline" className="w-full gap-2" onClick={exportCurrentRows} disabled={sortedRows.length === 0}>
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-center">
                  <div className="xl:col-span-2">
                    <Select value={String(gscBatchSize)} onValueChange={(value) => setGscBatchSize(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="GSC batch size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Inspect 5</SelectItem>
                        <SelectItem value="10">Inspect 10</SelectItem>
                        <SelectItem value="20">Inspect 20</SelectItem>
                        <SelectItem value="50">Inspect 50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="xl:col-span-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={loadingGsc || pagedRows.length === 0}
                      onClick={() => runGscInspection(pagedRows.slice(0, gscBatchSize).map((row) => row.path))}
                    >
                      {loadingGsc ? "Inspecting..." : "Run GSC On Current Page"}
                    </Button>
                  </div>

                  <div className="xl:col-span-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={loadingGsc || sortedRows.length === 0}
                      onClick={() => runGscInspection(sortedRows.slice(0, gscBatchSize).map((row) => row.path))}
                    >
                      {loadingGsc ? "Inspecting..." : "Run GSC On Top Filtered"}
                    </Button>
                  </div>

                  <div className="xl:col-span-4 text-xs text-gray-500">
                    Uses your `gsc-url-inspection` edge function and Search Console quota. Start with small batches.
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Words</TableHead>
                      <TableHead>SEO Score</TableHead>
                      <TableHead>SEO Quality</TableHead>
                      <TableHead>Google Index Signal</TableHead>
                      <TableHead>Signal Source</TableHead>
                      <TableHead>GSC Coverage</TableHead>
                      <TableHead>GSC Last Crawl</TableHead>
                      <TableHead>Googlebot</TableHead>
                      <TableHead>Google Visits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagedRows.length > 0 ? (
                      pagedRows.map((row) => (
                        <TableRow key={row.path}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-mono text-xs text-gray-900">{row.path}</p>
                              <p className="text-xs text-gray-500 line-clamp-1">{row.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>{row.wordCount}</TableCell>
                          <TableCell>{row.seoScore}</TableCell>
                          <TableCell>
                            <Badge className={toQualityClass(row.seoQuality)}>{row.seoQuality.toUpperCase()}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={toIndexClass(row.indexingStatus)}>
                              {toStatusLabel(row.indexingStatus)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={row.indexingSource === "gsc" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-700"}>
                              {row.indexingSource === "gsc" ? "GSC" : "Traffic"}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.gscCoverageState ?? "N/A"}</TableCell>
                          <TableCell>{formatGscCrawlTime(row.gscLastCrawlTime)}</TableCell>
                          <TableCell>{row.googleBotHits}</TableCell>
                          <TableCell>{row.organicGoogleVisits}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="py-8 text-center text-gray-500">
                          No pages match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-sm text-gray-500">
                    Showing {(sortedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1).toLocaleString()}-
                    {Math.min(currentPage * pageSize, sortedRows.length).toLocaleString()} of {sortedRows.length.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Prev
                    </Button>
                    <span className="text-sm text-gray-600 px-2">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage >= totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
