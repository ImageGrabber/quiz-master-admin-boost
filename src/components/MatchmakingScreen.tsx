import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, CheckCircle } from "lucide-react";

interface MatchmakingScreenProps {
    playersOnline: number;
    countdown: number | null;
    proTip: string;
}

export const MatchmakingScreen = ({ playersOnline, countdown, proTip }: MatchmakingScreenProps) => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-violet-400/20 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}

                {/* Gradient orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-lg">
                <Card className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-slate-700/50 shadow-2xl backdrop-blur-xl">
                    <CardContent className="p-10 text-center space-y-6">
                        {countdown === null ? (
                            <>
                                {/* Animated Icon */}
                                <div className="relative w-48 h-48 mx-auto mb-2">
                                    {/* Outer pulse rings */}
                                    <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping"></div>
                                    <div className="absolute inset-0 bg-violet-500/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

                                    {/* Main circle with gradient */}
                                    <div className="relative w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center border-4 border-violet-400/30 shadow-2xl shadow-violet-500/50">
                                        <Users className="w-20 h-20 text-white animate-pulse" />

                                        {/* Inner glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full"></div>
                                    </div>

                                    {/* Orbiting dots */}
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '1.33s' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"></div>
                                    </div>
                                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDelay: '2.66s' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                                    </div>

                                    {/* Rotating ring */}
                                    <div className="absolute inset-4 border-2 border-dashed border-violet-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
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
                                            <Star className="w-4 h-4 text-violet-400" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-urbanist font-semibold text-slate-300 mb-1">Pro Tip</p>
                                            <p className="text-xs font-urbanist font-light text-slate-400">
                                                {proTip}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Countdown */}
                                <div className="relative py-4">
                                    {/* Animated checkmark */}
                                    <div className="relative w-24 h-24 mx-auto mb-6">
                                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                                        <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-green-400/30 shadow-2xl shadow-green-500/50 animate-pulse">
                                            <CheckCircle className="w-12 h-12 text-white" />
                                        </div>
                                    </div>

                                    {/* Countdown number */}
                                    <div className="relative mb-6">
                                        <div className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-400 animate-bounce drop-shadow-2xl leading-none">
                                            {countdown}
                                        </div>
                                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-violet-500 to-indigo-500 opacity-30 animate-pulse"></div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-urbanist font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                                            Match Found!
                                        </h2>
                                        <p className="text-slate-300 text-lg font-urbanist font-medium">Connecting to opponent...</p>

                                        {/* Enhanced Opponent Card */}
                                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                                            <div className="flex items-center gap-4">
                                                {/* Avatar */}
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center border-4 border-violet-400/30 shadow-lg shadow-violet-500/50">
                                                        <Users className="w-8 h-8 text-white" />
                                                    </div>
                                                    {/* Online indicator */}
                                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 text-left">
                                                    <p className="text-lg font-urbanist font-bold text-white mb-1">Opponent Found</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded-md">
                                                            <p className="text-xs font-urbanist font-semibold text-yellow-300">⭐ Intermediate</p>
                                                        </div>
                                                        <div className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-md">
                                                            <p className="text-xs font-urbanist font-semibold text-blue-300">🏆 Level 12</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Ready indicator */}
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                                    <p className="text-xs font-urbanist font-medium text-green-400">Ready</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Loading bar */}
                                        <div className="w-full h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                                            <div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
