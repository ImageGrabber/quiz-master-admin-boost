import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/SEO";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationBanner from "@/components/NotificationBanner";
import { Analytics } from "@vercel/analytics/react"
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PublicRoute from "@/components/PublicRoute";
import Index from "./pages/homepages/Index";
import CompetitionHome from "./pages/homepages/CompetitionHome";
import SignUpToday from "./pages/SignUpToday";
import EmotionalCheckIn from "./pages/EmotionalCheckIn";
import JoyRunnerTest from "./pages/JoyRunnerTest";
import JoyRunner from "./pages/JoyRunner";
import Match3Game from "./pages/Match3Game";
import MemoryMatchGame from "./pages/MemoryMatchGame";
import WordSearch from "./pages/WordSearch";
import MemoryMatch from "./pages/MemoryMatch";
import ScriptureMatchMultiplayer from "./pages/ScriptureMatchMultiplayer";
import LostSheep from "./pages/LostSheep";
import VerseMaster from "./pages/VerseMaster";
import FaithBuilder from "./pages/FaithBuilder";
import FlappyBird from "./pages/FlappyBird";
import TodaysQuiz from "./pages/TodaysQuiz";
import TodaysQuizMark from "./pages/TodaysQuizMark";
import DailyVerse from "./pages/DailyVerse";
import PrayerRequests from "./pages/PrayerRequests";
import SelahSpace from "./pages/SelahSpace";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Connections from "./pages/Connections";
import BibleGames from "./pages/BibleGames";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz";
import CreateGuestQuiz from "./pages/guest/CreateGuestQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizResults from "./pages/QuizResults";
import Help from "./pages/Help";
import Donate from "./pages/Donate";
import LiveQuizHost from "./pages/LiveQuizHost";
import LiveQuizIntro from "./pages/LiveQuizIntro";
import HostingGuide from "./pages/HostingGuide";
import LiveQuizParticipant from "./pages/LiveQuizParticipant";
import LiveQuizHealthCheck from "./pages/LiveQuizHealthCheck";
import Settings from "./pages/Settings";
import QuizSelection from "./pages/QuizSelection";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import WeeklyQuiz from "./pages/WeeklyQuiz";
import WeeklyQuizTaking from "./pages/WeeklyQuizTaking";
import Leaderboard from "./pages/Leaderboard";
import Competitions from "./pages/Competitions";
import CompetitionQuiz from "./pages/CompetitionQuiz";
import CompetitionLeaderboard from "./pages/CompetitionLeaderboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAttempts from "./pages/admin/Attempts";
import AdminUpload from "./pages/admin/Upload";
import AdminQuizzes from "./pages/admin/Quizzes";
import AdminQuestions from "./pages/admin/Questions";
import AdminActivity from "./pages/admin/Activity";
import AdminCompetitions from "./pages/admin/Competitions";
import AdminUsers from "./pages/admin/Users";
import AdminUserSettings from "./pages/admin/UserSettings";
import WeeklyAttendance from "./pages/admin/WeeklyAttendance";
import AdminPrayerRequests from "./pages/admin/PrayerRequests";
import DailyVerses from "./pages/admin/DailyVerses";
import Notifications from "./pages/admin/Notifications";
import NotFound from "./pages/NotFound";
import RLSTest from "./pages/RLSTest";
import BibleQA from "./pages/BibleQA";
import SentryTest from "./pages/SentryTest";
import BibleStudy from "./pages/BibleStudy";
import PaulineEpistles from "./pages/bible-questions-and-answers-hub/pauline-epistles";
import PublicLeaderboard from "./pages/PublicLeaderboard";
import Challenge from "./pages/Challenge";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import GenesisPublicQuiz from "./pages/public-quizzes/GenesisPublicQuiz";
import ExodusPublicQuiz from "./pages/public-quizzes/ExodusPublicQuiz";
import LeviticusPublicQuiz from "./pages/public-quizzes/LeviticusPublicQuiz";
import NumbersPublicQuiz from "./pages/public-quizzes/NumbersPublicQuiz";
import DeuteronomyPublicQuiz from "./pages/public-quizzes/DeuteronomyPublicQuiz";
import PsalmsPublicQuiz from "./pages/public-quizzes/PsalmsPublicQuiz";
import ProverbsPublicQuiz from "./pages/public-quizzes/ProverbsPublicQuiz";
import IsaiahPublicQuiz from "./pages/public-quizzes/IsaiahPublicQuiz";
import DanielPublicQuiz from "./pages/public-quizzes/DanielPublicQuiz";
import JobPublicQuiz from "./pages/public-quizzes/JobPublicQuiz";
import JoshuaPublicQuiz from "./pages/public-quizzes/JoshuaPublicQuiz";
import JudgesPublicQuiz from "./pages/public-quizzes/JudgesPublicQuiz";
import RuthPublicQuiz from "./pages/public-quizzes/RuthPublicQuiz";
import FirstSamuelPublicQuiz from "./pages/public-quizzes/1SamuelPublicQuiz";
import SecondSamuelPublicQuiz from "./pages/public-quizzes/2SamuelPublicQuiz";
import FirstKingsPublicQuiz from "./pages/public-quizzes/1KingsPublicQuiz";
import SecondKingsPublicQuiz from "./pages/public-quizzes/2KingsPublicQuiz";
import FirstChroniclesPublicQuiz from "./pages/public-quizzes/1ChroniclesPublicQuiz";
import SecondChroniclesPublicQuiz from "./pages/public-quizzes/2ChroniclesPublicQuiz";
import EzraPublicQuiz from "./pages/public-quizzes/EzraPublicQuiz";
import NehemiahPublicQuiz from "./pages/public-quizzes/NehemiahPublicQuiz";
import EstherPublicQuiz from "./pages/public-quizzes/EstherPublicQuiz";
import HoseaPublicQuiz from "./pages/public-quizzes/HoseaPublicQuiz";
import JoelPublicQuiz from "./pages/public-quizzes/JoelPublicQuiz";
import AmosPublicQuiz from "./pages/public-quizzes/AmosPublicQuiz";
import ObadiahPublicQuiz from "./pages/public-quizzes/ObadiahPublicQuiz";
import JonahPublicQuiz from "./pages/public-quizzes/JonahPublicQuiz";
import MicahPublicQuiz from "./pages/public-quizzes/MicahPublicQuiz";
import NahumPublicQuiz from "./pages/public-quizzes/NahumPublicQuiz";
import HabakkukPublicQuiz from "./pages/public-quizzes/HabakkukPublicQuiz";
import ZephaniahPublicQuiz from "./pages/public-quizzes/ZephaniahPublicQuiz";
import HaggaiPublicQuiz from "./pages/public-quizzes/HaggaiPublicQuiz";
import ZechariahPublicQuiz from "./pages/public-quizzes/ZechariahPublicQuiz";
import MalachiPublicQuiz from "./pages/public-quizzes/MalachiPublicQuiz";
import MatthewPublicQuiz from "./pages/public-quizzes/MatthewPublicQuiz";
import MarkPublicQuiz from "./pages/public-quizzes/MarkPublicQuiz";
import LukePublicQuiz from "./pages/public-quizzes/LukePublicQuiz";
import JohnPublicQuiz from "./pages/public-quizzes/JohnPublicQuiz";
import RomansPublicQuiz from "./pages/public-quizzes/RomansPublicQuiz";
import CorinthiansPublicQuiz from "./pages/public-quizzes/1CorinthiansPublicQuiz";
import Corinthians2PublicQuiz from "./pages/public-quizzes/2CorinthiansPublicQuiz";
import GalatiansPublicQuiz from "./pages/public-quizzes/GalatiansPublicQuiz";
import EphesiansPublicQuiz from "./pages/public-quizzes/EphesiansPublicQuiz";
import PhilippiansPublicQuiz from "./pages/public-quizzes/PhilippiansPublicQuiz";
import ColossiansPublicQuiz from "./pages/public-quizzes/ColossiansPublicQuiz";
import Thessalonians1PublicQuiz from "./pages/public-quizzes/1ThessaloniansPublicQuiz";
import Thessalonians2PublicQuiz from "./pages/public-quizzes/2ThessaloniansPublicQuiz";
import Timothy1PublicQuiz from "./pages/public-quizzes/1TimothyPublicQuiz";
import Timothy2PublicQuiz from "./pages/public-quizzes/2TimothyPublicQuiz";
import TitusPublicQuiz from "./pages/public-quizzes/TitusPublicQuiz";
import PhilemonPublicQuiz from "./pages/public-quizzes/PhilemonPublicQuiz";
import HebrewsPublicQuiz from "./pages/public-quizzes/HebrewsPublicQuiz";
import JamesPublicQuiz from "./pages/public-quizzes/JamesPublicQuiz";
import Peter1PublicQuiz from "./pages/public-quizzes/1PeterPublicQuiz";
import Peter2PublicQuiz from "./pages/public-quizzes/2PeterPublicQuiz";
import John1PublicQuiz from "./pages/public-quizzes/1JohnPublicQuiz";
import John2PublicQuiz from "./pages/public-quizzes/2JohnPublicQuiz";
import John3PublicQuiz from "./pages/public-quizzes/3JohnPublicQuiz";
import JudePublicQuiz from "./pages/public-quizzes/JudePublicQuiz";
import RevelationPublicQuiz from "./pages/public-quizzes/RevelationPublicQuiz";
import PublicQuizChapter from "./pages/public-quizzes/PublicQuizChapter";
import HardBibleQuizForTeens from "./pages/seo-quizzes/HardBibleQuizForTeens";
import HardBibleQuizForAdults from "./pages/seo-quizzes/HardBibleQuizForAdults";
import BibleQuizQuestionsAndAnswers from "./pages/seo-quizzes/BibleQuizQuestionsAndAnswers";
import HardestBibleTrivia from "./pages/seo-quizzes/HardestBibleTrivia";
import BibleQuizForYouth from "./pages/seo-quizzes/BibleQuizForYouth";
import RulesAndPrizes from "./pages/seo-quizzes/RulesAndPrizes";
import BibleTriviaForKids from "./pages/seo-quizzes/BibleTriviaForKids";
import BookOfJohnQuizQuestions from "./pages/seo-quizzes/BookOfJohnQuizQuestions";
import Songs from "./pages/Songs";
import SongDetail from "./pages/SongDetail";
import EnglishSongs from "./pages/EnglishSongs";
import EnglishSongDetail from "./pages/EnglishSongDetail";
import HindiSongs from "./pages/HindiSongs";
import HindiSongDetail from "./pages/HindiSongDetail";
import KidsStories from "./pages/KidsStories";
import StoryDetail from "./pages/StoryDetail";
import KidsStoryQuiz from "./pages/KidsStoryQuiz";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
// Removed static imports of Bible book quiz files for code-splitting
import Upgrade from "./pages/Upgrade";
import PageViews from "./pages/admin/PageViews";
import { usePageView } from "@/hooks/usePageView";
import RecentAttempts from "./pages/dashboard/recent-attempts";
import BookDetailHub from "./pages/bible-questions-and-answers-hub/BookDetailHub";
import GenesisBeginnerQuiz from "./pages/bible-questions-and-answers-hub/GenesisBeginnerQuiz";
import GenesisIntermediateQuiz from "./pages/bible-questions-and-answers-hub/GenesisIntermediateQuiz";
import GenesisAdvancedQuiz from "./pages/bible-questions-and-answers-hub/GenesisAdvancedQuiz";
import GenesisHub from "./pages/bible-questions-and-answers-hub/Genesis";
import ExodusHub from "./pages/bible-questions-and-answers-hub/Exodus";
import LeviticusHub from "./pages/bible-questions-and-answers-hub/Leviticus";
import NumbersHub from "./pages/bible-questions-and-answers-hub/Numbers";
import DeuteronomyHub from "./pages/bible-questions-and-answers-hub/Deuteronomy";
import JoshuaHub from "./pages/bible-questions-and-answers-hub/Joshua";
import NehemiahHub from "./pages/bible-questions-and-answers-hub/nehemiah";
import HubDifficultyRouter from "./pages/bible-questions-and-answers-hub/HubDifficultyRouter";
import ChapterPage from "./pages/ChapterPage";
import ScrollToTop from "./components/ScrollToTop";


