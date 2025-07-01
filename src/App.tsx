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
          <Route path="/bible-questions-and-answers-hub" element={<BibleQA />} />
          <Route path="/bible-questions-and-answers-hub/:slug*" element={<BibleQA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
