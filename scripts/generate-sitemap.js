import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate comprehensive sitemap
function generateSitemap() {
  const baseUrl = 'https://biblequizcompetition.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // Main pages
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/todays-quiz', priority: '0.95', changefreq: 'daily' },
    { loc: '/articles', priority: '0.9', changefreq: 'weekly' },
    { loc: '/public-leaderboard', priority: '0.8', changefreq: 'daily' },
    { loc: '/host-live-bible-quizzes-with-confidence', priority: '0.9', changefreq: 'monthly' },
    { loc: '/bible-questions-and-answers-hub', priority: '0.9', changefreq: 'weekly' },
    { loc: '/bible-questions-and-answers-hub/genesis', priority: '0.8', changefreq: 'monthly' },
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
  const articles = [
    'complete-quiz-guide', 'quiz-strategies', 'leaderboard-tips',
    'david-king-israel', 'moses-exodus-story', 'esther-courage-story',
    'understanding-grace', 'prayer-life-guide', 'quiz-time-management',
    'bible-study-methods', 'quiz-navigation-guide', 'quiz-scoring-explained',
    'quiz-difficulty-levels', 'quiz-feedback-system', 'quiz-progress-tracking',
    'memory-techniques-quiz', 'quiz-anxiety-management', 'question-pattern-recognition',
    'quiz-concentration-techniques', 'quiz-recovery-strategies', 'competition-preparation',
    'team-quiz-strategies', 'competition-psychology', 'competition-etiquette',
    'post-competition-analysis', 'moses-leadership-lessons', 'esther-strategic-wisdom',
    'abraham-faith-journey', 'joseph-forgiveness-story', 'ruth-loyalty-devotion',
    'forgiveness-healing-power', 'hope-biblical-perspective', 'love-gods-greatest-commandment',
    'faith-works-james', 'peace-gods-promise', 'scripture-memorization-techniques',
    'inductive-bible-study', 'bible-study-journaling', 'group-bible-study-leading',
    'bible-study-technology'
  ];

  articles.forEach(article => {
    urls.push({
      loc: `/articles/${article}`,
      priority: '0.8',
      changefreq: 'monthly'
    });
  });

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
