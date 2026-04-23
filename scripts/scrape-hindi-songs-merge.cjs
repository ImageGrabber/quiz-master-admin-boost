/**
 * Merge Hindi songs scraper
 * - Scrapes Hindi lyrics pages from yeshukegeet.com A-Z indexes
 * - Merges only NEW songs into src/data/hindi-songs.json
 * - Avoids overwriting existing song catalog
 *
 * Usage:
 *   node scripts/scrape-hindi-songs-merge.cjs
 *   MAX_SONGS=120 DELAY_MS=500 node scripts/scrape-hindi-songs-merge.cjs
 */

const https = require("https");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(__dirname, "..", "src", "data", "hindi-songs.json");
const DELAY_MS = Number(process.env.DELAY_MS || 800);
const MAX_SONGS = Number(process.env.MAX_SONGS || 180);
const DOMAIN = "https://www.yeshukegeet.com";
const NON_SONG_SLUG_PATTERNS = [
  "one-to-one",
  "hindi-christian-songs",
  "christian-music-videos",
  "blog",
  "course",
  "tutorial",
  "udemy",
];
const ENGLISH_SONG_PATTERNS = [
  "silent night",
  "jingle bells",
  "joy to the world",
  "deck the halls",
  "once in royal davids city",
  "o come all ye faithful",
  "stay by our side",
  "a mighty fortress",
];
const HINDI_SIGNAL_WORDS = [
  "yeshu", "prabhu", "khuda", "stuti", "aaradhana", "aradhana", "vandana", "mahima",
  "dil", "aag", "raja", "masih", "masiha", "pavitra", "aatma", "dhanyawad", "krus",
  "kalvary", "mukti", "prarthana", "hosanna", "kurbaan", "kurbani", "zindagi", "pyaar",
  "bhar", "tera", "tujhe", "naam", "ibadat", "sahara", "geet", "srishti", "parmeshwar",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const nextUrl = res.headers.location.startsWith("/")
              ? `${DOMAIN}${res.headers.location}`
              : res.headers.location;
            return resolve(httpGet(nextUrl));
          }
          if (res.statusCode !== 200) {
            reject(new Error(`Status ${res.statusCode} for ${url}`));
            return;
          }
          let raw = "";
          res.on("data", (d) => {
            raw += d;
          });
          res.on("end", () => resolve(raw));
          res.on("error", reject);
        }
      )
      .on("error", reject);
  });
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function normalizeTitle(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9\u0900-\u097f ]/g, "")
    .trim();
}

function pickTitle($) {
  const candidates = [
    $("meta[property='og:title']").attr("content"),
    $("h1").first().text(),
    $("h2").first().text(),
    $("title").text(),
  ]
    .map((s) => String(s || "").trim())
    .filter(Boolean);

  for (const t of candidates) {
    const cleaned = t
      .replace(/\|\s*YESHU.*$/i, "")
      .replace(/\|\s*Yeshu.*$/i, "")
      .replace(/\|\s*HINDI CHRISTIAN.*$/i, "")
      .replace(/\|\s*LATEST.*$/i, "")
      .replace(/\|\s*GOOD FRIDAY.*$/i, "")
      .replace(/-+\s*christian song lyrics.*$/i, "")
      .replace(/-+\s*hindi christian songs?.*$/i, "")
      .replace(/\s*lyrics\s*$/i, "")
      .replace(/\s*\(.*methodist.*\)\s*$/i, "")
      .replace(/\s+lyrics\s*$/i, "")
      .trim();
    if (cleaned.length >= 3) return cleaned;
  }
  return "";
}

function isLikelyHindiSong(title, slug) {
  const t = normalizeTitle(title);
  const s = String(slug || "").toLowerCase();

  if (NON_SONG_SLUG_PATTERNS.some((p) => s.includes(p))) return false;
  if (ENGLISH_SONG_PATTERNS.some((p) => t.includes(p) || s.includes(p.replace(/\s+/g, "-")))) return false;
  if (/^\d+\s+christian songs/i.test(t)) return false;

  // If we detect Hindi script, keep it.
  if (/[\u0900-\u097f]/.test(title)) return true;

  // Otherwise require at least one Hindi worship signal word.
  return HINDI_SIGNAL_WORDS.some((w) => t.includes(w));
}

function looksLikeNoise(text) {
  const t = String(text || "").toLowerCase();
  const bad = [
    "subscribe",
    "copyright",
    "privacy",
    "cookie",
    "terms",
    "facebook",
    "instagram",
    "youtube channel",
    "learn piano",
    "download app",
  ];
  return bad.some((x) => t.includes(x));
}

function extractLyricsSections($) {
  const sections = [];
  const selectors = [
    "article p",
    ".entry-content p",
    ".blog-item-content p",
    ".sqs-block-content p",
    "main p",
    ".post-body p",
  ];

  for (const selector of selectors) {
    const local = [];
    $(selector).each((_, el) => {
      const raw = $(el).text().trim();
      if (!raw || raw.length < 8 || raw.length > 1600 || looksLikeNoise(raw)) return;
      const lines = raw
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length >= 2);
      if (lines.length >= 1) local.push({ lines });
    });
    if (local.length >= 2) {
      return local;
    }
    if (local.length > sections.length) {
      sections.splice(0, sections.length, ...local);
    }
  }

  return sections;
}

