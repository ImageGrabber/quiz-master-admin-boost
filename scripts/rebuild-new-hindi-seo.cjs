const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataPath = path.join(root, "src", "data", "hindi-songs.json");
const distRoot = path.join(root, "dist", "hindi-songs");

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function firstLines(song, langKey, max = 80) {
  const t = song?.translations?.[langKey];
  if (!t || !Array.isArray(t.lyrics)) return [];
  const out = [];
  for (const section of t.lyrics) {
    if (!section?.lines) continue;
    for (const line of section.lines) {
      if (line) out.push(String(line).trim());
      if (out.length >= max) return out;
    }
  }
  return out;
}

function renderSongPage(song) {
  const title = song.title || "Hindi Christian Song";
  const slug = song.slug;
  const hindi = firstLines(song, "hindi", 160);
  const english = firstLines(song, "english", 80);
  const description =
    song.description ||
    `Read full Hindi lyrics for ${title} with worship-friendly formatting.`;
  const canonical = `https://biblequizcompetition.com/hindi-songs/${slug}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} Lyrics in Hindi | Bible Quiz Competition</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="music.song" />
  <meta property="og:title" content="${escapeHtml(title)} Lyrics in Hindi" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: `${title} lyrics in Hindi`, url: canonical, inLanguage: ["hi", "en"] },
      { "@type": "MusicComposition", name: title, inLanguage: "hi", description, lyrics: { "@type": "CreativeWork", text: hindi.join("\n") } }
    ]
  })}</script>
</head>
<body>
  <main style="max-width:900px;margin:40px auto;padding:0 16px;font-family:Arial,sans-serif;line-height:1.7;color:#1f2937;">
    <p><a href="/hindi-songs">Hindi Songs</a></p>
    <h1>${escapeHtml(title)} Lyrics in Hindi</h1>
    <p>${escapeHtml(description)}</p>
    <h2>Hindi Lyrics</h2>
    <div>${hindi.length ? hindi.map((l) => escapeHtml(l)).join("<br/>") : "Lyrics are being updated."}</div>
    ${
      english.length
        ? `<h2>English Meaning</h2><div>${english.map((l) => escapeHtml(l)).join("<br/>")}</div>`
        : ""
    }
  </main>
</body>
</html>`;
}

function main() {
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Missing dataset: ${dataPath}`);
  }
  const songs = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  if (!Array.isArray(songs)) throw new Error("Invalid hindi songs dataset");

  fs.mkdirSync(distRoot, { recursive: true });

  let generated = 0;
  let existing = 0;

  for (const song of songs) {
    const slug = song?.slug;
    if (!slug) continue;
    const outDir = path.join(distRoot, slug);
    const outFile = path.join(outDir, "index.html");
    if (fs.existsSync(outFile)) {
      existing += 1;
      continue;
    }
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, renderSongPage(song), "utf8");
    generated += 1;
  }

  console.log(`Existing pages kept: ${existing}`);
  console.log(`New Hindi SEO pages generated: ${generated}`);
  console.log(`Output dir: ${distRoot}`);
}

main();
