import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react";

interface MemoryMatchProps {
  gamePairs: string[][];
  sinPairs: string[][];
  onComplete?: () => void;
}

export function MemoryMatch({ gamePairs, sinPairs, onComplete }: MemoryMatchProps) {
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Create pairs: duplicate each card for matching
    const allGoodCards = gamePairs.flat().map(card => card);
    const allSinCards = sinPairs.flat().map(card => card);
    
    // Duplicate each card to create pairs
    const duplicatedGood = [...allGoodCards, ...allGoodCards];
    const duplicatedSin = [...allSinCards, ...allSinCards];
    
    // Combine and shuffle
    const allCards = [...duplicatedGood, ...duplicatedSin].sort(() => Math.random() - 0.5);
    setMemoryCards(allCards);
    setMemoryFlipped([]);
    setMemoryMatched([]);
    setGameCompleted(false);
    setGameOver(false);
    setMoves(0);
    setScore(0);
  };

  const handleCardClick = (index: number) => {
    if (gameCompleted || gameOver) return;
    
    const card = memoryCards[index];
    const isFlipped = memoryFlipped.includes(index);
    const isMatched = memoryMatched.includes(card);
    
    // Can't click already flipped or matched cards
    if (isFlipped || isMatched) return;
    
    // Can only flip 2 cards at a time
    if (memoryFlipped.length >= 2) return;

    const newFlipped = [...memoryFlipped, index];
    setMemoryFlipped(newFlipped);
    setMoves(moves + 1);

    // Check if 2 cards are flipped
    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = memoryCards[firstIndex];
      const secondCard = memoryCards[secondIndex];

      // Check if cards are sins or good words
      const allSinCards = sinPairs.flat();
      const allGoodCards = gamePairs.flat();
      const firstIsSin = allSinCards.includes(firstCard);
      const secondIsSin = allSinCards.includes(secondCard);
      const firstIsGood = allGoodCards.includes(firstCard);
      const secondIsGood = allGoodCards.includes(secondCard);

      // If one is good and one is sin - Game Over!
      if ((firstIsGood && secondIsSin) || (firstIsSin && secondIsGood)) {
        setTimeout(() => setGameOver(true), 500);
        return;
      }

      // Check if they form a sin pair (same word)
      if (firstIsSin && secondIsSin && firstCard === secondCard) {
        // Sin pair matched - allowed, just clear them (no points, no game over)
        setTimeout(() => setMemoryFlipped([]), 500);
        return;
      }

      // Check if they form a good pair (same word)
      if (firstIsGood && secondIsGood && firstCard === secondCard) {
        // Good match found!
        const newMatched = [...memoryMatched, firstCard, secondCard];
        setMemoryMatched(newMatched);
        const newScore = score + 50; // 50 points per match
        setScore(newScore);
        
        // Check if all good pairs are matched
        const totalGoodCards = gamePairs.flat().length * 2; // Each card appears twice
        if (newMatched.length >= totalGoodCards) {
          setTimeout(() => {
            setGameCompleted(true);
            if (onComplete) {
              onComplete();
            }
          }, 500);
        } else {
          // Clear flipped cards after match
          setTimeout(() => setMemoryFlipped([]), 500);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => setMemoryFlipped([]), 1000);
      }
    }
  };

  const isCardFlipped = (index: number) => {
    return memoryFlipped.includes(index);
  };

  const isCardMatched = (card: string) => {
    return memoryMatched.includes(card);
  };

  const isCardSin = (card: string) => {
    return sinPairs.flat().includes(card);
  };

  const totalPairs = gamePairs.length;
  const matchedPairs = memoryMatched.filter(card => gamePairs.flat().includes(card)).length / 2;

  if (gameOver) {
    return (
      <div className="text-center space-y-6 bg-gradient-to-br from-red-50 via-red-100/50 to-orange-50 rounded-2xl p-8 md:p-12 border border-red-200/50 shadow-2xl backdrop-blur-sm">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-red-400/20 rounded-full"></div>
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center shadow-2xl ring-4 ring-red-200/50">
            <span className="text-5xl animate-bounce">💀</span>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-red-200/50 shadow-xl">
          <h3 className="text-3xl font-urbanist font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">Game Over!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed mb-6">
            You matched a good word with a sin! Only match good words with their pairs.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm font-urbanist font-semibold text-red-800 mb-1">Final Score</p>
              <p className="text-2xl font-urbanist font-bold text-red-900">{score}</p>
            </div>
            <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm font-urbanist font-semibold text-red-800 mb-1">Total Moves</p>
              <p className="text-2xl font-urbanist font-bold text-red-900">{moves}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:mb-6 relative z-10">
          <Button
            onClick={resetGame}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95"
          >
            Retry
            <RotateCcw className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-green-400/30 rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl ring-4 ring-green-200/50 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">🎉 Excellent Memory!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed mb-6">
            You found all the matching pairs!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Final Score</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{score}</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Total Moves</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{moves}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={resetGame}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95"
          >
            Play Again
            <RotateCcw className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 rounded-2xl p-6 border border-pink-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <div>
          <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
            Memory Match
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-urbanist">Match pairs, avoid mixing good with sin!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-pink-200/50 shadow-xl ring-2 ring-pink-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent whitespace-nowrap">
                Matched: <span className="text-gray-900">{matchedPairs}</span> / <span className="text-gray-900">{totalPairs}</span>
              </span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-pink-200/50 shadow-xl ring-2 ring-pink-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                Score: <span className="text-gray-900">{score}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-3 p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-2xl border-2 border-pink-200/50 shadow-xl">
          {memoryCards.map((card, index) => {
            const isFlipped = isCardFlipped(index);
            const isMatched = isCardMatched(card);
            const isSin = isCardSin(card);
            
            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                  rounded-xl border-2 transition-all duration-200
                  flex items-center justify-center font-bold
                  transform hover:scale-105 active:scale-95
                  ${isMatched
                    ? 'bg-green-200 border-green-400 text-green-800 shadow-lg'
                    : isFlipped
                    ? isSin
                      ? 'bg-red-200 border-red-400 text-red-800 shadow-lg'
                      : 'bg-pink-200 border-pink-400 text-pink-800 shadow-lg'
                    : 'bg-white border-gray-300 text-gray-400 hover:border-pink-300 hover:bg-gray-50 shadow-md'
                  }
                `}
              >
                {isFlipped || isMatched ? (
                  <span className={`text-xs md:text-sm font-urbanist font-bold ${isSin ? 'text-red-900' : 'text-pink-900'}`}>
                    {card}
                  </span>
                ) : (
                  <span className="text-xl md:text-2xl">❓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats and Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-gray-50 to-pink-50/50 rounded-xl p-4 border border-pink-100/50">
          <p className="text-xs font-urbanist font-semibold text-gray-600 mb-1">Moves</p>
          <p className="text-xl font-urbanist font-bold text-gray-900">{moves}</p>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-pink-50/50 rounded-xl p-4 border border-pink-100/50">
          <p className="text-xs font-urbanist font-semibold text-gray-600 mb-1">Flipped</p>
          <p className="text-xl font-urbanist font-bold text-gray-900">{memoryFlipped.length} / 2</p>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-pink-50/50 rounded-xl p-4 border border-pink-100/50">
          <p className="text-xs font-urbanist font-semibold text-gray-600 mb-1">Score</p>
          <p className="text-xl font-urbanist font-bold text-purple-600">{score}</p>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-pink-50/50 rounded-xl p-4 border border-pink-100/50">
          <p className="text-xs font-urbanist font-semibold text-gray-600 mb-1">Pairs</p>
          <p className="text-xl font-urbanist font-bold text-pink-600">{matchedPairs} / {totalPairs}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-nowrap gap-4 justify-center">
        <Button
          onClick={resetGame}
          className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-gray-50 to-pink-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></span>
            Match good word pairs to score points
          </span>
          <br className="hidden sm:block" />
          <span className="inline-flex items-center gap-2 mt-2 sm:mt-0 sm:ml-2">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-red-600 font-semibold">Matching good + sin = Game Over!</span>
          </span>
        </p>
      </div>
    </div>
  );
}

