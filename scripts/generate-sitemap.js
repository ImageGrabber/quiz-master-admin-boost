import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Hardcoded metadata to ensure build stability and bypass ESM/TSX loading conflicts
const bibleStructure = {
    genesis: 50, exodus: 40, leviticus: 27, numbers: 36, deuteronomy: 34,
    joshua: 24, judges: 21, ruth: 4, "1-samuel": 31, "2-samuel": 24,
    "1-kings": 22, "2-kings": 25, "1-chronicles": 29, "2-chronicles": 36,
    ezra: 10, nehemiah: 13, esther: 10, job: 42, psalms: 150,
    proverbs: 31, ecclesiastes: 12, "song-of-solomon": 8,
    isaiah: 66, jeremiah: 52, lamentations: 5, ezekiel: 48, daniel: 12,
    hosea: 14, joel: 3, amos: 9, obadiah: 1, jonah: 4,
    micah: 7, nahum: 3, habakkuk: 3, zephaniah: 3,
    haggai: 2, zechariah: 14, malachi: 4, matthew: 28, mark: 16,
    luke: 24, john: 21, acts: 28, romans: 16, "1-corinthians": 16,
    "2-corinthians": 13, galatians: 6, ephesians: 6, philippians: 4,
    colossians: 4, "1-thessalonians": 5, "2-thessalonians": 3,
    "1-timothy": 6, "2-timothy": 4, titus: 3, philemon: 1,
    hebrews: 13, james: 5, "1-peter": 5, "2-peter": 3, "1-john": 5,
    "2-john": 1, "3-john": 1, jude: 1, revelation: 22
};

