import { useState } from "react";
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

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/bible-games')}
            className="font-urbanist font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        {/* Game Component */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <WordSearchGame
              words={bibleWords}
              gridSize={12}
              onComplete={handleGameComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;

