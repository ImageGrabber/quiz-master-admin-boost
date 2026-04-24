/**
 * Backfill missing YouTube embeds for Hindi songs.
 *
 * Usage:
 *   node scripts/fill-hindi-song-videos.cjs
 *   MAX_LOOKUPS=500 DELAY_MS=1500 node scripts/fill-hindi-song-videos.cjs
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const SONGS_FILE = path.join(__dirname, "..", "src", "data", "hindi-songs.json");
const DELAY_MS = Number(process.env.DELAY_MS || 1200);
const MAX_LOOKUPS = Number(process.env.MAX_LOOKUPS || 0); // 0 means all missing
const SAVE_EVERY = Number(process.env.SAVE_EVERY || 25);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
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
          const nextUrl = new URL(res.headers.location, url).href;
          return httpsGet(nextUrl).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Status ${res.statusCode} for ${url}`));
        }

        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
        res.on("error", reject);
      }
    );
    request.on("error", reject);
  });
}

function extractVideoId(html) {
  const patterns = [
    /"videoId":"([a-zA-Z0-9_-]{11})"/,
    /\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = String(html).match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

async function searchYoutube(title) {
  const queries = [
    `${title} hindi christian song lyrics`,
    `${title} yeshu geet`,
    `${title} worship song`,
  ];

  for (const query of queries) {
    try {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      const html = await httpsGet(url);
      const videoId = extractVideoId(html);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (_) {
      // Try the next query variation.
    }
    await sleep(250);
  }

  return "";
}

async function main() {
  if (!fs.existsSync(SONGS_FILE)) {
    throw new Error(`Missing songs file: ${SONGS_FILE}`);
  }

  const songs = JSON.parse(fs.readFileSync(SONGS_FILE, "utf-8"));
  if (!Array.isArray(songs)) {
    throw new Error("Expected songs file to contain an array.");
  }

  const missingIndexes = [];
  for (let i = 0; i < songs.length; i += 1) {
    if (!songs[i]?.videoUrl) missingIndexes.push(i);
  }

  const targets =
    MAX_LOOKUPS > 0 ? missingIndexes.slice(0, MAX_LOOKUPS) : missingIndexes;

  console.log(`Total songs: ${songs.length}`);
  console.log(`Missing videos: ${missingIndexes.length}`);
  console.log(`Processing now: ${targets.length}`);

  let found = 0;
  let notFound = 0;

  for (let i = 0; i < targets.length; i += 1) {
    const songIndex = targets[i];
    const song = songs[songIndex];
    const title = String(song?.title || "").trim();
    process.stdout.write(`[${i + 1}/${targets.length}] ${title}... `);

    if (!title) {
      notFound += 1;
      console.log("skip (empty title)");
      continue;
    }

    const embedUrl = await searchYoutube(title);
    if (embedUrl) {
      songs[songIndex].videoUrl = embedUrl;
      found += 1;
      console.log(`ok ${embedUrl.split("/").pop()}`);
    } else {
      notFound += 1;
      console.log("no match");
    }

    if ((i + 1) % SAVE_EVERY === 0) {
      fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));
      console.log(`Saved progress: ${i + 1}/${targets.length}`);
    }

    await sleep(DELAY_MS);
  }

  fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));

  console.log("-----");
  console.log(`Found videos: ${found}`);
  console.log(`Still missing: ${notFound}`);
  console.log(`Saved: ${SONGS_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
