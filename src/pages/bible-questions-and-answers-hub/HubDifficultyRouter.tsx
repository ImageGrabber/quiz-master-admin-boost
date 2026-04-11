import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PublicQuiz from "../PublicQuiz";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";

// Lazy load all quiz components
const quizMap: Record<string, any> = {
  genesis: lazy(() => import("./GenesisBeginnerQuiz")), 
  "genesis-beginner": lazy(() => import("./GenesisBeginnerQuiz")),
  "genesis-intermediate": lazy(() => import("./GenesisIntermediateQuiz")),
  "genesis-advanced": lazy(() => import("./GenesisAdvancedQuiz")),
  
  exodus: lazy(() => import("../public-quizzes/ExodusPublicQuiz")),
  leviticus: lazy(() => import("../public-quizzes/LeviticusPublicQuiz")),
  numbers: lazy(() => import("../public-quizzes/NumbersPublicQuiz")),
  deuteronomy: lazy(() => import("../public-quizzes/DeuteronomyPublicQuiz")),
  joshua: lazy(() => import("../public-quizzes/JoshuaPublicQuiz")),
  judges: lazy(() => import("../public-quizzes/JudgesPublicQuiz")),
  ruth: lazy(() => import("../public-quizzes/RuthPublicQuiz")),
  "1-samuel": lazy(() => import("../public-quizzes/1SamuelPublicQuiz")),
  "2-samuel": lazy(() => import("../public-quizzes/2SamuelPublicQuiz")),
  "1-kings": lazy(() => import("../public-quizzes/1KingsPublicQuiz")),
  "2-kings": lazy(() => import("../public-quizzes/2KingsPublicQuiz")),
  "1-chronicles": lazy(() => import("../public-quizzes/1ChroniclesPublicQuiz")),
  "2-chronicles": lazy(() => import("../public-quizzes/2ChroniclesPublicQuiz")),
  ezra: lazy(() => import("../public-quizzes/EzraPublicQuiz")),
  nehemiah: lazy(() => import("../public-quizzes/NehemiahPublicQuiz")),
  esther: lazy(() => import("../public-quizzes/EstherPublicQuiz")),
  job: lazy(() => import("../public-quizzes/JobPublicQuiz")),
  psalms: lazy(() => import("../public-quizzes/PsalmsPublicQuiz")),
  proverbs: lazy(() => import("../public-quizzes/ProverbsPublicQuiz")),
  ecclesiastes: lazy(() => import("../public-quizzes/EcclesiastesPublicQuiz")),
  "song-of-solomon": lazy(() => import("../public-quizzes/SongOfSolomonPublicQuiz")),
  isaiah: lazy(() => import("../public-quizzes/IsaiahPublicQuiz")),
  jeremiah: lazy(() => import("../public-quizzes/JeremiahPublicQuiz")),
  lamentations: lazy(() => import("../public-quizzes/LamentationsPublicQuiz")),
  ezekiel: lazy(() => import("../public-quizzes/EzekielPublicQuiz")),
  daniel: lazy(() => import("../public-quizzes/DanielPublicQuiz")),
  hosea: lazy(() => import("../public-quizzes/HoseaPublicQuiz")),
  joel: lazy(() => import("../public-quizzes/JoelPublicQuiz")),
  amos: lazy(() => import("../public-quizzes/AmosPublicQuiz")),
  obadiah: lazy(() => import("../public-quizzes/ObadiahPublicQuiz")),
  jonah: lazy(() => import("../public-quizzes/JonahPublicQuiz")),
  micah: lazy(() => import("../public-quizzes/MicahPublicQuiz")),
  nahum: lazy(() => import("../public-quizzes/NahumPublicQuiz")),
  habakkuk: lazy(() => import("../public-quizzes/HabakkukPublicQuiz")),
  zephaniah: lazy(() => import("../public-quizzes/ZephaniahPublicQuiz")),
  haggai: lazy(() => import("../public-quizzes/HaggaiPublicQuiz")),
  zechariah: lazy(() => import("../public-quizzes/ZechariahPublicQuiz")),
  malachi: lazy(() => import("../public-quizzes/MalachiPublicQuiz")),
  matthew: lazy(() => import("../public-quizzes/MatthewPublicQuiz")),
  mark: lazy(() => import("../public-quizzes/MarkPublicQuiz")),
  luke: lazy(() => import("../public-quizzes/LukePublicQuiz")),
  john: lazy(() => import("../public-quizzes/JohnPublicQuiz")),
  acts: lazy(() => import("../public-quizzes/ActsPublicQuiz")),
  romans: lazy(() => import("../public-quizzes/RomansPublicQuiz")),
  "1-corinthians": lazy(() => import("../public-quizzes/1CorinthiansPublicQuiz")),
  "2-corinthians": lazy(() => import("../public-quizzes/2CorinthiansPublicQuiz")),
  galatians: lazy(() => import("../public-quizzes/GalatiansPublicQuiz")),
  ephesians: lazy(() => import("../public-quizzes/EphesiansPublicQuiz")),
  philippians: lazy(() => import("../public-quizzes/PhilippiansPublicQuiz")),
  colossians: lazy(() => import("../public-quizzes/ColossiansPublicQuiz")),
  "1-thessalonians": lazy(() => import("../public-quizzes/1ThessaloniansPublicQuiz")),
  "2-thessalonians": lazy(() => import("../public-quizzes/2ThessaloniansPublicQuiz")),
  "1-timothy": lazy(() => import("../public-quizzes/1TimothyPublicQuiz")),
  "2-timothy": lazy(() => import("../public-quizzes/2TimothyPublicQuiz")),
  titus: lazy(() => import("../public-quizzes/TitusPublicQuiz")),
  philemon: lazy(() => import("../public-quizzes/PhilemonPublicQuiz")),
  hebrews: lazy(() => import("../public-quizzes/HebrewsPublicQuiz")),
  james: lazy(() => import("../public-quizzes/JamesPublicQuiz")),
  "1-peter": lazy(() => import("../public-quizzes/1PeterPublicQuiz")),
  "2-peter": lazy(() => import("../public-quizzes/2PeterPublicQuiz")),
  "1-john": lazy(() => import("../public-quizzes/1JohnPublicQuiz")),
  "2-john": lazy(() => import("../public-quizzes/2JohnPublicQuiz")),
  "3-john": lazy(() => import("../public-quizzes/3JohnPublicQuiz")),
  jude: lazy(() => import("../public-quizzes/JudePublicQuiz")),
  revelation: lazy(() => import("../public-quizzes/RevelationPublicQuiz"))
};

