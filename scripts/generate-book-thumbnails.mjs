import path from "node:path";
import { access, mkdir } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import sharp from "sharp";

const width = 768;
const height = 1024;
const outputDir = path.resolve(process.cwd(), "public/images/books");

const allBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];

const palettes = [
  ["#0B1B4D", "#1E4F9A", "#64C6FF"],
  ["#1E3A23", "#2E7D4F", "#A8E6A1"],
  ["#402340", "#7E3D8D", "#F5A8FF"],
  ["#3A240D", "#9E6A22", "#FFD18A"],
  ["#0F3D4B", "#2A8C97", "#9CECF2"],
  ["#3A1414", "#9C2D2D", "#FF9A8C"],
  ["#1D233B", "#4A56A6", "#B6B9FF"],
  ["#3C2C12", "#9A7B2F", "#F2E29C"],
  ["#0F2A2A", "#2F7A76", "#8FE8D8"],
  ["#2D1B47", "#5A35A3", "#BFA4FF"],
];

const themeSets = {
  journey: new Set(["exodus", "numbers", "deuteronomy", "jonah"]),
  kingdom: new Set(["joshua", "judges", "1-samuel", "2-samuel", "1-kings", "2-kings", "1-chronicles", "2-chronicles", "nehemiah", "esther"]),
  temple: new Set(["leviticus", "ezra", "haggai", "zechariah", "malachi", "hebrews"]),
  wisdom: new Set(["psalms", "proverbs", "ecclesiastes"]),
  love: new Set(["ruth", "song-of-solomon"]),
  suffering: new Set(["job", "lamentations"]),
  prophecy: new Set(["isaiah", "jeremiah", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "micah", "nahum", "habakkuk", "zephaniah"]),
  gospel: new Set(["matthew", "mark", "luke", "john"]),
  acts: new Set(["acts"]),
  revelation: new Set(["revelation"]),
};

const epistleSlugs = new Set([
  "romans", "1-corinthians", "2-corinthians", "galatians", "ephesians", "philippians", "colossians", "1-thessalonians", "2-thessalonians", "1-timothy", "2-timothy", "titus", "philemon", "james", "1-peter", "2-peter", "1-john", "2-john", "3-john", "jude",
]);

function slugify(book) {
  return book.toLowerCase().replace(/\s+/g, "-");
}

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function mulberry32(seed) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function splitTitle(title) {
  const words = title.toUpperCase().split(" ");
  if (words.length === 1) return [words[0]];

  let bestSplit = 1;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let i = 1; i < words.length; i += 1) {
    const left = words.slice(0, i).join(" ");
    const right = words.slice(i).join(" ");
    const diff = Math.abs(left.length - right.length);
    const overflowPenalty = Math.max(0, left.length - 13) * 3 + Math.max(0, right.length - 13) * 3;
    const score = diff + overflowPenalty;
    if (score < bestScore) {
      bestScore = score;
      bestSplit = i;
    }
  }

  return [words.slice(0, bestSplit).join(" "), words.slice(bestSplit).join(" ")];
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getTheme(slug) {
  if (themeSets.journey.has(slug)) return "journey";
  if (themeSets.kingdom.has(slug)) return "kingdom";
  if (themeSets.temple.has(slug)) return "temple";
  if (themeSets.wisdom.has(slug)) return "wisdom";
  if (themeSets.love.has(slug)) return "love";
  if (themeSets.suffering.has(slug)) return "suffering";
  if (themeSets.prophecy.has(slug)) return "prophecy";
  if (themeSets.gospel.has(slug)) return "gospel";
  if (themeSets.acts.has(slug)) return "acts";
  if (themeSets.revelation.has(slug)) return "revelation";
  if (epistleSlugs.has(slug)) return "epistle";
  return "epistle";
}

