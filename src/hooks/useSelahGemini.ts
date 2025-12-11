import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    choices?: string[];
}

export const useSelahGemini = () => {
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            text: "Greetings! I am your guide through the scriptures. Would you like to test your knowledge or explore a story?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

    const sendMessage = async (text: string) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsProcessing(true);

        try {
            // Prepare history for prompt context
            const history = messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

            const { data, error } = await supabase.functions.invoke('selah-chat', {
                body: {
                    mode: 'chat',
                    message: text,
                    history: history
                }
            });

            if (error) throw error;

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: data.text || data.narrative || "I apologize, I am having trouble connecting to the archives of wisdom.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            console.error('Selah API Error:', error);
            toast({
                title: "Connection Issue",
                description: "Selah is momentarily silent. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        messages,
        isProcessing,
        sendMessage
    };
};
