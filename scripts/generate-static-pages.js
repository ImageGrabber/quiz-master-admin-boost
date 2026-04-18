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

function routeLooksIndexable(route) {
  if (!route || route === '*') return false;
  if (route.includes(':')) return false;
  if (route.includes('*')) return false;

  const excludedPrefixes = ['/admin', '/dashboard', '/auth', '/rls-test', '/sentry-test'];
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
  const matches = [...source.matchAll(/<Route\s+path="([^"]+)"/g)];

  return matches
    .map((match) => normalizeRoutePath(match[1]))
    .filter(routeLooksIndexable);
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
    description = `An engaging Bible story about ${titleTopic} for kids. Includes interactive elements to help children learn biblical truths.`;
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
            }
          },
          content: `
              <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white pt-20">
              <div class="container mx-auto px-4 py-8">
                  <div class="max-w-6xl mx-auto shadow-2xl border-0 bg-white rounded-xl overflow-hidden">
                  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                      <h1 class="text-2xl font-bold">${displayTitle}</h1>
                  </div>
                  <div class="p-8">
                      <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h2 class="text-xl font-bold text-gray-900 mb-2">${level.title} Level Focus</h2>
                      <p class="text-gray-700 mb-4">
                          This <strong>${level.title.toLowerCase()}</strong> quiz for <strong>${bookName} Chapter ${i}</strong> is specifically designed to cover <strong>${level.focus}</strong>. 
                          As part of the <strong>${category}</strong>, this chapter is essential for a complete understanding of the biblical narrative.
                      </p>
                      <div class="flex items-center gap-3">
                           <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                           <span class="text-blue-600 font-medium">Loading ${level.title.toLowerCase()} quiz engine...</span>
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
              <div class="container mx-auto px-4 py-8 text-center">
                <div class="max-w-3xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border-4 border-blue-100">
                  <span class="inline-block px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-bold mb-6">VERSE STUDY</span>
                  <h1 class="text-4xl font-extrabold text-gray-900 mb-4">${bookName} ${i}:1</h1>
                  <p class="text-2xl italic text-blue-800 leading-relaxed mb-8">"In the beginning..."</p>
                  <div class="h-1 w-24 bg-blue-600 mx-auto mb-8 rounded-full"></div>
                  <h2 class="text-xl font-bold text-gray-900 mb-4">Context & Commentary</h2>
                  <p class="text-gray-700 leading-relaxed text-lg mb-8">
                    The opening verse of <strong>${bookName} Chapter ${i}</strong> sets the stage for the narrative within the <strong>${category}</strong>. 
                    This scripture is central to understanding the theological foundation of the book.
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/public-quiz/${book}/${chapter}" class="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Take Chapter Quiz</a>
                    <a href="/bible-questions-and-answers-hub/${book}" class="px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">Explore ${bookName} Hub</a>
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
        title: `${displayTitle} | Christian Song | Bible Quiz Competition`,
        description: `Read ${variant.title} and details for ${song.title}. Part of our high-quality worship resource collection.`,
        noindex: false,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          "name": displayTitle,
          "description": song.description || `Full ${variant.title.toLowerCase()} for ${song.title}`,
          "url": `https://biblequizcompetition.com/songs/${song.slug}${subPath}`
        },
        content: `
            <div class="min-h-screen bg-gray-50 pt-20">
              <div class="container mx-auto px-4 py-8">
                <a href="/songs" class="text-blue-600 font-medium hover:underline">&larr; Back to Songs</a>
                <article class="max-w-4xl mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white">
                    <h1 class="text-3xl font-bold mb-2">${escapeHtml(song.title)}</h1>
                    <p class="text-blue-100 opacity-90">${variant.title}</p>
                  </div>
                  <div class="p-8">
                    <div class="prose prose-lg max-w-none">
                      <div class="whitespace-pre-wrap font-mono text-gray-800 bg-gray-50 p-6 rounded-xl border border-gray-100">
${escapeHtml(song.content || 'Content coming soon...')}
                      </div>
                    </div>
                  </div>
                </article>
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

  console.log('Static pages generation complete!');
}

// Run the generator
generateStaticPages();
