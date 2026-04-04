import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "@/data/quizData";
import BibleBookQuiz from "./BibleBookQuiz";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft } from "lucide-react";

export default function ChapterQuizPage() {
  const { book, quizId } = useParams<{ book: string; quizId: string }>();
  const navigate = useNavigate();

  const bookKey = book?.toLowerCase() || "";

  // Robustly parse the quizId (e.g., "ch1-beginner", "ch1-intermediate" or "ch1-11-advanced")
  // Format: ch[id]-[difficulty]
  const match = quizId?.match(/^ch(.+)-(beginner|intermediate|advanced)$/i);
  const id = match ? match[1] : "";
  const difficulty = match ? match[2].toLowerCase() : "beginner";

  const bookQuizzes = quizData[bookKey as keyof typeof quizData];
  const chapterQuizzes = bookQuizzes ? (bookQuizzes[id as unknown as number] || bookQuizzes[id as string]) : null;
  const questions = chapterQuizzes ? (chapterQuizzes as any)[difficulty] : null;

  if (!questions) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans p-6 text-center">
        <Brain className="w-16 h-16 text-stone-900 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black text-stone-900 mb-4 tracking-tight uppercase">Quiz Under Construction</h1>
        <p className="text-xl font-bold text-stone-400 max-w-md mb-10 leading-relaxed uppercase tracking-widest text-xs">
          Gathering wisdom for {book?.charAt(0).toUpperCase()}{book?.slice(1)} {id?.includes("-") ? `Range ${id}` : `Chapter ${id}`} ({difficulty}).
        </p>
        <Button
          onClick={() => navigate(`/bible-questions-and-answers-hub/${book}`)}
          className="bg-stone-900 hover:bg-stone-800 text-white font-black py-6 px-10 rounded-2xl shadow-xl transition-all hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          BACK TO HUB
        </Button>
      </div>
    );
  }

  const bookNameFormatted = book?.charAt(0).toUpperCase() + book?.slice(1);

  return (
    <BibleBookQuiz
      title={`${bookNameFormatted} Chapter ${id} - ${difficulty?.charAt(0).toUpperCase()}${difficulty?.slice(1)}`}
      questions={questions}
      bookName={bookNameFormatted}
      difficulty={difficulty}
    />
  );
}
