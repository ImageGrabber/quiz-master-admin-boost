import { useParams, useLocation } from "react-router-dom";
import { bibleData } from "@/data/bibleData";
import ChapterStudyLayout from "@/components/bible/ChapterStudyLayout";
import PublicQuiz from "./PublicQuiz";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";
import { bookNames } from "@/data/bible-data";
import { createChapterFallbackQuestions, normalizeQuizQuestions } from "@/lib/quizQuestionNormalizer";

export default function ChapterPage() {
  const { book, id } = useParams<{ book: string; id: string }>();
  const location = useLocation();

  const chapterId = parseInt(id || "1", 10);
  const isFullText = location.pathname.endsWith("-full");
  const mode = isFullText ? 'full' : 'study';

  // Normalize book name to lowercase for data lookup
  const bookKey = book?.toLowerCase() || "";
  const bookContent = bibleData[bookKey];
  const content = bookContent ? bookContent[chapterId] : null;

  // Load specific chapter quiz if available
  const quizKey = `${bookKey}-${chapterId}`;
  const chapterQuiz = specificChapterQuizzes[quizKey];
  const formattedBookName =
    bookNames[bookKey] ||
    (book ? book.charAt(0).toUpperCase() + book.slice(1).replace(/-/g, " ") : "");
  const questions = normalizeQuizQuestions(
    chapterQuiz?.questions || createChapterFallbackQuestions(formattedBookName, chapterId),
    {
      bookName: formattedBookName,
      chapter: chapterId
    }
  );

  if (!content) {
    return (
      <PublicQuiz
        title={`${formattedBookName} Chapter ${chapterId} Quiz`}
        questions={questions}
        bookName={formattedBookName}
        chapter={`${chapterId}`}
        seoDescription={
          chapterQuiz?.seoDescription ||
          `Challenge yourself with ${formattedBookName} Chapter ${chapterId} quiz questions and clear explanations.`
        }
        prevChapterUrl={chapterQuiz?.prevChapterUrl}
        nextChapterUrl={chapterQuiz?.nextChapterUrl}
      />
    );
  }

  return (
    <ChapterStudyLayout 
      book={bookKey} 
      chapterId={chapterId} 
      content={content} 
      mode={mode}
      questions={questions}
    />
  );
}
