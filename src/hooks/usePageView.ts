import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { trackMixpanelEvent } from "@/lib/mixpanel";

interface VisitorContext {
  ipAddress: string | null;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface CachedVisitorContext extends VisitorContext {
  cachedAt: number;
}

const VISITOR_CONTEXT_CACHE_KEY = "bible-quiz-visitor-context-v1";
const VISITOR_CONTEXT_CACHE_TTL_MS = 30 * 60 * 1000;
const BOT_USER_AGENT_PATTERN =
  /bot|spider|crawler|crawl|slurp|headless|phantom|selenium|puppeteer|playwright|python-requests|curl|wget|httpclient|axios|libwww|monitoring/i;
const EXCLUDED_TRACKING_IPS = new Set(["99.227.50.157"]);
const KNOWN_CRAWLER_IP_PREFIXES = [
  "66.249.",
  "64.233.173.",
  "72.14.199.",
  "74.125.",
  "157.55.",
  "40.77.",
];

function toNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toNullableNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

function isKnownCrawlerIp(ipAddress: string | null): boolean {
  const normalized = normalizeIpAddress(ipAddress);
  if (!normalized) return false;
  return KNOWN_CRAWLER_IP_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (!ua) return "Unknown";
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome") && !ua.includes("edg/")) return "Chrome";
  if (ua.includes("safari") && !ua.includes("chrome")) return "Safari";
  if (ua.includes("firefox")) return "Firefox";
  if (ua.includes("trident") || ua.includes("msie")) return "Internet Explorer";

  return "Other";
}

function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (BOT_USER_AGENT_PATTERN.test(ua)) return "Bot";
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod/i.test(ua)) return "Mobile";
  if (ua.length > 0) return "Desktop";

  return "Unknown";
}

function scoreBotLikelihood(userAgent: string): { isBot: boolean; score: number } {
  let score = 0;
  const ua = userAgent.toLowerCase();

  if (!ua) score += 40;
  if (BOT_USER_AGENT_PATTERN.test(ua)) score += 70;
  if (/headless|phantom|selenium|puppeteer|playwright/i.test(ua)) score += 25;

  if (typeof navigator !== "undefined") {
    if (navigator.webdriver) score += 25;
    if (!navigator.language) score += 5;
    if (!navigator.languages || navigator.languages.length === 0) score += 10;
    if (!navigator.plugins || navigator.plugins.length === 0) score += 5;
  }

  const normalizedScore = clamp(score, 0, 100);
  return {
    isBot: normalizedScore >= 50,
    score: normalizedScore,
  };
}

function getCachedVisitorContext(): VisitorContext | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(VISITOR_CONTEXT_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedVisitorContext;
    if (!parsed.cachedAt || Date.now() - parsed.cachedAt > VISITOR_CONTEXT_CACHE_TTL_MS) {
      window.sessionStorage.removeItem(VISITOR_CONTEXT_CACHE_KEY);
      return null;
    }

    return {
      ipAddress: parsed.ipAddress,
      country: parsed.country,
      countryCode: parsed.countryCode,
      region: parsed.region,
      city: parsed.city,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
    };
  } catch {
    return null;
  }
}

