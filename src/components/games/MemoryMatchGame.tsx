import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MemoryMatchGameProps {
  game: {
    title: string;
    description: string;
    verse: string;
    reference: string;
    type: string;
    pairs: string[];
    sinPairs: string[];
    encouragement: string;
  };
  score: number;
  setScore: (score: number) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  gameOver: boolean;
  setGameOver: (over: boolean) => void;
  retryCount: number;
  setRetryCount: (count: number) => void;
  getRetryCount: () => number;
  incrementRetryCount: () => number;
  resetRetryCount: () => void;
  canRetry: boolean;
}

export function MemoryMatchGame({
  game,
  score,
  setScore,
  gameCompleted,
  setGameCompleted,
  gameOver,
  setGameOver,
  retryCount,
  setRetryCount,
  getRetryCount,
  incrementRetryCount,
  resetRetryCount,
  canRetry,
}: MemoryMatchGameProps) {
  const navigate = useNavigate();
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);

  // Initialize memory cards when game starts
  useEffect(() => {
    if (game.type === 'memory') {
      const allGoodCards = [...game.pairs, ...game.pairs];
      const allSinCards = [...game.sinPairs, ...game.sinPairs];
      const allCards = [...allGoodCards, ...allSinCards].sort(() => Math.random() - 0.5);
      setMemoryCards(allCards);
      setMemoryFlipped([]);
      setMemoryMatched([]);
      setMemoryMoves(0);
      setScore(0);
      setGameOver(false);
      setGameCompleted(false);
    }
  }, [game.type, game.pairs, game.sinPairs]);

  const handleCardClick = (index: number) => {
    if (gameCompleted || gameOver) return;
    
    const card = memoryCards[index];
    const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
    
    // Can't click already flipped or matched cards
    if (isFlipped) return;
    
    // Can only flip 2 cards at a time
    if (memoryFlipped.length >= 2) return;

    const newFlipped = [...memoryFlipped, index];
    setMemoryFlipped(newFlipped);
    setMemoryMoves(memoryMoves + 1);

    // Check if 2 cards are flipped
    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = memoryCards[firstIndex];
      const secondCard = memoryCards[secondIndex];

      const allSinCards = game.sinPairs;
      const allGoodCards = game.pairs;
      const firstIsSin = allSinCards.includes(firstCard);
      const secondIsSin = allSinCards.includes(secondCard);
      const firstIsGood = allGoodCards.includes(firstCard);
      const secondIsGood = allGoodCards.includes(secondCard);

      // If one is good and one is sin - Game Over!
      if ((firstIsGood && secondIsSin) || (firstIsSin && secondIsGood)) {
        setTimeout(() => setGameOver(true), 500);
        return;
      }

      // Check if both are sin cards and they match (same word)
      if (firstIsSin && secondIsSin && firstCard === secondCard) {
        // Sin pair matched - allowed, just clear them (no points, no game over)
        setTimeout(() => setMemoryFlipped([]), 500);
        return;
      }

      // Check if both cards are the same word (identical match)
      if (firstCard === secondCard) {
        // Good match found!
        const newMatched = [...memoryMatched, firstCard, secondCard];
        setMemoryMatched(newMatched);
        setScore(score + 50);
        
        // Check if all pairs are matched
        if (newMatched.length >= game.pairs.length * 2) {
          // Game completed successfully - reset retry count
          resetRetryCount();
          setRetryCount(0);
          setTimeout(() => setGameCompleted(true), 500);
        } else {
          setTimeout(() => setMemoryFlipped([]), 500);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => setMemoryFlipped([]), 1000);
      }
    }
  };

  const handleRetry = () => {
    // Increment retry count when user clicks Retry
    const newCount = incrementRetryCount();
    setRetryCount(newCount);
    
    // Reset game states
    setGameOver(false);
    setGameCompleted(false);
    setScore(0);
    setMemoryFlipped([]);
    setMemoryMatched([]);
    setMemoryMoves(0);
    
    // Reinitialize memory cards
    const allGoodCards = [...game.pairs, ...game.pairs];
    const allSinCards = [...game.sinPairs, ...game.sinPairs];
    const allCards = [...allGoodCards, ...allSinCards].sort(() => Math.random() - 0.5);
    setMemoryCards(allCards);
    
    // Force re-sync retry count after increment
    setTimeout(() => {
      const updatedCount = getRetryCount();
      setRetryCount(updatedCount);
    }, 0);
  };

  if (gameOver) {
    const currentRetryCount = getRetryCount();
    const maxRetries = 3;
    const canRetryNow = currentRetryCount < maxRetries;

    return (
      <div className="text-center space-y-6 bg-red-50 rounded-lg p-8 border-2 border-red-200">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
          <span className="text-4xl">💀</span>
        </div>
        <div className="bg-white rounded-lg p-6 border border-red-300">
          <h3 className="text-2xl font-urbanist font-semibold text-red-900 mb-3">Game Over!</h3>
          <p className="text-base font-urbanist font-light text-red-800 leading-relaxed mb-4">
            You matched a good word with a sin word. Try again!
          </p>
          {currentRetryCount < maxRetries && (
            <div className={`mb-4 px-4 py-2 rounded-lg ${
              currentRetryCount === 2 ? 'bg-orange-100 text-orange-800' :
              currentRetryCount === 1 ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              <p className="text-sm font-urbanist font-semibold">
                Attempts remaining: {maxRetries - currentRetryCount} / {maxRetries}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:mb-6 relative z-10">
          {canRetryNow ? (
            <Button
              onClick={handleRetry}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
            >
              Retry
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/signup-today")}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Sign in to get unlimited turns
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          )}
          <Button
            onClick={() => navigate("/signup-today")}
            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            Continue
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
          <span className="text-4xl">🎉</span>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-3">🎉 Activity Complete!</h3>
          <p className="text-base font-urbanist font-light text-gray-700 leading-relaxed">{game.encouragement}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Game Board - Left Side */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border-2 border-pink-200">
          <div className="mb-4">
            <h3 className="text-center text-lg font-bold text-gray-900 mb-2">Memory Cards</h3>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-4 max-w-xs mx-auto">
            {memoryCards.map((card: string, index: number) => {
              const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
              const allSinCards = game.sinPairs;
              const isSin = allSinCards.includes(card);
              return (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square rounded-md border-2 transition-all transform hover:scale-105 flex items-center justify-center font-bold text-[10px] ${
                    isFlipped
                      ? isSin
                        ? 'border-red-500 bg-red-100 text-red-900 shadow-md'
                        : 'border-pink-500 bg-pink-100 text-pink-900 shadow-md'
                      : 'border-gray-300 bg-gray-200 hover:border-pink-300 hover:bg-gray-100'
                  }`}
                >
                  {isFlipped ? (
                    <span className={`text-[10px] font-bold leading-tight ${isSin ? 'text-red-900' : 'text-gray-700'}`}>{card}</span>
                  ) : (
                    <span className="text-base">❓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats - Right Side */}
      <div className="lg:col-span-1 flex items-center">
        <div className="w-full space-y-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Matched</p>
            <p className="text-lg font-bold text-gray-900">{memoryMatched.length / 2} / {game.pairs.length}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Moves</p>
            <p className="text-lg font-bold text-gray-900">{memoryMoves}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Score</p>
            <p className="text-lg font-bold text-gray-900">{score}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Flipped</p>
            <p className="text-lg font-bold text-gray-900">{memoryFlipped.length} / 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}


