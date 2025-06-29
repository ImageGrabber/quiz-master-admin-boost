import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/quizzes" element={<MyQuizzes />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/quiz-selection" element={<QuizSelection />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/competition-quiz/:competitionId" element={<CompetitionQuiz />} />
          <Route path="/competition-leaderboard/:competitionId" element={<CompetitionLeaderboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/attempts" element={<AdminAttempts />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/quizzes" element={<AdminQuizzes />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/activity" element={<AdminActivity />} />
          <Route path="/admin/competitions" element={<AdminCompetitions />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id" element={<AdminUserSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