export default function HubDifficultyRouter() {
  const { bookSlug, difficulty } = useParams<{ bookSlug: string; difficulty: string }>();
  
  if (!bookSlug) return null;

  // Check for chapter-specific quizzes (e.g., /genesis/ch1-beginner or /genesis/chapter-1)
  const isChapterRequest = difficulty?.startsWith('ch') || difficulty?.startsWith('chapter-');
  
  if (isChapterRequest) {
    const chapterMatch = difficulty.match(/ch(?:apter-)?(\d+)/i);
    if (chapterMatch) {
      const chapterId = chapterMatch[1];
      const bookKey = bookSlug.toLowerCase();
      const quizKey = `${bookKey}-${chapterId}`;
      const chapterData = specificChapterQuizzes[quizKey];
      
      if (chapterData) {
        // Correct book name formatting
        const formattedBookName = bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ');
        
        return (
          <PublicQuiz 
            {...chapterData}
            title={chapterData.title || `${formattedBookName} Chapter ${chapterId} Quiz`}
            bookName={formattedBookName}
            chapter={chapterId}
            questions={chapterData.questions}
          />
        );
      }
    }
  }

  // Handle Genesis special levels
  if (bookSlug.toLowerCase() === "genesis" && difficulty) {
    const diffKey = difficulty.toLowerCase();
    const Component = quizMap[`genesis-${diffKey}`];
    
    if (Component) {
      return (
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="w-12 h-12 animate-spin text-gray-200" />
          </div>
        }>
          <Component />
        </Suspense>
      );
    }

    // Check if it's a specialized Genesis quiz from data
    const specializedData = specificChapterQuizzes[`genesis-${diffKey}`];
    if (specializedData) {
      const formattedBookName = "Genesis";
      return (
        <PublicQuiz 
          {...specializedData}
          title={specializedData.title || `Genesis ${diffKey.replace(/-/g, ' ').toUpperCase()} Quiz`}
          bookName={formattedBookName}
          chapter={specializedData.chapter || diffKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          questions={specializedData.questions}
        />
      );
    }
  }

  // Generic fallback for all other books
  const Component = quizMap[bookSlug.toLowerCase()];

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center font-urbanist bg-white">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Quiz Coming Soon</h2>
          <p className="text-gray-500 mb-8">We're still preparing the {difficulty} questions for this book!</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-gray-200" />
      </div>
    }>
      <Component />
    </Suspense>
  );
}
