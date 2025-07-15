import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bibleQuizDir = path.join(__dirname, '../src/pages/bible-questions-and-answers-hub');

// Helper to convert file name to valid function name
function toFunctionName(file) {
  let base = file.replace('.tsx', '');
  // Remove dashes and capitalize next letter
  base = base.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  // If starts with number, prefix with _
  if (/^\d/.test(base)) base = '_' + base;
  // Capitalize first letter after _ or at start
  base = base.replace(/(^|_)([a-z])/g, (_, pre, c) => pre + c.toUpperCase());
  return base + 'Quiz';
}

// Helper to convert file name to display title
function toDisplayTitle(file) {
  let base = file.replace('.tsx', '');
  // Replace dashes with spaces, capitalize each word
  base = base.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
  return base + ' Quiz';
}

const files = fs.readdirSync(bibleQuizDir).filter(file => 
  file.endsWith('.tsx')
);

files.forEach(file => {
  const filePath = path.join(bibleQuizDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the questions array name (usually ends with 'Questions')
  const questionsMatch = content.match(/const\s+(\w+Questions)\s*=/);
  const questionsArrayName = questionsMatch ? questionsMatch[1] : 'questions';

  const functionName = toFunctionName(file);
  const displayTitle = toDisplayTitle(file);
  const bookName = displayTitle.replace(' Quiz', '');

  // Create the new content
  const newContent = `import BibleBookQuiz from "../BibleBookQuiz";

${content.split('export default function')[0].split('import')[0]}

export default function ${functionName}() {
  return (
    <BibleBookQuiz 
      title="${displayTitle}"
      questions={${questionsArrayName}}
      bookName="${bookName}"
    />
  );
}`;

  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${file}`);
});

console.log('All Bible quiz files updated to use the unified template!'); 