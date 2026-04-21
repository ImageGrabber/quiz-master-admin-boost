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

const bookNames = {
    "genesis": "Genesis", "exodus": "Exodus", "leviticus": "Leviticus", "numbers": "Numbers", "deuteronomy": "Deuteronomy",
    "joshua": "Joshua", "judges": "Judges", "ruth": "Ruth", "1-samuel": "1 Samuel", "2-samuel": "2 Samuel",
    "1-kings": "1 Kings", "2-kings": "2 Kings", "1-chronicles": "1 Chronicles", "2-chronicles": "2 Chronicles",
    "ezra": "Ezra", "nehemiah": "Nehemiah", "esther": "Esther", "job": "Job", "psalms": "Psalms",
    "proverbs": "Proverbs", "ecclesiastes": "Ecclesiastes", "song-of-solomon": "Song of Solomon"
};

const articles = [
    { 
        id: "complete-quiz-guide", 
        title: "The Complete Guide to Bible Quiz Competition: How to Master Every Quiz",
        excerpt: "Learn everything you need to know about using our Bible quiz platform effectively.",
        author: "Quiz Master Team",
        publishDate: "2024-12-20",
        readTime: "12 min read",
        content: "Explore our comprehensive guide...",
        tags: ["Guide", "Tutorial"]
    },
    { 
        id: "quiz-strategies", 
        title: "5 Proven Strategies to Improve Your Bible Quiz Scores",
        excerpt: "Discover expert techniques used by top performers.",
        author: "Dr. Sarah Johnson",
        publishDate: "2024-12-18",
        readTime: "8 min read",
        content: "Master time management and more...",
        tags: ["Strategy", "Tips"]
    },
    { 
        id: "bible-study-methods", 
        title: "5 Effective Bible Study Methods for Quiz Preparation",
        excerpt: "Discover proven Bible study techniques.",
        author: "Dr. David Thompson",
        publishDate: "2024-11-28",
        readTime: "8 min read",
        content: "From inductive study to memorization...",
        tags: ["Bible Study", "Methods"]
    }
];

// Reference migrated and scraped songs directly
const migratedSongsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/migrated-songs.json');
const scrapedSongsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/scraped-blog-songs.json');

let allSongs = [
    { slug: "ithratholam-yahova-sahayichu", title: "Ithratholam Yahova Sahayichu", description: "Worship along with this beautiful melody." },
    { slug: "lokamam-gambhira-varidhiyil", title: "Lokamam Gambhira Varidhiyil", description: "Christian Malayalam Devotional Song." }
];

if (fs.existsSync(migratedSongsPath)) {
    try {
        const migrated = JSON.parse(fs.readFileSync(migratedSongsPath, 'utf-8'));
        allSongs = [...allSongs, ...migrated.slice(0, 50)];
    } catch (e) {
        console.error('Error reading migrated songs:', e.message);
    }
}

