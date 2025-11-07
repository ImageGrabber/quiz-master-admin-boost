import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, RotateCcw, Home } from "lucide-react";

const Match3Game = () => {
  const navigate = useNavigate();
  const [match3Grid, setMatch3Grid] = useState<string[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Game configuration
  const gameWords = ['Joy', 'Hope', 'Love', 'Faith', 'Peace', 'Grace', 'Mercy', 'Trust', 'Truth'];
  const targetMatches = 5; // Number of matches needed to win

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Create grid with 9 words (3x3), ensuring some matches are possible
    const gridWords = [...gameWords, ...gameWords, ...gameWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);
    setMatch3Grid(gridWords);
    setSelectedTiles([]);
    setMatches(0);
    setGameCompleted(false);
    setScore(0);
  };

  const handleTileClick = (index: number) => {
    if (gameCompleted) return;

    if (selectedTiles.includes(index)) {
      // Deselect tile
      setSelectedTiles(selectedTiles.filter(i => i !== index));
    } else if (selectedTiles.length < 3) {
      // Select tile
      const newSelected = [...selectedTiles, index];
      setSelectedTiles(newSelected);

      // Check if 3 tiles are selected
      if (newSelected.length === 3) {
        const selectedWords = newSelected.map(i => match3Grid[i]);
        const uniqueWords = new Set(selectedWords);

        // Check if all 3 words match
        if (uniqueWords.size === 1) {
          // Match found!
          const newMatches = matches + 1;
          const newScore = score + 10; // 10 points per match
          setMatches(newMatches);
          setScore(newScore);
          setSelectedTiles([]);

          // Check if game is completed
          if (newMatches >= targetMatches) {
            setTimeout(() => setGameCompleted(true), 500);
          } else {
            // Shuffle grid after successful match
            const newGrid = [...match3Grid].sort(() => Math.random() - 0.5);
            setMatch3Grid(newGrid);
          }
        } else {
          // No match - deselect after delay
          setTimeout(() => setSelectedTiles([]), 500);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Match 3 Words</h1>
          <p className="text-gray-600">Match three identical words to score points!</p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Matches</p>
                <p className="text-2xl font-bold text-blue-600">
                  {matches} / {targetMatches}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Score</p>
                <p className="text-2xl font-bold text-purple-600">{score}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Selected</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {selectedTiles.length} / 3
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Completed Screen */}
        {gameCompleted ? (
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    You completed the Match-3 game!
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 inline-block">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Final Score</p>
                    <p className="text-4xl font-bold text-gray-900">{score}</p>
                  </div>
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
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Game Board */
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Game Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {match3Grid.map((word: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleTileClick(index)}
                    className={`aspect-square rounded-xl border-2 transition-all transform hover:scale-105 flex items-center justify-center font-bold text-sm ${
                      selectedTiles.includes(index)
                        ? 'border-blue-500 bg-blue-200 scale-110 shadow-lg text-blue-900'
                        : 'border-gray-300 bg-white hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Click 3 matching words to make a match!
                </p>
                <p className="text-xs text-gray-500">
                  {selectedTiles.length > 0 && (
                    <span>
                      Selected: {selectedTiles.map(i => match3Grid[i]).join(", ")}
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {!gameCompleted && (
          <div className="flex gap-4 justify-center mt-6">
            <Button
              onClick={resetGame}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Game
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-6 bg-white/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">How to Play:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Click on three tiles to select them</li>
              <li>If all three words match, you score 10 points!</li>
              <li>Match {targetMatches} sets to win the game</li>
              <li>The board shuffles after each successful match</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Match3Game;

