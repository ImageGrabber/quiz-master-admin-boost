import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Analytics } from "@vercel/analytics/next"
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
import BibleStudy from "./pages/BibleStudy";
import PublicLeaderboard from "./pages/PublicLeaderboard";
import GenesisPublicQuiz from "./pages/public-quizzes/GenesisPublicQuiz";
import MatthewPublicQuiz from "./pages/public-quizzes/MatthewPublicQuiz";
import PsalmsPublicQuiz from "./pages/public-quizzes/PsalmsPublicQuiz";
import ActsPublicQuiz from "./pages/public-quizzes/ActsPublicQuiz";
import RevelationPublicQuiz from "./pages/public-quizzes/RevelationPublicQuiz";
import ProverbsPublicQuiz from "./pages/public-quizzes/ProverbsPublicQuiz";
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/quizzes" element={<ProtectedRoute><MyQuizzes /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
            <Route path="/dashboard/recent-attempts" element={<ProtectedRoute><RecentAttempts /></ProtectedRoute>} />
            <Route path="/dashboard/bible-study" element={<ProtectedRoute><BibleStudy /></ProtectedRoute>} />
            <Route path="/quiz-selection" element={<ProtectedRoute><QuizSelection /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
            <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/public-leaderboard" element={<PublicLeaderboard />} />
            <Route path="/public-quiz/genesis" element={<GenesisPublicQuiz />} />
            <Route path="/public-quiz/matthew" element={<MatthewPublicQuiz />} />
            <Route path="/public-quiz/psalms" element={<PsalmsPublicQuiz />} />
            <Route path="/public-quiz/acts" element={<ActsPublicQuiz />} />
            <Route path="/public-quiz/revelation" element={<RevelationPublicQuiz />} />
            <Route path="/public-quiz/proverbs" element={<ProverbsPublicQuiz />} />
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
  );
};

export default App;
