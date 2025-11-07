import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface FallingBubble {
  id: string;
  item: string;
  x: number; // horizontal position (0-3)
  y: number; // vertical position (0-100%)
  speed: number;
  collected: boolean;
  type: 'good' | 'sin'; // Type of item
}

const JoyRunnerTest = () => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [runnerPosition, setRunnerPosition] = useState(0); // 0-3 positions
  const [runnerCollected, setRunnerCollected] = useState<string[]>([]);
  const [fallingBubbles, setFallingBubbles] = useState<FallingBubble[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now());
  const runnerPositionRef = useRef(0);
  const runnerCollectedRef = useRef<string[]>([]);
  const scoreRef = useRef(0);

  // Good words limited to 5 letters or less
  const allGoodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light', 'Glory', 'Bless', 'Honor', 'Power', 'Cross', 'Heart', 'Unity', 'Serve', 'Share', 'Guide', 'Angel', 'Saint'];
  const goodWords = allGoodWords.filter(word => word.length <= 5);
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth', 'Lies', 'Hate', 'Fear', 'Anger', 'Doubt', 'Shame', 'Guilt'];

  const game = {
    title: 'Joy Runner',
    description: 'Catch falling bubbles of joy and peace!',
    verse: 'May the God of hope fill you with all joy and peace as you trust in him.',
    reference: 'Romans 15:13',
    type: 'runner',
    collectibles: goodWords,
    targetCollect: 10,
    encouragement: 'Amazing! Your peace is a gift from God. Share it with others!'
  };

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

  // Game loop for falling bubbles
  useEffect(() => {
    if (gameCompleted || gameOver) return;

    let lastFrameTime = Date.now();

    const gameLoop = (currentTime: number) => {
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
              setGameOver(true);
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

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameCompleted, gameOver]);

  const handleReset = () => {
    setGameCompleted(false);
    setGameOver(false);
    setScore(0);
    setRunnerPosition(0);
    setRunnerCollected([]);
    setFallingBubbles([]);
    runnerPositionRef.current = 0;
    runnerCollectedRef.current = [];
    scoreRef.current = 0;
    lastSpawnTimeRef.current = Date.now();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-purple-100/50">
          {/* Game Content */}
          {gameOver ? (
            /* Game Over Screen */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                <span className="text-4xl">💀</span>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Game Over!</h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  You touched a sin! Avoid the red bubbles and collect only the good words.
                </p>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border-2 border-purple-200">
                  <p className="text-sm font-semibold text-purple-600 mb-1">Final Score</p>
                  <p className="text-3xl font-bold text-purple-700">{score}</p>
                </div>
              </div>
              <Button
                onClick={handleReset}
                className="px-8 py-4 text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
              >
                Try Again
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ) : !gameCompleted ? (
            <div className="space-y-6">
              {/* Joy Runner Game */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Joy Runner</h3>
                  <div className="bg-white px-4 py-2 rounded-full border-2 border-violet-300">
                    <span className="text-sm font-bold text-violet-600">
                      Score: {score}
                    </span>
                  </div>
                </div>
                
                {/* Game Area */}
                <div 
                  ref={gameAreaRef}
                  className="relative bg-gradient-to-b from-sky-200 to-blue-300 rounded-xl p-6 mb-4 h-96 overflow-hidden"
                >
                  {/* Ground/Platform */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-400 to-green-300 border-t-2 border-green-500 z-20"></div>
                  
                  {/* Runner character */}
                  <div 
                    className="absolute bottom-16 text-2xl transition-all duration-200 z-30"
                    style={{ 
                      left: `${12.5 + runnerPosition * 25}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    🏃
                  </div>
                  
                  {/* Falling Bubbles */}
                  {fallingBubbles.map((bubble) => {
                    const bubbleLeft = `${12.5 + bubble.x * 25}%`;
                    const isSin = bubble.type === 'sin';
                    
                    return (
                      <div
                        key={bubble.id}
                        className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${
                          bubble.collected
                            ? 'opacity-0 scale-0 transition-all duration-300'
                            : isSin
                            ? 'opacity-100 scale-100 bg-gradient-to-br from-red-500 to-red-600 border-red-700 shadow-lg'
                            : 'opacity-100 scale-100 bg-gradient-to-br from-violet-300 to-purple-400 border-violet-600 shadow-lg'
                        }`}
                        style={{
                          left: bubbleLeft,
                          top: `${bubble.y}%`,
                          transform: 'translateX(-50%)',
                          transition: bubble.collected ? 'opacity 0.3s, transform 0.3s' : 'none'
                        }}
                      >
                        <span className="text-xs font-bold text-white">{bubble.item}</span>
                      </div>
                    );
                  })}
                  
                  {/* Clouds for decoration */}
                  <div className="absolute top-4 left-10 w-16 h-8 bg-white/30 rounded-full opacity-60 z-0"></div>
                  <div className="absolute top-8 right-20 w-20 h-10 bg-white/30 rounded-full opacity-60 z-0"></div>
                </div>
                
                {/* Controls */}
                <div className="flex gap-2 justify-center mb-4">
                  <Button
                    onClick={() => setRunnerPosition(Math.max(0, runnerPosition - 1))}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6"
                    disabled={runnerPosition === 0}
                  >
                    ← Move Left
                  </Button>
                  <Button
                    onClick={() => setRunnerPosition(Math.min(3, runnerPosition + 1))}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6"
                    disabled={runnerPosition === 3}
                  >
                    Move Right →
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Move the runner left/right to catch good bubbles (purple) and avoid sins (red)! 
                  <br />
                  <span className="text-red-600 font-semibold">Red bubbles = Game Over!</span>
                </p>
              </div>
            </div>
          ) : (
            /* Completion Screen */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🎉 Activity Complete!</h3>
                <p className="text-gray-700 text-base leading-relaxed">{game.encouragement}</p>
              </div>
              <Button
                onClick={handleReset}
                className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
              >
                Play Again
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoyRunnerTest;