function makeCrowd(rng, x1, y1, x2, y2, count, color) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / Math.max(1, count - 1);
    const x = x1 + (x2 - x1) * t + (rng() - 0.5) * 8;
    const y = y1 + (y2 - y1) * t + (rng() - 0.5) * 5;
    const s = 0.35 + t * 0.8;
    const w = 4 * s;
    const h = 12 * s;
    out.push(`<circle cx="${x.toFixed(1)}" cy="${(y - h).toFixed(1)}" r="${(2.1 * s).toFixed(1)}" fill="${color}" opacity="0.85"/>`);
    out.push(`<rect x="${(x - w / 2).toFixed(1)}" y="${(y - h + 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="1" fill="${color}" opacity="0.82"/>`);
  }
  return out.join("\n    ");
}

function sceneJourney(rng) {
  const crowd = makeCrowd(rng, 385, 760, 385, 525, 48, "#2c1e16");
  return `
  <g opacity="0.95">
    <path d="M0 630 C140 590 260 600 380 630 C520 665 640 655 768 620 L768 1024 L0 1024 Z" fill="#8b6a3e" opacity="0.44"/>
    <path d="M0 760 C160 710 280 760 420 780 C560 804 670 782 768 748 L768 1024 L0 1024 Z" fill="#5a4328" opacity="0.38"/>
    <path d="M346 1024 C350 900 360 790 382 680 C390 636 400 596 408 560 C417 528 430 504 452 490 C420 484 366 486 336 500 C358 518 364 556 364 597 C362 706 350 842 332 1024 Z" fill="#f3d89f" opacity="0.65"/>
    <path d="M0 515 C80 500 180 520 250 500 C320 480 390 458 460 474 C548 494 652 488 768 452 L768 560 C652 598 548 600 460 576 C390 556 320 580 250 602 C180 620 80 622 0 612 Z" fill="#2d3b54" opacity="0.55"/>
    <path d="M0 468 C110 454 206 470 276 454 C348 438 438 416 530 434 C610 448 688 440 768 420 L768 465 C688 486 610 496 530 486 C438 470 348 488 276 508 C206 524 110 524 0 540 Z" fill="#7ec3f1" opacity="0.50"/>
    <polygon points="76,550 210,430 322,550" fill="#1b2238" opacity="0.55"/>
    <polygon points="252,550 390,392 545,550" fill="#232c49" opacity="0.62"/>
    <polygon points="452,550 620,408 744,550" fill="#1b2238" opacity="0.56"/>
    ${crowd}
    <rect x="372" y="735" width="7" height="28" fill="#2c1e16"/>
    <line x1="368" y1="734" x2="360" y2="694" stroke="#2c1e16" stroke-width="3"/>
  </g>`;
}

function sceneKingdom() {
  return `
  <g opacity="0.95">
    <circle cx="386" cy="345" r="124" fill="#f7d98f" opacity="0.24"/>
    <rect x="90" y="560" width="588" height="92" fill="#2f2632" opacity="0.62"/>
    <rect x="120" y="522" width="54" height="130" fill="#2b2330" opacity="0.66"/>
    <rect x="232" y="534" width="54" height="118" fill="#2b2330" opacity="0.66"/>
    <rect x="482" y="534" width="54" height="118" fill="#2b2330" opacity="0.66"/>
    <rect x="594" y="522" width="54" height="130" fill="#2b2330" opacity="0.66"/>
    <polygon points="384,476 334,560 434,560" fill="#3a2e3f" opacity="0.72"/>
    <rect x="354" y="560" width="60" height="92" fill="#302434" opacity="0.72"/>
    <path d="M328 642 C350 624 374 620 384 620 C394 620 418 624 440 642 L440 704 L328 704 Z" fill="#191420" opacity="0.6"/>
    <path d="M0 780 C160 730 284 760 400 800 C522 842 642 842 768 786 L768 1024 L0 1024 Z" fill="#5f4127" opacity="0.44"/>
    <path d="M46 285 L86 248 L126 285 L112 320 L60 320 Z" fill="#e8c274" opacity="0.24"/>
    <circle cx="86" cy="246" r="10" fill="#e8c274" opacity="0.22"/>
  </g>`;
}

