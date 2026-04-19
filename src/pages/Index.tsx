import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, Calendar, HelpCircle, CheckCircle, Globe, Menu, Crown, Medal, Search, X, ChevronLeft, ChevronRight, MessageSquare, Rocket, Sparkles, Heart, Droplet, ArrowLeft, RotateCcw, TrendingUp, Shield, Eye, EyeOff } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { features, howItWorks, bibleTestimonials, stats, publicPages } from "@/data/indexData";
import { emotionOptions, cbtQuestionsByEmotion, thinkingTrapsInfo, featureSteps, cbtNeutralByDay } from "@/data/emotions";
import { FaqSection } from "@/components/FaqSection";
import { StickyPrayerRequestsPanel } from "@/components/StickyPrayerRequestsPanel";
import { StickyLeaderboardPanel } from "@/components/StickyLeaderboardPanel";
import { Navigation } from "@/components/Navigation";

interface FallingBubble {
  id: string;
  item: string;
  x: number; // horizontal position (0-3)
  y: number; // vertical position (0-100%)
  speed: number;
  collected: boolean;
  type: 'good' | 'sin'; // Type of item
}


// StickyLeaderboardPanel moved to @/components/StickyLeaderboardPanel.tsx

// StickyPrayerRequestsPanel moved to @/components/StickyPrayerRequestsPanel.tsx

// Public pages searchable content - comprehensive list
// Moved to @/data/indexData.ts

// Emotional Check-In Data - moved to @/data/emotionData.ts

