const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Sample Bible QA Quiz Data
const bibleQuizzes = [
  {
    title: "Genesis Quiz",
    description: "Test your knowledge of the first book of the Bible - from creation to Joseph's story.",
    questions: [
      { question: "Who was the first man created by God?", options: ["Adam", "Eve", "Cain", "Abel"], answer: 0 },
      { question: "What did God create on the first day?", options: ["Light", "Land", "Animals", "Humans"], answer: 0 },
      { question: "How many days did God take to create the world?", options: ["5 days", "6 days", "7 days", "8 days"], answer: 1 },
      { question: "Who was the first woman?", options: ["Sarah", "Eve", "Rachel", "Leah"], answer: 1 },
      { question: "What was the name of the garden where Adam and Eve lived?", options: ["Eden", "Paradise", "Heaven", "Zion"], answer: 0 }
    ]
  },
  {
    title: "Matthew Quiz",
    description: "Test your knowledge of the first Gospel - the life and teachings of Jesus Christ.",
    questions: [
      { question: "Where was Jesus born?", options: ["Nazareth", "Bethlehem", "Jerusalem", "Galilee"], answer: 1 },
      { question: "Who baptized Jesus?", options: ["John the Baptist", "Peter", "Andrew", "Philip"], answer: 0 },
      { question: "How many disciples did Jesus have?", options: ["10", "11", "12", "13"], answer: 2 },
      { question: "What is the first beatitude?", options: ["Blessed are the poor", "Blessed are the meek", "Blessed are the pure", "Blessed are the peacemakers"], answer: 0 },
      { question: "What did Jesus say about salt?", options: ["It is worthless", "It is good", "You are the salt of the earth", "It is expensive"], answer: 2 }
    ]
  }
];

async function populateBibleQuizzes() {
  try {
    console.log('Starting to populate Bible QA quizzes...');

    for (const quizData of bibleQuizzes) {
      console.log(`Creating quiz: ${quizData.title}`);

      // Create the quiz
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          description: quizData.description
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

    console.log('Bible QA quizzes population completed!');
  } catch (error) {
    console.error('Error populating Bible QA quizzes:', error);
  }
}

// Run the script
populateBibleQuizzes(); 