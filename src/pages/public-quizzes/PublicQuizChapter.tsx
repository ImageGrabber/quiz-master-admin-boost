import { useParams } from "react-router-dom";
import PublicQuiz from "../PublicQuiz";
import { bookNames } from "@/data/bible-data";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";

export default function PublicQuizChapter() {
    const { book, chapter } = useParams();

    // Format book name (e.g., "1-samuel" -> "1 Samuel")
    const formattedBook = book ? bookNames[book.toLowerCase()] || book.charAt(0).toUpperCase() + book.slice(1) : "";
    const chapterNum = chapter ? chapter.replace('chapter-', '') : "1";
    const quizKey = `${book?.toLowerCase()}-${chapterNum}`;
    const specificQuiz = specificChapterQuizzes[quizKey];

    // In a real app, we would fetch questions specific to this chapter here.
    // We are now slowly migrating to specific quizzes!
    // If no specific quiz exists yet, use the generic fallback.
    const questions = specificQuiz?.questions || [
        {
            id: 1,
            question: `What is a key theme in ${formattedBook} Chapter ${chapterNum}?`,
            options: ["Faith", "Obedience", "Love", "Depends on the context"],
            answer: 3,
            explanation: `Read ${formattedBook} Chapter ${chapterNum} to discover the specific themes and lessons.`
        },
        {
            id: 2,
            question: `Who is a main character in ${formattedBook} Chapter ${chapterNum}?`,
            options: ["Moses", "David", "Jesus", "Context specific"],
            answer: 3,
            explanation: `The characters vary by chapter. Study ${formattedBook} Chapter ${chapterNum} to find out!`
        }
    ];

    return (
        <PublicQuiz
            title={`${formattedBook} Chapter ${chapterNum} Quiz`}
            questions={questions}
            bookName={formattedBook}
            chapter={chapterNum}
            seoDescription={specificQuiz?.seoDescription}
            prevChapterUrl={specificQuiz?.prevChapterUrl}
            nextChapterUrl={specificQuiz?.nextChapterUrl}
        />
    );
}