function sceneTemple() {
  return `
  <g opacity="0.95">
    <circle cx="386" cy="330" r="150" fill="#f7d38a" opacity="0.26"/>
    <g fill="#2d2533" opacity="0.7">
      <rect x="250" y="470" width="272" height="172" rx="4"/>
      <polygon points="236,470 386,380 536,470"/>
      <rect x="282" y="510" width="26" height="132" fill="#372d3f"/>
      <rect x="328" y="510" width="26" height="132" fill="#372d3f"/>
      <rect x="418" y="510" width="26" height="132" fill="#372d3f"/>
      <rect x="464" y="510" width="26" height="132" fill="#372d3f"/>
      <rect x="372" y="550" width="28" height="92" fill="#1e1727"/>
    </g>
    <path d="M0 760 C160 730 300 768 410 800 C530 834 654 832 768 794 L768 1024 L0 1024 Z" fill="#5c4530" opacity="0.40"/>
    <path d="M386 384 C362 344 370 304 386 272 C402 304 410 344 386 384 Z" fill="#ffcf72" opacity="0.34"/>
  </g>`;
}

function sceneWisdom(rng) {
  const notes = [];
  for (let i = 0; i < 18; i += 1) {
    const x = 120 + rng() * 530;
    const y = 340 + rng() * 370;
    notes.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 42 + rng() * 25).toFixed(1)}" y2="${(y + (rng() - 0.5) * 8).toFixed(1)}" stroke="#f5e5b7" stroke-opacity="0.14" stroke-width="2"/>`);
  }
  return `
  <g opacity="0.95">
    <rect x="72" y="540" width="624" height="290" rx="24" fill="#f1dfb8" opacity="0.18"/>
    <rect x="92" y="564" width="584" height="244" rx="20" fill="#f7e8c4" opacity="0.10"/>
    <path d="M134 540 C126 590 126 780 134 830" stroke="#e8d0a2" stroke-opacity="0.36" stroke-width="8"/>
    <path d="M634 540 C642 590 642 780 634 830" stroke="#e8d0a2" stroke-opacity="0.36" stroke-width="8"/>
    ${notes.join("\n    ")}
    <ellipse cx="386" cy="846" rx="80" ry="22" fill="#231810" opacity="0.24"/>
    <path d="M362 846 L410 846 L400 770 L372 770 Z" fill="#2f2116" opacity="0.82"/>
    <path d="M386 772 C370 744 378 714 386 694 C394 714 402 744 386 772 Z" fill="#ffc76b" opacity="0.66"/>
  </g>`;
}

function sceneLove(rng) {
  const petals = [];
  for (let i = 0; i < 32; i += 1) {
    const x = rng() * width;
    const y = 210 + rng() * 650;
    const r = 1.5 + rng() * 3;
    petals.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffd7df" opacity="0.38"/>`);
  }
  return `
  <g opacity="0.95">
    <path d="M0 705 C120 655 280 678 402 734 C534 794 654 806 768 776 L768 1024 L0 1024 Z" fill="#48633e" opacity="0.43"/>
    <path d="M0 790 C160 752 302 782 430 836 C552 888 650 890 768 866 L768 1024 L0 1024 Z" fill="#2f4b31" opacity="0.42"/>
    <path d="M14 1024 C26 850 36 730 64 628 C80 574 102 540 134 520" stroke="#8ecb8d" stroke-opacity="0.36" stroke-width="9" fill="none"/>
    <path d="M754 1024 C742 850 732 730 704 628 C688 574 666 540 634 520" stroke="#8ecb8d" stroke-opacity="0.36" stroke-width="9" fill="none"/>
    ${petals.join("\n    ")}
  </g>`;
}

