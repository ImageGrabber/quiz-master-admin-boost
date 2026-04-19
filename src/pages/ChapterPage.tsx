import { useParams, useLocation } from "react-router-dom";
import { bibleData } from "@/data/bibleData";
import ChapterStudyLayout from "@/components/bible/ChapterStudyLayout";
import PublicQuiz from "./PublicQuiz";
import SEO from "@/components/SEO";
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
      <>
        <SEO 
          title={`${formattedBookName} Chapter ${chapterId} Quiz | Bible Questions and Answers`}
          description={
            chapterQuiz?.seoDescription ||
            `Challenge yourself with ${formattedBookName} Chapter ${chapterId} quiz questions and clear explanations. Perfect for individual study or youth groups.`
          }
          keywords={`${formattedBookName} chapter ${chapterId} quiz, ${formattedBookName} questions and answers, bible quiz with answers, ${formattedBookName} study`}
          author="Bible Quiz Competition"
          url={`/bible-questions-and-answers-hub/${book}/chapter-${chapterId}`}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `How many questions are in the ${formattedBookName} Chapter ${chapterId} quiz?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `There are typically 5 to 10 professionally curated questions in the ${formattedBookName} Chapter ${chapterId} quiz, each with detailed biblical explanations.`
                }
              },
              {
                "@type": "Question",
                "name": `Is the ${formattedBookName} Chapter ${chapterId} quiz free to play?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes, all chapter-level Bible quizzes on our platform including ${formattedBookName} Chapter ${chapterId} are 100% free and require no registration.`
                }
              },
              {
                "@type": "Question",
                "name": `What is the focus of ${formattedBookName} Chapter ${chapterId} study?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The study focuses on the historical context, key theological themes, and significant narrative events found specifically within ${formattedBookName} Chapter ${chapterId}.`
                }
              }
            ]
          }}
        />
        <PublicQuiz
          title={`${formattedBookName} Chapter ${chapterId} Quiz`}
          questions={questions}
          bookName={formattedBookName}
          chapter={`${chapterId}`}
          prevChapterUrl={chapterQuiz?.prevChapterUrl}
          nextChapterUrl={chapterQuiz?.nextChapterUrl}
        />
      </>
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
