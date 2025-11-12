import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { FlappyBird as FlappyBirdGame } from "@/components/games/FlappyBird";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FlappyBird = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameData = {
    title: "Flappy Bird",
    description: "Tap to fly! Navigate through obstacles and collect stars in this Bible-themed Flappy Bird game.",
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    reference: "Isaiah 40:31",
    type: "flappy",
    encouragement: "Amazing flight! You soared like an eagle! Keep your hope in the Lord!"
  };

  const goodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light'];
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth'];

  return (
    <DashboardLayout>
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
            <FlappyBirdGame
              game={gameData}
              score={score}
              setScore={setScore}
              gameCompleted={gameCompleted}
              setGameCompleted={setGameCompleted}
              gameOver={gameOver}
              setGameOver={setGameOver}
              canRetry={true}
              goodWords={goodWords}
              sins={sins}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FlappyBird;

