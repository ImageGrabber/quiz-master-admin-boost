import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

interface AdRewardModalProps {
    onAdCompleted: () => void;
    onClose?: () => void;
}

export const AdRewardModal = ({ onAdCompleted, onClose }: AdRewardModalProps) => {
    const [adLoaded, setAdLoaded] = useState(false);
    const [adWatched, setAdWatched] = useState(false);
    const [countdown, setCountdown] = useState(15); // 15 second ad simulation

    useEffect(() => {
        // Simulate ad loading
        const loadTimeout = setTimeout(() => {
            setAdLoaded(true);
        }, 1000);

        return () => clearTimeout(loadTimeout);
    }, []);

    useEffect(() => {
        if (adLoaded && !adWatched) {
            // Start countdown when ad is playing
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                // Ad finished
                setAdWatched(true);
            }
        }
    }, [adLoaded, countdown, adWatched]);

    const handleContinue = () => {
        if (adWatched) {
            onAdCompleted();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl mx-4">
                {/* Ad Container */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-amber-500/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                            {adWatched ? '✓ Ad Complete!' : 'Watch to Continue Your Adventure'}
                        </h2>
                        {!adWatched && countdown > 0 && (
                            <p className="text-white/90 text-sm mt-1">
                                Ad will finish in {countdown} seconds
                            </p>
                        )}
                    </div>

                    {/* Ad Player Area */}
                    <div className="relative bg-black aspect-video flex items-center justify-center">
                        {!adLoaded ? (
                            <div className="text-white">
                                <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <p className="text-lg">Loading advertisement...</p>
                            </div>
                        ) : adWatched ? (
                            <div className="text-center text-white p-8">
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Thank you for watching!</h3>
                                <p className="text-lg text-white/80">You've earned 20 more turns</p>
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                {/* Simulated Video Ad */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center p-8">
                                    <Play className="w-16 h-16 text-white mb-4 animate-pulse" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Advertisement</h3>
                                    <p className="text-white/80 text-center max-w-md">
                                        This is a placeholder for the AdMob video ad.
                                        In production, a real video ad will play here.
                                    </p>
                                    <div className="mt-6 text-white/60 text-sm">
                                        Simulated ad: {countdown}s remaining
                                    </div>
                                </div>

                                {/* Non-closable Overlay */}
                                <div className="absolute top-2 right-2 bg-black/50 px-3 py-1 rounded text-white text-xs">
                                    Cannot skip
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-slate-800">
                        {adWatched ? (
                            <Button
                                onClick={handleContinue}
                                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg"
                            >
                                Continue Adventure (+20 Turns)
                            </Button>
                        ) : (
                            <div className="text-center text-white/60 text-sm">
                                Please watch the ad to continue playing
                            </div>
                        )}

                        {/* Alternative Option */}
                        <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                            <p className="text-white/60 text-sm mb-2">
                                Or create a free account for unlimited play
                            </p>
                            <Button
                                variant="outline"
                                className="text-amber-400 border-amber-400/50 hover:bg-amber-400/10"
                                onClick={() => window.location.href = '/auth/register'}
                            >
                                Create Free Account
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Info Text */}
                <p className="text-center text-white/60 text-sm mt-4">
                    Ads help us keep this game free for everyone
                </p>
            </div>
        </div>
    );
};
