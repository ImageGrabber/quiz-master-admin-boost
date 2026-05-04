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

function routeLooksIndexable(route, options = {}) {
  const { isProtectedRoute = false } = options;
  if (!route || route === '*') return false;
  if (route.includes(':')) return false;
  if (route.includes('*')) return false;
  if (isProtectedRoute) return false;

  const excludedPrefixes = [
    '/admin',
    '/dashboard',
    '/auth',
    '/rls-test',
    '/sentry-test',
    '/challenge',
    '/competitions',
    '/competition-quiz',
    '/competition-leaderboard',
    '/live-quiz',
    '/quiz',
    '/result',
    '/weekly-quiz'
  ];
  const excludedExactRoutes = new Set([
    '/quiz-selection',
    '/create-quiz',
    '/memory-match',
    '/word-search',
    '/joy-runner',
    '/verse-master',
    '/faith-builder',
    '/flappy-bird',
    '/bible-questions-and-answers-hub/rith',
    '/hindi-songs/ek-aag-har-dil-mein-lyrics',
    '/hindi-songs/vandana-karte-hai-hum-lyrics',
    '/hindi-songs/aaradhna-ho-aaradhna-lyrics'
  ]);
  if (excludedExactRoutes.has(route)) return false;
  return !excludedPrefixes.some((prefix) => route.startsWith(prefix));
}

