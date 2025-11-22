import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemoryMatch as MemoryMatchGame } from "@/components/games/MemoryMatch";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MemoryMatch = () => {
  const navigate = useNavigate();

  // Game configuration - Bible word pairs (2 pairs = 4 unique cards, each duplicated = 8 cards)
  const gamePairs = [
    ['Joy', 'Peace'],
    ['Faith', 'Hope']
  ];

  // Sin pairs - matching these is allowed but no points (2 pairs = 4 unique cards, each duplicated = 8 cards)
  // Total: 4 pairs = 8 unique cards, each duplicated = 16 cards for 4x4 grid
  const sinPairs = [
    ['Pride', 'Envy'],
    ['Wrath', 'Greed']
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
            <MemoryMatchGame
              gamePairs={gamePairs}
              sinPairs={sinPairs}
              onComplete={handleGameComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryMatch;

