import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2 } from "lucide-react";

interface WordSearchGameProps {
  words: string[];
  gridSize: number;
  onComplete?: () => void;
}

interface Position {
  row: number;
  col: number;
}

interface FoundWord {
  word: string;
  positions: Position[];
}

export function WordSearchGame({ words, gridSize = 15, onComplete }: WordSearchGameProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState<Position | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Generate word search grid
  useEffect(() => {
    generateGrid();
  }, [words, gridSize]);

  const generateGrid = () => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('').map(() => getRandomLetter())
    );

    // Place words in the grid
    const placedWords: FoundWord[] = [];
    words.forEach(word => {
      const upperWord = word.toUpperCase().replace(/\s/g, '');
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const direction = Math.floor(Math.random() * 8); // 8 directions
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        
        const positions: Position[] = [];
        let valid = true;
        
        for (let i = 0; i < upperWord.length; i++) {
          let newRow = row;
          let newCol = col;
          
          switch (direction) {
            case 0: newRow = row; newCol = col + i; break; // Right
            case 1: newRow = row; newCol = col - i; break; // Left
            case 2: newRow = row + i; newCol = col; break; // Down
            case 3: newRow = row - i; newCol = col; break; // Up
            case 4: newRow = row + i; newCol = col + i; break; // Down-Right
            case 5: newRow = row + i; newCol = col - i; break; // Down-Left
            case 6: newRow = row - i; newCol = col + i; break; // Up-Right
            case 7: newRow = row - i; newCol = col - i; break; // Up-Left
          }
          
          if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
            valid = false;
            break;
          }
          
          positions.push({ row: newRow, col: newCol });
        }
        
        if (valid) {
          // Check if positions overlap with existing words
          const overlaps = placedWords.some(found => 
            found.positions.some(pos => 
              positions.some(p => p.row === pos.row && p.col === pos.col)
            )
          );
          
          if (!overlaps) {
            // Place the word
            upperWord.split('').forEach((char, idx) => {
              newGrid[positions[idx].row][positions[idx].col] = char;
            });
            
            placedWords.push({ word: word, positions });
            placed = true;
          }
        }
        
        attempts++;
      }
    });
    
    setGrid(newGrid);
    setFoundWords([]);
  };

  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCellFound = (row: number, col: number) => {
    return foundWords.some(found => 
      found.positions.some(pos => pos.row === row && pos.col === col)
    );
  };

  const handleCellMouseDown = (row: number, col: number) => {
    if (isCellFound(row, col)) return;
    
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || !startCell || isCellFound(row, col)) return;
    
    const cells = getCellsBetween(startCell, { row, col });
    setSelectedCells(cells);
  };

  const handleCellMouseUp = () => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    
    if (selectedCells.length > 0) {
      checkWord();
    }
    
    setSelectedCells([]);
    setStartCell(null);
  };

  const getCellsBetween = (start: Position, end: Position): Position[] => {
    const cells: Position[] = [];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    for (let i = 0; i <= steps; i++) {
      const row = start.row + Math.round((rowDiff / steps) * i);
      const col = start.col + Math.round((colDiff / steps) * i);
      cells.push({ row, col });
    }
    
    return cells;
  };

  const checkWord = () => {
    if (selectedCells.length === 0) return;
    
    const selectedWord = selectedCells
      .map(cell => grid[cell.row][cell.col])
      .join('');
    
    const reversedWord = selectedWord.split('').reverse().join('');
    
    // Check if word matches (forward or backward)
    const matchedWord = words.find(word => {
      const upperWord = word.toUpperCase().replace(/\s/g, '');
      return selectedWord === upperWord || reversedWord === upperWord;
    });
    
    if (matchedWord && !foundWords.some(f => f.word === matchedWord)) {
      const newFoundWord: FoundWord = {
        word: matchedWord,
        positions: [...selectedCells]
      };
      
      const updatedFoundWords = [...foundWords, newFoundWord];
      setFoundWords(updatedFoundWords);
      
      // Check if all words are found
      if (updatedFoundWords.length === words.length && onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
  };

  const handleReset = () => {
    generateGrid();
    setFoundWords([]);
    setSelectedCells([]);
    setIsSelecting(false);
    setStartCell(null);
  };

  const allWordsFound = foundWords.length === words.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-nowrap items-center justify-between gap-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
          Bible Word Search
        </h3>
        <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-blue-200/50 shadow-xl ring-2 ring-blue-100/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
            <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              Found: <span className="text-gray-900">{foundWords.length}</span> / <span className="text-gray-900">{words.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Words to Find */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-semibold text-gray-700 mb-3">Words to Find:</p>
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => {
            const isFound = foundWords.some(f => f.word === word);
            return (
              <span
                key={index}
                className={`px-3 py-1 rounded-lg text-sm font-urbanist font-medium transition-all ${
                  isFound
                    ? 'bg-green-100 text-green-800 line-through'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {word}
                {isFound && <CheckCircle2 className="w-3 h-3 inline ml-1" />}
              </span>
            );
          })}
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex justify-center">
        <div
          ref={gridRef}
          className="grid gap-1 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-xl"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          onMouseLeave={handleCellMouseUp}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isSelected = isCellSelected(rowIndex, colIndex);
              const isFound = isCellFound(rowIndex, colIndex);
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-8 h-8 md:w-10 md:h-10 flex items-center justify-center
                    text-sm md:text-base font-bold font-urbanist
                    rounded transition-all duration-150 cursor-pointer
                    ${isFound 
                      ? 'bg-green-200 text-green-800' 
                      : isSelected
                      ? 'bg-blue-200 text-blue-900'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleCellMouseUp}
                >
                  {cell}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-nowrap gap-4 justify-center">
        <Button
          onClick={handleReset}
          className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset Grid
        </Button>
      </div>

      {/* Completion Message */}
      {allWordsFound && (
        <div className="text-center space-y-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border border-green-200/50 shadow-2xl backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-green-400/30 rounded-full animate-pulse"></div>
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl ring-4 ring-green-200/50">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-xl">
            <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              🎉 All Words Found!
            </h3>
            <p className="text-lg font-urbanist font-medium text-gray-700">
              Great job! You found all the biblical words!
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            Click and drag to select words horizontally, vertically, or diagonally
          </span>
        </p>
      </div>
    </div>
  );
}

