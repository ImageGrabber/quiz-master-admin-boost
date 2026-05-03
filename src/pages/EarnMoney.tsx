import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, ExternalLink, Timer, ShieldCheck, Zap } from "lucide-react";
import { md5 } from "@/utils/md5";
import { supabase } from "@/integrations/supabase/client";

type Survey = {
  id: string;
  payout: number;
  loi: string;
  href: string;
};

const EarnMoney = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      // 1. Get Logged in User ID
      const { data: { user } } = await supabase.auth.getUser();
      const extUserId = user?.id || localStorage.getItem("arena_player_id") || "guest";

      // 2. Get Client IP
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
      
      // 3. CPX Credentials
      const appId = import.meta.env.VITE_CPX_APP_ID || "32810"; 
      const secureHash = import.meta.env.VITE_CPX_SECURE_HASH || "placeholder";
      
      // 4. Generate Security Hash
      const hash = md5(`${extUserId}-${secureHash}`);
      
      // 5. Fetch Surveys
      const url = `https://live-api.cpx-research.com/api/get-surveys.php?app_id=${appId}&ext_user_id=${extUserId}&output_method=api&ip_user=${ip}&user_agent=${encodeURIComponent(navigator.userAgent)}&limit=12&secure_hash=${hash}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'success') {
        setSurveys(data.surveys || []);
      } else {
        console.warn("CPX API returned status:", data.status, data);
      }
    } catch (err) {
      console.error("Survey fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout 
      title="Earn Rewards" 
      subtitle="Complete quick surveys to earn bonus XP and unlock premium rewards."
    >
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 flex items-center gap-3">
              <Zap className="h-8 w-8 text-amber-400 fill-amber-400" />
              Boost Your Wisdom
            </h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              In collaboration with our premium partners, we bring you high-quality surveys that reward your time with instant platform XP and premium unlocks.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold">Verified Partners</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20">
                <Timer className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold">Instant Payouts</span>
              </div>
            </div>
          </div>
          <Coins className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 h-96 w-96 text-white/5 rotate-12" />
        </div>

        {/* Survey Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-48 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : surveys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {surveys.map((s) => (
              <Card key={s.id} className="border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-[2rem] overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-50 px-3 py-1 rounded-xl flex items-center gap-2 text-slate-500 border border-slate-100">
                      <Timer className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.loi} Mins</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Survey #{s.id.slice(-5)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-end gap-2">
                    <div className="bg-amber-100 p-2 rounded-xl">
                      <Coins className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Reward</p>
                      <p className="text-3xl font-black text-emerald-600 leading-none">+{Math.round(s.payout * 100)} <span className="text-sm">XP</span></p>
                    </div>
                  </div>
                  <a 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-slate-900 text-white text-center font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-blue-600 transition-colors"
                  >
                    Start Inquiry
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="h-20 w-20 bg-slate-200 rounded-full mx-auto flex items-center justify-center">
              <ShieldCheck className="h-10 w-10 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase">No Surveys Available</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">We couldn't find any surveys for your profile right now. Check back in a few minutes!</p>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default EarnMoney;
