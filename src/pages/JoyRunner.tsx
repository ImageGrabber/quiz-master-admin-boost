import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JoyRunnerGame } from "@/components/games/JoyRunnerGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JoyRunner = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Retry count helpers
  const getRetryCount = () => {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(`joyRunnerRetryCount_${today}`);
    return stored ? parseInt(stored, 10) : 0;
  };

  const incrementRetryCount = () => {
    const today = new Date().toISOString().split('T')[0];
    const current = getRetryCount();
    const newCount = current + 1;
    localStorage.setItem(`joyRunnerRetryCount_${today}`, newCount.toString());
    setRetryCount(newCount);
    return newCount;
  };

  const resetRetryCount = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.removeItem(`joyRunnerRetryCount_${today}`);
    setRetryCount(0);
  };

  useEffect(() => {
    setRetryCount(getRetryCount());

    // Show loader for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const gameData = {
    title: "Joy Runner",
    description: "Catch good bubbles and avoid sins! Test your reflexes while learning biblical virtues.",
    verse: "May the God of hope fill you with all joy and peace as you trust in him.",
    reference: "Romans 15:13",
    type: "runner",
    targetBubbles: 10,
    encouragement: "Amazing! Your peace is a gift from God. Share it with others!"
  };

  const goodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light'];
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
          {/* Loader */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Game Component - with unlimited retries */}
        <div className="bg-white rounded-lg shadow-sm">
          <JoyRunnerGame
            game={gameData}
            score={score}
            setScore={setScore}
            gameCompleted={gameCompleted}
            setGameCompleted={setGameCompleted}
            gameOver={gameOver}
            setGameOver={setGameOver}
            retryCount={retryCount}
            setRetryCount={setRetryCount}
            getRetryCount={getRetryCount}
            incrementRetryCount={incrementRetryCount}
            resetRetryCount={resetRetryCount}
            canRetry={true}
            goodWords={goodWords}
            sins={sins}
          />
        </div>
      </div>
    </div>
  );
};

export default JoyRunner;

