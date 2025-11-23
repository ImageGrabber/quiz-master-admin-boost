import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WordSearchGame } from "@/components/games/WordSearchGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const WordSearch = () => {
  const navigate = useNavigate();

  // Bible words for the word search
  const bibleWords = [
    "FAITH",
    "HOPE",
    "LOVE",
    "GRACE",
    "MERCY",
    "PEACE",
    "JOY",
    "TRUTH",
    "LIGHT",
    "PRAYER"
  ];

  const [gameCompleted, setGameCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
          {/* Loader */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-purple-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">Loading Bible Word Search...</h2>
          <p className="text-purple-200 text-lg font-urbanist drop-shadow">Get ready to find the hidden words!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/bible-games')}
            className="font-urbanist font-light text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        {/* Game Component */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl backdrop-blur-xl p-6">
          <WordSearchGame
            words={bibleWords}
            gridSize={12}
            onComplete={handleGameComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default WordSearch;

