import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "@/components/ProtectedRoute";
import ChatWidget from "@/components/ChatWidget";
import { Analytics } from "@vercel/analytics/next"
import Index from "./pages/Index";
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
import LiveQuizParticipant from "./pages/LiveQuizParticipant";
import LiveQuizHealthCheck from "./pages/LiveQuizHealthCheck";
import Settings from "./pages/Settings";
import QuizSelection from "./pages/QuizSelection";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
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
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <PageViewTracker />
          <ChatWidget />
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/live-quiz/host/:quizId" element={<LiveQuizHost />} />
            <Route path="/live-quiz/join/:sessionCode" element={<LiveQuizParticipant />} />
            <Route path="/live-quiz/health-check" element={<ProtectedRoute requiredRole="admin"><LiveQuizHealthCheck /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
            <Route path="/dashboard/recent-attempts" element={<ProtectedRoute><RecentAttempts /></ProtectedRoute>} />
            <Route path="/dashboard/bible-study" element={<ProtectedRoute><BibleStudy /></ProtectedRoute>} />
            <Route path="/quiz-selection" element={<ProtectedRoute><QuizSelection /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
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
            <Route path="/bible-questions-and-answers-hub/genesis" element={<BibleQA />} />
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
