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
        const initialPlayerCards = shuffled.slice(0, 8); // 8 cards
        const initialOpponentCards = shuffled.slice(8, 15); // 7 cards

        // Auto-remove pairs from initial hands
        // We need to do this iteratively until no pairs are left, but for this simple game, 
        // one pass might be enough if the logic handles multiple pairs. 
        // Our removeMatchingPairs only removes ONE pair at a time.
        // Let's make a helper to remove ALL pairs.

        const processHand = (hand: CardItem[]) => {
            let currentHand = [...hand];
            let allPairs: CardItem[][] = [];
            let foundPair = true;

            while (foundPair) {
                foundPair = false;
                // Simple pair finding
                for (let i = 0; i < currentHand.length; i++) {
                    for (let j = i + 1; j < currentHand.length; j++) {
                        if (currentHand[i].name === currentHand[j].name && currentHand[i].name !== 'Lost Sheep') {
                            allPairs.push([currentHand[i], currentHand[j]]);
                            // Remove these two
                            const newHand = currentHand.filter((_, idx) => idx !== i && idx !== j);
                            currentHand = newHand;
                            foundPair = true;
                            break;
                        }
                    }
                    if (foundPair) break;
                }
            }
            return { hand: currentHand, pairs: allPairs };
        };

        const { hand: cleanPlayerHand, pairs: playerPairs } = processHand(initialPlayerCards);
        const { hand: cleanOpponentHand, pairs: opponentPairs } = processHand(initialOpponentCards);

        setPlayerHand(cleanPlayerHand);
        setOpponentHand(cleanOpponentHand);
        setMatchedPairs([...playerPairs, ...opponentPairs]);
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

        // Show card face if it's the player's card, or if it's an opponent's card that is currently flipped
        const showFace = !isOpponent || isFlipped;

        return (
            <div
                key={card.id}
                className={cn(
                    "relative aspect-[0.7] rounded-xl overflow-hidden transition-all duration-300",
                    isOpponent && isPlayerTurn && "cursor-pointer hover:scale-105 hover:-translate-y-2",
                    !isOpponent && "hover:scale-105 hover:-translate-y-2 transition-transform", // Add hover effect for player cards
                    isBeingDrawn && "scale-110 ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50 z-20",
                    isFlipped && "animate-pulse ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.5)] z-20"
                )}
                onClick={() => isOpponent && isPlayerTurn && handlePlayerDrawCard(index)}
            >
                <div className={cn(
                    "w-full h-full flex flex-col items-center justify-center p-2 border-2 rounded-xl transition-all duration-500",
                    showFace
                        ? (isLostSheep
                            ? "bg-gradient-to-br from-red-500 to-red-600 border-red-400/30"
                            : "bg-gradient-to-br from-green-500 to-green-600 border-green-400/30")
                        : "bg-gradient-to-br from-indigo-600 to-violet-700 border-indigo-400/30"
                )}>
                    {showFace ? (
                        <>
                            <span className="text-3xl sm:text-4xl mb-1 sm:mb-2 drop-shadow-lg transform hover:scale-110 transition-transform duration-200">{card.emoji}</span>
                            <span className="text-[10px] sm:text-xs font-urbanist font-bold text-white text-center leading-tight shadow-black/20 drop-shadow-md">
                                {card.name}
                            </span>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-50">
                            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                                <span className="text-white/50 font-bold text-xs">?</span>
                            </div>
                        </div>
                    )}

                    {isBeingDrawn && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-full p-1 shadow-lg animate-bounce">
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
                countdown={currentView === 'matchmaking' ? null : countdown}
                proTip="Avoid being left with the Lost Sheep card! Match pairs to win."
            />
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-between p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Game Header / Status */}
            <div className="relative z-10 w-full max-w-4xl flex justify-between items-center mb-4 bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "px-4 py-2 rounded-lg border transition-all duration-300",
                        !isPlayerTurn
                            ? "bg-violet-500/20 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                            : "bg-slate-800/50 border-slate-700/50 opacity-50"
                    )}>
                        <p className={cn(
                            "text-sm font-urbanist font-bold",
                            !isPlayerTurn ? "text-violet-200" : "text-slate-400"
                        )}>
                            {!isPlayerTurn ? "Opponent's Turn..." : "Opponent Waiting"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="text-xs font-urbanist text-slate-400 uppercase tracking-wider mb-1">Pairs Matched</div>
                    <div className="text-2xl font-black text-white bg-slate-800 px-4 py-1 rounded-lg border border-slate-700">
                        {matchedPairs.length}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "px-4 py-2 rounded-lg border transition-all duration-300",
                        isPlayerTurn
                            ? "bg-green-500/20 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            : "bg-slate-800/50 border-slate-700/50 opacity-50"
                    )}>
                        <p className={cn(
                            "text-sm font-urbanist font-bold",
                            isPlayerTurn ? "text-green-200" : "text-slate-400"
                        )}>
                            {isPlayerTurn ? "Your Turn!" : "Wait for Turn"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Opponent's Hand */}
            <div className="relative z-10 w-full max-w-4xl mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-violet-400" />
                    <h2 className="text-sm font-urbanist font-bold text-violet-200">
                        Opponent's Hand ({opponentHand.length})
                    </h2>
                </div>
                <div className="flex justify-center flex-wrap gap-2 px-4 min-h-[120px]">
                    {opponentHand.map((card, index) => (
                        <div key={card.id} className="w-16 sm:w-20">
                            {renderCard(card, index, true)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Area - Matched Pairs Pile (Visual Only) */}
            <div className="relative z-10 flex-1 flex items-center justify-center my-4">
                {matchedPairs.length > 0 ? (
                    <div className="relative">
                        {matchedPairs.slice(-3).map((pair, i) => (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 bg-slate-800 rounded-xl border-2 border-slate-700 shadow-xl flex items-center justify-center transform rotate-6"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${i * 5 - 5}deg)`,
                                    zIndex: i
                                }}
                            >
                                <div className="text-center opacity-50">
                                    <span className="text-2xl block">{pair[0].emoji}</span>
                                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-24 h-32 rounded-xl border-2 border-dashed border-slate-800 flex items-center justify-center">
                        <span className="text-slate-700 text-xs font-urbanist">Pairs Pile</span>
                    </div>
                )}
            </div>

            {/* Player's Hand */}
            <div className="relative z-10 w-full max-w-4xl mt-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <h2 className="text-sm font-urbanist font-bold text-green-200">
                        Your Hand ({playerHand.length})
                    </h2>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3 px-4 pb-4">
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
    );
};

export default LostSheep;
