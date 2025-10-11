import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DefaultSEO from "@/components/DefaultSEO";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChatWidget from "@/components/ChatWidget";
import { Analytics } from "@vercel/analytics/next"
import Index from "./pages/Index";
import TodaysQuiz from "./pages/TodaysQuiz";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz";
import CreateGuestQuiz from "./pages/guest/CreateGuestQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizResults from "./pages/QuizResults";
import Help from "./pages/Help";
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
import NotFound from "./pages/NotFound";
import RLSTest from "./pages/RLSTest";
import BibleQA from "./pages/BibleQA";
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
// Removed static imports of Bible book quiz files for code-splitting
import Upgrade from "./pages/Upgrade";
import PageViews from "./pages/admin/PageViews";
import { usePageView } from "@/hooks/usePageView";
import RecentAttempts from "./pages/dashboard/recent-attempts";
import GenesisHub from "./pages/bible-questions-and-answers-hub/Genesis";
import GenesisAdvanced from "./pages/bible-questions-and-answers-hub/genesis/advanced";
import GenesisBeginner from "./pages/bible-questions-and-answers-hub/genesis/beginner";
import GenesisIntermediate from "./pages/bible-questions-and-answers-hub/genesis/intermediate";
import GenesisCh1to11 from "./pages/bible-questions-and-answers-hub/genesis/chapters-1-11";
import GenesisCh12to25 from "./pages/bible-questions-and-answers-hub/genesis/chapters-12-25";
import GenesisCh26to36 from "./pages/bible-questions-and-answers-hub/genesis/chapters-26-36";
import GenesisCh37to50 from "./pages/bible-questions-and-answers-hub/genesis/chapters-37-50";
import GenesisTrueFalse from "./pages/bible-questions-and-answers-hub/genesis/true-false";
import GenesisCharacters from "./pages/bible-questions-and-answers-hub/genesis/characters";
import GenesisFillInTheBlanks from "./pages/bible-questions-and-answers-hub/genesis/fill-in-the-blanks";
import GenesisMatchFollowing from "./pages/bible-questions-and-answers-hub/genesis/match-the-following";
import GenesisRange1to11Beginner from "./pages/bible-questions-and-answers-hub/genesis/range-1-11-beginner";
import GenesisRange1to11Intermediate from "./pages/bible-questions-and-answers-hub/genesis/range-1-11-intermediate";
import GenesisRange1to11Advanced from "./pages/bible-questions-and-answers-hub/genesis/range-1-11-advanced";
import GenesisRange12to25Beginner from "./pages/bible-questions-and-answers-hub/genesis/range-12-25-beginner";
import GenesisRange12to25Intermediate from "./pages/bible-questions-and-answers-hub/genesis/range-12-25-intermediate";
import GenesisRange12to25Advanced from "./pages/bible-questions-and-answers-hub/genesis/range-12-25-advanced";
import GenesisRange26to36Beginner from "./pages/bible-questions-and-answers-hub/genesis/range-26-36-beginner";
import GenesisRange26to36Intermediate from "./pages/bible-questions-and-answers-hub/genesis/range-26-36-intermediate";
import GenesisRange26to36Advanced from "./pages/bible-questions-and-answers-hub/genesis/range-26-36-advanced";
import GenesisRange37to50Beginner from "./pages/bible-questions-and-answers-hub/genesis/range-37-50-beginner";
import GenesisRange37to50Intermediate from "./pages/bible-questions-and-answers-hub/genesis/range-37-50-intermediate";
import GenesisRange37to50Advanced from "./pages/bible-questions-and-answers-hub/genesis/range-37-50-advanced";
import GenesisCh1Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch1-beginner";
import GenesisCh1Intermediate from "./pages/bible-questions-and-answers-hub/genesis/ch1-intermediate";
import GenesisCh1Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch1-advanced";
import GenesisCh2Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch2-beginner";
import GenesisCh2Intermediate from "./pages/bible-questions-and-answers-hub/genesis/ch2-intermediate";
import GenesisCh2Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch2-advanced";
import GenesisCh3Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch3-beginner";
import GenesisCh3Intermediate from "./pages/bible-questions-and-answers-hub/genesis/ch3-intermediate";
import GenesisCh3Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch3-advanced";
import GenesisCh4Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch4-beginner";
import GenesisCh4Intermediate from "./pages/bible-questions-and-answers-hub/genesis/ch4-intermediate";
import GenesisCh4Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch4-advanced";
import GenesisCh5Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch5-beginner";
import GenesisCh5Intermediate from "./pages/bible-questions-and-answers-hub/genesis/ch5-intermediate";
import GenesisCh5Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch5-advanced";
import GenesisCh9Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch9-beginner";
import GenesisCh9Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch9-advanced";
import GenesisCh10Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch10-beginner";
import GenesisCh10Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch10-advanced";
import GenesisCh11Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch11-beginner";
import GenesisCh11Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch11-advanced";
import GenesisCh12Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch12-beginner";
import GenesisCh12Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch12-advanced";
import GenesisCh13Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch13-beginner";
import GenesisCh13Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch13-advanced";
import GenesisCh14Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch14-beginner";
import GenesisCh14Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch14-advanced";
import GenesisCh15Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch15-beginner";
import GenesisCh15Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch15-advanced";
import GenesisCh16Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch16-beginner";
import GenesisCh16Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch16-advanced";
import GenesisCh17Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch17-beginner";
import GenesisCh17Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch17-advanced";
import GenesisCh18Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch18-beginner";
import GenesisCh18Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch18-advanced";
import GenesisCh19Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch19-beginner";
import GenesisCh19Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch19-advanced";
import GenesisCh20Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch20-beginner";
import GenesisCh20Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch20-advanced";
import GenesisChapter1 from "./pages/bible-questions-and-answers-hub/genesis/chapter-1";
import GenesisChapter2 from "./pages/bible-questions-and-answers-hub/genesis/chapter-2";
import GenesisChapter3 from "./pages/bible-questions-and-answers-hub/genesis/chapter-3";
import GenesisChapter4 from "./pages/bible-questions-and-answers-hub/genesis/chapter-4";
import GenesisChapter5 from "./pages/bible-questions-and-answers-hub/genesis/chapter-5";
import GenesisChapter6 from "./pages/bible-questions-and-answers-hub/genesis/chapter-6";
import GenesisChapter7 from "./pages/bible-questions-and-answers-hub/genesis/chapter-7";
import GenesisChapter8 from "./pages/bible-questions-and-answers-hub/genesis/chapter-8";
import GenesisChapter1Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-1-full";
import GenesisChapter2Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-2-full";
import GenesisChapter3Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-3-full";
import GenesisChapter4Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-4-full";
import GenesisChapter5Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-5-full";
import GenesisChapter6Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-6-full";
import GenesisChapter7Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-7-full";
import GenesisChapter8Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-8-full";
import GenesisChapter9Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-9-full";
import GenesisChapter10Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-10-full";
import GenesisChapter11Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-11-full";
import GenesisChapter12Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-12-full";
import GenesisChapter13Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-13-full";
import GenesisChapter14Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-14-full";
import GenesisChapter15Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-15-full";
import GenesisChapter16Full from "./pages/bible-questions-and-answers-hub/genesis/chapter-16-full";
import GenesisChapter9 from "./pages/bible-questions-and-answers-hub/genesis/chapter-9";
import GenesisChapter10 from "./pages/bible-questions-and-answers-hub/genesis/chapter-10";
import GenesisChapter11 from "./pages/bible-questions-and-answers-hub/genesis/chapter-11";
import GenesisChapter12 from "./pages/bible-questions-and-answers-hub/genesis/chapter-12";
import GenesisChapter13 from "./pages/bible-questions-and-answers-hub/genesis/chapter-13";
import GenesisChapter14 from "./pages/bible-questions-and-answers-hub/genesis/chapter-14";
import GenesisChapter15 from "./pages/bible-questions-and-answers-hub/genesis/chapter-15";
import GenesisChapter16 from "./pages/bible-questions-and-answers-hub/genesis/chapter-16";
import GenesisChapter17 from "./pages/bible-questions-and-answers-hub/genesis/chapter-17";
import GenesisChapter18 from "./pages/bible-questions-and-answers-hub/genesis/chapter-18";
import GenesisChapter19 from "./pages/bible-questions-and-answers-hub/genesis/chapter-19";
import GenesisChapter20 from "./pages/bible-questions-and-answers-hub/genesis/chapter-20";
import GenesisCh6Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch6-beginner";
import GenesisCh6Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch6-advanced";
import GenesisCh7Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch7-beginner";
import GenesisCh7Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch7-advanced";
import GenesisCh8Beginner from "./pages/bible-questions-and-answers-hub/genesis/ch8-beginner";
import GenesisCh8Advanced from "./pages/bible-questions-and-answers-hub/genesis/ch8-advanced";

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
          <DefaultSEO />
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <PageViewTracker />
          <ChatWidget />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/todays-quiz" element={<TodaysQuiz />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/quizzes" element={<ProtectedRoute><MyQuizzes /></ProtectedRoute>} />
            <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
            <Route path="/create-quiz/guest" element={<CreateGuestQuiz />} />
            <Route path="/edit-quiz/:quizId" element={<ProtectedRoute><EditQuiz /></ProtectedRoute>} />
            <Route path="/quiz-results/:quizId" element={<ProtectedRoute><QuizResults /></ProtectedRoute>} />
            <Route path="/help" element={<Help />} />
            <Route path="/live-quiz" element={<ProtectedRoute><LiveQuizIntro /></ProtectedRoute>} />
            {/* SEO-friendly slug for hosting guide */}
            <Route path="/host-live-bible-quizzes-with-confidence" element={<HostingGuide />} />
            {/* Backward-compatible old path */}
            <Route path="/hosting-guide" element={<HostingGuide />} />
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
            <Route path="/competitions" element={<ProtectedRoute><Competitions /></ProtectedRoute>} />
            <Route path="/competition-quiz/:competitionId" element={<ProtectedRoute><CompetitionQuiz /></ProtectedRoute>} />
            <Route path="/competition-leaderboard/:competitionId" element={<ProtectedRoute><CompetitionLeaderboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/attempts" element={<ProtectedRoute requiredRole="admin"><AdminAttempts /></ProtectedRoute>} />
            <Route path="/admin/upload" element={<ProtectedRoute requiredRole="admin"><AdminUpload /></ProtectedRoute>} />
            <Route path="/admin/quizzes" element={<ProtectedRoute requiredRole="admin"><AdminQuizzes /></ProtectedRoute>} />
            <Route path="/admin/questions" element={<ProtectedRoute requiredRole="admin"><AdminQuestions /></ProtectedRoute>} />
            <Route path="/admin/activity" element={<ProtectedRoute requiredRole="admin"><AdminActivity /></ProtectedRoute>} />
            <Route path="/admin/competitions" element={<ProtectedRoute requiredRole="admin"><AdminCompetitions /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/users/:id" element={<ProtectedRoute requiredRole="admin"><AdminUserSettings /></ProtectedRoute>} />
            <Route path="/admin/page-views" element={<ProtectedRoute requiredRole="admin"><PageViews /></ProtectedRoute>} />
            <Route path="/rls-test" element={<ProtectedRoute requiredRole="admin"><RLSTest /></ProtectedRoute>} />
            <Route path="/bible-questions-and-answers-hub" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/genesis" element={<GenesisHub />} />
            {/* Genesis variants */}
            <Route path="/bible-questions-and-answers-hub/genesis/advanced" element={<GenesisAdvanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/beginner" element={<GenesisBeginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/intermediate" element={<GenesisIntermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapters-1-11" element={<GenesisCh1to11 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapters-12-25" element={<GenesisCh12to25 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapters-26-36" element={<GenesisCh26to36 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapters-37-50" element={<GenesisCh37to50 />} />
            {/* Genesis ranges with difficulty */}
            <Route path="/bible-questions-and-answers-hub/genesis/1-11/beginner" element={<GenesisRange1to11Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/1-11/intermediate" element={<GenesisRange1to11Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/1-11/advanced" element={<GenesisRange1to11Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/12-25/beginner" element={<GenesisRange12to25Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/12-25/intermediate" element={<GenesisRange12to25Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/12-25/advanced" element={<GenesisRange12to25Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/26-36/beginner" element={<GenesisRange26to36Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/26-36/intermediate" element={<GenesisRange26to36Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/26-36/advanced" element={<GenesisRange26to36Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/37-50/beginner" element={<GenesisRange37to50Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/37-50/intermediate" element={<GenesisRange37to50Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/37-50/advanced" element={<GenesisRange37to50Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/true-false" element={<GenesisTrueFalse />} />
            <Route path="/bible-questions-and-answers-hub/genesis/characters" element={<GenesisCharacters />} />
            <Route path="/bible-questions-and-answers-hub/genesis/fill-in-the-blanks" element={<GenesisFillInTheBlanks />} />
            <Route path="/bible-questions-and-answers-hub/genesis/match-the-following" element={<GenesisMatchFollowing />} />
            {/* Genesis per-chapter 1–5 */}
            <Route path="/bible-questions-and-answers-hub/genesis/ch1-beginner" element={<GenesisCh1Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch1-intermediate" element={<GenesisCh1Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch1-advanced" element={<GenesisCh1Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch2-beginner" element={<GenesisCh2Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch2-intermediate" element={<GenesisCh2Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch2-advanced" element={<GenesisCh2Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch3-beginner" element={<GenesisCh3Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch3-intermediate" element={<GenesisCh3Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch3-advanced" element={<GenesisCh3Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch4-beginner" element={<GenesisCh4Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch4-intermediate" element={<GenesisCh4Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch4-advanced" element={<GenesisCh4Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch5-beginner" element={<GenesisCh5Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch5-intermediate" element={<GenesisCh5Intermediate />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch5-advanced" element={<GenesisCh5Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch6-beginner" element={<GenesisCh6Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch6-advanced" element={<GenesisCh6Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch7-beginner" element={<GenesisCh7Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch7-advanced" element={<GenesisCh7Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch8-beginner" element={<GenesisCh8Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch8-advanced" element={<GenesisCh8Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch9-beginner" element={<GenesisCh9Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch9-advanced" element={<GenesisCh9Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch10-beginner" element={<GenesisCh10Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch10-advanced" element={<GenesisCh10Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch11-beginner" element={<GenesisCh11Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch11-advanced" element={<GenesisCh11Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch12-beginner" element={<GenesisCh12Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch12-advanced" element={<GenesisCh12Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch13-beginner" element={<GenesisCh13Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch13-advanced" element={<GenesisCh13Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch14-beginner" element={<GenesisCh14Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch14-advanced" element={<GenesisCh14Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch15-beginner" element={<GenesisCh15Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch15-advanced" element={<GenesisCh15Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch16-beginner" element={<GenesisCh16Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch16-advanced" element={<GenesisCh16Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch17-beginner" element={<GenesisCh17Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch17-advanced" element={<GenesisCh17Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch18-beginner" element={<GenesisCh18Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch18-advanced" element={<GenesisCh18Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch19-beginner" element={<GenesisCh19Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch19-advanced" element={<GenesisCh19Advanced />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch20-beginner" element={<GenesisCh20Beginner />} />
            <Route path="/bible-questions-and-answers-hub/genesis/ch20-advanced" element={<GenesisCh20Advanced />} />
            {/* Genesis Chapter Detail Pages */}
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-1" element={<GenesisChapter1 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-2" element={<GenesisChapter2 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-3" element={<GenesisChapter3 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-4" element={<GenesisChapter4 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-5" element={<GenesisChapter5 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-6" element={<GenesisChapter6 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-7" element={<GenesisChapter7 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-8" element={<GenesisChapter8 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-1-full" element={<GenesisChapter1Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-2-full" element={<GenesisChapter2Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-3-full" element={<GenesisChapter3Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-4-full" element={<GenesisChapter4Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-5-full" element={<GenesisChapter5Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-6-full" element={<GenesisChapter6Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-7-full" element={<GenesisChapter7Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-8-full" element={<GenesisChapter8Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-9-full" element={<GenesisChapter9Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-10-full" element={<GenesisChapter10Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-11-full" element={<GenesisChapter11Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-12-full" element={<GenesisChapter12Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-13-full" element={<GenesisChapter13Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-14-full" element={<GenesisChapter14Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-15-full" element={<GenesisChapter15Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-16-full" element={<GenesisChapter16Full />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-9" element={<GenesisChapter9 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-10" element={<GenesisChapter10 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-11" element={<GenesisChapter11 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-12" element={<GenesisChapter12 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-13" element={<GenesisChapter13 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-14" element={<GenesisChapter14 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-15" element={<GenesisChapter15 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-16" element={<GenesisChapter16 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-17" element={<GenesisChapter17 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-18" element={<GenesisChapter18 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-19" element={<GenesisChapter19 />} />
            <Route path="/bible-questions-and-answers-hub/genesis/chapter-20" element={<GenesisChapter20 />} />
            <Route path="/bible-questions-and-answers-hub/exodus" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/leviticus" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/numbers" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/deuteronomy" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/joshua" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/judges" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/ruth" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-samuel" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-samuel" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-kings" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-kings" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-chronicles" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-chronicles" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/ezra" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/nehemiah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/esther" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/job" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/psalms" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/proverbs" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/ecclesiastes" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/song-of-solomon" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/isaiah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/jeremiah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/lamentations" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/ezekiel" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/daniel" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/hosea" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/joel" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/amos" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/obadiah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/jonah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/micah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/nahum" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/habakkuk" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/zephaniah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/haggai" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/zechariah" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/malachi" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/matthew" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/mark" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/luke" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/john" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/acts" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/pauline-epistles" element={<PaulineEpistles />} />
            <Route path="/bible-questions-and-answers-hub/romans" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-corinthians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-corinthians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/galatians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/ephesians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/philippians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/colossians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-thessalonians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-thessalonians" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-timothy" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-timothy" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/titus" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/philemon" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/hebrews" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/james" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-peter" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-peter" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/1-john" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/2-john" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/3-john" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/jude" element={<BibleQA />} />
            <Route path="/bible-questions-and-answers-hub/revelation" element={<BibleQA />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
