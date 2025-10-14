// Debug script to check weekly quiz data
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debugWeeklyQuiz() {
  console.log('🔍 Debugging Weekly Quiz System...\n');

  try {
    // 1. Check if weekly_quizzes table exists and has data
    console.log('1. Checking weekly_quizzes table...');
    const { data: quizzes, error: quizzesError } = await supabase
      .from('weekly_quizzes')
      .select('*')
      .order('week_start_date', { ascending: false });

    if (quizzesError) {
      console.error('❌ Error fetching weekly quizzes:', quizzesError);
      return;
    }

    console.log(`✅ Found ${quizzes?.length || 0} weekly quizzes:`);
    quizzes?.forEach(quiz => {
      console.log(`   - ID: ${quiz.id}, Title: "${quiz.title}", Active: ${quiz.is_active}`);
      console.log(`     Week: ${quiz.week_start_date} to ${quiz.week_end_date}`);
    });

    // 2. Check specific quiz ID 5
    console.log('\n2. Checking quiz ID 5 specifically...');
    const { data: quiz5, error: quiz5Error } = await supabase
      .from('weekly_quizzes')
      .select('*')
      .eq('id', 5)
      .single();

    if (quiz5Error) {
      console.error('❌ Quiz ID 5 not found:', quiz5Error);
    } else {
      console.log('✅ Quiz ID 5 found:', quiz5);
    }

    // 3. Check questions for quiz ID 5
    console.log('\n3. Checking questions for quiz ID 5...');
    const { data: questions, error: questionsError } = await supabase
      .from('weekly_quiz_questions')
      .select('*')
      .eq('weekly_quiz_id', 5)
      .order('order_index');

    if (questionsError) {
      console.error('❌ Error fetching questions for quiz 5:', questionsError);
    } else {
      console.log(`✅ Found ${questions?.length || 0} questions for quiz 5`);
    }

    // 4. Check current week's active quiz
    console.log('\n4. Checking current week\'s active quiz...');
    const today = new Date().toISOString().split('T')[0];
    const { data: currentQuiz, error: currentQuizError } = await supabase
      .from('weekly_quizzes')
      .select('*')
      .eq('is_active', true)
      .lte('week_start_date', today)
      .gte('week_end_date', today)
      .single();

    if (currentQuizError) {
      console.error('❌ No active quiz for current week:', currentQuizError);
    } else {
      console.log('✅ Current week\'s active quiz:', currentQuiz);
    }

  } catch (error) {
    console.error('❌ Debug script error:', error);
  }
}

debugWeeklyQuiz();
