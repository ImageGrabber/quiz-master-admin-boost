import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VisualizerProps {
    prompt: string;
}

export const Visualizer = ({ prompt }: VisualizerProps) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0); // Force re-render for animation

    useEffect(() => {
        setIsLoading(true);
        // Construct Pollinations.ai URL
        // Keywords: epic fantasy, biblical adventure, dramatic lighting, ancient times
        const enhancedPrompt = `${prompt}, epic fantasy art, biblical adventure, dramatic lighting, ancient middle eastern setting, 8k, detailed, --no text`;
        const encodedPrompt = encodeURIComponent(enhancedPrompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1080&nologo=true&model=flux&seed=${Math.random()}`;

        // Preload image
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageUrl(url);
            setIsLoading(false);
            setKey(prev => prev + 1);
        };
    }, [prompt]);

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
                    isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
                    <p className="text-amber-700 font-serif italic">Painting the scene...</p>
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
