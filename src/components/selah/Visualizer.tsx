import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VisualizerProps {
    prompt: string;
    gameStarted: boolean;
}

export const Visualizer = ({ prompt, gameStarted }: VisualizerProps) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [key, setKey] = useState(0); // Force re-render for animation

    useEffect(() => {
        if (!gameStarted) return;

        setIsLoading(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 200);

        // Construct Pollinations.ai URL
        // Keywords: epic fantasy, biblical adventure, dramatic lighting, ancient times
        const enhancedPrompt = `${prompt}, epic fantasy art, biblical adventure, dramatic lighting, ancient middle eastern setting, 8k, detailed, --no text`;
        const encodedPrompt = encodeURIComponent(enhancedPrompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux&seed=${Math.random()}`;

        // Preload image
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageUrl(url);
            setIsLoading(false);
            setProgress(100);
            clearInterval(progressInterval);
            setKey(prev => prev + 1);
        };
        img.onerror = () => {
            console.error("Failed to load image:", url);
            setIsLoading(false);
            clearInterval(progressInterval);
        };

        return () => clearInterval(progressInterval);
    }, [prompt, gameStarted]);

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `selah-moment-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div className="relative w-full h-full bg-stone-100 overflow-hidden group">
            {/* Loading State */}
            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center bg-stone-200 transition-opacity duration-700 z-10",
                    (isLoading || !gameStarted) ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center gap-4 p-4 text-center">
                    {!gameStarted ? (
                        <p className="text-amber-800 font-serif italic text-lg">Start adventure to paint the scene here</p>
                    ) : (
                        <>
                            <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                            <div className="flex flex-col items-center">
                                <p className="text-amber-700 font-serif italic">Painting the scene...</p>
                                <p className="text-amber-600 text-sm font-mono">{progress}%</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Image */}
            {imageUrl && (
                <img
                    key={key}
                    src={imageUrl}
                    alt={prompt}
                    className="w-full h-full object-cover animate-in fade-in duration-1000"
                />
            )}
        </div>
    );
};
