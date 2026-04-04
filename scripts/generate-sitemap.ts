import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articles.js';
import { bibleStructure } from '../src/data/bible-data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // Add Bible quiz pages
  bibleBooks.forEach(book => {
    urls.push({
      loc: `/public-quiz/${book}`,
      priority: '0.95',
      changefreq: 'monthly'
    });
  });

  // Article pages
  // Article pages
  articles.forEach(article => {
    urls.push({
      loc: `/articles/${article.id}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

  // Programmatic Chapter Quizzes
  for (const [book, chapters] of Object.entries(bibleStructure)) {
    for (let i = 1; i <= chapters; i++) {
      urls.push({
        loc: `/public-quiz/${book}/chapter-${i}`,
        priority: '0.7',
        changefreq: 'monthly'
      });
    }
  }

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach(url => {
    sitemap += `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
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
