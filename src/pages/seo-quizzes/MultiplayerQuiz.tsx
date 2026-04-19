import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Sparkles, 
    Zap, 
    Trophy, 
    Play, 
    ArrowRight, 
    Activity,
    Users,
    Gamepad2
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const MultiplayerQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does the multiplayer Bible quiz work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our multiplayer mode allows you to join a live room or create your own. You'll compete against other players in real-time, answering the same questions. Points are awarded based on both accuracy and speed."
                }
            },
            {
                "@type": "Question",
                "name": "Can I play against my friends privately?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! You can create a 'Private Room' and share the unique Room Code with your friends or youth group. Only those with the code can join the competition."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a global ranking for multiplayer games?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, every multiplayer session contributes to the daily and weekly global leaderboards. Top players earn exclusive virtual badges and are featured on our homepage."
                }
            }
        ]
    };

    const features = [
        { title: "Real-time Competition", desc: "See your opponents' progress as you play.", icon: Activity, color: "text-red-600 bg-red-50" },
        { title: "Live Leaderboards", desc: "Rankings update instantly after every question.", icon: Trophy, color: "text-amber-600 bg-amber-50" },
        { title: "Power-ups", desc: "Earn double points for streaks or use shields.", icon: Zap, color: "text-blue-600 bg-blue-50" },
        { title: "Private Rooms", desc: "Host a quiz for just your family or church group.", icon: Users, color: "text-purple-600 bg-purple-50" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Multiplayer Bible Quiz Online | Live Competition & Games"
                description="Play live multiplayer Bible quizzes against friends and believers worldwide. Compete in real-time, climb the global leaderboard, and win virtual prizes."
                keywords="bible quiz multiplayer online, live bible competition, play bible quiz with friends, real-time bible games"
                url="/bible-quiz-multiplayer"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-bold mb-6">
                        <Gamepad2 className="w-4 h-4" />
                        <span>Live Global Competition</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        Multiplayer <span className="text-red-600">Bible Quiz</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10 leading-relaxed">
                        Don't just study alone—compete with the community! Join thousands of daily players in our real-time Bible trivia rooms.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-red-600 hover:bg-red-700 shadow-xl shadow-red-200" onClick={() => navigate('/public-quizzes')}>
                            Join Live Room <Play className="ml-2 h-6 w-6 fill-current" />
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-xl font-bold border-slate-200" onClick={() => navigate('/auth/register')}>
                            Create Private Room
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={idx} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white p-8 hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 font-urbanist">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </Card>
                        );
                    })}
                </div>

                <div className="max-w-5xl mx-auto mb-20">
                    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 opacity-5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 font-urbanist tracking-tight italic">Win Exclusive Awards</h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                                Every multiplayer win adds to your seasonal rank. Climb from 'Seeker' to 'Apostle' and earn exclusive digital badges that display on your profile and in the public chat.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                {[
                                    { name: "Top Sniper", desc: "Best accuracy", color: "text-amber-400" },
                                    { name: "Flash", desc: "Fastest answers", color: "text-blue-400" },
                                    { name: "Overlord", desc: "3 wins in a row", color: "text-purple-400" }
                                ].map((award, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                                        <Trophy className={`w-8 h-8 mx-auto mb-2 ${award.color}`} />
                                        <div className="font-bold">{award.name}</div>
                                        <div className="text-xs text-slate-500">{award.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mb-20">
                    <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm text-center">
                        <h2 className="text-3xl font-black text-slate-900 mb-6 font-urbanist">Perfect for Youth Groups</h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Encourage friendly competition in your youth ministry or small group. Host a monthly Bible Bowl using our multiplayer platform to make scripture learning the highlight of your week.
                        </p>
                        <div className="mt-8">
                            <Button variant="link" className="text-red-600 font-bold" onClick={() => navigate('/bible-quiz-with-answers-for-youth')}>
                                View Youth Resources <ArrowRight className="ml-1 w-4 h-4" />
                            </Button>
                        </div>
                    </section>
                </div>

                <div className="max-w-5xl mx-auto">
                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MultiplayerQuiz;
