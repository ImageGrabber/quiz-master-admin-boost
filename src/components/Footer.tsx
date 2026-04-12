import React from "react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[linear-gradient(135deg,#05070f_0%,#0b1228_52%,#111827_100%)] text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <button onClick={() => navigate("/")} className="mb-4 inline-flex items-center gap-3 text-left transition-opacity hover:opacity-90">
              <img src="/sword.png" alt="Bible Quiz Competition logo" className="h-10 w-10 rounded-xl bg-white/10 p-1.5" />
              <span className="text-lg sm:text-xl font-semibold tracking-tight text-white">Bible Quiz Competition</span>
            </button>
            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              A faith-first learning platform with chapter quizzes, leaderboard play, family-friendly stories, and practical study tools for every generation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-200">66 Books</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-200">Daily Challenges</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-200">Live Rankings</span>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Competition</p>
            <div className="space-y-3 text-sm">
              <button onClick={() => navigate("/competition-home")} className="block text-slate-200 hover:text-white">Home</button>
              <button onClick={() => navigate("/competitions")} className="block text-slate-200 hover:text-white">Active Competitions</button>
              <button onClick={() => navigate("/public-leaderboard")} className="block text-slate-200 hover:text-white">Leaderboard</button>
              <button onClick={() => navigate("/rules-and-prizes")} className="block text-slate-200 hover:text-white">Rules & Prizes</button>
              <button onClick={() => navigate("/weekly-attendance")} className="block text-slate-200 hover:text-white">Weekly Attendance</button>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Study & Play</p>
            <div className="space-y-3 text-sm">
              <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="block text-slate-200 hover:text-white">Bible Q&A Hub</button>
              <button onClick={() => navigate("/scripture-match-multiplayer")} className="block text-slate-200 hover:text-white">Scripture Match</button>
              <button onClick={() => navigate("/kids-stories")} className="block text-slate-200 hover:text-white">Kids Stories</button>
              <button onClick={() => navigate("/songs")} className="block text-slate-200 hover:text-white">Christian Songs</button>
              <button onClick={() => navigate("/public-quiz/nehemiah")} className="block text-slate-200 hover:text-white">Nehemiah Quiz</button>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Resources</p>
            <div className="space-y-3 text-sm">
              <button onClick={() => navigate("/articles")} className="block text-slate-200 hover:text-white">Articles</button>
              <button onClick={() => navigate("/daily-verse")} className="block text-slate-200 hover:text-white">Daily Verse</button>
              <button onClick={() => navigate("/bible-quiz-questions-and-answers")} className="block text-slate-200 hover:text-white">Bible Q&A Guide</button>
              <button onClick={() => navigate("/hardest-bible-trivia-questions")} className="block text-slate-200 hover:text-white">Hardest Trivia</button>
              <button onClick={() => navigate("/bible-quiz-with-answers-for-youth")} className="block text-slate-200 hover:text-white">Youth Quiz</button>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Support</p>
            <div className="space-y-3 text-sm">
              <button onClick={() => navigate("/auth/login")} className="block text-slate-200 hover:text-white">Login</button>
              <button onClick={() => navigate("/auth/register")} className="block text-slate-200 hover:text-white">Create Account</button>
              <button onClick={() => navigate("/help")} className="block text-slate-200 hover:text-white">Help Center</button>
              <button onClick={() => navigate("/contact")} className="block text-slate-200 hover:text-white">Contact</button>
              <button onClick={() => navigate("/privacy")} className="block text-slate-200 hover:text-white">Privacy Policy</button>
              <button onClick={() => navigate("/terms")} className="block text-slate-200 hover:text-white">Terms of Service</button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">© {currentYear} Bible Quiz Competition. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>Built for churches, families, and learners worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