function cacheVisitorContext(context: VisitorContext): void {
  if (typeof window === "undefined") return;

  try {
    const payload: CachedVisitorContext = {
      ...context,
      cachedAt: Date.now(),
    };

    window.sessionStorage.setItem(VISITOR_CONTEXT_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures.
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 3500): Promise<Response> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

async function fetchLocationFromIpApi(): Promise<VisitorContext | null> {
  try {
    const response = await fetchWithTimeout("https://ipapi.co/json/");
    if (!response.ok) return null;

    const payload = (await response.json()) as Record<string, unknown>;

    return {
      ipAddress: toNullableString(payload.ip),
      country: toNullableString(payload.country_name),
      countryCode: toNullableString(payload.country_code),
      region: toNullableString(payload.region),
      city: toNullableString(payload.city),
      latitude: toNullableNumber(payload.latitude),
      longitude: toNullableNumber(payload.longitude),
    };
  } catch {
    return null;
  }
}

async function fetchLocationFromIpWhoIs(ipAddress?: string | null): Promise<VisitorContext | null> {
  try {
    const baseUrl = "https://ipwho.is";
    const target = ipAddress && ipAddress.trim().length > 0 ? `${baseUrl}/${ipAddress}` : `${baseUrl}/`;
    const response = await fetchWithTimeout(target);
    if (!response.ok) return null;

    const payload = (await response.json()) as Record<string, unknown>;
    if (payload.success === false) return null;

    return {
      ipAddress: toNullableString(payload.ip),
      country: toNullableString(payload.country),
      countryCode: toNullableString(payload.country_code),
      region: toNullableString(payload.region),
      city: toNullableString(payload.city),
      latitude: toNullableNumber(payload.latitude),
      longitude: toNullableNumber(payload.longitude),
    };
  } catch {
    return null;
  }
}

async function fetchIpAddressFallback(): Promise<string | null> {
  try {
    const response = await fetchWithTimeout("https://api.ipify.org?format=json");
    if (!response.ok) return null;

    const payload = (await response.json()) as { ip?: string };
    return payload.ip ?? null;
  } catch {
    return null;
  }
}

async function getVisitorContext(): Promise<VisitorContext> {
  const cached = getCachedVisitorContext();
  if (cached) return cached;

  let geoContext = await fetchLocationFromIpWhoIs();
  if (!geoContext) {
    geoContext = await fetchLocationFromIpApi();
  }

  let fallbackIpAddress: string | null = null;
  if (!geoContext?.ipAddress) {
    fallbackIpAddress = await fetchIpAddressFallback();
  }

  if (!geoContext && fallbackIpAddress) {
    geoContext = await fetchLocationFromIpWhoIs(fallbackIpAddress);
    if (!geoContext) {
      geoContext = await fetchLocationFromIpApi();
    }
  }

  const context: VisitorContext = {
    ipAddress: geoContext?.ipAddress ?? fallbackIpAddress,
    country: geoContext?.country ?? null,
    countryCode: geoContext?.countryCode ?? null,
    region: geoContext?.region ?? null,
    city: geoContext?.city ?? null,
    latitude: geoContext?.latitude ?? null,
    longitude: geoContext?.longitude ?? null,
  };

  cacheVisitorContext(context);
  return context;
}

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    trackMixpanelEvent("page_view", {
      page_path: location.pathname,
      page_url: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });

    const trackPageView = async () => {
      try {
        const visitorContext = await getVisitorContext();
        const normalizedIpAddress = normalizeIpAddress(visitorContext.ipAddress);

        if (normalizedIpAddress && EXCLUDED_TRACKING_IPS.has(normalizedIpAddress)) {
          return;
        }

        const userAgent = navigator.userAgent || "";
        const botSignal = scoreBotLikelihood(userAgent);
        const ipLooksLikeCrawler = isKnownCrawlerIp(normalizedIpAddress);
        const finalBotScore = ipLooksLikeCrawler ? Math.max(botSignal.score, 85) : botSignal.score;

        const payload: Database["public"]["Tables"]["page_views"]["Insert"] = {
          page: location.pathname,
          ip_address: normalizedIpAddress,
          country: visitorContext.country,
          country_code: visitorContext.countryCode,
          region: visitorContext.region,
          city: visitorContext.city,
          latitude: visitorContext.latitude,
          longitude: visitorContext.longitude,
          user_agent: userAgent || null,
          referrer: document.referrer || null,
          browser: detectBrowser(userAgent),
          device_type: detectDeviceType(userAgent),
          is_bot: botSignal.isBot || ipLooksLikeCrawler,
          bot_score: finalBotScore,
        };

        const { error } = await supabase.from("page_views").insert(payload);

        if (error) {
          console.error("Page view tracking error:", error);
        }
      } catch (error) {
        console.error("Page view tracking failed:", error);
      }
    };

    trackPageView();
  }, [location.pathname]);
}
