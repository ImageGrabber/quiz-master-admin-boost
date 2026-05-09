const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "data", "hindi-songs.json");

function normalizeWhitespace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function cleanTitle(title = "") {
  return normalizeWhitespace(
    String(title)
      .replace(/[“”"']/g, "")
      .replace(/\s*[\-|–|—]\s*lyrics.*$/i, "")
      .replace(/\s+lyrics\s*$/i, "")
  );
}

function decodeHexSlug(slug = "") {
  const tokens = String(slug)
    .toLowerCase()
    .split("-")
    .filter((t) => /^[0-9a-f]{2}$/.test(t));
  if (tokens.length < 6) return "";
  try {
    return Buffer.from(tokens.join(""), "hex").toString("utf8");
  } catch {
    return "";
  }
}

function asciiSlug(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function unicodeSlug(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[^\u0900-\u097f0-9\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSlug(song, index) {
  const decoded = decodeHexSlug(song.slug || "");
  const title = cleanTitle(song.title || "");
  const decodedLooksValid =
    decoded &&
    !decoded.includes("�") &&
    (decoded.length >= Math.max(6, Math.floor(title.length * 0.6)) || !title);
  const source = decodedLooksValid ? decoded : title || decoded || `hindi-song-${index + 1}`;

  const latin = asciiSlug(source);
  if (latin) return latin;

  const uni = unicodeSlug(source);
  if (uni) return uni;

  return `hindi-song-${index + 1}`;
}

function mergeFragmentedLines(lines = []) {
  const cleaned = lines
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean);

  const merged = [];
  for (let i = 0; i < cleaned.length; i++) {
    let current = cleaned[i];

    const isTiny = () => current.length < 18 || current.split(" ").length < 3;
    const isTerminal = (text) => /[.!?।:]$/.test(text);

    while (
      i + 1 < cleaned.length &&
      isTiny() &&
      !isTerminal(current) &&
      cleaned[i + 1].length < 28
    ) {
      current = `${current} ${cleaned[i + 1]}`.replace(/\s+/g, " ").trim();
      i += 1;
      if (current.length > 56) break;
    }

    merged.push(current);
  }

  const finalLines = [];
  for (const line of merged) {
    if (
      finalLines.length > 0 &&
      line.length <= 10 &&
      !/[.!?।:]$/.test(finalLines[finalLines.length - 1])
    ) {
      finalLines[finalLines.length - 1] = `${finalLines[finalLines.length - 1]} ${line}`.replace(/\s+/g, " ").trim();
      continue;
    }
    finalLines.push(line);
  }

  return finalLines;
}

function main() {
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  const songs = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const seen = new Map();
  let slugFixes = 0;
  let lineFixes = 0;
  let titleFixes = 0;

  const normalized = songs.map((song, index) => {
    const next = { ...song };

    const nextTitle = cleanTitle(song.title || "");
    if (nextTitle && nextTitle !== song.title) {
      next.title = nextTitle;
      next.description = `${nextTitle} - Hindi Christian devotional song lyrics with worship-friendly formatting.`;
      titleFixes += 1;
    }

    let slug = buildSlug(next, index);
    const count = seen.get(slug) || 0;
    seen.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count + 1}`;
    if (slug !== song.slug) {
      next.slug = slug;
      next.id = slug.replace(/-/g, "_").slice(0, 64);
      slugFixes += 1;
    }

    if (next.translations?.hindi?.lyrics) {
      next.translations = { ...next.translations };
      next.translations.hindi = { ...next.translations.hindi };
      next.translations.hindi.lyrics = next.translations.hindi.lyrics.map((section) => {
        const merged = mergeFragmentedLines(section.lines || []);
        if (merged.length !== (section.lines || []).length) lineFixes += 1;
        return {
          ...section,
          lines: merged,
        };
      });
    }

    return next;
  });

  fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2) + "\n");
  console.log(`Updated ${normalized.length} songs`);
  console.log(`Title fixes: ${titleFixes}`);
  console.log(`Slug fixes: ${slugFixes}`);
  console.log(`Lyrics section line-merge fixes: ${lineFixes}`);
}

main();