const queryClient = new QueryClient();

function PageViewTracker() {
  usePageView();
  return null;
}

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SEO />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <PageViewTracker />
            <NotificationBanner />
            <Routes>
              <Route path="/emotional-checkin" element={<EmotionalCheckIn />} />
              <Route path="/joy-runner-test" element={<JoyRunnerTest />} />
              <Route path="/joy-runner" element={<ProtectedRoute><JoyRunner /></ProtectedRoute>} />
              <Route path="/match-3-game" element={<Match3Game />} />
              <Route path="/memory-match-game" element={<MemoryMatchGame />} />
              <Route path="/word-search" element={<ProtectedRoute><WordSearch /></ProtectedRoute>} />
              <Route path="/memory-match" element={<ProtectedRoute><MemoryMatch /></ProtectedRoute>} />
              <Route path="/scripture-match-multiplayer" element={<ScriptureMatchMultiplayer />} />
              <Route path="/lost-sheep" element={<LostSheep />} />
              <Route path="/verse-master" element={<ProtectedRoute><VerseMaster /></ProtectedRoute>} />
              <Route path="/faith-builder" element={<ProtectedRoute><FaithBuilder /></ProtectedRoute>} />
              <Route path="/flappy-bird" element={<ProtectedRoute><FlappyBird /></ProtectedRoute>} />
              <Route path="/selah-space" element={<SelahSpace />} />
              <Route path="/" element={<CompetitionHome />} />
              <Route path="/home" element={<Index />} />
              <Route path="/competition-home" element={<CompetitionHome />} />
              <Route path="/signup-today" element={<SignUpToday />} />
              <Route path="/todays-quiz" element={<TodaysQuiz />} />
              <Route path="/todays-quiz-mark" element={<TodaysQuizMark />} />
              <Route path="/daily-verse" element={<DailyVerse />} />
              <Route path="/prayer-requests" element={<PrayerRequests />} />
              <Route path="/sentry-test" element={<SentryTest />} />
              <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/auth/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path="/auth/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
              <Route path="/dashboard/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
              <Route path="/dashboard/bible-games" element={<ProtectedRoute><BibleGames /></ProtectedRoute>} />
              <Route path="/dashboard/quizzes" element={<ProtectedRoute><MyQuizzes /></ProtectedRoute>} />
              <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
              <Route path="/create-quiz/guest" element={<CreateGuestQuiz />} />
              <Route path="/edit-quiz/:quizId" element={<ProtectedRoute><EditQuiz /></ProtectedRoute>} />
              <Route path="/quiz-results/:quizId" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
              <Route path="/help" element={<Help />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/live-quiz" element={<ProtectedRoute><LiveQuizIntro /></ProtectedRoute>} />
              {/* SEO-friendly slug for hosting guide */}
              <Route path="/host-live-bible-quizzes-with-confidence" element={<HostingGuide />} />
              {/* Backward-compatible old path */}
              <Route path="/hosting-guide" element={<HostingGuide />} />

              {/* Trust & E-E-A-T Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              <Route path="/rules-and-prizes" element={<RulesAndPrizes />} />
              <Route path="/quiz-scoring-system-explanation" element={<RulesAndPrizes />} />
              <Route path="/bible-quiz-prize" element={<RulesAndPrizes />} />
              <Route path="/bible-quiz-questions-and-answers" element={<BibleQuizQuestionsAndAnswers />} />
              <Route path="/online-bible-quiz-competition-2026" element={<CompetitionHome />} />
              <Route path="/bible-competition-2026" element={<CompetitionHome />} />
              <Route path="/hardest-bible-trivia-questions" element={<HardestBibleTrivia />} />
              <Route path="/bible-quiz-with-answers-for-youth" element={<BibleQuizForYouth />} />
              <Route path="/hard-bible-quiz-for-teens" element={<HardBibleQuizForTeens />} />
              <Route path="/hard-bible-quiz-for-adults" element={<HardBibleQuizForAdults />} />
              <Route path="/bible-trivia-for-kids-under-10" element={<BibleTriviaForKids />} />
              <Route path="/book-of-john-quiz-questions" element={<BookOfJohnQuizQuestions />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/songs/:slug" element={<SongDetail />} />
              <Route path="/english-songs" element={<EnglishSongs />} />
              <Route path="/english-songs/:slug" element={<EnglishSongDetail />} />
              <Route path="/hindi-songs" element={<HindiSongs />} />
              <Route path="/hindi-songs/:slug" element={<HindiSongDetail />} />
              <Route path="/kids-stories" element={<KidsStories />} />
              <Route path="/kids-stories/:slug" element={<StoryDetail />} />
              <Route path="/kids-stories/:slug/quiz" element={<KidsStoryQuiz />} />
              <Route path="/live-quiz/host/:quizId" element={<LiveQuizHost />} />
              <Route path="/live-quiz/join/:sessionCode" element={<LiveQuizParticipant />} />
              <Route path="/live-quiz/health-check" element={<ProtectedRoute requiredRole="admin"><LiveQuizHealthCheck /></ProtectedRoute>} />
              <Route path="/challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
              <Route path="/challenge/:challengeSessionId" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/dashboard/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
              <Route path="/dashboard/recent-attempts" element={<ProtectedRoute><RecentAttempts /></ProtectedRoute>} />
              <Route path="/dashboard/bible-study" element={<ProtectedRoute><BibleStudy /></ProtectedRoute>} />
              <Route path="/quiz-selection" element={<ProtectedRoute><QuizSelection /></ProtectedRoute>} />
              <Route path="/quiz/:quizId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
              <Route path="/weekly-quiz" element={<ProtectedRoute><WeeklyQuiz /></ProtectedRoute>} />
              <Route path="/weekly-quiz/:quizId" element={<ProtectedRoute><WeeklyQuizTaking /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/public-leaderboard" element={<PublicLeaderboard />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/public-quiz/genesis" element={<GenesisPublicQuiz />} />
              <Route path="/public-quiz/exodus" element={<ExodusPublicQuiz />} />
              <Route path="/public-quiz/leviticus" element={<LeviticusPublicQuiz />} />
              <Route path="/public-quiz/numbers" element={<NumbersPublicQuiz />} />
              <Route path="/public-quiz/deuteronomy" element={<DeuteronomyPublicQuiz />} />
              <Route path="/public-quiz/psalms" element={<PsalmsPublicQuiz />} />
              <Route path="/public-quiz/proverbs" element={<ProverbsPublicQuiz />} />
              <Route path="/public-quiz/isaiah" element={<IsaiahPublicQuiz />} />
              <Route path="/public-quiz/daniel" element={<DanielPublicQuiz />} />
              <Route path="/public-quiz/job" element={<JobPublicQuiz />} />
              <Route path="/public-quiz/joshua" element={<JoshuaPublicQuiz />} />
              <Route path="/public-quiz/judges" element={<JudgesPublicQuiz />} />
              <Route path="/public-quiz/ruth" element={<RuthPublicQuiz />} />
              <Route path="/public-quiz/1-samuel" element={<FirstSamuelPublicQuiz />} />
              <Route path="/public-quiz/2-samuel" element={<SecondSamuelPublicQuiz />} />
              <Route path="/public-quiz/1-kings" element={<FirstKingsPublicQuiz />} />
              <Route path="/public-quiz/2-kings" element={<SecondKingsPublicQuiz />} />
              <Route path="/public-quiz/1-chronicles" element={<FirstChroniclesPublicQuiz />} />
              <Route path="/public-quiz/2-chronicles" element={<SecondChroniclesPublicQuiz />} />
              <Route path="/public-quiz/ezra" element={<EzraPublicQuiz />} />
              <Route path="/public-quiz/nehemiah" element={<NehemiahPublicQuiz />} />
              <Route path="/public-quiz/esther" element={<EstherPublicQuiz />} />
              <Route path="/public-quiz/hosea" element={<HoseaPublicQuiz />} />
              <Route path="/public-quiz/joel" element={<JoelPublicQuiz />} />
              <Route path="/public-quiz/amos" element={<AmosPublicQuiz />} />
              <Route path="/public-quiz/obadiah" element={<ObadiahPublicQuiz />} />
              <Route path="/public-quiz/jonah" element={<JonahPublicQuiz />} />
              <Route path="/public-quiz/micah" element={<MicahPublicQuiz />} />
              <Route path="/public-quiz/nahum" element={<NahumPublicQuiz />} />
              <Route path="/public-quiz/habakkuk" element={<HabakkukPublicQuiz />} />
              <Route path="/public-quiz/zephaniah" element={<ZephaniahPublicQuiz />} />
              <Route path="/public-quiz/haggai" element={<HaggaiPublicQuiz />} />
              <Route path="/public-quiz/zechariah" element={<ZechariahPublicQuiz />} />
              <Route path="/public-quiz/malachi" element={<MalachiPublicQuiz />} />
              <Route path="/public-quiz/matthew" element={<MatthewPublicQuiz />} />
              <Route path="/public-quiz/mark" element={<MarkPublicQuiz />} />
              <Route path="/public-quiz/luke" element={<LukePublicQuiz />} />
              <Route path="/public-quiz/john" element={<JohnPublicQuiz />} />
              <Route path="/public-quiz/romans" element={<RomansPublicQuiz />} />
              <Route path="/public-quiz/1-corinthians" element={<CorinthiansPublicQuiz />} />
              <Route path="/public-quiz/2-corinthians" element={<Corinthians2PublicQuiz />} />
              <Route path="/public-quiz/galatians" element={<GalatiansPublicQuiz />} />
              <Route path="/public-quiz/ephesians" element={<EphesiansPublicQuiz />} />
              <Route path="/public-quiz/philippians" element={<PhilippiansPublicQuiz />} />
              <Route path="/public-quiz/colossians" element={<ColossiansPublicQuiz />} />
              <Route path="/public-quiz/1-thessalonians" element={<Thessalonians1PublicQuiz />} />
              <Route path="/public-quiz/2-thessalonians" element={<Thessalonians2PublicQuiz />} />
              <Route path="/public-quiz/1-timothy" element={<Timothy1PublicQuiz />} />
              <Route path="/public-quiz/2-timothy" element={<Timothy2PublicQuiz />} />
              <Route path="/public-quiz/titus" element={<TitusPublicQuiz />} />
              <Route path="/public-quiz/philemon" element={<PhilemonPublicQuiz />} />
              <Route path="/public-quiz/hebrews" element={<HebrewsPublicQuiz />} />
              <Route path="/public-quiz/james" element={<JamesPublicQuiz />} />
              <Route path="/public-quiz/1-peter" element={<Peter1PublicQuiz />} />
              <Route path="/public-quiz/2-peter" element={<Peter2PublicQuiz />} />
              <Route path="/public-quiz/1-john" element={<John1PublicQuiz />} />
              <Route path="/public-quiz/2-john" element={<John2PublicQuiz />} />
              <Route path="/public-quiz/3-john" element={<John3PublicQuiz />} />
              <Route path="/public-quiz/jude" element={<JudePublicQuiz />} />
              <Route path="/public-quiz/revelation" element={<RevelationPublicQuiz />} />
              <Route path="/public-quiz/:book/:chapter" element={<PublicQuizChapter />} />
              <Route path="/competitions" element={<ProtectedRoute><Competitions /></ProtectedRoute>} />
              <Route path="/competition-quiz/:competitionId" element={<ProtectedRoute><CompetitionQuiz /></ProtectedRoute>} />
              <Route path="/competition-leaderboard/:competitionId" element={<ProtectedRoute><CompetitionLeaderboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/attempts" element={<ProtectedRoute requiredRole="admin"><AdminAttempts /></ProtectedRoute>} />
              <Route path="/admin/upload" element={<ProtectedRoute requiredRole="admin"><AdminUpload /></ProtectedRoute>} />
              <Route path="/admin/quizzes" element={<ProtectedRoute requiredRole="admin"><AdminQuizzes /></ProtectedRoute>} />
              <Route path="/admin/questions" element={<ProtectedRoute requiredRole="admin"><AdminQuestions /></ProtectedRoute>} />
              <Route path="/admin/activity" element={<ProtectedRoute requiredRole="admin"><AdminActivity /></ProtectedRoute>} />
              <Route path="/admin/prayer-requests" element={<ProtectedRoute requiredRole="admin"><AdminPrayerRequests /></ProtectedRoute>} />
              <Route path="/admin/daily-verses" element={<ProtectedRoute requiredRole="admin"><DailyVerses /></ProtectedRoute>} />
              <Route path="/admin/notifications" element={<ProtectedRoute requiredRole="admin"><Notifications /></ProtectedRoute>} />
              <Route path="/admin/competitions" element={<ProtectedRoute requiredRole="admin"><AdminCompetitions /></ProtectedRoute>} />
              <Route path="/admin/weekly-attendance" element={<ProtectedRoute requiredRole="admin"><WeeklyAttendance /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/users/:id" element={<ProtectedRoute requiredRole="admin"><AdminUserSettings /></ProtectedRoute>} />
              <Route path="/admin/page-views" element={<ProtectedRoute requiredRole="admin"><PageViews /></ProtectedRoute>} />
              <Route path="/rls-test" element={<ProtectedRoute requiredRole="admin"><RLSTest /></ProtectedRoute>} />
              <Route path="/bible-questions-and-answers-hub" element={<BibleQA />} />
              <Route path="/bible-questions-and-answers-hub/genesis" element={<GenesisHub />} />
              <Route path="/bible-questions-and-answers-hub/exodus" element={<ExodusHub />} />
              <Route path="/bible-questions-and-answers-hub/leviticus" element={<LeviticusHub />} />
              <Route path="/bible-questions-and-answers-hub/numbers" element={<NumbersHub />} />
              <Route path="/bible-questions-and-answers-hub/deuteronomy" element={<DeuteronomyHub />} />
              <Route path="/bible-questions-and-answers-hub/joshua" element={<JoshuaHub />} />
              <Route path="/bible-questions-and-answers-hub/nehemiah" element={<NehemiahHub />} />
              <Route path="/bible-questions-and-answers-hub/:bookSlug" element={<BookDetailHub />} />
              <Route path="/bible-questions-and-answers-hub/genesis/beginner" element={<GenesisBeginnerQuiz />} />
              <Route path="/bible-questions-and-answers-hub/genesis/intermediate" element={<GenesisIntermediateQuiz />} />
              <Route path="/bible-questions-and-answers-hub/genesis/advanced" element={<GenesisAdvancedQuiz />} />
              <Route path="/bible-questions-and-answers-hub/:book/chapter-:id" element={<ChapterPage />} />
              <Route path="/bible-questions-and-answers-hub/:bookSlug/:difficulty" element={<HubDifficultyRouter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Analytics />
          <GoogleAnalytics />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