function EmotionalCheckInHero() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(2.5);
  const [showWaterIntake, setShowWaterIntake] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const [isDragging, setIsDragging] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCognitiveRestructuring, setShowCognitiveRestructuring] = useState(false);
  const [showVerseCard, setShowVerseCard] = useState(false);
  const [showBibleGame, setShowBibleGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameAnswers, setGameAnswers] = useState<any>({});
  const [retryCount, setRetryCount] = useState(0);
  const [selectedGameType, setSelectedGameType] = useState<'memory' | 'runner' | null>(null);
  // Game-specific states
  const [match3Grid, setMatch3Grid] = useState<string[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);
  const [memoryCards, setMemoryCards] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [puzzleTiles, setPuzzleTiles] = useState<string[]>([]);
  const [poppedBubbles, setPoppedBubbles] = useState<string[]>([]);
  const [runnerPosition, setRunnerPosition] = useState(0);
  const [runnerCollected, setRunnerCollected] = useState<string[]>([]);
  const [fallingBubbles, setFallingBubbles] = useState<FallingBubble[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now());
  const runnerPositionRef = useRef(0);
  const runnerCollectedRef = useRef<string[]>([]);
  const scoreRef = useRef(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [thinkingTrap, setThinkingTrap] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<any>(null);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [cardDirection, setCardDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const glassRef = useRef<HTMLDivElement>(null);

  // Thought Record state
  const [isThoughtRecordOpen, setIsThoughtRecordOpen] = useState(false);
  const [thoughtRecordStep, setThoughtRecordStep] = useState(1);
  const [trStep1, setTrStep1] = useState('');
  const [trStep2, setTrStep2] = useState<{ emotion: string; intensity: number }[]>([
    { emotion: 'Anxious', intensity: 80 }
  ]);
  const [trStep3, setTrStep3] = useState('');
  const [trStep4, setTrStep4] = useState<string[]>([]);
  const [trStep5, setTrStep5] = useState('');
  const [trStep6, setTrStep6] = useState('');
  const [trStep7, setTrStep7] = useState<{ emotion: string; originalIntensity: number; newIntensity: number }[]>([]);

  const currentEmotionIndex = Math.round(sliderValue);
  const currentEmotion = emotionOptions[currentEmotionIndex];

  // Initialize step 7 (re-rate emotion) when entering step 3
  useEffect(() => {
    if (thoughtRecordStep === 3 && trStep7.length === 0 && trStep2.length > 0) {
      setTrStep7(trStep2.map(e => ({ emotion: e.emotion, originalIntensity: e.intensity, newIntensity: e.intensity })));
    }
  }, [thoughtRecordStep, trStep2, trStep7.length]);

  // Helper functions for retry tracking
  const getRetryCount = (): number => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('memoryGameRetries');
    if (!stored) return 0;
    try {
      const data = JSON.parse(stored);
      // Reset if it's a different day
      if (data.date !== today) return 0;
      return data.count || 0;
    } catch {
      return 0;
    }
  };

  const incrementRetryCount = (): number => {
    const today = new Date().toDateString();
    const currentCount = getRetryCount();
    const newCount = currentCount + 1;
    localStorage.setItem('memoryGameRetries', JSON.stringify({
      date: today,
      count: newCount
    }));
    return newCount;
  };

  const resetRetryCount = () => {
    localStorage.removeItem('memoryGameRetries');
  };

  // Check if retry count needs to reset (new day) and reset game state if needed
  useEffect(() => {
    const currentRetryCount = getRetryCount();
    setRetryCount(currentRetryCount);

    // Always reset game-related states on mount to prevent auto-showing
    // This ensures users start fresh each time they visit the page
    // Use a small timeout to ensure this runs after any other initialization
    const resetGameStates = () => {
      setShowBibleGame(false);
      setGameOver(false);
      setGameCompleted(false);
      setShowVerseCard(false);
      setScore(0);
      setMemoryFlipped([]);
      setMemoryMatched([]);
      setMemoryMoves(0);
      setSelectedGameType(null);
    };

    // Reset immediately
    resetGameStates();

    // Also reset after a brief delay to catch any race conditions
    const timeoutId = setTimeout(resetGameStates, 100);

    return () => clearTimeout(timeoutId);
  }, []); // Run once on mount to check for day change

  // Initialize Bible game states when game starts
  useEffect(() => {
    if (showBibleGame && !gameCompleted && !gameOver) {
      // If no game type selected yet, randomly choose one
      if (!selectedGameType) {
        const randomType = Math.random() < 0.5 ? 'memory' : 'runner';
        setSelectedGameType(randomType);
      }

      const game = getBibleGameActivity(selectedEmotion, selectedGameType || undefined);
      // Reset all game states
      setMatches(0);
      setSelectedTiles([]);
      setCollectedItems([]);
      setMemoryFlipped([]);
      setMemoryMatched([]);
      setMemoryCards([]);
      setMemoryMoves(0);
      setPoppedBubbles([]);
      setRunnerPosition(0);
      setRunnerCollected([]);
      setFallingBubbles([]);
      setScore(0);
      setGameOver(false);
      // Always sync retry count from localStorage when game initializes
      const currentRetryCount = getRetryCount();
      setRetryCount(currentRetryCount);
      runnerPositionRef.current = 0;
      runnerCollectedRef.current = [];
      scoreRef.current = 0;
      lastSpawnTimeRef.current = Date.now();

      // Initialize match-3 grid
      if (game.type === 'match3') {
        const gridWords = [...game.words, ...game.words, ...game.words].slice(0, 9);
        setMatch3Grid(gridWords);
      }

      // Initialize puzzle tiles
      if (game.type === 'puzzle') {
        const text = game.puzzleText;
        const chars = text.split('').filter(c => c !== ' ');
        setPuzzleTiles([...chars, ''].sort(() => Math.random() - 0.5));
      }

      // Initialize memory cards
      if (game.type === 'memory') {
        // Duplicate each word to create pairs (each word appears twice)
        const allGoodCards = [...game.pairs, ...game.pairs];
        const allSinCards = [...game.sinPairs, ...game.sinPairs];
        const allCards = [...allGoodCards, ...allSinCards].sort(() => Math.random() - 0.5);
        setMemoryCards(allCards);
      }
    }
  }, [showBibleGame, gameCompleted, selectedEmotion, selectedGameType]);

  // Map thinking trap IDs to distortion names
  const getDistortionName = (trapId: string | null): string => {
    const mapping: { [key: string]: string } = {
      'self-blame': 'Self-Blame',
      'overgeneralization': 'Overgeneralization',
      'catastrophizing': 'Catastrophizing',
      'fortune-telling': 'Fortune Telling',
      'all-or-nothing': 'All-or-Nothing Thinking',
      'labeling': 'Labeling',
      'mind-reading': 'Mind Reading',
      'mental-filter': 'Mental Filter',
      'comparison': 'Comparison',
      'jumping-to-conclusions': 'Jumping to Conclusions',
      'personalization': 'Personalization'
    };
    return trapId ? (mapping[trapId] || trapId) : '';
  };

  // Determine question set based on emotion and (for neutral) day of week
  const cbtQuestions = useMemo(() => {
    if (!selectedEmotion) return cbtQuestionsByEmotion.negative;

    const emotionId = selectedEmotion.id;
    if (emotionId === "very-anxious" || emotionId === "anxious" || emotionId === "stressed" || emotionId === "sad") {
      return cbtQuestionsByEmotion.negative;
    } else if (emotionId === "okay") {
      const dayIndex = new Date().getDay(); // 0 Sun ... 6 Sat
      const dayKey = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayIndex];
      return cbtNeutralByDay[dayKey] || cbtNeutralByDay.sunday;
    } else {
      return cbtQuestionsByEmotion.positive;
    }
  }, [selectedEmotion]);

  useEffect(() => {
    const index = Math.round(sliderValue);
    setSelectedEmotion(emotionOptions[index]);
  }, [sliderValue]);

  // Reset question index and answers when emotion changes (before questions start)
  useEffect(() => {
    if (!showQuestions && selectedEmotion) {
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  }, [selectedEmotion, showQuestions]);

  const handleSliderConfirm = () => {
    // Ensure selectedEmotion is set based on current slider value
    const index = Math.round(sliderValue);
    const emotion = emotionOptions[index];
    setSelectedEmotion(emotion);

    // Reset question index when starting new session
    setCurrentQuestionIndex(0);
    setAnswers({});

    // Show water intake widget first
    setShowWaterIntake(true);
  };

  const handleWaterIntakeContinue = () => {
    // Save water intake to localStorage
    localStorage.setItem('waterIntake', JSON.stringify({
      amount: waterIntake,
      percentage: Math.round((waterIntake / 2250) * 100),
      date: new Date().toISOString()
    }));

    // Continue to questions after water intake
    setShowWaterIntake(false);
    setTimeout(() => {
      setShowQuestions(true);
    }, 100);
  };

  // Water intake drag handlers
  const maxWater = 2250; // ml (9 cups)
  const waterPercentage = (waterIntake / maxWater) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>();
  handleMouseMoveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !glassRef.current) return;

    const rect = glassRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) return;

    const y = clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - (y / height)));
    const newWater = Math.round(percentage * maxWater);
    setWaterIntake(newWater);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handleMouseMoveRef.current?.(e);
      };
      const handleEnd = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  const handleQuestionAnswer = (questionId: number, optionIndex: number, direction: 'up' | 'down') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    const exitDirection = direction === 'up' ? 'right' : 'left';
    setCardDirection(exitDirection);

    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < cbtQuestions.length - 1) {
        // Reset card position to opposite side for entrance
        setCardDirection(exitDirection === 'right' ? 'left' : 'right');
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // After a brief moment, animate card in
        setTimeout(() => {
          setCardDirection(null);
          setIsTransitioning(false);
        }, 50);
      } else {
        // Last question answered - analyze and show verse card
        analyzeThinkingTraps(newAnswers);
        setShowQuestions(false);
        setShowVerseCard(true);
        setIsTransitioning(false);
      }
    }, 400);
  };

  const analyzeThinkingTraps = (allAnswers: { [key: number]: number }) => {
    // Tailored analysis for neutral emotions based on the sum of all answers
    if (selectedEmotion?.id === "okay") {
      const answeredEntries = cbtQuestions
        .filter(q => allAnswers[q.id] !== undefined)
        .map(q => ({ question: q, optionIndex: allAnswers[q.id] }));

      const totalAnswered = answeredEntries.length;
      const yesItems = answeredEntries.filter(e => e.optionIndex === 0);
      const noItems = answeredEntries.filter(e => e.optionIndex === 1);
      const yesCount = yesItems.length;
      const noCount = noItems.length;

      const versePool = [
        {
          reference: "Jeremiah 29:11",
          text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
          quote: "God has good plans for you today. Take the next kind step."
        },
        {
          reference: "Philippians 4:13",
          text: "I can do all this through him who gives me strength.",
          quote: "You’re not alone—God strengthens you for what’s ahead."
        },
        {
          reference: "Psalm 139:14",
          text: "I praise you because I am fearfully and wonderfully made; your works are wonderful.",
          quote: "Treat yourself with the same care God has for you."
        }
      ];

      const pickVerse = () => versePool[Math.floor(Math.random() * versePool.length)];

      const sampleTexts = (arr: { question: any }[], n: number) =>
        arr.slice(0, n).map(e => `“${e.question.question}”`).join(' • ');

      let description: string;
      if (totalAnswered === 0) {
        description = "You're taking a healthy step by checking in. Keep nurturing your mind, body, and spirit today.";
      } else if (yesCount / totalAnswered >= 0.6) {
        const analysis = yesCount === totalAnswered
          ? `Analysis: Your consistent responses indicate you're currently experiencing multiple areas of challenge simultaneously. This pattern suggests you may be facing heightened stress, emotional overwhelm, or a period of significant life transition. The areas you've identified point to underlying patterns that may benefit from structured support and self-compassion practices.`
          : `Analysis: Your response pattern reveals heightened awareness around specific challenges. This suggests you're in a phase of active self-reflection and may be experiencing increased sensitivity to stressors. The areas you've identified indicate where your emotional energy is currently focused and where targeted support could be most beneficial.`;
        description = analysis;
      } else if (noCount / totalAnswered >= 0.6) {
        const analysis = noCount === totalAnswered
          ? `Analysis: Your consistent responses reveal a pattern of emotional stability and resilience. This suggests you're currently in a grounded state, with healthy coping mechanisms in place. However, this pattern may also indicate a tendency to minimize or avoid acknowledging challenges. The areas where you responded may represent domains where you're maintaining boundaries or where you've developed effective strategies. Consider whether this steadiness reflects genuine wellness or if there are underlying concerns that might benefit from gentle exploration.`
          : `Analysis: Your response pattern indicates you're maintaining emotional equilibrium in most areas. This suggests you have effective coping strategies and are managing stress well. However, it's worth noting that consistently responding this way might also reflect a tendency to minimize challenges or avoid deeper self-examination. The areas you've identified suggest you're either well-resourced in these domains or may benefit from gentle self-inquiry to ensure you're not overlooking subtle signs of stress or unmet needs.`;
        description = analysis;
      } else {
        description = `Analysis: Your balanced responses reveal a nuanced self-awareness. This pattern suggests you're able to distinguish between areas of strength and areas needing attention—a sign of emotional intelligence. The mix indicates you're neither over-identifying with challenges nor denying them, which points to healthy self-reflection. This balanced perspective allows for targeted growth while maintaining appreciation for what's working well in your life.`;
      }

      const taskYes = "Read Philippians 4:6–7 and pray for 2 minutes, surrendering one worry.";
      const taskNo = "Read Psalm 23 slowly and thank God for one way He cared for you this week.";
      const taskBalanced = "Read Jeremiah 29:11 and journal one hope for this week.";

      const personalized = {
        name: "Wellness Insight",
        description,
        verses: [pickVerse()],
        task: totalAnswered === 0 ? taskBalanced : (yesCount / totalAnswered >= 0.6 ? taskYes : (noCount / totalAnswered >= 0.6 ? taskNo : taskBalanced))
      };

      thinkingTrapsInfo['wellness'] = personalized;
      setThinkingTrap('wellness');
      setSelectedVerse(personalized.verses[0]);
      // Verse card will be shown, then game will be triggered from there

      const checkInData = {
        emotion: selectedEmotion?.id,
        thinkingTrap: 'wellness',
        date: new Date().toISOString(),
        verse: personalized.verses[0].reference
      };
      localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
      localStorage.setItem('emotionalCheckInDate', new Date().toDateString());

      // Store detailed payload for the standalone page
      const detail = {
        emotion: selectedEmotion?.id,
        trapId: 'wellness',
        isWellness: true,
        insightName: personalized.name,
        insightDescription: personalized.description,
        insightTask: personalized.task,
        verseReference: personalized.verses[0].reference,
        verseText: personalized.verses[0].text,
        verseQuote: personalized.verses[0].quote
      };
      localStorage.setItem('emotionalCheckInDetail', JSON.stringify(detail));
      // Don't navigate immediately - show encouragement screen first
      return;
    }

    // Standard thinking trap analysis for negative/positive emotions
    const trapCounts: { [key: string]: number } = {};

    cbtQuestions.forEach((question) => {
      const answerIndex = allAnswers[question.id];
      if (answerIndex !== undefined && question.thinkingTraps[answerIndex]) {
        question.thinkingTraps[answerIndex].forEach(trap => {
          if (trap !== 'neutral') {
            trapCounts[trap] = (trapCounts[trap] || 0) + 1;
          }
        });
      }
    });

    const sortedTraps = Object.entries(trapCounts).sort((a, b) => b[1] - a[1]);
    const primaryTrap = sortedTraps.length > 0 ? sortedTraps[0][0] : 'self-blame';

    setThinkingTrap(primaryTrap);

    const trapInfo = thinkingTrapsInfo[primaryTrap];
    // Assign a small Bible-related task per trap (non-mutating fallback if already present)
    const trapTasks: { [key: string]: string } = {
      'self-blame': "Read Romans 8:1 and write down one thing you’re releasing to God today.",
      'overgeneralization': "Read Lamentations 3:22–23 and note one fresh mercy you see today.",
      'catastrophizing': "Read Matthew 6:34 and pray a one-sentence prayer for today only.",
      'fortune-telling': "Read Jeremiah 29:11 and list one hopeful outcome you can trust God with.",
      'all-or-nothing': "Read 2 Corinthians 12:9 and write one area to accept grace.",
      'labeling': "Read 1 John 3:1 and affirm: ‘I am a beloved child of God.’",
      'mind-reading': "Read 1 Samuel 16:7 and pray to see yourself and others as God does.",
      'mental-filter': "Read Philippians 4:8 and write three true and good things about today.",
      'comparison': "Read Psalm 139:14 and thank God for one unique gift He gave you.",
      'jumping-to-conclusions': "Read Proverbs 18:13 and choose one question to ask before deciding.",
      'personalization': "Read Romans 12:3 and reflect on one thing that isn’t about you."
    };
    if (!trapInfo.task) {
      thinkingTrapsInfo[primaryTrap] = { ...trapInfo, task: trapTasks[primaryTrap] || "Read a Psalm (e.g., Psalm 23) and write a one-sentence prayer." };
    }

    const randomVerse = trapInfo.verses[Math.floor(Math.random() * trapInfo.verses.length)];
    setSelectedVerse(randomVerse);

    // Verse card will be shown, then game will be triggered from there

    const checkInData = {
      emotion: selectedEmotion?.id,
      thinkingTrap: primaryTrap,
      date: new Date().toISOString(),
      verse: randomVerse.reference
    };
    localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
    localStorage.setItem('emotionalCheckInDate', new Date().toDateString());

    // Detailed payload for standalone page
    const detail = {
      emotion: selectedEmotion?.id,
      trapId: primaryTrap,
      isWellness: false,
      insightName: thinkingTrapsInfo[primaryTrap]?.name,
      insightDescription: thinkingTrapsInfo[primaryTrap]?.description,
      insightTask: thinkingTrapsInfo[primaryTrap]?.task,
      verseReference: randomVerse.reference,
      verseText: randomVerse.text,
      verseQuote: randomVerse.quote
    };
    localStorage.setItem('emotionalCheckInDetail', JSON.stringify(detail));
  };

  const handleContinueFromCognitiveRestructuring = () => {
    setShowCognitiveRestructuring(false);
    setShowBibleGame(true);
  };

  // Get Bible game activity based on emotion
  const getBibleGameActivity = (emotion: any, gameType?: 'memory' | 'runner') => {
    // Use provided gameType or randomly choose between Memory Match and Joy Runner
    const type = gameType || (Math.random() < 0.5 ? 'memory' : 'runner');

    if (type === 'memory') {
      return {
        title: 'Memory Match',
        description: 'Match pairs of Bible words!',
        verse: emotion?.verses?.[0]?.text || 'May the God of hope fill you with all joy and peace as you trust in him.',
        reference: emotion?.verses?.[0]?.reference || 'Romans 15:13',
        type: 'memory',
        pairs: [
          'Joy', 'Peace', 'Faith', 'Hope', 'Love', 'Grace'
        ],
        sinPairs: [
          'Pride', 'Envy'
        ],
        encouragement: 'Amazing! Your peace is a gift from God. Share it with others!'
      };
    } else {
      return {
        title: 'Joy Runner',
        description: 'Catch good bubbles and avoid sins!',
        verse: emotion?.verses?.[0]?.text || 'May the God of hope fill you with all joy and peace as you trust in him.',
        reference: emotion?.verses?.[0]?.reference || 'Romans 15:13',
        type: 'runner',
        targetBubbles: 10,
        encouragement: 'Amazing! Your peace is a gift from God. Share it with others!'
      };
    }
  };

  // Good words limited to 5 letters or less
  const allGoodWords = ['Joy', 'Hope', 'Love', 'Faith', 'Grace', 'Mercy', 'Peace', 'Trust', 'Truth', 'Light', 'Glory', 'Bless', 'Honor', 'Power', 'Cross', 'Heart', 'Unity', 'Serve', 'Share', 'Guide', 'Angel', 'Saint'];
  const goodWords = allGoodWords.filter(word => word.length <= 5);
  const sins = ['Pride', 'Envy', 'Wrath', 'Greed', 'Lust', 'Sloth', 'Lies', 'Hate', 'Fear', 'Anger', 'Doubt', 'Shame', 'Guilt'];

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

  // Game loop for falling bubbles (only for runner game)
  useEffect(() => {
    if (!showBibleGame || gameCompleted || gameOver) return;

    const game = getBibleGameActivity(selectedEmotion, selectedGameType || undefined);
    // Only run game loop for runner game type
    if (game.type !== 'runner') return;

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
  }, [showBibleGame, gameCompleted, gameOver, selectedEmotion]);

  const handleContinueFromEncouragement = () => {
    setShowFeatures(true);
  };

  const handleNextFeature = () => {
    if (currentFeatureIndex < featureSteps.length - 1) {
      setCurrentFeatureIndex(currentFeatureIndex + 1);
    } else {
      // Last step - go to homepage
      setShowEncouragement(false);
      setShowQuestions(false);
      setShowFeatures(false);
      setSliderValue(2.5);
      setCurrentQuestionIndex(0);
      setCurrentFeatureIndex(0);
      setAnswers({});
      setThinkingTrap(null);
    }
  };


  // Features steps screen
  if (showFeatures && showEncouragement) {
    const currentFeature = featureSteps[currentFeatureIndex];

    return (
      <main className="relative flex flex-col items-center justify-center px-6 pt-12 md:pt-20 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="text-center max-w-3xl mx-auto relative z-10 w-full">
          <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-urbanist font-semibold text-gray-900 mb-2">
                Your Journey to Peace
              </h2>
              <p className="text-sm font-urbanist font-light text-gray-500">
                Step {currentFeatureIndex + 1} of {featureSteps.length}
              </p>
            </div>

            <div className={`bg-gradient-to-br ${currentFeature.bgGradient} rounded-lg p-6 md:p-8 mb-6 border ${currentFeature.borderColor}`}>
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full ${currentFeature.circleColor} text-white flex items-center justify-center font-urbanist font-semibold text-2xl`}>
                  {currentFeature.id}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-4">
                {currentFeature.title}
              </h3>
              <p className="text-sm md:text-base font-urbanist font-light text-gray-700 leading-relaxed">
                {currentFeature.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {featureSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${index < currentFeatureIndex
                      ? `${currentFeature.circleColor} w-8`
                      : index === currentFeatureIndex
                        ? `${currentFeature.circleColor} w-8 opacity-60`
                        : 'bg-gray-200 w-2'
                    }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextFeature}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full md:w-auto"
            >
              {currentFeatureIndex < featureSteps.length - 1 ? 'Next' : 'Continue to Homepage'}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Encouragement screen - REMOVED: Now goes directly to personalized-support after Cognitive Restructuring
  if (false && showEncouragement && selectedVerse && thinkingTrap && selectedEmotion && !showFeatures) {
    const trapInfo = thinkingTrapsInfo[thinkingTrap] || thinkingTrapsInfo['wellness'];
    const isWellness = thinkingTrap === 'wellness' || selectedEmotion?.id === 'okay';

    return (
      <main className="relative flex flex-col items-center justify-center px-6 pt-12 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="text-center max-w-3xl mx-auto relative z-10 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xl p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              {/* Thinking Pattern / Wellness Card */}
              <div className={`bg-gradient-to-br ${isWellness ? 'from-green-50 to-emerald-50 border-green-200' : 'from-purple-50 to-indigo-50 border-purple-200'} rounded-lg p-6 mb-6 border`}>
                <p className={`text-xs font-urbanist font-semibold ${isWellness ? 'text-green-600' : 'text-purple-600'} uppercase tracking-wider mb-3`}>
                  {isWellness ? 'Wellness Insight' : 'Thinking Pattern Identified'}
                </p>
                <h3 className="text-2xl md:text-3xl font-urbanist font-bold text-gray-900 mb-3">
                  {trapInfo?.name || 'Wellness Check'}
                </h3>
                <p className="text-sm md:text-base font-urbanist font-light text-gray-700 leading-relaxed">
                  {trapInfo?.description || "You're taking time to reflect on your well-being. Continue nurturing your mind, body, and spirit."}
                </p>
              </div>
            </div>

            {/* Bible Verse Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 md:p-8 mb-8 border border-amber-200">
              <div className="mb-4">
                <p className="text-sm font-urbanist font-semibold text-amber-700 uppercase tracking-wider mb-2">
                  {selectedVerse.reference}
                </p>
                <div className="w-16 h-0.5 bg-amber-300 mx-auto mb-4"></div>
              </div>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-800 mb-6 italic leading-relaxed">
                "{selectedVerse.text}"
              </p>
              <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                <p className="text-sm md:text-base font-urbanist font-medium text-purple-700 leading-relaxed">
                  {selectedVerse.quote}
                </p>
              </div>
            </div>

            {/* Small Bible-related Task */}
            <div className={`rounded-lg p-5 md:p-6 mb-8 border ${isWellness ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'}`}>
              <p className={`text-xs font-urbanist font-semibold ${isWellness ? 'text-green-700' : 'text-purple-700'} uppercase tracking-wider mb-2`}>
                Today's Faith Step
              </p>
              <p className="text-sm md:text-base font-urbanist font-medium text-gray-800 leading-relaxed">
                {trapInfo?.task || 'Read a short passage from the Psalms and write one sentence prayer in response.'}
              </p>
            </div>

            {/* CTA Button - Removed since Personalized Support page is removed */}
          </div>
        </div>
      </main>
    );
  }

  // Emotion selection screen (default)
  return (
    <main className={`relative flex flex-col items-center justify-center px-6 pb-8 overflow-hidden min-h-[calc(100vh-80px)] max-h-[100vh] bg-white ${showBibleGame ? 'pt-0' : 'pt-3 md:pt-12'}`}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative accent lines */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
      <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

      <div className={`text-center max-w-4xl mx-auto relative z-10 ${!showBibleGame ? 'mb-8' : ''}`}>
        {/* Subtitle */}
        {!showBibleGame && (
          <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-6 md:mb-8 mt-0 md:mt-2">
            — How Are You Feeling Today? —
          </p>
        )}

        {/* Main Headline */}
        {!showVerseCard && !showBibleGame && (
          <h1 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
            Take a Moment to Check In
          </h1>
        )}

        {/* Soothing description */}
        {!showQuestions && !showWaterIntake && !showVerseCard && !showBibleGame && (
          <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
            Breathe deeply. Let's explore how you're feeling today and find peace through God's word.
          </p>
        )}

        {/* Water intake description */}
        {showWaterIntake && !showQuestions && (
          <p className="text-base md:text-lg font-urbanist font-light text-gray-600 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
            How much water did you drink today?
          </p>
        )}
      </div>

      {/* Water Intake Screen */}
      {showWaterIntake && !showQuestions ? (
        <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
            {/* Water Intake Label */}
            <div className="mb-6 text-left">
              <p className="text-base md:text-lg font-medium text-gray-600 flex items-center justify-start gap-2">
                <Droplet className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                Water Intake
              </p>
            </div>

            {/* 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 relative">
              {/* Left Column: Animated Water Glass */}
              <div className="flex justify-center items-center relative">
                <div
                  ref={glassRef}
                  className="relative w-32 h-48 md:w-40 md:h-56 cursor-pointer select-none touch-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  {/* Glass outline */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 150"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 20 10 L 20 140 Q 20 145 25 145 L 75 145 Q 80 145 80 140 L 80 10 Q 80 5 75 5 L 25 5 Q 20 5 20 10 Z"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    <ellipse cx="50" cy="10" rx="30" ry="3" fill="#e2e8f0" />
                  </svg>

                  {/* Water fill */}
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out overflow-hidden"
                    style={{
                      height: `${waterPercentage}%`,
                      background: `linear-gradient(to top, 
                                rgba(59, 130, 246, 0.9) 0%,
                                rgba(96, 165, 250, 0.8) 50%,
                                rgba(147, 197, 253, 0.7) 100%
                              )`,
                      clipPath: 'inset(0 20% 0 20% round 0 0 8px 8px)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `repeating-linear-gradient(
                                  90deg,
                                  transparent,
                                  transparent 10px,
                                  rgba(255, 255, 255, 0.3) 10px,
                                  rgba(255, 255, 255, 0.3) 20px
                                )`,
                        animation: 'wave 3s linear infinite',
                      }}
                    />
                    <div className="absolute inset-0">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/40"
                          style={{
                            width: `${4 + (i * 0.8)}px`,
                            height: `${4 + (i * 0.8)}px`,
                            left: `${25 + (i * 12)}%`,
                            bottom: `${5 + (i * 5)}%`,
                            animation: `bubble ${2 + (i * 0.4)}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Small glasses next to the glass - Left side */}
                  {(() => {
                    const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                    const leftGlasses = Math.ceil(totalGlasses / 2);
                    return (
                      <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 md:-translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                      >
                        {Array.from({ length: leftGlasses }).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                            style={{
                              animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                            }}
                          >
                            <div
                              className="w-full bg-blue-400 transition-all duration-300"
                              style={{ height: '85%' }}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Small glasses next to the glass - Right side */}
                  {(() => {
                    const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                    const rightGlasses = Math.floor(totalGlasses / 2);
                    return (
                      <div
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 md:translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                      >
                        {Array.from({ length: rightGlasses }).map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                            style={{
                              animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                            }}
                          >
                            <div
                              className="w-full bg-blue-400 transition-all duration-300"
                              style={{ height: '85%' }}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {isDragging && (
                    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                      {waterIntake}ml
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {waterIntake}ml <span className="text-lg md:text-xl font-normal text-gray-500 relative" style={{ top: '-4px' }}>({Math.round(waterPercentage)}% completed)</span>
                  </p>
                  <p className="text-base text-gray-600 mb-4">
                    {Math.round(waterIntake / 250)} cups
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${waterPercentage}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-500">
                    {Math.round(waterPercentage)}% of daily goal (2250ml / 9 cups)
                  </p>
                </div>

                {/* Water Intake Information */}
                <div className="hidden md:block bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Daily Water Recommendations</h4>
                  <ul className="text-xs text-gray-700 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Average adult: <strong>2,000-3,000ml</strong> (8-12 cups) per day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Staying hydrated supports mental clarity and emotional wellness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleWaterIntakeContinue}
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Continue
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>

            <style>{`
                      @keyframes wave {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(20px); }
                      }
                      @keyframes bubble {
                        0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
                        50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
                      }
                      @keyframes glassAppear {
                        0% { 
                          opacity: 0; 
                          transform: translateY(10px) scale(0.8); 
                        }
                        100% { 
                          opacity: 1; 
                          transform: translateY(0) scale(1); 
                        }
                      }
                    `}</style>
          </div>
        </div>
      ) : showQuestions && cbtQuestions.length > 0 ? (
        /* Show Questions - Unique Modern UI */
        <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
          {/* Question Card with Modern Design */}
          <div
            className={`relative rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden transition-all duration-500 ease-out ${cardDirection === 'left' ? 'translate-x-[-120%] opacity-0 scale-95' :
                cardDirection === 'right' ? 'translate-x-[120%] opacity-0 scale-95' :
                  'translate-x-0 opacity-100 scale-100'
              }`}
            style={{
              minHeight: '300px',
              backgroundImage: `url(${cbtQuestions[Math.min(currentQuestionIndex, cbtQuestions.length - 1)]?.backgroundImage || '/assets/cbt/unsplash_eca07ce68773.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark Calming Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-purple-800/70"></div>

            {/* Additional Soft Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/30"></div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[300px]">
              {/* Question Text */}
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-2xl md:text-3xl lg:text-2xl font-normal text-white text-center leading-tight drop-shadow-2xl">
                  {cbtQuestions[Math.min(currentQuestionIndex, cbtQuestions.length - 1)]?.question || 'Loading...'}
                </h3>
              </div>

              {/* Answer Buttons */}
              <div className="mt-8 flex items-center justify-center gap-4">
                {/* Yes Button */}
                <button
                  onClick={() => {
                    const optionIndex = 0;
                    const safeIndex = Math.min(currentQuestionIndex, cbtQuestions.length - 1);
                    handleQuestionAnswer(cbtQuestions[safeIndex]?.id || 0, optionIndex, 'up');
                  }}
                  disabled={isTransitioning}
                  className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Yes</span>
                </button>

                {/* No Button */}
                <button
                  onClick={() => {
                    const optionIndex = 1;
                    const safeIndex = Math.min(currentQuestionIndex, cbtQuestions.length - 1);
                    handleQuestionAnswer(cbtQuestions[safeIndex]?.id || 0, optionIndex, 'down');
                  }}
                  disabled={isTransitioning}
                  className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>

          {/* CSS Animations */}
          <style>{`
                    @keyframes patternMove {
                      0% { transform: translate(0, 0); }
                      100% { transform: translate(30px, 30px); }
                    }
                  `}</style>
        </div>
      ) : showVerseCard && selectedVerse ? (
        /* Verse Card - Transition before game */
        <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10 -mt-8 md:-mt-12">
          <div
            className="relative rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden transition-all duration-500 ease-out"
            style={{
              minHeight: '400px',
              backgroundImage: `url(${cbtQuestions[0]?.backgroundImage || '/assets/cbt/unsplash_eca07ce68773.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark Calming Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/70 to-purple-800/70"></div>

            {/* Additional Soft Gradient Layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-900/30"></div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[400px] items-center justify-center">
              {/* Mood Line */}
              {selectedEmotion && (
                <div className="mb-4">
                  <p className="text-lg md:text-xl font-normal text-purple-200 text-center">
                    You're feeling {selectedEmotion.label} today
                  </p>
                </div>
              )}

              {/* Encouragement Line */}
              {selectedEmotion && (
                <div className="mb-6">
                  {selectedEmotion.id === "very-anxious" || selectedEmotion.id === "stressed" || selectedEmotion.id === "sad" ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      Remember, God is with you in this moment, and there is hope ahead.
                    </p>
                  ) : selectedEmotion.id === "good" || selectedEmotion.id === "great" ? (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      Rejoice in this moment of peace and let God's joy fill your heart.
                    </p>
                  ) : (
                    <p className="text-lg md:text-xl lg:text-2xl text-purple-100 text-center font-normal italic">
                      God has wonderful plans for you, even in the ordinary moments.
                    </p>
                  )}
                </div>
              )}

              {/* Verse Reference */}
              <div className="mb-4">
                <p className="text-lg md:text-xl font-normal text-purple-200 text-center">
                  {selectedVerse.reference}
                </p>
              </div>

              {/* Verse Text */}
              <div className="mb-6">
                <p className="text-lg md:text-xl lg:text-lg font-normal text-white text-center leading-normal md:leading-relaxed drop-shadow-2xl">
                  "{selectedVerse.text}"
                </p>
              </div>

              {/* Continue Button */}
              <Button
                onClick={() => {
                  // Reset game type to get a new random game
                  setSelectedGameType(null);
                  // Show Memory Match or Joy Runner game inline (or attempts exhausted message)
                  setShowVerseCard(false);
                  setShowBibleGame(true);
                }}
                className="mt-6 md:mt-8 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Let's play a bible game
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      ) : showBibleGame ? (
        (() => {
          const game = getBibleGameActivity(selectedEmotion, selectedGameType || undefined);
          const emotion = selectedEmotion || emotionOptions[2];
          const currentRetryCount = getRetryCount();
          const maxRetries = 3;
          const canPlay = currentRetryCount < maxRetries;

          return (
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                {/* Show "All Attempts Used" message if no attempts left */}
                {!canPlay ? (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                      <span className="text-4xl">⏰</span>
                    </div>
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8">
                      <h3 className="text-2xl font-urbanist font-semibold text-yellow-900 mb-3">All Attempts Completed</h3>
                      <p className="text-base font-urbanist font-light text-yellow-800 leading-relaxed mb-6">
                        You've used all {maxRetries} attempts for today. Come back tomorrow for more games!
                      </p>
                      <Button
                        onClick={() => navigate("/signup-today")}
                        className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Sign in to get unlimited turns
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : gameOver ? (
                  /* Game Over Screen */
                  <div className="text-center space-y-6 bg-red-50 rounded-lg p-8 border-2 border-red-200">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                      <span className="text-4xl">💀</span>
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-red-300">
                      <h3 className="text-2xl font-urbanist font-semibold text-red-900 mb-3">Game Over!</h3>
                      <p className="text-base font-urbanist font-light text-red-800 leading-relaxed mb-4">
                        {game.type === 'memory'
                          ? "You matched a good word with a sin! Remember: matching good + sin = Game Over."
                          : "You touched a sin! Avoid the red bubbles and collect only the good words."}
                      </p>
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-4">
                        <p className="text-sm font-urbanist font-semibold text-red-700 mb-1">Final Score</p>
                        <p className="text-3xl font-urbanist font-bold text-red-900">{score}</p>
                      </div>
                    </div>
                    {(() => {
                      const maxRetries = 3;
                      // Get current count from localStorage to ensure it's up-to-date
                      const currentRetryCount = getRetryCount();
                      const canRetry = currentRetryCount < maxRetries;
                      const retriesLeft = maxRetries - currentRetryCount;

                      return (
                        <div className="space-y-4">
                          {!canRetry && (
                            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center">
                              <p className="text-sm font-urbanist font-semibold text-yellow-800">
                                You've used all {maxRetries} attempts for today. Try again tomorrow!
                              </p>
                            </div>
                          )}
                          {canRetry && (
                            <div className={`rounded-lg p-4 text-center border-2 ${retriesLeft === 1
                                ? 'bg-red-50 border-red-300'
                                : retriesLeft === 2
                                  ? 'bg-orange-50 border-orange-300'
                                  : 'bg-blue-50 border-blue-300'
                              }`}>
                              <p className={`text-sm font-urbanist font-semibold ${retriesLeft === 1
                                  ? 'text-red-800'
                                  : retriesLeft === 2
                                    ? 'text-orange-800'
                                    : 'text-blue-800'
                                }`}>
                                Attempts remaining: {retriesLeft} / {maxRetries}
                              </p>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 md:mb-6 relative z-10">
                            {canRetry ? (
                              <Button
                                onClick={() => {
                                  // Increment retry count when user clicks Retry (before starting new game)
                                  const newCount = incrementRetryCount();
                                  setRetryCount(newCount);
                                  // Reset game states
                                  setGameOver(false);
                                  setGameCompleted(false);
                                  setScore(0);
                                  setMemoryFlipped([]);
                                  setMemoryMatched([]);
                                  setMemoryMoves(0);
                                  setRunnerPosition(0);
                                  setRunnerCollected([]);
                                  setFallingBubbles([]);
                                  runnerPositionRef.current = 0;
                                  runnerCollectedRef.current = [];
                                  scoreRef.current = 0;
                                  lastSpawnTimeRef.current = Date.now();
                                  // Force re-sync retry count after increment
                                  setTimeout(() => {
                                    const updatedCount = getRetryCount();
                                    setRetryCount(updatedCount);
                                  }, 0);
                                  // Reinitialize memory cards if memory game
                                  if (game.type === 'memory') {
                                    const allGoodCards = [...game.pairs, ...game.pairs];
                                    const allSinCards = [...game.sinPairs, ...game.sinPairs];
                                    const allCards = [...allGoodCards, ...allSinCards].sort(() => Math.random() - 0.5);
                                    setMemoryCards(allCards);
                                  }
                                }}
                                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                              >
                                Retry
                                <RotateCcw className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => navigate("/signup-today")}
                                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                              >
                                Sign in to get unlimited turns
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                              </Button>
                            )}
                            <Button
                              onClick={() => navigate("/signup-today")}
                              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                            >
                              Continue
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : !gameCompleted ? (
                  <div className="space-y-6">
                    {/* Game Type: Match-3 (Candy Crush style) */}
                    {game.type === 'match3' && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Match 3 Words</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-blue-300">
                            <span className="text-sm font-bold text-blue-600">Matches: {matches} / {game.targetMatches}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {match3Grid.map((word: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (selectedTiles.includes(index)) {
                                  setSelectedTiles(selectedTiles.filter(i => i !== index));
                                } else if (selectedTiles.length < 3) {
                                  const newSelected = [...selectedTiles, index];
                                  setSelectedTiles(newSelected);
                                  if (newSelected.length === 3) {
                                    const selectedWords = newSelected.map(i => match3Grid[i]);
                                    const uniqueWords = new Set(selectedWords);
                                    if (uniqueWords.size === 1) {
                                      const newMatches = matches + 1;
                                      setMatches(newMatches);
                                      setSelectedTiles([]);
                                      if (newMatches >= game.targetMatches) {
                                        setTimeout(() => setGameCompleted(true), 500);
                                      }
                                    } else {
                                      setTimeout(() => setSelectedTiles([]), 500);
                                    }
                                  }
                                }
                              }}
                              className={`aspect-square rounded-xl border-2 transition-all transform hover:scale-105 flex items-center justify-center ${selectedTiles.includes(index)
                                  ? 'border-blue-500 bg-blue-200 scale-110 shadow-lg'
                                  : 'border-gray-300 bg-white hover:border-blue-300'
                                }`}
                            >
                              <span className="text-xs font-bold text-gray-700">{word}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center mb-4">Click 3 matching words in a row to make a match!</p>
                      </div>
                    )}

                    {/* Game Type: Collector (Mario style) */}
                    {game.type === 'collector' && (
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Collect Items</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-green-300">
                            <span className="text-sm font-bold text-green-600">Collected: {collectedItems.length} / {game.targetItems}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3 mb-4">
                          {game.items.map((item: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!collectedItems.includes(item)) {
                                  const newCollected = [...collectedItems, item];
                                  setCollectedItems(newCollected);
                                  if (newCollected.length >= game.targetItems) {
                                    setTimeout(() => setGameCompleted(true), 500);
                                  }
                                }
                              }}
                              className={`aspect-square rounded-xl border-2 transition-all transform hover:scale-110 ${collectedItems.includes(item)
                                  ? 'border-green-500 bg-green-200 scale-110 shadow-lg'
                                  : 'border-gray-300 bg-white hover:border-green-300 animate-bounce'
                                }`}
                            >
                              <span className="text-xs font-bold text-gray-700">{item}</span>
                              {collectedItems.includes(item) && (
                                <span className="absolute inset-0 flex items-center justify-center text-green-600 text-2xl">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Click items to collect them!</p>
                      </div>
                    )}

                    {/* Game Type: Memory Match */}
                    {game.type === 'memory' && (
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Game Board - Left Side */}
                        <div className="lg:col-span-2">
                          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border-2 border-pink-200">
                            <div className="mb-4">
                              <h3 className="text-center text-lg font-bold text-gray-900 mb-2">Memory Cards</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5 mb-4 max-w-xs mx-auto">
                              {memoryCards.map((card: string, index: number) => {
                                const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
                                const allSinCards = game.sinPairs;
                                const isSin = allSinCards.includes(card);
                                return (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (gameCompleted || gameOver) return;
                                      const card = memoryCards[index];
                                      const isFlipped = memoryFlipped.includes(index) || memoryMatched.includes(card);
                                      if (isFlipped || memoryFlipped.length >= 2) return;

                                      const newFlipped = [...memoryFlipped, index];
                                      setMemoryFlipped(newFlipped);
                                      setMemoryMoves(memoryMoves + 1);

                                      if (newFlipped.length === 2) {
                                        const [firstIndex, secondIndex] = newFlipped;
                                        const firstCard = memoryCards[firstIndex];
                                        const secondCard = memoryCards[secondIndex];

                                        const allSinCards = game.sinPairs;
                                        const allGoodCards = game.pairs;
                                        const firstIsSin = allSinCards.includes(firstCard);
                                        const secondIsSin = allSinCards.includes(secondCard);
                                        const firstIsGood = allGoodCards.includes(firstCard);
                                        const secondIsGood = allGoodCards.includes(secondCard);

                                        if ((firstIsGood && secondIsSin) || (firstIsSin && secondIsGood)) {
                                          // Don't increment here - increment when user clicks Retry
                                          setTimeout(() => setGameOver(true), 500);
                                          return;
                                        }

                                        // Check if both are sin cards and they match (same word)
                                        if (firstIsSin && secondIsSin && firstCard === secondCard) {
                                          // Sin pair matched - allowed, just clear them (no points, no game over)
                                          setTimeout(() => setMemoryFlipped([]), 500);
                                          return;
                                        }

                                        // Check if both cards are the same word (identical match)
                                        if (firstCard === secondCard) {
                                          // Good match found!
                                          const newMatched = [...memoryMatched, firstCard, secondCard];
                                          setMemoryMatched(newMatched);
                                          setScore(score + 50);
                                          if (newMatched.length >= game.pairs.length * 2) {
                                            // Game completed successfully - reset retry count
                                            resetRetryCount();
                                            setRetryCount(0);
                                            setTimeout(() => setGameCompleted(true), 500);
                                          } else {
                                            setTimeout(() => setMemoryFlipped([]), 500);
                                          }
                                        } else {
                                          // No match - flip back after delay
                                          setTimeout(() => setMemoryFlipped([]), 1000);
                                        }
                                      }
                                    }}
                                    className={`aspect-square rounded-md border-2 transition-all transform hover:scale-105 flex items-center justify-center font-bold text-[10px] ${isFlipped
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
                          </div>
                        </div>

                        {/* Stats - Right Side */}
                        <div className="lg:col-span-1 flex items-center">
                          <div className="w-full space-y-3">
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Matched</p>
                              <p className="text-lg font-bold text-gray-900">{memoryMatched.length / 2} / {game.pairs.length}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Moves</p>
                              <p className="text-lg font-bold text-gray-900">{memoryMoves}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Score</p>
                              <p className="text-lg font-bold text-gray-900">{score}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs text-gray-500 mb-1">Flipped</p>
                              <p className="text-lg font-bold text-gray-900">{memoryFlipped.length} / 2</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Game Type: Puzzle (Sliding puzzle) */}
                    {game.type === 'puzzle' && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Slide Puzzle</h3>
                        <div className="grid grid-cols-4 gap-2 mb-4 max-w-xs mx-auto">
                          {puzzleTiles.map((char: string, index: number) => (
                            <div
                              key={index}
                              className={`aspect-square rounded-lg border-2 flex items-center justify-center ${char === '' ? 'bg-gray-300 border-gray-400' : 'bg-white border-amber-300'
                                }`}
                            >
                              <span className="text-sm font-bold text-gray-700">{char}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => setGameCompleted(true)}
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                        >
                          Puzzle Complete! ✓
                        </Button>
                      </div>
                    )}

                    {/* Game Type: Bubble Pop */}
                    {game.type === 'bubble' && (
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900">Pop Bubbles</h3>
                          <div className="bg-white px-4 py-2 rounded-full border-2 border-teal-300">
                            <span className="text-sm font-bold text-teal-600">Popped: {poppedBubbles.length} / {game.targetBubbles}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mb-4 justify-center">
                          {game.bubbles.map((bubble: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!poppedBubbles.includes(bubble)) {
                                  const newPopped = [...poppedBubbles, bubble];
                                  setPoppedBubbles(newPopped);
                                  if (newPopped.length >= game.targetBubbles) {
                                    setTimeout(() => setGameCompleted(true), 500);
                                  }
                                }
                              }}
                              className={`w-20 h-20 rounded-full border-2 transition-all transform hover:scale-110 ${poppedBubbles.includes(bubble)
                                  ? 'bg-teal-200 border-teal-400 scale-90 opacity-50'
                                  : 'bg-gradient-to-br from-teal-200 to-cyan-200 border-teal-400 hover:scale-125 animate-pulse'
                                }`}
                            >
                              {poppedBubbles.includes(bubble) ? (
                                <span className="text-2xl">✓</span>
                              ) : (
                                <span className="text-xs font-bold text-gray-700">{bubble}</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Click bubbles to pop them!</p>
                      </div>
                    )}

                    {/* Game Type: Runner (Mario style) */}
                    {game.type === 'runner' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-urbanist font-semibold text-gray-900">Joy Runner</h3>
                          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-sm font-urbanist font-semibold text-gray-700">
                              Score: {score}
                            </span>
                          </div>
                        </div>

                        {/* Game Area */}
                        <div
                          ref={gameAreaRef}
                          className="relative bg-gradient-to-b from-sky-200 to-blue-300 rounded-lg p-4 mb-4 overflow-hidden"
                          style={{ minHeight: '400px' }}
                        >
                          {/* Ground/Platform */}
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-400 to-green-300 border-t-2 border-green-500 z-20"></div>

                          {/* Runner character */}
                          <div
                            className="absolute bottom-16 text-3xl md:text-4xl lg:text-5xl transition-all duration-200 z-30"
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
                                className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${bubble.collected
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
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => setRunnerPosition(Math.max(0, runnerPosition - 1))}
                            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={runnerPosition === 0}
                          >
                            ← Move Left
                          </Button>
                          <Button
                            onClick={() => setRunnerPosition(Math.min(3, runnerPosition + 1))}
                            className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={runnerPosition === 3}
                          >
                            Move Right →
                          </Button>
                        </div>

                        <p className="text-xs font-urbanist font-light text-gray-500 text-center">
                          Move the runner left/right to catch good bubbles (purple) and avoid sins (red)!
                          <br />
                          <span className="text-red-600 font-semibold">Red bubbles = Game Over!</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Completion Screen */
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-3">🎉 Activity Complete!</h3>
                      <p className="text-base font-urbanist font-light text-gray-700 leading-relaxed">{game.encouragement}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <p className="text-sm font-urbanist font-semibold text-gray-600 mb-2">{game.reference}</p>
                      <p className="text-base font-urbanist font-light text-gray-700 italic leading-relaxed">{game.verse}</p>
                    </div>
                    <div className="flex justify-center mb-4 md:mb-6 relative z-10">
                      <Button
                        onClick={() => {
                          setShowBibleGame(false);
                          setGameCompleted(false);
                          setGameAnswers({});
                          // Reset to home/initial state
                          setShowQuestions(false);
                          setShowWaterIntake(false);
                          setSliderValue(2.5);
                          setCurrentQuestionIndex(0);
                          setAnswers({});
                          setShowEncouragement(false);
                          setThinkingTrap(null);
                          setSelectedVerse(null);
                          setSelectedEmotion(null);
                        }}
                        className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Return Home
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()
      ) : !showWaterIntake ? (
        <>
          {/* Emotion Display */}
          <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
            <div className={`${currentEmotion.bgColor} rounded-lg p-6 md:p-8 transition-all duration-300`}>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 transition-all duration-300">
                  {currentEmotion.image ? (
                    <img
                      src={currentEmotion.image}
                      alt={currentEmotion.label}
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                    />
                  ) : (
                    <div className="text-7xl md:text-6xl lg:text-7xl">{currentEmotion.emoji}</div>
                  )}
                </div>
                <h3 className={`text-2xl md:text-3xl font-urbanist font-semibold ${currentEmotion.color} mb-2`}>
                  {currentEmotion.label}
                </h3>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="w-full max-w-2xl mx-auto mb-6 md:mb-8 relative z-10">
            <div className="relative px-2">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                  className="w-full h-3 md:h-4 bg-transparent rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%)`
                  }}
                />
                <style>{`
                  .slider {
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    height: 8px;
                    border-radius: 9999px;
                    outline: none;
                  }
                  .slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 9999px;
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                  }
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-top: -8px;
                  }
                  .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                    background: linear-gradient(135deg, #6366f1 0%, #7b7ff0 100%);
                  }
                  .slider::-webkit-slider-thumb:active {
                    transform: scale(1.1);
                    box-shadow: 0 2px 6px rgba(123, 127, 240, 0.6);
                  }
                  .slider::-moz-range-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 9999px;
                    background: linear-gradient(to right, 
                      #f97316 0%, 
                      #ef4444 25%, 
                      #6b7280 40%, 
                      #3b82f6 60%, 
                      #22c55e 85%, 
                      #22c55e 100%);
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                    border: none;
                  }
                  .slider::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                    cursor: pointer;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .slider::-moz-range-thumb:hover {
                    transform: scale(1.15);
                    box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                  }
                  .slider::-moz-range-thumb:active {
                    transform: scale(1.1);
                  }
                `}</style>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-xs md:text-sm font-urbanist font-light text-gray-500">
              <span>Very Anxious</span>
              <span>Great/Peaceful</span>
            </div>

            <p className="text-xs md:text-sm font-urbanist font-light text-gray-500 text-center mt-2 md:mt-3">
              Move the slider above to adjust how you're feeling
            </p>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mb-4 md:mb-6 relative z-10">
            <Button
              onClick={handleSliderConfirm}
              className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Continue with This Feeling
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </div>
        </>
      ) : null}
    </main>
  );
}

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGuestComplete, setShowGuestComplete] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    place: "",
    feedback: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Navigation moved to @/components/Navigation.tsx

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('guestCompleted') === '1') {
      setShowGuestComplete(true);
      // clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('guestCompleted');
      window.history.replaceState({}, '', url.toString());
    }
  }, [location.search]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save feedback directly to Supabase database
      // Verify table is accessible first (helps refresh PostgREST schema if needed)
      const { error: checkError } = await supabase
        .from('feedback')
        .select('id')
        .limit(1);

      if (checkError && checkError.code === '42P01') {
        throw new Error('Feedback table does not exist. Please run the create-feedback-table.sql migration in Supabase SQL Editor.');
      }

      // Now insert the feedback
      const { data: feedbackData, error: dbError } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedbackForm.name.trim(),
            place: feedbackForm.place.trim(),
            feedback: feedbackForm.feedback.trim()
          }
        ])
        .select();

      if (dbError) {
        console.error('Database error details:', {
          code: dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint: dbError.hint,
          fullError: dbError
        });

        // Provide helpful error message based on error type
        if (dbError.code === '42P01') {
          throw new Error('Feedback table does not exist. Please run the create-feedback-table.sql migration in Supabase SQL Editor.');
        } else if (dbError.code === '42501') {
          throw new Error('Permission denied. Please check Row Level Security policies for the feedback table. Make sure the "Allow public insert for feedback" policy exists.');
        } else if (dbError.code === '23505') {
          throw new Error('Duplicate entry. This feedback may have already been submitted.');
        } else {
          // Handle cases where message might be undefined - use details or hint as fallback
          const errorMessage = dbError.message || dbError.details || dbError.hint || `Error code: ${dbError.code}` || 'Unknown database error';
          throw new Error(`Database error: ${errorMessage}`);
        }
      }

      // Success - reset form and close dialog
      setFeedbackForm({ name: "", place: "", feedback: "" });
      setShowFeedbackDialog(false);
      setIsSubmitting(false);
      alert('Thank you for your feedback! We\'ll get back to you soon.');

    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsSubmitting(false);
      alert(`Failed to submit feedback: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`);
    }
  };

  // Removed auto-redirect to emotional check-in and dashboard/admin on load

  // Load Tidio Chat Widget
  useEffect(() => {
    // Function to hide Tidio welcome message
    const hideTidioWelcomeMessage = () => {
      // Try various selectors for Tidio welcome message - specifically targeting widgetLabel
      const selectors = [
        '.widgetLabel',
        'button.widgetLabel',
        'button[class*="widgetLabel"]',
        'button[class*="tidio"][class*="widgetLabel"]',
        '[id*="tidio-welcome"]',
        '[class*="tidio-welcome"]',
        '[id*="tidio-message-box"]',
        '[class*="tidio-message-box"]',
        '[id*="tidio-bubble"]',
        '[class*="tidio-bubble"]',
        '.tidio-chat-welcome',
        '#tidio-chat-welcome',
        '.tidio-welcome-message',
        '#tidio-welcome-message'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el: Element) => {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.height = '0';
          (el as HTMLElement).style.width = '0';
          (el as HTMLElement).style.overflow = 'hidden';
          (el as HTMLElement).style.pointerEvents = 'none';
        });
      });
    };

    // Check if Tidio script is already loaded
    if (document.querySelector('script[src*="tidio.co"]')) {
      // If already loaded, hide welcome message
      setTimeout(hideTidioWelcomeMessage, 500);
      // Set up observer to catch it if it appears later
      const observer = new MutationObserver(hideTidioWelcomeMessage);
      observer.observe(document.body, { childList: true, subtree: true });

      // Clean up observer after 10 seconds
      setTimeout(() => observer.disconnect(), 10000);
      return;
    }

    // Create and inject Tidio script (same key as Help page)
    const script = document.createElement('script');
    script.src = '//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js';
    script.async = true;
    script.type = 'text/javascript';

    // Wait for Tidio to load and hide welcome message
    script.onload = () => {
      // Give Tidio time to initialize, then hide welcome message
      setTimeout(hideTidioWelcomeMessage, 1000);
      // Also set up an observer to hide it if it appears later
      const observer = new MutationObserver(hideTidioWelcomeMessage);
      observer.observe(document.body, { childList: true, subtree: true });

      // Clean up observer after 10 seconds
      setTimeout(() => observer.disconnect(), 10000);
    };

    // Add script to document head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const tidioScript = document.querySelector('script[src*="tidio.co"]');
      if (tidioScript) {
        tidioScript.remove();
      }
    };
  }, []);


  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bible Quiz Competition 2026",
    "alternateName": "Bible Quiz Competition",
    "url": "https://biblequizcompetition.com",
    "description": "Join the ultimate Bible Quiz Competition 2026! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, climb leaderboards, and access free Bible Q&A resources. Free to join, fun for all ages.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://biblequizcompetition.com/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://twitter.com/"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Bible Quiz Competition",
      "logo": {
        "@type": "ImageObject",
        "url": "https://biblequizcompetition.com/favicon.svg"
      }
    }
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bible Quiz Competition",
    "url": "https://biblequizcompetition.com",
    "logo": "https://biblequizcompetition.com/favicon.svg",
    "description": "Free online Bible quiz platform offering weekly competitions, leaderboards, and Bible Q&A resources for 2026.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Organization",
      "name": "Bible Quiz Competition"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://twitter.com/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "info@biblequizcompetition.com"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bible Quiz Competition 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bible Quiz Competition 2026 is a free online platform where you can test your Bible knowledge with over 1,000+ questions across all Bible books. Compete in weekly quizzes, track your progress on leaderboards, and access free Bible Q&A resources."
        }
      },
      {
        "@type": "Question",
        "name": "Is Bible Quiz Competition 2026 free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Bible Quiz Competition 2026 is completely free to join. Sign up for free and get access to all quizzes, leaderboards, and Bible study resources."
        }
      },
      {
        "@type": "Question",
        "name": "How do I participate in Bible Quiz Competition 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply sign up for a free account, choose from Today's Quiz, Weekly Challenges, or explore our Bible Q&A Hub. Take quizzes, compete with others, and climb the leaderboard!"
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Bible Quiz Competition 2026-2026 | Free Online Bible Quizzes & Leaderboards"
        description="Join the Bible Quiz Competition 2026-2026! Test your Bible knowledge with 1,000+ questions, compete in weekly quizzes, climb leaderboards, and access free Bible Q&A resources. Free to join, fun for all ages. Participate in the ultimate Bible quiz competition of 2026."
        keywords="bible quiz competition 2026-2026, bible quiz competition, bible quiz 2026, online bible quiz, free bible quiz, bible knowledge quiz, weekly bible quiz, bible quiz leaderboard, bible study quiz, christian quiz competition, bible questions and answers, genesis quiz, exodus quiz, psalms quiz, new testament quiz, bible quiz app, interactive bible quiz, bible quiz for adults, bible quiz for kids, bible competition 2026"
        author="Bible Quiz Competition"
        url="/"
        structuredData={[
          homepageStructuredData,
          organizationStructuredData,
          faqStructuredData
        ]}
      />
      <div className="min-h-screen bg-white">
        {/* Guest completion dialog */}
        <Dialog open={showGuestComplete} onOpenChange={setShowGuestComplete}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Guest mode quiz completed</DialogTitle>
              <DialogDescription>Your guest-mode session has ended successfully.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button onClick={() => setShowGuestComplete(false)}>OK</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-urbanist font-normal">Give Your Feedback</DialogTitle>
              <DialogDescription className="font-urbanist font-light">
                We'd love to hear from you! Please share your thoughts.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  className="font-urbanist font-light"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="place" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Place
                </label>
                <Input
                  id="place"
                  type="text"
                  required
                  value={feedbackForm.place}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, place: e.target.value })}
                  className="font-urbanist font-light"
                  placeholder="Your location"
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-urbanist font-medium text-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  required
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                  className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md font-urbanist font-light resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Share your thoughts..."
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowFeedbackDialog(false);
                    setFeedbackForm({ name: "", place: "", feedback: "" });
                  }}
                  className="font-urbanist font-light"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-gray-800 font-urbanist font-light"
                >
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* Header */}
        <Navigation />

        {/* Hero Section with Emotional Check-In */}
        <EmotionalCheckInHero />

        {/* Wellness Features Section */}
        <section id="wellness-journey" className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Decorative accent lines */}
          <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — More Than Quizzes —
              </p>
              <h2 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Your Complete Wellness Journey
              </h2>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Join the leading online Bible quiz competition 2026 and participate in the best Bible quiz competition 2026. We're here to support you through your care, worries, anxiety, and every step of your journey toward peace through Bible quiz competition, CBT tools, and comprehensive wellness resources.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Daily Records */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Daily Records</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Track your emotional journey and progress over time with detailed analytics
                    </p>
                  </div>
                </div>
              </div>

              {/* Water Intake */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💧</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Water Intake Tracker</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Monitor your daily hydration and maintain optimal wellness
                    </p>
                  </div>
                </div>
              </div>

              {/* CBT Tools */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🧘</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">CBT Tools</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Access thought records, emotional check-ins, and mindfulness practices for peace
                    </p>
                  </div>
                </div>
              </div>

              {/* Streak Maintenance */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🔥</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Streak Maintenance</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Build and maintain daily habits with streak tracking to stay motivated
                    </p>
                  </div>
                </div>
              </div>

              {/* Emotional Check-In */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Emotional Check-In</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Daily mood tracking with personalized insights and Bible verses
                    </p>
                  </div>
                </div>
              </div>

              {/* Bible Games */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Interactive Bible Games</h3>
                    <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                      Engage with faith-based games in our online Bible quiz competition that combine fun with spiritual growth. Join Bible competitions 2026 and compete in Bible competition challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Button
                className="px-6 md:px-8 py-4 md:py-6 text-lg md:text-xl font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => navigate("/signup-today")}
              >
                Start Your Wellness Journey
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bible Q&A Hub Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — Bible Q&A Hub —
              </p>
              <h2 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Deepen Your Understanding of Scripture
              </h2>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Your comprehensive resource for Bible questions and answers in the Bible quiz competition 2026. Explore organized content by book, chapter, difficulty level, and category. Check Bible quiz competition 2026 results and track your progress in our online Bible quiz competition.
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 mb-1">66</div>
                <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Bible Books</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 mb-1">1,000+</div>
                <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Questions</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 mb-1">3</div>
                <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Difficulty Levels</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 mb-1">10+</div>
                <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Study Categories</div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-gray-700" strokeWidth={1} />
                </div>
                <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">66 Bible Books</h3>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                  Complete coverage of all Old and New Testament books with organized questions and answers.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                  <Brain className="w-5 h-5 text-gray-700" strokeWidth={1} />
                </div>
                <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Difficulty Levels</h3>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                  Beginner, Intermediate, and Advanced questions to match your knowledge level.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5 text-gray-700" strokeWidth={1} />
                </div>
                <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Chapter Breakdown</h3>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                  Study specific chapters in detail with focused questions on key passages and themes.
                </p>
              </div>
            </div>

            {/* Popular Study Areas */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-4 text-center">Popular Study Areas</h3>
              <div className="grid md:grid-cols-4 gap-3">
                <button
                  onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                >
                  <div className="text-base md:text-lg font-urbanist font-semibold text-gray-900 mb-1">Genesis Hub</div>
                  <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Book of Beginnings</div>
                </button>
                <button
                  onClick={() => navigate("/bible-questions-and-answers-hub/pauline-epistles")}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                >
                  <div className="text-base md:text-lg font-urbanist font-semibold text-gray-900 mb-1">Pauline Epistles</div>
                  <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Apostle Paul's Letters</div>
                </button>
                <button
                  onClick={() => navigate("/bible-questions-and-answers-hub")}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                >
                  <div className="text-base md:text-lg font-urbanist font-semibold text-gray-900 mb-1">Character Studies</div>
                  <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Biblical Figures</div>
                </button>
                <button
                  onClick={() => navigate("/bible-questions-and-answers-hub")}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
                >
                  <div className="text-base md:text-lg font-urbanist font-semibold text-gray-900 mb-1">True/False</div>
                  <div className="text-sm md:text-base font-urbanist font-light text-gray-600">Quick Assessment</div>
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Button
                className="px-6 md:px-8 py-4 md:py-6 text-lg md:text-xl font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                onClick={() => navigate("/bible-questions-and-answers-hub")}
              >
                Explore Bible Q&A Hub
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — How It Works —
              </p>
              <h2 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Get Started in Minutes
              </h2>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Join the Bible quiz competition 2026 today! Our simple 3-step process helps you begin your journey in the online Bible quiz competition and start competing in Bible competitions.
              </p>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-3 gap-6">
                  {howItWorks.map((step, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300 relative"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5 text-gray-700" strokeWidth={1} />
                      </div>
                      <div className="text-sm md:text-base font-urbanist font-semibold text-gray-500 mb-2">Step {i + 1}</div>
                      <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Decorative accent lines */}
          <div className="absolute bottom-20 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-base md:text-lg font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — What Our Users Say —
              </p>
              <h2 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Join Thousands of Believers
              </h2>
              <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                See how our Bible quiz competition platform has helped others grow in faith and wellness. Join thousands participating in Bible competition 2026-2026 and Bible competitions worldwide.
              </p>
            </div>

            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {bibleTestimonials.map((testimonial, i) => (
                    <CarouselItem key={i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full relative group">
                        {/* Decorative quote mark */}
                        <div className="absolute top-4 left-4 text-4xl text-gray-200 font-serif leading-none opacity-50">"</div>

                        <p className="text-base md:text-lg font-urbanist font-light text-gray-700 mb-4 relative z-10 pl-6">
                          {testimonial.content}
                        </p>
                        <div className="relative z-10 border-t border-gray-100 pt-4 mt-4">
                          <div className="text-base md:text-lg font-urbanist font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm md:text-base font-urbanist font-light text-gray-600">{testimonial.role}</div>
                        </div>

                        {/* Hover accent */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gray-300 to-transparent group-hover:w-full transition-all duration-300"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 md:-left-12 border-gray-300 hover:border-gray-400" />
                <CarouselNext className="right-0 md:-right-12 border-gray-300 hover:border-gray-400" />
              </Carousel>
            </div>
            {/* <div className="text-center mt-12">
              <Button 
                className="bg-black hover:bg-gray-800 font-urbanist font-light text-base"
                onClick={() => setShowFeedbackDialog(true)}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Give Your Feedback
              </Button>
            </div> */}
          </div>
        </section>



        <div id="faq">
          <FaqSection />
        </div>
        {/* Bible Study Section */}
        {false && (
          <section className="py-16 bg-gradient-to-br from-green-50 via-blue-100 to-purple-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Deepen Your Faith with Bible Study</h2>
                <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
                  Access daily devotionals, structured study plans, and guided spiritual growth. Create an account to save your progress and unlock all features.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Daily Devotionals */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Daily Devotionals</CardTitle>
                    <CardDescription>
                      Fresh scripture, reflection, and prayer every day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        New content daily
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Scripture-based insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Practical applications
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* Study Plans */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Study Plans</CardTitle>
                    <CardDescription>
                      30-day and 90-day guided journeys
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Bible Foundations (30 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Discipleship Journey (90 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Progress tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* Account Benefits */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Create Account</CardTitle>
                    <CardDescription>
                      Unlock personalized features and save progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Save study progress
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Personalized dashboard
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Track achievements
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => navigate("/auth/register")}>
                    <BookOpen className="w-5 h-5 mr-2" />
                    Create Account & Start Studying
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-400 transition-all duration-300" onClick={() => navigate("/auth/login")}>
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Free to join • No credit card required • Start studying immediately
                </p>
              </div>
            </div>
          </section>
        )}
        {/* Contact Section */}
        <section className="relative py-12 md:py-20 bg-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Decorative accent lines */}
          <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — Get Started —
              </p>
              <h2 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Join thousands of believers who've enhanced their Bible knowledge and wellness with our platform. Participate in the Bible quiz competition 2026-2026, check Bible quiz competition 2026-2026 results, and compete in the best online Bible quiz competition and Bible competitions.
              </p>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="flex justify-center">
                  <Button
                    className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => navigate("/auth/register")}
                  >
                    Get Started - It's Free!
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-lg font-urbanist font-light text-gray-900">Bible Quiz Competition</span>
                </div>
                <p className="font-urbanist font-light text-gray-600 mb-4 max-w-md">
                  More than a quiz platform. Join the leading Bible quiz competition 2026-2026 and participate in online Bible quiz competition. We support you through Bible study, emotional wellness, CBT tools, water intake tracking, and every step of your journey toward peace. Check Bible quiz competition 2026-2026 results and compete in Bible competition challenges.
                </p>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><a href="/daily-bible-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Today's Quiz</a></li>
                  <li><a href="/weekly-quiz" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Weekly Quiz</a></li>
                  {/* <li><a href="/public-leaderboard" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Leaderboard</a></li> */}
                  <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help</a></li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="/help" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
                  <li><a href="#faq" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                  <li><a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <span className="font-urbanist font-light text-gray-600">© 2024 Bible Quiz Competition. All rights reserved.</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* <StickyLeaderboardPanel /> */}
    </>
  );
};

// Removed TestimonialsCarousel - using simple grid instead

export default Index;