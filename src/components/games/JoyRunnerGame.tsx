import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FallingBubble {
  id: string;
  item: string;
  x: number;
  y: number;
  speed: number;
  collected: boolean;
  type: 'good' | 'sin';
}

interface JoyRunnerGameProps {
  game: {
    title: string;
    description: string;
    verse: string;
    reference: string;
    type: string;
    targetBubbles?: number;
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
  goodWords: string[];
  sins: string[];
}

export function JoyRunnerGame({
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
  goodWords,
  sins,
}: JoyRunnerGameProps) {
  const navigate = useNavigate();
  const [runnerPosition, setRunnerPosition] = useState(0);
  const [runnerCollected, setRunnerCollected] = useState<string[]>([]);
  const [fallingBubbles, setFallingBubbles] = useState<FallingBubble[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Refs to avoid stale closures
  const runnerPositionRef = useRef(0);
  const runnerCollectedRef = useRef<string[]>([]);
  const scoreRef = useRef(0);
  const lastSpawnTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);
  const gameCompletedRef = useRef(false);
  const gameOverRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    runnerPositionRef.current = runnerPosition;
  }, [runnerPosition]);

  useEffect(() => {
    runnerCollectedRef.current = runnerCollected;
  }, [runnerCollected]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    gameCompletedRef.current = gameCompleted;
  }, [gameCompleted]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  // Initialize game state
  useEffect(() => {
    if (game.type === 'runner') {
      setRunnerPosition(0);
      setRunnerCollected([]);
      setFallingBubbles([]);
      setScore(0);
      setGameOver(false);
      setGameCompleted(false);
      runnerPositionRef.current = 0;
      runnerCollectedRef.current = [];
      scoreRef.current = 0;
      lastSpawnTimeRef.current = Date.now();
      gameCompletedRef.current = false;
      gameOverRef.current = false;
    }
  }, [game.type, setScore, setGameOver, setGameCompleted]);

  // Game loop for falling bubbles
  useEffect(() => {
    // Use refs to check game state to avoid stopping due to dependency changes
    // Also check state initially to ensure we start correctly
    if (game.type !== 'runner' || gameCompleted || gameOver) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    // Sync refs with current state before starting
    gameCompletedRef.current = gameCompleted;
    gameOverRef.current = gameOver;

    let lastFrameTime = Date.now();
    let isRunning = true;

    const gameLoop = (currentTime: number) => {
      // Check if game should continue using refs (avoids stale closures)
      if (!isRunning || gameCompletedRef.current || gameOverRef.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      
      const now = Date.now();
      
      // Calculate speed and density level based on score (every 10 points = +1 level)
      const speedLevel = Math.floor(scoreRef.current / 10);
      const speedMultiplier = 1 + (speedLevel * 0.3); // 30% speed increase per level
      const baseSpeed = 0.3 + Math.random() * 0.2; // Base speed: 0.3 to 0.5
      const finalSpeed = baseSpeed * speedMultiplier;
      
      // Spawn rate decreases (more bubbles) as level increases
      // Base: 1000-2000ms, Level 1: 800-1600ms, Level 2: 600-1200ms, etc.
      const baseSpawnMin = 1000;
      const baseSpawnMax = 2000;
      const spawnReduction = speedLevel * 200; // Reduce spawn time by 200ms per level
      const spawnMin = Math.max(300, baseSpawnMin - spawnReduction); // Minimum 300ms
      const spawnMax = Math.max(600, baseSpawnMax - spawnReduction); // Minimum 600ms
      const spawnInterval = spawnMin + Math.random() * (spawnMax - spawnMin);
      
      // Spawn bubbles more frequently as level increases
      if (now - lastSpawnTimeRef.current > spawnInterval) {
        // Spawn multiple bubbles at higher levels (1 bubble at level 0, 2 at level 1+, etc.)
        const bubblesToSpawn = 1 + Math.min(speedLevel, 2); // Max 3 bubbles at once
        
        for (let i = 0; i < bubblesToSpawn; i++) {
          const randomX = Math.floor(Math.random() * 4);
          const isGood = Math.random() > 0.55; // 45% chance of good, 55% chance of sin
          
          let newBubble: FallingBubble;
          
          if (isGood) {
            const randomItem = goodWords[Math.floor(Math.random() * goodWords.length)];
            newBubble = {
              id: `bubble-${Date.now()}-${Math.random()}-${i}`,
              item: randomItem,
              x: randomX,
              y: 0,
              speed: finalSpeed,
              collected: false,
              type: 'good'
            };
          } else {
            const randomSin = sins[Math.floor(Math.random() * sins.length)];
            newBubble = {
              id: `bubble-${Date.now()}-${Math.random()}-${i}`,
              item: randomSin,
              x: randomX,
              y: 0,
              speed: finalSpeed,
              collected: false,
              type: 'sin'
            };
          }
          
          setFallingBubbles(prev => [...prev, newBubble]);
        }
        
        lastSpawnTimeRef.current = now;
      }

      // Update bubble positions
      setFallingBubbles(prev => {
        return prev.map(bubble => {
          if (bubble.collected) return bubble;
          
          // Use consistent speed based on deltaTime (normalized to ~60fps)
          const normalizedSpeed = (deltaTime / 16.67) * bubble.speed;
          const newY = bubble.y + normalizedSpeed;
          
          // Calculate collision: bubble bottom touches runner top
          // Container is h-96 (384px), bubble is 48px (12.5%), runner is at bottom-16 (64px from bottom)
          // Runner bottom: 384px - 64px = 320px from top
          // Runner top: 320px - 48px (runner height) = 272px = ~71% from top
          // Runner center: ~77% from top
          // Bubble bottom = bubble.y + 12.5% (bubble height)
          // Bubble center = bubble.y + 6.25% (half bubble height)
          const bubbleBottom = newY + 12.5;
          const bubbleCenter = newY + 6.25;
          const runnerTop = 71; // Runner's top edge position (% from top)
          const runnerCenter = 77; // Runner's center position (% from top)
          const runnerBottom = 83; // Runner's bottom edge position (% from top)
          
          // Check collision: same x position
          if (bubble.x === runnerPositionRef.current && !bubble.collected) {
            // For good items: collect when bubble bottom touches runner top
            if (bubble.type === 'good' && bubbleBottom >= runnerTop && newY <= runnerTop + 5) {
              // Good item collected - increase score by 2 points
              const newScore = scoreRef.current + 2;
              scoreRef.current = newScore;
              setScore(newScore);
              
              if (!runnerCollectedRef.current.includes(bubble.item)) {
                const newCollected = [...runnerCollectedRef.current, bubble.item];
                runnerCollectedRef.current = newCollected;
                setRunnerCollected(newCollected);
              }
              
              return { ...bubble, collected: true, y: newY };
            }
            
            // For sins: require FULL connection - bubble center must be within runner's vertical bounds
            if (bubble.type === 'sin' && bubbleCenter >= runnerTop && bubbleCenter <= runnerBottom) {
              // Sin fully connected - game over!
              gameOverRef.current = true;
              setGameOver(true);
              isRunning = false;
              return { ...bubble, collected: true, y: newY };
            }
          }
          
          // Remove bubble only if it falls completely off screen (past 100%)
          if (newY > 100) {
            return null;
          }
          
          return { ...bubble, y: newY };
        }).filter((bubble): bubble is FallingBubble => bubble !== null);
      });

      // Continue loop only if game is still running (check refs to avoid stale closures)
      if (isRunning && !gameCompletedRef.current && !gameOverRef.current) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      } else {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    };

    // Start the game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [game.type, goodWords, sins, setScore, setGameOver]);

  const handleRetry = () => {
    // Increment retry count when user clicks Retry
    const newCount = incrementRetryCount();
    setRetryCount(newCount);
    
    // Reset game states
    setGameOver(false);
    setGameCompleted(false);
    setScore(0);
    setRunnerPosition(0);
    setRunnerCollected([]);
    setFallingBubbles([]);
    runnerPositionRef.current = 0;
    runnerCollectedRef.current = [];
    scoreRef.current = 0;
    lastSpawnTimeRef.current = Date.now();
    gameCompletedRef.current = false;
    gameOverRef.current = false;
    
    // Force re-sync retry count after increment
    setTimeout(() => {
      const updatedCount = getRetryCount();
      setRetryCount(updatedCount);
    }, 0);
  };

  if (gameOver) {
    const currentRetryCount = getRetryCount();
    const maxRetries = 3;
    const canRetryNow = canRetry || currentRetryCount < maxRetries;

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
            You caught a sin bubble! Try again!
          </p>
          {!canRetry && currentRetryCount < maxRetries && (
            <div className={`mb-6 px-6 py-3 rounded-xl shadow-md ${
              currentRetryCount === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200' :
              currentRetryCount === 1 ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200' :
              'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200'
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
              className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 rounded-xl hover:scale-105 active:scale-95"
            >
              Retry
              <RotateCcw className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/signup-today")}
              className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-700 rounded-xl hover:scale-105 active:scale-95"
            >
              Sign in to get unlimited turns
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
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
            <span className="text-5xl">🎉</span>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">🎉 Activity Complete!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed">{game.encouragement}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <div className="flex flex-nowrap items-center justify-between gap-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-purple-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
          Joy Runner
        </h3>
        <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-purple-200/50 shadow-xl ring-2 ring-purple-100/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
            <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              Score: <span className="text-gray-900">{score}</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative bg-gradient-to-b from-sky-300 via-blue-400 to-cyan-400 rounded-2xl p-6 mb-6 overflow-hidden shadow-2xl border-2 border-blue-300/50"
        style={{ minHeight: '450px' }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-cyan-300/30 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        {/* Ground/Platform with 3D effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-500 via-green-400 to-green-300 border-t-4 border-green-600 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-green-200/50 to-transparent"></div>
          {/* Platform lines for depth */}
          <div className="absolute top-2 left-0 right-0 h-px bg-green-600/30"></div>
          <div className="absolute top-4 left-0 right-0 h-px bg-green-600/20"></div>
        </div>
        
        {/* Runner character with glow effect */}
        <div 
          className="absolute bottom-20 text-4xl md:text-7xl lg:text-8xl transition-all duration-300 z-30 drop-shadow-2xl filter"
          style={{ 
            left: `${12.5 + runnerPosition * 25}%`,
            transform: 'translateX(-50%)',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))'
          }}
        >
          🏃
        </div>
        
        {/* Falling Bubbles with enhanced effects */}
        {fallingBubbles.map((bubble) => {
          const bubbleLeft = `${12.5 + bubble.x * 25}%`;
          const isSin = bubble.type === 'sin';
          
          return (
            <div
              key={bubble.id}
              className={`absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-200 ${
                bubble.collected
                  ? 'opacity-0 scale-0'
                  : isSin
                  ? 'opacity-100 scale-100 bg-gradient-to-br from-red-500 via-red-600 to-red-700 border-red-800 shadow-2xl ring-2 ring-red-400/50 animate-pulse'
                  : 'opacity-100 scale-100 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500 border-violet-700 shadow-2xl ring-2 ring-purple-300/50'
              }`}
              style={{
                left: bubbleLeft,
                top: `${bubble.y}%`,
                transform: 'translateX(-50%)',
                transition: bubble.collected ? 'opacity 0.3s, transform 0.3s' : 'none',
                filter: isSin ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' : 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.6))'
              }}
            >
              <span className="text-xs md:text-sm font-bold text-white drop-shadow-md">{bubble.item}</span>
            </div>
          );
        })}
        
        {/* Enhanced Clouds for decoration */}
        <div className="absolute top-6 left-12 w-20 h-10 bg-white/40 rounded-full opacity-70 z-0 blur-sm animate-pulse"></div>
        <div className="absolute top-4 left-32 w-16 h-8 bg-white/30 rounded-full opacity-60 z-0 blur-sm"></div>
        <div className="absolute top-12 right-24 w-24 h-12 bg-white/40 rounded-full opacity-70 z-0 blur-sm animate-pulse delay-500"></div>
        <div className="absolute top-8 right-12 w-20 h-10 bg-white/30 rounded-full opacity-60 z-0 blur-sm"></div>
      </div>
      
      {/* Modern Controls */}
      <div className="flex flex-nowrap gap-4 justify-center">
        <Button
          onClick={() => setRunnerPosition(Math.max(0, runnerPosition - 1))}
          className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 whitespace-nowrap"
          disabled={runnerPosition === 0}
        >
          ← Move Left
        </Button>
        <Button
          onClick={() => setRunnerPosition(Math.min(3, runnerPosition + 1))}
          className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 whitespace-nowrap"
          disabled={runnerPosition === 3}
        >
          Move Right →
        </Button>
      </div>
      
      {/* Instructions with modern styling */}
      <div className="bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"></span>
            Move the runner left/right to catch good bubbles (purple)
          </span>
          <br className="hidden sm:block" />
          <span className="inline-flex items-center gap-2 mt-2 sm:mt-0 sm:ml-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600"></span>
            <span className="text-red-600 font-semibold">Avoid red bubbles = Game Over!</span>
          </span>
        </p>
      </div>
    </div>
  );
}


