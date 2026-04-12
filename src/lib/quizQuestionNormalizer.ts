export interface QuizQuestionInput {
  id?: number | string;
  question?: string;
  options?: string[];
  answer?: number;
  explanation?: string;
  referenceVerse?: string;
  chapter?: number | string;
  [key: string]: unknown;
}

export interface NormalizedQuizQuestion extends QuizQuestionInput {
  id: number | string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  chapter?: number | string;
}

interface NormalizeQuizQuestionsOptions {
  bookName: string;
  chapter?: number | string;
}

const DEFAULT_OPTIONS = ["Option A", "Option B", "Option C", "Option D"];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasChapterContext = (text: string, bookName: string, chapter?: number | string): boolean => {
  if (!chapter) return true;

  const lowerText = text.toLowerCase();
  const chapterValue = String(chapter).toLowerCase();
  const lowerBookName = bookName.toLowerCase().trim();

  if (lowerText.includes(`chapter ${chapterValue}`)) return true;

  const withBookChapter = new RegExp(`${escapeRegExp(lowerBookName)}\\s+${escapeRegExp(chapterValue)}(?::|\\b)`);
  return withBookChapter.test(lowerText);
};

const chapterLabel = (bookName: string, chapter?: number | string) =>
  chapter ? `${bookName} Chapter ${chapter}` : bookName;

export const createChapterFallbackQuestions = (bookName: string, chapter: number | string): QuizQuestionInput[] => [
  {
    id: 1,
    question: `What is a key theme in ${bookName} Chapter ${chapter}?`,
    options: ["God's faithfulness", "Human response", "Covenant lessons", "All of the above"],
    answer: 3,
    explanation: `This chapter combines narrative details with spiritual themes. Review ${bookName} Chapter ${chapter} carefully to trace the full message.`
  },
  {
    id: 2,
    question: `Which person is most central in ${bookName} Chapter ${chapter}?`,
    options: ["Moses", "David", "Jesus", "It depends on the chapter text"],
    answer: 3,
    explanation: `The key person changes by chapter. Read ${bookName} Chapter ${chapter} and identify who drives the events and dialogue.`
  }
];

export const normalizeQuizQuestions = (
  questions: QuizQuestionInput[] | undefined | null,
  { bookName, chapter }: NormalizeQuizQuestionsOptions
): NormalizedQuizQuestion[] => {
  if (!Array.isArray(questions)) return [];

  const contextLabel = chapterLabel(bookName, chapter);

  return questions.map((rawQuestion, index) => {
    const options = Array.isArray(rawQuestion.options) && rawQuestion.options.length > 0
      ? rawQuestion.options.map((opt) => String(opt))
      : DEFAULT_OPTIONS;

    const requestedAnswer = typeof rawQuestion.answer === "number" ? rawQuestion.answer : 0;
    const answer = requestedAnswer >= 0 && requestedAnswer < options.length ? requestedAnswer : 0;

    const baseQuestion = (rawQuestion.question || `What can we learn from ${contextLabel}?`).trim();
    const question = chapter && !hasChapterContext(baseQuestion, bookName, chapter)
      ? `${baseQuestion} (${contextLabel})`
      : baseQuestion;

    const baseExplanation = (rawQuestion.explanation || "").trim();
    let explanation = baseExplanation || `In ${contextLabel}, the best answer is "${options[answer]}". Review the chapter text for the full context.`;

    if (chapter && !hasChapterContext(explanation, bookName, chapter)) {
      explanation = `${explanation} (Context: ${contextLabel}.)`;
    }

    const normalizedChapter = rawQuestion.chapter ?? (chapter ? String(chapter) : undefined);

    return {
      ...rawQuestion,
      id: rawQuestion.id ?? index + 1,
      question,
      options,
      answer,
      explanation,
      chapter: normalizedChapter
    };
  });
};
