import { useParams } from "react-router-dom";
import PublicQuiz from "../PublicQuiz";
import { bookNames } from "@/data/bible-data";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";
import { createChapterFallbackQuestions, normalizeQuizQuestions } from "@/lib/quizQuestionNormalizer";

export default function PublicQuizChapter() {
    const { book, chapter } = useParams();

    // Format book name (e.g., "1-samuel" -> "1 Samuel")
    const formattedBook = book ? bookNames[book.toLowerCase()] || book.charAt(0).toUpperCase() + book.slice(1) : "";
    const chapterNum = chapter ? chapter.replace('chapter-', '') : "1";
    const quizKey = `${book?.toLowerCase()}-${chapterNum}`;
    const specificQuiz = specificChapterQuizzes[quizKey];

    const questions = normalizeQuizQuestions(
        specificQuiz?.questions || createChapterFallbackQuestions(formattedBook, chapterNum),
        { bookName: formattedBook, chapter: chapterNum }
    );

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
