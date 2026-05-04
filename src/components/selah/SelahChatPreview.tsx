import React, { useState, useRef, useEffect } from 'react';
import { Scroll, Zap, Send, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSelahGemini } from '@/hooks/useSelahGemini';

export const SelahChatPreview = () => {
    const { messages, isProcessing, sendMessage } = useSelahGemini();
    const [input, setInput] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!input.trim() || isProcessing) return;
        sendMessage(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isProcessing]);

    return (
        <div className="w-full max-w-[500px] h-[500px] flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-100/60 relative animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-amber-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-xl">
                        <Scroll className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                        <h3 className="font-serif text-lg font-bold text-slate-800">Selah Guide</h3>
                        <p className="text-xs text-amber-700 font-medium">Your Biblical Companion</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs text-slate-400 font-medium">Online</span>
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollContainerRef} className="flex-1 p-6 space-y-6 bg-slate-50 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex-shrink-0 flex items-center justify-center border border-amber-200">
                                <Zap className="w-4 h-4 text-amber-600" />
                            </div>
                        )}

                        <div className={`flex-1 space-y-2 max-w-[85%] ${msg.sender === 'user' ? 'text-right' : ''}`}>
                            <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm font-serif'
                                }`}>
                                {msg.text}
                            </div>
                        </div>

                        {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center border border-blue-200">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                        )}
                    </div>
                ))}

                {isProcessing && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex-shrink-0 flex items-center justify-center border border-amber-200">
                            <Zap className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100">
                            <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area (CTA) */}
            <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
                <div className="flex gap-2">
                    <Input
                        placeholder="Ask Selah a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-12 rounded-xl border-slate-200 focus:ring-amber-500/20 focus:border-amber-500"
                        disabled={isProcessing}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={isProcessing || !input.trim()}
                        className="h-12 w-12 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center flex-shrink-0"
                    >
                        {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
};
