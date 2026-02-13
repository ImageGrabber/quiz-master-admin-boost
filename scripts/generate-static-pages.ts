import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articles.js';
import { bibleStructure, bookNames } from '../src/data/bible-data.ts';

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

// Generate HTML using the app shell template
function generateHTML(page: any, templateHtml: string) {
  let html = templateHtml;

  // Replace title
  html = html.replace(/<title>.*<\/title>/, `<title>${page.title}</title>`);

  // Replace description or add if missing
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${page.description}" />`);
  } else {
    html = html.replace('</head>', `<meta name="description" content="${page.description}" />\n</head>`);
  }

  // Add canonical tag
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="https://biblequizcompetition.com${page.path}" />`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="https://biblequizcompetition.com${page.path}" />\n</head>`);
  }

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
  } catch (err) { // @ts-ignore
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
                    ${article.tags.map((tag: any) => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
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

  for (const [book, chapters] of Object.entries(bibleStructure)) { // @ts-ignore
    const bookName = bookNames[book] || book.charAt(0).toUpperCase() + book.slice(1);
    const bookDir = path.join(distDir, 'public-quiz', book);

    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir, { recursive: true });
    }

    for (let i = 1; i <= (chapters as number); i++) {
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

  console.log('Static pages generation complete!');
}

// Run the generator
generateStaticPages();
