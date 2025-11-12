import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2, Heart, Sparkles } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  verse?: string;
}

interface FaithBuilderProps {
  questions: Question[];
  onComplete?: () => void;
}

export function FaithBuilder({ questions, onComplete }: FaithBuilderProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      const newScore = score + 100;
      setScore(newScore);
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameCompleted(true);
        if (onComplete) {
          onComplete();
        }
      }
    }, 2500);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setGameCompleted(false);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  if (gameCompleted) {
    const percentage = Math.round((score / (questions.length * 100)) * 100);
    
    return (
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-green-400/30 rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl ring-4 ring-green-200/50 animate-bounce">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">🎉 Faith Builder Complete!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed mb-6">
            You've completed all {questions.length} questions! Your faith is growing!
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Final Score</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{score}</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Accuracy</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{percentage}%</p>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-sm font-urbanist font-semibold text-green-800 mb-1">Questions</p>
              <p className="text-2xl font-urbanist font-bold text-green-900">{questions.length}</p>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-2xl p-6 border border-rose-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <div>
          <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent whitespace-nowrap">
            Faith Builder
          </h3>
          <p className="text-sm text-gray-600 mt-1 font-urbanist">Build your faith through biblical principles!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-rose-200/50 shadow-xl ring-2 ring-rose-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                Question: <span className="text-gray-900">{currentQuestionIndex + 1}</span> / <span className="text-gray-900">{questions.length}</span>
              </span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-rose-200/50 shadow-xl ring-2 ring-rose-100/50 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
              <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                Score: <span className="text-gray-900">{score}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-2xl p-8 border-2 border-rose-200/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-rose-600" />
          <h4 className="text-xl md:text-2xl font-urbanist font-bold text-rose-900">
            Question {currentQuestionIndex + 1}
          </h4>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-rose-200 shadow-lg mb-6">
          <p className="text-lg md:text-xl font-urbanist font-semibold text-gray-800 leading-relaxed mb-6">
            {currentQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isWrong = showResult && isSelected && !isCorrect;
              const showCorrect = showResult && isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                    font-urbanist font-medium text-base
                    transform hover:scale-[1.02] active:scale-100
                    ${showResult
                      ? showCorrect
                        ? 'bg-green-100 border-green-400 text-green-900 shadow-lg'
                        : isWrong
                        ? 'bg-red-100 border-red-400 text-red-900 shadow-lg'
                        : 'bg-gray-50 border-gray-300 text-gray-600'
                      : isSelected
                      ? 'bg-rose-100 border-rose-400 text-rose-900 shadow-md'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
                    }
                    disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`
                      w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm
                      ${showResult
                        ? showCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                        : isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 rounded-xl border-2 ${
            selectedAnswer === currentQuestion.correctAnswer
              ? 'bg-green-100 border-green-400'
              : 'bg-red-100 border-red-400'
          }`}>
            <div className="flex items-start gap-3">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-lg font-urbanist font-bold text-green-800 mb-2">
                      Correct! +100 points
                    </p>
                    <p className="text-sm font-urbanist font-medium text-green-700 mb-2">
                      {currentQuestion.explanation}
                    </p>
                    {currentQuestion.verse && (
                      <p className="text-xs font-urbanist font-semibold text-green-600 italic">
                        {currentQuestion.verse}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <p className="text-lg font-urbanist font-bold text-red-800 mb-2">
                    Incorrect
                  </p>
                  <p className="text-sm font-urbanist font-medium text-red-700 mb-2">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.verse && (
                    <p className="text-xs font-urbanist font-semibold text-red-600 italic">
                      {currentQuestion.verse}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-nowrap gap-4 justify-center">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:via-pink-700 hover:to-rose-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap disabled:hover:scale-100"
          >
            Submit Answer
            <CheckCircle2 className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:via-pink-700 hover:to-rose-700 rounded-xl hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
            <Sparkles className="w-5 h-5 ml-2" />
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
      <div className="bg-gradient-to-r from-gray-50 to-rose-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600" />
            Select the best answer based on biblical principles. Each correct answer builds your faith!
          </span>
        </p>
      </div>
    </div>
  );
}