function sceneSuffering() {
  return `
  <g opacity="0.95">
    <path d="M0 260 C120 210 264 236 360 294 C470 362 596 362 768 298 L768 0 L0 0 Z" fill="#1d1d2e" opacity="0.46"/>
    <path d="M0 338 C140 286 302 324 430 382 C544 436 658 430 768 384" stroke="#dfe7ff" stroke-opacity="0.22" stroke-width="10" fill="none"/>
    <polygon points="106,790 268,588 430,790" fill="#2a2a3e" opacity="0.58"/>
    <polygon points="304,810 476,564 652,810" fill="#222236" opacity="0.65"/>
    <path d="M386 578 C412 500 442 440 494 388" stroke="#ffe5a2" stroke-opacity="0.36" stroke-width="9" fill="none"/>
    <rect x="378" y="770" width="10" height="36" fill="#120f11" opacity="0.82"/>
    <circle cx="383" cy="760" r="7" fill="#120f11" opacity="0.82"/>
  </g>`;
}

function sceneProphecy(rng) {
  const lightning = [];
  for (let i = 0; i < 4; i += 1) {
    const x = 140 + i * 160 + rng() * 30;
    lightning.push(`<polyline points="${x.toFixed(0)},220 ${(x - 20).toFixed(0)},292 ${(x + 10).toFixed(0)},292 ${(x - 26).toFixed(0)},366" stroke="#ffe9a8" stroke-opacity="0.46" stroke-width="4" fill="none"/>`);
  }
  return `
  <g opacity="0.95">
    <ellipse cx="180" cy="230" rx="220" ry="90" fill="#17253f" opacity="0.60"/>
    <ellipse cx="384" cy="204" rx="250" ry="98" fill="#1c2d4b" opacity="0.64"/>
    <ellipse cx="600" cy="236" rx="216" ry="94" fill="#17253f" opacity="0.60"/>
    ${lightning.join("\n    ")}
    <rect x="0" y="620" width="768" height="84" fill="#2b2633" opacity="0.58"/>
    <rect x="120" y="562" width="34" height="142" fill="#241f2c" opacity="0.70"/>
    <rect x="592" y="562" width="34" height="142" fill="#241f2c" opacity="0.70"/>
    <path d="M0 802 C142 760 286 774 426 828 C558 876 658 882 768 860 L768 1024 L0 1024 Z" fill="#473428" opacity="0.40"/>
  </g>`;
}

function sceneGospel(rng) {
  const crowd = makeCrowd(rng, 386, 860, 386, 700, 40, "#1d1613");
  return `
  <g opacity="0.95">
    <circle cx="386" cy="352" r="144" fill="#ffd889" opacity="0.34"/>
    <path d="M0 700 C140 646 286 678 410 734 C544 792 648 808 768 778 L768 1024 L0 1024 Z" fill="#5a4330" opacity="0.48"/>
    <path d="M0 804 C180 756 330 808 470 858 C592 902 682 906 768 884 L768 1024 L0 1024 Z" fill="#3f2f23" opacity="0.44"/>
    <path d="M320 612 C358 596 410 596 448 612" stroke="#2a1f1b" stroke-width="10" fill="none"/>
    <line x1="352" y1="548" x2="352" y2="620" stroke="#2a1f1b" stroke-width="8"/>
    <line x1="420" y1="526" x2="420" y2="620" stroke="#2a1f1b" stroke-width="8"/>
    <line x1="386" y1="506" x2="386" y2="620" stroke="#2a1f1b" stroke-width="10"/>
    ${crowd}
  </g>`;
}

