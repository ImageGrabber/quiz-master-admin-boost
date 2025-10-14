// Fix Weekly Quiz System
// This script will help you create a test weekly quiz

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createTestWeeklyQuiz() {
  console.log('🔧 Creating test weekly quiz...\n');

  try {
    // 1. First, let's check what quizzes exist
    console.log('1. Checking existing weekly quizzes...');
    const { data: existingQuizzes, error: existingError } = await supabase
      .from('weekly_quizzes')
      .select('*')
      .order('id', { ascending: false });

    if (existingError) {
      console.error('❌ Error checking existing quizzes:', existingError);
      return;
    }

    console.log(`Found ${existingQuizzes?.length || 0} existing quizzes:`);
    existingQuizzes?.forEach(quiz => {
      console.log(`   - ID: ${quiz.id}, Title: "${quiz.title}", Active: ${quiz.is_active}`);
    });

    // 2. Create a test weekly quiz for the current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

    console.log('\n2. Creating test weekly quiz...');
    const { data: newQuiz, error: quizError } = await supabase
      .from('weekly_quizzes')
      .insert({
        week_start_date: startOfWeek.toISOString().split('T')[0],
        week_end_date: endOfWeek.toISOString().split('T')[0],
        title: 'Weekly Bible Challenge',
        description: 'Test your knowledge with this week\'s special Bible quiz',
        theme: 'Bible Knowledge',
        difficulty: 'Medium',
        total_questions: 5,
        time_limit: 300, // 5 minutes
        is_active: true
      })
      .select()
      .single();

    if (quizError) {
      console.error('❌ Error creating quiz:', quizError);
      return;
    }

    console.log('✅ Created quiz:', newQuiz);

    // 3. Add some test questions
    console.log('\n3. Adding test questions...');
    const testQuestions = [
      {
        weekly_quiz_id: newQuiz.id,
        question: "Who was the first man created by God?",
        option_a: "Adam",
        option_b: "Eve", 
        option_c: "Noah",
        option_d: "Abraham",
        correct_index: 0,
        order_index: 1
      },
      {
        weekly_quiz_id: newQuiz.id,
        question: "How many days did God take to create the world?",
        option_a: "5 days",
        option_b: "6 days",
        option_c: "7 days", 
        option_d: "8 days",
        correct_index: 2,
        order_index: 2
      },
      {
        weekly_quiz_id: newQuiz.id,
        question: "What was the name of the garden where Adam and Eve lived?",
        option_a: "Garden of Eden",
        option_b: "Garden of Gethsemane",
        option_c: "Garden of Olives",
        option_d: "Garden of Paradise",
        correct_index: 0,
        order_index: 3
      },
      {
        weekly_quiz_id: newQuiz.id,
        question: "Who built the ark?",
        option_a: "Moses",
        option_b: "Noah",
        option_c: "Abraham",
        option_d: "David",
        correct_index: 1,
        order_index: 4
      },
      {
        weekly_quiz_id: newQuiz.id,
        question: "What was the name of the mountain where Moses received the Ten Commandments?",
        option_a: "Mount Sinai",
        option_b: "Mount Zion",
        option_c: "Mount Carmel",
        option_d: "Mount Olive",
        correct_index: 0,
        order_index: 5
      }
    ];

    const { data: questions, error: questionsError } = await supabase
      .from('weekly_quiz_questions')
      .insert(testQuestions)
      .select();

    if (questionsError) {
      console.error('❌ Error creating questions:', questionsError);
      return;
    }

    console.log(`✅ Created ${questions?.length || 0} questions`);

    console.log('\n🎉 Weekly quiz system fixed!');
    console.log(`📝 Quiz ID: ${newQuiz.id}`);
    console.log(`🔗 Test URL: /weekly-quiz/${newQuiz.id}`);
    console.log(`📅 Week: ${startOfWeek.toISOString().split('T')[0]} to ${endOfWeek.toISOString().split('T')[0]}`);

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

createTestWeeklyQuiz();
