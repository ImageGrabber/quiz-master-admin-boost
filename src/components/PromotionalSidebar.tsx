import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, ShoppingBag, ExternalLink, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PromotionalSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 w-full lg:w-80 shrink-0">
      
      {/* 1. Earn Wisdom (CPX Quick Box) */}
      <Card className="border-amber-100 bg-gradient-to-br from-white to-amber-50/30 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Coins className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quick Rewards</span>
          </div>
          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Earn Bonus XP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Complete quick surveys and inquiries to unlock premium Bible quiz levels instantly.
          </p>
          <button 
            onClick={() => window.open("/dashboard/earn", "_blank")}
            className="w-full py-3 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            Start Earning <ExternalLink className="h-3 w-3" />
          </button>
        </CardContent>
      </Card>

      {/* 2. Christian Marketplace (Affiliate Box) */}
      <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Faith Resources</span>
          </div>
          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Christian Store</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white border border-blue-50 rounded-2xl shadow-inner group-hover:border-blue-200 transition-all">
            <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Bibles & Study</p>
              <p className="text-xs font-bold text-slate-700">Best Study Bibles</p>
            </div>
            <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-blue-600" />
          </div>
          
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Find the perfect Bible, devotional, or Christian course curated for your growth.
          </p>
          
          <button 
            onClick={() => window.open("https://www.amazon.com/s?k=bible+study+guides", "_blank")}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10"
          >
            Shop Amazon <ArrowRight className="inline ml-1 h-3 w-3" />
          </button>
        </CardContent>
      </Card>

      {/* 3. AdSense Placeholder (Fixed Height) */}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 text-center space-y-3">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Sponsored</p>
        <div className="h-48 flex items-center justify-center text-slate-400 text-xs font-medium italic px-4 leading-relaxed">
          [Google AdSense Area]
          High Converting Christian Product Ads
        </div>
      </div>

    </div>
  );
};

// Helper for Arrow icon
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default PromotionalSidebar;