const articles = [
    { id: "complete-quiz-guide" }, { id: "quiz-strategies" }, { id: "leaderboard-tips" },
    { id: "david-king-israel" }, { id: "moses-exodus-story" }, { id: "esther-courage-story" },
    { id: "understanding-grace" }, { id: "prayer-life-guide" }, { id: "quiz-time-management" },
    { id: "bible-study-methods" }, { id: "quiz-navigation-guide" }, { id: "quiz-scoring-explained" },
    { id: "quiz-difficulty-levels" }, { id: "quiz-feedback-system" }, { id: "quiz-progress-tracking" },
    { id: "memory-techniques-quiz" }, { id: "quiz-anxiety-management" }, { id: "question-pattern-recognition" },
    { id: "quiz-concentration-techniques" }, { id: "quiz-recovery-strategies" }, { id: "competition-preparation" },
    { id: "team-quiz-strategies" }, { id: "competition-psychology" }, { id: "competition-etiquette" },
    { id: "post-competition-analysis" }, { id: "moses-leadership-lessons" }, { id: "esther-strategic-wisdom" },
    { id: "abraham-faith-journey" }, { id: "joseph-forgiveness-story" }, { id: "ruth-loyalty-devotion" },
    { id: "forgiveness-healing-power" }, { id: "hope-biblical-perspective" }, { id: "love-gods-greatest-commandment" },
    { id: "faith-works-james" }, { id: "peace-gods-promise" }, { id: "scripture-memorization-techniques" },
    { id: "inductive-bible-study" }, { id: "bible-study-journaling" }, { id: "group-bible-study-leading" },
    { id: "bible-study-technology" }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizeRoutePath(route) {
  if (!route || route === '/') return '/';
  return `/${route.replace(/^\/+|\/+$/g, '')}`;
}

function routeLooksIndexable(route) {
  if (!route || route === '*') return false;
  if (route.includes(':')) return false;
  if (route.includes('*')) return false;

  const excludedPrefixes = ['/admin', '/dashboard', '/auth', '/rls-test', '/sentry-test'];
  return !excludedPrefixes.some((prefix) => route.startsWith(prefix));
}

function extractAppLiteralRoutes() {
  const appPath = path.join(__dirname, '../src/App.tsx');
  if (!fs.existsSync(appPath)) return [];

  const source = fs.readFileSync(appPath, 'utf-8');
  const matches = [...source.matchAll(/<Route\s+path="([^"]+)"/g)];
  return matches
    .map((match) => normalizeRoutePath(match[1]))
    .filter(routeLooksIndexable);
}

// Generate comprehensive sitemap
function generateSitemap() {
  const baseUrl = 'https://biblequizcompetition.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [
    // Main pages
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/competition-home', priority: '0.95', changefreq: 'weekly' },
    { loc: '/todays-quiz', priority: '0.95', changefreq: 'daily' },
    { loc: '/articles', priority: '0.9', changefreq: 'weekly' },
    { loc: '/public-leaderboard', priority: '0.8', changefreq: 'daily' },
    { loc: '/host-live-bible-quizzes-with-confidence', priority: '0.9', changefreq: 'monthly' },
    { loc: '/bible-questions-and-answers-hub', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-questions-and-answers-hub/genesis', priority: '0.8', changefreq: 'monthly' },
    { loc: '/rules-and-prizes', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-quiz-questions-and-answers', priority: '0.9', changefreq: 'weekly' },
    { loc: '/hardest-bible-trivia-questions', priority: '0.8', changefreq: 'monthly' },
    { loc: '/bible-quiz-with-answers-for-youth', priority: '0.8', changefreq: 'monthly' },
    { loc: '/book-of-john-quiz-questions', priority: '0.8', changefreq: 'monthly' },
    { loc: '/quiz-scoring-system-explanation', priority: '0.7', changefreq: 'monthly' },
    { loc: '/bible-quiz-prize', priority: '0.7', changefreq: 'monthly' },
    { loc: '/online-bible-quiz-competition-2026', priority: '0.7', changefreq: 'monthly' },
    { loc: '/bible-competition-2026', priority: '0.7', changefreq: 'monthly' },
  ];

  // Genesis chapters
  for (let i = 1; i <= 8; i++) {
    urls.push({
      loc: `/bible-questions-and-answers-hub/genesis/chapter-${i}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  }

  // Genesis full chapters
  for (let i = 1; i <= 3; i++) {
    urls.push({
      loc: `/bible-questions-and-answers-hub/genesis/chapter-${i}-full`,
      priority: '0.9',
      changefreq: 'monthly'
    });
  }

  // Bible books for public quizzes
  const bibleBooks = [
    'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy',
    'joshua', 'judges', 'ruth', '1-samuel', '2-samuel',
    '1-kings', '2-kings', '1-chronicles', '2-chronicles',
    'ezra', 'nehemiah', 'esther', 'job', 'psalms',
    'proverbs', 'ecclesiastes', 'song-of-solomon',
    'isaiah', 'jeremiah', 'lamentations', 'ezekiel', 'daniel',
    'hosea', 'joel', 'amos', 'obadiah', 'jonah',
    'micah', 'nahum', 'habakkuk', 'zephaniah',
    'haggai', 'zechariah', 'malachi', 'matthew', 'mark',
    'luke', 'john', 'acts', 'romans', '1-corinthians',
    '2-corinthians', 'galatians', 'ephesians', 'philippians',
    'colossians', '1-thessalonians', '2-thessalonians',
    '1-timothy', '2-timothy', 'titus', 'philemon',
    'hebrews', 'james', '1-peter', '2-peter', '1-john',
    '2-john', '3-john', 'jude', 'revelation'
  ];

  // Bible Questions and Answers Hub - ONLY INDEX MAIN BOOK HUBS
  bibleBooks.forEach(book => {
    // Main Book Hub is high value
    urls.push({
      loc: `/bible-questions-and-answers-hub/${book}`,
      priority: '0.9',
      changefreq: 'monthly'
    });
  });

  // Public Quiz Chapter Pages (Quality-First Scaling)
  // Restoring these to the sitemap to maintain the "Indexed" count while we improve their quality.
  for (const [book, chapters] of Object.entries(bibleStructure)) {
    for (let i = 1; i <= chapters; i++) {
      urls.push({
        loc: `/public-quiz/${book}/chapter-${i}`,
        priority: '0.5', // Lower priority than hubs
        changefreq: 'monthly'
      });
    }
  }

  // Featured Quizzes (High value specifically curated quizzes)
  // These are handled by the literal routes or manual addition if needed, 
  // but we'll stick to the hubs as the primary indexing entry points.

  // Article pages - High value
  articles.forEach(article => {
    urls.push({
      loc: `/articles/${article.id}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Song pages
  urls.push({ loc: '/songs', priority: '0.9', changefreq: 'weekly' });
  const uniqueSongSlugs = new Set();
  
  // Add hardcoded song slugs
  ['ithratholam-yahova-sahayichu', 'lokamam-gambhira-varidhiyil', 'aswasame-enikkere-thingeedunnu', 'ente-daivam-mahathwathil'].forEach(slug => uniqueSongSlugs.add(slug));

  // Read migrated songs directly from JSON
  const migratedSongsPath = path.join(__dirname, '../src/data/migrated-songs.json');
  if (fs.existsSync(migratedSongsPath)) {
    try {
      const migratedSongs = JSON.parse(fs.readFileSync(migratedSongsPath, 'utf-8'));
      migratedSongs.forEach((song) => {
        if (song.slug) uniqueSongSlugs.add(song.slug);
      });
    } catch (e) {
      console.error('Error reading migrated songs:', e.message);
    }
  }

  for (const slug of uniqueSongSlugs) {
    urls.push({
      loc: `/songs/${slug}`,
      priority: '0.7',
      changefreq: 'monthly'
    });
  }
  console.log(`Added ${uniqueSongSlugs.size} song URLs to sitemap`);

  // English Song pages
  const englishSongsJsonPath = path.join(__dirname, '..', 'src', 'data', 'english-songs.json');
  if (fs.existsSync(englishSongsJsonPath)) {
    const englishSongs = JSON.parse(fs.readFileSync(englishSongsJsonPath, 'utf-8'));
    urls.push({ loc: '/english-songs', priority: '0.9', changefreq: 'weekly' });

    const uniqueEnglishSlugs = new Set();
    for (const song of englishSongs) {
      if (!song.slug || uniqueEnglishSlugs.has(song.slug)) continue;
      uniqueEnglishSlugs.add(song.slug);
      urls.push({
        loc: `/english-songs/${song.slug}`,
        priority: '0.7',
        changefreq: 'monthly'
      });
    }
    console.log(`Added ${uniqueEnglishSlugs.size} English song URLs to sitemap`);
  }

  // Hindi Song pages
  const hindiSongsJsonPath = path.join(__dirname, '..', 'src', 'data', 'hindi-songs.json');
  if (fs.existsSync(hindiSongsJsonPath)) {
    const hindiSongs = JSON.parse(fs.readFileSync(hindiSongsJsonPath, 'utf-8'));
    urls.push({ loc: '/hindi-songs', priority: '0.9', changefreq: 'weekly' });

    const uniqueHindiSlugs = new Set();
    for (const song of hindiSongs) {
      if (!song.slug || uniqueHindiSlugs.has(song.slug)) continue;
      uniqueHindiSlugs.add(song.slug);
      urls.push({
        loc: `/hindi-songs/${song.slug}`,
        priority: '0.7',
        changefreq: 'monthly'
      });
    }
    console.log(`Added ${uniqueHindiSlugs.size} Hindi song URLs to sitemap`);
  }

  // Kids Stories
  const kidsStoriesJsonPath = path.join(__dirname, '..', 'src', 'data', 'kids-stories.json');
  if (fs.existsSync(kidsStoriesJsonPath)) {
    const kidsStories = JSON.parse(fs.readFileSync(kidsStoriesJsonPath, 'utf-8'));
    urls.push({ loc: '/kids-stories', priority: '0.9', changefreq: 'weekly' });

    for (const story of kidsStories) {
      if (!story.slug) continue;
      urls.push({
        loc: `/kids-stories/${story.slug}`,
        priority: '0.8',
        changefreq: 'monthly'
      });
    }
    console.log(`Added ${kidsStories.length} Kids Story URLs to sitemap`);
  }

  // Include all literal public routes from App.tsx so sitemap stays in sync with routing.
  const appRoutes = extractAppLiteralRoutes();
  const existingLocs = new Set(urls.map((url) => url.loc));
  let addedLiteralRoutes = 0;

  for (const route of appRoutes) {
    if (existingLocs.has(route)) continue;
    urls.push({
      loc: route,
      priority: '0.6',
      changefreq: 'monthly'
    });
    existingLocs.add(route);
    addedLiteralRoutes += 1;
  }

  console.log(`Added ${addedLiteralRoutes} additional literal routes from App.tsx`);

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    const cleanLoc = url.loc === '/' ? '' : url.loc.replace(/\/+$/, '').toLowerCase();
    sitemap += `
  <url>
    <loc>${baseUrl}${cleanLoc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  console.log(`Generated sitemap with ${urls.length} URLs`);
  console.log(`Sitemap saved to: ${sitemapPath}`);
}

// Run the generator
generateSitemap();
