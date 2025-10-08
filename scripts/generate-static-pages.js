import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Generate HTML template
function generateHTML(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://biblequizcompetition.com${page.path}">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Jost', sans-serif; }
  </style>
</head>
<body>
  ${page.content}
  <script>
    // Fallback for JavaScript-disabled users
    console.log('Static page loaded for SEO');
  </script>
</body>
</html>`;
}

// Generate static pages
function generateStaticPages() {
  const distDir = path.join(__dirname, '../dist');
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate critical pages
  criticalPages.forEach(page => {
    const html = generateHTML(page);
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
      content: `
        <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
          <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold text-center mb-8">${bookName} Quiz</h1>
            <p class="text-xl text-center mb-8">Test your knowledge of ${bookName} with this free interactive Bible quiz.</p>
            <div class="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto">
              <h2 class="text-2xl font-semibold mb-4">About This Quiz</h2>
              <p class="mb-6">This quiz covers key themes, characters, and events from the book of ${bookName}. Perfect for Bible study groups, personal study, or quiz competitions.</p>
              <div class="text-center">
                <button onclick="window.location.href='/public-quiz/${book}'" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                  Start ${bookName} Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    };
    
    const html = generateHTML(page);
    const filePath = path.join(distDir, `public-quiz-${book}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Generated quiz page: ${filePath}`);
  });

  console.log('Static pages generation complete!');
}

// Run the generator
generateStaticPages();
