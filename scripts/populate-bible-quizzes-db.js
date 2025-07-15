import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// All Bible books
const bibleBooks = [
  // Pentateuch
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  
  // Historical Books
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', 
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 
  'Ezra', 'Nehemiah', 'Esther',
  
  // Wisdom Books
  'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  
  // Major Prophets
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
  
  // Minor Prophets
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  
  // Gospels
  'Matthew', 'Mark', 'Luke', 'John',
  
  // Acts
  'Acts',
  
  // Pauline Epistles
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
  
  // General Epistles
  'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude',
  
  // Apocalypse
  'Revelation'
];

async function populateBibleQuizzes() {
  console.log('Starting to populate Bible quizzes in database...');
  
  for (const book of bibleBooks) {
    try {
      // Check if quiz already exists
      const { data: existingQuiz } = await supabase
        .from('quizzes')
        .select('id')
        .eq('title', `${book} Quiz`)
        .single();
      
      if (existingQuiz) {
        console.log(`✓ ${book} Quiz already exists (ID: ${existingQuiz.id})`);
        continue;
      }
      
      // Create the quiz
      const { data: newQuiz, error } = await supabase
        .from('quizzes')
        .insert({
          title: `${book} Quiz`,
          description: `Test your knowledge of the Book of ${book}`,
          created_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) {
        console.error(`✗ Error creating ${book} Quiz:`, error);
        continue;
      }
      
      console.log(`✓ Created ${book} Quiz (ID: ${newQuiz.id})`);
      
    } catch (error) {
      console.error(`✗ Error processing ${book}:`, error);
    }
  }
  
  console.log('\nBible quiz population completed!');
  
  // Show summary
  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, title')
    .like('title', '%Quiz%')
    .order('title');
  
  console.log('\nAll quizzes in database:');
  allQuizzes?.forEach(quiz => {
    console.log(`  ${quiz.id}: ${quiz.title}`);
  });
}

populateBibleQuizzes().catch(console.error); 