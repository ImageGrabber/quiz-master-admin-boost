import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { articles } from '../src/data/articles.js';
import { bibleStructure, bookNames } from '../src/data/bibleData.js';

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
  ${page.structuredData ? `<script type="application/ld+json">
    ${JSON.stringify(page.structuredData)}
  </script>` : ''}
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
    // Determine file path based on URL structure
    // We want /public-quiz/genesis to be served from /public-quiz/genesis.html
    // But the current script was writing to `public-quiz-${book}.html` which looks like a mistake or specific flat structure.
    // Let's stick to the folder structure implied by the URL.
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
        <div class="min-h-screen bg-gray-50">
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
                    ${article.tags.map(tag => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      `
    };

    const html = generateHTML(page);
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

  // NOTE: bibleStructure and bookNames are assumed to be defined elsewhere in the file.
  // For example:
  // const bibleStructure = {
  //   genesis: 50, exodus: 40, leviticus: 27, numbers: 36, deuteronomy: 34,
  //   joshua: 24, judges: 21, ruth: 4, "1-samuel": 31, "2-samuel": 24,
  //   "1-kings": 22, "2-kings": 25, "1-chronicles": 29, "2-chronicles": 36,
  //   ezra: 10, nehemiah: 13, esther: 10, job: 42, psalms: 150,
  //   proverbs: 31, ecclesiastes: 12, "song-of-solomon": 8,
  //   isaiah: 66, jeremiah: 52, lamentations: 5, ezekiel: 48, daniel: 12,
  //   hosea: 14, joel: 3, amos: 9, obadiah: 1, jonah: 4,
  //   micah: 7, nahum: 3, habakkuk: 3, zephaniah: 3,
  //   haggai: 2, zechariah: 14, malachi: 4, matthew: 28, mark: 16,
  //   luke: 24, john: 21, acts: 28, romans: 16, "1-corinthians": 16,
  //   "2-corinthians": 13, galatians: 6, ephesians: 6, philippians: 4,
  //   colossians: 4, "1-thessalonians": 5, "2-thessalonians": 3,
  //   "1-timothy": 6, "2-timothy": 4, titus: 3, philemon: 1,
  //   hebrews: 13, james: 5, "1-peter": 5, "2-peter": 3, "1-john": 5,
  //   "2-john": 1, "3-john": 1, jude: 1, revelation: 22
  // };
  // const bookNames = {
  //   genesis: "Genesis", exodus: "Exodus", leviticus: "Leviticus", numbers: "Numbers", deuteronomy: "Deuteronomy",
  //   joshua: "Joshua", judges: "Judges", ruth: "Ruth", "1-samuel": "1 Samuel", "2-samuel": "2 Samuel",
  //   "1-kings": "1 Kings", "2-kings": "2 Kings", "1-chronicles": "1 Chronicles", "2-chronicles": "2 Chronicles",
  //   ezra: "Ezra", nehemiah: "Nehemiah", esther: "Esther", job: "Job", psalms: "Psalms",
  //   proverbs: "Proverbs", ecclesiastes: "Ecclesiastes", "song-of-solomon": "Song of Solomon",
  //   isaiah: "Isaiah", jeremiah: "Jeremiah", lamentations: "Lamentations", ezekiel: "Ezekiel", daniel: "Daniel",
  //   hosea: "Hosea", joel: "Joel", amos: "Amos", obadiah: "Obadiah", jonah: "Jonah",
  //   micah: "Micah", nahum: "Nahum", habakkuk: "Habakkuk", zephaniah: "Zephaniah",
  //   haggai: "Haggai", zechariah: "Zechariah", malachi: "Malachi", matthew: "Matthew", mark: "Mark",
  //   luke: "Luke", john: "John", acts: "Acts", romans: "Romans", "1-corinthians": "1 Corinthians",
  //   "2-corinthians": "2 Corinthians", galatians: "Galatians", ephesians: "Ephesians", philippians: "Philippians",
  //   colossians: "Colossians", "1-thessalonians": "1 Thessalonians", "2-thessalonians": "2 Thessalonians",
  //   "1-timothy": "1 Timothy", "2-timothy": "2 Timothy", titus: "Titus", philemon: "Philemon",
  //   hebrews: "Hebrews", james: "James", "1-peter": "1 Peter", "2-peter": "2 Peter", "1-john": "1 John",
  //   "2-john": "2 John", "3-john": "3 John", jude: "Jude", revelation: "Revelation"
  // };

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
            <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
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
                    <button class="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">
                        Load Quiz (Requires JavaScript)
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>`
      };

      try {
        const html = generateHTML(page);
        const filePath = path.join(bookDir, `${chapter}.html`);
        fs.writeFileSync(filePath, html);
        // console.log(`Generated chapter page: ${filePath}`); // Commented out to reduce noise
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
