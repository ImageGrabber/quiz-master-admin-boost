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
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">Loading Joy Runner...</h2>
          <p className="text-purple-200 text-lg font-urbanist drop-shadow">Get ready to play and catch the bubbles!</p>
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

        {/* Game Component - with unlimited retries */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl backdrop-blur-xl p-6">
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

