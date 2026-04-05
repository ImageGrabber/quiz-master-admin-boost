import { useParams, useLocation } from "react-router-dom";
import { bibleData } from "@/data/bibleData";
import ChapterStudyLayout from "@/components/bible/ChapterStudyLayout";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

export default function ChapterPage() {
  const { book, id } = useParams<{ book: string; id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const chapterId = parseInt(id || "1", 10);
  const isFullText = location.pathname.endsWith("-full");
  const mode = isFullText ? 'full' : 'study';

  // Normalize book name to lowercase for data lookup
  const bookKey = book?.toLowerCase() || "";
  const bookContent = bibleData[bookKey];
  const content = bookContent ? bookContent[chapterId] : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex flex-col items-center justify-center font-urbanist p-6 text-center min-h-[70vh]">
          <Brain className="w-16 h-16 text-black mb-6 animate-pulse" />
          <h1 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">Chapter Under Construction</h1>
          <p className="text-xl font-light text-gray-500 max-w-md mb-10 leading-relaxed">
            We're currently enriching the study guides for {book?.charAt(0).toUpperCase()}{book?.slice(1)} Chapter {chapterId}. Check back soon!
          </p>
          <Button 
            onClick={() => navigate(`/bible-questions-and-answers-hub/${book}`)} 
            variant="outline"
            className="border-gray-200 py-6 px-10 rounded-xl font-light text-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {book?.charAt(0).toUpperCase()}{book?.slice(1)} Hub
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ChapterStudyLayout 
      book={bookKey} 
      chapterId={chapterId} 
      content={content} 
      mode={mode} 
    />
  );
}
