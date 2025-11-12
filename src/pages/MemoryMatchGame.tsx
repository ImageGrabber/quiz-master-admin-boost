import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, RotateCcw, Home, Brain, AlertTriangle } from "lucide-react";

const MemoryMatchGame = () => {
  const navigate = useNavigate();
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true);

  // Game configuration - Bible word pairs (6 pairs = 12 cards)
  const gamePairs = [
    ['Joy', 'Peace'],
    ['Faith', 'Hope'],
    ['Love', 'Grace'],
    ['Mercy', 'Truth'],
    ['Light', 'Glory'],
    ['Bless', 'Honor']
  ];

  // Sin pairs - matching these causes game over (2 pairs = 4 cards)
  const sinPairs = [
    ['Pride', 'Envy'],
    ['Wrath', 'Greed']
  ];

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Flatten pairs (both good and sin pairs) and shuffle
    const allGoodCards = gamePairs.flat();
    const allSinCards = sinPairs.flat();
    const allCards = [...allGoodCards, ...allSinCards].sort(() => Math.random() - 0.5);
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
    const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
    
    // Can't click already flipped or matched cards
    if (isFlipped) return;
    
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

      // Check if they form a sin pair (allowed - just clear them)
      const isSinPair = sinPairs.some(pair => 
        (pair[0] === firstCard && pair[1] === secondCard) ||
        (pair[0] === secondCard && pair[1] === firstCard)
      );

      if (isSinPair) {
        // Sin pair matched - allowed, just clear them (no points, no game over)
        setTimeout(() => setMemoryFlipped([]), 500);
        return;
      }

      // Check if they form a good pair
      const isPair = gamePairs.some(pair => 
        (pair[0] === firstCard && pair[1] === secondCard) ||
        (pair[0] === secondCard && pair[1] === firstCard)
      );

      if (isPair) {
        // Good match found!
        const newMatched = [...memoryMatched, firstCard, secondCard];
        setMemoryMatched(newMatched);
        const newScore = score + 50; // 50 points per match
        setScore(newScore);
        
        // Check if all good pairs are matched
        if (newMatched.length >= gamePairs.length * 2) {
          setTimeout(() => setGameCompleted(true), 500);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Rules Dialog */}
        <Dialog open={showRules} onOpenChange={setShowRules}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">How to Play</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm font-urbanist font-light text-gray-700">
                      Match good word pairs to score points
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-urbanist font-light text-gray-700">
                      You can match sin + sin (no points)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-200 rounded-lg p-4 border border-red-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-urbanist font-bold text-gray-900">
                      Matching good + sin = Game Over
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <Button
                onClick={() => setShowRules(false)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 w-full"
              >
                Start
              </Button>
            </div>
          </DialogContent>
        </Dialog>


        {/* Game Over Screen */}
        {gameOver ? (
          <Card className="bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-700">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-4xl">💀</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Game Over!</h2>
                  <p className="text-lg text-red-50 mb-4">
                    You matched a good word with a sin! Only match good words with their pairs, and avoid sins.
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-4">
                    <div className="bg-white/90 rounded-lg p-4 border border-white/50">
                      <p className="text-sm font-semibold text-red-600 mb-1">Final Score</p>
                      <p className="text-3xl font-bold text-red-700">{score}</p>
                    </div>
                    <div className="bg-white/90 rounded-lg p-4 border border-white/50">
                      <p className="text-sm font-semibold text-red-600 mb-1">Total Moves</p>
                      <p className="text-3xl font-bold text-red-700">{moves}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="flex items-center gap-2 bg-white/20 border-white/50 text-white hover:bg-white/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-white text-red-600 hover:bg-red-50"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : gameCompleted ? (
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Excellent Memory!</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    You found all the matching pairs!
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Final Score</p>
                      <p className="text-3xl font-bold text-gray-900">{score}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Total Moves</p>
                      <p className="text-3xl font-bold text-gray-900">{moves}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Efficiency: {gamePairs.length * 2} cards in {moves} moves
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Game Layout: Board on Left, Stats on Right */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Board - Left Side */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-lg">Memory Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-1.5 mb-4 max-w-xs mx-auto">
                    {memoryCards.map((card: string, index: number) => {
                      const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
                      // Check if card is a sin
                      const isSin = sinPairs.flat().includes(card);
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
                  <div className="text-center space-y-1">
                    <p className="text-xs text-gray-600">
                      Click cards to flip them and find matching pairs!
                    </p>
                    {memoryFlipped.length > 0 && (
                      <p className="text-[10px] text-gray-500">
                        Flipped: {memoryFlipped.map(i => memoryCards[i]).join(", ")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Stats - Right Side */}
            <div className="lg:col-span-1 flex items-center">
              <div className="space-y-3 w-full">
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Matched</p>
                      <p className="text-xl font-bold text-pink-600">
                        {memoryMatched.length / 2} / {gamePairs.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Moves</p>
                      <p className="text-xl font-bold text-purple-600">{moves}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Score</p>
                      <p className="text-xl font-bold text-indigo-600">{score}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Flipped</p>
                      <p className="text-xl font-bold text-rose-600">
                        {memoryFlipped.length} / 2
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MemoryMatchGame;

