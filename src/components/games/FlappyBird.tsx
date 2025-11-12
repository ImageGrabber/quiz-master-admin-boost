import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Pipe {
  id: string;
  x: number;
  topHeight: number;
  gap: number;
  passed: boolean;
}

interface Collectible {
  id: string;
  x: number;
  y: number;
  collected: boolean;
}

interface FlappyBirdProps {
  game: {
    title: string;
    description: string;
    verse: string;
    reference: string;
    type: string;
    encouragement: string;
  };
  score: number;
  setScore: (score: number) => void;
  gameCompleted: boolean;
  setGameCompleted: (completed: boolean) => void;
  gameOver: boolean;
  setGameOver: (over: boolean) => void;
  canRetry: boolean;
  goodWords: string[];
  sins: string[];
}

export function FlappyBird({
  game,
  score,
  setScore,
  gameCompleted,
  setGameCompleted,
  gameOver,
  setGameOver,
  canRetry,
  goodWords,
  sins,
}: FlappyBirdProps) {
  const navigate = useNavigate();
  const [birdY, setBirdY] = useState(200);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [gameReady, setGameReady] = useState(false); // Game screen loaded
  const [gameStarted, setGameStarted] = useState(false); // Gravity active
  const [gameHeight, setGameHeight] = useState(400);
  const [isMobile, setIsMobile] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const birdYRef = useRef(200);
  const birdVelocityRef = useRef(0);
  const scoreRef = useRef(0);
  const pipeIdCounterRef = useRef(0);
  const lastPipeXRef = useRef(0);

  const GRAVITY = 0.4;
  const JUMP_STRENGTH = -6;
  const PIPE_SPEED = 3;
  const PIPE_SPACING = 250;
  const PIPE_GAP = 150;
  const BIRD_SIZE = 40;

  // Set responsive game height and detect mobile
  useEffect(() => {
    const updateGameHeight = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        // Mobile: taller height
        setGameHeight(600);
      } else {
        // Desktop: standard height
        setGameHeight(400);
      }
    };

    updateGameHeight();
    window.addEventListener('resize', updateGameHeight);
    return () => window.removeEventListener('resize', updateGameHeight);
  }, []);

  // Initialize game
  useEffect(() => {
    if (game.type === 'flappy') {
      resetGame();
    }
  }, [game.type]);

  const resetGame = () => {
    const initialY = gameHeight / 2;
    setBirdY(initialY);
    setBirdVelocity(0);
    setPipes([]);
    setCollectibles([]);
    setGameOver(false);
    setGameCompleted(false);
    setGameReady(false);
    setGameStarted(false);
    birdYRef.current = initialY;
    birdVelocityRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    pipeIdCounterRef.current = 0;
    lastPipeXRef.current = 0;
  };

  // Handle click/tap to jump
  const handleJump = useCallback(() => {
    if (!gameStarted || gameOver || gameCompleted) return;
    birdVelocityRef.current = JUMP_STRENGTH;
    setBirdVelocity(JUMP_STRENGTH);
  }, [gameStarted, gameOver, gameCompleted]);

  const handleLoadGame = () => {
    const initialY = gameHeight / 2;
    setGameReady(true);
    setGameOver(false);
    setGameCompleted(false);
    setScore(0);
    scoreRef.current = 0;
    setBirdY(initialY);
    birdYRef.current = initialY;
    setBirdVelocity(0);
    birdVelocityRef.current = 0;
    setPipes([]);
    setCollectibles([]);
    pipeIdCounterRef.current = 0;
    lastPipeXRef.current = 0;
  };

  const handleStartGame = () => {
    if (!gameReady) return;
    setGameStarted(true);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!gameReady) {
          // If game screen not loaded, load it
          handleLoadGame();
        } else if (!gameStarted) {
          // If game screen loaded but not started, start it
          handleStartGame();
        } else if (!gameOver && !gameCompleted) {
          // If game is running, jump
          handleJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameReady, gameStarted, gameOver, gameCompleted, handleJump]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameCompleted || gameOver) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let lastTime = Date.now();

    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Update bird physics
      let newBirdY = birdYRef.current;
      let newBirdVelocity = birdVelocityRef.current;

      // Apply gravity
      newBirdVelocity += GRAVITY;
      newBirdY += newBirdVelocity;

      // Boundary checks
      if (newBirdY < 0) {
        newBirdY = 0;
        newBirdVelocity = 0;
      }
      if (newBirdY > gameHeight - BIRD_SIZE) {
        newBirdY = gameHeight - BIRD_SIZE;
        setGameOver(true);
      }

      birdYRef.current = newBirdY;
      birdVelocityRef.current = newBirdVelocity;
      setBirdY(newBirdY);
      setBirdVelocity(newBirdVelocity);

      // Update pipes
      setPipes(prev => {
        const updated = prev.map(pipe => {
          const newX = pipe.x - PIPE_SPEED;

          // Check collision with bird
          const birdLeft = 80;
          const birdRight = 80 + BIRD_SIZE;
          const birdTop = newBirdY;
          const birdBottom = newBirdY + BIRD_SIZE;

          const pipeLeft = newX;
          const pipeRight = newX + 60;
          const pipeTopBottom = pipe.topHeight;
          const pipeBottomTop = pipe.topHeight + pipe.gap;

          // Collision with top or bottom pipe
          if (
            birdRight > pipeLeft &&
            birdLeft < pipeRight &&
            (birdTop < pipeTopBottom || birdBottom > pipeBottomTop)
          ) {
            setGameOver(true);
          }

          // Score point when passing pipe
          if (!pipe.passed && newX + 60 < birdLeft) {
            scoreRef.current += 1;
            setScore(scoreRef.current);
            return { ...pipe, passed: true };
          }

          return { ...pipe, x: newX };
        }).filter(pipe => pipe.x > -100); // Remove off-screen pipes

        // Add new pipes
        const rightmostPipe = updated.length > 0 
          ? Math.max(...updated.map(p => p.x))
          : 0;
        
        if (rightmostPipe < 600 - PIPE_SPACING) {
          const minHeight = 50;
          const maxHeight = gameHeight - PIPE_GAP - 50;
          const topHeight = minHeight + Math.random() * (maxHeight - minHeight);
          
          const newPipe = {
            id: `pipe-${pipeIdCounterRef.current++}`,
            x: 600,
            topHeight,
            gap: PIPE_GAP,
            passed: false,
          };
          
          updated.push(newPipe);

          // Add collectible star in the gap
          setCollectibles(prev => [
            ...prev,
            {
              id: `star-${Date.now()}-${Math.random()}`,
              x: 600 + 30,
              y: topHeight + PIPE_GAP / 2,
              collected: false,
            }
          ]);
        }

        return updated;
      });

      // Update collectibles
      setCollectibles(prev => {
        return prev.map(collectible => {
          if (collectible.collected) return collectible;

          const newX = collectible.x - PIPE_SPEED;

          // Check collision with bird
          const birdLeft = 80;
          const birdRight = 80 + BIRD_SIZE;
          const birdTop = newBirdY;
          const birdBottom = newBirdY + BIRD_SIZE;

          const collectibleLeft = newX - 15;
          const collectibleRight = newX + 15;
          const collectibleTop = collectible.y - 15;
          const collectibleBottom = collectible.y + 15;

          if (
            birdRight > collectibleLeft &&
            birdLeft < collectibleRight &&
            birdBottom > collectibleTop &&
            birdTop < collectibleBottom
          ) {
            scoreRef.current += 5;
            setScore(scoreRef.current);
            return { ...collectible, collected: true };
          }

          return { ...collectible, x: newX };
        }).filter(c => c.x > -50 && !c.collected);
      });

      if (gameStarted && !gameCompleted && !gameOver) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameCompleted, gameOver, setScore, setGameOver, gameHeight]);

  const handleRetry = () => {
    const initialY = gameHeight / 2;
    setGameOver(false);
    setGameCompleted(false);
    setScore(0);
    scoreRef.current = 0;
    setBirdY(initialY);
    birdYRef.current = initialY;
    setBirdVelocity(0);
    birdVelocityRef.current = 0;
    setPipes([]);
    setCollectibles([]);
    setGameReady(true);
    setGameStarted(false);
    pipeIdCounterRef.current = 0;
    lastPipeXRef.current = 0;
  };

  // Auto-retry when game over if unlimited retries enabled
  useEffect(() => {
    if (gameOver && canRetry) {
      const timer = setTimeout(() => {
        handleRetry();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameOver, canRetry]);

  if (gameOver && !canRetry) {
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
            You hit an obstacle! Try again!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetry}
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
            <span className="text-5xl">🎉</span>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-green-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">🎉 Amazing Flight!</h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 leading-relaxed">{game.encouragement}</p>
        </div>
      </div>
    );
  }

  if (!gameReady) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl p-8 border border-teal-200/50 shadow-xl">
          <h3 className="text-2xl font-urbanist font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Flappy Bird
          </h3>
          <p className="text-lg font-urbanist font-medium text-gray-700 mb-6">
            Press Space or click Start to begin! Then tap or press Space to fly!
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto mb-6">
            <p className="text-sm font-urbanist text-gray-600">
              <strong>Controls:</strong>
            </p>
            <p className="text-sm font-urbanist text-gray-600">
              • Press Space to start the game
            </p>
            <p className="text-sm font-urbanist text-gray-600">
              • Click/Tap or Space to flap and fly up
            </p>
            <p className="text-sm font-urbanist text-gray-600">
              • Avoid green pipes (obstacles)
            </p>
            <p className="text-sm font-urbanist text-gray-600">
              • Collect stars ⭐ for bonus points
            </p>
            <p className="text-sm font-urbanist text-gray-600">
              • Score points by passing through pipes
            </p>
          </div>
          <Button
            onClick={handleLoadGame}
            className="px-8 py-6 text-base md:text-lg font-urbanist font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 rounded-xl hover:scale-105 active:scale-95"
          >
            Start Game
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <div className="flex flex-nowrap items-center justify-between gap-4 bg-gradient-to-r from-teal-50 via-cyan-50 to-teal-50 rounded-2xl p-6 border border-teal-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
        <h3 className="text-xl md:text-2xl font-urbanist font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap">
          Flappy Bird
        </h3>
        <div className="bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl border border-teal-200/50 shadow-xl ring-2 ring-teal-100/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse"></div>
            <span className="text-base md:text-lg font-urbanist font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap">
              Score: <span className="text-gray-900">{score}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        onClick={() => {
          if (!gameStarted && gameReady) {
            handleStartGame();
          } else if (gameStarted) {
            handleJump();
          }
        }}
        className="relative bg-gradient-to-b from-sky-300 via-cyan-400 to-teal-400 rounded-2xl mb-6 overflow-hidden shadow-2xl border-2 border-teal-300/50 cursor-pointer"
        style={{ height: `${gameHeight}px`, width: '100%' }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-40 h-40 bg-teal-300/30 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        {/* Pipes */}
        {pipes.map((pipe) => (
          <div key={pipe.id}>
            {/* Top pipe */}
            <div
              className="absolute bg-gradient-to-r from-green-600 via-green-500 to-green-600 border-2 border-green-700 shadow-xl"
              style={{
                left: `${pipe.x}px`,
                top: 0,
                width: '60px',
                height: `${pipe.topHeight}px`,
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-700 to-green-600 border-t-2 border-green-800"></div>
            </div>
            {/* Bottom pipe */}
            <div
              className="absolute bg-gradient-to-r from-green-600 via-green-500 to-green-600 border-2 border-green-700 shadow-xl"
              style={{
                left: `${pipe.x}px`,
                top: `${pipe.topHeight + pipe.gap}px`,
                width: '60px',
                height: `${gameHeight - pipe.topHeight - pipe.gap}px`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-green-700 to-green-600 border-b-2 border-green-800"></div>
            </div>
          </div>
        ))}

        {/* Collectibles (stars) */}
        {collectibles.map((collectible) => {
          if (collectible.collected) return null;
          return (
            <div
              key={collectible.id}
              className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 border-2 border-yellow-600 flex items-center justify-center shadow-xl ring-2 ring-yellow-300/50 animate-pulse"
              style={{
                left: `${collectible.x}px`,
                top: `${collectible.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              ⭐
            </div>
          );
        })}

        {/* Bird */}
        <div
          className="absolute text-2xl md:text-3xl z-30 drop-shadow-2xl"
          style={{
            left: '80px',
            top: `${birdY}px`,
            transform: 'translateY(-50%) rotate(-90deg)',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 20px rgba(20, 184, 166, 0.3))',
          }}
        >
          🕊️
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-500 via-green-400 to-green-300 border-t-4 border-green-600 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-green-200/50 to-transparent"></div>
        </div>

        {/* Press Space to Start Overlay */}
        {gameReady && !gameStarted && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 border-2 border-teal-300/50 shadow-2xl text-center">
              <p className="text-2xl font-urbanist font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {isMobile ? 'Touch the screen to start' : 'Press Space to Start'}
              </p>
              {!isMobile && (
                <p className="text-sm font-urbanist text-gray-600">
                  Or click anywhere on the game area
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Controls Info */}
      <div className="bg-gradient-to-r from-gray-50 to-teal-50/50 rounded-xl p-4">
        <p className="text-sm font-urbanist font-medium text-gray-700 text-center">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"></span>
            Click/Tap or press Space to flap! Avoid pipes and collect stars ⭐!
          </span>
        </p>
      </div>
    </div>
  );
}

