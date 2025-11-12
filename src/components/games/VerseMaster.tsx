import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, BookOpen, ArrowRight } from "lucide-react";

interface Verse {
  reference: string;
  text: string;
  blanks: number[]; // Indices of words to blank out
}

interface VerseMasterProps {
  verses: Verse[];
  onComplete?: () => void;
}

export function VerseMaster({ verses, onComplete }: VerseMasterProps) {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentVerse = verses[currentVerseIndex];
  const words = currentVerse.text.split(' ');

  // Initialize answers array
  useEffect(() => {
    if (currentVerse) {
      setUserAnswers(new Array(currentVerse.blanks.length).fill(''));
      setShowResult(false);
    }
  }, [currentVerseIndex]);

  const handleAnswerChange = (blankIndex: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[blankIndex] = value;
    setUserAnswers(newAnswers);
  };

  const checkAnswer = () => {
    if (!currentVerse) return;

    let correct = true;
    currentVerse.blanks.forEach((blankIndex, i) => {
      const correctWord = words[blankIndex].toLowerCase().replace(/[.,!?;:]/g, '');
      const userAnswer = userAnswers[i].toLowerCase().trim();
      if (userAnswer !== correctWord) {
        correct = false;
      }
    });

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const newScore = score + 100;
      setScore(newScore);

      // Move to next verse after delay
      setTimeout(() => {
        if (currentVerseIndex < verses.length - 1) {
          setCurrentVerseIndex(currentVerseIndex + 1);
        } else {
          setGameCompleted(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else {
      setGameCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleSkip = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else {
      setGameCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const resetGame = () => {
    setCurrentVerseIndex(0);
    setUserAnswers([]);
    setScore(0);
    setGameCompleted(false);
    setShowResult(false);
    setIsCorrect(false);
  };

  const renderVerse = () => {
    if (!currentVerse) return null;

    const elements: JSX.Element[] = [];
    let blankIndex = 0;

    words.forEach((word, index) => {
      if (currentVerse.blanks.includes(index)) {
        const isCorrectAnswer = showResult && userAnswers[blankIndex]?.toLowerCase().trim() === word.toLowerCase().replace(/[.,!?;:]/g, '');
        const isWrongAnswer = showResult && userAnswers[blankIndex] && !isCorrectAnswer;

        elements.push(
          <span key={index} className="inline-flex items-center mx-1">
            <input
              type="text"
              value={userAnswers[blankIndex] || ''}
              onChange={(e) => handleAnswerChange(blankIndex, e.target.value)}
              disabled={showResult}
              className={`
                w-20 md:w-32 lg:w-40 px-2 py-1 text-center
                border-2 rounded-lg font-urbanist font-semibold
                transition-all duration-200
                ${showResult
                  ? isCorrectAnswer
                    ? 'bg-green-200 border-green-500 text-green-900'
                    : isWrongAnswer
                    ? 'bg-red-200 border-red-500 text-red-900'
                    : 'bg-gray-200 border-gray-400 text-gray-700'
                  : 'bg-white border-amber-400 text-gray-900 focus:border-amber-600 focus:ring-2 focus:ring-amber-200'
                }
                disabled:opacity-75
              `}
              placeholder="?"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !showResult) {
                  checkAnswer();
                }
              }}
            />
            {showResult && !isCorrectAnswer && (
              <span className="ml-2 text-xs text-red-600 font-urbanist font-semibold">
                ({word})
              </span>
            )}
          </span>
        );
        blankIndex++;
      } else {
        elements.push(
          <span key={index} className="mx-1">
            {word}
          </span>
        );
      }
    });

    return elements;
  };

  if (gameCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-green-400/30 rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl ring-4 ring-green-200/50 animate-bounce">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">🎉 Verse Master Complete!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed mb-6">
            You've completed all {verses.length} verses! Well done!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Final Score</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{score}</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Verses Completed</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{verses.length}</p>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-6 border border-amber-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <div>
          <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent whitespace-nowrap">
            Verse Master
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-urbanist">Fill in the missing words to complete the verse!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-amber-200/50 shadow-xl ring-2 ring-amber-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent whitespace-nowrap">
                Verse: <span className="text-gray-900">{currentVerseIndex + 1}</span> / <span className="text-gray-900">{verses.length}</span>
              </span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-amber-200/50 shadow-xl ring-2 ring-amber-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                Score: <span className="text-gray-900">{score}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Verse Card */}
      <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-amber-600" />
          <h4 className="text-xl md:text-2xl font-urbanist font-bold text-amber-900">
            {currentVerse.reference}
          </h4>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-amber-200 shadow-lg">
          <div className="text-lg md:text-xl font-urbanist font-medium text-gray-800 leading-relaxed text-center">
            {renderVerse()}
          </div>
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`mt-6 p-4 rounded-xl border-2 ${
            isCorrect
              ? 'bg-green-100 border-green-400'
              : 'bg-red-100 border-red-400'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-urbanist font-bold text-green-800">
                    Correct! +100 points
                  </span>
                </>
              ) : (
                <span className="text-lg font-urbanist font-bold text-red-800">
                  Not quite right. Try again!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-nowrap gap-4 justify-center">
        {!showResult ? (
          <>
            <Button
              onClick={checkAnswer}
              disabled={userAnswers.some(answer => !answer.trim())}
              className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap disabled:hover:scale-100"
            >
              Check Answer
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={handleSkip}
              className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 hover:from-gray-700 hover:via-gray-600 hover:to-gray-700 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Skip
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        ) : (
          <Button
            onClick={handleNext}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-700 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {currentVerseIndex < verses.length - 1 ? 'Next Verse' : 'Finish'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
        <Button
          onClick={resetGame}
          className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-gray-50 to-amber-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Fill in the missing words to complete each Bible verse. Press Enter to check your answer!
          </span>
        </p>
      </div>
    </div>
  );
}