function sceneActs(rng) {
  const flames = [];
  for (let i = 0; i < 7; i += 1) {
    const x = 170 + i * 70 + (rng() - 0.5) * 8;
    flames.push(`<path d="M${x} 260 C${x - 10} 240 ${x - 8} 220 ${x} 204 C${x + 8} 220 ${x + 12} 240 ${x} 260 Z" fill="#ffbb54" opacity="0.50"/>`);
  }
  return `
  <g opacity="0.95">
    <rect x="0" y="616" width="768" height="408" fill="#214a62" opacity="0.50"/>
    <path d="M0 666 C112 634 238 640 346 674 C474 716 598 722 768 688" stroke="#9fdcff" stroke-opacity="0.46" stroke-width="22" fill="none"/>
    <path d="M0 770 C160 730 286 760 402 812 C522 868 646 876 768 848" stroke="#7dc8ef" stroke-opacity="0.38" stroke-width="20" fill="none"/>
    <path d="M324 610 L448 610 L430 640 L338 640 Z" fill="#1f1e28" opacity="0.80"/>
    <rect x="382" y="536" width="8" height="74" fill="#1f1e28" opacity="0.86"/>
    <polygon points="390,536 444,570 390,570" fill="#2a2835" opacity="0.86"/>
    <rect x="0" y="550" width="768" height="58" fill="#2d3a4c" opacity="0.46"/>
    ${flames.join("\n    ")}
  </g>`;
}

function sceneEpistle(rng) {
  const lines = [];
  for (let i = 0; i < 18; i += 1) {
    const y = 360 + i * 22;
    const x2 = 166 + 420 + rng() * 80;
    lines.push(`<line x1="166" y1="${y}" x2="${x2.toFixed(1)}" y2="${(y + (rng() - 0.5) * 3).toFixed(1)}" stroke="#705531" stroke-opacity="0.16" stroke-width="2"/>`);
  }
  return `
  <g opacity="0.95">
    <rect x="104" y="274" width="560" height="520" rx="18" fill="#efd8ac" opacity="0.20"/>
    <rect x="132" y="304" width="504" height="460" rx="14" fill="#f5e4be" opacity="0.12"/>
    ${lines.join("\n    ")}
    <ellipse cx="588" cy="760" rx="42" ry="32" fill="#8f2228" opacity="0.50"/>
    <ellipse cx="588" cy="760" rx="30" ry="22" fill="#b4363d" opacity="0.52"/>
    <path d="M248 836 L454 692 L470 710 L264 854 Z" fill="#d9d0c2" opacity="0.42"/>
    <path d="M452 688 L500 664 L474 712 Z" fill="#c5b9a7" opacity="0.45"/>
  </g>`;
}

function sceneRevelation(rng) {
  const stars = [];
  for (let i = 0; i < 7; i += 1) {
    const x = 150 + i * 78 + (rng() - 0.5) * 8;
    const y = 230 + (i % 2) * 20;
    stars.push(`<circle cx="${x.toFixed(1)}" cy="${y}" r="5" fill="#fff5b5" opacity="0.66"/>`);
  }
  return `
  <g opacity="0.95">
    <ellipse cx="386" cy="226" rx="280" ry="112" fill="#222a58" opacity="0.58"/>
    <circle cx="386" cy="344" r="174" fill="#ffe5a3" opacity="0.20"/>
    <polyline points="176,220 148,294 194,294 164,368" stroke="#ffe6a5" stroke-opacity="0.44" stroke-width="4" fill="none"/>
    <polyline points="592,220 564,294 610,294 580,368" stroke="#ffe6a5" stroke-opacity="0.44" stroke-width="4" fill="none"/>
    ${stars.join("\n    ")}
    <rect x="94" y="610" width="580" height="170" fill="#f3d695" opacity="0.16"/>
    <rect x="126" y="572" width="52" height="208" fill="#f3d695" opacity="0.20"/>
    <rect x="590" y="572" width="52" height="208" fill="#f3d695" opacity="0.20"/>
    <rect x="272" y="560" width="56" height="220" fill="#f3d695" opacity="0.20"/>
    <rect x="438" y="560" width="56" height="220" fill="#f3d695" opacity="0.20"/>
  </g>`;
}

