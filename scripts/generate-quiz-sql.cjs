const fs = require('fs');
const path = require('path');

const QUIZZES_DIR = path.join(__dirname, '../src/pages/public-quizzes');
const OUTPUT_FILE = path.join(__dirname, '../supabase/seed_bible_qa_hub.sql');

const BIBLE_ORDER = [
    // Old Testament
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1Samuel", "2Samuel",
    "1Kings", "2Kings", "1Chronicles", "2Chronicles", "Ezra",
    "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "SongOfSolomon", "Isaiah", "Jeremiah", "Lamentations",
    "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
    "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    // New Testament
    "Matthew", "Mark", "Luke", "John", "Acts",
    "Romans", "1Corinthians", "2Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1Thessalonians", "2Thessalonians", "1Timothy",
    "2Timothy", "Titus", "Philemon", "Hebrews", "James",
    "1Peter", "2Peter", "1John", "2John", "3John",
    "Jude", "Revelation"
];

function getBibleIndex(filename) {
    const baseName = filename.replace('PublicQuiz.tsx', '');
    const index = BIBLE_ORDER.indexOf(baseName);
    return index === -1 ? 999 : index;
}

function generateSql() {
    console.log('Generating SQL seed file from public quizzes...');

    try {
        const files = fs.readdirSync(QUIZZES_DIR)
            .filter(file => file.endsWith('.tsx'))
            .sort((a, b) => getBibleIndex(a) - getBibleIndex(b));
        console.log(`Found ${files.length} quiz files.`);

        let sqlContent = `DO $$
DECLARE
  new_quiz_id bigint;
BEGIN
`;

        for (const file of files) {
            const content = fs.readFileSync(path.join(QUIZZES_DIR, file), 'utf8');

            // Extract Title
            const titleMatch = content.match(/title="([^"]+)"/);
            const title = titleMatch ? titleMatch[1] : null;

            if (!title) continue;

            // Extract Description
            const descMatch = content.match(/description="([^"]+)"/);
            let description = descMatch ? descMatch[1] : `Test your knowledge of ${title.split(' - ')[0]}`;

            // Extract Questions Array Variable Name
            const questionsVarMatch = content.match(/questions={([^}]+)}/);
            const questionsVarName = questionsVarMatch ? questionsVarMatch[1] : 'questions';

            // Extract Questions Array content
            const regex = new RegExp(`const ${questionsVarName} = (\\[[\\s\\S]*?\\]);`);
            let questionsMatch = content.match(regex);

            if (!questionsMatch) {
                const fallbackMatch = content.match(/const questions = (\[[\s\S]*?\]);/);
                if (!fallbackMatch) continue;
                questionsMatch = fallbackMatch;
            }

            let questions;
            try {
                questions = eval('(' + questionsMatch[1] + ')');
            } catch (e) {
                console.error(`Failed to parse questions in ${file}:`, e.message);
                continue;
            }

            console.log(`Processing ${title} (${questions.length} questions)...`);

            // Escape single quotes for SQL
            const safeTitle = title.replace(/'/g, "''");
            const safeDesc = description.replace(/'/g, "''");

            // Generate SQL block for this quiz
            sqlContent += `
  -- Create Quiz: ${safeTitle}
  INSERT INTO quizzes (title, description, created_at)
  VALUES ('${safeTitle}', '${safeDesc}', NOW())
  RETURNING id INTO new_quiz_id;

  INSERT INTO quiz_questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_index, order_index)
  VALUES 
`;

            const values = questions.map((q, index) => {
                const safeQuestion = q.question.replace(/'/g, "''");
                const safeOptA = (q.options[0] || '').replace(/'/g, "''");
                const safeOptB = (q.options[1] || '').replace(/'/g, "''");
                const safeOptC = (q.options[2] || '').replace(/'/g, "''");
                const safeOptD = (q.options[3] || '').replace(/'/g, "''");

                return `  (new_quiz_id, '${safeQuestion}', '${safeOptA}', '${safeOptB}', '${safeOptC}', '${safeOptD}', ${q.answer}, ${index + 1})`;
            });

            sqlContent += values.join(',\n') + ';\n';
        }

        sqlContent += `
END $$;
`;

        fs.writeFileSync(OUTPUT_FILE, sqlContent);
        console.log(`Successfully generated SQL file at: ${OUTPUT_FILE}`);

    } catch (err) {
        console.error('Generation failed:', err);
    }
}

generateSql();
