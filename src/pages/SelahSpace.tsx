import React from 'react';
import { useSelahAI } from '@/hooks/useSelahAI';
import { ChatInterface } from '@/components/selah/ChatInterface';
import { Visualizer } from '@/components/selah/Visualizer';
import { Helmet } from 'react-helmet-async';
import { AdRewardModal } from '@/components/selah/AdRewardModal';

const SelahSpace = () => {
    const { messages, isProcessing, currentImagePrompt, gameStarted, turnLimitReached, showAdModal, startAdventure, makeChoice, completeAdWatch } = useSelahAI();

    return (
        <>
            <Helmet>
                <title>Biblical Adventure | Interactive D&D Story</title>
                <meta name="description" content="Embark on an interactive biblical adventure. Make meaningful choices and navigate through challenges with wisdom and courage." />
            </Helmet>

            <div className="flex flex-col md:flex-row h-[100dvh] w-full overflow-hidden bg-amber-50">
                {/* Mobile: Image on top (25% height), Chat on bottom (75%) */}
                {/* Desktop: Left Chat (60%), Right Image (40%) */}

                {/* Left Column (Desktop) / Bottom (Mobile) - Chat */}
                <div className="order-2 md:order-1 w-full md:w-[60%] h-[75%] md:h-full border-r border-amber-200 shadow-xl z-20">
                    <ChatInterface
                        messages={messages}
                        isProcessing={isProcessing}
                        gameStarted={gameStarted}
                        turnLimitReached={turnLimitReached}
                        onStartAdventure={startAdventure}
                        onMakeChoice={makeChoice}
                    />
                </div>

                {/* Right Column (Desktop) / Top (Mobile) - Visualizer */}
                <div className="order-1 md:order-2 w-full md:w-[40%] h-[25%] md:h-full relative z-10 flex items-center justify-center bg-amber-100/30 p-2 md:p-4">
                    <div className="w-full h-full md:h-full rounded-xl overflow-hidden shadow-lg border border-amber-200/50">
                        <Visualizer prompt={currentImagePrompt} gameStarted={gameStarted} />
                    </div>
                </div>
            </div>

            {/* Ad Reward Modal */}
            {showAdModal && (
                <AdRewardModal onAdCompleted={completeAdWatch} />
            )}
        </>
    );
};

export default SelahSpace;
