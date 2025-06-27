
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAttempts from "./pages/admin/Attempts";
import AdminUpload from "./pages/admin/Upload";
import AdminQuizzes from "./pages/admin/Quizzes";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/attempts" element={<AdminAttempts />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/quizzes" element={<AdminQuizzes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
