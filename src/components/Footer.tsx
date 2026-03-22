import React from "react";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-slate-900" />
                    <span className="font-bold text-slate-900 tracking-tight">Bible Quiz Competition</span>
                </div>

                <div className="flex gap-8 text-sm font-medium text-slate-500">
                    <Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
                    <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms</Link>
                    <Link to="/contact" className="hover:text-slate-900 transition-colors">Support</Link>
                </div>

                <div className="text-sm text-slate-400">
                    © 2025-2026 All rights reserved.
                </div>
            </div>
        </footer>
    );
};
