// Extract Bible questions from static components and add to database
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Sample questions extracted from the static components
const bibleQuizData = [
  {
    title: "Genesis Chapter 1 Quiz",
    description: "Test your knowledge of Genesis Chapter 1 - The Creation Story",
    questions: [
      {
        question: "What did God create on the first day?",
        options: ["Light", "Land", "Animals", "Humans"],
        answer: 0
      },
      {
        question: "What did God create on the second day?",
        options: ["Light", "Sky/Heaven", "Land", "Plants"],
        answer: 1
      },
      {
        question: "What did God create on the third day?",
        options: ["Light", "Sky", "Land and Plants", "Sun and Moon"],
        answer: 2
      },
      {
        question: "What did God create on the fourth day?",
        options: ["Light", "Sky", "Land", "Sun, Moon, and Stars"],
        answer: 3
      },
      {
        question: "What did God create on the fifth day?",
        options: ["Land animals", "Birds and Sea creatures", "Humans", "Plants"],
        answer: 1
      },
      {
        question: "What did God create on the sixth day?",
        options: ["Light", "Sky", "Land animals and Humans", "Plants"],
        answer: 2
      },
      {
        question: "What did God do on the seventh day?",
        options: ["Created more animals", "Rested", "Created humans", "Created plants"],
        answer: 1
      }
    ]
  },
  {
    title: "Genesis Chapter 2 Quiz",
    description: "Test your knowledge of Genesis Chapter 2 - The Garden of Eden",
    questions: [
      {
        question: "What was the name of the garden where God placed Adam?",
        options: ["Paradise", "Garden of Eden", "Heaven", "Zion"],
        answer: 1
      },
      {
        question: "What tree was in the middle of the garden?",
        options: ["Tree of Life", "Tree of Knowledge", "Both A and B", "Neither"],
        answer: 2
      },
      {
        question: "What was the name of the first man?",
        options: ["Eve", "Adam", "Cain", "Abel"],
        answer: 1
      },
      {
        question: "What was the name of the first woman?",
        options: ["Eve", "Sarah", "Rachel", "Leah"],
        answer: 0
      },
      {
        question: "What was Adam made from?",
        options: ["Clay", "Dust of the ground", "Water", "Fire"],
        answer: 1
      },
      {
        question: "What was Eve made from?",
        options: ["Clay", "Dust", "Adam's rib", "Water"],
        answer: 2
      }
    ]
  },
  {
    title: "Genesis Chapter 3 Quiz",
    description: "Test your knowledge of Genesis Chapter 3 - The Fall of Man",
    questions: [
      {
        question: "Who tempted Eve in the garden?",
        options: ["The serpent", "Adam", "God", "An angel"],
        answer: 0
      },
      {
        question: "What fruit did Eve eat?",
        options: ["Apple", "Fig", "Fruit from the tree of knowledge", "Grape"],
        answer: 2
      },
      {
        question: "What happened after Adam and Eve ate the fruit?",
        options: ["Nothing", "They became like God", "They realized they were naked", "They died immediately"],
        answer: 2
      },
      {
        question: "What did God make for Adam and Eve after they sinned?",
        options: ["Nothing", "Clothes of skin", "New garden", "New animals"],
        answer: 1
      },
      {
        question: "What was the consequence of their sin?",
        options: ["Nothing", "They were banished from the garden", "They died", "They became immortal"],
        answer: 1
      }
    ]
  }
];

async function extractBibleQuestions() {
  try {
    console.log('Starting to extract Bible questions to database...');

    for (const quizData of bibleQuizData) {
      console.log(`Processing quiz: ${quizData.title}`);

      // Create the quiz
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          description: quizData.description,
          is_public: true
        })
        .select()
        .single();

      if (quizError) {
        console.error(`Error creating quiz ${quizData.title}:`, quizError);
        continue;
      }

      console.log(`Created quiz with ID: ${quiz.id}`);

      // Create questions for this quiz
      for (let i = 0; i < quizData.questions.length; i++) {
        const questionData = quizData.questions[i];
        
        // Create the question
        const { data: question, error: questionError } = await supabase
          .from('questions')
          .insert({
            question: questionData.question,
            option_a: questionData.options[0],
            option_b: questionData.options[1],
            option_c: questionData.options[2],
            option_d: questionData.options[3],
            correct_index: questionData.answer
          })
          .select()
          .single();

        if (questionError) {
          console.error(`Error creating question ${i + 1} for ${quizData.title}:`, questionError);
          continue;
        }

        // Link question to quiz
        const { error: linkError } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: quiz.id,
            question_id: question.id,
            order_index: i + 1
          });

        if (linkError) {
          console.error(`Error linking question ${i + 1} to quiz ${quizData.title}:`, linkError);
        }
      }

      console.log(`Completed quiz: ${quizData.title} with ${quizData.questions.length} questions`);
    }

    console.log('Bible questions extraction completed!');
    
    // Show summary
    const { data: allQuizzes } = await supabase
      .from('quizzes')
      .select('id, title')
      .order('title');
    
    console.log('\nAll quizzes in database:');
    allQuizzes?.forEach(quiz => {
      console.log(`  ${quiz.id}: ${quiz.title}`);
    });

  } catch (error) {
    console.error('Error extracting Bible questions:', error);
  }
}

// Run the script
extractBibleQuestions();

