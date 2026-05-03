import React, { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityStickyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  // Don't show if user has closed it this session
  useEffect(() => {
    const isClosed = sessionStorage.getItem("community_banner_closed");
    if (isClosed) setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("community_banner_closed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 animate-in slide-in-from-bottom duration-700">
      <div className="max-w-7xl mx-auto bg-[#5865f2] rounded-2xl p-4 shadow-2xl shadow-[#5865f2]/20 relative overflow-hidden group">
        {/* Subtle background flare */}
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <p className="text-white text-sm font-medium leading-tight">
              Join our <span className="font-black">Bible Community</span> and earn rewards while you play. Unlock premium scrolls and exclusive trial chapters.{" "}
              <button 
                onClick={() => navigate("/dashboard/earn")}
                className="font-black underline decoration-2 underline-offset-4 hover:text-indigo-200 transition-colors"
              >
                Join here!
              </button>
            </p>
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityStickyBanner;