function extractVideoUrl($) {
  const iframeSrc = $("iframe[src*='youtube.com/embed/']").first().attr("src");
  if (iframeSrc) {
    const idMatch = iframeSrc.match(/embed\/([a-zA-Z0-9_-]{11})/);
    if (idMatch) return `https://www.youtube.com/embed/${idMatch[1]}`;
  }
  const html = $.html();
  const idMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
  if (idMatch) return `https://www.youtube.com/embed/${idMatch[1]}`;
  return "";
}

async function collectSongUrls() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const skip = [
    "hindi-lyrics",
    "piano",
    "guitar",
    "course",
    "tutorial",
    "contact",
    "about",
    "privacy",
    "terms",
  ];
  const urls = new Set();

  console.log("Collecting Hindi song URLs from A-Z pages...");

  for (const letter of letters) {
    const url = `${DOMAIN}/hindi-lyrics-${letter}`;
    try {
      const html = await httpGet(url);
      const $ = cheerio.load(html);
      $("a[href]").each((_, a) => {
        const href = $(a).attr("href");
        if (!href) return;
        const full = href.startsWith("http") ? href : `${DOMAIN}${href.startsWith("/") ? "" : "/"}${href}`;
        if (!full.startsWith(DOMAIN)) return;
        const slug = full.replace(`${DOMAIN}/`, "").trim();
        if (!slug || slug.includes("/") || skip.some((k) => slug.includes(k))) return;
        if (NON_SONG_SLUG_PATTERNS.some((k) => slug.includes(k))) return;
        urls.add(full);
      });
      process.stdout.write(`${letter.toUpperCase()}(${urls.size}) `);
      await sleep(250);
    } catch (_) {
      process.stdout.write(`${letter.toUpperCase()}(err) `);
    }
  }

  console.log(`\nCollected ${urls.size} candidate URLs`);
  return Array.from(urls).slice(0, MAX_SONGS);
}

async function scrapeOne(url) {
  const html = await httpGet(url);
  const $ = cheerio.load(html);

  const title = pickTitle($);
  if (!title) return null;
  const slug = slugify(title);
  if (!slug) return null;
  if (!isLikelyHindiSong(title, slug)) return null;

  const lyrics = extractLyricsSections($);
  if (lyrics.length < 2) return null;

  return {
    id: slug.replace(/-/g, "_").slice(0, 64),
    slug,
    title,
    videoUrl: extractVideoUrl($),
    description: `${title} - Hindi Christian devotional song lyrics with worship-friendly formatting.`,
    translations: {
      hindi: {
        lang: "Hindi",
        lyrics: lyrics.map((section, idx) => ({
          verse: idx > 0 ? String(idx) : undefined,
          lines: section.lines,
        })),
      },
    },
  };
}

function mergeSongs(existingSongs, newSongs) {
  const bySlug = new Map();
  const byTitle = new Map();

  for (const song of existingSongs) {
    bySlug.set(song.slug, song);
    byTitle.set(normalizeTitle(song.title), true);
  }

  const added = [];
  const merged = [...existingSongs];
  for (const song of newSongs) {
    if (bySlug.has(song.slug)) continue;
    if (byTitle.has(normalizeTitle(song.title))) continue;
    bySlug.set(song.slug, song);
    byTitle.set(normalizeTitle(song.title), true);
    added.push(song);
    merged.push(song);
  }

  return { merged, added };
}

async function main() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    throw new Error(`Missing data file: ${OUTPUT_FILE}`);
  }

  const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
  console.log(`Existing Hindi songs: ${existing.length}`);

  const urls = await collectSongUrls();
  console.log(`Scraping up to ${urls.length} pages...\n`);

  const scraped = [];
  let ok = 0;
  let skipped = 0;
  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    const short = url.replace(`${DOMAIN}/`, "");
    process.stdout.write(`[${i + 1}/${urls.length}] ${short}... `);
    try {
      const song = await scrapeOne(url);
      if (!song) {
        skipped += 1;
        console.log("skip");
      } else {
        ok += 1;
        scraped.push(song);
        console.log(`ok "${song.title}"`);
      }
    } catch (err) {
      skipped += 1;
      console.log(`err: ${err.message}`);
    }
    await sleep(DELAY_MS);
  }

  const { merged, added } = mergeSongs(existing, scraped);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2));

  console.log("\n============================");
  console.log(`Scraped valid songs: ${ok}`);
  console.log(`Skipped/failed: ${skipped}`);
  console.log(`New songs added: ${added.length}`);
  console.log(`Total songs now: ${merged.length}`);
  console.log(`Saved: ${OUTPUT_FILE}`);
  console.log("============================");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
