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

// Reference existing migrated songs JSON directly to avoid module loading conflicts
const migratedSongsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/migrated-songs.json');
let allSongs = [
    { slug: "ithratholam-yahova-sahayichu", title: "Ithratholam Yahova Sahayichu", description: "Worship along with this beautiful melody." },
    { slug: "lokamam-gambhira-varidhiyil", title: "Lokamam Gambhira Varidhiyil", description: "Christian Malayalam Devotional Song." }
];

if (fs.existsSync(migratedSongsPath)) {
    try {
        const migrated = JSON.parse(fs.readFileSync(migratedSongsPath, 'utf-8'));
        allSongs = [...allSongs, ...migrated.slice(0, 100)]; // Only include first 100 for static fallback performance
    } catch (e) {
        console.error('Error reading migrated songs:', e.message);
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

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

// Generate HTML using the app shell template
function generateHTML(page, templateHtml) {
  let html = templateHtml;
  const pageUrl = `https://biblequizcompetition.com${page.path}`;

  // Replace title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

  // Core SEO tags
  html = upsertMetaTag(html, 'name', 'description', page.description);
  html = upsertCanonical(html, pageUrl);

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
    html = html.replace('<div id="root"></div>', `<div id="root">${page.content}</div>`);
  } else if (html.includes('<div id="root">')) {
    // Handle case where it might not be empty or has attributes
    html = html.replace('<div id="root">', `<div id="root">${page.content}`);
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

  // Generate critical pages
  criticalPages.forEach(page => {
    const html = generateHTML(page, templateHtml);
    const filePath = path.join(distDir, page.path === '/' ? 'index.html' : `${page.path}.html`);

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${filePath}`);
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

    const html = generateHTML(page, templateHtml);
    const filePath = path.join(distDir, `public-quiz/${book}.html`);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, html);
    console.log(`Generated quiz page: ${filePath}`);
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

    const html = generateHTML(page, templateHtml);
    const filePath = path.join(distDir, `articles/${article.id}.html`);

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      fs.writeFileSync(filePath, html);
      console.log(`Generated article page: ${filePath}`);
    } catch (err) {
      console.error(`Error generating article page ${article.id}:`, err);
    }
  });

  // Generate Chapter Pages (Programmatic SEO)
  console.log('Generating Bible chapter pages...');

  for (const [book, chapters] of Object.entries(bibleStructure)) { 
    const bookName = bookNames[book] || book.charAt(0).toUpperCase() + book.slice(1);
    const bookDir = path.join(distDir, 'public-quiz', book);

    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir, { recursive: true });
    }

    for (let i = 1; i <= chapters; i++) {
      const chapter = `chapter-${i}`;
      const page = {
        path: `/public-quiz/${book}/${chapter}`,
        title: `${bookName} Chapter ${i} Quiz - Free Bible Quiz`,
        description: `Test your knowledge of ${bookName} Chapter ${i} with this free interactive Bible quiz. carefully crafted questions covering key events, characters, and teachings from ${bookName} Chapter ${i}.`,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Quiz",
          "name": `${bookName} Chapter ${i} Quiz`,
          "description": `Test your knowledge of ${bookName} Chapter ${i} with this interactive quiz.`,
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
                    <h1 class="text-2xl font-bold">${bookName} Chapter ${i} Quiz</h1>
                </div>
                <div class="p-8">
                    <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">Start Quiz</h2>
                    <p class="text-gray-700 mb-4">
                        Test your knowledge of ${bookName} Chapter ${i} with this comprehensive Bible quiz. 
                        This interactive quiz contains carefully crafted questions covering key events, characters, and teachings from ${bookName} Chapter ${i}.
                    </p>
                    <div class="flex items-center gap-3">
                         <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                         <span class="text-blue-600 font-medium">Loading quiz engine...</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>`
      };

      try {
        const html = generateHTML(page, templateHtml);
        const filePath = path.join(bookDir, `${chapter}.html`);
        fs.writeFileSync(filePath, html);
      } catch (err) {
        console.error(`Error generating chapter page ${book} ${chapter}:`, err);
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

  const songsListingHtml = generateHTML(songsListingPage, templateHtml);
  const songsListingPath = path.join(distDir, 'songs.html');
  fs.writeFileSync(songsListingPath, songsListingHtml);
  console.log(`Generated songs listing page: ${songsListingPath}`);

  // Generate individual song pages
  const songsDir = path.join(distDir, 'songs');
  if (!fs.existsSync(songsDir)) {
    fs.mkdirSync(songsDir, { recursive: true });
  }

  let generatedSongPages = 0;
  for (const song of allSongs) {
    if (!song.slug) {
      continue;
    }

    const translationKeys = Object.keys(song.translations || {});
    const primaryKey = song.translations?.malayalam ? 'malayalam' : translationKeys[0];
    const primaryTranslation = primaryKey ? song.translations[primaryKey] : undefined;
    const languageNames = translationKeys
      .map((key) => song.translations[key]?.lang || key)
      .filter(Boolean);
    const firstLyricsBlock = primaryTranslation?.lyrics?.[0]?.lines || [];
    const previewLyrics = firstLyricsBlock.slice(0, 2).join(' ');

    const songPage = {
      path: `/songs/${song.slug}`,
      title: `${song.title} Lyrics | ${primaryTranslation?.lang || 'Christian Song'} | Bible Quiz Competition`,
      description: `${song.description} Read lyrics and watch the song video.`,
      structuredData: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "MusicComposition",
            "name": song.title,
            "description": song.description,
            "url": `https://biblequizcompetition.com/songs/${song.slug}`,
            "inLanguage": languageNames
          },
          {
            "@type": "WebPage",
            "name": `${song.title} Lyrics`,
            "url": `https://biblequizcompetition.com/songs/${song.slug}`,
            "description": `${song.description} Read lyrics and watch the song video.`
          }
        ]
      },
      content: `
        <div class="min-h-screen bg-gray-50 pt-20">
          <div class="container mx-auto px-4 py-8">
            <a href="/songs" class="text-blue-600 font-medium">&larr; Back to Songs</a>
            <article class="max-w-4xl mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-3">${escapeHtml(song.title)}</h1>
              <p class="text-gray-600 mb-6">${escapeHtml(song.description)}</p>
              <p class="text-sm text-gray-500 mb-4">Available in: ${escapeHtml(languageNames.join(', '))}</p>
              <div class="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h2 class="text-lg font-semibold text-gray-900 mb-2">Lyrics Preview</h2>
                <p class="text-gray-700 leading-relaxed">${escapeHtml(previewLyrics || 'Open the full page to read complete lyrics and watch the song video.')}</p>
              </div>
            </article>
          </div>
        </div>
      `
    };

    const html = generateHTML(songPage, templateHtml);
    const filePath = path.join(songsDir, `${song.slug}.html`);
    fs.writeFileSync(filePath, html);
    generatedSongPages += 1;
  }
  console.log(`Generated ${generatedSongPages} song pages.`);

  console.log('Static pages generation complete!');
}

// Run the generator
generateStaticPages();
