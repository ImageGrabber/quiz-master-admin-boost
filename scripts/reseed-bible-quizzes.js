import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        title: "Exodus Quiz",
        description: "Journey through the deliverance of Israel, the Ten Commandments, and the Tabernacle.",
        questions: [
            { question: "Who led the Israelites out of Egypt?", options: ["Aaron", "Moses", "Joshua", "Caleb"], answer: 1 },
            { question: "What was the first plague of Egypt?", options: ["Frogs", "Locusts", "Water turned to blood", "Darkness"], answer: 2 },
            { question: "Which sea did the Israelites cross on dry ground?", options: ["Dead Sea", "Mediterranean Sea", "Red Sea", "Sea of Galilee"], answer: 2 },
            { question: "What food did God provide for the Israelites in the wilderness?", options: ["Quail", "Manna", "Bread", "Fish"], answer: 1 },
            { question: "On which mountain did Moses receive the Ten Commandments?", options: ["Mount Zion", "Mount Sinai", "Mount Ararat", "Mount Carmel"], answer: 1 }
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

async function reseedBibleQuizzes() {
    try {
        console.log('Starting to reseed Bible quizzes...');

        // 1. Clear existing data
        console.log('Clearing existing data...');

        // Delete attempts first (depends on users and quizzes)
        const { error: attemptsError } = await supabase.from('attempts').delete().neq('id', 0); // Hack to delete all
        if (attemptsError) console.log('Notice: Could not delete attempts (might be empty or RLS restriction):', attemptsError.message);

        // Delete quiz_questions (depends on quizzes and questions)
        const { error: qqError } = await supabase.from('quiz_questions').delete().neq('id', 0);
        if (qqError) console.log('Notice: Could not delete quiz_questions:', qqError.message);

        // Delete questions
        const { error: qError } = await supabase.from('questions').delete().neq('id', 0);
        if (qError) console.log('Notice: Could not delete questions:', qError.message);

        // Delete quizzes
        const { error: quizError } = await supabase.from('quizzes').delete().neq('id', 0);
        if (quizError) console.log('Notice: Could not delete quizzes:', quizError.message);

        console.log('Finished clearing phases. Now seeding...');

        // 2. Insert new data
        for (const quizData of bibleQuizzes) {
            console.log(`Creating quiz: ${quizData.title}`);

            // Create the quiz
            const { data: quiz, error: quizError } = await supabase
                .from('quizzes')
                .insert({
                    title: quizData.title,
                    description: quizData.description,
                    created_at: new Date().toISOString()
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

        console.log('Bible quiz reseed completed successfully!');
    } catch (error) {
        console.error('Error reseeding Bible quizzes:', error);
    }
}

// Run the script
reseedBibleQuizzes();
