import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import PublicQuiz from "../PublicQuiz";
import { specificChapterQuizzes } from "@/data/specific-chapter-quizzes";
import { bookNames } from "@/data/bible-data";
import { createChapterFallbackQuestions, normalizeQuizQuestions } from "@/lib/quizQuestionNormalizer";

// Lazy load all quiz components
const quizMap: Record<string, any> = {
  genesis: lazy(() => import("./GenesisBeginnerQuiz")), 
  "genesis-beginner": lazy(() => import("./GenesisBeginnerQuiz")),
  "genesis-intermediate": lazy(() => import("./GenesisIntermediateQuiz")),
  "genesis-advanced": lazy(() => import("./GenesisAdvancedQuiz")),
  "exodus-beginner": lazy(() => import("./ExodusBeginnerQuiz")),
  "exodus-intermediate": lazy(() => import("./ExodusIntermediateQuiz")),
  "exodus-advanced": lazy(() => import("./ExodusAdvancedQuiz")),
  "leviticus-beginner": lazy(() => import("./LeviticusBeginnerQuiz")),
  "leviticus-intermediate": lazy(() => import("./LeviticusIntermediateQuiz")),
  "leviticus-advanced": lazy(() => import("./LeviticusAdvancedQuiz")),
  "numbers-beginner": lazy(() => import("./NumbersBeginnerQuiz")),
  "numbers-intermediate": lazy(() => import("./NumbersIntermediateQuiz")),
  "numbers-advanced": lazy(() => import("./NumbersAdvancedQuiz")),
  "deuteronomy-beginner": lazy(() => import("./DeuteronomyBeginnerQuiz")),
  "deuteronomy-intermediate": lazy(() => import("./DeuteronomyIntermediateQuiz")),
  "deuteronomy-advanced": lazy(() => import("./DeuteronomyAdvancedQuiz")),
  
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
  const chapterMatch = difficulty?.match(/ch(?:apter-)?(\d+(?:-\d+)?)/i);
  const isChapterRequest = !!chapterMatch;
  
  if (isChapterRequest) {
    const chapterId = chapterMatch[1];
    const bookKey = bookSlug.toLowerCase();
    const quizKey = `${bookKey}-${chapterId}`;
    const chapterData = specificChapterQuizzes[quizKey];

    const formattedBookName =
      bookNames[bookKey] ||
      bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, " ");

    const chapterQuestions = normalizeQuizQuestions(
      chapterData?.questions || createChapterFallbackQuestions(formattedBookName, chapterId),
      { bookName: formattedBookName, chapter: chapterId }
    );

    // Standardize the canonical URL for all variations of chapter requests
    const canonicalPath = `/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/chapter-${chapterId}`;

    return (
      <PublicQuiz
        {...chapterData}
        title={chapterData?.title || `${formattedBookName} Chapter ${chapterId} Quiz`}
        bookName={formattedBookName}
        chapter={chapterId}
        questions={chapterQuestions}
        canonicalPath={canonicalPath}
        seoDescription={
          chapterData?.seoDescription ||
          `Test your understanding of ${formattedBookName} Chapter ${chapterId} with chapter-based questions and explanations.`
        }
      />
    );
  }

  // Handle Data-Driven Level Quizzes (Beginner, Intermediate, Advanced)
  if (difficulty) {
    const registryKey = `${bookSlug.toLowerCase()}-${difficulty.toLowerCase()}`;
    const levelData = specificChapterQuizzes[registryKey];
    
    if (levelData) {
      const formattedBookName = bookNames[bookSlug.toLowerCase()] || bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ');
      return (
        <PublicQuiz 
          {...levelData}
          title={levelData.title || `${formattedBookName} ${difficulty.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Quiz`}
          bookName={formattedBookName}
          chapter={levelData.chapter || difficulty.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          questions={levelData.questions}
          canonicalPath={`/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/${difficulty.toLowerCase()}`}
        />
      );
    }
  }

  // Handle Book-Specific Level Components (e.g., Genesis, Exodus)
  if (bookSlug && difficulty) {
    const diffKey = difficulty.toLowerCase();
    const bookKey = bookSlug.toLowerCase();
    const registryKey = `${bookKey}-${diffKey}`;
    const Component = quizMap[registryKey];
    
    if (Component) {
      const canonicalPath = `/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}/${difficulty.toLowerCase()}`;
      return (
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <Loader2 className="w-12 h-12 animate-spin text-gray-200" />
          </div>
        }>
          <Component canonicalPath={canonicalPath} />
        </Suspense>
      );
    }

    // Check if it's a specialized level from data
    const specializedData = specificChapterQuizzes[registryKey];
    if (specializedData) {
      const formattedBookName = bookSlug.charAt(0).toUpperCase() + bookSlug.slice(1).replace(/-/g, ' ');
      return (
        <PublicQuiz 
          {...specializedData}
          title={specializedData.title || `${formattedBookName} ${diffKey.replace(/-/g, ' ').toUpperCase()} Quiz`}
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

  const canonicalPath = `/bible-questions-and-answers-hub/${bookSlug.toLowerCase()}${difficulty ? `/${difficulty.toLowerCase()}` : ""}`;

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-gray-200" />
      </div>
    }>
      <Component canonicalPath={canonicalPath} />
    </Suspense>
  );
}
