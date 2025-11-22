import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlappyBird as FlappyBirdGame } from "@/components/games/FlappyBird";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FlappyBird = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gameData = {
    title: "Noah's Dove",
    description: "Tap to fly! Navigate through obstacles and collect stars in this Bible-themed game.",
    verse: "Then the dove came to him in the evening, and behold, a freshly plucked olive leaf was in her mouth.",
    reference: "Genesis 8:11",
    type: "flappy",
    encouragement: "Amazing flight! You flew like Noah's dove! Keep your faith in the Lord!"
  };

  const goodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light'];
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth'];

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
    </div>
  );
};

export default FlappyBird;

