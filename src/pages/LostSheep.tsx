import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trophy, RefreshCw, Home, Users, Sparkles, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { MatchmakingScreen } from "@/components/MatchmakingScreen";

interface CardItem {
    id: string;
    name: string;
    emoji: string;
    fact: string;
}

// Biblical animals with their stories
const BIBLICAL_ANIMALS: Omit<CardItem, 'id'>[] = [
    {
        name: 'Donkey',
        emoji: '🐴',
        fact: "Balaam's donkey spoke to him and saved his life by seeing the angel of the Lord (Numbers 22:28-30)"
    },
    {
        name: 'Dove',
        emoji: '🕊️',
        fact: 'The Holy Spirit descended like a dove upon Jesus at His baptism (Matthew 3:16)'
    },
    {
        name: 'Lion',
        emoji: '🦁',
        fact: 'Daniel was thrown into the lions\' den but God shut their mouths (Daniel 6:22)'
    },
    {
        name: 'Raven',
        emoji: '🐦‍⬛',
        fact: 'God sent ravens to feed Elijah by the brook (1 Kings 17:4-6)'
    },
    {
        name: 'Fish',
        emoji: '🐟',
        fact: 'Jonah was swallowed by a great fish for three days (Jonah 1:17)'
    },
    {
        name: 'Serpent',
        emoji: '🐍',
        fact: 'Moses lifted up a bronze serpent in the wilderness to heal those bitten (Numbers 21:9)'
    },
    {
        name: 'Eagle',
        emoji: '🦅',
        fact: 'Those who hope in the Lord will soar on wings like eagles (Isaiah 40:31)'
    },
];

const LOST_SHEEP: Omit<CardItem, 'id'> = {
    name: 'Lost Sheep',
    emoji: '🐑',
    fact: 'Jesus told the parable of the Lost Sheep - the shepherd leaves 99 sheep to find the one that was lost (Luke 15:4-7)'
};