if (fs.existsSync(scrapedSongsPath)) {
    try {
        const scraped = JSON.parse(fs.readFileSync(scrapedSongsPath, 'utf-8'));
        allSongs = [...allSongs, ...scraped];
    } catch (e) {
        console.error('Error reading scraped songs:', e.message);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of critical pages that need static HTML fallbacks
const criticalPages = [
  {
    path: '/',
    title: 'Bible Quiz Competition | Weekly Online Bible Quizzes',
    description: 'Join weekly Bible quizzes, host live sessions, and climb the leaderboard. Free to join, fun for all ages.',
    content: `
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-center mb-8">Bible Quiz Competition</h1>
          <p class="text-xl text-center mb-8">Join weekly Bible quizzes, host live sessions, and climb the leaderboard. Free to join, fun for all ages.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Genesis Quiz</h2>
              <p class="mb-4">Test your knowledge of the book of Genesis with our comprehensive quiz.</p>
              <a href="/public-quiz/genesis" class="bg-blue-600 text-white px-4 py-2 rounded">Take Quiz</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Exodus Quiz</h2>
              <p class="mb-4">Challenge yourself with questions about the book of Exodus.</p>
              <a href="/public-quiz/exodus" class="bg-blue-600 text-white px-4 py-2 rounded">Take Quiz</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Psalms Quiz</h2>
              <p class="mb-4">Explore the wisdom and poetry of the Psalms.</p>
              <a href="/public-quiz/psalms" class="bg-blue-600 text-white px-4 py-2 rounded">Take Quiz</a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: '/articles',
    title: 'Bible Study Articles & Resources | Bible Quiz Competition',
    description: 'Discover comprehensive Bible study articles, quiz preparation guides, and spiritual growth resources.',
    content: `
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-center mb-8">Bible Study Articles & Resources</h1>
          <p class="text-xl text-center mb-8">Discover comprehensive Bible study articles, quiz preparation guides, and spiritual growth resources.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Complete Quiz Guide</h2>
              <p class="mb-4">Learn how to prepare for Bible quizzes with our comprehensive guide.</p>
              <a href="/articles/complete-quiz-guide" class="bg-blue-600 text-white px-4 py-2 rounded">Read More</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Quiz Strategies</h2>
              <p class="mb-4">Master effective strategies for Bible quiz competitions.</p>
              <a href="/articles/quiz-strategies" class="bg-blue-600 text-white px-4 py-2 rounded">Read More</a>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-4">Bible Study Methods</h2>
              <p class="mb-4">Discover proven methods for effective Bible study.</p>
              <a href="/articles/bible-study-methods" class="bg-blue-600 text-white px-4 py-2 rounded">Read More</a>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: '/rules-and-prizes',
    title: 'Bible Quiz Competition Rules, Prizes & Scoring System',
    description: 'Official Bible Quiz Competition rules and scoring system explanation, including prize details and timer bonus information.',
    content: `
      <div class="min-h-screen bg-slate-50">
        <div class="container mx-auto px-4 py-10">
          <h1 class="text-4xl font-bold text-slate-900 mb-6">Bible Quiz Competition Rules, Prizes & Scoring System</h1>
          <p class="text-lg text-slate-600 mb-8">Understand how quiz scoring works, how timer bonuses are applied, and how prize eligibility is determined.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-3">Scoring</h2>
              <p>Daily and weekly quizzes use points and timer bonus; public quizzes emphasize percentage accuracy.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-3">Prizes</h2>
              <p>Prize opportunities vary by event and leaderboard rank, including badges and special competition rewards.</p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow">
              <h2 class="text-2xl font-semibold mb-3">Fair Play</h2>
              <p>One account per person and no external assistance during timed events.</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="/todays-quiz" class="bg-blue-600 text-white px-4 py-2 rounded">Start Today&apos;s Quiz</a>
            <a href="/public-quiz/nehemiah" class="bg-white border border-slate-200 px-4 py-2 rounded">Nehemiah Quiz</a>
            <a href="/public-quiz/2-thessalonians" class="bg-white border border-slate-200 px-4 py-2 rounded">2 Thessalonians Quiz</a>
            <a href="/public-quiz/philemon" class="bg-white border border-slate-200 px-4 py-2 rounded">Philemon Quiz</a>
          </div>
        </div>
      </div>
    `
  }
];

// Bible books for quiz pages
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

function escapeHtml(unsafe) {
  if (unsafe === undefined || unsafe === null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upsertMetaTag(html, attr, key, content) {
  const escapedKey = escapeRegex(key);
  const regex = new RegExp(`<meta\\s+${attr}=["']${escapedKey}["'][\\s\\S]*?\\/?>`, 'i');
  const replacement = `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `${replacement}\n</head>`);
}

function upsertCanonical(html, href) {
  const regex = /<link\s+rel=["']canonical["'][\s\S]*?\/?>/i;
  const replacement = `<link rel="canonical" href="${href}" />`;
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `${replacement}\n</head>`);
}

function stripHtmlTags(value = '') {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(value = '') {
  if (!value.trim()) return 0;
  return value.trim().split(/\s+/).length;
}

function startCaseFromSlug(value = '') {
  return value
    .replace(/[-_/]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildSeoNarrative(page, targetWords = 330) {
  // Logic removed to prevent duplicate content filters.
  // Instead of a generic sentence bank, we rely on specific page content.
  return '';
}

function ensureSeoWordRange(page) {
  // We no longer pad pages with boilerplate text to hit a word count.
  // Quality and uniqueness are prioritized over artificial length.
  return page.content || '';
}

function normalizeRoutePath(route) {
  if (!route || route === '/') return '/';
  const trimmed = route.replace(/^\/+|\/+$/g, '');
  return `/${trimmed}`;
}

function getOutputPathsForRoute(distDir, route) {
  const normalizedRoute = normalizeRoutePath(route);
  if (normalizedRoute === '/') {
    return {
      primary: path.join(distDir, 'index.html')
    };
  }

  const routeWithoutLeadingSlash = normalizedRoute.slice(1);
  return {
    primary: path.join(distDir, routeWithoutLeadingSlash, 'index.html')
  };
}

function routeOutputExists(distDir, route) {
  const { primary } = getOutputPathsForRoute(distDir, route);
  return fs.existsSync(primary);
}

function writeRouteHtml(distDir, route, html) {
  const { primary } = getOutputPathsForRoute(distDir, route);
  
  const dir = path.dirname(primary);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(primary, html);

  return primary;
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
    '/flappy-bird'
  ]);
  if (excludedExactRoutes.has(route)) return false;
  return !excludedPrefixes.some((prefix) => route.startsWith(prefix));
}

function extractSitemapRoutes(distDir) {
  const sitemapCandidates = [
    path.join(distDir, 'sitemap.xml'),
    path.join(__dirname, '../public/sitemap.xml')
  ];

  const sitemapPath = sitemapCandidates.find((candidate) => fs.existsSync(candidate));
  if (!sitemapPath) return [];

  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const matches = [...xml.matchAll(/<loc>https:\/\/biblequizcompetition\.com([^<]*)<\/loc>/g)];
  return matches
    .map((match) => normalizeRoutePath(match[1] || '/'))
    .filter(routeLooksIndexable);
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

function buildGenericPageFromRoute(route) {
  const normalized = normalizeRoutePath(route);
  const routeParts = normalized === '/' ? ['home'] : normalized.slice(1).split('/');
  const heading = routeParts[routeParts.length - 1];
  const titleTopic = startCaseFromSlug(heading || 'home');
  const routeLabel = routeParts.map((part) => startCaseFromSlug(part)).join(' • ');

  let title = `${titleTopic} | Bible Quiz Competition`;
  let description = `Study and learn more about ${titleTopic} at Bible Quiz Competition.`;

  if (normalized.includes('bible-questions-and-answers-hub')) {
    title = `${titleTopic} Hub & Quizzes | Bible QA`;
    description = `Deep dive into ${titleTopic} with our comprehensive Bible study hub, featuring specialized quizzes and structured learning paths.`;
  } else if (normalized.includes('songs')) {
    title = `${titleTopic} Lyrics & Worship | Bible Quiz Songs`;
    description = `Access complete lyrics, background, and video for ${titleTopic}. Part of our collection of Christian devotional music and worship resources.`;
  } else if (normalized.includes('kids-stories')) {
    title = `${titleTopic} | Children's Bible Story`;
    description = `An engaging Bible story about ${titleTopic} for kids. Includes interactive elements, moral lessons, and quizzes to help children learn biblical truths.`;
  } else if (normalized.includes('verses')) {
    title = `${titleTopic} | Powerful Bible Verses & Reflections`;
    description = `Explore curated Bible verses for ${titleTopic}. Find spiritual strength, comfort, and wisdom through scripture and meditative reflections.`;
  } else if (normalized.includes('quiz')) {
    title = `${titleTopic} Quiz | Test Your Bible Knowledge`;
    description = `Take our interactive ${titleTopic} quiz. Challenge your understanding of scripture with fun, educational questions for all levels.`;
  }

  return {
    path: normalized,
    title,
    description,
    content: `
      <div class="min-h-screen bg-slate-50 pt-20">
        <div class="container mx-auto px-4 py-10">
          <article class="max-w-4xl mx-auto rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h1 class="text-4xl font-bold text-slate-900 mb-4">${escapeHtml(titleTopic)}</h1>
            <p class="text-lg text-slate-600 leading-relaxed">
              Welcome to the ${escapeHtml(titleTopic)} resource page. This section of Bible Quiz Competition is designed to help you deepen your understanding of Scripture through targeted study and interactive learning.
            </p>
          </article>
        </div>
      </div>
    `
  };
}

function evaluateSeoQuality(page, contentWithSeo) {
  const wordCount = countWords(stripHtmlTags(contentWithSeo));
  const titleLength = (page.title || '').trim().length;
  const descriptionLength = (page.description || '').trim().length;
  const hasH1 = /<h1[\s>]/i.test(contentWithSeo);

  let score = 0;
  if (wordCount >= 300 && wordCount <= 400) score += 45;
  else if (wordCount >= 250 && wordCount <= 450) score += 25;
  else score += 8;

  if (titleLength >= 45 && titleLength <= 70) score += 20;
  else if (titleLength >= 30 && titleLength <= 80) score += 12;
  else score += 5;

  if (descriptionLength >= 120 && descriptionLength <= 170) score += 20;
  else if (descriptionLength >= 80 && descriptionLength <= 220) score += 12;
  else score += 5;

  if (hasH1) score += 15;

  let quality = 'poor';
  if (score >= 80) quality = 'good';
  else if (score >= 60) quality = 'fair';

  return {
    wordCount,
    titleLength,
    descriptionLength,
    hasH1,
    seoScore: score,
    seoQuality: quality
  };
}

// Generate HTML using the app shell template
function generateHTML(page, templateHtml, contentWithSeo = ensureSeoWordRange(page)) {
  let html = templateHtml;
  
  // Normalize Canonical URL: lowercase, no trailing slash
  const cleanPath = page.path === '/' ? '' : page.path.replace(/\/+$/, '').toLowerCase();
  const pageUrl = `https://biblequizcompetition.com${cleanPath}`;

  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  // Core SEO tags
  html = upsertMetaTag(html, 'name', 'description', page.description);
  html = upsertCanonical(html, pageUrl);

  // Indexing instruction
  if (page.noindex) {
    html = upsertMetaTag(html, 'name', 'robots', 'noindex, follow');
  } else {
    // Default to index, follow if not explicitly noindexed
    html = upsertMetaTag(html, 'name', 'robots', 'index, follow');
  }

  // Social metadata
  html = upsertMetaTag(html, 'property', 'og:title', page.title);
  html = upsertMetaTag(html, 'property', 'og:description', page.description);
  html = upsertMetaTag(html, 'property', 'og:url', pageUrl);
  html = upsertMetaTag(html, 'name', 'twitter:title', page.title);
  html = upsertMetaTag(html, 'name', 'twitter:description', page.description);
  html = upsertMetaTag(html, 'name', 'twitter:url', pageUrl);


  // Add structured data
  if (page.structuredData) {
    const jsonLd = `<script type="application/ld+json">${JSON.stringify(page.structuredData)}</script>`;
    html = html.replace('</head>', `${jsonLd}\n</head>`);
  }

  // Inject content into the root div
  // This assumes the index.html has <div id="root"></div> or similar
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${contentWithSeo}</div>`);
  } else if (html.includes('<div id="root">')) {
    // Handle case where it might not be empty or has attributes
    html = html.replace('<div id="root">', `<div id="root">${contentWithSeo}`);
  }

  return html;
}

// Generate static pages
function generateStaticPages() {
  const distDir = path.join(__dirname, '../dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  // Check if dist exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ dist directory not found. Run vite build first.');
    process.exit(1);
  }

  // Read the template
  let templateHtml = '';
  try {
    templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  } catch (err) {
    console.error('❌ Could not read dist/index.html:', err.message);
    process.exit(1);
  }

  const seoAuditEntries = new Map();

  const writePageAndTrackSeo = (page, contextLabel = 'Generated') => {
    const contentWithSeo = ensureSeoWordRange(page);
    const html = generateHTML(page, templateHtml, contentWithSeo);
    const primaryPath = writeRouteHtml(distDir, page.path, html);
    const metrics = evaluateSeoQuality(page, contentWithSeo);

    seoAuditEntries.set(page.path, {
      path: page.path,
      title: page.title,
      description: page.description,
      ...metrics
    });

    if (contextLabel) {
      console.log(`${contextLabel}: ${primaryPath}`);
    }
  };

  // Generate critical pages
  criticalPages.forEach(page => {
    writePageAndTrackSeo(page, 'Generated');
  });

  // Generate quiz pages
  bibleBooks.forEach(book => {
    const bookName = book.charAt(0).toUpperCase() + book.slice(1).replace('-', ' ');
    const page = {
      path: `/public-quiz/${book}`,
      title: `${bookName} Quiz - Free Bible Quiz | Bible Quiz Competition`,
      description: `Test your knowledge of ${bookName} with this free interactive Bible quiz. Challenge your understanding of the Bible with our comprehensive quiz.`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Quiz",
        "name": `${bookName} Quiz`,
        "description": `Test your knowledge of the book of ${bookName} with this interactive quiz.`,
        "educationalAlignment": {
          "@type": "AlignmentObject",
          "alignmentType": "educationalSubject",
          "targetName": "Bible Knowledge"
        },
        "about": {
          "@type": "Thing",
          "name": bookName
        }
      },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-center mb-8">${bookName} Quiz</h1>
            <p class="text-xl text-center mb-8">Test your knowledge of ${bookName} with this free interactive Bible quiz.</p>
            <div class="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
              <h2 class="text-2xl font-semibold mb-4">About This Quiz</h2>
              <p class="mb-6">This quiz covers key themes, characters, and events from the book of ${bookName}. Perfect for Bible study groups, personal study, or quiz competitions.</p>
              <div class="text-center">
                 <div class="animate-pulse bg-blue-200 h-10 w-48 mx-auto rounded"></div>
                 <p class="text-sm text-gray-500 mt-2">Loading interactive quiz...</p>
              </div>
            </div>
          </div>
        </div>
      `
    };

    writePageAndTrackSeo(page, 'Generated quiz page');
  });

  // Generate article pages
  articles.forEach(article => {
    const page = {
      path: `/articles/${article.id}`,
      title: `${article.title} | Bible Quiz Competition`,
      description: article.excerpt,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "image": article.imageUrl ? `https://biblequizcompetition.com${article.imageUrl}` : "https://biblequizcompetition.com/images/og-default.jpg",
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "datePublished": article.publishDate,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://biblequizcompetition.com/articles/${article.id}`
        }
      },
      content: `
        <div class="min-h-screen bg-gray-50 pt-20">
          <div class="container mx-auto px-4 py-8">
            <article class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="w-full h-64 object-cover">` : ''}
              <div class="p-8">
                <h1 class="text-4xl font-bold mb-4">${article.title}</h1>
                <div class="flex items-center text-gray-500 mb-8 space-x-4">
                  <span>By ${article.author}</span>
                  <span>•</span>
                  <span>${article.publishDate}</span>
                  <span>•</span>
                  <span>${article.readTime}</span>
                </div>
                <div class="prose max-w-none">
                  <p class="text-xl text-gray-700 mb-6 font-medium">${article.excerpt}</p>
                  <div class="text-gray-800 leading-relaxed">
                    ${article.content}
                  </div>
                </div>
                <div class="mt-8 pt-8 border-t border-gray-100">
                  <div class="flex flex-wrap gap-2">
                    ${article.tags.map((tag) => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      `
    };

    try {
      writePageAndTrackSeo(page, 'Generated article page');
    } catch (err) {
      console.error(`Error generating article page ${article.id}:`, err);
    }
  });

  // Generate Chapter Pages (Programmatic SEO)
  console.log('Generating Bible chapter pages...');

  // Simple category mapping based on typical Bible divisions
  const bibleCategories = {
    genesis: "Pentateuch", exodus: "Pentateuch", leviticus: "Pentateuch", numbers: "Pentateuch", deuteronomy: "Pentateuch",
    matthew: "Gospels", mark: "Gospels", luke: "Gospels", john: "Gospels",
    acts: "History", romans: "Pauline Epistles", revelation: "Apocalyptic"
  };

  for (const [book, chapters] of Object.entries(bibleStructure)) { 
    const bookName = bookNames[book] || book.charAt(0).toUpperCase() + book.slice(1);
    const category = bibleCategories[book.toLowerCase()] || 'Bible Story';
    
    for (let i = 1; i <= chapters; i++) {
      const chapter = `chapter-${i}`;
      
      // Define the difficulty levels to generate
      const levels = [
        { id: '', title: 'General', focus: 'a comprehensive overview of key events' },
        { id: 'beginner', title: 'Beginner', focus: 'primary characters and main story arcs' },
        { id: 'intermediate', title: 'Intermediate', focus: 'deeper historical context and thematic elements' },
        { id: 'advanced', title: 'Advanced', focus: 'theological nuances and original language insights' }
      ];

      levels.forEach(level => {
        const subPath = level.id ? `/${level.id}` : '';
        const displayTitle = level.id ? `${bookName} Chapter ${i} ${level.title} Quiz` : `${bookName} Chapter ${i} Quiz`;
        
        const page = {
          path: `/public-quiz/${book}/${chapter}${subPath}`,
          title: `${displayTitle} - Free Bible Quiz`,
          description: `Master ${bookName} Chapter ${i} with our ${level.title.toLowerCase()} level quiz. Focuses on ${level.focus} within the ${category} category.`,
          noindex: false,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": displayTitle,
            "description": `Test your knowledge of ${bookName} Chapter ${i} with this ${level.title.toLowerCase()} interactive quiz.`,
            "educationalAlignment": {
              "@type": "AlignmentObject",
              "alignmentType": "educationalSubject",
              "targetName": "Bible Knowledge"
            },
            "about": {
              "@type": "Thing",
              "name": `${bookName} Chapter ${i}`
            },
            "mainEntity": {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `How many questions are in the ${bookName} Chapter ${i} quiz?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `There are typically 5 to 10 professionally curated questions in the ${bookName} Chapter ${i} quiz, each with detailed biblical explanations.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `Is the ${bookName} Chapter ${i} quiz free to play?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, all chapter-level Bible quizzes on our platform including ${bookName} Chapter ${i} are 100% free and require no registration.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `What is the focus of ${bookName} Chapter ${i} study?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `The study focuses on the historical context, key theological themes, and significant narrative events found specifically within ${bookName} Chapter ${i}.`
                  }
                }
              ]
            }
          },
          content: `
              <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white pt-20">
              <div class="container mx-auto px-4 py-8">
                  <nav class="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                    <a href="/" class="hover:text-blue-600">Home</a> &raquo;
                    <a href="/bible-questions-and-answers-hub" class="hover:text-blue-600">Bible Q&A Hub</a> &raquo;
                    <a href="/bible-questions-and-answers-hub/${book}" class="hover:text-blue-600">${bookName}</a> &raquo;
                    <span class="text-gray-800">Chapter ${i}${level.id ? ' (' + level.title + ')' : ''}</span>
                  </nav>

                  <div class="max-w-6xl mx-auto shadow-2xl border-0 bg-white rounded-xl overflow-hidden">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                      <h1 class="text-2xl font-bold">${displayTitle}</h1>
                      <p class="text-blue-100 mt-1 text-sm">Category: ${category} &bull; ${bookName} &bull; Chapter ${i} of ${chapters}</p>
                  </div>
                  <div class="p-8">
                      <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 class="text-xl font-bold text-gray-900 mb-2">About This Quiz</h2>
                        <p class="text-gray-700 mb-3">
                          Welcome to the <strong>${level.title.toLowerCase()} level</strong> quiz covering <strong>${bookName} Chapter ${i}</strong>.
                          This chapter is part of the <strong>${category}</strong> section of the Bible and presents important themes
                          that are central to both historical understanding and personal faith.
                        </p>
                        <p class="text-gray-700 mb-3">
                          At the <strong>${level.title.toLowerCase()}</strong> difficulty, you will be tested on <strong>${level.focus}</strong>.
                          Whether you are preparing for a Bible quiz competition, studying for a church group, or deepening your personal
                          knowledge of Scripture, this quiz provides a structured way to engage with the text.
                        </p>
                      </div>

                      <div class="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h2 class="text-lg font-bold text-gray-900 mb-2">Key Themes in ${bookName} Chapter ${i}</h2>
                        <ul class="list-disc list-inside text-gray-700 space-y-1">
                          <li>Understanding the narrative context within <strong>${bookName}</strong> as a whole</li>
                          <li>Identifying major characters, events, and divine interactions in Chapter ${i}</li>
                          <li>Connecting themes from Chapter ${i} to the broader message of the <strong>${category}</strong></li>
                          <li>Applying lessons from this chapter to modern faith and daily life</li>
                        </ul>
                      </div>

                      <div class="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <h2 class="text-lg font-bold text-gray-900 mb-2">What You Will Learn</h2>
                        <p class="text-gray-700 mb-2">
                          By completing this ${level.title.toLowerCase()} quiz, you will strengthen your recall of the specific events narrated
                          in ${bookName} Chapter ${i}, understand the theological significance of those events within the ${category},
                          and build confidence for competitive Bible quizzing or personal Bible study.
                        </p>
                        <p class="text-gray-700">
                          Each question is crafted to reinforce your comprehension and encourage deeper exploration of the text.
                          After completing the quiz, review your score breakdown to identify areas for further study.
                        </p>
                      </div>

                      <div class="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="bg-white border rounded-lg p-3 text-center">
                          <div class="text-2xl font-bold text-blue-600">10</div>
                          <div class="text-xs text-gray-500">Questions</div>
                        </div>
                        <div class="bg-white border rounded-lg p-3 text-center">
                          <div class="text-2xl font-bold text-purple-600">${level.title}</div>
                          <div class="text-xs text-gray-500">Difficulty</div>
                        </div>
                        <div class="bg-white border rounded-lg p-3 text-center">
                          <div class="text-2xl font-bold text-green-600">Free</div>
                          <div class="text-xs text-gray-500">No signup required</div>
                        </div>
                      </div>

                      <div class="flex items-center gap-3 mb-6">
                           <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                           <span class="text-blue-600 font-medium">Loading ${level.title.toLowerCase()} quiz engine...</span>
                      </div>

                      <div class="border-t pt-6">
                        <h3 class="text-md font-bold text-gray-800 mb-3">Explore More ${bookName} Quizzes</h3>
                        <div class="flex flex-wrap gap-2">
                          ${i > 1 ? `<a href="/public-quiz/${book}/chapter-${i-1}" class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-100 text-gray-700">← Chapter ${i-1}</a>` : ''}
                          ${i < chapters ? `<a href="/public-quiz/${book}/chapter-${i+1}" class="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-100 text-gray-700">Chapter ${i+1} →</a>` : ''}
                          <a href="/bible-questions-and-answers-hub/${book}" class="px-3 py-1 bg-blue-100 rounded-full text-sm hover:bg-blue-200 text-blue-700">All ${bookName} Chapters</a>
                          <a href="/public-quiz/${book}/${chapter}/verse-1" class="px-3 py-1 bg-purple-100 rounded-full text-sm hover:bg-purple-200 text-purple-700">${bookName} ${i}:1 Deep Dive</a>
                        </div>
                      </div>
                  </div>
                  </div>
              </div>
              </div>`
        };

        try {
          writePageAndTrackSeo(page, '');
        } catch (err) {
          console.error(`Error generating chapter page ${book} ${chapter} ${level.id}:`, err);
        }
      });

      // Special: Verse 1 Deep-Dive Page (granular SEO)
      const versePage = {
        path: `/public-quiz/${book}/${chapter}/verse-1`,
        title: `${bookName} Chapter ${i}:1 Meaning and Context | Bible Quiz`,
        description: `Explore the meaning, historical context, and cross-references for the opening verse of ${bookName} Chapter ${i}.`,
        noindex: false,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${bookName} Chapter ${i}:1 Deep Dive`,
          "description": `Theological analysis of ${bookName} Chapter ${i} Verse 1.`
        },
        content: `
            <div class="min-h-screen bg-gray-50 pt-20">
              <div class="container mx-auto px-4 py-8">
                <nav class="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                  <a href="/" class="hover:text-blue-600">Home</a> &raquo;
                  <a href="/bible-questions-and-answers-hub/${book}" class="hover:text-blue-600">${bookName}</a> &raquo;
                  <a href="/public-quiz/${book}/${chapter}" class="hover:text-blue-600">Chapter ${i}</a> &raquo;
                  <span class="text-gray-800">Verse 1 Study</span>
                </nav>

                <div class="max-w-3xl mx-auto">
                  <div class="bg-white p-10 rounded-3xl shadow-2xl border border-blue-100 mb-8">
                    <span class="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-bold mb-6">VERSE STUDY</span>
                    <h1 class="text-4xl font-extrabold text-gray-900 mb-4">${bookName} ${i}:1</h1>
                    <p class="text-2xl italic text-blue-800 leading-relaxed mb-6">"In the beginning..."</p>
                    <div class="h-1 w-24 bg-blue-600 mb-8 rounded-full"></div>

                    <h2 class="text-xl font-bold text-gray-900 mb-3">Context & Commentary</h2>
                    <p class="text-gray-700 leading-relaxed text-lg mb-4">
                      The opening verse of <strong>${bookName} Chapter ${i}</strong> sets the stage for the narrative within the <strong>${category}</strong>.
                      This scripture is central to understanding the theological foundation of the book. Scholars and pastors alike emphasize this verse
                      as a pivotal transition point connecting the themes of the preceding chapters with what follows.
                    </p>
                    <p class="text-gray-700 leading-relaxed mb-6">
                      When studying ${bookName} ${i}:1, it is helpful to consider the historical period in which these events took place,
                      the original audience, and the literary genre of the passage. The ${category} genre carries specific conventions
                      that shape how we interpret each verse and its application to modern faith practice.
                    </p>
                  </div>

                  <div class="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 mb-8">
                    <h2 class="text-lg font-bold text-gray-900 mb-3">📖 Study Questions for ${bookName} ${i}:1</h2>
                    <ol class="list-decimal list-inside text-gray-700 space-y-2">
                      <li>What is the main action or declaration made in this opening verse?</li>
                      <li>Who are the key figures mentioned or implied in Chapter ${i}?</li>
                      <li>How does this verse connect to the broader theme of ${bookName}?</li>
                      <li>What does this verse reveal about God's character or plan?</li>
                      <li>How can you apply the lesson of ${bookName} ${i}:1 to your daily life?</li>
                    </ol>
                  </div>

                  <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 mb-8">
                    <h2 class="text-lg font-bold text-gray-900 mb-3">🔗 Cross-References & Related Passages</h2>
                    <p class="text-gray-700 mb-3">
                      To deepen your understanding of ${bookName} ${i}:1, explore these related areas of Scripture.
                      Cross-referencing passages provides a fuller picture of the biblical narrative and helps connect themes across the Old and New Testaments.
                    </p>
                    <div class="flex flex-wrap gap-2">
                      ${i > 1 ? `<a href="/public-quiz/${book}/chapter-${i-1}/verse-1" class="px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-100">${bookName} ${i-1}:1</a>` : ''}
                      ${i < chapters ? `<a href="/public-quiz/${book}/chapter-${i+1}/verse-1" class="px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-100">${bookName} ${i+1}:1</a>` : ''}
                      <a href="/public-quiz/${book}/${chapter}/beginner" class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 hover:bg-blue-100">Beginner Quiz</a>
                      <a href="/public-quiz/${book}/${chapter}/advanced" class="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full text-sm text-purple-700 hover:bg-purple-100">Advanced Quiz</a>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/public-quiz/${book}/${chapter}" class="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-center">Take Chapter ${i} Quiz</a>
                    <a href="/bible-questions-and-answers-hub/${book}" class="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition text-center">Explore ${bookName} Hub</a>
                  </div>
                </div>
              </div>
            </div>`
      };
      
      try {
        writePageAndTrackSeo(versePage, '');
      } catch (err) {
        console.error(`Error generating verse page ${book} ${chapter}:`, err);
      }
    }
  }
  console.log(`Generated ${Object.values(bibleStructure).reduce((a, b) => a + b, 0)} chapter pages.`);

  // Generate songs listing page
  const songsListingPage = {
    path: '/songs',
    title: 'Christian Devotional Songs | Bible Quiz Competition',
    description: 'Browse Christian devotional songs with lyrics and videos in Malayalam and other languages.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Christian Devotional Songs",
      "description": "A collection of Christian devotional song lyrics and videos.",
      "url": "https://biblequizcompetition.com/songs"
    },
    content: `
      <div class="min-h-screen bg-gray-50 pt-20">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Christian Devotional Songs</h1>
          <p class="text-lg text-gray-600 mb-8">Read lyrics and watch worship songs. Browse our complete collection of devotional music.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${allSongs.slice(0, 60).map((song) => `
              <a href="/songs/${song.slug}" class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 class="text-lg font-semibold text-gray-900">${escapeHtml(song.title)}</h2>
                <p class="text-sm text-gray-600 mt-2">${escapeHtml(song.description)}</p>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `
  };

  writePageAndTrackSeo(songsListingPage, 'Generated songs listing page');

  // Generate individual song pages & Language Variants
  let generatedSongPages = 0;
  for (const song of allSongs) {
    if (!song.slug) continue;

    const variants = [
      { id: '', title: 'Lyrics', type: 'lyrics' },
      { id: 'telugu-lyrics', title: 'Telugu Lyrics', type: 'translation' },
      { id: 'kannada-lyrics', title: 'Kannada Lyrics', type: 'translation' },
      { id: 'malayalam-lyrics', title: 'Malayalam Lyrics', type: 'translation' },
      { id: 'english-translation', title: 'English Translation', type: 'translation' },
      { id: 'chords', title: 'Chords & Strumming', type: 'chords' }
    ];

    variants.forEach(variant => {
      const subPath = variant.id ? `/${variant.id}` : '';
      const displayTitle = `${song.title} ${variant.title}`;
      
        const songPage = {
        path: `/songs/${song.slug}${subPath}`,
        title: `${displayTitle} | Christian Song Lyrics & Chords | Bible Quiz Competition`,
        description: `Read ${variant.title}, chords, and spiritual details for ${song.title}. Part of our high-quality worship resource collection for Bible study groups.`,
        noindex: false,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          "name": displayTitle,
          "description": song.description || `Full ${variant.title.toLowerCase()} for ${song.title}`,
          "url": `https://biblequizcompetition.com/songs/${song.slug}${subPath}`,
          "genre": "Worship / Christian",
          "inLanguage": "Mixed",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          }
        },
        content: `
            <div class="min-h-screen bg-gray-50 pt-20">
              <div class="container mx-auto px-4 py-8">
                <!-- Breadcrumbs -->
                <nav class="flex text-sm text-gray-500 mb-8 items-center">
                  <a href="/" class="hover:text-blue-600 transition-colors">Home</a>
                  <span class="mx-2">&raquo;</span>
                  <a href="/songs" class="hover:text-blue-600 transition-colors">Songs</a>
                  <span class="mx-2">&raquo;</span>
                  <span class="text-gray-900 font-medium truncate">${escapeHtml(song.title)}</span>
                </nav>

                <div class="flex flex-col lg:flex-row gap-8">
                  <!-- Main Content -->
                  <article class="flex-grow bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div class="bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 p-8 md:p-12 text-white">
                      <div class="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Worship Resource</div>
                      <h1 class="text-3xl md:text-5xl font-bold mb-4">${escapeHtml(song.title)}</h1>
                      <div class="flex flex-wrap gap-4 text-blue-100 font-light truncate">
                        <span class="flex items-center"><span class="mr-2 opacity-50">#</span> ${escapeHtml(variant.title)}</span>
                        ${song.category ? `<span class="flex items-center"><span class="mr-2 opacity-50">#</span> ${escapeHtml(song.category)}</span>` : ''}
                      </div>
                    </div>
                    
                    <div class="p-8 md:p-12">
                      <div class="prose prose-lg max-w-none">
                        <div class="whitespace-pre-wrap font-mono text-gray-800 bg-gray-50 p-6 md:p-10 rounded-2xl border border-gray-100 leading-relaxed text-sm md:text-lg">
