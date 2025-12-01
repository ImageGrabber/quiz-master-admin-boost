import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Trophy, CheckCircle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Sparkles } from "lucide-react";
import { MatchmakingScreen } from "@/components/MatchmakingScreen";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface WordItem {
  id: number;
  word: string;
  type: 'good' | 'bad';
  pairId: number;
}

const WORD_BANK = {
  good: ['Love', 'Hope', 'Faith', 'Peace', 'Joy', 'Grace', 'Truth', 'Light', 'Mercy', 'Wisdom', 'Patience', 'Kindness', 'Goodness', 'Gentleness', 'Humility'],
  bad: ['Greed', 'Wrath', 'Pride', 'Envy', 'Sloth', 'Lust', 'Gluttony', 'Hatred', 'Deceit', 'Malice', 'Cruelty', 'Arrogance', 'Selfishness', 'Bitterness', 'Corruption']
};

const ScriptureMatchMultiplayer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'menu' | 'matchmaking' | 'game' | 'gameover'>('menu');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [playersOnline, setPlayersOnline] = useState(Math.floor(Math.random() * 51) + 400);
  const [activePlayers, setActivePlayers] = useState(Math.floor(Math.random() * 31) + 200);

  // Game State
  const [activeWords, setActiveWords] = useState<WordItem[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [myScore, setMyScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [computerThinking, setComputerThinking] = useState(false);
  const [computerMoveCount, setComputerMoveCount] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline(Math.floor(Math.random() * 51) + 400);
      setActivePlayers(Math.floor(Math.random() * 31) + 200);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchParams.get('autoStart') === 'true' && currentView === 'menu') {
      startMatchmaking();
    }
  }, [searchParams]);

  // Computer Turn Logic
  useEffect(() => {
    if (!isMyTurn && gameStatus === 'playing' && !computerThinking) {
      makeComputerMove();
    }
  }, [isMyTurn, gameStatus, computerThinking]);

  const startMatchmaking = async () => {
    setCurrentView('matchmaking');

    // Simulate finding a match (5-8 seconds)
    const matchTime = Math.floor(Math.random() * 3000) + 5000;

    setTimeout(() => {
      // Start countdown
      setCountdown(3);
    }, matchTime);
  };

  const initializeGame = () => {
    // Generate random word pairs
    const numPairs = 8; // 16 cards
    const selectedGood = [...WORD_BANK.good].sort(() => 0.5 - Math.random()).slice(0, numPairs / 2);
    const selectedBad = [...WORD_BANK.bad].sort(() => 0.5 - Math.random()).slice(0, numPairs / 2);

    let words: WordItem[] = [];
    let pairId = 0;

    selectedGood.forEach(word => {
      words.push({ id: pairId * 2, word, type: 'good', pairId });
      words.push({ id: pairId * 2 + 1, word, type: 'good', pairId });
      pairId++;
    });

    selectedBad.forEach(word => {
      words.push({ id: pairId * 2, word, type: 'bad', pairId });
      words.push({ id: pairId * 2 + 1, word, type: 'bad', pairId });
      pairId++;
    });

    // Shuffle
    words.sort(() => Math.random() - 0.5);
    setActiveWords(words);

    // Reset state
    setMatchedIndices([]);
    setSelectedIndices([]);
    setMyScore(0);
    setComputerScore(0);
    setIsMyTurn(true);
    setComputerThinking(false);
    setComputerMoveCount(0);
    setGameStatus('playing');
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      initializeGame();
      setCurrentView('game');
      setCountdown(null);
    }
  }, [countdown]);

  const makeComputerMove = async () => {
    setComputerThinking(true);

    // Wait 1.5-3 seconds to simulate thinking
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

    const currentMoveCount = computerMoveCount + 1;
    setComputerMoveCount(currentMoveCount);

    const availableIndices = activeWords
      .map((_, index) => index)
      .filter(index => !matchedIndices.includes(index));

    if (availableIndices.length < 2) {
      // Game over logic handled elsewhere usually, but safety check
      return;
    }

    let index1: number, index2: number;
    const randomValue = Math.random();

    // Only allow smart moves after 2 turns
    const allowSmartMove = currentMoveCount > 2;
    // 35% chance of finding correct match
    const makeSmartMove = allowSmartMove && randomValue < 0.35;

    if (makeSmartMove) {
      // Try to find a match
      let foundMatch = false;
      // Simple search for a pair in available cards
      // In a real memory game, computer would only know cards it has "seen".
      // Here we simulate "perfect memory" of what's on board but limit it by probability.
      for (let i = 0; i < availableIndices.length && !foundMatch; i++) {
        const idx1 = availableIndices[i];
        for (let j = i + 1; j < availableIndices.length; j++) {
          const idx2 = availableIndices[j];
          if (activeWords[idx1].word === activeWords[idx2].word &&
            activeWords[idx1].type === activeWords[idx2].type) {
            index1 = idx1;
            index2 = idx2;
            foundMatch = true;
            break;
          }
        }
      }

      if (!foundMatch) {
        // Fallback to random
        index1 = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const remaining = availableIndices.filter(idx => idx !== index1);
        index2 = remaining[Math.floor(Math.random() * remaining.length)];
      }
    } else {
      // Random move
      index1 = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      const remaining = availableIndices.filter(idx => idx !== index1);
      index2 = remaining[Math.floor(Math.random() * remaining.length)];
    }

    // Show first selection
    setSelectedIndices([index1!]);
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 400));

    // Show second selection
    setSelectedIndices([index1!, index2!]);
    await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 300));

    processMatch(index1!, index2!, false);
  };

  const handleSelect = (index: number) => {
    // Prevent selection if: not player's turn, computer thinking, card already selected, card already matched, or 2 cards already selected
    if (!isMyTurn || computerThinking || selectedIndices.includes(index) || matchedIndices.includes(index) || selectedIndices.length >= 2) return;

    const newSelection = [...selectedIndices, index];
    setSelectedIndices(newSelection);

    if (newSelection.length === 2) {
      setTimeout(() => processMatch(newSelection[0], newSelection[1], true), 500);
    }
  };

  const processMatch = async (index1: number, index2: number, isPlayer: boolean) => {
    const word1 = activeWords[index1];
    const word2 = activeWords[index2];

    let points = 0;
    let isMatch = false;

    if (word1.word === word2.word) {
      isMatch = true;
      points = word1.type === 'good' ? 20 : 15;
    } else {
      points = -5;
    }

    // Update Score
    if (isPlayer) {
      setMyScore(prev => prev + points);
    } else {
      setComputerScore(prev => prev + points);
    }

    if (isMatch) {
      const newMatched = [...matchedIndices, index1, index2];
      setMatchedIndices(newMatched);

      // Check Game Over
      if (newMatched.length >= activeWords.length) {
        setGameStatus('finished');
        // Save result if user is logged in (optional, silent fail if not)
        saveGameResult(isPlayer ? myScore + points : myScore, !isPlayer ? computerScore + points : computerScore);

        // Show game over screen after a short delay
        setTimeout(() => {
          setCurrentView('gameover');
        }, 1500);
      }

      // Keep turn if match
      setTimeout(() => {
        setSelectedIndices([]);
        if (!isPlayer) setComputerThinking(false);
      }, 800);
    } else {
      // Switch turn
      setTimeout(() => {
        setSelectedIndices([]);
        setIsMyTurn(!isPlayer);
        if (!isPlayer) setComputerThinking(false);
      }, 800);
    }
  };

  const saveGameResult = async (finalMyScore: number, finalOpponentScore: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const won = finalMyScore > finalOpponentScore;
        let talentsChange = 0;

        // Fetch current talents
        const { data: userTalents } = await supabase
          .from('user_talents')
          .select('total_talents')
          .eq('user_id', user.id)
          .single();

        const currentTalents = userTalents?.total_talents || 0;

        if (won) {
          talentsChange = 5;
          await supabase.from('user_talents').update({ total_talents: currentTalents + 5 }).eq('user_id', user.id);
        } else if (currentTalents >= 5) {
          talentsChange = -5;
          await supabase.from('user_talents').update({ total_talents: currentTalents - 5 }).eq('user_id', user.id);
        }

        await supabase.from('attempts').insert({
          user_id: user.id,
          quiz_id: 'scripture-match-computer',
          score: finalMyScore,
          total_questions: activeWords.length / 2,
          correct_answers: matchedIndices.length / 2, // Approximate
        });
      }
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  // Render Helpers
  const renderCard = (item: WordItem, index: number) => {
    const isSelected = selectedIndices.includes(index);
    const isMatched = matchedIndices.includes(index);
    const showFace = isSelected || isMatched;

    return (
      <div
        key={index}
        onClick={() => handleSelect(index)}
        className={cn(
          "aspect-square rounded-xl cursor-pointer transition-all duration-500 transform preserve-3d relative",
          showFace ? "rotate-y-180" : "hover:scale-105"
        )}
        style={{ perspective: "1000px" }}
      >
        {/* Front (Hidden state) */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl flex items-center justify-center shadow-lg",
          "bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600",
          showFace && "opacity-0 pointer-events-none duration-300"
        )}>
          <Sparkles className="w-8 h-8 text-slate-500" />
        </div>

        {/* Back (Revealed state) */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl flex items-center justify-center shadow-lg rotate-y-180",
          isMatched
            ? (item.type === 'good' ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-violet-500 to-indigo-600")
            : "bg-gradient-to-br from-violet-500 to-indigo-600",
          !showFace && "opacity-0 pointer-events-none duration-300"
        )}>
          <span className="font-urbanist font-bold text-white text-sm md:text-base text-center px-2">
            {item.word}
          </span>
          {isMatched && (
            <div className="absolute top-1 right-1">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <div className="w-full max-w-4xl mx-auto p-4 flex-1 flex flex-col justify-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard/bible-games')} className="mb-6 text-slate-400 hover:text-white self-start">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Games
          </Button>

          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-urbanist font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  Scripture Match
                </h1>
                <p className="text-slate-400">Multiplayer Edition</p>
              </div>

              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{playersOnline}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Online</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">~2s</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Avg Wait</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{activePlayers}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">Active</div>
                </div>
              </div>

              <Button
                onClick={startMatchmaking}
                className="w-full max-w-md py-8 text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/20"
              >
                <Users className="w-6 h-6 mr-3" />
                Find Match
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'matchmaking' || currentView === 'countdown') {
    return (
      <MatchmakingScreen
        playersOnline={playersOnline}
        countdown={countdown}
        proTip="Match pairs of the same word to score points. Virtues give +20, vices +15!"
      />
    );
  }

  // Game Over Screen
  if (currentView === 'gameover') {
    const playerWon = myScore > computerScore;
    const isDraw = myScore === computerScore;

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-96 h-96 ${playerWon ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 ${playerWon ? 'bg-emerald-500/20' : 'bg-orange-500/20'} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-lg">
          <Card className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-slate-700/50 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-10 text-center space-y-6">
              {/* Result Icon */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                {playerWon ? (
                  <>
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-green-400/30 shadow-2xl shadow-green-500/50">
                      <Trophy className="w-16 h-16 text-white" />
                    </div>
                  </>
                ) : isDraw ? (
                  <>
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-400/30 shadow-2xl shadow-yellow-500/50">
                      <Star className="w-16 h-16 text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center border-4 border-red-400/30 shadow-2xl shadow-red-500/50">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                  </>
                )}
              </div>

              {/* Result Text */}
              <div className="space-y-2">
                <h1 className={`text-5xl font-urbanist font-black ${playerWon ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400' :
                  isDraw ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' :
                    'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400'
                  }`}>
                  {playerWon ? 'Victory!' : isDraw ? "It's a Draw!" : 'Defeat'}
                </h1>
                <p className="text-slate-400 text-lg font-urbanist">
                  {playerWon ? 'Congratulations! You won the match!' :
                    isDraw ? 'Great game! You tied with your opponent!' :
                      'Good effort! Better luck next time!'}
                </p>
              </div>

              {/* Score Display */}
              <div className="grid grid-cols-3 gap-4 items-center max-w-md mx-auto">
                <div className={`bg-gradient-to-br ${playerWon ? 'from-green-500/20 to-emerald-500/20 border-green-500/30' :
                  'from-slate-500/20 to-slate-600/20 border-slate-500/30'
                  } border rounded-xl p-4 backdrop-blur-sm`}>
                  <div className="text-xs font-urbanist font-medium text-slate-400 mb-1">You</div>
                  <div className={`text-4xl font-black ${playerWon ? 'text-green-400' : 'text-white'}`}>{myScore}</div>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                    <span className="font-black text-slate-500 italic text-sm">VS</span>
                  </div>
                </div>

                <div className={`bg-gradient-to-br ${!playerWon && !isDraw ? 'from-red-500/20 to-orange-500/20 border-red-500/30' :
                  'from-slate-500/20 to-slate-600/20 border-slate-500/30'
                  } border rounded-xl p-4 backdrop-blur-sm`}>
                  <div className="text-xs font-urbanist font-medium text-slate-400 mb-1">Opponent</div>
                  <div className={`text-4xl font-black ${!playerWon && !isDraw ? 'text-red-400' : 'text-white'}`}>{computerScore}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 font-urbanist mb-1">Matches Found</p>
                    <p className="text-white font-urbanist font-bold text-lg">{matchedIndices.length / 2}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-urbanist mb-1">Total Cards</p>
                    <p className="text-white font-urbanist font-bold text-lg">{activeWords.length}</p>
                  </div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className={`bg-gradient-to-r ${playerWon ? 'from-green-500/10 to-emerald-500/10 border-green-500/20' :
                isDraw ? 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20' :
                  'from-blue-500/10 to-cyan-500/10 border-blue-500/20'
                } border rounded-xl p-4 backdrop-blur-sm`}>
                <p className={`text-sm font-urbanist font-medium ${playerWon ? 'text-green-300' :
                  isDraw ? 'text-yellow-300' :
                    'text-blue-300'
                  }`}>
                  {playerWon ? '🎉 Amazing memory skills! Keep up the great work!' :
                    isDraw ? '⚡ So close! One more match could have made the difference!' :
                      '💪 Practice makes perfect! Try again to improve your score!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setCurrentView('menu');
                    setGameStatus('playing');
                    setMyScore(0);
                    setComputerScore(0);
                    setMatchedIndices([]);
                    setSelectedIndices([]);
                    setComputerMoveCount(0);
                  }}
                  variant="outline"
                  className="flex-1 h-12 font-urbanist font-semibold border-slate-600 hover:bg-slate-800 text-black"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Main Menu
                </Button>
                <Button
                  onClick={() => {
                    setCurrentView('matchmaking');
                    setTimeout(() => {
                      setCountdown(3);
                    }, Math.floor(Math.random() * 3000) + 5000);
                  }}
                  className="flex-1 h-12 font-urbanist font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "I found an amazing Bible quiz site packed with fun games, multiplayer challenges, and daily quizzes! You can test your knowledge, compete with friends, and discover new facts about the Bible every day. Check it out: https://biblequizcompetition.com"
                  );
                  window.open(`https://wa.me/?text=${message}`, "_blank");
                }}
                className="w-full mt-4 h-12 font-urbanist font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:from-green-400 hover:to-emerald-400"
              >
                Share with Friends
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentView('menu')} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quit Game
          </Button>
          <div className="px-4 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">LIVE MATCH</span>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-3 gap-6 items-center mb-8">
          {/* You */}
          <div className={cn(
            "bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 border-4 rounded-2xl p-6 text-center transition-all duration-300 shadow-xl",
            isMyTurn ? "border-yellow-300 shadow-yellow-300/30 animate-pulse-slow" : "border-slate-800"
          )}>
            <div className="text-base font-extrabold text-yellow-300 uppercase mb-2 tracking-wide drop-shadow">You</div>
            <div className="text-5xl font-black text-white drop-shadow-lg">{myScore}</div>
            {isMyTurn && <div className="mt-3 text-lg font-extrabold text-pink-400 animate-pulse-slow drop-shadow">YOUR TURN</div>}
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 border-4 border-yellow-300 flex items-center justify-center shadow-lg animate-pulse-slow">
              <span className="font-black text-yellow-300 italic text-2xl drop-shadow">VS</span>
            </div>
          </div>

          {/* Opponent */}
          <div className={cn(
            "bg-gradient-to-br from-pink-900 via-indigo-900 to-slate-900 border-4 rounded-2xl p-6 text-center transition-all duration-300 shadow-xl",
            !isMyTurn ? "border-pink-400 shadow-pink-400/30 animate-pulse-slow" : "border-slate-800"
          )}>
            <div className="text-sm md:text-base font-extrabold text-pink-300 uppercase mb-2 tracking-wide drop-shadow flex justify-center">Opponent</div>
            <div className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">{computerScore}</div>
            {!isMyTurn && (
              <div className="mt-3 text-lg font-extrabold text-yellow-300 animate-pulse-slow drop-shadow">
                {computerThinking ? "TURN" : "THEIR TURN"}
              </div>
            )}
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
          {activeWords.map((item, index) => renderCard(item, index))}
        </div>
      </div>
    </div>
  );
};

export default ScriptureMatchMultiplayer;