function extractAppLiteralRoutes() {
  const appPath = path.join(__dirname, '../src/App.tsx');
  if (!fs.existsSync(appPath)) return [];

  const source = fs.readFileSync(appPath, 'utf-8');
  const routeTagMatches = [...source.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)];

  if (routeTagMatches.length > 0) {
    return routeTagMatches
      .map((match) => ({
        route: normalizeRoutePath(match[1]),
        isProtectedRoute: /<ProtectedRoute\b/.test(match[2] || '')
      }))
      .filter(({ route, isProtectedRoute }) => routeLooksIndexable(route, { isProtectedRoute }))
      .map(({ route }) => route);
  }

  const fallbackMatches = [...source.matchAll(/<Route\s+path="([^"]+)"/g)];
  return fallbackMatches
    .map((match) => normalizeRoutePath(match[1]))
    .filter((route) => routeLooksIndexable(route));
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

    // Competitive SEO Gap Pages
    { loc: '/bible-quiz-for-sunday-school', priority: '0.9', changefreq: 'monthly' },
    { loc: '/free-bible-quiz-no-signup', priority: '0.9', changefreq: 'monthly' },
    { loc: '/bible-quiz-for-beginners', priority: '0.9', changefreq: 'monthly' },
    { loc: '/old-testament-quiz', priority: '0.9', changefreq: 'monthly' },
    { loc: '/new-testament-quiz', priority: '0.9', changefreq: 'monthly' },
    { loc: '/free-bible-quiz-questions-and-answers', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-trivia-questions-and-answers', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-quiz-for-kids-teens-adults', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-questions', priority: '0.9', changefreq: 'weekly' },
    { loc: '/prayers', priority: '0.9', changefreq: 'weekly' },
    { loc: '/10-commandments-quiz', priority: '0.8', changefreq: 'monthly' },
    { loc: '/bible-quiz-printable-pdf', priority: '0.9', changefreq: 'monthly' },
    { loc: '/bible-quiz-multiplayer', priority: '0.8', changefreq: 'monthly' },
    { loc: '/christmas-bible-quiz', priority: '0.9', changefreq: 'monthly' },
    { loc: '/easter-bible-quiz', priority: '0.9', changefreq: 'monthly' },

    // Bible Verse Topic Hubs
    { loc: '/bible-verses-for-strength', priority: '0.9', changefreq: 'monthly' },
    { loc: '/bible-verses-for-healing', priority: '0.9', changefreq: 'monthly' },
    { loc: '/verses/peace-and-anxiety', priority: '0.9', changefreq: 'monthly' },
    { loc: '/verses/love', priority: '0.8', changefreq: 'monthly' },
    { loc: '/verses/hope', priority: '0.8', changefreq: 'monthly' },
    { loc: '/verses/faith', priority: '0.8', changefreq: 'monthly' },

    // Worship Resources Batch D
    { loc: '/christian-worship-songs-chords', priority: '0.9', changefreq: 'weekly' },
    { loc: '/hindi-christian-songs-lyrics-chords', priority: '0.9', changefreq: 'weekly' },
    { loc: '/easy-worship-songs-for-beginners-guitar', priority: '0.9', changefreq: 'weekly' },

    // Bible Characters Vertical Batch D
    { loc: '/women-of-the-bible', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kings-of-israel', priority: '0.9', changefreq: 'monthly' },
    { loc: '/12-disciples-names-and-facts', priority: '0.9', changefreq: 'monthly' },
    { loc: '/prophets-of-the-bible', priority: '0.9', changefreq: 'monthly' },

    // Devotional Vertical Batch D
    { loc: '/daily-devotional-for-today', priority: '0.95', changefreq: 'daily' },

    // Kids Story Dedicated Pages
    { loc: '/kids-stories/noahs-ark', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kids-stories/david-and-goliath', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kids-stories/creation-story', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kids-stories/moses-and-the-exodus', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kids-stories/daniel-and-the-sleepy-lions', priority: '0.9', changefreq: 'monthly' },
    { loc: '/kids-stories/jonah-and-the-big-fish', priority: '0.9', changefreq: 'monthly' },
    { loc: '/public-quiz', priority: '0.95', changefreq: 'weekly' },
    { loc: '/help/create-quiz', priority: '0.8', changefreq: 'monthly' },
    { loc: '/help/join-live-quizzes', priority: '0.8', changefreq: 'monthly' },
    { loc: '/help/realtime-features', priority: '0.8', changefreq: 'monthly' },
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

  // Public quiz main book pages (high SEO value)
  bibleBooks.forEach(book => {
    urls.push({
      loc: `/public-quiz/${book}`,
      priority: '0.85',
      changefreq: 'weekly'
    });
  });

  // Public Quiz Chapter Pages
  for (const [book, chapters] of Object.entries(bibleStructure)) {
    for (let i = 1; i <= chapters; i++) {
      urls.push({
        loc: `/public-quiz/${book}/chapter-${i}`,
        priority: '0.6',
        changefreq: 'monthly'
      });
    }
  }

  // Article pages - High value
  articles.forEach(article => {
    urls.push({
      loc: `/articles/${article.id}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Song pages (from blog scrape and existing)
  urls.push({ loc: '/songs', priority: '0.9', changefreq: 'weekly' });
  const uniqueSongSlugs = new Set();
  
  // Add hardcoded song slugs
  ['ithratholam-yahova-sahayichu', 'lokamam-gambhira-varidhiyil', 'aswasame-enikkere-thingeedunnu', 'ente-daivam-mahathwathil'].forEach(slug => uniqueSongSlugs.add(slug));

  // Read scraped blog songs
  const scrapedSongsPath = path.join(__dirname, '../src/data/scraped-blog-songs.json');
  if (fs.existsSync(scrapedSongsPath)) {
    try {
      const scrapedSongs = JSON.parse(fs.readFileSync(scrapedSongsPath, 'utf-8'));
      scrapedSongs.forEach((song) => {
        if (song.slug) {
          uniqueSongSlugs.add(song.slug);
        }
      });
    } catch (e) {
      console.error('Error reading scraped songs:', e.message);
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

  // Normalize and deduplicate URLs by location
  const dedupedByLoc = new Map();
  for (const entry of urls) {
    const normalizedLoc = entry.loc === '/' ? '/' : `/${entry.loc.replace(/^\/+|\/+$/g, '').toLowerCase()}`;
    if (!dedupedByLoc.has(normalizedLoc)) {
      dedupedByLoc.set(normalizedLoc, {
        ...entry,
        loc: normalizedLoc
      });
    }
  }
  const finalUrls = Array.from(dedupedByLoc.values());

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  finalUrls.forEach(url => {
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

  console.log(`Generated sitemap with ${finalUrls.length} URLs`);
  console.log(`Sitemap saved to: ${sitemapPath}`);
}

// Run the generator
generateSitemap();