function sceneForTheme(theme, rng) {
  switch (theme) {
    case "journey":
      return sceneJourney(rng);
    case "kingdom":
      return sceneKingdom();
    case "temple":
      return sceneTemple();
    case "wisdom":
      return sceneWisdom(rng);
    case "love":
      return sceneLove(rng);
    case "suffering":
      return sceneSuffering();
    case "prophecy":
      return sceneProphecy(rng);
    case "gospel":
      return sceneGospel(rng);
    case "acts":
      return sceneActs(rng);
    case "revelation":
      return sceneRevelation(rng);
    case "epistle":
    default:
      return sceneEpistle(rng);
  }
}

function createSvg(book) {
  const slug = slugify(book);
  const hash = hashString(book);
  const rng = mulberry32(hash);
  const theme = getTheme(slug);
  const palette = palettes[hash % palettes.length];
  const [c1, c2, c3] = palette;
  const lines = splitTitle(book);
  const maxLineLen = Math.max(...lines.map((line) => line.length));

  const widthFactor = maxLineLen >= 12 ? 0.9 : maxLineLen >= 9 ? 0.84 : 0.76;
  const maxFontByWidth = Math.floor((width * 0.78) / (Math.max(maxLineLen, 1) * widthFactor));
  let fontSize = Math.min(126, maxFontByWidth);
  if (lines.length === 2) fontSize = Math.min(fontSize, 96);
  fontSize = Math.max(54, fontSize);
  const letterSpacing = maxLineLen >= 11 ? 0 : maxLineLen >= 8 ? 1 : 2;
  const lineGap = Math.floor(fontSize * 1.15);
  const textStartY = Math.floor(height * 0.55 - ((lines.length - 1) * lineGap) / 2);

  const stars = [];
  for (let i = 0; i < 42; i += 1) {
    const x = Math.floor(rng() * width);
    const y = Math.floor(40 + rng() * (height - 80));
    const r = (0.7 + rng() * 1.8).toFixed(2);
    const opacity = (0.25 + rng() * 0.45).toFixed(2);
    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${opacity}" />`);
  }

  const mist = [];
  for (let i = 0; i < 14; i += 1) {
    const x = Math.floor(rng() * width);
    const y = Math.floor(rng() * height);
    const r = Math.floor(80 + rng() * 220);
    const opacity = (0.04 + rng() * 0.1).toFixed(3);
    const fill = palette[i % 3];
    mist.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${opacity}" />`);
  }

  const textLines = lines
    .map((line, index) => {
      const y = textStartY + index * lineGap;
      return `<text x="50%" y="${y}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" letter-spacing="${letterSpacing}" font-weight="700" fill="#F7F4EA">${escapeXml(line)}</text>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="50%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.38"/>
    </radialGradient>
    <filter id="soften">
      <feGaussianBlur stdDeviation="36"/>
    </filter>
    <filter id="titleShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.62"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <g filter="url(#soften)">
    ${mist.join("\n    ")}
  </g>

  ${sceneForTheme(theme, rng)}

  ${stars.join("\n  ")}
  <rect x="96" y="${Math.floor(textStartY - fontSize * 0.95)}" width="576" height="${Math.floor(fontSize * (lines.length + 0.8))}" rx="26" fill="#000" fill-opacity="0.14"/>
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>

  <g filter="url(#titleShadow)">
    ${textLines}
  </g>
</svg>`;
}

async function fileExists(pathname) {
  try {
    await access(pathname, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  await mkdir(outputDir, { recursive: true });
  let generated = 0;
  let overwritten = 0;
  let skipped = 0;
  const preserve = new Set(["genesis", "exodus"]);

  for (const book of allBooks) {
    const slug = slugify(book);
    const outputPath = path.join(outputDir, `${slug}.png`);
    const exists = await fileExists(outputPath);

    if (exists && preserve.has(slug)) {
      skipped += 1;
      continue;
    }

    const svg = createSvg(book);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outputPath);

    if (exists) overwritten += 1;
    else generated += 1;
  }

  console.log(`Generated ${generated} thumbnails, overwritten ${overwritten}, skipped ${skipped} preserved files.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
