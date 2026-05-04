import React, { useRef, useEffect } from 'react';
import { Zap, Sword, Scroll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSelahAI } from '@/hooks/useSelahAI';

interface ChatInterfaceProps {
    messages: ReturnType<typeof useSelahAI>['messages'];
    isProcessing: boolean;
    gameStarted: boolean;
    turnLimitReached: boolean;
    onStartAdventure: () => void;
    onMakeChoice: (choice: string) => void;
}

export const ChatInterface = ({ messages, isProcessing, gameStarted, turnLimitReached, onStartAdventure, onMakeChoice }: ChatInterfaceProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isProcessing]);

    // Get the most recent AI message to display choices
    const lastAiMessage = [...messages].reverse().find(msg => msg.sender === 'ai');
    const currentChoices = lastAiMessage?.choices || [];

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-amber-50 to-stone-100 relative overflow-hidden">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-amber-200 bg-gradient-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <Scroll className="w-8 h-8 text-amber-800" />
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl text-amber-900 tracking-tight">Biblical Adventure</h1>
                        <p className="text-amber-700 mt-1 font-sans text-sm md:text-base">Navigate through ancient trials with wisdom and courage</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 md:p-8">
                <div className="space-y-6 max-w-2xl mx-auto">
                    {/* Welcome Screen - shown when game hasn't started */}
                    {!gameStarted && messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
                            <Sword className="w-20 h-20 text-amber-600" />
                            <div className="space-y-3">
                                <h2 className="font-serif text-3xl text-amber-900">Welcome, Traveler</h2>
                                <p className="text-amber-700 text-lg max-w-md">
                                    Embark on a journey through biblical lands. Face challenges that test your wisdom, courage, and faith.
                                </p>
                                <p className="text-amber-600 text-sm italic">
                                    Your choices will shape your destiny...
                                </p>
                            </div>
                            <Button
                                onClick={onStartAdventure}
                                size="lg"
                                className="mt-6 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white px-8 py-6 text-lg font-serif shadow-lg"
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                Begin Your Adventure
                            </Button>
                        </div>
                    )}

                    {/* Game Messages */}
                    {messages.map((msg, msgIndex) => (
                        <div key={msg.id}>
                            <div
                                className={cn(
                                    "flex w-full",
                                    msg.sender === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[90%] md:max-w-[80%] rounded-2xl p-5 md:p-6 shadow-md text-base md:text-lg leading-relaxed",
                                        msg.sender === 'user'
                                            ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm border-2 border-blue-500"
                                            : "bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 text-amber-950 rounded-tl-sm font-serif"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            </div>

                            {/* Show choices inline if this is an AI message with choices and it's the last message */}
                            {msg.sender === 'ai' && msg.choices && msg.choices.length > 0 && msgIndex === messages.length - 1 && !isProcessing && !turnLimitReached && (
                                <div className="mt-4 flex justify-start">
                                    <div className="max-w-[90%] md:max-w-[80%] space-y-3">
                                        <p className="text-amber-800 text-sm font-semibold mb-2">Choose your path:</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {msg.choices.map((choice, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => onMakeChoice(choice)}
                                                    variant="outline"
                                                    className="h-auto py-3 px-4 text-left justify-start bg-white hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-500 text-amber-900 transition-all shadow-sm hover:shadow-md whitespace-normal"
                                                >
                                                    <span className="font-semibold text-amber-600 mr-2 flex-shrink-0">{index + 1}.</span>
                                                    <span className="flex-1 break-words text-sm md:text-base">{choice}</span>
                                                </Button>
                                            ))}
                                        </div>
                                        <div className="mt-3 text-center">
                                            <Button
                                                onClick={onStartAdventure}
                                                variant="ghost"
                                                size="sm"
                                                className="text-amber-600 hover:text-amber-800 text-xs"
                                            >
                                                Start New Adventure
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {isProcessing && (
                        <div className="flex justify-start">
                            <div className="bg-white border-2 border-amber-200 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3 shadow-md">
                                <Zap className="w-5 h-5 text-amber-600 animate-pulse" />
                                <span className="text-amber-700 text-base italic font-serif">The Game Master ponders...</span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>
        </div>
    );
};
