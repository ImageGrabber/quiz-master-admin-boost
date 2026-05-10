const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "src", "data", "hindi-songs.json");
const songs = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const STOP = new Set([
  "hai", "ho", "ki", "ke", "ka", "mein", "main", "mai", "aur", "tu", "hum", "yeshu",
  "prabhu", "masih", "geet", "song", "lyrics", "chords", "the", "a", "aa"
]);

function normalizeTitle(s = "") {
  return String(s)
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(chords?|lyrics?)\b/g, " ")
    .replace(/[^a-z0-9\u0900-\u097f ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s = "") {
  return normalizeTitle(s)
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

function hindiLineCount(song) {
  return (song?.translations?.hindi?.lyrics || []).flatMap((x) => x.lines || []).filter(Boolean).length;
}

function isEmpty(song) {
  const lines = hindiLineCount(song);
  const seed = String(song.description || "").toLowerCase().includes("seed entry imported from waytochurch index");
  return lines <= 1 || seed;
}

function cloneTranslations(t) {
  return JSON.parse(JSON.stringify(t || {}));
}

const donors = songs.filter((s) => hindiLineCount(s) >= 6);
const empties = songs.filter(isEmpty);

let filled = 0;
let unresolved = 0;
const samples = [];

for (const target of empties) {
  const tTok = tokens(target.title || target.slug || "");
  if (!tTok.length) {
    unresolved++;
    continue;
  }

  let best = null;
  let bestScore = 0;

  for (const donor of donors) {
    if (donor.slug === target.slug) continue;
    const dTok = tokens(donor.title || donor.slug || "");
    const score = jaccard(tTok, dTok);
    if (score > bestScore) {
      bestScore = score;
      best = donor;
    }
  }

  // High-confidence only
  if (!best || bestScore < 0.72) {
    unresolved++;
    continue;
  }

  target.translations = cloneTranslations(best.translations);
  target.videoUrl = target.videoUrl || best.videoUrl || "";
  target.description = `${target.title} - Hindi Christian devotional song lyrics with worship-friendly formatting.`;
  filled++;
  if (samples.length < 20) {
    samples.push({
      target: target.slug,
      donor: best.slug,
      score: Number(bestScore.toFixed(2)),
    });
  }
}

fs.writeFileSync(DATA_PATH, JSON.stringify(songs, null, 2));

console.log(
  JSON.stringify(
    {
      total: songs.length,
      emptiesChecked: empties.length,
      filled,
      unresolved,
      sampleMatches: samples,
    },
    null,
    2
  )
);

