import React from "react";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="py-14 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-slate-900" />
          <span className="font-bold text-slate-900 tracking-tight">Bible Quiz Competition</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <button onClick={() => navigate("/privacy")} className="hover:text-slate-900 transition-colors">Privacy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-slate-900 transition-colors">Terms</button>
            <button onClick={() => navigate("/help")} className="hover:text-slate-900 transition-colors">Support</button>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-200"></div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
            <button onClick={() => navigate("/bible-quiz-questions-and-answers")} className="hover:text-blue-600 transition-colors">Questions & Answers</button>
            <button onClick={() => navigate("/rules-and-prizes")} className="hover:text-blue-600 transition-colors">Rules & Prizes</button>
            <button onClick={() => navigate("/hardest-bible-trivia-questions")} className="hover:text-blue-600 transition-colors">Hardest Trivia</button>
            <button onClick={() => navigate("/bible-quiz-with-answers-for-youth")} className="hover:text-blue-600 transition-colors">Youth Quiz</button>
          </div>
        </div>

        <div className="text-sm text-slate-400">
          © 2026 All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
