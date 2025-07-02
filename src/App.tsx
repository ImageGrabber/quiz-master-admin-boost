import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import MyQuizzes from "./pages/MyQuizzes";
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
import PublicLeaderboard from "./pages/PublicLeaderboard";
import GenesisQuiz from "./pages/bible-questions-and-answers-hub/Genesis";
import ExodusQuiz from "./pages/bible-questions-and-answers-hub/Exodus";
import LeviticusQuiz from "./pages/bible-questions-and-answers-hub/Leviticus";
import NumbersQuiz from "./pages/bible-questions-and-answers-hub/Numbers";
import DeuteronomyQuiz from "./pages/bible-questions-and-answers-hub/Deuteronomy";
import JoshuaQuiz from "./pages/bible-questions-and-answers-hub/Joshua";
import JudgesQuiz from "./pages/bible-questions-and-answers-hub/Judges";
import RuthQuiz from "./pages/bible-questions-and-answers-hub/Ruth";
import FirstSamuelQuiz from "./pages/bible-questions-and-answers-hub/1-samuel";
import SecondSamuelQuiz from "./pages/bible-questions-and-answers-hub/2-samuel";
import FirstKingsQuiz from "./pages/bible-questions-and-answers-hub/1-kings";
import SecondKingsQuiz from "./pages/bible-questions-and-answers-hub/2-kings";
import FirstChroniclesQuiz from "./pages/bible-questions-and-answers-hub/1-chronicles";
import SecondChroniclesQuiz from "./pages/bible-questions-and-answers-hub/2-chronicles";
import EzraQuiz from "./pages/bible-questions-and-answers-hub/ezra";
import NehemiahQuiz from "./pages/bible-questions-and-answers-hub/nehemiah";
import EstherQuiz from "./pages/bible-questions-and-answers-hub/esther";
import JobQuiz from "./pages/bible-questions-and-answers-hub/job";
import PsalmsQuiz from "./pages/bible-questions-and-answers-hub/psalms";
import ProverbsQuiz from "./pages/bible-questions-and-answers-hub/proverbs";
import EcclesiastesQuiz from "./pages/bible-questions-and-answers-hub/ecclesiastes";
import SongOfSolomonQuiz from "./pages/bible-questions-and-answers-hub/song-of-solomon";
import IsaiahQuiz from "./pages/bible-questions-and-answers-hub/isaiah";
import JeremiahQuiz from "./pages/bible-questions-and-answers-hub/jeremiah";
import LamentationsQuiz from "./pages/bible-questions-and-answers-hub/lamentations";
import EzekielQuiz from "./pages/bible-questions-and-answers-hub/ezekiel";
import DanielQuiz from "./pages/bible-questions-and-answers-hub/daniel";
import HoseaQuiz from "./pages/bible-questions-and-answers-hub/hosea";
import JoelQuiz from "./pages/bible-questions-and-answers-hub/joel";
import AmosQuiz from "./pages/bible-questions-and-answers-hub/amos";
import ObadiahQuiz from "./pages/bible-questions-and-answers-hub/obadiah";
import JonahQuiz from "./pages/bible-questions-and-answers-hub/jonah";
import MicahQuiz from "./pages/bible-questions-and-answers-hub/micah";
import NahumQuiz from "./pages/bible-questions-and-answers-hub/nahum";
import HabakkukQuiz from "./pages/bible-questions-and-answers-hub/habakkuk";
import ZephaniahQuiz from "./pages/bible-questions-and-answers-hub/zephaniah";
import HaggaiQuiz from "./pages/bible-questions-and-answers-hub/haggai";
import ZechariahQuiz from "./pages/bible-questions-and-answers-hub/zechariah";
import MalachiQuiz from "./pages/bible-questions-and-answers-hub/malachi";
import MatthewQuiz from "./pages/bible-questions-and-answers-hub/matthew";
import MarkQuiz from "./pages/bible-questions-and-answers-hub/mark";
import LukeQuiz from "./pages/bible-questions-and-answers-hub/luke";
import JohnQuiz from "./pages/bible-questions-and-answers-hub/john";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/quizzes" element={<ProtectedRoute><MyQuizzes /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/quiz-selection" element={<ProtectedRoute><QuizSelection /></ProtectedRoute>} />
          <Route path="/quiz/:quizId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/public-leaderboard" element={<PublicLeaderboard />} />
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
          <Route path="/rls-test" element={<ProtectedRoute requiredRole="admin"><RLSTest /></ProtectedRoute>} />
          <Route path="/bible-questions-and-answers-hub/genesis" element={<GenesisQuiz />} />
          <Route path="/bible-questions-and-answers-hub/exodus" element={<ExodusQuiz />} />
          <Route path="/bible-questions-and-answers-hub/leviticus" element={<LeviticusQuiz />} />
          <Route path="/bible-questions-and-answers-hub/numbers" element={<NumbersQuiz />} />
          <Route path="/bible-questions-and-answers-hub/deuteronomy" element={<DeuteronomyQuiz />} />
          <Route path="/bible-questions-and-answers-hub/joshua" element={<JoshuaQuiz />} />
          <Route path="/bible-questions-and-answers-hub/judges" element={<JudgesQuiz />} />
          <Route path="/bible-questions-and-answers-hub/ruth" element={<RuthQuiz />} />
          <Route path="/bible-questions-and-answers-hub/1-samuel" element={<FirstSamuelQuiz />} />
          <Route path="/bible-questions-and-answers-hub/2-samuel" element={<SecondSamuelQuiz />} />
          <Route path="/bible-questions-and-answers-hub/1-kings" element={<FirstKingsQuiz />} />
          <Route path="/bible-questions-and-answers-hub/2-kings" element={<SecondKingsQuiz />} />
          <Route path="/bible-questions-and-answers-hub/1-chronicles" element={<FirstChroniclesQuiz />} />
          <Route path="/bible-questions-and-answers-hub/2-chronicles" element={<SecondChroniclesQuiz />} />
          <Route path="/bible-questions-and-answers-hub/ezra" element={<EzraQuiz />} />
          <Route path="/bible-questions-and-answers-hub/nehemiah" element={<NehemiahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/esther" element={<EstherQuiz />} />
          <Route path="/bible-questions-and-answers-hub/job" element={<JobQuiz />} />
          <Route path="/bible-questions-and-answers-hub/psalms" element={<PsalmsQuiz />} />
          <Route path="/bible-questions-and-answers-hub/proverbs" element={<ProverbsQuiz />} />
          <Route path="/bible-questions-and-answers-hub/ecclesiastes" element={<EcclesiastesQuiz />} />
          <Route path="/bible-questions-and-answers-hub/song-of-solomon" element={<SongOfSolomonQuiz />} />
          <Route path="/bible-questions-and-answers-hub/isaiah" element={<IsaiahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/jeremiah" element={<JeremiahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/lamentations" element={<LamentationsQuiz />} />
          <Route path="/bible-questions-and-answers-hub/ezekiel" element={<EzekielQuiz />} />
          <Route path="/bible-questions-and-answers-hub/daniel" element={<DanielQuiz />} />
          <Route path="/bible-questions-and-answers-hub/hosea" element={<HoseaQuiz />} />
          <Route path="/bible-questions-and-answers-hub/joel" element={<JoelQuiz />} />
          <Route path="/bible-questions-and-answers-hub/amos" element={<AmosQuiz />} />
          <Route path="/bible-questions-and-answers-hub/obadiah" element={<ObadiahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/jonah" element={<JonahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/micah" element={<MicahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/nahum" element={<NahumQuiz />} />
          <Route path="/bible-questions-and-answers-hub/habakkuk" element={<HabakkukQuiz />} />
          <Route path="/bible-questions-and-answers-hub/zephaniah" element={<ZephaniahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/haggai" element={<HaggaiQuiz />} />
          <Route path="/bible-questions-and-answers-hub/zechariah" element={<ZechariahQuiz />} />
          <Route path="/bible-questions-and-answers-hub/malachi" element={<MalachiQuiz />} />
          <Route path="/bible-questions-and-answers-hub/matthew" element={<MatthewQuiz />} />
          <Route path="/bible-questions-and-answers-hub/mark" element={<MarkQuiz />} />
          <Route path="/bible-questions-and-answers-hub/luke" element={<LukeQuiz />} />
          <Route path="/bible-questions-and-answers-hub/john" element={<JohnQuiz />} />
          <Route path="/bible-questions-and-answers-hub" element={<BibleQA />} />
          <Route path="/bible-questions-and-answers-hub/:slug*" element={<BibleQA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
