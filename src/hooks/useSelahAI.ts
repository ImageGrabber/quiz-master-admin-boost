import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    choices?: string[];
}

interface AIResponse {
    narrative: string;
    choices: string[];
    scenePrompt: string;
    limitReached?: boolean;
    canWatchAd?: boolean;
}

export const useSelahAI = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImagePrompt, setCurrentImagePrompt] = useState<string>("ancient biblical landscape, dramatic sky, journey beginning, adventure awaits");
    const [gameStarted, setGameStarted] = useState(false);
    const [turnLimitReached, setTurnLimitReached] = useState(false);
    const [showAdModal, setShowAdModal] = useState(false);

    const startAdventure = async () => {
        setMessages([]);
        setIsProcessing(true);
        setGameStarted(true);
        setTurnLimitReached(false);

        try {
            const { data, error } = await supabase.functions.invoke('selah-chat', {
                body: {
                    message: 'START_ADVENTURE',
                    history: []
                }
            });

            if (error) throw error;

            const aiMsg: Message = {
                id: Date.now().toString(),
                text: data.narrative,
                sender: 'ai',
                timestamp: new Date(),
                choices: data.choices
            };
            setMessages([aiMsg]);
            setCurrentImagePrompt(data.scenePrompt);
        } catch (error) {
            console.error('Error starting adventure:', error);
            toast({
                title: "Connection Issue",
                description: "Could not start the adventure. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const makeChoice = async (choice: string) => {
        // Add user choice message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: choice,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsProcessing(true);

        try {
            // Format history for backend (exclude current user message as it's sent separately)
            const history = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));

            const { data, error } = await supabase.functions.invoke('selah-chat', {
                body: {
                    message: choice,
                    history: history
                }
            });

            if (error) throw error;

            // Add AI narrative response
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: data.narrative,
                sender: 'ai',
                timestamp: new Date(),
                choices: data.choices
            };
            setMessages(prev => [...prev, aiMsg]);
            setCurrentImagePrompt(data.scenePrompt);

            // Check if turn limit was reached
            if (data.limitReached) {
                setTurnLimitReached(true);
                if (data.canWatchAd) {
                    // Show ad modal after a brief delay
                    setTimeout(() => setShowAdModal(true), 500);
                }
            }
        } catch (error) {
            console.error('Error processing choice:', error);
            toast({
                title: "Connection Issue",
                description: "Could not process your choice. Please try again.",
                variant: "destructive"
            });

            const fallbackMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "The path ahead is unclear... Let us try again.",
                sender: 'ai',
                timestamp: new Date(),
                choices: ["Try again"]
            };
            setMessages(prev => [...prev, fallbackMsg]);
        } finally {
            setIsProcessing(false);
        }
    };

    const completeAdWatch = async () => {
        try {
            // Notify backend that ad was watched
            const { data, error } = await supabase.functions.invoke('selah-chat', {
                body: { adCompleted: true }
            });

            if (!error && data) {
                // Reset states to allow continued play
                setTurnLimitReached(false);
                setShowAdModal(false);

                toast({
                    title: "20 More Turns Granted!",
                    description: "Continue your adventure",
                });
            }
        } catch (error) {
            console.error('Error completing ad watch:', error);
        }
    };

    return {
        messages,
        isProcessing,
        currentImagePrompt,
        gameStarted,
        turnLimitReached,
        showAdModal,
        startAdventure,
        makeChoice,
        completeAdWatch
    };
};