const LostSheep = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<'matchmaking' | 'countdown' | 'game'>('matchmaking');
    const [countdown, setCountdown] = useState(3);
    const [playersOnline] = useState(Math.floor(Math.random() * 500) + 1200);

    const [playerHand, setPlayerHand] = useState<CardItem[]>([]);
    const [opponentHand, setOpponentHand] = useState<CardItem[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<CardItem[][]>([]);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
    const [opponentDrawingIndex, setOpponentDrawingIndex] = useState<number | null>(null);
    const [showGameOver, setShowGameOver] = useState(false);

    useEffect(() => {
        // Start matchmaking flow
        const matchmakingTimer = setTimeout(() => {
            setCurrentView('countdown');
        }, Math.random() * 3000 + 5000); // 5-8 seconds

        return () => clearTimeout(matchmakingTimer);
    }, []);

    useEffect(() => {
        if (currentView === 'countdown') {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setCurrentView('game');
                initializeGame();
            }
        }
    }, [currentView, countdown]);

    const initializeGame = () => {
        // Create deck with pairs of animals + Lost Sheep
        const deck: CardItem[] = [];

        // Add two of each animal
        BIBLICAL_ANIMALS.forEach(animal => {
            deck.push({ ...animal, id: `${animal.name}-1` });
            deck.push({ ...animal, id: `${animal.name}-2` });
        });

        // Add the Lost Sheep (only one)
        deck.push({ ...LOST_SHEEP, id: 'lost-sheep' });

        // Shuffle deck
        const shuffled = deck.sort(() => Math.random() - 0.5);

        // Deal ALL 15 cards (distribute as evenly as possible)
        const playerCards = shuffled.slice(0, 8); // 8 cards
        const opponentCards = shuffled.slice(8, 15); // 7 cards

        setPlayerHand(playerCards);
        setOpponentHand(opponentCards);
        setMatchedPairs([]);
        setIsPlayerTurn(true);
        setGameStatus('playing');
        setShowGameOver(false);
    };

    const removeMatchingPairs = (hand: CardItem[]): { hand: CardItem[], pairs: CardItem[][] } => {
        const pairs: CardItem[][] = [];
        const remaining = [...hand];

        // Check the last card (just drawn) against all others
        if (remaining.length < 2) {
            return { hand: remaining, pairs };
        }

        const lastCard = remaining[remaining.length - 1];

        // Can't match Lost Sheep
        if (lastCard.name === 'Lost Sheep') {
            return { hand: remaining, pairs };
        }

        // Look for a match for the last card
        for (let i = 0; i < remaining.length - 1; i++) {
            if (remaining[i].name === lastCard.name) {
                // Found a match!
                pairs.push([remaining[i], lastCard]);
                // Remove both cards (last one first, then the earlier one)
                remaining.splice(remaining.length - 1, 1);
                remaining.splice(i, 1);
                break; // Only match one pair
            }
        }

        return { hand: remaining, pairs };
    };

    const handlePlayerDrawCard = (cardIndex: number) => {
        if (!isPlayerTurn || gameStatus !== 'playing') return;

        // Show flipped card animation
        setFlippedCardIndex(cardIndex);

        // Wait for flip animation, then move card to player hand
        setTimeout(() => {
            const drawnCard = opponentHand[cardIndex];
            const newOpponentHand = opponentHand.filter((_, index) => index !== cardIndex);

            // Reset flip animation
            setFlippedCardIndex(null);

            // Animate card moving to player hand
            setTimeout(() => {
                const newPlayerHand = [...playerHand, drawnCard];

                // Check for matching pairs (Lost Sheep can't be matched)
                const { hand: updatedHand, pairs: newPairs } = removeMatchingPairs(newPlayerHand);

                setPlayerHand(updatedHand);
                setOpponentHand(newOpponentHand);

                if (newPairs.length > 0) {
                    setMatchedPairs([...matchedPairs, ...newPairs]);
                }

                // Check if opponent's hand is empty - they got rid of all cards
                if (newOpponentHand.length === 0) {
                    // Player is left with Lost Sheep - player loses
                    setTimeout(() => endGame(false), 500);
                    return;
                }

                // Check if player's hand is empty - player got rid of all cards
                if (updatedHand.length === 0) {
                    // Opponent is left with Lost Sheep - player wins
                    setTimeout(() => endGame(true), 500);
                    return;
                }

                // Switch to opponent's turn
                setIsPlayerTurn(false);
                setTimeout(() => opponentDrawCard(), 1500);
            }, 300);
        }, 600);
    };

    const opponentDrawCard = () => {
        if (playerHand.length === 0) {
            // Player has no cards - opponent is stuck with Lost Sheep
            setTimeout(() => endGame(true), 500);
            return;
        }

        // Show which card opponent is drawing
        const randomIndex = Math.floor(Math.random() * playerHand.length);
        setOpponentDrawingIndex(randomIndex);

        // Wait for animation to complete before drawing
        setTimeout(() => {
            const drawnCard = playerHand[randomIndex];
            const newPlayerHand = playerHand.filter((_, index) => index !== randomIndex);

            const newOpponentHand = [...opponentHand, drawnCard];

            // Check for matching pairs (Lost Sheep can't be matched)
            const { hand: updatedHand, pairs: newPairs } = removeMatchingPairs(newOpponentHand);

            setPlayerHand(newPlayerHand);
            setOpponentHand(updatedHand);
            setOpponentDrawingIndex(null);

            if (newPairs.length > 0) {
                setMatchedPairs([...matchedPairs, ...newPairs]);
            }

            // Check if player's hand is empty - they got rid of all cards
            if (newPlayerHand.length === 0) {
                // Opponent is left with Lost Sheep - player wins
                setTimeout(() => endGame(true), 500);
                return;
            }

            // Check if opponent's hand is empty - opponent got rid of all cards
            if (updatedHand.length === 0) {
                // Player is left with Lost Sheep - player loses
                setTimeout(() => endGame(false), 500);
                return;
            }

            // Switch back to player's turn
            setIsPlayerTurn(true);
        }, 800);
    };

    const endGame = async (won: boolean) => {
        setGameStatus(won ? 'won' : 'lost');

        // Save to database
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Save attempt - cast to any to avoid strict typings for this ad-hoc game record
                await supabase.from('attempts').insert(({
                    user_id: user.id,
                    quiz_id: null,
                    score: matchedPairs.length * 10,
                    seconds_used: 0,
                    // keep original metadata if desired
                    meta: { game: 'lost-sheep', matched_pairs: matchedPairs.length }
                } as any));
            }
        } catch (error) {
            console.error('Error saving game:', error);
        }

        setTimeout(() => setShowGameOver(true), 500);
    };

    const renderCard = (card: CardItem, index: number, isOpponent: boolean) => {
        const isLostSheep = card.name === 'Lost Sheep';
        const isFlipped = flippedCardIndex === index && isOpponent;
        const isBeingDrawn = opponentDrawingIndex === index && !isOpponent;

        return (
            <div
                key={card.id}
                className={cn(
                    "relative aspect-[0.7] rounded-xl overflow-hidden transition-all duration-300",
                    isOpponent && isPlayerTurn && "cursor-pointer hover:scale-105",
                    isBeingDrawn && "scale-110 ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50",
                    isFlipped && "animate-pulse"
                )}
                onClick={() => isOpponent && isPlayerTurn && handlePlayerDrawCard(index)}
            >
                <div className={cn(
                    "w-full h-full flex flex-col items-center justify-center p-3 border-2 rounded-xl",
                    isLostSheep
                        ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400/30"
                        : "bg-gradient-to-br from-green-500 to-green-600 border-green-400/30"
                )}>
                    <span className="text-4xl mb-2">{card.emoji}</span>
                    <span className="text-xs font-urbanist font-semibold text-white text-center">
                        {card.name}
                    </span>
                    {isBeingDrawn && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-full p-1">
                            <ArrowLeft className="w-4 h-4 text-yellow-900 rotate-90" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Matchmaking View
    if (currentView === 'matchmaking' || currentView === 'countdown') {
        return (
            <MatchmakingScreen
                playersOnline={playersOnline}
                countdown={countdown}
                proTip="Avoid being left with the Lost Sheep card! Match pairs to win."
            />
        );
    }
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <Card className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-slate-700/50 shadow-2xl backdrop-blur-xl">
                    <CardContent className="p-10 text-center space-y-6">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center border-4 border-violet-400/30 shadow-2xl shadow-violet-500/50 animate-pulse">
                                <Users className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-urbanist font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
                                Finding Opponent
                                <span className="inline-flex ml-1">
                                    <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                                </span>
                            </h2>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                                {/* Online Players */}
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-3 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                        <span className="text-xs font-urbanist font-medium text-green-300">Online</span>
                                    </div>
                                    <div className="text-2xl font-black text-white">{playersOnline}</div>
                                </div>

                                {/* Average Wait */}
                                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-3 backdrop-blur-sm">
                                    <div className="text-xs font-urbanist font-medium text-blue-300 mb-1">Avg Wait</div>
                                    <div className="text-2xl font-black text-white">~2s</div>
                                </div>

                                {/* Active Matches */}
                                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-3 backdrop-blur-sm">
                                    <div className="text-xs font-urbanist font-medium text-orange-300 mb-1">Active</div>
                                    <div className="text-2xl font-black text-white">{Math.floor(playersOnline / 2)}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <p className="text-slate-300 text-sm font-urbanist font-medium">
                                    Matching you with an opponent of similar skill
                                </p>
                                <p className="text-slate-500 text-xs font-urbanist font-light">
                                    Analyzing player stats and preferences...
                                </p>
                            </div>
                        </div>

                        {/* Loading bar */}
                        <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                            <div className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-pulse shadow-lg shadow-violet-500/50"></div>
                        </div>

                        {/* Tips */}
                        <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-violet-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-urbanist font-semibold text-slate-300 mb-1">Pro Tip</p>
                                    <p className="text-xs font-urbanist font-light text-slate-400">
                                        Avoid being left with the Lost Sheep card! Match pairs to win.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    </Card>

                    {/* Player's Hand */}
                    <div className="space-y-3 mt-6 z-10">
                        <h2 className="text-lg font-urbanist font-bold text-white">
                            Your Hand ({playerHand.length} cards)
                        </h2>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                            {playerHand.map((card, index) => renderCard(card, index, false))}
                        </div>
                    </div>

                    {/* Game Over Modal */}
                    {showGameOver && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                            <Card className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                                <CardContent className="p-8 text-center space-y-6">
                                    <div className="text-6xl">
                                        {gameStatus === 'won' ? '🎉' : '🐑'}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-urbanist font-black text-white mb-2">
                                            {gameStatus === 'won' ? 'Sheep Found!' : 'You Found the Lost Sheep!'}
                                        </h2>
                                        <p className="text-slate-400 font-urbanist">
                                            {gameStatus === 'won'
                                                ? 'Your opponent found the Lost Sheep!'
                                                : 'The shepherd rejoices!'}
                                        </p>
                                    </div>
                                    <div className="bg-violet-500/20 border border-violet-500/30 rounded-xl p-4">
                                        <p className="text-white font-urbanist font-semibold">
                                            Pairs Matched: {matchedPairs.length}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={initializeGame}
                                            className="flex-1 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Play Again
                                        </Button>
                                        <Button
                                            onClick={() => navigate('/dashboard/bible-games')}
                                            variant="outline"
                                            className="flex-1 h-12 border-slate-600 hover:bg-slate-800"
                                        >
                                            <Home className="w-4 h-4 mr-2" />
                                            Exit
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default LostSheep;