${escapeHtml(song.content || 'Lyrics are being prepared for this song. Please check back shortly for the full worship content, chords, and translations.')}
                        </div>
                      </div>
                      
                      <div class="mt-12 pt-8 border-t border-gray-100">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Bible Study Discussion</h3>
                        <p class="text-gray-600 mb-6 font-light">How does "${escapeHtml(song.title)}" reflect historical biblical themes? Share your thoughts and study notes with our community.</p>
                        <a href="/auth/register" class="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all">Join Discussion</a>
                      </div>
                    </div>
                  </article>

                  <!-- Sidebar -->
                  <aside class="w-full lg:w-96 space-y-8">
                    <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                      <h4 class="text-lg font-bold text-gray-900 mb-6">Song Information</h4>
                      <dl class="space-y-4">
                        <div class="flex justify-between border-b border-gray-50 pb-2">
                          <dt class="text-gray-500 text-sm">Language</dt>
                          <dd class="text-gray-900 font-medium">Hindi / Christian</dd>
                        </div>
                        <div class="flex justify-between border-b border-gray-50 pb-2">
                          <dt class="text-gray-500 text-sm">Category</dt>
                          <dd class="text-gray-900 font-medium">Worship</dd>
                        </div>
                        <div class="flex justify-between border-b border-gray-50 pb-2">
                          <dt class="text-gray-500 text-sm">Resource Type</dt>
                          <dd class="text-gray-900 font-medium">${variant.title}</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="bg-indigo-900 p-8 rounded-3xl shadow-lg text-white">
                      <h4 class="text-lg font-bold mb-4">Daily Bible Challenge</h4>
                      <p class="text-indigo-200 text-sm mb-6 leading-relaxed">Pair your worship with a deep dive into the Word. Take today's featured quiz.</p>
                      <a href="/daily-bible-quiz" class="block w-full py-4 bg-white text-indigo-900 rounded-2xl text-center font-bold text-sm hover:bg-indigo-50 transition-all">Take Daily Quiz</a>
                    </div>

                    <div class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                      <h4 class="text-lg font-bold text-gray-900 mb-6">Explore More</h4>
                      <ul class="space-y-3">
                        <li><a href="/songs" class="text-blue-600 hover:underline text-sm flex items-center">&rarr; All Worship Songs</a></li>
                        <li><a href="/bible-characters" class="text-blue-600 hover:underline text-sm flex items-center">&rarr; Bible Characters Hub</a></li>
                        <li><a href="/bible-questions-and-answers-hub" class="text-blue-600 hover:underline text-sm flex items-center">&rarr; Bible Q&A Hub</a></li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>`
      };

      try {
        writePageAndTrackSeo(songPage, '');
        generatedSongPages += 1;
      } catch (err) {
        console.error(`Error generating song variation ${song.slug} ${variant.id}:`, err);
      }
    });
  }
  console.log(`Generated ${generatedSongPages} song and variant pages.`);

  // =============================================================
  // PHASE 1: Competitive SEO Gap Pages (20 new landing pages)
  // =============================================================
  console.log('Generating competitive SEO gap pages...');

  const seoGapPages = [
    // --- Quiz Landing Pages ---
    {
      path: '/bible-quiz-for-sunday-school',
      title: 'Bible Quiz for Sunday School | Free Questions & Answers',
      description: 'Free Bible quiz questions and answers perfect for Sunday school classes. Age-appropriate, printable, and organized by difficulty level for teachers and students.',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What Bible quiz questions are good for Sunday school?", "acceptedAnswer": { "@type": "Answer", "text": "Start with stories children know well — Creation, Noah's Ark, David and Goliath, and the parables of Jesus. Our quizzes cover all 66 books with age-appropriate questions." }},
          { "@type": "Question", "name": "Are these Sunday school quizzes free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! All quizzes on Bible Quiz Competition are completely free with no registration required." }},
          { "@type": "Question", "name": "Can I print these quizzes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Each quiz page is printer-friendly. Just use your browser's print function or download our PDF versions." }}
        ]
      },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-4"><a href="/">Home</a> &raquo; <span>Sunday School Quiz</span></nav>
            <div class="max-w-4xl mx-auto">
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 text-white">
                  <h1 class="text-3xl font-bold mb-2">Bible Quiz for Sunday School</h1>
                  <p class="text-yellow-100">Free questions & answers for teachers, students, and church groups</p>
                </div>
                <div class="p-8">
                  <h2 class="text-xl font-bold text-gray-900 mb-3">Why Use Bible Quizzes in Sunday School?</h2>
                  <p class="text-gray-700 mb-4">Bible quizzes are one of the most effective tools for Sunday school teachers to reinforce lessons and keep students engaged. Research shows that active recall — the process of retrieving information through questions — strengthens memory retention far more than passive reading alone. Our quizzes are specifically designed for church settings, covering all 66 books of the Bible with age-appropriate difficulty levels.</p>

                  <h2 class="text-xl font-bold text-gray-900 mb-3">How to Use These Quizzes</h2>
                  <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li><strong>Individual study:</strong> Students can take quizzes before or after class to prepare</li>
                    <li><strong>Group competition:</strong> Split your class into teams and compete live</li>
                    <li><strong>Printable worksheets:</strong> Use our printer-friendly format for offline activities</li>
                    <li><strong>Progress tracking:</strong> Students can track their scores and see improvement over time</li>
                  </ul>

                  <h2 class="text-xl font-bold text-gray-900 mb-3">Popular Sunday School Quiz Topics</h2>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    <a href="/public-quiz/genesis/chapter-1/beginner" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Creation Story</strong><br><span class="text-sm text-gray-500">Genesis 1</span></a>
                    <a href="/public-quiz/genesis/chapter-6/beginner" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Noah's Ark</strong><br><span class="text-sm text-gray-500">Genesis 6-9</span></a>
                    <a href="/public-quiz/exodus/chapter-1/beginner" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Moses & Exodus</strong><br><span class="text-sm text-gray-500">Exodus 1-14</span></a>
                    <a href="/public-quiz/matthew/chapter-1/beginner" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Birth of Jesus</strong><br><span class="text-sm text-gray-500">Matthew 1-2</span></a>
                    <a href="/quizzes/parables-of-jesus" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Parables of Jesus</strong><br><span class="text-sm text-gray-500">Interactive</span></a>
                    <a href="/public-quiz/acts/chapter-1/beginner" class="bg-blue-50 p-3 rounded-lg text-center hover:bg-blue-100 transition"><strong>Early Church</strong><br><span class="text-sm text-gray-500">Acts 1-5</span></a>
                  </div>

                  <h2 class="text-xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                  <div class="space-y-4 mb-6">
                    <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">What Bible quiz questions are good for Sunday school?</h3><p class="text-gray-600 mt-1">Start with stories children know well — Creation, Noah's Ark, David and Goliath, and the parables of Jesus. Our quizzes cover all 66 books with age-appropriate questions.</p></div>
                    <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">Are these Sunday school quizzes free?</h3><p class="text-gray-600 mt-1">Yes! All quizzes on Bible Quiz Competition are completely free with no registration required.</p></div>
                    <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">Can I print these quizzes?</h3><p class="text-gray-600 mt-1">Yes. Each quiz page is printer-friendly. Just use your browser's print function or download our PDF versions.</p></div>
                  </div>

                  <div class="flex flex-wrap gap-3">
                    <a href="/bible-quiz-questions-and-answers" class="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition">Browse All Quizzes</a>
                    <a href="/bible-quiz-for-beginners" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">Beginner Quizzes</a>
                    <a href="/kids-stories" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">Kids Bible Stories</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/free-bible-quiz-no-signup',
      title: 'Free Bible Quiz — No Signup, No Registration Required',
      description: 'Take free Bible quizzes instantly with no signup, no email, and no registration. Covers all 66 books with beginner to advanced difficulty levels.',
      structuredData: { "@context": "https://schema.org", "@type": "WebPage", "name": "Free Bible Quiz - No Signup Required", "description": "Instant access to Bible quizzes with no registration." },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Free Bible Quiz — No Signup Required</h1>
                <p class="text-green-100">Start playing instantly. No email, no registration, no strings attached.</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">Unlike other quiz platforms that force you to create an account before you can play, Bible Quiz Competition gives you <strong>instant access to every quiz</strong> on the site. Simply pick a book of the Bible, choose your difficulty level, and start answering questions right away.</p>
                <h2 class="text-xl font-bold mb-3">Why No Signup?</h2>
                <p class="text-gray-700 mb-4">We believe that studying God's Word should be accessible to everyone without barriers. Creating an account is optional — it unlocks leaderboard tracking and progress saving, but <strong>every quiz is fully playable without it</strong>.</p>
                <h2 class="text-xl font-bold mb-3">What's Included for Free</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-1 mb-6">
                  <li>Interactive quizzes for all 66 books of the Bible</li>
                  <li>Beginner, Intermediate, and Advanced difficulty levels</li>
                  <li>Instant score feedback with answer explanations</li>
                  <li>Chapter-by-chapter study quizzes (1,189 chapters)</li>
                  <li>Daily quiz challenges updated every 24 hours</li>
                  <li>Verse deep-dive study pages</li>
                </ul>
                <h2 class="text-xl font-bold mb-3">Start a Quiz Now</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <a href="/public-quiz/genesis/chapter-1" class="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100">Genesis</a>
                  <a href="/public-quiz/psalms/chapter-1" class="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100">Psalms</a>
                  <a href="/public-quiz/matthew/chapter-1" class="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100">Matthew</a>
                  <a href="/public-quiz/revelation/chapter-1" class="bg-green-50 p-3 rounded-lg text-center hover:bg-green-100">Revelation</a>
                </div>
                <a href="/bible-questions-and-answers-hub" class="inline-block px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition">Browse All 66 Books →</a>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/bible-quiz-for-beginners',
      title: 'Bible Quiz for Beginners | Easy Bible Questions & Answers',
      description: 'Easy Bible quiz questions perfect for beginners. Start your Bible learning journey with simple, encouraging questions from Genesis to Revelation.',
      structuredData: { "@context": "https://schema.org", "@type": "WebPage", "name": "Bible Quiz for Beginners" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-sky-500 to-blue-500 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Quiz for Beginners</h1>
                <p class="text-sky-100">Start your Bible knowledge journey with easy, encouraging questions</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">New to Bible study? Our beginner quizzes are designed to build your confidence and foundational knowledge. Each question focuses on the <strong>most well-known stories, characters, and teachings</strong> of the Bible — no obscure trivia or trick questions.</p>
                <h2 class="text-xl font-bold mb-3">What Makes Our Beginner Quizzes Different?</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li><strong>Clear, simple language</strong> — No theological jargon or complex phrasing</li>
                  <li><strong>Focused on main stories</strong> — Creation, Noah, Moses, Jesus, and the Apostles</li>
                  <li><strong>Encouraging feedback</strong> — Learn from every question, right or wrong</li>
                  <li><strong>Progressive difficulty</strong> — When you're ready, step up to Intermediate and Advanced</li>
                </ul>
                <h2 class="text-xl font-bold mb-3">Recommended Starting Points</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <a href="/public-quiz/genesis/chapter-1/beginner" class="flex items-center gap-3 bg-sky-50 p-4 rounded-lg hover:bg-sky-100 transition"><span class="text-2xl">📖</span><div><strong>Genesis 1 - Creation</strong><p class="text-sm text-gray-500">The very beginning — perfect first quiz</p></div></a>
                  <a href="/public-quiz/matthew/chapter-1/beginner" class="flex items-center gap-3 bg-sky-50 p-4 rounded-lg hover:bg-sky-100 transition"><span class="text-2xl">✝️</span><div><strong>Matthew 1 - Life of Jesus</strong><p class="text-sm text-gray-500">Start the New Testament journey</p></div></a>
                  <a href="/public-quiz/psalms/chapter-23/beginner" class="flex items-center gap-3 bg-sky-50 p-4 rounded-lg hover:bg-sky-100 transition"><span class="text-2xl">🎵</span><div><strong>Psalm 23 - The Lord is My Shepherd</strong><p class="text-sm text-gray-500">The most beloved Psalm</p></div></a>
                  <a href="/public-quiz/john/chapter-3/beginner" class="flex items-center gap-3 bg-sky-50 p-4 rounded-lg hover:bg-sky-100 transition"><span class="text-2xl">❤️</span><div><strong>John 3 - For God So Loved</strong><p class="text-sm text-gray-500">The heart of the Gospel</p></div></a>
                </div>
                <a href="/bible-questions-and-answers-hub" class="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Explore All Beginner Quizzes →</a>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/old-testament-quiz',
      title: 'Old Testament Quiz Questions & Answers | Free Bible Quiz',
      description: 'Test your knowledge of the Old Testament with free quiz questions covering Genesis through Malachi. Includes beginner, intermediate, and advanced levels.',
      structuredData: { "@context": "https://schema.org", "@type": "Quiz", "name": "Old Testament Quiz", "about": { "@type": "Thing", "name": "Old Testament" } },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-amber-600 to-yellow-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Old Testament Quiz</h1>
                <p class="text-amber-100">39 books from Genesis to Malachi — test your knowledge across all of them</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">The Old Testament contains <strong>39 books spanning thousands of years</strong> of history, prophecy, poetry, and law. From the creation of the world in Genesis to the final prophecies of Malachi, this section of Scripture lays the foundation for everything that follows in the New Testament.</p>
                <h2 class="text-xl font-bold mb-3">Old Testament Sections</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 class="font-bold text-amber-800 mb-2">📜 Pentateuch (Torah)</h3>
                    <p class="text-sm text-gray-600 mb-2">The five books of Moses — the foundation of biblical law and narrative.</p>
                    <div class="flex flex-wrap gap-1">${['genesis','exodus','leviticus','numbers','deuteronomy'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-amber-100">' + b.charAt(0).toUpperCase() + b.slice(1) + '</a>').join('')}</div>
                  </div>
                  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 class="font-bold text-amber-800 mb-2">📚 Historical Books</h3>
                    <p class="text-sm text-gray-600 mb-2">The story of Israel from conquest to exile — Joshua through Esther.</p>
                    <div class="flex flex-wrap gap-1">${['joshua','judges','ruth','1-samuel','2-samuel'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-amber-100">' + (bookNames[b]||b) + '</a>').join('')}</div>
                  </div>
                  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 class="font-bold text-amber-800 mb-2">🎵 Poetry & Wisdom</h3>
                    <p class="text-sm text-gray-600 mb-2">Job, Psalms, Proverbs, Ecclesiastes, and Song of Solomon.</p>
                    <div class="flex flex-wrap gap-1">${['job','psalms','proverbs','ecclesiastes','song-of-solomon'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-amber-100">' + (bookNames[b]||b) + '</a>').join('')}</div>
                  </div>
                  <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h3 class="font-bold text-amber-800 mb-2">🔥 Prophets</h3>
                    <p class="text-sm text-gray-600 mb-2">Major and minor prophets — Isaiah through Malachi.</p>
                    <div class="flex flex-wrap gap-1">${['isaiah','jeremiah','ezekiel','daniel','hosea','amos','jonah'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-amber-100">' + (bookNames[b]||b) + '</a>').join('')}</div>
                  </div>
                </div>
                <a href="/new-testament-quiz" class="inline-block px-8 py-4 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition">Try New Testament Quiz →</a>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/new-testament-quiz',
      title: 'New Testament Quiz Questions & Answers | Free Bible Quiz',
      description: 'Test your New Testament knowledge with free quizzes covering Matthew through Revelation. Includes the Gospels, Epistles, and Apocalyptic literature.',
      structuredData: { "@context": "https://schema.org", "@type": "Quiz", "name": "New Testament Quiz", "about": { "@type": "Thing", "name": "New Testament" } },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">New Testament Quiz</h1>
                <p class="text-indigo-100">27 books from Matthew to Revelation — the life of Jesus and the early Church</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">The New Testament is the cornerstone of Christian faith, containing <strong>27 books that record the life, death, and resurrection of Jesus Christ</strong>, the birth of the Church, and letters of guidance to early Christian communities. Test your knowledge across all sections — from the Gospels to the Revelation of John.</p>
                <h2 class="text-xl font-bold mb-3">New Testament Sections</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="bg-indigo-50 p-4 rounded-lg"><h3 class="font-bold text-indigo-800 mb-2">✝️ The Gospels</h3><p class="text-sm text-gray-600 mb-2">Four accounts of Jesus' life, ministry, death, and resurrection.</p>
                    <div class="flex flex-wrap gap-1">${['matthew','mark','luke','john'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-indigo-100">' + b.charAt(0).toUpperCase() + b.slice(1) + '</a>').join('')}</div>
                  </div>
                  <div class="bg-indigo-50 p-4 rounded-lg"><h3 class="font-bold text-indigo-800 mb-2">📖 Acts & History</h3><p class="text-sm text-gray-600 mb-2">The spread of the Gospel from Jerusalem to Rome.</p>
                    <a href="/public-quiz/acts/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-indigo-100">Acts</a>
                  </div>
                  <div class="bg-indigo-50 p-4 rounded-lg"><h3 class="font-bold text-indigo-800 mb-2">✉️ Paul's Letters</h3><p class="text-sm text-gray-600 mb-2">Theological foundations for the Christian faith.</p>
                    <div class="flex flex-wrap gap-1">${['romans','1-corinthians','galatians','ephesians','philippians'].map(b => '<a href="/public-quiz/' + b + '/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-indigo-100">' + (bookNames[b]||b) + '</a>').join('')}</div>
                  </div>
                  <div class="bg-indigo-50 p-4 rounded-lg"><h3 class="font-bold text-indigo-800 mb-2">🔮 Revelation</h3><p class="text-sm text-gray-600 mb-2">Apocalyptic prophecy and the ultimate victory of God.</p>
                    <a href="/public-quiz/revelation/chapter-1" class="text-xs px-2 py-1 bg-white rounded border hover:bg-indigo-100">Revelation</a>
                  </div>
                </div>
                <a href="/old-testament-quiz" class="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">← Try Old Testament Quiz</a>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/10-commandments-quiz',
      title: '10 Commandments Quiz | Test Your Knowledge of Exodus 20',
      description: 'Can you name all 10 Commandments? Take our free quiz to test your knowledge of God\'s law given to Moses on Mount Sinai in Exodus 20.',
      structuredData: { "@context": "https://schema.org", "@type": "Quiz", "name": "10 Commandments Quiz" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-stone-700 to-stone-900 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">10 Commandments Quiz</h1>
                <p class="text-stone-300">Can you name all 10? Test your knowledge of God's law from Exodus 20.</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">The Ten Commandments are among the most well-known passages in all of Scripture. Given by God to Moses on Mount Sinai, these commandments form the moral foundation of both Jewish and Christian ethics. But can you list all ten from memory? Do you know the difference between how they are numbered in Catholic, Protestant, and Jewish traditions?</p>
                <h2 class="text-xl font-bold mb-3">The Ten Commandments (Exodus 20:1-17)</h2>
                <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-6 bg-stone-50 p-6 rounded-xl">
                  <li>You shall have no other gods before Me</li>
                  <li>You shall not make for yourself an idol</li>
                  <li>You shall not take the name of the Lord your God in vain</li>
                  <li>Remember the Sabbath day, to keep it holy</li>
                  <li>Honor your father and your mother</li>
                  <li>You shall not murder</li>
                  <li>You shall not commit adultery</li>
                  <li>You shall not steal</li>
                  <li>You shall not bear false witness</li>
                  <li>You shall not covet</li>
                </ol>
                <div class="flex flex-wrap gap-3 mb-6">
                  <a href="/public-quiz/exodus/chapter-20" class="px-6 py-3 bg-stone-700 text-white rounded-xl font-bold hover:bg-stone-800 transition">Take the Exodus 20 Quiz</a>
                  <a href="/public-quiz/deuteronomy/chapter-5" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">Deuteronomy 5 Version</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },

    // --- Bible Verse Topic Hubs ---
    {
      path: '/verses/strength',
      title: 'Bible Verses About Strength | 30+ Scriptures for Hard Times',
      description: 'Find strength in God\'s Word. 30+ powerful Bible verses about strength, courage, and perseverance for when you need encouragement most.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Bible Verses About Strength" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Verses About Strength</h1>
                <p class="text-red-100">30+ Scriptures for courage, perseverance, and hard times</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-6">When life feels overwhelming, the Bible offers powerful reminders that our strength comes from God. Whether you're facing illness, loss, financial hardship, or emotional exhaustion, these verses have sustained believers for thousands of years.</p>
                <div class="space-y-4 mb-6">
                  <blockquote class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"><p class="text-lg italic text-gray-800">"I can do all things through Christ who strengthens me."</p><cite class="text-sm text-red-700 mt-1 block">— Philippians 4:13</cite></blockquote>
                  <blockquote class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500"><p class="text-lg italic text-gray-800">"The Lord is my strength and my shield; my heart trusts in Him, and He helps me."</p><cite class="text-sm text-orange-700 mt-1 block">— Psalm 28:7</cite></blockquote>
                  <blockquote class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"><p class="text-lg italic text-gray-800">"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."</p><cite class="text-sm text-red-700 mt-1 block">— Joshua 1:9</cite></blockquote>
                  <blockquote class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500"><p class="text-lg italic text-gray-800">"But those who hope in the Lord will renew their strength. They will soar on wings like eagles."</p><cite class="text-sm text-orange-700 mt-1 block">— Isaiah 40:31</cite></blockquote>
                  <blockquote class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500"><p class="text-lg italic text-gray-800">"God is our refuge and strength, an ever-present help in trouble."</p><cite class="text-sm text-red-700 mt-1 block">— Psalm 46:1</cite></blockquote>
                </div>
                <div class="flex flex-wrap gap-3">
                  <a href="/verses/hope" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Hope</a>
                  <a href="/verses/love" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Love</a>
                  <a href="/verses/faith" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Faith</a>
                  <a href="/verses/peace-and-anxiety" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Peace</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/verses/love',
      title: 'Bible Verses About Love | God\'s Love, Romantic Love & More',
      description: 'Discover the Bible\'s most powerful verses about love. From God\'s unconditional love to romantic love and love for others — 30+ scriptures with context.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Bible Verses About Love" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-pink-600 to-rose-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Verses About Love</h1>
                <p class="text-pink-100">God's love, sacrificial love, romantic love, and love for others</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-6">Love is the central theme of the entire Bible. From Genesis to Revelation, God's love for humanity drives the entire narrative of Scripture. Whether you're looking for wedding readings, encouragement, or a deeper understanding of divine love, these verses illuminate every dimension of love.</p>
                <div class="space-y-4 mb-6">
                  <blockquote class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500"><p class="text-lg italic text-gray-800">"For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life."</p><cite class="text-sm text-pink-700 mt-1 block">— John 3:16</cite></blockquote>
                  <blockquote class="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500"><p class="text-lg italic text-gray-800">"Love is patient, love is kind. It does not envy, it does not boast, it is not proud."</p><cite class="text-sm text-rose-700 mt-1 block">— 1 Corinthians 13:4</cite></blockquote>
                  <blockquote class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500"><p class="text-lg italic text-gray-800">"Dear friends, let us love one another, for love comes from God."</p><cite class="text-sm text-pink-700 mt-1 block">— 1 John 4:7</cite></blockquote>
                  <blockquote class="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500"><p class="text-lg italic text-gray-800">"Above all, love each other deeply, because love covers over a multitude of sins."</p><cite class="text-sm text-rose-700 mt-1 block">— 1 Peter 4:8</cite></blockquote>
                </div>
                <div class="flex flex-wrap gap-3">
                  <a href="/verses/strength" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Strength</a>
                  <a href="/verses/hope" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Hope</a>
                  <a href="/verses/faith" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Faith</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/verses/hope',
      title: 'Bible Verses About Hope | Scriptures for Encouragement',
      description: 'Find hope in Scripture. 25+ Bible verses about hope, encouragement, and God\'s promises for the future when you need reassurance.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Bible Verses About Hope" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-cyan-600 to-sky-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Verses About Hope</h1>
                <p class="text-cyan-100">25+ scriptures for encouragement when times are tough</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-6">Biblical hope is not wishful thinking — it is a confident expectation rooted in God's character and promises. When the world feels dark and uncertainty abounds, the Bible offers a firm anchor for the soul through these transformative verses about hope.</p>
                <div class="space-y-4 mb-6">
                  <blockquote class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500"><p class="text-lg italic text-gray-800">"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."</p><cite class="text-sm text-cyan-700 mt-1 block">— Jeremiah 29:11</cite></blockquote>
                  <blockquote class="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-500"><p class="text-lg italic text-gray-800">"Now faith is confidence in what we hope for and assurance about what we do not see."</p><cite class="text-sm text-sky-700 mt-1 block">— Hebrews 11:1</cite></blockquote>
                  <blockquote class="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500"><p class="text-lg italic text-gray-800">"May the God of hope fill you with all joy and peace as you trust in Him."</p><cite class="text-sm text-cyan-700 mt-1 block">— Romans 15:13</cite></blockquote>
                </div>
                <div class="flex flex-wrap gap-3">
                  <a href="/verses/strength" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Strength</a>
                  <a href="/verses/love" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Love</a>
                  <a href="/verses/faith" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Faith</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/verses/faith',
      title: 'Bible Verses About Faith | Scriptures to Strengthen Your Belief',
      description: 'Deepen your faith with 25+ powerful Bible verses about trusting God, walking by faith, and the heroes of faith from Hebrews 11.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Bible Verses About Faith" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Verses About Faith</h1>
                <p class="text-violet-100">25+ scriptures to strengthen your trust in God</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-6">Faith is the foundation of the Christian life. The Bible defines it, illustrates it through the lives of heroes like Abraham, Moses, and David, and calls every believer to grow in it. These verses will encourage you whether your faith is strong or struggling.</p>
                <div class="space-y-4 mb-6">
                  <blockquote class="bg-violet-50 p-4 rounded-lg border-l-4 border-violet-500"><p class="text-lg italic text-gray-800">"Now faith is confidence in what we hope for and assurance about what we do not see."</p><cite class="text-sm text-violet-700 mt-1 block">— Hebrews 11:1</cite></blockquote>
                  <blockquote class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500"><p class="text-lg italic text-gray-800">"For we walk by faith, not by sight."</p><cite class="text-sm text-purple-700 mt-1 block">— 2 Corinthians 5:7</cite></blockquote>
                  <blockquote class="bg-violet-50 p-4 rounded-lg border-l-4 border-violet-500"><p class="text-lg italic text-gray-800">"Trust in the Lord with all your heart and lean not on your own understanding."</p><cite class="text-sm text-violet-700 mt-1 block">— Proverbs 3:5</cite></blockquote>
                  <blockquote class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500"><p class="text-lg italic text-gray-800">"If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move."</p><cite class="text-sm text-purple-700 mt-1 block">— Matthew 17:20</cite></blockquote>
                </div>
                <div class="flex flex-wrap gap-3">
                  <a href="/verses/strength" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Strength</a>
                  <a href="/verses/love" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Love</a>
                  <a href="/verses/hope" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Verses About Hope</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },

    // --- Kids Story Dedicated Pages ---
    {
      path: '/kids-stories/noahs-ark',
      title: "Noah's Ark Story for Kids | Bible Story with Quiz",
      description: "Read the story of Noah's Ark told simply for children. Includes a fun quiz, key lessons, and discussion questions for Sunday school and home study.",
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Noah's Ark Story for Kids", "audience": { "@type": "EducationalAudience", "educationalRole": "student" } },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white"><h1 class="text-3xl font-bold mb-2">🚢 Noah's Ark — The Great Flood</h1><p class="text-blue-100">A Bible story for children from Genesis 6-9</p></div>
              <div class="p-8">
                <h2 class="text-xl font-bold mb-3">The Story</h2>
                <p class="text-gray-700 mb-3">A long, long time ago, the world had become very wicked. People had forgotten about God and were doing terrible things. But there was one man who loved God with all his heart — his name was <strong>Noah</strong>.</p>
                <p class="text-gray-700 mb-3">God told Noah, "I am going to send a great flood to wash the earth clean. But I want to save you and your family. Build a big boat — an <strong>ark</strong> — and bring two of every kind of animal inside."</p>
                <p class="text-gray-700 mb-3">Noah obeyed God even though people laughed at him. He worked for many years building the enormous ark. When it was finished, the animals came — <strong>two by two</strong> — lions, elephants, birds, even tiny insects! Then Noah, his wife, his three sons, and their wives went inside.</p>
                <p class="text-gray-700 mb-3">It rained for <strong>40 days and 40 nights</strong>. Water covered the entire earth, even the tallest mountains. But everyone inside the ark was safe! After many months, the water began to go down. Noah sent out a dove, and it came back with an olive branch — a sign that dry land had appeared!</p>
                <p class="text-gray-700 mb-6">When everyone finally left the ark, God put a beautiful <strong>rainbow</strong> in the sky. He promised Noah, "I will never flood the entire earth again." Every rainbow reminds us of God's promise.</p>
                <h2 class="text-xl font-bold mb-3">🤔 Discussion Questions</h2>
                <ol class="list-decimal list-inside text-gray-700 space-y-2 mb-6">
                  <li>Why did God choose Noah to build the ark?</li>
                  <li>How long did it rain during the flood?</li>
                  <li>What did the dove bring back to Noah?</li>
                  <li>What does the rainbow mean to you?</li>
                </ol>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/genesis/chapter-6/beginner" class="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold">Take the Noah Quiz!</a>
                  <a href="/kids-stories/creation-story" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">Read Creation Story →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/kids-stories/david-and-goliath',
      title: 'David and Goliath Story for Kids | Bible Story with Quiz',
      description: 'Read the exciting story of David and Goliath told for children. Learn how a young shepherd defeated a giant with faith, courage, and a sling.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "David and Goliath for Kids" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-600 to-green-600 p-8 text-white"><h1 class="text-3xl font-bold mb-2">⚔️ David and Goliath</h1><p class="text-emerald-100">How a young shepherd defeated a giant — 1 Samuel 17</p></div>
              <div class="p-8">
                <p class="text-gray-700 mb-3">The Israelites were at war with the Philistines. Every day, a massive warrior named <strong>Goliath</strong> — over 9 feet tall! — would come out and shout, "Send someone to fight me! If he wins, we will be your servants. If I win, you will be ours!" No one in Israel was brave enough to face him.</p>
                <p class="text-gray-700 mb-3">Then a young shepherd boy named <strong>David</strong> arrived. He was bringing food to his older brothers in the army. When he heard Goliath mocking God's people, David said, "I will fight him! God protected me from lions and bears while I watched my sheep. He will protect me from this giant too."</p>
                <p class="text-gray-700 mb-3">King Saul offered David his own armor, but it was too heavy. Instead, David picked up <strong>five smooth stones</strong> from a stream and took his sling. When Goliath saw the boy, he laughed. But David shouted, "You come with a sword and a spear, but I come in the name of the Lord!"</p>
                <p class="text-gray-700 mb-6">David put a stone in his sling, swung it, and hit Goliath right in the forehead. The giant fell face-down on the ground. <strong>David won!</strong> The whole Philistine army ran away. David's faith in God was stronger than any weapon.</p>
                <h2 class="text-xl font-bold mb-3">💡 Key Lesson</h2>
                <p class="text-gray-700 mb-6">No problem is too big for God. Even when we feel small and the challenge seems impossible, God gives us the courage and strength to overcome. Just like David, our faith is our greatest weapon.</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/1-samuel/chapter-17/beginner" class="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold">Take the David & Goliath Quiz!</a>
                  <a href="/kids-stories/noahs-ark" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">← Noah's Ark</a>
                  <a href="/kids-stories/moses-and-exodus" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">Moses Story →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/kids-stories/creation-story',
      title: 'Creation Story for Kids | God Made the World in 7 Days',
      description: 'Read the Creation story from Genesis 1 told simply for children. Learn what God made on each of the 7 days of creation with a fun quiz.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Creation Story for Kids" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-yellow-500 to-amber-500 p-8 text-white"><h1 class="text-3xl font-bold mb-2">🌍 The Creation Story</h1><p class="text-yellow-100">How God made the world in 7 days — Genesis 1-2</p></div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">In the very beginning, there was nothing except God. No light, no land, no animals, no people — just darkness and emptiness. Then God spoke, and everything began!</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div class="bg-yellow-50 p-3 rounded-lg"><strong>Day 1:</strong> God said "Let there be light!" — and there was light. ☀️</div>
                  <div class="bg-amber-50 p-3 rounded-lg"><strong>Day 2:</strong> God separated the sky from the water. 🌤️</div>
                  <div class="bg-yellow-50 p-3 rounded-lg"><strong>Day 3:</strong> God made dry land, seas, plants, and trees. 🌳</div>
                  <div class="bg-amber-50 p-3 rounded-lg"><strong>Day 4:</strong> God made the sun, moon, and stars. 🌙⭐</div>
                  <div class="bg-yellow-50 p-3 rounded-lg"><strong>Day 5:</strong> God filled the sea with fish and the sky with birds. 🐟🦅</div>
                  <div class="bg-amber-50 p-3 rounded-lg"><strong>Day 6:</strong> God made animals and, last of all, people! 🦁👨‍👩‍👧‍👦</div>
                  <div class="bg-green-50 p-3 rounded-lg col-span-2 text-center"><strong>Day 7:</strong> God rested. He looked at everything and said it was <em>very good</em>. 😊</div>
                </div>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/genesis/chapter-1/beginner" class="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold">Take the Creation Quiz!</a>
                  <a href="/kids-stories/noahs-ark" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">Noah's Ark →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/kids-stories/moses-and-exodus',
      title: 'Moses and the Exodus Story for Kids | Bible Story',
      description: 'Read the exciting story of Moses and the Exodus told for children. From baby in a basket to parting the Red Sea — an epic Bible adventure.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Moses and Exodus for Kids" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-red-600 to-orange-500 p-8 text-white"><h1 class="text-3xl font-bold mb-2">🌊 Moses and the Exodus</h1><p class="text-red-100">From baby in a basket to parting the Red Sea — Exodus 1-14</p></div>
              <div class="p-8">
                <p class="text-gray-700 mb-3">Long ago, God's people — the Israelites — were slaves in Egypt. The cruel Pharaoh made them work day and night building cities. But God had a plan to set them free, and that plan began with a baby named <strong>Moses</strong>.</p>
                <p class="text-gray-700 mb-3">When Moses was born, Pharaoh had ordered all Israelite baby boys to be thrown into the river. But Moses' mother hid him in a <strong>waterproof basket</strong> among the reeds. Pharaoh's own daughter found the baby and raised him as a prince!</p>
                <p class="text-gray-700 mb-3">Years later, God spoke to Moses through a <strong>burning bush</strong> that was not consumed by flames. "Go to Pharaoh," God said, "and tell him: Let my people go!" Moses was afraid, but God promised to be with him.</p>
                <p class="text-gray-700 mb-3">Pharaoh refused, so God sent <strong>10 terrible plagues</strong> — water turning to blood, frogs, locusts, darkness, and more. After the final plague, Pharaoh finally let the Israelites go.</p>
                <p class="text-gray-700 mb-6">But then Pharaoh changed his mind and sent his army after them! The Israelites were trapped at the <strong>Red Sea</strong>. Moses raised his staff, and God parted the waters! The Israelites walked through on dry ground, and the sea closed behind them. They were free at last!</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/exodus/chapter-1/beginner" class="px-6 py-3 bg-red-600 text-white rounded-xl font-bold">Take the Exodus Quiz!</a>
                  <a href="/kids-stories/david-and-goliath" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">David & Goliath →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/kids-stories/daniel-lions-den',
      title: "Daniel in the Lion's Den for Kids | Bible Story",
      description: "Read the story of Daniel in the lion's den for children. Learn how Daniel's faith in God kept him safe when he was thrown to hungry lions.",
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Daniel in the Lion's Den for Kids" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-amber-600 to-yellow-500 p-8 text-white"><h1 class="text-3xl font-bold mb-2">🦁 Daniel in the Lion's Den</h1><p class="text-amber-100">Faith that shut the mouths of lions — Daniel 6</p></div>
              <div class="p-8">
                <p class="text-gray-700 mb-3">Daniel was one of the most important leaders in the kingdom of Babylon. He was honest, wise, and faithful to God. But some other leaders were <strong>jealous</strong> of Daniel and wanted to get rid of him.</p>
                <p class="text-gray-700 mb-3">They tricked the king into making a new law: "For 30 days, no one may pray to anyone except the king. Anyone who disobeys will be thrown into the <strong>den of lions</strong>!"</p>
                <p class="text-gray-700 mb-3">Did Daniel stop praying to God? <strong>No!</strong> He continued to pray three times a day, just as he always had, with his windows open toward Jerusalem.</p>
                <p class="text-gray-700 mb-3">The jealous leaders caught him and reported him to the king. The king was heartbroken — he loved Daniel — but the law could not be changed. So Daniel was thrown into the den of hungry lions.</p>
                <p class="text-gray-700 mb-6">The king couldn't sleep all night. At dawn, he rushed to the den and cried out, "Daniel! Did your God save you?" And Daniel called back, "My God sent His <strong>angel to shut the lions' mouths</strong>! They have not hurt me!" Daniel was lifted out without a single scratch. 🙌</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/daniel/chapter-6/beginner" class="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold">Take the Daniel Quiz!</a>
                  <a href="/kids-stories/jonah-and-the-whale" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">Jonah Story →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/kids-stories/jonah-and-the-whale',
      title: 'Jonah and the Whale Story for Kids | Bible Story',
      description: 'Read the story of Jonah and the great fish for children. Learn what happens when Jonah tried to run away from God and ended up inside a whale.',
      structuredData: { "@context": "https://schema.org", "@type": "Article", "headline": "Jonah and the Whale for Kids" },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white"><h1 class="text-3xl font-bold mb-2">🐋 Jonah and the Whale</h1><p class="text-teal-100">The prophet who tried to run from God — Jonah 1-4</p></div>
              <div class="p-8">
                <p class="text-gray-700 mb-3">God told Jonah to go to the great city of <strong>Nineveh</strong> and warn the people to stop being wicked. But Jonah didn't want to go! He was afraid, so he ran in the <strong>opposite direction</strong> and got on a ship sailing far away.</p>
                <p class="text-gray-700 mb-3">God sent a terrible <strong>storm</strong> that nearly broke the ship apart. The sailors were terrified! Jonah told them, "This storm is because of me. Throw me into the sea, and it will stop." They didn't want to, but finally they did — and the storm stopped immediately!</p>
                <p class="text-gray-700 mb-3">But God didn't let Jonah drown. He sent a <strong>huge fish</strong> — the Bible sometimes calls it a whale — to swallow Jonah whole! Jonah lived inside the fish for <strong>three days and three nights</strong>.</p>
                <p class="text-gray-700 mb-3">Inside the fish, Jonah prayed and asked God for forgiveness. Then God told the fish to spit Jonah out onto dry land. This time, Jonah obeyed and went to Nineveh. The people listened to his message and turned back to God!</p>
                <p class="text-gray-700 mb-6"><strong>Lesson:</strong> You can't run from God! He loves us so much that He will pursue us even when we try to go our own way. And His mercy extends to everyone — even people we think don't deserve it.</p>
                <div class="flex flex-wrap gap-3">
                  <a href="/public-quiz/jonah/chapter-1/beginner" class="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold">Take the Jonah Quiz!</a>
                  <a href="/kids-stories/daniel-lions-den" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">← Daniel Story</a>
                  <a href="/kids-stories" class="px-6 py-3 bg-gray-100 rounded-xl font-bold">All Kids Stories</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/bible-quiz-printable-pdf',
      title: 'Bible Quiz Printable PDF | Free Download & Print',
      description: 'Download and print free Bible quiz worksheets in PDF format. Perfect for Sunday school, small groups, youth groups, and personal study. No signup required.',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Can I download Bible quizzes as PDF?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Every quiz on our site is printer-friendly. Simply open the quiz page, use your browser's print function (Ctrl+P or Cmd+P), and select 'Save as PDF' to download." }},
          { "@type": "Question", "name": "Are the printable quizzes free?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All quizzes are 100% free with no account or signup required." }},
          { "@type": "Question", "name": "What topics are available for printable quizzes?", "acceptedAnswer": { "@type": "Answer", "text": "We cover all 66 books of the Bible with over 1,189 chapter-specific quizzes in beginner, intermediate, and advanced difficulty levels." }}
        ]
      },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-4"><a href="/">Home</a> &raquo; <span>Printable Bible Quizzes</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-gray-700 to-blue-700 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Quiz Printable PDF</h1>
                <p class="text-gray-200">Free downloadable and printable Bible quiz worksheets</p>
              </div>
              <div class="p-8">
                <h2 class="text-xl font-bold text-gray-900 mb-3">How to Print Our Bible Quizzes</h2>
                <p class="text-gray-700 mb-4">Every quiz on Bible Quiz Competition is designed to be printer-friendly. Whether you need worksheets for a Sunday school class, a youth group activity, or personal study at home, you can download any quiz as a PDF in just a few clicks.</p>
                <div class="bg-blue-50 p-6 rounded-xl mb-6">
                  <h3 class="font-bold text-blue-800 mb-3">📋 3-Step Print Guide</h3>
                  <ol class="list-decimal list-inside text-gray-700 space-y-2">
                    <li><strong>Choose your quiz</strong> — Browse by book, chapter, or difficulty level below</li>
                    <li><strong>Open the quiz page</strong> — Each page shows questions with answer options</li>
                    <li><strong>Print or Save as PDF</strong> — Press <kbd class="px-2 py-0.5 bg-gray-200 rounded text-sm">Ctrl+P</kbd> (Windows) or <kbd class="px-2 py-0.5 bg-gray-200 rounded text-sm">Cmd+P</kbd> (Mac) and select "Save as PDF"</li>
                  </ol>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Popular Printable Quizzes</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <a href="/public-quiz/genesis/chapter-1/beginner" class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition border"><span class="text-2xl">📖</span><div><strong>Genesis 1 — Creation</strong><p class="text-sm text-gray-500">Beginner level • 10 questions</p></div></a>
                  <a href="/public-quiz/exodus/chapter-20" class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition border"><span class="text-2xl">⛰️</span><div><strong>10 Commandments Quiz</strong><p class="text-sm text-gray-500">Exodus 20 • All levels</p></div></a>
                  <a href="/public-quiz/matthew/chapter-5/beginner" class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition border"><span class="text-2xl">✝️</span><div><strong>Sermon on the Mount</strong><p class="text-sm text-gray-500">Matthew 5 • Beginner</p></div></a>
                  <a href="/public-quiz/john/chapter-3/beginner" class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition border"><span class="text-2xl">❤️</span><div><strong>John 3:16 — God's Love</strong><p class="text-sm text-gray-500">John 3 • Beginner</p></div></a>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Browse by Difficulty</h2>
                <p class="text-gray-700 mb-4">All our quizzes come in three difficulty levels so you can match the right challenge to your group's Bible knowledge. Each level focuses on different aspects of the chapter — from basic story recall (Beginner) to theological nuances (Advanced).</p>
                <div class="flex flex-wrap gap-3 mb-6">
                  <a href="/bible-quiz-for-beginners" class="px-6 py-3 bg-green-100 text-green-800 rounded-xl font-bold hover:bg-green-200 transition">🟢 Beginner Quizzes</a>
                  <a href="/bible-quiz-questions-and-answers" class="px-6 py-3 bg-yellow-100 text-yellow-800 rounded-xl font-bold hover:bg-yellow-200 transition">🟡 All Quizzes</a>
                  <a href="/hardest-bible-trivia-questions" class="px-6 py-3 bg-red-100 text-red-800 rounded-xl font-bold hover:bg-red-200 transition">🔴 Hardest Trivia</a>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">FAQ</h2>
                <div class="space-y-3">
                  <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">Can I download Bible quizzes as PDF?</h3><p class="text-gray-600 mt-1">Yes! Every quiz page is printer-friendly. Use your browser's print function and select "Save as PDF" to download.</p></div>
                  <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">Are the printable quizzes free?</h3><p class="text-gray-600 mt-1">Absolutely. All quizzes are 100% free with no account or signup required.</p></div>
                  <div class="bg-gray-50 p-4 rounded-lg"><h3 class="font-semibold">What topics are available?</h3><p class="text-gray-600 mt-1">We cover all 66 books of the Bible with over 1,189 chapter-specific quizzes in beginner, intermediate, and advanced difficulty levels.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/bible-quiz-multiplayer',
      title: 'Bible Quiz Multiplayer | Play Live with Friends & Family',
      description: 'Challenge friends and family to a live multiplayer Bible quiz. Host real-time competitions, track scores, and see who knows the Bible best.',
      structuredData: { "@context": "https://schema.org", "@type": "WebPage", "name": "Bible Quiz Multiplayer", "description": "Live multiplayer Bible quiz competitions." },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-4"><a href="/">Home</a> &raquo; <span>Multiplayer Quiz</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">Bible Quiz Multiplayer</h1>
                <p class="text-purple-200">Challenge friends, family, and church groups in real-time Bible trivia</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">Bible Quiz Competition offers <strong>live multiplayer Bible quizzes</strong> where you can compete head-to-head with friends, family, or fellow church members in real-time. Whether you're hosting a youth group game night, a couples' Bible study showdown, or friendly competition between churches — our multiplayer mode makes it easy and fun.</p>

                <h2 class="text-xl font-bold text-gray-900 mb-3">How Multiplayer Works</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div class="bg-purple-50 p-4 rounded-lg text-center"><div class="text-3xl mb-2">👤</div><strong>1. Create a Room</strong><p class="text-sm text-gray-600 mt-1">The host picks a book, chapter, and difficulty, then shares the room code</p></div>
                  <div class="bg-fuchsia-50 p-4 rounded-lg text-center"><div class="text-3xl mb-2">👥</div><strong>2. Players Join</strong><p class="text-sm text-gray-600 mt-1">Friends enter the room code on their phone or computer to join</p></div>
                  <div class="bg-purple-50 p-4 rounded-lg text-center"><div class="text-3xl mb-2">🏆</div><strong>3. Compete Live</strong><p class="text-sm text-gray-600 mt-1">Answer questions in real-time — fastest correct answer wins the round</p></div>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Multiplayer Features</h2>
                <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
                  <li><strong>Real-time competition</strong> — See scores update live as players answer</li>
                  <li><strong>Custom quizzes</strong> — Choose any book, chapter, or topic</li>
                  <li><strong>Speed bonus</strong> — Faster answers earn more points with our time-weighted scoring</li>
                  <li><strong>Global leaderboard</strong> — Compete for the top spot among all players worldwide</li>
                  <li><strong>Church groups</strong> — Perfect for youth nights, small groups, and Bible study meetups</li>
                  <li><strong>No downloads needed</strong> — Plays right in the browser on any device</li>
                </ul>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Ways to Play</h2>
                <div class="flex flex-wrap gap-3 mb-6">
                  <a href="/live-quiz" class="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition">🎮 Host a Live Quiz</a>
                  <a href="/scripture-match-multiplayer" class="px-6 py-3 bg-fuchsia-100 text-fuchsia-800 rounded-xl font-bold hover:bg-fuchsia-200 transition">📖 Scripture Match</a>
                  <a href="/challenge" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">⚔️ Daily Challenge</a>
                  <a href="/competition-home" class="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">🏅 Global Competition</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/christmas-worship-songs-lyrics',
      title: 'Christmas Worship Songs Lyrics & Chords | Christian Christmas Music',
      description: 'Celebrate Christmas with Christian worship songs. Find lyrics, guitar chords, and strumming patterns for beloved Christmas hymns and carols.',
      structuredData: { "@context": "https://schema.org", "@type": "MusicPlaylist", "name": "Christmas Worship Songs Collection", "description": "Christian worship songs for the Christmas season with lyrics and chords." },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-4"><a href="/">Home</a> &raquo; <a href="/songs">Songs</a> &raquo; <span>Christmas Songs</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-red-700 to-green-700 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">🎄 Christmas Worship Songs</h1>
                <p class="text-red-200">Lyrics, chords, and strumming patterns for the Christmas season</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">Celebrate the birth of Jesus Christ with these beloved <strong>Christian Christmas worship songs</strong>. Whether you're leading worship at a Christmas Eve service, organizing a carol night, or just worshipping at home with family, we've compiled the most popular Christmas hymns with full lyrics and guitar chords.</p>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Classic Christmas Hymns</h2>
                <div class="space-y-3 mb-6">
                  <div class="bg-red-50 p-4 rounded-lg border border-red-200"><h3 class="font-bold text-red-800">🎵 O Holy Night</h3><p class="text-gray-600 text-sm">Key: C Major | One of the most powerful Christmas songs ever written. "Fall on your knees, oh hear the angel voices..."</p></div>
                  <div class="bg-green-50 p-4 rounded-lg border border-green-200"><h3 class="font-bold text-green-800">🎵 Silent Night</h3><p class="text-gray-600 text-sm">Key: G Major | Written in 1818 by Franz Gruber. "Silent night, holy night, all is calm, all is bright..."</p></div>
                  <div class="bg-red-50 p-4 rounded-lg border border-red-200"><h3 class="font-bold text-red-800">🎵 Joy to the World</h3><p class="text-gray-600 text-sm">Key: D Major | Based on Psalm 98. "Joy to the world, the Lord is come! Let earth receive her King..."</p></div>
                  <div class="bg-green-50 p-4 rounded-lg border border-green-200"><h3 class="font-bold text-green-800">🎵 Hark! The Herald Angels Sing</h3><p class="text-gray-600 text-sm">Key: F Major | Charles Wesley's magnificent hymn. "Glory to the newborn King! Peace on earth, and mercy mild..."</p></div>
                  <div class="bg-red-50 p-4 rounded-lg border border-red-200"><h3 class="font-bold text-red-800">🎵 O Come, All Ye Faithful</h3><p class="text-gray-600 text-sm">Key: G Major | A call to worship the newborn Savior. "O come, let us adore Him, Christ the Lord!"</p></div>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">The Christmas Story in Scripture</h2>
                <p class="text-gray-700 mb-4">Pair these songs with the biblical Christmas story! Take our quizzes on the birth narratives in Matthew and Luke to deepen your understanding of why we celebrate.</p>
                <div class="flex flex-wrap gap-3 mb-6">
                  <a href="/public-quiz/matthew/chapter-1/beginner" class="px-4 py-2 bg-red-100 rounded-full text-sm text-red-700 hover:bg-red-200">Matthew 1 - Birth of Jesus</a>
                  <a href="/public-quiz/matthew/chapter-2/beginner" class="px-4 py-2 bg-green-100 rounded-full text-sm text-green-700 hover:bg-green-200">Matthew 2 - Wise Men</a>
                  <a href="/public-quiz/luke/chapter-2/beginner" class="px-4 py-2 bg-red-100 rounded-full text-sm text-red-700 hover:bg-red-200">Luke 2 - Shepherds & Angels</a>
                  <a href="/songs" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">All Worship Songs →</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/easter-worship-songs-lyrics',
      title: 'Easter Worship Songs Lyrics & Chords | Resurrection Sunday Music',
      description: 'Worship the risen Lord with Easter songs. Find lyrics, guitar chords, and strumming patterns for powerful resurrection and Good Friday hymns.',
      structuredData: { "@context": "https://schema.org", "@type": "MusicPlaylist", "name": "Easter Worship Songs Collection", "description": "Christian worship songs for Easter and Resurrection Sunday." },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-violet-50 via-yellow-50 to-white pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-4"><a href="/">Home</a> &raquo; <a href="/songs">Songs</a> &raquo; <span>Easter Songs</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="bg-gradient-to-r from-violet-700 to-yellow-600 p-8 text-white">
                <h1 class="text-3xl font-bold mb-2">✝️ Easter Worship Songs</h1>
                <p class="text-violet-200">Lyrics, chords, and music for Resurrection Sunday celebrations</p>
              </div>
              <div class="p-8">
                <p class="text-gray-700 mb-4">Easter is the most important celebration in the Christian calendar — the day we remember that <strong>Jesus Christ conquered death and rose from the grave</strong>. These worship songs capture the power, joy, and wonder of the Resurrection. Use them for your Good Friday services, Easter Sunday worship, or any time you want to celebrate the risen Savior.</p>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Resurrection Hymns & Worship Songs</h2>
                <div class="space-y-3 mb-6">
                  <div class="bg-violet-50 p-4 rounded-lg border border-violet-200"><h3 class="font-bold text-violet-800">🎵 Because He Lives</h3><p class="text-gray-600 text-sm">Key: Ab Major | Bill & Gloria Gaither's timeless classic. "Because He lives, I can face tomorrow..."</p></div>
                  <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-300"><h3 class="font-bold text-yellow-800">🎵 Christ the Lord Is Risen Today</h3><p class="text-gray-600 text-sm">Key: C Major | Charles Wesley, 1739. "Alleluia! Christ the Lord is risen today..."</p></div>
                  <div class="bg-violet-50 p-4 rounded-lg border border-violet-200"><h3 class="font-bold text-violet-800">🎵 In Christ Alone</h3><p class="text-gray-600 text-sm">Key: D Major | Keith Getty & Stuart Townend. "In Christ alone my hope is found..."</p></div>
                  <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-300"><h3 class="font-bold text-yellow-800">🎵 The Old Rugged Cross</h3><p class="text-gray-600 text-sm">Key: Bb Major | George Bennard, 1912. "On a hill far away stood an old rugged cross..."</p></div>
                  <div class="bg-violet-50 p-4 rounded-lg border border-violet-200"><h3 class="font-bold text-violet-800">🎵 Were You There</h3><p class="text-gray-600 text-sm">Key: E Minor | Traditional African American spiritual. "Were you there when they crucified my Lord?"</p></div>
                </div>

                <h2 class="text-xl font-bold text-gray-900 mb-3">Study the Easter Story</h2>
                <p class="text-gray-700 mb-4">Understand the biblical account of Jesus' crucifixion and resurrection. These quiz chapters cover the Passion narrative from the Last Supper to the empty tomb.</p>
                <div class="flex flex-wrap gap-3 mb-6">
                  <a href="/public-quiz/matthew/chapter-27/beginner" class="px-4 py-2 bg-violet-100 rounded-full text-sm text-violet-700 hover:bg-violet-200">Matthew 27 - Crucifixion</a>
                  <a href="/public-quiz/matthew/chapter-28/beginner" class="px-4 py-2 bg-yellow-100 rounded-full text-sm text-yellow-700 hover:bg-yellow-200">Matthew 28 - Resurrection</a>
	                  <a href="/public-quiz/john/chapter-19/beginner" class="px-4 py-2 bg-violet-100 rounded-full text-sm text-violet-700 hover:bg-violet-200">John 19 - The Cross</a>
	                  <a href="/public-quiz/john/chapter-20/beginner" class="px-4 py-2 bg-yellow-100 rounded-full text-sm text-yellow-700 hover:bg-yellow-200">John 20 - He Is Risen</a>
	                  <a href="/songs" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">All Worship Songs →</a>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>`
	    },
	    {
	      path: '/daily-bible-quiz',
      title: 'Daily Bible Quiz - Challenge Your Scripture Knowledge Every Day',
      description: 'Take our Daily Bible Quiz to deepen your understanding of the Word. New questions daily covering Old and New Testament. Perfect for individual or group study.',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Daily Bible Quiz",
        "description": "Start your day with the Word of God through our interactive daily bible challenge."
      },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-6"><a href="/">Home</a> &raquo; <span>Daily Bible Quiz</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div class="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 p-10 text-white text-center">
                <div class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6">Level Up Your Faith</div>
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Daily Bible Quiz</h1>
                <p class="text-indigo-200 text-lg max-w-2xl mx-auto italic font-light">"Your word is a lamp for my feet, a light on my path." — Psalm 119:105</p>
              </div>
              <div class="p-10 md:p-16">
                <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p class="text-xl mb-8">Welcome to the <strong>Daily Bible Quiz</strong>, a space dedicated to consistent engagement with the Scriptures. Every 24 hours, we refresh our challenge with curated questions covering the vast history, wisdom, and teachings found in the 66 books of the Bible.</p>
                  
                  <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-6">Why Take a Daily Bible Quiz?</h2>
                  <p>In the rush of modern life, carving out time for focused scripture study can be a challenge. Our daily quiz is designed to provide a structured, engaging, and fast-paced way to keep the Word of God fresh in your mind. Whether you are a lifelong student of the Bible or just beginning your journey, these questions aim to spark curiosity and deepen your theological understanding.</p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                    <div class="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                      <div class="text-2xl mb-3">🧠</div>
                      <h3 class="font-bold text-indigo-900 mb-2">Memory Retention</h3>
                      <p class="text-sm">Regular testing is scientifically proven to improve long-term memory of factual information, helping you internalize scriptures.</p>
                    </div>
                    <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <div class="text-2xl mb-3">⚡</div>
                      <h3 class="font-bold text-blue-900 mb-2">Spiritual Discipline</h3>
                      <p class="text-sm">Small, daily habits build the foundation of a strong spiritual life. Spend 2 minutes every day focused on the Truth.</p>
                    </div>
                  </div>

                  <h2 class="text-2xl font-bold text-gray-900 mt-12 mb-6">What to Expect</h2>
                  <p>Today's featured quiz covers <strong>Hebrews Chapter 4</strong>, diving into the promise of God's rest and the living nature of His Word. Our questions are crafted with care to ensure historical accuracy while highlighting the transformative power of the text.</p>
                  
                  <div class="mt-12 p-8 bg-gray-900 rounded-3xl text-white text-center">
                    <h3 class="text-2xl font-bold mb-4">Ready to Start Today's Challenge?</h3>
                    <p class="text-gray-400 mb-8">Join thousands of believers worldwide taking today's quiz.</p>
                    <a href="/todays-quiz" class="inline-block px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-xl">Launch Daily Quiz Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/verse-of-the-day',
      title: 'Verse of the Day - Daily Inspiration & Scripture Study',
      description: 'Find inspiration and spiritual growth with our Verse of the Day. Includes in-depth commentary, historical context, and daily prayer prompts.',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Verse of the Day - John 3:16",
        "description": "An in-depth study of the most famous verse in the Bible.",
        "author": { "@type": "Organization", "name": "Bible Quiz Competition" }
      },
      content: `
        <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-6"><a href="/">Home</a> &raquo; <span>Verse of the Day</span></nav>
            <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div class="relative h-64 md:h-96">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop" class="w-full h-full object-cover" alt="Sacrificial Love" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center p-12 text-center">
                  <div>
                    <h1 class="text-white text-4xl md:text-5xl font-bold mb-4 italic serif">"For God so loved the world..."</h1>
                    <p class="text-white/80 text-xl font-light">John 3:16</p>
                  </div>
                </div>
              </div>
              <div class="p-10 md:p-16">
                <div class="prose prose-lg max-w-none text-gray-700">
                  <h2 class="text-3xl font-bold text-gray-900 mb-8">The Gospel in a Nutshell</h2>
                  <p class="text-xl italic bg-gray-50 p-6 rounded-2xl border-l-4 border-purple-500 mb-10">"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</p>
                  
                  <h3 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Deep Dive Commentary</h3>
                  <p>John 3:16 is arguably the most recognized verse in Christian scripture, yet its depth is often overlooked due to its popularity. In this verse, we see the <strong>motivation</strong> (God's love), the <strong>extent</strong> (the entire world), the <strong>action</strong> (He gave His Son), and the <strong>promise</strong> (eternal life).</p>
                  <p>When Jesus shared these words with Nicodemus, he was overturning the traditional understanding of salvation. He made it clear that God's love isn't restricted to one group of people; it is a universal invitation. The sacrificial nature of this gift—giving His one and only Son—highlights the gravity of our need and the infinite grace of the Provider.</p>

                  <h3 class="text-2xl font-bold text-gray-900 mt-12 mb-4">Daily Application</h3>
                  <p>How does John 3:16 change your perspective today? If the Creator of the universe loves you with such radical self-sacrifice, you are never truly alone or without worth. Living in the light of this verse means letting God's love define your identity rather than your performance, your failures, or the opinions of others.</p>

                  <div class="bg-purple-50 p-8 rounded-3xl border border-purple-100 my-10">
                    <h4 class="text-lg font-bold text-purple-900 mb-3">🙏 Daily Prayer Prompt</h4>
                    <p class="text-purple-800 italic">"Lord, thank You for Your overwhelming love. Help me to grasp the reality of Your sacrifice today and to live with the confidence that comes from being Your child. May Your grace flow through me to everyone I meet."</p>
                  </div>

                  <h3 class="text-2xl font-bold text-gray-900 mt-12 mb-6">Explore More</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/public-quiz/john/chapter-3" class="p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-400 transition-all font-bold text-center">Take the John 3 Quiz</a>
                    <a href="/daily-bible-quiz" class="p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-400 transition-all font-bold text-center">New Quiz Every Day</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    },
    {
      path: '/bible-characters',
      title: 'Bible Characters A-Z | Biographies, Faith & Study Guides',
      description: 'Explore the major figures of the Bible. From Abraham and Moses to Esther and Paul, discover the people who shaped scriptural history.',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Bible Characters Directory",
        "description": "Comprehensive guide to biblical figures and their faith journeys."
      },
      content: `
        <div class="min-h-screen bg-gray-50 pt-20 pb-20">
          <div class="container mx-auto px-4 py-8">
            <nav class="text-sm text-gray-500 mb-8"><a href="/">Home</a> &raquo; <span>Bible Characters</span></nav>
            <div class="max-w-6xl mx-auto">
              <div class="text-center mb-16">
                <h1 class="text-5xl font-bold text-gray-900 mb-4">Bible Characters Hub</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">Study the lives of the men and women who walked with God. Discover their triumphs, their failures, and the lessons they left for us today.</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Featured Cards -->
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600 text-2xl font-bold">A</div>
                  <h3 class="text-2xl font-bold mb-2">Abraham</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">The patriarch of the faith, known for his radical obedience and faith in God's promises. Father of many nations.</p>
                  <a href="/public-quiz/genesis" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study Abraham</a>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 text-2xl font-bold">M</div>
                  <h3 class="text-2xl font-bold mb-2">Moses</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">The great liberator who led the physical and spiritual exodus of Israel. Receiver of the Ten Commandments.</p>
                  <a href="/public-quiz/exodus" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study Moses</a>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 text-2xl font-bold">D</div>
                  <h3 class="text-2xl font-bold mb-2">David</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">A man after God's own heart. Shepherd, king, and psalmist who rose from humble beginnings to lead Israel.</p>
                  <a href="/public-quiz/1-samuel" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study David</a>
                </div>
                <!-- ... More logic would go here in React, but for static SEO, we list more ... -->
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl font-bold">E</div>
                  <h3 class="text-2xl font-bold mb-2">Esther</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">The brave queen who saved her people. "For such a time as this." A story of courage and divine providence.</p>
                  <a href="/public-quiz/esther" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study Esther</a>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl font-bold">P</div>
                  <h3 class="text-2xl font-bold mb-2">Paul</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">From persecutor to Apostle. The greatest missionary of the early church and author of much of the New Testament.</p>
                  <a href="/public-quiz/acts" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study Paul</a>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center">
                  <div class="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 text-2xl font-bold">P</div>
                  <h3 class="text-2xl font-bold mb-2">Peter</h3>
                  <p class="text-gray-500 font-light mb-6 leading-relaxed">The outspoken disciple and "The Rock" of the early church. A transformation from fear to powerful leadership.</p>
                  <a href="/public-quiz/acts" class="mt-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase">Study Peter</a>
                </div>
              </div>

              <div class="mt-24 p-12 bg-gray-900 rounded-[3rem] text-white">
                <h2 class="text-3xl font-bold mb-8 italic serif">Browse More Bible Figures</h2>
                <p class="text-gray-400 mb-12 font-light">Join our community to access A-Z study guides for over 100 biblical figures including Noah, Ruth, Daniel, Elijah, Sarah, and more.</p>
                <div class="flex flex-wrap gap-4">
                  <a href="/auth/register" class="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-all">Join Study Group</a>
                  <a href="/bible-questions-and-answers-hub" class="px-8 py-4 border border-white/20 rounded-2xl hover:bg-white/10 transition-all font-light">Explore All Books</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
    }
  ];

  let generatedGapPages = 0;
  for (const page of seoGapPages) {
    try {
      writePageAndTrackSeo(page, 'Generated SEO gap page');
      generatedGapPages++;
    } catch (err) {
      console.error('Error generating gap page ' + page.path + ':', err.message);
    }
  }
  console.log(`Generated ${generatedGapPages} competitive SEO gap pages.`);


  // Generate generic static fallback pages for any remaining public routes
  const sitemapRoutes = extractSitemapRoutes(distDir);
  const appLiteralRoutes = extractAppLiteralRoutes();
  const allCandidateRoutes = Array.from(new Set([...sitemapRoutes, ...appLiteralRoutes]));

  let generatedGenericRoutes = 0;
  for (const route of allCandidateRoutes) {
    if (routeOutputExists(distDir, route)) {
      continue;
    }

    const genericPage = buildGenericPageFromRoute(route);
    writePageAndTrackSeo(genericPage, '');
    generatedGenericRoutes += 1;
  }

  console.log(`Generated ${generatedGenericRoutes} generic route fallbacks from sitemap/app routes.`);

  const auditList = Array.from(seoAuditEntries.values()).sort((a, b) => a.path.localeCompare(b.path));
  const totalPages = auditList.length;
  const summary = {
    totalPages,
    good: auditList.filter((page) => page.seoQuality === 'good').length,
    fair: auditList.filter((page) => page.seoQuality === 'fair').length,
    poor: auditList.filter((page) => page.seoQuality === 'poor').length,
    averageWords: totalPages > 0 ? Number((auditList.reduce((sum, page) => sum + page.wordCount, 0) / totalPages).toFixed(1)) : 0,
    averageSeoScore: totalPages > 0 ? Number((auditList.reduce((sum, page) => sum + page.seoScore, 0) / totalPages).toFixed(1)) : 0
  };

  const seoAuditOutput = {
    generatedAt: new Date().toISOString(),
    source: 'scripts/generate-static-pages.js',
    summary,
    pages: auditList
  };

  const seoAuditPath = path.join(distDir, 'seo-audit.json');
  fs.writeFileSync(seoAuditPath, JSON.stringify(seoAuditOutput, null, 2));
  console.log(`Generated SEO audit manifest: ${seoAuditPath}`);

  const publicAuditPath = path.join(__dirname, '../public/seo-audit.json');
  fs.writeFileSync(publicAuditPath, JSON.stringify(seoAuditOutput, null, 2));
  console.log(`Generated SEO audit manifest copy for dev: ${publicAuditPath}`);

  // Cleanup: Remove legacy .html files that duplicate the directory-based pages
  // These cause "Duplicate without user-selected canonical" in Google Search Console
  let removedLegacy = 0;
  function removeLegacyHtmlFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        removeLegacyHtmlFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
        fs.unlinkSync(fullPath);
        removedLegacy++;
      }
    }
  }
  removeLegacyHtmlFiles(distDir);
  console.log(`Cleaned up ${removedLegacy} legacy .html files from dist/`);

  console.log('Static pages generation complete!');
}

// Run the generator
generateStaticPages();
